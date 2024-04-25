// QuizApp.js

import React, { useState, useEffect } from 'react';
import { quizzes } from '../data/quiz'; // Assuming you have a separate file with quiz data

const QuizApp = () => {
  const [selectedQuiz, setSelectedQuiz] = useState(null);
  const [quizStarted, setQuizStarted] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(quizzes[0].timeSeconds);
  const [showWrongAnswer, setShowWrongAnswer] = useState(false);
  const [answerSelected, setAnswerSelected] = useState(false);

  useEffect(() => {
    let timer;
    if (quizStarted && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft((prevTime) => prevTime - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      // Quiz completed
      setQuizStarted(false);
    }
    return () => clearInterval(timer);
  }, [quizStarted, timeLeft]);

  const startQuiz = () => {
    setQuizStarted(true);
    setTimeLeft(quizzes[0].timeSeconds);
    setCurrentQuestionIndex(0);
    setScore(0);
  };

  const handleAnswer = (selectedAnswer) => {
    if (!answerSelected) {
      const currentQuestion = quizzes[0].data[currentQuestionIndex];
      if (selectedAnswer === currentQuestion.answer) {
        setScore(score + 1);
        setShowWrongAnswer(false); // Reset wrong answer indication
      } else {
        setShowWrongAnswer(true);
      }
      setAnswerSelected(true);

      // Delay moving to the next question
      setTimeout(() => {
        setAnswerSelected(false);
        setShowWrongAnswer(false);
        if (currentQuestionIndex < quizzes[0].data.length - 1) {
          setCurrentQuestionIndex(currentQuestionIndex + 1);
        } else {
          // Quiz completed
          setQuizStarted(false);
        }
      }, 500); // Adjust the duration as needed
    }
  };

  const renderQuiz = () => {
    const currentQuestion = quizzes[0].data[currentQuestionIndex];
    return (
      <div>
        <h2 className="text-xl font-semibold mb-4">{currentQuestion.question}</h2>
        <div className="space-y-2 flex flex-col gap-2 max-w-md">
          {currentQuestion.options.map((option, index) => (
            <button
              key={index}
              onClick={() => handleAnswer(option)}
              className={`${
                answerSelected && option === currentQuestion.answer
                  ? 'bg-green-500'
                  : answerSelected
                  ? 'bg-red-500'
                  : 'bg-blue-500'
              } text-white px-4 py-2 rounded-md`}
              disabled={answerSelected}
            >
              {option}
            </button>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className='w-full p-4'>
      <h1 className='font-semibold text-xl'>Select a Quiz</h1>
      <div className='p-4 flex gap-4 items-center'>
      <select className='p-2 outline outline-1 focus:outline-blue-500' onChange={(e) => setSelectedQuiz(e.target.value)}>
        {quizzes.map((quiz, index) => (
          <option key={index} value={quiz.title}>
            {quiz.title}
          </option>
        ))}
      </select>
      <button onClick={startQuiz} className="bg-blue-500 text-white px-4 py-2 rounded-md">
        Start Quiz
      </button>
      </div>
      {quizStarted ? (
        <div className='w-full p-6 border border-1 border-gray-900 rounded'>
        <div className='flex items-center justify-start gap-6 flex-row-reverse '>
        <p>Time left:<span className='font-semibold text-blue-600 text-lg'> {timeLeft}</span>  seconds</p>
        <span className='h-full w-1 bg-gray-800'>.</span>
        <p>Score: <span className='font-semibold text-emerald-600 text-lg'> {score}</span> </p>
        </div>
        <div>
        {renderQuiz()}
        </div>
        </div>
      ) : (
        <p>Select a quiz and click "Start Quiz" to begin.</p>
      )}
      
    </div>
  );
};

export default QuizApp;
