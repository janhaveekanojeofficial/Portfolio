# Cricket Portfolio - Deployment Guide

This guide provides step-by-step instructions to deploy your cricket portfolio website permanently.

## Deployment Options

### Option 1: Render (Recommended - Free with Database)

Render provides a free tier that includes both web hosting and PostgreSQL database. This is the easiest option for a full-stack application.

#### Steps:

1. **Create a Render Account**
   - Visit [render.com](https://render.com)
   - Sign up with your GitHub account (recommended for easy deployment)

2. **Connect Your Repository**
   - Click "New +" → "Web Service"
   - Connect your GitHub repository
   - Select the cricket_portfolio_v5 repository

3. **Configure the Service**
   - **Name**: cricket-portfolio
   - **Environment**: Node
   - **Build Command**: `pnpm install && pnpm build`
   - **Start Command**: `pnpm start`
   - **Plan**: Free

4. **Add Environment Variables**
   - Click "Environment" tab
   - Add the following variables:
     ```
     NODE_ENV=production
     PORT=3000
     JWT_SECRET=<generate a random secret>
     DATABASE_URL=<will be provided by Render PostgreSQL>
     ```

5. **Create a PostgreSQL Database (Free Tier)**
   - Click "New +" → "PostgreSQL"
   - **Name**: cricket-portfolio-db
   - **Plan**: Free
   - The DATABASE_URL will be automatically added to your web service

6. **Deploy**
   - Click "Create Web Service"
   - Render will automatically deploy your application
   - Your site will be live at: `https://cricket-portfolio.onrender.com`

### Option 2: Railway (Free with Credit)

Railway provides $5 free credits monthly, which is enough for a small full-stack app.

#### Steps:

1. Visit [railway.app](https://railway.app)
2. Sign up with GitHub
3. Create a new project
4. Connect your GitHub repository
5. Railway will auto-detect the Node.js project
6. Add a MySQL database from the Railway dashboard
7. Set environment variables in the Railway dashboard
8. Deploy automatically on push to main branch

### Option 3: Fly.io (Free with Limitations)

Fly.io offers free tier with 3 shared-cpu-1x 256MB VMs.

#### Steps:

1. Install Fly CLI: `curl -L https://fly.io/install.sh | sh`
2. Sign up: `flyctl auth signup`
3. Create app: `flyctl launch`
4. Add MySQL database: `flyctl postgres create`
5. Deploy: `flyctl deploy`

## Database Migration

Your project uses Drizzle ORM with MySQL. When deploying:

1. **Update DATABASE_URL** to your new database connection string
2. **Run migrations**:
   ```bash
   pnpm db:push
   ```

## Environment Variables Required

| Variable | Description | Example |
|----------|-------------|---------|
| `NODE_ENV` | Environment mode | `production` |
| `PORT` | Server port | `3000` |
| `DATABASE_URL` | MySQL connection string | `mysql://user:pass@host:3306/db` |
| `JWT_SECRET` | Secret for JWT tokens | Any random string |
| `VITE_APP_ID` | App ID (optional) | Your app ID |
| `OAUTH_SERVER_URL` | OAuth server URL (optional) | Your OAuth server |

## Post-Deployment

1. **Verify the site is running**
   - Visit your deployment URL
   - Check that all pages load correctly
   - Test the carousel and navigation

2. **Monitor logs**
   - Check application logs for any errors
   - Monitor database connections

3. **Set up custom domain** (Optional)
   - In your hosting platform dashboard
   - Add your custom domain (e.g., palashkanoje.com)
   - Configure DNS settings

## Troubleshooting

### Build Fails
- Ensure all dependencies are listed in package.json
- Check that Node version is compatible (v18+)
- Verify environment variables are set

### Database Connection Fails
- Verify DATABASE_URL is correct
- Check database credentials
- Ensure database is running and accessible

### Port Issues
- The app uses PORT environment variable
- Default is 3000
- Render/Railway will set this automatically

## Local Testing Before Deployment

```bash
# Build the project
pnpm build

# Test production build locally
NODE_ENV=production node dist/index.js
```

Visit `http://localhost:3000` to test.

## Continuous Deployment

Once connected to GitHub:
- Every push to `main` branch automatically deploys
- Rollback to previous version if needed
- View deployment logs in dashboard

## Support & Resources

- [Render Documentation](https://render.com/docs)
- [Railway Documentation](https://docs.railway.app)
- [Fly.io Documentation](https://fly.io/docs)
- [Drizzle ORM Docs](https://orm.drizzle.team)
