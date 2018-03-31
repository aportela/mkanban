/**
 * board (list container) component
 */
var mkanbanBoard = (function () {
    "use strict";

    var template = function () {
        return `
            <div class="columns is-unselectable">
                <list v-for="list in board.lists" :key="list.id" v-bind:list="list"></list>
                <div class="column is-2">
                    <div class="field has-addons">
                        <div class="control">
                            <input v-on:keyup.enter="addList();" ref="listName" class="input" type="text" placeholder="Add list" v-model="newListName">
                        </div>
                        <div class="control">
                            <a v-on:click.prevent="addList();" v-bind:disabled="! newListName" class="button is-info">Save</a>
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
            this.$nextTick(() => this.$refs.listName.focus());
        }, methods: {
            addList: function () {
                let list = {
                    id: Math.random(),
                    name: this.newListName,
                    created: new Date(),
                    cards: []
                }
                this.board.lists.push(list);
                console.log("[board]: add list " + list.name);
                this.newListName = null;
            }
        }
    });

    return (module);
})();