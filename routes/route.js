import { createWebHistory, createRouter } from "vue-router";
import LoginComponent from '../src/components/Auth/LoginComponent';
import RegisterComponent from '../src/components/Auth/RegisterComponent';


const routes = [
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

];

const router = createRouter({
    history: createWebHistory(),
    routes
});

export default router;