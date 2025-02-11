import '../navbar/Navbar.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowRightFromBracket } from '@fortawesome/free-solid-svg-icons'
import Button from '../button/Button';
function Navbar() {
    return (
        <>
            {/* <div class="quizz-navbar">
    <div><img src="../Images/techpatshala.svg" alt="" class="techpatshala-img"></div>
    <div class="quizz-detail">
      <div class="current-user" style="font-size: 2rem;"></div>
      <div style="font-size: 1.5rem;">All Quizzes</div>
      <button class="logout-btn" onclick="logoutBtn()"><i class="fa-solid fa-right-from-bracket"></i></button>
      <div>
        <img src="../Images/person.jpg" alt="" class="nav-personal-img"><br>
      </div>
    </div>
  </div> */}
            <div className='quizz-navbar'>
                <div>
                    <img src="src/images/techpatshala.svg" alt="" />
                </div>
                <div className='quizz-detail'>
                    <div className='current-user'> </div>
                    <div>
                        <FontAwesomeIcon icon={faArrowRightFromBracket} className='logout-btn' />
                    </div>
                    <div className='personal-img'>
                        <img src="src/images/person.jpg" alt="" />
                    </div>
                </div>
            </div>
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
        </>
    )
}
export default Navbar