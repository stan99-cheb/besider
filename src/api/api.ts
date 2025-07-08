const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'https://api.nytimes.com/svc/archive/v1';
const API_KEY = import.meta.env.VITE_API_KEY || '';

const HEADERS = {
  headers: {
    'Content-Type': 'application/json; charset=utf-8',
  },
};

const checkResponse = async <T>(res: Response): Promise<T> => {
  if (!res.ok) {
    const resText = await res.text();
    throw new Error(resText);
  }
  return res.json() as Promise<T>;
};

const request = async <T>(endpoint: string, options: RequestInit = {}): Promise<T> => {
  const url = new URL(`${API_BASE_URL}${endpoint}`);
  url.searchParams.set('api-key', API_KEY);
  try {
    const response = await fetch(url.toString(), { ...HEADERS, ...options });
    return await checkResponse<T>(response);
  } catch (error) {
    throw new Error((error as Error).message);
  }
};

export const getArchive = <T>(date: { year: number; month: number }): Promise<T> =>
  request<T>(`/${String(date.year)}/${String(date.month)}.json`);

export const checkImage = (url: string): Promise<boolean> =>
  fetch(url, { method: 'HEAD' })
    .then(res =>
      res.headers.get('Content-Type')?.startsWith('image/') ?? false
    )
    .catch(() => false);