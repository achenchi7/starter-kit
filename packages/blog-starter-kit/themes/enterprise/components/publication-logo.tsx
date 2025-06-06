import { resizeImage } from '@starter-kit/utils/image';
import Link from 'next/link';
import { useAppContext } from './contexts/appContext';
import { PublicationFragment } from '../generated/graphql';

const getPublicationLogo = (publication: PublicationFragment, isSidebar?: boolean) => {
	if (isSidebar) {
		return publication.preferences.logo; // Always display light mode logo in sidebar
	}
	return publication.preferences.darkMode?.logo || publication.preferences.logo;
}

interface PublicationLogoProps {
	className?: string;
}

export const PublicationLogo = ({ className = '' }: PublicationLogoProps) => {
	const { publication } = useAppContext();
	const PUBLICATION_LOGO = getPublicationLogo(publication, false);
	const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || '/';

	return (
		<Link
			href={baseUrl}
			aria-label={`${publication.title} home page`}
			className="flex flex-row items-center gap-5"
		>
			{PUBLICATION_LOGO ? (
				<img
					className={`block w-40 ${className}`}
					src={PUBLICATION_LOGO}
					alt={publication.title}
				/>
			) : (
				<p className="text-xl font-semibold text-slate-900 dark:text-slate-50">
					{publication.title}
				</p>
			)}
		</Link>
	);
};
