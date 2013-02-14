/*jslint node: true */
'use strict';

var cookie = require('cookie')
  , crypto = require('crypto')
  , db = require('./db')
  , express = require('express')
  , MemoryStore = express.session.MemoryStore
  , ObjectID = require('mongodb').ObjectID;

var sessionStore = new MemoryStore();
var io;
var online = [];

module.exports = {
    createSocket: function(app) {
        io = require('socket.io').listen(app);
        console.log('about to configure socket.io');
        io.configure(function (){
            // Heroku currently has no support for the WebSocket protocol.
            // One of the drawbacks of using PaaS is the need to conform to the rules
            // and regulations that they apply. Specify the transport mechanism for Heruko
            io.set("transports", ["xhr-polling"]);
            io.set("polling duration", 10);

            io.set('authorization', function (handshakeData, callback) {
                if (handshakeData.headers.cookie) {
                    console.log(handshakeData.headers.cookie);
                    handshakeData.cookie = cookie.parse(decodeURIComponent(handshakeData.headers.cookie));
                    handshakeData.sessionID = handshakeData.cookie['connect.sid'];
                    sessionStore.get(handshakeData.sessionID, function (err, session) {
                        if (err || !session) {
                            return callback(null, false);
                        } else {
                            handshakeData.session = session;
                            console.log('session data', session);
                            return callback(null, true);
                        }
                    });
                }
                else {
                    return callback(null, false);
                }
            });

            io.sockets.on('connection', function (socket) {
                socket.on('joined', function (data) {
                    online.push(socket.handshake.session.username);
                    var message = 'Admin: ' + socket.handshake.session.username
                        + ' has joined\n';
                    socket.emit('chat', { message: message, users: online});
                    socket.broadcast.emit('chat', { message: message, username: socket.handshake.session.username});
                });
                socket.on('clientchat', function (data) {
                    var message = socket.handshake.session.username + ': '
                        + data.message + '\n';
                    socket.emit('chat', { message: message});
                    socket.broadcast.emit('chat', { message: message});
                });
                socket.on('disconnect', function (data) {
                    var username = socket.handshake.session.username;
                    var index = online.indexOf(username);
                    online.splice(index, 1);
                    socket.broadcast.emit('disconnect', { username: username});
                });
//                socket.on('requestData', function (data) {
//                    socket.emit('initExchangeData'
//                        , {exchangeData: transformExchangeData(lastExchangeData)});
//                });
                socket.on('updateAccount', function (data) {
                    module.exports.updateEmail(socket.handshake.session._id,
                        data.email, function(err, numUpdates) {
                            socket.emit('updateSuccess', {});
                        });
                });

            });
        });
    },

    createUser: function(username, email, password, callback) {
        var user = {username: username, email: email
            , password: encryptPassword(password)};
        db.insertOne('users', user, callback);
    },

    getUser: function(username, callback) {
        db.findOne('users', {username: username}, callback);
    },

    getUserById: function(id, callback) {
        db.findOne('users', {_id: new ObjectID(id)}, callback);
    },

    authenticate: function(username, password, callback) {
        db.findOne('users', {username: username}, function(err, user) {
            if (user && (user.password === encryptPassword(password))){
                callback(err, user._id);
            } else {
                callback(err, null);
            }
        });
    },

    updateEmail: function(id, email, callback) {
        db.updateById('users', new ObjectID(id)
            , {email: email}, callback);
    },

    ensureAuthenticated: function (req, res, next) {
        if (req.session._id) {
            return next();
        }
        res.redirect('/');
    },

    getSessionStore: function() {
        return sessionStore;
    }

}

function encryptPassword(plainText) {
    return crypto.createHash('md5').update(plainText).digest('hex');
}