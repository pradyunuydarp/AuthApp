import '../CSS/Profile.css';
import { useLocation } from 'react-router-dom';

function Profile() {
  const location = useLocation();
  const { name } = location.state || { name: 'Guest' }; // Default to 'Guest' if no state is provided

  return (
    <div id="Profile">
      <h2>Welcome, {name}!</h2>
      <img src="../kids-goku-peace.gif" alt="kid-goku-yo"/>
    </div>
  );
}

export default Profile;
