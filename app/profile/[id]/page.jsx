"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";

import Profile from "@components/Profile";

const SomeoneElsesProfile = ({ params }) => {
  const searchParams = useSearchParams();
  const userName = searchParams.get("name");

  const [posts, setPosts] = useState([]);
  const [starredPrompts, setStarredPrompts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch(`/api/users/${params.id}/posts`);
      const data = await response.json();

      console.log(data);

      setPosts(data);
    };

    fetchPosts();

    const fetchStarredPrompts = async () => {
      const response = await fetch(`/api/users/${params.id}/starredPrompts`);
      const data = await response.json();

      setStarredPrompts(data);
    };

    fetchStarredPrompts();
  }, []);

  return (
    <Profile
      name={userName}
      desc={`Welcome to ${userName}'s personalized profile page. 
      Explore ${userName}'s exceptional prompts and be inspired 
      by the power of their imagination`}
      prompts={posts}
      starredPrompts={starredPrompts}
      handleEdit={null}
      handleDelete={null}
    />
  );
};

export default SomeoneElsesProfile;
