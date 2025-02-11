import '../button/button.css'
function Button({title,textName}){
    return(
        <>
          <button className={textName}>{title}</button>
        </>
    )
}
export default Button