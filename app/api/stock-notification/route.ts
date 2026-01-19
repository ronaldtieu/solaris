import { createClient } from '@supabase/supabase-js';
import { NextRequest, NextResponse } from 'next/server';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

interface LocationData {
  country: string;
  region: string;
  city: string;
}

async function getLocationFromIP(ip: string): Promise<LocationData> {
  try {
    // Try ip-api.com (free, no key required)
    const response = await fetch(`http://ip-api.com/json/${ip}`);
    if (response.ok) {
      const data = await response.json();
      if (data.status === 'success') {
        return {
          country: data.country || '',
          region: data.regionName || '',
          city: data.city || '',
        };
      }
    }
  } catch (error) {
    console.error('Error fetching location from ip-api:', error);
  }

  // Fallback: return empty location data
  return {
    country: '',
    region: '',
    city: '',
  };
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { productSlug, color, size, email, name } = body;

    // Validate required fields
    if (!productSlug || !color || !size || !email || !name) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      );
    }

    // Get client IP address
    const ip = request.headers.get('x-forwarded-for') ||
               request.headers.get('x-real-ip') ||
               'unknown';

    // Get location from IP
    const location = await getLocationFromIP(ip);

    // Insert into database
    const { data, error } = await supabase
      .from('stock_notifications')
      .insert({
        name: name.trim(),
        product_slug: productSlug,
        color: color,
        size: size,
        email: email.toLowerCase().trim(),
        country: location.country,
        state: location.region,
        city: location.city,
        ip_address: ip,
      })
      .select()
      .single();

    if (error) {
      // Check for unique constraint violation
      if (error.code === '23505') {
        return NextResponse.json(
          { error: 'You are already subscribed to notifications for this item' },
          { status: 409 }
        );
      }
      throw error;
    }

    return NextResponse.json({
      success: true,
      message: 'You will be notified when this item is back in stock',
      data: {
        product: productSlug,
        color,
        size,
        location: {
          country: location.country,
          state: location.region,
          city: location.city,
        },
      },
    }, { status: 201 });

  } catch (error) {
    console.error('Error in stock notification API:', error);
    return NextResponse.json(
      { error: 'Failed to process notification request' },
      { status: 500 }
    );
  }
}
