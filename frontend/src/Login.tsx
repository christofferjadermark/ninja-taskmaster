import React from "react";
import { useState, FormEvent } from "react";
import { useNavigate } from 'react-router-dom';
import "./App.css";
import "./index.css";

function useRedirect() {
  const navigate = useNavigate();
  const redirectToHome = () => {
    navigate('/home');
  };
  return redirectToHome;
}

function App() {
  const redirectToHome = useRedirect();
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [logInEmail, setLogInEmail] = useState("");
  const [logInPassword, setLogInPassword] = useState("");

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };
  if (localStorage.getItem("isLogedIn") && localStorage.getItem("isLogedIn") === "true"){
    redirectToHome();
  }

  return (
    <div className="App">
      <h1>Logga in</h1>
      <form
        className="md:container sm:mx-auto"
        action="http://localhost:8080/login"
        method="post"
        // onSubmit={handleSubmit}
      >
        <label>
          <input
            className="placeholder:italic placeholder:text-slate-400 block bg-white w-full border border-slate-300 rounded-md py-2 pl-9 pr-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm"
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
            className="placeholder:italic placeholder:text-slate-400 block bg-white w-full border border-slate-300 rounded-md py-2 pl-9 pr-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm"
            onChange={(e) => setLogInPassword(e.target.value)}
          />
        </label>
        <input
          type="submit"
          className="btn bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 cursor-pointer"
          value="Skicka"
        />
      </form>

      <h1>Skapa konto</h1>
      <form
        className="md:container sm:mx-auto"
        action="http://localhost:8080/create"
        method="POST"
        // onSubmit={handleSubmit}
      >
        <label>
          <input
            name="userName"
            placeholder="Username"
            value={userName}
            className="placeholder:italic placeholder:text-slate-400 block bg-white w-full border border-slate-300 rounded-md py-2 pl-9 pr-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm"
            onChange={(e) => setUserName(e.target.value)}
          />
        </label>
        <label>
          <input
            className="placeholder:italic placeholder:text-slate-400 block bg-white w-full border border-slate-300 rounded-md py-2 pl-9 pr-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm"
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
            className="placeholder:italic placeholder:text-slate-400 block bg-white w-full border border-slate-300 rounded-md py-2 pl-9 pr-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm"
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        <input
          type="submit"
          className="btn bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 cursor-pointer"
          value="Skicka"
        />
      </form>
    </div>
  );
}

export default App;
