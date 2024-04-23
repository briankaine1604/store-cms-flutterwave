/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    PAYSTACK_PUBLIC_KEY: "pk_test_29e7f90af69f2a8a8b6d8eacd360a83e5026e547",
    PAYSTACK_SECRET_KEY: "sk_test_70e5634610362bb83328a7253bc1c7367a32e094",
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
        pathname: "**",
      },
    ],
  },
};

export default nextConfig;
