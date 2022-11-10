import Notiflix from "notiflix";
import {Search} from "./pagesSearch";
import templates from "./pagesInfo.hbs";
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";
const formEl = document.querySelector('#search-form');
const gallery = document.querySelector('.gallery');
const buttonNextEl = document.querySelector('.load-more');
const search = new Search();
let startLightEl = null;
function searshPages(el) {
    el.preventDefault();
    const inputEl = el.target['searchQuery'].value.trim();
    search.name = inputEl;
    search.fetchPhoto().then(({data})=> {
        if (!data.hits.length) {
             Notiflix.Notify.failure("Sorry, there are no images matching your search query. Please try again.");
             gallery.innerHTML = '';
             search.page = 1;
             if(!buttonNextEl.classList.contains('is-hiden')){
                buttonNextEl.classList.add('is-hiden');
             }
             return;
        }
        buttonNextEl.classList.remove('is-hiden');
        gallery.innerHTML = templates(data.hits);
        startLightEl = new SimpleLightbox('.gallery a',{
        captionDelay: "250",
        });
           
        
    })
    .catch(err => {
       console.log(err);
    })
}
function addPages(){
    search.page ++;
    search.fetchPhoto().then(({data})=> {
        if(data.totalHits <= search.page){
            buttonNextEl.classList.add('is-hiden');
            Notiflix.Notify.failure("We're sorry, but you've reached the end of search results.");
            return;
        }
        gallery.innerHTML += templates(data.hits);
        const newSimpelEl = new SimpleLightbox('.gallery a',{
            captionDelay: "250",
            });
            startLightEl += newSimpelEl;
    
    }).catch(console.log)
}
formEl.addEventListener('submit', searshPages);
buttonNextEl.addEventListener('click', addPages);