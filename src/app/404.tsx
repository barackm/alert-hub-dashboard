import Link from "next/link";
import React from "react";

const NotFoundPage = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 text-gray-800">
      <div className="text-center">
        <h1 className="text-6xl font-bold mb-4">404</h1>
        <p className="text-xl mb-8">Page Not Found</p>
        <Link href="/">
          <a className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
            Go to Homepage
          </a>
        </Link>
      </div>
    </div>
  );
};

export default NotFoundPage;
