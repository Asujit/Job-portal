import { createClerkSupabaseClient } from "@/utils/Supabase";

// Fetch Jobs
export async function getJobs(
  session,
  { location, company_id, searchQuery } = {}
) {
  const supabase = createClerkSupabaseClient(session);

  let query = supabase
    .from("jobs")
    .select("*, saved:saved_jobs(id), company:companies(name,logo_url)");

  if (location) {
    query = query.eq("location", location);
  }

  if (company_id) {
    query = query.eq("company_id", company_id);
  }

  if (searchQuery) {
    query = query.ilike("title", `%${searchQuery}%`);
  }

  const { data, error } = await query;

  if (error) {
    console.error("Error fetching jobs:", error);
    return null;
  }

  return data;
}

// Read Saved Jobs
export async function getSavedJobs(session) {
  const supabase = createClerkSupabaseClient(session);

  const { data, error } = await supabase
    .from("saved_jobs")
    .select("*, job:jobs(*, company:companies(name,logo_url))");

  if (error) {
    console.error("Error fetching saved jobs:", error);
    return null;
  }

  return data;
}

// Read Single Job
export async function getSingleJob(session, { job_id }) {
  const supabase = createClerkSupabaseClient(session);

  const { data, error } = await supabase
    .from("jobs")
    .select(
      "*, company:companies(name,logo_url), applications:applications(*)"
    )
    .eq("id", job_id)
    .single();

  if (error) {
    console.error("Error fetching single job:", error);
    return null;
  }

  return data;
}

// Add / Remove Saved Job
export async function saveJob(session, { alreadySaved }, saveData) {
  const supabase = createClerkSupabaseClient(session);

  if (alreadySaved) {
    const { data, error } = await supabase
      .from("saved_jobs")
      .delete()
      .eq("job_id", saveData.job_id);

    if (error) {
      console.error("Error removing saved job:", error);
      return null;
    }

    return data;
  }

  const { data, error } = await supabase
    .from("saved_jobs")
    .insert([saveData])
    .select();

  if (error) {
    console.error("Error saving job:", error);
    return null;
  }

  return data;
}

// Update Hiring Status
export async function updateHiringStatus(
  session,
  { job_id },
  isOpen
) {
  const supabase = createClerkSupabaseClient(session);

  const { data, error } = await supabase
    .from("jobs")
    .update({ isOpen })
    .eq("id", job_id)
    .select();

  if (error) {
    console.error("Error updating hiring status:", error);
    return null;
  }

  return data;
}

// Get My Jobs
export async function getMyJobs(session, { recruiter_id }) {
  const supabase = createClerkSupabaseClient(session);

  const { data, error } = await supabase
    .from("jobs")
    .select("*, company:companies(name,logo_url)")
    .eq("recruiter_id", recruiter_id);

  if (error) {
    console.error("Error fetching my jobs:", error);
    return null;
  }

  return data;
}

// Delete Job
export async function deleteJob(session, { job_id }) {
  const supabase = createClerkSupabaseClient(session);

  const { data, error } = await supabase
    .from("jobs")
    .delete()
    .eq("id", job_id)
    .select();

  if (error) {
    console.error("Error deleting job:", error);
    return null;
  }

  return data;
}

// Add New Job
export async function addNewJob(session, _, jobData) {
  const supabase = createClerkSupabaseClient(session);

  const { data, error } = await supabase
    .from("jobs")
    .insert([jobData])
    .select();

  if (error) {
    console.error("Error creating job:", error);
    throw new Error("Error creating job");
  }

  return data;
}