import '../assets/styles/Quizz.css';
import '../assets/styles/Leaderboard.css';
import TopRank from "../components/TopRank";
import PreviousRank from '../components/PreviousRank';
import Navbar from "../components/common/Navbar";
import Button from '../components/common/Button';
import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';

function Quizz() {
    const localQuizzQuestion = JSON.parse(localStorage.getItem("questions")) || [];
    console.log(localQuizzQuestion);
    

    const localUniqueId = JSON.parse(localStorage.getItem("uniqueId")) || 0;
    const localUser = JSON.parse(localStorage.getItem("userDetails")) || [];
    console.log(localUser);
    

    
//    let sortRank= localUser.sort((a, b) => b.score - a.score);
//     console.log(sortRank);
    

    const [question, setQuestion] = useState(localQuizzQuestion);
    const [uniqueId, setUniqueId] = useState(localUniqueId);
    const [user, setUser] = useState(localUser);
    const [quizzIndex, setQuizzIndex] = useState(0);
    const [selectOption, setSelectOption] = useState('');
    const [score, setScore] = useState(0);
    const [progressBar, setProgressBar] = useState(10);
    const [selectedAnswer, setSelectedAnswer] = useState([]);
    const [previousColor, setPreviousColor] = useState('');
    const [leaderboardPage, setLeaderboardPage] = useState(false);

    console.log("Quiz Questions:", question);
    console.log("Current Question Index:", quizzIndex);
    console.log("unique id", uniqueId);
console.log("user is",user);

useEffect(()=>{

},[user])

  useEffect(()=>{

  },[score])
     
  let sortRank = localUser.sort((a,b)=>b.score-a.score)
  console.log("score is", score);
  console.log("sort rank",sortRank[uniqueId].score);
    useEffect(() => {
        console.log("Updated selected option:", selectOption);
    }, [selectOption]);
    
console.log(user);

    console.log(user[uniqueId]);
    let userName = user[uniqueId].name;
    console.log("username is",userName);
    


    // Function to handle next question
    function handleNext() {
        if (quizzIndex < question.length - 1) {
            setQuizzIndex(prevIndex => prevIndex + 1);
            setProgressBar(prevProgress => prevProgress + (100 / question.length));
        }
        else if (quizzIndex === question.length - 1) {

            let lastUpdate = {
                question:question,
                selected:selectedAnswer,
                score:score
          }
            let updatedUsers = localUser.map((user) =>
                user.id === uniqueId
                    ? { 
                        ...user, 
                        score: Math.max(user.score, score), 
                        user: [...user.user, { questions: question, selected: selectedAnswer, score: score }]
                      }
                    : user
            );
            console.log(updatedUsers);
            
            localStorage.setItem("userDetails", JSON.stringify(updatedUsers));
            alert("are you sure to submit");
            setLeaderboardPage(true);
        }
    }

    // Function to handle previous question
    function handlePrevious() {
        if (quizzIndex > 0) {
            setQuizzIndex(prevIndex => prevIndex - 1);
            setProgressBar(prevProgress => prevProgress - (100 / question.length));
            let previous = selectedAnswer.find(item => item.id === quizzIndex - 1);
            if (previous) {
                setSelectOption(previous.answer);
            } else {
                setSelectOption('');
            }
        }
    }

    console.log(previousColor);


    // Function to handle option selection
    function handleOption(text) {
        setSelectOption(text);
      console.log("text is",text);
        setSelectedAnswer(prevAnswers => {
            const updatedAnswers = [...prevAnswers];
            const existingIndex = updatedAnswers.findIndex(ans => ans.id === quizzIndex);

            if (existingIndex !== -1) {

                updatedAnswers[existingIndex] = { id: quizzIndex, answer: text };
            }
            else {
                updatedAnswers.push({ id: quizzIndex, answer: text });
            }
            return updatedAnswers;
        });

        if (question[quizzIndex].answer === text) {
            setScore(score + 10);
        }
      

    }

    console.log(" Score:", score);
    console.log("Selected Answers:", selectedAnswer);

    const quizzQuestion = question.length > 0 ? question[quizzIndex] : null;

    return (
        <>
            <Navbar name={userName} />
            {leaderboardPage ? (
                <>
                    <h2 className='rank-show'>Wow! Your rank is # {uniqueId + 1}</h2>
                    <div className="top-ranks-container">
                        <TopRank rankClassName="rank-2" user={sortRank[1]} image="src/assets/images/person2.jpg" />
                        <TopRank rankClassName="rank-1" user={sortRank[0]} image="src/assets/images/person.jpg" />
                        <TopRank rankClassName="rank-3" user={sortRank[2]} image="src/assets/images/person3.jpg" />
                    </div>
                    <div className='previous-ranks'>
                        <PreviousRank  user={sortRank[user.length-1]} />
                        <PreviousRank user={sortRank[5]}  />
                        <PreviousRank user={sortRank[4]}  />
                    </div>
                </>
            ) : (
                <div className="quiz-container">

                    {quizzIndex < question.length - 2 ? (
                        <h1>Question {quizzIndex + 1} of {question.length}</h1>
                    ) : quizzIndex === question.length - 2 ? (
                        <h1>Last 2 questions left</h1>
                    ) : quizzIndex === question.length - 1 ? (
                        <h1>Hey, this is the last question!</h1>
                    ) : null}


                    {/* Progress Bar */}
                    <div className="progress">
                        <div className="progress-container"
                            style={{
                                width: `${progressBar}%`,
                                height: "100%",
                                backgroundColor: "#F3BD00",
                                transition: "width 0.3s ease-in-out",
                            }}>
                        </div>
                    </div>

                    {quizzQuestion ? (
                        <div className="question-container">
                            <h2>{quizzQuestion.ques}</h2>
                            {quizzQuestion.options.map((option, id) => (
                                <div key={id}>
                                    <button
                                        style={{ backgroundColor: selectOption === option || previousColor === option ? "#F3BD00" : null }}
                                        className='option-button'
                                        onClick={() => handleOption(option)}>
                                        {option}
                                    </button>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <p>Loading questions...</p>
                    )}

                    {/* Navigation Buttons */}
                    {quizzIndex > 0 && <Button title="Previous" textName="previous-button" onClick={handlePrevious} />}
                    <Button title="Next" textName="next-button" onClick={handleNext} />
                </div>
            )}
        </>
    );
}

export default Quizz;
