"use client";

import { login } from "@/actions/auth";
import { Button } from "./ui/button";

export default function SignInButton() {
    return <Button onClick={() => login()}>Sign in with github</Button>;
}
