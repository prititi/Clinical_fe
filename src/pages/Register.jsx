import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Alert, Button, CircularProgress, TextField, useMediaQuery, useTheme } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "@mui/material";
import { registerFailure, registerStart, registerSuccess } from "../features/auth/authSlice";

export const Register = () => {
  const [credentials, setCredentials] = useState({
    userName: undefined,
    email: undefined,
    password: undefined,
  });
  const auth = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const handleChange = (e) => {
    setCredentials((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  useEffect(() => {
    if (auth.status === "succeeded") {
      navigate("/login");
    }
  }, [auth.status, navigate]);

  const handleClick = async (e) => {
    e.preventDefault();
    dispatch(registerStart());
    try {
      const res = await fetch(`https://clinical-3ndq.onrender.com/api/v1/auth/register`, {
        method: "post",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(credentials),
      });

      const result = await res.json();

      if (!res.ok) {
        alert(result.message);
        dispatch(registerFailure(result.message));
      } else {
        dispatch(registerSuccess(result));
      }
    } catch (error) {
      dispatch(registerFailure(error.message));
    }
  };

  return (
    <div className="w-full lg:grid lg:min-h-[300px] lg:grid-cols-2 xl:min-h-[500px]">
      <div className="flex items-center justify-center py-12">
        <div className="mx-auto grid w-[350px] gap-6">
          <div className="flex justify-start flex-col gap-3">
            <h1 className="text-3xl font-bold">Sign Up</h1>
            <p className="text-muted-foreground text-[#71717A]">Enter your information to create an account</p>
          </div>
          <form onSubmit={handleClick} className="grid gap-4">
            <div className="grid gap-2">
              <span className="text-black" htmlFor="email">
                Username
              </span>
              <TextField
                variant="outlined"
                fullWidth
                size="small"
                required
                type="text"
                placeholder="Username"
                id="username"
                onChange={handleChange}
              />
            </div>
            <div className="grid gap-2">
              <span className="text-black" htmlFor="email">
                Email
              </span>
              <TextField
                variant="outlined"
                fullWidth
                size="small"
                type="text"
                placeholder="Email"
                required
                id="email"
                onChange={handleChange}
              />
            </div>
            <div className="grid gap-2">
              <div className="flex items-center justify-between">
                <span htmlFor="password">Password</span>
              </div>
              <TextField
                variant="outlined"
                label="Password"
                fullWidth
                size="small"
                type="password"
                required
                id="password"
                onChange={handleChange}
              />
            </div>
            <Button
              type="submit"
              variant="contained"
              disabled={auth.status === "loading"}
              className="mx-auto w-full text-lg mt-4 normal-case"
              sx={{
                backgroundColor: "black",
                color: "white",
                "&:hover": {
                  backgroundColor: "#2F2F31",
                },
              }}
            >
              <span className="normal-case">
                {auth.status === "loading" ? <CircularProgress size={24} /> : "Create an account"}
              </span>
            </Button>

            {auth.status === "failed" && (
              <div className="mt-4">
                <Alert severity="error">{auth.error}</Alert>
              </div>
            )}
          </form>
          <div className="mt-4 text-center text-sm text-[#6C6C6E]">
            Already have an account?{" "}
            <Link href="/register" className="underline">
              Sign in
            </Link>
          </div>
        </div>
      </div>
      {!isMobile && (
        <div className="mt-10">
          <img
            src="https://cdn.discordapp.com/attachments/1011669075656704003/1269907321153257522/medical-team-login-register.webp?ex=66b1c4db&is=66b0735b&hm=19ba66f21500664ddae16950ba1fdee5a0d09caa8fc1fc0b94094a98fb4dfe96&"
            alt="Image"
            width="1900"
            height="1000"
            className="h-full w-full object-cover"
          />
        </div>
      )}
    </div>
  );
};
