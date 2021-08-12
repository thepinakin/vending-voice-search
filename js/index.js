var start = $('.start'),
  output = $('.output span'),
  msg = new SpeechSynthesisUtterance(),
  speech = new webkitSpeechRecognition();

speech.lang = "en-GB";
speech.volume = 1;
speech.rate = 1;
//speech.continuous = true;
//speech.interimResults = true;

speech.onstart = function() {
  start.addClass('active');
  $('.button-inner').removeClass('active');
}

speech.onend = function() {
  start.removeClass('active');
}

speech.onresult = function(event) {
  var resultsLength = event.results.length - 1,
    arrayLength = event.results[resultsLength].length - 1,
    finalWord = event.results[resultsLength][arrayLength].transcript;

  output.html(finalWord);

  var result = false;
  $('.button[data-number]').each(function() {
    if ($(this).data('number') == finalWord) {
      $(this).find(".button-inner").addClass('active');
      msg.text = "Here you go I found it";
      speechSynthesis.speak(msg);
      result = true;
    }
  });
  if (!result) {
    var replies = ["Can you please repeat that?", "Im  Sorry, Can you please repeat that?", "Please speak slowly and clearly", "Please select from given items only", "You have not selected any item", "Please remain calm"];
    var reply = replies[Math.floor(Math.random() * replies.length)];
    msg.text = reply;
    speechSynthesis.speak(msg);
  }
}

start.on('click', function(e) {
  e.preventDefault();
  speech.start();
});