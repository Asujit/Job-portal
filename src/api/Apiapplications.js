import { createClerkSupabaseClient } from "@/utils/Supabase";
import { supabaseUrl } from "@/utils/Supabase";

// Apply To Job ( Candidate )
export async function applyToJob(
  session,
  _,
  jobData
) {
  const supabase = createClerkSupabaseClient(session);

  const random = Math.floor(Math.random() * 90000);

  const fileName = `resume-${random}-${jobData.candidate_id}`;

  const { error: storageError } = await supabase.storage
    .from("resume")
    .upload(fileName, jobData.resume);

  if (storageError) {
    console.error(storageError);
    throw new Error("Error uploading Resume");
  }

  const resume = `${supabaseUrl}/storage/v1/object/public/resume/${fileName}`;

  const { data, error } = await supabase
    .from("applications")
    .insert([
      {
        ...jobData,
        resume,
      },
    ])
    .select();

  if (error) {
    console.error(error);
    throw new Error("Error submitting Application");
  }

  return data;
}

// Edit Application Status ( Recruiter )
// export async function updateApplicationStatus(
//   session,
//   { job_id },
//   status
// ) {
//   const supabase = createClerkSupabaseClient(session);

//   const { data, error } = await supabase
//     .from("applications")
//     .update({ status })
//     .eq("job_id", job_id)
//     .select();

//   if (error || data.length === 0) {
//     console.error("Error Updating Application Status:", error);
//     return null;
//   }

//   return data;
// }


export async function updateApplicationStatus(
  session,
  { application_id },
  status
) {
  const supabase = createClerkSupabaseClient(session);

  const { data, error } = await supabase
    .from("applications")
    .update({ status })
    .eq("id", application_id)
    .select();

  if (error) {
    console.error("Error Updating Application Status:", error);
    return null;
  }

  return data;
}

// Get Applications ( Candidate )
export async function getApplications(
  session,
  { user_id }
) {
  const supabase = createClerkSupabaseClient(session);

  const { data, error } = await supabase
    .from("applications")
    .select("*, job:jobs(title, company:companies(name))")
    .eq("candidate_id", user_id);

  if (error) {
    console.error("Error fetching Applications:", error);
    return null;
  }

  return data;
}