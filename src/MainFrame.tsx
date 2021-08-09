import { Route, Switch, useRouteMatch } from "react-router-dom";
import { AllArticle } from "./allArticle";
import HomeBar from "./HomeBar";

export const MainFrame: React.FC = () => {
    const { path } = useRouteMatch();

    return (
        <div>
            <HomeBar />
            <Switch>
                <Route path={`${path}/articles`}>
                    <AllArticle></AllArticle>
                </Route>
            </Switch>
        </div>
    );
};