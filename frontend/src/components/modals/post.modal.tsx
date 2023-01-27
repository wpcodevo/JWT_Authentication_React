import ReactDom from "react-dom";
import React, { FC, CSSProperties } from "react";
import { Container } from "@mui/material";

const OVERLAY_STYLES: CSSProperties = {
  position: "fixed",
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: "rgba(0,0,0,.3)",
  zIndex: 1000,
};

const MODAL_STYLES: CSSProperties = {
  position: "fixed",
  top: "10%",
  left: "50%",
  transform: "translateX(-50%)",
  transition: "all 300ms ease",
  backgroundColor: "white",
  height: "81vh",
  overflowY: "scroll",
  zIndex: 1000,
};

type IPostModal = {
  openPostModal: boolean;
  setOpenPostModal: (openPostModal: boolean) => void;
  children: React.ReactNode;
};

const PostModal: FC<IPostModal> = ({
  openPostModal,
  setOpenPostModal,
  children,
}) => {
  if (!openPostModal) return null;
  return ReactDom.createPortal(
    <>
      <div style={OVERLAY_STYLES} onClick={() => setOpenPostModal(false)} />
      <Container
        maxWidth="sm"
        sx={{ p: "2rem 1rem", borderRadius: 1 }}
        style={MODAL_STYLES}
      >
        {children}
      </Container>
    </>,
    document.getElementById("post-modal") as HTMLElement
  );
};

export default PostModal;
