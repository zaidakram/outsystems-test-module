define(["require", "exports", "../client/ClientTypes"], function (require, exports, ClientTypes_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
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
});
