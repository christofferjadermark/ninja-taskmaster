import React from 'react';
import { useState, useEffect, FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import signUpNinja from '../images/signUp.svg';
import '../index.css';
import closeSvg from '../images/close.svg';
import pen from '../images/greenPen.svg';
function useRedirect() {
  const navigate = useNavigate();
  const redirectToHome = () => {
    navigate('/HomePage');
  };
  return redirectToHome;
}

function App() {
  const redirectToHome = useRedirect();
  const [phoneNumber, setPhoneNumber] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [hiddenPassword, setHiddenPassword] = useState('');
  const [data, setData] = useState([]);
  const [username, setUsername] = useState('');
  useEffect(() => {
    if (!localStorage.getItem('user_id')) {
      redirectToHome();
    }
  });
  useEffect(() => {
    const storedUser = localStorage.getItem('user_id');
    console.log(storedUser);
    if (storedUser) {
      fetch('http://localhost:8080/' + storedUser, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data[0]);
          setData(data);
          console.log(data);
          setUsername(data[0]?.username || '');
          setEmail(data[0]?.email || '');
          let temp = '';
          for (let i in data[0]?.password) {
            console.log(i);
            temp += '•';
          }
          console.log(temp);
          setHiddenPassword(temp);
          setPassword(data[0]?.password || '');
          setPhoneNumber(data[0]?.phonenumber || ' ');
        });
    }
  }, []);
  if (
    localStorage.getItem('isLogedIn') &&
    localStorage.getItem('isLogedIn') === 'true'
  ) {
    redirectToHome();
  }
  return (
    <div>
      <a href="#/HomePage" className="flex h-[100px]">
        <img src={closeSvg} alt="Close" className=" ml-auto py-6 " />
      </a>
      <div className="flex h-[60px] bg-gradient-to-b from-linear1  to-linear2">
        <div className="my-auto ml-[33px] w-full border-none bg-transparent text-[30px] text-white">
          My Account
        </div>
      </div>
      <div className="mx-auto mt-[40px] w-[65%] max-w-md">
        <h2>Account Name</h2>
        <label>
          <button className="placeholder-italic my-[13px] flex w-full items-center rounded-[25px] border-2 border-secondary px-[32px] py-[8px]">
            {username}
            <img src={pen} className="ml-auto" alt="" />
          </button>
        </label>
        <h2>Password</h2>
        <label>
          <button className="placeholder-italic my-[13px] flex w-full items-center rounded-[25px] border-2 border-secondary px-[32px] py-[8px]">
            {hiddenPassword}
            <img src={pen} className="ml-auto" alt="" />
          </button>
        </label>
        <h2>Email adress</h2>
        <label>
          <button className="placeholder-italic my-[13px] flex w-full items-center rounded-[25px] border-2 border-secondary px-[32px] py-[8px]">
            {email}
            <img src={pen} className="ml-auto" alt="" />
          </button>
        </label>
        <h2>Phone number</h2>
        <label>
          <button className="placeholder-italic my-[13px] flex w-full items-center rounded-[25px] border-2 border-secondary px-[32px] py-[8px]">
            {phoneNumber}
            <img src={pen} className="ml-auto" alt="" />
          </button>
        </label>
        {/* <label>
          <h2>Password</h2>
          <input
            name="password"
            placeholder="Example1"
            type="password"
            value={password}
            className="placeholder-italic my-[13px] w-full rounded-[25px] border-2 border-secondary px-[32px] py-[8px]"
            style={{ fontStyle: 'italic' }}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label> */}

        <div className="text-center">
          <input
            type="submit"
            className="btn my-[54px] cursor-pointer rounded-[25px] border-2 border-none bg-secondary px-[33px] py-[15px] text-white"
            value="Save"
          />
        </div>
      </div>
    </div>
  );
}

export default App;
