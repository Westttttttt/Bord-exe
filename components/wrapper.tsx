import type React from "react";
import { ThemeProvider } from "./theme-provider";
import Navbar from "./navbar";
import { auth } from "@/auth";
import { getCurrentUser } from "@/actions/auth";

export default async function Wrapper({
    children,
}: {
    children: React.ReactNode;
}) {
    let session = await auth();
    if (!session) {
        try {
            session = await getCurrentUser();
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className="w-full mx-auto min-h-screen">
            <ThemeProvider
                attribute="class"
                defaultTheme="dark"
                enableSystem
                disableTransitionOnChange
            >
                <div className="max-w-7xl mx-auto">
                    <Navbar session={session} />
                    {children}
                </div>
            </ThemeProvider>
        </div>
    );
}
