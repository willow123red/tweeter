/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
// Fake data taken from initial-tweets.json
const escape =  function(str) {
  let div = document.createElement('div');
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
}

const createTweetElement = function (tweet) {
  const currentDate = Date.now();
  const tweetCreatedAt = new Date(tweet.created_at);
  return `<article>
  <header>
    <figure>
      <img alt="" height="70" src="${tweet.user.avatars}">
      <figcaption>${tweet.user.name}</figcaption>
    </figure>
    <p>${tweet.user.handle}</p>
  </header>
  <p>${escape(tweet.content.text)}</p>
  <footer>
    <p>${timeDifference(currentDate, tweetCreatedAt)}</p>
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
  const $form = $('#tweet-form').hide();
  const $toggle = $('.tweetFormToggle');
  $toggle.on("click", function() {
    $form.slideToggle(200);
  });

  // Load tweets from server
  const loadtweets = function () {
    return $.ajax('/tweets', {
        method: 'GET'
      })
      .then(function (tweets) {
        renderTweets(tweets)
      });
  }

  const $errorContainer = $('#error');
  const $textarea = $('#tweetTextArea');

  // Stop redirection of page to tweets and capture form data
  $form.submit(function (event) {
    event.preventDefault();
    $errorContainer.slideUp(1000);

    const userInput = $textarea.val().trim();

    if (userInput === "") {
      $errorContainer.slideDown(1000)
      .find('#error-message').text("Cannot submit empty tweet");
    } else if (userInput.length > parseInt($textarea.attr("data-maxlength"))) {
      $errorContainer.slideDown(1000)
      .find('#error-message').text("Tweet is more than 140 characters")
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

// Formula taken from stack overflow
const timeDifference = function(current, previous) {  
  const msPerMinute = 60 * 1000;
  const msPerHour = msPerMinute * 60;
  const msPerDay = msPerHour * 24;
  const msPerMonth = msPerDay * 30;
  const msPerYear = msPerDay * 365;
  const elapsed = current - previous;
  let plural = 's';
  if (elapsed < msPerMinute) {
    const seconds = Math.round(elapsed / 1000);
    if (seconds === 1) plural = '';
    return seconds + ' second' + plural + ' ago';
  } else if (elapsed < msPerHour) {
    const minutes = Math.round(elapsed / msPerMinute);
    if (minutes === 1) plural = '';
    return minutes + ' minute' + plural + ' ago';
  } else if (elapsed < msPerDay) {
    const hours = Math.round(elapsed / msPerHour);
    if (hours === 1) plural = '';
    return hours + ' hour' + plural + ' ago';
  } else if (elapsed < msPerMonth) {
    const days = Math.round(elapsed / msPerDay);
    if (days === 1) plural = '';
    return days + ' day' + plural + ' ago';
  } else if (elapsed < msPerYear) {
    const months = Math.round(elapsed / msPerMonth);
    if (months === 1) plural = '';
    return months + ' month' + plural + ' ago';
  } else {
    const years = Math.round(elapsed / msPerYear);
    if (years === 1) plural = '';
    return years + ' year' + plural + ' ago';
  }
};




