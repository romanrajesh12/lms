import { useState, useEffect } from 'react';
import Quiz from './Quiz';
import VideoPlayer from './VideoPlayer';
import Login from './Login';
import { questionsPool } from './questions';
import './App.css';

const STORAGE_KEYS = {
  CURRENT_STEP: 'quiz_current_step',
  PRE_TEST_QUESTIONS: 'quiz_pre_test_questions',
  PRE_TEST_ANSWERS: 'quiz_pre_test_answers',
  PRE_TEST_SCORE: 'quiz_pre_test_score',
  PRE_TEST_CURRENT_QUESTION: 'quiz_pre_test_current_question',
  VIDEO_COMPLETED: 'quiz_video_completed',
  POST_TEST_QUESTIONS: 'quiz_post_test_questions',
  POST_TEST_ANSWERS: 'quiz_post_test_answers',
  POST_TEST_SCORE: 'quiz_post_test_score',
  POST_TEST_CURRENT_QUESTION: 'quiz_post_test_current_question',
  USER_TYPE: 'quiz_user_type',
  USERNAME: 'quiz_username',
  QUESTIONS_POOL: 'quiz_questions_pool'
};

const STEPS = {
  LOGIN: 'login',
  ADMIN: 'admin',
  PRE_TEST: 'pre_test',
  PRE_TEST_RESULTS: 'pre_test_results',
  VIDEO: 'video',
  POST_TEST: 'post_test',
  RESULTS: 'results'
};

