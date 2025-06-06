import Link from 'next/link';
import { useAppContext } from './contexts/appContext';
import { GithubSVG, HashnodeSVG, LinkedinSVG, XSVG } from './icons';

export const SocialLinks = ({ isSidebar }: { isSidebar?: boolean }) => {
	const { publication } = useAppContext();
	const socialLinks = {
		...publication?.links,
		github: publication?.links?.github || 'YOUR_GITHUB_URL', // Replace with your GitHub URL
		linkedin: publication?.links?.linkedin || 'YOUR_LINKEDIN_URL', // Replace with your LinkedIn URL
	};

	return (
		<div
			className={`flex flex-row flex-wrap gap-3 text-slate-600 dark:text-neutral-300 ${
				isSidebar ? 'justify-start' : 'justify-center'
			}`}
		>
			{socialLinks.github && (
				<a
					href={socialLinks.github}
					target="_blank"
					rel="noopener noreferrer"
					aria-label="Find me on Github"
					className="flex flex-row items-center justify-center rounded-lg border border-slate-200 p-2.5 hover:bg-slate-100 hover:text-slate-900 dark:border-neutral-800 dark:hover:bg-neutral-600 dark:hover:text-white transition-colors duration-200"
				>
					<GithubSVG className="h-5 w-5 stroke-current" />
					<span className="ml-2">GitHub</span>
				</a>
			)}
			{socialLinks.linkedin && (
				<a
					href={socialLinks.linkedin}
					target="_blank"
					rel="noopener noreferrer"
					aria-label="Find me on LinkedIn"
					className="flex flex-row items-center justify-center rounded-lg border border-slate-200 p-2.5 hover:bg-slate-100 hover:text-slate-900 dark:border-neutral-800 dark:hover:bg-neutral-600 dark:hover:text-white transition-colors duration-200"
				>
					<LinkedinSVG className="h-5 w-5 stroke-current" />
					<span className="ml-2">LinkedIn</span>
				</a>
			)}
			{socialLinks.twitter && (
				<a
					href={socialLinks.twitter}
					target="_blank"
					rel="noopener noreferrer"
					aria-label="Find me on Twitter"
					className="flex flex-row items-center justify-center rounded-lg border border-slate-200 p-2.5 hover:bg-slate-100 hover:text-slate-900 dark:border-neutral-800 dark:hover:bg-neutral-600 dark:hover:text-white transition-colors duration-200"
				>
					<XSVG className="h-5 w-5 stroke-current" />
					<span className="ml-2">Twitter</span>
				</a>
			)}
		</div>
	);
};
