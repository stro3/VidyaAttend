
"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { User } from "lucide-react";
import React, { useRef, useState } from "react";

export default function ProfilePage() {
  const [avatarPreview, setAvatarPreview] = useState<string | null>("https://picsum.photos/100");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleAvatarChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatarPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="flex flex-col gap-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight font-headline">Profile Settings</h1>
        <p className="text-muted-foreground">
          Manage your account and personal information.
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <Card className="lg:col-span-2">
            <CardHeader>
                <CardTitle>Personal Information</CardTitle>
                <CardDescription>Update your name and email address.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
                 <div className="flex items-center space-x-4">
                    <Avatar className="h-20 w-20">
                        <AvatarImage src={avatarPreview || undefined} alt="User Avatar" data-ai-hint="user avatar" />
                        <AvatarFallback>
                            <User className="h-10 w-10" />
                        </AvatarFallback>
                    </Avatar>
                    <div className="space-y-1">
                        <Input
                          type="file"
                          ref={fileInputRef}
                          onChange={handleAvatarChange}
                          className="hidden"
                          accept="image/png, image/jpeg, image/gif"
                        />
                        <Button variant="outline" size="sm" onClick={handleButtonClick}>Change Photo</Button>
                        <p className="text-xs text-muted-foreground">JPG, GIF or PNG. 1MB max.</p>
                    </div>
                </div>
                <div className="space-y-2">
                    <Label htmlFor="name">Full Name</Label>
                    <Input id="name" defaultValue="Teacher" />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="email">Email Address</Label>
                    <Input id="email" type="email" defaultValue="teacher@vidya.com" />
                </div>
                 <div className="flex justify-end">
                    <Button>Save Changes</Button>
                </div>
            </CardContent>
        </Card>
        <Card>
            <CardHeader>
                <CardTitle>Change Password</CardTitle>
                <CardDescription>Set a new password for your account.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
                <div className="space-y-2">
                    <Label htmlFor="current-password">Current Password</Label>
                    <Input id="current-password" type="password" placeholder="••••••••" />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="new-password">New Password</Label>
                    <Input id="new-password" type="password" placeholder="••••••••" />
                </div>
                 <div className="space-y-2">
                    <Label htmlFor="confirm-password">Confirm New Password</Label>
                    <Input id="confirm-password" type="password" placeholder="••••••••" />
                </div>
                 <div className="flex justify-end">
                    <Button variant="secondary">Update Password</Button>
                </div>
            </CardContent>
        </Card>
      </div>
    </div>
  );
}
