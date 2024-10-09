
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


