import { Route, Switch, useRouteMatch } from "react-router-dom";
import { AllArticle } from "./AllArticlePage";
import { ArticleDetail } from "./ArticleDetail";
import { FriendPage } from "./friendPage";
import { HistoryPage } from "./HistoryPage";
import HomeBar from "./HomeBar";
import { MailPage } from "./mailPage";
import { NewArticlePage } from "./NewArticlePage";
import { NewMailPage } from "./NewMailPage";
import { ProfilePage } from "./ProfilePage";
import { UserDetailPage } from "./UserDetailPage";

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