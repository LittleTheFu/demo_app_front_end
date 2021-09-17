import { Pagination } from "@material-ui/lab";
import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { ArticleTitle, IPagedArticleTitle, IPageWrapper } from "../common/service";
import { getArticleDetailUrl } from "../common/UrlHelper";
import { TitleCard } from "../component/TitleCard";

interface TitlesProps {
    titles: ArticleTitle[];
    fetch: (
        page: number,
        resolve: (data: IPagedArticleTitle) => void,
        reject?: (code: number, message: string) => void,
    ) => Promise<IPageWrapper<ArticleTitle[]>>;
    onFetched: (fetchedTitles: ArticleTitle[]) => void;
}

export const Titles: React.FC<TitlesProps> = (props: TitlesProps) => {
    const history = useHistory();
    const [pageNum, setPageNum] = useState(0);
    const [pages, setPages] = useState(0);

    const { fetch, onFetched } = props;

    const ArticleClick = (id: number): void => {
        history.push(getArticleDetailUrl(id));
        console.log("card clicked : " + id)
    };

    const Change = (event: React.ChangeEvent<unknown>, page: number): void => {
        console.log('page change : ' + page);

        fetch(page, articles => {
            onFetched(articles.data.content);
            setPageNum(articles.data.pageNum);
            setPages(articles.data.pages);

            console.log('all articles:');
            console.log(articles);
        });
    }

    useEffect(() => {

        fetch(1, (data: IPagedArticleTitle) => {
            onFetched(data.data.content);
            
            setPageNum(data.data.pageNum);
            setPages(data.data.pages);

            console.log('titles useeffect');
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
                props.titles.map((a, index) => {
                    return <TitleCard key={index}
                        id={a.id}
                        title={a.title}
                        author={a.authorName}
                        authorIcon={a.authorIcon}
                        textClick={() => { ArticleClick(a.id) }} />
                })
            }
        </div>
    )
};