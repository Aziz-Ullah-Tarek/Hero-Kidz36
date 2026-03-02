# MongoDB Integration Setup Guide

## What Changed?

Your Hero Kidz e-commerce project now uses MongoDB instead of JSON files for product data.

## Files Created/Modified:

### 1. Created Files:
- **.env.local** - MongoDB connection configuration
- **src/app/api/products/route.js** - API endpoint to get all products
- **src/app/api/products/[id]/route.js** - API endpoint to get single product by ID
- **seed.js** - Script to populate MongoDB with your toys.json data
- **MONGODB_SETUP.md** - This guide
### 2. Modified Files:
- **src/lib/dbconnect.js** - Fixed exports for collections constant
- **src/components/home/Products.jsx** - Now fetches from MongoDB instead of JSON
- **package.json** - Added seed script

---

## Setup Instructions:

### Step 1: Install dotenv (for seed script)
```bash
npm install dotenv
```

### Step 2: Configure MongoDB Connection

Edit `.env.local` file with your MongoDB connection string:

**Option A: Local MongoDB**
```
MONGODB_URI=mongodb://localhost:27017
DB_NAME=heroKidzDB
```

**Option B: MongoDB Atlas (Cloud)**
```
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/?retryWrites=true&w=majority
DB_NAME=heroKidzDB
```

### Step 3: Seed the Database

Run this command to populate MongoDB with your products from toys.json:

```bash
npm run seed
```

This will:
- Connect to your MongoDB
- Clear existing products (if any)
- Insert all products from `src/data/toys.json`

### Step 4: Start Development Server

```bash
npm run dev
```

---

## API Routes Available:

### 1. Get All Products
- **Endpoint:** `http://localhost:3000/api/products`
- **Method:** GET
- **Response:**
```json
{
  "success": true,
  "data": [...products],
  "count": 10
}
```

### 2. Get Single Product
- **Endpoint:** `http://localhost:3000/api/products/[id]`
- **Method:** GET
- **Response:**
```json
{
  "success": true,
  "data": {...product}
}
```

---

## How It Works Now:

1. **Products.jsx** (Server Component):
   - Directly queries MongoDB using `dbconnect()` function
   - Fetches products on the server side
   - No client-side API calls needed for initial page load
   - Better performance and SEO

2. **API Routes** (`/api/products`):
   - Available for client-side fetching if needed
   - Can be used by other components or external apps
   - Useful for dynamic updates without page reload

---

## Database Structure:

**Collection:** `products`  
**Database:** `heroKidzDB`

Each product document contains:
```javascript
{
  _id: ObjectId("..."),
  title: "Product Name",
  bangla: "বাংলা নাম",
  image: "https://...",
  price: 1250,
  discount: 10,
  sizes: [],
  color: [],
  description: "...",
  qna: [...],
  reviews: 19,
  sold: 31,
  ratings: 4.6,
  info: [...]
}
```

---

## Troubleshooting:

### Error: "Cannot connect to MongoDB"
- Check your MONGODB_URI in `.env.local`
- Make sure MongoDB is running (if using local)
- Check network connection (if using Atlas)

### Error: "Collection not found"
- Run `npm run seed` to populate the database

### Products not showing on website:
- Check browser console for errors- Verify MongoDB connection in terminal
- Make sure you ran the seed script

---

## Next Steps:

✅ Products now load from MongoDB  
✅ API routes are working  
✅ You can add/edit/delete products in MongoDB directly

### Optional Enhancements:
- Add pagination to `/api/products`
- Create POST/PUT/DELETE endpoints for admin panel
- Add search and filter functionality
- Cache products for better performance

---

## Need Help?

Check the terminal output when running:
- `npm run seed` - Should show "Successfully inserted X products"
- `npm run dev` - Should not show any MongoDB connection errors

If you see errors, check your `.env.local` configuration!
