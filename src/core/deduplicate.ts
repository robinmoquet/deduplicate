import { Fetcher, Deduplicate } from './types'
import { cache } from './cache';

/**
 * Cf. README.md for exemples an usage explanation 
 */
export async function deduplicate<Data = unknown>(identifier: string, fetcher: Fetcher<Data>, time: number = 2000): ReturnType<Deduplicate<Data>> {
    try {
        if (cache.get(identifier)) return { data: cache.get(identifier), error: false }

        const res = await fetcher();
        cache.set(identifier, res);
        setTimeout(() => cache.delete(identifier), time)

        return { data: res, error: false }
    } catch (e) {
        return { data: undefined, error: e }
    }
}
