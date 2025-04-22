import { Input } from "@/components/ui/input";
import * as React from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import ArticleButton from "./common/ArticleButton";
import BlogCard from "./BlogCard";
import axios from "axios";
import { useEffect, useState } from "react";

export function SelectDemo() {
  const categories = ["Highlight", "Cat", "Inspiration", "General"];
  return (
    <Select>
      <SelectTrigger className="w-[366px]">
        <SelectValue placeholder="Highlight" />
      </SelectTrigger>
      <SelectContent className="bg-white">
        <SelectGroup>
          {/* <SelectLabel>Highlight</SelectLabel> */}
          {categories.slice(1).map((c, index) => {
            return (
              <SelectItem key={index} value={index}>
                {c}
              </SelectItem>
            );
          })}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}

export function InputDemo() {
  return (
    <Input
      type="email"
      placeholder="Search"
      className="w-[366px] bg-[#FFFFFF]"
    />
  );
}

function ArticleSection() {
  const [dataPosts, setDataPosts] = useState([]);
  const categories = ["Cat", "Inspiration", "General"];
  const dataFromPosts = dataPosts.posts || [];


  function formatDate(isoDate) {
    const date = new Date(isoDate);
    const options = { year: "numeric", month: "long", day: "numeric" };
    return date.toLocaleDateString("en-GB", options);
  }
  function categoryName(categoryId) {
    if (categoryId === 0) {
      return "Highlight";
    }
    if (categoryId === 1) {
      return "Cat";
    }
    if (categoryId === 2) {
      return "Inspiration";
    }
    if (categoryId === 3) {
      return "General";
    }
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:4000/posts");
        console.log(response.data.posts);
        setDataPosts(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);
  return (
    <>
      {/* Mobile */}
      <div className="lg:hidden ">
        <p className="font-bold text-[24px] py-4 px-8">Last articles</p>
        <div className="pl-8 pr-8 mx-auto flex justify-center">
          <InputDemo />
        </div>
        <p className="text-[24px] py-4 px-8">Category</p>
        <div className="flex justify-center pb-8 px-8">
          <SelectDemo />
        </div>
      </div>

      {/* Desktop */}
      <p className="container mx-auto px-4 py-8 max-lg:hidden text-[24px] font-bold">
        Latest articles
      </p>
      <div className=" max-lg:hidden bg-[#EFEEEB] container px-4 py-4  mx-auto rounded-[16px] flex flex-row justify-between ">
        <div className="px-4">
          <button className="w-[113px] h-[48px] bg-[#DAD6D1]">Highlight</button>
          {categories.map((c) => {
            return <ArticleButton key={c} text={c} />;
          })}
        </div>
        <div className="px-4 py-2">
          <InputDemo />
        </div>
      </div>

      <div className="mx-auto py-8 max-lg:px-8 lg:grid grid-cols-2 lg:mx-auto lg:py-8 gap-8 container">
        {dataFromPosts.map((post) => (
          <BlogCard
            key={post.id}
            category={categoryName(post.category_id)}
            date={formatDate(post.date)}
            title={post.title}
            description={post.description}
            image={post.image}
            author={post.author}
          />
        ))}
      </div>

      {/* View More Button */}
      <div className="flex justify-center py-8">
        <button className="px-6 py-2 bg-[#DAD6D1] rounded-[8px] text-[16px] font-medium">
          View More
        </button>
      </div>
    </>
  );
}

export default ArticleSection;
