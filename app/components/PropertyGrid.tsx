
import { supabase } from '@/lib/supabase';
import PropertyCard from './PropertyCard';

interface Property {
    id: number;
    title: string;
    price: string;
    location: string;
    beds: number;
    baths: number;
    sqft: number;
    image: string;
}

export default async function PropertyGrid({ searchParams }: { searchParams: Promise<{ search?: string }> | { search?: string } }) {
    // Await searchParams if it's a promise (Next.js 15+ convention, good practice)
    const resolvedSearchParams = await searchParams;
    const searchQuery = resolvedSearchParams?.search?.toLowerCase() || '';

    let query = supabase
        .from('properties')
        .select('*')
        .order('created_at', { ascending: false });

    if (searchQuery) {
        // Simple search across multiple columns using OR syntax
        // Note: supabase ilike syntax for OR is typically "column.ilike.val,column2.ilike.val"
        // But the PostgREST syntax for OR with ilike is a bit complex: or=(col.ilike.%val%,col2.ilike.%val%)
        query = query.or(`title.ilike.%${searchQuery}%,location.ilike.%${searchQuery}%,price.ilike.%${searchQuery}%`);
    }

    const { data: properties, error } = await query;

    if (error) {
        console.error('Error fetching properties:', error);
        return (
            <div className="text-center py-24 text-red-500">
                Error loading properties. Please try again later.
            </div>
        );
    }

    const safeProperties = (properties || []).map((p: any) => ({
        ...p,
        yearBuilt: p.year_built, // map snake_case to camelCase
    })) as Property[];

    if (safeProperties.length === 0) {
        return (
            <section className="py-24 px-4 max-w-7xl mx-auto">
                <div className="text-center py-12 text-gray-400">
                    No properties found matching your search.
                </div>
            </section>
        );
    }

    return (
        <section className="py-24 px-4 max-w-7xl mx-auto">
            <div className="text-center mb-16">
                <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
                    {searchQuery ? `Search Results for "${searchQuery}"` : 'Latest Listings'}
                </h2>
                <p className="text-gray-400 max-w-xl mx-auto">
                    {searchQuery ? `${safeProperties.length} properties found` : 'Explore our exclusive collection of premium properties.'}
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {safeProperties.map((property, index) => (
                    <PropertyCard key={property.id} property={property} index={index} />
                ))}
            </div>

            <div className="mt-12 text-center">
                <button className="text-emerald-400 hover:text-emerald-300 transition-colors">
                    View All Properties ➞
                </button>
            </div>
        </section>
    );
}
