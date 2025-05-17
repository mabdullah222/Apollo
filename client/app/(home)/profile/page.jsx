'use client';

import React from 'react';
import { useUser } from '@clerk/nextjs';

const ProfilePage = () => {
  const { user, isLoaded } = useUser();
  console.log(user)

  if (!isLoaded) return <div>Loading...</div>;

  return (
    <div className="p-6 max-w-md mx-auto mt-10 h-[400px] bg-white shadow-lg rounded-xl flex flex-col justify-center items-center text-black">
      <h1 className="text-2xl font-bold mb-6">My Profile</h1>

      <img
        src={user.imageUrl}
        alt="Profile"
        className="w-24 h-24 rounded-full border border-gray-300 mb-4 object-cover"
      />

      <div className="text-center space-y-2">
        <p><strong>Id:</strong> {user.id || 'N/A'}</p>
        <p><strong>Email:</strong> {user.emailAddresses[0]?.emailAddress}</p>
        <p><strong>First Name:</strong> {user.firstName || 'N/A'}</p>
        <p><strong>Last Name:</strong> {user.lastName || 'N/A'}</p>
        <p><strong>Last Sign In:</strong> {user.lastSignInAt ? new Date(user.lastSignInAt).toLocaleString() : 'N/A'}</p>
      </div>
    </div>
  );
};

export default ProfilePage;
