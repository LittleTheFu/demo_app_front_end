import { makeStyles } from "@material-ui/core/styles";
import { useState } from "react";
import { useEffect } from "react";
import { ArticleCard } from "./ArticleCard";
import { Article, getAllArticles } from "./service";

const useStyles = makeStyles({
    root: {
        padding: 20
    },
});


export const AllArticle: React.FC = () => {
    const [allArticles, setAllArticles] = useState<Article[]>([]);
    const classes = useStyles();


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
                    return <ArticleCard key={index} title={article.title} content={article.content}
                        thumb={article.thumb} author={article.author}></ArticleCard>
                })
            }

        </div>
    );
};