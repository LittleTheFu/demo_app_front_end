import { Route, Switch, useRouteMatch } from "react-router-dom";
import { AllArticle } from "./AllArticlePage";
import { ArticleDetail } from "./ArticleDetail";
import HomeBar from "./HomeBar";
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
                <Route path={`${path}/user/:id`}>
                    <UserDetailPage></UserDetailPage>
                </Route>
                <Route path={`${path}/profile`}>
                    <ProfilePage></ProfilePage>
                </Route>
            </Switch>
        </div>
    );
};