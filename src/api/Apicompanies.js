import { createClerkSupabaseClient } from "@/utils/Supabase";
import { supabaseUrl } from "@/utils/Supabase";

// Fetch Companies
export async function getCompanies(session) {
  const supabase = createClerkSupabaseClient(session);

  const { data, error } = await supabase
    .from("companies")
    .select("*");

  if (error) {
    console.error("Error fetching Companies:", error);
    return null;
  }

  return data;
}

// Add Company
export async function addNewCompany(
  session,
  _,
  companyData
) {
  const supabase = createClerkSupabaseClient(session);

  const random = Math.floor(Math.random() * 90000);

  const fileName = `logo-${random}-${companyData.name}`;

  const { error: storageError } = await supabase.storage
    .from("company-logo")
    .upload(fileName, companyData.logo);

  if (storageError) {
    console.error(storageError);
    throw new Error("Error uploading Company Logo");
  }

  const logo_url = `${supabaseUrl}/storage/v1/object/public/company-logo/${fileName}`;

  const { data, error } = await supabase
    .from("companies")
    .insert([
      {
        name: companyData.name,
        logo_url,
      },
    ])
    .select();

  if (error) {
    console.error(error);
    throw new Error("Error submitting Companies");
  }

  return data;
}