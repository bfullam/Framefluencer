"use client";

import { type PutBlobResult } from "@vercel/blob";
import { upload } from "@vercel/blob/client";
import { useState, useRef } from "react";
import EcomSVG from "./EcomSVG";

export default function EcomForm() {
  const inputFileRef = useRef<HTMLInputElement>(null);
  const inputWalletRef = useRef<HTMLInputElement>(null);
  const inputPriceRef = useRef<HTMLInputElement>(null);
  const [blob, setBlob] = useState<PutBlobResult | null>(null);
  const [fileName, setFileName] = useState("");

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files && event.target.files[0];
    if (file) {
      setFileName(file.name);
    }
  };

  return (
    <div className="flex justify-center">
      <div className="flex flex-col justify-center items-center space-y-5">
        <div className="text-2xl font-bold">Create Your Frame</div>
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
                <div className="pb-8">
                  <EcomSVG />
                  <label
                    className="flex w-fit items-center space-x-2 cursor-pointer px-4 py-2 bg-white font-bold text-md rounded"
                    htmlFor="hidden-file-input"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      className="w-6 h-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M2.25 15.75l5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
                      />
                    </svg>
                    <div>UPLOAD PRODUCT IMAGE</div>
                  </label>
                  <input
                    id="hidden-file-input"
                    type="file"
                    required
                    className="hidden"
                    onChange={handleFileChange}
                  />
                  {fileName && (
                    <div className="">
                      <span className="text-sm pt-2 font-medium text-white">
                        {fileName}
                      </span>
                      <input
                        id="hidden-file-input"
                        name="file"
                        ref={inputFileRef}
                        type="file"
                        required
                        className="hidden"
                      />

                      <div className="text-white font-medium pt-3">
                        Set Wallet Address
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
                      <div className="pt-3">
                        <button
                          className="bg-white font-bold text-black text-md rounded-lg p-1 px-2"
                          type="submit"
                        >
                          Submit
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </form>
            </div>
          </div>
          {blob && (
            <div>
              Blob url: <a href={blob.url}>{blob.url}</a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
