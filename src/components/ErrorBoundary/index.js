import PropTypes from "prop-types";
import { Component } from "react";

export class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, info) {
    // aqui entra o log/monitoramento (Sentry, etc.)
    console.error("Uncaught error:", error, info);
  }

  render() {
    const { hasError } = this.state;
    const { children } = this.props;

    if (hasError) {
      return (
        <div style={{ textAlign: "center", padding: 40, gap: "10px" }}>
          <p style={{ color: "black", fontSize: "30px" }}>
            Ocorreu um erro inesperado.
          </p>
          <button
            type="button"
            style={{ marginTop: "20px" }}
            onClick={() => window.location.reload()}
          >
            Recarregar página
          </button>
        </div>
      );
    }

    return children;
  }
}

ErrorBoundary.propTypes = {
  children: PropTypes.node.isRequired,
};
