import React, { useState } from "react";
import { useRouter } from "next/router";
import { useMutation } from "@tanstack/react-query";
import axiosInstance from "@/utils/axiosInstance";
import { useToast } from "@/components/Toast";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import LoadingSpinner from "@/components/LoadingSpinner";
import Cookies from "js-cookie";
import { COOKIES_KEY } from "@/constant/keyStore";
import { loginUser } from "@/services/user/profile";

interface FormLogin {
  nik: string;
  password: string;
};

const LoginUser: React.FC = () => {
  const [formLogin, setFormLogin] = useState<FormLogin>({
    nik: "",
    password: "",
  });  
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const router = useRouter();
  const  redirect  = router.query.redirect as string || "/";
  const { showToast } = useToast();

  const mutation = useMutation({
    mutationFn: async () => {
      if (formLogin.nik === "" || formLogin.password === "") {
        showToast("NIK dan password harus diisi", "error");
        return;
      }
      showToast("Harap tunggu sebentar", "info");
      const response = await loginUser(formLogin.nik, formLogin.password);
      return response;
    },
    onSuccess: (data) => {
      if (data) {
        showToast(data.message, "success");
        Cookies.set(COOKIES_KEY, data.token, { expires: 1 });
        router.push(`/${redirect}`);
      }
    },
    onError: () => {
      showToast("Login gagal. Periksa NIK dan password Anda.", "error");
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    mutation.mutate();
  };

  return (
    <div className="flex items-center justify-center h-screen bg-didesa bg-cover font-montserrat">
      <div className="bg-white bg-opacity-30 backdrop-blur-sm px-8 py-16 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center text-black">
          Login
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              className="block text-black text-sm font-bold mb-2"
              htmlFor="nik"
            >
              NIK
            </label>
            <input
              type="text"
              inputMode="numeric"
              pattern="[0-9]*"
              id="nik"
              value={formLogin.nik}
              onChange={(e) => setFormLogin({...formLogin, nik: e.target.value})}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-black leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-black text-sm font-bold mb-2"
              htmlFor="password"
            >
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                value={formLogin.password}
                onChange={(e) => setFormLogin({...formLogin, password: e.target.value})}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-black leading-tight focus:outline-none focus:shadow-outline"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5 text-black"
              >
                {showPassword ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
              </button>
            </div>
          </div>
          <div className="flex items-center justify-center w-full">
            <button
              type="submit"
              className="bg-primary hover:bg-secondary text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition-all duration-300 mt-2 self-center"
              disabled={mutation.isPending}
            >
              {mutation.isPending ? <LoadingSpinner /> : "Login"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginUser;
