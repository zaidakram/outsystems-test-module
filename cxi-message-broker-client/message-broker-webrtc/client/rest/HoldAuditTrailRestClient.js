define(["require", "exports", "./../../janus/JanusHandler"], function (require, exports, JanusHandler_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.HoldAuditTrailRestClient = void 0;
    const r = /:\/\/(.[^/]+)/;
    class HoldAuditTrailRestClient {
        constructor() { }
        static async recordHoldAction(tenantId, sender, interactionId) {
            const response = await fetch(HoldAuditTrailRestClient.domain + '/audit_trail/hold', {
                method: 'POST',
                body: JSON.stringify({ sender, interactionId }),
                headers: { 'Content-Type': 'application/json', 'tenantId': tenantId }
            });
            return response.json().then((data) => {
                if (data.status == 200 && data.data) {
                    JanusHandler_1.JanusHandler.getInstance().unPublish();
                    return new Promise((resolve, reject) => {
                        resolve(true);
                    });
                }
                else {
                    return new Promise((resolve, reject) => {
                        resolve(false);
                    });
                }
            });
        }
        static async recordUnHoldAction(tenantId, sender, interactionId) {
            const response = await fetch(HoldAuditTrailRestClient.domain + '/audit_trail/unhold', {
                method: 'POST',
                body: JSON.stringify({ sender, interactionId }),
                headers: { 'Content-Type': 'application/json', 'tenantId': tenantId }
            });
            return response.json().then((data) => {
                if (data.status == 200 && data.data) {
                    JanusHandler_1.JanusHandler.getInstance().publish();
                    return new Promise((resolve, reject) => {
                        resolve(true);
                    });
                }
                else {
                    return new Promise((resolve, reject) => {
                        resolve(false);
                    });
                }
            });
        }
        static domain = '';
        static initializeRestUrl(url) {
            try {
                let matcher = url.match(r);
                if (matcher && matcher[1]) {
                    HoldAuditTrailRestClient.domain = "https://" + matcher[1] + "/reporting-server";
                    console.log('[ConstructDispatcherUrl],Url:' + HoldAuditTrailRestClient.domain);
                }
            }
            catch (error) {
                console.error('[ConstructDispatcherUrl] :Error :', error);
            }
        }
    }
    exports.HoldAuditTrailRestClient = HoldAuditTrailRestClient;
});
