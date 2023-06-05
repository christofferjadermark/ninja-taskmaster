import Button from '../components/Button';
import coin from '../images/coin.svg';
import chat from '../images/chatBox.svg';
import tasks from '../images/tasks.svg';
import ninja from '../images/ninjaDash.svg';
import linkedin from '../images/linkedIn.svg';
import facebook from '../images/facebook.svg';
import twitter from '../images/twitter.svg';
import instagram from '../images/instagram.svg';
import { Link } from 'react-router-dom';
import '../styles/carousel.css';
import MyCarousel from '../components/MyCarousel';
function Landing() {
  return (
    <>
      <div className="mx-auto  hidden h-screen w-[80%] lg:block">
        <div className="grid grid-cols-2 pt-[80px]">
          <div className="header mt-[30px] grid  items-center  gap-2 ">
            <p className="bg-gradient-to-b from-linear1 to-linear2 bg-clip-text font-header text-[80px] leading-[90px] text-transparent ">
              Ninja <br></br> Taskmaster!
            </p>
            <p className="mt-[20px] text-[32px]">
              Slay your tasks and save time!
            </p>
            <p className="- mt-[10px] w-[350px] text-[24px] leading-[24px]">
              Gather all your daily tasks in one place like millions of others
              and save your precious time.
            </p>
            <Link to="/signUp">
              <Button value={'Sign up'} />
            </Link>
          </div>
          <div className="ml-auto">
            <MyCarousel />
          </div>
        </div>
        <div className=" mt-[70px] flex  justify-between text-center">
          <div className="flex max-h-96 max-w-xs flex-row gap-4">
            <img
              className="z-10 max-w-[45px] justify-start"
              style={{ alignSelf: 'flex-start' }}
              src={coin}
              alt="hejsan"
            />
            <div>
              <div
                style={{ textAlign: 'left' }}
                className="font-inter text-xl font-bold text-black"
              >
                Stay focused
              </div>
              <p
                style={{ textAlign: 'left' }}
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
              style={{ alignSelf: 'flex-start' }}
              src={chat}
              alt="hejsan"
            />
            <div>
              <div
                style={{ textAlign: 'left' }}
                className="font-inter text-xl font-bold text-black"
              >
                Remain silent
              </div>
              <p
                style={{ textAlign: 'left' }}
                className="font-inter text-base font-bold text-primaryfont"
              >
                Includes options for push notifications
              </p>
            </div>
          </div>
          <div className="flex max-h-96 max-w-xs flex-row gap-4">
            <img
              className="max-w-[45px] justify-start"
              style={{ alignSelf: 'flex-start' }}
              src={tasks}
              alt="hejsan"
            />
            <div>
              <div
                style={{ textAlign: 'left' }}
                className="w-[259px] font-inter text-xl font-bold text-black"
              >
                Be efficient
              </div>
              <p
                style={{ textAlign: 'left' }}
                className="font-inter text-base font-bold text-primaryfont"
              >
                Categorize and sort your tasks
              </p>
            </div>
          </div>
        </div>
        <div className="mx-auto mt-[100px] flex justify-center text-center">
          <div>
            <h1 className="mb-3 text-xl font-bold text-black">
              Are you ready?
            </h1>
            <Link to="/signUp">
              <Button value={'Go ninja!'} />
            </Link>
          </div>
        </div>
        <div className="absolute bottom-0 w-full">
          <footer className=" grid grid-cols-3">
            <div className="flex items-center  gap-2">
              <img src={ninja} alt="" />
              <p className="bg-gradient-to-b from-linear1 to-linear2 bg-clip-text font-header text-3xl text-transparent ">
                Ninja Taskmaster
              </p>
            </div>
            <div className="contact mt-8 flex flex-col gap-2">
              <p style={{ textAlign: 'left' }} className="text-xl text-black">
                Contact us:
              </p>
              <p style={{ textAlign: 'left' }} className="text-email text-xl">
                help@ninjataskmaster.com
              </p>
              <p
                style={{ textAlign: 'left' }}
                className="mt-2 text-xl text-black"
              ></p>
            </div>
            <div className="contact mt-8 flex flex-col gap-2">
              Join Our Social Community
              <div className="mt-2 flex gap-5">
                <img src={linkedin} alt="" />
                <img src={facebook} alt="" />
                <img src={instagram} alt="" />
                <img src={twitter} alt="" />
              </div>
            </div>
          </footer>
        </div>
      </div>
      <div className="lg:hidden">
        <div className=" header mx-auto mt-[30px] flex w-[80%] items-center justify-center gap-2 ">
          <svg
            width="38"
            height="38"
            viewBox="0 0 38 38"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M37.3061 0C35.3549 3.52754 31.5897 1.06289 28.5848 0.976931C20.0864 0.914924 19.83 4.64717 15.5983 6.94649C14.7537 6.16984 13.4132 5.67688 11.3026 5.77478C9.83861 5.84268 8.51373 6.26619 7.53663 7.00679C6.40246 7.83909 5.57573 8.98709 5.51994 10.0948C7.45281 9.68274 9.3162 9.7549 9.73595 10.518C10.7937 12.4412 7.77183 11.7551 5.62343 12.3315C5.50873 12.3622 5.39623 12.3943 5.28483 12.4264C5.03144 13.0258 4.73117 13.5992 4.73117 14.014C4.73117 15.3274 5.98905 14.4914 6.53702 15.6324C6.61514 15.7951 6.88425 16.3009 7.66181 16.9371C7.78745 17.04 11.8897 14.2154 12.0264 14.3095C10.6629 16.7588 8.46143 17.6223 8.24636 17.718C6.29447 18.5863 3.95177 19.3007 3.12779 20.6734L3.07982 20.6604C3.07982 20.6604 0.544935 25.7315 0 28.2492C0.0528483 29.5473 2.35952 29.2216 2.35952 29.2216L5.99245 28.3081L6.42314 29.6212L17.4047 17.9461C15.0039 16.7315 15.7462 14.9552 15.3894 13.3903C16.6566 11.6482 17.4023 10.7501 16.731 8.99701C17.3856 8.42979 18.2215 7.85103 19.1768 7.69647C21.1314 7.38023 24.6929 8.95197 26.6212 8.97306C29.1745 9.00111 30.5473 7.86498 31.6167 6.50011C30.6364 6.77155 30.2645 6.7714 30.8168 5.33243C29.5138 5.73354 28.6739 7.08415 26.3134 6.76837C24.1195 6.47484 20.7917 5.91414 18.9546 6.4309C22.0728 5.08045 24.5196 3.69845 27.8494 3.37213C31.7513 3.60668 35.2537 5.92344 37.3061 2.05207L37.3061 0ZM26.3891 10.6094L22.8043 14.4124L24.3245 15.3202L27.9097 11.5171L26.3891 10.6094ZM7.5007 10.7378C7.0133 10.7378 6.5258 10.8304 6.5258 11.0156C6.72461 11.2437 7.42542 11.4293 7.76282 11.4357C8.30123 11.4357 8.47559 11.3858 8.47559 11.0156C8.47559 10.8304 7.9881 10.7378 7.5007 10.7378ZM20.4475 14.3928L19.372 15.4913L23.8828 18.1332L24.9582 17.0348L20.4475 14.3928ZM20.041 17.1819L4.36785 33.8445C4.36785 33.8445 3.42604 34.4975 4.36325 35.1446C5.32555 35.8088 6.0748 34.8613 6.0748 34.8613L21.7477 18.1987L20.041 17.1819ZM21.781 20.4307C21.781 20.4307 19.8797 22.5114 18.9116 23.5404C15.0379 27.6576 7.35686 35.686 7.15245 35.799L7.1587 37.0649H17.2046L18.6168 28.1308L22.7216 28.8809C22.7216 28.8809 24.3681 29.0292 24.3011 27.8094C23.876 26.1222 22.534 22.0068 21.781 20.4307ZM19.6934 24.2189L20.4972 25.8939L19.1652 25.6048L19.6934 24.2189Z"
              fill="url(#paint0_linear_707_3409)"
            />
            <defs>
              <linearGradient
                id="paint0_linear_707_3409"
                x1="18.6531"
                y1="0"
                x2="18.6531"
                y2="37.0649"
                gradientUnits="userSpaceOnUse"
              >
                <stop stop-color="#4D6A6D" />
                <stop offset="1" stop-color="#01825E" />
              </linearGradient>
            </defs>
          </svg>
          <h1 className="main-header text-3xl">
            <span className="bg-gradient-to-b from-linear1 to-linear2 bg-clip-text font-header text-transparent ">
              Ninja Taskmaster
            </span>
          </h1>
        </div>
        <div className="text-11xl w z-20  mt-10 flex h-[466.94px] items-center justify-center text-center text-gray-300">
          <div className="box-border flex h-[466.94px] flex-col items-center gap-[32px] px-0 pb-[58px] pt-0 ">
            <div className=" flex flex-col items-center">
              <div className="flex flex-col items-center gap-[60px]  ">
                <div className="max-w-xs ">
                  <MyCarousel />
                  <div className="mt-12">
                    <Link to="/signUp">
                      <Button value={'Sign up'} />
                    </Link>
                  </div>
                </div>

                {/* Info */}
                <div className="flex max-h-96 max-w-xs flex-row gap-4">
                  <img
                    className="z-10 max-w-[45px] justify-start"
                    style={{ alignSelf: 'flex-start' }}
                    src={coin}
                    alt="hejsan"
                  />
                  <div>
                    <div
                      style={{ textAlign: 'left' }}
                      className="font-inter text-xl font-bold text-black"
                    >
                      Stay focused
                    </div>
                    <p
                      style={{ textAlign: 'left' }}
                      className="font-inter text-base font-bold text-primaryfont"
                    >
                      Store all your personal tasks in one place and keep
                      yourself organized
                    </p>
                  </div>
                </div>
                <div className="flex max-h-96 max-w-xs flex-row gap-4">
                  <img
                    className="max-w-[45px] justify-start"
                    style={{ alignSelf: 'flex-start' }}
                    src={chat}
                    alt="hejsan"
                  />
                  <div>
                    <div
                      style={{ textAlign: 'left' }}
                      className="font-inter text-xl font-bold text-black"
                    >
                      Remain silent
                    </div>
                    <p
                      style={{ textAlign: 'left' }}
                      className="font-inter text-base font-bold text-primaryfont"
                    >
                      Includes options for push notifications
                    </p>
                  </div>
                </div>
                <div className="flex max-h-96 max-w-xs flex-row gap-4">
                  <img
                    className="max-w-[45px] justify-start"
                    style={{ alignSelf: 'flex-start' }}
                    src={tasks}
                    alt="hejsan"
                  />
                  <div>
                    <div
                      style={{ textAlign: 'left' }}
                      className="w-[259px] font-inter text-xl font-bold text-black"
                    >
                      Be efficient
                    </div>
                    <p
                      style={{ textAlign: 'left' }}
                      className="font-inter text-base font-bold text-primaryfont"
                    >
                      Categorize and sort your tasks
                    </p>
                  </div>
                </div>

                <div>
                  <h1 className="mb-3 text-xl font-bold text-black">
                    Are you ready?
                  </h1>
                  <Link to="/signUp">
                    <Button value={'Go ninja!'} />
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
                      style={{ textAlign: 'left' }}
                      className="text-xl text-black"
                    >
                      Contact us:
                    </p>
                    <p
                      style={{ textAlign: 'left' }}
                      className="text-email text-xl"
                    >
                      help@ninjataskmaster.com
                    </p>
                    <p
                      style={{ textAlign: 'left' }}
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
      </div>
    </>
  );
}

export default Landing;
