import { profileData, itemsPerPage } from "../index.js"

async function getRepositories(userName) {
   const repositories = await fetch(`https://api.github.com/users/${userName}/repos?per_page=${itemsPerPage}`)
   return await repositories.json()
}

async function showRepositories(userName) {
   try {
      const userRepositories = await getRepositories(userName)  
      let repositoriesList = ''
      
      if (userRepositories.message === 'Not Found') {
         throw new Error("Falha ao buscar repositórios")
      }

      userRepositories.forEach((repositorie) => {
         repositoriesList += `<li>
                                 <a href=${repositorie.html_url} target="_blank">
                                    ${repositorie.name}
                                    <ul class="repositories-info">
                                       <li><span><i class="fa-solid fa-code-fork"></i>${repositorie.forks}</span></li>
                                       <li><span><i class="fa-regular fa-star"></i>${repositorie.stargazers_count}</span></li>  
                                       <li><span><i class="fa-solid fa-eye"></i>${repositorie.watchers}</span></li>  
                                       <li><span><i class="fa-solid fa-code"></i>${repositorie.language ?? 'Sem linguagem'}</span></li>  
                                    </ul>
                                 </a>
                              </li>`
       })
   
       profileData.innerHTML += `<div class="repositories section">
                                    <h2>Repositórios</h2>
                                    <ul>
                                       ${repositoriesList.length === 0 ? 'Nenhum repositório encontrado' : repositoriesList}
                                    </ul>
                                 </div>`
   } catch (error) {
      console.error("Falha ao buscar dados da API:", error.message);
   }
}

export { showRepositories }