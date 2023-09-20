
//////////////////////////////////////////
console.log(document.documentElement)
console.log(document.head)
console.log(document.body)

const header = document.querySelector('.header')
const allSection = document.querySelectorAll('.section')
console.log(allSection)

document.getElementById('section--1')
console.log(document.getElementsByTagName('button'))

console.log(document.getElementsByClassName('btn'))

//creating and inserting element
const message = document.createElement('div')
message.classList.add('cookie-message')
message.textContent = 'We used cookie for imporved functionality and analytics'
message.innerHTML = 'We used cookie for imporved functionality and analytics <button class="btn btn--close-cookie">Got it! </button> ';

header.prepend(message)
// header.append(message)
// header.append(message.cloneNode(true))

header.before(message)
// header.after(message)


//delete elements
document.querySelector('.btn--close-cookie').addEventListener('click', function () {
    // message.remove();
    message.parentElement.removeChild(message)
})


///////////////////////////////////////////////////////////

//styles
message.style.backgroundColor = '#37383d';
message.style.width = '100%'
// message.style.height = '70px'

console.log(message.style.color)
console.log(message.style.backgroundColor)

console.log(getComputedStyle(message).height)
console.log(getComputedStyle(message).color)

message.style.height = Number.parseFloat(getComputedStyle(message).height) + 30 + 'px';

document.documentElement.style.setProperty('--color-primary', 'orange')


//attribute
const logo = document.querySelector('.nav__logo');
console.log(logo.alt)
console.log(logo.className)

logo.alt = 'Beautiful minimal logo'

//Non -standard
console.log(logo.designer)
console.log(logo.getAttribute('designer'))
logo.setAttribute('company', 'Bankist')

console.log(logo.getAttribute('src'))

const link = document.querySelector('.twitter-link');
console.log(link.getAttribute('href'))


//data attributes
console.log(logo.dataset.versionNumber)


//classess
// logo.classList.add('c')
// logo.classList.remove('c')
// logo.classList.toggle('c')
// logo.classList.contains('c')

// //don't use this
// logo.className = 'Jonas'


///////////////////////////////////////////////
//smooth scroll
const btnScroll = document.querySelector('.btn--scroll-to')
const section1 = document.querySelector('#section--1')

btnScroll.addEventListener('click', function (e) {
    const s1coords = section1.getBoundingClientRect();
    console.log(e.target.getBoundingClientRect())

    // window.scrollTo(s1coords.left + window.pageXOffset, s1coords.top + window.pageYOffset)
    // window.scrollTo({
    //     left: s1coords.left + window.pageXOffset,
    //     top: s1coords.top + window.pageYOffset,
    //     behavior: 'smooth'
    // })

    section1.scrollIntoView({ behavior: 'smooth' });
})

/////////////////////////////
// event
// const h1 = document.querySelector('h1');
// const alerth1 = function (e) {
//     alert('Entered the heading')
//     // h1.removeEventListener('mouseenter', alerth1)
// }

// h1.addEventListener('mouseenter', alerth1)

// setTimeout(() => {
//     h1.removeEventListener('mouseenter', alerth1)
// }, 3000);

//another way
// h1.onmouseenter = function (e) {
//     // alert('Mouse enterd 2')
// }

//////////////////////////////////////////

/*
const randomInt = (min, max) => {
    Math.floor(Math.random() * (max - min + 1) + min);
}
const randomColor = () => {
    `rgb(${randomInt(0, 255)},${randomInt(0, 255)},${randomInt(0, 255)})`;
}

document.querySelector('.nav__link').addEventListener('click', function (e) {
    this.style.backgroundColor = randomColor();
    console.log("LINK", e.target, e.currentTarget)
    console.log(this == e.currentTarget)

    //stop propagation
    // e.stopPropagation();

})

document.querySelector('.nav__links').addEventListener('click', function (e) {
    this.style.backgroundColor = randomColor();
    console.log("LINK", e.target)
})

document.querySelector('.nav').addEventListener('click', function (e) {
    this.style.backgroundColor = randomColor();
    console.log("LINK", e.target)
})
*/

//////////////////////
//page navigation
document.querySelectorAll('.nav__link').forEach(function (el) {
    el.addEventListener('click', function (e) {
        e.preventDefault()
        const id = this.getAttribute('href');
        document.querySelector(id).scrollIntoView({ behavior: 'smooth' })
    })
})

//1.add event listener in the common parent element

document.querySelector('.nav__links').addEventListener('click', function (e) {
    e.preventDefault();

    //matching steategy
    if (e.target.classList.contains('nav__link')) {
        const id = e.target.getAttribute('href');
        document.querySelector(id).scrollIntoView({ behavior: 'smooth' })
    }
})


/////////////////////////////////
//going downwords: child

///////////////////
//tabbed component

const tabs = document.querySelectorAll('.operations__tab');
const tabsContainer = document.querySelector('.operations__tab-container')
const tabsContent = document.querySelectorAll('.operations__content')

// tabs.forEach(t => t.addEventListener('click', () => {
//     console.log('clicked button')
// }))

