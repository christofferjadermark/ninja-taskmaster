import { useState, useEffect, FormEvent, ChangeEvent } from 'react';
import closeSvg from '../images/close.svg';
import burger from '../images/addTaskBurger.svg';
import arrow from '../images/arrow.svg';
import clock from '../images/clock.svg';
import repeat from '../images/repeat.svg';
import calender from '../images/calender.svg';
import pen from '../images/pen.svg';
import flag from '../images/flag.svg';
function App() {
  const [data, setData] = useState([]);
  const [hour, setHour] = useState('');
  const [minute, setMinute] = useState('');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [categoryIsOpen, setCategoryIsOpen] = useState(false);

  useEffect(() => {
    if (localStorage.getItem('user_id')) {
      fetch('http://localhost:8080/' + localStorage.getItem('user_id'))
        .then((response) => response.json())
        .then((result) => {
          setData(result);
          console.log(result);
        })
        .catch((error) => console.error(error));
    }
  }, []);
  const handleClick = () => {
    setIsOpen(!isOpen);
  };
  const handleCategoryClick = () => {
    setCategoryIsOpen(!categoryIsOpen);
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:8080/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          user_id: localStorage.getItem('user_id'),
          title: title,
          description: description,
          date: date,
        }),
      });
      console.log(response);
      if (response.ok) {
        console.log('Tillagd');
      } else {
        console.log('Inte tillagd');
      }
    } catch (error) {
      console.log('fel');
    }
  };
  const handleHourChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value.slice(0, 2); // Begränsa till 2 tecken

    if (/^\d{0,2}$/.test(value)) {
      const parsedValue = parseInt(value, 10);
      const sanitizedValue = isNaN(parsedValue)
        ? ''
        : Math.min(parsedValue, 23).toString();
      setHour(sanitizedValue);
    }
  };
  const handleMinuteChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value.slice(0, 2); // Begränsa till 2 tecken

    if (/^\d{0,2}$/.test(value)) {
      const parsedValue = parseInt(value, 10);
      const sanitizedValue = isNaN(parsedValue)
        ? ''
        : Math.min(parsedValue, 59).toString();
      setMinute(sanitizedValue);
    }
  };
  const handleDelete = (activity: number) => {
    fetch('http://localhost:8080/delete/' + activity, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((data: any) => {
        console.log('Objektet har tagits bort:', data);
      })
      .catch((error: Error) => {
        console.error('Fel vid borttagning av objektet:', error);
      });
  };

  return (
    <div>
      <div className="flex h-[100px]">
        <img src={closeSvg} alt="Close" className=" ml-auto py-6 " />
      </div>
      <form
        className="mx-auto max-w-md rounded-md text-[20px] "
        onSubmit={handleSubmit}
      >
        <div className="flex h-[60px] bg-gradient-to-b from-linear1  to-linear2">
          <input
            className="my-auto ml-[33px] w-full bg-transparent text-[30px] text-white placeholder:text-white focus:outline-none"
            type="text"
            id="title"
            placeholder="Add title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <div className="my-auto ml-auto mr-[50px]">
            <img src={pen} className="h-[35px]" alt="" />
          </div>
        </div>
        <div className="ml-[33px] mt-[34px] flex">
          <div className="my-auto mr-[10px]">Time</div>
          <input
            type="text"
            id="hour"
            className="text-primary maxlength-2 w-[65px] rounded-[25px] border-[3px] border-secondary bg-transparent px-4 py-2"
            placeholder="07"
            value={hour}
            onChange={handleHourChange}
          />
          <input
            type="text"
            id="minute"
            className="text-primary w-[65px] rounded-[25px] border-[3px] border-secondary bg-transparent px-4 py-2"
            placeholder="00"
            value={minute}
            onChange={handleMinuteChange}
          />
        </div>
        <div className="ml-[33px] mt-[20px] w-[80%] border-[1px] border-gray-300"></div>
        <div className="ml-[33px] mt-[20px] flex w-[80%]" onClick={handleClick}>
          <img src={burger} alt="" />
          <div className="ml-[9px] text-[16px]">Add information</div>
          <div className="ml-auto">
            <img src={arrow} alt="" />
          </div>
        </div>
        <div
          className={` ${
            isOpen ? 'h-[200px] opacity-100' : ' invisible h-[0px] opacity-0'
          } overflow-hidden transition-all duration-500 ease-in-out `}
        >
          <textarea
            placeholder="Write hear..."
            className=" ml-[33px] mt-[20px] h-[180px] w-[80%] resize-none rounded-[25px] border-[1px] border-secondary px-2 py-1 pl-[33px] text-gray-800 placeholder:text-[16px] focus:outline-none"
          ></textarea>{' '}
        </div>
        <div className="ml-[33px] mt-[20px] w-[80%] border-[1px] border-gray-300"></div>
        <div
          className="ml-[33px] mt-[20px] flex w-[80%]"
          onClick={handleCategoryClick}
        >
          <img src={burger} alt="" />
          <div className="ml-[9px] text-[16px]">Category</div>
          <div className="ml-auto">
            <img src={arrow} alt="" />
          </div>
        </div>
        <div
          className={` ${
            categoryIsOpen
              ? 'h-[200px] opacity-100'
              : ' invisible h-[0px] opacity-0'
          } overflow-hidden transition-all duration-500 ease-in-out `}
        >
          <textarea
            placeholder="Write hear..."
            className=" ml-[33px] mt-[20px] h-[180px] w-[80%] resize-none rounded-[25px] border-[1px] border-secondary px-2 py-1 pl-[33px] text-gray-800 placeholder:text-[16px] focus:outline-none"
          ></textarea>{' '}
        </div>
        <div className="ml-[33px] mt-[20px] w-[80%] border-[1px] border-gray-300"></div>
        <div className="ml-[33px] mt-[20px] flex w-[80%]">
          <img src={clock} alt="" />
          <div className="ml-[9px] text-[16px]">All day</div>
          <div className="ml-auto">
            <img src={arrow} alt="" />
          </div>
        </div>
        <div className="ml-[33px] mt-[20px] w-[80%] border-[1px] border-gray-300"></div>
        <div className="ml-[33px] mt-[20px] flex w-[80%]">
          <img src={calender} alt="" />
          <div className="ml-[9px] text-[16px]">Mon, 4 November 2024</div>
          <div className="ml-auto">
            <img src={arrow} alt="" />
          </div>
        </div>
        <div className="ml-[33px] mt-[20px] w-[80%] border-[1px] border-gray-300"></div>
        <div className="ml-[33px] mt-[20px] flex w-[80%]">
          <img src={repeat} alt="" />
          <div className="ml-[9px] text-[16px]">Does not repeat</div>
          <div className="ml-auto">
            <img src={arrow} alt="Arrow" />
          </div>
        </div>
        <div className="ml-[33px] mt-[20px] w-[80%] border-[1px] border-gray-300"></div>
        <button className="ml-[33px] mt-[20px] flex items-center rounded-[25px] border-[1px] border-secondary px-4 py-2">
          <img src={flag} alt="Flag" className="mr-2 h-4 w-4" />
          <span className="text-primary">Add priority</span>
        </button>
        <button className="ml-auto mr-[50px] mt-[20px] flex items-center rounded-[25px] bg-secondary px-6 py-2 text-white">
          <span className="text-primary">Save</span>
        </button>
        {/* <div className="mb-4">
          <label htmlFor="title" className="block text-gray-700">
            Title
          </label>
          <input
            type="text"
            id="title"
            className="form-input mt-1 block w-full rounded-md border-gray-300 focus:border-sky-500 focus:outline-none focus:ring"
            placeholder="Enter title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label htmlFor="description" className="block text-gray-700">
            Description
          </label>
          <input
            type="text"
            id="description"
            className="form-input mt-1 block w-full rounded-md border-gray-300 focus:border-sky-500 focus:outline-none focus:ring"
            placeholder="Enter description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label htmlFor="date" className="block text-gray-700">
            Date
          </label>
          <input
            type="date"
            id="date"
            className="form-input mt-1 block w-full rounded-md border-gray-300 focus:border-sky-500 focus:outline-none focus:ring"
            placeholder="Select date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </div>
        <button
          type="submit"
          className="btn text-primary rounded-md bg-secondary px-4 py-2 hover:bg-blue-600"
        >
          Skicka
        </button> */}
      </form>
    </div>
  );
}

export default App;
