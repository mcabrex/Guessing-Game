var Game = function() {
    this.playersGuess = null;
    this.winningNumber = generateWinningNumber();
    this.pastGuesses = [];
}

function generateWinningNumber() {
    return Math.ceil(Math.random()*100);
}


function newGame() {
    return new Game();
}

Game.prototype.difference = function() {
    return Math.abs(this.playersGuess-this.winningNumber);
}

Game.prototype.isLower = function() {
    return this.playersGuess < this.winningNumber;
}

Game.prototype.playersGuessSubmission = function(guess) {
    this.playersGuess = guess;
    return this.checkGuess();
}

Game.prototype.checkGuess = function() {

    if(this.playersGuess===this.winningNumber) {
        $('#hint, #submit').prop("disabled",true);
        $('#subtitle').text("Press the Reset button to play again!")
        return 'Wow you actually got it, kind of wasn\'t expecting that. Kudos to you though.'
    } else {
        this.pastGuesses.push(this.playersGuess);
        $('#guess-list li:nth-child('+ this.pastGuesses.length +')').text(this.playersGuess);
        if(this.pastGuesses.length === 1) {
          $('#title').text('Do This.');
          $('#subtitle').text("It's easy isn't it, to do as you are told.")
          $('#message').text('You Have 6 chances to guess this number. You just used one.')
        }
        if(this.pastGuesses.length === 2) {
          $('#title').text('Do That.');
          $('#subtitle').text("But if we have free will then we don't really have to do as we're told do we?")
          $('#message').text('Here\'s a rule: The number is between 1 and 100!')
        }
        if(this.pastGuesses.length === 3) {
          $('#title').text('You can do it!');
          $('#subtitle').text("Yet here we are, subconcious slaves to an arbitrary set of rules that don't actually even exist.")
          $('#message').text('Here\'s another rule: You are in complete control of your own decisions.')
        }
        if(this.pastGuesses.length === 4) {
          $('#title').text('You WILL do it');
          $('#subtitle').text("Rules are fun aren't they? (I guess you can say they RULE, haha) But perhaps you shouldn't always trust them.")
          $('#message').text('I wouldn\'t trust those hints so much either, personal preference though.')
        }
        if(this.pastGuesses.length === 5) {
          $('#title').text('The solution is very simple actually');
          $('#subtitle').text("You can only lose if you play")
          $('#message').text('One guess left! Exciting stuff!')
        }
        if(this.pastGuesses.length === 6) {
            $('#hint, #submit').prop("disabled",true);
            $('#subtitle').text("These are just procedurally generated strings of text though, did you even really win?")
            $('#message').text('Does it really even matter?')
            return 'Congratulations you won!';
        }
        if(this.pastGuesses.length === 7) {
          $('#title').text('Aw darn, You Lost!');
          $('#subtitle').text('See? I can say whatever I want, I\'m a loose cannon with nobody to rein me in')
          $('#message').text('Did I spell rein right?')
        }
        if(this.pastGuesses.length > 7) {
          $('#subtitle').text(generatePoem());
          $('#title').text('Nothing\'s going to happen after this point really')
          $('#message').text('seriously, nothing\'s going to happen')
        }
    }
}

Game.prototype.provideHint = function() {
    var hintArray = [Math.floor(this.winningNumber/2), generateWinningNumber(), generateWinningNumber()];
    return shuffle(hintArray);
}

function shuffle(arr) { //Fisher-Yates - https://bost.ocks.org/mike/shuffle/
   for(var i = arr.length-1; i > 0; i--) {
       var randomIndex = Math.floor(Math.random() * (i + 1));
       var temp = arr[i];
       arr[i] = arr[randomIndex];
       arr[randomIndex] = temp;
    }
    return arr;
}

function makeAGuess(game) {
    var guess = $('#players-input').val();
    $('#players-input').val("");
    var output = game.playersGuessSubmission(parseInt(guess,10));
    $('#title').text(output);
}

