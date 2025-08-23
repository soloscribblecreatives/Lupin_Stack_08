function runAnimation() {
  window.requestAnimationFrame(function () {

  const slider = document.getElementById("slider");
  const ball = document.getElementById("ball");
  const canvas = document.getElementById("canvas");

  const sliderHeight = 540;
  const ballStartSize = 100;
  const ballEndSize = 150;
  const ballEndPosition = 15;

  // Center position for slider
  const sliderTop = (canvas.offsetHeight - sliderHeight) / 2;
  const sliderBottom = sliderTop + sliderHeight;

  // Set initial ball position at bottom of slider
  let ballY = sliderBottom - ball.offsetHeight/2;
  ball.style.top = ballY + "px";

  let isDragging = false;

  function updateReveal(ballY) {
    // Constrain within slider area
    if (ballY < sliderTop - ball.offsetHeight/2) ballY = sliderTop - ball.offsetHeight/2;
    if (ballY > sliderBottom - ball.offsetHeight/2) ballY = sliderBottom - ball.offsetHeight/2;

    ball.style.top = ballY + "px";

    // Calculate progress from bottom (0) to top (1)
    let progress = 1 - (ballY - (sliderTop - ball.offsetHeight/2)) / (sliderBottom - sliderTop);
    progress = Math.max(0, Math.min(1, progress));

    // Reveal slider progressively
    slider.style.opacity = 1;
    let hiddenPercent = (1 - progress) * 100;
    slider.style.clipPath = `inset(${hiddenPercent}% 0 0 0)`;

    // If reached top
    if (progress === 1) {
      ball.style.width = ballEndSize + "px";
      ball.style.height = ballEndSize + "px";
      ball.style.top = ballEndPosition + "px";
	  setTimeout(function(){
		  open_page("",3);
	  }, 2000);
      //alert("loading complete");
    }
	else {
	  ball.style.width = ballStartSize + "px";
      ball.style.height = ballStartSize + "px";
	}
  }

  function startDrag(e) {
    isDragging = true;
    e.preventDefault();
  }

  function drag(e) {
    if (!isDragging) return;
    let clientY = e.touches ? e.touches[0].clientY : e.clientY;
    let rect = canvas.getBoundingClientRect();
    let y = clientY - rect.top - ball.offsetHeight/2;
    updateReveal(y);
  }

  function endDrag() {
    isDragging = false;
  }

  // Mouse + Touch support
  ball.addEventListener("mousedown", startDrag);
  document.addEventListener("mousemove", drag);
  document.addEventListener("mouseup", endDrag);

  ball.addEventListener("touchstart", startDrag);
  document.addEventListener("touchmove", drag);
  document.addEventListener("touchend", endDrag);

  });
}



  