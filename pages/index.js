import Head from "next/head";
import Link from "next/link";
import styles from "../styles/Home.module.css";

import { Layout, siteTitle } from "../components/Layout";
import utilStyles from "../styles/utils.module.css";
import { getPostsData } from "../lib/post";

//SSGの場合
export async function getStaticProps() {
    const allPostsData = getPostsData(); //id, title, date, thumbnail
    console.log(allPostsData);

    return {
        props: {
            allPostsData, //分割代入してpropsに渡す
        },
    };
}

export default function Home({ allPostsData }) {
    return (
        <Layout home>
            <Head>
                <title>{siteTitle}</title>
            </Head>
            <section className={utilStyles.headingMd}>
                <p>私は12月からエンジニアになりました。</p>
            </section>

            <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
                <h2>📝エンジニアのブログ</h2>
                <div className={styles.grid}>
                    {allPostsData.map(({ id, title, date, thumbnail }) => (
                        <article key={id}>
                            <Link href={`/posts/${id}`}>
                                <img src={`${thumbnail}`} className={styles.thumbnailImage} />
                            </Link>
                            <Link href={`/posts/${id}`} className={utilStyles.boldText}>
                                {title}
                            </Link>
                            <br />
                            <small className={utilStyles.lightText}>{date}</small>
                        </article>
                    ))}
                </div>
            </section>
        </Layout>
    );
}
