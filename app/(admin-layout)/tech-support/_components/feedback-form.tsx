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
import { FeedbackSchema } from "@/schemas";
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
import FrontImageUpload from "./file-upload";

import "react-phone-number-input/style.css";
import { Textarea } from "@/components/ui/textarea";
import { createFeedback } from "@/actions/feedback/createFeedback";

type Props = {};

// async
const FeedbackForm = ({}: Props) => {
  const router = useRouter();
  const user = useCurrentUser();
  //console.log("user form  FeedbackForm  : ", user);
  //console.log("fullUser form  FeedbackForm  : ", fullUser);

  const [error, setError] = useState<string | undefined>();
  const [success, setSuccess] = useState<string | undefined>();
  const { update } = useSession();
  const [isPending, startTransition] = useTransition();

  const [visible, setVisible] = useState(false);

  const form = useForm<z.infer<typeof FeedbackSchema>>({
    resolver: zodResolver(FeedbackSchema),
    defaultValues: {
      userId: user?.id,
      file: undefined,
      name: (user?.name || "") as string,
      email: user?.email || undefined,
      message: undefined,
    },
  });

  /*   const watchAllFields = form.watch();
  useEffect(() => {
    console.log("watchAllFields from SettingsForm: ", watchAllFields);
  }, [watchAllFields]); */
  /*   const {
    register,
    handleSubmit,
    formState: { errors },
  } = form;
  useEffect(() => {
    console.log("errors from FeedbackForm: ", errors);
  }, [errors]); */

  const onSubmit = (values: z.infer<typeof FeedbackSchema>) => {
    startTransition(() => {
      createFeedback(values)
        .then((data) => {
          if (data.error) {
            setSuccess(undefined);
            setError(data.error);
          }

          if (data.success) {
            // update(); //updates the session on the client side. update from the server side doesn't work immediately
            setError(undefined);
            //setSuccess(data.success.toString());
            setSuccess("Фідбек відіслано");
            //router.push("/");
          }
        })
        .catch(() => setError("Щось пішло не так!"));
    });
  };

  //max-w-[600px] lg:w-[600px]
  return (
    <div
      className=" w-full  shadow-none  border-0 rounded-xl flex flex-col items-center justify-center bg-white
     pt-1 px-2 pb-2 gap-0"
    >
      <p className="text-lg font-semibold text-center py-0">
        Зворотній зв’язок
      </p>
      {/*  <Card className=" w-full  shadow-none  border-0 rounded-xl ">
        <CardHeader>
          <p className="text-xl font-semibold text-center py-0">
            Зворотній зв’язок
          </p>
        </CardHeader>
        <CardContent> */}
      <Form {...form}>
        <form
          /* autoComplete="off" */
          className="space-y-3 w-full "
          onSubmit={form.handleSubmit(onSubmit)}
        >
          <div className="space-y-3 w-full">
            <div className=" w-full flex flex-row items-center justify-between gap-2">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem className="w-full">
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
                  <FormItem className="w-full">
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
            </div>

            <FormField
              control={form.control}
              name="message"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Повідомлення</FormLabel>
                  <FormControl>
                    <Textarea
                      {...field}
                      placeholder="Повідомлення"
                      disabled={isPending}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className=" w-full flex flex-row items-center justify-between gap-2">
              {/* <Button
              size="sm"
              type="submit"
              disabled={isPending}
              className=" main-button w-full !rounded-full    
              flex flex-row items-center justify-center    "
            > */}
              <Button
                size="sm"
                type="submit"
                disabled={isPending}
                className=" main-button   !rounded-full     "
              >
                Відправити
              </Button>
              <FormField
                control={form.control}
                name="file"
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
                      {/*  <FormLabel>Додати файл</FormLabel> */}
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>
          <FormError message={error} />
          <FormSuccess message={success} />

          {/* <MyButton disabled={isPending} type="submit">
              Save
            </MyButton>
             !text-sm !py-2   !px-10 !rounded-lg  */}
        </form>
      </Form>
      {/*    </CardContent>
      </Card> */}
    </div>
  );
};

export default FeedbackForm;
