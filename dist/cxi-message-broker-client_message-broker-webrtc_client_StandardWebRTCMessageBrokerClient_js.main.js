(self["webpackChunkbottar_ai"] = self["webpackChunkbottar_ai"] || []).push([["cxi-message-broker-client_message-broker-webrtc_client_StandardWebRTCMessageBrokerClient_js"],{

/***/ "../cxi-message-broker-client/message-broker-webrtc/client/AbstractWebRTCMessageBrokerClient.js":
/*!******************************************************************************************************!*\
  !*** ../cxi-message-broker-client/message-broker-webrtc/client/AbstractWebRTCMessageBrokerClient.js ***!
  \******************************************************************************************************/
/***/ ((module, exports, __webpack_require__) => {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__, exports, __webpack_require__(/*! ./../interceptor/WebRTCBrokerInterceptorImpl */ "../cxi-message-broker-client/message-broker-webrtc/interceptor/WebRTCBrokerInterceptorImpl.js"), __webpack_require__(/*! ./RegistrationHolder */ "../cxi-message-broker-client/message-broker-webrtc/client/RegistrationHolder.js"), __webpack_require__(/*! ./../../message-broker/client/websocket/BrokerMessage */ "../cxi-message-broker-client/message-broker/client/websocket/BrokerMessage.js"), __webpack_require__(/*! ./../../message-broker/client/ClientTypes */ "../cxi-message-broker-client/message-broker/client/ClientTypes.js"), __webpack_require__(/*! ./../janus/JanusHandler */ "../cxi-message-broker-client/message-broker-webrtc/janus/JanusHandler.js"), __webpack_require__(/*! ./../interceptor/WebRTCBrokerInterceptorHandler */ "../cxi-message-broker-client/message-broker-webrtc/interceptor/WebRTCBrokerInterceptorHandler.js"), __webpack_require__(/*! ./rest/HoldAuditTrailRestClient */ "../cxi-message-broker-client/message-broker-webrtc/client/rest/HoldAuditTrailRestClient.js")], __WEBPACK_AMD_DEFINE_RESULT__ = (function (require, exports, WebRTCBrokerInterceptorImpl_1, RegistrationHolder_1, BrokerMessage_1, ClientTypes_1, JanusHandler_1, WebRTCBrokerInterceptorHandler_1, HoldAuditTrailRestClient_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", ({ value: true }));
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
}).apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
		__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ }),

/***/ "../cxi-message-broker-client/message-broker-webrtc/client/RegistrationHolder.js":
/*!***************************************************************************************!*\
  !*** ../cxi-message-broker-client/message-broker-webrtc/client/RegistrationHolder.js ***!
  \***************************************************************************************/
/***/ ((module, exports, __webpack_require__) => {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__, exports], __WEBPACK_AMD_DEFINE_RESULT__ = (function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", ({ value: true }));
    exports.RegistrationHolder = void 0;
    class RegistrationHolder {
        constructor() { }
        static registrationMap = new Map();
        static saveRegistration(sessionId, options, onRegistrationSuccessCallback) {
            RegistrationHolder.registrationMap.set('Default', { options, onRegistrationSuccessCallback });
        }
        static bitrate = 0;
        static setMaxBitRate(bitrate) {
            RegistrationHolder.bitrate = bitrate;
        }
        static getMaxBitRate() {
            return RegistrationHolder.bitrate;
        }
        static getRegistrationOptions(sessionId) {
            let template = RegistrationHolder.registrationMap.get('Default');
            if (template)
                return template.options;
            else
                return undefined;
        }
        static getAvailableMediaConstrains(sessionId) {
            let template = RegistrationHolder.registrationMap.get('Default');
            if (template)
                return template.options.mediaConstraints;
            else
                return undefined;
        }
        static getRegistrationCallback(sessionId) {
            let template = RegistrationHolder.registrationMap.get('Default');
            if (template && template.onRegistrationSuccessCallback)
                return template.onRegistrationSuccessCallback;
            else
                return undefined;
        }
    }
    exports.RegistrationHolder = RegistrationHolder;
}).apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
		__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ }),

/***/ "../cxi-message-broker-client/message-broker-webrtc/client/StandardWebRTCMessageBrokerClient.js":
/*!******************************************************************************************************!*\
  !*** ../cxi-message-broker-client/message-broker-webrtc/client/StandardWebRTCMessageBrokerClient.js ***!
  \******************************************************************************************************/
