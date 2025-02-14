import '../assets/styles/Quizz.css';
import '../assets/styles/Leaderboard.css'
import TopRank from "../components/TopRank";
import PreviousRank from '../components/PreviousRank';
import Navbar from "../components/common/Navbar";
import Button from '../components/common/Button';
import { nextButton, optionButton, previousButton } from '../reduxToolKit/quizzReducer';
import { useSelector, useDispatch } from 'react-redux';
import { useState, useEffect } from 'react';


function Quizz() {
    const { quizzIndex, quizzQuestions, score, selectedAnswer, previous, progressBar, leaderboardPage, currentUser, currentIndex } = useSelector((state) => state.quizzData);
    console.log("score is",score);
    console.log(currentUser);
    console.log(currentIndex);
    console.log(currentUser[currentIndex]);

    const [selectOption, setSelectOption] = useState('');
    const dispatch = useDispatch();
    const question = quizzQuestions[quizzIndex];

    function handleNext() {
        dispatch(nextButton());
    }

    function handleOption(text) {
        setSelectOption(text);
        dispatch(optionButton(text));
    }

    function handlePrevious() {
        dispatch(previousButton());
    }

    let localUser = JSON.parse(localStorage.getItem("userDetails")) || [];
    let rankSort = localUser.sort((a, b) => b.score - a.score);
    console.log(rankSort);

    useEffect(()=>{

    },[quizzQuestions])
    
    return (
        <>

            {/* <Navbar name={currentusername} /> */}
            <Navbar />
            {leaderboardPage ? (
                <>
                <h2 className='rank-show'>Wow your rank is # {currentIndex+1}</h2>
                    <div className="top-ranks-container">
                        <TopRank rankClassName="rank-2" user={rankSort[1]} />
                        <TopRank rankClassName="rank-1"  user={rankSort[0]}/>
                        <TopRank rankClassName="rank-3" user={rankSort[2]} />
                    </div>
                    <div className='previous-ranks'>
                        <div>
                            <PreviousRank />
                            <PreviousRank />
                            <PreviousRank />
                        </div>
                    </div>
                </>
            ) : (
                <div className="quiz-container">
                    {quizzIndex < quizzQuestions.length - 2 ? (
                        <h1>Question {quizzIndex + 1} of {quizzQuestions.length}</h1>
                    ) : quizzIndex === quizzQuestions.length - 2 ? (
                        <h1>Last 2 questions left</h1>
                    ) : quizzIndex === quizzQuestions.length - 1 ? (
                        <h1>Hey, this is the last question!</h1>
                    ) : null}

                    <div className="progress">
                        <div className="progress-container"
                            style={{
                                width: `${progressBar}%`,
                                height: "100%",
                                backgroundColor: "#F3BD00",
                                transition: "width 0.3s ease-in-out",
                            }}></div>
                    </div>

                    {question ? (
                        <div className="question-container">
                            <h2>{question.ques}</h2>
                            {question.options.map((option, id) => (
                                <div key={id}>
                                    <button style={{ backgroundColor: selectOption === option || previous === option ? "#F3BD00" : null }} className='option-button' onClick={() => handleOption(option)}>{option}</button>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <p>Loading questions...</p>
                    )}

                    {quizzIndex > 0 ? <Button title="Previous" textName="previous-button" onClick={handlePrevious} /> : null}
                    <Button title="Next" textName="next-button" onClick={handleNext} />
                </div>
            )}
        </>
    );
}

export default Quizz;
