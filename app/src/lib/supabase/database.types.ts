// Tipos escritos à mão para bater com supabase/schema.sql.
// Depois que o projeto Supabase estiver criado e linkado, o ideal é substituir
// este arquivo pelo gerado automaticamente via `supabase gen types typescript`.

export type Role = "visitante" | "aluno" | "instrutor" | "admin";
export type Plan = "gratuito" | "assinante";
export type MemberRole = "owner" | "editor" | "viewer";
export type ChecklistState = [boolean, boolean, boolean];

export interface Profile {
  id: string;
  email: string;
  full_name: string | null;
  avatar_url: string | null;
  role: Role;
  plan: Plan;
  project_limit: number;
  created_at: string;
}

export interface CourseePhaseProgress {
  user_id: string;
  phase_number: number;
  checklist: ChecklistState;
  completed_at: string | null;
  updated_at: string;
}

export interface Project {
  id: string;
  name: string;
  owner_id: string;
  created_at: string;
}

export interface ProjectMember {
  project_id: string;
  user_id: string;
  role: MemberRole;
  added_at: string;
}

export interface ProjectPhase {
  project_id: string;
  phase_number: number;
  script_text: string | null;
  notes: string | null;
  checklist: ChecklistState;
  completed_at: string | null;
  updated_at: string;
}

export interface ProjectAsset {
  id: string;
  project_id: string;
  phase_number: number;
  kind: "image" | "prompt";
  label: string | null;
  storage_path: string | null;
  prompt_text: string | null;
  created_by: string | null;
  created_at: string;
}

export interface Database {
  public: {
    Tables: {
      profiles: { Row: Profile; Insert: Partial<Profile>; Update: Partial<Profile> };
      course_phase_progress: {
        Row: CourseePhaseProgress;
        Insert: Partial<CourseePhaseProgress>;
        Update: Partial<CourseePhaseProgress>;
      };
      projects: { Row: Project; Insert: Partial<Project>; Update: Partial<Project> };
      project_members: {
        Row: ProjectMember;
        Insert: Partial<ProjectMember>;
        Update: Partial<ProjectMember>;
      };
      project_phases: {
        Row: ProjectPhase;
        Insert: Partial<ProjectPhase>;
        Update: Partial<ProjectPhase>;
      };
      project_assets: {
        Row: ProjectAsset;
        Insert: Partial<ProjectAsset>;
        Update: Partial<ProjectAsset>;
      };
    };
  };
}
