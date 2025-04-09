import { getProperties } from '@/app/grid/actions/get-properties';
import { type NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const properties = await getProperties(body);
    return NextResponse.json(properties);
  } catch (error) {
    console.error('Error filtering properties:', error);
    return NextResponse.json(
      { error: 'Failed to filter properties' },
      { status: 500 }
    );
  }
}
