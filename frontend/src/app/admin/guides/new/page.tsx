'use client';

import { useRouter } from 'next/navigation';
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

export default function NewGuidePage() {
  const router = useRouter();

  const handleSave = async (data: GuideFormData) => {
    try {
      const response = await fetch('/api/admin/guides', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        const result = await response.json();
        alert('Guide created successfully!');
        router.push('/admin/guides');
      } else {
        const error = await response.json();
        throw new Error(error.message || 'Failed to create guide');
      }
    } catch (error) {
      console.error('Error creating guide:', error);
      throw error;
    }
  };

  const handleCancel = () => {
    if (confirm('Are you sure you want to cancel? Any unsaved changes will be lost.')) {
      router.push('/admin/guides');
    }
  };

  return (
    <AdminLayout>
      <GuideEditor
        onSave={handleSave}
        onCancel={handleCancel}
      />
    </AdminLayout>
  );
}
