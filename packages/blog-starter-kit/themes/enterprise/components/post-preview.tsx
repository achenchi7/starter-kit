import { resizeImage } from '@starter-kit/utils/image';
import Link from 'next/link';
import Image from 'next/image';
import { User } from '../generated/graphql';
import { DEFAULT_COVER } from '../utils/const';
import { DateFormatter } from './date-formatter';

type Author = Pick<User, 'name' | 'profilePicture'>;

type Props = {
	title: string;
	coverImage: string | null | undefined;
	date: string;
	excerpt: string;
	author: Author;
	slug: string;
};

export const PostPreview = ({ title, coverImage, date, excerpt, slug }: Props) => {
	const postURL = `/${slug}`;

	return (
		<div className="col-span-1">
			<article className="grid grid-cols-1 gap-5 hover:opacity-90">
				<Link className="dark:hover:text-primary-500 leading-tight tracking-tight" rel="canonical" href={postURL}>
					<div className="col-span-1">
						<div className="relative w-full max-w-screen-lg sm:mx-0">
							<figure className="relative pt-[52.5%] select-none">
								<Image
									alt={title}
									src={resizeImage(coverImage, { w: 1600, h: 840, c: 'thumb' }, DEFAULT_COVER)}
									className="w-full rounded-md border object-cover hover:opacity-90 dark:border-neutral-800 transition-opacity duration-300"
									fill
									sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
									priority
								/>
							</figure>
						</div>
					</div>
					<div className="col-span-1 flex flex-col gap-2">
						<h2 className="text-xl font-bold leading-snug text-slate-800 dark:text-neutral-50 lg:text-3xl">
							{title}
						</h2>
						<p className="text-md leading-snug text-slate-500 dark:text-neutral-400">
							{excerpt}
						</p>
						<div className="text-sm font-semibold text-slate-500 dark:text-neutral-300">
							<time dateTime={date}>
								<DateFormatter dateString={date} />
							</time>
						</div>
					</div>
				</Link>
			</article>
		</div>
	);
};
