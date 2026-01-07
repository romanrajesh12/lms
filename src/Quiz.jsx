import { useState, useEffect } from 'react';
import './Quiz.css';

const Quiz = ({ questions, onSubmit, quizType = 'pre-test' }) => {
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState(0);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

  useEffect(() => {
    // Initialize selectedAnswers with empty values
    const initialAnswers = {};
    questions.forEach(q => {
      initialAnswers[q.id] = null;
    });
    setSelectedAnswers(initialAnswers);
  }, [questions]);

  const handleAnswerSelect = (questionId, answerIndex) => {
    if (!submitted) {
      setSelectedAnswers(prev => ({
        ...prev,
        [questionId]: answerIndex
      }));
    }
  };

  const handleNext = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const handleSubmit = () => {
    if (submitted) return;

    let correctCount = 0;
    questions.forEach(q => {
      if (selectedAnswers[q.id] === q.correctAnswer) {
        correctCount++;
      }
    });

    const calculatedScore = Math.round((correctCount / questions.length) * 100);
    setScore(calculatedScore);
    setSubmitted(true);

    // Call onSubmit callback with score
    if (onSubmit) {
      onSubmit(calculatedScore, selectedAnswers);
    }
  };

  const goToQuestion = (index) => {
    setCurrentQuestionIndex(index);
  };

  if (!questions || questions.length === 0) {
    return (
      <div className="quiz-container">
        <div className="quiz-header">
          <h2>{quizType === 'pre-test' ? 'Pre-Test' : 'Post-Test'}</h2>
          <p className="quiz-instructions">Loading questions...</p>
        </div>
      </div>
    );
  }

  const currentQuestion = questions[currentQuestionIndex];
  const isAnswered = selectedAnswers[currentQuestion.id] !== null;
  const isCorrect = submitted && selectedAnswers[currentQuestion.id] === currentQuestion.correctAnswer;
  const isWrong = submitted && selectedAnswers[currentQuestion.id] !== currentQuestion.correctAnswer && selectedAnswers[currentQuestion.id] !== null;
  const allAnswered = Object.values(selectedAnswers).every(answer => answer !== null);

  return (
    <div className="quiz-container">
      <div className="quiz-header">
        <h2>{quizType === 'pre-test' ? 'Pre-Test' : 'Post-Test'}</h2>
        <p className="quiz-instructions">
          Answer each question carefully. You can navigate between questions.
        </p>
      </div>

      <div className="question-progress">
        {questions.map((_, index) => (
          <div
            key={index}
            className={`progress-dot ${
              index === currentQuestionIndex ? 'active' : ''
            } ${
              selectedAnswers[questions[index].id] !== null ? 'completed' : ''
            }`}
            onClick={() => !submitted && goToQuestion(index)}
            style={{ cursor: submitted ? 'default' : 'pointer' }}
          />
        ))}
      </div>

      <div className="questions-list">
        <div
          className={`question-card ${submitted ? (isCorrect ? 'correct' : isWrong ? 'wrong' : '') : ''}`}
        >
          <div className="question-number">Question {currentQuestionIndex + 1}</div>
          <h3 className="question-text">{currentQuestion.question}</h3>

          <div className="options-list">
            {currentQuestion.options.map((option, optIndex) => {
              const isSelected = selectedAnswers[currentQuestion.id] === optIndex;
              const isCorrectOption = optIndex === currentQuestion.correctAnswer;

              return (
                <label
                  key={optIndex}
                  className={`option-label ${
                    isSelected ? 'selected' : ''
                  } ${
                    submitted && isCorrectOption ? 'correct-answer' : ''
                  } ${
                    submitted && isWrong && isSelected ? 'wrong-answer' : ''
                  }`}
                >
                  <input
                    type="radio"
                    name={`question-${currentQuestion.id}`}
                    value={optIndex}
                    checked={isSelected}
                    onChange={() => handleAnswerSelect(currentQuestion.id, optIndex)}
                    disabled={submitted}
                  />
                  <span className="option-text">{option}</span>
                  {submitted && isCorrectOption && (
                    <span className="checkmark">✓</span>
                  )}
                </label>
              );
            })}
          </div>
        </div>
      </div>

      <div className="navigation-buttons">
        <button
          className="nav-btn"
          onClick={handlePrevious}
          disabled={currentQuestionIndex === 0 || submitted}
        >
          Previous
        </button>

        <div className="question-status">
          {submitted ? (
            <span className="answered-indicator">
              {isCorrect ? '✓ Correct' : isWrong ? '✗ Incorrect' : 'Not answered'}
            </span>
          ) : (
            <span className={isAnswered ? 'answered-indicator' : 'unanswered-indicator'}>
              {isAnswered ? '✓ Answered' : 'Not answered'}
            </span>
          )}
        </div>

        {currentQuestionIndex < questions.length - 1 ? (
          <button
            className="nav-btn"
            onClick={handleNext}
            disabled={submitted}
          >
            Next
          </button>
        ) : (
          <button
            className="submit-btn"
            onClick={handleSubmit}
            disabled={!allAnswered || submitted}
          >
            Submit Quiz
          </button>
        )}
      </div>

      {!submitted && (
        <div className="quiz-footer">
          <p className="warning-text">
            {!allAnswered
              ? `Please answer all questions before submitting (${Object.values(selectedAnswers).filter(a => a !== null).length}/${questions.length} answered)`
              : 'All questions answered! Ready to submit.'}
          </p>
        </div>
      )}

      {submitted && (
        <div className="score-display">
          <div className="score-circle">
            <div className="score-value">{score}%</div>
            <div className="score-label">Score</div>
          </div>
          <p className="score-message">
            You got {questions.filter(q => selectedAnswers[q.id] === q.correctAnswer).length} out of {questions.length} questions correct!
          </p>
        </div>
      )}
    </div>
  );
};

export default Quiz;

