"use client";

import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTransition, useState, useEffect } from "react";

import { useParams, useRouter } from "next/navigation";
import { ImagePlus, Trash } from "lucide-react";
import { Plus } from "lucide-react";
import { OfferSchema } from "@/schemas";
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
import { createOffer } from "@/actions/offer/createOffer";
import { getOffer } from "@/actions/offer/getOffer";
import { Offer } from "@prisma/client";
import { editOffer } from "@/actions/offer/editOffer";
import CurrencyInput from "../../../../components/currency-input";

interface OfferModalProps {
  isOpen: boolean;
  onClose: () => void;
  id?: number;
}

export const OfferModal: React.FC<OfferModalProps> = ({
  isOpen,
  onClose,
  id,
}) => {
  const router = useRouter();
  const user = useCurrentUser();
  //console.log("user form  OfferModal: ", user);
  //console.log("id form  OfferModal: ", id);
  // const [initOffer, setInitOffer] = useState<Offer | undefined>();

  const [error, setError] = useState<string | undefined>();
  const [success, setSuccess] = useState<string | undefined>();
  const [open, setOpen] = useState(false);
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    if (isOpen && id && !isNaN(id)) {
      console.log("getOffer run in OfferModal: ", id);
      startTransition(() => {
        getOffer(id)
          .then((data) => {
            if (data.error) {
              //setSuccess(undefined);
              //setError(data.error);
              console.log("error in getOffer run in OfferModal: ", data.error);
            }
            if (data.success) {
              setError(undefined);
              //setSuccess("Created a offer " + data.success);
              console.log("data.success in OfferModal: ", data.success);
              const initObj = JSON.parse(data.success);
              form.setValue("authorId", initObj.authorId);
              form.setValue("name", initObj.name);
              form.setValue("brand", initObj.brand);
              form.setValue("price", Number(initObj.price));
              form.setValue("balance", Number(initObj.balance));
              //setInitOffer(JSON.parse(data.success));

              //router.refresh();
              //toast.success("Offer was created");
              //setSuccess(undefined);
              //form.reset();
              //onClose();
              //router.refresh();
              //router.push("/media-channels");
            }
          })
          .catch(() =>
            console.log("Some error in getOffer run in OfferModal: ")
          );
      });
    }
  }, [isOpen, id]);

  // console.log("initOffer BEFORE form in OfferModal: ", initOffer);
  const form = useForm<z.infer<typeof OfferSchema>>({
    resolver: zodResolver(OfferSchema),
    defaultValues: {
      /*   authorId: initOffer?.authorId || user?.id,
      name: initOffer?.name || "",
      brand: initOffer?.brand || "",
      price: (initOffer?.price as unknown as number) || undefined,
      balance: (initOffer?.balance as unknown as number) || undefined, */
      authorId: user?.id,
      name: "",
      brand: "",
      price: undefined,
      balance: undefined,
    },
  });

  /*  useEffect(() => {
    console.log("reset run in OfferModal: ", id, initOffer, form);
    if (id && initOffer) {
      form.reset();
    }
  }, [initOffer, id, form]); */

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

  const onSubmit = (values: z.infer<typeof OfferSchema>) => {
    console.log("values from  OfferModal: ", values);

    startTransition(() => {
      id
        ? editOffer({ ...values, id: id })
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
                toast.success("Offer was updated");
                setSuccess(undefined);
                form.reset();
                onClose();
                // router.push("/media-channels");
              }
            })
            .catch(() => setError("Щось пішло не так!"))
        : createOffer(values)
            .then((data) => {
              if (data.error) {
                setSuccess(undefined);
                setError(data.error);
              }

              if (data.success) {
                setError(undefined);
                //setSuccess("Created a offer " + data.success);
                console.log("data.success: ", data.success);
                router.refresh();
                toast.success("Offer was created");
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
      title="Create a offer"
      description=""
      isOpen={isOpen}
      onClose={onClose}
    >
      <Form {...form}>
        <form className="space-y-5 " onSubmit={form.handleSubmit(onSubmit)}>
          <div className="space-y-3 ">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Offer name</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="Offer name"
                      disabled={isPending}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="brand"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Brand name</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="Brand name"
                      disabled={isPending}
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

            <FormField
              control={form.control}
              name="balance"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Balance</FormLabel>
                  <FormControl>
                    {/*   <Input
                      {...field}
                      placeholder="1000.00"
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

          <div className="flex flex-row justify-between gap-2 w-full">
            <Button
              size="sm"
              type="button"
              onClick={onClose}
              className=" bg-[#F5F6F7] hover:bg-[#e2e4e5] py-5 px-8 text-base font-normal text-black rounded-full "
            >
              Cancel
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
              {!id ? (
                <div className="flex flex-row gap-2 items-center justify-center">
                  <Plus className="h-4 w-4 mr-2" />
                  <p>Create</p>
                </div>
              ) : (
                <div className="flex flex-row gap-2 items-center justify-center ">
                  <Plus className="h-4 w-4 mr-2" />
                  <p>Edit</p>
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
                    onClick={()=>CreateOffer()}
          className=" danger-button       "
        >
          Create
        </Button>
       
      </div> */}
    </Modal>
  );
};
