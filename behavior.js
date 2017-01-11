var showTweets = function(tweets) {
  var $tweetDisplay = $(".tweetDisplay");
  $tweetDisplay.html('');

  var index = tweets.length - 1;
  while(index >= 0){
    var tweet = tweets[index];

    var $tweetUser = $("<span class='tweetUser'></span>");
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

$(document).ready(function(){
  var refresh = function() {
    showTweets(streams.home);
  };
  refresh();
  $(".refresh").on("click", refresh);
  $(".tweetDisplay").on("click", ".tweet .tweetUser", function() {
    var $user = $(this).text().slice(1);
    $("#description").text($user + "'s Timeline")
    showTweets(streams.users[$user]);
  });
});