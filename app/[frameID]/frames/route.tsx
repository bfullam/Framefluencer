/* eslint-disable react/jsx-key */
import { Button } from "frames.js/next";
import { createFrames } from "frames.js/next";
import { sql } from '@vercel/postgres';

const frames = createFrames();
const handleRequest = frames(async (ctx) => {
  const dynamicRoute = `${ctx.url.pathname.split("/")[1]}`;
  if (ctx.message?.transactionId) {
    await sql`UPDATE FRAMES SET customers = ARRAY_APPEND(customers, ${ctx.message.requesterFid}) WHERE frameid = ${dynamicRoute} RETURNING *;`;
    return {
      image: (
        <div tw="bg-purple-800 text-white w-full h-full justify-center items-center flex">
          Transaction submitted! {ctx.message.transactionId}
        </div>
      ),
      imageOptions: {
        aspectRatio: "1:1",
      },
      buttons: [
        <Button
          action="link"
          target={`https://base-sepolia.blockscout.com/tx/${ctx.message.transactionId}`}
        >
          View on block explorer
        </Button>,
      ],
    };
  }

  // Get the frame ID from the context URL
  const frameID = ctx.url.pathname.split("/")[1];

  // Get frame data from the database
  const {rows} = await sql`SELECT * FROM frames WHERE frameid = ${frameID}`;
  const frameData = rows[0];
  console.log(frameData);

  return {
    image: frameData.imageurl,
    imageOptions: {
      aspectRatio: "1:1",
    },
    buttons: [
      <Button action="tx" target={`/${dynamicRoute}/txdata`} post_url={`/${dynamicRoute}/frames`}>
        Buy now 🎁
      </Button>,
    ],
  };
});

export const GET = handleRequest;
export const POST = handleRequest;
