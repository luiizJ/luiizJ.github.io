let btnMenu = document.querySelector('#menu');
let btnOp = document.querySelector('#nav-toggle')
let qlq = document.querySelector('.l-header')

btnMenu.addEventListener('click', ()=>{
    btnOp.classList.add('openSrc')
})

btnOp.addEventListener('click', ()=>{
    btnOp.classList.remove('openSrc')
})


//navb
 // Função para destacar a aba ativa na navbar
 document.addEventListener('DOMContentLoaded', () => {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav__link');
    // Função para remover a classe active de todos os links
    const removeActiveClasses = () => {
      navLinks.forEach(link => link.classList.remove('active'));
    };
    // Função para adicionar a classe active ao link correspondente à seção visível
    const addActiveClass = (id) => {
      const link = document.querySelector(`.nav__link[href="#${id}"]`);
      if (link) {
        link.classList.add('active');
      }
    };
    // Função para verificar qual seção está visível
    const handleScroll = () => {
      let index = sections.length;
      while (--index && window.scrollY + 50 < sections[index].offsetTop) {}
      removeActiveClasses();
      addActiveClass(sections[index].id);
    };
    // Adiciona o evento de scroll
    window.addEventListener('scroll', handleScroll);
    // Chama a função handleScroll ao carregar a página
    handleScroll();
  });

// BUTTON INITIAL
document.getElementById('link').addEventListener('mouseenter', () => link.textContent = 'Baixar Currículo');
document.getElementById('link').addEventListener('mouseleave', () => link.textContent = 'Curriculo');

//cards
const wrapper = document.querySelector(".effect");
const carousel = document.querySelector(".transition");
const firstCardWidth = carousel.querySelector(".card").offsetWidth;
const arrowBtns = document.querySelectorAll(".effect i");
const carouselChildrens = [...carousel.children];
let isDragging = false, isAutoPlay = true, startX, startScrollLeft, timeoutId;

let cardPerView = Math.round(carousel.offsetWidth / firstCardWidth);

carouselChildrens.slice(-cardPerView).reverse().forEach(card => {
    carousel.insertAdjacentHTML("afterbegin", card.outerHTML);
});
carouselChildrens.slice(0, cardPerView).forEach(card => {
    carousel.insertAdjacentHTML("beforeend", card.outerHTML);
});
carousel.classList.add("no-transition");
carousel.scrollLeft = carousel.offsetWidth;
carousel.classList.remove("no-transition");
arrowBtns.forEach(btn => {
    btn.addEventListener("click", () => {
        carousel.scrollLeft += btn.id == "left" ? -firstCardWidth : firstCardWidth;
    });
});
const dragStart = (e) => {
    isDragging = true;
    carousel.classList.add("dragging");
    startX = e.pageX;
    startScrollLeft = carousel.scrollLeft;
}
const dragging = (e) => {
    if(!isDragging) return;
    carousel.scrollLeft = startScrollLeft - (e.pageX - startX);
}
const dragStop = () => {
    isDragging = false;
    carousel.classList.remove("dragging");
}
const infiniteScroll = () => {
    if(carousel.scrollLeft === 0) {
        carousel.classList.add("no-transition");
        carousel.scrollLeft = carousel.scrollWidth - (2 * carousel.offsetWidth);
        carousel.classList.remove("no-transition");
    }
    else if(Math.ceil(carousel.scrollLeft) === carousel.scrollWidth - carousel.offsetWidth) {
        carousel.classList.add("no-transition");
        carousel.scrollLeft = carousel.offsetWidth;
        carousel.classList.remove("no-transition");
    }
    clearTimeout(timeoutId);
    if(!wrapper.matches(":hover")) autoPlay();
}
const autoPlay = () => {
    if(window.innerWidth < 800 || !isAutoPlay) return;
    timeoutId = setTimeout(() => carousel.scrollLeft += firstCardWidth, 2500);
}
autoPlay();

carousel.addEventListener("mousedown", dragStart);
carousel.addEventListener("mousemove", dragging);
document.addEventListener("mouseup", dragStop);
carousel.addEventListener("scroll", infiniteScroll);
wrapper.addEventListener("mouseenter", () => clearTimeout(timeoutId));
wrapper.addEventListener("mouseleave", autoPlay);
