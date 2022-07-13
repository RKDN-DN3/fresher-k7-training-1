import {
  FormControl,
  InputLabel,
  OutlinedInput,
  TextField,
  InputAdornment,
  IconButton,
  Button,
} from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import React, { useState } from "react";
import styles from "./Login.module.scss";
import FormError from "../../components/formError";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../../services";
import BackdropLoading from "../../components/backDrop";
import { Link } from "react-router-dom";

function Login() {
  const [openLoading, setOpenLoading] = React.useState(false);

  const [values, setValues] = useState({
    showPassword: false,
    username: "adminuser",
    password: "@Abc123",
  });
  const [errors, setErrors] = useState({});

  const navigate = useNavigate();

  const handleClickShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword });
  };

  const handleMouseDownPassword = (e) => {
    e.preventDefault();
  };

  const handleOnChange = (prop) => (e) => {
    setValues({ ...values, [prop]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let isSubmit = true;

    let inputsError = {};

    if (
      values.username === null ||
      values.username === undefined ||
      values.username === ""
    ) {
      inputsError.username = "Username không được để trống";
      isSubmit = false;
      setOpenLoading(false);
    }

    if (
      values.password === null ||
      values.password === undefined ||
      values.password === ""
    ) {
      inputsError.password = "Password không được để trống";
      isSubmit = false;
    }

    if (!isSubmit) {
      setErrors(inputsError);
    } else {
      if (Object.keys(errors).length > 0) {
        setErrors({});
      }
      setValues({ ...values, username: "", password: "" });

      let userLogin = JSON.stringify({
        emailOrUserName: values.username,
        password: values.password,
      });

      setOpenLoading(true);
      loginUser(userLogin)
        .then((res) => {
          if (res.data.token) {
            localStorage.setItem("tokenUserLogin", res.data.token);
            localStorage.setItem("isLogin", true);
            localStorage.setItem("userName", values.username)
            navigate("/");
            window.location.reload();
            setOpenLoading(false);
          }
        })
        .catch((err) => console.log(err));
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1>Login</h1>
      </div>
      <div style={{ color: "red" }}>Demo with default user and password</div>
      <div className={styles.content}>
        <FormControl fullWidth sx={{ m: 1 }}>
          <FormError errors={errors} />
        </FormControl>
        <form onSubmit={handleSubmit}>
          <FormControl fullWidth sx={{ m: 1 }}>
            <TextField
              id="username"
              name="username"
              label="Username"
              variant="outlined"
              value={values.username ? values.username : ""}
              onChange={handleOnChange("username")}
            />
          </FormControl>

          <FormControl fullWidth sx={{ m: 1 }}>
            <InputLabel htmlFor="outlined-password">Password</InputLabel>
            <OutlinedInput
              id="outlined-password"
              name="password"
              label="Password"
              variant="outlined"
              value={values.password ? values.password : ""}
              type={values.showPassword ? "text" : "password"}
              onChange={handleOnChange("password")}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    edge="end"
                  >
                    {values.showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
            ></OutlinedInput>
          </FormControl>

          <FormControl fullWidth sx={{ m: 1 }}>
            <Button type="submit" variant="contained">
              Login
            </Button>
          </FormControl>

          <FormControl fullWidth sx={{m:1}}>
            <p style={{"marginLeft":"auto"}}>
              Not a member? 
              <Link to="/register" style={{ color: "#000", fontWeight: 600 }}>
                Sign up now
              </Link>
            </p>
          </FormControl>
        </form>
      </div>
      <BackdropLoading openLoading={openLoading} />
    </div>
  );
}

export default Login;
