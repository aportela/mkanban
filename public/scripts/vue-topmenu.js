/**
 * board (list container) component
 */
var mkanbanTopMenu = (function () {
    "use strict";

    var template = function () {
        return `
            <nav class="navbar is-light is-fixed-top is-unselectable" role="navigation" aria-label="main navigation">
                <div class="navbar-brand">
                    <div class="navbar-item">
                        <p class="control">
                            <a href="https://github.com/aportela/mkanban" target="_blank" class="button is-link">
                                <span class="icon">
                                    <i class="fab fa-github" aria-hidden="true"></i>
                                </span>
                                <span>mkanban</span>
                            </a>
                        </p>
                    </div>
                    <div class="navbar-burger">
                        <span></span>
                        <span></span>
                        <span></span>
                    </div>
                </div>
                <div class="navbar-menu">
                    <div class="navbar-start">
                        <div class="navbar-item">
                            <div class="field">
                                <div class="control has-icons-left" v-bind:class="{ 'has-icons-right, is-loading': isSearching }">
                                    <span class="icon is-small is-left">
                                        <i class="fas fa-search"></i>
                                    </span>
                                    <input v-on:keyup.enter="search();" v-model.trim="searchText" ref="search" v-bind:disabled="isSearching" class="input is-rounded" type="text" placeholder="search...">
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="navbar-end">
                        <a class="navbar-item is-tab is-active">
                            <p class="control">
                                <span class="icon is-small">
                                    <i class="fas fa-home"></i>
                                </span>
                                <span>Home</span>
                            </p>
                        </a>
                        <div class="navbar-item has-dropdown is-hoverable">
                            <a class="navbar-link">
                                <p class="control">
                                    <span class="icon is-small">
                                        <i class="fas fa-list-alt"></i>
                                    </span>
                                    <span>Boards</span>
                                </p>
                            </a>
                            <div class="navbar-dropdown">
                                <a v-for="board in boards" v-bind:key="board.id" v-on:click.prevent="setBoard(board.id);" class="navbar-item">{{ board.name }}</a>
                            </div>
                        </div>
                        <a class="navbar-item is-tab">
                            <p class="control">
                                <span class="icon is-small">
                                    <i class="fas fa-sync"></i>
                                </span>
                                <span>Sync</span>
                            </p>
                        </a>
                        <a class="navbar-item is-tab">
                            <p class="control">
                                <span class="icon is-small">
                                    <i class="fas fa-question"></i>
                                </span>
                                <span>Help</span>
                            </p>
                        </a>
                    </div>
                </div>
            </nav>
        `;
    };

    var module = Vue.component('topmenu', {
        template: template(),
        data: function () {
            return ({
                isSearching: false,
                searchText: null,
                isAddingNewBoard: false,
                addError: false,
                newBoardName: null
            });
        },
        props: [
            'boards'
        ],
        created: function () {
            console.log("[topmenu]: created");
        },
        methods: {
            search: function () {
                console.log("[topmenu]: searching: " + this.searchText);
                this.isSearching = true;
                var self = this;
                setTimeout(function () {
                    self.isSearching = false;
                    self.$nextTick(() => self.$refs.search.focus());
                }, 500);
            },
            setBoard: function (id) {
            }
        }
    });

    return (module);
})();