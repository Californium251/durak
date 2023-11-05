import { NextResponse } from 'next/server';
import axios from 'axios';

export async function GET(req) {
    try {
        const gameId = req.nextUrl.searchParams.get('id');
        const game = await axios.get(`http://localhost:3001/get-game/${gameId}`);
        return NextResponse.json(game.data);
    } catch (e) {
        return NextResponse.error(e.response.data);
    }
}
