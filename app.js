$("#start").on("click", function(){
    $("#start").remove();
    game.loadQuestion();
})

$(document).on("click", ".answer-button", function(e){
    game.clicked(e);
});
$(document).on("click", "#reset", function(){
    game.reset();
});

var questions = [{
    question: "Everyone has a heart - except _________.",
    answers: ["him", "her", "some people", "you"],
    correctAnswer: "some people",
    image: "assets/1.gif"
}, {
    question: "What'll you have? A _______?",
    answers: ["martini", "milkshake", "cup of tea", "beer"],
    correctAnswer: "milkshake",
    image: "assets/2.gif"
}, {
    question: "Nice speech, Eve. But I wouldn't worry too much about your heart. You can always put that ___________ where your heart ought to be",
    answers: ["role", "sandwich", "money", "award"],
    correctAnswer: "award",
    image: "assets/3.gif"
}, {
    question: "Dear Margo. You were an unforgettable __________. You must play it again soon.",
    answers: ["Peter Pan", "Tinkerbell", "Tigerlily", "Wendy"],
    correctAnswer: "Peter Pan",
    image: "assets/4.gif"
}, {
    question: "We've seen you like this before. Is it over or is it just __________?",
    answers: ["finished", "begun", "getting started", "me"],
    correctAnswer: "getting started",
    image: "assets/5.gif"
}];

var game = {
    questions:questions,
    currentQuestion: 0,
    counter: 20,
    correct: 0,
    incorrect: 0,
    unanswered: 0,
    countdown: function() {
        game.counter--;
        $("#counter").html(game.counter);
        if(game.counter === 0){
            console.log("time up!")
            game.timeUp();
        }
    },
    loadQuestion: function() {
        timer = setInterval(game.countdown, 1000);
        $("#subwrapper").html("<h2> Time remainaing: <span id='counter'>20</span> seconds</h2>");
        $("#subwrapper").append("<h2>"+questions[game.currentQuestion].question+"</h2>");
        for( var i = 0; i < questions[game.currentQuestion].answers.length; i++){
            $("#subwrapper").append("<button class='answer-button' id='button-" + i + "' data-name='" + questions[game.currentQuestion].answers[i] + "'>" + questions[game.currentQuestion].answers[i]+"</button>");
        }
    },
    nextQuestion: function() {
        game.counter = 30;
        $("#counter").html(game.counter);
        game.currentQuestion++;
        game.loadQuestion();

    },

    timeUp: function(){
        clearInterval(timer);
        $("#subwrapper").html("<h2>Time has been good to Eve, but not to you</h2>");
        $("#subwrapper").append("<h3>Should have been: " + questions[ game.currentQuestion].correctAnswer + "</h3>");
        game.unanswered++
        if(game.currentQuestion==questions.length-1){
            setTimeout(game.results, 3*1000);
        } else {
            setTimeout(game.nextQuestion, 3*1000);
        }
    },

    results: function() {
        clearInterval(timer);
        $("#subwrapper").html("<h2>Slow curtain, the end.</h2>");
        $("#subwrapper").append("<h3>Correct: " + game.correct + "</h3>");
        $("#subwrapper").append("<h3>Incorrect: " + game.incorrect + "</h3>");
        $("#subwrapper").append("<h3>Unanswered: " + game.unanswered + "</h3>");
        $("#subwrapper").append("<img id='end' src='assets/end.gif'>")
        $("#subwrapper").append("<button id='reset'>Try again</button>");

    },
    clicked: function(e) {
        clearInterval(timer);
        if($(e.target).data( "name" ) === questions[game.currentQuestion].correctAnswer){
            game.answeredCorrectly();
        } else {
            game.answeredIncorrectly();
        }

    },
    answeredCorrectly: function() {
        console.log("You got it");
        clearInterval(timer);
        game.correct++;
        $("#subwrapper").html("<h2>I detest cheap sentiment but nice job, kid</h2>");
        $("#subwrapper").append("<img class='gif' src=" + questions[game.currentQuestion].image + ">");
        if(game.currentQuestion==questions.length-1){
            setTimeout(game.results, 4*1000);
        } else {
            setTimeout(game.nextQuestion, 4*1000);
        }
    },
    answeredIncorrectly: function() {
        console.log("Wrong");
        clearInterval(timer);
        game.incorrect++;
        $("#subwrapper").html("<h2>You're maudlin and full of self-pity. You're magnificent! Unfortunately, you're also incorrect.</h2>");
        $("#subwrapper").append("<h3>Should have been: " + questions[game.currentQuestion].correctAnswer + "</h3>");
        $("#subwrapper").append("<img class='gif' src=assets/wrong.gif>");
        if(game.currentQuestion==questions.length-1){
            setTimeout(game.results, 4*1000);
        } else {
            setTimeout(game.nextQuestion, 4*1000);
        }
    },
    reset: function() {
        game.currentQuestion= 0,
        game.counter= 20,
        game.correct= 0,
        game.incorrect= 0,
        game.unanswered= 0,
        game.loadQuestion();
    }

}