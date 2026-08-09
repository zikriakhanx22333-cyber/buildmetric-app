import React, { useState } from 'react';
import { BLOG_POSTS } from '../data/blogPosts';
import { BlogPost } from '../types';
import { BookOpen, Clock, User, ArrowLeft, ArrowRight, ShieldCheck } from 'lucide-react';

export const BlogView: React.FC = () => {
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);

  if (selectedPost) {
    return (
      <div className="py-12 bg-slate-50 min-h-screen">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          <button
            onClick={() => setSelectedPost(null)}
            className="inline-flex items-center gap-2 text-xs font-bold text-slate-700 bg-white border border-slate-200 px-4 py-2 rounded-xl shadow-sm hover:bg-slate-100"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to All Articles</span>
          </button>

          <article className="bg-white rounded-3xl border border-slate-200 p-8 shadow-sm space-y-6">
            <div className="flex items-center gap-3 text-xs font-bold text-[#0F2D5C]">
              <span className="bg-blue-100 px-3 py-1 rounded-full">{selectedPost.category}</span>
              <span>•</span>
              <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" /> {selectedPost.readTime}</span>
            </div>

            <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
              {selectedPost.title}
            </h1>

            <div className="flex items-center gap-3 text-xs text-slate-500 pb-4 border-b border-slate-100">
              <User className="w-4 h-4 text-slate-400" />
              <span>By <strong>{selectedPost.author}</strong></span>
              <span>•</span>
              <span>Published on {selectedPost.date}</span>
            </div>

            <div className="prose prose-slate max-w-none text-slate-700 leading-relaxed space-y-4 text-sm sm:text-base">
              <p className="text-lg font-semibold text-slate-800 leading-relaxed bg-slate-50 p-4 rounded-xl border border-slate-200">
                {selectedPost.summary}
              </p>
              
              <div className="whitespace-pre-line">
                {selectedPost.content}
              </div>
            </div>
          </article>
        </div>
      </div>
    );
  }

  return (
    <div className="py-12 bg-slate-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <span className="text-xs font-bold uppercase tracking-widest text-[#0F2D5C] bg-blue-100 px-3 py-1 rounded-full">
            Engineering Insights
          </span>
          <h1 className="text-3xl font-black text-slate-900 tracking-tight">
            BuildMetric Civil Engineering Blog
          </h1>
          <p className="text-slate-600 text-sm">
            Practical estimation tips, structural material formulas, and site execution guides.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {BLOG_POSTS.map((post) => (
            <div
              key={post.id}
              onClick={() => setSelectedPost(post)}
              className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm hover:shadow-xl hover:border-[#0F2D5C]/30 transition-all cursor-pointer flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-center justify-between text-xs font-bold text-slate-400 mb-3">
                  <span className="text-[#0F2D5C] bg-blue-50 px-2.5 py-0.5 rounded">{post.category}</span>
                  <span>{post.readTime}</span>
                </div>

                <h3 className="font-bold text-slate-900 text-lg group-hover:text-[#0F2D5C] transition-colors mb-2 line-clamp-2">
                  {post.title}
                </h3>

                <p className="text-xs text-slate-600 line-clamp-3 leading-relaxed mb-4">
                  {post.summary}
                </p>
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-[#0F2D5C]">
                <span>Read Full Article</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
};
