import { NextResponse } from "next/server";
import axios from "axios";

export async function POST(req) {
    try {
        const { body } = await req.json();
        const res = await axios.post('http://localhost:3001/create-game', body);
        return NextResponse.json({ game: res.data });
    } catch (e) {
        return NextResponse.error(e.response.data);
    }
}

export async function GET(req) {
    // try {
    //     const body = await req.json();
    //     console.log(body);
    // } catch (e) {
    //     NextResponse.error(e.response.data);
    // }
    return NextResponse.error({ message: 'GET response to this path is not allowed' });
}
