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

            var self = this;
            // event (dragula): card dropped
            bus.$on("dragulaDrop", function (card, fromList, toList) {
                console.log("[app]: event dragulaDrop")
                var obj = null;
                var sourceListIdx = -1;
                var sourceCardIdx = -1;
                var destCardIdx = 0;
                // get card object from source list
                for (var i = 0, notFound = true; i < self.board.lists.length && notFound; i++) {
                    if (self.board.lists[i].id == fromList) { // source list
                        sourceListIdx = i;
                        for (var j = 0; j < self.board.lists[i].cards.length && notFound; j++) {
                            if (self.board.lists[i].cards[j].id == card) { // card on source list
                                sourceCardIdx = j;
                                obj = self.board.lists[i].cards[j];
                                notFound = false;
                            }
                        }
                    }
                }
                if (obj) {
                    for (var i = 0, notFound = true; i < self.board.lists.length && notFound; i++) {
                        if (self.board.lists[i].id == toList) { // source list
                            self.board.lists[i].cards.splice(destCardIdx, 0, obj);
                            notFound = false;
                        }
                    }
                    self.board.lists[sourceListIdx].cards.splice(sourceCardIdx, 1);
                }
            });

            this.$nextTick(() => this.$refs.listName.focus());
        }, mounted: function () {
            this.updateDragulaElements();
        }, computed: {
            listCount: function () {
                return (this.board.lists.length);
            }
        }, watch: {
            listCount: function (v) {
                this.updateDragulaElements();
            }
        }, methods: {
            updateDragulaElements: function () {
                console.log("[board]: updating dragula elements");
                for (var i = 0, el = [], listElements = document.getElementsByClassName('dragula-container'); i < listElements.length; i++) {
                    el.push(listElements[i]);
                }
                dragula({ containers: el.length > 1 ? el : [el] }).on("drop", function (element, target, source, sibling) {
                    bus.$emit("dragulaDrop", element.dataset.card, source.dataset.list, target.dataset.list);
                });
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