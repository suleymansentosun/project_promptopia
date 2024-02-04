"use client";

import { useState } from "react";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { usePathname, useRouter } from "next/navigation";
import StarIcon from "./StarIcon";

const PromptCard = ({
  post,
  handleTagClick,
  handleEdit,
  handleDelete,
  isStarredAlready,
}) => {
  const { data: session } = useSession();
  const pathName = usePathname();
  const router = useRouter();
  const [isStarred, setIsStarred] = useState(isStarredAlready);
  const [isSaving, setIsSaving] = useState(false);
  const [likeCount, setLikeCount] = useState(post.likeCount);

  const handleClick = async () => {
    const prevLikeCount = likeCount;
    const prevIsStarred = isStarred;

    setLikeCount((currentLikeCount) =>
      isStarred ? --currentLikeCount : ++currentLikeCount
    );
    setIsStarred((prevIsStarred) => !prevIsStarred);
    setIsSaving(true);

    try {
      const response = await fetch(`/api/prompt/${post._id}/like`, {
        method: "PATCH",
      });

      if (!response.ok) {
        throw new Error("Network response was not ok.");
      }
    } catch (error) {
      setLikeCount(prevLikeCount);
      setIsStarred(prevIsStarred);

      console.error("Error occurred while saving:", error);
    } finally {
      setIsSaving(false);
    }
  };

  const [copied, setCopied] = useState("");

  const handleCopy = () => {
    setCopied(post.prompt);
    navigator.clipboard.writeText(post.prompt);
    setTimeout(() => setCopied(""), 3000);
  };

  const handleProfileClick = () => {
    if (post.creator._id === session?.user.id) return router.push("/profile");

    router.push(`/profile/${post.creator._id}?name=${post.creator.username}`);
  };

  return (
    <div className="prompt_card">
      <div className="flex justify-between items-start gap-5">
        <div
          onClick={handleProfileClick}
          className="flex-1 flex justify-start 
          items-center gap-3 cursor-pointer"
        >
          <Image
            src={post.creator.image}
            alt="user_image"
            width={40}
            height={40}
            className="rounded-full object-contain"
          />

          <div className="flex flex-col lg:max-w-[200px] xl:max-w-none">
            <h3 className="font-satoshi font-semibold text-gray-900">
              {post.creator.username}
            </h3>
            <p className="font-inter text-sm text-gray-500 truncate">
              {post.creator.email}
            </p>
          </div>
        </div>

        <div className="copy_btn" onClick={handleCopy}>
          <Image
            src={
              copied === post.prompt
                ? "/assets/icons/tick.svg"
                : "/assets/icons/copy.svg"
            }
            width={12}
            height={12}
          />
        </div>
      </div>

      <p className="my-4 font-satoshi text-sm text-gray-700">{post.prompt}</p>
      <div className="flex justify-between items-center">
        <div className="flex justify-start items-center gap-1">
          <StarIcon
            isClicked={isStarred}
            onClick={handleClick}
            fillColor="blue"
            strokeColor="gray"
            disabled={isSaving}
          />
          {likeCount}
        </div>
        <p
          className="font-inter text-sm blue_gradient cursor-pointer"
          onClick={() => handleTagClick && handleTagClick(post.tag)}
        >
          #{post.tag}
        </p>
      </div>

      {session?.user.id === post.creator._id && pathName === "/profile" && (
        <div className="mt-5 flex-center gap-4 border-t border-gray-100 pt-3">
          <p
            className="font-inter text-sm green_gradient cursor-pointer"
            onClick={handleEdit}
          >
            Edit
          </p>
          <p
            className="font-inter text-sm orange_gradient cursor-pointer"
            onClick={handleDelete}
          >
            Delete
          </p>
        </div>
      )}
    </div>
  );
};

export default PromptCard;
