import type { Metadata } from "next";
import { fetchMetadata } from "frames.js/next";
import { vercelURL } from "../utils";

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
  return <div>Ecommerce Frame</div>;
}
