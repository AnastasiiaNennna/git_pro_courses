'use strict'

const ALBUMS_URL = 'https://jsonplaceholder.typicode.com/albums'
const ALBUM_PHOTOS_URL = 'https://jsonplaceholder.typicode.com/photos?albumId='

const ALBUM_ITEM_SELECTOR = '.album-item'

const albumTemplate = document.querySelector('#albumTemplate').innerHTML
const photosTemplate = document.querySelector('#photosTemplate').innerHTML
const albumItem = document.querySelector('#albums-wrapper')
const photoItem = document.querySelector('#photos-wrapper')

albumItem.addEventListener('click', onAlbumItemClick)

let albumsList = []
let photosList = []

init()

function init() {
    fetchAlbums()
}

function onAlbumItemClick(e) {
    const albumEl = e.target.closest(ALBUM_ITEM_SELECTOR)
    return getPhotos(albumEl.dataset.id)

}

function fetchAlbums() {
    fetch(ALBUMS_URL)
    .then(res => res.json())
    .then(setAlbums)
    .then(renderAlbums)
    .then(getFirstAlbumId)
    .then(getPhotos)
}

function setAlbums(list) {
    return albumsList = list
}

function renderAlbums(list) {
    let html = list.map(getAlbumHtml).join('')
    albumItem.innerHTML = html
    return list
}

function getAlbumHtml(item) {
    return albumTemplate.replace('{{id}}', item.id)
                        .replace('{{title}}', item.title)
}

function getFirstAlbumId(list) {
    let albumId = list[0].id 
    return albumId
}


function getPhotos(id) {
    fetch(ALBUM_PHOTOS_URL + id).then(res => res.json()).then(setPhotos).then(renderPhotos)
}

function setPhotos(list) {
    return photosList = list
}

function renderPhotos(list) {
    let html = list.map(getPhotoHtml).join('')
    photoItem.innerHTML = html
}

function getPhotoHtml(item) {
    return photosTemplate.replace('{{id}}', item.id)
                        .replace('{{url}}', item.thumbnailUrl)
                        .replace('{{title}}', item.title)
}