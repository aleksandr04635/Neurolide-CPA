"use client";

import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTransition, useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { BsEyeSlash, BsEye } from "react-icons/bs";

import PhoneInputWithCountry from "react-phone-number-input/react-hook-form";
import { useParams, useRouter } from "next/navigation";

import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { SettingsSchema } from "@/schemas";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { settings } from "@/actions/settings";
import {
  Form,
  FormField,
  FormControl,
  FormItem,
  FormLabel,
  FormDescription,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useCurrentUser } from "@/hooks/use-current-user";
import { FormError } from "@/components/form-error";
import { FormSuccess } from "@/components/form-success";
import { User, UserRole } from "@prisma/client";
import MyButton from "@/components/ui/my-button";
import FrontImageUpload from "./front-image-upload";

import "react-phone-number-input/style.css";

type Props = { fullUser: User | null };

// async
const SettingsClientInter = ({ fullUser }: Props) => {
  const router = useRouter();
  //const user = useCurrentUser();
  //console.log("user form  SettingsClientInter: ", user);
  //console.log("fullUser form  SettingsClientInter: ", fullUser);
  const user = fullUser;

  const [error, setError] = useState<string | undefined>();
  const [success, setSuccess] = useState<string | undefined>();
  const { update } = useSession();
  const [isPending, startTransition] = useTransition();

  const [visible, setVisible] = useState(false);

  const form = useForm<z.infer<typeof SettingsSchema>>({
    resolver: zodResolver(SettingsSchema),
    defaultValues: {
      password: undefined,
      newPassword: undefined,
      image: user?.image || undefined,
      name: user?.name || undefined,
      address: user?.address || undefined,
      phoneNumber: user?.phoneNumber || undefined,
      email: user?.email || undefined,
      role: user?.role || undefined,
    },
  });

  /*   const watchAllFields = form.watch();
  useEffect(() => {
    console.log("watchAllFields from SettingsForm: ", watchAllFields);
  }, [watchAllFields]); */

  const onSubmit = (values: z.infer<typeof SettingsSchema>) => {
    startTransition(() => {
      settings(values)
        .then((data) => {
          if (data.error) {
            setSuccess(undefined);
            setError(data.error);
          }

          if (data.success) {
            update(); //updates the session on the client side. update from the server side doesn't work immediately
            setError(undefined);
            setSuccess(data.success);
            router.push("/");
          }
        })
        .catch(() => setError("Щось пішло не так!"));
    });
  };

  //max-w-[600px] lg:w-[600px]
  return (
    <div className=" w-full  shadow-none  border-0 rounded-xl flex items-center justify-center bg-white">
      <Card className=" w-full  shadow-none  border-0 rounded-xl sm:w-[400px]">
        <CardHeader>
          <p className="text-2xl font-semibold text-center py-0">
            Настройки профілю
          </p>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form
              /* autoComplete="off" */

              className="space-y-5"
              onSubmit={form.handleSubmit(onSubmit)}
            >
              <div className="space-y-3">
                <input
                  type="email"
                  name="fake_email"
                  className="hidden"
                  /*  style={{
                    display: none,
                  }} */

                  aria-hidden="true"
                />
                <FormField
                  control={form.control}
                  name="image"
                  render={({ field }) => (
                    <FormItem>
                      <div className="flex flex-col  items-center space-y-2 ">
                        <FormControl>
                          <FrontImageUpload
                            value={field.value ? field.value : ""}
                            disabled={isPending}
                            onChange={(url) => field.onChange(url)}
                            onRemove={() => field.onChange("")}
                          />
                        </FormControl>
                        <FormLabel>
                          Натисніть на зображенні щоб його змінити
                        </FormLabel>
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="role"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Роль</FormLabel>
                      <Select
                        disabled={isPending}
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select a role" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value={UserRole.AFFILIATE}>
                            Афіліат
                          </SelectItem>
                          <SelectItem value={UserRole.BRAND}>Бренд</SelectItem>
                          <SelectItem value={UserRole.MANAGER}>
                            Менеджер
                          </SelectItem>
                        </SelectContent>
                      </Select>
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
                        <Input
                          {...field}
                          placeholder="John Doe"
                          disabled={isPending}
                        />
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
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          placeholder="john.doe@example.com"
                          type="email"
                          disabled={isPending}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                {/* 
                <FormField
                  control={form.control}
                  name="phoneNumber"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Your phone number</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                                                   placeholder="Your phone number"
                          disabled={isPending}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                /> */}

                <FormField
                  control={form.control}
                  name="phoneNumber"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Номер телефону</FormLabel>
                      <FormControl>
                        <PhoneInputWithCountry
                          defaultCountry="UA"
                          {...field}
                          className={
                            " phone-input flex h-9 w-full rounded-lg border border-input dark:border-blue-from " +
                            " bg-transparent dark:bg-dark-additional-bg/40" +
                            " px-3 py-1 text-sm shadow-sm " +
                            " transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium " +
                            " placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 " +
                            " focus-visible:ring-blue-from " +
                            " disabled:cursor-not-allowed disabled:opacity-50 "
                          }
                        />
                        {/*   <Input
                          
                          
                          placeholder="Your phone number"
                          disabled={isPending}
                        /> */}
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="address"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Адреса</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          placeholder="Адреса"
                          disabled={isPending}
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
                      <FormLabel>
                        Пароль (ввести потрібно тільки для зміни пароля)
                      </FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Input
                            {...field}
                            /*  autoСomplete="false" */
                            /*  autoComplete="off" */

                            disabled={isPending}
                            placeholder="Пароль"
                            type={visible ? "text" : "password"}
                            /* type="password" */
                          />
                          <p
                            onClick={() => setVisible(!visible)}
                            className="absolute right-[-20px] top-[8px] h-10 w-12 cursor-pointer border-none text-xl"
                          >
                            {visible ? <BsEyeSlash /> : <BsEye />}
                          </p>
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="newPassword"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        Новий пароль (ввести потрібно тільки для зміни пароля)
                      </FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Input
                            {...field}
                            disabled={isPending}
                            placeholder="Новий пароль"
                            type={visible ? "text" : "password"}
                            /* type="password" */
                          />
                          <p
                            onClick={() => setVisible(!visible)}
                            className="absolute right-[-20px] top-[8px] h-10 w-12 cursor-pointer border-none text-xl"
                          >
                            {visible ? <BsEyeSlash /> : <BsEye />}
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

              {/* <MyButton disabled={isPending} type="submit">
              Save
            </MyButton>
             !text-sm !py-2   !px-10 !rounded-lg  */}
              <Button
                size="sm"
                type="submit"
                disabled={isPending}
                className=" main-button        "
              >
                Зберегти зміни
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
};

export default SettingsClientInter;
