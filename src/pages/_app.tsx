import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ToastProvider } from "@/components/Toast";
import Head from "next/head";

const queryClient = new QueryClient();

export default function App({ Component, pageProps }: AppProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <Head>
        <title>DiDesa</title>
        <meta name="description" content="Digitalisasi Desa" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <ToastProvider>
        <Component {...pageProps} />
      </ToastProvider>
    </QueryClientProvider>
  );
}
