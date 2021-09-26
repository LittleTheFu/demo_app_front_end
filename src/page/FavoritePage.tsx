import { useState } from "react";
import { ArticleTitle, getBookmarkArticles } from "../common/service";
import { Titles } from "../component/Titles";

export const FavoritePage: React.FC = () => {
  const [titles, setTitles] = useState<ArticleTitle[]>([]);

  return (
    <Titles titles={titles} fetch={getBookmarkArticles} onFetched={setTitles} />
  );
};
