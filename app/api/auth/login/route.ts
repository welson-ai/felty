import { NextRequest, NextResponse } from 'next/server';
import { query } from '@/lib/db';

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json();
    
    console.log('[DEBUG] Login attempt:', { email, passwordLength: password?.length });

    if (!email || !password) {
      return NextResponse.json(
        { error: 'Missing email or password' },
        { status: 400 }
      );
    }

    // Find user
    const result = await query(
      'SELECT id, email, full_name, password_hash FROM users WHERE email = $1',
      [email]
    );

    console.log('[DEBUG] User query result:', { rowCount: result.rows.length });

    if (result.rows.length === 0) {
      return NextResponse.json(
        { error: 'Invalid email or password' },
        { status: 401 }
      );
    }

    const user = result.rows[0];
    console.log('[DEBUG] Stored password hash:', user.password_hash);
    console.log('[DEBUG] Provided password:', password);

    // Verify password
    if (password !== user.password_hash) {
      console.log('[DEBUG] Password mismatch');
      return NextResponse.json(
        { error: 'Invalid email or password' },
        { status: 401 }
      );
    }

    // Set cookie with user ID (simple session)
    const response = NextResponse.json(
      { success: true, user: { id: user.id, email: user.email, fullName: user.full_name } },
      { status: 200 }
    );

    response.cookies.set({
      name: 'userId',
      value: user.id,
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 7, // 7 days
    });

    return response;
  } catch (error) {
    console.error('[v0] Login error:', error);
    return NextResponse.json(
      { error: 'Login failed' },
      { status: 500 }
    );
  }
}
