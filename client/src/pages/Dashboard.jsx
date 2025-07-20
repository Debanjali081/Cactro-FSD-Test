import React, { useState } from "react";
import { Search, Edit3, MessageCircle, StickyNote, Send, Reply, Trash2, Save, Video } from "lucide-react";
import axios from "../services/api";

const Dashboard = () => {
  const [videoIdInput, setVideoIdInput] = useState("");
  const [video, setVideo] = useState(null);
  const [userId, setUserId] = useState(localStorage.getItem("userId") || "");
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([]);
  const [note, setNote] = useState("");
  const [titleEdit, setTitleEdit] = useState("");
  const [descEdit, setDescEdit] = useState("");

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
        { note },
        { headers: { "x-user-id": userId } }
      )
      .then(() => alert("Note saved"))
      .catch((err) => console.error("Error saving note:", err));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-red-500 to-pink-500 rounded-2xl mb-4 shadow-lg">
            <Video className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 bg-clip-text text-transparent mb-2">
            YouTube Companion Dashboard
          </h1>
          <p className="text-gray-600 text-lg">Manage your video content with ease</p>
        </div>

        {/* Search Section */}
        <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-8 mb-8">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-blue-100 rounded-xl">
              <Search className="w-6 h-6 text-blue-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900">Fetch Video Information</h2>
          </div>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="relative">
              <input
                type="text"
                placeholder="Enter YouTube Video ID (e.g., dQw4w9WgXcQ)"
                className="w-full px-6 py-4 border-2 border-gray-200 rounded-2xl focus:border-blue-500 focus:outline-none transition-all duration-300 text-lg placeholder-gray-400"
                value={videoIdInput}
                onChange={(e) => setVideoIdInput(e.target.value)}
              />
            </div>
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-8 py-4 rounded-2xl font-semibold text-lg transition-all duration-300 transform hover:scale-[1.02] shadow-lg hover:shadow-xl"
            >
              <Search className="w-5 h-5 inline mr-2" />
              Fetch Video Information
            </button>
          </form>
        </div>

        {video && (
          <div className="space-y-8">
            {/* Video Info Section */}
            <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-green-100 rounded-xl">
                  <Edit3 className="w-6 h-6 text-green-600" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900">Video Information</h3>
              </div>
              
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Video Title</label>
                  <input
                    className="w-full px-6 py-4 border-2 border-gray-200 rounded-2xl focus:border-green-500 focus:outline-none transition-all duration-300 text-lg"
                    value={titleEdit}
                    onChange={(e) => setTitleEdit(e.target.value)}
                    placeholder="Enter video title"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Video Description</label>
                  <textarea
                    className="w-full px-6 py-4 border-2 border-gray-200 rounded-2xl focus:border-green-500 focus:outline-none transition-all duration-300 text-lg min-h-[120px] resize-none"
                    value={descEdit}
                    onChange={(e) => setDescEdit(e.target.value)}
                    placeholder="Enter video description"
                  />
                </div>
                
                <button
                  onClick={handleUpdateVideo}
                  className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white px-8 py-4 rounded-2xl font-semibold text-lg transition-all duration-300 transform hover:scale-[1.02] shadow-lg hover:shadow-xl"
                >
                  <Save className="w-5 h-5 inline mr-2" />
                  Update Video
                </button>
              </div>
            </div>

            {/* Comments Section */}
            <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-purple-100 rounded-xl">
                  <MessageCircle className="w-6 h-6 text-purple-600" />
                </div>
                <h4 className="text-2xl font-bold text-gray-900">Comments</h4>
              </div>
              
              <div className="space-y-6">
                <div className="flex gap-4">
                  <input
                    className="flex-1 px-6 py-4 border-2 border-gray-200 rounded-2xl focus:border-purple-500 focus:outline-none transition-all duration-300 text-lg"
                    placeholder="Share your thoughts..."
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                  />
                  <button
                    onClick={handleComment}
                    className="bg-gradient-to-r from-purple-600 to-violet-600 hover:from-purple-700 hover:to-violet-700 text-white px-8 py-4 rounded-2xl font-semibold transition-all duration-300 transform hover:scale-[1.02] shadow-lg hover:shadow-xl"
                  >
                    <Send className="w-5 h-5" />
                  </button>
                </div>
                
                <div className="space-y-4">
                  {comments.map((c) => (
                    <div key={c._id} className="bg-gradient-to-r from-gray-50 to-gray-100 rounded-2xl p-6 border border-gray-200">
                      <div className="flex justify-between items-start mb-4">
                        <p className="text-gray-800 text-lg leading-relaxed flex-1">{c.text}</p>
                        {c.userId === userId && (
                          <button
                            onClick={() => handleDelete(c._id)}
                            className="ml-4 p-2 text-red-500 hover:text-red-700 hover:bg-red-50 rounded-xl transition-all duration-200"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        )}
                      </div>
                      
                      {c.replies?.map((r) => (
                        <div key={r._id} className="ml-6 pl-6 border-l-2 border-gray-300 py-2">
                          <div className="flex items-center gap-2 text-gray-600">
                            <Reply className="w-4 h-4" />
                            <span className="text-base">{r.text}</span>
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
            <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-yellow-100 rounded-xl">
                  <StickyNote className="w-6 h-6 text-yellow-600" />
                </div>
                <h4 className="text-2xl font-bold text-gray-900">Personal Notes</h4>
              </div>
              
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Your Notes</label>
                  <textarea
                    className="w-full px-6 py-4 border-2 border-gray-200 rounded-2xl focus:border-yellow-500 focus:outline-none transition-all duration-300 text-lg min-h-[150px] resize-none"
                    value={note}
                    onChange={(e) => setNote(e.target.value)}
                    placeholder="Jot down your ideas, thoughts, and reminders for this video..."
                  />
                </div>
                
                <button
                  onClick={handleNoteUpdate}
                  className="bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-white px-8 py-4 rounded-2xl font-semibold text-lg transition-all duration-300 transform hover:scale-[1.02] shadow-lg hover:shadow-xl"
                >
                  <Save className="w-5 h-5 inline mr-2" />
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
    <div className="mt-4 flex gap-3">
      <input
        className="flex-1 px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none transition-all duration-300"
        placeholder="Write a reply..."
        value={reply}
        onChange={(e) => setReply(e.target.value)}
      />
      <button
        className="bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-300 transform hover:scale-[1.02] shadow-md hover:shadow-lg"
        onClick={() => {
          onReply(parentId, reply);
          setReply("");
        }}
      >
        <Reply className="w-4 h-4" />
      </button>
    </div>
  );
};

export default Dashboard;