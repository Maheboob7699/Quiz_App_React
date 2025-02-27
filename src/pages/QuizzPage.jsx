import Quizz from "../containers/Quizz";
import Leaderboardpage from "./LeaderboardPage";

function QuizzPage(){
    return(
        <>
          <Routes>
            <Route path="quizzRender" element={<Quizz />} />
            <Route path="leaderboard" element={<Leaderboardpage/>} />
        </Routes>
        </>
    )
}
export default  QuizzPage;