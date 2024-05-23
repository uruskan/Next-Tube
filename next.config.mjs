/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
      remotePatterns: [
        {
          protocol: 'https',
          hostname: 'i.imgur.com',
          port: '',
          pathname: '/**',
        },
        {
            protocol: 'https',
            hostname: 'via.placeholder.com',
            port: '',
            pathname: '/**',
        },
        {
            protocol: 'https',
            hostname: 'images.pexels.com',
            port: '',
            pathname: '/**',  
        },
        {
            protocol: 'https',
            hostname: 'videos.pexels.com',
            port: '',
            pathname: '/**',  
        }

      ],
    },
  };

  export default nextConfig;
  