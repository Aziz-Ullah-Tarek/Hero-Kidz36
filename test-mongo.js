// Test MongoDB Connection
// Run this with: node test-connection.js

require('dotenv').config({ path: '.env.local' });
const { MongoClient, ServerApiVersion } = require('mongodb');

async function testConnection() {
    console.log('🔍 Testing MongoDB Connection...\n');
    
    const uri = process.env.MONGODB_URI;
    const dbName = process.env.DB_NAME;
    
    console.log('Environment Variables:');
    console.log('- MONGODB_URI:', uri ? '✅ Set' : '❌ Missing');
    console.log('- DB_NAME:', dbName || '❌ Missing');
    console.log('');
    
    if (!uri || !dbName) {
        console.error('❌ Missing environment variables!');
        console.log('\nPlease check your .env.local file has:');
        console.log('MONGODB_URI=your_connection_string');
        console.log('DB_NAME=HeroKidzDB');
        process.exit(1);
    }
    
    const client = new MongoClient(uri, {
        serverApi: {
            version: ServerApiVersion.v1,
            strict: true,
            deprecationErrors: true,
        },
        maxPoolSize: 10,
        serverSelectionTimeoutMS: 10000,
    });
    
    try {
        console.log('🔄 Connecting to MongoDB Atlas...');
        await client.connect();
        console.log('✅ Connected successfully!\n');
        
        // Test database access
        console.log('🔍 Testing database access...');
        const db = client.db(dbName);
        const collections = await db.listCollections().toArray();
        console.log(`✅ Database "${dbName}" accessible`);
        console.log(`📦 Found ${collections.length} collections:`, collections.map(c => c.name).join(', '));
        console.log('');
        
        // Test products collection
        console.log('🔍 Testing products collection...');
        const productsCollection = db.collection('products');
        const productCount = await productsCollection.countDocuments();
        console.log(`✅ Products collection: ${productCount} documents`);
        
        if (productCount > 0) {
            const sampleProduct = await productsCollection.findOne({});
            console.log('📦 Sample product:', sampleProduct?.title || 'No title');
        }
        
        console.log('\n✅ All tests passed! MongoDB is configured correctly.');
        
    } catch (error) {
        console.error('\n❌ Connection failed!');
        console.error('Error:', error.message);
        console.log('\n🔧 Troubleshooting:');
        console.log('1. Check your MongoDB Atlas Network Access (allow 0.0.0.0/0 or your IP)');
        console.log('2. Verify username and password in connection string');
        console.log('3. Ensure database user has proper permissions');
        console.log('4. Check if cluster is active in MongoDB Atlas');
        process.exit(1);
    } finally {
        await client.close();
        console.log('\n🔌 Connection closed.');
    }
}

testConnection();
