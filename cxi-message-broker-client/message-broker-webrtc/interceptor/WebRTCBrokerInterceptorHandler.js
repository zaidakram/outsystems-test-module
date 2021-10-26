define(["require", "exports", "./../janus/JanusHandler", "./../client/RegistrationHolder"], function (require, exports, JanusHandler_1, RegistrationHolder_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.WebRTCBrokerInterceptorHandler = void 0;
    class WebRTCBrokerInterceptorHandler {
        roomDetails = new Map();
        static instance;
        constructor() { }
        static getInstance() {
            if (!WebRTCBrokerInterceptorHandler.instance) {
                WebRTCBrokerInterceptorHandler.instance = new WebRTCBrokerInterceptorHandler();
            }
            return WebRTCBrokerInterceptorHandler.instance;
        }
        saveRoomDetailsIfNotExists({ roomId, token, roomName, interactionId, mediaConstraints }) {
            if (!this.roomDetails.has(interactionId)) {
                this.roomDetails.set(interactionId, { roomId, token, roomName, interactionId, mediaConstraints });
            }
            else {
                console.log('[WebRTCBrokerInterceptorHandler], room details already found for interaction<' + interactionId +
                    '> , previouse details ' + JSON.stringify(this.roomDetails.get(interactionId)) +
                    ' , current details ' + JSON.stringify({ roomId, token, roomName, interactionId }) + ' ');
            }
        }
        handleRoomCreation({ roomId, token, roomName, interactionId, mediaConstraints, preRecordedMediaUrl, bitrateCap }) {
            console.log('[WebRTCBrokerInterceptorHandler], handleRoomCreation', roomId, token, roomName, interactionId);
            RegistrationHolder_1.RegistrationHolder.setMaxBitRate(bitrateCap ? bitrateCap : 0);
            this.saveRoomDetailsIfNotExists({ roomId, token, roomName, interactionId, mediaConstraints });
            JanusHandler_1.JanusHandler.getInstance().registerUsername(interactionId, roomId, mediaConstraints, preRecordedMediaUrl);
        }
        handleSessionClose() {
            JanusHandler_1.JanusHandler.getInstance().destroy();
        }
    }
    exports.WebRTCBrokerInterceptorHandler = WebRTCBrokerInterceptorHandler;
});
