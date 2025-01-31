import { supabase } from '~/utils/supabase';

export type Horse = {
  id: string;
  name: string;
  owner: {
    username: string;
  };
};

export type Profile = {
  id: string;
  username: string;
  role: 'stable_owner' | 'stable_worker' | 'horse_owner';
};

export const queries = {
  horses: {
    list: {
      queryKey: ['horses', 'list'],
      queryFn: async (): Promise<Horse[]> => {
        const { data, error } = await supabase
          .from('horses')
          .select(
            `
            id,
            name,
            owner:profiles!horses_owner_id_fkey(username)
          `
          )
          .order('name');

        if (error) {
          throw error;
        }

        return data; // TODO: fix type
      },
    },
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
