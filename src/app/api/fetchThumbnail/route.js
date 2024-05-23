import { NextResponse } from 'next/server';
import { fetchRandomImage } from '@/app/utils/fetchRandomImage';

export async function GET() {
  try {
    const thumbnail = await fetchRandomImage();
    return NextResponse.json({ thumbnail });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch thumbnail' }, { status: 500 });
  }
}
