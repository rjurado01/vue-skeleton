import VueRouter from 'vue-router';



import Home from './pages/home/index.js';

Vue.use(VueRouter);

// Each route should map to a component. The 'component' can
// either be an actual component constructor created via
// Vue.extend(), or just a component options object.
// We'll talk about nested routes later.
const routes = [

  {
    path: '/',
    name: 'home',
    component: Home,
    meta: {
      auth: true
    }
  },
  {
    path: '*',
    redirect: '/'
  }
];

// Create the router instance and pass the `routes` option
// You can pass in additional options here, but let's
// keep it simple for now.
const router = new VueRouter({
  routes
});



export default router;
