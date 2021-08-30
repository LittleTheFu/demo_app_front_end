import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { getHistory, HistoryResponseData, UserArticleHistory } from "../common/service";
import { getArticleDetailUrl } from "../common/UrlHelper";
import { TitleCard } from "../component/TitleCard";

export const HistoryPage: React.FC = () => {
    const history = useHistory();
    const [VisitedArticles, setVisitedArticles] = useState<UserArticleHistory[]>([]);

    const ArticleClick = (id: number): void => {
        history.push(getArticleDetailUrl(id));
        console.log("card clicked : " + id)
    };

    useEffect(() => {
        getHistory((data: HistoryResponseData) => {
            setVisitedArticles(data.data);
            console.log(data);
        })
    }, [])

    return (
        <div>
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