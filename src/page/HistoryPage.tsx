import { Pagination } from "@material-ui/lab";
import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { getHistory, ArticleTitle, IArticleTitleResponseData } from "../common/service";
import { getArticleDetailUrl } from "../common/UrlHelper";
import { TitleCard } from "../component/TitleCard";

export const HistoryPage: React.FC = () => {
    const history = useHistory();
    const [VisitedArticles, setVisitedArticles] = useState<ArticleTitle[]>([]);
    const [pageNum, setPageNum] = useState(0);
    const [pages, setPages] = useState(0);

    const ArticleClick = (id: number): void => {
        history.push(getArticleDetailUrl(id));
        console.log("card clicked : " + id)
    };

    const Change = (event: React.ChangeEvent<unknown>, page: number): void => {
        console.log('page change : ' + page);
        getHistory(page, articles => {
            setVisitedArticles(articles.data.content);
            setPageNum(articles.data.pageNum);
            setPages(articles.data.pages);

            console.log('all articles:');
            console.log(articles);
            // console.log(allArticles);
        });
    }

    useEffect(() => {
        getHistory(1, (data: IArticleTitleResponseData) => {

            setVisitedArticles(data.data.content);
            setPageNum(data.data.pageNum);
            setPages(data.data.pages);

            console.log(data);
        })
    }, [])

    return (
        <div>
            <Pagination
                count={pages}
                page={pageNum}
                color="primary"
                onChange={Change} />
            {
                VisitedArticles.map((a, index) => {
                    return <TitleCard key={index}
                        id = {a.id}
                        title = {a.title}
                        author = {a.authorName}
                        authorIcon = {a.authorIcon}
                        textClick={() => { ArticleClick(a.id) }} />
                })
            }
        </div>
    )
};