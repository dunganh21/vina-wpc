'use server'

import { searchProducts, searchBlogPosts } from '@/data/services/content'
import { transformProductToSearchResult } from '@/data/services/transformers'

export async function searchContent(query: string) {
  if (!query.trim()) {
    return { products: [], blogs: [] }
  }

  try {
    const [products, blogs] = await Promise.all([
      searchProducts(query),
      searchBlogPosts(query),
    ])

    return {
      products: products.map(transformProductToSearchResult),
      blogs,
    }
  } catch (error) {
    console.error('Search error:', error)
    return { products: [], blogs: [] }
  }
}