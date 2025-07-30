import { Request, Response } from 'express';
import supabase from '../../config/supabase-client';
import { TablesEnum } from '../../shared/enums/tables.enum';

export const getAllTenants = async (_req: Request, res: Response) => {
  const { data, error } = await supabase
    .from(TablesEnum.Tenants)
    .select('*');

  if (error) return res.status(500).json({ error: error.message });

  res.json(data);
};