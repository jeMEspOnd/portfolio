
document.addEventListener("DOMContentLoaded", function () {
    const textToType = [
        "Hello! I am a Fullstack Web Developer with expertise in creating dynamic websites and applications using .NET Core and Angular Framework. I thrive on turning complex problems into elegant solutions and bringing ideas to life through code.",
        "With a passion for clean code, I am always looking for innovative ways to enhance user experience and solve technical challenges efficiently."
    ];

    let currentText1 = '';
    let currentText2 = '';
    let letterIndex = 0;
    let textIndex = 0;
    const typingSpeed = 30; // Speed of typing in milliseconds

    function type() {
        if (textIndex === 0) {
            if (letterIndex < textToType[0].length) {
                currentText1 += textToType[0].charAt(letterIndex);
                document.getElementById("typing-text-1").innerHTML = currentText1;
                letterIndex++;
                setTimeout(type, typingSpeed);
            } else {
                // Move to second paragraph after first is done
                textIndex = 1;
                letterIndex = 0;
                setTimeout(type, typingSpeed);
            }
        } else if (textIndex === 1) {
            if (letterIndex < textToType[1].length) {
                currentText2 += textToType[1].charAt(letterIndex);
                document.getElementById("typing-text-2").innerHTML = currentText2;
                letterIndex++;
                setTimeout(type, typingSpeed);
            }
        }
    }

    type(); // Start typing


});
// Activate Scroll Spy
document.addEventListener("DOMContentLoaded", function () {
    const sections = document.querySelectorAll("section");
    const navLinks = document.querySelectorAll(".navbar-nav .nav-link");

    window.addEventListener("scroll", () => {
        let current = "";

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            if (pageYOffset >= sectionTop - 60) {
                current = section.getAttribute("id");
            }
        });

        navLinks.forEach(link => {
            link.classList.remove("active");
            if (link.getAttribute("href").includes(current)) {
                link.classList.add("active");
            }
        });
    });
});

/*Skills animation*/
window.addEventListener('load', function () {
    const progressBars = document.querySelectorAll('.progress-bar');

    function getColor(percent) {
        // Calculate color based on the percentage
        if (percent <= 50) {
            // Red to Yellow
            const red = 255;
            const green = Math.round(255 * (percent / 50)); // Interpolate from 0 to 255
            return `rgb(${red}, ${green}, 0)`; // RGB color
        } else {
            // Yellow to Green
            const red = Math.round(255 * (1 - (percent - 50) / 50)); // Interpolate from 255 to 0
            const green = 255; // Stays 255
            return `rgb(${red}, ${green}, 0)`; // RGB color
        }
    }

    progressBars.forEach(function (bar) {
        const targetWidth = bar.getAttribute('aria-valuenow');
        bar.style.width = '0%'; // Start at 0%
        bar.textContent = '0%'; // Start text at 0%

        // Animate the progress bar
        const interval = setInterval(() => {
            let currentWidth = parseInt(bar.style.width);
            if (currentWidth < targetWidth) {
                currentWidth++;
                bar.style.width = currentWidth + '%';
                bar.textContent = currentWidth + '%'; // Update text to current width

                // Set the background color based on current width
                bar.style.backgroundColor = getColor(currentWidth);
            } else {
                clearInterval(interval); // Stop the interval when the target width is reached
                bar.textContent = targetWidth + '%'; // Ensure final text matches the target width
            }
        }, 50); // Adjust the speed of the animation here
    });
});









