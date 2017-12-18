const logo = document.querySelector('#logo');
const mobileBtnNav = document.querySelector('#nav-icon');
const menuLi = document.querySelectorAll('.menu li');
const mobileNavBg = document.querySelector('.mobile_nav_bg');
const inclsubmenu = document.querySelector('.inclsubmenu');
const nosubmenu = document.querySelectorAll('.nosubmenu');
const inclsubmenuA = document.querySelector('.inclsubmenu a');
const submenu = document.querySelector('.submenu');
const langVisible = document.querySelector('.lang_visible');
const langHide = document.querySelector('.lang_hide');
const main = document.querySelector('.main');
const packetsSlides = document.querySelectorAll('.packets_slide');
const spaImgs = document.querySelectorAll('.spa_image .imgs');
const confImgs = document.querySelectorAll('.conferences_image .imgs');
const spaIconPlay = document.querySelector('#spa .controls .image_ctrls_stop .fa-play');
const spaIconPause = document.querySelector('#spa .controls .image_ctrls_stop .fa-pause');
const confIconPlay = document.querySelector('#conferences .controls .image_ctrls_stop .fa-play');
const confIconPause = document.querySelector('#conferences .controls .image_ctrls_stop .fa-pause');
const gotoTop = document.querySelector('.goToTop');
const goToTopText = document.querySelector('.goToTop_text');
let submenuleaveTimeout, langleaveTimeout, packetsSlideNum = 0, pcktsSlides, spaIndex = 0, confIndex = 0, autoplaySpa, autoplayConf;

