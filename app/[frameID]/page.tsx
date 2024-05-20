import type { Metadata } from "next";
import { fetchMetadata } from "frames.js/next";
import { vercelURL } from "../utils";
import { sql } from "@vercel/postgres";

type Props = {
  params: { frameID: string };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  return {
    title: "Ecommerce Frame",
    description: "This is an ecommerce Frame",
    other: {
      ...(await fetchMetadata(
        new URL(
          `/${params.frameID}/frames`,
          vercelURL() || "http://localhost:3000"
        )
      )),
    },
  };
}

export default async function Home() {
  // Get the frame ID from the URL
  const frameID = "fbf01bba-efe7-483a-8d53-c8030b7633da";

  // Get frame data from the database
  const {rows} = await sql`SELECT * FROM frames WHERE frameid = ${frameID}`;
  const frameData = rows[0];
  console.log(frameData);

  console.log('test');
  return <div>Ecommerce Frame</div>;
}
