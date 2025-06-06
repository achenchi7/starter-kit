import Link from 'next/link';
import { Container } from './container';
import { useAppContext } from './contexts/appContext';
import { SocialLinks } from './social-links';

export const Footer = () => {
	const { publication } = useAppContext();
	const PUBLICATION_LOGO = publication.preferences.logo;
	return (
		<footer className="border-t py-12 dark:border-neutral-800 bg-slate-50 dark:bg-neutral-900">
			<Container className="px-5">
				{PUBLICATION_LOGO ? (
					<div className="mb-8 flex w-full flex-row justify-center">
						<Link
							href={'/'}
							aria-label={`${publication.title} home page`}
							className="flex flex-row items-center gap-5"
						>
							<img className="block w-32" src={PUBLICATION_LOGO} alt={publication.title} />
						</Link>
					</div>
				) : (
					<p className="mb-8 text-center text-xl font-semibold text-slate-900 dark:text-slate-50 md:text-3xl">
						{publication.title}
					</p>
				)}
				<div className="flex flex-col items-center justify-center gap-8">
					<div className="flex flex-col items-center gap-4">
						<p className="text-lg font-semibold text-slate-700 dark:text-neutral-200">Connect with me</p>
						<SocialLinks />
					</div>
					<p className="text-center text-sm text-slate-500 dark:text-neutral-400">
						© {new Date().getFullYear()} {publication.title}. All rights reserved.
					</p>
				</div>
			</Container>
		</footer>
	);
};
