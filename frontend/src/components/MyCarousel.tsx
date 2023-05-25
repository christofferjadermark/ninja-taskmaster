import React, { useState } from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import bigNinja from "../images/bigNinja.svg";
import clockBig from "../images/clockBig.svg";
import head from "../images/head.svg";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import Radio from "@mui/material/Radio";

function MyCarousel() {
  const [currentSlide, setCurrentSlide] = useState(0);

  const handleSlideChange = (index: number) => {
    setCurrentSlide(index);
  };

  const handleRadioChange = (index: number) => {
    setCurrentSlide(index);
  };

  const theme = createTheme({
    palette: {
      primary: {
        main: "#017A5D",
      },
      secondary: {
        main: "#4D6A6D",
      },
    },
  });

  return (
    <>
      <Carousel
        showIndicators={false}
        infiniteLoop={true}
        showStatus={false}
        showThumbs={false}
        onChange={handleSlideChange}
      >
        <div className="carousel-slide align-center flex flex-col items-center justify-center">
          <img className="max-w-[239px]" src={head} alt="hello" />
          <div className="carousel-text mt-6 font-inter text-3xl font-medium text-black">
            Slay Your Task
          </div>
          <div className="max-w-[322px] font-inter text-base font-medium text-primaryfont">
            Gather all your daily tasks in one place like millions of others and
            save your precious time
          </div>
        </div>
        <div className="carousel-slide align-center flex flex-col items-center justify-center">
          <img className="max-w-[239px]" src={clockBig} alt="hello" />
          <div className="carousel-text mt-6 font-inter text-3xl font-medium text-black">
            Save Time
          </div>
          <div className="max-w-[322px] font-inter text-base font-medium text-primaryfont">
            Gather all your daily tasks in one place like millions of others and
            save your precious time
          </div>
        </div>
        <div className="carousel-slide align-center flex flex-col items-center justify-center">
          <img className="max-w-[239px]" src={bigNinja} alt="hello" />
          <div className="carousel-text mt-6 font-inter text-3xl font-medium text-black">
            Save Time
          </div>
          <div className="max-w-[322px] font-inter text-base font-medium text-primaryfont">
            Gather all your daily tasks in one place like millions of others and
            save your precious time
          </div>
        </div>
      </Carousel>
      <div className="mt-10">
        <ThemeProvider theme={theme}>
          <Radio
            checked={currentSlide === 0}
            onChange={() => handleRadioChange(0)}
            color="primary"
            size="small"
            name="radio-button"
          />
          <Radio
            checked={currentSlide === 1}
            onChange={() => handleRadioChange(1)}
            color="primary"
            size="small"
            name="radio-button"
          />
          <Radio
            checked={currentSlide === 2}
            onChange={() => handleRadioChange(2)}
            color="primary"
            size="small"
            name="radio-button"
          />
        </ThemeProvider>
      </div>
    </>
  );
}

export default MyCarousel;
