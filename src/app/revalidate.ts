import { revalidatePath, revalidateTag } from 'next/cache'
import 'server-only'

// Revalidation functions for manual cache invalidation
export async function revalidateContent() {
  'use server'
  
  // Revalidate all content-related paths
  revalidatePath('/')
  revalidatePath('/products')
  revalidatePath('/blog')
  revalidatePath('/blogs')
  
  // Revalidate by tags
  revalidateTag('content')
  revalidateTag('products')
  revalidateTag('blogs')
}

export async function revalidateProducts() {
  'use server'
  
  revalidatePath('/products')
  revalidateTag('products')
}

export async function revalidateBlogs() {
  'use server'
  
  revalidatePath('/blog')
  revalidatePath('/blogs')
  revalidateTag('blogs')
}