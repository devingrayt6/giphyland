import store from "../store.js";


// @ts-ignore
let _gifApi = axios.create({
  baseURL: 'http://api.giphy.com/v1/gifs/trending?api_key=vJZMwAMg0eSN3aTxSVfTcB7Ti3lhYRHL',
  timeout: 15000
})

// @ts-ignore
let _sandboxApi = axios.create({
  baseURL: 'http://bcw-sandbox.herokuapp.com/api/devin/gifs',
  timeout: 15000
})

class GifService {
  getPreviews() {
    _gifApi.get('')
      .then(res => {
        store.commit('Gifs', res.data.data)
      })
      .catch(error => console.error(error))
  }

  getActive(id, prop) {
    let gif = store.State.Gifs.find(g => g.id == id);
    gif.collected = prop;
    store.commit('activeGif', gif);
  }

  getMyGifs() {
    _sandboxApi.get('')
      .then(res => {
        store.commit('myGifs', res.data.data)
      })
      .catch(error => console.error(error))
  }

  collectGif(id) {
    let gif = store.State.Gifs.find(g => g.id == id);
    let myGifs = { ...store.State.myGifs, gif }
    store.commit('myGifs', myGifs);
    console.log(store.State.myGifs)

    _sandboxApi.post('', gif)
      .then(res => {

      })
      .catch(error => console.error(error))
  }

}

const service = new GifService();
export default service;
