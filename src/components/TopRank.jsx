import '../assets/styles/TopRank.css';
function TopRank({rankClassName}){
    return(
        <>
          <div className='top-rank'> 
            <div className={`${rankClassName}-image`}>
               <img src="src/assets/images/person.jpg" alt="" />
            </div>
            <div className={rankClassName}>

            </div>
          </div>
        </>
    )
}
export default TopRank