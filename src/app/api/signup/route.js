import { NextResponse } from 'next/server';
import axios from 'axios';

export async function POST(req) {
    try {
        const { body } = await req.json();
        const userId = await axios.post('http://localhost:3001/signup', body);
        return NextResponse.json(userId.data);
    } catch (e) {
        return NextResponse.error(e.response.data);
    }
}