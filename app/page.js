import LoginForm from "@/Components/frontend/forms/LoginForm";
import Image from "next/image";
import React from "react";

const Home = () => {
  return (
    <div className="flex flex-col h-screen justify-center items-center bg-custom-gradient ">
      <div className="w-full p-6  rounded-lg  flex-col justify-center items-center space-y-6">
        <div className="flex  items-center justify-center space-x-8">
          <div>
            <h1 className="text-center text-3xl font-bold">Welcome Back</h1>
            <p className="text-center text-md text-white py-4">
              Step into the metaverse for an
              <br /> unforgettable experience
            </p>

            <LoginForm />
          </div>
          <div className="flex flex-col">
            <Image src={"/logos/logo.png"} width={300} height={300} alt="" />
            <Image
              src={"/logos/meetus.png"}
              width={300}
              height={300}
              alt=""
              className="absolute bottom-60"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
