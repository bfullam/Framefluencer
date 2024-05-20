import EcomForm from './components/EcomForm';

export const metadata = {
title: "Ecommerce Frame",
description: "...",
};
 
export default async function Home(submitForm: any) {     
    return (
        <EcomForm/>
    );
}