function killer(a,b){
  if($(b).is(':visible')){
    $(a).css('color','red')
    $(a).prop('disabled',true)
    $(b).hide()
  }
}

function toggler(a,b){
  $(a).click(function(){
    if($('p').is(':visible')) $('p').hide();
    $(b).toggle();
  })
}

$(document).ready(function() {
    var game = new Game();

    $('#dawn-text').hide();
    $('#robert-text').hide();
    $('#sam-text').hide();
    $('#jessica-text').hide();
    $('#eric-text').hide();
    $('#ben-text').hide();

    toggler('#dawn','#dawn-text')
    toggler('#robert','#robert-text')
    toggler('#sam','#sam-text')
    toggler('#ben','#ben-text')
    toggler('#jessica','#jessica-text')
    toggler('#eric','#eric-text')

    $('#submit').click(function(e) {
       makeAGuess(game);
    })

    $('#submit').click(function() {
      killer('#eric','#eric-text');
      killer('#jessica','#jessica-text');
      killer('#ben','#ben-text');
      killer('#sam','#sam-text');
      killer('#robert','#robert-text');
      killer('#dawn','#dawn-text');
    })

    $('#players-input').keypress(function(event) {
        if(event.which == 13){
           makeAGuess(game);
        }
    })

    $('#hint').click(function() {
        var hints = game.provideHint();
        $('#title').text('The winning number is '+hints[0]+', '+hints[1]+', or '+hints[2]);
        $('#subtitle').text('')
    });

    $('#reset').click(function() {
        // game = newGame();
        $('#title').text('Wouldn\'t life be so much easier if you could only just reset things!');
        $('#subtitle').text('In reality however there are no do-overs. You can piece things together and fill in the cracks but the repercussions of your actions shall always remain.')
    })

})



















function generatePoem(){

  function parseText(text){
    var newText = text.replace(/[^a-zA-Z ]/g, "");
    var arr = newText.toLowerCase().split(' ');
    return arr;
  }

	var text = 'Hey, now, you\'re an All Star, get your game on, go play Hey, now, you\'re a Rock Star, get the show on, get paid And all that glitters is gold Only shooting stars break the mold';

  var parsedText = parseText(text);

  function generateWordPairs(text){
    var shiftWord = parsedText[0];
    var arr2 = text.replace(/[^a-zA-Z ]/g, "").toLowerCase().split(' ');
    arr2.shift();
    arr2.push(shiftWord);
    var obj = {};
    for(var i in parsedText){
      (obj[parsedText[i]]) ? obj[parsedText[i]].push(arr2[i]) : obj[parsedText[i]] = [arr2[i]];
    }
    return obj;
  }

  function random(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  var wordPairs = generateWordPairs(text);
  var n = random(6,10);

  function writeLine(wordPairs,n){
    var emptyArr = [];
    function random(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
    }
    randomFirstWord = random(0,parsedText.length-1);
    emptyArr.push(parsedText[randomFirstWord]);
    emptyArr.length = n;
    for(let i = 1; i < emptyArr.length; i++){
      (wordPairs[emptyArr[i-1]][random(0,wordPairs[emptyArr[i-1]].length-1)] < 1) ?
      emptyArr[i] = wordPairs[emptyArr[i-1]][0] :
      emptyArr[i] = wordPairs[emptyArr[i-1]][random(0,wordPairs[emptyArr[i-1]].length-1)];
    }
    var line =  emptyArr.join(' ');
    return line.charAt(0).toUpperCase() + line.slice(1);
  }

  writeLine(wordPairs,n);
  var lines = random(5,8);

  var poemArr = [];
  for(var i = 0; i < lines; i++){
    if(poemArr.length < lines){
      poemArr.push(writeLine(wordPairs,n));
    }
  }
  var poem =  poemArr.join('\n');
  return poem;
}
