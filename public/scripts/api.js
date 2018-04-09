"use strict";

/**
 * common object for interact with API
 * all methods return callback with vue-resource response object
 */
const mkanbanAPI = {
    user: {
        signUp: function (email, password, callback) {
            var params = {
                email: email,
                password: password
            }
            Vue.http.post("api/user/signup", params).then(
                response => {
                    callback(response);
                },
                response => {
                    callback(response);
                }
            );
        },
        signIn: function (email, password, callback) {
            var params = {
                email: email,
                password: password
            }
            Vue.http.post("api/user/signin", params).then(
                response => {
                    callback(response);
                },
                response => {
                    callback(response);
                }
            );
        },
        signOut: function (callback) {
            Vue.http.get("api/user/signout").then(
                response => {
                    callback(response);
                },
                response => {
                    callback(response);
                }
            );
        }
    },
    board: {
        search: function (callback) {
            Vue.http.get("/boards.json").then(
                response => {
                    callback(response);
                },
                response => {
                    callback(response);
                }
            );
        },
        get: function (id, callback) {
            Vue.http.get("/board.json", { id: id }).then(
                response => {
                    callback(response);
                },
                response => {
                    callback(response);
                }
            );
        }
    },
    card: {
        add: function (card, callback) {
            Vue.http.get("/", card).then(
                response => {
                    callback(response);
                },
                response => {
                    callback(response);
                }
            );
        },
        get: function (id, callback) {
            Vue.http.get("/", { id: id }).then(
                response => {
                    callback(response);
                },
                response => {
                    callback(response);
                }
            );
        }
    }
};