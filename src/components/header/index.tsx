import React, { useState, useEffect } from "react";
import axios from "axios";
let deferredPrompt;

import { Logo } from "@components";

export const Header: React.FC = () => {
    const [installable, setInstallable] = useState(false);
    useEffect(() => {
        window.addEventListener("beforeinstallprompt", (e: any) => {
            e.preventDefault();
            // Stash the event so it can be triggered later.
            deferredPrompt = e;
            // Update UI notify the user they can install the PWA
            setInstallable(true);
        });

        window.addEventListener("appinstalled", () => {
            // Log install to analytics
            console.log("INSTALL: Success");
        });
    }, []);

    const handleInstallClick = (e: any) => {
        // Hide the app provided install promotion
        setInstallable(false);
        // Show the install prompt
        deferredPrompt.prompt();
        // Wait for the user to respond to the prompt
        deferredPrompt.userChoice.then((choiceResult) => {
            if (choiceResult.outcome === "accepted") {
                console.log("User accepted the install prompt");
            } else {
                console.log("User dismissed the install prompt");
            }
        });
    };
    return (
        <div className="text-center bg-gray-800">
            {installable && (
                <button className="install-button" onClick={handleInstallClick}>
                    INSTALL ME
                </button>
            )}
            <Logo />
        </div>
    );
};
