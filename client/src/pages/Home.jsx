import React from "react";
import { Youtube, Play, Users, BarChart3, MessageSquare, StickyNote } from "lucide-react";

const Home = () => {
  const handleLogin = () => {
    window.location.href = "https://cactro-fsd-test.onrender.com/api/auth/google";
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <div className="flex flex-col items-center justify-center min-h-screen px-4 py-12">
        <div className="text-center max-w-4xl mx-auto">
          {/* Logo and Brand */}
          <div className="mb-12">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-red-500 rounded-2xl mb-6 shadow-lg">
              <Youtube className="w-8 h-8 text-white" />
            </div>
            
            <h1 className="text-4xl md:text-5xl font-bold text-slate-800 mb-2">
              YouTube Companion
            </h1>
            
            <h2 className="text-2xl md:text-3xl font-medium text-slate-600 mb-4">
              Dashboard
            </h2>
            
            <p className="text-lg text-slate-600 leading-relaxed max-w-2xl mx-auto mb-10">
              Your ultimate toolkit for managing YouTube content. Edit videos, engage with comments, 
              and organize your thoughts—all in one clean interface.
            </p>
          </div>

          {/* Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200 hover:shadow-md transition-shadow duration-200">
              <div className="p-2 bg-red-100 rounded-lg mb-4 w-fit mx-auto">
                <Play className="w-5 h-5 text-red-600" />
              </div>
              <h3 className="text-slate-800 font-semibold mb-2">Video Management</h3>
              <p className="text-slate-600 text-sm">Edit titles and descriptions directly</p>
            </div>
            
            <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200 hover:shadow-md transition-shadow duration-200">
              <div className="p-2 bg-purple-100 rounded-lg mb-4 w-fit mx-auto">
                <MessageSquare className="w-5 h-5 text-purple-600" />
              </div>
              <h3 className="text-slate-800 font-semibold mb-2">Comment System</h3>
              <p className="text-slate-600 text-sm">Engage with your community</p>
            </div>
            
            <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200 hover:shadow-md transition-shadow duration-200">
              <div className="p-2 bg-yellow-100 rounded-lg mb-4 w-fit mx-auto">
                <StickyNote className="w-5 h-5 text-yellow-600" />
              </div>
              <h3 className="text-slate-800 font-semibold mb-2">Personal Notes</h3>
              <p className="text-slate-600 text-sm">Keep track of your ideas</p>
            </div>
            
            <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200 hover:shadow-md transition-shadow duration-200">
              <div className="p-2 bg-blue-100 rounded-lg mb-4 w-fit mx-auto">
                <BarChart3 className="w-5 h-5 text-blue-600" />
              </div>
              <h3 className="text-slate-800 font-semibold mb-2">Analytics Ready</h3>
              <p className="text-slate-600 text-sm">Insights at your fingertips</p>
            </div>
          </div>

          {/* CTA Section */}
          <div className="bg-white rounded-2xl p-8 shadow-sm border border-slate-200 mb-8">
            <h3 className="text-xl font-bold text-slate-800 mb-3">Ready to get started?</h3>
            <p className="text-slate-600 mb-8">
              Sign in with your Google account to access your YouTube content and start managing like a pro.
            </p>
            
            <button
              onClick={handleLogin}
              className="bg-red-500 hover:bg-red-600 text-white px-8 py-3 rounded-xl font-semibold transition-colors duration-200 shadow-sm hover:shadow-md"
            >
              <div className="flex items-center justify-center gap-3">
                <svg className="w-5 h-5" viewBox="0 0 24 24">
                  <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                  <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                </svg>
                Sign in with Google
              </div>
            </button>
          </div>

          {/* Trust Indicators */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 text-slate-500">
            <div className="flex items-center gap-2">
              <Users className="w-4 h-4" />
              <span className="text-sm">Trusted by creators</span>
            </div>
            <div className="hidden sm:block w-1 h-1 bg-slate-300 rounded-full"></div>
            <div className="flex items-center gap-2">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span className="text-sm">Secure & Private</span>
            </div>
            <div className="hidden sm:block w-1 h-1 bg-slate-300 rounded-full"></div>
            <div className="flex items-center gap-2">
              <BarChart3 className="w-4 h-4" />
              <span className="text-sm">Analytics Included</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;