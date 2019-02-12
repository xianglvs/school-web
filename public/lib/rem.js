var Rem = function (maxWidth, designWidth) {
    designWidth = designWidth || 1080; // 设计稿默认宽度
    var docEle = document.documentElement; // 获取html元素
    var htmlDesignWidth = docEle.getAttribute("design-width"); // 得到html标签设置的设计稿宽度
    htmlDesignWidth && (designWidth = htmlDesignWidth); // 设置设计稿宽度
    var changeEvent = function () {
        var w = docEle.clientWidth;
        if (maxWidth) {
            w = Math.min(docEle.clientWidth, maxWidth);
        }
        docEle.clientWidth && (docEle.style.fontSize = 100 * w / designWidth + "px"); // 设置html的fontSize，随着event的改变而改变。
    };
    this.triggerEvent = function (width, max) {
        designWidth = width || designWidth;
        maxWidth = max;
        changeEvent();
    };
    changeEvent();
    window.addEventListener('resize', changeEvent, false); // 添加缩放事件
    window.addEventListener('onorientationchange', changeEvent, false); // 添加document载入完成的时候事件
};