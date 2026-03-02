// Test MongoDB Connection
require('dotenv').config({ path: '.env.local' });
const { MongoClient } = require('mongodb');

const uri = process.env.MONGODB_URI;
const dbName = process.env.DB_NAME;

async function testConnection() {
    console.log('Testing MongoDB connection...');
    console.log('URI:', uri ? 'Found' : 'Missing');
    console.log('DB Name:', dbName);
    
    if (!uri) {
        console.error('ERROR: MONGODB_URI not found in .env.local');
        return;
    }
    
    const client = new MongoClient(uri);
    
    try {
        console.log('\nConnecting to MongoDB...');
        await client.connect();
        console.log('✓ Successfully connected to MongoDB!');
        
        const db = client.db(dbName);
        const productsCollection = db.collection('products');
        
        console.log('\nChecking products collection...');
        const count = await productsCollection.countDocuments();
        console.log(`✓ Found ${count} products in the database`);
        
        if (count > 0) {
            const sample = await productsCollection.findOne({});
            console.log('\nSample product:');
            console.log('- Title:', sample.title);
            console.log('- Price:', sample.price);
        } else {
            console.log('\n⚠ No products found. Run "npm run seed" to populate the database.');
        }
        
    } catch (error) {
        console.error('\n✗ Connection failed!');
        console.error('Error:', error.message);
    } finally {
        await client.close();
        console.log('\nConnection closed.');
    }
}

testConnection();
