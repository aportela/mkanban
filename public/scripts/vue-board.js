/**
 * board (list container) component
 */
var mkanbanBoard = (function () {
    "use strict";

    var template = function () {
        return `
            <div>
                <div class="columns is-unselectable is-mobile is-multiline">
                    <list v-for="list in board.lists" v-bind:list="list" v-bind:key="list.id"></list>
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
                <card-details v-if="popup" v-bind:card="{ title: 'TODO: use real card data' }"></card-details>
            </div>
        `;
    };

    var module = Vue.component('board', {
        template: template(),
        data: function () {
            return ({
                board: {
                    id: null,
                    lists: []
                },
                newListName: null,
                drake: null,
                isDragging: false,
                dropData: {},
                popup: false
            });
        }, props: [
            'id'
        ], created: function () {
            console.log("[board]: created");

            this.board.id = this.id;

            this.get();

            var self = this;
            bus.$on("showCardDetails", function (id) {
                console.log("[board]: showCardDetails event received");
                self.showCardDetails(id);
            });
            bus.$on("closeCardDetails", function () {
                console.log("[board]: closeCardDetails event received");
                self.hideCardDetails();
            });

            this.drake = dragula(
                {
                    revertOnSpill: true,
                    isContainer: function (el) {
                        return el.classList.contains('dragula-container');
                    },
                    moves: function (el, source, handle, sibling) {
                        return el.classList.contains('dragula-item');
                    },
                    accepts: function (el, target, source, sibling) {
                        return target.classList.contains('dragula-container');
                    }
                }
            );
            var self = this;

            this.drake.on("drag", function (element, source) {
                console.log("[board]: event dragulaDrag");
                self.dropData.fromCardIdx = [].indexOf.call(element.parentNode.children, element);
            });
            this.drake.on("drop", function (element, target, source, sibling) {
                console.log("[board]: event dragulaDrop");
                self.dropData.toCardIdx = [].indexOf.call(element.parentNode.children, element);

                console.group("[board]: Before drop");
                self.board.lists.forEach(function (list, lindex, larray) {
                    console.group("List: " + list.name);
                    list.cards.forEach(function (card, cindex, carray) {
                        console.log("Card: " + card.title);
                    });
                    console.groupEnd();
                });
                console.groupEnd();

                const sourceListIndex = self.board.lists.findIndex(list => list.id == source.dataset.list);
                const destListIndex = self.board.lists.findIndex(list => list.id == target.dataset.list);
                self.board.lists[destListIndex].cards.splice( // add card
                    self.dropData.toCardIdx, // on destination list dropped card index
                    0,
                    self.board.lists[sourceListIndex].cards.splice( // remove card
                        self.dropData.fromCardIdx, // from source list on dragged card index
                        1
                    )[0]
                );

                console.group("[board]: After drop");
                self.board.lists.forEach(function (list, lindex, larray) {
                    console.group("List: " + list.name);
                    list.cards.forEach(function (card, cindex, carray) {
                        console.log("Card: " + card.title);
                    });
                    console.groupEnd();
                });
                console.groupEnd();
            });
            this.$nextTick(() => this.$refs.listName.focus());
        }, mounted: function () {
            this.updateDragulaElements();
        }, computed: {
            listCount: function () {
                return (this.board.lists ? this.board.lists.length : 0);
            }
        }, watch: {
            id: function (v) {
                this.board.id = v;
                this.get();
            },
            listCount: function (v) {
                this.updateDragulaElements();
            }
        }, methods: {
            get: function () {
                console.log("[board]: loading board (" + this.board.id + ") details");
                var self = this;
                mkanbanAPI.board.get({ id: this.board.id }, function (response) {
                    if (response.ok) {
                        self.board = response.body.board;
                    } else {
                        // TODO
                    }
                });
            },
            updateDragulaElements: function () {
                console.log("[board]: updating dragula drag containers");
                this.drake.containers = Array.from(document.getElementsByClassName('dragula-container'));
            },
            addList: function () {
                let list = {
                    id: mKanban.utils.uuidv4(),
                    name: this.newListName,
                    created: new Date(),
                    cards: []
                }
                this.board.lists.push(list);
                console.log("[board]: add list " + list.name);
                this.newListName = null;
                this.$nextTick(() => this.$refs.listName.focus());
            },
            showCardDetails: function (id) {
                console.log("[board]: loading card (" + id + ") details");
                var self = this;
                mkanbanAPI.card.get({ id: id }, function (response) {
                    if (response.ok) {
                        self.popup = true;
                    } else {
                        // TODO
                    }
                });
            },
            hideCardDetails: function () {
                this.popup = false;
            }
        }
    });

    return (module);
})();