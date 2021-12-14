import * as React from "react";
import { message } from "antd";
import "antd/dist/antd.css";

import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import "./MsgBox.css";
import axios from "axios";

function BasicCard({ msg, isRev }) {
  if (isRev) {
    return (
      <div className="RevMsg">
        <Card sx={{ bgcolor: "white", maxWidth: "70%" }}>
          <CardContent>
            <Typography
              sx={{ overflowX: "auto" }}
              className="WordBox"
              variant="h7"
              component="div"
            >
              {msg}
            </Typography>
          </CardContent>
        </Card>
      </div>
    );
  }
  return (
    <div className="SedMsg">
      <Card sx={{ bgcolor: "#3CB371", maxWidth: "70%" }}>
        <CardContent>
          <Typography
            sx={{ overflowX: "auto", color: "white" }}
            className="WordBox"
            variant="h7"
            component="div"
          >
            {msg}
          </Typography>
        </CardContent>
      </Card>
    </div>
  );
}

export default function MsgBox({ sID, rID, msgDatas, setMsgDatas, refresh }) {
  // 刷新Message Box
  React.useEffect(() => {
    async function fetchData() {
      try {
        const result = await axios(
          "/conv?sid=" + String(sID) + "&rid=" + String(rID)
        );
        if (result.data !== null) {
          setMsgDatas(result.data);
        }
        // message.success("消息已更新");
        console.log("message refresh succeed");
      } catch (err) {
        message.error("拉取消息失败");
        console.log("message refresh error,", err);
      }
    }
    console.log(
      "refreshing message box,sid=" + String(sID) + "&rid=" + String(rID)
    );
    if (sID !== 0 && rID !== 0) {
      fetchData();
    }
  }, [sID, rID, setMsgDatas, refresh]);
  // 保持滚动条
  const messagesEndRef = React.useRef(null);

  const scrollToBottom = () => {
    console.log(messagesEndRef.current);
    messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
  };

  React.useEffect(scrollToBottom, [msgDatas]);
  return (
    <div className="MsgBox">
      <div ref={messagesEndRef} />
      {msgDatas.map((msgdata) =>
        sID === msgdata.sid ? (
          <BasicCard
            msg={msgdata.msg}
            isRev={false}
            time={msgdata.time}
          ></BasicCard>
        ) : (
          <BasicCard
            msg={msgdata.msg}
            isRev={true}
            time={msgdata.time}
          ></BasicCard>
        )
      )}
    </div>
  );
}
