const scroll = new LocomotiveScroll({
    el: document.querySelector('#main'),
    smooth: true
});

var timeout;

function squeezCircle(){
    clearTimeout(timeout);
    var xScale = 1;
    var yScale = 1;

    var xPrev = 0;
    var yPrev = 0;

    window.addEventListener("mousemove", (details)=>{

        xScale = gsap.utils.clamp(.8,1.2,details.clientX - xPrev);
        yScale = gsap.utils.clamp(.8,1.2,details.clientY - yPrev);

        xPrev = details.clientX;
        yPrev = details.clientY;

        mousePointerFollower(xScale,yScale);

        timeout = setTimeout( function (){
            document.querySelector("#minicircle").style.transform = `translate(${details.clientX}px,${details.clientY}px) scale(1, 1)`
        },100)

    })
}


squeezCircle()

function firstPageAnim(){
    var tl = gsap.timeline();
    tl.from("#nav",{
        y: -10,
        opacity: 0,
        duration: 1.5,
        ease : Expo.easeInOut
    })

    tl.to(".bounding-element",{
        y: 0,
        duration: 1.5,
        ease : Expo.easeInOut,
        delay: -1,
        stagger: .2,
    })

    tl.from("#hero-footer",{
        y: -10,
        opacity: 0,
        duration: 1.5,
        delay: -1,
        ease : Expo.easeInOut
    })
}

function mousePointerFollower(xScale,yScale){
    window.addEventListener("mousemove",(details)=>{
        document.querySelector("#minicircle").style.transform = `translate(${details.clientX}px,${details.clientY}px) scale(${xScale}, ${yScale})`
    })
}

firstPageAnim();
mousePointerFollower();

document.querySelectorAll(".element").forEach(function(element){
    var rotate = 0;
    var diff = 0;

    element.addEventListener("mouseleave", function (details){
        
        gsap.to(element.querySelector("img"),{
            opacity: 0,
            ease: Power3,
            duration: 0.5,
        })
    });

    element.addEventListener("mousemove", function (details){
        var diffy = details.client - element.getBoundingClientRect().top;
        var diffx = details.clientX - element.getBoundingClientRect().left*6;
        diff = details.clientX - rotate;
        rotate = details.clientX;
        
        gsap.to(element.querySelector("img"),{
            opacity: 1,
            ease: Power3,
            top: diffy,
            left: diffx,
            rotate: gsap.utils.clamp(-20,20,diff*.5),
        })
    });

});