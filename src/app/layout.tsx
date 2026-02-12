import "./globals.css";
import React from "react";

export default function RootLayout({
                                       children,
                                   }: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en">
        <body className="container ">
        {children}
        </body>
        </html>
    );
}
