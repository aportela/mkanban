/**
 * main app component
 */
const app = new Vue({
    data: function () {
        return ({
            board:
                {
                    lists: [
                        {
                            id: Math.random(),
                            name: "TODO",
                            created: new Date(),
                            cards: []
                        },
                        {
                            id: Math.random(),
                            name: "IN PROGRESS",
                            created: new Date(),
                            cards: []
                        },
                        {
                            id: Math.random(),
                            name: "DONE",
                            created: new Date(),
                            cards: []
                        }
                    ]
                }
        });
    }, created: function () {
        console.log("[app]: created");
    }
}).$mount('#app');