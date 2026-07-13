import React, { useState, useEffect } from 'react';
import './QuestionForm.css';

const QuestionForm = ({ question, index, onUpdate, onRemove }) => {
  const [text, setText] = useState(question?.text || '');
  const [options, setOptions] = useState(
    question?.options
      ? [...question.options]
      : Array(4).fill('') // Start with 4 empty options
  );
  const [correctIndex, setCorrectIndex] = useState(
    question?.correctIndex !== undefined ? question.correctIndex : 0
  );

  const handleOptionChange = (optionIndex, event) => {
    const newOptions = [...options];
    newOptions[optionIndex] = event.target.value;
    setOptions(newOptions);
  };

  const handleCorrectChange = (event) => {
    setCorrectIndex(parseInt(event.target.value));
  };

  const handleAddOption = () => {
    setOptions([...options, '']);
  };

  const handleRemoveOption = (optionIndex) => {
    if (options.length <= 2) {
      alert('A question must have at least 2 options');
      return;
    }
    const newOptions = [...options];
    newOptions.splice(optionIndex, 1);
    setOptions(newOptions);
    // Adjust correctIndex if needed
    if (correctIndex >= newOptions.length) {
      setCorrectIndex(newOptions.length - 1);
    }
  };

  useEffect(() => {
    // Validate: at least one option filled and correct index set
    const hasValidOptions = options.some(opt => opt.trim() !== '');
    const isValid =
      text.trim() !== '' && hasValidOptions && correctIndex < options.length;
    if (isValid) {
      onUpdate({ text, options, correctIndex });
    } else {
      onUpdate(null); // Signal invalid
    }
  }, [text, options, correctIndex, onUpdate]);

  return (
    <div className="question-card">
      <div className="question-header">
        <h3>Question {index + 1}</h3>
        <button
          onClick={() => onRemove(index)}
          className="btn btn-sm btn-danger"
        >
          Remove
        </button>
      </div>
      <div className="form-group">
        <label className="form-label">Question</label>
        <input
          type="text"
          className="form-input"
          value={text}
          onChange={e => setText(e.target.value)}
          placeholder="Enter question text"
        />
      </div>
      <div className="options-list">
        {options.map((option, optIndex) => (
          <div key={optIndex} className="option-item">
            <input
              type="radio"
              name={`correct-${index}`}
              checked={correctIndex === optIndex}
              onChange={e => handleCorrectChange(e)}
              className="mr-2"
            />
            <input
              type="text"
              value={option}
              onChange={e => handleOptionChange(optIndex, e)}
              placeholder="Option text"
              className="form-input option-input"
            />
            <button
              type="button"
              onClick={() => handleRemoveOption(optIndex)}
              className="btn btn-sm btn-outline-danger ms-2"
            >
              Remove
            </button>
          </div>
        ))}
        <div className="mt-2">
          <button
            type="button"
            onClick={handleAddOption}
            className="btn btn-sm btn-outline-secondary"
          >
            Add Option
          </button>
        </div>
      </div>
    </div>
  );
};

export default QuestionForm;