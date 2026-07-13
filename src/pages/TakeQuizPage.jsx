import React, { useState, useEffect } from 'react';
import { useQuiz } from '../context/useQuiz';
import { useParams, useNavigate } from 'react-router-dom';
import './TakeQuizPage.css';

const TakeQuizPage = () => {
  const { quizId } = useParams();
  const { getQuizById } = useQuiz();
  const navigate = useNavigate();

  const [quiz, setQuiz] = useState(null);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [score, setScore] = useState(0);

  useEffect(() => {
    const quizData = getQuizById(quizId);
    if (quizData) {
      setQuiz(quizData);
    } else {
      // Quiz not found, redirect to home
      navigate('/');
    }
  }, [quizId, getQuizById, navigate]);

  if (!quiz) {
    return <div>Loading...</div>;
  }

  const handleAnswerChange = (questionIndex, selectedOptionIndex) => {
    setAnswers(prev => ({
      ...prev,
      [questionIndex]: selectedOptionIndex
    }));
  };

  const handleNext = () => {
    if (currentQuestion < quiz.questions.length - 1) {
      setCurrentQuestion(prev => prev + 1);
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(prev => prev - 1);
    }
  };

  const handleSubmit = () => {
    // Calculate score
    let correct = 0;
    quiz.questions.forEach((q, index) => {
      if (answers[index] === q.correctIndex) {
        correct++;
      }
    });
    setScore(correct);
    setIsSubmitted(true);
  };

  const currentQuestionObj = quiz.questions[currentQuestion];

  return (
    <div className="quiz-container">
      <header className="quiz-header">
        <h1>{quiz.title}</h1>
        {quiz.description && <p>{quiz.description}</p>}
        <div className="quiz-progress">
          Question {currentQuestion + 1} of {quiz.questions.length}
        </div>
      </header>

      {!isSubmitted ? (
        <>
          <div className="question-card">
            <div className="question-text">{currentQuestionObj.text}</div>
            <ul className="options-list">
              {currentQuestionObj.options.map((option, index) => (
                <li
                  key={index}
                  className={`option-item ${
                    answers[currentQuestion] === index ? 'selected' : ''
                  }`}
                  onClick={() => handleAnswerChange(currentQuestion, index)}
                >
                  {option}
                </li>
              ))}
            </ul>
          </div>
          <div className="quiz-nav">
            {currentQuestion > 0 && (
              <button onClick={handlePrevious} className="btn btn-secondary">
                Previous
              </button>
            )}
            {currentQuestion < quiz.questions.length - 1 && (
              <button onClick={handleNext} className="btn btn-primary">
                Next
              </button>
            )}
            {currentQuestion === quiz.questions.length - 1 && (
              <button onClick={handleSubmit} className="btn btn-primary">
                Submit Quiz
              </button>
            )}
          </div>
        </>
      ) : (
        <div className="score-card">
          <h2>Quiz Complete!</h2>
          <p>You scored {score} out of {quiz.questions.length}</p>
          {score === quiz.questions.length && (
            <p className="perfect-score">Perfect score! 🎉</p>
          )}
          <div>
            <button onClick={() => navigate(`/`) } className="btn btn-secondary">
              Go to Home
            </button>
            <button
              onClick={() => navigate(`/edit/${quizId}`)}
              className="btn btn-outline-secondary ms-2"
            >
              Review Quiz
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default TakeQuizPage;