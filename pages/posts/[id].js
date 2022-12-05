import Head from "next/head";
import { Layout, siteTitle } from "../../components/Layout";
import { getAllPostIds, getPostData } from "../../lib/post";
import utilStyles from "../../styles/utils.module.css";

export async function getStaticPaths() {
    const paths = getAllPostIds();

    return {
        paths,
        fallback: false, //設定したページ以外のページを読み込むと404エラーを表示
    };
}

export async function getStaticProps({ params }) {
    const postData = await getPostData(params.id); //id(ファイル名)から投稿データを取得する

    return {
        props: {
            postData,
        },
    };
}

export default function Post({ postData }) {
    return (
        <Layout>
            <Head>
                <title>{postData.title}</title>
            </Head>
            <article>
                <h1 className={utilStyles.headingX1}>{postData.title}</h1>
                <div className={utilStyles.lightText}>{postData.date}</div>
                <div dangerouslySetInnerHTML={{ __html: postData.blogContentHTML }} />
            </article>
        </Layout>
    );
}
