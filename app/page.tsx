import { sql } from '@vercel/postgres';
import EcomForm from './components/EcomForm';

export const metadata = {
title: "Ecommerce Frame",
description: "...",
};
 
export default async function Home(submitForm: any) {     
    // // Get frame data from the database
    // const {rows} = await sql`SELECT * FROM frames WHERE frameid = fbf01bba-efe7-483a-8d53-c8030b7633da`;
    // const frameData = rows[0];
    // console.log(frameData);

    // console.log('test');
    return (
        <EcomForm/>
    );
}
