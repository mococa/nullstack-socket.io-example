import Nullstack, { NullstackClientContext, NullstackNode } from "nullstack";
import Logo from "nullstack/logo";
import Messager from "./Messager";
import "./Home.css";

interface HomeProps {
  greeting: string;
}

interface HomeLinkProps {
  href: string;
}

declare function Link(context: HomeLinkProps): NullstackNode;

class Home extends Nullstack<HomeProps> {
  prepare({ project, page, greeting }: NullstackClientContext<HomeProps>) {
    page.title = `${project.name} - ${greeting}`;
    page.description = `${project.name} was made with Nullstack`;
  }

  renderLink({
    children,
    href,
  }: NullstackClientContext<HomeProps & HomeLinkProps>) {
    const link = href + "?ref=create-nullstack-app";
    return (
      <a href={link} target="_blank" rel="noopener noreferrer">
        {children}
      </a>
    );
  }

  render({ project, greeting }: NullstackClientContext<HomeProps>) {
    return (
      <section>
        <article>
          <Link href="https://nullstack.app/">
            <Logo height={60} light />
          </Link>

          <h1> Mococa Ns chat template </h1>
          <p> {greeting} </p>

          <Messager />
        </article>
        <aside>
          <Link href="https://nullstack.app/waifu">
            <img
              src="/nulla-chan.webp"
              alt="Nulla-Chan: Nullstack's official waifu"
            />
          </Link>
        </aside>
      </section>
    );
  }
}

export default Home;
