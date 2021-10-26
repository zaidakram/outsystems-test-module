define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
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
});
