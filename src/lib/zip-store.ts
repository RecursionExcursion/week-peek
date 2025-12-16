export function createZipStore<Schema extends Record<string, object>>() {
  type Keys = keyof Schema;

  return {
    save: async <K extends Keys>(key: K, obj: Schema[K]) => {
      localStorage.setItem(String(key), await gzipCompress(obj));
    },

    get: async <K extends Keys>(key: K): Promise<Schema[K] | undefined> => {
      const item = localStorage.getItem(String(key));
      if (!item) return;
      return (await gzipDecompress(item)) as Schema[K];
    },

    delete: <K extends Keys>(key: K) => {
      localStorage.removeItem(String(key));
    },
  };
}

async function gzipCompress(obj: object): Promise<string> {
  const encoded = new TextEncoder().encode(JSON.stringify(obj));

  const cs = new CompressionStream("gzip");
  const writer = cs.writable.getWriter();
  writer.write(encoded);
  writer.close();

  const res = await new Response(cs.readable).arrayBuffer();
  return uint8ToBase64(new Uint8Array(res));
}

async function gzipDecompress(compressed: string): Promise<object> {
  const bytes = base64ToUint8(compressed);

  const ds = new DecompressionStream("gzip");
  const writer = ds.writable.getWriter();
  writer.write(bytes.slice().buffer);
  writer.close();

  const result = await new Response(ds.readable).arrayBuffer();
  const json = new TextDecoder().decode(result);
  return JSON.parse(json);
}

function uint8ToBase64(bytes: Uint8Array): string {
  let s = "";
  bytes.forEach((b) => (s += String.fromCharCode(b)));
  return btoa(s);
}

function base64ToUint8(b64: string): Uint8Array {
  const binary = atob(b64);
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i++) {
    bytes[i] = binary.charCodeAt(i);
  }
  return bytes;
}
