import { Button } from 'react-bootstrap';
import axios from 'axios';
import { GoogleAuthProvider, signInWithPopup, getAuth } from 'firebase/auth';
import { app } from '../../firebase';
import { useNavigate } from 'react-router-dom';

const Oauth = () => {
  const navigate = useNavigate();

  const handleGoogleClick = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const auth = new getAuth(app);
      const result = await signInWithPopup(auth, provider);

      const form = {
        username: result.user.displayName,
        email: result.user.email,
      };

      const resp = await axios.post(
        'http://localhost:5000/api/v1/users/google',
        form,
        {
          withCredentials: true,
        },
      );

      if (resp.data.success) {
        console.log(resp.data);
        navigate('/');
      }
    } catch (error) {
      console.error(
        'Google Auth Error:',
        error.response?.data || error.message,
      );
    }
  };

  return (
    <>
      <Button variant="danger" onClick={handleGoogleClick}>
        Google
      </Button>
    </>
  );
};

export default Oauth;
