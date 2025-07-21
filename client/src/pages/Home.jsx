import React from "react";
import { Youtube, Play, Users, BarChart3, MessageSquare, StickyNote } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const Home = () => {
  const handleLogin = () => {
    window.location.href = "https://cactro-fsd-test.onrender.com/api/auth/google";
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center max-w-4xl mx-auto">
          {/* Header Section */}
          <div className="mb-16">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-primary rounded-2xl mb-8 shadow-lg">
              <Youtube className="w-10 h-10 text-primary-foreground" />
            </div>
            
            <h1 className="text-5xl md:text-6xl font-bold text-foreground mb-4">
              YouTube Companion
            </h1>
            
            <h2 className="text-2xl md:text-3xl font-medium text-muted-foreground mb-6">
              Dashboard
            </h2>
            
            <p className="text-xl text-muted-foreground leading-relaxed max-w-2xl mx-auto">
              Your ultimate toolkit for managing YouTube content. Edit videos, engage with comments, 
              and organize your thoughts—all in one professional interface.
            </p>
          </div>

          {/* Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            <Card className="border-border hover:shadow-lg transition-shadow duration-200">
              <CardContent className="p-6 text-center">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-primary/10 rounded-xl mb-4">
                  <Play className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-semibold text-foreground mb-2">Video Management</h3>
                <p className="text-sm text-muted-foreground">Edit titles and descriptions directly</p>
              </CardContent>
            </Card>
            
            <Card className="border-border hover:shadow-lg transition-shadow duration-200">
              <CardContent className="p-6 text-center">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-primary/10 rounded-xl mb-4">
                  <MessageSquare className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-semibold text-foreground mb-2">Comment System</h3>
                <p className="text-sm text-muted-foreground">Engage with your community</p>
              </CardContent>
            </Card>
            
            <Card className="border-border hover:shadow-lg transition-shadow duration-200">
              <CardContent className="p-6 text-center">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-primary/10 rounded-xl mb-4">
                  <StickyNote className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-semibold text-foreground mb-2">Personal Notes</h3>
                <p className="text-sm text-muted-foreground">Keep track of your ideas</p>
              </CardContent>
            </Card>
            
            <Card className="border-border hover:shadow-lg transition-shadow duration-200">
              <CardContent className="p-6 text-center">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-primary/10 rounded-xl mb-4">
                  <BarChart3 className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-semibold text-foreground mb-2">Analytics Ready</h3>
                <p className="text-sm text-muted-foreground">Insights at your fingertips</p>
              </CardContent>
            </Card>
          </div>

          {/* CTA Section */}
          <Card className="border-border mb-12">
            <CardContent className="p-8 text-center">
              <h3 className="text-2xl font-bold text-foreground mb-4">Ready to get started?</h3>
              <p className="text-muted-foreground mb-8 text-lg max-w-2xl mx-auto">
                Sign in with your Google account to access your YouTube content and start managing like a pro.
              </p>
              
              <Button
                onClick={handleLogin}
                size="lg"
                className="text-lg px-8 py-6 h-auto"
              >
                <div className="flex items-center gap-3">
                  <svg className="w-5 h-5" viewBox="0 0 24 24">
                    <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                    <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                    <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                    <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                  </svg>
                  Sign in with Google
                </div>
              </Button>
            </CardContent>
          </Card>

          {/* Trust Indicators */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-8 text-muted-foreground">
            <div className="flex items-center gap-2">
              <Users className="w-5 h-5" />
              <span>Trusted by creators</span>
            </div>
            <div className="hidden sm:block w-1 h-1 bg-border rounded-full"></div>
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span>Secure & Private</span>
            </div>
            <div className="hidden sm:block w-1 h-1 bg-border rounded-full"></div>
            <div className="flex items-center gap-2">
              <BarChart3 className="w-5 h-5" />
              <span>Analytics Included</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;