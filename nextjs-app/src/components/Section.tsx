/* eslint-disable @next/next/no-img-element */
/* eslint-disable @next/next/no-html-link-for-pages */

import Link from "next/link";
import Image from "next/image";
import { FaRegCalendarCheck } from "react-icons/fa";
import { IoDocumentTextOutline, IoMailOutline } from "react-icons/io5";
import { FaRegHospital, FaRegClock, FaArrowCircleRight } from "react-icons/fa";
import { HiOutlineBuildingOffice2 } from "react-icons/hi2";
import { useTranslations } from "next-intl";

export default function Section() {
  const t = useTranslations("Section_1");
  const s2 = useTranslations("Section_2");
  const s3 = useTranslations("Section_3");
  const s4 = useTranslations("Section_4");
  const s5 = useTranslations("Section_5");
  return (
    <section className="w-full text-black mt-[132px] lg:mt-[186px]">
      {/* section 1 */}
      <div className="bg-[url('https://unsplash.com/photos/dFCOgR91H5M/download')]  bg-cover bg-center  w-full py-8">
        <div className="max-w-[1280px] mx-auto p-8 ">
          <div className="max-w-fit bg-white p-4 flex flex-col gap-4">
            <h1 className="text-[36px] text-blue-500 font-medium">
              {t("Accounting")}
            </h1>
            <h2 className="text-[36px] text-black font-medium">
              {t("Solutions")}
              <br />
              {t("Your_Business")}
            </h2>
            <h2 className="text-[25px] text-black font-normal">
              {t("TAX_AUDIT_ACCOUNTING_LEGAL")}
            </h2>
            <p className="text-[14px] text-black font-light">
              {t("Text_1")}
              <br /> {t("Text_2")}
              <br /> {t("Text_3")}
            </p>

            <button className="py-2 px-8 max-w-fit border-y-2 border-transparent text-white bg-blue-500 hover:bg-blue-300 ">
              <Link href="#">Contact Us</Link>
            </button>
          </div>
        </div>
      </div>

      {/* section 2 */}
      <div className="bg-white  w-full  py-8">
        <div className="max-w-[1280px] min-h-[750px] mx-auto  p-8 flex lg:flex-row flex-col gap-8 ">
          <div
            className="bg-[url('https://plus.unsplash.com/premium_photo-1678903964473-1271ecfb0288?q=80&w=2787&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')] 
            bg-cover bg-center lg:w-[455px] p-8 flex items-end"
          >
            <p className="bg-white p-7 border-l-4 border-blue-500 text-[28px] font-light">
              {s2("title_1")}
            </p>
          </div>
          <div className="flex flex-col  p-4 flex-1 gap-5">
            <h1 className="text-[40px]"> {s2("About_us")}</h1>
            <p className="text-[20px] font-thin">
              <span className="text-blue-500 font-medium">{s2("Connect")}</span>{" "}
              {s2("Text_1")}
            </p>
            <ul className="flex flex-col gap-3">
              <li>
                <div className="flex flex-row gap-2 items-center">
                  <FaArrowCircleRight />
                  <p className="text-[18px] font-thin">
                    <span className="text-blue-500 font-medium">
                      {s2("Innovation")}
                    </span>{" "}
                    {s2("Text_2")}
                  </p>
                </div>
              </li>
              <li>
                <div className="flex flex-row gap-2 items-center">
                  <FaArrowCircleRight />
                  <p className="text-[18px] font-thin">
                    <span className="text-blue-500 font-medium">
                      {s2("Emapythy")}
                    </span>{" "}
                    {s2("Text_3")}
                  </p>
                </div>
              </li>
              <li>
                <div className="flex flex-row gap-2 items-center">
                  <FaArrowCircleRight />
                  <p className="text-[18px] font-thin">
                    <span className="text-blue-500 font-medium">
                      {s2("Excellence")}
                    </span>{" "}
                    {s2("Text_4")}
                  </p>
                </div>
              </li>
              <li>
                <div className="flex flex-row gap-2 items-center">
                  <FaArrowCircleRight />
                  <p className="text-[18px] font-thin">
                    <span className="text-blue-500 font-medium">
                      COMMITMENT
                    </span>{" "}
                    – Responsible for our job until reaching the goal set
                  </p>
                </div>
              </li>
            </ul>
            <p className="text-[20px] font-thin">{s2("Text_5")}</p>
          </div>
        </div>
      </div>

      {/* section 3 */}
      <div className=" bg-blue-900 w-full py-8">
        <div className="max-w-[1280px] mx-auto p-8 flex flex-col gap-8">
          <div className="flex flex-col lg:flex-row gap-8 items-center">
            <h1 className="text-white text-[40px] flex-1">{s3("title_1")}</h1>
            <p className="text-white text-[20px] flex-1 hidden lg:visible">
              {s3("Text_1")}
            </p>
          </div>
          <div className="flex flex-col lg:flex-row justify-between gap-8">
            <div className="flex flex-row flex-1 p-4 bg-white rounded-lg gap-4">
              <FaRegCalendarCheck className="w-20 h-20 text-blue-500" />
              <div className="flex flex-col gap-4">
                <h5 className="text-[24px] font-extralight">
                  {s3("Auditing service")}
                </h5>
                <p className="text-[20px] font-extralight ">{s3("Text_2")}</p>
                <button className="text-[20px] font-extralight text-green-500 text-start">
                  {"Read more >"}
                </button>
              </div>
            </div>
            <div className="flex flex-row flex-1 p-4 bg-white rounded-lg gap-4">
              <IoDocumentTextOutline className="w-20 h-20 text-blue-500" />
              <div className="flex flex-col gap-4">
                <h5 className="text-[24px] font-extralight">
                  {s3("Accounting service")}
                </h5>
                <p className="text-[20px] font-extralight">{s3("Text_3")}</p>
                <button className="text-[20px] font-extralight text-green-500 text-start">
                  {"Read more >"}
                </button>
              </div>
            </div>
            <div className="flex flex-row flex-1 p-4 bg-white rounded-lg gap-4">
              <FaRegHospital className="w-20 h-20 text-blue-500" />
              <div className="flex flex-col gap-4">
                <h5 className="text-[24px] font-extralight">
                  {s3("Tax service")}
                </h5>
                <p className="text-[20px] font-extralight">{s3("Text_4")}</p>
                <button className="text-[20px] font-extralight text-green-500 text-start">
                  {"Read more >"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* section 4 */}
      <div className="max-w-[1280px] mx-auto p-8 flex flex-col gap-8">
        <p className="text-[30px] font-light text-center"> {s4("title_1")}</p>
        <div className="flex flex-col lg:flex-row justify-between gap-8">
          <div className="flex flex-col flex-1 p-4 bg-white rounded-lg gap-4">
            <p className="text-[24px] font-light">{s4("Accounting Firms")}</p>
            <div className="self-center">
              <Image
                alt="error-page"
                src="/images/error-page.png"
                width={200}
                height={200}
              />
            </div>
            <p className="text-[20px] font-thin">{s4("Text_1")}</p>
          </div>
          <div className="flex flex-col flex-1 p-4 bg-white rounded-lg gap-4">
            <p className="text-[24px] font-light">
              {s4("Local Entrepreneurs")}
            </p>
            <div className="self-center">
              <Image
                alt="entrepreneurs"
                src="/images/entrepreneurs.png"
                width={200}
                height={200}
              />
            </div>
            <p className="text-[20px] font-thin">{s4("Text_2")}</p>
          </div>
          <div className="flex flex-col flex-1 p-4 bg-white rounded-lg gap-4">
            <p className="text-[24px] font-ligth">
              {s4("Multinational Corporation")}
            </p>
            <div className="self-center">
              <Image
                alt="blog-insights"
                src="/images/blog-insights.png"
                width={200}
                height={200}
              />
            </div>
            <p className="text-[20px] font-thin">{s4("Text_3")}</p>
          </div>
        </div>
      </div>

      {/* section 5 */}
      <div className="max-w-[1280px] mx-auto p-8 px-16 flex flex-col lg:flex-row gap-8 bg-blue-900 rounded-3xl">
        <div className="flex-1  flex flex-col gap-6">
          <h1 className="text-[60px] text-white font-normal lg:text-start text-center">
            {s5("title_1")}
          </h1>
          <div className=" flex-col gap-4 hidden lg:visible lg:flex">
            <div className="flex flex-row gap-4 items-center">
              <HiOutlineBuildingOffice2 className="text-blue-500 w-16 h-16" />
              <p className="text-[24px] text-white"> {s5("Office")}</p>
            </div>
            <div className="text-[20px] text-white">
              <p> {s5("Sathorn, Bangkok")}</p>
              <p> {s5("Thailand, 10120")}</p>
            </div>
          </div>
          <div className=" flex-col gap-4 hidden lg:visible lg:flex">
            <div className="flex flex-row gap-4 items-center">
              <IoMailOutline className="text-blue-500 w-16 h-16" />
              <p className="text-[24px] text-white"> {s5("Contact")}</p>
            </div>
            <p className="text-[20px] text-white">info@mail.co.th</p>
          </div>
          <div className=" flex-col gap-4 hidden lg:visible lg:flex">
            <div className="flex flex-row gap-4 items-center">
              <FaRegClock className="text-blue-500 w-16 h-16" />
              <p className="text-[24px] text-white">
                {s5("Open Hours")}Open Hours
              </p>
            </div>
            <p className="text-[20px] text-white">
              {s5("Monday")}
              Monday - Saturdat : 8am - 6pm
            </p>
          </div>
        </div>
        <div className="flex flex-1 items-center justify-center p-12 bg-white rounded-3xl ">
          <div className="mx-auto w-full max-w-[550px] bg-white">
            <form>
              <div className="mb-5">
                <label
                  htmlFor="name"
                  className="mb-3 block text-base font-medium text-[#07074D]"
                >
                  Full Name
                </label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  required
                  placeholder="Full Name"
                  className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                />
              </div>
              <div className="mb-5">
                <label
                  htmlFor="phone"
                  className="mb-3 block text-base font-medium text-[#07074D]"
                >
                  Phone Number
                </label>
                <input
                  type="text"
                  name="phone"
                  id="phone"
                  required
                  placeholder="Enter your phone number"
                  className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                />
              </div>
              <div className="mb-5">
                <label
                  htmlFor="email"
                  className="mb-3 block text-base font-medium text-[#07074D]"
                >
                  Email Address
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  required
                  placeholder="Enter your email"
                  className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                />
              </div>
              <div className="-mx-3 flex flex-wrap">
                <div className="w-full px-3 sm:w-1/2">
                  <div className="mb-5">
                    <label
                      htmlFor="date"
                      className="mb-3 block text-base font-medium text-[#07074D]"
                    >
                      Date
                    </label>
                    <input
                      type="date"
                      name="date"
                      id="date"
                      required
                      className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                    />
                  </div>
                </div>
                <div className="w-full px-3 sm:w-1/2">
                  <div className="mb-5">
                    <label
                      htmlFor="time"
                      className="mb-3 block text-base font-medium text-[#07074D]"
                    >
                      Time
                    </label>
                    <input
                      type="time"
                      name="time"
                      id="time"
                      required
                      className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                    />
                  </div>
                </div>
              </div>

              <div className="mb-5 pt-3">
                <label className="mb-5 block text-base font-semibold text-[#07074D] sm:text-xl">
                  Address Details
                </label>
                <div className="-mx-3 flex flex-wrap">
                  <div className="w-full px-3 sm:w-1/2">
                    <div className="mb-5">
                      <input
                        type="text"
                        name="area"
                        id="area"
                        required
                        placeholder="Enter area"
                        className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                      />
                    </div>
                  </div>
                  <div className="w-full px-3 sm:w-1/2">
                    <div className="mb-5">
                      <input
                        type="text"
                        name="city"
                        id="city"
                        required
                        placeholder="Enter city"
                        className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                      />
                    </div>
                  </div>
                  <div className="w-full px-3 sm:w-1/2">
                    <div className="mb-5">
                      <input
                        type="text"
                        name="state"
                        id="state"
                        required
                        placeholder="Enter state"
                        className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                      />
                    </div>
                  </div>
                  <div className="w-full px-3 sm:w-1/2">
                    <div className="mb-5">
                      <input
                        type="text"
                        name="post-code"
                        id="post-code"
                        required
                        placeholder="Post Code"
                        className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <button className="hover:shadow-form w-full rounded-full bg-green-500 hover:bg-green-300 py-3 px-8 text-center text-base font-semibold text-white outline-none">
                  Request a Quote
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
