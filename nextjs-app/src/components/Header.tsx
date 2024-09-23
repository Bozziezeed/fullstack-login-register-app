"use client";
import { useEffect, useRef, useState } from "react";
import { GET, LOGOUT, POST, USER } from "@/utils/api.util";
import { useNotificationContext } from "@/utils/NotificationProvider";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { FaFacebookF, FaBars, FaTimes } from "react-icons/fa";
import { MdOutlineMail } from "react-icons/md";
import { FaPhone } from "react-icons/fa6";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import React from "react";
import { User } from "@/models/response-model";

type HeaderProps = {
  setHeight: React.Dispatch<React.SetStateAction<number>>;
};
export default function Header() {
  const noti = useNotificationContext();
  const router = useRouter();
  const pathname = usePathname();

  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const [isLanguageOpen, setIsLanguageOpen] = useState<boolean>(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [language, setLanguage] = useState<"TH" | "EN" | "CH">("TH");
  const [isAtTop, setIsAtTop] = useState(true);
  const [user, setUser] = useState<User>();

  useEffect(() => {
    const handleScroll = () => {
      setIsAtTop(window.scrollY === 0);
    };

    // Add scroll event listener
    window.addEventListener("scroll", handleScroll);

    // Clean up event listener on component unmount
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    getUser();
  }, []);

  const getUser = async () => {
    try {
      const res = await GET(USER, {});
      const { data } = res;
      setUser(data);
    } catch (e) {
      console.log(e);
      router.push("/login");
    }
  };

  const onLogout = async () => {
    try {
      const res = await POST(LOGOUT, {}, {});
      console.log(res);
      noti.success("Logged out successfully");
      router.push("/login");
    } catch (e) {
      console.log(e);
    }
  };

  const toggleMenu = () => {
    setIsLanguageOpen(false);
    setIsMenuOpen(!isMenuOpen);
  };

  const toggleLanguage = () => {
    setIsMenuOpen(false);
    setIsLanguageOpen(!isLanguageOpen);
  };

  return (
    <>
      <div className="fixed top-0 w-full bg-white ">
        <div className=" max-w-[1280px] mx-auto lg:px-8 py-8 ">
          <div className="items-center flex flex-row gap-8  px-8 lg:px-0 ">
            <div className="flex flex-row gap-4 items-center ">
              <h1 className="text-[4vw]">MyCompony</h1>
              <Image
                alt="Your Company"
                src="/icons/logo-company.svg"
                width={47}
                height={40}
              />
            </div>
            <div className="flex-1 flex flex-col">
              {/* Top Bar */}
              {isAtTop && (
                <div
                  className={`hidden lg:flex lg:flex-row lg:items-center lg:justify-between border-b-2 border-b-gray-200 py-4 `}
                >
                  <ul className="flex flex-row gap-4">
                    <li>
                      <button>
                        <Image
                          alt="flag-en"
                          src="/images/flag-en.png"
                          width={16}
                          height={11}
                        />
                      </button>
                    </li>
                    <li>
                      <button>
                        <Image
                          alt="flag-th"
                          src="/images/flag-th.png"
                          width={16}
                          height={11}
                        />
                      </button>
                    </li>
                    <li>
                      <button>
                        <Image
                          alt="flag-ch"
                          src="/images/flag-ch.png"
                          width={16}
                          height={11}
                        />
                      </button>
                    </li>
                  </ul>
                  <ul className="flex flex-row gap-2">
                    <li>
                      <button className="text-[16px]">081-111-1111</button>
                    </li>
                    <li>
                      <button className="text-[16px]">Email us</button>
                    </li>
                  </ul>
                  <ul className="flex flex-row gap-2">
                    <li>
                      <button>
                        <FaFacebookF />
                      </button>
                    </li>
                    <li>
                      <button>
                        <MdOutlineMail />
                      </button>
                    </li>
                    <li>
                      <button>
                        <FaPhone />
                      </button>
                    </li>
                  </ul>
                </div>
              )}

              {/* Hamburger Menu for Tablet/Mobile */}
              <div className="flex flex-row justify-end gap-6 pt-2 lg:hidden">
                <button
                  onClick={toggleLanguage}
                  className="text-xl text-blue-500 p-2"
                >
                  {language}
                </button>
                <button
                  onClick={toggleMenu}
                  className={`text-3xl transition duration-300 transform ${
                    isMenuOpen ? "rotate-180" : "rotate-0 "
                  }`}
                >
                  {isMenuOpen ? (
                    <FaTimes className="transform transition-transform duration-300" />
                  ) : (
                    <FaBars className="transform transition-transform duration-300" />
                  )}
                </button>
              </div>

              {/* Main Menu on lg size */}
              <ul
                className={`lg:flex lg:flex-row justify-end gap-8 items-center pt-2 hidden`}
              >
                <li
                  className={`relative p-2 hover-border text-blue-800 ${
                    pathname === "/home" && "border-text-blue-500"
                  }`}
                >
                  <Link href="#" className="text-[18px]">
                    Home
                  </Link>
                </li>
                <li className="relative p-2 hover-border text-blue-800">
                  <Link href="#" className="text-[18px]">
                    About Us
                  </Link>
                </li>
                <li
                  className="relative p-2 hover-border text-blue-800 dropdown "
                  onMouseEnter={() => setIsDropdownOpen(true)}
                  onMouseLeave={() => setIsDropdownOpen(false)}
                >
                  <div className="  flex flex-row gap-2 items-center ">
                    <Link href="#" className="text-[18px] dropdown-title">
                      Services
                    </Link>

                    {isDropdownOpen ? <IoIosArrowUp /> : <IoIosArrowDown />}
                  </div>

                  <div
                    className={`transition-all duration-[0.3s] ease-in-out transform ${
                      isDropdownOpen
                        ? "opacity-100 translate-y-0"
                        : "opacity-0 translate-y-4 pointer-events-none"
                    }`}
                  >
                    {isDropdownOpen && (
                      <ul
                        className="dropdown-menu absolute bg-white shadow-lg p-4 w-[200px] mt-2 rounded-xl"
                        onMouseEnter={() => setIsDropdownOpen(true)}
                      >
                        <li>Auditing</li>
                        <li>Accounting</li>
                        <li>Tax Services</li>
                        <li>Payroll</li>
                      </ul>
                    )}
                  </div>
                </li>
                <li className="relative p-2 hover-border text-blue-800">
                  <Link href="#" className="text-[18px]">
                    Blog
                  </Link>
                </li>
                <li className="py-2 px-8 border-y-2 border-transparent text-white bg-green-500 hover:bg-green-300 rounded-full">
                  <Link href="#" className="text-[18px]">
                    Contact
                  </Link>
                </li>

                <li
                  className="relative p-2 hover:cursor-pointer "
                  onMouseEnter={() => setIsProfileOpen(true)}
                  onMouseLeave={() => setIsProfileOpen(false)}
                >
                  <div className="relative w-10 h-10 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600">
                    <svg
                      className="absolute w-12 h-12 text-gray-400 -left-1"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                        clipRule="evenodd"
                      ></path>
                    </svg>
                  </div>
                  <div
                    className={`transition-all duration-[0.3s] ease-in-out transform ${
                      isProfileOpen
                        ? "opacity-100 translate-y-0"
                        : "opacity-0 translate-y-4 pointer-events-none"
                    }`}
                  >
                    {isProfileOpen && (
                      <ul
                        className="dropdown-menu absolute bg-white shadow-lg p-4 w-[200px] mt-2 rounded-xl"
                        onMouseEnter={() => setIsProfileOpen(true)}
                      >
                        <li>User: {user?.name}</li>
                        <li>Email: {user?.email}</li>
                        <li>
                          <button onClick={onLogout}>Log out</button>
                        </li>
                      </ul>
                    )}
                  </div>
                </li>
              </ul>
            </div>
          </div>

          {/* Main Menu on mobile size */}
          <ul
            className={`lg:hidden justify-end  items-center pt-2 transition-all duration-[1s] ease-in-out transform  flex flex-col gap-2 overflow-hidden  ${
              isMenuOpen
                ? "opacity-100 -translate-y-0 "
                : " opacity-0 max-h-0 -translate-y-4 pointer-events-none"
            } lg:block`}
          >
            <li className="relative p-2 hover:text-green-500 text-blue-800 transition-all duration-[0.5s] ease-in-out transform ">
              <Link href="#" className="text-[18px]">
                Home
              </Link>
            </li>
            <div className="border-b-2 border-gray-200 w-full" />

            <li className="relative p-2 hover:text-green-500 text-blue-800 transition-all duration-[0.5s] ease-in-out transform">
              <Link href="#" className="text-[18px]">
                About Us
              </Link>
            </li>
            <div className="border-b-2 border-gray-200 w-full" />

            <li className="relative p-2 hover:text-green-500 text-blue-800 transition-all duration-[0.5s] ease-in-out transform">
              <div className="flex flex-row gap-2 items-center">
                <Link href="#" className="text-[18px] dropdown-title">
                  Services
                </Link>

                <button onClick={() => setIsDropdownOpen(!isDropdownOpen)}>
                  {isDropdownOpen ? <IoIosArrowUp /> : <IoIosArrowDown />}
                </button>
              </div>
            </li>

            <div
              className={`w-full flex flex-col gap-2 items-center overflow-hidden transition-all duration-[1s] ease-in-out transform ${
                isDropdownOpen
                  ? "max-h-[500px] opacity-100"
                  : "max-h-0 opacity-0"
              }`}
              style={{ transitionProperty: "max-height, opacity" }}
            >
              <li className="relative p-2 hover:text-green-500 text-blue-800 transition-all duration-[0.5s] ease-in-out transform">
                <Link href="#" className="text-[18px]">
                  Auditing
                </Link>
              </li>
              <div className="border-b-2 border-gray-200 w-full" />
              <li className="relative p-2 hover:text-green-500 text-blue-800 transition-all duration-[0.5s] ease-in-out transform">
                <Link href="#" className="text-[18px]">
                  Accounting
                </Link>
              </li>
              <div className="border-b-2 border-gray-200 w-full" />
              <li className="relative p-2 hover:text-green-500 text-blue-800 transition-all duration-[0.5s] ease-in-out transform">
                <Link href="#" className="text-[18px]">
                  Tax Services
                </Link>
              </li>
              <div className="border-b-2 border-gray-200 w-full" />
              <li className="relative p-2 hover:text-green-500 text-blue-800 transition-all duration-[0.5s] ease-in-out transform">
                <Link href="#" className="text-[18px]">
                  Payroll
                </Link>
              </li>
            </div>

            <div className="border-b-2 border-gray-200 w-full" />
            <li className="relative p-2 hover:text-green-500 text-blue-800 transition-all duration-[0.5s] ease-in-out transform">
              <Link href="#" className="text-[18px]">
                Blog
              </Link>
            </li>
            <div className="border-b-2 border-gray-200 w-full" />

            <li className="relative p-2 hover:text-green-500 text-blue-800 transition-all duration-[0.5s] ease-in-out transform">
              <Link href="#" className="text-[18px]">
                Contact Us
              </Link>
            </li>
            <div className="border-b-2 border-gray-200 w-full" />

            <li className="relative p-2 ">
              <div className="relative w-10 h-10 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600">
                <svg
                  className="absolute w-12 h-12 text-gray-400 -left-1"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                    clipRule="evenodd"
                  ></path>
                </svg>
              </div>
            </li>
          </ul>
          {/* Language menu on mobile size */}

          <ul
            className={`lg:hidden justify-end  items-center pt-2 transition-all duration-[1s] ease-in-out transform 
               flex flex-col gap-2 overflow-hidden  ${
                 isLanguageOpen ? "opacity-100  " : " opacity-0 max-h-0 "
               } lg:block`}
          >
            <li>
              <button>
                <Image
                  alt="flag-en"
                  src="/images/flag-en.png"
                  width={32}
                  height={32}
                />
              </button>
            </li>
            <div className="border-b-2 border-gray-200 w-full" />

            <li>
              <button>
                <Image
                  alt="flag-th"
                  src="/images/flag-th.png"
                  width={32}
                  height={32}
                />
              </button>
            </li>
            <div className="border-b-2 border-gray-200 w-full" />
            <li>
              <button>
                <Image
                  alt="flag-ch"
                  src="/images/flag-ch.png"
                  width={32}
                  height={32}
                />
              </button>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
}
