export interface Property {
    id: number;
    title: string;
    price: string;
    location: string;
    beds: number;
    baths: number;
    sqft: number;
    image: string;
    images: string[];
    description?: string;
    yearBuilt?: number;
}

export const properties: Property[] = [
    {
        id: 1,
        title: "Modern Glass Villa",
        price: "$2,500,000",
        location: "Beverly Hills, CA",
        beds: 5,
        baths: 4.5,
        sqft: 4200,
        yearBuilt: 2024,
        image: "/properties/prop-1.jpg",
        images: Array.from({ length: 12 }, (_, i) => `/properties/prop-${i + 1}.jpg`),
        description: "Experience the pinnacle of luxury living in this stunning modern estate. featuring floor-to-ceiling glass walls that seamlessly blend indoor and outdoor living spaces. The open-concept design is perfect for entertaining, with a chef's kitchen, expansive living areas, and a private backyard oasis complete with an infinity pool and spa. Master suite offers breathtaking views and a spa-like bathroom. Located in one of the most prestigious neighborhoods."
    },
    {
        id: 2,
        title: "Urban Penthouse",
        price: "$1,850,000",
        location: "New York, NY",
        beds: 3,
        baths: 2,
        sqft: 2100,
        yearBuilt: 2021,
        image: "/properties/prop-2.jpg",
        images: ["/properties/prop-2.jpg", "/properties/prop-3.jpg", "/properties/prop-4.jpg"],
        description: "A sleek and modern penthouse in the heart of the city."
    },
    {
        id: 3,
        title: "Seaside Retreat",
        price: "$3,200,000",
        location: "Malibu, CA",
        beds: 4,
        baths: 3,
        sqft: 3500,
        yearBuilt: 2019,
        image: "/properties/prop-3.jpg",
        images: ["/properties/prop-3.jpg", "/properties/prop-5.jpg", "/properties/prop-6.jpg"],
        description: "Relax by the ocean in this beautiful seaside home."
    }
];

export const heroProperty = properties[0];
