/** Unless otherwise licensed, the software is our proprietary property and all source code, database,
* functionality, website design, audio, video, text, photographs and graphics on the site or the product (
* collectively, the “Content”) and the trademarks, service marks, and logos contained therein ( the
* “Marks”) are owned or controlled by us or licenses to us, and are protected by the copyright and
* trademark laws and various other intellectual property rights and unfair competition laws in domestic as
* well as in foreign jurisdictions and international conventions.
*/
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
define(["require", "exports", "./../client/RegistrationHolder", "./../client/rest/RecordingAuditTrailRestClient", "./JanusWrapper"], function (require, exports, RegistrationHolder_1, RecordingAuditTrailRestClient_1, JanusWrapper_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.JanusHandler = void 0;
    JanusWrapper_1 = __importDefault(JanusWrapper_1);
    // JanusJS is the namespace that declares the Janus typescript types
    // dispatcher server
    //const server = 'https://www.dev.cxinfinity.novelvox.net/janus-dispatcher';
    const r = /:\/\/(.[^/]+)/;
    //disablePictureInPicture
    let janus;
    const janusInitData = { username: 'admin', password: 'supersecret' };
    let mediaConstraints;
    class JanusHandler {
        preRecordedMessageUrl;
        server = '';
        static instance;
        static getInstance() {
            if (!JanusHandler.instance)
                throw new Error('Janus Handler Not initialized');
            return JanusHandler.instance;
        }
        static initialize(clientId, signallingServerUrl, showButtons) {
            if (!JanusHandler.instance)
                JanusHandler.instance = new JanusHandler(clientId, signallingServerUrl, janusInitData, showButtons);
            else
                console.log('[JanusHandler] already initialized ');
            return JanusHandler.instance;
        }
        brokerInterceptor;
        setBorkerInterceptor(brokerInterceptor) {
            this.brokerInterceptor = brokerInterceptor;
        }
        clientId = 'Customer';
        setClientId(clientId) {
            this.clientId = clientId;
        }
        constructDispatcherUrl(url) {
            try {
                let matcher = url.match(r);
                if (matcher && matcher[1]) {
                    return "https://" + matcher[1] + "/janus-dispatcher";
                }
            }
            catch (error) {
                console.error('[ConstructDispatcherUrl] :Error :', error);
            }
            throw new Error('no match found to construct dispatcher url');
        }
        constructRecordingUrl(url) {
            try {
                let matcher = url.match(r);
                if (matcher && matcher[1]) {
                    return "https://" + matcher[1] + "/cx-interaction/recording/trail";
                }
            }
            catch (error) {
                console.error('[ConstructDispatcherUrl] :Error :', error);
            }
            throw new Error('no match found to construct dispatcher url');
        }
        signallingServerUrl;
        activeInteractionId;
        activeRoomId;
        constructor(clientId, signallingServerUrl, { username, password }, showButtons = true) {
            this.clientId = clientId;
            let acceptCommands = true;
            let bitrateStatsEnabled = false;
            let autoCapBandwidth = true;
            this.signallingServerUrl = signallingServerUrl;
            this.server = this.constructDispatcherUrl(signallingServerUrl);
            console.info('[Janus Handler], Constructed Dispatcher Url: ' + this.server);
            janus = new JanusWrapper_1.default({
                username, password, dispatcherServer: this.server, localVideoContainerDivId: 'videolocal',
                videoElemId: 'myvideo', publisherDivId: 'publisher', acceptCommands,
                bitrateStatsEnabled, showButtons, autoCapBandwidth
            });
            janus.init({
                debug: "all",
                callback: this.janusInitCallback
            });
        }
        checkServerState() {
            fetch(this.server + '/alive').then(function (res) {
                //console.log('[JanusHandler] Janus dispatcher is Up');
            }).catch(function (err) {
                console.log('[JanusHandler] Janus dispatcher is Down');
            });
        }
        playPreRecorded() {
            const vRemoteContainerElem = document.getElementById(`videoremote0`);
            if (vRemoteContainerElem)
                vRemoteContainerElem.innerHTML = `
           <video class="rounded centered" id="waitingvideo" disablePictureInPicture width="100%" height="100%" autoplay loop src="${this.preRecordedMessageUrl}"></video>`;
        }
        setVisibility(visibility) {
            var cxiVideoContainer = document.getElementById('cxi-media-container');
            if (cxiVideoContainer)
                cxiVideoContainer.style.visibility = visibility;
            else
                console.log('No Audio/Video Div Container {id:cxi-media-container} found');
            var videolocalEle = document.getElementById('videolocal');
            if (videolocalEle)
                videolocalEle.style.visibility = visibility;
            var videoremote0 = document.getElementById('videoremote0');
            if (videoremote0)
                videoremote0.style.visibility = visibility;
            if (visibility == 'hidden') {
                const waitingV = document.getElementById('waitingvideo');
                if (waitingV)
                    waitingV.remove();
            }
        }
        onLocalParticipentsRoomJoined = (e) => {
            if (!e)
                return;
            let { publishers } = e;
            console.log("Joined/Registered to room", e);
            this.setVisibility('visible');
            // play pre-recorded sound if no other user in the room
            if (publishers.length === 0) {
                this.playPreRecorded();
            }
            // Display and allow media device selection
            janus.initDeviceSelection({ audio: true, video: true });
            janus.publish(function publishStreamCallback(err, res) {
                if (err) {
                    return console.error(err);
                }
            }, mediaConstraints);
        };
        onLocalStreamStarted = (obj) => {
            console.log('[Janus] onLocalStreamStarted');
            if (this.brokerInterceptor && this.brokerInterceptor.onLocalStreamStarted) {
                this.brokerInterceptor.onLocalStreamStarted();
                this.capBitrate(RegistrationHolder_1.RegistrationHolder.getMaxBitRate());
            }
        };
        getJanusServerHost() {
            return janus.getJanusServerHost();
        }
        onPublisherPublished = (obj) => {
            console.log('[Janus] onPublisherPublished ', obj);
            try {
                if (obj) {
                    let display = obj['display'];
                    let janusClientId = obj['id'];
                    let audioCodec = obj['audio_codec'];
                    let videoCodec = obj['video_codec'];
                    RecordingAuditTrailRestClient_1.RecordingAuditTrailRestClient.record(this.constructRecordingUrl(this.signallingServerUrl), this.activeInteractionId, this.activeRoomId, {
                        display,
                        janusClientId,
                        audioCodec,
                        videoCodec,
                        recording: mediaConstraints.record,
                        janusServerHost: janus.getJanusServerHost()
                    });
                }
            }
            catch (error) {
                console.error(error);
            }
        };
        onRemoteStreamStarted = (obj) => {
            try {
                console.log('[Janus] onRemoteStreamStarted');
                const stream = obj.stream;
                const rfindex = obj.rfindex;
                let remoteVideoElem = document.getElementById(`remotevideo${rfindex}`);
                let vRemoteContainerElem = document.getElementById(`videoremote${rfindex}`);
                if (!remoteVideoElem && vRemoteContainerElem) {
                    // No remote video yet
                    vRemoteContainerElem.innerHTML = `
          <video class="rounded centered" disablePictureInPicture id="waitingvideo${rfindex}" width="100%" height="100%"></video>
          <video class="rounded centered relative hide" disablePictureInPicture id="remotevideo${rfindex}" width="100%" height="100%" autoplay playsinline></video>`;
                    remoteVideoElem = document.getElementById(`remotevideo${rfindex}`);
                    if (remoteVideoElem) {
                        remoteVideoElem.onplaying = () => {
                            const waitingV = document.getElementById(`waitingvideo${rfindex}`);
                            if (waitingV)
                                waitingV.remove();
                        };
                    }
                }
                // attach a stream to a video element
                janus.attachMediaStream(remoteVideoElem, stream);
                var videoTracks = stream.getVideoTracks();
                if (!videoTracks || videoTracks.length === 0) {
                    // No remote video
                    if (remoteVideoElem)
                        remoteVideoElem.hidden;
                }
                else {
                    document.querySelectorAll('#videoremote' + rfindex + ' .no-video-container').forEach(el => {
                        el.remove();
                    });
                    if (remoteVideoElem)
                        remoteVideoElem.classList.remove('hide');
                }
            }
            catch (error) {
                console.error(error);
            }
            try {
                if (this.brokerInterceptor && this.brokerInterceptor.onRemoteStreamStarted) {
                    this.brokerInterceptor.onRemoteStreamStarted();
                }
            }
            catch (error) {
                console.error(error);
            }
        };
        janusInitCallback = () => {
            console.log('[JanusHandler janusInitCallback]');
            this.checkServerState();
            if (!janus.isWebrtcSupported()) {
                console.log("No WebRTC support... ");
                return;
            }
            // Our local participant joined/registered to the room. Here we can decide if directly publishing our local media stream
            janus.joinedEvt.on(this.onLocalParticipentsRoomJoined);
            janus.destroyedEvt.on((e) => {
                console.log('The room has been destroyed');
                this.setVisibility('hidden');
                // this.destroy();
            });
            // Local stream available. Here we will decide what happens once our local video is available
            janus.localStreamStartedEvt.on(this.onLocalStreamStarted);
            // Remote media stream available. Here we will decide where, when and how to display this new participant stream
            janus.remoteStreamStartedEvt.on(this.onRemoteStreamStarted);
            // A publisher joined the room
            janus.publisherPublishedEvt.on(this.onPublisherPublished);
            // A publisher stopped publishing. Here we typically handle the change of display when the participant is not publishing
            janus.publisherUnpublishedEvt.on(function (publisher) {
                if (!publisher) {
                    return;
                }
                console.log('Publisher unpublished:', publisher);
                let remoteDivEle = document.getElementById(`remote${publisher.rfindex}`);
                if (remoteDivEle)
                    remoteDivEle.classList.add('hide');
                let remoteVideoContainer = document.getElementById(`videoremote${publisher.rfindex}`);
                if (remoteVideoContainer)
                    while (remoteVideoContainer.firstChild)
                        remoteVideoContainer.removeChild(remoteVideoContainer.firstChild);
            });
            // We successfully disconnected from a room and ended the call. Here we restart our initial buttons to be able to publish again
            janus.localDisconnectionEvt.on(() => {
                try {
                    if (this.brokerInterceptor && this.brokerInterceptor.onLocalStreamDisconnected) {
                        this.brokerInterceptor.onLocalStreamDisconnected();
                    }
                }
                catch (error) {
                    console.error(error);
                }
            });
            // A remote participant totally left the room. Here we handle the cleanup of the remote participant (usually happens after a user unpublished)
            janus.remoteDisconnectionEvt.on((feedIndex) => {
                try {
                    if (feedIndex !== null) {
                        let remoteVideoContainer = document.getElementById(`videoremote${feedIndex}`);
                        if (remoteVideoContainer)
                            while (remoteVideoContainer.firstChild)
                                remoteVideoContainer.removeChild(remoteVideoContainer.firstChild);
                    }
                    if (janus.feeds.length === 0) {
                        var videoremote0 = document.getElementById('videoremote0');
                        if (videoremote0 && videoremote0.style.visibility == 'visible') {
                            this.playPreRecorded();
                        }
                    }
                }
                catch (error) {
                    console.error(error);
                }
                try {
                    if (this.brokerInterceptor && this.brokerInterceptor.onRemoteStreamDisconnected) {
                        this.brokerInterceptor.onRemoteStreamDisconnected();
                    }
                }
                catch (error) {
                    console.error(error);
                }
            });
            // Handle the event of video turn off due to a slow link, here we display the modal
            janus.videoOffOptimizationEvt.on(function () {
                const infoModal = document.getElementById('infoModal');
                if (infoModal) {
                    infoModal.style.display = 'block';
                    setTimeout(function () {
                        infoModal.style.display = 'none';
                    }, 3000, infoModal);
                }
            });
            janus.recordingEvt.on(function (rec) {
                if (!rec)
                    return;
                let { started, selfOnly } = rec;
                if (selfOnly) {
                    let recordingSelfBtn = document.getElementById('recordingSelfBtn');
                    if (recordingSelfBtn)
                        recordingSelfBtn.innerText = started ? "Stop My Recording" : "Start My Recording";
                }
                else {
                    let recordingBtn = document.getElementById('recordingBtn');
                    if (recordingBtn)
                        recordingBtn.innerText = started ? "Stop Recording All" : "Start Recording All";
                }
            });
            console.log('[JanusHandler janusInitCallback DONE]');
        };
        publish() {
            janus.publish((err, res) => {
                if (err)
                    console.error(err);
            }, mediaConstraints);
        }
        unPublish() {
            janus.unpublish();
        }
        isJanusConnected() {
            if (janus && janus.isConnected()) {
                return true;
            }
            return false;
        }
        registerUsername(interactionId, roomId, constraints, preRecordedMediaUrl) {
            if (janus && janus.isConnected()) {
                console.log('[JanusHandler],registerUsername - janus already connected');
                return;
            }
            this.activeInteractionId = interactionId;
            this.activeRoomId = roomId;
            this.preRecordedMessageUrl = preRecordedMediaUrl;
            mediaConstraints = constraints;
            janus.start(roomId, (err, resHandle) => {
                if (err) {
                    return console.error(err);
                }
                janus.register(this.clientId, roomId, function (error, res) {
                    if (err) {
                        return console.error(`Registration error. ${error}`);
                    }
                });
            });
        }
        getMediaDevices(callback, config) {
            janus.getMediaDevices(callback, config);
        }
        restartCapture(audioDeviceId, videoDeviceId) {
            janus.restartCapture(audioDeviceId, videoDeviceId);
        }
        destroy() {
            if (janus && janus.isConnected()) {
                janus.detach();
                janus.destroy();
                console.log('[JanusHandler],destroy - janus destroyed');
                this.setVisibility('hidden');
            }
            else
                console.log('[JanusHandler],destroy - janus is not connected');
        }
        reconnect() {
            janus.reconnect(mediaConstraints);
        }
        toggleMute() {
            janus.toggleMute();
        }
        toggleVideo() {
            janus.toggleVideo();
        }
        isVideoMuted() {
            return janus.isVideoMuted();
        }
        isAudioMuted() {
            return janus.isAudioMuted();
        }
        capBitrate(bitrate) {
            janus.capBitrate(bitrate * 1000);
        }
    }
    exports.JanusHandler = JanusHandler;
});
