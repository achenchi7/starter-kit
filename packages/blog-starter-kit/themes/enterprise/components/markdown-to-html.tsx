import { useEmbeds } from '@starter-kit/utils/renderer/hooks/useEmbeds';

interface MarkdownToHtmlProps {
	content: string;
}

export const MarkdownToHtml = ({ content }: MarkdownToHtmlProps) => {
	const html = useEmbeds({ enabled: true });

	return (
		<div
			className="prose prose-lg max-w-none dark:prose-invert"
			dangerouslySetInnerHTML={{ __html: content }}
		/>
	);
};
