// Check product data
require('dotenv').config({ path: '.env.local' });
const { MongoClient } = require('mongodb');

const uri = process.env.MONGODB_URI;
const dbName = process.env.DB_NAME;

async function checkProducts() {
    const client = new MongoClient(uri);
    
    try {
        await client.connect();
        const db = client.db(dbName);
        const productsCollection = db.collection('products');
        
        const products = await productsCollection.find({}).limit(3).toArray();
        
        console.log('\nProduct Data:');
        products.forEach((product, index) => {
            console.log(`\n--- Product ${index + 1} ---`);
            console.log('Title:', product.title);
            console.log('Image URL:', product.image);
            console.log('Price:', product.price);
        });
        
    } catch (error) {
        console.error('Error:', error.message);
    } finally {
        await client.close();
    }
}

checkProducts();
