-- Run in Supabase SQL Editor as the database operator, after 20261120_admin_usage.sql.
-- Deletes ONLY teacher usage sessions older than 180 days and their linked tool visits.
-- Account profiles, school records and teaching resources are not deleted.
create extension if not exists pg_cron with schema pg_catalog;

select cron.schedule(
  'kaizen-teacher-usage-retention',
  '15 3 * * *',
  'select public.purge_teacher_usage()'
);

select jobname, schedule, active
from cron.job
where jobname = 'kaizen-teacher-usage-retention';
