define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.RecordingAuditTrailRestClient = void 0;
    class RecordingAuditTrailRestClient {
        static async record(url, interactionId, roomId, { display, janusClientId, audioCodec, videoCodec, recording, janusServerHost }) {
            recording = (recording != undefined) ? recording : false;
            console.log('RecordingAuditTrailRestClient', { interactionId, display, janusClientId, audioCodec, videoCodec, roomId, janusServerHost });
            const response = await fetch(url, {
                method: 'POST',
                body: JSON.stringify({ interactionId, display, janusClientId, audioCodec, videoCodec, roomId, recording, janusServerHost }),
                headers: { 'Content-Type': 'application/json' }
            });
            if (!response.ok) {
                return new Promise((resolve, reject) => {
                    resolve(false);
                });
            }
            return new Promise((resolve, reject) => {
                resolve(true);
            });
        }
    }
    exports.RecordingAuditTrailRestClient = RecordingAuditTrailRestClient;
});
