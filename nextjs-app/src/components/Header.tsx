"use client";
import { useEffect, useState, useTransition } from "react";
import { LOGOUT, POST } from "@/utils/api.util";
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
import { extractError } from "@/utils";
import { useLocale, useTranslations } from "next-intl";

type HeaderProps = {
  user: User;
};

export default function Header({ user }: HeaderProps) {
  const noti = useNotificationContext();
  const router = useRouter();
  const pathname = usePathname();
  const t = useTranslations("Header");

  const [isPending, startTransition] = useTransition();
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const [isLanguageOpen, setIsLanguageOpen] = useState<boolean>(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  // const [language, setLanguage] = useState<"TH" | "EN" | "CH">("TH");
  const [isAtTop, setIsAtTop] = useState(true);

  const localActive = useLocale();

  const onSelectChange = (path: string) => {
    const nextLocale = path;
    startTransition(() => {
      router.replace(`/${nextLocale}`);
    });
  };

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

  const onLogout = async () => {
    try {
      const res = await POST(LOGOUT, {}, {});
      console.log(res);
      noti.success("Logged out successfully");
      router.push(`/${localActive}/login`);
    } catch (err: unknown) {
      noti.error(extractError(err));
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
                      <button
                        onClick={() => onSelectChange("en/home")}
                        disabled={isPending}
                      >
                        <Image
                          alt="flag-en"
                          src="/images/flag-en.png"
                          width={16}
                          height={11}
                        />
                      </button>
                    </li>
                    <li>
                      <button
                        onClick={() => onSelectChange("th/home")}
                        disabled={isPending}
                      >
                        <Image
                          alt="flag-th"
                          src="/images/flag-th.png"
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
                  {localActive}
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
                  className={`relative p-2  text-blue-800 ${
                    pathname === `${localActive}/home`
                      ? "border-y-2 border-blue-500"
                      : "hover-border"
                  }`}
                >
                  <Link href="#" className="text-[18px]">
                    {t("Home")}
                  </Link>
                </li>
                <li className="relative p-2 hover-border text-blue-800">
                  <Link href="#" className="text-[18px]">
                    {t("About_us")}
                  </Link>
                </li>
                <li
                  className="relative p-2 hover-border text-blue-800 dropdown "
                  onMouseEnter={() => setIsDropdownOpen(true)}
                  onMouseLeave={() => setIsDropdownOpen(false)}
                >
                  <div className="  flex flex-row gap-2 items-center ">
                    <Link href="#" className="text-[18px] dropdown-title">
                      {t("Services")}
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
                        <li>{t("Auditing")}</li>
                        <li>{t("Accounting")}</li>
                        <li>{t("Tax_Services")}</li>
                        <li>{t("Payroll")}</li>
                      </ul>
                    )}
                  </div>
                </li>
                <li className="relative p-2 hover-border text-blue-800">
                  <Link href="#" className="text-[18px]">
                    {t("Blog")}
                  </Link>
                </li>
                <li className="py-2 px-8 border-y-2 border-transparent text-white bg-green-500 hover:bg-green-300 rounded-full">
                  <Link href="#" className="text-[18px]">
                    {t("Contact_Us")}
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
                    className={`transition-all absolute right-[200px] duration-[0.3s] ease-in-out transform ${
                      isProfileOpen
                        ? "opacity-100 translate-y-0"
                        : "opacity-0 translate-y-4 pointer-events-none"
                    }`}
                  >
                    {isProfileOpen && (
                      <ul
                        className="dropdown-menu absolute  bg-white shadow-lg p-4 w-[200px] mt-2 rounded-xl"
                        onMouseEnter={() => setIsProfileOpen(true)}
                      >
                        <li>
                          {t("Name")}: {user?.name}
                        </li>
                        <li>
                          {t("Email")}: {user?.email}
                        </li>
                        <li>
                          <button onClick={onLogout}>{t("Log out")}</button>
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
                {t("Home")}
              </Link>
            </li>
            <div className="border-b-2 border-gray-200 w-full" />

            <li className="relative p-2 hover:text-green-500 text-blue-800 transition-all duration-[0.5s] ease-in-out transform">
              <Link href="#" className="text-[18px]">
                {t("About_us")}
              </Link>
            </li>
            <div className="border-b-2 border-gray-200 w-full" />

            <li className="relative p-2 hover:text-green-500 text-blue-800 transition-all duration-[0.5s] ease-in-out transform">
              <div className="flex flex-row gap-2 items-center">
                <Link href="#" className="text-[18px] dropdown-title">
                  {t("Services")}
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
                  {t("Auditing")}
                </Link>
              </li>
              <div className="border-b-2 border-gray-200 w-full" />
              <li className="relative p-2 hover:text-green-500 text-blue-800 transition-all duration-[0.5s] ease-in-out transform">
                <Link href="#" className="text-[18px]">
                  {t("Accounting")}
                </Link>
              </li>
              <div className="border-b-2 border-gray-200 w-full" />
              <li className="relative p-2 hover:text-green-500 text-blue-800 transition-all duration-[0.5s] ease-in-out transform">
                <Link href="#" className="text-[18px]">
                  {t("Tax_Services")}
                </Link>
              </li>
              <div className="border-b-2 border-gray-200 w-full" />
              <li className="relative p-2 hover:text-green-500 text-blue-800 transition-all duration-[0.5s] ease-in-out transform">
                <Link href="#" className="text-[18px]">
                  {t("Payroll")}
                </Link>
              </li>
            </div>

            <div className="border-b-2 border-gray-200 w-full" />
            <li className="relative p-2 hover:text-green-500 text-blue-800 transition-all duration-[0.5s] ease-in-out transform">
              <Link href="#" className="text-[18px]">
                {t("Blog")}
              </Link>
            </li>
            <div className="border-b-2 border-gray-200 w-full" />

            <li className="relative p-2 hover:text-green-500 text-blue-800 transition-all duration-[0.5s] ease-in-out transform">
              <Link href="#" className="text-[18px]">
                {t("Contact_Us")}
              </Link>
            </li>
            <div className="border-b-2 border-gray-200 w-full" />

            <li className="relative p-2 ">
              <div
                onClick={() => setIsProfileOpen(!isProfileOpen)}
                className="relative w-10 h-10 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600 hover:cursor-pointer"
              >
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

            <div
              className={`w-full flex flex-col gap-2 items-center overflow-hidden transition-all duration-[1s] ease-in-out transform ${
                isProfileOpen
                  ? "max-h-[500px] opacity-100"
                  : "max-h-0 opacity-0"
              }`}
              style={{ transitionProperty: "max-height, opacity" }}
            >
              <li className="text-[18px] relative p-2  text-blue-800 transition-all duration-[0.5s] ease-in-out transform">
                {t("Name")}: {user?.name}
              </li>
              <div className="border-b-2 border-gray-200 w-full" />
              <li className="text-[18px] relative p-2  text-blue-800 transition-all duration-[0.5s] ease-in-out transform">
                {t("Email")}: {user?.email}
              </li>
              <div className="border-b-2 border-gray-200 w-full" />
              <li className="text-[18px] relative p-2 hover:text-green-500 text-blue-800 transition-all duration-[0.5s] ease-in-out transform">
                <button onClick={onLogout}>{t("Log out")}</button>
              </li>
            </div>
            <div className="border-b-2 border-gray-200 w-full" />
          </ul>
          {/* Language menu on mobile size */}

          <ul
            className={`lg:hidden justify-end  items-center pt-2 transition-all duration-[1s] ease-in-out transform 
               flex flex-col gap-2 overflow-hidden  ${
                 isLanguageOpen ? "opacity-100  " : " opacity-0 max-h-0 "
               } lg:block`}
          >
            <li>
              <button
                onClick={() => onSelectChange("en/home")}
                disabled={isPending}
              >
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
              <button
                onClick={() => onSelectChange("th/home")}
                disabled={isPending}
              >
                <Image
                  alt="flag-th"
                  src="/images/flag-th.png"
                  width={32}
                  height={32}
                />
              </button>
            </li>
            <div className="border-b-2 border-gray-200 w-full" />
          </ul>
        </div>
      </div>
    </>
  );
}
