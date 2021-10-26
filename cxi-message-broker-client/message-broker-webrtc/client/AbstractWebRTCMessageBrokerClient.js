define(["require", "exports", "./../interceptor/WebRTCBrokerInterceptorImpl", "./RegistrationHolder", "./../../message-broker/client/websocket/BrokerMessage", "./../../message-broker/client/ClientTypes", "./../janus/JanusHandler", "./../interceptor/WebRTCBrokerInterceptorHandler", "./rest/HoldAuditTrailRestClient"], function (require, exports, WebRTCBrokerInterceptorImpl_1, RegistrationHolder_1, BrokerMessage_1, ClientTypes_1, JanusHandler_1, WebRTCBrokerInterceptorHandler_1, HoldAuditTrailRestClient_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.AbstractWebRTCMessageBrokerClient = void 0;
    /**
     * @abstract class to create web-rtc client.
     * class is a wrapper of web-chat sdk @AbstractWSMessageBrokerClient
     *
     * invoke its constructor with @AbstractWSMessageBrokerClient and webrtc callback interface
     * (@see @BrokerInterceptor) and
     * @param showButtons(Optional), Default:true, If {true} Mute/UnMute Audio and Video buttons will be managed
     * by SDK and client could only change its css only, If {false} client could provide its own Mute/UnMute Audio and Video buttons
     * with its functionality.
     */
    class AbstractWebRTCMessageBrokerClient {
        brokerClient;
        constructor(brokerClient, brokerInterceptor, showButtons) {
            this.brokerClient = brokerClient;
            this.brokerClient.registerWebRTCBrokerInterceptor(new WebRTCBrokerInterceptorImpl_1.WebRTCBrokerInterceptorImpl(this, brokerInterceptor));
            JanusHandler_1.JanusHandler.initialize(brokerClient.getClientId(), brokerClient.loadUpConf.fullyQualifiedURL, showButtons)
                .setBorkerInterceptor(brokerInterceptor);
            HoldAuditTrailRestClient_1.HoldAuditTrailRestClient.initializeRestUrl(brokerClient.loadUpConf.fullyQualifiedURL);
        }
        reconnect() {
            JanusHandler_1.JanusHandler.getInstance().reconnect();
        }
        endSession(sessionId) {
            WebRTCBrokerInterceptorHandler_1.WebRTCBrokerInterceptorHandler.getInstance().handleSessionClose();
            this.brokerClient.closeSession(sessionId);
        }
        registerCall(template, options) {
            template.interactionType = 'MEDIA';
            template.interactionSubType = options.mediaConstraints.video ? 'VIDEO' : 'AUDIO';
            template.channel = options.mediaConstraints.video ? 'VIDEO' : 'AUDIO';
            RegistrationHolder_1.RegistrationHolder.saveRegistration('Default', options);
            this.brokerClient.registerNewReqToBroker(template);
        }
        requestForRoomId(interactionId, sessionId, mediaConstraints) {
            let data = new BrokerMessage_1.BrokerMessage(ClientTypes_1.BrokerTypes.WEB_RTC, interactionId, ClientTypes_1.MessageType.ROOM_ID_REQUESTED, { interactionId, sessionId, mediaConstraints });
            this.brokerClient.sendMessageToBroker(data);
        }
        initiateCall(sessionId, interactionId, sender, options) {
            console.log('Initiating call for existing session');
            RegistrationHolder_1.RegistrationHolder.saveRegistration('Default', options);
            this.requestForRoomId(interactionId, sessionId, options.mediaConstraints);
            let data = new BrokerMessage_1.BrokerMessage(ClientTypes_1.BrokerTypes.WEB_RTC, sender, ClientTypes_1.MessageType.CALL_INITIATED, { interactionId, sessionId, mediaConstraints: options.mediaConstraints });
            this.brokerClient.sendMessageToBroker(data);
        }
        confirmationAccepted(sessionId, interactionId, sender) {
            let data = new BrokerMessage_1.BrokerMessage(ClientTypes_1.BrokerTypes.WEB_RTC, sender, ClientTypes_1.MessageType.CONFIRMATION_ACCEPTED, { interactionId, sessionId });
            this.brokerClient.sendMessageToBroker(data);
        }
        confirmationRejected(sessionId, interactionId, sender) {
            let data = new BrokerMessage_1.BrokerMessage(ClientTypes_1.BrokerTypes.WEB_RTC, sender, ClientTypes_1.MessageType.CONFIRMATION_REJECTED, { interactionId, sessionId });
            this.brokerClient.sendMessageToBroker(data);
        }
        endCall(sessionId, interactionId, sender) {
            WebRTCBrokerInterceptorHandler_1.WebRTCBrokerInterceptorHandler.getInstance().handleSessionClose();
            let data = new BrokerMessage_1.BrokerMessage(ClientTypes_1.BrokerTypes.WEB_RTC, sender, ClientTypes_1.MessageType.END_CALL, { interactionId, sessionId });
            this.brokerClient.sendMessageToBroker(data);
        }
        isMediaCallActive() {
            return JanusHandler_1.JanusHandler.getInstance().isJanusConnected();
        }
        toggleMute() {
            JanusHandler_1.JanusHandler.getInstance().toggleMute();
        }
        toggleVideo() {
            JanusHandler_1.JanusHandler.getInstance().toggleVideo();
        }
        isVideoMuted() {
            return JanusHandler_1.JanusHandler.getInstance().isVideoMuted();
        }
        isAudioMuted() {
            return JanusHandler_1.JanusHandler.getInstance().isAudioMuted();
        }
        getMediaDevices(callback) {
            JanusHandler_1.JanusHandler.getInstance().getMediaDevices(callback);
        }
        restartCapture(audioDeviceId, videoDeviceId) {
            JanusHandler_1.JanusHandler.getInstance().restartCapture(audioDeviceId, videoDeviceId);
        }
        publish(tenantId, clientId, interactionId) {
            return HoldAuditTrailRestClient_1.HoldAuditTrailRestClient.recordUnHoldAction(tenantId, clientId, interactionId);
        }
        unPublish(tenantId, clientId, interactionId) {
            return HoldAuditTrailRestClient_1.HoldAuditTrailRestClient.recordHoldAction(tenantId, clientId, interactionId);
        }
        destroy() {
            JanusHandler_1.JanusHandler.getInstance().destroy();
        }
        capBitrate(bitrate) {
            JanusHandler_1.JanusHandler.getInstance().capBitrate(bitrate);
        }
        getJanusServerHost() {
            return JanusHandler_1.JanusHandler.getInstance().getJanusServerHost();
        }
    }
    exports.AbstractWebRTCMessageBrokerClient = AbstractWebRTCMessageBrokerClient;
});
