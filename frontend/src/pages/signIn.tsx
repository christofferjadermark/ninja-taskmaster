import React from 'react';
import { useState, useEffect, FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import signUpNinja from '../images/signUp.svg';
import '../index.css';

function useRedirect() {
  const navigate = useNavigate();
  const redirectToHome = () => {
    navigate('/HomePage');
  };
  return redirectToHome;
}

function App() {
  const redirectToHome = useRedirect();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    if (localStorage.getItem('user_id')) {
      redirectToHome();
    }
  });

  if (
    localStorage.getItem('isLogedIn') &&
    localStorage.getItem('isLogedIn') === 'true'
  ) {
    redirectToHome();
  }
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:8080/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email,
          password: password,
        }),
      });
      console.log(response);
      if (response.ok) {
        const data = await response.json();
        console.log(data);
        const { user_id } = data[0];
        localStorage.setItem('user_id', user_id);
        redirectToHome();
      } else {
        console.log('fel inloggnings uppgifter');
      }
    } catch (error) {
      console.log('fel');
    }
  };
  return (
    <div className="flex items-center justify-center">
      <div className="w-[65%] max-w-md">
        <div className="text-center text-[30px]">
          {' '}
          The power to slay your tasks, all in one app.
        </div>

        <img
          src={signUpNinja}
          alt="Ninja Taskmaster"
          className="my-[30px] w-full"
        />
        <form className="md:container sm:mx-auto" onSubmit={handleSubmit}>
          <h2>Enter email address</h2>
          <label>
            <input
              className="placeholder-italic my-[13px] w-full rounded-[25px] border-2 border-secondary px-[32px] py-[8px]"
              style={{ fontStyle: 'italic' }}
              name="email"
              placeholder="Example@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </label>
          <label>
            <h2>Enter password</h2>
            <input
              name="password"
              placeholder="Example1"
              type="password"
              value={password}
              className="placeholder-italic my-[13px] w-full rounded-[25px] border-2 border-secondary px-[32px] py-[8px]"
              style={{ fontStyle: 'italic' }}
              onChange={(e) => setPassword(e.target.value)}
            />
          </label>

          <div className="text-center">
            <input
              type="submit"
              className="btn my-[54px] cursor-pointer rounded-[25px] border-2 border-none bg-secondary px-[33px] py-[15px] text-white"
              value="Sign in"
            />
            <div className="cursor-pointer font-light text-[#6757C8]">
              Forgot your password?
            </div>
            <div className="my-3 font-light">
              Do you want to create an account?
            </div>
            <a href="/#/signUp" className="font-light text-[#6757C8] ">
              Sign up here!
            </a>
          </div>
        </form>
      </div>
    </div>
  );
}

export default App;
