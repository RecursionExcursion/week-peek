type CookieOptions = {
  path?: string;
  maxAge?: number;
  exp?: Date;
  sameSite?: 'Strict' | 'Lax' | 'None';
  secure?: boolean;
  domain?: string;
  priority?: 'Low' | 'Medium' | 'High';
};

type ParserMap = {
  [K in keyof CookieOptions]: (opts: Required<Pick<CookieOptions, K>>) => string;
};

const cookieParser = {
  path: ({ path }) => `Path=${path}`,
  maxAge: ({ maxAge }) => `Max-Age=${maxAge}`,
  exp: ({ exp }) => `Expires=${exp.toUTCString()}`,
  sameSite: ({ sameSite }) => `SameSite=${sameSite}`,
  secure: ({ secure }) => (secure ? 'Secure' : ''),
  domain: ({ domain }) => `Domain=${domain}`,
  priority: ({ priority }) => `Priority=${priority}`,
} satisfies ParserMap;

export const cookieManager = {
  create(key: string, val: string, opts?: CookieOptions): string {
    const parts = [`${key}=${val}`];
    if (opts) {
      parts.push(
        ...typedEntries(opts)
          .filter(([, v]) => v !== undefined)
          .map(([k]) => cookieParser[k](opts as Required<Pick<CookieOptions, typeof k>>))
      );
    }
    return parts.map((p) => p + ';').join(' ');
  },

  add(c: string) {
    document.cookie = c;
  },

  delete(name: string) {
    document.cookie = this.create(name, '', {
      maxAge: 0,
    });
  },

  parse(cookies: string) {
    return cookies.split(';').reduce((acc, p) => {
      const [key, val] = p.trim().split('=');
      acc = {
        ...acc,
        [key]: val,
      };

      return acc;
    }, {});
  },
};

function typedEntries<T extends object>(obj: T) {
  return Object.entries(obj) as {
    [K in keyof T]-?: [K, T[K]];
  }[keyof T][];
}