/***/ ((module, exports, __webpack_require__) => {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__, exports, __webpack_require__(/*! ./AbstractWebRTCMessageBrokerClient */ "../cxi-message-broker-client/message-broker-webrtc/client/AbstractWebRTCMessageBrokerClient.js")], __WEBPACK_AMD_DEFINE_RESULT__ = (function (require, exports, AbstractWebRTCMessageBrokerClient_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", ({ value: true }));
    exports.StandardWebRTCMessageBrokerClient = void 0;
    class StandardWebRTCMessageBrokerClient extends AbstractWebRTCMessageBrokerClient_1.AbstractWebRTCMessageBrokerClient {
        constructor(brokerClient, brokerInterceptor, showButtons) {
            super(brokerClient, brokerInterceptor, showButtons);
        }
    }
    exports.StandardWebRTCMessageBrokerClient = StandardWebRTCMessageBrokerClient;
}).apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
		__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ }),

/***/ "../cxi-message-broker-client/message-broker-webrtc/client/rest/HoldAuditTrailRestClient.js":
/*!**************************************************************************************************!*\
  !*** ../cxi-message-broker-client/message-broker-webrtc/client/rest/HoldAuditTrailRestClient.js ***!
  \**************************************************************************************************/
/***/ ((module, exports, __webpack_require__) => {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__, exports, __webpack_require__(/*! ./../../janus/JanusHandler */ "../cxi-message-broker-client/message-broker-webrtc/janus/JanusHandler.js")], __WEBPACK_AMD_DEFINE_RESULT__ = (function (require, exports, JanusHandler_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", ({ value: true }));
    exports.HoldAuditTrailRestClient = void 0;
    const r = /:\/\/(.[^/]+)/;
    class HoldAuditTrailRestClient {
        constructor() { }
        static async recordHoldAction(tenantId, sender, interactionId) {
            const response = await fetch(HoldAuditTrailRestClient.domain + '/audit_trail/hold', {
                method: 'POST',
                body: JSON.stringify({ sender, interactionId }),
                headers: { 'Content-Type': 'application/json', 'tenantId': tenantId }
            });
            return response.json().then((data) => {
                if (data.status == 200 && data.data) {
                    JanusHandler_1.JanusHandler.getInstance().unPublish();
                    return new Promise((resolve, reject) => {
                        resolve(true);
                    });
                }
                else {
                    return new Promise((resolve, reject) => {
                        resolve(false);
                    });
                }
            });
        }
        static async recordUnHoldAction(tenantId, sender, interactionId) {
            const response = await fetch(HoldAuditTrailRestClient.domain + '/audit_trail/unhold', {
                method: 'POST',
                body: JSON.stringify({ sender, interactionId }),
                headers: { 'Content-Type': 'application/json', 'tenantId': tenantId }
            });
            return response.json().then((data) => {
                if (data.status == 200 && data.data) {
                    JanusHandler_1.JanusHandler.getInstance().publish();
                    return new Promise((resolve, reject) => {
                        resolve(true);
                    });
                }
                else {
                    return new Promise((resolve, reject) => {
                        resolve(false);
                    });
                }
            });
        }
        static domain = '';
        static initializeRestUrl(url) {
            try {
                let matcher = url.match(r);
                if (matcher && matcher[1]) {
                    HoldAuditTrailRestClient.domain = "https://" + matcher[1] + "/reporting-server";
                    console.log('[ConstructDispatcherUrl],Url:' + HoldAuditTrailRestClient.domain);
                }
            }
            catch (error) {
                console.error('[ConstructDispatcherUrl] :Error :', error);
            }
        }
    }
    exports.HoldAuditTrailRestClient = HoldAuditTrailRestClient;
}).apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
		__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ }),

/***/ "../cxi-message-broker-client/message-broker-webrtc/client/rest/RecordingAuditTrailRestClient.js":
/*!*******************************************************************************************************!*\
  !*** ../cxi-message-broker-client/message-broker-webrtc/client/rest/RecordingAuditTrailRestClient.js ***!
  \*******************************************************************************************************/
/***/ ((module, exports, __webpack_require__) => {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__, exports], __WEBPACK_AMD_DEFINE_RESULT__ = (function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", ({ value: true }));
    exports.RecordingAuditTrailRestClient = void 0;
    class RecordingAuditTrailRestClient {
        static async record(url, interactionId, roomId, { display, janusClientId, audioCodec, videoCodec, recording, janusServerHost }) {
            recording = (recording != undefined) ? recording : false;
            console.log('RecordingAuditTrailRestClient', { interactionId, display, janusClientId, audioCodec, videoCodec, roomId, janusServerHost });
            const response = await fetch(url, {
                method: 'POST',
                body: JSON.stringify({ interactionId, display, janusClientId, audioCodec, videoCodec, roomId, recording, janusServerHost }),
                headers: { 'Content-Type': 'application/json' }
            });
            if (!response.ok) {
                return new Promise((resolve, reject) => {
                    resolve(false);
                });
            }
            return new Promise((resolve, reject) => {
                resolve(true);
            });
        }
    }
    exports.RecordingAuditTrailRestClient = RecordingAuditTrailRestClient;
}).apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
		__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ }),

