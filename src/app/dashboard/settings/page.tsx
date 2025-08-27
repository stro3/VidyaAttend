
"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/hooks/use-toast";
import { Bell, Brush, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";


export default function SettingsPage() {
    const { toast } = useToast();
    const [theme, setTheme] = useState('system');

    useEffect(() => {
        const storedTheme = localStorage.getItem('theme') || 'system';
        setTheme(storedTheme);
    }, []);

    useEffect(() => {
        if (theme === 'dark') {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
        localStorage.setItem('theme', theme);
    }, [theme]);

  return (
    <div className="flex flex-col gap-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight font-headline">Settings</h1>
        <p className="text-muted-foreground">
          Customize your application experience.
        </p>
      </div>

       <div className="grid gap-6 max-w-2xl">
         <Card>
            <CardHeader>
                <CardTitle className="flex items-center gap-2"><Bell /> Notifications</CardTitle>
                <CardDescription>Manage how you receive notifications from the app.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
                <div className="flex items-center justify-between rounded-lg border p-4">
                    <div className="space-y-0.5">
                        <Label htmlFor="email-notifications">Email Notifications</Label>
                        <p className="text-xs text-muted-foreground">
                            Receive email summaries and alerts.
                        </p>
                    </div>
                     <Switch id="email-notifications" defaultChecked />
                </div>
                 <div className="flex items-center justify-between rounded-lg border p-4">
                    <div className="space-y-0.5">
                        <Label htmlFor="push-notifications">Push Notifications</Label>
                        <p className="text-xs text-muted-foreground">
                           Get real-time alerts on your device.
                        </p>
                    </div>
                     <Switch id="push-notifications" disabled />
                </div>
            </CardContent>
        </Card>

         <Card>
            <CardHeader>
                <CardTitle className="flex items-center gap-2"><Brush /> Appearance</CardTitle>
                <CardDescription>Customize the look and feel of the application.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
                 <div className="space-y-2">
                    <Label htmlFor="theme">Theme</Label>
                    <Select value={theme} onValueChange={setTheme}>
                        <SelectTrigger id="theme">
                            <SelectValue placeholder="Select theme" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="light">Light</SelectItem>
                            <SelectItem value="dark">Dark</SelectItem>
                             <SelectItem value="system" disabled>System</SelectItem>
                        </SelectContent>
                    </Select>
                 </div>
            </CardContent>
        </Card>

        <Card className="border-destructive/50">
            <CardHeader>
                <CardTitle className="flex items-center gap-2 text-destructive"><Trash2 /> Danger Zone</CardTitle>
                <CardDescription>These actions are permanent and cannot be undone.</CardDescription>
            </CardHeader>
            <CardContent className="flex justify-between items-center">
               <p className="text-sm font-medium">Delete all attendance records.</p>
               <Button variant="destructive" onClick={() => {
                   localStorage.removeItem('attendanceRecords');
                   toast({ title: "Data Deleted", description: "All attendance records have been cleared." });
               }}>Delete Data</Button>
            </CardContent>
             <CardFooter className="flex justify-between items-center border-t pt-6">
                <p className="text-sm font-medium">Delete your account.</p>
               <Button variant="destructive" disabled>Delete Account</Button>
            </CardFooter>
        </Card>
      </div>

    </div>
  );
}
