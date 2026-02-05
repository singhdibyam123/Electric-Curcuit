const quizData = [
  { question: "What is the unit of electrical resistance?", options: ["Ampere", "Volt", "Ohm", "Watt"], answer: "Ohm" },
  { question: "In a series circuit, current is:", options: ["Different everywhere", "The same everywhere", "Zero", "Infinite"], answer: "The same everywhere" },
  { question: "An ammeter is connected:", options: ["In parallel", "In series", "Doesn't matter", "Not connected"], answer: "In series" },
  { question: "In parallel circuits, voltage across branches is:", options: ["Different", "The same", "Zero", "Sum"], answer: "The same" },
  { question: "Ohm's Law formula is:", options: ["V = I × R", "P = V × I", "I = V / R", "Both A and C"], answer: "Both A and C" },
  { question: "Two 10Ω resistors in parallel have equivalent resistance:", options: ["20Ω", "5Ω", "10Ω", "0Ω"], answer: "5Ω" },
  { question: "A closed switch has resistance:", options: ["Infinite", "Zero", "500Ω", "None"], answer: "Zero" },
  { question: "Power in a 2Ω resistor with 1A current is:", options: ["1W", "2W", "4W", "0.5W"], answer: "2W" }
];

let currentQuestion = 0;
let score = 0;

const questionEl = document.getElementById('question');
const optionsEl = document.getElementById('options');
const resultEl = document.getElementById('result');
const nextBtn = document.getElementById('next');

function loadQuestion() {
  if (currentQuestion >= quizData.length) return;
  const q = quizData[currentQuestion];
  questionEl.textContent = q.question;
  optionsEl.innerHTML = '';
  q.options.forEach(opt => {
    const div = document.createElement('div');
    div.classList.add('option');
    div.textContent = opt;
    div.onclick = () => checkAnswer(opt, div);
    optionsEl.appendChild(div);
  });
  resultEl.textContent = '';
  nextBtn.style.display = 'none';
}

function checkAnswer(selected, element) {
  const correct = quizData[currentQuestion].answer;
  const options = optionsEl.querySelectorAll('.option');
  options.forEach(opt => opt.onclick = null); // Disable clicks
  if (selected === correct) {
    score++;
    resultEl.textContent = 'Correct!';
    resultEl.style.color = 'green';
    element.style.background = '#d4edda';
  } else {
    resultEl.textContent = `Wrong! Correct answer: ${correct}`;
    resultEl.style.color = 'red';
    element.style.background = '#f8d7da';
    options.forEach(opt => {
      if (opt.textContent === correct) opt.style.background = '#d4edda';
    });
  }
  nextBtn.style.display = 'block';
}

nextBtn.onclick = () => {
  currentQuestion++;
  if (currentQuestion < quizData.length) {
    loadQuestion();
  } else {
    questionEl.textContent = 'Quiz Complete!';
    optionsEl.innerHTML = '';
    resultEl.textContent = `Score: ${score} / ${quizData.length}`;
    nextBtn.style.display = 'none';
  }
};

window.onload = loadQuestion;