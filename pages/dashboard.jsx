import { db } from '../utils/firebase';
import { collection } from 'firebase/firestore';
import UserContext from '../components/UserContext';
import { useEffect, useState, useContext } from 'react';
import Message from '../components/Message';

const Dashboard = () => {
  const [posts, setPosts] = useState([]);

  const { user, loading, protectedRoutes, logout } = useContext(UserContext);

  const getPosts = async () => {
    const collectionRef = collection(db, 'posts');
    const q = query(collectionRef, where('user', '==', user.uid));
  };

  useEffect(() => {
    protectedRoutes();
    getData();
  }, [user, loading]);

  return (
    <div>
      <h1>Your posts</h1>
      <div>posts</div>
      <Message></Message>

      <button onClick={logout}>Sign out</button>
    </div>
  );
};

export default Dashboard;
