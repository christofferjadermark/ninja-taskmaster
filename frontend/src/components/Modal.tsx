import React, { useState } from 'react';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import 'tailwindcss/tailwind.css';
import checkmark from '../images/check.svg';
import trashcan from '../images/trashcan.svg';
import closedoor from '../images/closedoor.svg';

interface ModalProps {
  selectedTask: number | null;
  handleDelete: () => void;
  handleTaskCompletion: (taskId: number) => void; // Added handleTaskCompletion prop
}

const Modal: React.FC<ModalProps> = ({ selectedTask, handleDelete, handleTaskCompletion }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);

  const toggleModal = () => {
    setIsOpen(!isOpen);
  };

  const handleMarkAsDone = () => {
    if (selectedTask !== null) {
      handleTaskCompletion(selectedTask);
      setIsCompleted(true);
    }
  };
  
  const handleDeleteOrMarkAsDone = () => {
    if (isCompleted) {
      handleDelete();
    } else if (selectedTask !== null) {
      handleTaskCompletion(selectedTask);
    }
  };
  

  return (
    <div>
      <MoreVertIcon
        color="primary"
        style={{ color: '#898989' }}
        className="cursor-pointer"
        onClick={toggleModal}
      />

      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center">
          <div className="flex items-center justify-center px-4 py-8">
            <div className="rounded-3xl bg-white p-9 text-black shadow-2xl">
              <div className="pt-4 font-inter text-xl font-medium leading-none">
                Selected task will be
              </div>
              <div>
                <div className="mb-9 mt-9 flex flex-row items-center">
                  <input
                    type="checkbox"
                    checked={isCompleted}
                    onChange={() => setIsCompleted(!isCompleted)}
                    className="mr-2"
                  />
                  <img src={checkmark} alt="" className="w-4 h-4" />
                  <div className="text-center font-inter text-sm font-normal">
                    Mark as Done
                  </div>
                </div>
                <div className="flex flex-row items-center">
                  <img src={checkmark} alt="" className="w-4 h-4" />
                  <div
                    onClick={handleDeleteOrMarkAsDone}
                    className="text-center font-inter text-sm font-normal cursor-pointer"
                  >
                    {isCompleted ? 'Delete' : 'Mark as Done'}
                  </div>
                </div>
              </div>
              <div
                onClick={toggleModal}
                className="mt-9 flex cursor-pointer flex-row items-center"
              >
                <img className="mr-4 w-[24px]" src={closedoor} alt="" />
                <div
                  onClick={toggleModal}
                  className="cursor-pointer text-center font-inter text-sm font-normal"
                >
                  Back
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Modal;
