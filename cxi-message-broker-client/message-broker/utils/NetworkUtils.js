define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.NetworkUtils = void 0;
    /** Unless otherwise licensed, the software is our proprietary property and all source code, database,
    * functionality, website design, audio, video, text, photographs and graphics on the site or the product (
    * collectively, the “Content”) and the trademarks, service marks, and logos contained therein ( the
    * “Marks”) are owned or controlled by us or licenses to us, and are protected by the copyright and
    * trademark laws and various other intellectual property rights and unfair competition laws in domestic as
    * well as in foreign jurisdictions and international conventions.
    */
    /**
     * A Utility used as network connection and disconnection intimation to message-broker-client.
     */
    class NetworkUtils {
        constructor() { }
        static DISCONNECT_LIST = new Array();
        static CONNECT_LIST = new Array();
        static onNetworkDisconnect(callBack) {
            NetworkUtils.DISCONNECT_LIST.push(callBack);
        }
        static onNetworkConnect(callBack) {
            NetworkUtils.CONNECT_LIST.push(callBack);
        }
        static networkConnected() {
            NetworkUtils.CONNECT_LIST.forEach((callBack) => {
                try {
                    callBack();
                }
                catch (error) {
                    console.error(" [ ERROR ON LAN CONNECTED ] ", error);
                }
            });
        }
        static networkDisconnected() {
            NetworkUtils.DISCONNECT_LIST.forEach((callBack) => {
                try {
                    callBack();
                }
                catch (error) {
                    console.error(" [ ERROR ON LAN DISCONNECTED ] ", error);
                }
            });
        }
    }
    exports.NetworkUtils = NetworkUtils;
});
