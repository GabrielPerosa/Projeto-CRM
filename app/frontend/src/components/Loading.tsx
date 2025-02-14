"use client"
import { ProgressSpinner } from "primereact/progressspinner";

export function Loading() {
    return (    
        <div className="flex justify-content-center h-screen items-center">
            <ProgressSpinner />
        </div>
    )
}