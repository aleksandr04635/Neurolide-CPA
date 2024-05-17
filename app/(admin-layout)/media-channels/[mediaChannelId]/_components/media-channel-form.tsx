"use client";

import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTransition, useState, useEffect } from "react";

import { useParams, useRouter } from "next/navigation";

import { AlertModal } from "@/components/ui/alert-modal";
import { MediaChannelSchema } from "@/schemas";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

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
import { MediaChannel, User, UserRole } from "@prisma/client";

import FrontImageUpload from "./front-image-upload";
import { DEFAULT_MEDIA_CHANNEL_IMAGE } from "@/lib/utils";
import { createMediaChannel } from "@/actions/media-channel/createMediaChannel";
import { editMediaChannel } from "@/actions/media-channel/editMediaChannel";
import { deleteMediaChannel } from "@/actions/media-channel/deleteMediaChannel";
import CurrencyInput from "@/components/currency-input";
import NumberInput from "@/components/number-input";

type Props = { initialData: MediaChannel | null };

// async
const MediaChannelForm = ({ initialData }: Props) => {
  const router = useRouter();
  const user = useCurrentUser();
  //console.log("user form  MediaChannelForm: ", user);
  //console.log("initialData form  MediaChannelForm: ", initialData);
  //const user = initialData;

  const [error, setError] = useState<string | undefined>();
  const [success, setSuccess] = useState<string | undefined>();
  const [open, setOpen] = useState(false);
  const [isPending, startTransition] = useTransition();

  const [visible, setVisible] = useState(false);

  const form = useForm<z.infer<typeof MediaChannelSchema>>({
    resolver: zodResolver(MediaChannelSchema),
    defaultValues: {
      userId: initialData?.userId || user?.id,
      image: initialData?.image || DEFAULT_MEDIA_CHANNEL_IMAGE,
      name: initialData?.name || undefined,
      description: initialData?.description || undefined,
      subscribers: initialData?.subscribers || undefined,
      views: initialData?.views || undefined,
      price: (initialData?.price as unknown as number) || undefined,
    },
    //mode: “onChange”
  });

  /*   const watchAllFields = form.watch();
  useEffect(() => {
    console.log("watchAllFields from ProductForm: ", watchAllFields);
  }, [watchAllFields, initialData]); */
  /* console.log(
    "watchAllFields?.subscribers?.toString() from  MediaChannelForm: ",
    watchAllFields?.subscribers?.toString()
  ); */

  //console.log("form from  MediaChannelForm: ", form);

  const onSubmit = (values: z.infer<typeof MediaChannelSchema>) => {
    console.log("values from  MediaChannelForm: ", values);
    /*  console.log(
      "values?.subscribers?.toString() from  MediaChannelForm: ",
      values?.subscribers?.toString()
    ); */
    startTransition(() => {
      initialData
        ? editMediaChannel({ ...values, id: initialData.id })
            .then((data) => {
              if (data.error) {
                setSuccess(undefined);
                setError(data.error);
              }

              if (data.success) {
                setError(undefined);
                setSuccess("Updated a media channel " + data.success);
                console.log("data.success: ", data.success);
                router.refresh();
                router.push("/media-channels");
              }
            })
            .catch(() => setError("Щось пішло не так!"))
        : createMediaChannel(values)
            .then((data) => {
              if (data.error) {
                setSuccess(undefined);
                setError(data.error);
              }

              if (data.success) {
                setError(undefined);
                setSuccess("Created a media channel " + data.success);
                console.log("data.success: ", data.success);
                router.refresh();
                router.push("/media-channels");
              }
            })
            .catch(() => setError("Щось пішло не так!"));
    });
  };

  const onDelete = () => {
    if (initialData && initialData.id) {
      setOpen(false);
      startTransition(() => {
        deleteMediaChannel(initialData.id)
          .then((data) => {
            if (data.error) {
              setError(data.error);
            }
            if (data.success) {
              router.refresh();
              router.push("/media-channels");
            }
          })
          .catch(() => setError("Щось пішло не так!"));
      });
    }
  };

  //max-w-[600px] lg:w-[600px]
  return (
    <div className=" w-full  shadow-none  border-0 rounded-xl flex items-center justify-center bg-white">
      <AlertModal
        isOpen={open}
        onClose={() => setOpen(false)}
        onConfirm={onDelete}
        loading={isPending}
      />
      <Card className=" w-full  shadow-none  border-0 rounded-xl sm:w-[400px]">
        <CardHeader>
          <p className="text-2xl font-semibold text-center py-0">
            {initialData ? "Edit a media channel" : "Create a media channel"}
          </p>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form className="space-y-5" onSubmit={form.handleSubmit(onSubmit)}>
              <div className="space-y-3">
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
                        <FormLabel>Click the image to change it</FormLabel>
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
                      <FormLabel>Channel name</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          placeholder="Channel name"
                          disabled={isPending}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Channel description</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          placeholder="Channel description"
                          disabled={isPending}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="subscribers"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Number of subscribers</FormLabel>
                      <FormControl>
                        {/* <Input
                          {...field}
                          placeholder="1000"
                          type="text"
                          disabled={isPending}
                        /> */}
                        <NumberInput
                          disabled={isPending}
                          value={field.value}
                          onValueChange={(value: any) => field.onChange(value)}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="views"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Number of views</FormLabel>
                      <FormControl>
                        {/*  <Input
                          {...field}
                          placeholder="10000"
                          disabled={isPending}
                        /> */}
                        <NumberInput
                          disabled={isPending}
                          value={field.value}
                          onValueChange={(value: any) => field.onChange(value)}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="price"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Price</FormLabel>
                      <FormControl>
                        {/*  <Input
                          {...field}
                          placeholder="100.00"
                          disabled={isPending}
                        /> */}
                        <CurrencyInput
                          disabled={isPending}
                          value={field.value}
                          onValueChange={(value) => field.onChange(value)}
                        />
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

              <div className="flex flex-row gap-2">
                <Button
                  size="sm"
                  type="submit"
                  disabled={isPending}
                  className=" main-button        "
                >
                  Save
                </Button>
                {initialData && (
                  <Button
                    size="sm"
                    type="button"
                    disabled={isPending}
                    onClick={() => setOpen(true)}
                    className=" danger-button       "
                  >
                    Delete
                  </Button>
                  /*  <MyButton
                    type="button"
                    className=" "
                    style="danger"
                    onClick={() => setOpen(true)}
                  >
                    <Trash className="mr-2 h-4 w-4" /> Delete
                  </MyButton> */
                )}
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
};

export default MediaChannelForm;
/* disabled={form.formState.isValid} */
