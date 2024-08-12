import { profileData, itemsPerPage } from "../index.js"

async function getEvents(userName) {
   const eventResponse = await fetch(`https://api.github.com/users/${userName}/events?per_page=${itemsPerPage}`)
   return await eventResponse.json()
}

async function showEvents(userName) {
   try {
      const userEvents = await getEvents(userName)
      let eventsList = ''

      if (userEvents.message === 'Not Found') {
         throw new Error("Falha ao buscar eventos")
      }

      userEvents.forEach(event => {
         eventsList += `<li>
                           <p>
                              <span>${event.repo.name}</span>
                              - ${event.type === 'PushEvent' ? event.payload.commits[0].message : 'Sem mensagem de commit'}
                           </p>
                        </li>`
      })
   
      profileData.innerHTML += ` <div class="events">
                                    <h2>Eventos</h2>
                                    <ul>
                                       ${eventsList.length === 0 ? 'Nenhum evento encontrado' : eventsList}
                                    </ul>
                                 </div>`
   } catch (error) {
      console.error("Falha ao buscar dados da API:", error.message);
   }
}

export { showEvents }