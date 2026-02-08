'use client';

import { useState, useEffect, use } from 'react';
import PropertyForm from '@/app/components/PropertyForm';
import { supabase } from '@/lib/supabase';

export default function EditPropertyPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = use(params);
    const [property, setProperty] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!id) return;

        async function fetchProperty() {
            try {
                const { data, error } = await supabase
                    .from('properties')
                    .select('*')
                    .eq('id', id)
                    .single();

                if (error) throw error;

                // Map snake_case to camelCase
                const formattedProperty = {
                    ...data,
                    yearBuilt: data.year_built,
                };

                setProperty(formattedProperty);
            } catch (error) {
                console.error('Error fetching property:', error);
            } finally {
                setLoading(false);
            }
        }

        fetchProperty();
    }, [id]);

    if (loading) {
        return <div className="p-8 text-white">Loading property details...</div>;
    }

    if (!property) {
        return <div className="p-8 text-white">Property not found</div>;
    }

    return (
        <div>
            <h1 className="text-3xl font-bold text-white mb-8">Edit Property</h1>
            <PropertyForm initialData={property} />
        </div>
    );
}
