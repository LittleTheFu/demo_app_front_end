import { useEffect, useState } from "react";
import { getHistory, HistoryResponseData, UserArticleHistory } from "../common/service";

export const HistoryPage: React.FC = () => {
    const [VisitedArticles, setVisitedArticles] = useState<UserArticleHistory[]>([]);

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
                    return <h1 key={index}>{a.title}</h1>
                })
            }
        </div>
    )
};