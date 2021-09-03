import { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { ArticleTitle, getTitlesBytag } from "../common/service";
import { getArticleDetailUrl } from "../common/UrlHelper";
import { TitleCard } from "../component/TitleCard";

export const TagTitlePage: React.FC = () => {
    const { tag } = useParams<{ tag: string }>();
    const [Titles, setTitles] = useState<ArticleTitle[]>([]);

    const history = useHistory();

    const ArticleClick = (id: number): void => {
        history.push(getArticleDetailUrl(id));
        console.log("card clicked : " + id)
    };

    useEffect(() => {
        getTitlesBytag(tag, (data) => {
            setTitles(data.data);
            console.log(data)
        });
    }, [tag]);


    return (
        <div>
            <h1>{tag}</h1>
            {
                Titles.map((t, index) => {
                    return <TitleCard key={index}
                        id={t.id}
                        title={t.title}
                        author={t.authorName}
                        authorIcon={t.authorIcon}
                        textClick={() => { ArticleClick(t.id) }} />
                })
            }
        </div>

    )
};