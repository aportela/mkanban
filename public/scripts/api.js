"use strict";

/**
 * common object for interact with API
 * all methods return callback with vue-resource response object
 */
const mkanbanAPI = {
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