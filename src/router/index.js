import { createRouter, createWebHistory } from "vue-router";
import AdditionView from "../views/AdditionView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "addition",
      component: AdditionView,
    },
  ],
});

export default router;
