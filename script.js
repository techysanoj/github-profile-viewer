// Replace 'YOUR_GITHUB_USERNAME' with the actual GitHub username
let user = document.querySelector(".input-git");
let username = '';
let text = document.querySelector(".username")
function updateInputValue(event) {
    // Update username variable with the latest input value
    username = event.target.value;
}

user.addEventListener("input", updateInputValue);

// Fetch user profile data
async function fetchUserProfile() {
    console.log(username, user);
  try {
    const response = await fetch(`https://api.github.com/users/${username}`);
    const data = await response.json();
    // Update your HTML elements with the fetched user data
    text.innerText = '@' + data.login;
    let imgs = document.querySelector(".avatar");
    imgs.src = data.avatar_url;
    let bio = document.querySelector(".bio");
    bio.innerText = data.bio;
    let followersValue = document.querySelector(".followers-value");
    followersValue.innerText = data.followers;
    let followingValue = document.querySelector(".following-value");
    followingValue.textContent = data.following;
  } catch (error) {
    console.error('Error fetching user data:', error);
  }
}

// Fetch user repositories
async function fetchUserRepositories() {
  try {
    const response = await fetch(`https://api.github.com/users/${username}/repos`);
    const repos = await response.json();
    // Update your HTML elements with the repository data
    const repoList = document.getElementById('repositories');
    repos.forEach((repo) => {
      const listItem = document.createElement('li');
      listItem.innerHTML = `<a href="${repo.html_url}" target="_blank">${repo.name}</a>`;
      repoList.appendChild(listItem);
    });
  } catch (error) {
    console.error('Error fetching repositories:', error);
  }
}

// Call the functions to fetch data
let btn = document.querySelector(".get-details");
btn.addEventListener("click", fetchUserProfile);
