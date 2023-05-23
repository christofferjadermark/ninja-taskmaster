import { useState, useEffect, FormEvent, ChangeEvent } from "react";
import closeSvg from "../images/close.svg"
import burger from "../images/addTaskBurger.svg"
import arrow from "../images/arrow.svg"
import clock from "../images/clock.svg"
import repeat from "../images/repeat.svg"
import calender from "../images/calender.svg"
import pen from "../images/pen.svg"
function App() {
  const [data, setData] = useState([]);
  const [hour, setHour] = useState("");
  const [minute, setMinute] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  useEffect(() => {
    if (localStorage.getItem("user_id")) {
      fetch("http://localhost:8080/" + localStorage.getItem("user_id"))
        .then((response) => response.json())
        .then((result) => {
          setData(result);
          console.log(result);
        })
        .catch((error) => console.error(error));
    }
  }, []);
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:8080/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user_id: localStorage.getItem("user_id"),
          title: title,
          description: description,
          date: date,
        }),
      });
      console.log(response);
      if (response.ok) {
        console.log("Tillagd");
      } else {
        console.log("Inte tillagd");
      }
    } catch (error) {
      console.log("fel");
    }
  };
  const handleHourChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value.slice(0, 2); // Begränsa till 2 tecken

    if (/^\d{0,2}$/.test(value)) {
      const parsedValue = parseInt(value, 10);
      const sanitizedValue = isNaN(parsedValue) ? '' : Math.min(parsedValue, 23).toString();
      setHour(sanitizedValue);
    }
  };
  const handleMinuteChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value.slice(0, 2); // Begränsa till 2 tecken

    if (/^\d{0,2}$/.test(value)) {
      const parsedValue = parseInt(value, 10);
      const sanitizedValue = isNaN(parsedValue) ? '' : Math.min(parsedValue, 59).toString();
      setMinute(sanitizedValue);
    }
  };
  const handleDelete = (activity: number) => {
    fetch("http://localhost:8080/delete/" + activity, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data: any) => {
        console.log("Objektet har tagits bort:", data);
      })
      .catch((error: Error) => {
        console.error("Fel vid borttagning av objektet:", error);
      });
  };

  return (
    <div>
      <div className="h-[100px] flex">
      <img src={closeSvg} alt="Close" className=" py-6 ml-auto " />
      </div>
      <form
        className="mx-auto max-w-md rounded-md text-[20px] "
        onSubmit={handleSubmit}
      >
      <div className="h-[60px] bg-gradient-to-b from-linear1 to-linear2  flex">
        <input
         className="text-white text-[30px] my-auto ml-[33px] bg-transparent placeholder:text-white w-full focus:outline-none"
         type="text"
         id="title"
         placeholder="Add title"
         value={title}
         onChange={(e) => setTitle(e.target.value)}/>
         <div className="ml-auto my-auto mr-[50px]">
            <img src={pen} className="h-[35px]" alt="" />
          </div>
        </div>
        <div className="flex ml-[33px] mt-[34px]">
          <div className="my-auto mr-[10px]">Time</div>
          <input
            type="text"
            id="hour"
            className="text-primary rounded-[25px] border-[3px] border-secondary w-[65px] maxlength-2 bg-transparent px-4 py-2"
            placeholder="07"
            value={hour}
            onChange={handleHourChange}
          />
          <input
            type="text"
            id="minute"
            className="text-primary rounded-[25px] border-[3px] border-secondary w-[65px] bg-transparent px-4 py-2"
            placeholder="00"
            value={minute}
            onChange={handleMinuteChange}
          />
        </div>
        <div className="flex ml-[33px] mt-[34px] w-[80%]">
          <img src={burger} alt="" />
          <div className="text-[16px] ml-[9px]">Add information</div>
          <div className="ml-auto">
            <img src={arrow} alt="" />
          </div>
        </div>
        <div className="flex ml-[33px] mt-[34px] w-[80%]">
          <img src={burger} alt="" />
          <div className="text-[16px] ml-[9px]">Category</div>
          <div className="ml-auto">
            <img src={arrow} alt="" />
          </div>
        </div>
        <div className="flex ml-[33px] mt-[34px] w-[80%]">
          <img src={clock} alt="" />
          <div className="text-[16px] ml-[9px]">All day</div>
          <div className="ml-auto">
            <img src={arrow} alt="" />
          </div>
        </div>
        <div className="flex ml-[33px] mt-[34px] w-[80%]">
          <img src={calender} alt="" />
          <div className="text-[16px] ml-[9px]">Mon, 4 November 2024</div>
          <div className="ml-auto">
            <img src={arrow} alt="" />
          </div>
        </div>
        <div className="flex ml-[33px] mt-[34px] w-[80%]">
          <img src={repeat} alt="" />
          <div className="text-[16px] ml-[9px]">Does not repeat</div>
          <div className="ml-auto">
            <img src={arrow} alt="" />
          </div>
        </div>
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
