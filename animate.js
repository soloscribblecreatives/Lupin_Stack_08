function runAnimation() {
    window.requestAnimationFrame(function() {

        const slider = document.getElementById("slider");
        const ball = document.getElementById("ball");

        const ballStartSize = 100;
        const ballEndSize = 150;
        const ballEndPosition = 15;

        let isDragging = false;
        let isLocked = false; // 🔒 lock when ball reaches top

        // --- INITIAL POSITION AT BOTTOM OF SLIDER ---
        window.addEventListener("load", () => {
            ball.style.width = ballStartSize + "px";
            ball.style.height = ballStartSize + "px";

            // Ball centered horizontally on slider, bottom aligned
            let ballY = slider.offsetTop + slider.offsetHeight - ballStartSize;
            ball.style.top = ballY + "px";
        });

        function updateReveal(y) {
            if (isLocked) return;

            const sliderTop = slider.offsetTop;
            const sliderBottom = slider.offsetTop + slider.offsetHeight;

            // Constrain within slider range
            if (y < sliderTop) y = sliderTop;
            if (y > sliderBottom - ball.offsetHeight) y = sliderBottom - ball.offsetHeight;

            ball.style.top = y + "px";

            // Progress: 0 = bottom, 1 = top
            let progress = 1 - (y - sliderTop) / (slider.offsetHeight - ball.offsetHeight);
            progress = Math.max(0, Math.min(1, progress));

            // Reveal slider progressively
            slider.style.opacity = 1;
            slider.style.clipPath = `inset(${(1 - progress) * 100}% 0 0 0)`;

            // Lock at top
            if (progress === 1 && !isLocked) {
                isLocked = true;
                ball.style.width = ballEndSize + "px";
                ball.style.height = ballEndSize + "px";
                ball.style.top = ballEndPosition + "px"; // stick at top
                setTimeout(function() {
                    open_page("", 3);
                }, 1000);
            } else {
                ball.style.width = ballStartSize + "px";
                ball.style.height = ballStartSize + "px";
            }

        }

        function startDrag(e) {
            if (isLocked) return;
            isDragging = true;
            e.preventDefault();
        }

        function drag(e) {
            if (!isDragging || isLocked) return;

            let clientY = e.touches ? e.touches[0].clientY : e.clientY;
            let parentRect = slider.parentElement.getBoundingClientRect();

            // Y relative to parent container
            let y = clientY - parentRect.top - ball.offsetHeight / 2;

            updateReveal(y);
        }

        function endDrag() {
            isDragging = false;
        }

        // --- EVENT LISTENERS (Mouse + Touch) ---
        ball.addEventListener("mousedown", startDrag);
        document.addEventListener("mousemove", drag);
        document.addEventListener("mouseup", endDrag);

        ball.addEventListener("touchstart", startDrag);
        document.addEventListener("touchmove", drag);
        document.addEventListener("touchend", endDrag);

    });
}