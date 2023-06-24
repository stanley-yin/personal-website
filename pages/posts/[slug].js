import ReactMarkdown from "react-markdown";
import { getAllPublished, getSinglePost } from "../../lib/notion";
import Layout from "../../components/Layout";
import Link from "next/link";

export default function Post({ post }) {
  let menuData = [];

  let h2Count = 0;
  const contents = post.markdown.map((item, index) => {
    const { type, parent } = item;
    if (type === "heading_2") {
      h2Count += 1;
      const content = parent.replace("## ", "");
      const id = "h2_" + h2Count;
      menuData.push({
        content: content,
        id: id,
      });
      return (
        <h2 id={id} className="scroll-element">
          {content}
        </h2>
      );
    } else {
      return <ReactMarkdown>{parent}</ReactMarkdown>;
    }
  });
  const menuContent = menuData.map((item, index) => {
    return (
      <li key={index} className="mb-1">
        <Link href={`#${item.id}`} scroll={false} replace>
          {item.content}
        </Link>
      </li>
    );
  });
  return (
    <Layout>
      <div className="py-12">
        <div className="text-center">
          <h1 className="text-4xl font-black mb-2">{post.metadata.title}</h1>
          <span>{post.metadata.date}</span>
          <div className="border my-8" />
        </div>
        <div className="lg:flex gap-x-24">
          <div className="mb-10">
            <div className="sticky top-28">
              <p className="text-2xl font-bold">目錄</p>
              <ul className="pt-2">{menuContent}</ul>
            </div>
          </div>
          <div className="scroll-body order-first prose max-w-3xl">
            {contents}
          </div>
        </div>
      </div>
    </Layout>
  );
}

export const getStaticProps = async ({ params }) => {
  const post = await getSinglePost(params.slug);

  return {
    props: {
      post,
    },
    revalidate: 60,
  };
};

export const getStaticPaths = async () => {
  const posts = await getAllPublished();
  const paths = posts.map(({ slug }) => ({ params: { slug } }));

  return {
    paths,
    fallback: "blocking",
  };
};
