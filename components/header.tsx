"use client";

import { Loader2 } from "lucide-react";
import { UserButton, ClerkLoaded, ClerkLoading } from "@clerk/nextjs";
import { HeaderLogo } from "@/components/header-logo";
import { Navigation } from "@/components/navigation";
import { WelcomeMsg } from "@/components/welcome-msg";
import { useMedia } from "react-use";

export const Header = () => {

    const isMobile = useMedia("(max-width: 1024px)",false);

    return (
        <header className="bg-gradient-to-b from-blue-700 to-blue-500 px-4 py-8 lg:px-14 pb-36">
            <div className="max-w-screen-2xl mx-auto">
                <div className="w-full flex items-center justify-between mb-14">
                    {isMobile?"":<HeaderLogo />}
                    <Navigation isMobile={isMobile} />
                    <ClerkLoaded>
                        <UserButton afterSignOutUrl="/" />
                    </ClerkLoaded>
                    <ClerkLoading>
                        <Loader2 className="size-8 animate-spin text-slate-400" />
                    </ClerkLoading>
                </div>
                <WelcomeMsg />
            </div>
        </header>
    );
};
