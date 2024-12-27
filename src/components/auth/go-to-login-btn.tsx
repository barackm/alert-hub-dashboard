"use client";
import React from "react";
import { Button } from "../ui/button";
import { logoutAsync } from "./actions";

const GoToLoginBtn = () => {
  return <Button onClick={logoutAsync}>Go To Login</Button>;
};

export default GoToLoginBtn;
