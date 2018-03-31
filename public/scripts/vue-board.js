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

            // init dragula configuration
            dragula(
                {
                    isContainer: function (el) {
                        return el.classList.contains('dragula-container');
                    },
                    moves: function (el, source, handle, sibling) {
                        return (false);
                    },
                    accepts: function (el, source, handle, sibling) {
                        return el.classList.contains('dragula-item');
                    }
                }
            );
            this.$nextTick(() => this.$refs.listName.focus());
        }, mounted: function() {
            this.updateDragulaElements();
        }, computed: {
            listCount: function() {
                return(this.board.lists.length);
            }
        }, watched: {
            listCount: function(v) {
                this.updateDragulaElements();
            }
        }, methods: {
            updateDragulaElements: function() {
                console.log("[board]: updating dragula elements");
                for (var i = 0, el = [], listElements = document.getElementsByClassName('dragula-container'); i < listElements.length; i++) {
                    el.push(listElements[i]);
                }
                dragula(el.length > 1 ? el : [el]);
            },
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