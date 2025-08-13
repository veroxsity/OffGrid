# Setting Up OAuth Authentication

## GitHub OAuth Setup

### 1. Create a GitHub OAuth App

1. Go to **GitHub Settings** → **Developer settings** → **OAuth Apps**
   - Or visit: https://github.com/settings/developers

2. Click **"New OAuth App"**

3. Fill in the application details:
   ```
   Application name: Off-Grid Freedom (Dev)
   Homepage URL: http://localhost:3000
   Authorization callback URL: http://localhost:3000/api/auth/callback/github
   ```

4. Click **"Register application"**

5. After creation, you'll see:
   - **Client ID** (public)
   - **Client Secret** (keep secret!)

### 2. Update Your Environment Variables

In your `.env` file, replace the placeholder values:

```env
# GitHub OAuth
GITHUB_CLIENT_ID="your_actual_github_client_id_here"
GITHUB_CLIENT_SECRET="your_actual_github_client_secret_here"
```

---

## Google OAuth Setup

### 1. Create a Google Cloud Project

1. Go to **Google Cloud Console**: https://console.cloud.google.com/

2. Create a new project or select existing one

3. Enable the **Google+ API**:
   - Go to **APIs & Services** → **Library**
   - Search for "Google+ API" 
   - Click **Enable**

### 2. Configure OAuth Consent Screen

1. Go to **APIs & Services** → **OAuth consent screen**

2. Choose **External** user type (for testing)

3. Fill in required fields:
   ```
   App name: Off-Grid Freedom
   User support email: your-email@example.com
   Developer contact: your-email@example.com
   ```

4. Add scopes (optional for basic auth):
   - Just use the default scopes for now

5. Add test users (yourself) in **Test users** section

### 3. Create OAuth Credentials

1. Go to **APIs & Services** → **Credentials**

2. Click **"+ CREATE CREDENTIALS"** → **OAuth client ID**

3. Choose **Web application**

4. Configure:
   ```
   Name: Off-Grid Freedom Web Client
   Authorized JavaScript origins: http://localhost:3000
   Authorized redirect URIs: http://localhost:3000/api/auth/callback/google
   ```

5. Click **Create**

6. Copy the **Client ID** and **Client Secret**

### 4. Update Environment Variables

Add to your `.env` file:

```env
# Google OAuth
GOOGLE_CLIENT_ID="your_actual_google_client_id_here"
GOOGLE_CLIENT_SECRET="your_actual_google_client_secret_here"
```

---

## Production Setup

### For Production Deployment:

1. **GitHub OAuth App (Production)**:
   - Create another OAuth app for production
   - Homepage URL: `https://yourdomain.com`
   - Callback URL: `https://yourdomain.com/api/auth/callback/github`

2. **Google OAuth (Production)**:
   - Update authorized origins: `https://yourdomain.com`
   - Update redirect URIs: `https://yourdomain.com/api/auth/callback/google`
   - Submit app for verification if needed

3. **Environment Variables**:
   ```env
   NEXTAUTH_URL="https://yourdomain.com"
   NEXTAUTH_SECRET="your-super-secure-production-secret"
   ```

---

## Testing OAuth

1. **Restart your development server** after updating environment variables:
   ```bash
   npm run dev
   ```

2. **Test the flow**:
   - Visit http://localhost:3000/auth/signin
   - Click "Continue with GitHub" or "Continue with Google"
   - Authorize the application
   - You should be redirected back and logged in

3. **Check the database**:
   - Your user account should be created in the database
   - OAuth account should be linked

---

## Troubleshooting

### Common Issues:

1. **"Invalid client" error**:
   - Check that Client ID and Secret are correct
   - Ensure redirect URLs match exactly

2. **"This app isn't verified" (Google)**:
   - Add yourself as a test user
   - Or submit for verification (production only)

3. **"Authorization callback URL mismatch"**:
   - Ensure callback URLs are exactly: `/api/auth/callback/{provider}`
   - Check for trailing slashes

4. **Environment variables not loading**:
   - Restart the development server
   - Check `.env` file syntax (no spaces around =)

---

## Security Notes

- **Never commit** Client Secrets to version control
- Use different OAuth apps for development/staging/production
- Rotate secrets regularly in production
- Consider using environment-specific secrets management
