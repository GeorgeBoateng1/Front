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
          { key: 'Access-Control-Allow-Origin', value: 'https://test.annologic.com' }, // Allow requests from your backend domain
          { key: 'Access-Control-Allow-Methods', value: 'GET,DELETE,PATCH,POST,PUT' },
          { key: 'Access-Control-Allow-Headers', value: 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version, Authorization' },
        ],
      },
    ];
  },
  env: {
    // DEV_API: 'http://localhost:3031',
    // HOST_API_KEY: 'http://localhost:3030',
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
    //
    MAPBOX: ""
  }
});

module.exports = nextConfig;
