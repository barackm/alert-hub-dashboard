import { Button } from "@/components/ui/button";
import React from "react";

const AccountPendingStatusPage = () => {
  return (
    <div className="h-screen w-screen flex justify-center items-center text-center">
      <h3>
        Your account is in pending mode, <br />
        Please contact your administrator to activate your account to give you
        access to the Dashboard
      </h3>
      <br />
      <br />
      <Button>Go to Login</Button>
    </div>
  );
};

export default AccountPendingStatusPage;
