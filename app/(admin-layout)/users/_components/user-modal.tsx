"use client";

import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTransition, useState, useEffect } from "react";

import { useParams, useRouter } from "next/navigation";
import { ImagePlus, Trash } from "lucide-react";
import { Plus } from "lucide-react";

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

import { User } from "@prisma/client";

import { UsersColumn } from "./columns";
import { editUser } from "@/actions/user/edit-user";
import CurrencyInput from "@/components/currency-input";
import NumberInput from "@/components/number-input";
import { UserSchema } from "@/schemas";
import { WideModal } from "./wide-modal";
import { formatter } from "@/lib/utils";

interface UserModalProps {
  isOpen: boolean;
  onClose: () => void;
  data: UsersColumn;
}

export const UserModal: React.FC<UserModalProps> = ({
  isOpen,
  onClose,
  data,
}) => {
  const router = useRouter();
  const user = useCurrentUser();
  //console.log("user form  UserModal: ", user);
  //console.log("data form  UserModal: ", data);
  // const [initUser, setInitUser] = useState<User | undefined>();

  const [error, setError] = useState<string | undefined>();
  const [success, setSuccess] = useState<string | undefined>();
  const [open, setOpen] = useState(false);
  const [isPending, startTransition] = useTransition();

  /* useEffect(() => {
    if (isOpen && id && !isNaN(id)) {
      console.log("getUser run in UserModal: ", id);
      startTransition(() => {
        getUser(id)
          .then((data) => {
            if (data.error) {
              //setSuccess(undefined);
              //setError(data.error);
              console.log("error in getUser run in UserModal: ", data.error);
            }
            if (data.success) {
              setError(undefined);
              //setSuccess("Created a user " + data.success);
              console.log("data.success in UserModal: ", data.success);
              const initObj = JSON.parse(data.success);
              form.setValue("authorId", initObj.authorId);
              form.setValue("name", initObj.name);
              form.setValue("brand", initObj.brand);
              form.setValue("price", Number(initObj.price));
              form.setValue("balance", Number(initObj.balance));
              //setInitUser(JSON.parse(data.success));

              //router.refresh();
              //toast.success("User was created");
              //setSuccess(undefined);
              //form.reset();
              //onClose();
              //router.refresh();
              //router.push("/media-channels");
            }
          })
          .catch(() => console.log("Some error in getUser run in UserModal: "));
      });
    }
  }, [isOpen, id]); */

  // console.log("initUser BEFORE form in UserModal: ", initUser);
  /*   const form = useForm<z.infer<typeof OfferSchema>>({
    resolver: zodResolver(OfferSchema),
    defaultValues: {
     
      authorId: user?.id,
      name: "",
      brand: "",
      price: undefined,
      balance: undefined,
    },
  }); */
  const form = useForm<z.infer<typeof UserSchema>>({
    resolver: zodResolver(UserSchema),
    defaultValues: {
      accruals: data.accruals,
      address: data.address,
      balance: data.balance,
      budget: data.budget,
      clicks: data.clicks,
      hold: data.hold,
      index: data.index,
      lids: data.lids,
      name: data.name,
      notifications: data.notifications,
      payments: data.payments,
      phoneNumber: data.phoneNumber,
      role:
        data.role == "MANAGER"
          ? "MANAGER"
          : data.role == "BRAND"
          ? "BRAND"
          : "AFFILIATE",
      writeoffs: data.writeoffs,
    },
  });

  //console.log("form form in UserModal: ", form);

  /* const {
    register,
    handleSubmit,
    formState: { errors },
  } = form;
  useEffect(() => {
    console.log("errors from ProductForm: ", errors);
  }, [errors]); */
  /*   index    Decimal @default(0)
  payments Decimal @default(0)
  budget   Decimal @default(0)

  lids      Int     @default(0)
  writeoffs Decimal @default(0)
  balance   Decimal @default(0)

  clicks   Int     @default(0)
  hold     Int     @default(0)
  accruals Decimal @default(0)

  notifications Int @default(0) */

  /*  useEffect(() => {
    console.log("reset run in UserModal: ", id, initUser, form);
    if (id && initUser) {
      form.reset();
    }
  }, [initUser, id, form]); */

  /*  const watchAllFields = form.watch();
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

  const onSubmit = (values: z.infer<typeof UserSchema>) => {
    console.log("values from onSubmit from UserModal: ", values);

    startTransition(() => {
      editUser({ ...values, id: data.id })
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
            toast.success("Дані користувача було оновлено");
            setSuccess(undefined);
            // form.reset();
            onClose();
          }
        })
        .catch(() => setError("Щось пішло не так!"));
    });
  };
  /*  const onSubmit = () => {
    console.log("submit from  UserModal: ");
  }; */
  //const onSubmit = (data: any) => console.log("submit", data);
  return (
    <WideModal
      title={`Дані користувача ${data.name} з поштою ${data.email}`}
      description=""
      isOpen={isOpen}
      onClose={onClose}
    >
      <Form {...form}>
        <form className="space-y-5 " onSubmit={form.handleSubmit(onSubmit)}>
          <div className="space-y-3 ">
            <div className=" w-full  flex flex-col sm:flex-row items-center justify-between gap-2">
              {data.role == "AFFILIATE" && (
                <>
                  <div className="w-full  h-[100px] bg-white rounded-lg flex flex-col overflow-hidden border">
                    <div className="h-full flex flex-col justify-center p-1 ">
                      <div className="text-gray-text text-sm pl-2">Кліки</div>
                      <div className="text-black text-lg font-semibold pl-2">
                        {data?.clicks}
                      </div>
                      <FormField
                        control={form.control}
                        name="clicks"
                        render={({ field }) => (
                          <FormItem>
                            <FormControl>
                              <NumberInput
                                disabled={isPending}
                                value={field.value}
                                onValueChange={(value: any) =>
                                  field.onChange(value)
                                }
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    <div className="w-full h-[8px] bg-[#FF0000]"></div>
                  </div>

                  <div className="w-full  h-[100px] bg-white rounded-lg flex flex-col overflow-hidden border">
                    <div className="h-full flex flex-col justify-center p-1 ">
                      <div className="text-gray-text text-sm pl-2">Холд</div>
                      <div className="text-black text-lg font-semibold pl-2">
                        {data?.hold.toString()}
                      </div>
                      <FormField
                        control={form.control}
                        name="hold"
                        render={({ field }) => (
                          <FormItem>
                            <FormControl>
                              <NumberInput
                                disabled={isPending}
                                value={field.value}
                                onValueChange={(value: any) =>
                                  field.onChange(value)
                                }
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    <div className="w-full h-[8px] bg-[#FFD600]"></div>
                  </div>
                  <div className="w-full  h-[100px] bg-white rounded-lg flex flex-col overflow-hidden border">
                    <div className="h-full flex flex-col justify-center p-1 ">
                      <div className="text-gray-text text-sm place-content-center-2">
                        Нарахування
                      </div>
                      <div className="text-black text-lg font-semibold pl-2">
                        {formatter.format(data?.accruals as unknown as number)}
                      </div>
                      <FormField
                        control={form.control}
                        name="accruals"
                        render={({ field }) => (
                          <FormItem>
                            <FormControl>
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
                    <div className="w-full h-[8px] bg-[#0FB600]"></div>
                  </div>
                </>
              )}

              {data.role == "BRAND" && (
                <>
                  <div className="w-full  h-[100px] bg-white rounded-lg flex flex-col overflow-hidden border">
                    <div className="h-full flex flex-col justify-center p-1 ">
                      <div className="text-gray-text text-sm">Ліди</div>
                      <div className="text-black text-lg font-semibold">
                        {data?.lids}
                      </div>
                      <FormField
                        control={form.control}
                        name="lids"
                        render={({ field }) => (
                          <FormItem>
                            <FormControl>
                              <NumberInput
                                disabled={isPending}
                                value={field.value}
                                onValueChange={(value: any) =>
                                  field.onChange(value)
                                }
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    <div className="w-full h-[8px] bg-[#FF0000]"></div>
                  </div>
                  <div className="w-full  h-[100px] bg-white rounded-lg flex flex-col overflow-hidden border">
                    <div className="h-full flex flex-col justify-center p-1 ">
                      <div className="text-gray-text text-sm pl-2">
                        Списання
                      </div>
                      <div className="text-black text-lg font-semibold pl-2">
                        {formatter.format(data?.writeoffs as unknown as number)}
                      </div>
                      <FormField
                        control={form.control}
                        name="writeoffs"
                        render={({ field }) => (
                          <FormItem>
                            <FormControl>
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
                    <div className="w-full h-[8px] bg-[#FFD600]"></div>
                  </div>
                  <div className="w-full  h-[100px] bg-white rounded-lg flex flex-col overflow-hidden border">
                    <div className="h-full flex flex-col justify-center p-1 ">
                      <div className="text-gray-text text-sm pl-2">Баланс</div>
                      <div className="text-black text-lg font-semibold pl-2">
                        {formatter.format(data?.balance as unknown as number)}
                      </div>
                      <FormField
                        control={form.control}
                        name="balance"
                        render={({ field }) => (
                          <FormItem>
                            <FormControl>
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
                    <div className="w-full h-[8px] bg-[#0FB600]"></div>
                  </div>
                </>
              )}

              {data.role == "MANAGER" && (
                <>
                  <div className="w-full  h-[100px] bg-white rounded-lg flex flex-col overflow-hidden border">
                    <div className="h-full flex flex-col justify-center p-1  ">
                      <div className="text-gray-text text-sm pl-2">Індекс</div>
                      <div className="text-black text-lg font-semibold pl-2">
                        {formatter.format(data?.index as unknown as number)}
                      </div>
                      <FormField
                        control={form.control}
                        name="index"
                        render={({ field }) => (
                          <FormItem>
                            <FormControl>
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
                    <div className="w-full h-[8px] bg-[#FF0000]"></div>
                  </div>
                  <div className="w-full  h-[100px] bg-white rounded-lg flex flex-col overflow-hidden border">
                    <div className="h-full flex flex-col justify-center p-1  ">
                      <div className="text-gray-text text-sm pl-2">Виплати</div>
                      <div className="text-black text-lg font-semibold pl-2">
                        {formatter.format(data?.payments as unknown as number)}
                      </div>
                      <FormField
                        control={form.control}
                        name="payments"
                        render={({ field }) => (
                          <FormItem>
                            <FormControl>
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
                    <div className="w-full h-[8px] bg-[#FFD600]"></div>
                  </div>
                  <div className="w-full  h-[100px] bg-white rounded-lg flex flex-col overflow-hidden border">
                    <div className="h-full flex flex-col justify-center p-1 ">
                      <div className="text-gray-text text-sm pl-2">Бюджет</div>
                      <div className="text-black text-lg font-semibold pl-2">
                        {formatter.format(data?.budget as unknown as number)}
                      </div>
                      <FormField
                        control={form.control}
                        name="budget"
                        render={({ field }) => (
                          <FormItem>
                            <FormControl>
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
                    <div className="w-full h-[8px] bg-[#0FB600]"></div>
                  </div>
                </>
              )}

              <div className="w-full  h-[100px] bg-white rounded-lg flex flex-col overflow-hidden border">
                <div className="h-full flex flex-col justify-center p-1  ">
                  <div className="text-gray-text text-sm pl-2">Сповіщення</div>
                  <div className="text-black text-lg font-semibold pl-2">
                    {data?.notifications}
                  </div>
                  <FormField
                    control={form.control}
                    name="notifications"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <NumberInput
                            disabled={isPending}
                            value={field.value}
                            onValueChange={(value: any) =>
                              field.onChange(value)
                            }
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="w-full h-[8px] bg-[#9E00FF]"></div>
              </div>
            </div>

            {/*    {data.role == "MANAGER" && (
              <>
                <FormField
                  control={form.control}
                  name="index"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Індекс</FormLabel>
                      <FormControl>
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
                  name="payments"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Виплати</FormLabel>
                      <FormControl>
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
                  name="budget"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Бюджет</FormLabel>
                      <FormControl>
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
                  name="notifications"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Сповіщення</FormLabel>
                      <FormControl>
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
              </>
            )} */}
          </div>

          <FormError message={error} />
          <FormSuccess message={success} />

          <div className="flex flex-row justify-between gap-2 w-full">
            <Button
              size="sm"
              type="button"
              onClick={onClose}
              className="  gray-button "
              /* className=" bg-[#F5F6F7] hover:bg-[#e2e4e5] py-5 px-8 text-base font-normal text-black rounded-full " */
            >
              Відмінити
            </Button>
            <Button
              size="sm"
              type="submit"
              disabled={isPending}
              className="  main-button  "
              /*  className=" py-5 px-8 text-base font-normal text-white rounded-full
              bg-gradient-to-r from-blue-from via-blue-via to-blue-to
              hover:from-blue-500 hover:via-blue-1000 hover:to-blue-900    
              flex flex-row items-center justify-center    " */
            >
              <div className="flex flex-row gap-2 items-center justify-center ">
                Змінити дані
              </div>
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
                    onClick={()=>CreateUser()}
          className=" danger-button       "
        >
          Create
        </Button>
       
      </div> */}
    </WideModal>
  );
};
