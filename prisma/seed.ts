import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
    // Create some users
    const user1 = await prisma.user.create({
        data: {
            firstname: 'Lemon',
            lastname: 'Gautam',
            email: 'lemongautam79@gmail.com',
            password: '12345678l',
            phone_number: "9861000213",
            role: 'Admin',
        },
    });

    const user2 = await prisma.user.create({
        data: {
            firstname: 'John',
            lastname: 'Doe',
            email: 'john@example.com',
            password: '12345678j',
            phone_number: "9849789299",
            role: 'User',
        },
    });

    // Create categories
    const category1 = await prisma.category.create({
        data: {
            category_name: 'Hotel',
            category_icon: 'https://example.com/icon/hotels.png',
        },
    });

    const category2 = await prisma.category.create({
        data: {
            category_name: 'Restaurant',
            category_icon: 'https://example.com/icon/restaurant.png',
        },
    });

    // Create a product
    const product1 = await prisma.product.create({
        data: {
            title: 'Smartphone',
            price: 699,
            description: 'A high-quality smartphone',
            address: '123 Tech Street',
            short_description: 'Latest model with 5G support',
            category: {
                connect: { id: category1.id },
            },
        },
    });

    // Create amenities for the product
    await prisma.amenities.createMany({
        data: [
            {
                amenity_name: 'Free Wi-Fi',
                productId: product1.id,
            },
            {
                amenity_name: 'Swimming Pool',
                productId: product1.id,
            },
        ],
    });

    // Create product images
    await prisma.productImage.createMany({
        data: [
            {
                url: 'https://example.com/images/smartphone1.png',
                productId: product1.id,
            },
            {
                url: 'https://example.com/images/smartphone2.png',
                productId: product1.id,
            },
        ],
    });

    // Create halls
    const hall1 = await prisma.hall.create({
        data: {
            hall_name: 'Main Hall',
            hall_capacity: 200,
            is_booked: false,
            productId: product1.id,
        },
    });

    // Create rules for the product
    await prisma.rules.create({
        data: {
            description: 'No smoking in the premises',
            productId: product1.id,
        },
    });

    // Create a blog
    const blog1 = await prisma.blog.create({
        data: {
            title: 'Latest Tech Trends',
            short_description: 'Discover the latest trends in the tech industry.',
            image: 'https://example.com/images/blog1.png',
            description: 'Detailed article about the latest innovations in technology.',
            author: {
                connect: { id: user1.id },
            },
            approved_by: {
                connect: { id: user2.id },
            },
            is_approved: true,
        },
    });

    // Create a venue
    const venue1 = await prisma.venue.create({
        data: {
            venue_name: 'Tech Conference Center',
            venue_address: '456 Conference Ave',
            contact_person: 'Alice',
            phone_number: '123-456-7890',
            email: 'contact@conference.com',
        },
    });

    // Create an event
    // const event1 = await prisma.event.create({
    //     data: {
    //         start_date: new Date('2024-10-10'),
    //         end_date: new Date('2024-10-12'),
    //         start_time: new Date('2024-10-10T09:00:00'),
    //         end_time: new Date('2024-10-12T18:00:00'),
    //         product_id: product1.id,
    //         is_approved: true,
    //         approved_by: {
    //             connect: { id: user1.id },
    //         },
    //         halls: {
    //             connect: [{ id: hall1.id }],
    //         },
    //     },
    // });

    // Create event types
    // await prisma.event.create({
    //     data: {
    //         title: 'Tech Expo',
    //         eventId: event1.id,
    //     },
    // });

    console.log('Seed data inserted successfully!');
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
