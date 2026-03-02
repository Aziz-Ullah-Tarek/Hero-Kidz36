// Test API endpoint
async function testAPI() {
    console.log('Testing API endpoint...\n');
    
    try {
        const response = await fetch('http://localhost:3000/api/products');
        const data = await response.json();
        
        console.log('Status:', response.status);
        console.log('Success:', data.success);
        console.log('Product Count:', data.count);
        
        if (data.success && data.data.length > 0) {
            console.log('\n✅ API working! Sample product:');
            console.log('Title:', data.data[0].title);
            console.log('Price:', data.data[0].price);
        } else {
            console.log('\n❌ API returned no products');
        }
        
    } catch (error) {
        console.error('❌ API Error:', error.message);
        console.log('\nNote: Make sure dev server is running (npm run dev)');
    }
}

testAPI();
