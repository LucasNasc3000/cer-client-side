/* eslint-disable import/no-extraneous-dependencies */
import React from "react";
import { Switch } from "react-router-dom";

import Advices from "../pages/Advices";
import { EmployeeRegister } from "../pages/EmployeeRegister";
import { Employees } from "../pages/Employees";
import Home from "../pages/Home";
import Inputs from "../pages/Inputs";
import Login from "../pages/Login";
import Outputs from "../pages/Outputs";
import Profile from "../pages/Perfil";
import Register from "../pages/Register";
import Sales from "../pages/Sales";
import MyRoute from "./MyRoute";

// O switch faz com que somente uma rota seja chamada por vez
// <Route path="/" component={Login} /> faz com que o componente Login seja renderizado na raiz da aplicação (a primeira página a ser vista)
// path="/" verifica se o caminho dentro nas aspas realmente existe nas rotas. O exact detecta qualquer caractere diferente do caminho indicado em path=""
export default function Routes() {
  return (
    <Switch>
      <MyRoute exact path="/login" component={Login} isClosed={false} />
      <MyRoute exact path="/" component={Register} isClosed={false} />
      <MyRoute exact path="/home" component={Home} isClosed />
      <MyRoute exact path="/inputs" component={Inputs} isClosed />
      <MyRoute exact path="/sales" component={Sales} isClosed />
      <MyRoute exact path="/outputs" component={Outputs} isClosed />
      <MyRoute exact path="/profile" component={Profile} isClosed />
      <MyRoute exact path="/employees" component={Employees} isClosed />
      <MyRoute exact path="/advices" component={Advices} isClosed />
      <MyRoute
        exact
        path="/employee/new"
        component={EmployeeRegister}
        isClosed
      />
    </Switch>
  );
}
