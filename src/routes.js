import Vue from "vue";
import VueRouter from "vue-router";
import partyApp from "@/views/party-app.vue";
import partyDetails from "@/components/party-details.cmp.vue";
import partyEdit from "@/components/party-edit.cmp.vue";
// import Dashboard from "@/views/Dashboard.vue";
import ProfilePage from "@/views/ProfilePage.vue";
import partyMap from "./components/party-map.cmp.vue";
import LoginPage from "@/views/login.vue";
import signupPage from "@/views/signup.cmp.vue";
import reviewList from "@/components/review-list.vue";
import ChatPage from "@/components/chat.cmp.vue";
import partyFilter from "@/components/party-filter.vue"
import welcomePage from "@/views/WelcomePage.vue"

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Welcome",
    component: welcomePage
  },
  {
    path: "/party-app",
    name: "party-app",
    component: partyApp
  },
  // route for testing, this is a component
  {
    path: "/party-filter",
    name: "party-filter",
    component: partyFilter
  },
  {
    path: '/party-app/details/:id',
    component: partyDetails
  },

  {
    path: '/party-app/edit/:id?',
    component: partyEdit
  },
  // {
  //   path: "/dashboard",
  //   name: "Dashboard",
  //   component: Dashboard
  // },
  {
    path: "/profile",
    name: "Profile",
    component: ProfilePage
  },
  {
    path: "/map",
    name: "Map",
    component: partyMap
  },
  {
    path: "/login",
    name: "Login",
    component: LoginPage
  },
  {
    path: "/signup",
    name: "Signup",
    component: signupPage
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
