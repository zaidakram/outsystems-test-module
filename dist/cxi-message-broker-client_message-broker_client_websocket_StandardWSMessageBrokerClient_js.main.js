(self["webpackChunkbottar_ai"] = self["webpackChunkbottar_ai"] || []).push([["cxi-message-broker-client_message-broker_client_websocket_StandardWSMessageBrokerClient_js"],{

/***/ "../cxi-message-broker-client/message-broker/client-factory/StandardClientFactory.js":
/*!*******************************************************************************************!*\
  !*** ../cxi-message-broker-client/message-broker/client-factory/StandardClientFactory.js ***!
  \*******************************************************************************************/
/***/ ((module, exports, __webpack_require__) => {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__, exports, __webpack_require__(/*! ../utils/collections/LinkedList */ "../cxi-message-broker-client/message-broker/utils/collections/LinkedList.js")], __WEBPACK_AMD_DEFINE_RESULT__ = (function (require, exports, LinkedList_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", ({ value: true }));
    exports.StandardClientFactory = void 0;
    class StandardClientFactory {
        messageBrokerClients = new Map();
        static instance;
        constructor() {
        }
        static getInstance() {
            if (StandardClientFactory.instance)
                return StandardClientFactory.instance;
            else
                return (StandardClientFactory.instance = new StandardClientFactory());
        }
        addMessageBrokerClient(key, brokerClient) {
            this.messageBrokerClients.set(key, brokerClient);
        }
        removeMessageBrokerClient(key) {
            if (this.messageBrokerClients)
                this.messageBrokerClients.delete(key);
        }
        getMessageBrokerClient(key) {
            if (this.messageBrokerClients)
                return this.messageBrokerClients.get(key);
            else
                return undefined;
        }
        pendingMessages = new LinkedList_1.LinkedList();
        addToPendingMessage(message) {
            this.pendingMessages.insertLast(message);
        }
        getPendingMessage() {
            return this.pendingMessages;
        }
        clearPendinMessages() {
            console.log('[ Clearing All Pending Messages ]');
            this.pendingMessages = new LinkedList_1.LinkedList();
        }
    }
    exports.StandardClientFactory = StandardClientFactory;
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

/***/ "../cxi-message-broker-client/message-broker/client/websocket/AbstractWSMessageBrokerClient.js":
/*!*****************************************************************************************************!*\
  !*** ../cxi-message-broker-client/message-broker/client/websocket/AbstractWSMessageBrokerClient.js ***!
  \*****************************************************************************************************/
/***/ ((module, exports, __webpack_require__) => {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__, exports, __webpack_require__(/*! ../ClientTypes */ "../cxi-message-broker-client/message-broker/client/ClientTypes.js"), __webpack_require__(/*! ../../logger/LoggerFactory */ "../cxi-message-broker-client/message-broker/logger/LoggerFactory.js"), __webpack_require__(/*! ../../client-factory/StandardClientFactory */ "../cxi-message-broker-client/message-broker/client-factory/StandardClientFactory.js"), __webpack_require__(/*! ./BrokerMessage */ "../cxi-message-broker-client/message-broker/client/websocket/BrokerMessage.js"), __webpack_require__(/*! ../../utils/NetworkUtils */ "../cxi-message-broker-client/message-broker/utils/NetworkUtils.js"), __webpack_require__(/*! ./../../utils/ClientUtils */ "../cxi-message-broker-client/message-broker/utils/ClientUtils.js")], __WEBPACK_AMD_DEFINE_RESULT__ = (function (require, exports, ClientTypes_1, LoggerFactory_1, StandardClientFactory_1, BrokerMessage_1, NetworkUtils_1, ClientUtils_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", ({ value: true }));
    exports.AbstractWSMessageBrokerClient = void 0;
    /**
     * Abstract Class used to create Broker client,which is used to make connection with CXInfinity signalling
     * server and helps in sharing messages to server.
     */
    class AbstractWSMessageBrokerClient {
        brokerConnection;
        BROKER_TYPE = ClientTypes_1.BrokerTypes.WEB_SOCKET;
        brokerInterceptor;
        webRTCBrokerInterceptor;
        connectionIsConnected = false;
        clientId;
        clientType = ClientTypes_1.ClientType.INDIVIDUAL;
        logger = LoggerFactory_1.LoggerFactory.getLogger(this);
        messageReceivedCallBack;
        messageDeliveredCallBack;
        loadUpConf;
        constructor(clientId, loadUpConf, brokerInterceptor, clientType) {
            this.clientId = clientId;
            this.loadUpConf = loadUpConf;
            this.configureClient();
            if (brokerInterceptor)
                this.brokerInterceptor = brokerInterceptor;
            if (clientType)
                this.clientType = clientType;
            NetworkUtils_1.NetworkUtils.onNetworkConnect(this.onLANConnected);
        }
        onLANConnected = () => {
            console.log(' %c = = LAN CONNECTED = =', 'font-weight: bold; font-size: 40px;color: red; text-shadow: 3px 3px 0 rgb(217,31,38) , 6px 6px 0 rgb(226,91,14) , 9px 9px 0 rgb(245,221,8) , 12px 12px 0 rgb(5,148,68) , 15px 15px 0 rgb(2,135,206) , 18px 18px 0 rgb(4,77,145) , 21px 21px 0 rgb(42,21,113)');
            if (!this.isConnected()) {
                console.log(' ----- WEBSCOCKET ALREADY CONNECTED ----- ');
            }
            else
                this.connectToWebsocket();
        };
        configureClient() {
            this.connectToWebsocket();
        }
        connectToWebsocket() {
            if (!this.brokerConnection
                || this.brokerConnection.readyState != WebSocket.CONNECTING
                || this.brokerConnection.readyState != WebSocket.OPEN) {
                this.logger.info(' Connecting to WS Server : ' + this.loadUpConf.fullyQualifiedURL);
                if (this.brokerConnection)
                    this.disconnect(true);
                this.brokerConnection = new WebSocket(this.loadUpConf.fullyQualifiedURL);
                this.registerCallBack(this.loadUpConf);
            }
        }
        retryConnectionVal;
        startRetryThread(loadUpConf) {
            clearTimeout(this.retryConnectionVal);
            if (loadUpConf.retryPolicy) {
                this.retryConnectionVal = setInterval(this.retryConnection.
                    bind(this, loadUpConf), loadUpConf.retryPolicy.reconnectInterval);
            }
            else {
                this.retryConnectionVal = setInterval(this.retryConnection.
                    bind(this, loadUpConf), 10000);
            }
        }
        registerCallBack(loadUpConf) {
            if (this.brokerConnection) {
                this.brokerConnection.onclose = (event) => {
                    this.logger.info("WebSocket Client Connection Closed");
                    this.retryAttempts = 0;
                    this.disconnect(true);
                    StandardClientFactory_1.StandardClientFactory.getInstance().
                        removeMessageBrokerClient(loadUpConf.fullyQualifiedURL);
                    if (this.brokerInterceptor)
                        this.brokerInterceptor.onDisconnect(event);
                    this.startRetryThread(loadUpConf);
                };
                this.brokerConnection.onopen = (event) => {
                    this.logger.info("WebSocket Client Connection Open");
                    this.connectionIsConnected = true;
                    this.updateClientTypeToServer();
                    StandardClientFactory_1.StandardClientFactory.getInstance().
                        addMessageBrokerClient(loadUpConf.fullyQualifiedURL, this);
                    this.retryPendingMessages();
                    if (this.brokerInterceptor)
                        this.brokerInterceptor.onConnect(event);
                };
                this.brokerConnection.onerror = (event) => {
                    console.error("Error Occurred,", event);
                    if (this.brokerInterceptor)
                        this.brokerInterceptor.onError(event);
                };
                this.brokerConnection.onmessage = (event) => {
                    if (event && this.brokerConnection && event.data == 'PING') {
                        this.brokerConnection.send("PONG");
                        this.heartBeat();
                    }
                    else if (event && this.brokerConnection && event.data.toString().includes("ip-address")) {
                        var ipAddress = event.data.split(":")[1];
                        this.brokerInterceptor.onIPAddressReceive(ipAddress);
                    }
                    else if (event)
                        this.onMessage(event);
                    else
                        console.log(' BAD_MESSAGE : [ On Message Receive ] ');
                };
            }
        }
        heatBeatInterval = 0;
        heartBeat() {
            clearTimeout(this.heatBeatInterval);
            this.heatBeatInterval = setTimeout(() => {
                this.disconnect(true);
            }, 8000 + 2000);
            StandardClientFactory_1.StandardClientFactory.getInstance().clearPendinMessages();
        }
        updateClientTypeToServer() {
            let data = {};
            data['clientType'] = this.clientType;
            let brokerMessage = new BrokerMessage_1.BrokerMessage(this.BROKER_TYPE, this.getSenderId(), ClientTypes_1.MessageType.CLIENT_TYPE_MESSAGE, data);
            return this.sendMessageToBroker(brokerMessage);
        }
        publishClientInfo(customerDetails) {
            let data = {};
            data['customerDetails'] = customerDetails;
            let brokerMessage = new BrokerMessage_1.BrokerMessage(this.BROKER_TYPE, this.getSenderId(customerDetails.id), ClientTypes_1.MessageType.CLIENT_INFORMATION_MESSAGE, data);
            return this.sendMessageToBroker(brokerMessage);
        }
        registerNewReqToBroker(customerDetails, saveInGarageOnly) {
            let data = {};
            data['customerDetails'] = customerDetails;
            if (saveInGarageOnly && saveInGarageOnly == true)
                data['saveInGarageOnly'] = saveInGarageOnly;
            let brokerMessage = new BrokerMessage_1.BrokerMessage(this.BROKER_TYPE, this.getSenderId(), ClientTypes_1.MessageType.REGISTER_TO_BROKER, data);
            return this.sendMessageToBroker(brokerMessage);
        }
        registerExistingReqToBroker(interactionId) {
            let data = {};
            data['customerDetails'] = { interactionId: interactionId };
            let brokerMessage = new BrokerMessage_1.BrokerMessage(this.BROKER_TYPE, this.getSenderId(), ClientTypes_1.MessageType.REGISTER_TO_BROKER, data);
            return this.sendMessageToBroker(brokerMessage);
        }
        readyForSession(sessionId, sender) {
            let data = {};
            data['sessionId'] = sessionId;
            let brokerMessage = new BrokerMessage_1.BrokerMessage(this.BROKER_TYPE, this.getSenderId(sender), ClientTypes_1.MessageType.CLIENT_SESSION_JOINED, data);
            return this.sendMessageToBroker(brokerMessage);
        }
        requestClientSession(sessionId, sender) {
            let data = {};
            data['sessionId'] = sessionId;
            let brokerMessage = new BrokerMessage_1.BrokerMessage(this.BROKER_TYPE, this.getSenderId(sender), ClientTypes_1.MessageType.CLIENT_SESSION_REQUESTED, data);
            return this.sendMessageToBroker(brokerMessage);
        }
        syncSession(sessionId, sender) {
            let data = {};
            data['sessionId'] = sessionId;
            let brokerMessage = new BrokerMessage_1.BrokerMessage(this.BROKER_TYPE, this.getSenderId(sender), ClientTypes_1.MessageType.SESSION_SYNC_REQUEST, data);
            return this.sendMessageToBroker(brokerMessage);
        }
        closeSession(sessionId, sender, initiatingToClose) {
            let data = {};
            data['sessionId'] = sessionId;
            let brokerMessage = new BrokerMessage_1.BrokerMessage(this.BROKER_TYPE, this.getSenderId(sender), initiatingToClose ? ClientTypes_1.MessageType.SESSION_CLOSE_REQUEST : ClientTypes_1.MessageType.SESSION_CLOSED, data);
            return this.sendMessageToBroker(brokerMessage);
        }
        sendAck(sessionId, messageId) {
            let data = {};
            data['ackResType'] = ClientTypes_1.AckResponseTypes.MESSAGE_DELEVERED;
            data['sessionId'] = sessionId;
            let brokerMessage = new BrokerMessage_1.BrokerMessage(this.BROKER_TYPE, this.clientId, ClientTypes_1.MessageType.MESSAGE_ACK, data);
            this.sendMessageToBroker(brokerMessage);
        }
        makeOffer(interactionId, supportedBrokerTypes, senderDetails) {
            let data = {};
            data['interactionId'] = interactionId;
            data['supportedBrokerTypes'] = supportedBrokerTypes;
            data['senderDetails'] = senderDetails;
            let brokerMessage = new BrokerMessage_1.BrokerMessage(this.BROKER_TYPE, this.getSenderId(senderDetails.id), ClientTypes_1.MessageType.OFFER_REQUESTED, data);
            return this.sendMessageToBroker(brokerMessage);
        }
        createAnswer(interactionId, supportedBrokerTypes, sender) {
            let data = {};
            data['interactionId'] = interactionId;
            data['supportedBrokerTypes'] = supportedBrokerTypes;
            let brokerMessage = new BrokerMessage_1.BrokerMessage(this.BROKER_TYPE, this.getSenderId(sender), ClientTypes_1.MessageType.ANSWER_INITIATED, data);
            return this.sendMessageToBroker(brokerMessage);
        }
        sendMessage(sessionId, message, sender, onMessageReceiveCallback, onMessageDeliveredCallback) {
            try {
                let data = {};
                data['sessionId'] = sessionId;
                data['message'] = message;
                let brokerMessage = new BrokerMessage_1.BrokerMessage(this.BROKER_TYPE, this.getSenderId(sender), ClientTypes_1.MessageType.MESSAGE_SEND, data);
                if (onMessageReceiveCallback) {
                    this.addToMessageReceiveCallback(brokerMessage.messageKey, onMessageReceiveCallback);
                }
                if (onMessageDeliveredCallback) {
                    this.addToMessageDeliveredCallback(brokerMessage.messageKey, onMessageDeliveredCallback);
                }
                return this.sendMessageToBroker(brokerMessage);
            }
            catch (error) {
                this.logger.error(error);
            }
            return "";
        }
        sendSneakMessage(sessionId, message, sender) {
            try {
                let data = {};
                data['sessionId'] = sessionId;
                data['message'] = message;
                let brokerMessage = new BrokerMessage_1.BrokerMessage(this.BROKER_TYPE, this.getSenderId(sender), ClientTypes_1.MessageType.MESSAGE_SNEAK, data);
                return this.sendMessageToBroker(brokerMessage);
            }
            catch (error) {
                this.logger.error(error);
            }
            return "";
        }
        addToMessageReceiveCallback(key, value) {
            if (!this.messageReceivedCallBack)
                this.messageReceivedCallBack = new Map();
            this.messageReceivedCallBack.set(key, value);
        }
        addToMessageDeliveredCallback(key, value) {
            if (!this.messageDeliveredCallBack)
                this.messageDeliveredCallBack = new Map();
            this.messageDeliveredCallBack.set(key, value);
        }
        getSenderId(sender) {
            if (sender)
                return sender;
            else
                return this.clientId;
        }
        sendMessageToBroker(message) {
            if (message) {
                if (message.messageType == ClientTypes_1.MessageType.MESSAGE_SEND
                    ||
                        message.messageType == ClientTypes_1.MessageType.SESSION_CLOSE_REQUEST
                    ||
                        message.messageType == ClientTypes_1.MessageType.END_CALL) {
                    StandardClientFactory_1.StandardClientFactory.getInstance().addToPendingMessage(message);
                }
            }
            if (message && this.isConnected() && this.brokerConnection) {
                this.brokerConnection.send(JSON.stringify(message));
                return message.messageKey;
            }
            else if (message && message.messageType != ClientTypes_1.MessageType.MESSAGE_SNEAK) {
                this.startRetryThread(this.loadUpConf);
                throw new Error(" Broker is not ready for Ws-Client : " + this.clientId);
            }
            else {
                throw new Error(" Broker is not ready for Ws-Client : " + this.clientId);
            }
            return "";
        }
        isConnected() {
            return this.connectionIsConnected &&
                (this.brokerConnection != null) &&
                (this.brokerConnection.readyState === WebSocket.OPEN);
        }
        retryAttempts = 0;
        retryConnection(loadUpConf) {
            if (this.isConnected()) {
                clearTimeout(this.retryConnectionVal);
                return;
            }
            else {
                if (loadUpConf.retryPolicy) {
                    let isToInitiateReconnect = true;
                    if (isToInitiateReconnect) {
                        this.logger.trace(' Attempting retry to WebSocket Server for Ws-Client '
                            + this.clientId);
                        this.retryAttempts++;
                        this.connectToWebsocket();
                    }
                }
                else {
                    this.logger.trace(' Retry Policy Not Found for Ws-Client : ' + this.clientId);
                }
            }
        }
        isOnlyForWebRTC(message) {
            return (message.data && message.data['message'] && message.data['message']['callType'])
                || message.brokerType == ClientTypes_1.BrokerTypes.WEB_RTC;
        }
        onMessage(event) {
            try {
                let message = JSON.parse(event.data);
                if (this.webRTCBrokerInterceptor)
                    this.webRTCBrokerInterceptor.onMessage(message);
                if (this.isOnlyForWebRTC(message)) {
                    return;
                }
                switch (message.messageType) {
                    case ClientTypes_1.MessageType.REGISTERATION_DONE:
                        let registerationKey = message.messageKey;
                        let interactionId = message.data['interactionId'];
                        let saveInGarageOnly = message.data['saveInGarageOnly'];
                        let sessionIdVal = message.data['sessionId'];
                        if (this.brokerInterceptor) {
                            this.brokerInterceptor.
                                onRegisterationSuccessfull(registerationKey, interactionId, sessionIdVal, saveInGarageOnly);
                        }
                        break;
                    case ClientTypes_1.MessageType.REGISTERATION_FAILED:
                        if (this.brokerInterceptor) {
                            let failedReason = message.data['failedReason'];
                            let registerationKey = message.messageKey;
                            this.brokerInterceptor.
                                onRegisterationFail(registerationKey, failedReason);
                        }
                        break;
                    case ClientTypes_1.MessageType.OFFER_RECEIVED:
                        if (this.brokerInterceptor) {
                            let interactionId = message.data['interactionId'];
                            let senderDetails = message.data['senderDetails'];
                            this.brokerInterceptor.
                                onOfferReceive(interactionId, senderDetails);
                            this.createAnswer(interactionId, ClientUtils_1.ClientUtils.getSupportedMediaBroker(), interactionId);
                        }
                        break;
                    case ClientTypes_1.MessageType.OFFER_REJECTED:
                        if (this.brokerInterceptor) {
                            let interactionId = message.data['interactionId'];
                            let sessionId = message.data['sessionId'];
                            let rejectedReason = message.data['rejectedReason'];
                            this.brokerInterceptor.
                                onOfferRejected(interactionId, sessionId, rejectedReason);
                        }
                        break;
                    case ClientTypes_1.MessageType.SESSION_TRANSFER_OFFERED:
                        if (this.brokerInterceptor) {
                            this.brokerInterceptor.
                                onSessionTransferOffered(message.data);
                        }
                        break;
                    case ClientTypes_1.MessageType.SESSION_TRANSFER_ACCEPTED:
                        if (this.brokerInterceptor) {
                            let sessionId = message.data['sessionId'];
                            let agentId = message.data['agentId'];
                            this.brokerInterceptor.
                                onSessionTransferAccepted(sessionId, agentId);
                        }
                        break;
                    case ClientTypes_1.MessageType.SESSION_TRASFER_FAILED:
                        if (this.brokerInterceptor) {
                            let sessionId = message.data['sessionId'];
                            let failedReason = message.data['failedReason'];
                            this.brokerInterceptor.
                                onSessionTransferFailed(sessionId, failedReason);
                        }
                        break;
                    case ClientTypes_1.MessageType.SESSION_TRANSFER_COMPLEATE:
                        if (this.brokerInterceptor) {
                            let sessionId = message.data['sessionId'];
                            let transferTo = message.data['transferTo'];
                            let transferToDetails = message.data['transferToDetails'];
                            this.brokerInterceptor.
                                onSessionTransferCompleate(sessionId, transferTo, transferToDetails);
                        }
                        break;
                    case ClientTypes_1.MessageType.ANSWER_RECEIVED:
                        if (this.brokerInterceptor) {
                            let interactionId = message.data['interactionId'];
                            let sessionId = message.data['sessionId'];
                            let supportedBrokerType = message.data['supportedBrokerType'];
                            let brokerConf = message.data['brokerConf'];
                            this.brokerInterceptor.onAnswerReceive(interactionId, sessionId, supportedBrokerType, brokerConf);
                            this.syncSession(sessionId, this.getClientId());
                            this.readyForSession(sessionId, this.getClientId());
                        }
                        break;
                    case ClientTypes_1.MessageType.MESSAGE_RECEIVED:
                        // this.sendAck(message.data['sessionId'], message.messageKey);
                        if (this.brokerInterceptor) {
                            let messageData = message.data;
                            this.brokerInterceptor.onMessageReceive(messageData);
                        }
                        break;
                    case ClientTypes_1.MessageType.MESSAGE_SNEAK:
                        if (this.brokerInterceptor) {
                            let messageData = message.data;
                            this.brokerInterceptor.onSeakMessage(messageData);
                        }
                        break;
                    case ClientTypes_1.MessageType.CLIENT_SESSION_JOINED:
                        if (this.brokerInterceptor) {
                            let sessionId = message.data['sessionId'];
                            let clientDetails = message.data['clientDetails'];
                            this.brokerInterceptor.onClientSessionJoin(sessionId, clientDetails);
                        }
                        break;
                    case ClientTypes_1.MessageType.CLIENT_SESSION_LEAVE:
                        if (this.brokerInterceptor) {
                            const sessionId = message.data['sessionId'];
                            let clientId = message.data['clientId'];
                            this.brokerInterceptor.onClientSessionLeave(sessionId, clientId);
                        }
                        break;
                    case ClientTypes_1.MessageType.SESSION_SYNC_RESPONSE:
                        if (this.brokerInterceptor) {
                            this.brokerInterceptor.onSessionSync(message.data);
                        }
                        break;
                    case ClientTypes_1.MessageType.CLIENT_SESSION_REQUESTED:
                        {
                            let sessionId = message.data['sessionId'];
                            this.readyForSession(sessionId, this.getClientId());
                        }
                        break;
                    case ClientTypes_1.MessageType.ON_SESSION_CLOSE_REQUEST:
                        if (this.brokerInterceptor) {
                            //let sessionId:string = message.data['sessionId'];
                            this.brokerInterceptor.onSessionClose(message.data);
                        }
                        break;
                    case ClientTypes_1.MessageType.MESSAGE_ACK:
                        if (this.brokerInterceptor) {
                            let messageKey = message.messageKey;
                            let ackResponseTypes = message.data['ackResType'];
                            this.findAndInvokeAckCallbacks(messageKey, ackResponseTypes, message);
                            let error = message.data['error'];
                            if (error)
                                this.brokerInterceptor.ack(messageKey, ackResponseTypes, error);
                            else
                                this.brokerInterceptor.ack(messageKey, ackResponseTypes);
                        }
                        break;
                    case ClientTypes_1.MessageType.ESCALATE_TO_AGENT:
                        let sessionId = message.data['sessionId'];
                        let customerPayload = message.data;
                        console.log(' [ESCALATE_TO_AGENT] Message received ', message);
                        if (this.brokerInterceptor)
                            this.brokerInterceptor.escalateToAgent(sessionId, customerPayload);
                        break;
                    case ClientTypes_1.MessageType.ON_SUPERVISOR_CHERRY_PICK_SUCCESS:
                        {
                            let sessionId = message.data['sessionId'];
                            let agentId = message.data['agentId'];
                            console.log(' [ON_SUPERVISOR_CHERRY_PICK_SUCCESS] Message received ', message);
                            if (this.brokerInterceptor && this.brokerInterceptor.onSuperVisorCherryPickSuccess)
                                this.brokerInterceptor.onSuperVisorCherryPickSuccess(sessionId, agentId);
                        }
                        break;
                    case ClientTypes_1.MessageType.ON_SUPERVISOR_CHERRY_PICK_FAILED:
                        {
                            let sessionId = message.data['sessionId'];
                            let agentId = message.data['agentId'];
                            let failedReason = message.data['failedReason'];
                            console.log(' [ON_SUPERVISOR_CHERRY_PICK_FAILED] Message received ', message);
                            if (this.brokerInterceptor && this.brokerInterceptor.onSuperVisorCherryPickFailed)
                                this.brokerInterceptor.onSuperVisorCherryPickFailed(sessionId, agentId, failedReason);
                        }
                        break;
                    case ClientTypes_1.MessageType.ON_SUPERVISOR_RE_QUEUE_SUCCESS:
                        {
                            let sessionId = message.data['sessionId'];
                            let queueName = message.data['queueName'];
                            console.log(' [ON_SUPERVISOR_RE_QUEUE_SUCCESS] Message received ', message);
                            if (this.brokerInterceptor && this.brokerInterceptor.onSuperVisorReQueueSuccess)
                                this.brokerInterceptor.onSuperVisorReQueueSuccess(sessionId, queueName);
                        }
                        break;
                    case ClientTypes_1.MessageType.ON_SUPERVISOR_RE_QUEUE_FAILED:
                        {
                            let sessionId = message.data['sessionId'];
                            let queueName = message.data['queueName'];
                            let failedReason = message.data['failedReason'];
                            console.log(' [ON_SUPERVISOR_RE_QUEUE_FAILED] Message received ', message);
                            if (this.brokerInterceptor && this.brokerInterceptor.onSuperVisorReQueueFailed)
                                this.brokerInterceptor.onSuperVisorReQueueFailed(sessionId, queueName, failedReason);
                        }
                        break;
                    default:
                        this.logger.error('MessageType : <' + message.messageType +
                            '> not Supported for Ws-Client : ' + this.clientId);
                        break;
                }
            }
            catch (error) {
                this.logger.error('Error Occurred While Parsing Message for Ws-Client : '
                    + this.clientId
                    + ' ,' + error);
            }
        }
        retryPendingMessages() {
            try {
                let pendingMessages = StandardClientFactory_1.StandardClientFactory
                    .getInstance().
                    getPendingMessage();
                if (pendingMessages && !pendingMessages.isEmpty()) {
                    let message = null;
                    while (!pendingMessages.isEmpty() &&
                        (message = pendingMessages.removeFirst()) != null) {
                        try {
                            if (this.brokerConnection)
                                this.brokerConnection.send(JSON.stringify(message));
                        }
                        catch (error) {
                            StandardClientFactory_1.StandardClientFactory.getInstance().addToPendingMessage(message);
                            throw error;
                        }
                    }
                }
            }
            catch (error) {
                this.logger.debug('[ERROR while retrying failed massages] ' + error);
            }
        }
        findAndInvokeAckCallbacks(messageKey, ackResponseTypes, message) {
            if (ClientTypes_1.AckResponseTypes.MESSAGE_DELEVERED == ackResponseTypes
                && this.messageDeliveredCallBack) {
                let callback = this.messageDeliveredCallBack.get(messageKey);
                if (callback) {
                    callback.bind(this, message)();
                }
            }
            if (ClientTypes_1.AckResponseTypes.MESSAGE_RECEIVED == ackResponseTypes
                && this.messageReceivedCallBack) {
                let callback = this.messageReceivedCallBack.get(messageKey);
                if (callback) {
                    callback.bind(this, message)();
                }
            }
        }
        updateClientId(clientId) {
            this.clientId = clientId;
        }
        getClientId() {
            return this.clientId;
        }
        disconnect(isToApplyRetryAgain) {
            console.log(' [ CLIENT DISCONNECTED ] ');
            if (!isToApplyRetryAgain)
                this.loadUpConf.retryPolicy = undefined;
            if (this.brokerConnection) {
                this.connectionIsConnected = false;
                this.brokerConnection.close();
                this.brokerConnection = null;
            }
        }
        requestTransfer(sessionId, agentToOffer, agentName, additionalData, senderId) {
            let data = {};
            data['sessionId'] = sessionId;
            data['agentToOffer'] = agentToOffer;
            data['agentName'] = agentName;
            data['additionalData'] = additionalData;
            let brokerMessage = new BrokerMessage_1.BrokerMessage(this.BROKER_TYPE, this.getSenderId(senderId), ClientTypes_1.MessageType.SESSION_TRANSFER_OFFERED, data);
            return this.sendMessageToBroker(brokerMessage);
        }
        transferRequestAccepted(sessionId, senderId) {
            let data = {};
            data['sessionId'] = sessionId;
            let brokerMessage = new BrokerMessage_1.BrokerMessage(this.BROKER_TYPE, this.getSenderId(senderId), ClientTypes_1.MessageType.SESSION_TRANSFER_ACCEPTED, data);
            return this.sendMessageToBroker(brokerMessage);
        }
        transferRequestRejected(sessionId, rejectedReason) {
            let data = {};
            data['sessionId'] = sessionId;
            data['rejectedReason'] = rejectedReason;
            let brokerMessage = new BrokerMessage_1.BrokerMessage(this.BROKER_TYPE, this.getSenderId(), ClientTypes_1.MessageType.SESSION_TRASFER_FAILED, data);
            return this.sendMessageToBroker(brokerMessage);
        }
        requestCherryPick(customerDetails, transferTo, sender) {
            let data = {};
            data['customerDetails'] = customerDetails;
            data['transferTo'] = transferTo;
            data['sender'] = sender;
            let brokerMessage = new BrokerMessage_1.BrokerMessage(this.BROKER_TYPE, this.getSenderId(sender), ClientTypes_1.MessageType.REQUEST_FOR_SUPERVISOR_CHERRY_PICK, data);
            return this.sendMessageToBroker(brokerMessage);
        }
        requestReQueue(customerDetails, requeDetails, sender) {
            let data = {};
            data['customerDetails'] = customerDetails;
            data['requeDetails'] = requeDetails;
            let brokerMessage = new BrokerMessage_1.BrokerMessage(this.BROKER_TYPE, this.getSenderId(sender), ClientTypes_1.MessageType.REQUEST_FOR_SUPERVISOR_RE_QUEUE, data);
            return this.sendMessageToBroker(brokerMessage);
        }
        transferSuccessFull(sessionId, transferTo, sender) {
            let data = {};
            data['sessionId'] = sessionId;
            data['transferTo'] = transferTo;
            let brokerMessage = new BrokerMessage_1.BrokerMessage(this.BROKER_TYPE, this.getSenderId(sender), ClientTypes_1.MessageType.SESSION_TRANSFER_COMPLEATE, data);
            return this.sendMessageToBroker(brokerMessage);
        }
        registerWebRTCBrokerInterceptor(webRTCBrokerInterceptor) {
            this.webRTCBrokerInterceptor = webRTCBrokerInterceptor;
        }
    }
    exports.AbstractWSMessageBrokerClient = AbstractWSMessageBrokerClient;
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

/***/ "../cxi-message-broker-client/message-broker/client/websocket/StandardWSMessageBrokerClient.js":
/*!*****************************************************************************************************!*\
  !*** ../cxi-message-broker-client/message-broker/client/websocket/StandardWSMessageBrokerClient.js ***!
  \*****************************************************************************************************/
/***/ ((module, exports, __webpack_require__) => {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__, exports, __webpack_require__(/*! ./AbstractWSMessageBrokerClient */ "../cxi-message-broker-client/message-broker/client/websocket/AbstractWSMessageBrokerClient.js")], __WEBPACK_AMD_DEFINE_RESULT__ = (function (require, exports, AbstractWSMessageBrokerClient_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", ({ value: true }));
    exports.StanderdWSMessageBrokerClient = void 0;
    class StanderdWSMessageBrokerClient extends AbstractWSMessageBrokerClient_1.AbstractWSMessageBrokerClient {
        constructor(clientId, loadUpConf, brokerInterceptor) {
            super(clientId, loadUpConf, brokerInterceptor);
        }
    }
    exports.StanderdWSMessageBrokerClient = StanderdWSMessageBrokerClient;
}).apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
		__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ }),

/***/ "../cxi-message-broker-client/message-broker/logger/Logger.js":
/*!********************************************************************!*\
  !*** ../cxi-message-broker-client/message-broker/logger/Logger.js ***!
  \********************************************************************/
/***/ ((module, exports, __webpack_require__) => {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__, exports, __webpack_require__(/*! ../client/ClientTypes */ "../cxi-message-broker-client/message-broker/client/ClientTypes.js"), __webpack_require__(/*! ../client/websocket/BrokerMessage */ "../cxi-message-broker-client/message-broker/client/websocket/BrokerMessage.js")], __WEBPACK_AMD_DEFINE_RESULT__ = (function (require, exports, ClientTypes_1, BrokerMessage_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", ({ value: true }));
    exports.LoggerType = exports.Logger = void 0;
    window['logger'] = {
        'INFO': true,
        'DEBUG': true,
        'TRACE': false,
    };
    class Logger {
        messageBrokerClient;
        constructor(messageBrokerClient) {
            if (messageBrokerClient) {
                this.messageBrokerClient = messageBrokerClient;
            }
        }
        info(message, sessionId) {
            if (window['logger'][LoggerType.INFO]) {
                console.info(message);
                try {
                    if (this.messageBrokerClient && this.messageBrokerClient.isConnected()) {
                        this.messageBrokerClient.
                            sendMessageToBroker(this.constructTemplate(LoggerType.INFO, message, sessionId));
                    }
                }
                catch (error) {
                    console.error('error sending message to MessageBroker ' + error);
                }
            }
        }
        error(message, sessionId) {
            console.error(message);
            try {
                if (this.messageBrokerClient && this.messageBrokerClient.isConnected()) {
                    this.messageBrokerClient.
                        sendMessageToBroker(this.constructTemplate(LoggerType.ERROR, message, sessionId));
                }
            }
            catch (error) {
                console.error('error sending message to MessageBroker ' + error);
            }
        }
        trace(message, sessionId) {
            if (window['logger'][LoggerType.TRACE]) {
                console.trace(message);
                try {
                    if (this.messageBrokerClient && this.messageBrokerClient.isConnected()) {
                        this.messageBrokerClient.
                            sendMessageToBroker(this.constructTemplate(LoggerType.TRACE, message, sessionId));
                    }
                }
                catch (error) {
                    console.error('error sending message to MessageBroker ' + error);
                }
            }
        }
        debug(message, sessionId) {
            if (window['logger'][LoggerType.DEBUG]) {
                console.debug(message);
                try {
                    if (this.messageBrokerClient && this.messageBrokerClient.isConnected()) {
                        this.messageBrokerClient.
                            sendMessageToBroker(this.constructTemplate(LoggerType.DEBUG, message, sessionId));
                    }
                }
                catch (error) {
                    console.error('error sending message to MessageBroker ' + error);
                }
            }
        }
        constructTemplate(loggerType, msg, sessionId) {
            let messageData = Object.create(null);
            messageData['logType'] = loggerType;
            messageData['message'] = msg;
            if (sessionId)
                messageData['sessionId'] = sessionId;
            let message = new BrokerMessage_1.BrokerMessage(ClientTypes_1.BrokerTypes.WEB_SOCKET, sessionId ? sessionId : this.messageBrokerClient.getClientId(), ClientTypes_1.MessageType.LOG, messageData);
            return message;
        }
    }
    exports.Logger = Logger;
    var LoggerType;
    (function (LoggerType) {
        LoggerType["INFO"] = "INFO";
        LoggerType["DEBUG"] = "DEBUG";
        LoggerType["ERROR"] = "ERROR";
        LoggerType["TRACE"] = "TRACE";
    })(LoggerType = exports.LoggerType || (exports.LoggerType = {}));
}).apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
		__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ }),

/***/ "../cxi-message-broker-client/message-broker/logger/LoggerFactory.js":
/*!***************************************************************************!*\
  !*** ../cxi-message-broker-client/message-broker/logger/LoggerFactory.js ***!
  \***************************************************************************/
/***/ ((module, exports, __webpack_require__) => {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__, exports, __webpack_require__(/*! ./Logger */ "../cxi-message-broker-client/message-broker/logger/Logger.js")], __WEBPACK_AMD_DEFINE_RESULT__ = (function (require, exports, Logger_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", ({ value: true }));
    exports.LoggerFactory = void 0;
    class LoggerFactory {
        constructor() {
        }
        static getLogger(brokerClient) {
            return new Logger_1.Logger(brokerClient);
        }
    }
    exports.LoggerFactory = LoggerFactory;
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


/***/ }),

/***/ "../cxi-message-broker-client/message-broker/utils/NetworkUtils.js":
/*!*************************************************************************!*\
  !*** ../cxi-message-broker-client/message-broker/utils/NetworkUtils.js ***!
  \*************************************************************************/
/***/ ((module, exports, __webpack_require__) => {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__, exports], __WEBPACK_AMD_DEFINE_RESULT__ = (function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", ({ value: true }));
    exports.NetworkUtils = void 0;
    /** Unless otherwise licensed, the software is our proprietary property and all source code, database,
    * functionality, website design, audio, video, text, photographs and graphics on the site or the product (
    * collectively, the “Content”) and the trademarks, service marks, and logos contained therein ( the
    * “Marks”) are owned or controlled by us or licenses to us, and are protected by the copyright and
    * trademark laws and various other intellectual property rights and unfair competition laws in domestic as
    * well as in foreign jurisdictions and international conventions.
    */
    /**
     * A Utility used as network connection and disconnection intimation to message-broker-client.
     */
    class NetworkUtils {
        constructor() { }
        static DISCONNECT_LIST = new Array();
        static CONNECT_LIST = new Array();
        static onNetworkDisconnect(callBack) {
            NetworkUtils.DISCONNECT_LIST.push(callBack);
        }
        static onNetworkConnect(callBack) {
            NetworkUtils.CONNECT_LIST.push(callBack);
        }
        static networkConnected() {
            NetworkUtils.CONNECT_LIST.forEach((callBack) => {
                try {
                    callBack();
                }
                catch (error) {
                    console.error(" [ ERROR ON LAN CONNECTED ] ", error);
                }
            });
        }
        static networkDisconnected() {
            NetworkUtils.DISCONNECT_LIST.forEach((callBack) => {
                try {
                    callBack();
                }
                catch (error) {
                    console.error(" [ ERROR ON LAN DISCONNECTED ] ", error);
                }
            });
        }
    }
    exports.NetworkUtils = NetworkUtils;
}).apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
		__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ }),

/***/ "../cxi-message-broker-client/message-broker/utils/collections/LinkedList.js":
/*!***********************************************************************************!*\
  !*** ../cxi-message-broker-client/message-broker/utils/collections/LinkedList.js ***!
  \***********************************************************************************/
/***/ ((module, exports, __webpack_require__) => {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__, exports, __webpack_require__(/*! ../ClientUtils */ "../cxi-message-broker-client/message-broker/utils/ClientUtils.js")], __WEBPACK_AMD_DEFINE_RESULT__ = (function (require, exports, ClientUtils_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", ({ value: true }));
    exports.LinkedList = void 0;
    class LinkedList {
        head;
        tail;
        constructor() {
            this.head = new ClientUtils_1.DS.Node();
            this.tail = new ClientUtils_1.DS.Node();
            this.head.next = this.tail;
        }
        isEmpty() {
            return this.head.next === this.tail;
        }
        insertFirst(item) {
            // Encapsulate our item into a Node object
            const newNode = new ClientUtils_1.DS.Node(item);
            newNode.next = this.head.next;
            this.head.next = newNode;
        }
        insertLast(item) {
            const newNode = new ClientUtils_1.DS.Node(item);
            let cur = this.head;
            // Advance our cur pointer to just before the tail node
            while (cur && cur.next !== this.tail) {
                cur = cur.next;
            }
            if (cur) {
                newNode.next = this.tail;
                cur.next = newNode;
            }
        }
        removeFirst() {
            if (this.isEmpty()) {
                throw new Error('List is empty');
            }
            let rv = this.head.next;
            if (rv) {
                this.head.next = rv.next;
                rv.next = null;
            }
            // We are returning the data, not the node itself
            return rv ? rv.item : null;
        }
        remove(searchKey) {
            if (this.isEmpty()) {
                throw new Error('List is empty');
            }
            // rv = retval or return value
            let rv = null;
            // cur = current
            let cur = this.head;
            // Advance our cur pointer to the node right before our matching node
            while (cur.next && cur.next.item !== searchKey) {
                cur = cur.next;
            }
            if (cur.next) {
                rv = cur.next;
                cur.next = cur.next.next;
                rv.next = null;
            }
            return rv && rv.item ? rv.item : null;
        }
        contains(searchItem) {
            if (this.isEmpty()) {
                throw new Error('List is empty');
            }
            let rv = false;
            let cur = this.head;
            // Traverse the list in search of a matching item
            while (cur && cur.next !== this.tail) {
                if (cur.next && cur.next.item === searchItem) {
                    rv = true;
                    break;
                }
                cur = cur.next;
            }
            return rv;
        }
        getFirst() {
            if (this.isEmpty()) {
                throw new Error('List is empty');
            }
            return this.head.next ? this.head.next.item : null;
        }
        listContents() {
            let cur = this.head.next;
            while (cur && cur !== this.tail) {
                console.log(`${cur.item}`);
                cur = cur.next;
            }
        }
    }
    exports.LinkedList = LinkedList;
}).apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
		__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ })

}]);
//# sourceMappingURL=cxi-message-broker-client_message-broker_client_websocket_StandardWSMessageBrokerClient_js.main.js.map