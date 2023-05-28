import { useEffect, useState } from 'react';
import Header from '../components/Header';
import homeNinja from '../images/homeNinja.svg';
import Button from '../components/Button';
import { Link } from 'react-router-dom';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import BurgerMenu from '../components/burgerMenu';
import '@mui/material';

function HomePage() {
  const [data, setData] = useState([]);
  const [username, setUsername] = useState('');

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
          console.log(data);
          setData(data);
          setUsername(data[0]?.username || '');
        });
    }
  }, []);

  return (
    <div>
      <Header />

      <div className="flex flex-col">
        <h1 className="ml-[32.5px] mt-[24px] font-inter text-5xl">
          Hello, <br />
          {username}
        </h1>
        <img
          className="flex h-[168px] items-center justify-center"
          src={homeNinja}
          alt="ninja that crosses arms"
        />
      </div>
      <div className="mt-[24px] flex justify-center">
        <Link to="/addTask">
          <Button value={'Add task +'} />
        </Link>
      </div>

      <div className="flex justify-center">
        <h1>Today's Task's</h1>
        <div>
          <MoreVertIcon />
        </div>
      </div>
    </div>
  );
}
export default HomePage;
