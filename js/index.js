// Application state
let nameState = "";

// Elements of interest
const formEl = document.querySelector("form#github-form");
const inputEl = formEl.querySelector("input#search");
const userListEl = document.querySelector("ul#user-list");
const repoListEl = document.querySelector("ul#repos-list");
const userListElFragment = document.createDocumentFragment();

// On submit, search GitHub for user matches
formEl.addEventListener("submit", (event) => {
  event.preventDefault();
  nameState = inputEl.value;
  inputEl.value = "";

  searchApiByName(nameState)
    .then((response) => response.json())
    .then((data) => {
      userListEl.innerHTML = null;
      createUserEls(data.items);
      updateUserListEl();
    });
});

// Utilitfy functions
function searchApiByName(name) {
  return fetch(`https://api.github.com/search/users?q=${name}`);
}

function createUserEl(user) {
  const userEl = document.createElement("li");
  userEl.classList.add("list-group-item");
  userEl.style.width = "18rem";

  const card = document.createElement("div");
  card.classList.add("card");

  const img = document.createElement("img");
  img.setAttribute("src", user.avatar_url);
  card.appendChild(img);

  const cardBody = document.createElement("div");
  cardBody.classList.add("card-body");
  card.appendChild(cardBody);

  const cardTitle = document.createElement("h5");
  cardTitle.textContent = user.login;

  const button = document.createElement("button");
  button.textContent = "Show Repositories";
  button.classList.add("btn", "btn-success");

  cardBody.append(cardTitle, button);
  card.appendChild(cardBody);

  userEl.appendChild(card);

  userListElFragment.appendChild(userEl);
}

function createUserEls(users) {
  for (const user of users) {
    createUserEl(user);
  }
}

function updateUserListEl() {
  userListEl.appendChild(userListElFragment);
}
