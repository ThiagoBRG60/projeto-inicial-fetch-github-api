import { showUser } from "./services/fetchUser.js";
import { showRepositories } from "./services/fetchRepos.js";
import { showEvents } from "./services/fetchEvents.js";

const profileData = document.querySelector(".profile-data");
const searchUserBtn = document.getElementById("btn-search");
const inputSearch = document.getElementById("input-search");
const itemsPerPage = 10;

searchUserBtn.addEventListener("click", showUserInfo)

inputSearch.addEventListener("keyup", (e) => {
   if (e.key === "Enter") showUserInfo()
})

async function showUserInfo() {
   if (inputSearch.value !== '') {
      await showUser(inputSearch.value)
      await showRepositories(inputSearch.value)
      await showEvents(inputSearch.value)
   }else {
      alert("Digite um usuário")
   }
   inputSearch.value = ''
}

export { profileData, itemsPerPage }