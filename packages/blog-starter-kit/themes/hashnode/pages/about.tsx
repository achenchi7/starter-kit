import { Container } from '../components/container';
import { Header } from '../components/header';
import { Layout } from '../components/layout';
import { useAppContext } from '../components/contexts/appContext';
import PublicationFooter from '../components/publication-footer';

export default function AboutPage() {
  const { publication } = useAppContext();

  return (
    <Layout>
      <Header isHome={false} />
      <Container>
        <article className="mx-auto max-w-4xl py-16">
          <h1 className="mb-8 text-4xl font-bold">About Me</h1>
          <div className="prose prose-lg dark:prose-invert">
            {publication.about ? (
              <div dangerouslySetInnerHTML={{ __html: publication.about }} />
            ) : (
              <p>Welcome to my blog! I'm passionate about sharing my thoughts and experiences with you.</p>
            )}
          </div>
        </article>
      </Container>
      <PublicationFooter
        authorName={publication.author.name}
        title={publication.title}
        imprint={publication.imprint}
        disableFooterBranding={publication.preferences.disableFooterBranding}
        isTeam={publication.isTeam}
        logo={publication.preferences.logo}
        darkMode={publication.preferences.darkMode}
      />
    </Layout>
  );
} 