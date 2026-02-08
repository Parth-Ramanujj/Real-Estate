import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function GET() {
    const { data, error } = await supabase
        .from('properties')
        .select('*')
        .order('created_at', { ascending: false });

    if (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }

    // Map snake_case to camelCase for frontend
    const properties = data.map((p: any) => ({
        ...p,
        yearBuilt: p.year_built,
    }));

    return NextResponse.json(properties);
}

export async function POST(request: Request) {
    try {
        const body = await request.json();

        // Map camelCase to snake_case for DB
        const dbData = {
            title: body.title,
            price: body.price,
            location: body.location,
            beds: body.beds,
            baths: body.baths,
            sqft: body.sqft,
            year_built: body.yearBuilt || new Date().getFullYear(),
            image: body.image,
            images: body.images || [],
            description: body.description
        };

        const { data, error } = await supabase
            .from('properties')
            .insert([dbData])
            .select();

        if (error) {
            console.error('Supabase error:', error);
            return NextResponse.json({ error: error.message }, { status: 500 });
        }

        const newProperty = data[0];
        const responseData = {
            ...newProperty,
            yearBuilt: newProperty.year_built
        };

        return NextResponse.json(responseData, { status: 201 });
    } catch (error) {
        console.error('API error:', error);
        return NextResponse.json({ error: 'Failed to save property' }, { status: 500 });
    }
}

export async function DELETE(request: Request) {
    try {
        const { id } = await request.json();

        if (!id) {
            return NextResponse.json({ error: 'Property ID is required' }, { status: 400 });
        }

        const { error } = await supabase
            .from('properties')
            .delete()
            .eq('id', id);

        if (error) {
            console.error('Supabase error:', error);
            return NextResponse.json({ error: error.message }, { status: 500 });
        }

        return NextResponse.json({ message: 'Property deleted successfully' }, { status: 200 });
    } catch (error) {
        console.error('API error:', error);
        return NextResponse.json({ error: 'Failed to delete property' }, { status: 500 });
    }
}

export async function PUT(request: Request) {
    try {
        const body = await request.json();
        const { id, ...updates } = body;

        if (!id) {
            return NextResponse.json({ error: 'Property ID is required' }, { status: 400 });
        }

        // Map camelCase to snake_case for DB
        const dbUpdates: any = {
            title: updates.title,
            price: updates.price,
            location: updates.location,
            beds: updates.beds,
            baths: updates.baths,
            sqft: updates.sqft,
            year_built: updates.yearBuilt,
            image: updates.image,
            images: updates.images,
            description: updates.description,
            updated_at: new Date().toISOString(),
        };

        // Remove undefined keys
        Object.keys(dbUpdates).forEach(key => dbUpdates[key] === undefined && delete dbUpdates[key]);

        const { data, error } = await supabase
            .from('properties')
            .update(dbUpdates)
            .eq('id', id)
            .select();

        if (error) {
            console.error('Supabase error:', error);
            return NextResponse.json({ error: error.message }, { status: 500 });
        }

        return NextResponse.json(data[0], { status: 200 });
    } catch (error) {
        console.error('API error:', error);
        return NextResponse.json({ error: 'Failed to update property' }, { status: 500 });
    }
}
