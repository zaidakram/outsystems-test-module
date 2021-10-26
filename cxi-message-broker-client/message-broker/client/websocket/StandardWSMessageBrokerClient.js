define(["require", "exports", "./AbstractWSMessageBrokerClient"], function (require, exports, AbstractWSMessageBrokerClient_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.StanderdWSMessageBrokerClient = void 0;
    class StanderdWSMessageBrokerClient extends AbstractWSMessageBrokerClient_1.AbstractWSMessageBrokerClient {
        constructor(clientId, loadUpConf, brokerInterceptor) {
            super(clientId, loadUpConf, brokerInterceptor);
        }
    }
    exports.StanderdWSMessageBrokerClient = StanderdWSMessageBrokerClient;
});
