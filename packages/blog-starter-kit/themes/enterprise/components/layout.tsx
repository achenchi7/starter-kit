import { Analytics } from './analytics';
import { Integrations } from './integrations';
import { Meta } from './meta';
import { Scripts } from './scripts';
import { ReactNode } from 'react';
import { Header } from './header';

type Props = {
	children?: ReactNode;
};

export const Layout = ({ children }: Props) => {
	return (
		<>
			<Meta />
			<Scripts />
			<div className="min-h-screen bg-[#f9fbfc]">
				<Header />
				<main className="mt-32">{children}</main>
			</div>
			<Analytics />
			<Integrations />
		</>
	);
};
