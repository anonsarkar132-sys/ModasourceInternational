"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Plus, Trash2, Edit, Loader2, Package } from "lucide-react";

interface Product {
  _id: string;
  name: string;
  category: string;
  images: string[];
  isFeatured: boolean;
}

export default function ProductAdminPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/v1/products");
      const data = await res.json();
      if (data.success) {
        setProducts(data.data);
      }
    } catch (error) {
      console.error("Failed to fetch products", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this product?")) return;
    try {
      const res = await fetch(`/api/v1/products/${id}`, { method: "DELETE" });
      const data = await res.json();
      if (data.success) {
        fetchProducts(); // Refresh list
      } else {
        alert(data.message || "Failed to delete");
      }
    } catch (error) {
      console.error("Error deleting product", error);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center bg-white p-6 rounded-lg shadow-sm border border-neutral-100">
        <div>
          <h1 className="text-2xl font-semibold text-neutral-800 flex items-center gap-2">
            <Package size={24} className="text-amber-600" />
            Manage Products
          </h1>
          <p className="text-neutral-500 text-sm mt-1">View, edit, and delete items from your product catalog.</p>
        </div>
        <Link
          href="/admin/products/new"
          className="flex items-center gap-2 bg-neutral-900 text-white px-4 py-2 rounded-md hover:bg-amber-600 transition-colors"
        >
          <Plus size={18} />
          Add New Product
        </Link>
      </div>

      {/* Product List Table */}
      <div className="bg-white rounded-lg shadow-sm border border-neutral-100 overflow-hidden">
        {loading ? (
          <div className="p-8 flex justify-center text-neutral-400">
            <Loader2 size={32} className="animate-spin" />
          </div>
        ) : products.length === 0 ? (
          <div className="p-12 text-center text-neutral-500 flex flex-col items-center">
            <Package size={48} className="mb-4 text-neutral-300" />
            <p>No products found in the catalog.</p>
            <Link href="/admin/products/new" className="text-amber-600 mt-2 font-medium hover:underline">
              Create your first product
            </Link>
          </div>
        ) : (
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-neutral-50 border-b border-neutral-200">
                <th className="p-4 font-medium text-neutral-600 w-20">Image</th>
                <th className="p-4 font-medium text-neutral-600">Product Name</th>
                <th className="p-4 font-medium text-neutral-600">Category</th>
                <th className="p-4 font-medium text-neutral-600">Status</th>
                <th className="p-4 font-medium text-neutral-600 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product._id} className="border-b border-neutral-100 hover:bg-neutral-50">
                  <td className="p-4">
                    {product.images && product.images.length > 0 ? (
                      <img src={product.images[0]} alt={product.name} className="w-12 h-12 object-cover rounded-md border border-gray-200" />
                    ) : (
                      <div className="w-12 h-12 bg-neutral-100 rounded-md border border-gray-200 flex items-center justify-center">
                        <Package size={16} className="text-neutral-400" />
                      </div>
                    )}
                  </td>
                  <td className="p-4 font-medium text-neutral-800">{product.name}</td>
                  <td className="p-4 text-neutral-500 text-sm capitalize">{product.category}</td>
                  <td className="p-4">
                    {product.isFeatured && (
                      <span className="px-2 py-1 text-[10px] uppercase tracking-wider rounded-full bg-amber-100 text-amber-700 font-medium">
                        Featured
                      </span>
                    )}
                  </td>
                  <td className="p-4 flex justify-end gap-2">
                    <Link 
                      href={`/admin/products/${product._id}`}
                      className="p-2 text-blue-600 hover:bg-blue-50 rounded transition-colors"
                    >
                      <Edit size={18} />
                    </Link>
                    <button 
                      onClick={() => handleDelete(product._id)} 
                      className="p-2 text-red-600 hover:bg-red-50 rounded transition-colors"
                    >
                      <Trash2 size={18} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}