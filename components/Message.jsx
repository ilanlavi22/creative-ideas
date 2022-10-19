import Image from 'next/image';
const Message = ({ children, username, avatar, title, description }) => {
  return (
    <div className='bg-white p-8 border-b-2 rounded-lg'>
      <div className='flex items-center gap-2'>
        <Image
          className='rounded-full'
          src={avatar}
          unoptimized
          width={'50%'}
          height={'50%'}
          alt={username}
        />
        <h2>{username}</h2>
      </div>
      <div className='py-4'>
        <p className='py-4'>{title}</p>
        <p className='text-small text-base'>{description}</p>
      </div>
      {children}
    </div>
  );
};

export default Message;
