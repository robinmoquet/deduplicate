import { deduplicate } from '../../../src/index'


// usage
const body = {
    "name": "{{name()}}",
    "age": "{{int(25, 30)}}",
    "country": "{{country()}}"
  };
const fetcherPost = () => fetch('https://lorem-json.com/api/json', {method: 'POST', body: JSON.stringify(body)}).then(res => res.json())
const fetcherGet = () => fetch('https://baconipsum.com/api/?type=meat-and-filler').then(res => res.json())
const fetcherError = () => { throw new Error('fail !') }

async function fetchData() {
    const { data, error } = await deduplicate('my_key', fetcherGet)
    if (error) {
        console.log(error)
        return
    }

    return data
}


const data1 = fetchData()
const data2 = fetchData()
const data3 = fetchData()
const data4 = fetchData()


console.log(await data1)
console.log(await data2)
console.log(await data3)
console.log(await data4)


setTimeout(async () => {
    console.log(await fetchData())
}, 3000)
