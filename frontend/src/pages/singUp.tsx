import React from 'react';
import { useState, useEffect, FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import signUpNinja from '../images/signUp.svg';

function useRedirect() {
  const navigate = useNavigate();
  const redirectToHome = () => {
    navigate('/home');
  };
  return redirectToHome;
}

function App() {
  interface errors {
    phoneNumberError: string;
    emailError: string;
    passwordError: string;
  }
  const [myErrors, setMyErrors] = useState<errors>({
    phoneNumberError: '',
    emailError: '',
    passwordError: '',
  });

  function isValidEmail(email: string) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }
  function isValidPhoneNumber(number: string) {
    const phonePattern = /^\d{10}$/;
    return phonePattern.test(number);
  }
  const redirectToHome = useRedirect();
  const [userName, setUserName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const navigate = useNavigate();
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setMyErrors((prevState) => ({
      phoneNumberError: '',
      passwordError: '',
      emailError: '',
    }));
    if (password !== confirmPassword || password === '') {
      setMyErrors((prevState) => ({
        ...prevState,
        passwordError: 'Passwords dont match',
      }));
      return;
    } else if (!isValidEmail(email)) {
      setMyErrors((prevState) => ({
        ...prevState,
        emailError: 'Invalid emailadress',
      }));
      return;
    } else if (!isValidPhoneNumber(phoneNumber)) {
      setMyErrors((prevState) => ({
        ...prevState,
        phoneNumberError: 'Invalid phonenumber',
      }));
      return;
    } else {
      try {
        const response = await fetch('http://localhost:8080/create', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            userName: userName,
            email: email,
            password: password,
            phoneNumber: phoneNumber,
          }),
        });
        console.log(response);
        if (response.ok) {
          console.log('Skapat');
          navigate('/SignIn');
        } else {
          console.log('Inte skapat');
        }
      } catch (error) {
        console.log('fel');
      }
    }
  };
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

  return (
    <div>
      <div className="flex items-center justify-center">
        <div className="w-[65%] max-w-md">
          <img
            src={signUpNinja}
            alt="Ninja Taskmaster"
            className="my-[30px] w-full"
          />
          <form onSubmit={handleSubmit} className="mx-auto ">
            <label>
              <h2>Enter first and last name</h2>
              <input
                name="userName"
                placeholder="Example Examplesson"
                value={userName}
                className="placeholder-italic my-[13px] w-full rounded-[25px] border-2 border-secondary px-[32px] py-[8px]"
                style={{ fontStyle: 'italic' }}
                onChange={(e) => setUserName(e.target.value)}
              />
            </label>
            {myErrors.emailError ? (
              <div className="text-red-500">{myErrors.emailError}</div>
            ) : (
              <h2>Enter email address</h2>
            )}
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
            <label className="h-fit">
              {myErrors.phoneNumberError ? (
                <div className="text-red-500">{myErrors.phoneNumberError}</div>
              ) : (
                <h2 className="mr-2">Enter phone number</h2>
              )}
              <input
                className="placeholder-italic my-[13px] w-full rounded-[25px] border-2 border-secondary px-[32px] py-[8px]"
                style={{ fontStyle: 'italic' }}
                name="phoneNumber"
                placeholder="0000-000000"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
              />
            </label>
            <label>
              {myErrors.passwordError ? (
                <div className="text-red-500">{myErrors.passwordError}</div>
              ) : (
                <h2>Enter password</h2>
              )}
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
            <label>
              <h2>Confirm password</h2>
              <input
                name="confirmPassword"
                placeholder="Example1"
                type="password"
                value={confirmPassword}
                className="placeholder-italic my-[13px] w-full rounded-[25px] border-2 border-secondary px-[32px] py-[8px]"
                style={{ fontStyle: 'italic' }}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </label>
            <div className="text-center">
              <div className="my-3 font-light">
                Do you already have an account?
              </div>
              <a href="/#/signIn" className="font-light text-[#6757C8] ">
                Sign in
              </a>
            </div>
            <div className="text-center">
              <input
                type="submit"
                className="btn text-primary my-[24px] cursor-pointer rounded-[25px] border-2 border-none bg-secondary px-[33px] py-[15px] text-white"
                value="Sign up"
              />
            </div>
          </form>
        </div>
      </div>
      <div className="mx-auto w-[80%]">
        <div className="absolute bottom-0  mx-auto w-[80%]  text-center">
          <footer className="grid grid-cols-3">
            <div className="flex items-center  gap-2">
              {/* <img src={ninja} alt="" /> */}
              <p className="bg-gradient-to-b from-linear1 to-linear2 bg-clip-text font-header text-3xl text-transparent ">
                Ninja Taskmaster
              </p>
            </div>
            <div className="contact mt-8 flex flex-col gap-2">
              <p style={{ textAlign: 'left' }} className="text-xl text-black">
                Contact us:
              </p>
              <p style={{ textAlign: 'left' }} className="text-email text-xl">
                help@ninjataskmaster.com
              </p>
              <p
                style={{ textAlign: 'left' }}
                className="mt-2 text-xl text-black"
              ></p>
            </div>
            <div className="contact mt-8 flex flex-col gap-2">
              Join Our Social Community
              <div className="mt-2 flex gap-5">
                {/* <img src={linkedin} alt="" />
              <img src={facebook} alt="" />
              <img src={instagram} alt="" />
              <img src={twitter} alt="" /> */}
              </div>
            </div>
          </footer>
        </div>
      </div>
    </div>
  );
}

export default App;
