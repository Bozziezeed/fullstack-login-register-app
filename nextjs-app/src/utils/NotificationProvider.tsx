/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { notification } from "antd";
import React, { useContext } from "react";

export const NotificationContext = React.createContext({
  success: (text: string) => {},
  info: (text: string) => {},
  error: (text: string) => {},
});

export function NotificationProvider({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [api, contextHolder] = notification.useNotification();

  return (
    <NotificationContext.Provider
      value={{
        success: (text: string) => {
          api.success({
            message: text,
            style: {
              fontFamily: "__Mitr_058b0d",
            },
          });
        },
        info: (text: string) => {
          api.info({
            message: text,
            style: {
              fontFamily: "__Mitr_058b0d",
            },
          });
        },
        error: (text: string) => {
          api.error({
            message: text,
            style: {
              fontFamily: "__Mitr_058b0d",
            },
          });
        },
      }}
    >
      {contextHolder}
      {children}
    </NotificationContext.Provider>
  );
}

export const useNotificationContext = () => {
  return useContext(NotificationContext);
};
