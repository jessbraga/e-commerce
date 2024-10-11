'use client'

import Link from "next/link";
import { useForm, SubmitHandler } from "react-hook-form";

interface RegisterFormInputs {
  name: string;
  email: string;
  password: string;
  isSeller: boolean;
}

export default function Register() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormInputs>();

  const onSubmit: SubmitHandler<RegisterFormInputs> = (data) => console.log(data);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex min-h-screen items-center justify-center bg-white px-6 py-12">
      <div className="w-full max-w-md space-y-8 p-8 bg-gray-50 shadow-lg rounded-lg">
        <div className="text-center mb-6">
          <h1 className="text-3xl font-bold text-gray-900">Crie sua conta</h1>
        </div>

        <div className="space-y-4">
          <div className="space-y-1">
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">Nome completo</label>
            <input
              id="name"
              type="text"
              {...register("name", { required: true })}
              placeholder="Nome e sobrenome"
              className="w-full p-2.5 border rounded-md border-gray-300 text-gray-900 placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
            {errors.name && <span className="text-red-500 text-sm">Você precisa informar seu nome e sobrenome.</span>}
          </div>

          <div className="space-y-1">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
            <input
              id="email"
              type="email"
              {...register("email", { required: true })}
              placeholder="seuemail@example.com"
              className="w-full p-2.5 border rounded-md border-gray-300 text-gray-900 placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
            {errors.email && <span className="text-red-500 text-sm">Você precisa informar seu email.</span>}
          </div>

          <div className="space-y-1">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">Senha</label>
            <input
              id="password"
              type="password"
              {...register("password", { required: true })}
              className="w-full p-2.5 border rounded-md border-gray-300 text-gray-900 placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
            {errors.password && <span className="text-red-500 text-sm">Você precisa definir uma senha.</span>}
          </div>

          <div className="flex items-center">
            <input
              id="isSeller"
              type="checkbox"
              {...register("isSeller")}
              className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
            />
            <label htmlFor="isSeller" className="ml-2 text-sm text-gray-700">
              Registrar como vendedor
            </label>
          </div>
        </div>

        <button type="submit" className="w-full py-2.5 bg-black text-white font-semibold rounded-md hover:bg-gray-700 transition">
          Criar Conta
        </button>

        <div className="text-center mt-4 text-sm text-gray-600">
          Já tem uma conta?
          <Link href="./login" prefetch={false} className="pl-1 font-medium text-blue-600 hover:underline">
            Entre.
          </Link>
        </div>
      </div>
    </form>
  );
}
