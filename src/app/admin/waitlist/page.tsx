"use client";

import { useEffect, useMemo, useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Download, MessageCircle, Trash2 } from "lucide-react";
import { courseName, waText, WA_MESSAGES } from "@/lib/admin-data";

type Row = {
  _id: string; courseSlug: string; courseTitle: string; name: string; email: string; phone: string;
  note?: string; notifiedAt?: string; createdAt: string;
};

function waLink(phone: string) {
  let digits = phone.replace(/[^0-9]/g, "");
  if (digits.length === 10) digits = "91" + digits; // Indian number without country code
  return `https://wa.me/${digits}`;
}

function toCsv(rows: Row[]) {
  const esc = (v: string) => `"${String(v ?? "").replace(/"/g, '""')}"`;
  const head = ["Course", "Name", "Email", "Phone", "Joined", "Notified"];
  const lines = rows.map((r) => [r.courseTitle, r.name, r.email, r.phone, new Date(r.createdAt).toLocaleString("en-IN"), r.notifiedAt ? new Date(r.notifiedAt).toLocaleDateString("en-IN") : ""].map(esc).join(","));
  return [head.join(","), ...lines].join("\n");
}

export default function AdminWaitlistPage() {
  const { toast } = useToast();
  const [rows, setRows] = useState<Row[]>([]);
  const [loading, setLoading] = useState(true);
  const [course, setCourse] = useState("all");

  const load = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/waitlist", { credentials: "same-origin" });
      if (!res.ok) throw new Error("Could not load the waitlist");
      setRows(await res.json());
    } catch (e: any) {
      toast({ variant: "destructive", title: "Error", description: e.message });
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => { load(); }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const courses = useMemo(() => {
    const m = new Map<string, { title: string; count: number; waiting: number }>();
    rows.forEach((r) => {
      const c = m.get(r.courseSlug) || { title: r.courseTitle, count: 0, waiting: 0 };
      c.count++; if (!r.notifiedAt) c.waiting++;
      m.set(r.courseSlug, c);
    });
    return Array.from(m.entries());
  }, [rows]);

  const shown = course === "all" ? rows : rows.filter((r) => r.courseSlug === course);

  const setNotified = async (r: Row, notified: boolean) => {
    const res = await fetch(`/api/waitlist/${r._id}`, { method: "PATCH", credentials: "same-origin", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ notified }) });
    if (res.ok) setRows((all) => all.map((x) => (x._id === r._id ? { ...x, notifiedAt: notified ? new Date().toISOString() : undefined } : x)));
  };

  const remove = async (r: Row) => {
    if (!window.confirm(`Remove ${r.name} from the ${r.courseTitle} waitlist?`)) return;
    const res = await fetch(`/api/waitlist/${r._id}`, { method: "DELETE", credentials: "same-origin" });
    if (res.ok) setRows((all) => all.filter((x) => x._id !== r._id));
  };

  const download = () => {
    const blob = new Blob([toCsv(shown)], { type: "text/csv;charset=utf-8" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = `waitlist-${course}-${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
    URL.revokeObjectURL(a.href);
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-6">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {courses.length === 0 && !loading && (
          <Card><CardContent className="p-6 text-muted-foreground">No one has joined a waitlist yet. To open a waitlist, edit a course and set Registrations to “Closed — Join waitlist”.</CardContent></Card>
        )}
        {courses.map(([slug, c]) => (
          <Card key={slug} className={course === slug ? "border-primary" : ""}>
            <CardHeader className="pb-2"><CardDescription>{c.title}</CardDescription><CardTitle className="text-3xl">{c.count}</CardTitle></CardHeader>
            <CardContent className="text-sm text-muted-foreground">{c.waiting} not yet notified</CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <CardTitle>Waitlist</CardTitle>
            <CardDescription>People waiting for the next batch. Tick “Notified” once you&apos;ve told them it&apos;s open.</CardDescription>
          </div>
          <div className="flex gap-2">
            <Select value={course} onValueChange={setCourse}>
              <SelectTrigger className="w-56"><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All courses</SelectItem>
                {courses.map(([slug, c]) => <SelectItem key={slug} value={slug}>{c.title}</SelectItem>)}
              </SelectContent>
            </Select>
            <Button variant="outline" onClick={download} disabled={!shown.length}><Download className="mr-2 h-4 w-4" />CSV</Button>
          </div>
        </CardHeader>
        <CardContent>
          {loading ? <p className="text-muted-foreground">Loading…</p> : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Course</TableHead>
                  <TableHead>Contact</TableHead>
                  <TableHead>Joined</TableHead>
                  <TableHead>Notified</TableHead>
                  <TableHead />
                </TableRow>
              </TableHeader>
              <TableBody>
                {shown.map((r) => (
                  <TableRow key={r._id}>
                    <TableCell className="font-medium">{r.name}</TableCell>
                    <TableCell>{courseName(r.courseSlug, r.courseTitle)}</TableCell>
                    <TableCell className="space-y-1">
                      <a className="block underline" href={`mailto:${r.email}`}>{r.email}</a>
                      <a className="inline-flex items-center gap-1 text-green-700 underline" href={waLink(r.phone)} target="_blank" rel="noopener noreferrer"><MessageCircle className="h-3.5 w-3.5" />{r.phone}</a>
                      <div className="flex flex-wrap gap-1.5 pt-1">
                        <a className="rounded-full border border-green-700/40 bg-green-50 px-2.5 py-0.5 text-xs font-medium text-green-800 hover:bg-green-100" href={waText(r.phone, WA_MESSAGES.waitlistThanks(r.name, courseName(r.courseSlug, r.courseTitle)))} target="_blank" rel="noopener noreferrer" title="Opens WhatsApp with a thank-you message">💬 Thank you</a>
                        <a className="rounded-full border border-green-700/40 bg-green-50 px-2.5 py-0.5 text-xs font-medium text-green-800 hover:bg-green-100" href={waText(r.phone, WA_MESSAGES.batchOpen(r.name, courseName(r.courseSlug, r.courseTitle)))} target="_blank" rel="noopener noreferrer" title="Opens WhatsApp with a 'batch is open' message">💬 Batch open</a>
                      </div>
                    </TableCell>
                    <TableCell>{new Date(r.createdAt).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}</TableCell>
                    <TableCell><Switch checked={Boolean(r.notifiedAt)} onCheckedChange={(v) => setNotified(r, v)} aria-label="Notified" /></TableCell>
                    <TableCell><Button variant="ghost" size="icon" onClick={() => remove(r)} aria-label="Remove"><Trash2 className="h-4 w-4" /></Button></TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
