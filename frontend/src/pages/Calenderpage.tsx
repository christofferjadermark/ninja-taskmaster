import React, { useEffect, useState } from 'react';
import Header from '../components/Header';
import '@mui/material';
import 'react-datepicker/dist/react-datepicker.css';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import '../styles/CalenderDot.css';
import Modal from '../components/Modal';


interface Activity {
  activity_id: number;
  start_date: string;
  due_date: string;
  title: string;
  description: string;
  user_id: number;
  category_id: number;
}

function CalenderPage() {
  const [selectedTask, setSelectedTask] = useState<number[]>([]);
  const [data, setData] = useState<Activity[]>([]);
  const [username, setUsername] = useState('');
  const [category, setCategory] = useState('#ffffff');
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [showTasks, setShowTasks] = useState<{ date: Date | null; visible: boolean }>({
    date: null,
    visible: false,
  });

  const handleDelete = () => {
    if (selectedTask.length > 0) {
      Promise.all(
        selectedTask.map((taskId) =>
          fetch('http://localhost:8080/delete/' + taskId, {
            method: 'DELETE',
            headers: {
              'Content-Type': 'application/json',
            },
          })
        )
      )
        .then((responses) => {
          console.log(responses);
          const successfulResponses = responses.filter(
            (res) => res.status === 200
          );
          if (successfulResponses.length === selectedTask.length) {
            console.log('success');
            setData((prevData) =>
              prevData.filter((item) => !selectedTask.includes(item.activity_id))
            );
            setSelectedTask([]); // Clear the selected tasks after deletion
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

  const handleDateChange = (value: Date | Date[] | null) => {
    if (value instanceof Date) {
      setSelectedDate(value);
      setShowTasks({ date: value, visible: true });
    }
  };

  const tileContent = ({ date, view }: { date: Date; view: string }) => {
    const formattedDate = date.toDateString();
    const tasks = data.filter(
      (item) => new Date(item.due_date).toDateString() === formattedDate
    );

    if (tasks.length > 0 && view === 'month') {
      const dotColors = tasks.map((task) => getCategoryColor(task.category_id));

      return (
        <div className="dot-container">
          {dotColors.map((color, index) => (
            <div
              key={index}
              className="dot"
              style={{ backgroundColor: color }}
            />
          ))}
        </div>
      );
    }

    return null;
  };

  const getCategoryColor = (categoryId: number): string => {
    if (categoryId === 1) {
      return '#F17B25'; // Work color
    } else if (categoryId === 2) {
      return '#A3CDFF'; // Free time color
    } else if (categoryId === 3) {
      return '#017A5D'; // School color
    }

    return '#000000'; // Default color if category ID is not matched
  };

  const handleRadioChange = (taskId: number) => {
    if (selectedTask.includes(taskId)) {
      setSelectedTask((prevSelectedTasks) =>
        prevSelectedTasks.filter((id) => id !== taskId)
      );
    } else {
      setSelectedTask((prevSelectedTasks) => [...prevSelectedTasks, taskId]);
    }
  };

  return (
    <div>
      <Header />
      <div className="mt-4 flex w-screen flex-col items-center gap-4">
        <div className="">
          <div className="custom-calendar">
            <Calendar
              onChange={handleDateChange as any}
              value={selectedDate}
              tileContent={tileContent}
              tileClassName={({ date }) => {
                const formattedDate = date.toDateString();
                const hasTasks = data.some(
                  (item) =>
                    new Date(item.due_date).toDateString() === formattedDate
                );
                return hasTasks ? 'has-tasks' : '';
              }}
            />
          </div>
        </div>
        {showTasks.visible && selectedDate && (
          <>
            {data
              .filter(
                (item) =>
                  new Date(item.due_date).toDateString() ===
                  showTasks.date?.toDateString()
              )
              .map((item, index) => (
                <div key={item.activity_id} className="flex items-center">
                  {/* Task components */}
                </div>
              ))}
          </>
        )}
      </div>

      <div className="flex justify-center">
        <div className="flex w-[317px] items-center justify-between">
          <h1 className="mr-auto font-inter text-3xl font-medium">
            {selectedDate
              ? selectedDate.toLocaleDateString('en-US', {
                  month: 'long',
                  day: 'numeric',
                })
              : 'Select a date'}
          </h1>
          {selectedTask.length > 0 && (
            <button
              onClick={handleDelete}
              className="mx-2 my-2 rounded border border-gray-300 bg-white px-6 py-2 text-xs text-gray-800 transition duration-150 ease-in-out focus:outline-none"
            >
              {selectedTask.length === 1 ? 'Delete task' : 'Delete tasks'}
            </button>
          )}
          <div>
          <Modal handleDelete={handleDelete} selectedTask={0} />
          </div>
        </div>
      </div>

      <div className="mt-4 flex w-screen flex-col items-center gap-4">
        {showTasks.visible && selectedDate && (
          <>
            {data
              .filter(
                (item) =>
                  new Date(item.due_date).toDateString() ===
                  showTasks.date?.toDateString()
              )
              .map((item, index) => (
                <div key={item.activity_id} className="flex items-center">
                  <div className="relative mr-4 flex h-4 w-4 flex-shrink-0 items-center justify-center rounded-full bg-white dark:bg-gray-100">
                    <input
                      value={item.activity_id}
                      onChange={() => handleRadioChange(item.activity_id)}
                      checked={selectedTask.includes(item.activity_id)}
                      type="checkbox"
                      name="checkbox"
                      className="checkbox absolute h-full w-full cursor-pointer appearance-none rounded-full border checked:border-none focus:outline-none"
                    />
                    <div className="check-icon z-1 hidden h-full w-full rounded-full border-4" />
                  </div>
                  <div className="bg-custom-tile flex h-[55px] w-[290px] items-center justify-around rounded-3xl border-2 border-secondary">
                    <React.Fragment key={item.activity_id}>
                      <p className="text-custom-title-time font-inter text-xl font-medium">
                        {new Date(item.due_date).toLocaleTimeString([], {
                          hour: '2-digit',
                          minute: '2-digit',
                        })}
                      </p>
                      <p className="text-custom-title font-inter text-xl font-light">
                        {item.title}
                      </p>
                    </React.Fragment>
                    <div>Items</div>
                  </div>
                </div>
              ))}
          </>
        )}
      </div>
    </div>
  );
}

export default CalenderPage;
