'use client';

import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';

const QuizPage = () => {
  const { id } = useParams() || '';
  const [quizData, setQuizData] = useState(null);
  const [answers, setAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState(0);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchQuiz = async () => {
      if (!id) return;
      setLoading(true);
      try {
        const response = await fetch(`/api/quiz/${id}`);
        if (!response.ok) throw new Error(`Failed to fetch quiz: ${response.status}`);
        const data = await response.json();
        setQuizData(data);
      } catch (error) {
        console.error('Failed to fetch quiz:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchQuiz();
  }, [id]);

  const handleSelect = (index, choice) => {
    if (submitted) return;
    setAnswers((prev) => ({ ...prev, [index]: choice }));
  };

  const handleSubmit = () => {
    let correct = 0;
    quizData.mcqs.forEach((q, i) => {
      if (answers[i] === q.answer) correct += 1;
    });
    setScore(correct);
    setSubmitted(true);
  };

  if (loading) return <div className="text-center text-xl font-semibold mt-10">Loading...</div>;

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6 text-center">Quiz</h1>
      {quizData?.mcqs?.map((question, index) => (
        <div key={index} className="mb-8 p-4 border rounded-lg shadow-sm bg-white">
          <h2 className="text-lg font-semibold mb-2">
            {index + 1}. {question.statement}
          </h2>
          <div className="space-y-2">
            {question.choices.map((choice, cIndex) => {
              const isSelected = answers[index] === String.fromCharCode(97 + cIndex);
              const isCorrect = submitted && question.answer === String.fromCharCode(97 + cIndex);
              const isWrong = submitted && isSelected && !isCorrect;

              return (
                <button
                  key={cIndex}
                  className={`block w-full text-left px-4 py-2 border rounded-md 
                    ${isSelected ? 'border-blue-500' : 'border-gray-300'}
                    ${isCorrect ? 'bg-green-100 border-green-500' : ''}
                    ${isWrong ? 'bg-red-100 border-red-500' : ''}
                    hover:bg-blue-50`}
                  onClick={() => handleSelect(index, String.fromCharCode(97 + cIndex))}
                  disabled={submitted}
                >
                  <span className="font-medium mr-2">
                    {String.fromCharCode(97 + cIndex)}.
                  </span>
                  {choice}
                </button>
              );
            })}
          </div>

          {submitted && (
            <p className={`mt-2 font-medium ${answers[index] === question.answer ? 'text-green-600' : 'text-red-600'}`}>
              {answers[index] === question.answer
                ? 'Correct!'
                : `Wrong! Correct answer is "${question.answer}".`}
            </p>
          )}
        </div>
      ))}

      {!submitted ? (
        <div className="text-center">
          <button
            onClick={handleSubmit}
            className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition"
          >
            Submit Quiz
          </button>
        </div>
      ) : (
        <div className="text-center mt-6">
          <h2 className="text-2xl font-bold text-green-700">Your Score: {score} / {quizData?.mcqs?.length}</h2>
        </div>
      )}
    </div>
  );
};

export default QuizPage;
