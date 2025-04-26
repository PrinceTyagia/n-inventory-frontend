'use client';
import React from 'react';
import Link from 'next/link';

const UnauthorizedPage = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="bg-white border-t-4 border-red-600 shadow-xl rounded-2xl p-8 max-w-md text-center">
        <h1 className="text-3xl font-bold text-red-600 mb-4">Unauthorized Access</h1>
        <p className="text-gray-700 mb-6">
          You do not have the required permissions to view this page.
        </p>
        <Link href="/dashboard">
          <span className="inline-block px-6 py-2 bg-red-600 text-white font-semibold rounded hover:bg-red-700 transition">
            ← Back to Dashboard
          </span>
        </Link>
      </div>
    </div>
  );
};

export default UnauthorizedPage;
