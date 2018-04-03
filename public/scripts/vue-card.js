/**
 * card component
 */
var mkanbanCard = (function () {
    "use strict";

    var template = function () {
        return `
            <div class="card mk-card dragula-item" v-bind:data-card="card.id" v-on:click.prevent="showDetails();">
                <div class="card-content mk-card-content">
                    <div class="tags mk-small-tags-container">
                        <span class="tag is-danger"> </span>
                        <span class="tag is-primary"> </span>
                        <span class="tag is-link"> </span>
                        <span class="tag is-info"> </span>
                    </div>
                    <p class="card-header-title">{{ card.title }}</p>
                    <div class="content">
                        <span v-if="card.description" v-bind:title="card.description">
                            <i class="fas fa-align-left"></i>
                        </span>
                        <span v-if="card.commentCount >0">
                            <i class="fas fa-comment"></i> {{ card.commentCount}}
                        </span>
                        <span v-if="card.attachmentCount >0">
                            <i class="fas fa-paperclip"></i> {{ card.attachmentCount}}
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
                bus.$emit("showCardDetails", this.card.id);
            }
        }
    });

    return (module);
})();