import { MongoClient, ServerApiVersion, ObjectId } from 'mongodb';

const uri = process.env.MONGODB_URI;
const dbName = process.env.DB_NAME;

export const collections = {
    PRODUCTS: "products",
    BLOGS: "blogs",
}

// Validate environment variables
if (!uri) {
    throw new Error('Invalid/Missing environment variable: "MONGODB_URI"');
}

if (!dbName) {
    throw new Error('Invalid/Missing environment variable: "DB_NAME"');
}

// MongoDB client options optimized for Vercel serverless
const options = {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    },
    maxPoolSize: 10,
    minPoolSize: 2,
    maxIdleTimeMS: 30000,
    serverSelectionTimeoutMS: 10000,
    socketTimeoutMS: 45000,
};

let client;
let clientPromise;

if (process.env.NODE_ENV === 'development') {
    // In development mode, use a global variable to preserve the connection
    // across hot reloads
    if (!global._mongoClientPromise) {
        client = new MongoClient(uri, options);
        global._mongoClientPromise = client.connect();
    }
    clientPromise = global._mongoClientPromise;
} else {
    // In production mode, it's best to not use a global variable
    // but reuse connections when possible
    if (!global._mongoClientPromise) {
        client = new MongoClient(uri, options);
        global._mongoClientPromise = client.connect();
    }
    clientPromise = global._mongoClientPromise;
}

export const dbconnect = async (cname) => {
    try {
        const connectedClient = await clientPromise;
        const db = connectedClient.db(dbName);
        return db.collection(cname);
    } catch (error) {
        console.error('MongoDB connection error:', error);
        throw new Error(`Failed to connect to database: ${error.message}`);
    }
}

// Export ObjectId for use in other files
export { ObjectId };