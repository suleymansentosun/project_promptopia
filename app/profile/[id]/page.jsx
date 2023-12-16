"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";

import Profile from "@components/Profile";

const SomeoneElsesProfile = ({ params }) => {
const searchParams = useSearchParams();
const userName = searchParams.get("name");

  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch(`/api/users/${params.id}/posts`);
      const data = await response.json();

      setPosts(data);
    };

    fetchPosts();
  }, []);

  return (
    <Profile
      name={userName}
      desc={`Welcome to ${userName}'s personalized profile page. 
      Explore ${userName}'s exceptional prompts and be inspired 
      by the power of their imagination`}
      data={posts}
      handleEdit={null}
      handleDelete={null}
    />
  );
};

export default SomeoneElsesProfile;
