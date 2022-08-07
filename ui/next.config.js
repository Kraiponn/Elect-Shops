/** @type {import('next').NextConfig} */
// const nextConfig = {
//   reactStrictMode: true,
// };
const nextTranslate = require("next-translate");

// module.exports = {
//   ...nextTranslate(),
// };

module.exports = nextTranslate({
  reactStrictMode: true,
  images: {
    domains: ["res.cloudinary.com", "images.unsplash.com", "localhost"],
  },
});
