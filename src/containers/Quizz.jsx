import '../assets/styles/Quizz.css';
import '../assets/styles/Leaderboard.css';
import Navbar from "../components/common/Navbar";
import Button from '../components/common/Button';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import TopRank from "../components/TopRank"
import PreviousRank from "../components/PreviousRank"
import LeaderboardPage from '../pages/LeaderboardPage';

function Quizz() {
  
    
    const localQuizzQuestion = JSON.parse(localStorage.getItem("questions")) || [];
    const localUniqueId = JSON.parse(localStorage.getItem("uniqueId")) || 0;
    const localUser = JSON.parse(localStorage.getItem("userDetails")) || [];

    // Sort users based on score
    const sortedUsers = [...localUser].sort((a, b) => b.score - a.score);
    
    const [question, setQuestion] = useState(localQuizzQuestion);
    const [uniqueId] = useState(localUniqueId);
    const [user, setUser] = useState(localUser);
    const [quizzIndex, setQuizzIndex] = useState(0);
    const [selectedOption, setSelectedOption] = useState('');
    const [score, setScore] = useState(0);
    const [progressBar, setProgressBar] = useState(10);
    const [selectedAnswers, setSelectedAnswers] = useState([]);
    const [quizzCompleted, setQuizzCompleted] = useState(false);

    // Find user rank in sorted list
    const userRank = sortedUsers.findIndex(u => u.id === uniqueId) + 1;
    const userName = user[uniqueId]?.name || "Guest";

    function handleNext() {
        if (quizzIndex < question.length - 1) {
            setQuizzIndex(prevIndex => prevIndex + 1);
            setProgressBar(prevProgress => prevProgress + (100 / question.length));
            setSelectedOption('');
        } else {
            const updatedUsers = user.map(u =>
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
        setSelectedOption(text);
        setSelectedAnswers(prev => {
            const updatedAnswers = [...prev];
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

    return (
        <>
            <Navbar name={userName} />
            {!quizzCompleted ? (
                <div className="quiz-container">
                    <h1>Question {quizzIndex + 1} of {question.length}</h1>
                    <div className="progress">
                        <div className="progress-container" 
                            style={{ width: `${progressBar}%`, backgroundColor: "#F3BD00", transition: "width 0.3s ease-in-out" }}>
                        </div>
                    </div>
                    {question.length > 0 && (
                        <div className="question-container">
                            <h2>{question[quizzIndex].ques}</h2>
                            {question[quizzIndex].options.map((option, id) => (
                               <div>
                                 <button 
                                    key={id} 
                                    style={{ backgroundColor: selectedOption === option ? "#F3BD00" : null }} 
                                    className='option-button' 
                                    onClick={() => handleOption(option)}
                                >
                                    {option}
                                </button>
                                </div>
                            ))}
                        </div>
                    )}
                    {quizzIndex > 0 && <Button title="Previous" textName="previous-button" onClick={handlePrevious} />}
                    <Button title="Next" textName="next-button" onClick={handleNext} />
                </div>
            ) : (
                <>
                    <h1>Leaderboard</h1>
                    <h2 className='rank-show'>Wow! Your rank is # {userRank}</h2>
                    <div className="top-ranks-container">
                        {sortedUsers.length > 1 && <TopRank rankClassName="rank-2" user={sortedUsers[1]} image="src/assets/images/person2.jpg" />}
                        {sortedUsers.length > 0 && <TopRank rankClassName="rank-1" user={sortedUsers[0]} image="src/assets/images/person.jpg" />}
                        {sortedUsers.length > 2 && <TopRank rankClassName="rank-3" user={sortedUsers[2]} image="src/assets/images/person3.jpg" />}
                    </div>
                    <div className='previous-ranks'>
                        {sortedUsers.length > 5 && <PreviousRank user={sortedUsers[sortedUsers.length - 1]} />}
                        {sortedUsers.length > 4 && <PreviousRank user={sortedUsers[4]} />}
                        {sortedUsers.length > 3 && <PreviousRank user={sortedUsers[3]} />}
                    </div>
                </>
            )}
        </>
    );
}

export default Quizz;
