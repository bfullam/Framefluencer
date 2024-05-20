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
                <Image
                  src="/flames.jpg" // The path to your image
                  alt="Description of the image" // Alternative text for the image
                  width={40} // Desired width of the image (can be changed)
                  height={20} // Desired height of the image (can be changed)
                />
                <div className="text-lg font-semibold">Framefluencer</div>
              </div>

              {/* <Link href="/" passHref>
                <span className="font-semibold pl-5">Create</span>{" "}
              </Link>
              <Link href="/manage" passHref>
                <span className="font-semibold">Manage</span>{" "}
              </Link> */}
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
