import type React from "react";
import { ThemeProvider } from "./theme-provider";

export default function Wrapper({ children }: { children: React.ReactNode }) {
    return (
        <div className="max-w-7xl mx-auto min-h-screen">
            <ThemeProvider
                attribute="class"
                defaultTheme="dark"
                enableSystem
                disableTransitionOnChange
            >
                {children}
            </ThemeProvider>
        </div>
    );
}
