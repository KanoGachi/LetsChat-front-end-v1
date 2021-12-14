import * as React from "react";
import "./TypeBox.css";
import InputBox from "./InputBox";
import NewButton from "./NewButton";
import { message } from "antd";
import axios from "axios";

export default function TypeBox({ userInfo, toID, refresh }) {
  const [msg, setMsg] = React.useState("");
  function handleSend() {
    async function sendData() {
      try {
        const curMsg = {
          sid: userInfo.uid,
          rid: toID,
          msg: msg,
        };
        const result = await axios.post("/conv", curMsg);
        setMsg("");
        refresh(); // 发送成功后更新消息页面
        message.success("发送成功");
        console.log("send succeed", result);
      } catch (err) {
        message.error("发送失败");
        console.log("send error ", err);
      }
    }
    console.log(userInfo.uid, " is trying to send msg to ", toID);
    sendData();
  }
  return (
    <div className="TypeBox">
      <InputBox msg={msg} setMsg={setMsg} handleSend={handleSend}></InputBox>
      <NewButton
        msg={msg}
        sid={userInfo.uid}
        rid={toID}
        handleSend={handleSend}
      ></NewButton>
    </div>
  );
}
