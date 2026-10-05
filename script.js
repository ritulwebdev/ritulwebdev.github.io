document.addEventListener("DOMContentLoaded",()=>{const header=document.getElementById("siteHeader"),toggle=document.getElementById("menuToggle"),nav=document.getElementById("mainNav"),top=document.getElementById("backTop"),links=document.querySelectorAll(".nav-link"),sections=document.querySelectorAll("main section[id]");function scroll(){header.classList.toggle("scrolled",scrollY>20);top.classList.toggle("visible",scrollY>600);let cur="home";sections.forEach(s=>{if(scrollY>=s.offsetTop-130)cur=s.id});links.forEach(a=>a.classList.toggle("active",a.getAttribute("href")==="#"+cur))}addEventListener("scroll",scroll,{passive:true});scroll();toggle.addEventListener("click",()=>{let open=nav.classList.toggle("open");toggle.setAttribute("aria-expanded",open)});links.forEach(a=>a.addEventListener("click",()=>{nav.classList.remove("open");toggle.setAttribute("aria-expanded","false")}));const obs=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add("visible");obs.unobserve(e.target)}}),{threshold:.12});document.querySelectorAll(".reveal").forEach(e=>obs.observe(e));const counters=document.querySelectorAll("[data-count]");const co=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){let el=e.target,end=+el.dataset.count,start=performance.now();function tick(t){let p=Math.min((t-start)/900,1);el.textContent=Math.floor(end*(1-Math.pow(1-p,3)));if(p<1)requestAnimationFrame(tick)}requestAnimationFrame(tick);co.unobserve(el)}}),{threshold:.6});counters.forEach(e=>co.observe(e));const track = document.getElementById("clientTrack");  if (track) {     const slides = track.querySelectorAll(".client-slide");     const prev = document.getElementById("clientPrev");     const next = document.getElementById("clientNext");     const counter = document.getElementById("clientCounter");     const dots = document.getElementById("clientDots");      let i = 0;     let timer;      slides.forEach((_, n) => {         let d = document.createElement("button");         d.className = "client-dot" + (n === 0 ? " active" : "");         d.type = "button";          d.addEventListener("click", () => {             go(n);             restart();         });          dots.appendChild(d);     });      function go(n) {         i = (n + slides.length) % slides.length;          track.style.transform = `translateX(-${i * 100}%)`;          if (counter) {             counter.textContent =                 `${String(i + 1).padStart(2, "0")} / ${String(slides.length).padStart(2, "0")}`;         }          dots.querySelectorAll(".client-dot").forEach((d, x) => {             d.classList.toggle("active", x === i);         });     }      function restart() {         clearInterval(timer);         timer = setInterval(() => go(i + 1), 6000);     }      if (prev) {         prev.addEventListener("click", () => {             go(i - 1);             restart();         });     }      if (next) {         next.addEventListener("click", () => {             go(i + 1);             restart();         });     }      restart();      const slider = document.querySelector(".client-slider");      if (slider) {         slider.addEventListener("mouseenter", () => clearInterval(timer));         slider.addEventListener("mouseleave", restart);     } }top.addEventListener("click",()=>scrollTo({top:0,behavior:"smooth"}));
// Theme Toggle
const themeToggle = document.getElementById("themeToggle");

if (themeToggle) {
    const savedTheme = localStorage.getItem("theme");

    if (savedTheme === "dark") {
        document.body.classList.add("dark-theme");
        themeToggle.checked = false;
    } else {
        document.body.classList.remove("dark-theme");
        themeToggle.checked = true;
    }

    themeToggle.addEventListener("change", () => {
        if (themeToggle.checked) {
            document.body.classList.remove("dark-theme");
            localStorage.setItem("theme", "light");
        } else {
            document.body.classList.add("dark-theme");
            localStorage.setItem("theme", "dark");
        }
    });
}
                                                  
function updateBackTopColor(){
    const purpleSection = document.querySelector(".contact-section");

    if (!purpleSection) return;

    const rect = purpleSection.getBoundingClientRect();

    const isPurpleSection =
        rect.top < window.innerHeight &&
        rect.bottom > 0;

    top.classList.toggle("on-purple", isPurpleSection);
}

addEventListener("scroll", updateBackTopColor, {passive:true});
addEventListener("resize", updateBackTopColor);
updateBackTopColor();

document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener("click", e => {

        const href = a.getAttribute("href");

        // Ignore href="#"
        if (!href || href === "#") {
            return;
        }

        const target = document.querySelector(href);

        if (target) {
            e.preventDefault();
            target.scrollIntoView({
                behavior: "smooth"
            });
        }
    });
});
// Contact Modal
const openContactModal = document.getElementById("openContactModal");
const contactModal = document.getElementById("contactModal");
const closeContactModal = document.getElementById("closeContactModal");
const contactModalOverlay = document.getElementById("contactModalOverlay");

if (openContactModal && contactModal) {

    function openModal() {
        contactModal.classList.add("active");
        contactModal.setAttribute("aria-hidden", "false");
        document.body.style.overflow = "hidden";
    }

    function closeModal() {
        contactModal.classList.remove("active");
        contactModal.setAttribute("aria-hidden", "true");
        document.body.style.overflow = "";
    }

    openContactModal.addEventListener("click", function(e) {
        e.preventDefault();
        openModal();
    });

    if (closeContactModal) {
        closeContactModal.addEventListener("click", closeModal);
    }

    if (contactModalOverlay) {
        contactModalOverlay.addEventListener("click", closeModal);
    }

    document.addEventListener("keydown", function(e) {
        if (
            e.key === "Escape" &&
            contactModal.classList.contains("active")
        ) {
            closeModal();
        }
    });
}  
 // Web3Forms Contact Form
