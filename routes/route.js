import { createWebHistory, createRouter } from "vue-router";
import LoginComponent from '../src/components/Auth/LoginComponent';
import RegisterComponent from '../src/components/Auth/RegisterComponent';
import ProfileComponent from '../src/components/Views/ProfileComponent';
import HomeComponent from '../src/components/Views/HomeComponent';
import BookComponent from '../src/components/Views/BookComponent';


const routes = [
    {
        name: "Home",
        path: "/",
        component: HomeComponent
    },
    {
        name: "Register",
        path: "/register",
        component: RegisterComponent
    },
    {
        name: "Login",
        path: "/login",
        component: LoginComponent
    },
    {
        name: "Profile",
        path: "/profile",
        component: ProfileComponent
    },
    {
        name: "BookDetails",
        path: "/book/details/:id?",
        component: BookComponent
    },

];

const router = createRouter({
    history: createWebHistory(),
    routes
});

export default router;