import React from "react";
import Head from "next/head";
import LoginForm from "../src/components/Forms/Login/LoginForm";

const login = () => (
  <div>
    <Head>
      <title>Saso App | Login</title>
      <meta name="description" content="Saso Application Login" />
      <link rel="icon" href="/favicon.ico" />
    </Head>
    <main className="relative z-10 flex-auto flex items-center justify-center text-sm text-center text-gray-600 py-16 px-4 sm:px-6 lg:px-8">
      <LoginForm />
    </main>
  </div>
);

export default login;
