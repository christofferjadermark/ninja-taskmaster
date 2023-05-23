import Header from "../components/Header";
import Radio from "@mui/material/Radio";
import { useState } from "react";
import Button from "../components/Button";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import coin from "../images/coin.svg";
import chat from "../images/chatBox.svg";
import tasks from "../images/tasks.svg";
import ninja from "../images/ninjaDash.svg";
import linkedin from "../images/linkedIn.svg";
import facebook from "../images/facebook.svg";
import twitter from "../images/twitter.svg";
import instagram from "../images/instagram.svg";
import { Link } from "react-router-dom";
function Landing() {
  const [selectedValue, setSelectedValue] = useState("");

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedValue(event.target.value);
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
      <Header />
      <div className="text-11xl w  mt-10 flex h-[466.94px] items-center justify-center text-center text-gray-300">
        <div className="box-border flex h-[466.94px] flex-col items-center gap-[32px] px-0 pb-[58px] pt-0">
          <div className=" ">
            <svg
              width="234"
              height="239"
              viewBox="0 0 234 239"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M129.151 0.0649414C96.6601 0.0649414 67.6394 14.5753 48.5013 37.3242C62.337 37.3595 92.9217 38.8613 97.0602 50.2889C77.6538 44.1886 56.7698 44.6144 42.2299 45.6012C39.6687 49.3588 37.3639 53.284 35.331 57.3503C51.248 53.164 110.098 55.652 113.534 68.0684C75.1476 58.6828 42.5097 63.7092 31.6643 65.6015C27.2348 76.9133 24.8018 89.1891 24.8018 102.023C24.8018 158.333 73.4254 238.065 131.055 238.065C160.26 238.065 186.172 217.589 204.63 190.064C188.765 202.065 155.101 218.945 134.407 207.525C175.627 202.993 205.116 181.835 213.313 175.598C226.047 151.841 233.5 124.985 233.5 102.023C233.5 45.713 186.782 0.0649414 129.151 0.0649414ZM129.15 76.5106C182.238 76.5106 225.274 90.4837 225.274 107.721C225.274 118.832 223.004 124.593 196.076 130.123C181.228 133.173 148.019 114.409 129.15 114.409C111.537 114.409 85.1382 135.245 70.9429 132.56C42.3506 127.152 33.0268 119.239 33.0268 107.721C33.0268 90.4837 76.063 76.5106 129.15 76.5106ZM171.528 96.6153C161.354 96.5549 150.527 98.2759 150.576 101.61C150.667 107.885 159.348 112.847 169.963 112.691C180.579 112.537 179.337 104.519 189.017 101.05C188.975 98.108 180.506 96.6688 171.528 96.6153ZM84.291 98.0682C75.3138 98.1211 66.8448 99.562 66.8013 102.503C76.4818 105.973 75.24 113.991 85.8561 114.145C96.4717 114.3 105.152 109.338 105.244 103.062C105.292 99.7288 94.465 98.0078 84.291 98.0682ZM131.056 139.615C146.734 139.615 159.442 152.332 159.442 152.332C159.442 152.332 145.204 146.736 129.526 146.736C113.849 146.736 102.67 152.332 102.67 152.332C102.67 152.332 115.378 139.615 131.056 139.615ZM3.45803 197.374C5.65257 198.405 7.38992 177.047 29.8522 166.5C25.7546 162.234 23.5686 154.083 22.6583 148.608C6.12189 150.704 -5.13324 191.387 3.45803 197.374ZM31.9053 176.362C28.1108 176.336 23.1857 176.247 23.0922 184.898C22.8407 208.236 1.46758 233.758 2.81997 234.394C6.42602 236.089 27.8764 218.228 34.0943 204.439C36.1954 199.78 39.9121 176.417 31.9053 176.362Z"
                fill="url(#paint0_linear_707_3413)"
              />
              <defs>
                <linearGradient
                  id="paint0_linear_707_3413"
                  x1="117"
                  y1="0.0649414"
                  x2="117"
                  y2="238.065"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop stop-color="#4D6A6D" />
                  <stop offset="1" stop-color="#01825E" />
                </linearGradient>
              </defs>
            </svg>
          </div>
          <div className="flex flex-col items-center ">
            <div className="flex flex-col items-center  gap-[60px]">
              <div className="max-w-xs  ">
                <div className="   text-center text-3xl font-medium text-black">
                  Slay Your Task
                </div>
                <div className=" text-base font-semibold leading-[24px] text-gray-100">
                  <p className="m-0 text-primaryfont">
                    Gather all your daily tasks in one
                  </p>
                  <p className="m-0 text-primaryfont">
                    place like millions of others and save your precious time
                  </p>
                </div>
                <div className="mt-20">
                  <ThemeProvider theme={theme}>
                    <Radio
                      color="primary"
                      size="small"
                      checked={selectedValue === "a"}
                      onChange={handleChange}
                      value="a"
                      name="radio-button"
                      inputProps={{ "aria-label": "A" }}
                    />
                    <Radio
                      color="primary"
                      size="small"
                      checked={selectedValue === "b"}
                      onChange={handleChange}
                      value="b"
                      name="radio-button"
                      inputProps={{ "aria-label": "B" }}
                    />
                    <Radio
                      color="primary"
                      size="small"
                      checked={selectedValue === "c"}
                      onChange={handleChange}
                      value="c"
                      name="radio-button"
                      inputProps={{ "aria-label": "C" }}
                    />
                  </ThemeProvider>
                </div>

                <div className="mt-12">
                  <Link to="/signUp">
                    <Button value={"Sign up"} />
                  </Link>
                </div>
              </div>

              {/* Info */}
              <div className="flex max-h-96 max-w-xs flex-row gap-4">
                <img
                  className="max-w-[45px] justify-start"
                  style={{ alignSelf: "flex-start" }}
                  src={coin}
                  alt="hejsan"
                />
                <div>
                  <div
                    style={{ textAlign: "left" }}
                    className="font-inter text-xl font-bold text-black"
                  >
                    Stay focused
                  </div>
                  <p
                    style={{ textAlign: "left" }}
                    className="font-inter text-base font-bold text-primaryfont"
                  >
                    Store all your personal tasks in one place and keep yourself
                    organized
                  </p>
                </div>
              </div>
              <div className="flex max-h-96 max-w-xs flex-row gap-4">
                <img
                  className="max-w-[45px] justify-start"
                  style={{ alignSelf: "flex-start" }}
                  src={chat}
                  alt="hejsan"
                />
                <div>
                  <div
                    style={{ textAlign: "left" }}
                    className="font-inter text-xl font-bold text-black"
                  >
                    Remain silent
                  </div>
                  <p
                    style={{ textAlign: "left" }}
                    className="font-inter text-base font-bold text-primaryfont"
                  >
                    Includes options for push notifications
                  </p>
                </div>
              </div>
              <div className="flex max-h-96 max-w-xs flex-row gap-4">
                <img
                  className="max-w-[45px] justify-start"
                  style={{ alignSelf: "flex-start" }}
                  src={tasks}
                  alt="hejsan"
                />
                <div>
                  <div
                    style={{ textAlign: "left" }}
                    className="w-[259px] font-inter text-xl font-bold text-black"
                  >
                    Be efficient
                  </div>
                  <p
                    style={{ textAlign: "left" }}
                    className="font-inter text-base font-bold text-primaryfont"
                  >
                    Categorize and sort your tasks
                  </p>
                </div>
              </div>
              {/* Info ends */}

              <div>
                <h1 className="mb-3 text-xl font-bold text-black">
                  Are you ready?
                </h1>
                <Link to="/signUp">
                  <Button value={"Go ninja!"} />
                </Link>
              </div>

              <footer>
                <div className="flex items-center justify-center gap-2">
                  <img src={ninja} alt="" />
                  <p className="bg-gradient-to-b from-linear1 to-linear2 bg-clip-text font-header text-3xl text-transparent ">
                    Ninja Taskmaster
                  </p>
                </div>
                <div className="contact mt-8 flex flex-col gap-2">
                  <p
                    style={{ textAlign: "left" }}
                    className="text-xl text-black"
                  >
                    Contact us:
                  </p>
                  <p
                    style={{ textAlign: "left" }}
                    className="text-xl text-email"
                  >
                    help@ninjataskmaster.com
                  </p>
                  <p
                    style={{ textAlign: "left" }}
                    className="mt-2 text-xl text-black"
                  >
                    Join Our Social Community
                    <div className="mt-2 flex gap-5">
                      <img src={linkedin} alt="" />
                      <img src={facebook} alt="" />
                      <img src={instagram} alt="" />
                      <img src={twitter} alt="" />
                    </div>
                  </p>
                </div>
              </footer>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Landing;
