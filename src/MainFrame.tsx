import { Route, Switch, useRouteMatch } from "react-router-dom";
import HomeBar from "./component/HomeBar";
import { AllArticle } from "./page/AllArticlePage";
import { ArticleDetail } from "./page/ArticleDetailPage";
import { FriendPage } from "./page/FriendPage";
import { HistoryPage } from "./page/HistoryPage";
import { MailPage } from "./page/MailPage";
import { NewArticlePage } from "./page/NewArticlePage";
import { NewMailPage } from "./page/NewMailPage";
import { ProfilePage } from "./page/ProfilePage";
import { UserDetailPage } from "./page/UserDetailPage";

export const MainFrame: React.FC = () => {
    const { path } = useRouteMatch();

    return (
        <div>
            <HomeBar />
            <Switch>
                <Route path={`${path}/articles`}>
                    <AllArticle></AllArticle>
                </Route>
                <Route path={`${path}/article/:id`}>
                    <ArticleDetail></ArticleDetail>
                </Route>
                <Route path={`${path}/new_article/`}>
                    <NewArticlePage></NewArticlePage>
                </Route>
                <Route path={`${path}/user/:id`}>
                    <UserDetailPage></UserDetailPage>
                </Route>
                <Route path={`${path}/profile`}>
                    <ProfilePage></ProfilePage>
                </Route>
                <Route path={`${path}/mail`}>
                    <MailPage></MailPage>
                </Route>
                <Route path={`${path}/new_mail`}>
                    <NewMailPage></NewMailPage>
                </Route>
                <Route path={`${path}/friend`}>
                    <FriendPage></FriendPage>
                </Route>
                <Route path={`${path}/history`}>
                    <HistoryPage></HistoryPage>
                </Route>
            </Switch>
        </div>
    );
};