define(["require", "exports", "../ClientUtils"], function (require, exports, ClientUtils_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.LinkedList = void 0;
    class LinkedList {
        head;
        tail;
        constructor() {
            this.head = new ClientUtils_1.DS.Node();
            this.tail = new ClientUtils_1.DS.Node();
            this.head.next = this.tail;
        }
        isEmpty() {
            return this.head.next === this.tail;
        }
        insertFirst(item) {
            // Encapsulate our item into a Node object
            const newNode = new ClientUtils_1.DS.Node(item);
            newNode.next = this.head.next;
            this.head.next = newNode;
        }
        insertLast(item) {
            const newNode = new ClientUtils_1.DS.Node(item);
            let cur = this.head;
            // Advance our cur pointer to just before the tail node
            while (cur && cur.next !== this.tail) {
                cur = cur.next;
            }
            if (cur) {
                newNode.next = this.tail;
                cur.next = newNode;
            }
        }
        removeFirst() {
            if (this.isEmpty()) {
                throw new Error('List is empty');
            }
            let rv = this.head.next;
            if (rv) {
                this.head.next = rv.next;
                rv.next = null;
            }
            // We are returning the data, not the node itself
            return rv ? rv.item : null;
        }
        remove(searchKey) {
            if (this.isEmpty()) {
                throw new Error('List is empty');
            }
            // rv = retval or return value
            let rv = null;
            // cur = current
            let cur = this.head;
            // Advance our cur pointer to the node right before our matching node
            while (cur.next && cur.next.item !== searchKey) {
                cur = cur.next;
            }
            if (cur.next) {
                rv = cur.next;
                cur.next = cur.next.next;
                rv.next = null;
            }
            return rv && rv.item ? rv.item : null;
        }
        contains(searchItem) {
            if (this.isEmpty()) {
                throw new Error('List is empty');
            }
            let rv = false;
            let cur = this.head;
            // Traverse the list in search of a matching item
            while (cur && cur.next !== this.tail) {
                if (cur.next && cur.next.item === searchItem) {
                    rv = true;
                    break;
                }
                cur = cur.next;
            }
            return rv;
        }
        getFirst() {
            if (this.isEmpty()) {
                throw new Error('List is empty');
            }
            return this.head.next ? this.head.next.item : null;
        }
        listContents() {
            let cur = this.head.next;
            while (cur && cur !== this.tail) {
                console.log(`${cur.item}`);
                cur = cur.next;
            }
        }
    }
    exports.LinkedList = LinkedList;
});