/***/ "../cxi-message-broker-client/message-broker-webrtc/interceptor/WebRTCBrokerInterceptorHandler.js":
/*!********************************************************************************************************!*\
  !*** ../cxi-message-broker-client/message-broker-webrtc/interceptor/WebRTCBrokerInterceptorHandler.js ***!
  \********************************************************************************************************/
/***/ ((module, exports, __webpack_require__) => {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__, exports, __webpack_require__(/*! ./../janus/JanusHandler */ "../cxi-message-broker-client/message-broker-webrtc/janus/JanusHandler.js"), __webpack_require__(/*! ./../client/RegistrationHolder */ "../cxi-message-broker-client/message-broker-webrtc/client/RegistrationHolder.js")], __WEBPACK_AMD_DEFINE_RESULT__ = (function (require, exports, JanusHandler_1, RegistrationHolder_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", ({ value: true }));
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
}).apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
		__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ }),

/***/ "../cxi-message-broker-client/message-broker-webrtc/interceptor/WebRTCBrokerInterceptorImpl.js":
/*!*****************************************************************************************************!*\
  !*** ../cxi-message-broker-client/message-broker-webrtc/interceptor/WebRTCBrokerInterceptorImpl.js ***!
  \*****************************************************************************************************/
/***/ ((module, exports, __webpack_require__) => {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__, exports, __webpack_require__(/*! ./../../message-broker/client/ClientTypes */ "../cxi-message-broker-client/message-broker/client/ClientTypes.js"), __webpack_require__(/*! ./../client/RegistrationHolder */ "../cxi-message-broker-client/message-broker-webrtc/client/RegistrationHolder.js"), __webpack_require__(/*! ./WebRTCBrokerInterceptorHandler */ "../cxi-message-broker-client/message-broker-webrtc/interceptor/WebRTCBrokerInterceptorHandler.js")], __WEBPACK_AMD_DEFINE_RESULT__ = (function (require, exports, ClientTypes_1, RegistrationHolder_1, WebRTCBrokerInterceptorHandler_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", ({ value: true }));
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
}).apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
		__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ }),

/***/ "../cxi-message-broker-client/message-broker-webrtc/janus/Event.js":
/*!*************************************************************************!*\
  !*** ../cxi-message-broker-client/message-broker-webrtc/janus/Event.js ***!
  \*************************************************************************/
/***/ ((module, exports, __webpack_require__) => {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__, exports], __WEBPACK_AMD_DEFINE_RESULT__ = (function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", ({ value: true }));
    class Event {
        handlers = [];
        on(handler) {
            this.handlers.push(handler);
        }
        off(handler) {
            this.handlers = this.handlers.filter(h => h !== handler);
        }
        trigger(data) {
            this.handlers.slice(0).forEach(h => h(data));
        }
        expose() {
            return this;
        }
    }
    exports["default"] = Event;
}).apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
		__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ }),

/***/ "../cxi-message-broker-client/message-broker-webrtc/janus/Feed.js":
/*!************************************************************************!*\
  !*** ../cxi-message-broker-client/message-broker-webrtc/janus/Feed.js ***!
  \************************************************************************/
/***/ ((module, exports, __webpack_require__) => {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__, exports], __WEBPACK_AMD_DEFINE_RESULT__ = (function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", ({ value: true }));
    class Feed {
        id;
        display;
        audio_codec;
        video_codec;
        talking;
        janusPluginHandle;
        rfindex;
        isRemote;
        intervalId;
        constructor(params) {
            this.id = params.id;
            this.display = params.display;
            this.audio_codec = params.audio_codec;
            this.video_codec = params.video_codec;
            this.talking = params.talking;
            this.janusPluginHandle = params.janusPluginHandle;
            this.rfindex = params.rfindex;
            this.isRemote = params.isRemote;
        }
    }
    exports["default"] = Feed;
}).apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
		__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ }),

/***/ "../cxi-message-broker-client/message-broker-webrtc/janus/JanusHandleHelper.js":
/*!*************************************************************************************!*\
  !*** ../cxi-message-broker-client/message-broker-webrtc/janus/JanusHandleHelper.js ***!
  \*************************************************************************************/
