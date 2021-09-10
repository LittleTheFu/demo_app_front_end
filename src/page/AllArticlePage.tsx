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
    const [pageNum, setPageNum] = useState(0);
    const [pages, setPages] = useState(0);

    const classes = useStyles();
    const history = useHistory();

    const CardClick = (id: number): void => {
        history.push(getArticleDetailUrl(id));
        console.log("card clicked : " + id)
    };

    const Change = (event: React.ChangeEvent<unknown>, page: number): void => {
        console.log('page change : ' + page);
        getAllArticles(page, articles => {
            setAllArticles(articles.data.content);
            setPageNum(articles.data.pageNum);
            setPages(articles.data.pages);

            console.log('all articles:');
            console.log(articles);
            // console.log(allArticles);
        });
    }

    useEffect(() => {
        getAllArticles(1, articles => {
            setAllArticles(articles.data.content);
            setPageNum(articles.data.pageNum);
            setPages(articles.data.pages);

            console.log('all articles:');
            console.log(articles);
            // console.log(allArticles);
        });
    }, []);

    return (
        <div>
            <Pagination
                count={pages}
                page={pageNum}
                color="primary"
                onChange={Change} />

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