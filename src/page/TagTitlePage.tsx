import { useState } from "react";
import { useParams } from "react-router-dom";
import {
  ArticleTitle,
  getTitlesBytag,
  IPagedArticleTitle,
  IPageWrapper,
} from "../common/service";
import { Titles } from "../component/Titles";

export const TagTitlePage: React.FC = () => {
  const { tag } = useParams<{ tag: string }>();
  const [titles, setTitles] = useState<ArticleTitle[]>([]);

  const fetchFunc = (
    page: number,
    resolve: (data: IPagedArticleTitle) => void,
    reject?: (code: number, message: string) => void
  ): Promise<IPageWrapper<ArticleTitle[]>> => {
    return getTitlesBytag(tag, page, resolve, reject);
  };

  return (
    <div>
      <h1>{tag}</h1>
      <Titles titles={titles} fetch={fetchFunc} onFetched={setTitles} />
    </div>
  );
};
