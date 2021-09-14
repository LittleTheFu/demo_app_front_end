import { useState } from "react";
import { ArticleTitle, getAllTitles } from "../common/service";
import { Titles } from "../component/Titles";

export const AllArticle: React.FC = () => {
    const [titles, setTitles] = useState<ArticleTitle[]>([]);

    return (
        <Titles
            titles={titles}
            fetch={getAllTitles}
            onFetched={setTitles}
        />
    );
};