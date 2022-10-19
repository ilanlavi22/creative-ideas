import { onSnapshot, collection, orderBy, query } from 'firebase/firestore';
import { db } from '../utils/firebase';
import { useState, useEffect } from 'react';
import Head from 'next/head';
import Message from '../components/Message';
import Link from 'next/link';

export default function Home() {
  const [allPosts, setAllPosts] = useState([]);

  const getPosts = async () => {
    const collectionRef = collection(db, 'posts');
    const q = query(collectionRef, orderBy('timestamp', 'desc'));
    // using onSnapshot() to get realtime data updates
    const unsubscribe = onSnapshot(q, (snapshot) =>
      setAllPosts(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
    );
  };

  useEffect(() => {
    getPosts();
  }, []);

  return (
    <div>
      <Head>
        <title>Creative Ideas</title>
        <meta
          name='description'
          content='Creative Ideas - Next.js and Tailwind CSS'
        />
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <div className='my-12 text-lg'>
        <h2 className='text-primary'>See what other people are saying</h2>
        {allPosts.map((post) => (
          <Message key={post.id} {...post}>
            <Link href={{ pathname: `/${post.id}` }}>
              <button>link to post</button>
            </Link>
          </Message>
        ))}
      </div>
    </div>
  );
}
