"use client";

import { useEffect, useState, useRef } from "react";
import { useSession, signIn } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface ProfileForm {
  name: string;
  email: string;
  currentPassword?: string;
  newPassword?: string;
}

export default function UserProfilePage() {
  const { data: session, update } = useSession();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState<ProfileForm>({ name: "", email: "" });
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [oauthStatus, setOauthStatus] = useState<{ github?: boolean; google?: boolean }>({});
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    (async () => {
      const res = await fetch("/api/user/profile");
      if (res.ok) {
        const { user } = await res.json();
        setForm({ name: user.name || "", email: user.email });
        setImagePreview(user.image || null);
        setOauthStatus({
          github: !!user.accounts?.find((a: any) => a.provider === "github"),
          google: !!user.accounts?.find((a: any) => a.provider === "google"),
        });
      }
      setLoading(false);
    })();
  }, []);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  };

  const onSave = async () => {
    setSaving(true);
    const res = await fetch("/api/user/profile", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    setSaving(false);
    if (res.ok) {
      await update();
      alert("Profile updated");
    } else {
      const j = await res.json();
      alert(j.message || "Update failed");
    }
  };

  const onAvatarChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const formData = new FormData();
    formData.append("file", file);
    const res = await fetch("/api/user/profile/avatar", { method: "POST", body: formData });
    if (res.ok) {
      const j = await res.json();
      setImagePreview(j.url);
      await update();
    } else {
      alert("Failed to upload avatar");
    }
  };

  const connect = async (provider: "github" | "google") => {
    await signIn(provider, { callbackUrl: "/user/profile" });
  };

  if (loading) return <div className="p-6 text-[var(--ds-text-muted)]">Loading…</div>;

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      <h1 className="text-2xl font-extrabold tracking-tight text-white">Your Profile</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Avatar */}
        <Card>
          <CardHeader>
            <CardTitle>Profile Picture</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center gap-4">
              <div className="w-20 h-20 rounded-full overflow-hidden bg-[var(--ds-background-tertiary)] border border-[var(--ds-border-subtle)]">
                {imagePreview ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={imagePreview} alt="avatar" className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-[var(--ds-text-muted)]">No image</div>
                )}
              </div>
              <div>
                <input ref={fileInputRef} type="file" accept="image/*" onChange={onAvatarChange} className="hidden" id="avatar-input" />
                <Button size="sm" onClick={() => fileInputRef.current?.click()}>Upload</Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Profile details */}
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Account Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs text-[var(--ds-text-muted)] mb-1">Username</label>
                <input name="name" value={form.name} onChange={onChange} className="input w-full" placeholder="Your name" />
              </div>
              <div>
                <label className="block text-xs text-[var(--ds-text-muted)] mb-1">Email</label>
                <input name="email" value={form.email} onChange={onChange} className="input w-full" placeholder="you@example.com" />
              </div>
              <div>
                <label className="block text-xs text-[var(--ds-text-muted)] mb-1">Current Password</label>
                <input name="currentPassword" type="password" value={form.currentPassword || ""} onChange={onChange} className="input w-full" placeholder="••••••••" />
              </div>
              <div>
                <label className="block text-xs text-[var(--ds-text-muted)] mb-1">New Password</label>
                <input name="newPassword" type="password" value={form.newPassword || ""} onChange={onChange} className="input w-full" placeholder="Use 12+ chars" />
              </div>
            </div>
            <div className="flex gap-2">
              <Button onClick={onSave} loading={saving}>Save Changes</Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Connections */}
      <Card>
        <CardHeader>
          <CardTitle>Connected Accounts</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-wrap gap-3">
          <Button variant={oauthStatus.github ? "outline" : "default"} onClick={() => connect("github")}>
            {oauthStatus.github ? "GitHub Connected" : "Connect GitHub"}
          </Button>
          <Button variant={oauthStatus.google ? "outline" : "default"} onClick={() => connect("google")}>
            {oauthStatus.google ? "Google Connected" : "Connect Google"}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
