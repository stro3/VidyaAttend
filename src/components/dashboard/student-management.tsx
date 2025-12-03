
"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { useState, useEffect } from "react";
import { Loader2, UserPlus, Users } from "lucide-react";
import { useLocalStorage } from "@/hooks/use-local-storage";
import type { Student } from "@/lib/types";
import { DEFAULT_STUDENTS } from "@/lib/data";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const addStudentSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  enrollmentId: z.string().min(1, { message: "Enrollment ID is required."}),
  division: z.string().min(1, { message: "Division is required."}),
});

type AddStudentFormValues = z.infer<typeof addStudentSchema>;

export default function StudentManagement() {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [students, setStudents] = useLocalStorage<Student[]>("students", DEFAULT_STUDENTS);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const form = useForm<AddStudentFormValues>({
    resolver: zodResolver(addStudentSchema),
    defaultValues: {
      name: "",
      enrollmentId: "",
      division: "A",
    },
  });

  function getNextStudentId() {
    if (students.length === 0) {
      return "S001";
    }
    const lastId = students.reduce((maxId, student) => {
        const currentNum = parseInt(student.id.substring(1));
        const maxNum = parseInt(maxId.substring(1));
        return currentNum > maxNum ? student.id : maxId;
    }, "S000");

    const lastNum = parseInt(lastId.substring(1));
    return `S${(lastNum + 1).toString().padStart(3, '0')}`;
  }

  function onSubmit(values: AddStudentFormValues) {
    setIsLoading(true);

    const existingStudent = students.find(s => s.enrollmentId.toLowerCase() === values.enrollmentId.toLowerCase());
    if (existingStudent) {
      toast({
        variant: "destructive",
        title: "Student Exists",
        description: "A student with this enrollment ID already exists.",
      });
      setIsLoading(false);
      return;
    }

    const newStudent: Student = {
      id: getNextStudentId(),
      name: values.name,
      enrollmentId: values.enrollmentId,
      division: values.division,
    };

    setStudents([...students, newStudent].sort((a,b) => a.name.localeCompare(b.name)));

    toast({
      title: "Student Added",
      description: `${values.name} has been successfully enrolled.`,
    });
    form.reset();
    setIsLoading(false);
  }

  return (
    <div className="grid gap-6 lg:grid-cols-3">
      <Card className="lg:col-span-1">
        <CardHeader>
          <CardTitle className="flex items-center"><UserPlus className="mr-2" />Add New Student</CardTitle>
          <CardDescription>Enter the details of the new student to enroll them.</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Student Full Name</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., Priya Singh" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
               <FormField
                control={form.control}
                name="enrollmentId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Enrollment ID</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., 2024-001" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
               <FormField
                control={form.control}
                name="division"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Division</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., A" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? <Loader2 className="animate-spin" /> : "Add Student"}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
      <Card className="lg:col-span-2">
        <CardHeader>
          <CardTitle className="flex items-center"><Users className="mr-2" />Enrolled Students</CardTitle>
          <CardDescription>A list of all students currently enrolled.</CardDescription>
        </CardHeader>
        <CardContent>
           <div className="border rounded-md h-[450px] overflow-y-auto">
            <Table>
              <TableHeader className="sticky top-0 bg-card">
                <TableRow>
                  <TableHead>Student Name</TableHead>
                  <TableHead>Enrollment ID</TableHead>
                  <TableHead>Division</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {!isClient ? (
                   <TableRow>
                    <TableCell colSpan={3} className="h-24 text-center">
                     Loading students...
                    </TableCell>
                  </TableRow>
                ) : students.length > 0 ? (
                  students.map((student) => (
                    <TableRow key={student.id}>
                      <TableCell className="font-medium">{student.name}</TableCell>
                      <TableCell>{student.enrollmentId}</TableCell>
                      <TableCell>{student.division}</TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={3} className="h-24 text-center">
                      No students enrolled yet.
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
