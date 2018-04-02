/**
 * card (modal) details component
 */
var mkanbanCardDetails = (function () {
    "use strict";

    var template = function () {
        return `
            <div class="modal is-active">
                <div class="modal-background"></div>
                <div class="modal-card">
                    <header class="modal-card-head">
                        <p class="modal-card-title">{{ card.title }}</p>
                        <button v-on:click.prevent="close();" class="delete" aria-label="close"></button>
                    </header>
                    <section class="modal-card-body">
                        <!-- Content ... -->
                    </section>
                    <footer class="modal-card-foot">
                        <button v-on:click.prevent="close();" class="button is-success">Save changes</button>
                        <button v-on:click.prevent="close();" class="button">Cancel</button>
                    </footer>
                </div>
            </div>
        `;
    };

    var module = Vue.component('card-details', {
        template: template(),
        data: function () {
            return ({
            });
        }, props: [
            'card'
        ], created: function () {
            console.log("[card-details]: created");
        }, methods: {
            close: function () {
                bus.$emit("closeCardDetails");
            }
        }
    });

    return (module);
})();