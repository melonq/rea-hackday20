var selectedIndex = 0;
var articles = $(".home-brief-article");
articles.eq(selectedIndex).addClass("article-border");
var articleBody = $(".article-body");
articleBody.find("p").eq(selectedIndex).addClass("article-border");
var maxIndex = Math.max(articles.length, articleBody.find("p").length);


//http://www.cnblogs.com/ethan-qi/archive/2012/11/01/2749505.html
var e = document.createEvent('MouseEvent');
e.initEvent('click', false, false);

var enter = function() {
    articles.eq(selectedIndex).find("a").eq(0).attr('id', 'clickableLink');
    document.getElementById('clickableLink').dispatchEvent(e);
};

var moveUp = function() {
    updateBorder();
    if (selectedIndex > 0)
        selectedIndex --;
    updateBorder();
    updateBraille();
}

var moveDown = function() {
    updateBorder();
    if (selectedIndex < maxIndex-1)
        selectedIndex ++;
    updateBorder();
    updateBraille();
}

var backOff = function() {
    history.go(-1);
}

var updateBorder = function() {
    articles.eq(selectedIndex).toggleClass("article-border");
    articleBody.find("p").eq(selectedIndex).toggleClass("article-border");
}

var updateBraille = function() {
    var content = articles.eq(selectedIndex).find(".home-excerpt").text();
    if (content == '')
        content = $(".article-border").text();
    var matrix = transformer(content);
    document.getElementById("braille").innerHTML = domIt(matrix);
}

var updateSecondParagraphBraille = function() {
    var content = articles.eq(selectedIndex).find(".home-excerpt").text();
    if (content == '')
        content = $(".article-border").text();
    if (content.length > 15*16)
        content = content.substr(15*16);
    var matrix = transformer(content);
    document.getElementById("braille").innerHTML = domIt(matrix);
}

$(document).keyup(function(e) {
    console.log(e.keyCode);
    switch(e.keyCode)
    {
        case 87:
            moveUp();
            break;
        case 83:
            moveDown();
            break;
        case 65:
            backOff();
            break;
        case 68:
            enter();
            break;
        case 67:
            updateSecondParagraphBraille();
    }
});

updateBraille();