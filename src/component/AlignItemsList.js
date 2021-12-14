import * as React from "react";
import { message } from "antd";
import "antd/dist/antd.css";

import axios from "axios";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Divider from "@mui/material/Divider";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";

export default function AlignItemsList({
  userInfo,
  setToID,
  setToName,
  friends,
  setFriends,
}) {
  // 刷新好友列表
  React.useEffect(() => {
    async function fetchData() {
      try {
        const result = await axios.get("/friends?uid=" + String(userInfo.uid));
        console.log(result);
        if (result.data !== null) {
          setFriends(result.data);
        }
        message.success("好友列表已更新");
        console.log("friend box refresh succeed");
      } catch (err) {
        message.error("好友列表更新失败");
        console.log("friend box refresh failed,");
      }
    }
    if (userInfo.uid !== 0) {
      console.log("refreshing friend box,uid=" + String(userInfo.uid));
      fetchData();
    }
  }, [userInfo, setFriends]);
  const rows = [<Divider key={0} variant="inset" component="li" />];
  friends.forEach((user) => {
    rows.push(
      <IconButton
        color="inherit"
        sx={{
          height: "min-content",
          width: "100%",
          borderRadius: 0,
        }}
        key={rows.length}
        onClick={() => {
          setToID(user.uid);
          setToName(user.name);
        }}
      >
        <ListItem>
          <Avatar
            sx={{ borderRadius: 1, height: "8vmin", width: "8vmin" }}
            alt={user.name}
            src={user.avasrc}
          />
          <Typography
            component="div"
            sx={{
              fontFamily: "Microsoft YaHei Light",
              fontSize: "large",
              paddingLeft: "3vmin",
            }}
          >
            {user.name}
          </Typography>
        </ListItem>
      </IconButton>
    );
    rows.push(<Divider key={rows.length} variant="inset" component="li" />);
  });
  return (
    <List
      sx={{
        width: "100%",
        bgcolor: "background.paper",
      }}
    >
      {rows}
    </List>
  );
}
