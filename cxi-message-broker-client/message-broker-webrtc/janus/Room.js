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
    const Janus = require('./third-party/janus/janusBundle');
    class Room {
        dispatcherServer;
        roomId;
        roomName;
        username;
        password;
        roomAdminSecret;
        constructor(dispatcherServer, username, password, roomId, roomName, roomAdminSecret) {
            this.dispatcherServer = dispatcherServer;
            if (roomName) {
                this.roomName = roomName;
            }
            else {
                this.roomName = `randomRoom-${Janus.randomString(12)}`;
            }
            this.roomId = roomId;
            this.username = username;
            this.password = password;
            this.roomAdminSecret = roomAdminSecret;
        }
        createRoom(roomId, roomName, roomSecret, cb) {
            let myHeaders = new Headers();
            myHeaders.append("Content-Type", "application/json");
            myHeaders.append('Authorization', 'Basic ' + btoa(this.username + ":" + this.password));
            let raw = (roomId) ? JSON.stringify({ roomId, roomName, "secret": roomSecret }) :
                JSON.stringify({ roomName, "secret": roomSecret });
            let requestOptions = {
                method: 'POST',
                headers: myHeaders,
                body: raw
            };
            fetch(`${this.dispatcherServer}/create`, requestOptions)
                .then(res => {
                res.json().then(data => {
                    this.roomId = data.roomId;
                    this.roomName = roomName;
                    cb(null, data);
                });
            }).catch(err => cb(err));
        }
        getServerForRoom(roomId, cb) {
            let myHeaders = new Headers();
            myHeaders.append('Authorization', 'Basic ' + btoa(this.username + ":" + this.password));
            let requestOptions = {
                method: 'GET',
                headers: myHeaders
            };
            fetch(`${this.dispatcherServer}/room-server/${roomId}`, requestOptions)
                .then(res => {
                res.json().then(data => {
                    this.roomId = roomId;
                    // this.roomName = data.roomName;
                    cb(null, data);
                });
            })
                .catch(err => cb(err));
        }
        destroyRoom(roomSecret, cb) {
            if (!this.roomId) {
                return cb(new Error('Missing room Id'));
            }
            let myHeaders = new Headers();
            myHeaders.append("Content-Type", "application/json");
            myHeaders.append('Authorization', 'Basic ' + btoa(this.username + ":" + this.password));
            let raw = JSON.stringify({ "roomId": this.roomId, "secret": roomSecret });
            let requestOptions = {
                method: 'POST',
                headers: myHeaders,
                body: raw
            };
            fetch(`${this.dispatcherServer}/destroy`, requestOptions)
                .then(res => {
                cb(null, true);
            }).catch(err => cb(err));
        }
    }
    exports.default = Room;
});