/***/ ((module, exports, __webpack_require__) => {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__, exports], __WEBPACK_AMD_DEFINE_RESULT__ = (function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", ({ value: true }));
    class JanusHandleHelper {
        janusPluginHandle;
        isRecording = false;
        isRecordingSelf = false;
        constructor(pluginHandle) {
            this.janusPluginHandle = pluginHandle;
        }
        /**
         * List rooms in Janus Server
         *
         * @param cb - Callback returning list of rooms
         */
        listRooms(cb) {
            const list = {
                request: "list"
            };
            if (this.janusPluginHandle)
                this.janusPluginHandle.send({
                    message: list,
                    success: function (res) {
                        cb(null, res.list);
                    },
                    error: function (err) {
                        console.error(err);
                        cb(err);
                    }
                });
        }
        /**
         * Record
         *
         * @param roomId - Unique room id
         * @param roomSecret
         * @param record - Is true to start recording
         * @param cb - callback(err, res) returning response after starting recording
         */
        record(roomId, roomSecret, record, cb) {
            const recording = {
                request: "enable_recording",
                room: roomId,
                secret: roomSecret,
                record: record
            };
            if (this.janusPluginHandle)
                this.janusPluginHandle.send({
                    message: recording,
                    success: (res) => {
                        this.isRecording = res.record;
                        cb(null, res);
                    },
                    error: (err) => {
                        console.error(err);
                        cb(err);
                    }
                });
        }
        /**
         * RecordSelf, record my single stream
         *
         * @param record - boolean
         * @param cb - callback(err, res) returning response after starting recording
         */
        recordSelf(record, cb) {
            const recording = {
                request: "configure",
                record: record
            };
            if (this.janusPluginHandle)
                this.janusPluginHandle.send({
                    message: recording,
                    success: (res) => {
                        this.isRecordingSelf = record;
                        cb(null, res);
                    },
                    error: (err) => {
                        console.error(err);
                        cb(err);
                    }
                });
        }
    }
    exports["default"] = JanusHandleHelper;
}).apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
		__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ }),

/***/ "../cxi-message-broker-client/message-broker-webrtc/janus/JanusHandler.js":
/*!********************************************************************************!*\
  !*** ../cxi-message-broker-client/message-broker-webrtc/janus/JanusHandler.js ***!
  \********************************************************************************/
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/** Unless otherwise licensed, the software is our proprietary property and all source code, database,
* functionality, website design, audio, video, text, photographs and graphics on the site or the product (
* collectively, the “Content”) and the trademarks, service marks, and logos contained therein ( the
* “Marks”) are owned or controlled by us or licenses to us, and are protected by the copyright and
* trademark laws and various other intellectual property rights and unfair competition laws in domestic as
* well as in foreign jurisdictions and international conventions.
*/
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__, exports, __webpack_require__(/*! ./../client/RegistrationHolder */ "../cxi-message-broker-client/message-broker-webrtc/client/RegistrationHolder.js"), __webpack_require__(/*! ./../client/rest/RecordingAuditTrailRestClient */ "../cxi-message-broker-client/message-broker-webrtc/client/rest/RecordingAuditTrailRestClient.js"), __webpack_require__(/*! ./JanusWrapper */ "../cxi-message-broker-client/message-broker-webrtc/janus/JanusWrapper.js")], __WEBPACK_AMD_DEFINE_RESULT__ = (function (require, exports, RegistrationHolder_1, RecordingAuditTrailRestClient_1, JanusWrapper_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", ({ value: true }));
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
}).apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
		__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ }),

/***/ "../cxi-message-broker-client/message-broker-webrtc/janus/JanusWrapper.js":
/*!********************************************************************************!*\
  !*** ../cxi-message-broker-client/message-broker-webrtc/janus/JanusWrapper.js ***!
  \********************************************************************************/
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__, exports, __webpack_require__(/*! ./JanusHandleHelper */ "../cxi-message-broker-client/message-broker-webrtc/janus/JanusHandleHelper.js"), __webpack_require__(/*! ./VideoClient */ "../cxi-message-broker-client/message-broker-webrtc/janus/VideoClient.js"), __webpack_require__(/*! ./Feed */ "../cxi-message-broker-client/message-broker-webrtc/janus/Feed.js"), __webpack_require__(/*! ./Event */ "../cxi-message-broker-client/message-broker-webrtc/janus/Event.js"), __webpack_require__(/*! ./Room */ "../cxi-message-broker-client/message-broker-webrtc/janus/Room.js"), __webpack_require__(/*! ./Utils */ "../cxi-message-broker-client/message-broker-webrtc/janus/Utils.js")], __WEBPACK_AMD_DEFINE_RESULT__ = (function (require, exports, JanusHandleHelper_1, VideoClient_1, Feed_1, Event_1, Room_1, Utils_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", ({ value: true }));
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
    const Janus = __webpack_require__(/*! ./third-party/janus/janusBundle */ "../cxi-message-broker-client/message-broker-webrtc/janus/third-party/janus/janusBundle.js");
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
    exports["default"] = JanusWrapper;
}).apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
		__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ }),

