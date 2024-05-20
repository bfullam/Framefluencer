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
  const [frameCreated, setFrameCreated] = useState(false);
  const [framefluencersSelected, setFramefluencersSelected] = useState(false);
  const { primaryWallet } = useDynamicContext();

  const framefluencers = [ 
    { id: "1", name: "vitalik.eth", followers: "253,053" },
    { id: "2", name: "jessepollak", followers: "295,354" },
    { id: "3", name: "dwr.eth", followers: "301,110" },
    { id: "4", name: "dcposch.eth", followers: "274,506" },
    { id: "5", name: "coopahtroopa.eth", followers: "267,769" },
    { id: "6", name: "mikedemarais.eth", followers: "242,531" },
    { id: "7", name: "nonlinear.eth", followers: "240,196" },
   ];

  return (
    <>
      <div className="flex justify-center">
        <div className="flex flex-col justify-center items-center space-y-5">
          { !frameCreated && (
            <>
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
                        setFrameCreated(true);
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
                        Set Product Price in WEI
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
                    </form>
                  </div>
                </div>
                
              </div>
            </>
          )}
          {frameCreated && !framefluencersSelected && (
            <>
            <div className="text-2xl font-bold pt-5">Choose your Framefluencers</div>
            {framefluencers.map((account) => (
              <div key={account.id}>
                <input
                  type="checkbox"
                  id={account.id}
                  name={account.id}
                  value={account.id}
                />
                <label htmlFor={account.id}> {account.name}: {account.followers} followers</label>
              </div>
            ))}
            <button
              onClick={() => {
                setFramefluencersSelected(true);
              }}
              className="bg-black font-bold text-white text-md rounded-lg p-1 px-2"
            >
              Submit
            </button>
            </>
          )}
          {frameCreated && framefluencersSelected && (
            <div className="text-2xl font-bold pt-5">Congrats! Your selected framefluencers have been notified of your campaign.</div>
          )}
        </div>
      </div>

      {/* {blob && (
        <div>
          Blob url: <a href={blob.url}>{blob.url}</a>
        </div>
      )} */}
    </>
  );
}
