"use client"

import {Provider} from "react-redux";
import {store} from "@/libs/redux";
import {Toaster} from "sonner";
import {getStorageTheme} from "@/libs/localStorage/theme";
import {useEffect, useState} from "react";

interface ProvidersProps {
    children: React.ReactNode;
}

export const Providers = ({children}: ProvidersProps) => {

    return (
        <Provider store={store}>
            <Toaster richColors closeButton position={"top-right"} duration={2000} />
            {children}
        </Provider>
    )
}
