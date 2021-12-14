import React from "react";
import "./InputBox.css";

export default function InputBox({ msg, setMsg, handleSend }) {
  const handleChange = (e) => {
    const value = e.target.value;
    setMsg(value);
  };
  const onKeyup = (e) => {
    if (e.keyCode === 13) {
      handleSend();
    }
  };
  return (
    <div style={{ height: "95%", display: "flex", backgroundColor: "white" }}>
      <textarea
        className="Input typebox"
        placeholder="来聊天吧~"
        value={msg}
        onChange={handleChange}
        onKeyUp={onKeyup}
      ></textarea>
    </div>
  );
}
