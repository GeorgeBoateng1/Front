import * as Yup from "yup";
import React, { useState } from "react";
import { useSnackbar } from "notistack";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { LoadingButton } from "@mui/lab";
import {
  Stack,
  Alert,
  IconButton,
  InputAdornment,
  Link,
  Typography,
} from "@mui/material";
import Iconify from "../../../components/Iconify";
import {
  RHFTextField,
  FormProvider,
  RHFCheckbox,
} from "../../../components/hook-form";
import axios from "axios";
import { PATH_AUTH } from "@/routes/paths";
import NextLink from "next/link";

export default function LoginForm() {
  const router = useRouter();
  const { enqueueSnackbar } = useSnackbar();
  const [showPassword, setShowPassword] = useState(false);
  const [isApiCallInProgress, setIsApiCallInProgress] = useState(false);

  const LoginSchema = Yup.object().shape({
    email: Yup.string()
      .email("Email must be a valid email address")
      .required("Email is required"),
    password: Yup.string().required("Password is required"),
    terms: Yup.boolean().oneOf(
      [true],
      "You must agree to our terms and conditions"
    ),
  });

  const methods = useForm({
    resolver: yupResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: "",
      terms: true,
    },
  });

  const {
    reset,
    setError,
    handleSubmit,
    formState: { errors },
  } = methods;

  const onSubmit = async (data) => {
    setIsApiCallInProgress(true);
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/auth/login`,
        {
          email: data.email,
          password: data.password,
        },
        { withCredentials: true } // ✅ Ensure cookies are sent with the request
      );

      enqueueSnackbar("Login success!");
      router.push("/dashboard/app");
      setTimeout(() => {
        setIsApiCallInProgress(false);
      }, 8000);
    } catch (error) {
      enqueueSnackbar(`Login failed: ${error.response?.data?.message || error.message}`, {
        variant: "error",
      });
      setIsApiCallInProgress(false);
      reset();
      setError("afterSubmit", { message: "Login error" });
    }
  };

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={3}>
        {!!errors.afterSubmit && (
          <Alert severity="error">{errors.afterSubmit.message}</Alert>
        )}

        <RHFTextField name="email" label="Email address" />
        <RHFTextField
          name="password"
          label="Password"
          type={showPassword ? "text" : "password"}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  onClick={() => setShowPassword(!showPassword)}
                  edge="end"
                >
                  <Iconify
                    icon={showPassword ? "eva:eye-fill" : "eva:eye-off-fill"}
                  />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      </Stack>

      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        sx={{ my: 2 }}
      >
        <RHFCheckbox name="terms" label="Remember me" />
        <Link href={PATH_AUTH.resetPassword} variant="subtitle2">
          Forgot password?
        </Link>
      </Stack>

      <LoadingButton
        fullWidth
        size="large"
        type="submit"
        variant="contained"
        loading={isApiCallInProgress}
        disabled={isApiCallInProgress}
      >
        Login
      </LoadingButton>

      <Typography variant="body2" align="center" sx={{ mt: 3 }}>
        Don&apos;t have an account?{" "}
        <NextLink href={PATH_AUTH.register} passHref>
          <Link variant="subtitle2" underline="none">
            Get started
          </Link>
        </NextLink>
      </Typography>
    </FormProvider>
  );
}
