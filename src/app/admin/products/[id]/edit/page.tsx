import { notFound } from 'next/navigation'
import ProductForm from '@/components/admin/ProductForm'
import { prisma } from '@/lib/prisma'

async function getProduct(id: string) {
  try {
    const product = await prisma.product.findUnique({
      where: { id },
      include: {
        category: true,
      },
    })

    return product
  } catch (error) {
    return null
  }
}

export default async function EditProductPage({
  params,
}: {
  params: { id: string }
}) {
  const product = await getProduct(params.id)

  if (!product) {
    notFound()
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Edit Product</h1>
        <p className="mt-2 text-sm text-gray-700">
          Update product information
        </p>
      </div>
      
      <ProductForm product={product} isEdit />
    </div>
  )
}