import { useNavigate } from "react-router";
import { useState, useEffect } from "react";
import { useAppSelector, useAddDispatch, store } from "../store";
import { setUser } from "../slices/userSlice";
import { setLogin } from "../slices/loginSlice";
import type { USER } from "../type";
import axios from "axios";
import { Navber } from "./Navber";
import "./login.css";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useAddDispatch();
  const user = useAppSelector((state) => state.user);
  const [currentUser, setCurrentUser] = useState("");
  const [currentPassword, setCurrentPassWord] = useState("");

  useEffect(() => {
    axios.get<USER[]>(`${import.meta.env.VITE_API_URL}/users`).then((res) => {
      dispatch(setUser(res.data));
      console.log(res.data);
      console.log(user);
      console.log(import.meta.env.VITE_APT_URL);
    });
  }, []);

  const handleNavigateSignUp = () => {
    navigate("/signup");
  };
  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setCurrentUser(newValue);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setCurrentPassWord(newValue);
  };

  const handleLogin = () => {
    const dataBaseUser = user.find(
      (obj) => (obj as any).user_name === String(currentUser),
    );
    console.log("databaseUser", dataBaseUser);
    if (dataBaseUser === undefined)
      return alert("存在しないユーザーです。サインアップしてください");
    axios
      .post(`${import.meta.env.VITE_API_URL}/userlogin`, {
        user_id: (dataBaseUser as any).user_id,
        username: currentUser,
        password: currentPassword,
      })
      .then((res) => {
        if (res.status === 200) {
          console.log(res.data);
          navigate("/main");
          dispatch(setUser(res.data));
          dispatch(setLogin(true));
        } else {
          console.log(res);
          alert(res.data["data"]);
        }
      })
      .catch(console.error);
  };
  const handleSubmit = (e: React.SubmitEvent) => {
    e.preventDefault();
    handleLogin();
  };

  const get = store.getState();
  console.log(get);
  return (
    <div>
      <Navber />
      <div className="login-contena">
        <div className="login-card">
          <div className="login-header">
            <div className="login-logo">📈</div>
            <h2 className="login-title">DEPT Insight</h2>
            <p className="login-subtitle">アカウントにログインしてください</p>
          </div>

          <form onSubmit={handleSubmit} className="login-form">
            <div className="input-group">
              <label className="input-label">ユーザーネーム</label>
              <input
                type="text"
                placeholder="ユーザー名を入力"
                onChange={handleNameChange}
                className="form-input"
                required
              />
            </div>

            <div className="input-group">
              <label className="input-label">パスワード</label>
              <input
                type="password"
                placeholder="••••••••"
                onChange={handlePasswordChange}
                className="form-input"
                required
              />
            </div>

            <button type="submit" className="btn-main">
              ログイン
            </button>
          </form>

          <div className="login-footer">
            <span className="footer-text">
              アカウントをお持ちでないですか？
            </span>
            <button onClick={handleNavigateSignUp} className="btn-sub">
              新規登録（サインアップ）
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Login;
