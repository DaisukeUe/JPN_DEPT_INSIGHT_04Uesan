import { useNavigate } from "react-router";
import { useState } from "react";
import axios from "axios";
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
    console.log(currentUser);
    axios
      .post(`${import.meta.env.VITE_API_URL}/signup`, {
        user_name: currentUser,
        password: currentPassword,
      })
      .then((res) => {
        if (res.status === 200) {
          navigate("/");
        }
      })
      .catch(console.error);
  };
  return (
    <div>
      ユーザーネーム
      <input type="text" onChange={handleNameChange} />
      パスワード
      <input type="password" onChange={handlePasswordChange} />
      <button onClick={handleSaveUserData}>登録</button>
      <button onClick={handleReturnToTitle}>ログイン画面へ</button>
      サインアップ
    </div>
  );
};
export default SignUp;
