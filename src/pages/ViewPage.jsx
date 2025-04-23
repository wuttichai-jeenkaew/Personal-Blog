import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Markdown from "react-markdown";
function ViewPage() {
  const parms = useParams();
  const [dataPosts, setDataPosts] = useState();

  const getData = async () => {
    if (!parms?.postId) {
      console.error("No ID found in parameters.");
      return;
    }
    try {
      const response = await axios.get(
        `http://localhost:4000/posts/${parms.postId}`
      );
      setDataPosts(response.data);
      console.log(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    getData();
  }, [parms?.postId]);

  const markdownContent = dataPosts?.content?.replace(/\\n/g, "\n");

  return (
    <>
      <Navbar />
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
        <div className="bg-white shadow-md rounded-lg p-6 max-w-2xl w-full">
          <h1 className="text-2xl font-bold mb-4">{dataPosts?.title}</h1>
          <img
            src={dataPosts?.image}
            alt={dataPosts?.title}
            className="mb-4 rounded-lg"
          />
          <p className="text-gray-700 mb-4">{dataPosts?.description}</p>
          <div
            className="prose"
            dangerouslySetInnerHTML={{ __html: markdownContent }}
          ></div>
        </div>
      </div>

      <Footer />
    </>
  );
}

export default ViewPage;