function App() {
  const [currentStep, setCurrentStep] = useState(STEPS.LOGIN);
  const [isAdmin, setIsAdmin] = useState(false);
  const [username, setUsername] = useState('');
  const [preTestQuestions, setPreTestQuestions] = useState([]);
  const [preTestScore, setPreTestScore] = useState(null);
  const [preTestAnswers, setPreTestAnswers] = useState({});
  const [preTestCurrentQuestion, setPreTestCurrentQuestion] = useState(0);
  const [videoCompleted, setVideoCompleted] = useState(false);
  const [postTestQuestions, setPostTestQuestions] = useState([]);
  const [postTestScore, setPostTestScore] = useState(null);
  const [postTestAnswers, setPostTestAnswers] = useState({});
  const [postTestCurrentQuestion, setPostTestCurrentQuestion] = useState(0);
  const [localQuestionsPool, setLocalQuestionsPool] = useState(questionsPool);

  // Load state from localStorage on mount
  useEffect(() => {
    const savedStep = localStorage.getItem(STORAGE_KEYS.CURRENT_STEP);
    const savedUserType = localStorage.getItem(STORAGE_KEYS.USER_TYPE);
    const savedPreTestQuestions = localStorage.getItem(STORAGE_KEYS.PRE_TEST_QUESTIONS);
    const savedPreTestAnswers = localStorage.getItem(STORAGE_KEYS.PRE_TEST_ANSWERS);
    const savedPreTestScore = localStorage.getItem(STORAGE_KEYS.PRE_TEST_SCORE);
    const savedPreTestCurrentQuestion = localStorage.getItem(STORAGE_KEYS.PRE_TEST_CURRENT_QUESTION);
    const savedVideoCompleted = localStorage.getItem(STORAGE_KEYS.VIDEO_COMPLETED);
    const savedPostTestQuestions = localStorage.getItem(STORAGE_KEYS.POST_TEST_QUESTIONS);
    const savedPostTestAnswers = localStorage.getItem(STORAGE_KEYS.POST_TEST_ANSWERS);
    const savedPostTestScore = localStorage.getItem(STORAGE_KEYS.POST_TEST_SCORE);
    const savedPostTestCurrentQuestion = localStorage.getItem(STORAGE_KEYS.POST_TEST_CURRENT_QUESTION);
    const savedQuestionsPool = localStorage.getItem(STORAGE_KEYS.QUESTIONS_POOL);
    const savedUsername = localStorage.getItem(STORAGE_KEYS.USERNAME);

    if (savedUserType) {
      setIsAdmin(savedUserType === 'admin');
    }

    if (savedUsername) {
      setUsername(savedUsername);
    }

    if (savedQuestionsPool) {
      try {
        setLocalQuestionsPool(JSON.parse(savedQuestionsPool));
      } catch (e) {
        console.error('Error parsing saved questions pool:', e);
      }
    }

    if (savedStep) {
      setCurrentStep(savedStep);
      
      if (savedPreTestQuestions) {
        try {
          setPreTestQuestions(JSON.parse(savedPreTestQuestions));
        } catch (e) {
          console.error('Error parsing saved pre-test questions:', e);
        }
      }

      if (savedPreTestAnswers) {
        try {
          setPreTestAnswers(JSON.parse(savedPreTestAnswers));
        } catch (e) {
          console.error('Error parsing saved pre-test answers:', e);
        }
      }

      if (savedPreTestScore !== null) {
        setPreTestScore(parseInt(savedPreTestScore));
      }

      if (savedPreTestCurrentQuestion !== null) {
        setPreTestCurrentQuestion(parseInt(savedPreTestCurrentQuestion));
      }

      if (savedVideoCompleted === 'true') {
        setVideoCompleted(true);
      }

      if (savedPostTestQuestions) {
        try {
          setPostTestQuestions(JSON.parse(savedPostTestQuestions));
        } catch (e) {
          console.error('Error parsing saved post-test questions:', e);
        }
      }

      if (savedPostTestAnswers) {
        try {
          setPostTestAnswers(JSON.parse(savedPostTestAnswers));
        } catch (e) {
          console.error('Error parsing saved post-test answers:', e);
        }
      }

      if (savedPostTestScore !== null) {
        setPostTestScore(parseInt(savedPostTestScore));
      }

      if (savedPostTestCurrentQuestion !== null) {
        setPostTestCurrentQuestion(parseInt(savedPostTestCurrentQuestion));
      }
    }
  }, []);

  // Save state to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.CURRENT_STEP, currentStep);
  }, [currentStep]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.USER_TYPE, isAdmin ? 'admin' : 'user');
  }, [isAdmin]);

  useEffect(() => {
    if (username) {
      localStorage.setItem(STORAGE_KEYS.USERNAME, username);
    }
  }, [username]);

  useEffect(() => {
    if (preTestQuestions.length > 0) {
      localStorage.setItem(STORAGE_KEYS.PRE_TEST_QUESTIONS, JSON.stringify(preTestQuestions));
    }
  }, [preTestQuestions]);

  useEffect(() => {
    if (Object.keys(preTestAnswers).length > 0) {
      localStorage.setItem(STORAGE_KEYS.PRE_TEST_ANSWERS, JSON.stringify(preTestAnswers));
    }
  }, [preTestAnswers]);

  useEffect(() => {
    if (preTestScore !== null) {
      localStorage.setItem(STORAGE_KEYS.PRE_TEST_SCORE, preTestScore.toString());
    }
  }, [preTestScore]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.PRE_TEST_CURRENT_QUESTION, preTestCurrentQuestion.toString());
  }, [preTestCurrentQuestion]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.VIDEO_COMPLETED, videoCompleted.toString());
  }, [videoCompleted]);

  useEffect(() => {
    if (postTestQuestions.length > 0) {
      localStorage.setItem(STORAGE_KEYS.POST_TEST_QUESTIONS, JSON.stringify(postTestQuestions));
    }
  }, [postTestQuestions]);

  useEffect(() => {
    if (Object.keys(postTestAnswers).length > 0) {
      localStorage.setItem(STORAGE_KEYS.POST_TEST_ANSWERS, JSON.stringify(postTestAnswers));
    }
  }, [postTestAnswers]);

  useEffect(() => {
    if (postTestScore !== null) {
      localStorage.setItem(STORAGE_KEYS.POST_TEST_SCORE, postTestScore.toString());
    }
  }, [postTestScore]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.POST_TEST_CURRENT_QUESTION, postTestCurrentQuestion.toString());
  }, [postTestCurrentQuestion]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.QUESTIONS_POOL, JSON.stringify(localQuestionsPool));
  }, [localQuestionsPool]);

  const handleLogin = ({ isAdmin: adminMode, username: name }) => {
    setIsAdmin(adminMode);
    setUsername(name || '');
    if (adminMode) {
      // Take admin to admin panel
      setCurrentStep(STEPS.ADMIN);
    } else {
      // Only start pre-test if user is not admin
      startPreTest();
    }
  };

  const getRandomQuestions = (count = 3) => {
    const shuffled = [...localQuestionsPool].sort(() => Math.random() - 0.5);
    return shuffled.slice(0, count);
  };

  // Auto-generate post-test questions if video is completed but questions don't exist
  useEffect(() => {
    if (videoCompleted && postTestQuestions.length === 0 && currentStep === STEPS.VIDEO && localQuestionsPool.length > 0) {
      const shuffled = [...localQuestionsPool].sort(() => Math.random() - 0.5);
      const randomQuestions = shuffled.slice(0, 3);
      setPostTestQuestions(randomQuestions);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [videoCompleted, postTestQuestions.length, currentStep, localQuestionsPool.length]);

  const startPreTest = () => {
    const randomQuestions = getRandomQuestions(3);
    setPreTestQuestions(randomQuestions);
    setCurrentStep(STEPS.PRE_TEST);
  };

  const handlePreTestSubmit = (score, answers) => {
    setPreTestScore(score);
    setPreTestAnswers(answers);
    setCurrentStep(STEPS.PRE_TEST_RESULTS);
  };

  const handleVideoEnd = () => {
    setVideoCompleted(true);
    const randomQuestions = getRandomQuestions(3);
    setPostTestQuestions(randomQuestions);
    setCurrentStep(STEPS.POST_TEST);
  };

  const handlePostTestSubmit = (score, answers) => {
    setPostTestScore(score);
    setPostTestAnswers(answers);
    setCurrentStep(STEPS.RESULTS);
  };

  const handleUpdateQuestions = (updatedQuestion) => {
    const updatedPool = localQuestionsPool.map(q =>
      q.id === updatedQuestion.id ? updatedQuestion : q
    );
    setLocalQuestionsPool(updatedPool);
  };

  const handleLogout = () => {
    // Clear user-related localStorage but keep questions
    localStorage.removeItem(STORAGE_KEYS.CURRENT_STEP);
    localStorage.removeItem(STORAGE_KEYS.USER_TYPE);
    localStorage.removeItem(STORAGE_KEYS.USERNAME);
    localStorage.removeItem(STORAGE_KEYS.PRE_TEST_QUESTIONS);
    localStorage.removeItem(STORAGE_KEYS.PRE_TEST_ANSWERS);
    localStorage.removeItem(STORAGE_KEYS.PRE_TEST_SCORE);
    localStorage.removeItem(STORAGE_KEYS.VIDEO_COMPLETED);
    localStorage.removeItem(STORAGE_KEYS.POST_TEST_QUESTIONS);
    localStorage.removeItem(STORAGE_KEYS.POST_TEST_ANSWERS);
    localStorage.removeItem(STORAGE_KEYS.POST_TEST_SCORE);
    
    // Reset user state but keep questions
    setCurrentStep(STEPS.LOGIN);
    setIsAdmin(false);
    setUsername('');
    setPreTestQuestions([]);
    setPreTestScore(null);
    setPreTestAnswers({});
    setVideoCompleted(false);
    setPostTestQuestions([]);
    setPostTestScore(null);
    setPostTestAnswers({});
  };

  const handleReset = () => {
    // Clear all localStorage
    Object.values(STORAGE_KEYS).forEach(key => {
      localStorage.removeItem(key);
    });
    
    // Reset all state
    setCurrentStep(STEPS.LOGIN);
    setIsAdmin(false);
    setPreTestQuestions([]);
    setPreTestScore(null);
    setPreTestAnswers({});
    setVideoCompleted(false);
    setPostTestQuestions([]);
    setPostTestScore(null);
    setPostTestAnswers({});
  };

  const renderCurrentStep = () => {
    switch (currentStep) {
      case STEPS.LOGIN:
        return (
          <Login
            onLogin={handleLogin}
            isAdmin={isAdmin}
            initialUsername={username}
            questionsPool={localQuestionsPool}
            onUpdateQuestions={handleUpdateQuestions}
          />
        );

      case STEPS.ADMIN:
        return (
          <Login
            onLogin={handleLogin}
            isAdmin={true}
            initialUsername={username}
            questionsPool={localQuestionsPool}
            onUpdateQuestions={handleUpdateQuestions}
          />
        );

      case STEPS.PRE_TEST:
        return (
          <div className="step-container">
            <Quiz
              questions={preTestQuestions}
              onSubmit={handlePreTestSubmit}
              quizType="pre-test"
            />
          </div>
        );

      case STEPS.PRE_TEST_RESULTS: {
        const preTestCorrect = preTestQuestions.filter(q => preTestAnswers[q.id] === q.correctAnswer).length;
        return (
          <div className="results-container">
            <h2>Pre-Test Results</h2>
            <div className="results-grid">
              <div className="result-card">
                <h3>Pre-Test Score</h3>
                <div className="result-score">{preTestScore ?? 0}%</div>
                <p>
                  {preTestCorrect} / {preTestQuestions.length} correct
                </p>
              </div>
            </div>
            <div className="next-step-prompt">
              <button 
                className="next-btn" 
                onClick={() => setCurrentStep(STEPS.VIDEO)}
              >
                Proceed to Video →
              </button>
            </div>
          </div>
        );
      }

      case STEPS.VIDEO:
        return (
          <div className="step-container">
            <VideoPlayer onVideoEnd={handleVideoEnd} />
            {videoCompleted && (
              <div className="next-step-prompt">
                <button 
                  className="next-btn" 
                  onClick={() => {
                    if (postTestQuestions.length === 0) {
                      const randomQuestions = getRandomQuestions(3);
                      setPostTestQuestions(randomQuestions);
                    }
                    setCurrentStep(STEPS.POST_TEST);
                  }}
                >
                  Proceed to Post-Test →
                </button>
              </div>
            )}
          </div>
        );

      case STEPS.POST_TEST:
        return (
          <div className="step-container">
            <Quiz
              questions={postTestQuestions}
              onSubmit={handlePostTestSubmit}
              quizType="post-test"
            />
          </div>
        );

      case STEPS.RESULTS: {
        const preTestCorrect = preTestQuestions.filter(q => preTestAnswers[q.id] === q.correctAnswer).length;
        const postTestCorrect = postTestQuestions.filter(q => postTestAnswers[q.id] === q.correctAnswer).length;
        return (
          <div className="results-container">
            <h2>Quiz Results</h2>
            <div className="results-grid">
              <div className="result-card">
                <h3>Pre-Test Score</h3>
                <div className="result-score">{preTestScore ?? 0}%</div>
                <p>
                  {preTestCorrect} / {preTestQuestions.length} correct
                </p>
              </div>
              <div className="result-card">
                <h3>Post-Test Score</h3>
                <div className="result-score">{postTestScore ?? 0}%</div>
                <p>
                  {postTestCorrect} / {postTestQuestions.length} correct
                </p>
              </div>
            </div>
            <div className="improvement">
              {postTestScore !== null && preTestScore !== null ? (
                postTestScore > preTestScore ? (
                  <p className="improvement-positive">
                    🎉 Great improvement! You scored {postTestScore - preTestScore}% higher in the post-test!
                  </p>
                ) : postTestScore < preTestScore ? (
                  <p className="improvement-negative">
                    Your score decreased by {preTestScore - postTestScore}%. Consider reviewing the material again.
                  </p>
                ) : (
                  <p className="improvement-neutral">
                    Your score remained the same. Keep practicing!
                  </p>
                )
              ) : (
                <p className="improvement-neutral">
                  Results are being calculated...
                </p>
              )}
            </div>
            <button className="reset-btn" onClick={handleReset}>
              Start Over
            </button>
          </div>
        );
      }

      default:
        return null;
    }
  };

  return (
    <div className="app">
      <header className="app-header">
        <h1>Learning Management System</h1>
        {username && (
          <div className="welcome-section">
            <div className="welcome-message">
              Welcome, <span className="welcome-user">{username}</span> 
              <span className="welcome-role">({isAdmin ? 'Admin' : 'User'})</span>
            </div>
            <button className="logout-btn" onClick={handleLogout}>
              Logout
            </button>
          </div>
        )}
        {currentStep !== STEPS.LOGIN && currentStep !== STEPS.ADMIN && (
          <div className="progress-indicator">
            <div className={`progress-step ${currentStep === STEPS.PRE_TEST ? 'active' : currentStep === STEPS.PRE_TEST_RESULTS || currentStep === STEPS.VIDEO || currentStep === STEPS.POST_TEST || currentStep === STEPS.RESULTS ? 'completed' : ''}`}>
              Pre-Test
            </div>
            <div className={`progress-step ${currentStep === STEPS.PRE_TEST_RESULTS ? 'active' : currentStep === STEPS.VIDEO || currentStep === STEPS.POST_TEST || currentStep === STEPS.RESULTS ? 'completed' : ''}`}>
              Results
            </div>
            <div className={`progress-step ${currentStep === STEPS.VIDEO ? 'active' : currentStep === STEPS.POST_TEST || currentStep === STEPS.RESULTS ? 'completed' : ''}`}>
              Video
            </div>
            <div className={`progress-step ${currentStep === STEPS.POST_TEST ? 'active' : currentStep === STEPS.RESULTS ? 'completed' : ''}`}>
              Post-Test
            </div>
            <div className={`progress-step ${currentStep === STEPS.RESULTS ? 'active' : ''}`}>
              Final Results
            </div>
          </div>
        )}
      </header>
      <main className="app-main">
        {renderCurrentStep()}
      </main>
    </div>
  );
}

export default App;

