import React, { useState } from "react";
import { Search, Edit3, MessageCircle, StickyNote, Send, Reply, Trash2, Save, Video, LogOut } from "lucide-react";
import axios from "../services/api";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();
  const [videoIdInput, setVideoIdInput] = useState("");
  const [video, setVideo] = useState(null);
  const [userId, setUserId] = useState(localStorage.getItem("userId") || "");
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([]);
  const [note, setNote] = useState("");
  const [titleEdit, setTitleEdit] = useState("");
  const [descEdit, setDescEdit] = useState("");

  const handleLogout = () => {
    axios
      .get("/api/auth/logout")
      .then(() => {
        localStorage.removeItem("userId");
        localStorage.removeItem("access_token");
        setUserId("");
        navigate("/");
      })
      .catch((err) => {
        console.error("Logout failed:", err);
        alert("Logout failed. Please try again.");
      });
  };

  const fetchVideo = (id) => {
    axios
      .get(`/api/video/${id}`, {
        headers: { "x-user-id": userId },
      })
      .then((res) => {
        const snippet = res.data.items?.[0]?.snippet;
        setVideo({
          title: snippet?.title,
          description: snippet?.description,
          videoId: id,
        });
        setTitleEdit(snippet?.title);
        setDescEdit(snippet?.description);
        fetchComments(id);
        fetchNotes(id);
      })
      .catch((err) => console.error("Error fetching video:", err));
  };

  const fetchComments = (videoId) => {
    const userId = localStorage.getItem("userId");
    axios
      .get(`/api/video/${videoId}/comments`, {
        headers: { "x-user-id": userId },
      })
      .then((res) => setComments(res.data))
      .catch((err) => console.error("Error fetching comments:", err));
  };

  const fetchNotes = (videoId) => {
    axios
      .get(`/api/video/${videoId}/notes`, {
        headers: { "x-user-id": userId },
      })
      .then((res) => setNote(res.data.note || ""))
      .catch((err) => console.error("Error fetching note:", err));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetchVideo(videoIdInput.trim());
  };

const handleComment = () => {
  if (!comment) return;
  axios
    .post(
      `/api/video/${video.videoId}/comments`,
      { text: comment },
      { headers: { "x-user-id": userId } }
    )
    .then(() => {
      setComment("");
      fetchComments(video.videoId);
    })
    .catch((err) => console.error("Error posting comment:", err));
};


  const handleReply = (parentId, replyText) => {
    axios
      .post(
        `/api/video/${video.videoId}/comments/${parentId}/reply`,
        { text: replyText },
        { headers: { "x-user-id": userId } }
      )
      .then(() => fetchComments(video.videoId))
      .catch((err) => console.error("Error replying:", err));
  };

  const handleDelete = (commentId) => {
    axios
      .delete(`/api/video/${video.videoId}/comments/${commentId}`, {
        headers: { "x-user-id": userId },
      })
      .then(() => fetchComments(video.videoId))
      .catch((err) => console.error("Error deleting comment:", err));
  };

  const handleUpdateVideo = () => {
    axios
      .put(
        `/api/video/${video.videoId}/update`,
        { title: titleEdit, description: descEdit },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
            "x-user-id": userId,
          },
        }
      )
      .then(() => {
        alert("Updated successfully");
        fetchVideo(video.videoId);
      })
      .catch((err) => console.error("Error updating video:", err));
  };


