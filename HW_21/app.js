'use strict'

$(() => {
    const STICKERS_URL = 'https://5dd3d5ba8b5e080014dc4bfa.mockapi.io/stickers/'

    const DELETE_BTN_CLASS = '.delete-btn'
    const STICKER_ITEM = '.sticker-item'
    const STICKER_TEXT = '.sticker-description'

    const $stickerTemplate = $('#stickerTemplate').html()
    const $stickersBoard = $('#stickersBoard')

    let stickersList = []

    $('#addStickerBtn').on('click', onAddStickerClick)

    $stickersBoard.on('click', DELETE_BTN_CLASS, onDeleteBtnClick)
                    .on('focusout', STICKER_ITEM, onStickerFocusout)

    init()

    function init() {
        fetchStickers()
    }

    function fetchStickers() {
        fetch(STICKERS_URL)
        .then((res) => res.json())
        .then(setList)
        .then(renderList);

    }

    function onStickerFocusout(e) {
        let $stickerEl = $(this)
        updateSticker(getStickerId(e.target), (`${getNewStickerText($stickerEl)}`))
    }

    function updateSticker(id, text) {
        let sticker = stickersList.find((item) => item.id == id)
        sticker.description = text
        fetch(STICKERS_URL + id, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(sticker),
        })
    }

    function getNewStickerText(el) {
        return $(el).find(STICKER_TEXT).val()
    }

    function onAddStickerClick() {
        const $newSticker = $(createNewSticker())
        fetch(STICKERS_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify($newSticker),
        })
            .then((res) => res.json())
            .then(($newSticker) => {
                stickersList.push($newSticker);
                renderSticker($newSticker)
            })
    }

    function onDeleteBtnClick(e) {
        const stickerId = getStickerId(e.target)
        deleteSticker(stickerId)
    }

    function setList(list) {
        return (stickersList = list)
    }

    function renderList(list) {
        list.forEach(renderSticker)
        return list
    }

    function renderSticker(sticker) {
        const stickerItem = getStickerHtml(sticker)
        $stickersBoard.append(stickerItem)
    }

    function getStickerHtml(item) {
        return $stickerTemplate.replace('{{id}}', item.id)
                        .replace('{{description}}', item.description)
    }

    function createNewSticker() {
        const newSticker = createNewStickerHtml($stickerTemplate)
        return newSticker
    }

    function createNewStickerHtml(sticker) {
        return sticker.replace('{{id}}', '')
                    .replace('{{description}}', '')
    }

    function getStickerId(e) {
        return e.closest('.sticker-item').id
    }

    function deleteSticker(id) {
        stickersList = stickersList.filter(item => item.id !== id)
        deleteStickerElement(id)
        fetch(STICKERS_URL + id, {
            method: 'DELETE'
        })
    }

    function deleteStickerElement(id) {
        const $el = $stickersBoard.find(`[id=${id}]`)
        $el && $el.remove()
    }
})