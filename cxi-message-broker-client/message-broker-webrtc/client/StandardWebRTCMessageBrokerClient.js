define(["require", "exports", "./AbstractWebRTCMessageBrokerClient"], function (require, exports, AbstractWebRTCMessageBrokerClient_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.StandardWebRTCMessageBrokerClient = void 0;
    class StandardWebRTCMessageBrokerClient extends AbstractWebRTCMessageBrokerClient_1.AbstractWebRTCMessageBrokerClient {
        constructor(brokerClient, brokerInterceptor, showButtons) {
            super(brokerClient, brokerInterceptor, showButtons);
        }
    }
    exports.StandardWebRTCMessageBrokerClient = StandardWebRTCMessageBrokerClient;
});
