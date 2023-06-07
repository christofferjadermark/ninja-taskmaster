import 'tailwindcss/tailwind.css';
import BurgerMenu from './burgerMenu';
import Ninja from '../images/ninja.svg';
function Header() {
  return (
    <div className="header mx-auto mt-[30px] flex w-[80%] items-center justify-center gap-2">
      <img src={Ninja} alt="" />
      <h1 className="main-header text-3xl">
        <span className="bg-gradient-to-b from-linear1 to-linear2 bg-clip-text font-header text-transparent ">
          Ninja Taskmaster
        </span>
      </h1>
      <div className="z-10 ml-auto mt-auto">
        <BurgerMenu />
      </div>
    </div>
  );
}

export default Header;
