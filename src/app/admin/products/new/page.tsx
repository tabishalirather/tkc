import ProductForm from '@/components/admin/ProductForm'

export default function NewProductPage() {
  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Add New Product</h1>
        <p className="mt-2 text-sm text-gray-700">
          Create a new product for your store
        </p>
      </div>
      
      <ProductForm />
    </div>
  )
}