// Header/burger-menu
document.addEventListener('DOMContentLoaded', function() {
    const burger = document.querySelector('.header__burger');
    const menu = document.querySelector('.header__menu');
    const body = document.body;
    const overlay = document.querySelector('.header__overlay');
    const menuLinks = document.querySelectorAll('.header__menu a');

    burger.addEventListener('click', function() {
        const isActive = burger.classList.toggle('active');
        menu.classList.toggle('active');
        overlay.classList.toggle('active');
        body.classList.toggle('no-scroll', isActive);
    });

    overlay.addEventListener('click', function() {
        burger.classList.remove('active');
        menu.classList.remove('active');
        overlay.classList.remove('active');
        body.classList.remove('no-scroll');
    });

    menuLinks.forEach(function(link) {
        link.addEventListener('click', function() {
            burger.classList.remove('active');
            menu.classList.remove('active');
            overlay.classList.remove('active');
            body.classList.remove('no-scroll');
        });
    });
});

// LazyLoad img/iframe/video
document.addEventListener("DOMContentLoaded", function() {
    // Specify the tags to which lazy loading will be applied
    const tags = ['img', 'iframe', 'video'];

    tags.forEach(tag => {
        // Find all elements with the specified tag
        const elements = document.querySelectorAll(tag);

        elements.forEach(element => {
            // Check if the element has a src attribute
            if (element.hasAttribute('src')) {
                // Get the value of the src attribute
                const srcValue = element.getAttribute('src');

                // Set a new data-src attribute with the same value
                element.setAttribute('data-src', srcValue);

                // Remove the original src attribute
                element.removeAttribute('src');

                // Add the lazy class
                element.classList.add('lazy');
            }

            // If this is a video, also process the source elements
            if (tag === 'video') {
                const sources = element.querySelectorAll('source');

                sources.forEach(source => {
                    if (source.hasAttribute('src')) {
                        const srcValue = source.getAttribute('src');
                        source.setAttribute('data-src', srcValue);
                        source.removeAttribute('src');
                    }
                });
            }
        });
    });

    // Initialize lazyload.js
    var lazyLoadInstance = new LazyLoad({
        elements_selector: ".lazy"
    });

    // Load all images in slider after init
    $(document).on("init", ".slick-slider", function(e, slick) {
        var images = slick.$slides.find('img').toArray();
        if (images.length > 0) {
            lazyLoadInstance.loadAll(images);
        }
    });
});

//Remove placeholder on click
$( 'input,textarea' ).on('focus', function() {
    var $this = $(this);
    if ($this.attr('placeholder')) {
        $this.data('placeholder', $this.attr('placeholder'));
        $this.attr('placeholder', '');
    }
}).on('blur', function() {
    var $this = $(this);
    if ($this.data('placeholder')) {
        $this.attr('placeholder', $this.data('placeholder'));
    }
});

// Parallax/jarallax effect
jarallax(document.querySelectorAll('.jarallax'), {
    speed: .5,
    imgSize: 'cover',
    imgPosition: 'center',
});

// Home slider
$('.home-slider').slick({
    dots: false,
    arrows: false,
    infinite: true,
    speed: 300,
    slidesToShow: 1,
});