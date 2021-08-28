import { makeStyles } from "@material-ui/core/styles";
import { useState } from "react";
import { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { ArticleCard } from "../component/ArticleCard";
import { Article, getAllArticles } from "../common/service";
import { getArticleDetailUrl } from "../common/UrlHelper";

const useStyles = makeStyles({
    root: {
        padding: 20
    },
});

export const AllArticle: React.FC = () => {
    const [allArticles, setAllArticles] = useState<Article[]>([]);
    const classes = useStyles();
    const history = useHistory();

    const CardClick = (id: number): void => {
        history.push(getArticleDetailUrl(id));
        console.log("card clicked : " + id)
    };

    useEffect(() => {
        getAllArticles(articles => {
            setAllArticles(articles.data);
            // console.log('all articles:');
            console.log(articles);
            // console.log(allArticles);
        });
    }, []);

    return (
        <div>
            {
                allArticles.map((article: Article, index: number) => {
                    return <ArticleCard
                        shareable={false}
                        textClick={() => { CardClick(article.id) }}
                        key={index}
                        id={article.id}
                        title={article.title}
                        content={article.content}
                        thumb={article.thumb}
                        thumbed={article.thumbState}
                        author={article.author}
                        authorIcon={article.authorIcon}
                        deletable={false}
                        editable={false} />
                })
            }

        </div>
    );
};