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
import { blogPosts } from "./data/blogPosts";


export function SelectDemo() {
  return (
    <Select>
      <SelectTrigger className="w-[366px]">
        <SelectValue placeholder="Highlight" />
      </SelectTrigger>
      <SelectContent className="bg-white">
        <SelectGroup>
          <SelectLabel>Articles</SelectLabel>
          <SelectItem value="1">General</SelectItem>
          <SelectItem value="2">Cat</SelectItem>
          <SelectItem value="3">Inspiration</SelectItem>
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
          <ArticleButton text="Cat" />
          <ArticleButton text="inspiration" />
          <ArticleButton text="General" />
        </div>
        <div className="px-4 py-2">
          <InputDemo />
        </div>
      </div>


      <div className="mx-auto py-8 max-lg:px-8 lg:grid grid-cols-2 lg:mx-auto lg:py-8 gap-8 container">
      {blogPosts.map((post) => (
        
        <BlogCard 
          key={post.id}
          category={post.category}
          date={post.date}
          title={post.title}
          description={post.description}
          image={post.image}
        
        />
        
      ))}
      </div>

      {/*   <div className="lg:grid grid-cols-2 mx-auto py-8 container ">
        <BlogCard image="https://res.cloudinary.com/dcbpjtd1r/image/upload/v1728449771/my-blog-post/e739huvlalbfz9eynysc.jpg" category="General"
        alt="The Art of Mindfulness: Finding Peace in a Busy World" title="The Art of Mindfulness: Finding Peace in a Busy World" description="Discover the transformative power of mindfulness and how it can help you navigate the challenges of modern life with greater ease and contentment." author="Thompson P." date="11 September 2024"/>
        <BlogCard image="https://res.cloudinary.com/dcbpjtd1r/image/upload/v1728449771/my-blog-post/gsutzgam24abrvgee9r4.jpg" category="Cat" alt="The Secret Language of Cats: Decoding Feline Communication" title="The Secret Language of Cats: Decoding Feline Communication" description="Unravel the mysteries of cat communication and learn how to better understand your feline friend's needs and desires." author="Thompson P." date="21 August 2024"/>
        <BlogCard image="https://res.cloudinary.com/dcbpjtd1r/image/upload/v1728449771/my-blog-post/zzye4nxfm3pmh81z7hni.jpg" alt="Embracing Change: How to Thrive in Times of Transition" category="Inspiration" title="Embracing Change: How to Thrive in Times of Transition" description="Learn powerful strategies to navigate life's changes with grace and emerge stronger on the other side.." author="Thompson P." date="23 March 2024"/>
        <BlogCard image="https://res.cloudinary.com/dcbpjtd1r/image/upload/v1728449771/my-blog-post/e0haxst38li4g8i0vpsr.jpg" category="General" alt="The Future of Work: Adapting to a Digital-First Economy" title="The Future of Work: Adapting to a Digital-First Economy" description="Explore how technology is reshaping the workplace and learn skills to succeed in the evolving job market." author="Thompson P." date="23 May 2024"/>
        <BlogCard image="https://res.cloudinary.com/dcbpjtd1r/image/upload/v1728449771/my-blog-post/g8qpepvgnz6gioylyhrz.jpg" category="Inspiration" alt="" title="The Power of Habits: Small Changes, Big Results" description="Discover how small, consistent habits can lead to significant personal and professional growth over time." author="Thompson P." date="23 June 2024"/>
        <BlogCard image="https://res.cloudinary.com/dcbpjtd1r/image/upload/v1728449771/my-blog-post/koydfh6jpmzhtxvwein3.jpg" category="Cat" alt="The Future of Work: Adapting to a Digital-First Economy" title="Cat Nutrition: A Guide to Feeding Your Feline Friend" description="Learn about the nutritional needs of cats and how to provide a balanced diet for optimal health and longevity." author="Thompson P." date="21 July 2024"/>
        </div> */}
    </>
  );
}

export default ArticleSection;
