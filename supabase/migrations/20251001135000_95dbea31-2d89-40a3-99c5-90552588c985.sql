-- Fix the search_path security warning by recreating the function with proper settings
-- DROP CASCADE to remove the function and dependent triggers
DROP FUNCTION IF EXISTS public.update_updated_at_column() CASCADE;

-- Recreate the function with security definer and search_path set
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER 
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$;

-- Recreate the trigger
CREATE TRIGGER update_timesheets_updated_at
  BEFORE UPDATE ON public.timesheets
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();