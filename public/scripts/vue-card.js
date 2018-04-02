/**
 * card component
 */
var mkanbanCard = (function () {
    "use strict";

    var template = function () {
        return `
            <div class="card mk-card dragula-item" v-bind:data-card="card.id" v-on:click.prevent="showDetails();">
                <div class="card-content">
                    <p class="card-header-title">{{ card.title }}</p>
                    <div class="content">
                        <span v-if="card.description" v-bind:title="card.description">
                            <i class="fas fa-align-left"></i>
                        </span>
                    </div>
                </div>
            </div>
        `;
    };

    var module = Vue.component('card', {
        template: template(),
        data: function () {
            return ({
            });
        }, props: [
            'card'
        ], created: function () {
            console.log("[card]: created");
        }, methods: {
            showDetails: function () {
                console.log("[card]: show details (" + this.card.id + ")");
            }
        }
    });

    return (module);
})();