template.defaults.imports.splitImages = function (imgsStr) {
  var imgs = '';
  if (imgsStr) {
    imgs = imgsStr.split(',');
  }
  template.defaults.imports.imgs = imgs;
};

$(document).keydown(function (event) {
  if (event.keyCode == 13) {
    $(".searchBot").trigger("click");
  }
});

var myScroll = new BScroll('#mainWrapper', {
  pullUpLoad: true,
  click: true,
});

var searchScroll = new BScroll('#searchWrapper', {
  pullUpLoad: true,
  click: true,
});
var pageNum = 1;
var searchNum = 1;
$('.iconSearch').click(function () {
  $('#searchPage').show();
  $('#article').hide();
  $('.searchcon').focus();
});
$('.closeIconSearh').click(function () {
  $('#searchPage').hide();
  $('#article').show();
  $('.searchcon').val('');
  document.getElementById('contentTo').innerHTML = template('content', { info: true });
  document.getElementById('contentTitleTo').innerHTML = template('contentTitle', {
    title: '搜你想看',
  });
  searchScroll.refresh();
});
function search() {
  searchNum = 1;
  document.getElementById('contentTo').innerHTML = '';
  searchScroll.finishPullUp();
  searchScroll.refresh();
  var title = $('.searchcon').val();
  $.get('/web/api/article/list', { title: title, pageSize: 10 }, function (result) {
    if (result.code == 0) {
      document.getElementById('contentTo').innerHTML = template('content', result.data);
    }
  });
  if (!title) {
    title = '搜你想看';
  }
  document.getElementById('contentTitleTo').innerHTML = template('contentTitle', { title: title });
}
searchScroll.on('pullingUp', () => {
  searchNum++;
  var params = {};
  params.pageSize = 10;
  params.pageNum = searchNum;
  $.get('/web/api/article/list', params, function (result) {
    if (result.code == 0) {
      $('#contentTo').append(template('content', result.data));
      if (result.data.pages >= searchNum) {
        searchScroll.finishPullUp();
        searchScroll.refresh();
      }
    }
  });
});
myScroll.on('pullingUp', () => {
  pageNum++;
  var params = {};
  params.pageSize = 10;
  params.pageNum = pageNum;
  $.get('/web/api/article/list', params, function (result) {
    if (result.code == 0) {
      $('#articleItems').append(template('content', result.data));
      if (result.data.pages >= pageNum) {
        myScroll.finishPullUp();
        myScroll.refresh();
      }
    }
  });
});
