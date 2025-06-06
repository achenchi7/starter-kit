import { ButtonHTMLAttributes } from 'react';
import { twJoin } from 'tailwind-merge';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
	variant?: 'primary' | 'outline';
	label: string;
	icon?: React.ReactNode;
}

export const Button = ({ variant = 'primary', label, icon, className = '', ...props }: ButtonProps) => {
	const baseStyles = 'inline-flex items-center justify-center font-medium transition-colors duration-200';
	const styles = {
		primary: 'bg-[#f87317] text-white hover:bg-[#f87317]/90 rounded-md px-4 py-2',
		outline:
			'border border-gray-300 bg-transparent hover:bg-gray-100 dark:border-gray-700 dark:hover:bg-gray-800',
	};

	return (
		<button className={twJoin(baseStyles, styles[variant], className)} {...props}>
			{icon}
			{label && <span className={icon ? 'ml-2' : ''}>{label}</span>}
		</button>
	);
};
