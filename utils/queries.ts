import { supabase } from '~/utils/supabase';

export type Profile = {
  id: string;
  username: string;
  role: 'stable_owner' | 'stable_worker' | 'horse_owner';
};

export const queries = {
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
  },
};
