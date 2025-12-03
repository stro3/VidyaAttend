import ManualAttendanceForm from '@/components/dashboard/manual-attendance-form';

export default function ManualAttendancePage() {
  return (
    <div className="flex flex-col gap-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight font-headline">Manual Attendance</h1>
        <p className="text-muted-foreground">
          Mark attendance for each student individually for today.
        </p>
      </div>
      <ManualAttendanceForm />
    </div>
  );
}
