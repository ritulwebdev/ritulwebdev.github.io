document.addEventListener("DOMContentLoaded",()=>{const header=document.getElementById("siteHeader"),toggle=document.getElementById("menuToggle"),nav=document.getElementById("mainNav"),top=document.getElementById("backTop"),links=document.querySelectorAll(".nav-link"),sections=document.querySelectorAll("main section[id]");function scroll(){header.classList.toggle("scrolled",scrollY>20);top.classList.toggle("visible",scrollY>600);let cur="home";sections.forEach(s=>{if(scrollY>=s.offsetTop-130)cur=s.id});links.forEach(a=>a.classList.toggle("active",a.getAttribute("href")==="#"+cur))}addEventListener("scroll",scroll,{passive:true});scroll();toggle.addEventListener("click",()=>{let open=nav.classList.toggle("open");toggle.setAttribute("aria-expanded",open)});links.forEach(a=>a.addEventListener("click",()=>{nav.classList.remove("open");toggle.setAttribute("aria-expanded","false")}));const obs=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add("visible");obs.unobserve(e.target)}}),{threshold:.12});document.querySelectorAll(".reveal").forEach(e=>obs.observe(e));const counters=document.querySelectorAll("[data-count]");const co=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){let el=e.target,end=+el.dataset.count,start=performance.now();function tick(t){let p=Math.min((t-start)/900,1);el.textContent=Math.floor(end*(1-Math.pow(1-p,3)));if(p<1)requestAnimationFrame(tick)}requestAnimationFrame(tick);co.unobserve(el)}}),{threshold:.6});counters.forEach(e=>co.observe(e));const track=document.getElementById("clientTrack"),slides=track.querySelectorAll(".client-slide"),prev=document.getElementById("clientPrev"),next=document.getElementById("clientNext"),counter=document.getElementById("clientCounter"),dots=document.getElementById("clientDots");let i=0,timer;slides.forEach((_,n)=>{let d=document.createElement("button");d.className="client-dot"+(n===0?" active":"");d.type="button";d.addEventListener("click",()=>{go(n);restart()});dots.appendChild(d)});function go(n){i=(n+slides.length)%slides.length;track.style.transform=`translateX(-${i*100}%)`;counter.textContent=`${String(i+1).padStart(2,"0")} / ${String(slides.length).padStart(2,"0")}`;dots.querySelectorAll(".client-dot").forEach((d,x)=>d.classList.toggle("active",x===i))}function restart(){clearInterval(timer);timer=setInterval(()=>go(i+1),6000)}prev.addEventListener("click",()=>{go(i-1);restart()});next.addEventListener("click",()=>{go(i+1);restart()});restart();document.querySelector(".client-slider").addEventListener("mouseenter",()=>clearInterval(timer));document.querySelector(".client-slider").addEventListener("mouseleave",restart);top.addEventListener("click",()=>scrollTo({top:0,behavior:"smooth"}));
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
document.querySelectorAll('a[href^="#"]').forEach(a=>a.addEventListener("click",e=>{let t=document.querySelector(a.getAttribute("href"));if(t){e.preventDefault();t.scrollIntoView({behavior:"smooth"})}}))});
