import React from "react";
import "./navbar.css";
import { useAppSelector, useAddDispatch } from "../store";
import { useNavigate } from "react-router";
import { setClearUser } from "../slices/userSlice";
import { setClearDept } from "../slices/deptSlice";
import { setLogin } from "../slices/loginSlice";
import { setClearDataState } from "../slices/dataSlice";
import IconButton from "@mui/material/IconButton";
import LogoutIcon from "@mui/icons-material/Logout";

export const Navber = () => {
  const { user, dept, login } = useAppSelector((state) => state);
  const dispatch = useAddDispatch();
  const navigate = useNavigate();
  const handleReturnToLogin = () => {
    const judge = window.confirm("ログアウトしますか？");
    if (judge) {
      dispatch(setClearUser());
      dispatch(setClearDept());
      dispatch(setClearDataState());
      dispatch(setLogin(false));
      navigate("/");
    }
  };

  return (
    <header className="navbar-header">
      <div className="navbar-left">
        <div className="logo-icon">📈</div>
        <h1 className="navbar-title">
          DEPT <span className="navbar-title-sub">Insight</span>
        </h1>
        <span className="navbar-badge">Live</span>
      </div>

      {login.loginState === true && (
        <div className="navbar-right">
          <div className="user-info-block">
            <div className="user-avatar"></div>
            <div className="user-details">
              <span className="user-label">ログイン者</span>
              <span className="user-name">{(user[0] as any).user_name}</span>
            </div>
          </div>

          <button className="logout-btn" onClick={handleReturnToLogin}>
            <LogoutIcon sx={{ fontSize: 18, color: "red" }} />
            ログアウト
          </button>
        </div>
      )}
    </header>
  );
};
