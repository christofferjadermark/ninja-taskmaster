import React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import signUpNinja from "./images/signUp.svg"
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
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  useEffect(() => {
    if(localStorage.getItem("user_id")){
      redirectToHome()
    }
  })

  if (localStorage.getItem("isLogedIn") && localStorage.getItem("isLogedIn") === "true"){
    redirectToHome();
  }

  return (
<div className="flex justify-center items-center">
  <div className="max-w-md w-[65%]">
    <img src={signUpNinja} alt="Ninja Taskmaster" className="my-[30px]"/>
    <form
      className="mx-auto "
      action="http://localhost:8080/create"
      method="POST"
    >
      <label>
        <h2>Enter first and last name</h2>
        <input
          name="userName"
          placeholder="Example Examplesson"
          value={userName}
          className="border-2 border-secondary rounded-[25px] px-[32px] py-[8px] my-[13px] placeholder-italic w-full"
          style={{ fontStyle: "italic" }}
          onChange={(e) => setUserName(e.target.value)}
        />
      </label>
      <h2>Enter email address</h2>
      <label>
        <input
          className="border-2 border-secondary rounded-[25px] px-[32px] py-[8px] my-[13px] placeholder-italic w-full"
          style={{ fontStyle: "italic" }}
          name="email"
          placeholder="Example@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </label>
      <label className="h-fit">
        <h2 className="mr-2">Enter phone number</h2>
        <input
          className="border-2 border-secondary rounded-[25px] px-[32px] py-[8px] my-[13px] placeholder-italic w-full"
          style={{ fontStyle: "italic" }}
          name="email"
          placeholder="0000-000000"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
        />
      </label>
      <label>
        <h2>Enter password</h2>
        <input
          name="password"
          placeholder="Example1"
          type="password"
          value={password}
          className="border-2 border-secondary rounded-[25px] px-[32px] py-[8px] my-[13px] placeholder-italic w-full"
          style={{ fontStyle: "italic" }}
          onChange={(e) => setPassword(e.target.value)}
        />
      </label>
      <label>
        <h2>Confirm password</h2>
        <input
          name="password"
          placeholder="Example1"
          type="password"
          value={confirmPassword}
          className="border-2 border-secondary rounded-[25px] px-[32px] py-[8px] my-[13px] w-full placeholder-italic"
          style={{ fontStyle: "italic" }}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
      </label>
      <div className="text-center">
        <input
          type="submit"
          className="btn bg-secondary text-primary cursor-pointer border-2 border-none rounded-[25px] px-[33px] py-[15px] my-[54px]"
          value="Sign up"
        />
      </div>
    </form>
  </div>
</div>
  );
}

export default App;
