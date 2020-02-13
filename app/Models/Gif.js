export default class Gif {
    constructor(data) {
        this.collected = data.collected;
        this.id = data._id || data.id;
        this.url = '';
        if (data.images) {
            this.url = data.images.original.url;
        } else {
            this.url = data.url;
        }
        this.title = data.title;
        this.embed_url = data.embed_url;
    }

    getButton(prop) {
        if (prop == false) {
            return `<button onclick="app.gifsController.collectGif('${this.id}')" class="btn btn-success">Add to Collection</button>`
        } else {
            return `<button class="btn btn-danger">Remove</button>`
        }
    }

    get Template() {
        return `
        
        <div class="card" style="width: 25rem;">
            <img src="${this.url}" class="card-img-top" alt="...">
            <div class="card-body">
                <h5 class="card-title">${this.title}</h5>
            </div>
            ${this.getButton(this.collected)}
        </div>

        `
    }
}