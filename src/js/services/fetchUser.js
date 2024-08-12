import { profileData } from "../index.js"

async function getUser(userName) {
   const userResponse = await fetch(`https://api.github.com/users/${userName}`)
   return await userResponse.json()
}

async function showUser(userName) {
   try {
      const userResult = await getUser(userName)

      if (userResult.message === 'Not Found') {
         throw new Error("Falha ao buscar usuário")
      }

      profileData.innerHTML = `<div class="info">
                                 <img src=${userResult.avatar_url} alt="foto de perfil do usuário"/>
                                 <div class="data">
                                    <h1>${userResult.name ?? 'Nome não cadastrado'}</h1>
                                    <p>${userResult.bio ?? 'Bio não cadastrada'}</p>
                                    <div class="followers-info">
                                       <span><i class="fa-solid fa-user-group"></i>Seguidores: ${userResult.followers}</span>
                                       <span><i class="fa-solid fa-user"></i>Seguindo: ${userResult.following}</span>
                                    </div>
                                 </div>
                                 </div>`
   } catch (error) {
      console.error("Falha ao buscar dados da API:", error.message);
      errorNotFound()
   }
}

function errorNotFound() {
   profileData.innerHTML = `<div>
                              <h2>Usuário não encontrado</h2>
                            </div>`
}

export { showUser }