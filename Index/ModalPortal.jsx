import { createPortal } from "react-dom";

export const ModalPortal = ({ children }) => {
  return createPortal(
    children,
    document.getElementById("modal-root")
  );
};
