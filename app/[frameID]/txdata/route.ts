import { TransactionTargetResponse } from "frames.js";
import { NextRequest, NextResponse } from "next/server";
import { sql } from '@vercel/postgres';

export async function POST(
  req: NextRequest
): Promise<NextResponse<TransactionTargetResponse>> {
  // Get the frame ID from the request URL
  const frameID = req.nextUrl.pathname.split('/')[1];

  // Get frame data from the database
  const {rows} = await sql`SELECT * FROM frames WHERE frameid = ${frameID}`;
  const frameData = rows[0];
  if (!frameData.receivingwallet) {
    throw new Error("Missing TO_ADDRESS environment variable");
  }
  if (!frameData.price) {
    throw new Error("Missing TRANSACTION_VALUE environment variable");
  }

  return NextResponse.json({
    chainId: "eip155:84532", // Base Sepolia Testnet
    method: "eth_sendTransaction",
    params: {
      abi: [],
      to: frameData.receivingwallet,
      value: frameData.price,
    },
  });
}
