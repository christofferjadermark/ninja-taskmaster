import { useState, MouseEvent } from 'react';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import 'tailwindcss/tailwind.css';
import check from '../images/check.svg';
import trashcan from '../images/trashcan.svg';
import closedoor from '../images/closedoor.svg';

const Modal = () => {
  const [isOpen, setIsOpen] = useState(false);

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  const handleBackClick = (e: MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    closeModal();
  };

  return (
    <div>
      <MoreVertIcon
        color="primary"
        style={{ color: '#898989' }}
        className="cursor-pointer"
        onClick={openModal}
      />

      {isOpen && (
        <div
          className="fixed inset-0 flex items-center justify-center"
          onClick={closeModal}
        >
          <div className="fixed inset-0"></div>

          <div className="flex items-center justify-center px-4 py-8">
            <div className="rounded-3xl bg-white p-9 text-black shadow-2xl">
              <div className="pt-4 font-inter text-xl font-medium leading-none">
                Selected task will be
              </div>
              <div>
                <div className="mb-9 mt-9 flex flex-row items-center">
                  <img className="mr-4 w-[24px]" src={check} alt="" />
                  <div className="text-center font-inter text-sm font-normal">
                    Marked as done
                  </div>
                </div>
                <div className="flex flex-row items-center">
                  <img className="mr-4 w-[24px]" src={trashcan} alt="" />
                  <div className="text-center font-inter text-sm font-normal">
                    Delete
                  </div>
                </div>
              </div>
              <div className="mt-9 flex cursor-pointer flex-row items-center">
                <img className="mr-4 w-[24px]" src={closedoor} alt="" />
                <div
                  onClick={handleBackClick}
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
