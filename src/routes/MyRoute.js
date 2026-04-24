/* eslint-disable import/no-extraneous-dependencies */
import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import { Redirect, Route } from "react-router-dom";

export default function MyRoute({
  component: Component,
  isClosed,
  resource,
  ...rest
}) {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const permissions = useSelector((state) => state.auth.permissions);
  const isPermissionsLoaded = useSelector(
    (state) => state.auth.isPermissionsLoaded
  );

  if (isClosed && !isLoggedIn) {
    return (
      <Redirect
        to={{ pathname: "/", state: { prevPath: rest.location.pathname } }}
      />
    );
  }

  if (isLoggedIn && resource && !isPermissionsLoaded) return null;

  if (resource) {
    const doesEmployeeHavePermission = permissions.some(
      (p) => p.resource === resource
    );

    if (!doesEmployeeHavePermission) {
      return (
        <Redirect
          to={{ pathname: "/", state: { prevPath: rest.location.pathname } }}
        />
      );
    }
  }

  // eslint-disable-next-line react/jsx-props-no-spreading
  return <Route {...rest} component={Component} />;
}

MyRoute.defaultProps = {
  isClosed: false,
  resource: null,
};

MyRoute.propTypes = {
  component: PropTypes.oneOfType([PropTypes.element, PropTypes.func])
    .isRequired,
  isClosed: PropTypes.bool,
  resource: PropTypes.string,
};
