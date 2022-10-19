import { db } from '../utils/firebase';
import {
  collection,
  doc,
  deleteDoc,
  onSnapshot,
  orderBy,
  query,
  where
} from 'firebase/firestore';
import UserContext from '../components/UserContext';
import { useEffect, useState, useContext } from 'react';
import Message from '../components/Message';
import Link from 'next/link';
import { BsTrash2Fill } from 'react-icons/bs';
import { AiFillEdit } from 'react-icons/ai';

const Dashboard = () => {
  const { user, loading, protectedRoutes, logout } = useContext(UserContext);

  const [userPosts, setUserPosts] = useState([]);

  const getUserPosts = async () => {
    if (!user) return;
    const collectionRef = collection(db, 'posts');
    const q = query(
      collectionRef,
      where('user', '==', user.uid),
      orderBy('timestamp', 'desc')
    );
    const unsubscribe = onSnapshot(q, (snapshot) =>
      setUserPosts(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
    );
  };
  const deletePost = async (id) => {
    const docRef = doc(db, 'posts', id);
    await deleteDoc(docRef);
  };

  useEffect(() => {
    protectedRoutes();
    getUserPosts();
  }, [user, loading]);

  return (
    <div>
      <h1>Your posts</h1>
      <div>
        {userPosts.map((post) => {
          return (
            <Message key={post.id} {...post}>
              <div className='flex gap-4'>
                <button
                  onClick={() => deletePost(post.id)}
                  className='text-pink-600 flex items-center gap-2 py-2 text-sm'>
                  <BsTrash2Fill />
                  Delete
                </button>
                <Link href={{ pathname: '/post', query: post }}>
                  <button className='text-teal-600 flex items-center gap-2 py-2 text-sm'>
                    <AiFillEdit />
                    Edit
                  </button>
                </Link>
              </div>
            </Message>
          );
        })}
      </div>

      <button
        className='font-medium text-white bg-gray-800 py-2 px-4 my-6'
        onClick={logout}>
        Sign out
      </button>
    </div>
  );
};

export default Dashboard;
