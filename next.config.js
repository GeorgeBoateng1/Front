const withTM = require("next-transpile-modules")([
  "@fullcalendar/react",
  "@fullcalendar/daygrid",
  "@fullcalendar/interaction",
  "@fullcalendar/list",
  "@fullcalendar/timegrid",
  "@fullcalendar/timeline"
]);

const nextConfig = withTM({
  swcMinify: false,
  trailingSlash: true,
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          { key: 'Access-Control-Allow-Credentials', value: 'true' },
          { key: 'Access-Control-Allow-Origin', value: 'https://your-vercel-app.vercel.app' }, // Allow requests from deployed frontend
          { key: 'Access-Control-Allow-Methods', value: 'GET,DELETE,PATCH,POST,PUT' },
          { key: 'Access-Control-Allow-Headers', value: 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version, Authorization' },
        ],
      },
    ];
  },
  env: {
    DEV_API: 'https://test.annologic.com', // Updated backend URL
    // FIREBASE AUTH
    FIREBASE_API_KEY: "",
    FIREBASE_AUTH_DOMAIN: "",
    FIREBASE_PROJECT_ID: "",
    FIREBASE_STORAGE_BUCKET: "",
    FIREBASE_MESSAGING_SENDER_ID: "",
    FIREBASE_APPID: "",
    FIREBASE_MEASUREMENT_ID: "",
    // AWS COGNITO AUTH
    AWS_COGNITO_USER_POOL_ID: "",
    AWS_COGNITO_CLIENT_ID: "",
    // AUTH0 AUTH
    AUTH0_CLIENT_ID: "",
    AUTH0_DOMAIN: "",
    // MAPBOX
    MAPBOX: ""
  }
});

module.exports = nextConfig;
