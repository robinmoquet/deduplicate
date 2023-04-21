import { Fetcher, Deduplicate } from './types'
import { cache } from './cache'
import { process } from './process'

/**
 * Cf. README.md for exemples an usage explanation 
 */
export async function deduplicate<Data = unknown>(identifier: string, fetcher: Fetcher<Data>, time: number = 2000): ReturnType<Deduplicate<Data>> {
    try {
        if (process.get(identifier)) await process.get(identifier)
        else process.set(identifier, new Promise((resolve) => setTimeout(() => resolve(undefined), time)))

        if (cache.get(identifier)) return { data: cache.get(identifier), error: false }

        const res = await fetcher()
        cache.set(identifier, res)
        process.delete(identifier)
        setTimeout(() => cache.delete(identifier), time)

        return { data: res, error: false }
    } catch (e) {
        return { data: undefined, error: e }
    }
}
