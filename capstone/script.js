Parse.initialize("TUk8qC8TzXb3HOgpjcANScvEDtLUeuCpMLk2cF8y", "mpkPgVRs0JU0MyBIoEGh6JPMMeMRkUihgpYtM2pL"); //PASTE HERE YOUR Back4App APPLICATION ID AND YOUR JavaScript KEY
Parse.serverURL = "https://parseapi.back4app.com/";

// const quizButtons = document.querySelectorAll(".quiz-button");

let currentQuestionIndex = 0;
const questions = document.querySelectorAll(".quiz-question");

questions.forEach((questionEl, index) => {
  const submitBtn = questionEl.querySelector(".submit-btn");
  let selectedAnswer = null;

  // ANSWER SELECTION BUTTON
  questionEl.querySelectorAll(".answer-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      // visually show click
	  questionEl.querySelectorAll(".answer-btn").forEach(b => b.classList.remove("selected"));
      btn.classList.add("selected");

	  // get answer from button
	  selectedAnswer = btn.getAttribute("data-answer");
    });
  });

  // SUBMIT BUTTON
  submitBtn.addEventListener("click", () => {
    if (!selectedAnswer) {
      alert("Please select an answer.");
      return;
    }

    // SAVE TO PARSE
	const questionNumber = (index + 1).toString();	
	// const questionNumber = button.dataset.question;
    // selectedAnswer = button.dataset.answer;

    saveToParse(questionNumber, selectedAnswer);

    // Show next question
    questionEl.classList.add("hidden");
    if (questions[index + 1]) {
      questions[index + 1].classList.remove("hidden");
    } else {
      alert("Quiz complete!"); // Or show a results page
    }
  });
});



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