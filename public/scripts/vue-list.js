/**
 * list (card container) component
 */
var mkanbanList = (function () {
    "use strict";

    var template = function () {
        return `
            <div class="column">
                <div class="card">
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
                    <div class="card-content dragula-container" v-bind:data-list="list.id">
                        <card v-for="card in list.cards" v-bind:card="card" v-bind:key="card.id"></card>
                    </div>
                    <div v-if="newCard" class="card-content">
                        <div class="control">
                            <input v-on:keyup.enter="addCard();" ref="cardTitle" class="input" type="text" placeholder="type card title" v-model="newCardTitle">
                        </div>
                    </div>
                    <footer class="card-footer">
                        <p class="card-footer-item">
                            <a v-on:click.prevent="addCard();"><i class="fa fa-plus-circle"></i> Add card</a>
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
                newCard: false,
                newCardTitle: null
            });
        }, props: [
            'list'
        ], created: function () {
            console.log("[list]: created");
            if (!this.list.cards) {
                this.list.cards = [];
            }
        }, methods: {
            addCard: function () {
                if (!this.newCard) {
                    this.newCard = true;
                    this.$nextTick(() => this.$refs.cardTitle.focus());
                } else {
                    let card = {
                        id: Math.random(),
                        title: this.newCardTitle,
                        description: 'this is the long-text description of the card: ' + this.newCardTitle,
                        created: new Date()
                    };

                    this.list.cards.push(card);
                    console.log("[list]: add card " + card.title);
                    this.newCard = false;
                    this.newCardTitle = null;
                }
            }
        }
    });

    return (module);
})();