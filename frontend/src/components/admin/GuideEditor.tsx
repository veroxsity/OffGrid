'use client';

import { useState, useEffect } from 'react';
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

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 's') {
        e.preventDefault();
        // naive prevent double-submit
        if (!isLoading) {
          (async () => {
            setIsLoading(true);
            try { await onSave(formData); } finally { setIsLoading(false); }
          })();
        }
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [formData, isLoading, onSave]);

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
          <h1 className="text-2xl font-extrabold tracking-tight text-white">
            {isEditing ? 'Edit Guide' : 'Create New Guide'}
          </h1>
          <p className="text-[var(--ds-text-muted)] mt-1 text-sm">
            {isEditing ? 'Update your guide content and metadata' : 'Create a comprehensive guide for the community'}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <div className="hidden sm:flex items-center rounded-[6px] border border-[var(--ds-border-subtle)] bg-[var(--ds-background-tertiary)] overflow-hidden">
            <button type="button" onClick={() => setPreviewMode(false)} className={`px-3 py-1.5 text-sm ${!previewMode ? 'bg-[var(--ds-background-secondary)] text-white' : 'text-[var(--ds-text-muted)] hover:text-[var(--ds-text-normal)]'}`}>Write</button>
            <button type="button" onClick={() => { setPreviewMode(true); fetchPreview(); }} className={`px-3 py-1.5 text-sm ${previewMode ? 'bg-[var(--ds-background-secondary)] text-white' : 'text-[var(--ds-text-muted)] hover:text-[var(--ds-text-normal)]'}`}>Preview</button>
          </div>
          <Button variant="outline" onClick={onCancel}>Cancel</Button>
          <Button onClick={async () => { setIsLoading(true); try { await onSave(formData);} finally { setIsLoading(false);} }} loading={isLoading}>{isEditing ? 'Update' : 'Create'}</Button>
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
                  <label className="block text-xs text-[var(--ds-text-muted)] mb-1">Title *</label>
                  <input
                    type="text"
                    required
                    value={formData.title}
                    onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                    className="input w-full"
                    placeholder="e.g., Plex on Ubuntu"
                  />
                </div>

                <div>
                  <label className="block text-xs text-[var(--ds-text-muted)] mb-1">Description *</label>
                  <textarea
                    required
                    rows={3}
                    value={formData.description}
                    onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                    className="input w-full min-h-24"
                    placeholder="Brief description of what this guide covers..."
                  />
                </div>

                <div>
                  <label className="block text-xs text-[var(--ds-text-muted)] mb-1">Category *</label>
                  <select
                    required
                    value={formData.category}
                    onChange={(e) => setFormData(prev => ({ ...prev, category: e.target.value }))}
                    className="input w-full"
                  >
                    {categories.map(category => (
                      <option key={category} value={category}>{category}</option>
                    ))}
                  </select>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs text-[var(--ds-text-muted)] mb-1">Difficulty *</label>
                    <select
                      required
                      value={formData.difficulty}
                      onChange={(e) => setFormData(prev => ({ ...prev, difficulty: e.target.value as any }))}
                      className="input w-full"
                    >
                      {difficulties.map(difficulty => (
                        <option key={difficulty} value={difficulty}>{difficulty}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs text-[var(--ds-text-muted)] mb-1">Time *</label>
                    <input
                      type="text"
                      required
                      value={formData.time}
                      onChange={(e) => setFormData(prev => ({ ...prev, time: e.target.value }))}
                      className="input w-full"
                      placeholder="e.g., 30 minutes"
                    />
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={formData.ukSpecific}
                    onChange={(e) => setFormData(prev => ({ ...prev, ukSpecific: e.target.checked }))}
                    className="accent-[var(--ds-background-accent)]"
                  />
                  <span className="text-sm text-[var(--ds-text-normal)]">🇬🇧 UK Specific Guide</span>
                </div>

                <div>
                  <label className="block text-xs text-[var(--ds-text-muted)] mb-1">Status *</label>
                  <select
                    value={formData.status}
                    onChange={e => setFormData(p => ({ ...p, status: e.target.value as any }))}
                    className="input w-full"
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
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={tagInput}
                    onChange={(e) => setTagInput(e.target.value)}
                    onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ',') { e.preventDefault(); addTag(); } }}
                    className="input flex-1"
                    placeholder="Add a tag and press Enter"
                  />
                  <Button type="button" onClick={addTag} size="sm">Add</Button>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {formData.tags.map(tag => (
                    <span key={tag} className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold bg-[var(--ds-background-tertiary)] text-[var(--ds-text-muted)] border border-[var(--ds-border-subtle)]">
                      #{tag}
                      <button type="button" onClick={() => removeTag(tag)} className="hover:text-white">×</button>
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
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={testedOnInput}
                    onChange={(e) => setTestedOnInput(e.target.value)}
                    onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ',') { e.preventDefault(); addTestedOn(); } }}
                    className="input flex-1"
                    placeholder="e.g., Ubuntu 22.04"
                  />
                  <Button type="button" onClick={addTestedOn} size="sm">Add</Button>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {formData.testedOn.map(item => (
                    <span key={item} className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold bg-[var(--ds-background-tertiary)] text-[var(--ds-text-muted)] border border-[var(--ds-border-subtle)]">
                      {item}
                      <button type="button" onClick={() => removeTestedOn(item)} className="hover:text-white">×</button>
                    </span>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Content Section */}
          <div className="lg:col-span-2">
            <Card className="h-full">
              <CardHeader className="sticky top-14 z-10 bg-[var(--ds-background-secondary)] border-b border-[var(--ds-border-subtle)] rounded-t-[8px]">
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Guide Content</CardTitle>
                    <CardDescription>Write in MDX. Code fences supported.</CardDescription>
                  </div>
                  <div className="flex items-center rounded-[6px] border border-[var(--ds-border-subtle)] bg-[var(--ds-background-tertiary)] overflow-hidden">
                    <button type="button" onClick={() => setPreviewMode(false)} className={`px-3 py-1.5 text-sm ${!previewMode ? 'bg-[var(--ds-background-secondary)] text-white' : 'text-[var(--ds-text-muted)] hover:text-[var(--ds-text-normal)]'}`}>Write</button>
                    <button type="button" onClick={() => { setPreviewMode(true); fetchPreview(); }} className={`px-3 py-1.5 text-sm ${previewMode ? 'bg-[var(--ds-background-secondary)] text-white' : 'text-[var(--ds-text-muted)] hover:text-[var(--ds-text-normal)]'}`}>Preview</button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                {previewMode ? (
                  <div className="border border-[var(--ds-border-subtle)] rounded-lg min-h-96 bg-[var(--ds-background-primary)] relative">
                    {previewLoading && (
                      <div className="absolute inset-0 flex items-center justify-center bg-[var(--ds-background-floating)]/70 rounded-lg">
                        <LoadingSpinner size="sm" text="Rendering preview" />
                      </div>
                    )}
                    {!previewLoading && previewError && (
                      <div className="p-4 text-sm text-[var(--ds-danger)] font-medium">{previewError}</div>
                    )}
                    {!previewLoading && !previewError && (
                      <div className="prose prose-sm dark:prose-invert max-w-none p-4" dangerouslySetInnerHTML={{ __html: previewHtml }} />
                    )}
                  </div>
                ) : (
                  <>
                    <textarea
                      required
                      value={formData.content}
                      onChange={(e) => setFormData(prev => ({ ...prev, content: e.target.value }))}
                      className="w-full h-[32rem] px-3 py-2 border border-[var(--ds-border-subtle)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--ds-background-accent)] bg-[var(--ds-background-primary)] text-white font-mono text-sm"
                      placeholder={`# Your Guide Title\n\n## Prerequisites\n- Item 1\n\n## Step 1\n\n\`\`\`bash\n# Code example\nsudo apt update\n\`\`\`\n`}
                    />
                    <div className="mt-2 text-[11px] text-[var(--ds-text-muted)]">Tip: Press Ctrl/Cmd+S to save quickly.</div>
                  </>
                )}
              </CardContent>
            </Card>
          </div>
        </div>

        <div className="flex justify-end gap-2 pt-6">
          <Button type="button" variant="outline" onClick={onCancel}>Cancel</Button>
          <Button type="submit" loading={isLoading}>{isEditing ? 'Update Guide' : 'Create Guide'}</Button>
        </div>
      </form>
    </div>
  );
}
