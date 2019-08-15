/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
// Fake data taken from initial-tweets.json
const data = [
  {
    "user": {
      "name": "Newton",
      "avatars": "https://i.imgur.com/73hZDYK.png"
      ,
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
      "handle": "@rd" },
    "content": {
      "text": "Je pense , donc je suis"
    },
    "created_at": 1461113959088
  }
]

const createTweetElement = function(tweet) {
  return `<div>
  <section class="tweet__header">
    <figure class="tweet__header__figure">
      <img class="tweet__header__icon" alt="" height="70" src="${tweet.user.avatars}">
      <figcaption class="tweet__header__username">${tweet.user.name}</figcaption>
    </figure>
    <p class="tweet__header__handle">${tweet.user.handle}</p>
  </section>
  <p class="tweet__body">${tweet.content.text}.</p>
  <section class="tweet__footer">
    <p class="tweet__footer__timestamp">${tweet.created_at}</p>
    <div class="tweet__footer__buttons">
    <i class="fas fa-flag"></i>
    <i class="fas fa-retweet"></i>
    <i class="fas fa-heart"></i>
  </div>
  </section>
  </div>`;
}

const renderTweets = function(tweets) {
  // loops through tweets
  // calls createTweetElement for each tweet
  // takes return value and appends it to the tweets container
  for (let tweet of tweets) {
    $('#tweets').append(createTweetElement(tweet));
  }
}

renderTweets(data);


