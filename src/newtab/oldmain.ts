const fetchBtn = document.getElementById('fetch')!
const saveBtn = document.getElementById('save')!
const insertBtn = document.getElementById('insert')!
const input = document.getElementById('input') as HTMLInputElement
const imgDiv = document.getElementById('img')!

const OS_URL = 'https://api.opensea.io/api/v1/assets'
// const owner = '0x0416B53d81eE3d868bBE3CE7D93980B45159b8A0'

const cache = {}

chrome.storage.sync.get('wallet', (data) => {
  if (data.wallet) {
    input.value = data.wallet
    cache.wallet = data.wallet
  }
  console.log('got... ', { data })
})

const doTheSave = async () => {
  await chrome.storage.sync.set({ wallet: input.value }, () => {
    console.log('set wallet to... ', input.value)
  })
}

const doTheFetch = async () => {
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
        chrome.storage.sync.set({ images: json.assets }, () => {
          console.log('Value is set to ', json.assets)
        })
      })
      .catch((err) => console.error('error:' + err))
  } catch (err) {
    console.error(err)
  }
}

const doAnInsert = async () => {
  await chrome.storage.sync.get(['images'], (data) => {
    console.log('Value currently is ', data.images)

    if (data.images && data.images.length > 0) {
      let random = randomElement(data.images)

      doTheInsert(random)
    }
  })
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
saveBtn.addEventListener('click', doTheSave)

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

// console.log('hey now', fetchedImgs, savedAddress)

// ;(async function initWindow() {
//   // let [tab] = await chrome.tabs.query({ active: true, currentWindow: true })

//   // if (tab?.url) {

//   chrome.storage.sync.get(['wallet'], function (result) {
//     console.log('Value currently is ' + result.wallet)

//     input.value = result.wallet
//   })

//   // }
// })()
