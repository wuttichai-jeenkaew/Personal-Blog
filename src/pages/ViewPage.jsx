import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { FaHeart, FaCopy, FaFacebookF, FaTwitter, FaLinkedinIn } from "react-icons/fa"; // ใช้ไอคอน

function ViewPage() {
  const params = useParams();
  const [dataPosts, setDataPosts] = useState();
  const [likeCount, setLikeCount] = useState(321); // ตัวอย่าง Like count (Hardcode ไว้ก่อน)

  const getData = async () => {
    if (!params?.postId) {
      console.error("No ID found in parameters.");
      return;
    }
    try {
      const response = await axios.get(
        `https://server-blog-post-git-main-wuttichai-js-projects.vercel.app/posts/${params.postId}`
      );
      setDataPosts(response.data);
      console.log(dataPosts);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    getData();
    
  }, [params?.postId]);

  const MarkdownRenderer = ({ content }) => {
    if (!content) return null;

    return (
      <div className="prose prose-lg text-left max-w-none text-xl">
        <ReactMarkdown remarkPlugins={[remarkGfm]}>
          {content.replace(/\\n/g, "\n")}
        </ReactMarkdown>
      </div>
    );
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    alert("Link copied to clipboard!");
  };

  return (
    <>
      <Navbar />
      <div className="flex flex-col items-center justify-start min-h-screen bg-gray-100 py-8">
        <div className="bg-white shadow-md rounded-lg p-6 max-w-3xl w-full">
          {/* Title */}
          <h1 className="text-3xl font-bold mb-4">{dataPosts?.title}</h1>

          {/* Image */}
          {dataPosts?.image && (
            <img
              src={dataPosts.image}
              alt={dataPosts.title}
              className="mb-4 rounded-lg object-cover w-full h-64"
            />
          )}

          {/* Description */}
          <p className="text-gray-700 mb-6">{dataPosts?.description}</p>

          {/* Content */}
          {dataPosts?.content && (
            <MarkdownRenderer content={dataPosts.content} />
          )}

          {/* Like + Share Section */}
          <div className="flex items-center justify-between mt-8 border-t pt-4">
            {/* Like */}
            <div className="flex items-center space-x-2">
              <FaHeart className="text-red-500" />
              <span>{likeCount}</span>
            </div>

            {/* Share */}
            <div className="flex items-center space-x-4">
              <button
                onClick={handleCopyLink}
                className="flex items-center space-x-1 text-gray-600 hover:text-gray-800"
              >
                <FaCopy />
                <span>Copy link</span>
              </button>

              {/* Social Icons */}
              <div className="flex items-center space-x-2">
                <a href="#" className="text-blue-600 hover:text-blue-800">
                  <FaFacebookF />
                </a>
                <a href="#" className="text-blue-400 hover:text-blue-600">
                  <FaTwitter />
                </a>
                <a href="#" className="text-blue-700 hover:text-blue-900">
                  <FaLinkedinIn />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Comments Section */}
        <div className="bg-white shadow-md rounded-lg p-6 mt-8 max-w-3xl w-full">
          <h2 className="text-2xl font-semibold mb-4">Comments</h2>

          {/* Comment List (hardcoded) */}
          <div className="space-y-6">
            <div className="border-b pb-4">
              <p className="font-semibold">Jacob Lash</p>
              <p className="text-gray-600 text-sm mb-2">2 days ago</p>
              <p>Really loved the article! I now fully explain why my cat is so independent yet loving.</p>
            </div>
            <div className="border-b pb-4">
              <p className="font-semibold">Alexis Stone</p>
              <p className="text-gray-600 text-sm mb-2">1 day ago</p>
              <p>Such a great read! I've always wondered why my cat slow-blinks at me!</p>
            </div>
            <div className="pb-4">
              <p className="font-semibold">Mimi monae</p>
              <p className="text-gray-600 text-sm mb-2">12 hours ago</p>
              <p>This article perfectly captures why cats make such amazing pets!</p>
            </div>
          </div>

          {/* Leave a Comment */}
          <div className="mt-6">
            <h3 className="text-lg font-semibold mb-2">Leave a Comment</h3>
            <textarea
              placeholder="What are your thoughts?"
              className="w-full border rounded-lg p-3 mb-4"
              rows={4}
              disabled
            />
            <button className="bg-gray-400 text-white py-2 px-4 rounded cursor-not-allowed" disabled>
              Send
            </button>
            <p className="text-gray-500 text-sm mt-2">* Login required to comment (coming soon)</p>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}

export default ViewPage;
