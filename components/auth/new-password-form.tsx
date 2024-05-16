"use client";

import * as z from "zod";
import { useForm } from "react-hook-form";
import { useState, useTransition } from "react";
import { useSearchParams } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { BsEyeSlash, BsEye } from "react-icons/bs";
import { useParams, useRouter } from "next/navigation";

//import Router from "next/router"; //new
import { useRouter as useRouter2 } from "next/router";

import { NewPasswordSchema } from "@/schemas";
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
import { newPassword } from "@/actions/auth/new-password";
import MyButton from "../ui/my-button";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";

export const NewPasswordForm = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const router2 = useRouter2();
  const token = searchParams.get("token");

  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const [isPending, startTransition] = useTransition();

  const [visible, setVisible] = useState(false);

  const form = useForm<z.infer<typeof NewPasswordSchema>>({
    resolver: zodResolver(NewPasswordSchema),
    defaultValues: {
      password: "",
    },
  });

  const onSubmit = (values: z.infer<typeof NewPasswordSchema>) => {
    setError("");
    setSuccess("");

    startTransition(() => {
      newPassword(values, token).then((data) => {
        setError(data?.error);
        setSuccess(data?.success);
        if (data?.success) {
          router.push(DEFAULT_LOGIN_REDIRECT);
          //Router.reload();//NW
          router2.reload();
        }
      });
    });
  };

  return (
    <CardWrapper
      headerLabel="Введіть новий пароль"
      backButtonLabel="Назад до входу"
      backButtonHref="/auth/login"
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-4">
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
          </div>
          <FormError message={error} />
          <FormSuccess message={success} />
          {/*    <MyButton disabled={isPending} type="submit" className="w-full">
            Reset password
          </MyButton> */}
          <Button
            size="sm"
            type="submit"
            disabled={isPending}
            className=" main-button  
             "
          >
            Змінити пароль
          </Button>
        </form>
      </Form>
    </CardWrapper>
  );
};
