define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    /** Unless otherwise licensed, the software is our proprietary property and all source code, database,
    * functionality, website design, audio, video, text, photographs and graphics on the site or the product (
    * collectively, the “Content”) and the trademarks, service marks, and logos contained therein ( the
    * “Marks”) are owned or controlled by us or licenses to us, and are protected by the copyright and
    * trademark laws and various other intellectual property rights and unfair competition laws in domestic as
    * well as in foreign jurisdictions and international conventions.
    */
    class Utils {
        randomInteger(pow) {
            return Math.floor(Math.random() * pow);
        }
        ;
        getIceServers(stun, turn, turnUsername, turnPassword) {
            const stunServer = (stun) ? { urls: stun } : null;
            const turnServer = (turn) ? {
                urls: turn,
                credential: turnPassword,
                username: turnUsername
            } : null;
            const iceServers = [{
                    urls: "stun:stun.l.google.com:19302"
                }];
            if (stunServer)
                iceServers.push(stunServer);
            if (turnServer)
                iceServers.push(turnServer);
            return iceServers;
        }
    }
    exports.default = Utils;
});