/***/ "../cxi-message-broker-client/message-broker-webrtc/janus/Room.js":
/*!************************************************************************!*\
  !*** ../cxi-message-broker-client/message-broker-webrtc/janus/Room.js ***!
  \************************************************************************/
/***/ ((module, exports, __webpack_require__) => {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__, exports], __WEBPACK_AMD_DEFINE_RESULT__ = (function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", ({ value: true }));
    /** Unless otherwise licensed, the software is our proprietary property and all source code, database,
    * functionality, website design, audio, video, text, photographs and graphics on the site or the product (
    * collectively, the “Content”) and the trademarks, service marks, and logos contained therein ( the
    * “Marks”) are owned or controlled by us or licenses to us, and are protected by the copyright and
    * trademark laws and various other intellectual property rights and unfair competition laws in domestic as
    * well as in foreign jurisdictions and international conventions.
    */
    const Janus = __webpack_require__(/*! ./third-party/janus/janusBundle */ "../cxi-message-broker-client/message-broker-webrtc/janus/third-party/janus/janusBundle.js");
    class Room {
        dispatcherServer;
        roomId;
        roomName;
        username;
        password;
        roomAdminSecret;
        constructor(dispatcherServer, username, password, roomId, roomName, roomAdminSecret) {
            this.dispatcherServer = dispatcherServer;
            if (roomName) {
                this.roomName = roomName;
            }
            else {
                this.roomName = `randomRoom-${Janus.randomString(12)}`;
            }
            this.roomId = roomId;
            this.username = username;
            this.password = password;
            this.roomAdminSecret = roomAdminSecret;
        }
        createRoom(roomId, roomName, roomSecret, cb) {
            let myHeaders = new Headers();
            myHeaders.append("Content-Type", "application/json");
            myHeaders.append('Authorization', 'Basic ' + btoa(this.username + ":" + this.password));
            let raw = (roomId) ? JSON.stringify({ roomId, roomName, "secret": roomSecret }) :
                JSON.stringify({ roomName, "secret": roomSecret });
            let requestOptions = {
                method: 'POST',
                headers: myHeaders,
                body: raw
            };
            fetch(`${this.dispatcherServer}/create`, requestOptions)
                .then(res => {
                res.json().then(data => {
                    this.roomId = data.roomId;
                    this.roomName = roomName;
                    cb(null, data);
                });
            }).catch(err => cb(err));
        }
        getServerForRoom(roomId, cb) {
            let myHeaders = new Headers();
            myHeaders.append('Authorization', 'Basic ' + btoa(this.username + ":" + this.password));
            let requestOptions = {
                method: 'GET',
                headers: myHeaders
            };
            fetch(`${this.dispatcherServer}/room-server/${roomId}`, requestOptions)
                .then(res => {
                res.json().then(data => {
                    this.roomId = roomId;
                    // this.roomName = data.roomName;
                    cb(null, data);
                });
            })
                .catch(err => cb(err));
        }
        destroyRoom(roomSecret, cb) {
            if (!this.roomId) {
                return cb(new Error('Missing room Id'));
            }
            let myHeaders = new Headers();
            myHeaders.append("Content-Type", "application/json");
            myHeaders.append('Authorization', 'Basic ' + btoa(this.username + ":" + this.password));
            let raw = JSON.stringify({ "roomId": this.roomId, "secret": roomSecret });
            let requestOptions = {
                method: 'POST',
                headers: myHeaders,
                body: raw
            };
            fetch(`${this.dispatcherServer}/destroy`, requestOptions)
                .then(res => {
                cb(null, true);
            }).catch(err => cb(err));
        }
    }
    exports["default"] = Room;
}).apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
		__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ }),

/***/ "../cxi-message-broker-client/message-broker-webrtc/janus/Utils.js":
/*!*************************************************************************!*\
  !*** ../cxi-message-broker-client/message-broker-webrtc/janus/Utils.js ***!
  \*************************************************************************/
