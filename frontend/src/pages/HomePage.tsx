import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import homeNinja from '../images/homeNinja.svg';
import Button from '../components/Button';
import Modal from '../components/Modal';

interface Activity {
  activity_id: number;
  due_date: string;
  title: string;
  description: string;
  user_id: number;
  category: string;
}

function HomePage() {
  const [selectedTasks, setSelectedTasks] = useState<number[]>([]);
  const [data, setData] = useState<Activity[]>([]);
  const [username, setUsername] = useState('');
  const [dateToShow, setDateToShow] = useState(
    new Date().toLocaleDateString('sv-SE')
  );

  const handleDelete = () => {
    console.log(selectedTasks);
    if (selectedTasks.length > 0) {
      const deletePromises = selectedTasks.map((taskId) =>
        fetch(`http://localhost:8080/delete/${taskId}`, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
          },
        })
      );

      Promise.all(deletePromises)
        .then((res) => {
          console.log(res);
          const successfulDeletions = res.filter(
            (response) => response.status === 200
          ).length;

          if (successfulDeletions === selectedTasks.length) {
            console.log('success');
            setData((prevData) =>
              prevData.filter(
                (item) => !selectedTasks.includes(item.activity_id)
              )
            );
            setSelectedTasks([]);
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
      fetch(`http://localhost:8080/${storedUser}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      })
        .then((res) => res.json())
        .then((data) => {
          setData(data);
          console.log(data);
          setUsername(data[0]?.username || '');
          console.log(data[0]?.category);
          console.log(data);
        });
    }
  }, []);

  const handleTaskSelection = (taskId: number) => {
    if (selectedTasks.includes(taskId)) {
      setSelectedTasks(selectedTasks.filter((id) => id !== taskId));
    } else {
      setSelectedTasks([...selectedTasks, taskId]);
    }
  };

  const filteredTasks = data.filter(
    (item) =>
      dateToShow === new Date(item.due_date).toLocaleDateString('sv-SE')
  );

  const sortedTasks = filteredTasks.sort(
    (a, b) => new Date(b.due_date).getTime() - new Date(a.due_date).getTime()
  );

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
          <h1 className="mr-auto font-inter text-2xl font-medium">
            Today's Tasks
          </h1>
          {selectedTasks.length > 0 && (
            <button
              onClick={handleDelete}
              className="mx-2 my-2 rounded border border-gray-300 bg-green-600 px-6 py-2 text-xs text-white transition duration-150 ease-in-out focus:outline-none"
            >
              {selectedTasks.length === 1 ? 'Delete task' : 'Delete tasks'}
            </button>
          )}
          <div>
            <Modal
              handleDelete={handleDelete}
              selectedTask={0}
              handleTaskCompletion={handleTaskSelection}
            />
          </div>
        </div>
      </div>

      {/* TASKS START */}
      <div className="mt-4 flex w-screen flex-col items-center gap-4">
        {sortedTasks.map((item, index) => (
          <div key={index} className="flex items-center">
            <div className="flex items-center justify-center">
              {/* RADIO BUTTONS START */}
              <div className="relative mr-4 flex h-4 w-4 flex-shrink-0 items-center justify-center rounded-full bg-white dark:bg-gray-100">
                <input
                  value={item.activity_id}
                  onChange={(e) =>
                    handleTaskSelection(Number(e.target.value))
                  }
                  type="checkbox"
                  checked={selectedTasks.includes(item.activity_id)}
                  className="checkbox absolute h-full w-full cursor-pointer appearance-none rounded-full border checked:border-none focus:outline-none"
                />
                <div className="check-icon z-1 hidden h-full w-full rounded-full border-4" />
              </div>
              {/* RADIO BUTTONS END */}
              <Link
                to={'/updateTask/' + item.activity_id}
                className="flex h-[55px] w-[290px] items-center justify-around rounded-3xl border-2 border-secondary bg-white"
              >
                <React.Fragment key={item.activity_id}>
                  <p className="font-inter text-xl font-medium">
                    {new Date(item.due_date).toLocaleTimeString([], {
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
                  </p>
                  <p className="font-inter text-xl font-light">
                    {item.title}
                  </p>
                </React.Fragment>
                <div>
                  <div
                    className={`h-[25px] w-[25px] rounded-full border-[2px] border-black bg-[${item.category}]`}
                  ></div>
                </div>
              </Link>
            </div>
          </div>
        ))}
      </div>
      {/* TASKS END */}
    </div>
  );
}

export default HomePage;
