/* eslint-disable import/no-extraneous-dependencies */
import React from "react";
import { Switch } from "react-router-dom";

import MyRoute from "./MyRoute";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Inputs from "../pages/Inputs";
import Sales from "../pages/Sales";

// O switch faz com que somente uma rota seja chamada por vez
// <Route path="/" component={Login} /> faz com que o componente Login seja renderizado na raiz da aplicação (a primeira página a ser vista)
// path="/" verifica se o caminho dentro nas aspas realmente existe nas rotas. O exact detecta qualquer caractere diferente do caminho indicado em path=""
export default function Routes() {
  return (
    <Switch>
      <MyRoute exact path="/" component={Login} isClosed={false} />
      <MyRoute exact path="/register" component={Register} isClosed={false} />
      <MyRoute exact path="/home" component={Home} isClosed />
      <MyRoute exact path="/inputs" component={Inputs} isClosed />
      <MyRoute exact path="/sales" component={Sales} isClosed />
    </Switch>
  );
}
