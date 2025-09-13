// Serverless function for GitHub OAuth with Decap CMS
export default function handler(req, res) {
  // Enable CORS for the CMS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method === 'GET') {
    const { code, state } = req.query;
    
    if (code) {
      // Handle OAuth callback
      res.redirect(`/admin/#access_token=${code}&token_type=bearer`);
    } else {
      // Initiate OAuth flow
      const clientId = process.env.GITHUB_CLIENT_ID;
      const redirectUri = `${req.headers.origin}/api/auth`;
      const scope = 'repo,user';
      
      const githubAuthUrl = `https://github.com/login/oauth/authorize?client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scope}&state=${state || 'cms'}`;
      
      res.redirect(githubAuthUrl);
    }
  }
}