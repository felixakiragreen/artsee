const fetchBtn = document.getElementById('fetch')!
const insertBtn = document.getElementById('insert')!
const input = document.getElementById('input') as HTMLInputElement
const imgDiv = document.getElementById('img')!

console.log('hey now')

const OS_URL = 'https://api.opensea.io/api/v1/assets'
// const owner = '0x0416B53d81eE3d868bBE3CE7D93980B45159b8A0'

let fetchedImgs = []

const doTheFetch = () => {
  const options = {
    method: 'GET',
    qs: {
      owner: input.value,
      order_direction: 'desc',
      offset: '0',
      limit: '20',
    },
  }

  console.log('fetching...', options)

  const url = `${OS_URL}?owner=${input.value}&order_direction=desc&offset=0&limit=20`

  try {
    fetch(url, options)
      .then((res) => res.json())
      .then((json) => {
        console.log(json)
        fetchedImgs = json.assets
      })
      .catch((err) => console.error('error:' + err))
  } catch (err) {
    console.error(err)
  }
}

const doAnInsert = () => {
  console.log('fetchedImgs', fetchedImgs)

  let random = randomElement(fetchedImgs)
  // for (let i = 0; i < 5; i++) {
  //   if (fetchedImgs[i]) {
  doTheInsert(random)
  //     break
  //   }
  // }
}

const doTheInsert = (asset) => {
  if (asset.image_url && asset.image_url !== '') {
    const newImg = document.createElement('img')
    newImg.src = asset.image_url

    if (imgDiv.firstChild) {
      imgDiv.removeChild(imgDiv.firstChild)
    }

    imgDiv.appendChild(newImg)
  } else {
    console.error('error inserting', asset)
  }
}

fetchBtn.addEventListener('click', doTheFetch)
insertBtn.addEventListener('click', doAnInsert)

// ;(async function initWindow() {
//   let [tab] = await chrome.tabs.query({ active: true, currentWindow: true })

//   if (tab?.url) {

//   }
// })()

const randomElement = (arr: any[]) => {
  if (arr.length > 0) {
    return arr[Math.floor(Math.random() * arr.length)]
  } else {
    return null
  }
}
