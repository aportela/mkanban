/**
 * used for sharing data between components
 */
const bus = new Vue();

/**
 * set routes
 */
const routes = [
    { path: '/upgrade', name: 'upgrade', component: mkanbanUpgrade },
    { path: '/auth', name: 'auth', component: mkanbanAuth },
    { path: '/home', name: 'home', component: mkanbanHome }
];

/**
 * init vue router component
 */
const router = new VueRouter({
    routes
});


/**
 * parse vue-resource (custom) resource and return valid object for api-error component
 * @param {*} r a valid vue-resource response object
 */
const getApiErrorDataFromResponse = function (r) {
    let data = {
        request: {
            method: r.rMethod,
            url: r.rUrl,
            body: r.rBody
        },
        response: {
            status: r.status,
            statusText: r.statusText,
            text: r.bodyText
        }
    };
    data.request.headers = [];
    for (let headerName in r.rHeaders.map) {
        data.request.headers.push({ name: headerName, value: r.rHeaders.get(headerName) });
    }
    data.response.headers = [];
    for (let headerName in r.headers.map) {
        data.response.headers.push({ name: headerName, value: r.headers.get(headerName) });
    }
    return (data);
};

/**
 * vue-resource interceptor for adding (on errors) custom get data function (used in api-error component) into response
 */
Vue.http.interceptors.push((request, next) => {
    next((response) => {
        if (!response.ok) {
            response.rBody = request.body;
            response.rUrl = request.url;
            response.rMethod = request.method;
            response.rHeaders = request.headers;
            response.getApiErrorData = function () {
                return (getApiErrorDataFromResponse(response));
            };
        }
        return (response);
    });
});

/**
 * main app component
 */
const app = new Vue({
    router,
    created: function () {
        console.log("[app]: created");
        if (!initialState.upgradeAvailable) {
            if (initialState.logged) {
                console.log("[app] redirect to app");
                this.$router.push({ name: 'home' });
            } else {
                console.log("[app] redirect to auth");
                this.$router.push({ name: 'auth' });
            }
        } else {
            console.log("[app] upgrade found");
            this.$router.push({ name: 'upgrade' });
        }
        bus.$on("signout", () => {
            console.log("[app] signout received");
            this.signOut();
        });
    },
    methods: {
        signOut: function() {
            mkanbanAPI.user.signOut((response) => {
                if (response.ok) {
                    this.$router.push({ name: 'auth' });
                } else {
                    // TODO: show error
                }
            });
        }
    }
}).$mount('#app');