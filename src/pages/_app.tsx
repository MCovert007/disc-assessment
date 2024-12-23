import "flatpickr/dist/flatpickr.min.css";
import "@/styles/globals.scss";
import "@/css/satoshi.css";
import "@/css/style.css";

import type { AppProps } from "next/app";
import { SessionProvider } from 'next-auth/react';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <SessionProvider session={pageProps.session}>
      <Component {...pageProps} />
    </SessionProvider>
  )
}
