import GifService from "../Services/GifService.js";
import store from "../store.js";
import Gif from "../Models/Gif.js";

//Private
function _previewDraw() {
  let gifs = store.State.Gifs;
  let preview = document.getElementById('preview-view')
  let template = '';
  gifs.forEach(g => {
    template += `
    
    <div class="card" style="width: 7rem;" onclick="app.gifsController.getActive('${g.id}', false)">
      <img src="${g.
        // @ts-ignore
        images.original.url}" class="card-img-top" alt="...">
    </div>
    
    `
  });
  preview.innerHTML = template;
}

function _activeDraw() {
  let gif = new Gif(store.State.activeGif);
  let activeView = document.getElementById('active-view');

  let template = gif.Template;
  activeView.innerHTML = template;
}

function _drawMyGifs() {

  let gifs = store.State.myGifs;
  let preview = document.getElementById('collection-view')
  let template = '';
  console.log(gifs);
  gifs.forEach(g => {

    if (g._id) {
      g.id = g._id;
    }

    template += `

    <div class="card" style="width: 7rem;" onclick="app.gifsController.getActive('${g.id}', true)">
      <img src="${g.url}" class="card-img-top" alt="...">
    </div>

    `
    console.log(g.url)
  });
  preview.innerHTML = template;

}

//Public
export default class GifsController {
  constructor() {
    store.subscribe("Gifs", _previewDraw);
    store.subscribe("activeGif", _activeDraw);
    store.subscribe("myGifs", _drawMyGifs)
    this.getPreviews();
    this.getMyGifs();
  }

  getPreviews() {
    GifService.getPreviews();
  }

  getActive(id, prop) {
    GifService.getActive(id, prop);
  }

  getMyGifs() {
    GifService.getMyGifs();
  }
  collectGif(id) {
    GifService.collectGif(id);
  }

  deleteGif(id) {
    console.log(id)
    GifService.deleteGif(id);
  }
}
