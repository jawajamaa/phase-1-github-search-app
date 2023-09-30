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
const userList = document.getElementById("user-list");

form.addEventListener("submit", (event) => {
    event.preventDefault();
    console.log("submit");
    if (searchContent.value === "") {
        console.log(searchContent.value);
        alert("Please enter a GitHub username or searchable keyword");
    } else {
        gitUserSearch(searchContent.value);
        console.log(searchContent.value);
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
                console.log(response);
                console.log(results);
                // renderSearchResults(results); or call new renderRepoSearchResults
             } catch (error) {
                console.log(error);
                }  
    }
            

function renderSearchResults(results) {
    let userArray = results.items;
    
    for (let user of userArray) {
        let userCard = document.createElement("li");
        let imgDiv = document.createElement("div");
        imgDiv.setAttribute("class", "card");
        let contDiv = document.createElement("div");
        contDiv.setAttribute("class", "container");
        
        console.log(userArray);
        console.log(user);

        let avatar = document.createElement("img");
        avatar.setAttribute("class", "card img");
        avatar.src = user.avatar_url;
        imgDiv.appendChild(avatar);
        userCard.appendChild(imgDiv);

        let userName = document.createElement("h3");
        userName.textContent = user.login;
            userName.addEventListener("click", (userName) => {
            console.log("click");
            let stageName = userName.innerHTML;
            searchUserRepos(stageName);
            });
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