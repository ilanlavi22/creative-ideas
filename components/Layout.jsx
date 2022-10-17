import Footer from './Footer';
import Nav from './Nav';

export const Layout = ({ children }) => {
  return (
    <>
      <header className='mx-6 md:max-w-2xl md:mx-auto'>
        <Nav />
      </header>
      <main>{children}</main>
      <Footer />
    </>
  );
};