/***/ ((module, exports, __webpack_require__) => {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__, exports], __WEBPACK_AMD_DEFINE_RESULT__ = (function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", ({ value: true }));
    /** Unless otherwise licensed, the software is our proprietary property and all source code, database,
    * functionality, website design, audio, video, text, photographs and graphics on the site or the product (
    * collectively, the “Content”) and the trademarks, service marks, and logos contained therein ( the
    * “Marks”) are owned or controlled by us or licenses to us, and are protected by the copyright and
    * trademark laws and various other intellectual property rights and unfair competition laws in domestic as
    * well as in foreign jurisdictions and international conventions.
    */
    class Utils {
        randomInteger(pow) {
            return Math.floor(Math.random() * pow);
        }
        ;
        getIceServers(stun, turn, turnUsername, turnPassword) {
            const stunServer = (stun) ? { urls: stun } : null;
            const turnServer = (turn) ? {
                urls: turn,
                credential: turnPassword,
                username: turnUsername
            } : null;
            const iceServers = [{
                    urls: "stun:stun.l.google.com:19302"
                }];
            if (stunServer)
                iceServers.push(stunServer);
            if (turnServer)
                iceServers.push(turnServer);
            return iceServers;
        }
    }
    exports["default"] = Utils;
}).apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
		__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ }),

/***/ "../cxi-message-broker-client/message-broker-webrtc/janus/VideoClient.js":
/*!*******************************************************************************!*\
  !*** ../cxi-message-broker-client/message-broker-webrtc/janus/VideoClient.js ***!
  \*******************************************************************************/
/***/ ((module, exports, __webpack_require__) => {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__, exports], __WEBPACK_AMD_DEFINE_RESULT__ = (function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", ({ value: true }));
    /** Unless otherwise licensed, the software is our proprietary property and all source code, database,
    * functionality, website design, audio, video, text, photographs and graphics on the site or the product (
    * collectively, the “Content”) and the trademarks, service marks, and logos contained therein ( the
    * “Marks”) are owned or controlled by us or licenses to us, and are protected by the copyright and
    * trademark laws and various other intellectual property rights and unfair competition laws in domestic as
    * well as in foreign jurisdictions and international conventions.
    */
    const Janus = __webpack_require__(/*! ./third-party/janus/janusBundle */ "../cxi-message-broker-client/message-broker-webrtc/janus/third-party/janus/janusBundle.js");
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
    exports["default"] = VideoClient;
}).apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
		__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ }),

/***/ "../cxi-message-broker-client/message-broker/client/ClientTypes.js":
/*!*************************************************************************!*\
  !*** ../cxi-message-broker-client/message-broker/client/ClientTypes.js ***!
  \*************************************************************************/
