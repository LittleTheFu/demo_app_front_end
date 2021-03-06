import { Route, Switch, useRouteMatch } from "react-router-dom";
import HomeBar from "./component/HomeBar";
import { TemporaryDrawer } from "./component/NavDrawer";
import { AllArticle } from "./page/AllArticlePage";
import { ArticleDetail } from "./page/ArticleDetailPage";
import { FavoritePage } from "./page/FavoritePage";
import { FriendPage } from "./page/FriendPage";
import { HistoryPage } from "./page/HistoryPage";
import { MailPage } from "./page/MailPage";
import { NewArticlePage } from "./page/NewArticlePage";
import { NewMailPage } from "./page/NewMailPage";
import { ProfilePage } from "./page/ProfilePage";
import { TagTitlePage } from "./page/TagTitlePage";
import { UserDetailPage } from "./page/UserDetailPage";

export const MainFrame: React.FC = () => {
  const { path } = useRouteMatch();

  return (
    <div>
      <TemporaryDrawer />
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
        <Route path={`${path}/favorite`}>
          <FavoritePage></FavoritePage>
        </Route>
        <Route path={`${path}/tag_titles/:tag`}>
          <TagTitlePage></TagTitlePage>
        </Route>
      </Switch>
    </div>
  );
};