tabsContainer.addEventListener('click', function (e) {


    const clicked = e.target.closest('.operations__tab');
    // console.log(clicked)

    //guard clause
    if (!clicked) return;
    tabs.forEach(t => t.classList.remove('operations__tab--active'))
    clicked.classList.add('operations__tab--active')

    ////activate conent type
    tabsContent.forEach(tb => tb.classList.remove('operations__content--active'))
    document.querySelector(`.operations__content--${clicked.dataset.tab}`).classList.add('operations__content--active')

})

///////////////////////////////////////////
//menu fade out

const nav = document.querySelector('.nav')

const handleMouse = function (e) {
    if (e.target.classList.contains('nav__link')) {
        const link = e.target;
        const siblings = link.closest('.nav').querySelectorAll('.nav__link');
        const logo = link.closest('.nav').querySelector('img')

        siblings.forEach(el => {
            if (el !== link) el.style.opacity = this
        })
        logo.style.opacity = this
    }
}

nav.addEventListener('mouseover', handleMouse.bind(0.5))
nav.addEventListener('mouseout', handleMouse.bind(1))

/////////////////////////////////////////////////
//scroll
const initalCoords = section1.getBoundingClientRect();

// window.addEventListener('scroll', function () {
//     if (window.scrollY > initalCoords.top) {
//         nav.classList.add('sticky')
//     } else {
//         nav.classList.remove('sticky')
//     }
// })

///////////////////////

const navHeight = nav.getBoundingClientRect().height;

const stickyNav = function (entries) {
    const [entry] = entries;

    if (!entry.isIntersecting) nav.classList.add('sticky')
    else nav.classList.remove('sticky')
}
const headerObserver = new IntersectionObserver(stickyNav, {
    root: null,
    threshold: 0,
    rootMargin: `-${navHeight}px`
});
headerObserver.observe(header);

//////////////////////////////////////////
const revealSection = function (entries, observer) {
    const [entry] = entries;

    if (!entry.isIntersecting) return;
    entry.target.classList.remove('section--hidden');
    observer.unobserve(entry.target)
}

const sectionObserver = new IntersectionObserver(revealSection, {
    root: null,
    threshold: 0.15
})

allSection.forEach(function (section) {
    sectionObserver.observe(section)
    // section.classList.add('section--hidden')
})

/////////////////////////////
//lazy image loader
const imgTargets = document.querySelectorAll('img[data-src]')

const loadImg = function (entries, observer) {
    const [entry] = entries;
    if (!entry.isIntersecting) return;

    entry.target.src = entry.target.dataset.src;

    entry.target.addEventListener('load', function () {
        entry.target.classList.remove('lazy-img')
    })

    observer.unobserve(entry.target)
}

const imgObserver = new IntersectionObserver(loadImg, {
    root: null,
    threshold: 0,
    rootMargin: '200px'
})

imgTargets.forEach(img => imgObserver.observe(img));

////////////////////////////////////
//slider
const slider = function () {
    const slides = document.querySelectorAll('.slide');
    const btnLeft = document.querySelector('.slider__btn--left');
    const btnRight = document.querySelector('.slider__btn--right');
    const dotContainer = document.querySelector('.dots');

    let curSlide = 0;
    const maxSlide = slides.length;

    // Functions
    const createDots = function () {
        slides.forEach(function (_, i) {
            dotContainer.insertAdjacentHTML(
                'beforeend',
                `<button class="dots__dot" data-slide="${i}"></button>`
            );
        });
    };

    const activateDot = function (slide) {
        document
            .querySelectorAll('.dots__dot')
            .forEach(dot => dot.classList.remove('dots__dot--active'));

        document
            .querySelector(`.dots__dot[data-slide="${slide}"]`)
            .classList.add('dots__dot--active');
    };

    const goToSlide = function (slide) {
        slides.forEach(
            (s, i) => (s.style.transform = `translateX(${100 * (i - slide)}%)`)
        );
    };

    // Next slide
    const nextSlide = function () {
        if (curSlide === maxSlide - 1) {
            curSlide = 0;
        } else {
            curSlide++;
        }

        goToSlide(curSlide);
        activateDot(curSlide);
    };

    const prevSlide = function () {
        if (curSlide === 0) {
            curSlide = maxSlide - 1;
        } else {
            curSlide--;
        }
        goToSlide(curSlide);
        activateDot(curSlide);
    };

    const init = function () {
        goToSlide(0);
        createDots();

        activateDot(0);
    };
    init();

    // Event handlers
    btnRight.addEventListener('click', nextSlide);
    btnLeft.addEventListener('click', prevSlide);

    document.addEventListener('keydown', function (e) {
        if (e.key === 'ArrowLeft') prevSlide();
        e.key === 'ArrowRight' && nextSlide();
    });

    dotContainer.addEventListener('click', function (e) {
        if (e.target.classList.contains('dots__dot')) {
            const { slide } = e.target.dataset;
            goToSlide(slide);
            activateDot(slide);
        }
    });
};
slider();