import { db } from '../utils/firebase';
import {
  addDoc,
  collection,
  doc,
  serverTimestamp,
  updateDoc
} from 'firebase/firestore';
import UserContext from '../components/UserContext';
import { useEffect, useState, useContext } from 'react';
import { useRouter } from 'next/router';
import { toast } from 'react-toastify';
import { TbAlertTriangle } from 'react-icons/tb';

const Post = () => {
  const { user, loading, protectedRoutes } = useContext(UserContext);
  const [post, setPost] = useState({ description: '', title: '' });

  const route = useRouter();
  const routeData = route.query;

  const handleSubmit = async (e) => {
    e.preventDefault();

    // check empty required fields
    if (!post.description || !post.title) {
      toast.error('Post Title and Description are required');
      return;
    }
    if (post.description.length > 300) {
      toast.error('Post Description up to a maximum of 300 characters');
      return;
    }
    // Edit a post
    if (post?.hasOwnProperty('id')) {
      const docRef = doc(db, 'posts', post.id);
      const updatedPost = { ...post, timestamp: serverTimestamp() };
      await updateDoc(docRef, updatedPost);
      toast.success('Post has been updated', {
        autoClose: 1500
      });
      return route.push('/dashboard');
    } else {
      //Make a new post
      const collectionRef = collection(db, 'posts');
      await addDoc(collectionRef, {
        ...post,
        timestamp: serverTimestamp(),
        user: user.uid,
        avatar: user.photoURL,
        username: user.displayName
      });
      setPost({ description: '', title: '' });
      toast.success('Post has been created', {
        autoClose: 1500
      });
      return route.push('/dashboard');
    }
  };

  // get post data into post form
  const getPostData = () => {
    if (!user) return;
    if (routeData.id) {
      setPost({
        description: routeData.description,
        title: routeData.title,
        id: routeData.id
      });
    } else {
      setPost({ description: '', title: '' });
    }
  };

  useEffect(() => {
    protectedRoutes();
    getPostData();
  }, [user, loading, routeData]);

  return (
    <div className='my-20 p-12 shadow-lg rounded-lg max-w-md mx-auto'>
      <form onSubmit={handleSubmit}>
        <h1 className='text-2xl font-bold'>
          {post?.hasOwnProperty('id') ? 'Edit post' : 'Create a new post'}
        </h1>
        <div className='py2'>
          <h3 className='text-lg font-medium py-2'>Description</h3>

          <input
            className='mb-4 mt-4 bg-gray-800 h-3/5 w-full text-white rounded-lg p-2 text-sm'
            type='text'
            value={post.title}
            onChange={(e) => setPost({ ...post, title: e.target.value })}
            placeholder='Post Title'
          />

          <textarea
            className='bg-gray-800 h-48 w-full text-white rounded-lg p-2 text-sm'
            value={post.description}
            onChange={(e) => setPost({ ...post, description: e.target.value })}
            placeholder='Post Text'></textarea>
          <p
            className={`{font-medium text-sm flex items-center gap-2 ${
              post.description.length > 300 ? 'text-red-600' : 'text-cyan-600'
            }`}>
            {post.description.length}/300
            {post.description.length > 300 && (
              <TbAlertTriangle className='font-medium text-lg' />
            )}
          </p>
        </div>
        <button
          type='submit'
          className='w-full bg-cyan-500 text-white font-medium p-2 my-2 rounded-lg text-sm '>
          Submit
        </button>
      </form>
    </div>
  );
};

export default Post;