/***/ ((module, exports, __webpack_require__) => {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__, exports], __WEBPACK_AMD_DEFINE_RESULT__ = (function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", ({ value: true }));
    exports.ClientType = exports.AckResponseTypes = exports.BrokerTypes = exports.MessageType = exports.ClientDetails = exports.BrokerConf = void 0;
    /** Unless otherwise licensed, the software is our proprietary property and all source code, database,
    * functionality, website design, audio, video, text, photographs and graphics on the site or the product (
    * collectively, the “Content”) and the trademarks, service marks, and logos contained therein ( the
    * “Marks”) are owned or controlled by us or licenses to us, and are protected by the copyright and
    * trademark laws and various other intellectual property rights and unfair competition laws in domestic as
    * well as in foreign jurisdictions and international conventions.
    */
    class BrokerConf {
        fullyQualifiedURL;
        //in case of BrokerType WEB_RTC
        iceServers;
        retryPolicy;
        constructor(fullyQualifiedURL, iceServers, retryPolicy) {
            this.fullyQualifiedURL = fullyQualifiedURL;
            this.iceServers = iceServers;
            this.retryPolicy = retryPolicy;
        }
    }
    exports.BrokerConf = BrokerConf;
    class ClientDetails {
        /**
         * @id client-id
         */
        id;
        /**
         * @name client name
         */
        name;
        /**
         * @additionalDetails clients additional details stored in key:value format like(email or contact-number)
         */
        additionalDetails;
        constructor(id, name, additionalDetails) {
            this.id = id;
            this.name = name;
            this.additionalDetails = additionalDetails;
        }
    }
    exports.ClientDetails = ClientDetails;
    var MessageType;
    (function (MessageType) {
        MessageType["CLIENT_TYPE_MESSAGE"] = "CLIENT_TYPE_MESSAGE";
        MessageType["CLIENT_INFORMATION_MESSAGE"] = "CLIENT_INFORMATION_MESSAGE";
        MessageType["REGISTER_TO_BROKER"] = "REGISTER_TO_BROKER";
        MessageType["REGISTERATION_DONE"] = "REGISTERATION_DONE";
        MessageType["REGISTERATION_FAILED"] = "REGISTERATION_FAILED";
        MessageType["OFFER_REQUESTED"] = "OFFER_REQUESTED";
        MessageType["OFFER_REJECTED"] = "OFFER_REJECTED";
        MessageType["OFFER_RECEIVED"] = "OFFER_RECEIVED";
        MessageType["ANSWER_INITIATED"] = "ANSWER_INITIATED";
        MessageType["ANSWER_RECEIVED"] = "ANSWER_RECEIVED";
        MessageType["MESSAGE_SEND"] = "MESSAGE_SEND";
        MessageType["MESSAGE_RECEIVED"] = "MESSAGE_RECEIVED";
        MessageType["MESSAGE_SNEAK"] = "MESSAGE_SNEAK";
        MessageType["CLIENT_SESSION_REQUESTED"] = "CLIENT_SESSION_REQUESTED";
        MessageType["CLIENT_SESSION_JOINED"] = "CLIENT_SESSION_JOINED";
        MessageType["CLIENT_SESSION_LEAVE"] = "CLIENT_SESSION_LEAVE";
        MessageType["SESSION_CLOSE_REQUEST"] = "SESSION_CLOSE_REQUEST";
        MessageType["SESSION_CLOSED"] = "SESSION_CLOSED";
        MessageType["ON_SESSION_CLOSE_REQUEST"] = "ON_SESSION_CLOSE_REQUEST";
        MessageType["SESSION_SYNC_REQUEST"] = "SESSION_SYNC_REQUEST";
        MessageType["SESSION_SYNC_RESPONSE"] = "SESSION_SYNC_RESPONSE";
        MessageType["SESSION_TRANSFER_OFFERED"] = "SESSION_TRANSFER_OFFERED";
        MessageType["SESSION_TRANSFER_ACCEPTED"] = "SESSION_TRANSFER_ACCEPTED";
        MessageType["SESSION_TRASFER_FAILED"] = "SESSION_TRASFER_FAILED";
        MessageType["SESSION_TRANSFER_COMPLEATE"] = "SESSION_TRANSFER_COMPLEATE";
        MessageType["LOG"] = "LOG";
        MessageType["MESSAGE_ACK"] = "MESSAGE_ACK";
        MessageType["ESCALATE_TO_AGENT"] = "ESCALATE_TO_AGENT";
        MessageType["ICE_CANDIDATES"] = "ICE_CANDIDATES";
        MessageType["CONFIRMATION_ACCEPTED"] = "CONFIRMATION_ACCEPTED";
        MessageType["CONFIRMATION_REJECTED"] = "CONFIRMATION_REJECTED";
        MessageType["READY_FOR_CALL"] = "READY_FOR_CALL";
        MessageType["CALL_INITIATED"] = "CALL_INITIATED";
        MessageType["CALL_RESPONSE"] = "CALL_RESPONSE";
        MessageType["END_CALL"] = "END_CALL";
        MessageType["ON_ICE_CANDIDATES"] = "ON_ICE_CANDIDATES";
        MessageType["ROOM_ID_REQUESTED"] = "ROOM_ID_REQUESTED";
        MessageType["ON_ROOM_CREATED"] = "ON_ROOM_CREATED";
        MessageType["ON_ROOM_CREATION_FAILED"] = "ON_ROOM_CREATION_FAILED";
        MessageType["REQUEST_FOR_SUPERVISOR_CHERRY_PICK"] = "REQUEST_FOR_SUPERVISOR_CHERRY_PICK";
        MessageType["ON_SUPERVISOR_CHERRY_PICK_SUCCESS"] = "ON_SUPERVISOR_CHERRY_PICK_SUCCESS";
        MessageType["ON_SUPERVISOR_CHERRY_PICK_FAILED"] = "ON_SUPERVISOR_CHERRY_PICK_FAILED";
        MessageType["REQUEST_FOR_SUPERVISOR_RE_QUEUE"] = "REQUEST_FOR_SUPERVISOR_RE_QUEUE";
        MessageType["ON_SUPERVISOR_RE_QUEUE_SUCCESS"] = "ON_SUPERVISOR_RE_QUEUE_SUCCESS";
        MessageType["ON_SUPERVISOR_RE_QUEUE_FAILED"] = "ON_SUPERVISOR_RE_QUEUE_FAILED";
    })(MessageType = exports.MessageType || (exports.MessageType = {}));
    /**
     * CXInfinity Available Broker Types
     */
    var BrokerTypes;
    (function (BrokerTypes) {
        BrokerTypes["WEB_SOCKET"] = "WEB_SOCKET";
        BrokerTypes["HTTP"] = "HTTP";
        BrokerTypes["XMPP"] = "XMPP";
        BrokerTypes["WEB_RTC"] = "WEB_RTC";
        BrokerTypes["BOTTER_INFI"] = "BOTTER_INFI";
    })(BrokerTypes = exports.BrokerTypes || (exports.BrokerTypes = {}));
    var AckResponseTypes;
    (function (AckResponseTypes) {
        AckResponseTypes["MESSAGE_RECEIVED"] = "MESSAGE_RECEIVED";
        AckResponseTypes["MESSAGE_DELEVERED"] = "MESSAGE_DELEVERED";
        AckResponseTypes["ERROR"] = "ERROR";
    })(AckResponseTypes = exports.AckResponseTypes || (exports.AckResponseTypes = {}));
    /**
     * Message broker client type
     * @INDIVIDUAL , If broker client is created to handle single interaction with single client.
     * @BROKER, If broker client is created to handle multiple interaction with single client.
     */
    var ClientType;
    (function (ClientType) {
        ClientType["INDIVIDUAL"] = "INDIVIDUAL";
        ClientType["BROKER"] = "BROKER";
    })(ClientType = exports.ClientType || (exports.ClientType = {}));
}).apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
		__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ }),

