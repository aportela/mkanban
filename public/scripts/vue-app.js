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

        var self = this;
        // event (dragula): card dropped
        bus.$on("dragulaDrop", function (card, fromList, toList) {
            console.log("[app]: event dragulaDrop")
            var obj = null;
            var sourceListIdx = -1;
            var sourceCardIdx = -1;
            var destCardIdx = 0;
            // get card object from source list
            for (var i = 0, notFound = true; i < self.board.lists.length && notFound; i++) {
                if (self.board.lists[i].id == fromList) { // source list
                    sourceListIdx = i;
                    for (var j = 0; j < self.board.lists[i].cards.length && notFound; j++) {
                        if (self.board.lists[i].cards[j].id == card) { // card on source list
                            sourceCardIdx = j;
                            obj = self.board.lists[i].cards[j];
                            notFound = false;
                        }
                    }
                }
            }
            if (obj) {
                for (var i = 0, notFound = true; i < self.board.lists.length && notFound; i++) {
                    if (self.board.lists[i].id == toList) { // source list
                        self.board.lists[i].cards.splice(destCardIdx, 0, obj);
                        notFound = false;
                    }
                }
                self.board.lists[sourceListIdx].cards.splice(sourceCardIdx, 1);
            }
        });
    }
}).$mount('#app');