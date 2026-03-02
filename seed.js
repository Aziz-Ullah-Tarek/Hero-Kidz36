// Script to seed MongoDB with products data from toys.json
// Run this script once to populate your MongoDB database

const { MongoClient } = require('mongodb');
require('dotenv').config({ path: '.env.local' });

const products = require('./src/data/toys.json');

const uri = process.env.MONGODB_URI;
const dbName = process.env.DB_NAME;

async function seedDatabase() {
    const client = new MongoClient(uri);
    
    try {
        console.log('Connecting to MongoDB...');
        await client.connect();
        console.log('Connected successfully!');
        
        const db = client.db(dbName);
        const productsCollection = db.collection('products');
        
        // Clear existing products (optional - comment out if you want to keep existing data)
        console.log('Clearing existing products...');
        await productsCollection.deleteMany({});
        
        // Insert products from JSON file
        console.log('Inserting products...');
        const result = await productsCollection.insertMany(products);
        
        console.log(`Successfully inserted ${result.insertedCount} products!`);
        console.log('Database seeding completed!');
        
    } catch (error) {
        console.error('Error seeding database:', error);
    } finally {
        await client.close();
        console.log('Connection closed.');
    }
}

// Run the seed function
seedDatabase();
