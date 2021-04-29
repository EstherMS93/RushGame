// select all elements
const start = document.getElementById("start");
const title = document.getElementById("title");
const quiz = document.getElementById("quiz");
const question = document.getElementById("question");
const choiceA = document.getElementById("A");
const choiceB = document.getElementById("B");
const choiceC = document.getElementById("C");
const choiceD = document.getElementById("D");
const circuit = document.getElementById("circuit");
const counter = document.getElementById("counter");
const chrono = document.getElementById("chrono");
const progress = document.getElementById("progress");
const scoreDiv = document.getElementById("scoreContainer");
const audio = document.getElementsByClassName("sound");

// create our questions
let questions = [
  {
    question: "Who has won the most races in a single F-1 season?",
    choiceA: "Michael Schumacher",
    choiceB: "Lewis Hamilton",
    choiceC: "Niki Lauda",
    choiceD: "Mika Hakkinen",
    correct: "A",
    image: "img/monaco.png",
  },
  {
    question:
      "How many liters of fuel does a car have at the start of the race on average?",
    choiceA: "560 L",
    choiceB: "135 L",
    choiceC: "210 L",
    choiceD: "48 L",
    correct: "C",
    image: "img/monza.png",
  },
  {
    question: "What is a Tifosi?",
    choiceA: "The name of a circuit",
    choiceB: "A Ferrari supporter",
    choiceC: "A race accident",
    choiceD: "A type of tyre",
    correct: "B",
    image: "img/baku.png",
  },
  {
    question: "Who is the youngest world champion ever?",
    choiceA: "Sebastian Vettel",
    choiceB: "Lewis Hamilton",
    choiceC: "Max Verstappen",
    choiceD: "Emerson Fittipaldi",
    correct: "A",
    image: "img/sepang.png",
  },
  {
    question: "Which of these two teams has more constructor championships?",
    choiceA: "McLaren",
    choiceB: "Mercedes",
    choiceC: "Red Bull",
    choiceD: "Williams",
    correct: "D",
    image: "img/germany.png",
  },
  {
    question: "Which country has hosted most F-1 races?",
    choiceA: "Germany",
    choiceB: "Italy",
    choiceC: "Monaco",
    choiceD: "Australia",
    correct: "B",
    image: "img/silverstone.png",
  },
  {
    question:
      "Which driver almost made his team go bankrupt because his contract included a bonus-per-point clause?",
    choiceA: "Fernando Alonso",
    choiceB: "Michael Schumacher",
    choiceC: "Kimi Räikkönen",
    choiceD: "Nico Rosberg",
    correct: "C",
    image: "img/catalunya.png",
  },
  {
    question:
      "How many championships did Ayrton Senna win before his death in 1994?",
    choiceA: "Three",
    choiceB: "Seven",
    choiceC: "Two",
    choiceD: "He never won",
    correct: "A",
    image: "img/valencia.png",
  },
  {
    question:
      "Which constructor won the championship on its first year of existance?",
    choiceA: "Red Bull",
    choiceB: "Lotus",
    choiceC: "Minardi",
    choiceD: "Brawn GP",
    correct: "D",
    image: "img/yas-marina.png",
  },
];

// create some variables

const lastQuestion = questions.length - 1;
let currentQuestion = 0;
let count = 0;
const questionTime = 10; // 10s
const timerSize = 150; // 150px
const clock = timerSize / questionTime;
let TIMER;
let score = 0;

// render a question
function renderQuestion() {
  let q = questions[currentQuestion];

  question.innerHTML = "<p>" + q.question + "</p>";
  circuit.innerHTML = "<img src=" + q.image + ">";
  choiceA.innerHTML = q.choiceA;
  choiceB.innerHTML = q.choiceB;
  choiceC.innerHTML = q.choiceC;
  choiceD.innerHTML = q.choiceD;
}

start.addEventListener("click", startQuiz);

// start quiz
function startQuiz() {
  start.style.display = "none";
  renderQuestion();
  title.style.display = "none";
  quiz.style.display = "block";
  renderProgress();
  renderCounter();
  TIMER = setInterval(renderCounter, 1000);
}

// render progress
function renderProgress() {
  for (let qIndex = 0; qIndex <= lastQuestion; qIndex++) {
    progress.innerHTML += "<div class='prog' id=" + qIndex + "></div>";
  }
}

// counter render

function renderCounter() {
  if (count <= questionTime) {
    counter.innerHTML = count;
    chrono.style.width = count * clock + "px";
    count++;
  } else {
    count = 0;
    // change progress color to red
    answerIsWrong();
    if (currentQuestion < lastQuestion) {
      currentQuestion++;
      renderQuestion();
      answerIsWrongAudio();
    } else {
      // end the quiz and show the score
      clearInterval(TIMER);
      scoreRender();
    }
  }
}

// checkAnwer

function checkAnswer(answer) {
  if (answer == questions[currentQuestion].correct) {
    // answer is correct
    score++;
    // change progress color to green
    answerIsCorrect();
    // trigger audio clip
    answerIsCorrectAudio();
  } else {
    // answer is wrong
    // change progress color to red
    answerIsWrong();
    // trigger audio clip
    answerIsWrongAudio();
  }
  count = 0;
  if (currentQuestion < lastQuestion) {
    currentQuestion++;
    renderQuestion();
  } else {
    // end the quiz and show the score
    clearInterval(TIMER);
    scoreRender();
  }
}

// answer is correct
function answerIsCorrect() {
  document.getElementById(currentQuestion).style.backgroundColor =
    "rgba(12, 71, 15, 0.7)";
}
function answerIsCorrectAudio() {
  document.getElementById("audiotag1").play();
}

// answer is Wrong
function answerIsWrong() {
  document.getElementById(currentQuestion).style.backgroundColor =
    "rgba(148, 5, 5, 0.7)";
}
function answerIsWrongAudio() {
  document.getElementById("audiotag2").play();
}

// score render
function scoreRender() {
  scoreDiv.style.display = "block";

  // calculate the amount of question percent answered by the user
  const scorePerCent = Math.round((100 * score) / questions.length);

  scoreDiv.innerHTML += "<p>" + scorePerCent + "%</p>";
}
