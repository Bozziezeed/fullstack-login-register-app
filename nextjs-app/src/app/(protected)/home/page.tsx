"use client";

import React, { useEffect, useRef, useState } from "react";
import "./home.css";
import { ContactButtons, Footer, Header, Section } from "@/components";

const Home = () => {
  return (
    <>
      <Header />
      <Section />
      <ContactButtons />
      <Footer />
    </>
  );
};

export default Home;
