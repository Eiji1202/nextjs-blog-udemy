import path from "path";
import fs from "fs";
import matter from "gray-matter";
import { remark } from "remark";
import html from "remark-html";

const postsDirectory = path.join(process.cwd(), "posts"); //postsフォルダのパスを取得

//mdファイルのデータを取り出す
export function getPostsData() {
    const fileNames = fs.readdirSync(postsDirectory); //postsディレクトリの中のファイル名を配列として変数に代入
    const allPostsData = fileNames.map((fileName) => {
        const id = fileName.replace(/\.md$/, ""); //ファイル名から.mdの拡張子を取り除いて変数に代入

        const fullPath = path.join(postsDirectory, fileName); //mdファイルのフルパスを取得

        const fileContents = fs.readFileSync(fullPath, "utf8"); //mdファイルのデータをを文字列として読み取る

        const matterResult = matter(fileContents);

        //idとデータを返す
        return {
            id,
            ...matterResult.data, //title, date, thumbnailのデータが入る
        };
    });
    return allPostsData;
}

//getStaticPath関数で使うパスを取得する
//mdファイル名をidとして返す
export function getAllPostIds() {
    const fileNames = fs.readdirSync(postsDirectory);

    return fileNames.map((fileName) => {
        return {
            params: {
                id: fileName.replace(/\.md$/, ""),
            },
        };
    });
    /*
     * [
     *     {
     *          params: {
     *              id: "pre-rendering-about"
     *          }
     *      },
     *      {
     *          params: {
     *              id: "pre-rendering"
     *          }
     *      },
     *      {
     *          params: {
     *              id: "react-next"
     *          }
     *      },
     *      {
     *          params: {
     *              id: "ssg-ssr"
     *          }
     *      },
     * ]
     */
}

//idに基づいてブログ投稿データを返す
export async function getPostData(id) {
    // id: ファイル名
    const fullPath = path.join(postsDirectory, `${id}.md`); //フルパス取得
    const fileContent = fs.readFileSync(fullPath, "utf8"); //データを読み取る

    const matterResult = matter(fileContent); //解析

    //matterResultの中身をhtmlに変換
    const blogContent = await remark().use(html).process(matterResult.content);

    const blogContentHTML = blogContent.toString();

    return {
        id,
        blogContentHTML,
        ...matterResult.data, //title, date, thumbnail
    };
}
