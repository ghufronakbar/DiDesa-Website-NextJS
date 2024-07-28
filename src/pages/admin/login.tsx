import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { useMutation } from '@tanstack/react-query';
import axiosInstance from '@/utils/axiosInstance';
import { useToast } from '@/components/Toast'; 
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';
import LoadingSpinner from '@/components/LoadingSpinner'; 

const LoginAdmin: React.FC = () => {
  const [nik, setNik] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const router = useRouter();
  const { showToast } = useToast();

  const mutation = useMutation({
    mutationFn: async () => {
      const response = await axiosInstance.post('/api/admin/account/login', { nik, password });
      return response.data;
    },
    onSuccess: (data) => {
      showToast(data.message, 'success');
      localStorage.setItem('token', data.token);
      router.push('/admin/dashboard');
    },
    onError: () => {
      showToast('Login gagal. Periksa NIK dan password Anda.', 'error');
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    mutation.mutate();
  };

  return (
    <div className="flex items-center justify-center h-screen bg-didesa bg-cover font-montserrat">
      <div className="bg-white bg-opacity-30 backdrop-blur-sm px-8 py-16 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center text-white">Login Admin</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-white text-sm font-bold mb-2" htmlFor="nik">
              NIK
            </label>
            <input
              type="text"
              id="nik"
              value={nik}
              onChange={(e) => setNik(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-black leading-tight focus:outline-none focus:shadow-outline"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-white text-sm font-bold mb-2" htmlFor="password">
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-black leading-tight focus:outline-none focus:shadow-outline"
                required
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
              className="bg-primary hover:bg-tertiary text-white hover:text-primary font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition-all duration-300 mt-2 self-center"
              disabled={mutation.isPending}
            >
              {mutation.isPending ? <LoadingSpinner /> : 'Login'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginAdmin;
