Parse.initialize("TUk8qC8TzXb3HOgpjcANScvEDtLUeuCpMLk2cF8y", "mpkPgVRs0JU0MyBIoEGh6JPMMeMRkUihgpYtM2pL"); //PASTE HERE YOUR Back4App APPLICATION ID AND YOUR JavaScript KEY
Parse.serverURL = "https://parseapi.back4app.com/";


let currentQuestionIndex = 0;
const questions = document.querySelectorAll(".quiz-question");
const submitBtns = document.querySelectorAll(".submit-btn");
const nextBtns = document.querySelectorAll(".nxt-btn");
const introScreens = ["#title-screen", "#background-screen", "#intro-screen"];

console.log("questions:", questions);
console.log("submit buttons:", submitBtns);
console.log("next buttons", nextBtns);


// HANDLE SHOW HIDE FOR INTRO SCREENS
function attachIntroScreenListeners() {
  
  introScreens.forEach(screenId => {
    const screen = document.querySelector(screenId);
    if (!screen) return;

    const nextBtn = screen.querySelector(".nxt-btn");  // select specific nxt btn

    if (nextBtn) {
      nextBtn.addEventListener("click", () => {
        toggleIntroScreens();
      });
    }
  });
}

function toggleIntroScreens() {
  console.log('intro screen', introScreens);
  
  for (let i = 0; i < introScreens.length; i++) {
    const current = document.querySelector(introScreens[i]);
    
    if (!current.classList.contains("hidden")) {
      current.classList.add("hidden");

      // Show next screen if it exists
      if (i + 1 < introScreens.length) {
        const next = document.querySelector(introScreens[i + 1]);
        next.classList.remove("hidden");
      } else {
        // All intro screens are done, start quiz (e.g., show first quiz screen)
        const firstQuiz = document.querySelector(".quiz-screen");
        if (firstQuiz) {
          firstQuiz.classList.remove("hidden");
        }
      }
      break;
    }
  }
}


// HANDLE ANSWER SELECTION FOR EACH QUIZ QUESTION

questions.forEach((questionEl, index) => {
  let selectedAnswer = null;

  // ANSWER SELECTION BUTTON STATE HANDLER
  questionEl.querySelectorAll(".answer-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      // visually show click
      questionEl.querySelectorAll(".answer-btn").forEach(b => b.classList.remove("selected"));

      btn.classList.add("selected");

      // get answer from button
      selectedAnswer = btn.getAttribute("data-answer");
    });
  });

  // SUBMIT BUTTON LISTENR
  const submitBtn = questionEl.querySelector(".submit-btn");
  submitBtn.addEventListener('click', function(e) {
    e.preventDefault();
    
    // Find the selected button within this question
    const selectedBtn = questionEl.querySelector(".answer-btn.selected");

    if (!selectedBtn) {
      alert("Please select an answer.");
      return;      
    }

    // SAVE TO PARSE
    const questionNumber = (index + 1).toString();	
    saveToParse(questionNumber, selectedAnswer);

    // Show next question
    toggleQuizScreens();
  });
});

// FUNCTIONS -------

function toggleQuizScreens() {
  const screens = document.querySelectorAll(".quiz-screen");
  console.log("Number of screens:", screens.length);
  
  for (let i = 0; i < screens.length; i++) {
    if (!screens[i].classList.contains("hidden")) {
      // Hide current screen
      screens[i].classList.add("hidden");

      // Show next screen if it exists
      if (i + 1 < screens.length) {
        screens[i + 1].classList.remove("hidden");
        const body = document.querySelector('body')
        body.className = 'overflow'
      } else {
        // Quiz complete — show results screen
        alert('quiz complete!')
      }
      break;
    }
  }
}

async function saveToParse(questionNumber, selectedAnswer) {
	const QuizResponse = Parse.Object.extend("quizResponses");
    const response = new QuizResponse();
    response.set("questionNumber", questionNumber);
    response.set("selectedAnswer", selectedAnswer);

    try {
      const result = await response.save();
      console.log("Saved quiz response:", result);
      // Optional: visually show the answer was saved or move to next question
    } catch (error) {
      console.error("Error saving quiz response:", error);
    }
}

async function countAnswersPerQuestion() {
  const questionNumbers = ["1", "2", "3", "4"];
  const answers = ["Left", "Right"];
  const voteData = {}; // store counts

  for (const questionNumber of questionNumbers) {
    voteData[questionNumber] = {};

    for (const answer of answers) {
      const query = new Parse.Query("quizResponses");
      query.equalTo("questionNumber", questionNumber);
      query.equalTo("selectedAnswer", answer);

      try {
        const count = await query.count();
        voteData[questionNumber][answer] = count;
        console.log(voteData);

      } catch (error) {
        console.error("Error counting:", error);
        voteData[questionNumber][answer] = 0;
      }
    }
  }
  updateBars(voteData);
}

  function updateBars(voteData) {
    for (const [question, answers] of Object.entries(voteData)) {
      const totalVotes = Object.values(answers).reduce((a, b) => a + b, 0);
  
      for (const [answer, count] of Object.entries(answers)) {
        const percent = totalVotes === 0 ? 0 : (count / totalVotes) * 100;
        const barId = `q${question}-${answer.toLowerCase()}`;
        const bar = document.getElementById(barId);

        // edit width
        if (bar) {
          bar.style.width = `${percent}%`;
        }
      }
    }
  }

// // Example usage:
countAnswersPerQuestion();

// // FUNCTION CALLS -------
attachIntroScreenListeners();