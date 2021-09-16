import { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { ArticleTitle, getTitlesBytag, IPagedArticleTitle } from "../common/service";
import { getArticleDetailUrl } from "../common/UrlHelper";
import { TitleCard } from "../component/TitleCard";
import { Titles } from "../component/Titles";

export const TagTitlePage: React.FC = () => {
    const { tag } = useParams<{ tag: string }>();
    const [titles, setTitles] = useState<ArticleTitle[]>([]);

    const fetchFunc = (
        page: number,
        resolve: (data: IPagedArticleTitle) => void,
        reject?: (data: Error) => void,
    ): Promise<IPagedArticleTitle> => {
        return getTitlesBytag(tag, page, resolve, reject);
    }

    return (
        <div>
            <h1>{tag}</h1>
            <Titles
            titles={titles}
            fetch={fetchFunc}
            onFetched={setTitles}
        />
        </div>

    )
};