console.log('Script.js is connected and running');

window.onload = function() {
    var blocks = document.querySelectorAll('.block');
    var count = blocks.length;
    var radius = 170; // Radius for blocks
    var arrowRadius = 250; // Increase this value to increase the radius for arrows
    var parent = document.querySelector('.flowchart');
    var width = parent.offsetWidth;
    var height = parent.offsetHeight;
    var angle = 0;
    var step = (2*Math.PI) / count;
    blocks.forEach(function(block, index) {
      var x = Math.round(width/2 + radius * Math.cos(angle) - block.offsetWidth/2);
      var y = Math.round(height/1.8 + radius * Math.sin(angle) - block.offsetHeight/2);
      block.style.left = x + 'px';
      block.style.top = y + 'px';
      angle += step;
    });
  
    angle = 0; // Reset angle for arrows
  
    for (var i = 0; i < count; i++) {
      var startBlock = blocks[i];
      var endBlock = blocks[(i + 1) % count];
      var arrow = document.createElement('img');
      arrow.classList.add('arrow');
      arrow.src = "Images/arrow2.png"; // Replace with the path to your arrow image
      parent.appendChild(arrow);
      var startX = Math.round(width/2 + arrowRadius * Math.cos(angle));
      var startY = Math.round(height/2 + arrowRadius * Math.sin(angle));
      angle += step; // Increment angle for next arrow
      var endX = Math.round(width/2 + arrowRadius * Math.cos(angle));
      var endY = Math.round(height/2 + arrowRadius * Math.sin(angle));
      var arrowX = (startX + endX) / 2 - arrow.width/2;
      var arrowY = (startY + endY) / 2 - arrow.height/2;
      arrow.style.left = arrowX + 'px';
      arrow.style.top = arrowY + 'px';
      var angleDeg = Math.atan2(endY - startY, endX - startX) * 180 / Math.PI;
      arrow.style.transform = 'rotate(' + angleDeg + 'deg)';
    }
};

/*blog page*/
document.addEventListener('DOMContentLoaded', function() {
  const sections = document.querySelectorAll('.blog-post section');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.animationPlayState = 'running';
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1
  });

  sections.forEach(section => {
    observer.observe(section);
  });
});

// script.js

function togglePasswordVisibility(fieldId) {
  const field = document.getElementById(fieldId);
  const type = field.getAttribute('type') === 'password' ? 'text' : 'password';
  field.setAttribute('type', type);
}
