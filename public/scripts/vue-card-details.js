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

                        <div class="field is-horizontal">
                            <div class="field-body">
                                <div class="field-label is-normal">
                                    <label class="label">Start</label>
                                </div>
                                <div class="field">
                                    <p class="control is-expanded has-icons-left">
                                        <input class="input" type="date" placeholder="start date">
                                        <span class="icon is-small is-left">
                                            <i class="fas fa-calendar-alt"></i>
                                        </span>
                                    </p>
                                </div>
                                <div class="field-label is-normal">
                                    <label class="label">End</label>
                                </div>
                                <div class="field">
                                    <p class="control is-expanded has-icons-left has-icons-right">
                                    <input class="input is-success" type="date" placeholder="end date" value="05/04/2018">
                                    <span class="icon is-small is-left">
                                        <i class="fas fa-calendar-alt"></i>
                                    </span>
                                    <span class="icon is-small is-right">
                                        <i class="fas fa-check"></i>
                                    </span>
                                    </p>
                                </div>
                            </div>
                        </div>

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
                            <div class="is-pulled-left mk-attachment-preview has-text-centered mk-cursor-pointer" v-on:click.prevent="selectAttachmentFromDisk();">
                                <figure class="image is-96x96">
                                    <span class="icon is-large mk-cursor-pointer">
                                        <i class="fas fa-3x fa-upload"></i>
                                    </span>
                                </figure>
                                <span class="is-size-7">Add<br>attachment</span>
                            </div>
                            <div v-for="attachment in attachments" class="is-pulled-left mk-attachment-preview">
                                <figure class="image is-96x96">
                                    <img  v-bind:src="attachment.previewThumbnail">
                                </figure>
                                <span class="is-size-7">{{ attachment.filename }}<br>{{ attachment.size }}</span>
                            </div>
                            <div class="is-clearfix"></div>
                            <input id="attachmentInput" v-on:change="addAttachment" type="file" accept="image/*" class="is-invisible">
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
                        </article>

                    </section>
                    <footer class="modal-card-foot">
                        <button v-on:click.prevent="close();" class="button">Close</button>
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
                newCommentBody: null,
                activityMessages: [
                    {
                        id: Math.random(),
                        date: new Date().toString(),
                        body: 'card created by foobar'
                    }
                ],
                attachedFile: null,
                attachments: []
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
            selectAttachmentFromDisk: function () {
                document.getElementById('attachmentInput').click();
            },
            addAttachment: function (event) {
                console.log("[card-details]: adding attachment");
                var self = this;

                // https://jsfiddle.net/mani04/5zyozvx8/

                // Reference to the DOM input element
                var input = event.target;
                // Ensure that you have a file before attempting to read it
                if (input.files && input.files[0]) {
                    // create a new FileReader to read this image and convert to base64 format
                    var reader = new FileReader();
                    // Define a callback function to run, when FileReader finishes its job
                    var filename = input.files[0].name;
                    var filesize = input.files[0].size;
                    reader.onload = (e) => {
                        // Note: arrow function used here, so that "this.imageData" refers to the imageData of Vue component
                        // Read image as base64 and set to imageData
                        self.attachments.push(
                            {
                                filename: filename,
                                size: mKanban.utils.formatBytes(filesize),
                                previewThumbnail: e.target.result
                            }
                        );
                        self.activityMessages.splice(0, 0, {
                            date: new Date().toString(),
                            body: "new attachment (" + filename + ") by foobar"
                        });
                    }
                    // Start the reader job - read file as a data url (base64 format)
                    reader.readAsDataURL(input.files[0]);
                }
            },
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