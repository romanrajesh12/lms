import { useState, useEffect } from 'react';
import './Login.css';

const Login = ({ onLogin, isAdmin, questionsPool, onUpdateQuestions, initialUsername = '' }) => {
  const [userType, setUserType] = useState(isAdmin ? 'admin' : 'user');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [editingQuestion, setEditingQuestion] = useState(null);
  const [editForm, setEditForm] = useState({
    question: '',
    options: ['', '', '', ''],
    correctAnswer: 0
  });
  const [username, setUsername] = useState(initialUsername);
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  // Reset login state when component mounts or isAdmin prop changes
  useEffect(() => {
    setIsLoggedIn(false);
    setUserType(isAdmin ? 'admin' : 'user');
    setUsername(initialUsername);
    setPassword('');
    setError('');
    setEditingQuestion(null);
    
    // If user is already admin and has username, show admin panel
    if (isAdmin && initialUsername) {
      setIsLoggedIn(true);
    }
  }, [isAdmin, initialUsername]);

  const handleUserTypeChange = (type) => {
    setUserType(type);
    setEditingQuestion(null);
    setError('');
    setIsLoggedIn(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!username.trim() || !password.trim()) {
      setError('Username and password are required.');
      return;
    }

    if (userType === 'admin') {
      if (username.trim().toLowerCase() !== 'admin' || password !== 'admin123') {
        setError('Invalid admin credentials (hint: admin / admin123).');
        return;
      }
    }

    setError('');
    setIsLoggedIn(true);
    if (onLogin) {
      onLogin({ isAdmin: userType === 'admin', username: username.trim() });
    }
    setPassword('');
  };

  const handleEditQuestion = (question) => {
    setEditingQuestion(question.id);
    setEditForm({
      question: question.question,
      options: [...question.options],
      correctAnswer: question.correctAnswer
    });
  };

  const handleSaveQuestion = () => {
    if (!editingQuestion) return;

    const updatedQuestion = {
      id: editingQuestion,
      question: editForm.question,
      options: editForm.options,
      correctAnswer: parseInt(editForm.correctAnswer)
    };

    if (onUpdateQuestions) {
      onUpdateQuestions(updatedQuestion);
    }

    setEditingQuestion(null);
  };

  const handleCancelEdit = () => {
    setEditingQuestion(null);
  };

  return (
    <div className="login-container">
      <div className="login-card">
        {!(userType === 'admin' && isLoggedIn) ? (
          <>
            <h2>Welcome to Quiz Application</h2>
            <div className="toggle-row">
              <span className={`toggle-label ${userType === 'user' ? 'active' : ''}`}>User</span>
              <label className="switch">
                <input
                  type="checkbox"
                  checked={userType === 'admin'}
                  onChange={(e) => handleUserTypeChange(e.target.checked ? 'admin' : 'user')}
                />
                <span className="slider" />
              </label>
              <span className={`toggle-label ${userType === 'admin' ? 'active' : ''}`}>Admin</span>
            </div>

            <form className="auth-form" onSubmit={handleSubmit}>
              <div className="input-row">
                <label>Username</label>
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder={userType === 'admin' ? 'admin' : 'Enter username'}
                  autoComplete="username"
                />
              </div>
              <div className="input-row">
                <label>Password</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder={userType === 'admin' ? 'admin123' : 'Enter password'}
                  autoComplete={userType === 'admin' ? 'current-password' : 'new-password'}
                />
              </div>
              {error && <div className="auth-error">{error}</div>}
              <button type="submit" className="auth-submit">
                {userType === 'admin' ? 'Login as Admin' : 'Login as User'}
              </button>
              <p className="auth-hint">
                {userType === 'admin' ? 'Hint: admin / admin123' : 'Any username & password works for User'}
              </p>
            </form>

            {userType === 'user' && (
              <div className="user-welcome">
                <p>You are logged in as a User.</p>
                <p>The Pre-Test will start automatically.</p>
              </div>
            )}
          </>
        ) : (
          <>
            <h2>Question Management</h2>
            <p className="login-subtitle">Welcome back, {username}! Manage your quiz questions below.</p>
            <div className="questions-list-admin">
              {questionsPool.map((q) => (
                <div key={q.id} className="question-item-admin">
                  {editingQuestion === q.id ? (
                    <div className="edit-form">
                      <input
                        type="text"
                        className="edit-question-input"
                        value={editForm.question}
                        onChange={(e) => setEditForm({ ...editForm, question: e.target.value })}
                        placeholder="Question text"
                      />
                      {editForm.options.map((option, idx) => (
                        <div key={idx} className="edit-option-row">
                          <input
                            type="radio"
                            name="correctAnswer"
                            checked={editForm.correctAnswer === idx}
                            onChange={() => setEditForm({ ...editForm, correctAnswer: idx })}
                          />
                          <input
                            type="text"
                            className="edit-option-input"
                            value={option}
                            onChange={(e) => {
                              const newOptions = [...editForm.options];
                              newOptions[idx] = e.target.value;
                              setEditForm({ ...editForm, options: newOptions });
                            }}
                            placeholder={`Option ${idx + 1}`}
                          />
                        </div>
                      ))}
                      <div className="edit-actions">
                        <button className="save-btn" onClick={handleSaveQuestion}>
                          Save
                        </button>
                        <button className="cancel-btn" onClick={handleCancelEdit}>
                          Cancel
                        </button>
                      </div>
                    </div>
                  ) : (
                    <>
                      <div className="question-text-admin">
                        <strong>Q{q.id}:</strong> {q.question}
                      </div>
                      <div className="options-list-admin">
                        {q.options.map((opt, idx) => (
                          <div
                            key={idx}
                            className={`option-item-admin ${idx === q.correctAnswer ? 'correct' : ''}`}
                          >
                            {idx === q.correctAnswer && '✓ '}
                            {opt}
                          </div>
                        ))}
                      </div>
                      <button
                        className="edit-btn"
                        onClick={() => handleEditQuestion(q)}
                      >
                        Edit Question
                      </button>
                    </>
                  )}
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Login;

