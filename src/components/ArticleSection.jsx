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



export function SelectDemo() {
  return (
    <Select>
      <SelectTrigger className="w-[366px]">
        <SelectValue placeholder="Highlight" />
      </SelectTrigger>
      <SelectContent className="bg-white">
        <SelectGroup>
          <SelectLabel>Article</SelectLabel>
          <SelectItem value="1">Understanding Cat Behavior</SelectItem>
          <SelectItem value="2">The Fascinating World of Cats</SelectItem>
          <SelectItem value="3">Finding Motivation</SelectItem>
          <SelectItem value="4">The Science of the Cat’s Purr</SelectItem>
          <SelectItem value="5">Unlocking Creativity</SelectItem>
          <SelectItem value="6">
            Tips to Keep Your Cat Happy and Healthy
          </SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}

export function InputDemo() {
  return <Input type="email" placeholder="Search" className="w-[366px]"/>;
}

function ArticleSection() {
  return (
    <>
    {/* Mobile */}
      <div className="lg:hidden">
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
        <p className="container mx-auto px-4 py-8 max-lg:hidden text-[24px] font-bold">Latest articles</p>
      <div className=" max-lg:hidden bg-[#EFEEEB] container px-4 py-4  mx-auto rounded-[16px] flex flex-row justify-between ">
        <div className="px-4">
        <button className="w-[113px] h-[48px] bg-[#DAD6D1]">Highlight</button>
            <ArticleButton text="Cat" />
            <ArticleButton text="inspiration" />
            <ArticleButton text="General" />
            
        </div >
        <div className="px-4 py-2">
        <InputDemo />
        </div>

      </div>
    </>
  );
}

export default ArticleSection;
