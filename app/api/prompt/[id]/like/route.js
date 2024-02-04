import { connectToDB } from "@utils/database";
import Prompt from "@models/prompt";
import User from "@models/user";
import { getServerSession } from "next-auth/next";

export const PATCH = async (request, { params }) => {
  try {
    // return;
    const existingPrompt = await Prompt.findById(params.id);
    const existingPromptLikers = existingPrompt.likes;

    const session = await getServerSession(request);
    const sessionUser = await User.findOne({
      email: session.user.email,
    });

    const userLikedBefore = existingPromptLikers.findIndex(
      (userId) => userId.toString() == sessionUser._id.toString()
    );
    if (userLikedBefore !== -1) {
      existingPromptLikers.splice(userLikedBefore, 1);
      existingPrompt.likeCount--;
    } else {
      existingPrompt.likes.push(sessionUser._id);
      existingPrompt.likeCount++;
    }

    await existingPrompt.save();

    console.log(sessionUser);

    return new Response(JSON.stringify(existingPrompt), { status: 200 });
  } catch (err) {
    console.log(err);
    return new Response("Failed to update prompt", { status: 500 });
  }
};
