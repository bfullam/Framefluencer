"use client";
import {
  DynamicContextProvider,
  DynamicWidget,
} from "@dynamic-labs/sdk-react-core";
import "./globals.css";
import Image from "next/image";
import Link from "next/link";
import { EthereumWalletConnectors } from "@dynamic-labs/ethereum";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <DynamicContextProvider
        settings={{
          environmentId: "7c8a7b2a-5faf-4b2f-9acb-0720d58dafa2",
          walletConnectors: [EthereumWalletConnectors],
        }}
      >
        <body>
          <div className="flex flex-row justify-between items-center border border-b border-gray-300">
            <div className="flex flex-row items-center pl-10 p-3 space-x-5 ">
              <div className="flex flex-row items-center space-x-1">
                <div className="text-lg font-semibold">Framefluence</div>
              </div>
            </div>

            <div>
              {" "}
              <DynamicWidget />
            </div>
          </div>
          <div>{children}</div>
        </body>
      </DynamicContextProvider>
    </html>
  );
}
