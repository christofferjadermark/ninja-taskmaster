import { useEffect, useState } from 'react';
import Header from '../components/Header';
import homeNinja from '../images/homeNinja.svg';
import Button from '../components/Button';
import { Link } from 'react-router-dom';
import '@mui/material';
import Modal from '../components/Modal';
import React from 'react';

interface Activity {
  activity_id: number;
  due_date: string;
  title: string;
  description: string;
  user_id: number;
}

function HomePage() {
  const [selectedTask, setSelectedTask] = useState<number | null>(null);
  const [data, setData] = useState<Activity[]>([]);
  const [username, setUsername] = useState('');

  const handleDelete = () => {
    if (selectedTask) {
      fetch('http://localhost:8080/delete/' + selectedTask, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      })
        .then((res) => {
          console.log(res);
          if (res.status === 200) {
            console.log('success');
            window.location.reload();
          } else {
            console.log('error');
          }
        })
        .catch((err) => console.log(err));
    }
  };

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
          setData(data);
          setUsername(data[0]?.username || '');
          console.log(data);
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
        <div className="flex w-[317px] items-center justify-between">
          <h1 className="mr-auto font-inter text-3xl font-medium">
            Today's Task's
          </h1>
          <div>
            <Modal />
          </div>
        </div>
      </div>

      <div className="mt-4 flex w-screen flex-col items-center gap-4">
        {' '}
        {data.map((item, index) => (
          <>
            <div className="flex items-center">
              <div className="flex items-center justify-center">
                {/* RADIO BUTTONS START */}
                <div className="relative flex h-4 w-4 flex-shrink-0  items-center justify-center rounded-full bg-white dark:bg-gray-100">
                  <input
                    value={item.activity_id}
                    onChange={(e) => setSelectedTask(Number(e.target.value))}
                    type="radio"
                    name="radio"
                    className="checkbox absolute mr-7 h-full w-full cursor-pointer appearance-none rounded-full border checked:border-none focus:outline-none"
                  />
                  <div className="check-icon z-1 hidden h-full w-full rounded-full border-4" />
                </div>
                {/* RADIO BUTTONS END */}
                <div className="flex h-[55px] w-[290px] items-center justify-around rounded-3xl border-2 border-secondary bg-white">
                  <React.Fragment key={item.activity_id}>
                    <p className="font-inter text-xl font-medium">
                      {new Date(item.due_date).toLocaleTimeString()}
                    </p>
                    <p className="font-inter text-xl font-light">
                      {item.title}
                    </p>
                  </React.Fragment>
                  <div>Items</div>
                </div>
              </div>
            </div>
            <button
              onClick={handleDelete}
              className="mx-2 my-2 rounded border border-gray-300 bg-white px-6 py-2 text-xs text-gray-800 transition duration-150 ease-in-out focus:outline-none"
            >
              Delete task
            </button>
          </>
        ))}
      </div>
    </div>
  );
}
export default HomePage;