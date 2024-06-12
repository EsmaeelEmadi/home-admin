 import path from "path";
 import url from 'url';

 const filename = url.fileURLToPath(import.meta.url);
 const dirname = path.dirname(filename);
 
 /** @type {import('next').NextConfig} */
 const nextConfig = {
   reactStrictMode: true,
   swcMinify: true,
   webpack(config) {
     config.module.rules.push({
       test: /\.svg$/,
       use: ["@svgr/webpack"],
     });
 
     return config;
   },
   sassOptions: {
     includePaths: [path.join(dirname, "styles")],
   },
 };
 
 export default nextConfig;

