import { useContext } from 'react';
import UserContext from './UserContext';
import Image from 'next/image';
import Link from 'next/link';

const Nav = () => {
  const { user } = useContext(UserContext);

  return (
    <nav className='flex flex-col justify-between items-center py-10 font-josefin sm:flex-row'>
      <Link href='/'>
        <button className='text-lg font-medium'>Creative Ideas</button>
      </Link>
      <ul className='flex items-center gap-10'>
        {(!user && (
          <Link href='/auth/login'>
            <a className='py-2 px-4 text-sm bg-cyan-500 text-white rounded-lg font-medium ml-8'>
              Join Now
            </a>
          </Link>
        )) || (
          <div className='flex items-center gap-6'>
            <Link href='/post'>
              <button className='font-medium bg-cyan-500 text-white py-2 px-4 rounded-mg text-sm hover:bg-cyan-900 duration-150'>
                Post
              </button>
            </Link>
            <Link href='/dashboard'>
              <Image
                className='w-12 rounded-full cursor-pointer'
                src={user.photoURL}
                unoptimized
                width={'50%'}
                height={'50%'}
                alt={user.displayName}></Image>
            </Link>
          </div>
        )}
      </ul>
    </nav>
  );
};

export default Nav;
