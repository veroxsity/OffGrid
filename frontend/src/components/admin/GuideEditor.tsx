'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import LoadingSpinner from '@/components/ui/loading-spinner';

interface GuideFormData {
  title: string;
  description: string;
  category: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  time: string;
  tags: string[];
  ukSpecific: boolean;
  testedOn: string[];
  content: string;
  status?: 'draft' | 'published';
}

interface GuideEditorProps {
  initialData?: Partial<GuideFormData>;
  isEditing?: boolean;
  onSave: (data: GuideFormData) => Promise<void>;
  onCancel: () => void;
}

const categories = [
  'Home Servers',
  'VPN & Tunnels',
  'Networking',
  'Security & Privacy',
  'Storage & Backup',
];

const difficulties = ['Beginner', 'Intermediate', 'Advanced'] as const;

export default function GuideEditor({ initialData, isEditing = false, onSave, onCancel }: GuideEditorProps) {
  const [formData, setFormData] = useState<GuideFormData>({
    title: initialData?.title || '',
    description: initialData?.description || '',
    category: initialData?.category || categories[0],
    difficulty: initialData?.difficulty || 'Beginner',
    time: initialData?.time || '',
    tags: initialData?.tags || [],
    ukSpecific: initialData?.ukSpecific || false,
    testedOn: initialData?.testedOn || [],
    content: initialData?.content || '',
    status: (initialData as any)?.status || 'published'
  });

  const [tagInput, setTagInput] = useState('');
  const [testedOnInput, setTestedOnInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [previewMode, setPreviewMode] = useState(false);
  const [previewHtml, setPreviewHtml] = useState<string>('');
  const [previewLoading, setPreviewLoading] = useState(false);
  const [previewError, setPreviewError] = useState<string>('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      await onSave(formData);
    } catch (error) {
      console.error('Error saving guide:', error);
      alert('Error saving guide. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const addTag = () => {
    if (tagInput.trim() && !formData.tags.includes(tagInput.trim())) {
      setFormData(prev => ({
        ...prev,
        tags: [...prev.tags, tagInput.trim()]
      }));
      setTagInput('');
    }
  };

  const removeTag = (tagToRemove: string) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags.filter(tag => tag !== tagToRemove)
    }));
  };

  const addTestedOn = () => {
    if (testedOnInput.trim() && !formData.testedOn.includes(testedOnInput.trim())) {
      setFormData(prev => ({
        ...prev,
        testedOn: [...prev.testedOn, testedOnInput.trim()]
      }));
      setTestedOnInput('');
    }
  };

  const removeTestedOn = (itemToRemove: string) => {
    setFormData(prev => ({
      ...prev,
      testedOn: prev.testedOn.filter(item => item !== itemToRemove)
    }));
  };

  const fetchPreview = async () => {
    setPreviewLoading(true);
    setPreviewError('');
    try {
      const res = await fetch('/api/preview/mdx', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ content: formData.content }),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.message || 'Preview failed');
      }
      const data = await res.json();
      setPreviewHtml(typeof data.html === 'string' ? data.html : '<p>(Preview rendering placeholder)</p>');
    } catch (e: any) {
      setPreviewError(e.message);
    } finally {
      setPreviewLoading(false);
    }
  };

  const togglePreview = () => {
    const next = !previewMode;
    setPreviewMode(next);
    if (!previewMode) {
      fetchPreview();
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            {isEditing ? 'Edit Guide' : 'Create New Guide'}
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2">
            {isEditing ? 'Update your guide content and metadata' : 'Create a comprehensive guide for the community'}
          </p>
        </div>
        <div className="flex items-center space-x-3">
          <Button
            type="button"
            variant="outline"
            onClick={togglePreview}
          >
            {previewMode ? 'Edit' : 'Preview'}
          </Button>
          <Button variant="outline" onClick={onCancel}>
            Cancel
          </Button>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Metadata Section */}
          <div className="lg:col-span-1 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Guide Information</CardTitle>
                <CardDescription>Basic metadata about your guide</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Title *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.title}
                    onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                    placeholder="e.g., Setting up Plex Media Server on Ubuntu"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Description *
                  </label>
                  <textarea
                    required
                    rows={3}
                    value={formData.description}
                    onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                    placeholder="Brief description of what this guide covers..."
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Category *
                  </label>
                  <select
                    required
                    value={formData.category}
                    onChange={(e) => setFormData(prev => ({ ...prev, category: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                  >
                    {categories.map(category => (
                      <option key={category} value={category}>{category}</option>
                    ))}
                  </select>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Difficulty *
                    </label>
                    <select
                      required
                      value={formData.difficulty}
                      onChange={(e) => setFormData(prev => ({ ...prev, difficulty: e.target.value as any }))}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                    >
                      {difficulties.map(difficulty => (
                        <option key={difficulty} value={difficulty}>{difficulty}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Time *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.time}
                      onChange={(e) => setFormData(prev => ({ ...prev, time: e.target.value }))}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                      placeholder="e.g., 30 minutes"
                    />
                  </div>
                </div>

                <div>
                  <label className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      checked={formData.ukSpecific}
                      onChange={(e) => setFormData(prev => ({ ...prev, ukSpecific: e.target.checked }))}
                      className="rounded border-gray-300 text-red-600 focus:ring-red-500"
                    />
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                      🇬🇧 UK Specific Guide
                    </span>
                  </label>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Status *</label>
                  <select
                    value={formData.status}
                    onChange={e => setFormData(p => ({ ...p, status: e.target.value as any }))}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                  >
                    <option value="published">Published</option>
                    <option value="draft">Draft</option>
                  </select>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Tags</CardTitle>
                <CardDescription>Help users find your guide</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex space-x-2">
                  <input
                    type="text"
                    value={tagInput}
                    onChange={(e) => setTagInput(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addTag())}
                    className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                    placeholder="Add a tag..."
                  />
                  <Button type="button" onClick={addTag} size="sm">
                    Add
                  </Button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {formData.tags.map(tag => (
                    <span
                      key={tag}
                      className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400"
                    >
                      #{tag}
                      <button
                        type="button"
                        onClick={() => removeTag(tag)}
                        className="ml-1 text-red-600 hover:text-red-800"
                      >
                        ×
                      </button>
                    </span>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Tested On</CardTitle>
                <CardDescription>Platforms this guide was tested on</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex space-x-2">
                  <input
                    type="text"
                    value={testedOnInput}
                    onChange={(e) => setTestedOnInput(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addTestedOn())}
                    className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                    placeholder="e.g., Ubuntu 22.04"
                  />
                  <Button type="button" onClick={addTestedOn} size="sm">
                    Add
                  </Button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {formData.testedOn.map(item => (
                    <span
                      key={item}
                      className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300"
                    >
                      {item}
                      <button
                        type="button"
                        onClick={() => removeTestedOn(item)}
                        className="ml-1 text-gray-600 hover:text-gray-800"
                      >
                        ×
                      </button>
                    </span>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Content Section */}
          <div className="lg:col-span-2">
            <Card className="h-full">
              <CardHeader>
                <CardTitle>Guide Content</CardTitle>
                <CardDescription>
                  Write your guide in MDX format. You can use markdown syntax and include code blocks.
                </CardDescription>
              </CardHeader>
              <CardContent>
                {previewMode ? (
                  <div className="border border-gray-300 dark:border-gray-600 rounded-lg min-h-96 bg-gray-50 dark:bg-gray-800 relative">
                    {previewLoading && (
                      <div className="absolute inset-0 flex items-center justify-center bg-white/70 dark:bg-gray-900/70 rounded-lg">
                        <LoadingSpinner size="sm" text="Rendering preview" />
                      </div>
                    )}
                    {!previewLoading && previewError && (
                      <div className="p-4 text-sm text-red-600 dark:text-red-400 font-medium">{previewError}</div>
                    )}
                    {!previewLoading && !previewError && (
                      <div className="prose prose-sm dark:prose-invert max-w-none p-4" dangerouslySetInnerHTML={{ __html: previewHtml }} />
                    )}
                    <div className="flex items-center justify-between px-4 py-2 border-t border-gray-200 dark:border-gray-700 bg-gray-100/70 dark:bg-gray-900/40 text-xs text-gray-600 dark:text-gray-400">
                      <span>Preview (sanitized)</span>
                      <button type="button" onClick={fetchPreview} className="inline-flex items-center gap-1 text-red-600 dark:text-red-400 hover:underline disabled:opacity-50" disabled={previewLoading}>
                        Refresh
                        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" /></svg>
                      </button>
                    </div>
                  </div>
                ) : (
                  <textarea
                    required
                    value={formData.content}
                    onChange={(e) => setFormData(prev => ({ ...prev, content: e.target.value }))}
                    className="w-full h-96 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white font-mono text-sm"
                    placeholder="# Your Guide Title

## Prerequisites

Before starting, you'll need:

- Item 1
- Item 2

## Step 1: Getting Started

Your guide content here...

```bash
# Code example
sudo apt update
```

> **Note:** This is a callout box for important information.

## Troubleshooting

Common issues and solutions..."
                  />
                )}
              </CardContent>
            </Card>
          </div>
        </div>

        <div className="flex justify-end space-x-3 pt-6">
          <Button type="button" variant="outline" onClick={onCancel}>
            Cancel
          </Button>
          <Button type="submit" loading={isLoading}>
            {isEditing ? 'Update Guide' : 'Create Guide'}
          </Button>
        </div>
      </form>
    </div>
  );
}
