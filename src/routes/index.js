/* eslint-disable import/no-extraneous-dependencies */
import React from "react";
import { Switch } from "react-router-dom";

import MyRoute from "./MyRoute";
// import Home from "../pages/Home";
import Login from "../pages/Login";
// import Register from "../pages/Register";

// O switch faz com que somente uma rota seja chamada por vez
// <Route path="/" component={Login} /> faz com que o componente Login seja renderizado na raiz da aplicação (a primeira página a ser vista)
// path="/" verifica se o caminho dentro nas aspas realmente existe nas rotas. O exact detecta qualquer caractere diferente do caminho indicado em path=""
export default function Routes() {
  return (
    <Switch>
      <MyRoute exact path="/login/" component={Login} isClosed={false} />
    </Switch>
  );
}
