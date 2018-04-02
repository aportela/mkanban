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
            boards: [
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
                                    created: new Date(),
                                    attachmentCount: 0,
                                    commentCount: 2
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
                                    created: new Date(),
                                    attachmentCount: 1,
                                    commentCount: 0
                                },
                                {
                                    id: Math.random(),
                                    title: "fix drag&drop reorder & clone",
                                    description: "drag & drop is failing when reorder elements",
                                    created: new Date(),
                                    attachmentCount: 2,
                                    commentCount: 1
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
                                    created: new Date(),
                                    attachmentCount: 0,
                                    commentCount: 5
                                }
                            ]
                        }
                    ]
                }
            ]
        });
    }, created: function () {
        console.log("[app]: created");
    }
}).$mount('#app');