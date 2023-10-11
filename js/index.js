// add event listener DOM content loaded
// add event listener submit button
// display results of search on DOM
// such as username, avatar, and link to profile
// clicking on user returns more data about all 
//      repositories for that user
// add event listener and make username? clickable  and
//         add mouseover listener to show user it's clickable?
// then display results of repositories
// *extra* add button to switch to repo search by keyword

// //////////////////////////////////////////////////////

// JS code

document.addEventListener("DOMContentLoaded", () => {
const form = document.getElementById("github-form");
const searchContent = document.getElementById("search");
const submitButton = document.querySelector("[name='submit']");
let userList = document.getElementById("user-list");
let reposList = document.getElementById("repos-list");
let selectedUserCard = null;
let cardClass = document.querySelectorAll(".card");

form.addEventListener("submit", (event) => {
    event.preventDefault();
    console.log("submit");
    if (searchContent.value === "") {
        alert("Please enter a GitHub username or searchable keyword");
    } else {
        gitUserSearch(searchContent.value);
        // console.log(searchContent.value);
    }    
}) 

    async function gitUserSearch(data) {
        try {
            const response = await fetch(`https://api.github.com/search/users?q=${searchContent.value}`, {
                method: "GET",
                headers: {
                    "Accept": "application/vnd.github.v3+json",
                    "Content-Type": "application/json"
                    }
                });
                const results = await response.json();
                renderSearchResults(results);
             } catch (error) {
                console.log(error);
                }
    }

    async function searchUserRepos(stageName) {
        try {
            const response = await fetch(`https://api.github.com/users/${stageName}/repos`, {
                method: "GET",
                headers: {
                    "Accept": "application/vnd.github.v3+json",
                    "Content-Type": "application/json"
                    }
                });
                const results = await response.json();
                // console.log(response);
                // console.log(results);
                renderRepoSearchResults(results);
             } catch (error) {
                console.log(error);
                }  
    }
    
function renderRepoSearchResults(results) {
    reposList.textContent = " ";
    // create an array with only 1 item - the user that was clicked on
    // then create a new array with the results of the user's repos
    // forEach repo, list the title, url and if it allows forking?
    let userRepo = [];
    let userRepoArr = results;
        for (let repo of userRepoArr) {
            userRepo.push(repo);
            let repoCard = document.createElement("li");
            repoCard.setAttribute("class", "card");
            let repoDiv = document.createElement("div");
            
            let repoTitle = document.createElement("h3");
            repoTitle.textContent = repo["name"];
            repoTitle.href = repo["url"];
            // console.log(repoTitle.href);
            let repoURL = document.createElement("a");
            // repoURL.href = repo["url"];

            let canIForkRepo = document.createElement("p");
            canIForkRepo.textContent = `Can I Fork Repository?  ${repo["fork"]}`;

            repoDiv.append(repoTitle, repoURL, canIForkRepo);
            // console.log(repoDiv);
            repoCard.append(repoDiv);
            reposList.appendChild(repoCard);
        }

}    

function renderSearchResults(results) {
    let userArray = results.items;
    
    for (let user of userArray) {
        let userCard = document.createElement("li");
        userCard.setAttribute("class", "card");
        let imgDiv = document.createElement("div");
        let contDiv = document.createElement("div");
        contDiv.setAttribute("class", "container");
        
        // console.log(userArray);
        // console.log(user);

        let avatar = document.createElement("img");
        avatar.setAttribute("class", "cardImg");
        avatar.src = user.avatar_url;
        imgDiv.appendChild(avatar);
        userCard.appendChild(imgDiv);

        let isClicked = false;
        let userName = document.createElement("h3");
        userName.textContent = user.login;
        let stageName = user.login;
        userName.addEventListener("click", () => {
            console.log("clicked", isClicked); 
            searchUserRepos(stageName);
            console.log(cardClass);
            if (isClicked === true) {
                isClicked = false;
                userCard.setAttribute("class", "card");
            } else {
                isClicked = true;
                userCard.setAttribute("class", "clickedCard");
            }
    })

        contDiv.appendChild(userName);

        let profileLink = document.createElement("a");
        profileLink.href = user.html_url;
        profileLink.innerHTML = `${userName.innerHTML+"'s profile"}`;
        contDiv.appendChild(profileLink);
        imgDiv.appendChild(contDiv);
        userCard.appendChild(imgDiv);
        userList.appendChild(userCard);
    }
}    

// below closes the DOMcontentLoaded event
})