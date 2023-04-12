// const carousel = (function() {
//   let currentIndex = 0;
//   let items;
//   let totalItems;

//   function changeItem() {
//     items.forEach(item => item.classList.remove('is-active'));
//     items[currentIndex].classList.add('is-active');
//   }

//   function nextItem() {
//     currentIndex = (currentIndex + 1) % totalItems;
//     changeItem();
//   }

//   function autoRotate() {
//     setInterval(nextItem, 4000); // Adjust the time interval in milliseconds for automatic rotation
//   }

//   return {
//     init: function() {
//       items = document.querySelectorAll('.carousel .carousel-item');
//       totalItems = items.length;
//       autoRotate();
//     }
//   };
// })();

// document.addEventListener('DOMContentLoaded', function() {
//   carousel.init();
// });

