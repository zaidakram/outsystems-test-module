var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
define(["require", "exports", "./JanusHandleHelper", "./VideoClient", "./Feed", "./Event", "./Room", "./Utils"], function (require, exports, JanusHandleHelper_1, VideoClient_1, Feed_1, Event_1, Room_1, Utils_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    JanusHandleHelper_1 = __importDefault(JanusHandleHelper_1);
    VideoClient_1 = __importDefault(VideoClient_1);
    Feed_1 = __importDefault(Feed_1);
    Event_1 = __importDefault(Event_1);
    Room_1 = __importDefault(Room_1);
    Utils_1 = __importDefault(Utils_1);
    /** Unless otherwise licensed, the software is our proprietary property and all source code, database,
    * functionality, website design, audio, video, text, photographs and graphics on the site or the product (
    * collectively, the “Content”) and the trademarks, service marks, and logos contained therein ( the
    * “Marks”) are owned or controlled by us or licenses to us, and are protected by the copyright and
    * trademark laws and various other intellectual property rights and unfair competition laws in domestic as
    * well as in foreign jurisdictions and international conventions.
    */
    // Janus is the official janus.js bundle and JanusJS is the namespace that declares the Janus typescript types
    const Janus = require('./third-party/janus/janusBundle');
    /**
     * The JanusWrapper is a class that wraps janus.js and simplifies its usage with some exposed functions for videochat up to 3 participants
     */
    class JanusWrapper {
        // opaqueId is a string meaningful to your application (e.g., to map all the handles of the same user)
        opaqueId;
        janus;
        janusHandle;
        videoClient;
        janusServer;
        username;
        password;
        dispatcherServer;
        stunServer;
        turnServer;
        turnUsername;
        turnPassword;
        janusHandleHelper;
        publisherDivId;
        room;
        feeds = [];
        myid;
        mypvtid;
        mystream;
        myusername;
        videoContainerDivId;
        videoElemId;
        showButtons;
        acceptCommands;
        bitrateStatsEnabled = false;
        prevStat = { time: 0, bytes: 0, type: '' };
        slowLinkTimes = 0;
        slowLinkTimesThreshold = 8;
        autoCapBandwidth = false;
        autoCapped = false;
        reconnectTimeout = 10000;
        manuallyMutedVideo = false;
        manuallyMutedAudio = false;
        reconnecting = false;
        mediaConstraints = { audio: true, video: true };
        republished = false;
        onJoinedEvent = new Event_1.default();
        onDestroyedEvent = new Event_1.default();
        onLocalStream = new Event_1.default();
        onRemoteStream = new Event_1.default();
        onPublisherPublished = new Event_1.default();
        onPublisherUnpublished = new Event_1.default();
        onLocalDisconnection = new Event_1.default();
        onRemoteDisconnection = new Event_1.default();
        videoOffOptimization = new Event_1.default();
        recording = new Event_1.default();
        get joinedEvt() { return this.onJoinedEvent.expose(); }
        get destroyedEvt() { return this.onDestroyedEvent.expose(); }
        get localStreamStartedEvt() { return this.onLocalStream.expose(); }
        get remoteStreamStartedEvt() { return this.onRemoteStream.expose(); }
        get publisherPublishedEvt() { return this.onPublisherPublished.expose(); }
        get publisherUnpublishedEvt() { return this.onPublisherUnpublished.expose(); }
        get localDisconnectionEvt() { return this.onLocalDisconnection.expose(); }
        get remoteDisconnectionEvt() { return this.onRemoteDisconnection.expose(); }
        get videoOffOptimizationEvt() { return this.videoOffOptimization.expose(); }
        get recordingEvt() { return this.recording.expose(); }
        /**
         * JanusWrapper Constructor
         * @param dispatcherServer
         * @param publisherDivId
         * @param videoContainerDivId
         * @param videoElemId
         * @param username
         * @param password
         * @param showButtons
         * @param acceptCommands
         * @param bitrateStatsEnabled
         * @param autoCapBandwidth
         *
         */
        constructor(params) {
            this.dispatcherServer = params.dispatcherServer;
            this.opaqueId = 'videoroom-' + Janus.randomString(12);
            this.publisherDivId = params.publisherDivId;
            this.videoContainerDivId = params.localVideoContainerDivId;
            this.videoElemId = params.videoElemId;
            this.username = params.username;
            this.password = params.password;
            this.showButtons = params.showButtons;
            this.acceptCommands = params.acceptCommands;
            this.bitrateStatsEnabled = params.bitrateStatsEnabled;
            this.autoCapBandwidth = params.autoCapBandwidth;
        }
        /**
         * Initialize Janus object
         * @param options, JanusJS.InitOptions
         *
         */
        init = (options) => {
            return Janus.init(options);
        };
        /**
         * Initialize connection with dispatcher and create room
         * @param roomId (optional) If not passed the dispatcher will generate one for the client
         * @param roomName
         * @param roomSecret to protect our room from being deleted or modified
         * @param cb(err, res) - Callback function called after create room success or error
         *
         */
        createRoom = (roomId, roomName, roomSecret, cb) => {
            if (!roomName)
                return cb(new Error('Error starting... Missing room to create.'));
            this.room = new Room_1.default(this.dispatcherServer, this.username, this.password, undefined, undefined, roomSecret);
            // ask dispatcher to create room
            this.room.createRoom(roomId, roomName, roomSecret, (err, res) => {
                if (err) {
                    return cb(err);
                }
                cb(null, res);
            });
        };
        /**
         * Destroy room
         * @param roomSecret needed if the room was created with room secret
         * @param cb(err, res) - Callback function called after room destroyed success or error
         *
         */
        destoryRoom = (roomSecret, cb) => {
            this.room.destroyRoom(roomSecret, (err, res) => {
                if (err) {
                    console.error('Error destroying room...');
                    return cb(err);
                }
                cb(null, res);
            });
        };
        /**
         * Register to Janus room
         *
         * @param username - user name
         * @param roomId - room id to register to
         * @param cb(err,res) - Callback function called after room registration success or error
         */
        register = (username, roomId, cb) => {
            if (!this.janusHandle) {
                return cb(new Error('Missing handle. Janus connection and/or room have not started'));
            }
            if (Number.isInteger(roomId)) {
                this.videoClient = new VideoClient_1.default(this.janusHandle, username, roomId);
                this.videoClient.join((err, res) => {
                    if (err) {
                        return cb(err);
                    }
                    this.myusername = username;
                    return cb(null, res);
                });
            }
            else {
                return cb(new Error('Missing room. You will need to create a room or add a room id before you join'));
            }
        };
        janusServerHost = '';
        getJanusServerHost() {
            return this.janusServerHost;
        }
        /**
         * Initialize connection with dispatcher, retrieve server to join room and start Janus session/connection
         * @param roomId
         * @param cb(err,res) - Callback function called after session start success or error
         *
         */
        start = (roomId, cb) => {
            if (!roomId) {
                return cb(new Error('Error starting... Missing room ID to connect to.'));
            }
            this.room = (this.room) ? this.room : new Room_1.default(this.dispatcherServer, this.username, this.password);
            // ask dispatcher to create room
            this.room.getServerForRoom(roomId, (err, res) => {
                if (err) {
                    return console.error(err);
                }
                else if (!res.serverFullUrl) {
                    return console.error('Room not found');
                }
                this.janusServer = (res.serverFullUrl.slice(0, 4) === 'http') ? `${res.serverFullUrl}/janus` : res.serverFullUrl;
                this.stunServer = res.stunServer;
                this.janusServerHost = res.serverHost;
                this.turnServer = res.turnServer;
                this.turnUsername = res.turnUsername;
                this.turnPassword = res.turnPassword;
                this.startJanus(res.token, cb);
            });
        };
        /**
         * Publishes the local video to Janus
         *
         * @param cb(err,res) - Callback function called after publishing success or error
         * @param config object that includes audio and video booleans to publish with audio/video or not
         */
        publish = (cb, config) => {
            const useAudio = config.audio;
            const useVideo = config.video;
            this.videoClient.publish((err, res) => {
                //  use this to keep the previous state if we are re-publishing
                if (this.manuallyMutedAudio) {
                    this.toggleMute();
                }
                else if (this.manuallyMutedVideo) {
                    this.toggleVideo();
                }
                if (config.record) {
                    this.janusHandleHelper.isRecordingSelf = true;
                    this.recording.trigger({ started: true, selfOnly: true });
                }
                cb(err, res);
            }, useAudio, useVideo, config.record);
        };
        /**
         * Stops publishing the local video to Janus
         */
        unpublish = () => this.videoClient.unpublish();
        /**
         * Returns true if the Janus instance is connected to the server, false otherwise
         */
        isConnected = () => {
            if (!this.janus) {
                return false;
            }
            return this.janus.isConnected();
        };
        /**
         * Returns true if client supports WebRTC
         */
        isWebrtcSupported = () => {
            return Janus.isWebrtcSupported();
        };
        detach = () => {
            if (this.janusHandle)
                this.janusHandle.detach(function (data) {
                    console.info('[JanusWrapper detach]', data);
                });
        };
        /**
         * Attach a stream to a video element
         *
         * @param mediaElement - HTML media element where we will be attaching the stream
         * @param stream - Media Stream that we will attach to a dom element
         */
        attachMediaStream = (mediaElement, stream) => Janus.attachMediaStream(mediaElement, stream);
        /**
         * Hot transfer a video room participant to another room
         *
         * @param userId - User id to be transferred
         * @param roomId - Room id to be transferred to
         */
        hotTransfer = (userId, roomId) => {
            const data = JSON.stringify({ 'command': { 'transferTo': roomId }, 'dest': userId });
            this.janusHandle.data({
                data,
                success: () => {
                    console.log(`Transfer command ${data} sent`);
                },
                error: (error) => {
                    throw new Error('Hot transfer error. ' + JSON.stringify(error));
                }
            });
        };
        /**
         * Cap the maximum bitrate for the user
         *
         * @param bitrate - max bps allowed in room
         */
        capBitrate = (bitrate) => {
            if (bitrate === 0) {
                Janus.log("Not limiting bandwidth via REMB");
            }
            else {
                Janus.log("Capping bandwidth to " + bitrate + " via REMB");
            }
            return this.janusHandle.send({ message: { request: "configure", bitrate: bitrate } });
        };
        /**
         * Toggle mute/unmute and set as onclick function in the 'audioMute' id dom element
         */
        toggleMute = () => {
            if (!this.janusHandle) {
                throw new Error('Missing handle. Janus room has not started');
            }
            let muted = this.janusHandle.isAudioMuted();
            Janus.log((muted ? "Unmuting" : "Muting") + " local stream...");
            if (muted) {
                this.janusHandle.unmuteAudio();
                this.manuallyMutedAudio = false;
            }
            else {
                this.janusHandle.muteAudio();
                this.manuallyMutedAudio = true;
            }
            muted = this.janusHandle.isAudioMuted();
            let audioMuteDivEle = document.getElementById('audioMute');
            if (audioMuteDivEle)
                audioMuteDivEle.innerText = muted ? "Unmute" : "Mute";
        };
        isAudioMuted = () => {
            return this.janusHandle.isAudioMuted();
        };
        /**
         * Toggle video and set as onclick function in the 'videoOnOff' id dom element
         */
        toggleVideo = () => {
            if (!this.janusHandle) {
                throw new Error('Missing handle. Janus room has not started');
            }
            let muted = this.janusHandle.isVideoMuted();
            Janus.log((muted ? "publishing video" : "unpublishing video") + " local stream...");
            if (muted) {
                this.janusHandle.unmuteVideo();
                this.manuallyMutedVideo = false;
            }
            else {
                this.janusHandle.muteVideo();
                this.manuallyMutedVideo = true;
            }
            muted = this.janusHandle.isVideoMuted();
            let videoOnOffEle = document.getElementById('videoOnOff');
            if (videoOnOffEle)
                videoOnOffEle.innerText = muted ? "Show Video" : "Hide Video";
        };
        isVideoMuted = () => {
            return this.janusHandle.isVideoMuted();
        };
        /**
         * Toggle recording of the video room (all participants)
         */
        toggleRecording = () => {
            if (!this.janusHandleHelper) {
                throw new Error('Missing handle. Janus room has not started');
            }
            else if (!this.room.roomAdminSecret) {
                throw new Error('Missing secret. You need to be the creator of the room or know the room secret to record');
            }
            let isRecording = this.janusHandleHelper.isRecording;
            Janus.log(isRecording ? "Stopping recording" : "Starting recording");
            this.janusHandleHelper.record(this.room.roomId, this.room.roomAdminSecret, !isRecording, (err, res) => {
                if (err) {
                    return console.error(err);
                }
                isRecording = this.janusHandleHelper.isRecording;
                this.recording.trigger({ started: isRecording, selfOnly: false });
            });
        };
        /**
         * Toggle recording of the video room (self video only)
         */
        toggleSelfRecording = () => {
            if (!this.janusHandleHelper) {
                throw new Error('Missing handle. Janus room has not started');
            }
            let isRecordingSelf = this.janusHandleHelper.isRecordingSelf;
            Janus.log(isRecordingSelf ? "Stopping self recording" : "Starting self recording");
            this.janusHandleHelper.recordSelf(!isRecordingSelf, (err, res) => {
                if (err) {
                    return console.error(err);
                }
                isRecordingSelf = this.janusHandleHelper.isRecordingSelf;
                this.recording.trigger({ started: isRecordingSelf, selfOnly: true });
            });
        };
        getMediaDevices = (cb, config) => {
            Janus.listDevices((devices) => {
                try {
                    cb(devices);
                }
                catch (err) {
                    throw new Error(`Failed parsing device error: ${JSON.stringify(err)}`);
                }
            }, config);
        };
        /**
         * Method to display a selection of the available devices and choose them
         *
         * @param config object that includes the types of devices we want to list
         */
        initDeviceSelection = (config) => {
            Janus.listDevices((devices) => {
                try {
                    let devicesEle = document.getElementById('devices');
                    if (devicesEle) {
                        devicesEle.classList.remove('hide');
                        if (devicesEle.parentElement)
                            devicesEle.parentElement.classList.remove('hide');
                    }
                    document.querySelectorAll('#audio-device, #video-device').forEach(element => {
                        element.removeAttribute('option');
                    });
                    try {
                        devices.forEach(function (device) {
                            var label = device.label;
                            if (!label || label === "")
                                label = device.deviceId;
                            var option = '<option value="' + device.deviceId + '">' + label + '</option>';
                            if (device.kind === 'audioinput') {
                                let audioDevideEle = document.getElementById('audio-device');
                                if (audioDevideEle)
                                    audioDevideEle.innerHTML = audioDevideEle.innerHTML + option;
                            }
                            else if (device.kind === 'videoinput') {
                                let videoDevice = document.getElementById('video-device');
                                if (videoDevice)
                                    videoDevice.innerHTML = videoDevice.innerHTML + option;
                            }
                        });
                    }
                    catch (err) {
                        throw new Error(`Failed parsing device error: ${JSON.stringify(err)}`);
                    }
                    ;
                    let changeDevicesEle = document.getElementById('change-devices');
                    if (changeDevicesEle) {
                        changeDevicesEle.onclick = () => {
                            // A different device has been selected: hangup the session, and set it up again
                            document.querySelectorAll('#audio-device, #video-device').forEach(element => {
                                element.setAttribute('disabled', 'true');
                            });
                            if (changeDevicesEle)
                                changeDevicesEle.setAttribute('disabled', 'true');
                            // this.videoClient.restartCapture(
                            //   this.cleanRestartDeviceCapture,
                            //   (<HTMLInputElement>document.getElementById('audio-device')), 
                            //   (<HTMLInputElement>document.getElementById('video-device')));
                        };
                    }
                }
                catch (e) {
                    throw new Error('Failed to initialize video/audio devices. Error:' + JSON.stringify(e));
                }
            }, config);
        };
        restartCapture = (audioDeviceId, videoDeviceId) => {
            this.videoClient.restartCapture(this.cleanRestartDeviceCapture, audioDeviceId, videoDeviceId);
        };
        /**
         * Destroy Janus session
         */
        destroy = () => this.janus.destroy();
        /**
         * Starts the Janus session/connection using videoroom plugin
         *
         * @remarks
         * This method uses {@link https://janus.conf.meetecho.com/docs/JS.html | janus.js}.
         *
         * @param token - Token to have access to Janus (provided by the dispatcher when calling start())
         * @param cb(err,res) - Callback function called after session start success or error
         *
         */
        startJanus = (token, cb) => {
            let util = new Utils_1.default();
            const iceServers = util.getIceServers(this.stunServer, this.turnServer, this.turnUsername, this.turnPassword);
            this.janus = new Janus({
                server: this.janusServer,
                iceServers,
                token,
                success: () => {
                    // Attach to VideoRoom plugin
                    this.janus.attach({
                        plugin: "janus.plugin.videoroom",
                        opaqueId: (!this.room.roomAdminSecret) ? this.opaqueId : `${this.opaqueId}-${this.room.roomAdminSecret}`,
                        success: (pluginHandle) => {
                            Janus.log("Plugin attached! (" + pluginHandle.getPlugin() + ", id=" + pluginHandle.getId() + ")");
                            Janus.log("  -- This is a publisher/manager");
                            this.janusHandle = pluginHandle;
                            this.janusHandleHelper = new JanusHandleHelper_1.default(pluginHandle);
                            cb(null, pluginHandle);
                        },
                        error: (error) => {
                            Janus.error("  -- Error attaching plugin...", JSON.stringify(error));
                            cb(new Error("Error attaching plugin... " + JSON.stringify(error)));
                        },
                        consentDialog: (on) => {
                            Janus.debug("Consent dialog should be " + (on ? "on" : "off") + " now");
                        },
                        iceState: (state) => {
                            Janus.log("ICE state changed to " + state);
                        },
                        mediaState: (medium, on) => {
                            Janus.log("Janus " + (on ? "started" : "stopped") + " receiving our " + medium);
                        },
                        webrtcState: (on) => {
                            Janus.log("Janus says our WebRTC PeerConnection is " + (on ? "up" : "down") + " now");
                        },
                        onmessage: (msg, jsep) => {
                            Janus.debug(" ::: Got a message (publisher) :::", msg);
                            let event = msg["videoroom"];
                            Janus.debug("Event: " + event);
                            if (event) {
                                if (event === "joined") {
                                    // Publisher/manager created, negotiate WebRTC and attach to existing feeds, if any
                                    this.myid = msg["id"];
                                    this.mypvtid = msg["private_id"];
                                    Janus.log("Successfully joined room " + msg["room"] + " with ID " + this.myid);
                                    // this.publishOwnFeed(true);
                                    this.onJoinedEvent.trigger(msg);
                                    // Any new feed to attach to that is already in the room?
                                    if (msg["publishers"]) {
                                        let list = msg["publishers"];
                                        Janus.debug("Got a list of available publishers/feeds:", list);
                                        for (let f in list) {
                                            let publisher = new Feed_1.default(list[f]);
                                            this.newRemoteFeed(publisher);
                                        }
                                    }
                                    if (this.bitrateStatsEnabled) {
                                        this.showOutboundStats(5000);
                                    }
                                }
                                else if (event === "destroyed") {
                                    // The room has been destroyed
                                    Janus.warn("The room has been destroyed!");
                                    this.onDestroyedEvent.trigger(msg);
                                }
                                else if (event === "event") {
                                    // Any new feed to attach to (new publisher)
                                    if (msg["publishers"]) {
                                        let list = msg["publishers"];
                                        Janus.log("Got a list of available publishers/feeds:", list);
                                        for (let f in list) {
                                            let publisher = new Feed_1.default(list[f]);
                                            Janus.debug("  >> [" + publisher.id + "] " + publisher.display + " (audio: " + publisher.audio_codec + ", video: " + publisher.video_codec + ")");
                                            this.newRemoteFeed(publisher);
                                            this.onPublisherPublished.trigger(publisher);
                                        }
                                    }
                                    else if (msg["leaving"]) {
                                        // One of the participants left completely (includes viewer only too)
                                        let leaving = msg["leaving"];
                                        Janus.log("Participant/Publisher left: " + leaving);
                                        let [remoteFeed] = this.feeds.filter(feed => (feed.isRemote && feed.id === leaving));
                                        if (remoteFeed) {
                                            Janus.log("Feed " + remoteFeed.id + " (" + remoteFeed.display + ") has left the room, detaching (leaving)");
                                            this.feeds = this.feeds.filter(feed => (feed.rfindex !== remoteFeed.rfindex));
                                            remoteFeed.janusPluginHandle.detach({});
                                        }
                                    }
                                    else if (msg["unpublished"]) {
                                        // One of the publishers (media sender) has unpublished
                                        let unpublished = msg["unpublished"];
                                        Janus.log("Publisher unpublished: " + unpublished);
                                        if (unpublished === 'ok') {
                                            // That's us
                                            this.janusHandle.hangup();
                                            return;
                                        }
                                        let [remoteFeed] = this.feeds.filter(feed => (feed.isRemote && feed.id === unpublished));
                                        if (remoteFeed) {
                                            Janus.log("Feed " + remoteFeed.id + " (" + remoteFeed.display + ") has left the room, detaching (unpublishing)");
                                            this.onPublisherUnpublished.trigger(remoteFeed);
                                            this.feeds = this.feeds.filter(feed => (feed.rfindex !== remoteFeed.rfindex));
                                            remoteFeed.janusPluginHandle.detach({});
                                        }
                                    }
                                    else if (msg["error"]) {
                                        if (msg["error_code"] === 426) {
                                            // This is a "no such room" error: give a more meaningful description
                                            console.log("<p>Apparently room <code>" + this.room.roomId +
                                                "does not exist...</p><p>Do you have an updated <code>janus.plugin.videoroom.jcfg</code> " +
                                                "configuration file? If not, make sure you copy the details of room <code>" + this.room.roomId + "</code> " +
                                                "from that sample in your current configuration file, then restart Janus and try again.");
                                        }
                                        else {
                                            console.log(msg["error"]);
                                        }
                                    }
                                }
                            }
                            if (jsep) {
                                let mystream = this.mystream;
                                Janus.debug("Handling SDP as well...", jsep);
                                this.janusHandle.handleRemoteJsep({ jsep: jsep });
                                // Check if any of the media we wanted to publish has
                                // been rejected (e.g., wrong or unsupported codec)
                                let audio = msg["audio_codec"];
                                if (mystream && mystream.getAudioTracks() && mystream.getAudioTracks().length > 0 && !audio) {
                                    // Audio has been rejected
                                    console.error("Our audio stream has been rejected, viewers won't hear us");
                                }
                                let video = msg["video_codec"];
                                if (mystream && mystream.getVideoTracks() && mystream.getVideoTracks().length > 0 && !video) {
                                    // Video has been rejected
                                    console.error("Our video stream has been rejected, viewers won't see us");
                                    // Hide the webcam video
                                    let videoElemIdEle = document.getElementById(this.videoElemId);
                                    if (videoElemIdEle)
                                        videoElemIdEle.style.display = 'none';
                                    const item = document.getElementById(this.videoContainerDivId);
                                    let newItem = document.createElement('div');
                                    newItem.innerHTML = '<div class="no-video-container">' +
                                        '<i class="fa fa-video-camera fa-5 no-video-icon" style="height: 100%;"></i>' +
                                        '<span class="no-video-text" style="font-size: 16px;">Video rejected, no webcam</span>' +
                                        '</div>';
                                    if (item && item.parentNode)
                                        item.parentNode.replaceChild(newItem, item);
                                }
                            }
                        },
                        onlocalstream: (stream) => {
                            Janus.debug(" ::: Got a local stream :::", stream);
                            this.mystream = stream;
                            this.onLocalStream.trigger({ stream: stream });
                            let myvideoDiv = document.getElementById(this.videoElemId);
                            if (!myvideoDiv) {
                                const videolocalDiv = document.querySelectorAll(`#${this.videoContainerDivId}`);
                                videolocalDiv[0].innerHTML = (this.showButtons) ? `
                    <video class="rounded centered" id=${this.videoElemId} disablePictureInPicture width="100%" height="100%" autoplay playsinline muted="muted"></video>
                    <div class="btn btn-warning btn-xs" id="audioMute" style="position: absolute; bottom: 0px; left: 0px; margin: 15px;">Mute</div>
                    <div class="btn btn-warning btn-xs" id="videoOnOff" style="position: absolute; bottom: 0px; left: 40%; margin: -20px -50px; margin-bottom: 15px;">Hide Video</div>`
                                    : `<video class="rounded centered" id=${this.videoElemId} disablePictureInPicture width="100%" height="100%" autoplay playsinline muted="muted"></video>`;
                                let unpublishEle = document.getElementById('unpublish');
                                if (unpublishEle)
                                    unpublishEle.onclick = this.unpublish;
                                let audioMuteEle = document.getElementById('audioMute');
                                if (audioMuteEle)
                                    audioMuteEle.onclick = this.toggleMute;
                                let videoOnOffEle = document.getElementById('videoOnOff');
                                if (videoOnOffEle)
                                    videoOnOffEle.onclick = this.toggleVideo;
                                // let reconnect = document.getElementById('reconnect');
                                // if(reconnect)reconnect.onclick = this.reconnect;
                            }
                            let publisherDivIdEle = document.getElementById(this.publisherDivId);
                            if (publisherDivIdEle)
                                publisherDivIdEle.classList.remove('hide');
                            const publisherDiv = document.getElementById(this.publisherDivId);
                            if (publisherDiv)
                                publisherDiv.value = this.myusername;
                            if (publisherDiv)
                                publisherDiv.style.display = "block";
                            Janus.attachMediaStream(document.getElementById(this.videoElemId), stream);
                            document.getElementById(this.videoElemId).muted = true;
                            if (this.janusHandle.webrtcStuff.pc.iceConnectionState !== "completed" &&
                                this.janusHandle.webrtcStuff.pc.iceConnectionState !== "connected") {
                                // console.log('publishing...')
                            }
                            let videoTracks = stream.getVideoTracks();
                            if (!videoTracks || videoTracks.length === 0) {
                                // No webcam
                                let videoElemIdEle = document.getElementById(this.videoElemId);
                                if (videoElemIdEle)
                                    videoElemIdEle.style.display = "none";
                                if (document.querySelectorAll(`#${this.videoContainerDivId} .no-video-container`).length === 0) {
                                    const vDiv = document.querySelectorAll(`#${this.videoContainerDivId}`);
                                    vDiv[0].innerHTML = (this.showButtons) ? (`
                        <div class="no-video-container">
                        <i class="fa fa-video-camera fa-5 no-video-icon"></i>
                        <span class="no-video-text">No webcam available</span>
                        </div>
                        <div class="btn btn-warning btn-xs" id="audioMute" style="position: absolute; bottom: 0px; left: 0px; margin: 15px;">Mute</div>`)
                                        : (`
                        <div class="no-video-container">
                        <i class="fa fa-video-camera fa-5 no-video-icon"></i>
                        <span class="no-video-text">No webcam available</span>
                        </div>`);
                                    let audioMuteEle = document.getElementById('audioMute');
                                    if (audioMuteEle)
                                        audioMuteEle.onclick = this.toggleMute;
                                    let unpublishEle = document.getElementById('unpublish');
                                    if (unpublishEle)
                                        unpublishEle.onclick = this.unpublish;
                                    let publishEle = document.getElementById('publish');
                                    if (publishEle)
                                        publishEle.onclick = () => this.publish((err, res) => {
                                            if (err)
                                                throw new Error(err);
                                        }, { audio: !this.janusHandle.isAudioMuted(), video: true });
                                    // let reconnectEle = document.getElementById('reconnect');
                                    // if(reconnectEle) reconnectEle.onclick = this.reconnect;
                                }
                            }
                            else {
                                // document.querySelector(`#${this.videoContainerDivId} .no-video-container`).setAttribute('class','');
                                let videoElemIdEle = document.getElementById(this.videoElemId);
                                if (videoElemIdEle) {
                                    videoElemIdEle.classList.remove('hide');
                                    videoElemIdEle.style.display = "block";
                                }
                                if (this.autoCapBandwidth) {
                                    this.autoAdapterVideo();
                                }
                            }
                        },
                        onremotestream: (stream) => {
                            // The publisher stream is sendonly, we don't expect anything here
                        },
                        slowLink: (state) => {
                            this.slowLinkTimes++;
                            if (!this.autoCapBandwidth)
                                return;
                            if (this.slowLinkTimes > Math.floor(this.slowLinkTimesThreshold / 4) && !this.autoCapped) {
                                this.autoCapped = true;
                                this.capBitrate(256000);
                            }
                            else if (this.slowLinkTimes > this.slowLinkTimesThreshold && !this.janusHandle.isVideoMuted()) {
                                this.toggleVideo();
                                this.videoOffOptimization.trigger();
                            }
                        },
                        oncleanup: () => {
                            Janus.log(" ::: Got a cleanup notification: we are unpublished now :::");
                            if (this.reconnecting) {
                                console.log('Reconnecting :: Trying to publish...');
                                if (this.republished === false) {
                                    this.publish((err, res) => {
                                        if (err) {
                                            console.error('Reconnecting :: Error while trying to reconnect:', err);
                                        }
                                        this.reconnecting = false;
                                        this.republished = false;
                                    }, this.mediaConstraints);
                                }
                                this.republished = true;
                            }
                            else {
                                this.mystream = null;
                                this.onLocalDisconnection.trigger();
                                // $("#videolocal").parent().parent().unblock();
                            }
                        }
                    });
                },
                error: (error) => {
                    Janus.error("  -- Error starting janus instantiation...", error);
                    this.reconnectHelper(this.reconnectTimeout, 2, cb, error);
                },
                destroyed: () => {
                    Janus.log("  -- Destroyed janus instantiation...");
                    this.feeds = [];
                    // window.location.reload();
                }
            });
        };
        /**
         * Reconnect helper with recursive timeout backoff
         *
         * @param reconnectionTimeout - Timout before the first reconnection
         * @param times - Times to try to reconnect
         * @param cb
         * @param errMsg
         */
        reconnectHelper = (reconnectionTimeout, times, cb, errMsg) => {
            Janus.log(`  -- Trying to reconnect in ${Math.floor(reconnectionTimeout / 1000)}sec...`);
            if (times > 0) {
                times--;
                window.setTimeout(() => {
                    this.janus.reconnect({
                        success: () => {
                            Janus.log("Session successfully reclaimed:", this.janus.getSessionId());
                            cb(null, this.janusHandle);
                        },
                        error: (err) => {
                            Janus.error("Failed to reconnect:", err);
                            this.reconnectHelper(2 * reconnectionTimeout, times, cb, errMsg);
                        }
                    });
                }, reconnectionTimeout, cb);
            }
            else {
                cb(new Error("Error starting janus instantiation..." + errMsg));
            }
        };
        /**
         * Destroy and rejoin a new room
         *
         * @param roomId - room id
         */
        selfTransfer = (roomId) => {
            this.janus.destroy({
                success: () => {
                    this.start(roomId, (err, resHandle) => {
                        if (err) {
                            return console.error(err);
                        }
                        this.register(this.myusername, roomId, (err, res) => {
                            if (err) {
                                return console.error(`Registration error. ${err}`);
                            }
                            console.log(`Self transfer success! Registered to ${roomId}`);
                        });
                    });
                },
                error: (error) => {
                    Janus.error("  -- Error destroying connection...", error);
                }
            });
        };
        /**
         * Process new remote publisher and subscribe to it
         *
         * @param feed - Feed object
         */
        newRemoteFeed = (feed) => {
            let remoteFeedHandle = null;
            let feedIndex = null;
            this.janus.attach({
                plugin: "janus.plugin.videoroom",
                opaqueId: this.opaqueId,
                success: (pluginHandle) => {
                    remoteFeedHandle = pluginHandle;
                    remoteFeedHandle.simulcastStarted = false;
                    Janus.log("Plugin attached! (" + remoteFeedHandle.getPlugin() + ", id=" + remoteFeedHandle.getId() + ")");
                    Janus.log(`  -- This is a subscriber for room ${this.room.roomId}`);
                    // We wait for the plugin to send us an offer
                    let subscribe = {
                        request: "join",
                        room: this.room.roomId,
                        ptype: "subscriber",
                        feed: feed.id,
                        private_id: this.mypvtid
                    };
                    // In case you don't want to receive audio, video or data, even if the
                    // publisher is sending them, set the 'offer_audio', 'offer_video' or
                    // 'offer_data' properties to false (they're true by default), e.g.:
                    // 		subscribe["offer_video"] = false;
                    // For example, if the publisher is VP8 and this is Safari, let's avoid video
                    if (Janus.webRTCAdapter.browserDetails.browser === "safari" &&
                        (feed.video_codec === "vp9" || (feed.video_codec === "vp8" && !Janus.safariVp8))) {
                        if (feed.video_codec)
                            feed.video_codec = feed.video_codec.toUpperCase();
                        console.log("Publisher is using " + feed.video_codec + ", but Safari doesn't support it: disabling video");
                        subscribe["offer_video"] = false;
                    }
                    remoteFeedHandle.videoCodec = feed.video_codec;
                    remoteFeedHandle.send({ message: subscribe });
                },
                error: (error) => {
                    Janus.error("  -- Error attaching plugin...", JSON.stringify(error));
                    console.error("Error attaching plugin... " + JSON.stringify(error));
                },
                onmessage: (msg, jsep) => {
                    Janus.debug(" ::: Got a message (subscriber) :::", msg);
                    let event = msg["videoroom"];
                    Janus.debug("Event: " + event);
                    if (msg["error"]) {
                        console.error(msg["error"]);
                    }
                    else if (event) {
                        if (event === "attached") {
                            // Subscriber created and attached
                            this.feeds.push(feed);
                            feedIndex = this.feeds.indexOf(feed);
                            this.feeds[feedIndex].janusPluginHandle = remoteFeedHandle;
                            this.feeds[feedIndex].rfindex = feedIndex;
                            this.feeds[feedIndex].isRemote = true;
                            Janus.log("Successfully attached to feed " + this.feeds[feedIndex].id + " (" + this.feeds[feedIndex].display + ") in room " + msg["room"]);
                            const feedElem = document.getElementById(`remote${feedIndex}`);
                            if (feedElem)
                                feedElem.classList.remove('hide');
                            if (feedElem)
                                feedElem.innerHTML = this.feeds[feedIndex].display;
                        }
                        else if (event === "event") {
                            // Check if we got a simulcast-related event from this publisher
                            let substream = msg["substream"];
                            let temporal = msg["temporal"];
                            if ((substream !== null && substream !== undefined) || (temporal !== null && temporal !== undefined)) {
                                // TODO handle simulcast conf
                                // if(!remoteFeedHandle.simulcastStarted) {
                                // 		remoteFeedHandle.simulcastStarted = true;
                                // 		// Add some new buttons
                                // 		addSimulcastButtons(remoteFeedHandle.rfindex, remoteFeedHandle.videoCodec === "vp8" || remoteFeedHandle.videoCodec === "h264");
                                // }
                                // // We just received notice that there's been a switch, update the buttons
                                // updateSimulcastButtons(remoteFeedHandle.rfindex, substream, temporal);
                            }
                        }
                        else {
                            // What has just happened?
                        }
                    }
                    if (jsep) {
                        Janus.debug("Handling SDP as well...", jsep);
                        // Answer and attach
                        remoteFeedHandle.createAnswer({
                            jsep: jsep,
                            media: { audioSend: false, videoSend: false, data: true },
                            success: (jsep) => {
                                Janus.debug("Got SDP!", jsep);
                                let body = { request: "start", room: this.room.roomId };
                                remoteFeedHandle.send({ message: body, jsep: jsep });
                            },
                            error: (error) => {
                                Janus.error("WebRTC error:", error);
                                console.error("WebRTC error... " + error.message);
                            }
                        });
                    }
                },
                iceState: (state) => {
                    Janus.log("ICE state of this WebRTC PeerConnection (feed #" + feedIndex + ") changed to " + state);
                },
                webrtcState: (on) => {
                    Janus.log("Janus says this WebRTC PeerConnection (feed #" + feedIndex + ") is " + (on ? "up" : "down") + " now");
                },
                onlocalstream: (stream) => {
                    // The subscriber stream is recvonly, we don't expect anything here
                },
                onremotestream: (stream) => {
                    Janus.debug("Remote feed #" + this.feeds[feedIndex].rfindex + ", stream:", stream);
                    this.onRemoteStream.trigger({ stream: stream, rfindex: this.feeds[feedIndex].rfindex });
                    if (this.bitrateStatsEnabled) {
                        const feedDivStat = document.getElementById(`bitrateIn${feedIndex}`);
                        if (feedDivStat)
                            this.showInboundStats(feedDivStat, this.feeds[feedIndex].janusPluginHandle);
                    }
                },
                ondata: (data) => {
                    const json = JSON.parse(data);
                    const command = json.command;
                    const receiver = json.dest;
                    if (!this.acceptCommands || receiver !== this.myid) {
                        return;
                    }
                    const newRoomId = command.transferTo;
                    if (newRoomId) {
                        this.selfTransfer(newRoomId);
                    }
                    else {
                        console.error('Unknown command: ' + command);
                    }
                },
                oncleanup: () => {
                    Janus.log(" ::: Got a cleanup notification (remote feed " + feedIndex + ") :::");
                    if (Number.isInteger(feedIndex))
                        this.onRemoteDisconnection.trigger(feedIndex);
                    remoteFeedHandle.simulcastStarted = false;
                    // document.querySelector('#simulcast'+remoteFeedHandle.rfindex).remove();
                }
            });
        };
        /**
         * Time interval to automatically adapt video.
         * Turns On video back and disables the bitrate cap if we didn't reach the threshold in the specified interval
         *
         * @param interval - number in milisecons
         */
        autoAdapterVideo = (interval) => {
            window.setInterval(() => {
                if (this.slowLinkTimes < this.slowLinkTimesThreshold) {
                    if (this.janusHandle.isVideoMuted() && this.autoCapped)
                        this.toggleVideo();
                    if (this.autoCapped) {
                        this.capBitrate(0);
                        this.autoCapped = false;
                    }
                }
                this.slowLinkTimes = 0;
            }, interval || 16000);
        };
        /**
         * Helper for show outbound stats
         *
         * @param interval - number in milisecons
         */
        showOutboundStats = (interval) => {
            let bitrateDivOut = document.getElementById('bitrateOut');
            window.setInterval(() => {
                if (this.janusHandle.webrtcStuff.pc) {
                    this.janusHandle.webrtcStuff.pc.getStats(null)
                        .then(stats => this.showOutboundStatsHelper(bitrateDivOut, stats), err => console.log(err));
                }
                else {
                    console.log('Outbound stream not connected to janus yet');
                    if (bitrateDivOut && bitrateDivOut.innerText) {
                        bitrateDivOut.innerHTML = `Bitrate: 0 kbits/sec`;
                    }
                }
            }, interval || 5000, bitrateDivOut);
        };
        /**
         * Show outbound stats in div element
         *
         * @param div - HTMLElement to display in
         * @param interval - number in milisecons
         */
        showOutboundStatsHelper = (div, results) => {
            results.forEach(report => {
                const now = report.timestamp;
                let bitrate;
                if (report.type === 'outbound-rtp' && report.mediaType === 'video' && !this.janusHandle.isVideoMuted()) {
                    const bytes = report.bytesSent;
                    if (this.prevStat.type === 'video' && this.prevStat.time) {
                        bitrate = 8 * (bytes - this.prevStat.bytes) / (now - this.prevStat.time);
                        bitrate = Math.floor(bitrate);
                    }
                    this.prevStat.type = 'video';
                    this.prevStat.bytes = bytes;
                    this.prevStat.time = now;
                }
                else if (report.type === 'outbound-rtp' && report.mediaType === 'audio' && this.janusHandle.isVideoMuted()) {
                    const audioBytes = report.bytesSent;
                    if (this.prevStat.type === 'audio' && this.prevStat.time) {
                        bitrate = 8 * (audioBytes - this.prevStat.bytes) / (now - this.prevStat.time);
                        bitrate = Math.floor(bitrate);
                    }
                    this.prevStat.type = 'audio';
                    this.prevStat.bytes = audioBytes;
                    this.prevStat.time = now;
                }
                if (bitrate >= 0) {
                    bitrate += ' kbits/sec';
                    if (div)
                        div.innerHTML = `Bitrate: ${bitrate}`;
                }
                else if (bitrate === 0) {
                    if (div)
                        div.innerHTML = `Bitrate: 0 kbits/sec`;
                }
            });
        };
        /**
         * Show inbound stats in div element
         *
         * @param div - HTMLElement to display in
         * @param feedHandle - subscriber handle to get stats from
         * @param interval - number in milisecons
         */
        showInboundStats = (div, feedHandle, interval) => {
            const feed = this.feeds[div.id.slice(div.id.length - 1)];
            if (Number.isInteger(feed.intervalId))
                return;
            const newFeedHandle = feedHandle;
            this.feeds[div.id.slice(div.id.length - 1)].intervalId = window.setInterval((div, feedHandle, feed) => {
                if (feedHandle.webrtcStuff.pc && ['new', 'connecting', 'connected',].includes(feedHandle.webrtcStuff.pc.connectionState)) {
                    let bitrate = feedHandle.getBitrate();
                    if (bitrate) {
                        div.innerHTML = `Bitrate: ${bitrate}`;
                    }
                    else if (bitrate === 0) {
                        div.innerHTML = `Bitrate: 0 kbits/sec`;
                    }
                }
                else {
                    clearInterval(feed.intervalId);
                    if (div.innerText) {
                        div.innerHTML = ``;
                    }
                }
            }, interval || 5000, div, newFeedHandle, feed);
        };
        /**
         * Helper method to clean UI after successful recconnection using new device/s
         *
         * @param err - Error
         * @param res - Response
         */
        cleanRestartDeviceCapture = (err, res) => {
            if (err) {
                throw new Error(`Restart connection with new device failed: ${JSON.stringify(err)}`);
            }
            document.querySelectorAll('#audio-device, #video-device, #change-devices').forEach(element => {
                element.removeAttribute('disabled');
            });
            if (this.manuallyMutedAudio && res.modifiedAudio) {
                this.toggleMute();
            }
            if (this.manuallyMutedVideo && res.modifiedVideo) {
                this.toggleVideo();
            }
        };
        /**
         * Helper method that reconnect stream
         */
        reconnect = (mediaConstraints) => {
            console.log('Reconnecting :: Unpublishing...');
            this.mediaConstraints = mediaConstraints;
            this.reconnecting = true;
            this.unpublish();
        };
    }
    exports.default = JanusWrapper;
});
