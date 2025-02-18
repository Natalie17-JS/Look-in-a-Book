"use client";
import { useForm } from "react-hook-form";
import { useMutation } from "@apollo/client";
import { REGISTER_USER } from "@/app/GraphqlOnClient/mutations/userMutations";

export default function RegisterForm() {
  const { register, handleSubmit } = useForm();
  const [registerUser, { loading, error }] = useMutation(REGISTER_USER);

  const onSubmit = async (data: any) => {
    try {
      const { data: result } = await registerUser({ variables: data });
      if (result?.registerUser) {
        alert("Registration success! Please sign in.");
      }
    } catch (err) {
      console.error("Registration error:", err);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input {...register("username")} placeholder="Username" required />
      <input {...register("email")} type="email" placeholder="Email" required />
      <input {...register("password")} type="password" placeholder="Password" required />
      <input {...register("bio")} placeholder="Something about you" />
      <input {...register("avatar")}/>
      <button type="submit" disabled={loading}>
        {loading ? "Registering..." : "Sign up"}
      </button>
      {error && <p className="text-red-500">{error.message}</p>}
    </form>
  );
}
