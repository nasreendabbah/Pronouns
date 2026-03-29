import React, { useState, useEffect } from 'react';
import { Trophy, RotateCcw, Check, X, Star } from 'lucide-react';

// רשימת המילים למשחק
const allWords = [
  { id: 1, word: 'יֶלֶד', emoji: '👦', type: 'זֶה' },
  { id: 2, word: 'סֵפֶר', emoji: '📖', type: 'זֶה' },
  { id: 3, word: 'כֶּלֶב', emoji: '🐶', type: 'זֶה' },
  { id: 4, word: 'עִפָּרוֹן', emoji: '✏️', type: 'זֶה' },
  { id: 5, word: 'תַּפּוּחַ', emoji: '🍎', type: 'זֶה' },
  { id: 6, word: 'בַּיִת', emoji: '🏠', type: 'זֶה' },
  { id: 7, word: 'יַלְדָּה', emoji: '👧', type: 'זֹאת' },
  { id: 8, word: 'מוֹרָה', emoji: '👩‍🏫', type: 'זֹאת' },
  { id: 9, word: 'מְכוֹנִית', emoji: '🚗', type: 'זֹאת' },
  { id: 10, word: 'מַלְכָּה', emoji: '👑', type: 'זֹאת' },
  { id: 11, word: 'חָתוּלָה', emoji: '🐱', type: 'זֹאת' },
  { id: 12, word: 'מַחְבֶּרֶת', emoji: '📓', type: 'זֹאת' },
  { id: 13, word: 'לוּחַ', emoji: '📋', type: 'זֶה' },
  { id: 14, word: 'סָבְתָא', emoji: '👵', type: 'זֹאת' },
  { id: 15, word: 'נֶכְדָּה', emoji: '👱‍♀️', type: 'זֹאת' },
  { id: 16, word: 'עֵץ', emoji: '🌳', type: 'זֶה' },
  { id: 17, word: 'אָחוֹת', emoji: '👩', type: 'זֹאת' },
];

// פונקציה לערבוב המילים (Shuffle)
const shuffleArray = (array) => {
  return [...array].sort(() => Math.random() - 0.5);
};

