# Vercel Deployment Guide for Hero Kidz

## 🚨 IMPORTANT: Fix "Authentication Failed" Error

Your products are not showing in production because the MongoDB environment variables are not properly configured in Vercel.

## ✅ Step-by-Step Fix:

### 1. Add Environment Variables to Vercel

1. Go to your Vercel Dashboard: https://vercel.com/dashboard
2. Select your **hero-kidz** project
3. Click on **Settings** tab
4. Click on **Environment Variables** in the left sidebar
5. Add these TWO variables:

#### Variable 1: MONGODB_URI
```
Name: MONGODB_URI
Value: mongodb+srv://HeroKidzDB:Zmw75D11plBH1wpe@cluster0.bcz1ya4.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0
```
- ✅ Check: Production
- ✅ Check: Preview  
- ✅ Check: Development

#### Variable 2: DB_NAME
```
Name: DB_NAME
Value: HeroKidzDB
```
- ✅ Check: Production
- ✅ Check: Preview
- ✅ Check: Development

### 2. Verify MongoDB Atlas Settings

1. Go to MongoDB Atlas: https://cloud.mongodb.com/
2. Select your cluster
3. Click **Network Access** → Make sure your IP is whitelisted OR add `0.0.0.0/0` to allow all (for Vercel)
4. Click **Database Access** → Verify user `HeroKidzDB` has "Read and write to any database" permissions

### 3. Deploy to Production

After adding environment variables, run:

```bash
# Deploy to production
vercel --prod
```

Or simply push to your Git repository (if connected).

## 🔍 Verify Deployment

### Check Environment Variables:
After deployment, verify at:
- https://herokidz36.vercel.app/api/products

You should see a JSON response with products, not an authentication error.

### Check Products Page:
Visit: https://herokidz36.vercel.app/

Products should now display correctly!

## 🐛 Troubleshooting

### Still seeing "bad auth" error?

1. **Verify credentials in MongoDB Atlas:**
   - Username: `HeroKidzDB`
   - Password: `Zmw75D11plBH1wpe`

2. **Check MongoDB Atlas Network Access:**
   - Add `0.0.0.0/0` (Allow access from anywhere)
   - Or add Vercel's IP ranges

3. **Regenerate MongoDB password if needed:**
   - Go to Database Access in MongoDB Atlas
   - Edit user → Edit Password
   - Update the password in Vercel environment variables
   - Redeploy: `vercel --prod`

4. **Check Database name:**
   - Make sure the database name is exactly: `HeroKidzDB`
   - Case-sensitive!

### Environment variables not updating?

After changing environment variables in Vercel:
1. Go to **Deployments** tab
2. Click the 3 dots on latest deployment
3. Click **Redeploy**
4. Check "Use existing Build Cache" = NO
5. Click **Redeploy**

## 📊 MongoDB Connection String Format

Your connection string should look like this:
```
mongodb+srv://<username>:<password>@<cluster>.mongodb.net/?retryWrites=true&w=majority&appName=<AppName>
```

Current configuration:
- Username: `HeroKidzDB`
- Password: `Zmw75D11plBH1wpe`
- Cluster: `cluster0.bcz1ya4.mongodb.net`
- Database: `HeroKidzDB`

## ✨ After Successful Deployment

Your website will be live at:
- **Production**: https://herokidz36.vercel.app
- **API**: https://herokidz36.vercel.app/api/products
- **Products Page**: https://herokidz36.vercel.app/routes/products

## 🔐 Security Recommendations

After confirming everything works:

1. **Whitelist only Vercel IPs** instead of 0.0.0.0/0 in MongoDB Atlas
2. **Rotate MongoDB password** periodically
3. Never commit `.env.local` to Git
4. Use strong passwords for production databases

## 📞 Need Help?

If issues persist:
1. Check Vercel deployment logs: Settings → Deployments → [Click deployment] → View Function Logs
2. Check MongoDB Atlas logs
3. Test the API endpoint directly: https://herokidz36.vercel.app/api/products

---

**Last Updated**: March 5, 2026
