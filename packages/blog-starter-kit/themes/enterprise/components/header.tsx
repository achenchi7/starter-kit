import { useState, useEffect } from 'react';
import { PublicationNavbarItem } from '../generated/graphql';
import { Button } from './button';
import { useAppContext } from './contexts/appContext';
import HamburgerSVG from './icons/svgs/HamburgerSVG';
import { PublicationLogo } from './publication-logo';
import PublicationSidebar from './sidebar';
import Link from 'next/link';
import Image from 'next/image';

function hasUrl(
	navbarItem: PublicationNavbarItem,
): navbarItem is PublicationNavbarItem & { url: string } {
	return !!navbarItem.url && navbarItem.url.length > 0;
}

export const Header = () => {
	const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || '/';
	const [isSidebarVisible, setIsSidebarVisible] = useState<boolean>();
	const [isVisible, setIsVisible] = useState(true);
	const [lastScrollY, setLastScrollY] = useState(0);
	const { publication } = useAppContext();
	const navbarItems = publication.preferences.navbarItems.filter(hasUrl);
	const visibleItems = navbarItems.slice(0, 3);
	const hiddenItems = navbarItems.slice(3);

	const toggleSidebar = () => {
		setIsSidebarVisible((prevVisibility) => !prevVisibility);
	};

	useEffect(() => {
		const controlNavbar = () => {
			if (typeof window !== 'undefined') {
				const currentScrollY = window.scrollY;
				
				if (currentScrollY < lastScrollY || currentScrollY < 10) {
					setIsVisible(true);
				} else {
					setIsVisible(false);
				}

				setLastScrollY(currentScrollY);
			}
		};

		if (typeof window !== 'undefined') {
			window.addEventListener('scroll', controlNavbar);

			return () => {
				window.removeEventListener('scroll', controlNavbar);
			};
		}
	}, [lastScrollY]);

	return (
		<>
			<nav 
				className={`container fixed left-0 right-0 top-0 z-50 mx-auto w-full select-none px-4 py-4 pt-7 transition-all duration-500 sm:pt-7 ${
					isVisible ? 'translate-y-0' : '-translate-y-full'
				}`}
				style={{ opacity: 1, zIndex: 2 }}
			>
				<div className="mx-auto select-none rounded-xl bg-white/10 px-4 py-4 shadow-md sm:px-6 lg:px-8" style={{ background: 'rgb(255, 224, 192)' }}>
					<div className="flex items-center justify-between">
						<div className="flex-shrink-0">
							<Link href="/" rel="canonical">
								<div className="scale-160 relative bottom-4 flex h-[53px] w-[100px] origin-top-left items-center justify-start">
									<Image
										alt="Home Page"
										src={publication.preferences.logo || '/default-logo.png'}
										fill
										sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
										style={{ objectFit: 'contain' }}
										priority
									/>
								</div>
							</Link>
						</div>
						
						<div className="hidden flex-1 justify-center md:flex">
							<ul className="flex items-center space-x-8">
								<li>
									<Link
										href="/"
										className="cursor-pointer font-bold text-gray-800 transition hover:text-gray-700/75"
										rel="canonical"
										aria-label="Home Page"
										style={{ fontFamily: 'Montserrat' }}
									>
										<span>Home Page</span>
									</Link>
								</li>
								<li>
									<Link
										href="/About-me"
										className="cursor-pointer font-bold text-gray-800 transition hover:text-gray-700/75"
										style={{ fontFamily: 'Montserrat' }}
									>
										About me
									</Link>
								</li>
								<li>
									<Link
										href="/Resources"
										className="cursor-pointer font-bold text-gray-800 transition hover:text-gray-700/75"
										style={{ fontFamily: 'Montserrat' }}
									>
										Resources
									</Link>
								</li>
							</ul>
						</div>
						
						<div className="flex items-center">
							<Button
								className="rounded-lg bg-gray-800 px-6 py-2 text-white hover:bg-gray-700"
								label="Follow"
							/>
							<div className="md:hidden">
								<button
									className="ml-2 text-gray-800"
									aria-label="Open Menu"
									onClick={toggleSidebar}
								>
									<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
										<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
									</svg>
								</button>
							</div>
						</div>
					</div>
				</div>
			</nav>
			{isSidebarVisible && (
				<PublicationSidebar navbarItems={navbarItems} toggleSidebar={toggleSidebar} />
			)}
		</>
	);
};
