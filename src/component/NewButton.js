import * as React from "react";
import Button from "@mui/material/Button";

export default function NewButton({ msg, sid, rid, handleSend }) {
  return (
    <Button
      sx={{
        position: "absolute",
        bottom: "3vmin",
        right: "3vmin",
        height: "40px",
        fontFamily: "Microsoft YaHei Light",
        fontSize: "medium",
      }}
      disabled={sid === 0 || rid === 0 || !msg}
      variant="contained"
      onClick={() => handleSend()}
    >
      发送
    </Button>
  );
}
