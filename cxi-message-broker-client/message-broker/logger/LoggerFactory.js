define(["require", "exports", "./Logger"], function (require, exports, Logger_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.LoggerFactory = void 0;
    class LoggerFactory {
        constructor() {
        }
        static getLogger(brokerClient) {
            return new Logger_1.Logger(brokerClient);
        }
    }
    exports.LoggerFactory = LoggerFactory;
});
