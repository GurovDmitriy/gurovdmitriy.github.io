const burger=document.querySelector(".burger"),menuWrapper=document.querySelector(".header__wrapper-menu");burger.onclick=function(){burger.classList.contains("burger--open")?burger.classList.toggle("burger--close"):burger.classList.add("burger--open"),menuWrapper.style.maxHeight?menuWrapper.style.maxHeight=null:menuWrapper.style.maxHeight=`${menuWrapper.scrollHeight}px`};const btnUp=document.querySelector(".btn-up"),headerLogo=document.querySelector(".header__logo");function topFunction(element){document.body.scrollTop=0,document.documentElement.scrollTop=0,element.focus()}btnUp.onclick=function(){topFunction(headerLogo)};