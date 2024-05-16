"use client";

import * as z from "zod";
import { useForm } from "react-hook-form";
import { useState, useTransition } from "react";
import { useSearchParams } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { BsEyeSlash, BsEye } from "react-icons/bs";

import { LoginSchema } from "@/schemas";
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
import { login } from "@/actions/auth/login";
import MyButton from "../ui/my-button";
import { Separator } from "../ui/separator";

export const LoginForm = () => {
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl");
  const urlError =
    searchParams.get("error") === "OAuthAccountNotLinked"
      ? "Email already in use with different provider!"
      : "";

  const emailFromURL = searchParams.get("email");

  const [showTwoFactor, setShowTwoFactor] = useState(false);
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const [isPending, startTransition] = useTransition();

  const [visible, setVisible] = useState(false);

  const form = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: emailFromURL || "",
      password: "",
    },
  });

  const onSubmit = (values: z.infer<typeof LoginSchema>) => {
    setError("");
    setSuccess("");

    startTransition(() => {
      login(values, callbackUrl)
        .then((data) => {
          console.log("data:", data);
          if (data?.error) {
            form.reset();
            setError(data.error);
          }

          if (data?.success) {
            form.reset();
            setSuccess(data?.success);
          }
        })
        .catch(() => setError("Щось пішло не так"));
    });
  };

  return (
    <CardWrapper
      headerLabel="Вхід до акаунту"
      backButtonLabel="Не маєте аккаунта? Зареєструйтесь."
      backButtonHref={"/auth/register?" + searchParams.toString()}
      showSocial={false}
    >
      {/* <Separator className="mb-6" /> */}
      <Form {...form}>
        <form /* it's just a native form element */
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-3"
        >
          <div className="space-y-4">
            {!showTwoFactor && (
              <>
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
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
                      {/*   <Button
                        size="sm"
                        variant="link"
                        asChild
                        className="px-0 font-normal"
                      >
                        <Link  className=" link-stand text-base " href={"/auth/reset?" + searchParams.toString()}>
                          Forgot password? Reset the password.
                        </Link>
                      </Button> */}
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </>
            )}
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
                Забули пароль?
              </Link>
            </Button>
          </div>
          <FormError message={error || urlError} />
          <FormSuccess message={success} />
          <Button
            size="sm"
            type="submit"
            disabled={isPending}
            className=" main-button  
             "
          >
            {/* shadow-none hover:shadow-xl shadow-blue-via */}
            Увійти
          </Button>
          {/*  <MyButton
            className="w-full font-semibold"
            disabled={isPending}
            type="submit"
          >
            {showTwoFactor ? "Confirm" : "Login"}
          </MyButton> */}
          {/* <Button disabled={isPending} type="submit" className="w-full">
            {showTwoFactor ? "Confirm" : "Login"}
          </Button> */}
        </form>
      </Form>
    </CardWrapper>
  );
};
