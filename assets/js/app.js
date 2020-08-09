// VARIABLES
const misTweets = document.querySelector("#lista-tweets");

// EVENT-LISTENERS
eventListeners();
function eventListeners() {
  document
    .querySelector("#formulario")
    .addEventListener("submit", agregarTweet);

  misTweets.addEventListener("click", borrarTweet);

  document.addEventListener("DOMContentLoaded", localStorageListo);
}

// FUNCTIONS
function agregarTweet(e) {
  e.preventDefault();

  const tweet = document.querySelector("#tweet").value;
  guardarTweetLS(tweet);

  const btnBorrar = document.createElement("a");
  btnBorrar.classList.add("borrar-tweet");
  btnBorrar.innerText = "X";

  const li = document.createElement("li");
  li.innerText = tweet;
  li.appendChild(btnBorrar);
  misTweets.appendChild(li);
}

function borrarTweet(e) {
  e.preventDefault();

  if (e.target.classList.contains("borrar-tweet")) {
    e.target.parentElement.remove();
    borrarTweetLS(e.target.parentElement.innerText);
  }
}

function guardarTweetLS(tweet) {
  let tweets;
  tweets = obtenerTweetsLS();

  tweets.push(tweet);
  localStorage.setItem("tweets", JSON.stringify(tweets));
}

function obtenerTweetsLS() {
  let tweets;

  if (localStorage.getItem("tweets") === null) {
    tweets = [];
  } else {
    tweets = JSON.parse(localStorage.getItem("tweets"));
  }
  return tweets;
}

function borrarTweetLS(tweet) {
  let tweets, tweetBorrar;
  tweetBorrar = tweet.substring(0, tweet.length - 1);
  tweets = obtenerTweetsLS();

  tweets.forEach((tweet, i) => {
    if (tweetBorrar === tweet) {
      tweets.splice(i, 1);
    }
  });

  localStorage.setItem("tweets", JSON.stringify(tweets));
}

function localStorageListo() {
  let tweets;
  tweets = obtenerTweetsLS();

  tweets.forEach((tweet) => {
    const btnBorrar = document.createElement("a");
    btnBorrar.classList.add("borrar-tweet");
    btnBorrar.innerText = "X";

    const li = document.createElement("li");
    li.innerText = tweet;
    li.appendChild(btnBorrar);
    misTweets.appendChild(li);
  });
}
