var showTweets = function(tweets) {
  var $tweetDisplay = $(".tweetDisplay");
  $tweetDisplay.html('');

  var index = tweets.length - 1;
  while(index >= 0){
    var tweet = tweets[index];

    var $tweetUser = $("<a class='tweetUser'></a>");
    $tweetUser.text("@" + tweet.user);

    var $tweetMessage = $("<span class='tweetMessage'></span>");
    $tweetMessage.text(" " + tweet.message);

    var $tweetTimeStamp = $("<span class='tweetTimeStamp'></span>");
    $tweetTimeStamp.text(moment(tweet.created_at).fromNow());

    var $tweet = $("<div class='tweet'></div>");
    $tweet.append($tweetUser, $tweetMessage, $tweetTimeStamp);
    $tweet.appendTo($tweetDisplay);

    index -= 1;
  }
}

var inputTweet = function() {
  if ($(this).scrollTop() > 200) {
    $("fieldset").fadeIn(500);
  }else {
    $("fieldset").fadeOut(500);
  }
}

$(document).ready(function(){
  var refresh = function() {
    showTweets(streams.home);
  };
  refresh();
  $(".refresh").on("click", function() {
    refresh();
    $("#description").text("feed");
  });
  $(".tweetDisplay").on("click", ".tweet .tweetUser", function() {
    var $user = $(this).text().slice(1);
    $("#description").text($user + "'s timeline");
    showTweets(streams.users[$user]);
  });
  $(window).scroll(inputTweet);
  $("#submit").on("click", function() {
    var tweetInput = $("#message").val();
    if (tweetInput !== "") {
      window.visitor = $("#username").val() || "anonymous";
      streams.users[window.visitor] = streams.users[window.visitor] || [];
      writeTweet(tweetInput);
      $("#username").val("");
      $("#message").val("");
      refresh();
    }
  });
});
