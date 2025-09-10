import { useContext, useEffect, useState } from "react";
import BlogEditor from "../Components/BlogEditor";
import Notice from "../Components/Notice";
import WritingTips from "../Components/WritingTips";
import AuthContext from "../../Context/AuthContext";
import toast from "react-hot-toast";
import PublishModal from "../Components/PublishModal";
import { getAllCategories } from "../../Service/Operation/CategoryService";
import { useNavigate } from "react-router-dom";
import { createBlogPostAPI } from "../../Service/Operation/BlogService";

export default function CreatePostPage() {
  const [openEditor, setOpenEditor] = useState(true);
  const [categories, setCategories] = useState([]);
  const [showPublishModal, setShowPublishModal] = useState(false);
  const [data, setData] = useState(null);

  const authContext = useContext(AuthContext);
  const { user, token } = authContext.data || {};

  const navigate = useNavigate();

  const handleEditorClose = () => {
    setOpenEditor(false);
  };

  const handleSubmit = (editorData) => {
    console.log("Editor data submitted:", editorData);
    setData(editorData);
    setOpenEditor(false);
    setShowPublishModal(true);
  };

  const getCategories = async () => {
    try {
      const response = await getAllCategories(token);
      if (response.status === 200) {
        setCategories(response?.data?.data || []);
      }
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  useEffect(() => {
    getCategories();
  }, []);

  const handleSubmission = async (finalData) => {
    console.log("finalData in CreatePostPage:", finalData);
    const toastId = toast.loading("Creating blog post...");
    const submitData = { ...data, ...finalData };
    submitData.creatorName = user?.name;
    console.log("submitData:", submitData);
    try {
      const response = await createBlogPostAPI(submitData, token);
      toast.dismiss(toastId);
      console.log("response:", response);
      if (response.status === 200) {
        toast.success("Blog post created successfully!");
        navigate("/blog/user-post");
      }
    } catch (error) {
      toast.dismiss(toastId);
      console.error("Error creating blog post:", error);
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 items-start">
      <div className="lg:col-span-2">
        <BlogEditor
          isOpen={openEditor}
          onSubmit={handleSubmit}
          onClose={handleEditorClose}
        />
        {showPublishModal && (
          <PublishModal
            categories={categories}
            onClose={() => setShowPublishModal(false)}
            onPublish={handleSubmission}
          />
        )}
      </div>{" "}
      <aside className="space-y-8 sticky top-24">
        <WritingTips />
        <Notice />
      </aside>
    </div>
  );
}
