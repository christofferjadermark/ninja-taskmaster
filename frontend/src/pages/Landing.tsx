import Header from "../components/Header";
import Button from "../components/Button";
import coin from "../images/coin.svg";
import chat from "../images/chatBox.svg";
import tasks from "../images/tasks.svg";
import ninja from "../images/ninjaDash.svg";
import linkedin from "../images/linkedIn.svg";
import facebook from "../images/facebook.svg";
import twitter from "../images/twitter.svg";
import instagram from "../images/instagram.svg";
import { Link } from "react-router-dom";
import "../styles/carousel.css";
import MyCarousel from "../components/MyCarousel";
function Landing() {
  return (
    <>
      <Header />
      <div className="text-11xl w  mt-10 flex h-[466.94px] items-center justify-center text-center text-gray-300">
        <div className="box-border flex h-[466.94px] flex-col items-center gap-[32px] px-0 pb-[58px] pt-0">
          <div className="flex flex-col items-center ">
            <div className="flex flex-col items-center  gap-[60px]">
              <div className="max-w-xs  ">
                <MyCarousel />

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
