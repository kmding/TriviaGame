// the trivia
var questions = [{
	// array 0 question[0].question
	ques: "Who is Batman's alter ego?",
	choice: ["Dick Greyson", "Peter Parker", "Bruce Wayne", "Clark Kent"],
	answer: 2
}, {
	
	ques: "Where is Batman from?",
	choice: ["Gotham City", "Metropolis", "Central City", "Themyscira"],
	answer: 0
}, {
	ques: "Who killed Thomas and Martha Wayne?",
	choice: ["Conan O'Brian", "The Joker", "Random thug number three", "Joe Chill"],
	answer: 3
}, {
	ques: "What is Batman's super powers?",
	choice: ["mind reader", "none", "imagination", "powers of the bat"],
	answer: 1
}, {
	ques: "Where is Gotham located?",
	choice: ["Middle Earth", "Equestria", "New Jersey", "New York"],
	answer: 2
}, {
	ques: "What is Bruce Wayne's day time job?",
	choice: ["Reporter/Editor/Paperboy", "Teacher/Sensei/Instructor", "Billionair/Playboy/Philanthropist", "Governer/Nanny/Librarian"],
	answer: 2
}]; 

// timer int
var setTime;

// q tallys
var correctAnsw;
var inCorrectAnsw;
var unAnsw;
// user select
var userSelected;
// the int that moves 'questions var' to the next question
var currentQuestion = 0;
// pictures?
var picArray = ['0','1','2','3','4','5'];

	// start button
	$('.startButton').on("click", function(){
		$(this).hide();
		newGame();
	});

	// more timer stuff
	function go(){
	countDown = setInterval(theFinalCountDown, 1000);
	}

	// when things get to zero
	function theFinalCountDown(){
		setTime--;
		$('#timeDisplay').html('<h2>Time Remaining: ' + setTime + '</h2>');
		if (setTime === 0){
			clearInterval(countDown);
			realAnswer();
		}
	}

	//starts a new game
	function newGame(){
		$('.finalMessage').html("");
		$('.right').html("");
		$('.wrong').html("");
		$('.left').html("");
			currentQuestion = 0
			correctAnsw = 0;
			inCorrectAnsw = 0;
			unAnsw =0;
			qDisplay();
	}

	// display questions
	function qDisplay(){
		$('.message').html(' ');
		$('.rightAnswer').html(' ');
		$('.thisPictureOverHere').html(' ');
		setTime = 10;
		$('#timeDisplay').html('<h3>Time Remaining: ' + setTime + '</h3>');
		go();
		$('.theOneQuestion').html(questions[currentQuestion].ques);

	// turns the choices in to buttons and displays them
		for (var i = 0; i < 4; i++) {
			var selectableAnsw = $('<button>');
			selectableAnsw.text(questions[currentQuestion].choice[i]);
			selectableAnsw.attr({'data-index': i});
			selectableAnsw.addClass('userCelleck btn btn-default');
			$('.theAnswers').append(selectableAnsw);
		} 

		$('.userCelleck').on("click",function(){
				userSelected = $(this).data('index');
				clearInterval(countDown); 
				// display real answer
				$('.thisPictureOverHere').html('<img src = "assets/images/'+ picArray[currentQuestion] +'.gif" width = "800px">');
				realAnswer();
		});
	}
// if statements that are based on user inputs
	function realAnswer(){
			$('.theAnswers').empty();
			$('.theOneQuestion').html(" ");
		if (setTime === 0){
			unAnsw++;
			$('.message').html('You ran out of time!');
			$('.rightAnswer').html(questions[currentQuestion].choice[questions[currentQuestion].answer]);
			$('.thisPictureOverHere').html('<img src = "assets/images/'+ picArray[currentQuestion] +'.gif" width = "400px">');
			
		}

		else if (userSelected == questions[currentQuestion].answer){
			correctAnsw++;
			$('.message').html('You got it.');
			$('.rightAnswer').html(questions[currentQuestion].choice[questions[currentQuestion].answer]);
		}

		else if (userSelected != questions[currentQuestion].answer){
			inCorrectAnsw++;
			$('.message').html('Wrong!!!');
			$('.rightAnswer').html(questions[currentQuestion].choice[questions[currentQuestion].answer]);
		}

		if (currentQuestion === (questions.length-1)){
			clearInterval(countDown);
			setTimeout(scoreboard, 4000);
		}
		else{
			setTimeout(qDisplay, 4000);
		}
//let this hover, this only adds to the next array 
// functions that lead to the next question
		currentQuestion++;
		}
//create a function that's the final page displaying your unanswered, correct, and incorrect -->scoreboard
		function scoreboard(){
			$('.message').html(' ');
			$('.thisPictureOverHere').html(' ');
			$('.finalMessage').html('You finished the game.');
			$('.right').html('RIGHT: '+ correctAnsw);
			$('.wrong').html('WRONG: '+inCorrectAnsw);
			$('.left').html('N/A: '+unAnsw);
			$('.rightAnswer').html(' ');
			$('.startButton').show().text('lets go again').click(currentQuestion = 0);	
		}	