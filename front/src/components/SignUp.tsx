import { useNavigate } from "react-router";
import { useState } from "react";
import axios from "axios";
import { Navber } from "./Navber";
import "./login.css";
const SignUp = () => {
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState("");
  const [currentPassword, setCurrentPassWord] = useState("");
  const handleReturnToTitle = () => {
    navigate("/");
  };
  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    console.log(newValue);
    setCurrentUser(newValue);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setCurrentPassWord(newValue);
  };

  const handleSaveUserData = () => {
    axios
      .post(`${import.meta.env.VITE_API_URL}/signup`, {
        user_name: currentUser,
        password: currentPassword,
      })
      .then((res) => {
        if (res.status === 200) {
          alert("登録完了しました。");
          navigate("/");
        } else {
          alert("登録失敗");
        }
      })
      .catch(console.error);
  };
  const handleSubmit = (e: React.SubmitEvent) => {
    e.preventDefault();
    handleSaveUserData();
  };
  return (
    <div>
      <Navber />
      <div className="login-contena signup">
        <div className="login-card">
          <div className="login-header">
            <div className="login-logo">✒️</div>
            <h2 className="login-title">SIGN UP</h2>
            <p className="login-subtitle">アカウントを登録してください</p>
          </div>

          <form onSubmit={handleSubmit} className="login-form">
            <div className="input-group">
              <label className="input-label">登録するユーザーネーム</label>
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
              ユーザー登録
            </button>
          </form>

          <div className="login-footer">
            <button onClick={handleReturnToTitle} className="btn-sub">
              ログイン画面に戻る
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default SignUp;
