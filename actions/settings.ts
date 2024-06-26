"use server";

import * as z from "zod";
import bcrypt from "bcryptjs";
import { revalidatePath, revalidateTag } from "next/cache";

import { update } from "@/auth";
import { db } from "@/lib/db";
import { SettingsSchema } from "@/schemas";
import { getUserByEmail, getUserById } from "@/data/user";
import { currentUser } from "@/lib/auth";
import { generateVerificationToken } from "@/lib/tokens";
import { sendVerificationEmail } from "@/lib/mail";

export const settings = async (values: z.infer<typeof SettingsSchema>) => {
  console.log("values upon entering from settings:", values);
  try {
    const SettingsDataParsed = SettingsSchema.parse(values);
    console.log("SettingsDataParsed from editUser: ", SettingsDataParsed);

    const user = await currentUser();

    if (!user || !user.id) {
      return { error: "Unauthorized" };
    }

    const dbUser = await getUserById(user.id);
    console.log("dbUser from settings: ", dbUser);

    if (!dbUser) {
      return { error: "Unauthorized" };
    }

    if (values.email && values.email !== user.email) {
      //if an email is changed
      const existingUser = await getUserByEmail(values.email);
      if (existingUser && existingUser.id !== user.id) {
        return { error: "Email already in use!" };
      }
      const verificationToken = await generateVerificationToken(values.email);
      await sendVerificationEmail(
        verificationToken.email,
        verificationToken.token,
        "/settings"
      );
      return { success: "Verification email sent!" };
    }

    if (values.password && values.newPassword && dbUser.password) {
      const passwordsMatch = await bcrypt.compare(
        values.password,
        dbUser.password
      );
      console.log("passwordsMatch from settings: ", passwordsMatch);
      if (!passwordsMatch) {
        return { error: "Невірний пароль!" };
      }
      const hashedPassword = await bcrypt.hash(values.newPassword, 10);
      values.password = hashedPassword;
      values.newPassword = undefined;
    } else {
      values.password = undefined;
      values.newPassword = undefined;
    }

    if (values.phoneNumber && values.phoneNumber == "null") {
      //console.log("change from settings:");
      values.phoneNumber = "Не введено";
      // console.log("values1 from settings:", values);
    }
    //console.log("values2 from settings:", values);

    console.log("values before updatedUser from settings:", values);
    const updatedUser = await db.user.update({
      where: { id: dbUser.id },
      data: {
        ...values,
      },
    });
    console.log("updatedUser from settings:", updatedUser);
    update({
      //updates session
      user: {
        image: updatedUser.image,
        name: updatedUser.name,
        email: updatedUser.email,

        role: updatedUser.role,
      },
    });
    revalidatePath("/settings");

    return { success: "Settings Updated!" };
  } catch (error) {
    //console.log("error", error);
    console.error(error);
    if (error instanceof z.ZodError) {
      return { error: "Invalid request payload" };
    }
    return { error: "Some error" };
  }
};
