'use client'

import { useState } from 'react'

interface FAQItem {
  question: string
  answer: string
  category: string
}

const faqData: FAQItem[] = [
  {
    category: 'Products',
    question: 'Are your products 100% authentic?',
    answer: 'Yes, all our products are 100% authentic and sourced directly from Kashmir. We work with local farmers and artisans to ensure the highest quality and authenticity. Each product comes with a certificate of authenticity.'
  },
  {
    category: 'Products',
    question: 'How do I know the saffron is real?',
    answer: 'Our saffron comes with laboratory test certificates and meets all ISO standards. Real saffron has a distinct aroma, deep red color with slight orange tips, and when soaked in water, it releases golden color slowly without breaking the threads.'
  },
  {
    category: 'Products',
    question: 'What is the shelf life of your products?',
    answer: 'Saffron: 2-3 years when stored properly. Shilajit: 5+ years. Walnuts and dry fruits: 6-12 months. We always ship fresh products and mention the harvest/manufacturing date on packaging.'
  },
  {
    category: 'Shipping',
    question: 'What are your shipping charges?',
    answer: 'We offer free shipping on orders above ₹1000. For orders below ₹1000, shipping charges are ₹50 within India. We use trusted courier partners for safe delivery.'
  },
  {
    category: 'Shipping',
    question: 'How long does delivery take?',
    answer: 'Metro cities: 2-3 business days. Other cities: 3-5 business days. Remote areas: 5-7 business days. We provide tracking details via SMS and email once your order is shipped.'
  },
  {
    category: 'Shipping',
    question: 'Do you ship internationally?',
    answer: 'Currently, we only ship within India. We are working on international shipping and will update our customers once available.'
  },
  {
    category: 'Returns',
    question: 'What is your return policy?',
    answer: 'We offer a 15-day return policy for unopened products. If you are not satisfied with the quality, you can return the product for a full refund. Return shipping costs are borne by the customer unless the product is damaged or defective.'
  },
  {
    category: 'Returns',
    question: 'How do I return a product?',
    answer: 'Contact our customer support team at support@thekashmirco.com with your order number and reason for return. We will provide you with return instructions and a return label.'
  },
  {
    category: 'Returns',
    question: 'When will I get my refund?',
    answer: 'Once we receive the returned product and verify its condition, refunds are processed within 5-7 business days. The amount will be credited to your original payment method.'
  },
  {
    category: 'Orders',
    question: 'Can I modify or cancel my order?',
    answer: 'You can modify or cancel your order within 2 hours of placing it. After that, the order enters processing and cannot be modified. Contact our support team immediately if you need to make changes.'
  },
  {
    category: 'Orders',
    question: 'How can I track my order?',
    answer: 'You will receive a tracking number via SMS and email once your order is shipped. You can track your order on our website or the courier partner\'s website using this tracking number.'
  },
  {
    category: 'Payment',
    question: 'What payment methods do you accept?',
    answer: 'We accept all major payment methods including Credit/Debit cards, UPI, Net Banking, and Digital wallets through our secure payment gateway powered by Razorpay.'
  },
  {
    category: 'Payment',
    question: 'Is my payment information secure?',
    answer: 'Yes, all payments are processed through Razorpay, which uses industry-standard SSL encryption. We do not store any payment information on our servers.'
  }
]

const categories = ['All', ...Array.from(new Set(faqData.map(item => item.category)))]

export default function FAQPage() {
  const [openItems, setOpenItems] = useState<number[]>([])
  const [selectedCategory, setSelectedCategory] = useState('All')

  const toggleItem = (index: number) => {
    setOpenItems(prev => 
      prev.includes(index) 
        ? prev.filter(i => i !== index)
        : [...prev, index]
    )
  }

  const filteredFAQs = selectedCategory === 'All' 
    ? faqData 
    : faqData.filter(item => item.category === selectedCategory)

  return (
    <div className="min-h-screen bg-cream-50">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-serif font-bold text-gray-900 mb-4">
              Frequently Asked Questions
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Find answers to common questions about our authentic Kashmiri products, 
              shipping, returns, and more.
            </p>
          </div>

          {/* Category Filter */}
          <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Browse by Category</h2>
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                    selectedCategory === category
                      ? 'bg-saffron-500 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-saffron-100'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>

          {/* FAQ Items */}
          <div className="space-y-4">
            {filteredFAQs.map((item, index) => (
              <div key={index} className="bg-white rounded-lg shadow-sm overflow-hidden">
                <button
                  onClick={() => toggleItem(index)}
                  className="w-full px-6 py-4 text-left focus:outline-none focus:ring-2 focus:ring-saffron-500 focus:ring-inset"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="inline-block bg-saffron-100 text-saffron-800 text-xs font-semibold px-2 py-1 rounded mb-2">
                        {item.category}
                      </span>
                      <h3 className="text-lg font-semibold text-gray-900">
                        {item.question}
                      </h3>
                    </div>
                    <svg
                      className={`w-5 h-5 text-gray-500 transform transition-transform ${
                        openItems.includes(index) ? 'rotate-180' : ''
                      }`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </button>
                
                {openItems.includes(index) && (
                  <div className="px-6 pb-4">
                    <div className="border-t border-gray-200 pt-4">
                      <p className="text-gray-600 leading-relaxed">
                        {item.answer}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Still Have Questions */}
          <div className="bg-white rounded-lg shadow-sm p-8 mt-12 text-center">
            <h2 className="text-2xl font-serif font-bold text-gray-900 mb-4">
              Still Have Questions?
            </h2>
            <p className="text-gray-600 mb-6">
              Can't find the answer you're looking for? Our customer support team is here to help.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="w-12 h-12 bg-saffron-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <svg className="w-6 h-6 text-saffron-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">Email Support</h3>
                <p className="text-gray-600 text-sm mb-3">Get help via email</p>
                <a 
                  href="mailto:support@thekashmirco.com"
                  className="text-saffron-600 hover:text-saffron-700 font-medium text-sm"
                >
                  support@thekashmirco.com
                </a>
              </div>

              <div className="text-center">
                <div className="w-12 h-12 bg-saffron-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <svg className="w-6 h-6 text-saffron-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">Phone Support</h3>
                <p className="text-gray-600 text-sm mb-3">Mon-Sat, 9AM-6PM IST</p>
                <a 
                  href="tel:+919876543210"
                  className="text-saffron-600 hover:text-saffron-700 font-medium text-sm"
                >
                  +91 98765 43210
                </a>
              </div>

              <div className="text-center">
                <div className="w-12 h-12 bg-saffron-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <svg className="w-6 h-6 text-saffron-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                  </svg>
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">Live Chat</h3>
                <p className="text-gray-600 text-sm mb-3">Chat with our team</p>
                <button className="text-saffron-600 hover:text-saffron-700 font-medium text-sm">
                  Start Chat
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}