"use server";
import * as z from "zod";
import { db } from "@/lib/db";
import { FeedbackSchema } from "@/schemas";
import { getUserByEmail, getUserById } from "@/data/user";
import { currentUser } from "@/lib/auth";

import { revalidatePath } from "next/cache";

type FeedbackFormValues = z.infer<typeof FeedbackSchema>;

export const createFeedback = async (data: FeedbackFormValues) => {
  console.log("data from createFeedback: ", data);
  try {
    const user = await currentUser();

    if (!user) {
      return { error: "Unauthorized" };
    }

    const dbUser = await getUserById(user.id);

    if (!dbUser) {
      return { error: "Unauthorized" };
    }
    const Feedback = FeedbackSchema.parse(data);
    console.log("Feedback from createFeedback: ", Feedback);

    const mediaChannelCr = await db.feedback.create({
      data: { ...Feedback },
    });
    console.log("mediaChannelCr from createProduct: ", mediaChannelCr);

    //return { error: "Test err" };
    revalidatePath("/feedbacks");
    return { success: mediaChannelCr.id };
    //return { success: "mediaChannelCr" };
  } catch (error) {
    //console.log("error", error);
    console.error(error);
    if (error instanceof z.ZodError) {
      return { error: "Invalid request payload" };
    }
    return { error: "Some error" };
  }
};
