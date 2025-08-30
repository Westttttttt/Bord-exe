"use client";

import { login, logout } from "@/actions/auth";
import { Button } from "./ui/button";

export default function SignOutButton() {
    return <Button onClick={() => logout()}>Sign Out</Button>;
}
