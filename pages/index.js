import Head from 'next/head';

export default function Home() {
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

      <h1>Hello world!</h1>
    </div>
  );
}
