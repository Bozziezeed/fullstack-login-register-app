/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import React, { useEffect, useState } from "react";
import "./home.css";
import { ContactButtons, Footer, Header, Section } from "@/components";
import { useNotificationContext } from "@/utils/NotificationProvider";
import { useRouter } from "next/navigation";
import { extractError } from "@/utils";
import { GET, USER } from "@/utils/api.util";
import { User } from "@/models/response-model";
import { useLocale } from "next-intl";

const Home = () => {
  const noti = useNotificationContext();
  const router = useRouter();
  const [user, setUser] = useState<User>();
  const localActive = useLocale();

  useEffect(() => {
    getUser();
  }, []);

  const getUser = async () => {
    try {
      const res = await GET(USER, {});
      const { data } = res;
      setUser(data);
    } catch (err: unknown) {
      noti.error(extractError(err));
      router.push(`/${localActive}/login`);
    }
  };
  if (user) {
    return (
      <>
        <Header user={user} />
        <Section />
        <ContactButtons />
        <Footer />
      </>
    );
  }
};

export default Home;
