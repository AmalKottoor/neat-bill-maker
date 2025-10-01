-- Initial setup: Create a basic timesheets table
CREATE TABLE IF NOT EXISTS public.timesheets (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  employee_name TEXT NOT NULL,
  date DATE NOT NULL,
  hours_worked DECIMAL(4,2) NOT NULL CHECK (hours_worked >= 0 AND hours_worked <= 24),
  project TEXT NOT NULL,
  description TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.timesheets ENABLE ROW LEVEL SECURITY;

-- Create a policy that allows anyone to read timesheets (since customers need access)
CREATE POLICY "Enable read access for all users"
  ON public.timesheets
  FOR SELECT
  USING (true);

-- Create a policy that allows anyone to insert timesheets
CREATE POLICY "Enable insert access for all users"
  ON public.timesheets
  FOR INSERT
  WITH CHECK (true);

-- Create an index on date for better query performance
CREATE INDEX idx_timesheets_date ON public.timesheets(date DESC);

-- Create an index on employee_name for better filtering
CREATE INDEX idx_timesheets_employee ON public.timesheets(employee_name);

-- Create updated_at trigger function if it doesn't exist
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger for automatic timestamp updates
CREATE TRIGGER update_timesheets_updated_at
  BEFORE UPDATE ON public.timesheets
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();