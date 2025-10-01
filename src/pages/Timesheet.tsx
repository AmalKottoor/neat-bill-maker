import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip, BarChart, Bar, XAxis, YAxis, CartesianGrid } from "recharts";
import { Clock, Users, TrendingUp, Moon, Sun } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useTheme } from "next-themes";

const COLORS = ['hsl(var(--primary))', 'hsl(var(--accent))', 'hsl(var(--success))', 'hsl(var(--warning))'];

// Mock data for analytics
const employeeHoursData = [
  { name: 'John Doe', hours: 40 },
  { name: 'Jane Smith', hours: 38 },
  { name: 'Mike Johnson', hours: 42 },
  { name: 'Sarah Williams', hours: 35 },
];

const projectDistribution = [
  { name: 'Project A', value: 120 },
  { name: 'Project B', value: 98 },
  { name: 'Project C', value: 76 },
  { name: 'Project D', value: 54 },
];

const Timesheet = () => {
  const { toast } = useToast();
  const { theme, setTheme } = useTheme();
  const [employeeName, setEmployeeName] = useState("");
  const [date, setDate] = useState("");
  const [hours, setHours] = useState("");
  const [project, setProject] = useState("");
  const [description, setDescription] = useState("");
  const [timesheets, setTimesheets] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTimesheets();
  }, []);

  const fetchTimesheets = async () => {
    try {
      const { data, error } = await supabase
        .from('timesheets')
        .select('*')
        .order('date', { ascending: false });

      if (error) throw error;
      setTimesheets(data || []);
    } catch (error) {
      console.error('Error fetching timesheets:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!employeeName || !date || !hours || !project) {
      toast({
        title: "Error",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }

    try {
      const { error } = await supabase
        .from('timesheets')
        .insert({
          employee_name: employeeName,
          date: date,
          hours_worked: parseFloat(hours),
          project: project,
          description: description
        });

      if (error) throw error;

      toast({
        title: "Timesheet Submitted",
        description: `Timesheet for ${employeeName} has been recorded successfully.`,
      });

      // Reset form
      setEmployeeName("");
      setDate("");
      setHours("");
      setProject("");
      setDescription("");

      // Refresh data
      fetchTimesheets();
    } catch (error) {
      console.error('Error submitting timesheet:', error);
      toast({
        title: "Error",
        description: "Failed to submit timesheet. Please try again.",
        variant: "destructive",
      });
    }
  };

  // Calculate analytics from real data
  const employeeHoursData = timesheets.reduce((acc: any[], timesheet) => {
    const existing = acc.find(item => item.name === timesheet.employee_name);
    if (existing) {
      existing.hours += parseFloat(timesheet.hours_worked);
    } else {
      acc.push({ name: timesheet.employee_name, hours: parseFloat(timesheet.hours_worked) });
    }
    return acc;
  }, []);

  const projectDistribution = timesheets.reduce((acc: any[], timesheet) => {
    const existing = acc.find(item => item.name === timesheet.project);
    if (existing) {
      existing.value += parseFloat(timesheet.hours_worked);
    } else {
      acc.push({ name: timesheet.project, value: parseFloat(timesheet.hours_worked) });
    }
    return acc;
  }, []);

  const totalHours = timesheets.reduce((acc, curr) => acc + parseFloat(curr.hours_worked || 0), 0);
  const averageHours = employeeHoursData.length > 0 ? (totalHours / employeeHoursData.length).toFixed(1) : '0';

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b bg-card">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Employee Timesheet Portal</h1>
            <p className="text-sm text-muted-foreground">Track and manage employee work hours</p>
          </div>
          <Button
            variant="outline"
            size="icon"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            aria-label="Toggle theme"
          >
            <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
            <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          </Button>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {/* Analytics Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Hours</CardTitle>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalHours}h</div>
              <p className="text-xs text-muted-foreground">This week</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Average Hours</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{averageHours}h</div>
              <p className="text-xs text-muted-foreground">Per employee</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Employees</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{employeeHoursData.length || 0}</div>
              <p className="text-xs text-muted-foreground">Tracked employees</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Employee Hours Chart */}
          <Card>
            <CardHeader>
              <CardTitle>Employee Hours</CardTitle>
              <CardDescription>Weekly hours by employee</CardDescription>
            </CardHeader>
            <CardContent>
              {employeeHoursData.length > 0 ? (
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={employeeHoursData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                    <XAxis dataKey="name" stroke="hsl(var(--foreground))" fontSize={12} />
                    <YAxis stroke="hsl(var(--foreground))" fontSize={12} />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: 'hsl(var(--card))', 
                        border: '1px solid hsl(var(--border))',
                        borderRadius: '8px'
                      }} 
                    />
                    <Bar dataKey="hours" fill="hsl(var(--primary))" radius={[8, 8, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              ) : (
                <div className="flex items-center justify-center h-[300px] text-muted-foreground">
                  No data available. Submit a timesheet to see analytics.
                </div>
              )}
            </CardContent>
          </Card>

          {/* Project Distribution Chart */}
          <Card>
            <CardHeader>
              <CardTitle>Project Distribution</CardTitle>
              <CardDescription>Total hours per project</CardDescription>
            </CardHeader>
            <CardContent>
              {projectDistribution.length > 0 ? (
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={projectDistribution}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {projectDistribution.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: 'hsl(var(--card))', 
                        border: '1px solid hsl(var(--border))',
                        borderRadius: '8px'
                      }} 
                    />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              ) : (
                <div className="flex items-center justify-center h-[300px] text-muted-foreground">
                  No data available. Submit a timesheet to see project distribution.
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Timesheet Form */}
        <Card>
          <CardHeader>
            <CardTitle>Submit Timesheet</CardTitle>
            <CardDescription>Fill in the employee timesheet details below</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="employeeName">Employee Name *</Label>
                  <Input
                    id="employeeName"
                    placeholder="Enter employee name"
                    value={employeeName}
                    onChange={(e) => setEmployeeName(e.target.value)}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="date">Date *</Label>
                  <Input
                    id="date"
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="hours">Hours Worked *</Label>
                  <Input
                    id="hours"
                    type="number"
                    min="0"
                    max="24"
                    step="0.5"
                    placeholder="8.0"
                    value={hours}
                    onChange={(e) => setHours(e.target.value)}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="project">Project *</Label>
                  <Select value={project} onValueChange={setProject} required>
                    <SelectTrigger>
                      <SelectValue placeholder="Select project" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="project-a">Project A</SelectItem>
                      <SelectItem value="project-b">Project B</SelectItem>
                      <SelectItem value="project-c">Project C</SelectItem>
                      <SelectItem value="project-d">Project D</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Work Description</Label>
                <Textarea
                  id="description"
                  placeholder="Describe the work performed..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  rows={4}
                />
              </div>

              <Button type="submit" className="w-full md:w-auto">
                Submit Timesheet
              </Button>
            </form>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default Timesheet;