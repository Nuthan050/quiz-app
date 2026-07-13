import React, { useState, useEffect } from 'react';
import { useQuiz } from '../context/useQuiz';
import { useNavigate, useParams } from 'react-router-dom';
import QuestionForm from './QuestionForm';
import './QuizForm.css';

const QuizForm = () => {
  const { addQuiz, updateQuiz, getQuizById } = useQuiz();
  const navigate = useNavigate();
  const { id } = useParams();
  const quizId = id || null;

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [questions, setQuestions] = useState([
    { text: '', options: ['', '', '', ''], correctIndex: 0 }
  ]);
  const [isLoading, setIsLoading] = useState(false);

  // Load quiz if editing
  useEffect(() => {
    if (quizId) {
      const quiz = getQuizById(quizId);
      if (quiz) {
        setTitle(quiz.title);
        setDescription(quiz.description || '');
        setQuestions(quiz.questions || []);
      } else {
        // Quiz not found, go back to home
        navigate('/');
      }
    }
  }, [quizId, getQuizById, navigate]);

  const handleQuestionUpdate = (index, updatedQuestion) => {
    if (updatedQuestion === null) {
      // Invalid question, we can show an error but for now we'll just not update
      return;
    }
    const newQuestions = [...questions];
    newQuestions[index] = updatedQuestion;
    setQuestions(newQuestions);
  };

  const handleQuestionRemove = (index) => {
    const newQuestions = [...questions];
    newQuestions.splice(index, 1);
    setQuestions(newQuestions);
  };

  const handleAddQuestion = () => {
    setQuestions([...questions, { text: '', options: ['', '', '', ''], correctIndex: 0 }]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);

    // Validate
    if (!title.trim()) {
      alert('Please enter a title');
      setIsLoading(false);
      return;
    }

    // Validate questions
    const validQuestions = questions.every(q =>
      q.text.trim() !== '' &&
      q.options.some(opt => opt.trim() !== '') &&
      q.correctIndex < q.options.length
    );

    if (!validQuestions) {
      alert('Please fill in all questions and options correctly');
      setIsLoading(false);
      return;
    }

    const quizData = {
      title,
      description,
      questions
    };

    if (quizId) {
      updateQuiz({ ...quizData, id: quizId });
    } else {
      addQuiz(quizData);
    }

    setIsLoading(false);
    navigate('/');
  };

  return (
    <form onSubmit={handleSubmit} className="quiz-form">
      <h2>{quizId ? 'Edit Quiz' : 'Create Quiz'}</h2>
      <div className="form-group">
        <label className="form-label">Title</label>
        <input
          type="text"
          className="form-input"
          value={title}
          onChange={e => setTitle(e.target.value)}
          required
        />
      </div>
      <div className="form-group">
        <label className="form-label">Description</label>
        <textarea
          className="form-input"
          value={description}
          onChange={e => setDescription(e.target.value)}
          rows={4}
        />
      </div>
      <div className="questions-section">
        <h3>Questions</h3>
        <button
          type="button"
          onClick={handleAddQuestion}
          className="btn btn-sm btn-outline-secondary mb-3"
        >
          Add Question
        </button>
        {questions.map((q, idx) => (
          <QuestionForm
            key={idx}
            question={q}
            index={idx}
            onUpdate={(updatedQ) => handleQuestionUpdate(idx, updatedQ)}
            onRemove={() => handleQuestionRemove(idx)}
          />
        ))}
      </div>
      <div className="form-group">
        <button
          type="submit"
          className="btn btn-primary"
          disabled={isLoading}
        >
          {isLoading ? 'Saving...' : 'Save Quiz'}
        </button>
        <button
          type="button"
          onClick={() => navigate('/')}
          className="btn btn-secondary ms-2"
        >
          Cancel
        </button>
      </div>
    </form>
  );
};

export default QuizForm;