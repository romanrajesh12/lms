# Learning Management System - Quiz Application

A React-based quiz application with pre-test, video player, and post-test functionality.

## Features

### Core Requirements 
- **Quiz Module (Pre-Test & Post-Test)**
  - Pool of 12 dummy questions in JSON format
  - Randomly selects 3 questions from the pool for each quiz
  - Pre-Test appears first
  - Post-Test appears only after video completion
  - Immediate score display upon submission

- **Video Player**
  - Embedded video player with sample MP4
  - Custom controls (Play/Pause, Timer Display)
  - Programmatic detection of video completion
  - Post-Test unlocked only after video ends

- **State Management**
  - Smooth transitions: Login → Pre-Test → Video → Post-Test → Results
  - Progress indicator showing current step

### Bonus Features 
- **LocalStorage Persistence**
  - Saves user progress automatically
  - Restores state on page refresh
  - Returns user to the exact step they were on

- **Admin/User Toggle**
  - Login screen with User/Admin selection
  - Admin mode allows editing question text, options, and correct answers
  - Changes persist in localStorage

## Installation

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm run dev
```

3. Build for production:
```bash
npm run build
```

## Usage

### As a User
1. Select "User" on the login screen
2. Complete the Pre-Test (3 random questions)
3. Watch the video completely
4. Complete the Post-Test (3 random questions)
5. View your results and improvement

### As an Admin
1. Select "Admin" on the login screen
2. View all questions in the pool
3. Click "Edit Question" to modify any question
4. Update question text, options, or correct answer
5. Click "Save" to persist changes

## Technical Stack

- **Framework**: React.js 19.2.3
- **Build Tool**: Vite 7.3.0
- **Styling**: CSS (Custom)
- **State Management**: React Hooks + localStorage

## Project Structure

```
src/
├── App.jsx          # Main application component with state management
├── Quiz.jsx         # Pre-Test and Post-Test component
├── VideoPlayer.jsx  # Custom video player with controls
├── Login.jsx        # Login/Admin component
├── questions.js     # Question pool (12 questions)
├── App.css          # Main application styles
├── Quiz.css         # Quiz component styles
├── VideoPlayer.css  # Video player styles
└── Login.css        # Login component styles
```

## Features in Detail

### Question Randomization
- Each quiz randomly selects 3 questions from a pool of 12
- Pre-Test and Post-Test get different random questions
- Questions are stored in `src/questions.js`

### Video Player
- Uses a sample video from Google Cloud Storage
- Custom play/pause button
- Progress bar with seek functionality
- Timer display (current time / total duration)
- Automatically detects when video ends

### Persistence
- All progress is saved to localStorage
- On refresh, user returns to the exact step
- Pre-test answers and scores are preserved
- Video completion status is saved
- Post-test answers and scores are preserved
- Admin question edits are persisted

## Browser Support

- Chrome (recommended)
- Firefox
- Safari
- Edge

## Notes

- The video URL uses a sample video from Google Cloud Storage
- You can replace it with your own video URL in `src/VideoPlayer.jsx`
- Question pool can be edited in Admin mode or directly in `src/questions.js`

