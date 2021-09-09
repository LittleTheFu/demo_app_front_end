import { makeStyles } from "@material-ui/core/styles";
import { useState } from "react";
import { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { ArticleCard } from "../component/ArticleCard";
import { Article, getAllArticles } from "../common/service";
import { getArticleDetailUrl } from "../common/UrlHelper";
import { TitleCard } from "../component/TitleCard";
import { Pagination } from "@material-ui/lab";

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
            <Pagination count={10} color="primary" />

            {
                allArticles.map((article: Article, index: number) => {
                    return <TitleCard
                        key={index}
                        textClick={() => { CardClick(article.id) }}
                        id={article.id}
                        title={article.title}
                        author={article.author}
                        authorIcon={article.authorIcon} />
                })
            }

        </div>
    );
};