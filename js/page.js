let header = document.getElementById("Header");
let navlist = header.getElementsByTagName("li");
let pagebox = document.getElementById("pageContainer");
let pagelist = pagebox.getElementsByTagName("li");
let slidebox = document.getElementById("slideBox");
let slidelist = slidebox.getElementsByTagName("li");
let mousedown = document.getElementById("mouseSlidedown");
let mouseup = document.getElementById("mouseSlideup");
let Temp = 0;
let timer = null;

function MouseClick(val) {
  if (val == 'up') {
    if (Temp == 0) {
      return;
    }
    Temp = Temp - 1;
    ChangePage(Temp);
  } else {
    if (Temp == 2) {
      return;
    }
    Temp = Temp + 1;
    ChangePage(Temp);
  }
}

function ChangePage(val) {
  Temp = val;
  console.log(Temp);
  if (val == 0) {
    document.getElementById("pageContainer").classList.remove("pagebottom");
    document.getElementById("pageContainer").classList.remove("action");
  } else if (val == 1) {
    document.getElementById("pageContainer").classList.remove("pagebottom");
    document.getElementById("pageContainer").classList.add("action");
  } else if (val == 2) {
    document.getElementById("pageContainer").classList.add("pagebottom");
  }
  for (let i = 0; i < navlist.length; i++) {
    if (i == val) {
      navlist[val].className = "active";
      slidelist[val].className = "active";
    } else {
      navlist[i].className = "";
      slidelist[i].className = "";
    }
  }
  if (Temp == 1) {
    mousedown.className = "active";
    mouseup.className = "active";
  } else if (Temp == 0) {
    mouseup.className = "";
    mousedown.className = "active";
  } else {
    mouseup.className = "active";
    mousedown.className = "";
  }
}

window.addEventListener("mousewheel", function (event) {
  //或mousewheel。但是他们都不兼容 firefox
  if (event.wheelDelta > 0) {
    if (Temp == 1) {
      ChangePage(0);
    } else if (Temp == 2) {
      ChangePage(1);
    }
  } else {
    if (Temp == 0) {
      ChangePage(1);
    } else if (Temp == 1) {
      ChangePage(2);
    }
  } //上 120，下 -120
});

window.addEventListener("DOMMouseScroll", function (event) {
  if (event.wheelDelta < 0) {
    if (Temp == 1) {
      ChangePage(0);
    } else if (Temp == 2) {
      ChangePage(1);
    }
  } else {
    if (Temp == 0) {
      ChangePage(1);
    } else if (Temp == 1) {
      ChangePage(2);
    }
  }
  //firefox只支持DOMMouseScroll   上 -3，下 3
});

var startX, startY;
document.addEventListener(
  "touchstart",
  function (ev) {
    startX = ev.touches[0].pageX;
    startY = ev.touches[0].pageY;
  },
  false
);

document.addEventListener(
  "touchmove",
  function (ev) {
    if (timer) {
      clearTimeout(timer)
    }
    timer = setTimeout(() => {
      var endX, endY;
      endX = ev.changedTouches[0].pageX;
      endY = ev.changedTouches[0].pageY;
      var direction = GetSlideDirection(startX, startY, endX, endY);
      console.log(direction);
      switch (direction) {
        case 0:
          break;
        case 1:
          // 向上
          if (Temp == 0) {
            ChangePage(1);
          } else if (Temp == 1) {
            ChangePage(2);
          }

          break;
        case 2:
          // 向下
          if (Temp == 1) {
            ChangePage(0);
          } else if (Temp == 2) {
            ChangePage(1);
          }
          break;
      }
    }, 8)

  },
  false
);

function GetSlideDirection(startX, startY, endX, endY) {
  var dy = startY - endY;
  var result = 0;
  if (dy > 0) {
    //向上滑动
    result = 1;
  } else if (dy < 0) {
    //向下滑动
    result = 2;
  } else {
    result = 0;
  }
  return result;
}