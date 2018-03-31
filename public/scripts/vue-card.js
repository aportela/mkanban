/**
 * card component
 */
var mkanbanList = (function () {
    "use strict";

    var template = function () {
        return `
            <div class="card mk-card">
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
        }
    });

    return (module);
})();
