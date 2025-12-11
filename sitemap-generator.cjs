const { SitemapStream, streamToPromise } = require('sitemap');
const { createWriteStream } = require('fs');

// STATIC ROUTES
const routes = [
  '/',
  '/register',
  '/reset-password',
];

 

(async () => {
  const sitemap = new SitemapStream({ hostname: 'https://app.ilefund.com' });

  const writeStream = createWriteStream('./public/sitemap.xml');
  sitemap.pipe(writeStream);

  routes.forEach((url) => sitemap.write({ url }));


  sitemap.end();

  await streamToPromise(sitemap);
  console.log('✅ Sitemap generated successfully!');
})();