/***/ "../cxi-message-broker-client/message-broker/client/websocket/BrokerMessage.js":
/*!*************************************************************************************!*\
  !*** ../cxi-message-broker-client/message-broker/client/websocket/BrokerMessage.js ***!
  \*************************************************************************************/
/***/ ((module, exports, __webpack_require__) => {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__, exports, __webpack_require__(/*! ../../utils/ClientUtils */ "../cxi-message-broker-client/message-broker/utils/ClientUtils.js")], __WEBPACK_AMD_DEFINE_RESULT__ = (function (require, exports, ClientUtils_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", ({ value: true }));
    exports.BrokerMessage = void 0;
    /**
     * Broker Message Template which is shared between CXInfinity broker client and CXInfinity
     * signalling server.
     */
    class BrokerMessage {
        brokerType;
        sender;
        messageType;
        /**
         *
         */
        messageKey;
        /**
         * shared data like structure @ChatMessageBody
         */
        data;
        /**
         * generated message timestamp
         */
        timestamp;
        constructor(brokerType, sender, messageType, data) {
            this.brokerType = brokerType;
            this.sender = sender;
            this.messageType = messageType;
            this.messageKey = ClientUtils_1.ClientUtils.generateUniqueKey();
            this.data = data;
            this.timestamp = new Date().getTime();
        }
    }
    exports.BrokerMessage = BrokerMessage;
}).apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
		__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ }),

/***/ "../cxi-message-broker-client/message-broker/utils/ClientUtils.js":
/*!************************************************************************!*\
  !*** ../cxi-message-broker-client/message-broker/utils/ClientUtils.js ***!
  \************************************************************************/
/***/ ((module, exports, __webpack_require__) => {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__, exports, __webpack_require__(/*! ../client/ClientTypes */ "../cxi-message-broker-client/message-broker/client/ClientTypes.js")], __WEBPACK_AMD_DEFINE_RESULT__ = (function (require, exports, ClientTypes_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", ({ value: true }));
    exports.DS = exports.ClientUtils = void 0;
    class ClientUtils {
        constructor() { }
        static getSupportedMessageDataBroker() {
            return [ClientTypes_1.BrokerTypes.WEB_SOCKET];
        }
        static getSupportedMediaBroker() {
            return [ClientTypes_1.BrokerTypes.WEB_RTC, ClientTypes_1.BrokerTypes.WEB_SOCKET, ClientTypes_1.BrokerTypes.WEB_SOCKET];
        }
        static generateUniqueKey() {
            return (Date.now().toString(36)
                + Math.random().toString(36).
                    substr(2, 5)).toUpperCase();
        }
    }
    exports.ClientUtils = ClientUtils;
    var DS;
    (function (DS) {
        class Node {
            item;
            next;
            constructor(item = null) {
                this.item = item;
                this.next = null;
            }
        }
        DS.Node = Node;
    })(DS = exports.DS || (exports.DS = {}));
}).apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
		__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ })

}]);
//# sourceMappingURL=cxi-message-broker-client_message-broker-webrtc_client_StandardWebRTCMessageBrokerClient_js.main.js.map