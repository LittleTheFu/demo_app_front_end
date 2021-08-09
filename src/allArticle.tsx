import { useState } from "react";
import { useEffect } from "react";
import { Article, getAllArticles } from "./service";

export const AllArticle: React.FC = () => {
    const [allArticles, setAllArticles] = useState<Article[]>([]);


    useEffect(() => {
        getAllArticles(articles => {
            setAllArticles(articles.data);
            // console.log('all articles:');
            // console.log(articles);
            // console.log(allArticles);
        });
    }, []);

    return (
        <div>
            {
                allArticles.map((article: Article, index: number) => {
                    return <div key={index}>
                        {article.title + ' ' + article.content + ' ' + article.author + ' ' + article.thumb}
                    </div>
                })
            }

        </div>
    );
};