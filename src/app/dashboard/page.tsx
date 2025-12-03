
"use client";

import { useState, useEffect, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, PieChart, Pie, Cell } from 'recharts';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ArrowRight, Users, UserCheck, UserX, Percent, Clock, AlertTriangle, Search } from 'lucide-react';
import { useLocalStorage } from '@/hooks/use-local-storage';
import { DEFAULT_STUDENTS } from '@/lib/data';
import type { AttendanceRecord, Student } from '@/lib/types';
import { format, subDays, startOfMonth, endOfMonth, isWithinInterval } from 'date-fns';
import { Skeleton } from '@/components/ui/skeleton';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

// Helper function to safely parse date strings from local storage
function parseDateSafe(dateString: string) {
    const [year, month, day] = dateString.split('-').map(Number);
    // Note: month is 0-indexed in JavaScript Date
    return new Date(year, month - 1, day);
}

export default function DashboardPage() {
  const [attendanceRecords] = useLocalStorage<AttendanceRecord[]>('attendanceRecords', []);
  const [students] = useLocalStorage<Student[]>('students', DEFAULT_STUDENTS);
  const [isClient, setIsClient] = useState(false);
  const [currentDate, setCurrentDate] = useState<Date | null>(null);


  useEffect(() => {
    setIsClient(true);
    setCurrentDate(new Date());
  }, []);

  const today = useMemo(() => {
    if (!currentDate) return null;
    return format(currentDate, 'yyyy-MM-dd')
  }, [currentDate]);

  const { todayStats, weekData, mostAbsences, isAttendancePending } = useMemo(() => {
    if (!isClient || !today || !currentDate) return { todayStats: { present: 0, absent: 0, tardy: 0 }, weekData: [], mostAbsences: [], isAttendancePending: true };

    // Today's stats
    const todayRecords = attendanceRecords.filter(rec => rec.date === today);
    const present = todayRecords.filter(r => r.status === 'Present').length;
    const tardy = todayRecords.filter(r => r.status === 'Tardy').length;
    const absent = students.length - (present + tardy);
    const todayStats = { present, absent, tardy };

    // Weekly chart data
    const last7Days = Array.from({ length: 7 }, (_, i) => subDays(currentDate, i)).reverse();
    const weekData = last7Days.map(day => {
        const dateStr = format(day, 'EEE');
        const dayRecords = attendanceRecords.filter(rec => rec.date === format(day, 'yyyy-MM-dd'));
        const presentCount = dayRecords.filter(r => r.status === 'Present' || r.status === 'Tardy').length;
        return {
            name: dateStr,
            date: format(day, 'MMM d'),
            present: presentCount,
            absent: students.length - presentCount,
        };
    });

    // Students with most absences this month
    const monthStart = startOfMonth(currentDate);
    const monthEnd = endOfMonth(currentDate);

    const studentAbsences = students.map(student => {
        const absences = attendanceRecords.filter(rec => 
            rec.studentId === student.id && 
            rec.status === 'Absent' &&
            isWithinInterval(parseDateSafe(rec.date), { start: monthStart, end: monthEnd })
        ).length;
        return { ...student, absences };
    }).filter(s => s.absences > 0).sort((a, b) => b.absences - a.absences).slice(0, 5);

    return {
        todayStats,
        weekData,
        mostAbsences: studentAbsences,
        isAttendancePending: todayRecords.length === 0,
    };
  }, [attendanceRecords, students, isClient, today, currentDate]);

  const totalStudents = students.length;
  const attendancePercentage = totalStudents > 0 ? ((todayStats.present + todayStats.tardy) / totalStudents) * 100 : 0;
  const pieData = [
      { name: 'Present', value: todayStats.present, color: 'hsl(var(--primary))' },
      { name: 'Absent', value: todayStats.absent, color: 'hsl(var(--destructive))' },
      { name: 'Tardy', value: todayStats.tardy, color: 'hsl(var(--accent))' },
  ];

  if (!isClient || !currentDate) {
     return (
        <div className="flex flex-col gap-8">
            <div>
                <h1 className="text-3xl font-bold tracking-tight font-headline">Teacher Dashboard</h1>
                <p className="text-muted-foreground">Daily tasks and single-class view.</p>
            </div>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                {[...Array(4)].map((_, i) => (
                    <Card key={i}>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <Skeleton className="h-4 w-1/2" />
                            <Skeleton className="h-4 w-4" />
                        </CardHeader>
                        <CardContent>
                            <Skeleton className="h-8 w-1/3 mb-1" />
                            <Skeleton className="h-3 w-full" />
                        </CardContent>
                    </Card>
                ))}
            </div>
            <div className="grid gap-4 lg:grid-cols-5">
                <Card className="lg:col-span-3">
                    <CardHeader>
                        <CardTitle>Weekly Attendance</CardTitle>
                        <CardDescription>Attendance trends for the last 7 days.</CardDescription>
                    </CardHeader>
                    <CardContent className="h-[300px] w-full">
                       <Skeleton className="h-full w-full" />
                    </CardContent>
                </Card>
                 <Card className="lg:col-span-2">
                    <CardHeader>
                        <CardTitle>Today's Breakdown</CardTitle>
                        <CardDescription>Loading...</CardDescription>
                    </CardHeader>
                    <CardContent className="h-[300px] w-full">
                       <Skeleton className="h-full w-full" />
                    </CardContent>
                </Card>
            </div>
        </div>
    );
  }

  return (
    <div className="flex flex-col gap-8">
        <div>
            <h1 className="text-3xl font-bold tracking-tight font-headline">Teacher Dashboard</h1>
            <p className="text-muted-foreground">Daily tasks and single-class view.</p>
        </div>

        {isAttendancePending && (
            <Card className="bg-amber-50 border-amber-200">
                <CardHeader className="flex flex-row items-center gap-4 space-y-0">
                    <AlertTriangle className="text-amber-500 w-8 h-8" />
                    <div>
                        <CardTitle className="text-amber-900">Attendance Pending</CardTitle>
                        <CardDescription className="text-amber-700">Attendance for today has not been marked yet.</CardDescription>
                    </div>
                </CardHeader>
                <CardContent>
                     <Link href="/dashboard/attendance">
                        <Button className="bg-amber-500 hover:bg-amber-600 text-white">
                            Mark Today's Attendance <ArrowRight className="ml-2 h-4 w-4" />
                        </Button>
                    </Link>
                </CardContent>
            </Card>
        )}

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Present</CardTitle>
                <UserCheck className="h-4 w-4 text-green-500" />
            </CardHeader>
            <CardContent>
                <div className="text-2xl font-bold">{todayStats.present}</div>
                <p className="text-xs text-muted-foreground">out of {totalStudents} students</p>
            </CardContent>
            </Card>
            <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Absent</CardTitle>
                <UserX className="h-4 w-4 text-red-500" />
            </CardHeader>
            <CardContent>
                <div className="text-2xl font-bold">{todayStats.absent}</div>
                <p className="text-xs text-muted-foreground">out of {totalStudents} students</p>
            </CardContent>
            </Card>
            <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Tardy</CardTitle>
                <Clock className="h-4 w-4 text-orange-500" />
            </CardHeader>
            <CardContent>
                <div className="text-2xl font-bold">{todayStats.tardy}</div>
                <p className="text-xs text-muted-foreground">Students who arrived late</p>
            </CardContent>
            </Card>
            <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Attendance Rate</CardTitle>
                <Percent className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
                <div className="text-2xl font-bold">{attendancePercentage.toFixed(1)}%</div>
                <p className="text-xs text-muted-foreground">For today's attendance</p>
            </CardContent>
            </Card>
        </div>

        <div className="grid gap-4 lg:grid-cols-5">
            <Card className="lg:col-span-3">
            <CardHeader>
                <CardTitle>Weekly Attendance</CardTitle>
                <CardDescription>Attendance trends for the last 7 days.</CardDescription>
            </CardHeader>
            <CardContent className="h-[300px] w-full">
                <ResponsiveContainer>
                <BarChart data={weekData}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} />
                    <XAxis dataKey="name" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
                    <YAxis stroke="#888888" fontSize={12} tickLine={false} axisLine={false} allowDecimals={false} />
                    <Tooltip
                    contentStyle={{
                        backgroundColor: 'hsl(var(--background))',
                        borderColor: 'hsl(var(--border))',
                    }}
                    />
                    <Bar dataKey="present" fill="hsl(var(--primary))" name="Present" radius={[4, 4, 0, 0]} />
                </BarChart>
                </ResponsiveContainer>
            </CardContent>
            </Card>

            <Card className="lg:col-span-2">
                 <CardHeader>
                    <CardTitle>Today's Breakdown</CardTitle>
                    <CardDescription>{format(currentDate, "MMMM d, yyyy")}</CardDescription>
                </CardHeader>
                <CardContent className="h-[300px] w-full flex items-center justify-center">
                   <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                        <Pie data={pieData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={80} label={(entry) => `${entry.name} (${entry.value})`}>
                            {pieData.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={entry.color} />
                            ))}
                        </Pie>
                        <Tooltip contentStyle={{ backgroundColor: 'hsl(var(--background))', borderColor: 'hsl(var(--border))' }}/>
                        </PieChart>
                    </ResponsiveContainer>
                </CardContent>
            </Card>
        </div>

        <div className="grid gap-4 lg:grid-cols-2">
             <Card>
                <CardHeader>
                    <CardTitle>Actionable Insights</CardTitle>
                    <CardDescription>Students with most absences this month.</CardDescription>
                </CardHeader>
                <CardContent>
                    {mostAbsences.length > 0 ? (
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Student</TableHead>
                                    <TableHead className="text-right">Absences</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {mostAbsences.map(student => (
                                    <TableRow key={student.id}>
                                        <TableCell>{student.name}</TableCell>
                                        <TableCell className="text-right">
                                            <Badge variant="destructive">{student.absences}</Badge>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    ) : (
                        <p className="text-sm text-muted-foreground text-center py-8">No students have been absent this month.</p>
                    )}
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>Generate Student Report</CardTitle>
                    <CardDescription>Quickly pull up a specific student's attendance history.</CardDescription>
                </CardHeader>
                <CardContent className="flex flex-col gap-4">
                    <div className="flex items-center gap-2">
                        <Input placeholder="Search for a student..." />
                        <Button variant="outline" size="icon">
                            <Search className="h-4 w-4" />
                        </Button>
                    </div>
                     <p className="text-sm text-center text-muted-foreground p-4">Student report generation is coming soon.</p>
                </CardContent>
            </Card>
        </div>

    </div>
  );
}
