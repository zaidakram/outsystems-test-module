define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class Event {
        handlers = [];
        on(handler) {
            this.handlers.push(handler);
        }
        off(handler) {
            this.handlers = this.handlers.filter(h => h !== handler);
        }
        trigger(data) {
            this.handlers.slice(0).forEach(h => h(data));
        }
        expose() {
            return this;
        }
    }
    exports.default = Event;
});
