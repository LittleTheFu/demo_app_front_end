import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { getHistory, HistoryResponseData, UserArticleHistory } from "../common/service";
import { getArticleDetailUrl } from "../common/UrlHelper";

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
                    return <h1 key={index} onClick={()=>{ArticleClick(a.id)}}>{a.title}</h1>
                })
            }
        </div>
    )
};