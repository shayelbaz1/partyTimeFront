import Vue from "vue";
import VueRouter from "vue-router";
import toyApp from "@/views/toy-app.vue";
import toyDetails from "@/components/toy-details.cmp.vue";
import toyEdit from "@/components/toy-edit.cmp.vue";
import Dashboard from "@/views/Dashboard.vue";
import ProfilePage from "@/views/ProfilePage.vue";
import AboutPage from "@/views/AboutPage.vue";
import LoginPage from "@/views/loginSignup.vue";
import reviewList from "@/components/review-list.vue";
import UserPreview from "@/views/UserPreview.vue";
import ChatPage from "@/views/ChatPage.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: toyApp
  },
  {
    path: "/toy-app",
    name: "toy-app",
    component: toyApp
  },
  {
      path: '/toy-app/details/:id',
      component: toyDetails
  },
  {
      path: '/toy-app/details/user/:id',
      component: UserPreview
  },
  {
      path: '/user/:id',
      component: UserPreview
  },
  {
      path: '/toy-app/edit/:id?',
      component: toyEdit
  },
  {
    path: "/dashboard",
    name: "Dashboard",
    component: Dashboard
  },
  {
    path: "/profile",
    name: "Profile",
    component: ProfilePage
  },
  {
    path: "/about",
    name: "About",
    component: AboutPage
  },
  {
    path: "/login",
    name: "Login",
    component: LoginPage
  },
  {
    path: "/reviews",
    name: "Reviews",
    component: reviewList
  },
  {
    path: "/chat",
    name: "Chat",
    component: ChatPage
  },
];

const router = new VueRouter({
  routes
});

export default router;
