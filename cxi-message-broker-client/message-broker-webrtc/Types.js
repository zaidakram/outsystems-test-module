/** Unless otherwise licensed, the software is our proprietary property and all source code, database,
* functionality, website design, audio, video, text, photographs and graphics on the site or the product (
* collectively, the “Content”) and the trademarks, service marks, and logos contained therein ( the
* “Marks”) are owned or controlled by us or licenses to us, and are protected by the copyright and
* trademark laws and various other intellectual property rights and unfair competition laws in domestic as
* well as in foreign jurisdictions and international conventions.
*/
// export enum MessageType{
//     CANDIDATES='CANDIDATES',
//     CONFIRMATION_ACCEPTED='CONFIRMATION_ACCEPTED',
//     CONFIRMATION_REJECTED='CONFIRMATION_REJECTED',
//     SESSION_CLOSE='SESSION_CLOSE',
//     SESSION_CLOSED='SESSION_CLOSED'
// }
define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.CallType = void 0;
    var CallType;
    (function (CallType) {
        CallType["AUDIO"] = "AUDIO";
        CallType["VIDEO"] = "VIDEO";
    })(CallType = exports.CallType || (exports.CallType = {}));
});
