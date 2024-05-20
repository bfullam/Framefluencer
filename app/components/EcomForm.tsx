"use client";

import { useDynamicContext } from "@dynamic-labs/sdk-react-core";
import { type PutBlobResult } from "@vercel/blob";
import { upload } from "@vercel/blob/client";
import { useState, useRef } from "react";
import EcomSVG from "./EcomSVG";

export default function EcomForm() {
  const inputFileRef = useRef<HTMLInputElement>(null);
  const inputWalletRef = useRef<HTMLInputElement>(null);
  const inputPriceRef = useRef<HTMLInputElement>(null);
  const [blob, setBlob] = useState<PutBlobResult | null>(null);
  const { primaryWallet } = useDynamicContext();
  return (
    <>
      <div className="flex justify-center">
        <div className="flex flex-col justify-center items-center space-y-5">
          <div className="text-2xl font-bold pt-5">Create Your Frame</div>
          <div className="bg-[#7961F2] p-3 w-[70rem] rounded-lg">
            <div className="outline-dashed outline-white bg-[#705ADC] outline-2 p-7 rounded-lg">
              <div className="flex justify-center pt-8">
                <form
                  onSubmit={async (event) => {
                    event.preventDefault();

                    if (!inputFileRef.current?.files) {
                      throw new Error("No file selected");
                    }
                    if (!inputWalletRef.current?.value) {
                      throw new Error("No wallet address provided");
                    }
                    if (!inputPriceRef.current?.value) {
                      throw new Error("No price provided");
                    }

                    const file = inputFileRef.current.files[0];

                    const blob = await upload(file.name, file, {
                      access: "public",
                      handleUploadUrl: "/api/form/upload",
                    });
                    setBlob(blob);

                    const postData = {
                      imageUrl: blob.url,
                      receivingWallet: inputWalletRef.current.value,
                      price: inputPriceRef.current.value,
                      ownerWallet: primaryWallet?.address,
                    };

                    await fetch("/api/form/uploadFrame", {
                      method: "POST",
                      headers: {
                        "Content-Type": "application/json",
                      },
                      body: JSON.stringify(postData),
                    });
                  }}
                >
                  <EcomSVG />
                  <label
                    className="flex w-fit items-center space-x-2 cursor-pointer px-4 py-2 bg-white font-bold text-md rounded"
                    htmlFor="hidden-file-input"
                  >
                    <input
                      id="hidden-file-input"
                      type="file"
                      required
                      ref={inputFileRef}
                    />
                  </label>
                  
                  <div className="text-white font-medium pt-3">
                    Set Wallet Address (Receiving )
                  </div>
                  <input
                    type="text"
                    id="wallet"
                    name="wallet"
                    ref={inputWalletRef}
                    className="focus:outline-none focus:ring-0 rounded"
                  ></input>

                  <div className="text-white pt-3 font-medium">
                    Set Product Price in ETH
                  </div>
                  <input
                    type="text"
                    id="price"
                    name="price"
                    ref={inputPriceRef}
                    className="focus:outline-none focus:ring-0 rounded"
                  ></input>

                  <div className="text-white pt-3 font-medium">
                    Set Influencer Revenue Share %
                  </div>
                  <input
                    type="text"
                    id="influencerRevenueShare"
                    name="influencerRevenueShare"
                    className="focus:outline-none focus:ring-0 rounded"
                  ></input>
                    
                  <div className="pt-3">
                    <button
                      className="bg-white font-bold text-black text-md rounded-lg p-1 px-2"
                      type="submit"
                    >
                      Submit
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>

      {blob && (
        <div>
          Blob url: <a href={blob.url}>{blob.url}</a>
        </div>
      )}
    </>
  );
}
