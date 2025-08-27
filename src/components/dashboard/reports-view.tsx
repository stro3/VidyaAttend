
"use client";

import { useMemo, useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useLocalStorage } from '@/hooks/use-local-storage';
import { DEFAULT_STUDENTS } from '@/lib/data';
import type { AttendanceRecord, Student } from '@/lib/types';
import { School, TrendingUp, UserCheck, UserX } from 'lucide-react';
import { Skeleton } from '../ui/skeleton';
import { Badge } from '../ui/badge';


// Helper function to safely parse date strings from local storage
function parseDateSafe(dateString: string) {
    const date = new Date(dateString);
    if (isNaN(date.getTime())) {
        const parts = dateString.split('-');
        if (parts.length === 3) {
            return new Date(Number(parts[0]), Number(parts[1]) - 1, Number(parts[2]));
        }
        return null;
    }
    return date;
}

export default function ReportsView() {
  const [records] = useLocalStorage<AttendanceRecord[]>('attendanceRecords', []);
  const [students] = useLocalStorage<Student[]>("students", DEFAULT_STUDENTS);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const reportData = useMemo(() => {
    if (!isClient) return { overallPercentage: 0, studentStats: [], bestStudent: null, worstStudent: null };

    const totalPossibleDays = new Set(records.map(r => r.date)).size;
    if (totalPossibleDays === 0) {
      return { 
        overallPercentage: 0, 
        studentStats: students.map(s => ({...s, presentDays: 0, totalDays: 0, percentage: 0})).sort((a,b) => a.name.localeCompare(b.name)),
        bestStudent: null,
        worstStudent: null
      };
    }

    const totalPresentAndTardy = records.filter(r => r.status === 'Present' || r.status === 'Tardy').length;
    const totalPossibleAttendances = students.length * totalPossibleDays;
    const overallPercentage = totalPossibleAttendances > 0 ? (totalPresentAndTardy / totalPossibleAttendances) * 100 : 0;

    const studentStats = students.map(student => {
      const studentRecords = records.filter(r => r.studentId === student.id);
      const presentDays = studentRecords.filter(r => r.status === 'Present' || r.status === 'Tardy').length;
      const percentage = totalPossibleDays > 0 ? (presentDays / totalPossibleDays) * 100 : 0;
      return {
        ...student,
        presentDays,
        totalDays: totalPossibleDays,
        percentage,
      };
    }).sort((a,b) => b.percentage - a.percentage);

    return { 
        overallPercentage, 
        studentStats,
        bestStudent: studentStats.length > 0 ? studentStats[0] : null,
        worstStudent: studentStats.length > 0 ? studentStats[studentStats.length - 1] : null
    };
  }, [records, students, isClient]);

  if (!isClient) {
    return (
        <div className="space-y-6">
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
            <Card>
                <CardHeader>
                    <CardTitle>Student Attendance Summary</CardTitle>
                    <CardDescription>Individual attendance rates for all students.</CardDescription>
                </CardHeader>
                <CardContent>
                   <Skeleton className="h-64 w-full" />
                </CardContent>
            </Card>
        </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Overall Attendance</CardTitle>
            <School className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{reportData.overallPercentage.toFixed(1)}%</div>
            <p className="text-xs text-muted-foreground">Across all students and days</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Recorded Days</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{reportData.studentStats[0]?.totalDays || 0}</div>
            <p className="text-xs text-muted-foreground">Days with attendance taken</p>
          </CardContent>
        </Card>
        <Card className='bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800'>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-green-800 dark:text-green-300">Top Performer</CardTitle>
            <UserCheck className="h-4 w-4 text-green-600 dark:text-green-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-900 dark:text-green-200">{reportData.bestStudent?.name || 'N/A'}</div>
            <p className="text-xs text-green-700 dark:text-green-400">{reportData.bestStudent?.percentage.toFixed(1) || 0}% attendance</p>
          </CardContent>
        </Card>
         <Card className='bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800'>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-red-800 dark:text-red-300">Needs Attention</CardTitle>
            <UserX className="h-4 w-4 text-red-600 dark:text-red-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-900 dark:text-red-200">{reportData.worstStudent?.name || 'N/A'}</div>
            <p className="text-xs text-red-700 dark:text-red-400">{reportData.worstStudent?.percentage.toFixed(1) || 0}% attendance</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Student Attendance Summary</CardTitle>
          <CardDescription>Individual attendance rates for all students, sorted by performance.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="border rounded-md">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className='w-[40px]'>Rank</TableHead>
                  <TableHead className='w-[200px]'>Student</TableHead>
                  <TableHead>Attendance Rate</TableHead>
                  <TableHead className="text-right">Days Present</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {reportData.studentStats.length > 0 ? (
                  reportData.studentStats.map((stat, index) => (
                    <TableRow key={stat.id}>
                      <TableCell className="font-medium text-muted-foreground">{index + 1}</TableCell>
                      <TableCell className="font-medium">{stat.name}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Progress value={stat.percentage} className="w-full max-w-xs" />
                          <span className="text-sm text-muted-foreground font-medium w-16">{stat.percentage.toFixed(1)}%</span>
                        </div>
                      </TableCell>
                      <TableCell className="text-right"><Badge variant="secondary">{stat.presentDays} / {stat.totalDays}</Badge></TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={4} className="h-24 text-center">
                      No report data available. Take attendance to generate reports.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
