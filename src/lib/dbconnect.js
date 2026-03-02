import { MongoClient, ServerApiVersion, ObjectId } from 'mongodb';

const uri = process.env.MONGODB_URI;
const dbName = process.env.DB_NAME;

export const collections = {
    PRODUCTS: "products",
}

// Create a MongoClient with proper connection caching for Next.js
let client;
let clientPromise;

if (!uri) {
    throw new Error('Please add your MongoDB URI to .env.local');
}

if (process.env.NODE_ENV === 'development') {
    // In development mode, use a global variable to preserve the connection
    // across hot reloads
    if (!global._mongoClient) {
        client = new MongoClient(uri, {
            serverApi: {
                version: ServerApiVersion.v1,
                strict: true,
                deprecationErrors: true,
            }
        });
        global._mongoClient = client;
        global._mongoClientPromise = client.connect();
    }
    client = global._mongoClient;
    clientPromise = global._mongoClientPromise;
} else {
    // In production mode, create a new client for each request
    client = new MongoClient(uri, {
        serverApi: {
            version: ServerApiVersion.v1,
            strict: true,
            deprecationErrors: true,
        }
    });
    clientPromise = client.connect();
}

export const dbconnect = async (cname) => {
    const connectedClient = await clientPromise;
    return connectedClient.db(dbName).collection(cname);
}

export { ObjectId };