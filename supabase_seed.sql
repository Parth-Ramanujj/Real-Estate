-- Seed data for properties table

INSERT INTO properties (title, price, location, beds, baths, sqft, year_built, image, images, description)
VALUES
(
    'Modern Glass Villa',
    '$2,500,000',
    'Beverly Hills, CA',
    5,
    4.5,
    4200,
    2024,
    '/properties/prop-1.jpg',
    ARRAY['/properties/prop-1.jpg', '/properties/prop-2.jpg', '/properties/prop-3.jpg', '/properties/prop-4.jpg', '/properties/prop-5.jpg', '/properties/prop-6.jpg', '/properties/prop-7.jpg', '/properties/prop-8.jpg', '/properties/prop-9.jpg', '/properties/prop-10.jpg', '/properties/prop-11.jpg', '/properties/prop-12.jpg'],
    'Experience the pinnacle of luxury living in this stunning modern estate. featuring floor-to-ceiling glass walls that seamlessly blend indoor and outdoor living spaces. The open-concept design is perfect for entertaining, with a chef''s kitchen, expansive living areas, and a private backyard oasis complete with an infinity pool and spa. Master suite offers breathtaking views and a spa-like bathroom. Located in one of the most prestigious neighborhoods.'
),
(
    'Urban Penthouse',
    '$1,850,000',
    'New York, NY',
    3,
    2,
    2100,
    2021,
    '/properties/prop-2.jpg',
    ARRAY['/properties/prop-2.jpg', '/properties/prop-3.jpg', '/properties/prop-4.jpg'],
    'A sleek and modern penthouse in the heart of the city.'
),
(
    'Seaside Retreat',
    '$3,200,000',
    'Malibu, CA',
    4,
    3,
    3500,
    2019,
    '/properties/prop-3.jpg',
    ARRAY['/properties/prop-3.jpg', '/properties/prop-5.jpg', '/properties/prop-6.jpg'],
    'Relax by the ocean in this beautiful seaside home.'
),
(
    'ahemdabad',
    '1.2lacs',
    'Ahemdabad thaltej',
    5,
    5,
    5,
    2026,
    '/uploads/1770561174619-dwarka.jpeg',
    ARRAY['/uploads/1770561184795-dwarka.jpeg', '/uploads/1770561184830-myphoto.jpeg', '/uploads/1770561184835-parth.png', '/uploads/1770561184842-photo.png.jpg'],
    'i am ai automation workflow master'
);
