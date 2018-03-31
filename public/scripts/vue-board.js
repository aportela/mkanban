/**
 * board (list container) component
 */
var mkanbanBoard = (function () {
    "use strict";

    var template = function () {
        return `
            <div class="columns is-unselectable">
                <div class="column is-2">
                    <div class="field has-addons">
                        <div class="control">
                            <input v-on:keyup.enter="addList();" class="input" type="text" placeholder="type new list name" v-model="newListName">
                        </div>
                        <div class="control">
                            <a v-on:click.prevent="addList();" v-bind:disabled="! newListName" class="button is-info">add</a>
                        </div>
                    </div>
                </div>
            </div>
        `;
    };

    var module = Vue.component('board', {
        template: template(),
        data: function () {
            return ({
                newListName: null
            });
        }, props: [
            'board'
        ], created: function () {
            console.log("[board]: created");
            if (!this.board.lists) {
                this.board.lists = [];
            }
        }, methods: {
            addList: function () {

                let newList = {
                    id: Math.random(),
                    name: this.newListName,
                    created: new Date(),
                    cards: []
                }
                this.board.lists.push(newList);
                console.log("[board]: add list " + newList.name);
                this.newListName = null;
            }
        }
    });

    return (module);
})();

