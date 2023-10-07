const menu = document.querySelector('.menu')
const menuEl = document.querySelector('.menuEl')
const menuLines = document.querySelectorAll('.lines')
let click = 0;


menu.addEventListener("click", () => {
    click++
    menuEl.style.right = "5%"
    for (z = 0; z < menuLines.length; z++) {
        menuLines[z].classList.add("activated")
    }
    if (click >= 2) {
        click = 0
        menuEl.style.right = "-100%"
    }
})
const wrapper = document.querySelector('.wrapper')

wrapper.addEventListener("click", () => {
    menuEl.style.right = "-100%"
})
const anchors = document.querySelectorAll('.menuEl a')

for (i = 0; i < anchors.length; i++) {
    anchors[i].addEventListener("click", () => {
        menuEl.style.right = "-100%"
    })

}

window.onscroll = function () { myFunction() };
const popUp = document.querySelector('.back')

function myFunction() {
    var winScroll = document.body.scrollTop || document.documentElement.scrollTop;
    var height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    var scrolled = (winScroll / height) * 100;
    if (scrolled >= 90) {
        popUp.style.right = "5%";
    } else if (scrolled <= 90) {
        popUp.style.right = "-100%"
    }
    document.getElementById("myBar").style.width = scrolled + "%";
}

popUp.addEventListener("click", () => {
    scrollTo(0, 0)
})

const btn = document.querySelector('button')

btn.addEventListener("click", () => {
    const targetElement = document.querySelector('#contact');

    if (targetElement) {
        // Scroll to the target element smoothly
        targetElement.scrollIntoView({ behavior: 'smooth' });
    }
})

const popups = document.querySelector('.sent')
const errors = document.querySelector('.error')
function sendEmail(e) {
    e.preventDefault();

    // Get the values from the input fields
    const userEmail = document.querySelector('.fullname').value;
    const userName = document.querySelector('.email').value;
    const message = document.querySelector('.msg').value;

    // Check if any of the input fields are empty
    if (userEmail.trim() === '' || userName.trim() === '' || message.trim() === '') {
        errors.style.display = "flex"
        setTimeout(() => {
            errors.style.display = "none"
        }, 5000);
        return; 
    }

    const templateParams = {
        user_email: userEmail,
        user_name: userName,
        message: message,
    };

    emailjs.send("service_14tu68a", "template_0nduef6", templateParams).then(
        function (response) {
            console.log("Email sent successfully:", response);
            popups.style.display = "flex";
            setTimeout(() => {
                popups.style.display = "none";
            }, 5000);
            // Clear the input fields after successful email send
            document.querySelector('.fullname').value = '';
            document.querySelector('.email').value = '';
            document.querySelector('.msg').value = '';
        },
        function (error) {
            console.error("Email could not be sent:", error);
        }
    );
}


document.querySelector(".sendBtn").addEventListener("click", sendEmail);

const tl = gsap.timeline()

tl.to('.textLoad', {
    opacity: 1,
    duration: 1,
    delay: 0.5
})
.to('.textLoad', {
    opacity: 0,
    duration: 1
})
.to('.textLoads', {
    opacity: 1,
    duration: 1
})
.to('.textLoads', {
    opacity: 0,
    duration: 1,
    onComplete: () => {
        scrollTo(0, 0)
        gsap.to('.loaderLeft', {
            x: "-100%",
            duration: 1,
            delay: 0.5
        })
        gsap.to('.loaderRight', {
            x: "100%",
            duration: 1,
            delay: 0.5,
            onComplete: () => {
                scrollTo(0, 0)
                gsap.to('.wrapper', {
                    opacity: 1,
                    duration: 1
                })
            }
        })
    }
})
