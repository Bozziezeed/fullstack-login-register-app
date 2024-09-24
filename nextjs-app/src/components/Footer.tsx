/* eslint-disable @next/next/no-html-link-for-pages */
import Link from "next/link";
import { FaFacebookF } from "react-icons/fa";
import { MdOutlineMail } from "react-icons/md";
import { FaPhone } from "react-icons/fa6";
import { useTranslations } from "next-intl";

export default function Footer() {
  const f = useTranslations("Footer");
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
            <p className="text-[20px] font-extralight"> {f("overview")}</p>
            <li>
              <Link href={"#"} className="text-[18px] font-medium">
                {f("service")}
              </Link>
            </li>
            <li>
              <Link href={"#"} className="text-[18px] font-medium">
                {f("who")}
              </Link>
            </li>
            <li>
              <Link href={"#"} className="text-[18px] font-medium">
                {f("article")}
              </Link>
            </li>
            <li>
              <Link href={"#"} className="text-[18px] font-medium">
                {f("privacy")}
              </Link>
            </li>
          </ul>
          <div className="flex flex-col gap-4  lg:max-w-[277px]">
            <p className="text-[20px] font-extralight"> {f("business")}</p>
            <p className="text-[18px] font-normal">{f("address")}</p>
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
