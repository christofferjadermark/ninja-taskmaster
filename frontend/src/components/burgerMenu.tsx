import React, { useState } from 'react';
import menu from '../images/menu.svg';
import calender from '../images/calenderWhite.svg';
import home from '../images/home.svg';
import logOut from '../images/logOut.svg';
import account from '../images/account.svg';
const BurgerMenu: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="">
      <div
        className={`fixed left-0 top-0  h-full w-full transition-all  ${
          isOpen ? 'bg-[#00000080]' : 'z-[-10] bg-[#00000000]'
        }`}
        onClick={toggleMenu}
      ></div>
      <button onClick={toggleMenu} className="relative z-10 cursor-pointer">
        <img src={menu} alt="" className="my-auto" />
      </button>
      <div
        className={`menu bg-red fixed right-0  mt-[20px] transform   transition-transform duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <nav>
          <ul>
            <li>
              <a
                href="#"
                className=" my-auto mb-2 ml-[10px] flex flex h-11 items-center items-center rounded-l-[25px] border-[2px] border-r-0 border-white bg-secondary pr-20 text-white transition-all hover:translate-x-3"
              >
                <img
                  src={calender}
                  className="my-auto ml-[10px] inline-block h-5 w-5"
                  alt=""
                />
                <span className="ml-2">Calender</span>
              </a>
            </li>
            <li>
              <a
                href="#/account"
                className="my-auto mb-2 ml-[10px] flex flex h-11 items-center items-center rounded-l-[25px] border-[2px] border-r-0 border-white bg-secondary  text-white transition-all hover:translate-x-3"
              >
                <img
                  src={account}
                  className="my-auto ml-[10px] inline-block h-5 w-5"
                  alt=""
                />
                <span className="ml-2">Account</span>
              </a>
            </li>
            <li>
              <a
                href="#"
                className="my-auto mb-2 ml-[10px] flex flex h-11 items-center items-center rounded-l-[25px] border-[2px] border-r-0 border-white bg-secondary  text-white transition-all hover:translate-x-3"
              >
                <img
                  src={calender}
                  className="my-auto ml-[10px] inline-block h-5 w-5"
                  alt=""
                />
                <span className="ml-2">Calender</span>
              </a>
            </li>
            <li>
              <a
                href="#/HomePage"
                className="my-auto mb-2 ml-[10px] flex flex h-11 items-center items-center rounded-l-[25px] border-[2px] border-r-0 border-white bg-secondary  text-white transition-all hover:translate-x-3"
              >
                <img
                  src={home}
                  className="my-auto ml-[10px] inline-block h-5 w-5"
                  alt=""
                />
                <span className="ml-2">Home</span>
              </a>
            </li>
            <li>
              <a
                href="#/landing"
                onClick={() => localStorage.removeItem('user_id')}
                className="my-auto mb-2 ml-[10px] flex flex h-11 items-center items-center rounded-l-[25px] border-[2px] border-r-0 border-white bg-secondary  text-white transition-all hover:translate-x-3"
              >
                <img
                  src={logOut}
                  className="my-auto ml-[10px] inline-block h-5 w-5"
                  alt=""
                />
                <span className="ml-2">Log Out</span>
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default BurgerMenu;
