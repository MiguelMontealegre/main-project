import { createApp } from 'vue'
import App from './App.vue'

//Componentes Globales
import BaseCard from './layouts/BaseCard.vue'
import BaseButton from './layouts/BaseButton.vue'
import BaseBadge from './layouts/BaseBadge.vue'
import BaseSpinner from './layouts/BaseSpinner.vue'
import BaseDialog from './layouts/BaseDialog.vue'


//Importando vuex
import store from './store/index.js'
//Importando Vue-Router
import router from './router.js'



const app = createApp(App)
app.use(store)
app.use(router)
//Comps globales
app.component('base-card',BaseCard)
app.component('base-button',BaseButton)
app.component('base-badge', BaseBadge)
app.component('base-spinner', BaseSpinner)
app.component('base-dialog', BaseDialog)



//Evitar transicion al principio
router.isReady().then(() => {
    app.mount('#app')
})


