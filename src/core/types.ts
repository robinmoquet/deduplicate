export type DeduplicateReturn<Data> = Promise<{
    data: Data | undefined,
    error: boolean | unknown 
}>
export type Fetcher<Data = unknown> = () => Promise<Data>

export type Deduplicate<Data> = (identifier: string, fetcher: Fetcher, time: number) => DeduplicateReturn<Data>

type CacheValue = { data: unknown }

export interface Cache extends Map<string, CacheValue> {}