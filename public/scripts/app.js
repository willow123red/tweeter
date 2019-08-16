/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
// Fake data taken from initial-tweets.json
const data = [{
    "user": {
      "name": "Newton",
      "avatars": "https://i.imgur.com/73hZDYK.png",
      "handle": "@SirIsaac"
    },
    "content": {
      "text": "If I have seen further it is by standing on the shoulders of giants"
    },
    "created_at": 1461116232227
  },
  {
    "user": {
      "name": "Descartes",
      "avatars": "https://i.imgur.com/nlhLi3I.png",
      "handle": "@rd"
    },
    "content": {
      "text": "Je pense , donc je suis"
    },
    "created_at": 1461113959088
  }
]

const createTweetElement = function (tweet) {
  return `<article>
  <header>
    <figure>
      <img alt="" height="70" src="${tweet.user.avatars}">
      <figcaption>${tweet.user.name}</figcaption>
    </figure>
    <p>${tweet.user.handle}</p>
  </header>
  <p>${tweet.content.text}.</p>
  <footer>
    <p>${tweet.created_at}</p>
    <div>
      <i class="fas fa-flag"></i>
      <i class="fas fa-retweet"></i>
      <i class="fas fa-heart"></i>
    </div>
  </footer>
  </article>`;
}

const renderTweets = function (tweets) {
  for (let tweet of tweets) {
    $('#tweets').append(createTweetElement(tweet));
  }
}

renderTweets(data);