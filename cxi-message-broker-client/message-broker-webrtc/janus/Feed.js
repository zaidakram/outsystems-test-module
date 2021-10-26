define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class Feed {
        id;
        display;
        audio_codec;
        video_codec;
        talking;
        janusPluginHandle;
        rfindex;
        isRemote;
        intervalId;
        constructor(params) {
            this.id = params.id;
            this.display = params.display;
            this.audio_codec = params.audio_codec;
            this.video_codec = params.video_codec;
            this.talking = params.talking;
            this.janusPluginHandle = params.janusPluginHandle;
            this.rfindex = params.rfindex;
            this.isRemote = params.isRemote;
        }
    }
    exports.default = Feed;
});
