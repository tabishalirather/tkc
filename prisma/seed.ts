import { PrismaClient, UserRole, CouponType } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  console.log('Starting seed...')

  // Hash admin password
  const hashedPassword = await bcrypt.hash('Admin@123', 12)

  // Create admin user
  const admin = await prisma.user.upsert({
    where: { email: 'admin@tkc.com' },
    update: {},
    create: {
      email: 'admin@tkc.com',
      name: 'TKC Admin',
      password: hashedPassword,
      role: UserRole.ADMIN,
    },
  })

  console.log('Admin user created')

  // Create categories
  const categories = [
    {
      name: 'Saffron',
      slug: 'saffron',
      description: 'Premium Kashmiri Saffron - The world\'s most precious spice',
      image: 'https://images.unsplash.com/photo-1611071536598-9b7d8f15189f?auto=format&fit=crop&w=1200&q=80'
    },
    {
      name: 'Shilajit',
      slug: 'shilajit',
      description: 'Pure Himalayan Shilajit - Ancient wellness supplement',
      image: 'https://images.unsplash.com/photo-1603048719539-9ecb4f1f5f9a?auto=format&fit=crop&w=1200&q=80'
    },
    {
      name: 'Walnuts',
      slug: 'walnuts',
      description: 'Fresh Kashmiri Walnuts - Premium quality nuts',
      image: 'https://images.unsplash.com/photo-1508747703725-719777637510?auto=format&fit=crop&w=1200&q=80'
    },
    {
      name: 'Honey',
      slug: 'honey',
      description: 'Wild Forest Honey from Kashmir valleys',
      image: 'https://images.unsplash.com/photo-1587049352851-8d4e89133924?auto=format&fit=crop&w=1200&q=80'
    },
    {
      name: 'Almonds',
      slug: 'almonds',
      description: 'Premium Kashmiri Almonds - Rich and nutritious',
      image: 'https://images.unsplash.com/photo-1508061253366-f7da158b6d46?auto=format&fit=crop&w=1200&q=80'
    }
  ]

  const createdCategories = await Promise.all(
    categories.map(category =>
      prisma.category.upsert({
        where: { slug: category.slug },
        update: {
          name: category.name,
          description: category.description,
          image: category.image,
        },
        create: category,
      })
    )
  )

  console.log('Categories created')

  // Create products
  const products = [
    {
      name: 'Kashmiri Kesar Premium Saffron',
      slug: 'kashmiri-kesar-premium-saffron',
      description: 'Our Premium Kashmiri Saffron is handpicked from the pristine valleys of Kashmir. Each thread is carefully selected to ensure the highest quality and authentic flavor. Known for its deep red color, intense aroma, and distinctive taste, this saffron is perfect for culinary use and traditional remedies.',
      shortDescription: 'Handpicked premium saffron threads from Kashmir valleys',
      price: 2999,
      discountPrice: 2699,
      stock: 50,
      categoryId: createdCategories[0].id,
      images: [
        'https://images.unsplash.com/photo-1611071536598-9b7d8f15189f?auto=format&fit=crop&w=1200&q=80',
        'https://images.unsplash.com/photo-1599599810769-bcde5a160d32?auto=format&fit=crop&w=1200&q=80',
        'https://images.unsplash.com/photo-1610725664285-7c57e6eeac3f?auto=format&fit=crop&w=1200&q=80'
      ],
      badges: ['Premium', 'Organic', 'Handpicked'],
      origin: 'Kashmir, India',
      benefits: 'Rich in antioxidants, improves mood, enhances skin complexion, aids digestion',
      usage: 'Soak 4-5 threads in warm milk or water for 10 minutes before use. Perfect for biryanis, desserts, and milk preparations.',
      ingredients: '100% Pure Kashmiri Saffron (Crocus sativus)',
      sku: 'TKC-SAFFRON-001',
      isFeatured: true,
      isBestseller: true,
      variants: {
        create: [
          {
            name: '1 Gram',
            weight: '1g',
            price: 2999,
            discountPrice: 2699,
            stock: 30,
            sku: 'TKC-SAFFRON-001-1G'
          },
          {
            name: '2 Grams',
            weight: '2g',
            price: 5799,
            discountPrice: 5199,
            stock: 25,
            sku: 'TKC-SAFFRON-001-2G'
          },
          {
            name: '5 Grams',
            weight: '5g',
            price: 13999,
            discountPrice: 12599,
            stock: 15,
            sku: 'TKC-SAFFRON-001-5G'
          }
        ]
      }
    },
    {
      name: 'Pure Kashmiri Shilajit Resin',
      slug: 'pure-kashmiri-shilajit-resin',
      description: 'Sourced from the high altitudes of the Kashmir Himalayas, our Pure Shilajit Resin is a potent natural supplement. Rich in fulvic acid and over 84 trace minerals, this ancient substance has been used for centuries to boost energy, enhance cognitive function, and support overall wellness.',
      shortDescription: 'High-altitude Himalayan Shilajit resin with 84+ minerals',
      price: 4999,
      discountPrice: 4499,
      stock: 25,
      categoryId: createdCategories[1].id,
      images: [
        'https://images.unsplash.com/photo-1523475472560-d2df97ec485c?auto=format&fit=crop&w=1200&q=80',
        'https://images.unsplash.com/photo-1470337458703-46ad1756a187?auto=format&fit=crop&w=1200&q=80',
        'https://images.unsplash.com/photo-1523475472560-d2df97ec485c?auto=format&fit=crop&w=1200&q=80'
      ],
      badges: ['Pure', 'Lab Tested', 'Himalayan'],
      origin: 'Kashmir Himalayas',
      benefits: 'Boosts energy, improves cognitive function, enhances stamina, supports anti-aging',
      usage: 'Dissolve rice grain size portion (300-500mg) in warm water or milk. Take once daily on empty stomach.',
      ingredients: '100% Pure Himalayan Shilajit Resin',
      sku: 'TKC-SHILAJIT-001',
      isFeatured: true,
      isBestseller: false
    },
    {
      name: 'Kashmiri Walnut Kernels',
      slug: 'kashmiri-walnut-kernels',
      description: 'Fresh, premium quality walnut kernels from the orchards of Kashmir. These walnuts are naturally dried and carefully processed to retain their nutritional value and authentic taste. Rich in omega-3 fatty acids, protein, and antioxidants.',
      shortDescription: 'Fresh premium walnut kernels from Kashmir orchards',
      price: 899,
      discountPrice: 799,
      stock: 100,
      categoryId: createdCategories[2].id,
      images: [
        'https://images.unsplash.com/photo-1508747703725-719777637510?auto=format&fit=crop&w=1200&q=80',
        'https://images.unsplash.com/photo-1516826957135-700dedea698c?auto=format&fit=crop&w=1200&q=80',
        'https://images.unsplash.com/photo-1566595006955-1b6f0f78abf1?auto=format&fit=crop&w=1200&q=80'
      ],
      badges: ['Fresh', 'Premium', 'Natural'],
      origin: 'Kashmir Valley',
      benefits: 'Rich in omega-3, supports heart health, improves brain function, good source of protein',
      usage: 'Consume 4-7 pieces daily. Can be eaten raw or added to desserts, salads, and recipes.',
      ingredients: '100% Natural Kashmiri Walnut Kernels',
      sku: 'TKC-WALNUT-001',
      isFeatured: false,
      isBestseller: true,
      variants: {
        create: [
          {
            name: '250 Grams',
            weight: '250g',
            price: 899,
            discountPrice: 799,
            stock: 50,
            sku: 'TKC-WALNUT-001-250G'
          },
          {
            name: '500 Grams',
            weight: '500g',
            price: 1699,
            discountPrice: 1499,
            stock: 30,
            sku: 'TKC-WALNUT-001-500G'
          },
          {
            name: '1 Kilogram',
            weight: '1kg',
            price: 3199,
            discountPrice: 2899,
            stock: 20,
            sku: 'TKC-WALNUT-001-1KG'
          }
        ]
      }
    },
    {
      name: 'Wild Kashmiri Forest Honey',
      slug: 'wild-kashmiri-forest-honey',
      description: 'Pure, unprocessed honey collected from the wild flowers of Kashmir forests. This honey is raw and unfiltered, retaining all its natural enzymes, antioxidants, and therapeutic properties. The unique floral diversity of Kashmir gives this honey its distinctive taste and aroma.',
      shortDescription: 'Raw unprocessed honey from Kashmir forest flowers',
      price: 699,
      discountPrice: 599,
      stock: 75,
      categoryId: createdCategories[3].id,
      images: [
        'https://images.unsplash.com/photo-1587049352851-8d4e89133924?auto=format&fit=crop&w=1200&q=80',
        'https://images.unsplash.com/photo-1471943311424-646960669fbc?auto=format&fit=crop&w=1200&q=80',
        'https://images.unsplash.com/photo-1589985270826-4b7bb135bc9d?auto=format&fit=crop&w=1200&q=80'
      ],
      badges: ['Raw', 'Unprocessed', 'Wild'],
      origin: 'Kashmir Forests',
      benefits: 'Natural antibacterial properties, boosts immunity, soothes throat, rich in antioxidants',
      usage: 'Take 1-2 teaspoons daily on empty stomach or mix with warm water. Can be used as natural sweetener.',
      ingredients: '100% Pure Wild Forest Honey',
      sku: 'TKC-HONEY-001',
      isFeatured: true,
      isBestseller: false,
      variants: {
        create: [
          {
            name: '250 Grams',
            weight: '250g',
            price: 699,
            discountPrice: 599,
            stock: 40,
            sku: 'TKC-HONEY-001-250G'
          },
          {
            name: '500 Grams',
            weight: '500g',
            price: 1299,
            discountPrice: 1149,
            stock: 35,
            sku: 'TKC-HONEY-001-500G'
          }
        ]
      }
    },
    {
      name: 'Kashmir Premium Almonds',
      slug: 'kashmir-premium-almonds',
      description: 'Premium quality Kashmiri almonds known for their sweet taste and high nutritional value. These almonds are carefully selected and naturally processed to maintain their freshness and crunch. Rich in vitamin E, healthy fats, and protein.',
      shortDescription: 'Sweet premium Kashmiri almonds with high nutritional value',
      price: 1299,
      discountPrice: 1149,
      stock: 80,
      categoryId: createdCategories[4].id,
      images: [
        'https://images.unsplash.com/photo-1508061253366-f7da158b6d46?auto=format&fit=crop&w=1200&q=80',
        'https://images.unsplash.com/photo-1516617442634-75371039cb3a?auto=format&fit=crop&w=1200&q=80',
        'https://images.unsplash.com/photo-1471640417163-36c31bb4cf33?auto=format&fit=crop&w=1200&q=80'
      ],
      badges: ['Premium', 'Sweet', 'Natural'],
      origin: 'Kashmir Valley',
      benefits: 'Rich in vitamin E, supports heart health, improves skin health, good source of protein and healthy fats',
      usage: 'Soak 8-10 almonds overnight and consume in the morning. Can be eaten raw or added to recipes.',
      ingredients: '100% Natural Kashmiri Almonds',
      sku: 'TKC-ALMOND-001',
      isFeatured: false,
      isBestseller: true,
      variants: {
        create: [
          {
            name: '250 Grams',
            weight: '250g',
            price: 1299,
            discountPrice: 1149,
            stock: 30,
            sku: 'TKC-ALMOND-001-250G'
          },
          {
            name: '500 Grams',
            weight: '500g',
            price: 2499,
            discountPrice: 2199,
            stock: 25,
            sku: 'TKC-ALMOND-001-500G'
          },
          {
            name: '1 Kilogram',
            weight: '1kg',
            price: 4799,
            discountPrice: 4299,
            stock: 25,
            sku: 'TKC-ALMOND-001-1KG'
          }
        ]
      }
    }
  ]

  for (const product of products) {
    const { variants, ...productData } = product

    await prisma.product.upsert({
      where: { slug: product.slug },
      update: {
        name: productData.name,
        description: productData.description,
        shortDescription: productData.shortDescription,
        price: productData.price,
        discountPrice: productData.discountPrice,
        stock: productData.stock,
        categoryId: productData.categoryId,
        images: productData.images,
        badges: productData.badges,
        origin: productData.origin,
        benefits: productData.benefits,
        usage: productData.usage,
        ingredients: productData.ingredients,
        sku: productData.sku,
        isFeatured: productData.isFeatured,
        isBestseller: productData.isBestseller,
      },
      create: product,
    })
  }

  console.log('Products created')

  // Create testimonials
  const testimonials = [
    {
      name: 'Priya Sharma',
      location: 'Delhi, India',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=300&q=80',
      text: 'The saffron quality is exceptional! I can taste the authentic Kashmir flavor in every dish. The packaging was excellent and delivery was prompt.',
      rating: 5,
      isActive: true
    },
    {
      name: 'Rajesh Kumar',
      location: 'Mumbai, India',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=300&q=80',
      text: 'Amazing quality shilajit! I have been using it for 3 months and feel much more energetic. Genuine product at reasonable price.',
      rating: 5,
      isActive: true
    },
    {
      name: 'Anjali Gupta',
      location: 'Bangalore, India',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=300&q=80',
      text: 'Best walnuts I have ever tasted! Fresh, crunchy, and perfectly packaged. My family loves them. Will definitely order again.',
      rating: 5,
      isActive: true
    },
    {
      name: 'Vikram Singh',
      location: 'Chandigarh, India',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80',
      text: 'The wild honey is pure and delicious. You can taste the natural flavor and it has helped with my seasonal allergies. Highly recommended!',
      rating: 4,
      isActive: true
    },
    {
      name: 'Meera Reddy',
      location: 'Hyderabad, India',
      avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=300&q=80',
      text: 'Excellent almonds! Sweet and fresh. I use them daily in my morning routine. Great quality and fast shipping.',
      rating: 5,
      isActive: true
    },
    {
      name: 'Arjun Mehta',
      location: 'Pune, India',
      avatar: 'https://images.unsplash.com/photo-1504593811423-6dd665756598?auto=format&fit=crop&w=300&q=80',
      text: 'Authentic Kashmiri products with great quality. The customer service is also excellent. TKC has become my go-to store for premium products.',
      rating: 5,
      isActive: true
    }
  ]

  for (const testimonial of testimonials) {
    await prisma.testimonial.upsert({
      where: { id: `testimonial-${testimonial.name.toLowerCase().replace(/\s+/g, '-')}` },
      update: {
        location: testimonial.location,
        avatar: testimonial.avatar,
        text: testimonial.text,
        rating: testimonial.rating,
        isActive: testimonial.isActive,
      },
      create: testimonial,
    })
  }

  console.log('Testimonials created')

  // Create coupons
  const coupons = [
    {
      code: 'WELCOME10',
      type: CouponType.PERCENTAGE,
      value: 10,
      minOrder: 500,
      maxUses: 1000,
      usedCount: 0,
      expiresAt: new Date('2024-12-31'),
      isActive: true
    },
    {
      code: 'KASHMIR20',
      type: CouponType.FLAT,
      value: 200,
      minOrder: 1500,
      maxUses: 500,
      usedCount: 0,
      expiresAt: new Date('2024-12-31'),
      isActive: true
    }
  ]

  for (const coupon of coupons) {
    await prisma.coupon.upsert({
      where: { code: coupon.code },
      update: {},
      create: coupon,
    })
  }

  console.log('Coupons created')

  console.log('Seed completed successfully!')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
