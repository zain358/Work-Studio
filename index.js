function loading() {
    var tl = gsap.timeline();

    tl.to("#yellow1", {
        top: "-100%",
        delay: 0.5,
        duration: 1,
        ease: "expo.out",
    })

    tl.from("#yellow2", {
        top: "100%",
        duration: 1,
        ease: "power3.out",
    }, "txtColor")

    tl.to("#loader h1", {
        color: "black",
    }, "txtColor")

    tl.to("#loader", {
        display: "none",
        opacity: 0,
    })
}

loading();

const scroll = new LocomotiveScroll({
    el: document.querySelector('[data-scroll-container]'),
    smooth: true,
    smoothMobile: false,    
    tablet: {
        smooth: false,      
    },
});

gsap.registerPlugin(ScrollTrigger);

ScrollTrigger.scrollerProxy('[data-scroll-container]', {
    scrollTop(value) {
        return arguments.length ? scroll.scrollTo(value, 0, 0) : scroll.scroll.instance.scroll.y;
    },
    getBoundingClientRect() {
        return { top: 0, left: 0, width: window.innerWidth, height: window.innerHeight };
    },
    pinType: document.querySelector('[data-scroll-container]').style.transform ? 'transform' : 'fixed'
});

// Update ScrollTrigger and Locomotive Scroll on scroll
scroll.on('scroll', ScrollTrigger.update);

// Ensure everything is refreshed on load
window.addEventListener('load', () => {
    ScrollTrigger.refresh();
});

function changingBackgroundImg() {
    var elems = document.querySelectorAll(".elem");
    var page2 = document.querySelector('#page2');

    elems.forEach((e) => {
        e.addEventListener("mouseenter", () => {
            var bgimg = e.getAttribute("data-img");
            page2.style.backgroundImage = `url(${bgimg})`;
        })
    })
}

changingBackgroundImg();

document.querySelector('#backToTop h3').addEventListener('click', (e) => {
    e.preventDefault(); // Prevent default anchor behavior
    scroll.scrollTo(0, 0); // Use Locomotive Scroll to scroll to #page1
});

function hoverVideoPlay() {
    const video_arr = document.querySelectorAll('.overlay');

    video_arr.forEach((video) => {
        // Find the closest `.image-div` 
        const imageDiv = video.closest('.image-div');

        if (imageDiv) {
            imageDiv.addEventListener('mouseenter', () => {
                video.currentTime = 0; // Start from the beginning
                video.play();          // Start playing
            });

            imageDiv.addEventListener('mouseleave', () => {
                video.pause();          // Pause on mouse leave
                video.currentTime = 0;  // Reset to the start
            });
        }
    });
}

hoverVideoPlay();

const nav = gsap.to('.nav_container a:not(:first-child) span', {
    x: "250%",
    ease: "power3.out",
    duration: 0.75,
    paused: true // Manual control
});

const nav2 = gsap.to('.nav_container a:first-child', {
    x: "250%",
    ease: "power1.out",
    duration: 0.75,
    paused: true // Manual control
});

const nav3 = gsap.to('.nav_container i', {
    rotate: "90deg",
    ease: "power3.out",
    duration: 0.75,
    paused: true // Manual control
});

nav.reverse();
nav2.reverse();
nav3.reverse();

let flag = false;

document.querySelector('.nav_button').addEventListener('click', () => {
    // runs the animation when .nav_button is clicked and reverses it also
    nav.reversed() ? nav.play() : nav.reverse();
    nav2.reversed() ? nav2.play() : nav2.reverse();
    nav3.reversed() ? nav3.play() : nav3.reverse();

    // i disable the animation when i click on the .nav_button
    if (flag) {
        console.log('hi')
        navAnimation1.scrollTrigger.enable();
        navAnimation2.scrollTrigger.enable();
        navAnimation3.scrollTrigger.enable();
    }
    else if (!flag) {
        navAnimation1.scrollTrigger.disable();
        navAnimation2.scrollTrigger.disable();
        navAnimation3.scrollTrigger.disable();
    }
    flag = !flag;
    ScrollTrigger.update();
});

const navAnimation1 = gsap.to('.nav_container a:not(:first-child) span', {
    x: "250%",
    ease: "power3.out",
    duration: 0.75,
    scrollTrigger: {
        trigger: '.nav_container',
        scroller: '[data-scroll-container]',
        start: 'top 0%',
        end: 'top -50%',
        scrub: 2,
    }
});

const navAnimation2 = gsap.to('.nav_container a:first-child', {
    x: "250%",
    ease: "power1.out",
    duration: 0.75,
    scrollTrigger: {
        trigger: '.nav_container',
        scroller: '[data-scroll-container]',
        start: 'top 0%',
        end: 'top -50%',
        scrub: 2,
    }
});

const navAnimation3 = gsap.to('.nav_container i', {
    rotate: "90deg",
    ease: "power3.out",
    scrollTrigger: {
        trigger: '.nav_container',
        scroller: '[data-scroll-container]',
        start: 'top 0%',
        end: 'top -50%',
        scrub: 2,
    }
});

setInterval(() => {
    const newYorkTime = new Date().toLocaleString("en-US", {
        timeZone: "America/New_York",
        hour: "2-digit",
        minute: "2-digit",
        hour12: true
    });
    document.querySelector('.time').innerHTML = newYorkTime;
}, 1000);
