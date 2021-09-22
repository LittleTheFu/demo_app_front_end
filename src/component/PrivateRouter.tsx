import { ReactNode } from "react";
import { Redirect, Route } from "react-router-dom";
import { getLoginUrl } from "../common/UrlHelper";

export interface PrivateRouteProps {
    flag: () => boolean;
    children: ReactNode;
    path: string;
}

export const PrivateRoute: React.FC<PrivateRouteProps> = ({ flag, children, ...rest }: PrivateRouteProps): JSX.Element => {
    return (
        <Route
            {...rest}
            render={(): React.ReactNode =>
                flag() ? (
                    children
                ) : (
                    <Redirect
                        to={{
                            pathname: getLoginUrl(),
                        }}
                    />
                )
            }
        />
    );
};