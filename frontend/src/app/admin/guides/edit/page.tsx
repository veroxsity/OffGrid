'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import AdminLayout from '@/components/admin/AdminLayout';
import GuideEditor from '@/components/admin/GuideEditor';

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
}

export default function EditGuidePage() {
  const [initialData, setInitialData] = useState<Partial<GuideFormData> | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const searchParams = useSearchParams();
  const slug = searchParams.get('slug');

  useEffect(() => {
    if (slug) {
      fetchGuideData();
    } else {
      setError('No guide slug provided');
      setLoading(false);
    }
  }, [slug]);

  const fetchGuideData = async () => {
    try {
      const response = await fetch(`/api/admin/guides?slug=${encodeURIComponent(slug!)}`);
      
      if (response.ok) {
        const data = await response.json();
        setInitialData({
          title: data.metadata.title,
          description: data.metadata.description,
          category: data.metadata.category,
          difficulty: data.metadata.difficulty,
          time: data.metadata.time,
          tags: data.metadata.tags || [],
          ukSpecific: data.metadata.ukSpecific || false,
          testedOn: data.metadata.testedOn || [],
          content: data.content,
        });
      } else if (response.status === 404) {
        setError('Guide not found');
      } else {
        setError('Failed to load guide');
      }
    } catch (error) {
      console.error('Error fetching guide:', error);
      setError('Error loading guide');
    }
    setLoading(false);
  };

  const handleSave = async (data: GuideFormData) => {
    try {
      const response = await fetch(`/api/admin/guides/${slug}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        alert('Guide updated successfully!');
        router.push('/admin/guides');
      } else {
        const error = await response.json();
        throw new Error(error.message || 'Failed to update guide');
      }
    } catch (error) {
      console.error('Error updating guide:', error);
      throw error;
    }
  };

  const handleCancel = () => {
    if (confirm('Are you sure you want to cancel? Any unsaved changes will be lost.')) {
      router.push('/admin/guides');
    }
  };

  if (loading) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center min-h-96">
          <div className="text-lg text-gray-600 dark:text-gray-400">Loading guide...</div>
        </div>
      </AdminLayout>
    );
  }

  if (error) {
    return (
      <AdminLayout>
        <div className="flex flex-col items-center justify-center min-h-96">
          <div className="text-lg text-red-600 dark:text-red-400 mb-4">{error}</div>
          <button
            onClick={() => router.push('/admin/guides')}
            className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
          >
            Back to Guides
          </button>
        </div>
      </AdminLayout>
    );
  }

  if (!initialData) {
    return (
      <AdminLayout>
        <div></div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <GuideEditor
        initialData={initialData}
        isEditing={true}
        onSave={handleSave}
        onCancel={handleCancel}
      />
    </AdminLayout>
  );
}
