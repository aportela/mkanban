/**
 * list (card container) component
 */
var mkanbanList = (function () {
    "use strict";

    var template = function () {
        return `
            <div class="column is-narrow">
                <div class="card mk-list-container">
                    <header class="card-header">
                        <p class="card-header-title has-text-centered">
                            {{ list.name }}
                        </p>
                        <a href="#" class="card-header-icon" aria-label="more options">
                            <span class="icon">
                                <i class="fas fa-angle-down" aria-hidden="true"></i>
                            </span>
                        </a>
                    </header>
                    <div class="card-content dragula-container mk-list-content" v-bind:data-list="list.id">
                        <card v-for="card in list.cards" v-bind:card="card" v-bind:key="card.id"></card>
                    </div>
                    <div v-if="showAddCardForm" class="card-content">
                        <div class="field">
                            <div class="control" v-bind:class="{ 'is-loading': isAddingNewCard, 'has-icons-right': addError }">
                                <input v-bind:disabled="isAddingNewCard" v-on:keyup.enter="saveNewCard();" v-on:keyup.escape="cancelNewCard();" ref="cardTitle" class="input" type="text" placeholder="type card title" v-model="newCardTitle">
                                <span v-show="addError" class="icon is-small is-right">
                                    <i class="fas fa-exclamation-triangle"></i>
                                </span>
                            </div>
                        </div>
                        <div class="field is-grouped">
                            <p class="control"><a class="button is-link"  v-on:click="saveNewCard();">Add</a></p>
                            <p class="control"><a class="button is-default" v-on:click="showAddCardForm = false;">Cancel</a></p>
                        </div>
                    </div>
                    <footer class="card-footer" v-if="! showAddCardForm">
                        <p class="card-footer-item">
                            <a v-on:click.prevent="showAddCardForm = true;"><i class="fa fa-plus"></i> Add card</a>
                        </p>
                    </footer>
                </div>
            </div>
        `;
    };

    var module = Vue.component('list', {
        template: template(),
        data: function () {
            return ({
                isAddingNewCard: false,
                addError: false,
                showAddCardForm: false,
                newCardTitle: null
            });
        }, props: [
            'list'
        ], created: function () {
            console.log("[list]: created");
            if (!this.list.cards) {
                this.list.cards = [];
            }
        }, watch: {
            showAddCardForm: function (v) {
                if (v) {
                    this.$nextTick(() => this.$refs.cardTitle.focus());
                }
            }
        }, methods: {
            saveNewCard: function () {
                this.isAddingNewCard = true;
                this.addError = false;
                let card = {
                    id: Math.random(),
                    title: this.newCardTitle,
                    description: 'this is the long-text description of the card: ' + this.newCardTitle,
                    created: new Date(),
                    attachmentCount: Math.floor(Math.random() * 5) + 1,
                    commentCount: Math.floor(Math.random() * 10) + 1,
                };

                console.log("[list]: adding card (" + card.id + ") " + card.title);
                var self = this;
                mkanbanAPI.card.add({}, function (response) {
                    if (response.ok) {
                        self.list.cards.push(card);
                        self.newCardTitle = null;
                        self.isAddingNewCard = false;
                        self.$nextTick(() => self.$refs.cardTitle.focus());
                    } else {
                        self.isAddingNewCard = false;
                        self.addError = true;
                        self.$nextTick(() => self.$refs.cardTitle.focus());
                    }
                });
            },
            cancelNewCard: function () {
                this.newCardTitle = null;
                this.showAddCardForm = false;
            }
        }
    });

    return (module);
})();