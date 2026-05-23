export interface DAILY_POINT {
  date: string;
  y2?: number;
  y5?: number;
  y10?: number;
  y30?: number;
}

export interface USER {
  user: {
    user_id: number | null;
    user_name: string;
    password: string;
    solt: string;
  };
}

export interface SHOWDE_SAVE {
  show_save: {
    dept_id: number | null;
    user_foreign_id: number | null;
    kinds: string;
    sspan: number;
    fspan: number;
    showmode: string;
  };
}
