import React from 'react';
import { useQuiz } from '../context/useQuiz';
import QuizItem from '../components/QuizItem';
import './HomePage.css';

const HomePage = () => {
  const { quizzes } = useQuiz();

  return (
    <div>
      <h1 className="mb-4">My Quizzes</h1>
      {quizzes.length === 0 ? (
        <p className="text-center text-muted">
          You haven't created any quizzes yet. <a href="/create" className="link-primary">Create your first quiz</a>!
        </p>
      ) : (
        <div className="quiz-grid">
          {quizzes.map(quiz => (
            <QuizItem key={quiz.id} quiz={quiz} />
          ))}
        </div>
      )}
    </div>
  );
};

export default HomePage;