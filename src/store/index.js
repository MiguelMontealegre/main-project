import { createStore } from 'vuex'
import CoachesModule from './modules/coaches.js'
import RequestsModule from './modules/requests.js'



const store = createStore({
    modules:{
        coaches:CoachesModule,
        requests:RequestsModule
    },
    state(){
    return{
        userId:null,           //Currently user who's using the app
    }
    },
    mutations:{
        RegisterUserIdApp(state, payload){
            state.userId = payload
        }
    },
    actions:{
        userIdApp(context, payload){
            context.commit('RegisterUserIdApp', payload)
        }
    },
    getters:{
        userId(state){
            return state.userId 
        }
    }
})

    
export default store;