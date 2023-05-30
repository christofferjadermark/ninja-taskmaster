import React from 'react';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../index.css';
import closeSvg from '../images/close.svg';
import { on } from 'events';
function useRedirect() {
  const navigate = useNavigate();
  const redirectToHome = () => {
    navigate('/HomePage');
  };
  return redirectToHome;
}
interface MyComponentProps {
  onVariableChange: (value: boolean) => void;
  onDateChange: (value: string) => void;
  onRepeatTypeChange: (value: string) => void;
}
const App: React.FC<MyComponentProps> = ({
  onVariableChange,
  onDateChange,
  onRepeatTypeChange,
}) => {
  const redirectToHome = useRedirect();

  const [repeatType, setRepeatType] = useState('Week');
  const [endDate, setEndDate] = useState('');
  const [endReoccurance, setEndReoccurance] = useState('1');
  const [option, setOption] = useState('');
  const [date, setDate] = useState([]);
  const handleOptionChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setRepeatType(event.target.value);
  };

  const handleClick = () => {
    const variableValue = false;
    onVariableChange(variableValue);
  };
  const handleSubmit = () => {
    if (option === 'date') {
      onDateChange(endDate);
    } else if (option === 'reoccurance') {
      onDateChange(endReoccurance.toString());
    }
    onRepeatTypeChange(repeatType);
    onVariableChange(false);
  };
  useEffect(() => {
    if (!localStorage.getItem('user_id')) {
      redirectToHome();
    }
  });

  if (
    localStorage.getItem('isLogedIn') &&
    localStorage.getItem('isLogedIn') === 'true'
  ) {
    redirectToHome();
  }
  return (
    <div>
      <img
        onClick={handleClick}
        src={closeSvg}
        alt="Close"
        className=" ml-auto py-6 "
      />
      <div className="flex h-[60px] bg-gradient-to-b from-linear1  to-linear2">
        <div className="my-auto ml-[33px] w-full border-none bg-transparent text-[30px] text-white ">
          My Account
        </div>
      </div>
      <div className="ml-[33px] mt-[34px]">
        <div className="my-auto mr-[10px]  mt-[20px] text-left text-[20px]">
          Repeat every
        </div>
        <div className="mt-[10px] flex">
          <select
            value={repeatType}
            onChange={handleOptionChange}
            className="text-primary maxlength-2 w-[120px] rounded-[10px] border-[3px] border-secondary bg-transparent px-4 py-2"
          >
            <option value="Week">Week</option>
            <option value="Day">Day</option>
            <option value="Month">Month</option>
          </select>
        </div>
        <div className="my-auto mr-[10px]  mt-[30px] text-left text-[20px]">
          Ends
        </div>
        <div className="">
          {/* {options.map((option) => ( */}
          {/* <label className="mt-2 "> */}
          <div className="mt-[10px] flex items-center">
            <input
              type="radio"
              name="radioGroup"
              value={'date'}
              // checked={selectedOption === option.id}
              onChange={(e) => setOption(e.target.value)}
              className="mr-2  checked:bg-secondary focus:bg-secondary focus:ring-secondary"
            />
            <p className="mr-[10px]">On</p>
            <input
              value={endDate}
              type="date"
              onChange={(e) => setEndDate(e.target.value)}
              className="my-auto rounded-[10px] border-[3px] border-secondary"
            />
          </div>
          <div className="mt-[20px] flex items-center">
            <input
              type="radio"
              name="radioGroup"
              value={'reoccurance'}
              // checked={selectedOption === option.id}
              onChange={(e) => setOption(e.target.value)}
              className="mr-2 selection:bg-secondary checked:bg-secondary focus:bg-secondary focus:ring-2 focus:ring-secondary "
            />
            <p className="mr-[10px]">After</p>
            <input
              value={endReoccurance}
              onChange={(e) => setEndReoccurance(e.target.value)}
              type="number"
              className="my-auto w-[70px] rounded-[10px] border-[3px] border-secondary"
            />
            <p className="ml-[10px]">reoccurance</p>
          </div>
        </div>
        <input
          onClick={handleSubmit}
          type="submit"
          value="Confirm"
          className="text-primary ml-auto mr-[50px] mt-[20px] flex cursor-pointer items-center rounded-[25px] bg-secondary px-6 py-2 text-white"
        />
      </div>
    </div>
  );
};

export default App;
