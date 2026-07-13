import React, { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { QuizContext } from './QuizContext';

export const QuizProvider = ({ children }) => {
  const [quizzes, setQuizzes] = useState(() => {
    const saved = localStorage.getItem('quizzes');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('quizzes', JSON.stringify(quizzes));
  }, [quizzes]);

  const addQuiz = (quiz) => {
    setQuizzes(prev => [...prev, { ...quiz, id: uuidv4() }]);
  };

  const updateQuiz = (updatedQuiz) => {
    setQuizzes(prev =>
      prev.map(quiz => (quiz.id === updatedQuiz.id ? updatedQuiz : quiz))
    );
  };

  const deleteQuiz = (id) => {
    setQuizzes(prev => prev.filter(quiz => quiz.id !== id));
  };

  const getQuizById = (id) => {
    return quizzes.find(quiz => quiz.id === id);
  };

  return (
    <QuizContext.Provider
      value={{
        quizzes,
        addQuiz,
        updateQuiz,
        deleteQuiz,
        getQuizById,
      }}
    >
      {children}
    </QuizContext.Provider>
  );
};