import { useState } from "react";
import { getHistory, ArticleTitle } from "../common/service";
import { Titles } from "../component/Titles";

export const HistoryPage: React.FC = () => {
  const [titles, setTitles] = useState<ArticleTitle[]>([]);

  return <Titles titles={titles} fetch={getHistory} onFetched={setTitles} />;
};
