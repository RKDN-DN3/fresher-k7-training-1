import { Button, TextField, FormControl, Alert } from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import React, { useState } from "react";
import styles from "./Register.module.scss";
import FormError from "../../components/formError";
import { registerUser } from "../../services";
import { useNavigate } from "react-router-dom";
import BackdropLoading from "../../components/backDrop";

const Register = () => {
  const [openLoading, setOpenLoading] = useState(false);
  const [alertSuccess, setAlertSuccess] = useState(false);
  const [values, setValues] = useState({
    showPassword: false,
    showCPassword: false,
  });

  const [errors, setErrors] = useState({});

  const navigate = useNavigate();

  const userRegister = JSON.stringify({
    fullName: values.fullname,
    PhoneNumber: values.phone,
    userName: values.username,
    email: values.email,
    password: values.password,
  });

  const handleRegister = async () => {
    const res = await registerUser(userRegister);
    if (res) {
      setAlertSuccess(true);
      setOpenLoading(false);
    }
  };

  const handleDirectLogin = () => {
    navigate("/login");
  };

  const handleOnChange = (prop) => (e) => {
    setValues({ ...values, [prop]: e.target.value });
  };

  const handleClickShowPassword = (prop) => (e) => {
    if (prop === "password") {
      setValues({ ...values, showPassword: !values.showPassword });
    } else {
      setValues({ ...values, showCPassword: !values.showCPassword });
    }
  };

  const handleMouseDownPassword = (e) => {
    e.preventDefault();
  };

  const validateEmail = (email) => {
    if (email) {
      return email.match(/\S+@\S+\.\S+/);
    }
  };

  const validatePassword = (pass) => {
    if (pass) {
      return pass.match(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#$@!%&*?])[A-Za-z\d#$@!%&*?]{8,30}$/
      );
    }
  };

  const handleSubmitRegister = (e) => {
    e.preventDefault();
    setOpenLoading(true);
    let isSubmit = true;

    let inputsError = {};

    if (
      values.fullname === null ||
      values.fullname === undefined ||
      values.fullname === ""
    ) {
      inputsError.fullname = "Fullname không được để trống";
      isSubmit = false;
    }

    if (
      values.phone === null ||
      values.phone === undefined ||
      values.phone === ""
    ) {
      inputsError.phone = "Phone không được để trống";
      isSubmit = false;
    }

    if (
      values.username === null ||
      values.username === undefined ||
      values.username === ""
    ) {
      inputsError.username = "Username không được để trống";
      isSubmit = false;
    }

    if (
      values.email === null ||
      values.email === undefined ||
      values.email === ""
    ) {
      inputsError.email = "Email không được để trống";
      isSubmit = false;
    } else {
      if (!validateEmail(values.email)) {
        inputsError.email = "Email không đúng định dạng";
        isSubmit = false;
      }
    }

    if (
      values.password === null ||
      values.password === undefined ||
      values.password === ""
    ) {
      inputsError.password = "Password không được để trống";
      isSubmit = false;
    } else {
      if (!validatePassword(values.password)) {
        inputsError.password =
          "Password phải có ít nhất 8 kí tự, ít nhất 1 chữ cái viết hoa, ít nhất 1 chữ số và ít nhất 1 ký tự đặc biệt";
        isSubmit = false;
      }
    }

    if (
      values.cpassword === null ||
      values.cpassword === undefined ||
      values.cpassword === ""
    ) {
      inputsError.cpassword = "Confirm Password không được để trống";
      isSubmit = false;
    } else {
      if (values.cpassword !== values.password) {
        inputsError.cpassword = "Confirm Password không trùng khớp";
        isSubmit = false;
      }
    }

    if (!isSubmit) {
      setErrors(inputsError);
      setOpenLoading(false);
    } else {
      if (Object.keys(errors).length > 0) {
        setErrors({});
      }
      setValues({
        ...values,
        fullname: "",
        phone:"",
        username: "",
        email: "",
        password: "",
        cpassword: "",
      });
      handleRegister();
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1>Register</h1>
      </div>
      <div className={styles.content}>
        <FormControl fullWidth sx={{ m: 1 }}>
          <FormError errors={errors} />
          {alertSuccess === true ? (
            <Alert severity="success">
              Register Successfully —
              <strong className={styles.pointer} onClick={handleDirectLogin}>
                Login now
              </strong>
            </Alert>
          ) : (
            ""
          )}
        </FormControl>
        <form onSubmit={handleSubmitRegister}>
          <FormControl fullWidth sx={{ m: 1 }}>
            <TextField
              id="outlined-fullname"
              name="fullname"
              label="FullName"
              variant="outlined"
              value={values.fullname ? values.fullname : ""}
              onChange={handleOnChange("fullname")}
            />
          </FormControl>
          <FormControl fullWidth sx={{ m: 1 }}>
            <TextField
              id="outlined-phone"
              name="phone"
              label="Phone"
              variant="outlined"
              type={"number"}
              value={values.phone ? values.phone : ""}
              onChange={handleOnChange("phone")}
            />
          </FormControl>
          <FormControl fullWidth sx={{ m: 1 }}>
            <TextField
              id="outlined-username"
              name="username"
              label="Username"
              variant="outlined"
              value={values.username ? values.username : ""}
              onChange={handleOnChange("username")}
            />
          </FormControl>
          <FormControl fullWidth sx={{ m: 1 }}>
            <TextField
              id="outlined-email"
              name="email"
              label="Email"
              variant="outlined"
              value={values.email ? values.email : ""}
              onChange={handleOnChange("email")}
            />
          </FormControl>
          <FormControl fullWidth sx={{ m: 1 }}>
            <InputLabel htmlFor="outlined-adornment-password">
              Password
            </InputLabel>
            <OutlinedInput
              id="outlined-adornment-password"
              name="password"
              label="Password"
              variant="outlined"
              value={values.password ? values.password : ""}
              onChange={handleOnChange("password")}
              type={values.showPassword ? "text" : "password"}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword("password")}
                    onMouseDown={handleMouseDownPassword}
                    edge="end"
                  >
                    {values.showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
            />
          </FormControl>

          <FormControl fullWidth sx={{ m: 1 }}>
            <InputLabel htmlFor="outlined-adornment-confirm-password">
              Confirm Password
            </InputLabel>
            <OutlinedInput
              id="outlined-adornment-confirm-password"
              name="cpassword"
              label="Confirm Password"
              variant="outlined"
              value={values.cpassword ? values.cpassword : ""}
              onChange={handleOnChange("cpassword")}
              type={values.showCPassword ? "text" : "password"}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword("cpassword")}
                    onMouseDown={handleMouseDownPassword}
                    edge="end"
                  >
                    {values.showCPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
            />
          </FormControl>
          <FormControl fullWidth sx={{ m: 1 }}>
            <Button type="submit" variant="contained">
              Register
            </Button>
          </FormControl>
        </form>
      </div>
      <BackdropLoading openLoading={openLoading} />
    </div>
  );
};

export default Register;
