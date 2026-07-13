import React from 'react';
import { Link } from 'react-router-dom';
import { useQuiz } from '../context/useQuiz';
import './QuizItem.css';

const QuizItem = ({ quiz }) => {
  const { deleteQuiz } = useQuiz();

  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this quiz?')) {
      deleteQuiz(quiz.id);
    }
  };

  return (
    <div className="quiz-card">
      <h3>{quiz.title}</h3>
      {quiz.description && <p>{quiz.description}</p>}
      <div className="quiz-meta">
        <span>{quiz.questions.length} questions</span>
        <span>
          <Link to={`/edit/${quiz.id}`} className="btn btn-sm btn-secondary">
            Edit
          </Link>
          <Link
            to={`/take/${quiz.id}`}
            className="btn btn-sm btn-primary"
          >
            Take Quiz
          </Link>
          <button
            onClick={handleDelete}
            className="btn btn-sm btn-danger"
          >
            Delete
          </button>
        </span>
      </div>
    </div>
  );
};

export default QuizItem;