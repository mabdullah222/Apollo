'use client';

import React, { useState } from 'react';
import { useUser } from '@clerk/nextjs';

const SettingsPage = () => {
  const { user, isLoaded } = useUser();

  const [firstName, setFirstName] = useState(user?.firstName || '');
  const [lastName, setLastName] = useState(user?.lastName || '');
  const [email, setEmail] = useState(user?.emailAddresses[0]?.emailAddress || '');
  const [loading, setLoading] = useState(false);

  if (!isLoaded) return <div>Loading settings...</div>;

  const handleSave = async () => {
    setLoading(true);
    try {
      await user.update({
        firstName,
        lastName,
      });

      const primaryEmail = user.emailAddresses.find(e => e.id === user.primaryEmailAddressId);
      if (primaryEmail && primaryEmail.emailAddress !== email) {
        await user.createEmailAddress({ email });
        await user.setPrimaryEmailAddress({ emailAddress: email });
        await primaryEmail.destroy();
      }

      await user.reload(); // Refresh data
      alert('Profile updated!');
    } catch (err) {
      console.error('Error updating user:', err);
      alert('Something went wrong. See console.');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (confirm('Are you sure you want to delete your account? This cannot be undone.')) {
      try {
        await user.delete();
      } catch (err) {
        console.error('Error deleting account:', err);
        alert('Failed to delete account.');
      }
    }
  };

  return (
    <div className="max-w-2xl mx-auto h-full p-6 mt-10 bg-white shadow-lg rounded-lg text-black">
      <h1 className="text-2xl font-bold mb-6">Account Settings</h1>

      {/* Editable Fields */}
      <div className="space-y-4 mb-6">
        <div>
          <label className="block text-sm font-medium">First Name</label>
          <input
            className="w-full mt-1 p-2 border rounded"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
        </div>

        <div>
          <label className="block text-sm font-medium">Last Name</label>
          <input
            className="w-full mt-1 p-2 border rounded"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
        </div>

        <div>
          <label className="block text-sm font-medium">Email</label>
          <input
            className="w-full mt-1 p-2 border rounded"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
      </div>

      <button
        onClick={handleSave}
        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
        disabled={loading}
      >
        {loading ? 'Saving...' : 'Save Changes'}
      </button>

      {/* Danger Zone */}
      <div className="mt-8 border-t pt-6">
        <h2 className="text-xl font-semibold text-red-600 mb-2">Danger Zone</h2>
        <button
          onClick={handleDelete}
          className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
        >
          Delete My Account
        </button>
      </div>
    </div>
  );
};

export default SettingsPage;
