import '../assets/styles/TopRank.css';

function TopRank({ rankClassName, user }) {
  return (
    <div className="top-rank">
      <div className={`${rankClassName}-image`}>
        <img src={user ? user.imageUrl || 'src/assets/images/person.jpg' : 'src/assets/images/person.jpg'} alt="User" />
      </div>
      <div className={rankClassName}>
        <p className='user-name'>{user ? user.name : 'User not found'}</p>
        <p className='user-score'>{user ? `Score: ${user.score}` : ''}</p>
      </div>
    </div>
  );
}

export default TopRank;
