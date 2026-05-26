const HOUR_MS = 60 * 60 * 1000;

type BucketStore = Map<string, number[]>;

const stores = new Map<string, BucketStore>();

function getStore(name: string): BucketStore {
  let store = stores.get(name);
  if (!store) {
    store = new Map();
    stores.set(name, store);
  }
  return store;
}

/** 인메모리 rate limit (서버리스 인스턴스별). 스팸 완화용 1차 방어. */
export function recordRequestIfAllowed(
  storeName: string,
  key: string,
  maxPerHour: number,
): boolean {
  const store = getStore(storeName);
  const now = Date.now();
  const prev = store.get(key) ?? [];
  const recent = prev.filter((t) => now - t < HOUR_MS);
  if (recent.length >= maxPerHour) {
    store.set(key, recent);
    return false;
  }
  recent.push(now);
  store.set(key, recent);
  return true;
}

export function getClientIp(req: Request): string {
  const forwarded = req.headers.get("x-forwarded-for");
  if (forwarded) {
    const first = forwarded.split(",")[0]?.trim();
    if (first) return first;
  }
  const realIp = req.headers.get("x-real-ip")?.trim();
  if (realIp) return realIp;
  return "unknown";
}
