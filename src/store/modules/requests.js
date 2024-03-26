export default{
    namespaced:true,
    state(){
        return{
            requests:[],
        }
        },
        mutations:{
            addRequest(state, payload){
                state.requests.push(payload)
            },

            setRequests(state, payload){
                state.requests = payload
            }
        },


        actions:{
            async addRequestAction(context, payload){

                const url = 'https://vue-httprequests-57117-default-rtdb.firebaseio.com/requests.json'
                const Http = {
                  method:'POST',
                  body: JSON.stringify(payload),
                  headers:{"Content-Type": "application/json"}
                }
                const response = await fetch(url, Http);
                const jsonResponse = await response.json();
                console.log(jsonResponse)    

                // payload.id = jsonResponse.name;                           Aqui esta la opcion de que el id de nuestro 'request' sea el proporcianado automaticamente por FireBase ... Entonces podemos ver que la forma en que accedemos a ese id de firebase es accediendo al '.name' , es decir que seria:  'jsonResponse.name' 

                context.commit('addRequest', payload)
            },


            async fetchRequests(context){
                const url = 'https://vue-httprequests-57117-default-rtdb.firebaseio.com/requests.json'
                const response = await fetch(url);
                const jsonResponse = await response.json();

                if(!response.ok){
                    const error = new Error(jsonResponse.message || 'Fail to fetch');
                    throw error;
                }

                const requests = [];
                for(const key in jsonResponse){     //Vamos a iterar el arrray de objetos en fireBase , 'key' es el iterador (i) puede tener cualquier nombre ... En resumen vamos a iterar cada uno de los objetos dentro del array
                    const request = {
                        id: jsonResponse[key].id,
                        coachId: jsonResponse[key].coachId,
                        userEmail: jsonResponse[key].userEmail,
                        message: jsonResponse[key].message
                    }
                    requests.push(request)
                }
                context.commit('setRequests', requests)                
            }
        },


        getters:{
            requests(state, _, _2, rootGetters){
                const currentUser = rootGetters.userId
                const allRequests = state.requests
                const requestOfCurrentCoach = allRequests.filter(req => req.coachId === currentUser)
                return requestOfCurrentCoach
            },

            hasRequests(_, getters){
                return getters.requests && getters.requests.length > 0
            }
        }
}
