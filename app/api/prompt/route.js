import { connectToDB } from "@utils/database";
import Prompt from '@models/prompt';

export const GET = async (req) => {
    try{
        await connectToDB();
        const prompts = await Prompt.find({}).populate('creator');

        const headers = {
            'Content-Type': 'application/json',
            'Cache-Control': 'no-store, max-age=0', // Prevent caching
        };

        return new Response(JSON.stringify(prompts),{
            status: 200,
            headers:headers,
        })

        

    }catch(error){
        return new Response("Failed to fetch a new Prompt !!");
    }
}