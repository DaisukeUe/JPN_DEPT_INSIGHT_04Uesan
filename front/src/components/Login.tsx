import { useNavigate } from "react-router";
import { useState, useEffect } from "react";
import { useAppSelector, useAddDispatch, store } from "../store";
import { setUser } from "../slices/userSlice";
import type { USER } from "../type";
import axios from "axios";
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
      (obj) => (obj as any).user_name === currentUser,
    );
    if ((dataBaseUser as any).user_name === undefined)
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
        }
        console.log(res.data);
      })
      .catch(console.error);
  };
  const get = store.getState();
  console.log(get);
  return (
    <div>
      ユーザーネーム
      <input type="text" onChange={handleNameChange} />
      パスワード
      <input type="password" onChange={handlePasswordChange} />
      <button onClick={handleLogin}>ログイン</button>
      <button onClick={handleNavigateSignUp}>サインアップ</button>
    </div>
  );
};
export default Login;