document.addEventListener("DOMContentLoaded", () => {

      createMobileNavElem = () => {
          const mobileNav = document.querySelector('.mobileNav');
          for (let i = 0; i < menuLi.length; i++) {
              const li = document.createElement('li');
              li.innerHTML = `${menuLi[i].textContent}`;
              mobileNav.appendChild(li);
          }
      }
      createMobileNavElem();

      inclsubmenu.addEventListener('mouseenter', () => {
          clearTimeout(submenuleaveTimeout);
          submenu.style.display = "inline";
          setTimeout(function () {
              submenu.classList.add('submenuActive');
              inclsubmenuA.classList.add('nav_hover');
          }, 1);
      });

      for (let i = 0; i < nosubmenu.length; i++) {
          nosubmenu[i].addEventListener('mouseenter', () => {
              clearTimeout(submenuleaveTimeout);
              inclsubmenuA.classList.remove('nav_hover');
              submenu.classList.remove('submenuActive');
          });
      };

      inclsubmenu.addEventListener('mouseleave', () => {
          submenuleaveTimeout = setTimeout(submenuLeave, 300);
      });

      submenu.addEventListener('mouseenter', () => {
          clearTimeout(submenuleaveTimeout);
      });

      submenu.addEventListener('mouseleave', () => {
          submenuleaveTimeout = setTimeout(submenuLeave, 300);
      });

      function submenuLeave() {
          submenu.classList.remove('submenuActive');
          inclsubmenuA.classList.remove('nav_hover');
          setTimeout(function () {
              submenu.style.display = "none";
          }, 100);
      };

      langVisible.addEventListener('mouseenter', () => {
          clearTimeout(langleaveTimeout);
          langHide.classList.add('lang_hide_active');
          langVisible.classList.add('lang_visible_border');
      });

      langVisible.addEventListener('mouseleave', () => {
          langleaveTimeout = setTimeout(langLeave, 300);
      });

      langHide.addEventListener('mouseenter', () => {
          clearTimeout(langleaveTimeout);
      });

      langHide.addEventListener('mouseleave', () => {
          langleaveTimeout = setTimeout(langLeave, 300);
      });

      langHide.addEventListener('click', function() {
          this.innerHTML = langVisible.innerHTML;
          if (this.innerHTML === "PL") { langVisible.innerHTML = "EN" }
          else { langVisible.innerHTML = "PL" }
      });

      function langLeave() {
          langHide.classList.remove('lang_hide_active');
          langVisible.classList.remove('lang_visible_border');
      };

      // Mobile Nav Btn
      mobileBtnNav.addEventListener('click', () => {
          mobileBtnNav.classList.toggle('open');
          mobileNavBg.classList.toggle('mobile_nav_bg_active');
      });


      // Scroll functions
      window.onscroll = () => scrollFunction();
      gotoTop.addEventListener('click', () => scrollToTop());

      scrollFunction = () => {
          if (document.body.scrollTop > 80 || document.documentElement.scrollTop > 80) {
              const header = document.querySelector('#header');
              header.classList.add('scrolled');
              main.classList.add('scrolled_main');
              logo.classList.add('logoScrolled');
          } else {
              header.classList.remove('scrolled');
              main.classList.remove('scrolled_main');
              logo.classList.remove('logoScrolled'); }

          if (document.body.scrollTop > 300 || document.documentElement.scrollTop > 300) {
              gotoTop.classList.add('goToTop_active');
          } else { gotoTop.classList.remove('goToTop_active'); };

          if (window.scrollY >= document.body.offsetHeight) {
              goToTopText.classList.add('goToTop_text_active');
              gotoTop.classList.add('goToTop_bottom');
          } else {
              goToTopText.classList.remove('goToTop_text_active');
              gotoTop.classList.remove('goToTop_bottom');
          };
      };

      scrollToTop = () => {
          let scrollStep = - window.scrollY / (1000 / 15),
              scrollInterval = setInterval(function() {
              if (window.scrollY != 0) { window.scrollBy(0, scrollStep); }
              else { clearInterval(scrollInterval); };
          }, 15);
      };


      // Top slider function
      const topSlider = (function() {

          const slides = document.querySelectorAll('.slide_img');
          let counter = 1;
          slides[0].classList.add('fade');

          const displaySlide = function() {

                setInterval(function() {
                    for (let i = 0; i < slides.length; i++) {
                        slides[i].style.display = 'none';
                        slides[i].classList.remove('fade');
                    };

                    slides[counter].style.display = 'block';
                    slides[counter].classList.add('fade');
                    counter++;
                    counter === slides.length ? counter = 0 : '';
                }, 5000);

          };

          return {
              'displaySlide' : displaySlide
          }

      })();
      topSlider.displaySlide();

      let w = window.innerWidth
      window.onload = () => getSize(w);
      getSize = (w) => imgsNum(w);

      const onresize = function(e) {
          width = e.target.outerWidth;
          height = e.target.outerHeight;
          imgsNum(width)
      }
      window.addEventListener('resize', onresize);

      // Generuje ilośc wyświetlanych slajdów w sekcji Pakiety
      imgsNum = (width) => {
          if (width < 1200) { pcktsSlides = 1; }
          else if (width > 1200 && width < 1580) { pcktsSlides = 2; }
          else { pcktsSlides = 3; };
          packetsSlider.hideSlides();
          packetsSlider.showSlides(0, pcktsSlides);
      }

      // Pakiety pobytowe slider function
      const packetsSlider = (function() {

          const hideSlides = function() {
              for (let i = 0; i < packetsSlides.length; i++) {
                  packetsSlides[i].classList.remove('packets_slide_active');
                  setTimeout(function() {
                      packetsSlides[i].style.display = 'none';
                    }, 500);
                  };
          };

          const showSlides = function(start, end) {
              for (let i = start; i < end; i++) {
                  setTimeout(function() {
                      packetsSlides[i].style.display = 'block';
                      packetsSlides[i].classList.add('packets_slide_active');
                  }, 500);
              };
          };

          return {
              'hideSlides'   : hideSlides,
              'showSlides'   : showSlides
          };

      })();

      // Prev packets slide button
      const packetsPrevSlide = document.querySelector('.p_ctrls_left');
      packetsPrevSlide.addEventListener('click', () => {
          packetsSlideNum += -pcktsSlides;
          if (packetsSlideNum < 0) { packetsSlideNum = packetsSlides.length-pcktsSlides; }
          packetsSlider.hideSlides();
          packetsSlider.showSlides(packetsSlideNum, packetsSlideNum + pcktsSlides);
      });

      // Next packets slide button
      const packetsNextSlide = document.querySelector('.p_ctrls_right');
      packetsNextSlide.addEventListener('click', () => {
          packetsSlideNum += pcktsSlides;
          if (packetsSlideNum > packetsSlides.length-pcktsSlides) { packetsSlideNum = 0; };
          packetsSlider.hideSlides();
          packetsSlider.showSlides(packetsSlideNum, packetsSlideNum + pcktsSlides);
      });


      // Spa & Konferencje slider function
      const spaConferencesSlider = (function() {

          const hideSlides = function(array) {
              for (let i = 0; i < array.length; i++) {
                  array[i].classList.remove('slide_active');
                  setTimeout(function() {
                      array[i].style.display = 'none';
                  }, 200);
              };
          };

          const showSlides = function(array, i) {
              setTimeout(function() {
                  array[i].style.display = 'block';
                  array[i].classList.add('slide_active');
              }, 200);
          };

          return {
              'hideSlides' : hideSlides,
              'showSlides' : showSlides
          };

      })();

      // Prev spa image button
      const spaimgPrev = document.querySelector('#spa .controls .image_ctrls_left');
      spaimgPrev.addEventListener('click', () => {
          spaIndex--;
          if (spaIndex < 0) { spaIndex = spaImgs.length-1; };
          spaConferencesSlider.hideSlides(spaImgs);
          spaConferencesSlider.showSlides(spaImgs, spaIndex);
      });

      // Next spa image button
      const spaimgNext = document.querySelector('#spa .controls .image_ctrls_right');
      spaimgNext.addEventListener('click', () => {
          spaIndex++;
          if (spaIndex > spaImgs.length-1) { spaIndex = 0 };
          spaConferencesSlider.hideSlides(spaImgs);
          spaConferencesSlider.showSlides(spaImgs, spaIndex);
      });

      // Autoplay spa images button
      const spaimgAuto = document.querySelector('#spa .controls .image_ctrls_stop');
      spaimgAuto.addEventListener('click', () => {

          clearInterval(autoplaySpa);

          if (spaimgAuto.dataset.autoplay === 'false') {
              spaimgAuto.dataset.autoplay = 'true';
              spaimgPrev.classList.add('controls_hidden');
              spaimgNext.classList.add('controls_hidden');
              spaIconPlay.classList.add('hiddenplay');
              spaIconPause.classList.add('play');
              autoplaySpa = setInterval(function() {
                  spaIndex++;
                  if (spaIndex >= spaImgs.length) { spaIndex = 0; };
                  spaConferencesSlider.hideSlides(spaImgs);
                  spaConferencesSlider.showSlides(spaImgs, spaIndex);
              }, 2000); }
          else {
              spaimgAuto.dataset.autoplay = 'false';
              spaimgPrev.classList.remove('controls_hidden');
              spaimgNext.classList.remove('controls_hidden');
              spaIconPlay.classList.remove('hiddenplay');
              spaIconPause.classList.remove('play');
          };

      });

      // Prev conferences image button
      const confimgPrev = document.querySelector('#conferences .controls .image_ctrls_left');
      confimgPrev.addEventListener('click', () => {
          confIndex--;
          if (confIndex < 0) { confIndex = spaImgs.length-1; };
          spaConferencesSlider.hideSlides(confImgs);
          spaConferencesSlider.showSlides(confImgs, confIndex);
      });

      // Next conferences image button
      const confimgNext = document.querySelector('#conferences .controls .image_ctrls_right');
      confimgNext.addEventListener('click', () => {
          confIndex++;
          if (confIndex > spaImgs.length-1) { confIndex = 0 };
          spaConferencesSlider.hideSlides(confImgs);
          spaConferencesSlider.showSlides(confImgs, confIndex);
      });

      // Autoplay conferences images button
      const confimgAuto = document.querySelector('#conferences .controls .image_ctrls_stop');
      confimgAuto.addEventListener('click', () => {

          clearInterval(autoplayConf);

          if (confimgAuto.dataset.autoplay === 'false') {
              confimgAuto.dataset.autoplay = 'true';
              confimgPrev.classList.add('controls_hidden');
              confimgNext.classList.add('controls_hidden');
              confIconPlay.classList.add('hiddenplay');
              confIconPause.classList.add('play');
              autoplayConf = setInterval(function() {
                  confIndex++;
                  if (confIndex >= spaImgs.length) { confIndex = 0; };
                  spaConferencesSlider.hideSlides(confImgs);
                  spaConferencesSlider.showSlides(confImgs, confIndex);
              }, 2000); }
          else {
              confimgAuto.dataset.autoplay = 'false';
              confimgPrev.classList.remove('controls_hidden');
              confimgNext.classList.remove('controls_hidden');
              confIconPlay.classList.remove('hiddenplay');
              confIconPause.classList.remove('play');
          };

      });


      // Email send
      const email = document.querySelector('#email');
      const error = document.querySelector('.error');
      const checkbox = document.querySelector('#checkbox');
      const emailBtn = document.querySelector('.emailform .send');
      const mailReg = new RegExp('^[0-9a-zA-Z_.-]+@[0-9a-zA-Z.-]+\.[a-zA-Z]{2,3}$', 'gi');

      emailBtn.addEventListener('click', () => emailValid());

      emailValid = () => {
          (mailReg.test(email.value) && checkbox.checked) ? (error.classList.remove('err_active'), email.value = '') : error.classList.add('err_active');
      };

});
