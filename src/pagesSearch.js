import axios from "axios";

export class Search {
    #KEY = '31239569-a9d720afefb3690619cb50276';
    #URL = 'https://pixabay.com/api/';
    name = null;
    page = 1;
    fetchPhoto(){
        return axios.get(`${this.#URL}?key=${this.#KEY}&q=${this.name}&image_type=photo&orientation=horizontal&safesearch=true&per_page=40&page=${this.page}`);
    }
}