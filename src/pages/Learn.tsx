import React, { useState } from 'react';
import { BookOpen, HelpCircle, Check, X } from 'lucide-react';
import { QuizQuestion } from '../types';

const Learn: React.FC = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [quizCompleted, setQuizCompleted] = useState(false);
  
  const quizQuestions: QuizQuestion[] = [
    {
      id: '1',
      question: 'How many pillars are there in Islam?',
      options: ['3', '4', '5', '6'],
      correctAnswer: 2,
      explanation: 'The five pillars of Islam are: Shahada (faith), Salah (prayer), Zakat (charity), Sawm (fasting), and Hajj (pilgrimage).',
      difficulty: 'easy',
      category: 'fiqh'
    },
    {
      id: '2',
      question: 'Which surah is known as the heart of the Quran?',
      options: ['Al-Fatiha', 'Yasin', 'Al-Ikhlas', 'Al-Baqarah'],
      correctAnswer: 1,
      explanation: 'Surah Yasin is often referred to as the heart of the Quran.',
      difficulty: 'medium',
      category: 'quran'
    },
    {
      id: '3',
      question: 'Who was the first Caliph after Prophet Muhammad (PBUH)?',
      options: ['Umar ibn Al-Khattab', 'Abu Bakr As-Siddiq', 'Uthman ibn Affan', 'Ali ibn Abi Talib'],
      correctAnswer: 1,
      explanation: 'Abu Bakr As-Siddiq was the first Caliph after Prophet Muhammad (PBUH).',
      difficulty: 'medium',
      category: 'history'
    },
    {
      id: '4',
      question: 'What is the Islamic term for charity?',
      options: ['Salah', 'Sawm', 'Zakat', 'Hajj'],
      correctAnswer: 2,
      explanation: 'Zakat is the Islamic term for obligatory charity, which is one of the five pillars of Islam.',
      difficulty: 'easy',
      category: 'fiqh'
    },
    {
      id: '5',
      question: 'Which prophet is known as "Khalilullah" (Friend of Allah)?',
      options: ['Prophet Muhammad (PBUH)', 'Prophet Ibrahim (AS)', 'Prophet Musa (AS)', 'Prophet Isa (AS)'],
      correctAnswer: 1,
      explanation: 'Prophet Ibrahim (Abraham) is known as "Khalilullah" which means the Friend of Allah.',
      difficulty: 'hard',
      category: 'history'
    }
  ];
  
  const handleOptionSelect = (optionIndex: number) => {
    if (showAnswer) return;
    
    setSelectedOption(optionIndex);
    setShowAnswer(true);
    
    if (optionIndex === quizQuestions[currentQuestion].correctAnswer) {
      setScore(score + 1);
    }
  };
  
  const handleNextQuestion = () => {
    if (currentQuestion < quizQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedOption(null);
      setShowAnswer(false);
    } else {
      setQuizCompleted(true);
    }
  };
  
  const resetQuiz = () => {
    setCurrentQuestion(0);
    setSelectedOption(null);
    setShowAnswer(false);
    setScore(0);
    setQuizCompleted(false);
  };
  
  const currentQuizQuestion = quizQuestions[currentQuestion];
  
  return (
    <div className="container mx-auto px-4 py-8 pt-16 md:pl-24 md:pr-8">
      <div className="mb-6">
        <h1 className="text-2xl md:text-3xl text-primary-800 mb-2">Learn & Play</h1>
        <p className="text-gray-600">Test your Islamic knowledge and learn through fun activities</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2">
          <div className="card p-6">
            {!quizCompleted ? (
              <>
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-medium">Islamic Knowledge Quiz</h2>
                  <span className="text-sm bg-primary-100 text-primary-800 px-2 py-1 rounded-full">
                    Question {currentQuestion + 1}/{quizQuestions.length}
                  </span>
                </div>
                
                <div className="mb-6">
                  <h3 className="text-lg font-medium mb-4">{currentQuizQuestion.question}</h3>
                  
                  <div className="space-y-3">
                    {currentQuizQuestion.options.map((option, index) => (
                      <button
                        key={index}
                        className={`w-full text-left p-3 rounded-lg border transition-all ${
                          selectedOption === index
                            ? index === currentQuizQuestion.correctAnswer
                              ? 'bg-green-100 border-green-300'
                              : 'bg-red-100 border-red-300'
                            : 'border-gray-200 hover:border-primary-300'
                        }`}
                        onClick={() => handleOptionSelect(index)}
                      >
                        <div className="flex items-center">
                          <span className="w-6 h-6 rounded-full bg-gray-100 flex items-center justify-center mr-2 text-sm">
                            {String.fromCharCode(65 + index)}
                          </span>
                          {option}
                          {showAnswer && index === selectedOption && (
                            index === currentQuizQuestion.correctAnswer 
                              ? <Check className="w-5 h-5 text-green-500 ml-auto" />
                              : <X className="w-5 h-5 text-red-500 ml-auto" />
                          )}
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
                
                {showAnswer && (
                  <div className="bg-primary-50 p-4 rounded-lg mb-4">
                    <h4 className="font-medium text-primary-800 mb-1">Explanation:</h4>
                    <p className="text-gray-700">{currentQuizQuestion.explanation}</p>
                  </div>
                )}
                
                <div className="flex justify-end">
                  <button
                    className="btn btn-primary"
                    onClick={handleNextQuestion}
                    disabled={!showAnswer}
                  >
                    {currentQuestion < quizQuestions.length - 1 ? 'Next Question' : 'Finish Quiz'}
                  </button>
                </div>
              </>
            ) : (
              <div className="text-center py-8">
                <h2 className="text-2xl font-medium mb-2">Quiz Completed!</h2>
                <p className="text-lg mb-4">
                  Your score: <span className="font-bold text-primary-600">{score}/{quizQuestions.length}</span>
                </p>
                <p className="mb-6 text-gray-600">
                  {score === quizQuestions.length 
                    ? 'MashaAllah! Perfect score!' 
                    : score >= quizQuestions.length / 2 
                      ? 'Good job! Keep learning to improve your knowledge.' 
                      : 'Keep studying and try again to improve your score.'}
                </p>
                <div className="flex justify-center">
                  <button className="btn btn-primary" onClick={resetQuiz}>
                    Take Quiz Again
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
        
        <div className="space-y-4">
          <div className="card p-4 bg-accent-50">
            <h3 className="font-medium text-accent-800 mb-2">Arabic Learning</h3>
            <p className="text-sm text-gray-600 mb-3">
              Learn Arabic letters and words through interactive exercises.
            </p>
            <button className="btn btn-accent w-full">
              Start Learning
            </button>
          </div>
          
          <div className="card p-4 bg-secondary-50">
            <h3 className="font-medium text-secondary-800 mb-2">Daily Hadith</h3>
            <p className="text-sm text-gray-700 italic mb-3">
              "The best of you are those who learn the Quran and teach it to others."
            </p>
            <p className="text-xs text-gray-500">
              - Prophet Muhammad (peace be upon him)
            </p>
          </div>
          
          <div className="card p-4">
            <h3 className="font-medium text-primary-800 mb-2">Learning Progress</h3>
            <div className="space-y-3">
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>Quran Knowledge</span>
                  <span>40%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-primary-500 h-2 rounded-full" style={{ width: '40%' }}></div>
                </div>
              </div>
              
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>Arabic Language</span>
                  <span>25%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-accent-500 h-2 rounded-full" style={{ width: '25%' }}></div>
                </div>
              </div>
              
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>Islamic History</span>
                  <span>60%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-secondary-500 h-2 rounded-full" style={{ width: '60%' }}></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Learn;