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

                        <div class="field">
                            <label class="label">Description</label>
                            <div v-if="! editDescription">
                                <span v-if="description">{{ description }}</span>
                                <p><span v-on:click.prevent="editDescription = true;" class="mk-cursor-pointer">Edit</span></p>
                            </div>
                            <div v-else>
                                <div class="control">
                                    <textarea ref="description" v-model="description" class="textarea" type="text" placeholder="Write Comment" rows="2"></textarea>
                                </div>
                            </div>
                        </div>
                        <div class="field is-grouped" v-if="editDescription">
                            <div class="control">
                                <button class="button is-link" v-on:click.prevent="editDescription = false;" v-bind:disabled="! description">Save</button>
                            </div>
                            <div class="control">
                                <button class="button is-text" v-on:click.prevent="editDescription = false; description = null;" v-bind:disabled="! description">Cancel</button>
                            </div>
                        </div>

                        <div class="field">
                            <label class="label">Tags</label>
                            <div class="tags">
                                <span class="tag is-danger">php</span>
                                <span class="tag is-primary">devel</span>
                                <span class="tag is-link">urgent</span>
                                <span class="tag is-info">backend</span>
                            </div>
                        </div>

                        <div class="field">
                            <label class="label"> <i class="fas fa-paperclip"></i> Attachments</label>
                            <span v-on:click.prevent="addAttachment = true;" v-if="! addAttachment" class="mk-cursor-pointer">Add</span>
                        </div>

                        <hr>

                        <div class="field">
                            <label class="label">Activity</label>
                            <div class="control">
                                <textarea class="textarea" ref="newCommentBody" type="text" placeholder="Write Comment" rows="2" v-model="newCommentBody"></textarea>
                            </div>
                        </div>
                        <div class="field">
                            <div class="control">
                            <button class="button is-link" v-on:click.prevent="addComment();" v-bind:disabled="! newCommentBody">Comment</button>
                            </div>
                        </div>

                        <ul>
                            <article class="media" v-for="message in activityMessages" v-bind:key="message.id">
                                <div class="media-left">
                                    <figure class="image is-32x32">
                                        <img src="https://bulma.io/images/placeholders/32x32.png" alt="Image">
                                    </figure>
                                </div>
                                <div class="media-content">
                                    <div class="content">
                                        {{ message.body }}
                                        <p class="is-size-7">{{ message.date }}</p>
                                    </div>
                                </div>
                            </article
                        <ul>

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
                editDescription: false,
                description: null,
                addAttachment: false,
                newCommentBody: null,
                activityMessages: [
                    {
                        id: Math.random(),
                        date: new Date().toString(),
                        body: 'card created by foobar'
                    }
                ]
            });
        }, props: [
            'card'
        ], created: function () {
            console.log("[card-details]: created");
        }, watch: {
            editDescription: function (v) {
                if (v) {
                    this.$nextTick(() => this.$refs.description.focus());
                }
            }
        }, methods: {
            addComment: function () {
                this.activityMessages.splice(0, 0, {
                    date: new Date().toString(),
                    body: this.newCommentBody
                });
                this.newCommentBody = null;
                this.$nextTick(() => this.$refs.newCommentBody.focus());
            },
            close: function () {
                bus.$emit("closeCardDetails");
            }
        }
    });

    return (module);
})();