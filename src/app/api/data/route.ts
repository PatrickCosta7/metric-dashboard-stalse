import { NextResponse } from 'next/server';
import type { DashboardResponse } from '@/types/dashboard';
import dashboard from '@/mocks/dashboard.json';

export function GET(request: Request) {
  try {
    const url = new URL(request.url);

    // Error simulation triggered by button.
    if (url.searchParams.get('error') === '1') {
      return NextResponse.json({ message: 'Simulated API error' }, { status: 500 });
    }

    return NextResponse.json(dashboard as DashboardResponse, {
      status: 200,
      headers: { 'Cache-Control': 'no-store' },
    });
  } catch (error) {
    console.error('Failed to handle dashboard API request:', error);

    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}