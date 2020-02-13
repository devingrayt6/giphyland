import GifController from "./Controllers/GifController.js";

class App {
  gifsController = new GifController();
}

window["app"] = new App();
