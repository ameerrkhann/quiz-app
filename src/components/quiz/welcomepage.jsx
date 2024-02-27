import React, { useEffect, useState } from 'react';
import './WelcomePage.css';

const glyphs = [
    'ア', 'イ', 'ウ', 'エ', 'オ',
    'カ', 'キ', 'ク', 'ケ', 'コ',
    'サ', 'シ', 'ス', 'セ', 'ソ',
    'タ', 'チ', 'ツ', 'テ', 'ト',
    'ナ', 'ニ', 'ヌ', 'ネ', 'ノ',
    'ハ', 'ヒ', 'フ', 'ヘ', 'ホ',
    'マ', 'ミ', 'ム', 'メ', 'モ',
  ];

  const WelcomePage = ({ onStartQuiz }) => {
    const finalText = "Welcome to my Quiz App";
    const [displayedText, setDisplayedText] = useState(
      new Array(finalText.length).fill('') // Initialize with empty strings
    );
  
    useEffect(() => {
      let glyphTimeouts = [];
      let decodeTimeouts = [];
  
      // Cycle through all glyphs once
      finalText.split('').forEach((_, index) => {
        glyphTimeouts[index] = setTimeout(() => {
          setDisplayedText(currentDisplay => {
            const newText = [...currentDisplay];
            newText[index] = glyphs[Math.floor(Math.random() * glyphs.length)];
            return newText;
          });
        }, 50 * index); // Fast cycle through glyphs
      });
  
      // Begin decoding after one full cycle
      const startDecodingDelay = 50 * finalText.length;
      finalText.split('').forEach((char, index) => {
        decodeTimeouts[index] = setTimeout(() => {
          setDisplayedText(currentDisplay => {
            const newText = [...currentDisplay];
            newText[index] = char;
            return newText;
          });
        }, startDecodingDelay + 50 * index); // Decode slowly
      });
  
      // Cleanup timeouts on unmount
      return () => {
        glyphTimeouts.forEach(clearTimeout);
        decodeTimeouts.forEach(clearTimeout);
      };
    }, [finalText]);
  
    return (
      <div className="welcome-container">
        <h1>{displayedText}</h1>
        <button onClick={onStartQuiz}><span>Get Started</span></button>
        <div className="footer">Created by: Ameer Khan</div>
      </div>
    );
  };
  
  export default WelcomePage;
  