const handleNoteUpdate = () => {
  axios
    .post(
      `/api/video/${video.videoId}/notes`,
      { content: note }, // Changed from { note } to { content: note }
      { headers: { "x-user-id": userId } }
    )
    .then(() => alert("Note saved"))
    .catch((err) => console.error("Error saving note:", err));
};


  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-6 max-w-5xl">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-4">
              <div className="flex items-center justify-center w-12 h-12 bg-red-500 rounded-lg">
                <Video className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">YouTube Companion Dashboard</h1>
                <p className="text-gray-600">Manage your video content efficiently</p>
              </div>
            </div>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-lg font-medium transition-colors duration-200"
            >
              <LogOut className="w-4 h-4" />
              Logout
            </button>
          </div>
        </div>

        {/* Search Section */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
          <div className="flex items-center gap-3 mb-4">
            <Search className="w-5 h-5 text-blue-600" />
            <h2 className="text-lg font-semibold text-gray-900">Fetch Video Information</h2>
          </div>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              placeholder="Enter YouTube Video ID (e.g., dQw4w9WgXcQ)"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
              value={videoIdInput}
              onChange={(e) => setVideoIdInput(e.target.value)}
            />
            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white px-4 py-3 rounded-lg font-medium transition-colors duration-200 flex items-center justify-center gap-2"
            >
              <Search className="w-4 h-4" />
              Fetch Video Information
            </button>
          </form>
        </div>

        {video && (
          <div className="space-y-6">
            {/* Video Info Section */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="flex items-center gap-3 mb-4">
                <Edit3 className="w-5 h-5 text-green-600" />
                <h3 className="text-lg font-semibold text-gray-900">Video Information</h3>
              </div>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Video Title</label>
                  <input
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none transition-colors"
                    value={titleEdit}
                    onChange={(e) => setTitleEdit(e.target.value)}
                    placeholder="Enter video title"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Video Description</label>
                  <textarea
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none transition-colors min-h-[100px] resize-vertical"
                    value={descEdit}
                    onChange={(e) => setDescEdit(e.target.value)}
                    placeholder="Enter video description"
                  />
                </div>
                
                <button
                  onClick={handleUpdateVideo}
                  className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-medium transition-colors duration-200 flex items-center gap-2"
                >
                  <Save className="w-4 h-4" />
                  Update Video
                </button>
              </div>
            </div>

            {/* Comments Section */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="flex items-center gap-3 mb-4">
                <MessageCircle className="w-5 h-5 text-purple-600" />
                <h4 className="text-lg font-semibold text-gray-900">Comments</h4>
              </div>
              
              <div className="space-y-4">
                <div className="flex gap-3">
                  <input
                    className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none transition-colors"
                    placeholder="Share your thoughts..."
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                  />
                  <button
                    onClick={handleComment}
                    className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-lg font-medium transition-colors duration-200 flex items-center gap-2"
                  >
                    <Send className="w-4 h-4" />
                    Post
                  </button>
                </div>
                
                <div className="space-y-3">
                  {comments.map((c) => (
                    <div key={c._id} className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                      <div className="flex justify-between items-start mb-3">
                        <p className="text-gray-800 flex-1">{c.text}</p>
                        {c.userId === userId && (
                          <button
                            onClick={() => handleDelete(c._id)}
                            className="ml-3 p-1 text-red-500 hover:text-red-700 hover:bg-red-50 rounded transition-colors"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        )}
                      </div>
                      
                      {c.replies?.map((r) => (
                        <div key={r._id} className="ml-4 pl-4 border-l-2 border-gray-300 py-2">
                          <div className="flex items-center gap-2 text-gray-600">
                            <Reply className="w-4 h-4" />
                            <span className="text-sm">{r.text}</span>
                          </div>
                        </div>
                      ))}
                      
                      <ReplyBox parentId={c._id} onReply={handleReply} />
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Notes Section */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="flex items-center gap-3 mb-4">
                <StickyNote className="w-5 h-5 text-yellow-600" />
                <h4 className="text-lg font-semibold text-gray-900">Personal Notes</h4>
              </div>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Your Notes</label>
                  <textarea
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 outline-none transition-colors min-h-[120px] resize-vertical"
                    value={note}
                    onChange={(e) => setNote(e.target.value)}
                    placeholder="Jot down your ideas, thoughts, and reminders for this video..."
                  />
                </div>
                
                <button
                  onClick={handleNoteUpdate}
                  className="bg-yellow-600 hover:bg-yellow-700 text-white px-6 py-3 rounded-lg font-medium transition-colors duration-200 flex items-center gap-2"
                >
                  <Save className="w-4 h-4" />
                  Save Notes
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

const ReplyBox = ({ parentId, onReply }) => {
  const [reply, setReply] = useState("");
  return (
    <div className="mt-3 flex gap-2">
      <input
        className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors text-sm"
        placeholder="Write a reply..."
        value={reply}
        onChange={(e) => setReply(e.target.value)}
      />
      <button
        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors duration-200 flex items-center gap-1 text-sm"
        onClick={() => {
          onReply(parentId, reply);
          setReply("");
        }}
      >
        <Reply className="w-3 h-3" />
        Reply
      </button>
    </div>
  );
};

export default Dashboard;