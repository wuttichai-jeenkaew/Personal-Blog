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
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams, useNavigate} from "react-router-dom";

export function SelectDemo({setDataPosts, setCurrentPage}) {
  const categories = ["Highlight", "Cat", "Inspiration", "General"];
  const [selectedValue, setSelectedValue] = useState("");
  

  const selectCategory = async (category) => {
    try {
      let data;
      if (category === "Cat") {
        data = 1;
      }
      if (category === "Inspiration") {
        data = 2;
      }
      if (category === "General") {
        data = 3;
      }
      const response = await axios.get(
        `http://localhost:4000/posts?category=${data}`
      );
      setDataPosts(response.data.posts);
      setCurrentPage(1);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  return (
    <Select>
      <SelectTrigger className="w-[100vw]">
        <SelectValue placeholder="Highlight" />
      </SelectTrigger>
      <SelectContent className="bg-white">
        <SelectGroup>
          {/* <SelectLabel>Highlight</SelectLabel> */}
          {categories.slice(1).map((c, index) => {
            return (
              <SelectItem
                key={index}
                value={index}
                onClick={() => {
                  setSelectedValue(c);
                  selectCategory(c);
                }}
              >
                {c}
              </SelectItem>
            );
          })}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}

export function InputDemo({setSearch, setCloseTags}) {
  return (
    <Input
      type="text"
      placeholder="Search"
      className="w-[100] bg-[#FFFFFF]"
      onChange={(e) => {
        setSearch(e.target.value);
        setCloseTags(true);
      }}
    />
  );
}

function ArticleSection() {
  const navigate = useNavigate();
  const [dataPosts, setDataPosts] = useState([]);
  const [search, setSearch] = useState("");
  const [dataSearch, setDataSearch] = useState([]);
  const [closeTags, setCloseTags] = useState(true);
  const categories = ["Cat", "Inspiration", "General"];
  const [currentPage, setCurrentPage] = useState(1);
  const [hasMorePosts, setHasMorePosts] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [activeCategory, setActiveCategory] = useState(null);

  // คู่มือการแมป categoryId ที่ถูกต้อง
  // 0 = Highlight (null)
  // 1 = Cat
  // 2 = Inspiration
  // 3 = General

  // ใช้ useEffect เพื่อดูการเปลี่ยนแปลงของ activeCategory
  useEffect(() => {
    if (activeCategory !== undefined) {
      fetchDataByCategory(activeCategory);
    }
  }, [activeCategory]);

  // ดึงข้อมูลเริ่มต้นเมื่อโหลดคอมโพเนนต์
  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    if (search) {
      handleSearch();
    } else if (!search) {
      setDataSearch([]);
      // หากยกเลิกการค้นหา ให้กลับไปแสดงข้อมูลตามหมวดหมู่ที่เลือกไว้
      fetchDataByCategory(activeCategory);
    }
  }, [search]);

  // ฟังก์ชันเฉพาะสำหรับดึงข้อมูลตามหมวดหมู่
  const fetchDataByCategory = async (categoryId) => {
    try {
      setIsLoading(true);
      
      let url = `http://localhost:4000/posts?page=1`;
      
      // เพิ่มพารามิเตอร์หมวดหมู่ถ้ามีการกำหนด (และไม่ใช่ Highlight)
      if (categoryId !== null) {
        url += `&category=${categoryId}`;
      }
      
      const response = await axios.get(url);
      
      // ตรวจสอบว่ายังมีโพสต์เพิ่มเติมหรือไม่
      if (response.data.posts.length === 0) {
        setHasMorePosts(false);
      } else {
        setHasMorePosts(true);
      }
      
      // อัปเดตข้อมูลโพสต์และรีเซ็ตหน้าเป็น 1
      setDataPosts(response.data.posts);
      setCurrentPage(1);
      
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchData = async (page = 1, append = false) => {
    try {
      setIsLoading(true);
      
      let url = `http://localhost:4000/posts?page=${page}`;
      
      // เพิ่มพารามิเตอร์หมวดหมู่ถ้ามีการกำหนด
      if (activeCategory !== null) {
        url += `&category=${activeCategory}`;
      }
      
      const response = await axios.get(url);
      
      // ตรวจสอบว่ายังมีโพสต์เพิ่มเติมหรือไม่
      if (response.data.posts.length === 0) {
        setHasMorePosts(false);
      } else {
        setHasMorePosts(true);
      }
      
      // ถ้าต้องการเพิ่มข้อมูลต่อจากเดิม ให้รวมกับข้อมูลเดิม
      // ถ้าไม่ ให้แทนที่ข้อมูลเดิม
      if (append) {
        setDataPosts(prevPosts => [...prevPosts, ...response.data.posts]);
      } else {
        setDataPosts(response.data.posts);
      }
      
      setCurrentPage(page);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleLoadMore = async () => {
    if (isLoading || !hasMorePosts) return;
    
    const nextPage = currentPage + 1;
    await fetchData(nextPage, true); // true คือการเพิ่มข้อมูลต่อจากเดิม
  };

  const handleSearch = async () => {
    try {
      const response = await axios.get(
        `http://localhost:4000/posts?keyword=${search}`
      );
      setDataSearch(response.data.posts);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  // ฟังก์ชันเมื่อเลือกผลการค้นหา
  const handleSelectSearchResult = (post) => {
    setSearch(post.title);
    setCloseTags(false);
    setDataPosts([post]); // แสดงเฉพาะโพสต์ที่เลือก
  };

  // ฟังก์ชันเมื่อกดเลือกหมวดหมู่
  const handleCategoryClick = (categoryId) => {
    // อัปเดต state ของหมวดหมู่ที่เลือก
    setActiveCategory(categoryId);
    // การเรียก API จะถูกจัดการโดย useEffect ที่เฝ้าดู activeCategory
    // รีเซ็ตการค้นหา
    setSearch("");
    setCloseTags(true);
  };

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

  return (
    <>
      {/* Mobile */}
      <div className="lg:hidden ">
        <p className="font-bold text-[24px] py-4 px-8">Last articles</p>
        <div
          className="pl-8 pr-8 mx-auto flex flex-col justify-center"
          key="mobile-search"
        >
          <InputDemo setSearch={setSearch} setCloseTags={setCloseTags} />
          {dataSearch?.map((post) => {
            return (
              <div key={post.id} className={!closeTags? "hidden" : ""}>
                <span
                  onClick={() => handleSelectSearchResult(post)}
                  className="cursor-pointer hover:bg-gray-100 block py-1"
                >
                  {post.title}
                </span>
              </div>
            );
          })}
        </div>
        <p className="text-[24px] py-4 px-8">Category</p>
        <div className="flex justify-center pb-8 px-8">
          <SelectDemo setDataPosts={setDataPosts} setCurrentPage={setCurrentPage} />
        </div>
      </div>

      {/* Desktop */}
      <p className="container mx-auto px-4 py-8 max-lg:hidden text-[24px] font-bold">
        Latest articles
      </p>
      <div className="max-lg:hidden bg-[#EFEEEB] container px-4 py-4 mx-auto rounded-[16px] flex flex-row justify-between">
        <div className="px-4">
          {/* Highlight Button - เมื่อ activeCategory เป็น null */}
          <button 
            className={`w-[113px] h-[48px] ${activeCategory === null ? 'bg-[#DAD6D1]' : ''}`}
            onClick={() => handleCategoryClick(null)}
          >
            Highlight
          </button>
          
          {/* Cat Button - ส่งค่า categoryId = 1 */}
          <button 
            className={`w-[113px] h-[48px] ${activeCategory === 1 ? 'bg-[#DAD6D1]' : ''}`}
            onClick={() => handleCategoryClick(1)}
          >
            Cat
          </button>
          
          {/* Inspiration Button - ส่งค่า categoryId = 2 */}
          <button 
            className={`w-[113px] h-[48px] ${activeCategory === 2 ? 'bg-[#DAD6D1]' : ''}`}
            onClick={() => handleCategoryClick(2)}
          >
            Inspiration
          </button>
          
          {/* General Button - ส่งค่า categoryId = 3 */}
          <button 
            className={`w-[113px] h-[48px] ${activeCategory === 3 ? 'bg-[#DAD6D1]' : ''}`}
            onClick={() => handleCategoryClick(3)}
          >
            General
          </button>
        </div>
        <div className="px-4 py-2 relative">
          <InputDemo setSearch={setSearch} setCloseTags={setCloseTags} />
          {/* แสดงผลการค้นหาในส่วน Desktop */}
          {dataSearch.length > 0 && closeTags && (
            <div className="absolute bg-white shadow-lg rounded mt-1 w-full z-10">
              {dataSearch.map((post) => (
                <div 
                  key={post.id} 
                  className="px-3 py-2 cursor-pointer hover:bg-gray-100"
                  onClick={() => handleSelectSearchResult(post)}
                >
                  {post.title}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="mx-auto py-8 max-lg:px-4 lg:grid grid-cols-2 lg:mx-auto lg:py-8 gap-8 container">
        {dataPosts.map((post) => (
          <div className="flex flex-col gap-4 py-4" key={post.id}>
            <a href="#" className="relative h-[212px] sm:h-[360px]">
              <img
                className="w-full h-full object-cover rounded-md"
                src={post.image}
                alt={post.title}
                onClick={() => navigate(`/view/${post.id}`)}
              />
            </a>
            <div className="flex flex-col">
              <div className="flex">
                <span className="bg-green-200 rounded-full px-3 py-1 text-sm font-semibold text-green-600 mb-2">
                  {categoryName(post.category_id)}
                </span>
              </div>
              <a href="#">
                <h2 className="font-bold text-xl mb-2 line-clamp-2 hover:underline">
                  {post.title}
                </h2>
              </a>
              <p className="text-muted-foreground text-sm mb-4 flex-grow line-clamp-3">
                {post.description}
              </p>
              <div className="flex items-center text-sm">
                <img
                  className="w-8 h-8 rounded-full mr-2"
                  src="https://res.cloudinary.com/dcbpjtd1r/image/upload/v1728449784/my-blog-post/xgfy0xnvyemkklcqodkg.jpg"
                  alt={post.author}
                />
                <span>{post.author}</span>
                <span className="mx-2 text-gray-300">|</span>
                <span>{formatDate(post.date)}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* View More Button */}
      <div className="flex justify-center py-8">
        <button 
          className={`px-6 py-2 rounded-[8px] text-[16px] font-medium ${
            !hasMorePosts ? 'bg-gray-300 text-gray-500' : 'bg-[#DAD6D1] hover:bg-[#c8c3bc]'
          }`}
          onClick={handleLoadMore}
          disabled={isLoading || !hasMorePosts}
        >
          {isLoading ? 'Loading...' : hasMorePosts ? 'View More' : 'No More Posts'}
        </button>
      </div>
    </>
  );
}

export default ArticleSection;