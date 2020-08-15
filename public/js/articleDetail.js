$('.closeIconSearh').click(() => {
    window.history.go(-1);
});
window.addEventListener('DOMContentLoaded', (event) => {
    var scroll = new BScroll('#mainWrapper', {
        click: true,
        scrollY: true,
        pullUpLoad: false,
        mouseWheel: true,
        scrollbar: true,
    });
});
