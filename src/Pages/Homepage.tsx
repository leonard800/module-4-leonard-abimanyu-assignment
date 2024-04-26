import { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import pageHeader from '../FootHead/Header';

function Home() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('');
  const handleLogin = async () => {
    try {
      const response = await fetch('https://library-crud-sample.vercel.app/api/user/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: 'your_email@example.com',
          password: 'your_password',
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setIsLoggedIn(true);
        setUsername(data.username); 
        localStorage.setItem('token', data.token); 
      } else {
        
        console.error('Login failed:', data.message);
      }
    } catch (error) {
      console.error('Error occurred when logging in:', error);
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUsername('');
    localStorage.removeItem('token'); 
  };

  return (
    <div className="Home">
      <h1 className="text-slate-900 font-serif font-bold text-7xl text-center">
        Welcome to My Page
      </h1>
      <p className="text-center font-serif text-2xl mb-8">
        This is a page where you can redefine yourself, before we get started I
        think it is better for you to sign in first
      </p>
      <div className="flex justify-around">
        {!isLoggedIn ? (
          <>
            <Link to="/login">
                <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-4"
                onClick={handleLogin}
                >
                Login
                </button>
            </Link>
            <Link to="/signup">
              <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
                Sign Up
              </button>
            </Link>
            <Link to="/category">
              <button className="bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded">
                Category
              </button>
            </Link>
          </>
        ) : (
          <div>
            <p className="text-center font-serif text-xl mb-8 text-left">Hello, {username}</p>
            <button
              className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
              onClick={handleLogout}
            >
              Logout
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default Home;