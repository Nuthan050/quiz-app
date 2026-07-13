# QuizMaster

A modern, responsive quiz application built with React, similar to Quizlet or Brainscape.

## Features

- Create, edit, and delete quizzes
- Take quizzes with instant feedback
- Persistent storage using localStorage
- Responsive design for mobile and desktop
- Clean and intuitive user interface

## Tech Stack

- React 18
- React Router DOM v6
- LocalStorage for data persistence
- CSS3 for styling
- UUID for unique IDs

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm (v6 or higher)

### Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd quiz-app
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Open your browser and visit `http://localhost:5173`

## Project Structure

```
src/
├── assets/             # Static assets
├ components/          # Reusable components
│   ├── Header.jsx     # Application header
│   ├── QuizForm.jsx   # Form for creating/editing quizzes
│   ├── QuizItem.jsx   # Quiz item in the list
│   └── QuestionForm.jsx # Form for individual questions
├── context/           # React context for state management
│   └── QuizContext.jsx # Manages quizzes and localStorage
├── pages/             # Page components
│   ├── HomePage.jsx   # Home page showing quiz list
│   ├── CreateQuizPage.jsx # Page to create a new quiz
│   ├── EditQuizPage.jsx   # Page to edit an existing quiz
│   └── TakeQuizPage.jsx   # Page to take a quiz
├ App.jsx              # Main app component with routing
├ main.jsx             # Entry point
└ index.css            # Global styles
```

## Features in Detail

### Creating a Quiz
- Navigate to "Create Quiz" from the header or home page
- Enter a title and optional description
- Add questions with multiple options
- Mark the correct answer for each question
- Save the quiz to your collection

### Taking a Quiz
- Select a quiz from the home page
- Answer each question sequentially
- Get immediate feedback after submitting
- View your final score at the end

### Managing Quizzes
- Edit existing quizzes from the quiz list
- Delete quizzes you no longer need
- All data is saved in your browser's localStorage

## Customization

### Styling
- Modify `src/index.css` for global styles
- Component-specific styles are in their respective CSS files

### Data Persistence
- The application uses localStorage to store quizzes
- Data persists between browser sessions
- To clear all data, clear your browser's localStorage for this site

## Building for Production

To create a production build:

```bash
npm run build
```

The built files will be in the `dist` directory.

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Open a pull request

## License

This project is licensed under the MIT License.

```
