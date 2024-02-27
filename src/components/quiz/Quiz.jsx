import React, { useRef, useState } from 'react';
import './Quiz.css';
import { data } from '../../assets/data';
import WelcomePage from './welcomepage';
import { motion, AnimatePresence } from 'framer-motion';

const Quiz = () => {
  let [index, setIndex] = useState(0);
  let [question, setQuestion] = useState(data[index]);
  let [lock, setLock] = useState(false);
  let [score, setScore] = useState(0);
  let [result, setResult] = useState(false);
  let [showWelcome, setShowWelcome] = useState(true);

  let Option1 = useRef(null);
  let Option2 = useRef(null);
  let Option3 = useRef(null);
  let Option4 = useRef(null);

  let option_array = [Option1, Option2, Option3, Option4];

  const containerVariants = {
    hidden: { opacity: 0, x: '-100vw' },
    visible: { opacity: 1, x: 0, transition: { type: 'spring', delay: 0.5 } },
    exit: { opacity: 0, x: '100vw', transition: { ease: 'easeInOut' } }
  };

  const listItemVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { when: "beforeChildren", staggerChildren: 0.3 } },
  };

  const checkAns = (e, ans) => {
    if (lock === false) {
      if (question.ans === ans) {
        e.target.classList.add("correct");
        setLock(true);
        setScore(prev => prev + 1);
      }
      else {
        e.target.classList.add("wrong");
        setLock(true);
        option_array[question.ans - 1].current.classList.add("correct");
      }
    }
  };

  const startQuiz = () => {
    setShowWelcome(false);
  };

  if (showWelcome) {
    return <WelcomePage onStartQuiz={startQuiz} />;
  }

  const next = () => {
    if (lock === true) {
      if (index === data.length - 1) {
        setResult(true);
      } else {
        setIndex(prevIndex => {
          const newIndex = prevIndex + 1;
          setQuestion(data[newIndex]);
          return newIndex;
        });
        setLock(false);
        option_array.forEach((optionRef) => {
          optionRef.current.classList.remove("wrong");
          optionRef.current.classList.remove("correct");
        });
      }
    }
  };

  const reset = () => {
    setIndex(0);
    setQuestion(data[0]);
    setScore(0);
    setLock(false);
    setResult(false);
    option_array.forEach((optionRef) => {
      optionRef.current.classList.remove("wrong");
      optionRef.current.classList.remove("correct");
    });
  };

  return (
    <AnimatePresence>
      <motion.div
        className='container'
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
      >
        <h1>Ameer's Quiz App</h1>
        <hr />
        {!result && (
          <>
            <motion.h2 key={index}>{index + 1}. {question.question}</motion.h2>
            <motion.ul variants={listItemVariants}>
              <motion.li ref={Option1} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={(e) => checkAns(e, 1)}>
                {question.option1}
              </motion.li>
              <motion.li ref={Option2} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={(e) => checkAns(e, 2)}>
                {question.option2}
              </motion.li>
              <motion.li ref={Option3} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={(e) => checkAns(e, 3)}>
                {question.option3}
              </motion.li>
              <motion.li ref={Option4} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={(e) => checkAns(e, 4)}>
                {question.option4}
              </motion.li>
            </motion.ul>
            <button onClick={next}>Next</button>
            <div className="index">{index + 1} of {data.length} questions</div>
          </>
        )}
        {result && (
          <motion.div
            key="result"
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            <h2>You scored {score} out of {data.length}</h2>
            <button onClick={reset}>Reset Quiz</button>
          </motion.div>
        )}
      </motion.div>
    </AnimatePresence>
  );
};

export default Quiz;
