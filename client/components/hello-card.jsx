"use client";

import React from 'react';
import Image from 'next/image';
import { useUser } from '@clerk/nextjs';

const HelloCard = () => {
  const { user, isLoaded } = useUser();

  if (!isLoaded) {
    return (
      <div className="flex flex-col w-full">
        <div className="py-3 px-7 min-h-[200px] max-h-[200px] flex flex-row rounded-lg bg-gray-100 text-black">
          <div className="grow flex flex-col justify-center">
            <p className="text-2xl font-semibold">Loading...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col w-full">
      <div className="py-3 px-7 min-h-[200px] max-h-[200px] flex flex-row rounded-lg bg-gray-100 text-black">    
        <div className="grow flex flex-col justify-center"> 
          <p className="text-4xl font-extrabold">Hello {user.firstName}!</p>
          <p className="text-sm text-neutral-800">It's good to see you again</p>
        </div>
        <div className="flex flex-row grow justify-center">
          <Image
            className="rounded-full"
            src="/male.jpg"
            height={200}
            width={200}
            alt="Profile"
          />
        </div>
      </div>
    </div>
  );
};

export default HelloCard;
