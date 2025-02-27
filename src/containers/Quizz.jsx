import '../assets/styles/Quizz.css';
import '../assets/styles/Leaderboard.css';
import Navbar from "../components/common/Navbar";
import Button from '../components/common/Button';
import { useState, useEffect } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import LeaderboardPage from '../pages/LeaderboardPage';

function Quizz() {
    const localQuizzQuestion = JSON.parse(localStorage.getItem("questions")) || [];
    const localUniqueId = JSON.parse(localStorage.getItem("uniqueId")) || 0;
    const localUser = JSON.parse(localStorage.getItem("userDetails")) || [];

    const [question, setQuestion] = useState(localQuizzQuestion);
    const [uniqueId] = useState(localUniqueId);
    const [user, setUser] = useState(localUser);
    const [quizzIndex, setQuizzIndex] = useState(0);
    const [selectOption, setSelectOption] = useState('');
    const [score, setScore] = useState(0);
    const [progressBar, setProgressBar] = useState(10);
    const [selectedAnswer, setSelectedAnswer] = useState([]);
    const [quizzCompleted, setQuizzCompleted] = useState(false);

    let userName = user[uniqueId]?.name || "Guest";
    const navigate = useNavigate();

    function handleNext() {
        if (quizzIndex < question.length - 1) {
            setQuizzIndex(prevIndex => prevIndex + 1);
            setProgressBar(prevProgress => prevProgress + (100 / question.length));
        } else {
            let updatedUsers = user.map((u) =>
                u.id === uniqueId ? { ...u, score: Math.max(u.score, score) } : u
            );
            localStorage.setItem("userDetails", JSON.stringify(updatedUsers));
            setUser(updatedUsers);
            alert("Quiz submitted successfully!");
            setQuizzCompleted(true);
        }
    }

    function handlePrevious() {
        if (quizzIndex > 0) {
            setQuizzIndex(prevIndex => prevIndex - 1);
            setProgressBar(prevProgress => prevProgress - (100 / question.length));
        }
    }

    function handleOption(text) {
        setSelectOption(text);
        setSelectedAnswer(prevAnswers => {
            const updatedAnswers = [...prevAnswers];
            const existingIndex = updatedAnswers.findIndex(ans => ans.id === quizzIndex);
            if (existingIndex !== -1) {
                updatedAnswers[existingIndex] = { id: quizzIndex, answer: text };
            } else {
                updatedAnswers.push({ id: quizzIndex, answer: text });
            }
            return updatedAnswers;
        });
        if (question[quizzIndex].answer === text) {
            setScore(prevScore => prevScore + 10);
        }
    }

    useEffect(() => {
        if (quizzCompleted) {
            navigate("/quizz/leaderboard");
        }
    }, [quizzCompleted]);

    return (
        <>
            <Navbar name={userName} />
            {!quizzCompleted ? (
                <div className="quiz-container">
                    <h1>Question {quizzIndex + 1} of {question.length}</h1>
                    <div className="progress">
                        <div className="progress-container" style={{ width: `${progressBar}%`, backgroundColor: "#F3BD00", transition: "width 0.3s ease-in-out" }}></div>
                    </div>
                    {question.length > 0 ? (
                        <div className="question-container">
                            <h2>{question[quizzIndex].ques}</h2>
                            {question[quizzIndex].options.map((option, id) => (
                                <button key={id} style={{ backgroundColor: selectOption === option ? "#F3BD00" : null }} className='option-button' onClick={() => handleOption(option)}>
                                    {option}
                                </button>
                            ))}
                        </div>
                    ) : (
                     null
                    )}
                    {quizzIndex > 0 && <Button title="Previous" textName="previous-button" onClick={handlePrevious} />}
                    <Button title="Next" textName="next-button" onClick={handleNext} />
                </div>
            ) : null}
        </>
    );
}

export default Quizz;