const contactForm = document.getElementById("contactForm");
const contactFormStatus = document.getElementById("contactFormStatus");

// Message Word Counter & Validation
const messageInput = document.getElementById("contactMessage");
const messageCounter = document.getElementById("messageCounter");
const messageError = document.getElementById("messageError");

function getWordCount(text) {
    const trimmedText = text.trim();

    if (!trimmedText) {
        return 0;
    }

    return trimmedText.split(/\s+/).length;
}

if (messageInput && messageCounter) {

    messageInput.addEventListener("input", function() {

        const wordCount = getWordCount(messageInput.value);

        messageCounter.textContent = `${wordCount} / 200 words`;

        if (wordCount > 200) {
            messageCounter.style.color = "#b42318";
        } else {
            messageCounter.style.color = "";
        }

        if (messageError) {
            messageError.textContent = "";
        }
    });
}                                                 

if (contactForm && contactFormStatus) {
    contactForm.addEventListener("submit", async function(e) {
        e.preventDefault();
        
        const phoneInput = document.getElementById("contactPhone");
        const emailInput = document.getElementById("contactEmail");
        const nameInput = document.getElementById("contactName");
        
        const phoneError = document.getElementById("phoneError");
        const emailError = document.getElementById("emailError");
        const nameError = document.getElementById("nameError");
        
        let isValid = true;
        
        // Clear previous errors
        if (nameError) nameError.textContent = "";
        if (emailError) emailError.textContent = "";
        if (phoneError) phoneError.textContent = "";
        if (messageError) messageError.textContent = "";
        
        // Name validation
        if (!nameInput.value.trim()) {
            nameError.textContent = "Please enter your name.";
            isValid = false;
        }
        
        // Email validation
        const email = emailInput.value.trim();
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        
        if (!email) {
            emailError.textContent = "Please enter your email address.";
            isValid = false;
        } else if (!emailPattern.test(email)) {
            emailError.textContent = "Please enter a valid email address.";
            isValid = false;
        }
        
        // Phone validation
        const phoneNumber = phoneInput.value.trim();
        
        if (!phoneNumber) {
            phoneError.textContent = "Please enter your phone number.";
            isValid = false;
        } else if (!/^\d{10}$/.test(phoneNumber)) {
            phoneError.textContent =
                "Please enter a valid 10-digit phone number.";
            isValid = false;
        }
        
        // Message validation
        const wordCount = getWordCount(messageInput.value);
        
        if (wordCount < 100) {
            messageError.textContent =
                "Please write at least 100 words in your message.";
            isValid = false;
        } else if (wordCount > 200) {
            messageError.textContent =
                "Please keep your message within 200 words.";
            isValid = false;
        }
        
        // Stop submission if any field is invalid
        if (!isValid) {
            return;
        }

        const wordCount = getWordCount(messageInput.value);

        if (wordCount < 100) {
            messageError.textContent =
                "Please write at least 100 words in your message.";
        
            messageInput.focus();
            return;
        }
        
        if (wordCount > 200) {
            messageError.textContent =
                "Please keep your message within 200 words.";
        
            messageInput.focus();
            return;
        }

        const submitBtn = contactForm.querySelector(".contact-submit");
        const originalHTML = submitBtn.innerHTML;

        submitBtn.disabled = true;
        submitBtn.innerHTML =
            'Sending... <i class="fa-solid fa-spinner fa-spin"></i>';

        contactFormStatus.className = "contact-form-status";
        contactFormStatus.textContent = "";

        try {
            const response = await fetch(
                "https://api.web3forms.com/submit",
                {
                    method: "POST",
                    body: new FormData(contactForm),
                    headers: {
                        Accept: "application/json"
                    }
                }
            );

            const result = await response.json();
        if (response.ok && result.success) {
                contactForm.reset();
            
                const formElements = contactForm.querySelectorAll(
                    ".contact-form-row, .contact-field, .contact-submit"
                );
            
                formElements.forEach(function(element) {
                    element.style.display = "none";
                });
            
                contactFormStatus.className =
                    "contact-form-status success";
            
                contactFormStatus.textContent =
                    "Thank you! Your message has been sent successfully. I'll get back to you soon.";
            
                contactFormStatus.style.display = "flex";
                contactFormStatus.style.alignItems = "center";
                contactFormStatus.style.justifyContent = "center";
                contactFormStatus.style.minHeight = "140px";
            
                setTimeout(function() {
                    closeModal();            
                }, 4000);
            }
              else {
                    throw new Error(
                        result.message ||
                        "Something went wrong. Please try again."
                    );
                }

        } catch (error) {

            contactFormStatus.className =
                "contact-form-status error";

            contactFormStatus.textContent =
                error.message ||
                "Unable to send your message. Please try again.";

        } finally {

            submitBtn.disabled = false;
            submitBtn.innerHTML = originalHTML;

        }
    });
}                                                 

});                                            
