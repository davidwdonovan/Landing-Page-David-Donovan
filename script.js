(function(){
  const y = document.getElementById("year");
  if (y) y.textContent = new Date().getFullYear();

  const prefersReduced = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (prefersReduced){
    // stop CSS orb animations for reduced motion users
    document.documentElement.classList.add("reduced-motion");
    const orbs = document.querySelectorAll(".orb");
    orbs.forEach(o => o.style.display = "none");
    return;
  }

  // Reveal animation
  const els = document.querySelectorAll(".card, .callout, .timeline-item, .module");
  const io = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting){
        e.target.classList.add("reveal");
        io.unobserve(e.target);
      }
    });
  }, { threshold: 0.08 });

  els.forEach(el => {
    el.classList.add("pre-reveal");
    io.observe(el);
  });
})();