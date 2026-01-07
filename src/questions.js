// Question pool with at least 10 questions
export const questionsPool = [
  {
    id: 1,
    question: "What is the capital of France?",
    options: ["London", "Berlin", "Paris", "Madrid"],
    correctAnswer: 2
  },
  {
    id: 2,
    question: "Which planet is known as the Red Planet?",
    options: ["Venus", "Mars", "Jupiter", "Saturn"],
    correctAnswer: 1
  },
  {
    id: 3,
    question: "What is 2 + 2?",
    options: ["3", "4", "5", "6"],
    correctAnswer: 1
  },
  {
    id: 4,
    question: "Who wrote 'Romeo and Juliet'?",
    options: ["Charles Dickens", "William Shakespeare", "Jane Austen", "Mark Twain"],
    correctAnswer: 1
  },
  {
    id: 5,
    question: "What is the largest ocean on Earth?",
    options: ["Atlantic Ocean", "Indian Ocean", "Arctic Ocean", "Pacific Ocean"],
    correctAnswer: 3
  },
  {
    id: 6,
    question: "Which programming language is known as the language of the web?",
    options: ["Python", "Java", "JavaScript", "C++"],
    correctAnswer: 2
  },
  {
    id: 7,
    question: "What is the smallest prime number?",
    options: ["0", "1", "2", "3"],
    correctAnswer: 2
  },
  {
    id: 8,
    question: "Which animal is known as the King of the Jungle?",
    options: ["Tiger", "Lion", "Elephant", "Bear"],
    correctAnswer: 1
  },
  {
    id: 9,
    question: "What is the chemical symbol for water?",
    options: ["H2O", "CO2", "O2", "NaCl"],
    correctAnswer: 0
  },
  {
    id: 10,
    question: "Which year did World War II end?",
    options: ["1943", "1944", "1945", "1946"],
    correctAnswer: 2
  },
  {
    id: 11,
    question: "What is the speed of light in vacuum?",
    options: ["300,000 km/s", "150,000 km/s", "450,000 km/s", "600,000 km/s"],
    correctAnswer: 0
  },
  {
    id: 12,
    question: "Which continent is the largest?",
    options: ["Africa", "Asia", "North America", "Europe"],
    correctAnswer: 1
  }
];

// Function to get random questions from the pool
export const getRandomQuestions = (count = 3) => {
  const shuffled = [...questionsPool].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, count);
};

