import React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";

const style = {
  position: "absolute",
  top: "40%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "#121313",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const EndModal = (props) => {
  const [open, setOpen] = React.useState(props.open);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div>
      <Modal
        open={props.open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          {props.win ? (
            <Typography id="modal-modal-title" variant="h6" component="h2">
              You Win!
            </Typography>
          ) : (
            <Typography id="modal-modal-title" variant="h6" component="h2">
              You Lose!
            </Typography>
          )}
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            {props.hiddenWord}
          </Typography>
        </Box>
      </Modal>
    </div>
  );
};

export default EndModal;
