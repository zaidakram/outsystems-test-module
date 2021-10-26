define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Queue = void 0;
    /** Unless otherwise licensed, the software is our proprietary property and all source code, database,
    * functionality, website design, audio, video, text, photographs and graphics on the site or the product (
    * collectively, the “Content”) and the trademarks, service marks, and logos contained therein ( the
    * “Marks”) are owned or controlled by us or licenses to us, and are protected by the copyright and
    * trademark laws and various other intellectual property rights and unfair competition laws in domestic as
    * well as in foreign jurisdictions and international conventions.
    */
    class Queue {
        queue;
        length; // number of elements currently in the queue
        maxSize; // maximum number of elements queue can contain
        constructor(maxSize) {
            // Make sure maxSize is at least 1
            this.maxSize = maxSize > 0 ? maxSize : 10;
            this.length = 0;
            this.queue = new Array(this.maxSize);
        }
        isEmpty() {
            return this.length === 0;
        }
        isFull() {
            return this.length === this.maxSize;
        }
        enqueue(newItem) {
            if (this.isFull()) {
                throw new Error('Queue overflow');
            }
            else {
                this.queue[this.length++] = newItem; // post-increment adds 1 to length after insertion
            }
        }
        dequeue() {
            if (this.isEmpty()) {
                throw new Error('Queue underflow');
            }
            const retval = this.queue[0];
            for (let i = 0; i < this.length; i++) {
                this.queue[i] = this.queue[i + 1];
            }
            this.length--; // we need to decrease length by 1
            return retval;
        }
        peek() {
            if (this.isEmpty()) {
                throw new Error('Queue is empty');
            }
            return this.queue[0];
        }
        queueContents() {
            console.log('Queue Contents');
            for (let i = 0; i < this.length; ++i) {
                console.log(`queue[${i}]: ${this.queue[i]}`);
            }
        }
    }
    exports.Queue = Queue;
});
