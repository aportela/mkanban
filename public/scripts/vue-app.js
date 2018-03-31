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
                            cards: [
                                {
                                    id: Math.random(),
                                    title: "drag & drop support",
                                    description: "KISS: find an existent javascript module/library to manage this (complex?) events",
                                    created: new Date()
                                }
                            ]
                        },
                        {
                            id: Math.random(),
                            name: "IN PROGRESS",
                            created: new Date(),
                            cards: [
                                {
                                    id: Math.random(),
                                    title: "card (vuejs) component",
                                    description: null,
                                    created: new Date()
                                }
                            ]
                        },
                        {
                            id: Math.random(),
                            name: "DONE",
                            created: new Date(),
                            cards: [
                                {
                                    id: Math.random(),
                                    title: "main skeleton",
                                    description: null,
                                    created: new Date()
                                }
                            ]
                        }
                    ]
                }
        });
    }, created: function () {
        console.log("[app]: created");
    }
}).$mount('#app');