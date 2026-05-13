import PropTypes from "prop-types";
import { useEffect } from "react";
import ReactDOM from "react-dom";
import { Box, CloseButton, Overlay } from "./styled";

export function Modal({ isOpen, onClose, title, children }) {
  // Bloqueia o scroll do body enquanto o modal está aberto
  useEffect(() => {
    if (isOpen) document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  // Fecha ao pressionar Escape
  useEffect(() => {
    const handler = (e) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose]);

  if (!isOpen) return null;

  return ReactDOM.createPortal(
    <Overlay onClick={onClose}>
      <Box onClick={(e) => e.stopPropagation()}>
        <CloseButton onClick={onClose}>✕</CloseButton>
        {title && <h2>{title}</h2>}
        {children}
      </Box>
    </Overlay>,
    document.body
  );
}

Modal.defaultProps = {
  title: "",
};

Modal.propTypes = {
  onClose: PropTypes.oneOfType([PropTypes.element, PropTypes.func]).isRequired,
  isOpen: PropTypes.bool.isRequired,
  title: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  children: PropTypes.node.isRequired,
};
