export default function sitemap() {
  return [
    {
      url: 'https://nexora-financial-solutions.vercel.app', // Update this with your actual production domain
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
    },
    // Add additional pages here if you expand the site in the future
    // {
    //   url: 'https://nexora-financial-solutions.vercel.app/about',
    //   lastModified: new Date(),
    //   changeFrequency: 'monthly',
    //   priority: 0.8,
    // },
  ];
}
