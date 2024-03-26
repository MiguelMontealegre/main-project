import { createRouter } from "vue-router";
import { createWebHistory } from "vue-router";
//----
import NotFound from './pages/NotFound.vue'
//----
import CoachesList from './pages/coaches/CoachesList.vue'
import CoachesDetail from './pages/coaches/CoachDetail.vue'
import CoachesRegister from './pages/coaches/CoachRegister.vue'
//----
import ContactCoach from './pages/requests/ContactCoach.vue'
import RequestReceive from './pages/requests/RequestReceive.vue'




const router = createRouter({
    history: createWebHistory(),
    routes:[
        {
            path:'/', redirect:'/coaches'
        },
        {
            path:'/coaches', component:CoachesList
        },
        {
            path:'/coaches/:id', 
            component: CoachesDetail,
            props:true,
            children:[  {path:'contact', component:ContactCoach,}    ]         // coaches/c1/contact
        },
        {
            path:'/register', component:CoachesRegister
        },
        {
            path:'/requests', component:RequestReceive,
        },
        {
            path:'/:notFound(.*)', component:NotFound
        }
    ],


    // scrollBehavior(to, from, savedPosition){
    // if(to.hash){        
    //     return{
    //       selector: to.hash,
    //     }
    // }
    // if(savedPosition){
    //     return savedPosition    
    //     }    
    // return{x: 0, y: 0}
    // },

    
})




export default router