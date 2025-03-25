import React from "react";
import { MainContainer } from "./styled";

export default function Footer() {
  return (
    <MainContainer>
      <h2 className="text">Desenvolvido por Lucas Nascimento Fortunato</h2>
      <a href="mailto:lucasnascdev@gmail.com" className="link">
        lucasnascdev@gmail.com
      </a>
      <a
        href="www.linkedin.com/in/lucas-nascimento-fortunato-b63162297"
        className="link"
      >
        LinkedIn
      </a>
    </MainContainer>
  );
}
