/**
 * home component
 */
var mkanbanHome = (function () {
    "use strict";

    var template = function () {
        return `
            <div>
                <topmenu v-bind:boards="boards"></topmenu>
                <div class="section">
                    <board v-if="defaultBoard" v-bind:id="defaultBoard"></board>
                </div>
            </div>
        `;
    };

    var module = Vue.component('home', {
        template: template(),
        data: function () {
            return ({
                defaultBoard: null,
                boards: []
            });
        }, created: function () {
            console.log("[home]: created");
            var self = this;
            mkanbanAPI.board.search(function (response) {
                if (response.ok) {
                    self.boards = response.body.boards;
                    console.log("[home]: " + self.boards.length + " boards found");
                    if (self.boards && self.boards.length > 0) {
                        self.defaultBoard = self.boards[0].id;
                        console.log("[home]: setting default board: " + self.boards[0].name + " (" + self.boards[0].id + ")");
                    }
                } else {
                    // TODO
                    console.error("[home]: error loading boards");
                }
            });
        }
    });

    return (module);
})();