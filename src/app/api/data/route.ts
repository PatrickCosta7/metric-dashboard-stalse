import { NextResponse } from 'next/server';
import type { DashboardResponse } from '@/types/dashboard';
import dashboard from '@/mocks/dashboard.json';

export function GET(request: Request) {
  try {
    new URL(request.url);

    return NextResponse.json(dashboard as DashboardResponse, {
      status: 200 });
  } catch (error) {
    console.error('Failed to handle dashboard API request:', error);

    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
}