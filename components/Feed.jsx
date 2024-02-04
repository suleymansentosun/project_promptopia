"use client";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";

import PromptCard from "./PromptCard";

const PromptCardList = ({ data, handleTagClick }) => {
  const { data: session } = useSession();

  return (
    <div className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 grid-flow-row auto-cols-auto">
      {data.map((post) => (
        <PromptCard
          key={post._id}
          post={post}
          handleTagClick={handleTagClick}
          isStarredAlready={post.likes.some(
            (user) => user._id === session?.user.id
          )}
        />
      ))}
    </div>
  );
};

const Feed = () => {
  const [searchText, setSearchText] = useState("");
  const [posts, setPosts] = useState([]);
  console.log("posts:", posts);

  const handleSearchChange = (e) => {
    setSearchText(e.target.value);
  };

  const handleTagClick = (tag) => {
    setSearchText(tag);
  };

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch("/api/prompt");
      const data = await response.json();
      console.log(data);

      setPosts(data);
    };

    fetchPosts();
  }, []);

  function hasSearchText(postSegment) {
    return postSegment.toLowerCase().includes(searchText.toLowerCase());
  }

  const filteredPosts = posts.filter(
    (post) =>
      hasSearchText(post.prompt) ||
      hasSearchText(post.creator.username) ||
      hasSearchText(post.tag)
  );

  return (
    <section className="feed">
      <form className="relative w-full flex-center max-w-xl">
        <input
          type="text"
          placeholder="Search for a tag or a username"
          value={searchText}
          onChange={handleSearchChange}
          required
          className="search_input peer"
        />
      </form>

      <PromptCardList data={filteredPosts} handleTagClick={handleTagClick} />
    </section>
  );
};

export default Feed;
