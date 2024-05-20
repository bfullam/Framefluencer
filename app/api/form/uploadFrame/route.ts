
import { sql } from '@vercel/postgres';
import { NextResponse } from 'next/server';
 
export async function POST(request: Request): Promise<NextResponse> {
  const body = await request.json();
 
  try {
    await sql`INSERT INTO FRAMES (imageurl, receivingwallet, price, ownerwallet) VALUES (${body.imageUrl}, ${body.receivingWallet}, ${body.price}, ${body.ownerWallet}) RETURNING *;`;
 
    return NextResponse.json({ message: 'Frame uploaded'});
  } catch (error) {
    return NextResponse.json(
      { error: (error as Error).message },
      { status: 400 }, // The webhook will retry 5 times waiting for a 200
    );
  }
}