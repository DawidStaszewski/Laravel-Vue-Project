import { createRouter, createWebHistory } from 'vue-router';
import DefaultLayout from './components/DefaultLayout.vue';
import Login from "./pages/Login.vue";
import Signup from "./pages/Signup.vue";
import MyImages from "./pages/MyImages.vue";    
import Home from './pages/Home.vue';
import PageNotFound from './pages/PageNotFound.vue';
import useUserStore from './store/user.js';

const routes = [
    {
        path: "/", 
        component: DefaultLayout,
        children: [
            {path: '/', name: 'Home', component: Home},
            {path: '/images', name: 'MyImages', component: MyImages},
            {path: '/images:id/edit' , name: 'EditImage', compontent: Home},
        ],
        beforeEnter: async (to, from, next) => {
            try {
                const userStore = useUserStore();
                await userStore.fetchUser();
                next();
            } catch (error) {
                next(false);
            }
        }
        
    },
    {
        path: '/login', name: 'Login', component: Login
    },
    { 
        path: '/signup', name: 'Signup', component: Signup 
    },
    {
        path: '/:pathMatch(.*)*',
        name: 'PageNotFound',
        component: PageNotFound
    }
];  

const router = createRouter({
    history: createWebHistory(),
    routes
});

export default router;