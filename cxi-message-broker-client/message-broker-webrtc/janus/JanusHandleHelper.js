define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class JanusHandleHelper {
        janusPluginHandle;
        isRecording = false;
        isRecordingSelf = false;
        constructor(pluginHandle) {
            this.janusPluginHandle = pluginHandle;
        }
        /**
         * List rooms in Janus Server
         *
         * @param cb - Callback returning list of rooms
         */
        listRooms(cb) {
            const list = {
                request: "list"
            };
            if (this.janusPluginHandle)
                this.janusPluginHandle.send({
                    message: list,
                    success: function (res) {
                        cb(null, res.list);
                    },
                    error: function (err) {
                        console.error(err);
                        cb(err);
                    }
                });
        }
        /**
         * Record
         *
         * @param roomId - Unique room id
         * @param roomSecret
         * @param record - Is true to start recording
         * @param cb - callback(err, res) returning response after starting recording
         */
        record(roomId, roomSecret, record, cb) {
            const recording = {
                request: "enable_recording",
                room: roomId,
                secret: roomSecret,
                record: record
            };
            if (this.janusPluginHandle)
                this.janusPluginHandle.send({
                    message: recording,
                    success: (res) => {
                        this.isRecording = res.record;
                        cb(null, res);
                    },
                    error: (err) => {
                        console.error(err);
                        cb(err);
                    }
                });
        }
        /**
         * RecordSelf, record my single stream
         *
         * @param record - boolean
         * @param cb - callback(err, res) returning response after starting recording
         */
        recordSelf(record, cb) {
            const recording = {
                request: "configure",
                record: record
            };
            if (this.janusPluginHandle)
                this.janusPluginHandle.send({
                    message: recording,
                    success: (res) => {
                        this.isRecordingSelf = record;
                        cb(null, res);
                    },
                    error: (err) => {
                        console.error(err);
                        cb(err);
                    }
                });
        }
    }
    exports.default = JanusHandleHelper;
});