export default function App() {
  const [gameWords, setGameWords] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [feedback, setFeedback] = useState(null); // 'correct' | 'wrong' | null
  const [gameOver, setGameOver] = useState(false);

  // התחלת משחק חדש
  const startGame = () => {
    setGameWords(shuffleArray(allWords).slice(0, 10)); // בוחרים 10 מילים אקראיות לכל משחק
    setCurrentIndex(0);
    setScore(0);
    setGameOver(false);
    setFeedback(null);
  };

  useEffect(() => {
    startGame();
  }, []);

  const handleGuess = (guessType) => {
    if (feedback !== null) return; // מונע לחיצה כפולה בזמן אנימציה

    const currentWord = gameWords[currentIndex];
    
    if (guessType === currentWord.type) {
      // תשובה נכונה
      setFeedback('correct');
      setScore(prev => prev + 10);
      
      setTimeout(() => {
        if (currentIndex < gameWords.length - 1) {
          setCurrentIndex(prev => prev + 1);
          setFeedback(null);
        } else {
          setGameOver(true);
        }
      }, 1000);
    } else {
      // תשובה שגויה
      setFeedback('wrong');
      
      setTimeout(() => {
        setFeedback(null);
      }, 1000);
    }
  };

  // מסך סיום משחק
  if (gameOver) {
    return (
      <div dir="rtl" className="min-h-screen bg-gradient-to-br from-yellow-50 to-orange-100 flex flex-col items-center justify-center p-4 font-sans">
        <div className="bg-white rounded-3xl p-10 text-center shadow-2xl max-w-md w-full animate-bounce-short">
          <Trophy size={80} className="mx-auto text-yellow-500 mb-6" />
          <h1 className="text-5xl font-black text-gray-800 mb-4">כָּל הַכָּבוֹד!</h1>
          <p className="text-2xl text-gray-600 mb-8">
            סיימת את המשחק!<br/>
            הניקוד שלך: <span className="font-bold text-green-500">{score}</span> נקודות
          </p>
          <button 
            onClick={startGame}
            className="flex items-center justify-center gap-2 w-full py-4 bg-gradient-to-r from-purple-500 to-indigo-500 text-white rounded-2xl text-2xl font-bold hover:from-purple-600 hover:to-indigo-600 transition-all shadow-lg hover:shadow-xl"
          >
            <RotateCcw size={28} />
            שַׂחֵק שׁוּב
          </button>
        </div>
      </div>
    );
  }

  const currentWord = gameWords[currentIndex];

  if (!currentWord) return null;

  return (
    <div dir="rtl" className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-50 flex flex-col items-center py-8 px-4 font-sans overflow-hidden">
      
      {/* סרגל עליון: התקדמות וניקוד */}
      <div className="w-full max-w-3xl flex justify-between items-center mb-8 bg-white p-4 rounded-2xl shadow-sm">
        <div className="flex items-center gap-2 text-xl font-bold text-gray-700">
          <Star className="text-yellow-400 fill-yellow-400" size={28} />
          <span>ניקוד: {score}</span>
        </div>
        <div className="text-lg font-bold text-gray-500">
          מילה {currentIndex + 1} מתוך {gameWords.length}
        </div>
      </div>

      <h2 className="text-3xl font-black text-gray-800 mb-8 text-center">
        הַתְאִימוּ אֶת הַמִּילָה לַתֵּיבָה הַנְּכוֹנָה!
      </h2>

      {/* אזור המשחק המרכזי */}
      <div className="w-full max-w-4xl flex flex-col md:flex-row items-center justify-center gap-8 relative">
        
        {/* כפתור זֶה (זכר) */}
        <button 
          onClick={() => handleGuess('זֶה')}
          className="w-full md:w-1/3 bg-blue-100 hover:bg-blue-200 border-4 border-blue-400 rounded-3xl p-8 flex flex-col items-center justify-center transition-all shadow-lg hover:shadow-xl hover:-translate-y-1 active:scale-95 group"
        >
          <div className="text-5xl font-black text-blue-700 mb-2">זֶה</div>
          <div className="text-xl font-bold text-blue-500 bg-white px-4 py-1 rounded-full group-hover:bg-blue-50">זָכָר 👦</div>
        </button>

        {/* הכרטיסייה המרכזית עם המילה */}
        <div className={`w-full md:w-1/3 z-10 bg-white border-4 border-gray-200 rounded-[3rem] p-8 flex flex-col items-center justify-center min-h-[300px] shadow-2xl transition-all duration-300 transform
          ${feedback === 'correct' ? 'scale-110 border-green-400 shadow-green-200' : ''}
          ${feedback === 'wrong' ? 'animate-shake border-red-400 shadow-red-200' : ''}
        `}>
          
          {feedback === 'correct' && (
             <div className="absolute inset-0 bg-green-500/10 rounded-[2.5rem] flex items-center justify-center z-20">
                <Check size={100} className="text-green-500 opacity-80" />
             </div>
          )}
          
          {feedback === 'wrong' && (
             <div className="absolute inset-0 bg-red-500/10 rounded-[2.5rem] flex items-center justify-center z-20">
                <X size={100} className="text-red-500 opacity-80" />
             </div>
          )}

          <div className="text-[6rem] leading-none mb-4 drop-shadow-md select-none transition-transform duration-300 hover:scale-110">
            {currentWord.emoji}
          </div>
          <div className="text-5xl font-black text-gray-800 text-center" style={{ fontFamily: 'Assistant, sans-serif' }}>
            {currentWord.word}
          </div>
        </div>

        {/* כפתור זֹאת (נקבה) */}
        <button 
          onClick={() => handleGuess('זֹאת')}
          className="w-full md:w-1/3 bg-pink-100 hover:bg-pink-200 border-4 border-pink-400 rounded-3xl p-8 flex flex-col items-center justify-center transition-all shadow-lg hover:shadow-xl hover:-translate-y-1 active:scale-95 group"
        >
          <div className="text-5xl font-black text-pink-700 mb-2">זֹאת</div>
          <div className="text-xl font-bold text-pink-500 bg-white px-4 py-1 rounded-full group-hover:bg-pink-50">נְקֵבָה 👧</div>
        </button>

      </div>

      {/* אזור הדרכה (קבוע) */}
      <div className="mt-12 text-center text-gray-500 text-lg font-bold bg-white/50 px-6 py-3 rounded-full">
        לחצו על התיבה הכחולה לזכר, ועל התיבה הורודה לנקבה.
      </div>

      {/* הוספת אנימציית רעידה (Shake) ל-Tailwind במקרה של טעות */}
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-10px); }
          50% { transform: translateX(10px); }
          75% { transform: translateX(-10px); }
        }
        .animate-shake {
          animation: shake 0.4s ease-in-out;
        }
      `}} />
    </div>
  );
}
