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
                newListName: null,
                drake: null,
                isDragging: false
            });
        }, props: [
            'board'
        ], created: function () {
            console.log("[board]: created");

            if (!this.board.lists) {
                this.board.lists = [];
            }

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
            this.drake.on("drop", function (element, target, source, sibling) {
                if (target != source) {
                    console.clear();
                    console.log(self.drake.dragging);
                    console.log("[board]: event dragulaDrop");

                    // card dropped from list list (index)
                    const sourceListIndex = self.board.lists.findIndex(list => list.id == source.dataset.list);
                    // index (on source list) of dropped card
                    const sourceCardIdx = self.board.lists[sourceListIndex].cards.findIndex(card => card.id == element.dataset.card);
                    // card dropped to list list (index)
                    const destListIndex = self.board.lists.findIndex(list => list.id == target.dataset.list);

                    // destination list dom object
                    var destinationListElement = Array.from(document.getElementsByClassName('dragula-container')).find(dstEl => dstEl.dataset.list == target.dataset.list);
                    // index (on destination list dom) of dropped card
                    var destinationCardElementIndex = Array.from(destinationListElement.getElementsByClassName('dragula-item')).findIndex(dstEl => dstEl.dataset.card == element.dataset.card);

                    const card = self.board.lists[sourceListIndex].cards[sourceCardIdx];

                    console.group("Before update dataset");
                    self.board.lists.forEach(function (list, lindex, larray) {
                        console.group("List: " + list.name);
                        list.cards.forEach(function (card, cindex, carray) {
                            console.log("Card: " + card.title);
                        });
                        console.groupEnd();
                    });
                    console.groupEnd();

                    console.log("###################################################");

                    console.group("Drag&Drop card");
                    console.group("Drag");
                    console.log("From list: %s (index: %d)", self.board.lists[sourceListIndex].name, sourceListIndex);
                    console.log("From card index %d", sourceCardIdx);
                    console.groupEnd();

                    console.group("Drop");
                    console.log("To list: %s (index: %d)", self.board.lists[destListIndex].name, destListIndex);
                    console.log("To card index %d", destinationCardElementIndex);
                    console.groupEnd();
                    console.groupEnd();

                    console.log("###################################################");


                    self.board.lists[sourceListIndex].cards.splice(sourceCardIdx, 1);

                    console.group("After remove card on source");
                    self.board.lists.forEach(function (list, lindex, larray) {
                        console.group("List: " + list.name);
                        list.cards.forEach(function (card, cindex, carray) {
                            console.log("Card: " + card.title);
                        });
                        console.groupEnd();
                    });
                    console.groupEnd();

                    console.log("###################################################");

                    self.board.lists[destListIndex].cards.splice(destinationCardElementIndex, 0, card);

                    console.group("Final list dataset");
                    self.board.lists.forEach(function (list, lindex, larray) {
                        console.group("List: " + list.name);
                        list.cards.forEach(function (card, cindex, carray) {
                            console.log("Card: " + card.title);
                        });
                        console.groupEnd();
                    });
                    console.groupEnd();
                } else {
                    console.log("Reorder on same list: todo");
                    self.drake.cancel(true);
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
                console.log("[board]: updating dragula drag containers");
                this.drake.containers = Array.from(document.getElementsByClassName('dragula-container'));
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