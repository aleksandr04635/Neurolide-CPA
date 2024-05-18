"use client";

import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTransition, useState, useEffect } from "react";

import { useParams, useRouter } from "next/navigation";
import { ImagePlus, Trash } from "lucide-react";
import { Plus } from "lucide-react";
import { MediaChannelSchema } from "@/schemas";
import { toast } from "react-hot-toast";

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
import { Modal } from "@/components/ui/modal";

import { MediaChannel } from "@prisma/client";

import CurrencyInput from "../../../../components/currency-input";
import { editMediaChannel } from "@/actions/media-channel/editMediaChannel";
import { createMediaChannel } from "@/actions/media-channel/createMediaChannel";
import { MediaChannelColumn } from "./columns";
import { DEFAULT_MEDIA_CHANNEL_IMAGE } from "@/lib/utils";
import NumberInput from "@/components/number-input";
import FrontImageUpload from "./front-image-upload";
import { Switch } from "@/components/ui/switch";

interface MediaChannelModalProps {
  isOpen: boolean;
  onClose: () => void;
  id?: number;
  data?: MediaChannelColumn;
}

export const MediaChannelModal: React.FC<MediaChannelModalProps> = ({
  isOpen,
  onClose,
  id,
  data,
}) => {
  const router = useRouter();
  const user = useCurrentUser();
  //console.log("user form  MediaChannelModal: ", user);
  // console.log("data from media-channels CellAction:", data);
  //console.log("id form  MediaChannelModal: ", id);
  // const [initMediaChannel, setInitMediaChannel] = useState<MediaChannel | undefined>();

  const [error, setError] = useState<string | undefined>();
  const [success, setSuccess] = useState<string | undefined>();
  const [open, setOpen] = useState(false);

  const [isPending, startTransition] = useTransition();

  /*  useEffect(() => {
    if (isOpen && id && !isNaN(id)) {
      console.log("getMediaChannel run in MediaChannelModal: ", id);
      startTransition(() => {
        getMediaChannel(id)
          .then((data) => {
            if (data.error) {
              //setSuccess(undefined);
              //setError(data.error);
              console.log(
                "error in getMediaChannel run in MediaChannelModal: ",
                data.error
              );
            }
            if (data.success) {
              setError(undefined);
              //setSuccess("Created a mediaChannel " + data.success);
              console.log("data.success in MediaChannelModal: ", data.success);
              const initObj = JSON.parse(data.success);
              form.setValue("authorId", initObj.authorId);
              form.setValue("name", initObj.name);
              form.setValue("brand", initObj.brand);
              form.setValue("price", Number(initObj.price));
              form.setValue("balance", Number(initObj.balance));
              //setInitMediaChannel(JSON.parse(data.success));

              //router.refresh();
              //toast.success("MediaChannel was created");
              //setSuccess(undefined);
              //form.reset();
              //onClose();
              //router.refresh();
              //router.push("/media-channels");
            }
          })
          .catch(() =>
            console.log(
              "Some error in getMediaChannel run in MediaChannelModal: "
            )
          );
      });
    }
  }, [isOpen, id]); */

  // console.log("initMediaChannel BEFORE form in MediaChannelModal: ", initMediaChannel);
  const form = useForm<z.infer<typeof MediaChannelSchema>>({
    resolver: zodResolver(MediaChannelSchema),
    defaultValues: {
      /* authorId: user?.id,
      name: "",
      brand: "",
      price: undefined,
      balance: undefined, */
      userId: data?.userId || user?.id,
      image: data?.image || DEFAULT_MEDIA_CHANNEL_IMAGE,
      name: data?.name || undefined,
      link: data?.link || undefined,
      description: data?.description || undefined,
      subscribers: data?.subscribers || undefined,
      views: data?.views || undefined,
      price: data?.price || undefined, //as unknown as number
      isVIP: data?.isVIP || undefined,
      isVerified: data?.isVerified || undefined,
    },
  });

  /*  useEffect(() => {
    console.log("reset run in MediaChannelModal: ", id, initMediaChannel, form);
    if (id && initMediaChannel) {
      form.reset();
    }
  }, [initMediaChannel, id, form]); */

  /* const watchAllFields = form.watch();
  useEffect(() => {
    console.log("watchAllFields from MediaChannelForm: ", watchAllFields);
  }, [watchAllFields]); */

  /*  const {
    register,
    handleSubmit,
    formState: { errors },
  } = form;
  useEffect(() => {
    console.log("errors from MediaChannelForm: ", errors);
  }, [errors]);
 */
  /*   const [isMounted, setIsMounted] = useState(false);
  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  } */

  const onSubmit = (values: z.infer<typeof MediaChannelSchema>) => {
    console.log("values from  MediaChannelModal: ", values);

    startTransition(() => {
      data
        ? editMediaChannel({ ...values, id: data.id })
            .then((data) => {
              if (data.error) {
                setSuccess(undefined);
                setError(data.error);
              }

              if (data.success) {
                setError(undefined);
                //setSuccess("Updated a media channel " + data.success);
                console.log("data.success: ", data.success);
                router.refresh();
                toast.success("Медіа канал було оновлено");
                setSuccess(undefined);
                //form.reset();
                onClose();
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
                //setSuccess("Created a mediaChannel " + data.success);
                console.log("data.success: ", data.success);
                router.refresh();
                toast.success("Медіа канал було створено");
                setSuccess(undefined);
                form.reset();
                onClose();
                //router.refresh();
                //router.push("/media-channels");
              }
            })
            .catch(() => setError("Щось пішло не так!"));
    });
  };

  return (
    <Modal
      title={data ? `Редагувати канал` : "Додати новий канал"}
      description=""
      isOpen={isOpen}
      onClose={onClose}
    >
      <Form {...form}>
        <form className="space-y-5 " onSubmit={form.handleSubmit(onSubmit)}>
          <div className="space-y-2 ">
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
                      Натисніть на зображенні щоб змінити його
                    </FormLabel>
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
                  <FormLabel>Назва</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="Назва"
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
                  <FormLabel>Короткий опис</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="Короткий опис"
                      disabled={isPending}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="link"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Посилання</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="Посилання"
                      disabled={isPending}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex flex-row items-center justify-between gap-2 w-full">
              <FormField
                control={form.control}
                name="subscribers"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>Підписники</FormLabel>
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
                  <FormItem className="w-full">
                    <FormLabel>Перегляди</FormLabel>
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
            </div>

            <FormField
              control={form.control}
              name="price"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Ціна</FormLabel>
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

            {user?.role === "MANAGER" && (
              <div className="flex flex-row items-center justify-between gap-2 w-full">
                <FormField
                  control={form.control}
                  name="isVerified"
                  render={({ field }) => (
                    <FormItem
                      className="flex flex-row items-center justify-between rounded-lg 
                    border border-gray-200 dark:border-gray-500 p-2 shadow-sm w-full"
                    >
                      <div className="space-y-0.5">
                        <FormLabel>Верифіковано</FormLabel>
                        {/*  <FormDescription>
                      Enable two factor authentication for your account
                    </FormDescription> */}
                      </div>
                      <FormControl>
                        <Switch
                          disabled={isPending}
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="isVIP"
                  render={({ field }) => (
                    <FormItem
                      className="flex flex-row items-center justify-between rounded-lg 
                    border border-gray-200 dark:border-gray-500 p-2 shadow-sm w-full"
                    >
                      <div className="space-y-0.5">
                        <FormLabel>VIP статус</FormLabel>
                        {/*  <FormDescription>
                      Enable two factor authentication for your account
                    </FormDescription> */}
                      </div>
                      <FormControl>
                        <Switch
                          disabled={isPending}
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>
            )}
          </div>
          <FormError message={error} />
          <FormSuccess message={success} />

          <div className="flex flex-row justify-between gap-4 w-full">
            {/* <Button
              size="sm"
              onClick={() => setOpen(true)}
              className=" main-button    "
            >
              Додати канал
            </Button> */}
            <Button
              size="sm"
              type="button"
              onClick={onClose}
              className=" gray-button w-full !rounded-full "
            >
              <div className="flex   items-center justify-center  pb-1">
                Відмінити
              </div>
            </Button>
            <Button
              size="sm"
              type="submit"
              disabled={isPending}
              className=" main-button w-full !rounded-full    
              flex flex-row items-center justify-center    "
            >
              {!data ? (
                <div className="flex flex-row gap-2 items-center justify-center  ">
                  <Plus className="h-4 w-4  " />
                  <div className="flex   items-center justify-center pb-1 ">
                    Додати
                  </div>
                </div>
              ) : (
                <div className="flex flex-row gap-2 items-center justify-center  ">
                  {/* <Plus className="h-4 w-4 mr-2 pt-1" /> */}
                  <div className="flex   items-center justify-center pb-1 ">
                    Редагувати
                  </div>
                </div>
              )}
            </Button>
          </div>
        </form>
      </Form>
      {/*  <div className="pt-6 space-x-2 flex items-center justify-end w-full">
        <Button
          size="sm"
                    onClick={onClose}
          className=" main-button        "
        >
          Cancel
        </Button>
        <Button
          size="sm"
          type="button"
                    onClick={()=>CreateMediaChannel()}
          className=" danger-button       "
        >
          Create
        </Button>
       
      </div> */}
    </Modal>
  );
};
