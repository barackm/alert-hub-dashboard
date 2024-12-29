import GoToLoginBtn from "@/components/auth/go-to-login-btn";
import React from "react";

const AccountPendingStatusPage = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 text-gray-800">
      <div className="bg-white shadow-md rounded-lg p-6 max-w-md text-center">
        <h3 className="text-xl font-semibold mb-4">
          Your account is in Pending <br />
          or Inactive mode, <br />
          Please contact your administrator to activate your account to give you
          access to the Dashboard
        </h3>
        <GoToLoginBtn />
      </div>
    </div>
  );
};

export default AccountPendingStatusPage;
