import React from 'react';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
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
function isValidEmail(email: string) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}
function isValidPhoneNumber(number: string) {
  // Regular expression pattern to validate phone number
  const phonePattern = /^\d{10}$/;
  return phonePattern.test(number);
}
function App() {
  const redirectToHome = useRedirect();
  const [phoneNumber, setPhoneNumber] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [hiddenPassword, setHiddenPassword] = useState('');
  const [username, setUsername] = useState('');
  const [accountPopup, setAccountPopup] = useState(false);
  const [tempAccountName, setTempAccountName] = useState('');
  const [passwordPopup, setPasswordPopup] = useState(false);
  const [tempPassword, setTempPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [emailPopup, setEmailPopup] = useState(false);
  const [tempEmail, setTempEmail] = useState('');
  const [confirmEmail, setConfirmEmail] = useState('');
  const [emailError, setEmailError] = useState('');
  const [phoneNumberPopup, setPhoneNumberPopup] = useState(false);
  const [tempPhoneNumber, setTempPhoneNumber] = useState('');
  const [phoneNumberError, setPhoneNumberError] = useState('');
  const handleSubmit = () => {
    try {
      const response = fetch('/changeAccount', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          user_id: localStorage.getItem('user_id'),
          username: username,
          email: email,
          password: password,
          phoneNumber: phoneNumber,
        }),
      });
      console.log(response);
      redirectToHome();
    } catch (error) {
      console.log('fel');
    }
  };
  useEffect(() => {
    if (!localStorage.getItem('user_id')) {
      redirectToHome();
    }
  });
  useEffect(() => {
    const storedUser = localStorage.getItem('user_id');
    console.log(storedUser);
    if (storedUser) {
      fetch('/' + storedUser, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data[0]);
          console.log(data);
          setUsername(data[0]?.username || '');
          setTempAccountName(data[0]?.username || '');
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
        <div className="my-auto ml-[33px] w-full border-none bg-transparent text-[30px] text-white ">
          My Account
        </div>
      </div>
      <div
        className={`fixed left-0 top-0  h-full w-full transition-all  ${
          accountPopup || passwordPopup || emailPopup || phoneNumberPopup
            ? 'bg-[#000000a0]'
            : 'z-[-10] bg-[#00000000]'
        }`}
        onClick={() => setAccountPopup(!accountPopup)}
      ></div>
      {/* Popups för att ändra värden */}
      <div
        className={`fixed left-0 right-0  mx-auto w-[80%] rounded-[25px]  bg-white p-[10px] text-center transition-all ${
          accountPopup ? ' ' : 'translate-y-[-500px]'
        }`}
      >
        <img
          onClick={() => setAccountPopup(!accountPopup)}
          className="ml-auto cursor-pointer"
          src={closeSvg}
          alt=""
        />
        <div className="mt-[10px] text-[20px]">Change account name</div>
        <div className="mt-[20px] text-[20px] text-[#898989]">{username}</div>
        <div className="mt-[20px] text-[16px]">Enter first and last name</div>
        <input
          type="text"
          className="w-full rounded-[25px] border-[2px] border-secondary px-[32px] py-[12px] text-[20px]"
          value={tempAccountName}
          onChange={(e) => setTempAccountName(e.target.value)}
        />
        <div className="flex justify-end">
          <input
            type="submit"
            className="ml-[20px] mt-[20px] cursor-pointer rounded-[25px] border-2 border-none bg-secondary px-[16px] py-[8px] text-white"
            value="Save"
            onClick={() => {
              setAccountPopup(!accountPopup);
              setUsername(tempAccountName);
            }}
          />
        </div>
      </div>
      <div
        className={`fixed left-0 right-0  mx-auto w-[80%] rounded-[25px]  bg-white p-[10px] text-center transition-all ${
          passwordPopup ? ' ' : 'translate-y-[-600px]'
        }`}
      >
        <img
          onClick={() => setPasswordPopup(!passwordPopup)}
          className="ml-auto cursor-pointer"
          src={closeSvg}
          alt=""
        />
        <div className="mt-[10px] text-[20px]">Change password</div>
        <div className="ml-[20px] mt-[20px] text-left text-red-500 ">
          {passwordError}
        </div>
        <div className="ml-[20px] mt-[10px] text-left text-[16px]">
          Enter new password
        </div>
        <input
          type="password"
          className="w-full rounded-[25px] border-[2px] border-secondary px-[32px] py-[12px] text-[20px]"
          value={tempPassword}
          onChange={(e) => setTempPassword(e.target.value)}
        />
        <div className="ml-[20px] mt-[20px] text-left text-[16px]">
          Confirm password
        </div>
        <input
          type="password"
          className="w-full rounded-[25px] border-[2px] border-secondary px-[32px] py-[12px] text-[20px]"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
        <div className="flex justify-end">
          <input
            type="submit"
            className="ml-[20px] mt-[20px] cursor-pointer rounded-[25px] border-2 border-none bg-secondary px-[16px] py-[8px] text-white"
            value="Save"
            onClick={() => {
              if (tempPassword === confirmPassword) {
                setPasswordPopup(!passwordPopup);
                setPassword(tempPassword);
                setPasswordError('');
              } else {
                setPasswordError('Passwords do not match');
              }
            }}
          />
        </div>
      </div>

      <div
        className={`fixed left-0 right-0  mx-auto w-[80%] rounded-[25px]  bg-white p-[10px] text-center transition-all ${
          emailPopup ? ' ' : 'translate-y-[-600px]'
        }`}
      >
        <img
          onClick={() => setEmailPopup(!emailPopup)}
          className="ml-auto cursor-pointer"
          src={closeSvg}
          alt=""
        />
        <div className="mt-[10px] text-[20px]">Change Email Adress</div>
        <div className="mt-[20px] text-center text-[20px] text-[#898989]">
          {email}
        </div>
        <div className="ml-[20px] mt-[20px] text-left text-red-500 ">
          {emailError}
        </div>
        <div className="ml-[20px] mt-[10px] text-left text-[16px]">
          Enter new email adress
        </div>
        <input
          type="text"
          className="w-full rounded-[25px] border-[2px] border-secondary px-[32px] py-[12px] text-[20px]"
          value={tempEmail}
          onChange={(e) => setTempEmail(e.target.value)}
        />
        <div className="ml-[20px] mt-[20px] text-left text-[16px]">
          Confirm email adress
        </div>
        <input
          type="text"
          className="w-full rounded-[25px] border-[2px] border-secondary px-[32px] py-[12px] text-[20px]"
          value={confirmEmail}
          onChange={(e) => setConfirmEmail(e.target.value)}
        />
        <div className="flex justify-end">
          <input
            type="submit"
            className="ml-[20px] mt-[20px] cursor-pointer rounded-[25px] border-2 border-none bg-secondary px-[16px] py-[8px] text-white"
            value="Save"
            onClick={() => {
              if (tempEmail === confirmEmail && isValidEmail(tempEmail)) {
                setEmailPopup(!emailPopup);
                setEmail(tempEmail);
                setEmailError('');
              } else if (tempEmail !== confirmEmail) {
                setEmailError('Passwords do not match');
              } else if (!isValidEmail(tempEmail)) {
                setEmailError('Invalid emailadress');
              }
            }}
          />
        </div>
      </div>
      <div
        className={`fixed left-0 right-0  mx-auto w-[80%] rounded-[25px]  bg-white p-[10px] text-center transition-all ${
          phoneNumberPopup ? ' ' : 'translate-y-[-600px]'
        }`}
      >
        <img
          onClick={() => setPhoneNumberPopup(!phoneNumberPopup)}
          className="ml-auto cursor-pointer"
          src={closeSvg}
          alt=""
        />
        <div className="mt-[10px] text-[20px]">Change Phone Number</div>
        <div className="mt-[20px] text-center text-[20px] text-[#898989]">
          {phoneNumber}
        </div>
        <div className="ml-[20px] mt-[20px] text-left text-red-500 ">
          {phoneNumberError}
        </div>
        <div className="ml-[20px] mt-[10px] text-left text-[16px]">
          Enter new phone number
        </div>
        <input
          type="text"
          className="w-full rounded-[25px] border-[2px] border-secondary px-[32px] py-[12px] text-[20px]"
          value={tempPhoneNumber}
          onChange={(e) => setTempPhoneNumber(e.target.value)}
        />
        <div className="flex justify-end">
          <input
            type="submit"
            className="ml-[20px] mt-[20px] cursor-pointer rounded-[25px] border-2 border-none bg-secondary px-[16px] py-[8px] text-white"
            value="Save"
            onClick={() => {
              if (isValidPhoneNumber(tempPhoneNumber)) {
                setPhoneNumberPopup(!phoneNumberPopup);
                setPhoneNumber(tempPhoneNumber);
                setPhoneNumberError('');
              } else {
                setPhoneNumberError('Invalid phone number');
              }
            }}
          />
        </div>
      </div>

      <div className="mx-auto mt-[40px] w-[65%] max-w-md">
        <h2>Account Name</h2>
        <label>
          <button
            onClick={() => setAccountPopup(!accountPopup)}
            className="placeholder-italic my-[13px] flex w-full items-center rounded-[25px] border-2 border-secondary px-[32px] py-[8px]"
          >
            {username}
            <img src={pen} className="ml-auto" alt="" />
          </button>
        </label>
        <h2>Password</h2>
        <label>
          <button
            onClick={() => setPasswordPopup(!passwordPopup)}
            className="placeholder-italic my-[13px] flex w-full items-center rounded-[25px] border-2 border-secondary px-[32px] py-[8px]"
          >
            {hiddenPassword}
            <img src={pen} className="ml-auto" alt="" />
          </button>
        </label>
        <h2>Email adress</h2>
        <label>
          <button
            onClick={() => setEmailPopup(!emailPopup)}
            className="placeholder-italic my-[13px] flex w-full items-center rounded-[25px] border-2 border-secondary px-[32px] py-[8px]"
          >
            {email}
            <img src={pen} className="ml-auto" alt="" />
          </button>
        </label>
        <h2>Phone number</h2>
        <label>
          <button
            onClick={() => setPhoneNumberPopup(!phoneNumberPopup)}
            className="placeholder-italic my-[13px] flex w-full items-center rounded-[25px] border-2 border-secondary px-[32px] py-[8px]"
          >
            {phoneNumber}
            <img src={pen} className="ml-auto" alt="" />
          </button>
        </label>

        <div className="flex justify-end">
          <input
            type="submit"
            className="btn my-[54px] cursor-pointer rounded-[25px] border-2 border-none bg-secondary px-[33px] py-[15px] text-white"
            value="Confirm"
            onClick={handleSubmit}
          />
        </div>
      </div>
    </div>
  );
}

export default App;
