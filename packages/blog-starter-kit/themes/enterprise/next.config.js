const { request, gql } = require('graphql-request');

const ANALYTICS_BASE_URL = 'https://hn-ping2.hashnode.com';
const HASHNODE_ADVANCED_ANALYTICS_URL = 'https://user-analytics.hashnode.com';

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;
const GQL_ENDPOINT = process.env.NEXT_PUBLIC_HASHNODE_GQL_ENDPOINT;
const host = process.env.NEXT_PUBLIC_HASHNODE_PUBLICATION_HOST;

const getBasePath = () => {
	if (process.env.NODE_ENV === 'development') {
		return '';
	}
	if (BASE_URL && BASE_URL.indexOf('/') !== -1) {
		const path = BASE_URL.substring(BASE_URL.indexOf('/'));
		return path === '/' ? '' : path;
	}
	return '';
};

/**
 * @type {import('next').NextConfig}
 */
const config = {
	transpilePackages: ['@starter-kit/utils'],
	basePath: getBasePath(),
	experimental: {
		scrollRestoration: true,
	},
	images: {
		unoptimized: true,
		remotePatterns: [
			{
				protocol: 'https',
				hostname: 'cdn.hashnode.com',
			},
		],
	},
	async rewrites() {
		return [
			{
				source: '/ping/data-event',
				destination: `${ANALYTICS_BASE_URL}/api/data-event`,
			},
			{
				source: '/api/analytics',
				destination: `${HASHNODE_ADVANCED_ANALYTICS_URL}/api/analytics`,
			},
		];
	},
	async redirects() {
		// Skip redirection rules in development to avoid the GraphQL error
		if (process.env.NODE_ENV === 'development') {
			return [];
		}

		try {
			if (!host || !GQL_ENDPOINT) {
				console.warn('Missing required environment variables for redirection rules');
				return [];
			}

			const query = gql`
				query GetRedirectionRules {
					publication(host: "${host}") {
						id
						redirectionRules {
							source
							destination
							type
						}
					}
				}
			`;

			const data = await request(GQL_ENDPOINT, query);
			const redirectionRules = data?.publication?.redirectionRules || [];

			return redirectionRules
				.filter((rule) => rule.source.indexOf('*') === -1)
				.map((rule) => ({
					source: rule.source,
					destination: rule.destination,
					permanent: rule.type === 'PERMANENT',
				}));
		} catch (error) {
			console.warn('Error fetching redirection rules:', error);
			return [];
		}
	},
};

module.exports = config;
