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
      image: 'https://placehold.co/400x300/E8A838/ffffff?text=Saffron'
    },
    {
      name: 'Shilajit',
      slug: 'shilajit',
      description: 'Pure Himalayan Shilajit - Ancient wellness supplement',
      image: 'https://placehold.co/400x300/5C3A1E/ffffff?text=Shilajit'
    },
    {
      name: 'Walnuts',
      slug: 'walnuts',
      description: 'Fresh Kashmiri Walnuts - Premium quality nuts',
      image: 'https://placehold.co/400x300/C17B2A/ffffff?text=Walnuts'
    },
    {
      name: 'Honey',
      slug: 'honey',
      description: 'Wild Forest Honey from Kashmir valleys',
      image: 'https://placehold.co/400x300/F4D673/ffffff?text=Honey'
    },
    {
      name: 'Almonds',
      slug: 'almonds',
      description: 'Premium Kashmiri Almonds - Rich and nutritious',
      image: 'https://placehold.co/400x300/9A6E1C/ffffff?text=Almonds'
    }
  ]

  const createdCategories = await Promise.all(
    categories.map(category =>
      prisma.category.upsert({
        where: { slug: category.slug },
        update: {},
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
        'https://placehold.co/600x600/E8A838/ffffff?text=Saffron+1',
        'https://placehold.co/600x600/F4D673/ffffff?text=Saffron+2',
        'https://placehold.co/600x600/C18B2A/ffffff?text=Saffron+3'
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
        'https://placehold.co/600x600/5C3A1E/ffffff?text=Shilajit+1',
        'https://placehold.co/600x600/3D2A16/ffffff?text=Shilajit+2',
        'https://placehold.co/600x600/7C542C/ffffff?text=Shilajit+3'
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
        'https://placehold.co/600x600/C17B2A/ffffff?text=Walnuts+1',
        'https://placehold.co/600x600/9A6E1C/ffffff?text=Walnuts+2',
        'https://placehold.co/600x600/D7C3AF/ffffff?text=Walnuts+3'
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
        'https://placehold.co/600x600/F4D673/ffffff?text=Honey+1',
        'https://placehold.co/600x600/E8A838/ffffff?text=Honey+2',
        'https://placehold.co/600x600/C18B2A/ffffff?text=Honey+3'
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
        'https://placehold.co/600x600/9A6E1C/ffffff?text=Almonds+1',
        'https://placehold.co/600x600/C17B2A/ffffff?text=Almonds+2',
        'https://placehold.co/600x600/D7C3AF/ffffff?text=Almonds+3'
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
    await prisma.product.upsert({
      where: { slug: product.slug },
      update: {},
      create: product,
    })
  }

  console.log('Products created')

  // Create testimonials
  const testimonials = [
    {
      name: 'Priya Sharma',
      location: 'Delhi, India',
      avatar: 'https://placehold.co/100x100/E8A838/ffffff?text=PS',
      text: 'The saffron quality is exceptional! I can taste the authentic Kashmir flavor in every dish. The packaging was excellent and delivery was prompt.',
      rating: 5,
      isActive: true
    },
    {
      name: 'Rajesh Kumar',
      location: 'Mumbai, India',
      avatar: 'https://placehold.co/100x100/2D5016/ffffff?text=RK',
      text: 'Amazing quality shilajit! I have been using it for 3 months and feel much more energetic. Genuine product at reasonable price.',
      rating: 5,
      isActive: true
    },
    {
      name: 'Anjali Gupta',
      location: 'Bangalore, India',
      avatar: 'https://placehold.co/100x100/C17B2A/ffffff?text=AG',
      text: 'Best walnuts I have ever tasted! Fresh, crunchy, and perfectly packaged. My family loves them. Will definitely order again.',
      rating: 5,
      isActive: true
    },
    {
      name: 'Vikram Singh',
      location: 'Chandigarh, India',
      avatar: 'https://placehold.co/100x100/5C3A1E/ffffff?text=VS',
      text: 'The wild honey is pure and delicious. You can taste the natural flavor and it has helped with my seasonal allergies. Highly recommended!',
      rating: 4,
      isActive: true
    },
    {
      name: 'Meera Reddy',
      location: 'Hyderabad, India',
      avatar: 'https://placehold.co/100x100/9A6E1C/ffffff?text=MR',
      text: 'Excellent almonds! Sweet and fresh. I use them daily in my morning routine. Great quality and fast shipping.',
      rating: 5,
      isActive: true
    },
    {
      name: 'Arjun Mehta',
      location: 'Pune, India',
      avatar: 'https://placehold.co/100x100/F4D673/ffffff?text=AM',
      text: 'Authentic Kashmiri products with great quality. The customer service is also excellent. TKC has become my go-to store for premium products.',
      rating: 5,
      isActive: true
    }
  ]

  for (const testimonial of testimonials) {
    await prisma.testimonial.upsert({
      where: { id: `testimonial-${testimonial.name.toLowerCase().replace(/\s+/g, '-')}` },
      update: {},
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