import { dbconnect, collections } from '@/lib/dbconnect';

export default async function sitemap() {
  const baseUrl = 'https://herokidz36.vercel.app';

  // Static routes
  const routes = [
    '',
    '/routes/products',
    '/routes/about',
    '/routes/blog',
    '/routes/contact',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date().toISOString(),
    changeFrequency: route === '' ? 'daily' : 'weekly',
    priority: route === '' ? 1.0 : 0.8,
  }));

  // Dynamic product routes
  let productRoutes = [];
  try {
    const productsCollection = await dbconnect(collections.PRODUCTS);
    const products = await productsCollection.find({}).toArray();
    
    productRoutes = products.map((product) => ({
      url: `${baseUrl}/routes/products/${product._id.toString()}`,
      lastModified: product.updatedAt ? new Date(product.updatedAt).toISOString() : new Date().toISOString(),
      changeFrequency: 'weekly',
      priority: 0.7,
    }));
  } catch (error) {
    console.error('Error generating product sitemap:', error);
  }

  // Dynamic blog routes (if you have blogs in DB)
  let blogRoutes = [];
  try {
    const blogsCollection = await dbconnect(collections.BLOGS);
    const blogs = await blogsCollection.find({}).toArray();
    
    blogRoutes = blogs.map((blog) => ({
      url: `${baseUrl}/routes/blog/${blog._id.toString()}`,
      lastModified: blog.updatedAt ? new Date(blog.updatedAt).toISOString() : new Date().toISOString(),
      changeFrequency: 'monthly',
      priority: 0.6,
    }));
  } catch (error) {
    // Blog collection might not exist yet
    console.log('Blog collection not found, skipping blog routes in sitemap');
  }

  return [...routes, ...productRoutes, ...blogRoutes];
}
