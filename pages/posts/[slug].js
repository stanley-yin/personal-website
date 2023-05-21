import ReactMarkdown from "react-markdown";
import { getAllPublished, getSinglePost } from "../../lib/notion";
import Layout from "../../components/layout";
import Link from "next/link";

export default function Post({ post }) {
  let menuData = [];

  const contents = post.markdown.map((item, index) => {
    const { type, parent } = item;
    if (type === "heading_2") {
      const content = parent.replace("## ", "");
      const id = "h2_" + index;
      menuData.push({
        content: content,
        id: id,
      });
      return <h2 id={id}>{content}</h2>;
    } else {
      return <ReactMarkdown>{parent}</ReactMarkdown>;
    }
  });
  const menuContent = menuData.map((item, index) => {
    return (
      <li key={index}>
        <Link href={`#${item.id}`} scroll={false}>
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
        <div className="flex gap-x-24">
          <div className="prose">{contents}</div>
          <div>
            <p className="text-xl font-bold">目錄</p>
            <ul>{menuContent}</ul>
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
