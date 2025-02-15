import { generateInviteCode } from './generateInviteCode';

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

type Stock = {
  id: string;
  horse_id: string;
  owner_id: string;
  food_name: string;
  quantity: number;
  type: 'fodder' | 'supplement';
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
    oneById: (horseId: Horse['id']) => ({
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
    create: {
      mutationFn: async (data: {
        name: string;
        menu_breakfast: string;
        menu_lunch: string;
        menu_dinner: string;
        owner_id: string;
      }) => {
        const { data: newHorse, error } = await supabase
          .from('horses')
          .insert(data)
          .select()
          .single();

        if (error) {
          console.error('Create error:', error);
          throw error;
        }

        return newHorse;
      },
    },
    update: (horseId: Horse['id']) => ({
      mutationFn: async (data: Pick<Horse, 'menu_breakfast' | 'menu_lunch' | 'menu_dinner'>) => {
        const { data: updatedHorse, error } = await supabase
          .from('horses')
          .update(data)
          .eq('id', horseId)
          .select()
          .single();

        if (error) {
          console.error('Update error:', error);
          throw error;
        }

        return updatedHorse;
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
  invites: {
    create: {
      mutationFn: async (username: string) => {
        const {
          data: { session },
        } = await supabase.auth.getSession();

        if (!session) {
          throw new Error('User is not authenticated');
        }

        const { data: invite, error } = await supabase
          .from('invites')
          .insert({
            username,
            code: generateInviteCode(),
            created_by: session.user.id,
          })
          .select()
          .single();

        if (error) {
          throw error;
        }

        return invite;
      },
    },
  },
  stock: {
    create: {
      mutationFn: async (data: Omit<Stock, 'id' | 'owner_id'>) => {
        const {
          data: { session },
        } = await supabase.auth.getSession();

        if (!session) {
          throw new Error('User is not authenticated');
        }

        const { data: stock, error } = await supabase
          .from('stock')
          .insert({
            horse_id: data.horse_id,
            food_name: data.food_name,
            quantity: data.quantity,
            type: data.type,
            owner_id: session.user.id,
          })
          .select()
          .single();

        if (error) {
          throw error;
        }

        return stock;
      },
    },
  },
};
