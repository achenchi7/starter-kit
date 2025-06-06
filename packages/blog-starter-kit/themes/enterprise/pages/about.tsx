import { Container } from '../components/container';
import { Header } from '../components/header';
import { Layout } from '../components/layout';
import { useAppContext } from '../components/contexts/appContext';
import { Footer } from '../components/footer';

export default function AboutPage() {
  const { publication } = useAppContext();

  return (
    <Layout>
      <Header />
      <Container>
        <article className="mx-auto max-w-4xl py-16">
          <h1 className="mb-8 text-4xl font-bold">About Me</h1>
          <div className="prose prose-lg dark:prose-invert">
            <p>Welcome to my blog! I'm passionate about sharing my thoughts and experiences with you.</p>
          </div>
        </article>
      </Container>
      <Footer />
    </Layout>
  );
} 