import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { FaUserAlt } from 'react-icons/fa';
import { toast } from 'react-hot-toast';
import { setLogout } from '../State';

function Navbar() {
  // const [user, setUser] = useState(null)
  const user = useSelector((state) => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleLogout = async () => {
    try {
      dispatch(setLogout()); // Dispatches the setLogout action to update the state
      navigate('/auth'); // Navigates to the '/auth' route
      toast.success('Logged out successfully'); // Displays a success toast message
    } catch (err) {
      toast.error(err.message);
    }
  };

  return (
    <header>
      <div className="userInfo" />
      <FaUserAlt className="userIcon" />
      <div>
        <h1 className="name">{user.name}</h1>
        <h1 className="name">{user.email}</h1>
        <Link to="/edit-profile" className="edit-btn">
          Edit
        </Link>
      </div>
      <nav>
        <button onClick={handleLogout} type="submit">
          Logout
        </button>
      </nav>
    </header>
  );
}

export default Navbar;
