import { createRouter, createWebHistory } from 'vue-router'
import LandingView from '../views/LandingView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'landingpage',
      meta:{
        isRequiredAuth:false
      },
      component: LandingView
    },
    {
      path:"/home",
      name:"home",
      meta:{
        isRequiredAuth:true
      },
      component:()=>import("../views/HomeView.vue")
    },
    {
      path:"/verify",
      name:"verify",
      meta:{
        isRequiredAuth:false
      },
      component:()=>import("../views/verifyEmail.vue")
    },
    {
      path:"/get_verified",
      name:"get_verified",
      meta:{
        isRequiredAuth:false
      },
      component:()=>import("../views/GetVerified.vue")
    },
    {
      path:"/signin",
      name:"signin",
      meta:{
        isRequiredAuth:false
      },
      component:()=>import("../views/SigninView.vue")
    },
    {
      path:"/signup",
      name:"signup",
      meta:{
        isRequiredAuth:false
      },
      component:()=>import("../views/SignupView.vue")
    },
    {
      path:"/notifications",
      name:"notifications",
      meta:{
        isRequiredAuth:true
      },
      component:()=>import("../views/NotificationView.vue")
    },
    {
      path:"/users",
      name:"settings",
      meta:{
        isRequiredAuth:true
      },
      component:()=>import("../views/SettingsView.vue")
    },
    {
      path:"/account",
      name:"account",
      meta:{
        isRequiredAuth:true
      },
      component:()=>import("../views/AccountView.vue")
    },
    {
      path:"/:pathMatch(.*)*",
      name:"404",
      component:()=>import("../views/NotFoundView.vue")
    }
  ]
})

router.beforeEach((to,from,next)=>{
  const data:any=localStorage.getItem("userdata")
  let isUserAuthenticated=data?JSON.parse(data).token:null;
  
  const isRequiredAuth:boolean=to.matched.some(
    (record)=>record.meta.isRequiredAuth
  );
  //check for protected route
  if(!isRequiredAuth&&isUserAuthenticated!==null){
    next("/home")
  }else if(isRequiredAuth&&isUserAuthenticated===null){
    alert("Not Authenticated!!")
    next("/")
  }else{
    next()
  }
})

export default router
