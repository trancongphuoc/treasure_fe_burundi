import { ThemeProvider, createTheme } from "@mui/material/styles";
import axios, { AxiosRequestConfig } from "axios";
import Head from "next/head";
import { useEffect } from "react";
import { SITE_NAME, SITE_SLOGAN, StorageKey } from "../constants";
import { serviceOptions } from "../services/serviceOptions";
import "../styles/index.css";
import { AppProps } from "next/app";
const Qs = require('qs');

const THEME = createTheme({
  typography: {
    "fontFamily": `Fira Sans`
    // "fontSize": 14,
    // "fontWeightLight": 300,
    // "fontWeightRegular": 400,
    // "fontWeightMedium": 500
  }
});
export default function MyApp({ Component, pageProps }: AppProps) {
  useEffect(() => {
    if (!localStorage.getItem(StorageKey.accessToken)) {
      const axiosConfig: AxiosRequestConfig = {
        baseURL: process.env.NEXT_PUBLIC_API_URL || window.location.origin,
        timeout: 60000 // 1 phút
      };
      serviceOptions.axios = axios.create(axiosConfig);
      
    } else {
      const axiosConfig: AxiosRequestConfig = {
        baseURL: process.env.NEXT_PUBLIC_API_URL || window.location.origin,
        timeout: 60000, // 1 phút
        paramsSerializer: (params) =>
          Qs.stringify(params, { arrayFormat: 'repeat' }),
        headers: {
          Authorization: `Bearer ${localStorage.getItem(StorageKey.accessToken)}`,
          'Access-Control-Allow-Origin': '*',
        }
      };
      serviceOptions.axios = axios.create(axiosConfig);
      
    }
  }, [])
  return (
    <>
      <Head>
        <title>
          {SITE_NAME} - {SITE_SLOGAN}
        </title>
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width"
        />
        {/*<link*/}
        {/*  rel="preconnect"*/}
        {/*  href="https://fonts.gstatic.com"*/}
        {/*  crossOrigin={'anonymous'}*/}
        {/*/>*/}
        <link
          href="https://fonts.googleapis.com/css2?family=Fira+Sans:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap"
          rel="stylesheet" />
      </Head>
      <ThemeProvider theme={THEME}>
        <Component {...pageProps} />
      </ThemeProvider>
    </>
  );
}
