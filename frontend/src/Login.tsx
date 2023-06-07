import React from 'react';
import { useState, FormEvent, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './App.css';
import './index.css';

function useRedirect() {
  const navigate = useNavigate();
  const redirectToHome = () => {
    navigate('/home');
  };
  return redirectToHome;
}

function App() {
  const redirectToHome = useRedirect();
  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [logInEmail, setLogInEmail] = useState('');
  const [logInPassword, setLogInPassword] = useState('');
  useEffect(() => {
    if (localStorage.getItem('user_id')) {
      redirectToHome();
    }
  });

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await fetch('/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: logInEmail,
          password: logInPassword,
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
      // Handle ne twork or server error
    }
  };
  if (
    localStorage.getItem('isLogedIn') &&
    localStorage.getItem('isLogedIn') === 'true'
  ) {
    redirectToHome();
  }

  return (
    <div className="App">
      <h1>Logga in</h1>
      <form
        className="md:container sm:mx-auto"
        // action="/login"
        // method="post"
        onSubmit={handleSubmit}
      >
        <label>
          <input
            className="block w-full rounded-md border border-slate-300 bg-white py-2 pl-9 pr-3 shadow-sm placeholder:italic placeholder:text-slate-400 focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500 sm:text-sm"
            name="email"
            placeholder="E-postadress"
            value={logInEmail}
            onChange={(e) => setLogInEmail(e.target.value)}
          />
        </label>
        <label>
          <input
            name="password"
            placeholder="Lösenord"
            type="password"
            value={logInPassword}
            className="block w-full rounded-md border border-slate-300 bg-white py-2 pl-9 pr-3 shadow-sm placeholder:italic placeholder:text-slate-400 focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500 sm:text-sm"
            onChange={(e) => setLogInPassword(e.target.value)}
          />
        </label>
        <input
          type="submit"
          className="btn cursor-pointer rounded-md bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
          value="Skicka"
        />
      </form>

      <h1>Skapa konto</h1>
      <form
        className="md:container sm:mx-auto"
        action="/create"
        method="POST"
        // onSubmit={handleSubmit}
      >
        <label>
          <input
            name="userName"
            placeholder="Username"
            value={userName}
            className="block w-full rounded-md border border-slate-300 bg-white py-2 pl-9 pr-3 shadow-sm placeholder:italic placeholder:text-slate-400 focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500 sm:text-sm"
            onChange={(e) => setUserName(e.target.value)}
          />
        </label>
        <label>
          <input
            className="block w-full rounded-md border border-slate-300 bg-white py-2 pl-9 pr-3 shadow-sm placeholder:italic placeholder:text-slate-400 focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500 sm:text-sm"
            name="email"
            placeholder="E-postadress"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </label>
        <label>
          {/* Lösenord */}
          <input
            name="password"
            placeholder="Lösenord"
            type="password"
            value={password}
            className="block w-full rounded-md border border-slate-300 bg-white py-2 pl-9 pr-3 shadow-sm placeholder:italic placeholder:text-slate-400 focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500 sm:text-sm"
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        <input
          type="submit"
          className="btn cursor-pointer rounded-md bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
          value="Skicka"
        />
      </form>
    </div>
  );
}

export default App;
