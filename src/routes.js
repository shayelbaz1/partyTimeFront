import Vue from "vue";
import VueRouter from "vue-router";
import partyApp from "@/views/party-app.vue";
import partyDetails from "@/components/party-details.cmp.vue";
import partyEdit from "@/components/party-edit.cmp.vue";
import Dashboard from "@/views/Dashboard.vue";
import ProfilePage from "@/views/ProfilePage.vue";
import AboutPage from "@/views/AboutPage.vue";
import LoginPage from "@/views/loginSignup.vue";
import reviewList from "@/components/review-list.vue";
import UserPreview from "@/views/UserPreview.vue";
import ChatPage from "@/views/ChatPage.vue";
import partyNav from  "@/components/party-filter.vue"

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: partyApp
  },
  {
    path: "/party-app",
    name: "party-app",
    component: partyApp
  },
  // route for testing, this is a component
  {
    path: "/party-nav",
    name: "party-nav",
    component: partyNav
  },
  {
      path: '/party-app/details/:id',
      component: partyDetails
  },
  {
      path: '/party-app/details/user/:id',
      component: UserPreview
  },
  {
      path: '/user/:id',
      component: UserPreview
  },
  {
      path: '/party-app/edit/:id?',
      component: partyEdit
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
