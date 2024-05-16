"use client";

import * as z from "zod";
import { useEffect, useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { BsEyeSlash, BsEye } from "react-icons/bs";

import { RegisterSchema } from "@/schemas";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { CardWrapper } from "@/components/auth/card-wrapper";
import { Button } from "@/components/ui/button";
import { FormError } from "@/components/form-error";
import { FormSuccess } from "@/components/form-success";
import { register } from "@/actions/auth/register";
import MyButton from "../ui/my-button";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import RegisterStatusButtons from "@/app/(auth-layout)/auth/_components/register-status-buttons";

export const RegisterForm = () => {
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl");

  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const [isPending, startTransition] = useTransition();

  const [visible, setVisible] = useState(false);

  const form = useForm<z.infer<typeof RegisterSchema>>({
    resolver: zodResolver(RegisterSchema),
    defaultValues: {
      email: "",
      password: "",
      passwordRepeat: "",
      name: "",
      role: "AFFILIATE",
    },
  });

  const watchAllFields = form.watch();
  useEffect(() => {
    console.log("watchAllFields from RegisterForm: ", watchAllFields);
  }, [watchAllFields]);

  const onSubmit = (values: z.infer<typeof RegisterSchema>) => {
    setError("");
    setSuccess("");

    startTransition(() => {
      register(values, callbackUrl).then((data) => {
        setError(data.error);
        setSuccess(data.success);
      });
    });
  };

  return (
    <CardWrapper
      headerLabel="Реєстрація"
      backButtonLabel="Вже маєте аккаунт? Вхід."
      backButtonHref={"/auth/login?" + searchParams.toString()}
      showSocial={false}
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
          <div className="space-y-4">
            <FormField
              control={form.control}
              name="role"
              render={({ field }) => (
                <FormItem>
                  <div className="flex flex-col  items-center space-y-4 ">
                    <FormLabel>Виберіть роль</FormLabel>
                    <FormControl>
                      <RegisterStatusButtons
                        value={field.value ? field.value : "AFILIATE"}
                        disabled={isPending}
                        onChange={(status) => field.onChange(status)}
                      />
                    </FormControl>
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Ім’я</FormLabel>
                  <FormControl>
                    <Input {...field} disabled={isPending} placeholder="Ім’я" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>E-mail</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      disabled={isPending}
                      placeholder="john.doe@example.com"
                      type="email"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Пароль</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Input
                        {...field}
                        disabled={isPending}
                        placeholder="Пароль"
                        type={visible ? "text" : "password"}
                        /* type="password" */
                      />
                      <p
                        onClick={() => setVisible(!visible)}
                        className="absolute right-[-20px] top-[8px] h-10 w-12 cursor-pointer border-none text-xl"
                      >
                        {visible ? (
                          <BsEyeSlash color="blue" />
                        ) : (
                          <BsEye color="blue" />
                        )}
                      </p>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="passwordRepeat"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Повторіть пароль</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Input
                        {...field}
                        disabled={isPending}
                        placeholder="Повторіть пароль"
                        type={visible ? "text" : "password"}
                        /* type="password" */
                      />
                      <p
                        onClick={() => setVisible(!visible)}
                        className="absolute right-[-20px] top-[8px] h-10 w-12 cursor-pointer border-none text-xl"
                      >
                        {visible ? (
                          <BsEyeSlash color="blue" />
                        ) : (
                          <BsEye color="blue" />
                        )}
                      </p>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="w-full flex items-center justify-end mt-0 pt-0">
            <Button
              size="sm"
              variant="link"
              asChild
              className="px-0 py-0 font-normal "
            >
              <Link
                className=" link-stand text-base text-center  "
                href={"/auth/reset?" + searchParams.toString()}
              >
                Забули пароль??
              </Link>
            </Button>
          </div>
          <FormError message={error} />
          <FormSuccess message={success} />
          <Button
            size="sm"
            type="submit"
            disabled={isPending}
            className=" main-button  
             "
          >
            Зареєструватися
          </Button>
          {/*  <MyButton disabled={isPending} type="submit" className="w-full">
            Create an account
          </MyButton> */}
        </form>
      </Form>
    </CardWrapper>
  );
};
