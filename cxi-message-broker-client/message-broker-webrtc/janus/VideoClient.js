define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    /** Unless otherwise licensed, the software is our proprietary property and all source code, database,
    * functionality, website design, audio, video, text, photographs and graphics on the site or the product (
    * collectively, the “Content”) and the trademarks, service marks, and logos contained therein ( the
    * “Marks”) are owned or controlled by us or licenses to us, and are protected by the copyright and
    * trademark laws and various other intellectual property rights and unfair competition laws in domestic as
    * well as in foreign jurisdictions and international conventions.
    */
    const Janus = require('./third-party/janus/janusBundle');
    class VideoClient {
        clientId;
        username;
        janusPluginHandle;
        roomId;
        audioDeviceId = null;
        videoDeviceId = null;
        constructor(pluginHandle, displayUsername, roomId) {
            this.janusPluginHandle = pluginHandle;
            if (displayUsername) {
                this.username = displayUsername;
            }
            if (roomId) {
                this.roomId = roomId;
            }
        }
        join(cb, displayUsername, roomId) {
            if (!roomId && !this.roomId) {
                return cb(new Error('missing room to join'));
            }
            const register = {
                request: "join",
                room: (roomId) ? roomId : this.roomId,
                ptype: "publisher",
                display: displayUsername || this.username
            };
            this.janusPluginHandle.send({
                message: register,
                success: (res) => {
                    cb(null, res);
                },
                error: (err) => {
                    cb(err);
                }
            });
        }
        publish(cb, useAudio, useVideo = true, record) {
            const janusHandle = this.janusPluginHandle;
            // const publishDiv = document.getElementById(publishDivId);
            janusHandle.createOffer({
                media: { audioRecv: false, videoRecv: false, audioSend: useAudio, videoSend: useVideo, data: true },
                // simulcast: doSimulcast,
                // simulcast2: doSimulcast2,
                success: (jsep) => {
                    Janus.debug("Got publisher SDP!", jsep);
                    var publish = { request: "configure", audio: useAudio, video: useVideo, record };
                    // You can force a specific codec to use when publishing by using the
                    // audiocodec and videocodec properties, for instance:
                    // 		publish["audiocodec"] = "opus"
                    // to force Opus as the audio codec to use, or:
                    // 		publish["videocodec"] = "vp9"
                    // to force VP9 as the videocodec to use. In both case, though, forcing
                    // a codec will only work if: (1) the codec is actually in the SDP (and
                    // so the browser supports it), and (2) the codec is in the list of
                    // allowed codecs in a room. With respect to the point (2) above,
                    // refer to the text in janus.plugin.videoroom.jcfg for more details
                    janusHandle.send({
                        message: publish,
                        jsep: jsep,
                        success: function (res) {
                            cb(null, res);
                        },
                        error: function (err) {
                            cb(err);
                        }
                    });
                },
                error: (error) => {
                    Janus.error("WebRTC error (publish):", error);
                    // todo below in event callback
                    // if (publishDiv){
                    //     publishDiv.classList.remove('disabled');
                    //     publishDiv.onclick = () => {
                    //         this.publish(true, publishDivId, useAudio);
                    //     };
                    // }
                    return cb(new Error(`WebRTC error: ${JSON.stringify(error)}`));
                }
            });
        }
        unpublish() {
            let unpublish = { request: "unpublish" };
            this.janusPluginHandle.send({ message: unpublish });
        }
        restartCapture = (cb, audioDeviceId, videoDeviceId) => {
            const janusHandle = this.janusPluginHandle;
            let body = { request: "configure", audio: true, video: true };
            Janus.debug("Sending message:", body);
            janusHandle.send({ message: body });
            Janus.debug("Trying a createOffer too (audio/video sendrecv)");
            let replaceAudio = audioDeviceId !== this.audioDeviceId;
            this.audioDeviceId = audioDeviceId;
            let replaceVideo = videoDeviceId !== this.videoDeviceId;
            this.videoDeviceId = videoDeviceId;
            janusHandle.createOffer({
                // We provide a specific device ID for both audio and video
                media: {
                    audio: {
                        deviceId: {
                            exact: this.audioDeviceId
                        }
                    },
                    replaceAudio: replaceAudio,
                    video: {
                        deviceId: {
                            exact: this.videoDeviceId
                        }
                    },
                    replaceVideo: replaceVideo,
                    data: true // Let's negotiate data channels as well
                },
                success: function (jsep) {
                    Janus.debug("Got SDP!", jsep);
                    janusHandle.send({ message: body, jsep: jsep });
                    cb(null, { modifiedAudio: replaceAudio, modifiedVideo: replaceVideo, jsep: jsep });
                },
                error: function (error) {
                    Janus.error("WebRTC error:", error);
                    cb(error);
                }
            });
        };
    }
    exports.default = VideoClient;
});
