import { Fetcher, Deduplicate } from './types'
import { cache } from './cache'

/**
 * Cf. README.md for exemples and usage explanation 
 */
export async function deduplicate<Data = unknown>(identifier: string, fetcher: Fetcher<Data>, time: number = 2000): ReturnType<Deduplicate<Data>> {
    try {
        if (cache.get(identifier)) return { data: await cache.get(identifier), error: false }

        cache.set(identifier, new Promise( async (resolve, reject) => {
            try {
                resolve(await fetcher())
            } catch (e) {
                reject(e)
            }
        }))

        setTimeout(() => cache.delete(identifier), time)
        return { data: await cache.get(identifier), error: false }
    } catch (e) {
        if (cache.get(identifier)) cache.delete(identifier)
        return { data: undefined, error: e }
    }
}
