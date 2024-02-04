import PromptCard from "./PromptCard";
import { Tabs } from "flowbite-react";
import { HiUserCircle } from "react-icons/hi";
import { FaStar } from "react-icons/fa6";
import { useSession } from "next-auth/react";

function PromptTabs({ prompts, starredPrompts, handleEdit, handleDelete }) {
  const { data: session } = useSession();

  return (
    <Tabs aria-label="Default tabs" style="default">
      <Tabs.Item active title="Prompts" icon={HiUserCircle}>
        <div className="prompt_layout">
          {prompts.map((post) => (
            <PromptCard
              key={post._id}
              post={post}
              handleEdit={() => handleEdit && handleEdit(post)}
              handleDelete={() => handleDelete && handleDelete(post)}
              isStarredAlready={post.likes.some(
                (user) => user._id === session?.user.id
              )}
            />
          ))}
        </div>
      </Tabs.Item>
      <Tabs.Item title="Starred" icon={FaStar}>
        <div className="prompt_layout">
          {starredPrompts.map((post) => (
            <PromptCard
              key={post._id}
              post={post}
              handleEdit={() => handleEdit && handleEdit(post)}
              handleDelete={() => handleDelete && handleDelete(post)}
              isStarredAlready={post.likes.some(
                (user) => user._id === session?.user.id
              )}
            />
          ))}
        </div>
      </Tabs.Item>
    </Tabs>
  );
}

const Profile = ({
  name,
  desc,
  prompts,
  starredPrompts,
  handleEdit,
  handleDelete,
}) => {
  return (
    <section className="w-full">
      <h1 className="head_text text-left">
        <span className="blue_gradient">{name} Profile</span>
      </h1>
      <p className="desc text-left mb-4">{desc}</p>
      <PromptTabs
        prompts={prompts}
        starredPrompts={starredPrompts}
        handleEdit={handleEdit}
        handleDelete={handleDelete}
      />
    </section>
  );
};

export default Profile;
