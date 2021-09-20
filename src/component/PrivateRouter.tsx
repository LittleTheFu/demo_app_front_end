import { ReactNode } from "react";
import { Redirect, Route } from "react-router-dom";
import { getLoginUrl } from "../common/UrlHelper";

export interface PrivateRouteProps {
    children: ReactNode;
    path: string;
}

export const PrivateRoute: React.FC<PrivateRouteProps> = ({ children, ...rest }: PrivateRouteProps): JSX.Element => {
    return (
        <Route
            {...rest}
            render={(): React.ReactNode =>
                false ? (
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