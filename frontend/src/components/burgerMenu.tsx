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
    <>
      <div className="lg:hidden">
        <div
          className={`fixed left-0 top-0  h-full w-full transition-all  ${
            isOpen ? 'bg-[#00000080]' : 'z-[-100] hidden bg-[#00000000]'
          }`}
          onClick={toggleMenu}
        ></div>
        <button onClick={toggleMenu} className="relative z-20 cursor-pointer">
          <img src={menu} alt="" className="my-auto" />
        </button>
        <div
          className={`menu bg-red fixed right-0 z-[2000px]  mt-[20px] transform   transition-transform duration-300 ease-in-out ${
            isOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
        >
          <nav className="">
            <ul>
              <li>
                <a
                  href="#/Calenderpage"
                  className=" my-auto mb-2 ml-[10px] flex h-11 items-center rounded-l-[25px] border-[2px] border-r-0 border-white bg-secondary pr-20 text-white transition-all hover:translate-x-3"
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
                  className="my-auto mb-2 ml-[10px] flex h-11 items-center rounded-l-[25px] border-[2px] border-r-0 border-white bg-secondary  text-white transition-all hover:translate-x-3"
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
                  href="#/HomePage"
                  className="my-auto mb-2 ml-[10px] flex h-11 items-center rounded-l-[25px] border-[2px] border-r-0 border-white bg-secondary  text-white transition-all hover:translate-x-3"
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
                  href="#/signIn"
                  onClick={() => localStorage.removeItem('user_id')}
                  className="my-auto mb-2 ml-[10px] flex h-11 items-center rounded-l-[25px] border-[2px] border-r-0 border-white bg-secondary  text-white transition-all hover:translate-x-3"
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

      <nav className="hidden lg:block">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between py-4">
            <div className="text-xl font-bold text-white">Logo</div>
            <ul className="flex space-x-4">
              <li>
                <a href="#/homePage" className="hover:text-gray-400">
                  Home
                </a>
              </li>
              <li>
                <a href="#/account" className="hover:text-gray-400">
                  My account
                </a>
              </li>
              <li onClick={() => localStorage.removeItem('user_id')}>
                <a href="#/signIn" className="hover:text-gray-400">
                  Logout
                </a>
              </li>
              <li>
                <a href="#/Calenderpage" className="hover:text-gray-400">
                  Calender
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
};

export default BurgerMenu;
