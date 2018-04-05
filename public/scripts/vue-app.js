/**
 * used for sharing data between components
 */
const bus = new Vue();

/**
 * set routes
 */
const routes = [
    { path: '/upgrade', name: 'upgrade', component: mkanbanUpgrade },
    { path: '/home', name: 'home', component: mkanbanHome }
];

/**
 * init vue router component
 */
const router = new VueRouter({
    routes
});

/**
 * main app component
 */
const app = new Vue({
    router,
    created: function () {
        console.log("[app]: created");
        if (!initialState.upgradeAvailable) {
            console.log("[app] redirect to app home");
            this.$router.push({ name: 'home' });
        } else {
            console.log("[app] upgrade found");
            this.$router.push({ name: 'upgrade' });
        }
    }
}).$mount('#app');