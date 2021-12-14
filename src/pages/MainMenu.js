import "../App.css";
import ButtonAppBar from "../component/ButtonAppBar.js";
import AlignItemsList from "../component/AlignItemsList.js";
import MsgBox from "../component/MsgBox";
import TypeBox from "../component/TypeBox";
import * as React from "react";

function IsPhone() {
  var userAgentInfo = navigator.userAgent;
  var Agents = [
    "Android",
    "iPhone",
    "SymbianOS",
    "Windows Phone",
    "iPad",
    "iPod",
  ];
  var flag = false;
  for (var v = 0; v < Agents.length; v++) {
    if (userAgentInfo.indexOf(Agents[v]) >= 0) {
      flag = true;
      break;
    }
  }
  return flag;
}

function MainMenu() {
  // 是否为手机端访问
  const isphone = IsPhone();
  // 侧边栏控制（true：打开，false：关闭）
  const [showSideBar, setShowSideBar] = React.useState(0);
  // 当前用户信息{uid,name,avasrc}
  const [userInfo, setUserInfo] = React.useState({
    uid: 0,
    name: "undefined",
    avasrc: "",
  });
  // 好友列表[]{uid,name,avasrc}
  const [friends, setFriends] = React.useState([]);
  // 对话框用户信息（uid,name）
  const [toID, setToID] = React.useState(0);
  const [toName, setToName] = React.useState("");
  // 聊天窗消息记录
  const [msgDatas, setMsgDatas] = React.useState([]);
  // 用于主动刷新的状态和函数
  const [refresh, setRefresh] = React.useState(true);
  function triggerRefresh() {
    refresh ? setRefresh(false) : setRefresh(true);
  }
  // 轮询刷新（5s一次）
  React.useEffect(() => {
    const id = setInterval(() => triggerRefresh(), 5000);
    return () => clearInterval(id);
  });
  // Cookie读取

  // 页面返回
  return (
    <div className="App">
      <div className="App-topbar">
        <ButtonAppBar
          setUserInfo={setUserInfo}
          userInfo={userInfo}
          toName={toName}
          showBar={() => {
            showSideBar === 1 ? setShowSideBar(0) : setShowSideBar(1);
          }}
        ></ButtonAppBar>
      </div>

      <div className="App-board">
        <div className={showSideBar ? "App-sideBar" : "App-hiddenSideBar"}>
          <AlignItemsList
            userInfo={userInfo}
            setToID={setToID}
            setToName={setToName}
            friends={friends}
            setFriends={setFriends}
          ></AlignItemsList>
        </div>

        <div
          className={showSideBar&&isphone?"App-hiddenChat":"App-chat"}
        >
          <MsgBox
            sID={userInfo.uid}
            rID={toID}
            msgDatas={msgDatas}
            setMsgDatas={setMsgDatas}
            refresh={refresh}
          ></MsgBox>

          <TypeBox
            userInfo={userInfo}
            toID={toID}
            refresh={() => triggerRefresh()}
          ></TypeBox>
        </div>
      </div>
    </div>
  );
}

export default MainMenu;
