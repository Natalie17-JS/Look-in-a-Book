"use client";
import { useForm } from "react-hook-form";
import { useMutation } from "@apollo/client";
import { LOGIN_USER } from "@/app/GraphqlOnClient/mutations/userMutations";
import { useAuth } from "@/app/context/authContext";

export default function LoginForm() {
  const { login } = useAuth(); // Используем login из контекста
  const { register, handleSubmit } = useForm();
  const [loginUser, { loading, error }] = useMutation(LOGIN_USER);

  const onSubmit = async (data: any) => {
    try {
      const { data: result } = await loginUser({ variables: data });
      if (result?.loginUser) {
        login(result.loginUser.accessToken); // Сохраняем токен в контекст
      }
    } catch (err) {
      console.error("Log in error:", err);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input {...register("email")} type="email" placeholder="Email" required />
      <input {...register("password")} type="password" placeholder="Password" required />
      <button type="submit" disabled={loading}>
        {loading ? "Signing in..." : "sign in"}
      </button>
      {error && <p className="text-red-500">{error.message}</p>}
    </form>
  );
}
