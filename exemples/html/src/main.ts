import { deduplicate } from '../../../src/index'


// usage
const body = {
    "name": "{{name()}}",
    "age": "{{int(25, 30)}}",
    "country": "{{country()}}"
  };
const fetcherPost = () => fetch('https://lorem-json.com/api/json', {method: 'POST', body: JSON.stringify(body)}).then(res => res.json())
const fetcherGet = () => fetch('https://baconipsum.com/api/?type=meat-and-filler').then(res => res.json())

async function fetchData() {
    const { data, error } = await deduplicate('my_key', fetcherGet, 1000)
    if (error) {
        console.error(error)
        return
    }

    return data
}


console.log(await fetchData())
console.log(await fetchData())
console.log(await fetchData())
console.log(await fetchData())

setTimeout(async () => {
    console.log(await fetchData())
}, 500)