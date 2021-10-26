define(["require", "exports", "../utils/collections/LinkedList"], function (require, exports, LinkedList_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
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
});
