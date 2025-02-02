export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  graphql_public: {
    Tables: {
      [_ in never]: never
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      graphql: {
        Args: {
          operationName?: string
          query?: string
          variables?: Json
          extensions?: Json
        }
        Returns: Json
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
  public: {
    Tables: {
      comments: {
        Row: {
          content: string
          created_at: string
          id: number
          post_id: number
          updated_at: string
          user_profile_id: number
        }
        Insert: {
          content: string
          created_at?: string
          id?: number
          post_id: number
          updated_at?: string
          user_profile_id: number
        }
        Update: {
          content?: string
          created_at?: string
          id?: number
          post_id?: number
          updated_at?: string
          user_profile_id?: number
        }
        Relationships: [
          {
            foreignKeyName: 'comments_post_id_fkey'
            columns: ['post_id']
            isOneToOne: false
            referencedRelation: 'posts'
            referencedColumns: ['id']
          },
          {
            foreignKeyName: 'comments_profile_id_fkey'
            columns: ['user_profile_id']
            isOneToOne: false
            referencedRelation: 'user_profiles'
            referencedColumns: ['id']
          },
        ]
      }
      communes: {
        Row: {
          code: string
          code_department: string
          created_at: string
          name: string
          updated_at: string
          zip_code: string
        }
        Insert: {
          code: string
          code_department: string
          created_at?: string
          name: string
          updated_at?: string
          zip_code: string
        }
        Update: {
          code?: string
          code_department?: string
          created_at?: string
          name?: string
          updated_at?: string
          zip_code?: string
        }
        Relationships: [
          {
            foreignKeyName: 'communes_code_department_fkey'
            columns: ['code_department']
            isOneToOne: false
            referencedRelation: 'departments'
            referencedColumns: ['code']
          },
        ]
      }
      departments: {
        Row: {
          code: string
          code_region: string | null
          created_at: string
          name: string
          updated_at: string
        }
        Insert: {
          code: string
          code_region?: string | null
          created_at?: string
          name: string
          updated_at?: string
        }
        Update: {
          code?: string
          code_region?: string | null
          created_at?: string
          name?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: 'departments_code_region_fkey'
            columns: ['code_region']
            isOneToOne: false
            referencedRelation: 'regions'
            referencedColumns: ['code']
          },
        ]
      }
      organizations: {
        Row: {
          created_at: string
          id: number
          name: string
          owner: number | null
          picture: string | null
          updated_at: string
        }
        Insert: {
          created_at?: string
          id?: number
          name: string
          owner?: number | null
          picture?: string | null
          updated_at?: string
        }
        Update: {
          created_at?: string
          id?: number
          name?: string
          owner?: number | null
          picture?: string | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: 'organizations_owner_fkey'
            columns: ['owner']
            isOneToOne: false
            referencedRelation: 'user_profiles'
            referencedColumns: ['id']
          },
        ]
      }
      post_organizations: {
        Row: {
          organization_id: number
          post_id: number
        }
        Insert: {
          organization_id: number
          post_id: number
        }
        Update: {
          organization_id?: number
          post_id?: number
        }
        Relationships: [
          {
            foreignKeyName: 'post_organizations_organization_id_fkey'
            columns: ['organization_id']
            isOneToOne: false
            referencedRelation: 'organizations'
            referencedColumns: ['id']
          },
          {
            foreignKeyName: 'post_organizations_post_id_fkey'
            columns: ['post_id']
            isOneToOne: false
            referencedRelation: 'posts'
            referencedColumns: ['id']
          },
        ]
      }
      posts: {
        Row: {
          author_name: string | null
          content: string
          cover: string | null
          created_at: string
          department_code: string | null
          emitor_status: string | null
          id: number
          lifecycle: Database['public']['Enums']['post_lifecycle']
          tags: string[]
          title: string
          updated_at: string
          user_profile_id: number
        }
        Insert: {
          author_name?: string | null
          content: string
          cover?: string | null
          created_at?: string
          department_code?: string | null
          emitor_status?: string | null
          id?: number
          lifecycle?: Database['public']['Enums']['post_lifecycle']
          tags: string[]
          title: string
          updated_at?: string
          user_profile_id: number
        }
        Update: {
          author_name?: string | null
          content?: string
          cover?: string | null
          created_at?: string
          department_code?: string | null
          emitor_status?: string | null
          id?: number
          lifecycle?: Database['public']['Enums']['post_lifecycle']
          tags?: string[]
          title?: string
          updated_at?: string
          user_profile_id?: number
        }
        Relationships: [
          {
            foreignKeyName: 'posts_department_code_fkey'
            columns: ['department_code']
            isOneToOne: false
            referencedRelation: 'departments'
            referencedColumns: ['code']
          },
          {
            foreignKeyName: 'posts_user_profile_id_fkey'
            columns: ['user_profile_id']
            isOneToOne: false
            referencedRelation: 'user_profiles'
            referencedColumns: ['id']
          },
        ]
      }
      regions: {
        Row: {
          code: string
          created_at: string
          name: string
          updated_at: string
        }
        Insert: {
          code: string
          created_at?: string
          name: string
          updated_at?: string
        }
        Update: {
          code?: string
          created_at?: string
          name?: string
          updated_at?: string
        }
        Relationships: []
      }
      sapristi_informations: {
        Row: {
          banned_illnesses: string
          banned_places: string
          cleaning_help: boolean
          created_at: string
          external_activity: number
          updated_at: string
          user_profile_id: number
        }
        Insert: {
          banned_illnesses: string
          banned_places: string
          cleaning_help: boolean
          created_at?: string
          external_activity: number
          updated_at?: string
          user_profile_id?: number
        }
        Update: {
          banned_illnesses?: string
          banned_places?: string
          cleaning_help?: boolean
          created_at?: string
          external_activity?: number
          updated_at?: string
          user_profile_id?: number
        }
        Relationships: [
          {
            foreignKeyName: 'sapristi_informations_user_profile_id_fkey'
            columns: ['user_profile_id']
            isOneToOne: true
            referencedRelation: 'user_profiles'
            referencedColumns: ['id']
          },
        ]
      }
      student_informations: {
        Row: {
          created_at: string
          skills: string[]
          study_institute: string
          study_label: string
          study_level: string
          updated_at: string
          user_profile_id: number
        }
        Insert: {
          created_at?: string
          skills?: string[]
          study_institute: string
          study_label: string
          study_level: string
          updated_at?: string
          user_profile_id?: number
        }
        Update: {
          created_at?: string
          skills?: string[]
          study_institute?: string
          study_label?: string
          study_level?: string
          updated_at?: string
          user_profile_id?: number
        }
        Relationships: [
          {
            foreignKeyName: 'student_informations_user_profile_id_fkey'
            columns: ['user_profile_id']
            isOneToOne: true
            referencedRelation: 'user_profiles'
            referencedColumns: ['id']
          },
        ]
      }
      tags: {
        Row: {
          created_at: string
          id: number
          value: string
        }
        Insert: {
          created_at?: string
          id?: number
          value: string
        }
        Update: {
          created_at?: string
          id?: number
          value?: string
        }
        Relationships: []
      }
      user_organizations: {
        Row: {
          organization_id: number
          user_profile_id: number
        }
        Insert: {
          organization_id: number
          user_profile_id: number
        }
        Update: {
          organization_id?: number
          user_profile_id?: number
        }
        Relationships: [
          {
            foreignKeyName: 'user_organizations_organization_id_fkey'
            columns: ['organization_id']
            isOneToOne: false
            referencedRelation: 'organizations'
            referencedColumns: ['id']
          },
          {
            foreignKeyName: 'user_organizations_user_profile_id_fkey'
            columns: ['user_profile_id']
            isOneToOne: false
            referencedRelation: 'user_profiles'
            referencedColumns: ['id']
          },
        ]
      }
      user_profiles: {
        Row: {
          created_at: string
          description: string | null
          firstname: string
          id: number
          lastname: string
          phone_number: string | null
          picture_path: string | null
          role: Database['public']['Enums']['roles']
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          description?: string | null
          firstname: string
          id?: number
          lastname: string
          phone_number?: string | null
          picture_path?: string | null
          role?: Database['public']['Enums']['roles']
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          description?: string | null
          firstname?: string
          id?: number
          lastname?: string
          phone_number?: string | null
          picture_path?: string | null
          role?: Database['public']['Enums']['roles']
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      post_lifecycle: 'OPEN' | 'ONGOING' | 'FINISHED'
      roles: 'SUPER_ADMIN' | 'ADMIN' | 'USER'
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type PublicSchema = Database[Extract<keyof Database, 'public'>]

export type Tables<
  PublicTableNameOrOptions extends | keyof (PublicSchema['Tables'] & PublicSchema['Views'])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions['schema']]['Tables'] &
      Database[PublicTableNameOrOptions['schema']]['Views'])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions['schema']]['Tables'] &
    Database[PublicTableNameOrOptions['schema']]['Views'])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema['Tables'] &
      PublicSchema['Views'])
    ? (PublicSchema['Tables'] &
      PublicSchema['Views'])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends | keyof PublicSchema['Tables']
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions['schema']]['Tables']
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions['schema']]['Tables'][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema['Tables']
    ? PublicSchema['Tables'][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends | keyof PublicSchema['Tables']
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions['schema']]['Tables']
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions['schema']]['Tables'][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema['Tables']
    ? PublicSchema['Tables'][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends | keyof PublicSchema['Enums']
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions['schema']]['Enums']
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions['schema']]['Enums'][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema['Enums']
    ? PublicSchema['Enums'][PublicEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends | keyof PublicSchema['CompositeTypes']
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
      schema: keyof Database
    }
    ? keyof Database[PublicCompositeTypeNameOrOptions['schema']]['CompositeTypes']
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions['schema']]['CompositeTypes'][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof PublicSchema['CompositeTypes']
    ? PublicSchema['CompositeTypes'][PublicCompositeTypeNameOrOptions]
    : never

