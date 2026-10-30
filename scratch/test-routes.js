import http from 'http';

const routes = [
  '/',
  '/properties',
  '/properties/CP10241',
  '/buyer/dashboard',
  '/buyer/property-dashboard',
  '/buyer/add-property',
  '/buyer/add-open-plot',
  '/buyer/compare',
  '/buyer/shortlisted',
  '/admin',
  '/admin/dashboard',
  '/nri/dashboard',
  '/nri/properties',
  '/nri/my-properties',
  '/nri/shortlisted',
  '/nri/compare',
  '/nri/property-management',
  '/nri/management',
  '/nri/services',
  '/nri/documents',
  '/nri/payments',
  '/nri/agent',
  '/nri/details',
  '/login',
  '/register/builder',
  '/register/customer',
  '/register/nri'
];

async function checkRoutes() {
  console.log(`Checking ${routes.length} registered routes on http://localhost:3000...`);
  let passed = 0;
  let failed = 0;

  for (const route of routes) {
    try {
      await new Promise((resolve) => {
        http.get(`http://localhost:3000${route}`, (res) => {
          if (res.statusCode === 200) {
            console.log(`[PASS] ${route} -> Status: 200 OK`);
            passed++;
          } else {
            console.log(`[FAIL] ${route} -> Status: ${res.statusCode}`);
            failed++;
          }
          resolve();
        }).on('error', (err) => {
          console.log(`[ERR] ${route} -> ${err.message}`);
          failed++;
          resolve();
        });
      });
    } catch (e) {
      failed++;
    }
  }

  console.log(`\nRoute Audit Summary: Total: ${routes.length}, Passed: ${passed}, Failed: ${failed}`);
}

checkRoutes();
