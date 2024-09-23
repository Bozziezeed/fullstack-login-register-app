/* eslint-disable @next/next/no-html-link-for-pages */
import Link from "next/link";
import { FaFacebookF } from "react-icons/fa";
import { MdOutlineMail } from "react-icons/md";
import { FaPhone } from "react-icons/fa6";

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth", // Adds smooth scrolling
    });
  };
  return (
    <>
      <footer className="max-w-[1280px] mx-auto p-8 flex flex-col gap-16 ">
        <div className="flex flex-col lg:flex-row  gap-20 justify-between">
          <ul className="flex flex-col gap-4 ">
            <p className="text-[20px] font-extralight">Overview</p>
            <li>
              <Link href={"#"} className="text-[18px] font-medium">
                Services
              </Link>
            </li>
            <li>
              <Link href={"#"} className="text-[18px] font-medium">
                Who we are
              </Link>
            </li>
            <li>
              <Link href={"#"} className="text-[18px] font-medium">
                Article
              </Link>
            </li>
            <li>
              <Link href={"#"} className="text-[18px] font-medium">
                Privacy Policy
              </Link>
            </li>
          </ul>
          <div className="flex flex-col gap-4  lg:max-w-[277px]">
            <p className="text-[20px] font-extralight">Business Info</p>
            <p className="text-[18px] font-normal">
              Empire Tower Building, 47th Floor, Unit 4703, Sathon Tai Road, Yan
              Nawa Sub-district, Sathon District, Bangkok
            </p>
            <button className="bg-gray-200 p-4 rounded-full text-[18px] hover:bg-green-500 font-medium hover:text-white">
              (66) 0000-0000
            </button>
            <button className="bg-gray-200 p-4 rounded-full text-[18px] hover:bg-green-500 font-medium hover:text-white">
              info@mail.co.th
            </button>
          </div>
        </div>
        <div className="flex flex-col lg:flex-row gap-10  justify-between items-center">
          <p className="text-[14px] font-medium text-blue-200">
            &#169; 2024 | Powered by MyCompany
          </p>
          <ul className="flex flex-row gap-4">
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
          <button
            onClick={scrollToTop}
            className=" py-2 px-6 rounded-full  hover:bg-gray-200 font-medium "
          >
            Back to top
          </button>
        </div>
      </footer>
    </>
  );
}
