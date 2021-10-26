define(["require", "exports", "../client/ClientTypes", "../client/websocket/BrokerMessage"], function (require, exports, ClientTypes_1, BrokerMessage_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
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
});
