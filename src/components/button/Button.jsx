import '../button/button.css'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
function Button({title,textName}){
    return(
        <>
          <button className={textName}>{title} {title === "Next" && <FontAwesomeIcon icon={faArrowRight} />}
          </button>
        </>
    )
}
export default Button