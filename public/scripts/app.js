/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
// Fake data taken from initial-tweets.json

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

$(document).ready(function () {
  const $form = $('#tweet-form');

  // Load tweets from server
  const loadtweets = function () {
    return $.ajax('/tweets', {
        method: 'GET'
      })
      .then(function (tweets) {
        renderTweets(tweets)
      });
  }

  // Stop redirection of page to tweets and capture form data
  $form.submit(function (event) {
    event.preventDefault();
    const $textarea = $('#tweetTextArea');
    const userInput = $textarea.val().trim();
    if (userInput === "") {
      alert("tweet is empty")
    } else if (userInput.length > parseInt($textarea.attr("data-maxlength"))) {
      alert("tweet is more than 140 characters")
    } else {
      const formData = $(this).serialize();
      $.ajax({
          url: '/tweets',
          type: 'POST',
          data: formData
        })
        .then(function (tweet) {
          return loadtweets(tweet);
        });
    }


  });
});