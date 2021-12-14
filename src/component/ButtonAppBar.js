import * as React from "react";
import { message } from "antd";
import "antd/dist/antd.css";

import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Avatar from "@mui/material/Avatar";
import InputBase from "@mui/material/InputBase";
import { styled, alpha } from "@mui/material/styles";
import axios from "axios";

function handleLogin(passport, setUserInfo) {
  // 刷新登录状态
  console.log(String(passport) + " is trying to login in...");
  async function fetchData() {
    try {
      const result = await axios.get("/user?passport=" + String(passport));
      setUserInfo(result.data);
      message.success("登录成功");
      console.log("login succeed");
    } catch (err) {
      message.error("登录失败");
      console.log("login error ", err);
    }
  }
  fetchData();
}

const Search = styled("div")(({ theme }) => ({
  maxWidth: "50%",
  display: "flex",
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(1),
    width: "auto",
  },
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    fontFamily: "Microsoft YaHei Light",
    padding: theme.spacing(1, 1, 1, 2),
    transition: theme.transitions.create("width"),
    flex: 2,
    [theme.breakpoints.up("sm")]: {
      width: "13ch",
      "&:focus": {
        width: "20ch",
      },
    },
  },
}));

export default function ButtonAppBar({
  setUserInfo,
  userInfo,
  toName,
  showBar,
}) {
  // 获取用户输入的登录口令
  const [passport, setPassport] = React.useState("");
  return (
    <Toolbar>
      <IconButton
        size="large"
        edge="start"
        color="inherit"
        aria-label="menu"
        sx={{ mr: 2 }}
        onClick={() => showBar()}
      >
        <MenuIcon />
      </IconButton>
      <Typography
        variant="h6"
        component="div"
        sx={{ flexGrow: 1, fontFamily: "Microsoft YaHei Light" }}
      >
        {toName}
      </Typography>
      {userInfo.uid !== 0 ? (
        <Avatar alt={userInfo.name} src={userInfo.avasrc} />
      ) : (
        <Search>
          <StyledInputBase
            placeholder="请输入登录口令"
            inputProps={{ "aria-label": "login" }}
            onChange={(e) => setPassport(e.target.value)}
          />
          <Button
            sx={{
              fontFamily: "Microsoft YaHei Light",
              color: "inherit",
            }}
            onClick={() => {
              passport
                ? handleLogin(passport, setUserInfo)
                : message.info("空口令是无效的哦");
            }}
          >
            登录
          </Button>
        </Search>
      )}
    </Toolbar>
  );
}
