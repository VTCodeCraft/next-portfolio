import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */

  // images:{
  //   remotePatterns:[
  //     { 
  //       protocol: "https", 
  //       hostname: "example.com" 
  //     }]  
  //   }

      images: {
        qualities: [25, 75, 95],
      },
};

export default nextConfig;
