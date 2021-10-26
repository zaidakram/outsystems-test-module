define(["require", "exports", "./../../message-broker/client/ClientTypes", "./../client/RegistrationHolder", "./WebRTCBrokerInterceptorHandler"], function (require, exports, ClientTypes_1, RegistrationHolder_1, WebRTCBrokerInterceptorHandler_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.WebRTCBrokerInterceptorImpl = void 0;
    class WebRTCBrokerInterceptorImpl {
        brokerInterceptor;
        webRtcClient;
        constructor(webRtcClient, brokerInterceptor) {
            this.brokerInterceptor = brokerInterceptor;
            this.webRtcClient = webRtcClient;
        }
        onMessage(message) {
            console.log('[WebRTCBrokerInterceptorImpl] onMessage:', message);
            switch (message.messageType) {
                case ClientTypes_1.MessageType.CALL_INITIATED:
                    {
                        let sessionId = message.data['sessionId'];
                        let interactionId = message.data['interactionId'];
                        let mediaConstraints = message.data['mediaConstraints'];
                        try {
                            this.brokerInterceptor.onCallInitiated(sessionId, interactionId, mediaConstraints);
                        }
                        catch (error) {
                            console.error('[CALL_INITIATED ] ,', error);
                        }
                    }
                    break;
                case ClientTypes_1.MessageType.REGISTERATION_DONE:
                    {
                        let interactionId = message.data['interactionId'];
                        let sessionId = message.data['sessionId'];
                        let channel = message.data['channel'];
                        if (channel == 'VIDEO' || channel == 'AUDIO') {
                            let mediaConstraints = RegistrationHolder_1.RegistrationHolder.getAvailableMediaConstrains();
                            this.webRtcClient.requestForRoomId(interactionId, sessionId, mediaConstraints);
                        }
                    }
                    break;
                case ClientTypes_1.MessageType.ON_ROOM_CREATED:
                    {
                        let { roomDetails: { roomInfo: { roomId, token, roomName }, mediaConstraints, bitrateCap }, interactionId, preRecordedMediaUrl, sessionId } = message.data;
                        WebRTCBrokerInterceptorHandler_1.WebRTCBrokerInterceptorHandler.getInstance().
                            handleRoomCreation({ roomId, token, roomName, interactionId, mediaConstraints, preRecordedMediaUrl, bitrateCap });
                        if (this.brokerInterceptor && this.brokerInterceptor.mediaSessionStarted)
                            this.brokerInterceptor.mediaSessionStarted(interactionId, sessionId, mediaConstraints, roomId);
                        else
                            console.warn('[MediaSessionStarted] method callback not provided');
                    }
                    break;
                case ClientTypes_1.MessageType.ON_ROOM_CREATION_FAILED:
                    {
                        let { interactionId, sessionId, reason } = message.data;
                        if (this.brokerInterceptor && this.brokerInterceptor.mediaSessionFailed)
                            this.brokerInterceptor.mediaSessionFailed(interactionId, sessionId, reason);
                        else
                            console.warn('[MediaSessionFailed] method callback not provided');
                    }
                    break;
                case ClientTypes_1.MessageType.ON_SESSION_CLOSE_REQUEST:
                    try {
                        WebRTCBrokerInterceptorHandler_1.WebRTCBrokerInterceptorHandler.getInstance().handleSessionClose();
                    }
                    catch (error) {
                        console.error('[ON_SESSION_CLOSE_REQUEST - handleSessionClose] ,', error);
                    }
                    break;
                case ClientTypes_1.MessageType.CONFIRMATION_ACCEPTED:
                    if (this.brokerInterceptor) {
                        let sessionId = message.data['sessionId'];
                        try {
                            this.brokerInterceptor.onCallAccepted(sessionId);
                        }
                        catch (error) {
                            console.error('[CONFIRMATION_ACCEPTED - handleSessionClose] ,', error);
                        }
                    }
                    break;
                case ClientTypes_1.MessageType.CONFIRMATION_REJECTED:
                    {
                        let sessionId = message.data['sessionId'];
                        let rejectedReason = message.data['rejectedReason'];
                        if (this.brokerInterceptor) {
                            this.brokerInterceptor.onCallRejected(sessionId, rejectedReason);
                        }
                        try {
                            WebRTCBrokerInterceptorHandler_1.WebRTCBrokerInterceptorHandler.getInstance().handleSessionClose();
                        }
                        catch (error) {
                            console.error('[CONFIRMATION_REJECTED - handleSessionClose] ,', error);
                        }
                    }
                    break;
                case ClientTypes_1.MessageType.END_CALL:
                    {
                        let sessionId = message.data['sessionId'];
                        try {
                            WebRTCBrokerInterceptorHandler_1.WebRTCBrokerInterceptorHandler.getInstance().handleSessionClose();
                            if (this.brokerInterceptor)
                                this.brokerInterceptor.onSessionClosed(sessionId);
                        }
                        catch (error) {
                            console.error('[END_CALL -onSessionClosed] ,', error);
                        }
                    }
                    break;
                default:
                    console.warn(' [' + message.messageType + '] not supported in WebRTCBrokerInterceptorImpl');
            }
        }
    }
    exports.WebRTCBrokerInterceptorImpl = WebRTCBrokerInterceptorImpl;
});
