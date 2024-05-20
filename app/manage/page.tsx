'use client';
import { useDynamicContext } from "@dynamic-labs/sdk-react-core";

export default function Manage() {     
    const {primaryWallet} = useDynamicContext();
    const primaryWalletAddress = primaryWallet?.address;
    return (
        <>{primaryWalletAddress}</>
    );
}
