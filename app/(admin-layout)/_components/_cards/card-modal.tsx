"use client";

import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTransition, useState, useEffect } from "react";
import InputMask from "react-input-mask";

import { useParams, useRouter } from "next/navigation";
import { ImagePlus, Trash } from "lucide-react";
import { Plus } from "lucide-react";
import { CardSchema } from "@/schemas";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { settings } from "@/actions/settings";
import { toast } from "react-hot-toast";
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
import { createCard } from "@/actions/card/createCard";

interface CardModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CardModal: React.FC<CardModalProps> = ({ isOpen, onClose }) => {
  const router = useRouter();
  const user = useCurrentUser();
  //console.log("user form  CardModal: ", user);

  const [error, setError] = useState<string | undefined>();
  const [success, setSuccess] = useState<string | undefined>();
  const [open, setOpen] = useState(false);
  const [isPending, startTransition] = useTransition();

  const [visible, setVisible] = useState(false);

  const form = useForm<z.infer<typeof CardSchema>>({
    resolver: zodResolver(CardSchema),
    defaultValues: {
      userId: user?.id,
      nameOnCard: "",
      number: "",
      expirationDate: "",
      cvv: "",
    },
  });

  /* const watchAllFields = form.watch();
  useEffect(() => {
    console.log("watchAllFields from ProductForm: ", watchAllFields);
  }, [watchAllFields]); */

  /*   const [isMounted, setIsMounted] = useState(false);
  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  } */

  /* const watchAllFields = form.watch();
  useEffect(() => {
    console.log("watchAllFields from CradModal: ", watchAllFields);
  }, [watchAllFields]); */

  const onSubmit = (values: z.infer<typeof CardSchema>) => {
    console.log("values from  CardModal: ", values);

    startTransition(() => {
      createCard(values)
        .then((data) => {
          if (data.error) {
            setSuccess(undefined);
            //setError(data.error);
            toast.error("Помилка " + data.error);
          }

          if (data.success) {
            setError(undefined);
            //setSuccess("Created a media channel " + data.success);
            // setSuccess("Картку створено " );
            toast.success("Картку створено");
            console.log("data.success: ", data.success);
            onClose();
            form.reset();
            //router.refresh();
            //router.push("/media-channels");
          }
        })
        .catch(() => setError("Щось пішло не так!"));
    });
  };

  return (
    <Modal
      title="Додати нову карту"
      description=""
      isOpen={isOpen}
      onClose={onClose}
    >
      <Form {...form}>
        <form className="space-y-5 " onSubmit={form.handleSubmit(onSubmit)}>
          <div className="space-y-3 ">
            <FormField
              control={form.control}
              name="number"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Номер карти</FormLabel>
                  <FormControl>
                    {/*  <Input
                      {...field}
                      placeholder="1111 1111 1111 1111"
                      disabled={isPending}
                    /> */}
                    <InputMask
                      mask="9999 9999 9999 9999"
                      value={field.value}
                      onChange={field.onChange}
                    >
                      {/*  @ts-ignore */}
                      {(inputProps) => (
                        <input
                          {...inputProps}
                          type="text"
                          placeholder="9999 9999 9999 9999"
                          /*  className="input" */
                          className={
                            " phone-input flex h-9 w-full rounded-md border border-input dark:border-blue-from " +
                            " bg-transparent dark:bg-dark-additional-bg/40" +
                            " px-3 py-1 text-sm shadow-sm " +
                            " transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium " +
                            " placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 " +
                            " focus-visible:ring-blue-from " +
                            " disabled:cursor-not-allowed disabled:opacity-50 "
                          }
                          disableUnderline
                        />
                      )}
                    </InputMask>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="nameOnCard"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>І&apos;мя на карті</FormLabel>
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

            <div className="flex flex-row gap-2">
              <FormField
                control={form.control}
                name="cvv"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>CVC</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="123"
                        type="password"
                        disabled={isPending}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="expirationDate"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Дата завершення</FormLabel>
                    <FormControl>
                      {/*   <Input
                        {...field}
                        placeholder="12/28"
                        disabled={isPending}
                      /> */}
                      <InputMask
                        mask="99/99"
                        value={field.value}
                        onChange={field.onChange}
                      >
                        {/*  @ts-ignore */}
                        {(inputProps) => (
                          <input
                            {...inputProps}
                            type="text"
                            placeholder="12/28"
                            /* className="input" */
                            className={
                              " phone-input flex h-9 w-full rounded-md border border-input dark:border-blue-from " +
                              " bg-transparent dark:bg-dark-additional-bg/40" +
                              " px-3 py-1 text-sm shadow-sm " +
                              " transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium " +
                              " placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 " +
                              " focus-visible:ring-blue-from " +
                              " disabled:cursor-not-allowed disabled:opacity-50 "
                            }
                            disableUnderline
                          />
                        )}
                      </InputMask>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>
          <FormError message={error} />
          <FormSuccess message={success} />

          <div className="flex flex-row justify-between gap-2 w-full">
            <Button
              size="sm"
              type="button"
              onClick={onClose}
              className=" gray-button w-full !rounded-full !px-5 !py-1 "
            >
              Відмінити
            </Button>
            <Button
              size="sm"
              type="submit"
              disabled={isPending}
              className=" main-button   !rounded-full   !px-5 !py-1  "
            >
              {/*  <Plus className="h-4 w-4 mr-2" /> */}
              <p>Додати карту</p>
            </Button>
            {/*  <Button
              size="sm"
              type="button"
              onClick={onClose}
              className=" bg-[#F5F6F7] hover:bg-[#e2e4e5] py-5 px-8 text-base font-normal text-black rounded-full "
            >
              Відмінити
            </Button>
            <Button
              size="sm"
              type="submit"
              disabled={isPending}
              className=" py-5 px-8 text-base font-normal text-white rounded-full
              bg-gradient-to-r from-blue-from via-blue-via to-blue-to
              hover:from-blue-500 hover:via-blue-700 hover:to-blue-900    
              flex flex-row items-center justify-center    "
            >
              <Plus className="h-4 w-4 mr-2" />
              <p>Додати карту</p>
            </Button> */}
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
                    onClick={()=>CreateCard()}
          className=" danger-button       "
        >
          Create
        </Button>
       
      </div> */}
    </Modal>
  );
};
