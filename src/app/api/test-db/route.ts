import {NextResponse} from 'next/server';
import {getConnection} from '@/lib/db';

export async function GET() {
  try {
    const pool = await getConnection();
    const result = await pool.request().query('SELECT @@VERSION as version, GETDATE() as currentTime');
    
    return NextResponse.json({
      success: true,
      message: 'Connected using Managed Identity!',
      data: result.recordset
    });
  } catch (error) {
    console.error('Database error:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}
