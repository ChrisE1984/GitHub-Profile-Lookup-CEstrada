// ----- data -----




// ----- elements -----

const form = document.getElementById("user-lookup");
const usernameInput = document.getElementById("username");
const status = document.getElementById("status");
const profileResult = document.getElementById ("profile-result");

// ----- functions -----
form.addEventListener("submit", function (event) {
  event.preventDefault();

  const username = usernameInput.value.trim();

  if (username === "") {
    status.textContent = "Enter a GitHub username.";
    profileResult.replaceChildren();
    return;
  }

  fetch(`https://api.github.com/users/${encodeURIComponent(username)}`)
    .then((response) => {
      console.log(response.status, response.ok);
      return response.json();
    })

    .then(function (profile) {
        const card = document.createElement("article");
        card.className = "profile-card";
        
        const avatar = document.createElement("img");
        avatar.src = profile.avatar_url;
        avatar.alt = profile.login + "'s Avatar";
        card.append(avatar);

        const name = document.createElement ("h2");
        name.textContent = profile.name || profile.login;
        card.append(name);

      const usernameText = document.createElement("p");
      usernameText.textContent = "@" + profile.login;
      card.append(usernameText);

        if (profile.bio){
            const bio = document.createElement("p");
            bio.textContent = profile.bio;
            card.append(bio);
        }

        const stats = document.createElement ("p");
        stats.textContent = 
        "Repositories: " + profile.public_repos +
        " | Followers: " + profile.followers +
        " | Following: " + profile.following;
        card.append(stats);
        

    profileResult.replaceChildren(card);
      

    });

});

// ----- listeners -----



// ----- run at load -----