/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable import/no-extraneous-dependencies */
import { Switch } from "react-router-dom";

import { EmployeeRegister } from "../pages/EmployeeRegister";
import { Employees } from "../pages/Employees";
import Home from "../pages/Home";
import Inputs from "../pages/Inputs";
import InputsCurrent from "../pages/InputsCurrent";
import Login from "../pages/Login";
import Outputs from "../pages/Outputs";
import Profile from "../pages/Perfil";
import Products from "../pages/Products";
import Sales from "../pages/Sales";
import MyRoute from "./MyRoute";

export default function Routes() {
  return (
    <Switch>
      <MyRoute exact path="/" component={Login} isClosed={false} />
      <MyRoute
        exact
        path="/home"
        component={Home}
        isClosed
        resource="EMPLOYEES"
      />
      <MyRoute
        exact
        path="/inputs"
        component={Inputs}
        isClosed
        resource="SUPPLIES"
      />
      <MyRoute
        exact
        path="/inputsCurrent"
        component={InputsCurrent}
        isClosed
        resource="SUPPLIES"
      />
      <MyRoute
        exact
        path="/sales"
        component={Sales}
        isClosed
        resource="SALES"
      />
      <MyRoute
        exact
        path="/outputs"
        component={Outputs}
        isClosed
        resource="OUTFLOWS"
      />
      <MyRoute
        exact
        path="/products"
        component={Products}
        isClosed
        resource="PRODUCTS"
      />
      <MyRoute exact path="/profile" component={Profile} isClosed />
      <MyRoute
        exact
        path="/employees"
        component={Employees}
        isClosed
        resource="EMPLOYEES"
      />
      <MyRoute
        exact
        path="/newEmployee"
        component={EmployeeRegister}
        isClosed
        resource="EMPLOYEES"
      />
    </Switch>
  );
}
