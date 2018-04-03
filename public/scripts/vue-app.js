/**
 * used for sharing data between components
 */
const bus = new Vue();

/**
 * main app component
 */
const app = new Vue({
    data: function () {
        return ({
            defaultBoard: null,
            boards: []
        });
    }, created: function () {
        console.log("[app]: created");
        var self = this;
        mkanbanAPI.board.search(function (response) {
            if (response.ok) {
                self.boards = response.body.boards;
                if (self.boards && self.boards.length > 0) {
                    self.defaultBoard = self.boards[0].id;
                }
                console.log("[app]: " + self.boards.length + " boards found");
            } else {
                // TODO
                console.log("[app]: error loading boards");
            }
        })
    },
    methods: {
        setBoard: function (id) {
            this.defaultBoard = id;
        }
    }
}).$mount('#app');