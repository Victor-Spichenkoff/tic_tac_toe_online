import '@fortawesome/fontawesome-svg-core/styles.css'
import type {Metadata} from "next";
import {Geist, Geist_Mono} from "next/font/google";
import "./globals.css";
import {Providers} from "@/libs/Providers";
import {Permanent_Marker, Gloria_Hallelujah, Patrick_Hand} from "next/font/google";
import {config} from '@fortawesome/fontawesome-svg-core'
import '@fortawesome/fontawesome-svg-core/styles.css'
import {Toaster} from 'sonner'

config.autoAddCss = false


//fontes variadas
// Title
const PermanentMarker = Permanent_Marker({
    subsets: ["latin"],
    weight: ["400"],
    variable: "--font-permanent_marker",
})

//texto
const GloriaHallelujah = Gloria_Hallelujah({
    subsets: ["latin"],
    weight: ["400"],
    variable: "--font-gloria_hallelujah",
})

//icons
const PatricHand = Patrick_Hand({
    subsets: ["latin"],
    weight: ["400"],
    variable: "--font-patric_hand",
})


const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
});

const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
});

export const metadata: Metadata = {
    title: "Tic Tac Toe Online",
    description: "PLay Tic Tac Toe Online or Offline  ",
};

export default function RootLayout({children,
                                   }: Readonly<{
    children: React.ReactNode;
}>) {


    return (
        <html lang="en">
        <body
            className={`${geistSans.variable} ${geistMono.variable} 
        ${PatricHand.variable} ${GloriaHallelujah.variable} ${PermanentMarker.variable}
         antialiased bg-lightBackground dark:bg-darkBackground transition-all duration-500`}
        >

        <Providers>
            {children}
        </Providers>
        </body>
        </html>
    );
}
