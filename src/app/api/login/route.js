import { NextResponse } from 'next/server';
import axios from 'axios';

export async function POST(req) {
    try {
        const { body } = await req.json();
        const { data } = await axios.post('http://localhost:3001/login', body);
        return NextResponse.json(data);
    } catch (e) {
        return NextResponse.error(e.response.data);
    }
}