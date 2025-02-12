import '../assets/styles/Leaderboard.css'
import Navbar from "../components/common/Navbar";
import TopRank from "../components/TopRank";
import PreviousRank from '../components/PreviousRank';

function Leaderboard() {
    return (
        <>
            <Navbar />
            <div className="top-ranks-container">
                <TopRank rankClassName="rank-2" />
                <TopRank rankClassName="rank-1" />
                <TopRank rankClassName="rank-3" />
            </div>
            <div className='previous-ranks'>
                <div>
                    <PreviousRank />
                    <PreviousRank />
                    <PreviousRank />
                </div>
            </div>
        </>
    )
}
export default Leaderboard