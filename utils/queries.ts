import { supabase } from '~/utils/supabase';

export type Horse = {
  id: string;
  name: string;
  menu_breakfast: string;
  menu_lunch: string;
  menu_dinner: string;
  owner: {
    id: Profile['id'];
    username: Profile['username'];
  };
};

type HorsesList = Pick<Horse, 'id' | 'name' | 'owner'>[];

export type Profile = {
  id: string;
  username: string | null;
  role: 'stable_owner' | 'stable_worker' | 'horse_owner';
};

export const queries = {
  horses: {
    list: {
      queryKey: ['horses', 'list'],
      queryFn: async (): Promise<HorsesList> => {
        const { data, error } = await supabase
          .from('horses')
          .select(
            `
            id,
            name,
            owner:profiles!horses_owner_id_fkey(id, username)
          `
          )
          .order('name');

        if (error) {
          throw error;
        }

        return data;
      },
    },
    oneById: (horseId: string) => ({
      queryKey: ['horses', 'oneById', horseId],
      queryFn: async (): Promise<Horse> => {
        const { data, error } = await supabase
          .from('horses')
          .select(
            `
            id,
            name,
            menu_breakfast,
            menu_lunch,
            menu_dinner,
            owner:profiles!horses_owner_id_fkey(id, username)
          `
          )
          .eq('id', horseId)
          .single();

        if (error) {
          throw error;
        }

        return data;
      },
    }),
  },
  profiles: {
    list: {
      queryKey: ['profiles', 'list'],
      queryFn: async (): Promise<Profile[]> => {
        const { data, error } = await supabase
          .from('profiles')
          .select('id, username, role')
          .order('username');

        if (error) {
          throw error;
        }

        return data;
      },
    },
    oneById: (profileId: string) => ({
      queryKey: ['profiles', 'oneById', profileId],
      queryFn: async (): Promise<Profile> => {
        const { data, error } = await supabase
          .from('profiles')
          .select('id, username, role')
          .eq('id', profileId)
          .single();

        if (error) {
          throw error;
        }

        return data;
      },
    }),
  },
};
