import { useState, useEffect, FormEvent, ChangeEvent } from 'react';
import closeSvg from '../images/close.svg';
import burger from '../images/addTaskBurger.svg';
import arrow from '../images/arrow.svg';
import clock from '../images/clock.svg';
import repeat from '../images/repeat.svg';
import calender from '../images/calender.svg';
import pen from '../images/pen.svg';
import flag from '../images/flag.svg';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useParams } from 'react-router-dom';
// import { setPriority } from 'os';

function App() {
  const [hour, setHour] = useState(JSON.stringify(new Date().getHours()));
  const [minute, setMinute] = useState(JSON.stringify(new Date().getMinutes()));
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [categoryIsOpen, setCategoryIsOpen] = useState(false);
  const [category, setCategory] = useState('#ffffff');
  const [priority, setPriority] = useState(false);
  const [categoryStyle, setCategoryStyle] = useState(
    'h-[25px] w-[25px] rounded-full border-[2px] border-black bg-[' +
      category +
      ']'
  );
  const [allDay, setAllDay] = useState(false);
  console.log(allDay);
  const [data, setData] = useState('');
  const handleToggle = () => {
    setAllDay(!allDay);
    console.log(allDay);
  };
  const { activity_id } = useParams<{ activity_id: string }>();
  console.log(activity_id + 'dsa');
  const [selectedDate, setSelectedDate] = useState(new Date());
  const handleDateChange = (date: Date) => {
    // setSelectedDate(date);
    let updatedDate = new Date(date);
    updatedDate.setHours(Number(hour));
    updatedDate.setMinutes(Number(minute));
    setSelectedDate(updatedDate);
  };
  useEffect(() => {
    try {
      fetch('http://localhost:8080/tasks/' + activity_id)
        .then((response) => response.json())
        .then((result) => {
          setData(result);
          setHour(JSON.stringify(new Date(result.due_date).getHours()));
          setMinute(JSON.stringify(new Date(result.due_date).getMinutes()));
          setTitle(result.title);
          setDescription(result.description);
          setCategory(result.category);
          setAllDay(result.all_day);
          setSelectedDate(new Date(result.due_date));
          setPriority(result.priority);
          console.log(result);
        });
    } catch (error) {
      console.log('fel');
    }
  }, []);
  useEffect(() => {
    setCategoryStyle(
      'h-[25px] w-[25px] rounded-full border-[2px] border-black bg-[' +
        category +
        ']'
    );
  }, [category]);

  const handleClick = () => {
    setIsOpen(!isOpen);
  };
  const handleCategoryClick = () => {
    setCategoryIsOpen(!categoryIsOpen);
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await fetch(
        'http://localhost:8080/tasks/' + activity_id,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            user_id: localStorage.getItem('user_id'),
            title: title,
            description: description,
            date: selectedDate,
            category: category,
            allDay: allDay,
            priority: priority,
          }),
        }
      );
      console.log(response);
      if (response.ok) {
        console.log('Uppdaterad');
      } else {
        console.log('Inte uppdaterad');
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
      let date = new Date(selectedDate);
      date.setHours(Number(sanitizedValue));
      console.log(date);
      setSelectedDate(date);
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
      let date = new Date(selectedDate);
      date.setMinutes(Number(sanitizedValue));
      console.log(date);
      setSelectedDate(date);
    }
  };

  return (
    <div>
      <a href="#/HomePage" className="flex h-[100px]">
        <img src={closeSvg} alt="Close" className=" ml-auto py-6 " />
      </a>
      <form
        className="mx-auto max-w-md rounded-md text-[20px] "
        onSubmit={handleSubmit}
      >
        <div className="flex h-[60px] bg-gradient-to-b from-linear1  to-linear2">
          <input
            className="my-auto ml-[33px] w-full border-none bg-transparent text-[30px] text-white placeholder:text-white focus:outline-none"
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
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Write hear..."
            className=" ml-[33px] mt-[20px] h-[180px] w-[80%] resize-none rounded-[25px] border-[1px] border-secondary px-2 py-1 pl-[33px] text-gray-800 placeholder:text-[16px] focus:outline-none"
          ></textarea>
        </div>
        <div className="ml-[33px] mt-[20px] w-[80%] border-[1px] border-gray-300"></div>
        <div
          className="ml-[33px] mt-[20px] flex w-[80%]"
          onClick={handleCategoryClick}
        >
          <div className={categoryStyle}></div>
          <div className=" ml-[9px] text-[16px]">Category</div>
          <div className="ml-auto">
            <img src={arrow} alt="" />
          </div>
        </div>
        <div
          className={` ${
            categoryIsOpen
              ? 'h-[170px] opacity-100'
              : ' invisible h-[0px] opacity-0'
          } overflow-hidden transition-all duration-500 ease-in-out `}
        >
          <div
            className="mt-[30px] flex cursor-pointer"
            onClick={() => setCategory('#F17B25')}
          >
            <div className="ml-[33px] h-[25px] w-[25px] rounded-full border-[2px] border-black bg-[#F17B25] "></div>
            <div className="my-auto ml-[10px] text-[16px]">Work</div>
          </div>
          <div
            className="mt-[10px] flex cursor-pointer"
            onClick={() => setCategory('#A3CDFF')}
          >
            <div className="ml-[33px] h-[25px] w-[25px] rounded-full border-[2px] border-black bg-[#A3CDFF] "></div>
            <div className="my-auto ml-[10px] text-[16px]">Free time</div>
          </div>
          <div
            className="mt-[10px] flex cursor-pointer"
            onClick={() => setCategory('#017A5D')}
          >
            <div className="ml-[33px] h-[25px] w-[25px] rounded-full border-[2px] border-black bg-[#017A5D]"></div>
            <div className="my-auto ml-[10px] text-[16px]">School</div>
          </div>
          <div
            className="mt-[10px] flex cursor-pointer"
            onClick={() => setCategory('#fffff')}
          >
            <div className="ml-[33px] h-[25px] w-[25px] rounded-full border-[2px] border-black bg-[#fffff]"></div>
            <div className="my-auto ml-[10px] text-[16px]">Other</div>
          </div>
        </div>
        <div className="ml-[33px] mt-[20px] w-[80%] border-[1px] border-gray-300"></div>
        <div className="ml-[33px] mt-[20px] flex w-[80%]">
          <img src={clock} alt="" />
          <div className="my-auto ml-[9px] text-[16px]">All day</div>
          <div className="ml-auto">
            <div
              onClick={handleToggle}
              className={`${
                allDay ? 'bg-secondary' : 'bg-gray-300'
              } h-6 w-12 rounded-full  transition-colors duration-300 focus:outline-none`}
            >
              <span
                className={`${
                  allDay ? 'translate-x-[25px]' : 'translate-x-[0px]'
                } inline-block h-6 w-6 transform rounded-full bg-white shadow transition-transform duration-300`}
              ></span>
            </div>
          </div>
        </div>
        <div className="ml-[33px] mt-[20px] w-[80%] border-[1px] border-gray-300"></div>
        <div className="form-group ml-[33px] mt-[20px] flex w-[80%]">
          <img src={calender} alt="" />
          <div className="flex items-center">
            <DatePicker
              selected={selectedDate}
              onChange={handleDateChange}
              className="custom-datepicker w-full rounded-md border border-gray-300 px-4 py-2 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
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
        <div
          onClick={(e) => {
            e.stopPropagation(); // Stoppar händelsepropagering här
            setPriority(!priority);
          }}
          // className="ml-[33px] mt-[20px] flex w-[170px] items-center rounded-[25px] border-[1px] border-secondary px-4 py-2 "
          className={`${
            priority ? 'bg-secondary' : 'bg-transparent'
          } ml-[33px] mt-[20px] flex w-[170px] cursor-pointer items-center rounded-[25px] border-[1px] border-secondary px-4 py-2`}
        >
          <img src={flag} alt="Flag" className="m-auto mr-2 h-4 w-4" />
          <span className="text-primary m-auto">Add priority</span>
        </div>
        <input
          type="submit"
          value="Save"
          className="text-primary ml-auto mr-[50px] mt-[20px] flex cursor-pointer items-center rounded-[25px] bg-secondary px-6 py-2 text-white"
        />
      </form>
    </div>
  );
}

export default App;