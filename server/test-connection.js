const mongoose = require('mongoose');
const dns = require('dns').promises;

async function testConnection() {
  console.log('=== MongoDB Connection Diagnostic ===\n');
  
  // Test 1: DNS Resolution
  console.log('1. Testing DNS resolution...');
  try {
    const result = await dns.resolveSrv('_mongodb._tcp.cluster0.a7nwqzb.mongodb.net');
    console.log('   ✓ DNS SRV resolution successful');
    console.log('   Found', result.length, 'SRV records');
  } catch (error) {
    console.log('   ✗ DNS SRV resolution failed:', error.message);
    console.log('   This indicates your network is blocking DNS SRV queries');
  }
  
  // Test 2: Try direct connection
  console.log('\n2. Testing direct MongoDB connection...');
  const uri = process.env.MONGODB_URI || 'mongodb+srv://divijabajjuri7_db_user:Divi_0204@cluster0.a7nwqzb.mongodb.net/agroEase?retryWrites=true&w=majority';
  
  try {
    await mongoose.connect(uri, {
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
    });
    console.log('   ✓ MongoDB connection successful!');
    console.log('   Connected to:', mongoose.connection.host);
    await mongoose.disconnect();
  } catch (error) {
    console.log('   ✗ MongoDB connection failed:', error.message);
    console.log('   Error code:', error.code);
  }
  
  // Test 3: Check network connectivity
  console.log('\n3. Testing network connectivity...');
  try {
    await dns.resolve('google.com');
    console.log('   ✓ Internet connectivity working');
  } catch (error) {
    console.log('   ✗ No internet connectivity');
  }
  
  console.log('\n=== Diagnostic Complete ===');
  console.log('\nIf DNS SRV resolution failed, try:');
  console.log('1. Use a different network (mobile hotspot)');
  console.log('2. Switch to Google DNS (8.8.8.8, 8.8.4.4)');
  console.log('3. Check firewall/proxy settings');
  console.log('4. Contact your network administrator');
}

testConnection().catch(console.error);
