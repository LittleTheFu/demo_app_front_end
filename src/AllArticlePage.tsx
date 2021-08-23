import { makeStyles } from "@material-ui/core/styles";
import { useState } from "react";
import { useEffect } from "react";
import { useHistory } from "react-router-dom";
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
    const history = useHistory();

    const CardClick = (id: number): void => {
        history.push("/main/article/" + id);
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
                        textClick={()=>{CardClick(article.id)}}
                        key={index}
                        id={article.id}
                        title={article.title}
                        content={article.content}
                        thumb={article.thumb}
                        thumbed={article.thumbState}
                        author={article.author} 
                        authorIcon={article.authorIcon}
                        deletable={false} />
                })
            }

        </div>
    );
};