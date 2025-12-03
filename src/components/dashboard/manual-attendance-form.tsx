"use client";

import { useLocalStorage } from "@/hooks/use-local-storage";
import type { AttendanceRecord, Student } from "@/lib/types";
import { DEFAULT_STUDENTS } from "@/lib/data";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Button } from "../ui/button";
import { useToast } from "@/hooks/use-toast";
import { format } from "date-fns";
import { useState, useMemo, useEffect } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../ui/card";
import { AlertCircle, CheckCircle } from "lucide-react";
import { Alert, AlertTitle, AlertDescription } from "../ui/alert";

type AttendanceStatusMap = { [studentId: string]: "Present" | "Tardy" | "Absent" };

export default function ManualAttendanceForm() {
  const [students] = useLocalStorage<Student[]>("students", DEFAULT_STUDENTS);
  const [attendanceRecords, setAttendanceRecords] = useLocalStorage<AttendanceRecord[]>("attendanceRecords", []);
  const [isClient, setIsClient] = useState(false);
  const { toast } = useToast();
  const today = format(new Date(), "yyyy-MM-dd");

  const initialStatuses = useMemo(() => {
    const statuses: AttendanceStatusMap = {};
    students.forEach((student) => {
      const todaysRecord = attendanceRecords.find(
        (rec) => rec.date === today && rec.studentId === student.id
      );
      statuses[student.id] = todaysRecord ? todaysRecord.status : "Absent";
    });
    return statuses;
  }, [students, attendanceRecords, today]);

  const [statuses, setStatuses] = useState<AttendanceStatusMap>(initialStatuses);

  useEffect(() => {
    setIsClient(true);
    setStatuses(initialStatuses);
  }, [initialStatuses]);


  const isAttendanceMarkedToday = useMemo(() => {
      return attendanceRecords.some(rec => rec.date === today);
  }, [attendanceRecords, today]);

  const handleStatusChange = (studentId: string, status: "Present" | "Tardy" | "Absent") => {
    setStatuses((prev) => ({ ...prev, [studentId]: status }));
  };

  const handleSave = () => {
    const newRecordsForToday: AttendanceRecord[] = Object.entries(statuses).map(
      ([studentId, status]) => ({
        date: today,
        studentId,
        status,
      })
    );

    const recordsFromOtherDays = attendanceRecords.filter(
      (rec) => rec.date !== today
    );

    setAttendanceRecords([...recordsFromOtherDays, ...newRecordsForToday]);

    toast({
      title: "Attendance Saved",
      description: "Today's attendance has been successfully updated.",
    });
  };

  if (!isClient) {
      return <div>Loading...</div>
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Mark Today's Attendance</CardTitle>
        <CardDescription>
          For {format(new Date(), "MMMM d, yyyy")}. Any changes will overwrite previous records for today.
        </CardDescription>
      </CardHeader>
      <CardContent>
        {isAttendanceMarkedToday && (
            <Alert className="mb-4 bg-blue-50 border-blue-200 text-blue-800">
                <AlertCircle className="h-4 w-4 !text-blue-600" />
                <AlertTitle>Attendance Already Marked</AlertTitle>
                <AlertDescription>
                    You are editing the attendance records that have already been submitted for today.
                </AlertDescription>
            </Alert>
        )}
        <div className="border rounded-md">
            <Table>
            <TableHeader>
                <TableRow>
                <TableHead>Student</TableHead>
                <TableHead className="w-[300px] text-center">Status</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {students.map((student) => (
                <TableRow key={student.id}>
                    <TableCell>
                        <div className="font-medium">{student.name}</div>
                        <div className="text-sm text-muted-foreground">{student.enrollmentId} | Div: {student.division}</div>
                    </TableCell>
                    <TableCell>
                    <RadioGroup
                        defaultValue={statuses[student.id]}
                        onValueChange={(value) => handleStatusChange(student.id, value as "Present" | "Tardy" | "Absent")}
                        className="flex justify-around"
                    >
                        <div className="flex items-center space-x-2">
                            <RadioGroupItem value="Present" id={`present-${student.id}`} />
                            <Label htmlFor={`present-${student.id}`}>Present</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                            <RadioGroupItem value="Tardy" id={`tardy-${student.id}`} />
                            <Label htmlFor={`tardy-${student.id}`}>Tardy</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                            <RadioGroupItem value="Absent" id={`absent-${student.id}`} />
                            <Label htmlFor={`absent-${student.id}`}>Absent</Label>
                        </div>
                    </RadioGroup>
                    </TableCell>
                </TableRow>
                ))}
            </TableBody>
            </Table>
        </div>
      </CardContent>
      <CardFooter>
         <Button onClick={handleSave}>
            <CheckCircle className="mr-2 h-4 w-4" /> Save Attendance
        </Button>
      </CardFooter>
    </Card>
  );
}
