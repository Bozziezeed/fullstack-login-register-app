"use client";
import React, { useEffect, useState } from "react";
import { RiMessage2Fill, RiCloseLargeFill } from "react-icons/ri";
import { FaLine, FaPhone } from "react-icons/fa6";
import { MdOutlineMail } from "react-icons/md";
import Link from "next/link";

const ContactButtons = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [bounce, setBounce] = useState("");

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  // Trigger bounce on render and remove it after animation completes
  useEffect(() => {
    setBounce("bounce-3 box");

    const bounceTimeout = setTimeout(() => {
      setBounce(""); // Remove the bounce class after the animation duration
    }, 1000); // Adjust time to match the bounce animation duration (1 second)

    return () => clearTimeout(bounceTimeout); // Cleanup timeout on unmount
  }, []);

  return (
    <div className="fixed bottom-8 right-8 flex flex-col items-center space-y-3 ">
      {/* Contact Options */}
      <div
        className={`transition-all duration-500 ease-in-out transform ${
          isOpen
            ? "opacity-100 translate-y-0"
            : "opacity-0 translate-y-4 pointer-events-none"
        }`}
      >
        {isOpen && (
          <div className="flex flex-col space-y-3 ">
            {/* LINE Button */}
            <Link
              href="https://line.me"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-green-500 text-white p-4 rounded-full shadow-lg hover:bg-green-600 transition duration-300 flex items-center justify-center"
            >
              <FaLine />
            </Link>

            {/* Phone Button */}
            <Link
              href="tel:+123456789"
              className="bg-gray-500 text-white p-4 rounded-full shadow-lg hover:bg-gray-600 transition duration-300 flex items-center justify-center"
            >
              <FaPhone />
            </Link>

            {/* Email Button */}
            <Link
              href="mailto:example@example.com"
              className="bg-gray-500 text-white p-4 rounded-full shadow-lg hover:bg-gray-600 transition duration-300 flex items-center justify-center"
            >
              <MdOutlineMail />
            </Link>
          </div>
        )}
      </div>
      {/* Main Button */}
      <button
        onClick={toggleMenu}
        className={`${bounce} bg-blue-500 text-white p-4 rounded-full shadow-lg hover:bg-blue-600 transition duration-300 transform ${
          isOpen ? "rotate-180" : "rotate-0 "
        }`}
      >
        {isOpen ? (
          <RiCloseLargeFill className="transform transition-transform duration-300" />
        ) : (
          <RiMessage2Fill className="transform transition-transform duration-300" />
        )}
      </button>
    </div>
  );
};

export default ContactButtons;
