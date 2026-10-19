"use client";

import { PropsWithChildren, useEffect, useState } from "react";

const isMockingEnabled = process.env.NEXT_PUBLIC_API_MOCKING === "enabled";

// Starts the MSW browser worker and holds rendering until it is ready,
// so the first requests are already served from mocks.
export function MswWorker({ children }: PropsWithChildren) {
    const [isMswReady, setIsMswReady] = useState(!isMockingEnabled);

    useEffect(() => {
        if (!isMockingEnabled) return;

        const enableMocking = async () => {
            const { worker } = await import("../../../mocks/browser");
            await worker.start({
                onUnhandledRequest: "bypass",
            });
            setIsMswReady(true);
        };

        enableMocking();
    }, []);

    if (!isMswReady) {
        return "loading msw worker...";
    }

    return <>{children}</>;
}
