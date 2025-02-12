import '../assets/styles/Quizz.css';
import Navbar from "../components/common/Navbar"
import Button from '../components/common/Button';
function Quizz(){
    return(
        <>
        <div>
            <Navbar/>
            <h1>Questions</h1>
            <div className="progress">
                <div className="progress-container"></div>
            </div>

            <h2>question</h2>
            <h2>option a </h2>
            <h2>option b</h2>
            <h2>option c</h2>
            <h2>option d</h2>

            <Button title="Next" textName="next-button" />
        </div>
        </>
    )
}
export default Quizz