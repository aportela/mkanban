var mkanbanAuth = (function () {
    "use strict";

    var template = function () {
        return `
    <!-- template credits: daniel (https://github.com/dansup) -->
    <section class="hero is-fullheight is-light is-bold">
        <div class="hero-body">
            <div class="container">
                <div class="columns is-vcentered">
                    <div class="column is-4 is-offset-4">
                        <h1 class="title has-text-centered"><span class="icon is-medium"><i class="fas fa-tasks"></i></span> mKanban <span class="icon is-medium"><i class="fas fa-tasks"></i></span></h1>
                        <h2 class="subtitle is-6 has-text-centered"><cite>...some (not) like it tr3ll0</cite></h2>

                        <div class="tabs is-boxed is-toggle mk-without-margin-bottom" v-if="allowSignUp">
                            <ul>
                                <li v-bind:class="tab == 'signin' ? 'is-active': ''">
                                    <a v-on:click.prevent="tab = 'signin';">
                                        <span class="icon is-small"><i class="fa fa-user"></i></span>
                                        <span>Sign in</span>
                                    </a>
                                </li>
                                <li v-bind:class="tab == 'signup' ? 'is-active': ''">
                                    <a v-on:click.prevent="tab = 'signup';">
                                        <span class="icon is-small"><i class="fa fa-user-plus"></i></span>
                                        <span>Sign up</span>
                                    </a>
                                </li>
                            </ul>
                        </div>

                        <form v-on:submit.prevent="submitSignIn" v-if="tab == 'signin'">
                            <div class="box">
                                <label class="label">Email</label>
                                <p class="control has-icons-left" id="login-container" v-bind:class="{ 'has-icons-right' : invalidSignInUsername }">
                                    <input class="input" type="email" name="email" maxlength="255" ref="signInEmail" required autofocus v-bind:class="{ 'is-danger': invalidSignInUsername }" v-bind:disabled="loading ? true: false" v-model="signInEmail">
                                    <span class="icon is-small is-left"><i class="fa fa-envelope"></i></span>
                                    <span class="icon is-small is-right" v-show="invalidSignInUsername"><i class="fa fa-warning"></i></span>
                                    <p class="help is-danger" v-show="invalidSignInUsername">Invalid email</p>
                                </p>
                                <label class="label">Password</label>
                                <p class="control has-icons-left" id="password-container" v-bind:class="{ 'has-icons-right' : invalidSignInPassword }">
                                    <input class="input" type="password" name="password" required v-bind:class="{ 'is-danger': invalidSignInPassword }" v-bind:disabled="loading ? true: false" v-model="signInPassword">
                                    <span class="icon is-small is-left"><i class="fa fa-key"></i></span>
                                    <span class="icon is-small is-right" v-show="invalidSignInPassword"><i class="fa fa-warning"></i></span>
                                    <p class="help is-danger" v-show="invalidSignInPassword">Invalid password</p>
                                </p>
                                <hr>
                                <p class="control">
                                    <button type="submit" class="button is-primary" v-bind:class="{ 'is-loading': loading }" v-bind:disabled="loading ? true: false">
                                        <span class="icon"><i class="fa fa-lock"></i></span>
                                        <span>Sign in</span>
                                    </button>
                                </p>
                            </div>
                        </form>
                        <form v-on:submit.prevent="submitSignUp" v-if="tab == 'signup'">
                            <div class="box">
                                <label class="label">Email</label>
                                <p class="control has-icons-left" id="login-container" v-bind:class="{ 'has-icons-right' : invalidSignUpUsername }">
                                    <input class="input" type="email" name="email" maxlength="255" required autofocus v-bind:class="{ 'is-danger': invalidSignUpUsername }" v-bind:disabled="loading ? true: false" v-model="signUpEmail">
                                    <span class="icon is-small is-left"><i class="fa fa-envelope"></i></span>
                                    <span class="icon is-small is-right" v-show="invalidSignUpUsername"><i class="fa fa-warning"></i></span>
                                    <p class="help is-danger" v-show="invalidSignUpUsername">Email already used</p>
                                </p>
                                <label class="label">Password</label>
                                <p class="control has-icons-left" id="password-container" v-bind:class="{ 'has-icons-right' : invalidSignUpPassword }">
                                    <input class="input" type="password" name="password" required v-bind:class="{ 'is-danger': invalidSignUpPassword }" v-bind:disabled="loading ? true: false" v-model="signUpPassword">
                                    <span class="icon is-small is-left"><i class="fa fa-key"></i></span>
                                    <span class="icon is-small is-right" v-show="invalidSignUpPassword"><i class="fa fa-warning"></i></span>
                                    <p class="help is-danger" v-show="invalidSignUpPassword">Invalid password</p>
                                </p>
                                <hr>
                                <p v-if="errors" class="help is-danger has-text-centered">Error creating account</p>
                                <p class="control">
                                    <button type="submit" class="button is-primary" v-bind:class="{ 'is-loading': loading }" v-bind:disabled="loading ? true: false">
                                        <span class="icon"><i class="fa fa-plus-circle"></i></span>
                                        <span>Sign up</span>
                                    </button>
                                </p>
                            </div>
                        </form>

                        <p class="has-text-centered mk-margin-top-1rem">
                            <a href="https://github.com/aportela/mkanban" target="_blank"><span class="icon is-small"><i class="fab fa-github"></i></span>Project page</a> | <a href="mailto:766f6964+github@gmail.com">by alex</a>
                        </p>
                    </div>
                </div>
            </div>
        </div>
        <footer class="footer" v-if="errors">
            <spieldose-api-error-component v-bind:apiError="apiError"></spieldose-api-error-component>
        </footer>
    </section>
    `;
    };

    /* signIn component */
    var module = Vue.component('auth', {
        template: template(),
        created: function () {
        },
        data: function () {
            return ({
                loading: false,
                signInEmail: null,
                signInPassword: null,
                invalidSignInUsername: false,
                invalidSignInPassword: false,
                allowSignUp: initialState.allowSignUp,
                signUpEmail: null,
                signUpPassword: null,
                invalidSignUpUsername: false,
                invalidSignUpPassword: false,
                errors: false,
                apiError: null,
                tab: 'signin'
            });
        },
        created: function() {
            this.$nextTick(() => this.$refs.signInEmail.focus());
        },
        methods: {
            submitSignIn: function () {
                var self = this;
                self.invalidSignInUsername = false;
                self.invalidSignInPassword = false;
                self.loading = true;
                self.errors = false;
                mkanbanAPI.user.signIn(this.signInEmail, this.signInPassword, function (response) {
                    if (response.ok) {
                        self.$router.push({ name: 'home' });
                    } else {
                        switch (response.status) {
                            case 400:
                                if (response.body.invalidOrMissingParams.find(function (e) { return (e === "email"); })) {
                                    self.invalidSignInUsername = true;
                                } else if (response.body.invalidOrMissingParams.find(function (e) { return (e === "password"); })) {
                                    self.invalidSignInPassword = true;
                                } else {
                                    self.apiError = response.getApiErrorData();
                                    self.errors = true;
                                }
                                break;
                            case 404:
                                self.invalidSignInUsername = true;
                                break;
                            case 401:
                                self.invalidSignInPassword = true;
                                break;
                            default:
                                self.apiError = response.getApiErrorData();
                                self.errors = true;
                                break;
                        }
                        self.loading = false;
                    }
                });
            },
            submitSignUp: function () {
                var self = this;
                self.invalidSignUpUsername = false;
                self.invalidSignUpPassword = false;
                self.loading = true;
                self.errors = false;
                mkanbanAPI.user.signUp(this.signUpEmail, this.signUpPassword, function (response) {
                    if (response.ok) {
                        self.signInEmail = self.signUpEmail;
                        self.signInPassword = self.signUpPassword;
                        self.loading = false;
                        self.tab = 'signin';
                        self.submitSignIn();
                    } else {
                        switch (response.status) {
                            case 400:
                                if (response.body.invalidOrMissingParams.find(function (e) { return (e === "email"); })) {
                                    self.invalidSignInUsername = true;
                                } else if (response.body.invalidOrMissingParams.find(function (e) { return (e === "password"); })) {
                                    self.invalidSignInPassword = true;
                                } else {
                                    self.apiError = response.getApiErrorData();
                                    self.errors = true;
                                }
                                break;
                            case 409:
                                self.invalidSignUpUsername = true;
                                break;
                            default:
                                //self.apiError = response.getApiErrorData();
                                //self.errors = true;
                                break;
                        }
                        self.loading = false;
                    }
                });
            }
        }
    });

    return (module);
})();