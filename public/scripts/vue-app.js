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
            boards: []
        });
    }, created: function () {
        console.log("[app]: created");
        var self = this;
        mkanbanAPI.board.search(function (response) {
            if (response.ok) {
                self.boards = response.body.boards;
                console.log("[app]: " + self.boards.length + " boards found");
            } else {
                // TODO
                console.log("[app]: error loading boards");
            }
        })
    }
}).$mount('#app');