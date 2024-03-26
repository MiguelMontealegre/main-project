export default{
    namespaced:true,
    state(){
        return{
            coaches:[
                // {
                //   id: 'c1',
                //   firstName: 'Maximilian',
                //   lastName: 'Schwarzmüller',
                //   areas: ['frontend', 'backend', 'career'],
                //   description:
                //     "I'm Maximilian and I've worked as a freelance web developer for years. Let me help you become a developer as well!",
                //   hourlyRate: 30
                // },
                // {
                //   id: 'c2',
                //   firstName: 'Julie',
                //   lastName: 'Jones',
                //   areas: ['frontend', 'career'],
                //   description:
                //     'I am Julie and as a senior developer in a big tech company, I can help you get your first job or progress in your current role.',
                //   hourlyRate: 30
                // }
              ],            
        }
        },
        mutations:{
          newCoach4(state, payload){
            state.coaches.push(payload)
          },

          setData(state, payload){
            state.coaches = payload
          }
        },



        actions:{
          async newCoach3(context, payload){
            const coach = {
              id: payload.id,
              firstName: payload.firstName,
              lastName: payload.lastName,
              areas:payload.areas,
              description: payload.description,
              hourlyRate:payload.hourlyRate
            }

            //Post method http request
            const request = {
              method:'POST',                    //Utilizando el metodo 'PUT' sobreescribe si ya existe , o crea uno nuevo si no existe
              headers:{"Content-Type": "application/json"},
              body: JSON.stringify(coach),
            }
            const response = await fetch('https://vue-httprequests-57117-default-rtdb.firebaseio.com/coaches.json', request)
            const responseData = await response.json()
            console.log(responseData)
      
            context.commit('newCoach4', coach)
          },



          async fetchData(context){

            const url = 'https://vue-httprequests-57117-default-rtdb.firebaseio.com/coaches.json'
            const response = await fetch(url)
            const jsonResponse = await response.json()
            

            if(!response.ok){
              const error = new Error(jsonResponse.message || 'fail to fetch');
              throw error;
            }

            const coaches = []

            for(const key in jsonResponse){         //Vamos a iterar el arrray de objetos en fireBase , 'key' es el iterador (i) puede tener cualquier nombre ... En resumen vamos a iterar cada uno de los objetos dentro del array
              const coach = {
              id: jsonResponse[key].id,
              firstName: jsonResponse[key].firstName,
              lastName: jsonResponse[key].lastName,
              areas:jsonResponse[key].areas,
              description: jsonResponse[key].description,
              hourlyRate:jsonResponse[key].hourlyRate
              }
            coaches.push(coach)
            }
            context.commit('setData', coaches)
          }
        },



        getters:{
            coaches(state){
                return state.coaches
            },
            hasCoaches(state){
               return state.coaches && state.coaches.length > 0    //Retorna true o false si no hay contenido en 'coaches'
            },

            isCoach(_, getters, _2, rootGetters){        //En caso de interes el '_2'  es el 'rootState'
              const coaches = getters.coaches
              console.log(coaches)
              const userId = rootGetters.userId
              console.log(userId)
              return coaches.some(coach => coach.id === userId)    // 'some' return true or false if found at least one element with the specific features
            }
        }
}

