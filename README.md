# Deduplicate

Super simple "deduplicate" implementation, inspire by (useSWR)[https://swr.vercel.app/].  
Please fork the repo if u want use it.

It realy a super basic implementation, feel free to just copy the code an make more complexe
features according to yours needs.

> **Warning**  
> This repo will probabely not be maintained

## Usage

You can find an exemple in `exemples/html/src/main.ts`.

```
const fetcher = () => fetch('url').then(res => res.json())

const { data, error } = await deduplicate('identifier', fetcher, 1000)
```

### Params
- `identifier` : must be a string, use for store result in cache
- `fetcher` : a async function, must be return the data (store in cache) or throw an error
- `time` : duration (in milliseconds) of data is store in cache, by default is `2000`

### Return
An object with properties `data` and `error`.
- `data` : the return of `fetcher` or `undefined` if `fetcher` throw an error
- `error` : `false` if no error, or the error throw by `fetcher`