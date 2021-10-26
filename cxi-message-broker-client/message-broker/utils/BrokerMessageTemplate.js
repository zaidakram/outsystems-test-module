define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.SenderType = exports.MessageTypeTemplate = void 0;
    /** Unless otherwise licensed, the software is our proprietary property and all source code, database,
    * functionality, website design, audio, video, text, photographs and graphics on the site or the product (
    * collectively, the “Content”) and the trademarks, service marks, and logos contained therein ( the
    * “Marks”) are owned or controlled by us or licenses to us, and are protected by the copyright and
    * trademark laws and various other intellectual property rights and unfair competition laws in domestic as
    * well as in foreign jurisdictions and international conventions.
    */
    var MessageTypeTemplate;
    (function (MessageTypeTemplate) {
        MessageTypeTemplate["TEXT"] = "text";
        MessageTypeTemplate["EVENT"] = "event";
        MessageTypeTemplate["FILE"] = "file";
        MessageTypeTemplate["AUDIO"] = "audio";
    })(MessageTypeTemplate = exports.MessageTypeTemplate || (exports.MessageTypeTemplate = {}));
    var SenderType;
    (function (SenderType) {
        SenderType["CUSTOMER"] = "Customer";
        SenderType["AGENT"] = "Agent";
        SenderType["SUPERVISOR"] = "Supervisor";
        SenderType["BOT"] = "Bot";
        SenderType["SYSTEM"] = "System";
    })(SenderType = exports.SenderType || (exports.SenderType = {}));
});
