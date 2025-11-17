"use client";
import { useState } from 'react';

export default function NewsletterAdmin() {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    content: '',
    author: 'opensox.ai team',
    issueNumber: '',
    readTime: ''
  });
  
  const [generatedCode, setGeneratedCode] = useState('');
  const [copied, setCopied] = useState(false);

  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');
  };

  const getNextId = () => {
    return "18"; // Update this to the next ID number
  };

  const generateCode = () => {
    if (!formData.title || !formData.content) {
      alert('Please fill in Title and Content');
      return;
    }

    const slug = generateSlug(formData.title);
    const today = new Date().toISOString().split('T')[0];
    
    const code = `{
  id: "${getNextId()}",
  slug: "${slug}",
  title: "${formData.title}",${formData.description ? `
  description: "${formData.description}",` : ''}
  content: \`${formData.content}\`,
  publishedAt: new Date("${today}"),
  author: "${formData.author}",${formData.issueNumber ? `
  issueNumber: "${formData.issueNumber}",` : ''}${formData.readTime ? `
  readTime: ${formData.readTime},` : ''}
},`;

    setGeneratedCode(code);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(generatedCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleReset = () => {
    setFormData({
      title: '',
      description: '',
      content: '',
      author: 'opensox.ai team',
      issueNumber: '',
      readTime: ''
    });
    setGeneratedCode('');
    setCopied(false);
  };

  return (
    <div className="min-h-screen bg-gray-950 text-gray-100 p-6">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
            Add New Newsletter
          </h1>
          <p className="text-gray-400">Fill in the details below, then copy the generated code to newsletters.ts</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Form Section */}
          <div className="bg-gray-900 rounded-lg border border-gray-800 p-6">
            <h2 className="text-xl font-semibold mb-6 text-purple-400">Newsletter Details</h2>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Title *</label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData({...formData, title: e.target.value})}
                  className="w-full px-4 py-2 bg-gray-950 border border-gray-700 rounded-lg focus:border-purple-500 focus:outline-none"
                  placeholder="January 2025 Updates"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Description (optional)</label>
                <input
                  type="text"
                  value={formData.description}
                  onChange={(e) => setFormData({...formData, description: e.target.value})}
                  className="w-full px-4 py-2 bg-gray-950 border border-gray-700 rounded-lg focus:border-purple-500 focus:outline-none"
                  placeholder="Brief summary of the newsletter"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Content (Markdown) *</label>
                <textarea
                  value={formData.content}
                  onChange={(e) => setFormData({...formData, content: e.target.value})}
                  className="w-full px-4 py-2 bg-gray-950 border border-gray-700 rounded-lg focus:border-purple-500 focus:outline-none font-mono text-sm"
                  rows={12}
                  placeholder="# Welcome to January Updates

We're excited to share what we've been working on!

## New Features

**Feature Name** - Description

## What's Next

- Feature 1
- Feature 2"
                />
                <p className="text-xs text-gray-500 mt-1">
                  Use Markdown: **bold**, *italic*, [links](url), ## headings
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Author</label>
                  <input
                    type="text"
                    value={formData.author}
                    onChange={(e) => setFormData({...formData, author: e.target.value})}
                    className="w-full px-4 py-2 bg-gray-950 border border-gray-700 rounded-lg focus:border-purple-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Issue # (optional)</label>
                  <input
                    type="text"
                    value={formData.issueNumber}
                    onChange={(e) => setFormData({...formData, issueNumber: e.target.value})}
                    className="w-full px-4 py-2 bg-gray-950 border border-gray-700 rounded-lg focus:border-purple-500 focus:outline-none"
                    placeholder="#18"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Read Time (minutes, optional)</label>
                <input
                  type="number"
                  value={formData.readTime}
                  onChange={(e) => setFormData({...formData, readTime: e.target.value})}
                  className="w-full px-4 py-2 bg-gray-950 border border-gray-700 rounded-lg focus:border-purple-500 focus:outline-none"
                  placeholder="8"
                />
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  onClick={generateCode}
                  className="flex-1 bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-3 rounded-lg font-semibold hover:from-purple-600 hover:to-pink-600 transition"
                >
                  Generate Code
                </button>
                <button
                  onClick={handleReset}
                  className="px-6 py-3 bg-gray-800 rounded-lg hover:bg-gray-700 transition"
                >
                  Reset
                </button>
              </div>
            </div>
          </div>

          {/* Output Section */}
          <div className="bg-gray-900 rounded-lg border border-gray-800 p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold text-purple-400">Generated Code</h2>
              {generatedCode && (
                <button
                  onClick={copyToClipboard}
                  className="px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition text-sm font-medium"
                >
                  {copied ? '✓ Copied!' : 'Copy Code'}
                </button>
              )}
            </div>

            {generatedCode ? (
              <div>
                <div className="bg-gray-950 rounded-lg p-4 border border-gray-800 overflow-x-auto">
                  <pre className="text-sm text-purple-300 font-mono whitespace-pre-wrap">
                    {generatedCode}
                  </pre>
                </div>
                
                <div className="mt-6 p-4 bg-blue-950/30 border border-blue-800 rounded-lg">
                  <h3 className="font-semibold mb-2 text-blue-400">📝 Next Steps:</h3>
                  <ol className="text-sm space-y-2 text-gray-300">
                    <li>1. Click "Copy Code" above</li>
                    <li>2. Open <code className="bg-gray-800 px-2 py-1 rounded">data/newsletters.ts</code></li>
                    <li>3. Find the <code className="bg-gray-800 px-2 py-1 rounded">newsletters</code> array</li>
                    <li>4. Paste the code at the <strong>beginning</strong> of the array (after the opening <code>[</code>)</li>
                    <li>5. Save the file</li>
                    <li>6. Commit and push to deploy!</li>
                  </ol>
                </div>
              </div>
            ) : (
              <div className="bg-gray-950 rounded-lg p-12 border border-gray-800 text-center text-gray-500">
                <svg className="w-16 h-16 mx-auto mb-4 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                </svg>
                <p>Fill in the form and click "Generate Code"</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}