// Initial Setup
gsap.set("#chart_svg_main", { opacity: 1 });
gsap.set("#path-highlight", { drawSVG: "0% 15%" });

// Create Timeline
const tl1 = gsap.timeline({
  scrollTrigger: {
    trigger: "#chart_svg_main",
    start: "top center",
    end: "bottom center",
    scrub: 1,
    onUpdate: (self) => {
      const progress = self.progress;
      const totalSegments = positions.length;
      const index = Math.floor(progress * totalSegments);
      buttons.forEach((button, i) => {
        if (i == index) {
          button.classList.add("active");
        } else {
          button.classList.remove("active");
        }
      });

      gsap.to("#path-highlight", { drawSVG: positions[index], duration: 0.3, ease: "power2.inOut" });
    },
  },
});

// Timeline Animations
tl1
  .from(
    "#path-highlight, #path-complacency-mask",
    {
      opacity: 0,
    },
  )
  .from(
    "#path-full, #path-highlight, #path-complacency-mask",
    {
      attr: {
        d: "M39 307.126c432 0 514-0 966-0",
      },
    },
    "<"
  )
  .fromTo(".chart_btn_wrapper .btn_box.tow .content_card .bar", { height: "50px" }, { height: "var(--max-height)" })
  .fromTo(".chart_btn_wrapper .btn_box.three .content_card .bar", { height: "50px" }, { height: "var(--max-height)" }, "<")
  .fromTo(".chart_btn_wrapper .btn_box.four .content_card .bar", { height: "50px" }, { height: "var(--max-height)" }, "<")
  .fromTo(".chart_btn_wrapper .btn_box.five .content_card .bar", { height: "50px" }, { height: "var(--max-height)" }, "<");

// Button Interactivity
const positions = ["0% 15%", "18% 35%", "39% 55%", "60% 75%", "80% 100%"];
const buttons = document.querySelectorAll(".j_curve_chart_section .chart_btn_wrapper .btn_box");

buttons.forEach((button, index) => {
  button.addEventListener("mouseenter", () => {
    buttons.forEach(elm=>elm.classList.remove("active"));
    button.classList.add("active");
    gsap.to("#path-highlight", { drawSVG: positions[index], duration: 0.3, ease: "power2.inOut", });
  });
});
