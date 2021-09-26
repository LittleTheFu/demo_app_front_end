import { ReactNode } from "react";
import { Redirect, Route } from "react-router-dom";
import { getLoginUrl } from "../common/UrlHelper";

export interface PrivateRouteProps {
  flagFunc: () => boolean;
  children: ReactNode;
  path: string;
}

export const PrivateRoute: React.FC<PrivateRouteProps> = ({
  flagFunc,
  children,
  ...rest
}: PrivateRouteProps): JSX.Element => {
  return (
    <Route
      {...rest}
      render={(): React.ReactNode =>
        flagFunc() ? (
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
