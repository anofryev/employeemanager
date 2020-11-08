import Vue from 'vue';
import Router from 'vue-router';
import Dashboard from '@/components/Dashboard';
import NewEmployee from '@/components/NewEmployee';
import ViewEmployee from '@/components/ViewEmployee';
import EditEmployee from '@/components/EditEmployee';
import Login from '@/components/Login';
import Register from '@/components/Register';
import firebase from 'firebase';


Vue.use(Router)

let router = new Router({
  routes: [
    {
      path: '/',
      name: 'dashbord',
      component: Dashboard,
      meta: {
        requieresAuth: true
      }
    },
    {
      path: '/login',
      name: 'login',
      component: Login,
      meta: {
        requieresGuest: true
      }
    },
    {
      path: '/register',
      name: 'register',
      component: Register,
      meta: {
        requieresGuest: true
      }
    },
    {
      path: '/new',
      name: 'new-employee',
      component: NewEmployee,
      meta: {
        requieresAuth: true
      }
    },
    {
      path: '/edit/:employee_id',
      name: 'edit-employee',
      component: EditEmployee,
      meta: {
        requieresAuth: true
      }
    },
    {
      path: '/:employee_id',
      name: 'view-employee',
      component: ViewEmployee,
      meta: {
        requieresAuth: true
      }
    }
  ]
});
//Nav guards
router.beforeEach((to, from, next) => {
  //Check for requieredAuth guard
  if(to.matched.some(record => record.meta.requieresAuth)) {
    //check if not logged in
    if(!firebase.auth().currentUser) {
      //Go to login
      next({
        path: '/login',
        query: {
          redirect: to.fullPath
        }
      });
    } else {
      //Proceed to route
      next();
    }
  } else if(to.matched.some(record => record.meta.requieresGuest)) {
      //check if  logged in
    if(firebase.auth().currentUser) {
      //Go to login
      next({
        path: '/',
        query: {
          redirect: to.fullPath
        }
      });
    } else {
      //Proceed to route
      next();
    }
  }
  else {
    //Proceed to route
    next(); 
  }
});

export default  router;