import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Card } from '../components/ui/Card';

const Blog: React.FC = () => {
  const { t } = useTranslation();
  const [selectedCategory, setSelectedCategory] = useState(t('blog.categories.all'));

  const categories = [
    t('blog.categories.all'),
    t('blog.categories.careerTips'),
    t('blog.categories.recruiting'),
    t('blog.categories.remoteWork'),
    t('blog.categories.tech'),
    t('blog.categories.interviewTips')
  ];

  const featuredPost = {
    title: t('blog.featured.title'),
    excerpt: t('blog.featured.excerpt'),
    author: t('blog.featured.author'),
    date: t('blog.featured.date'),
    readTime: t('blog.featured.readTime'),
    category: t('blog.categories.recruiting'),
    image: '🤖'
  };

  const blogPosts = [
    {
      title: t('blog.posts.0.title'),
      excerpt: t('blog.posts.0.excerpt'),
      author: t('blog.posts.0.author'),
      date: t('blog.posts.0.date'),
      readTime: t('blog.posts.0.readTime'),
      category: t('blog.categories.interviewTips'),
      image: '💼'
    },
    {
      title: t('blog.posts.1.title'),
      excerpt: t('blog.posts.1.excerpt'),
      author: t('blog.posts.1.author'),
      date: t('blog.posts.1.date'),
      readTime: t('blog.posts.1.readTime'),
      category: t('blog.categories.remoteWork'),
      image: '🏠'
    },
    {
      title: t('blog.posts.2.title'),
      excerpt: t('blog.posts.2.excerpt'),
      author: t('blog.posts.2.author'),
      date: t('blog.posts.2.date'),
      readTime: t('blog.posts.2.readTime'),
      category: t('blog.categories.careerTips'),
      image: '💰'
    },
    {
      title: t('blog.posts.3.title'),
      excerpt: t('blog.posts.3.excerpt'),
      author: t('blog.posts.3.author'),
      date: t('blog.posts.3.date'),
      readTime: t('blog.posts.3.readTime'),
      category: t('blog.categories.tech'),
      image: '💻'
    },
    {
      title: t('blog.posts.4.title'),
      excerpt: t('blog.posts.4.excerpt'),
      author: t('blog.posts.4.author'),
      date: t('blog.posts.4.date'),
      readTime: t('blog.posts.4.readTime'),
      category: t('blog.categories.recruiting'),
      image: '🌟'
    },
    {
      title: t('blog.posts.5.title'),
      excerpt: t('blog.posts.5.excerpt'),
      author: t('blog.posts.5.author'),
      date: t('blog.posts.5.date'),
      readTime: t('blog.posts.5.readTime'),
      category: t('blog.categories.careerTips'),
      image: '🚀'
    },
    {
      title: t('blog.posts.6.title'),
      excerpt: t('blog.posts.6.excerpt'),
      author: t('blog.posts.6.author'),
      date: t('blog.posts.6.date'),
      readTime: t('blog.posts.6.readTime'),
      category: t('blog.categories.recruiting'),
      image: '✍️'
    },
    {
      title: t('blog.posts.7.title'),
      excerpt: t('blog.posts.7.excerpt'),
      author: t('blog.posts.7.author'),
      date: t('blog.posts.7.date'),
      readTime: t('blog.posts.7.readTime'),
      category: t('blog.categories.careerTips'),
      image: '🔗'
    },
    {
      title: t('blog.posts.8.title'),
      excerpt: t('blog.posts.8.excerpt'),
      author: t('blog.posts.8.author'),
      date: t('blog.posts.8.date'),
      readTime: t('blog.posts.8.readTime'),
      category: t('blog.categories.remoteWork'),
      image: '🌍'
    }
  ];

  const filteredPosts = selectedCategory === t('blog.categories.all') 
    ? blogPosts 
    : blogPosts.filter(post => post.category === selectedCategory);

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-pink-50 dark:bg-[#2C6C8B]">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-orange-500 to-pink-600 dark:bg-[#2C6C8B] text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl font-bold mb-6">
            {t('blog.hero.title')}
          </h1>
          <p className="text-xl max-w-3xl mx-auto">
            {t('blog.hero.subtitle')}
          </p>
        </div>
      </div>

      {/* Featured Post */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-12">
        <Card className="overflow-hidden shadow-2xl hover:shadow-3xl transition-shadow">
          <div className="grid lg:grid-cols-2 gap-8">
            <div className="bg-gradient-to-br from-blue-500 to-purple-600 h-96 lg:h-auto flex items-center justify-center text-9xl">
              {featuredPost.image}
            </div>
            <div className="p-8 lg:p-12 flex flex-col justify-center">
              <span className="inline-block px-4 py-2 bg-orange-100 text-orange-700 rounded-full text-sm font-semibold mb-4 w-fit">
                ⭐ {t('blog.featured.badge')}
              </span>
              <h2 className="text-4xl font-bold mb-4 text-gray-900">
                {t('blog.featured.title')}
              </h2>
              <p className="text-lg text-gray-600 mb-6">
                {t('blog.featured.excerpt')}
              </p>
              <div className="flex items-center gap-4 text-sm text-gray-500 mb-6">
                <span>👤 {t('blog.featured.author')}</span>
                <span>•</span>
                <span>📅 {t('blog.featured.date')}</span>
                <span>•</span>
                <span>⏱️ {t('blog.featured.readTime')}</span>
              </div>
              <button className="bg-gradient-to-r from-orange-500 to-pink-600 hover:from-orange-600 hover:to-pink-700 text-white px-8 py-4 rounded-xl font-bold text-lg shadow-lg hover:shadow-xl transition-all w-fit">
                {t('blog.readArticle')}
              </button>
            </div>
          </div>
        </Card>
      </div>

      {/* Category Filter */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-6 py-3 rounded-xl font-semibold transition-all ${
                selectedCategory === category
                  ? 'bg-gradient-to-r from-orange-500 to-pink-600 text-white shadow-lg'
                  : 'bg-white dark:bg-[#BCD4E6] text-gray-700 hover:bg-gray-100 shadow'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Blog Posts Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredPosts.map((post, index) => (
            <Card key={index} className="overflow-hidden hover:shadow-xl transition-shadow cursor-pointer group">
              <div className="bg-gradient-to-br from-orange-400 to-pink-500 h-48 flex items-center justify-center text-6xl group-hover:scale-105 transition-transform">
                {post.image}
              </div>
              <div className="p-6">
                <span className="inline-block px-3 py-1 bg-orange-100 text-orange-700 rounded-full text-xs font-semibold mb-3">
                  {post.category}
                </span>
                <h3 className="text-xl font-bold mb-3 text-gray-900 group-hover:text-orange-600 transition-colors">
                  {post.title}
                </h3>
                <p className="text-gray-600 mb-4 line-clamp-2">
                  {post.excerpt}
                </p>
                <div className="flex items-center justify-between text-sm text-gray-500">
                  <div className="flex items-center gap-2">
                    <span>👤</span>
                    <span>{post.author}</span>
                  </div>
                  <span>⏱️ {post.readTime}</span>
                </div>
                <div className="text-sm text-gray-400 mt-2">
                  {post.date}
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* Newsletter Section */}
      <div className="bg-gradient-to-r from-orange-500 to-pink-600 text-white py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold mb-6">
            {t('blog.newsletter.title')}
          </h2>
          <p className="text-xl mb-8">
            {t('blog.newsletter.subtitle')}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 max-w-xl mx-auto">
            <input
              type="email"
              placeholder={t('blog.newsletter.placeholder')}
              className="flex-1 px-6 py-4 rounded-xl text-gray-900 focus:outline-none focus:ring-4 focus:ring-white"
            />
            <button className="bg-white text-orange-600 hover:bg-gray-100 px-8 py-4 rounded-xl font-bold whitespace-nowrap shadow-lg transition-all">
              {t('blog.newsletter.subscribe')}
            </button>
          </div>
          <p className="text-sm mt-4 opacity-90">
            {t('blog.newsletter.disclaimer')}
          </p>
        </div>
      </div>

      {/* Popular Tags */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h2 className="text-3xl font-bold text-center mb-8 text-gray-900">
          {t('blog.popularTopics')}
        </h2>
        <div className="flex flex-wrap justify-center gap-3">
          {[
            t('blog.tags.0'),
            t('blog.tags.1'),
            t('blog.tags.2'),
            t('blog.tags.3'),
            t('blog.tags.4'),
            t('blog.tags.5'),
            t('blog.tags.6'),
            t('blog.tags.7'),
            t('blog.tags.8'),
            t('blog.tags.9'),
            t('blog.tags.10'),
            t('blog.tags.11')
          ].map((tag, index) => (
            <span 
              key={index}
              className="px-5 py-2 bg-gray-100 hover:bg-orange-100 text-gray-700 hover:text-orange-700 rounded-full font-semibold cursor-pointer transition-colors"
            >
              #{tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Blog;
