/** @type {import('next').NextConfig} */

import redirectsMap from './redirects.json' with {type: 'json'};
import rewritesMap from './rewrites.json' with {type: 'json'};

const nextConfig = {
    redirects: async () => {
        return Object.entries(redirectsMap).map(([source, destination]) => ({
            source: source,
            destination: destination,
            permanent: false,
        }));
    },
    rewrites: async () => {
        return Object.entries(rewritesMap).map(([source, destination]) => ({
            source: source,
            destination: destination,
        }));
    }
};

export default nextConfig;
