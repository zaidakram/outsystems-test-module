define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
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
});
