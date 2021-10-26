define(["require", "exports", "../../utils/ClientUtils"], function (require, exports, ClientUtils_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
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
});
