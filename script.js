// ==================== TOAST NOTIFICATION ====================
function showToast(message, duration = 3000) {
  const toastContainer = document.getElementById("toastContainer");
  if (!toastContainer) return;

  const toast = document.createElement("div");
  toast.className = "toast";
  toast.textContent = message;
  toastContainer.appendChild(toast);

  setTimeout(() => {
    toast.remove();
  }, duration);
}

// ==================== REVEAL ANIMATION ====================
function initReveal() {
  const reveals = document.querySelectorAll(".reveal");
  if (!reveals.length) return;

  function revelarAoScroll() {
    const alturaTela = window.innerHeight;

    reveals.forEach((secao) => {
      const topo = secao.getBoundingClientRect().top;
      if (topo < alturaTela - 120) {
        secao.classList.add("active");
      }
    });
  }

  window.addEventListener("scroll", revelarAoScroll);
  revelarAoScroll();
}

// ==================== MENU ATIVO POR SCROLL ====================
function initMenuActiveOnScroll() {
  const sections = document.querySelectorAll("section");
  const navLinks = document.querySelectorAll(".menu a");

  if (!sections.length || !navLinks.length) return;

  window.addEventListener("scroll", () => {
    let current = "";
    const scrollPosition = window.scrollY + 150;

    sections.forEach((section) => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.clientHeight;

      if (
        scrollPosition >= sectionTop &&
        scrollPosition < sectionTop + sectionHeight
      ) {
        current = section.getAttribute("id");
      }
    });

    navLinks.forEach((link) => {
      link.classList.remove("active");
      const href = link.getAttribute("href").substring(1);

      if (href === current) {
        link.classList.add("active");
      }
    });
  });
}

// ==================== MODAL GALERIA ====================
function initModalGaleria() {
  const fotos = document.querySelectorAll(".foto img");
  const modal = document.getElementById("modalGaleria");
  const modalImg = document.getElementById("modalImg");
  const modalClose = document.getElementById("modalClose");

  if (!fotos.length || !modal || !modalImg || !modalClose) return;

  function closeModal() {
    modal.style.display = "none";
    document.body.style.overflow = "";
  }

  fotos.forEach((foto) => {
    foto.addEventListener("click", () => {
      modal.style.display = "flex";
      modalImg.src = foto.src;
      modalImg.alt = foto.alt;
      document.body.style.overflow = "hidden";
    });
  });

  modalClose.addEventListener("click", closeModal);

  modal.addEventListener("click", (e) => {
    if (e.target === modal) closeModal();
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && modal.style.display === "flex") {
      closeModal();
    }
  });
}

// ==================== FORMULÁRIO WHATSAPP ====================
function initFormularioWhats() {
  const form = document.getElementById("formOrcamento");
  const tipoSelect = document.getElementById("tipo");

  if (!form || !tipoSelect) return;

  const campoSomDias = document.getElementById("campoSomDias");
  const campoEventoDia = document.getElementById("campoEventoDia");
  const campoSpot = document.getElementById("campoSpot");
  const campoDuracao = document.getElementById("campoDuracao");

  const diasSomInput = document.getElementById("diasSom");
  const diaEventoInput = document.getElementById("diaEvento");

  // Flatpickr Som Automotivo
  if (diasSomInput) {
    flatpickr(diasSomInput, {
      mode: "multiple",
      dateFormat: "d/m/Y",
      locale: "pt",
      minDate: "today",
      disable: [(date) => date.getDay() === 0]
    });
  }

  // Flatpickr Evento Local
  if (diaEventoInput) {
    flatpickr(diaEventoInput, {
      mode: "single",
      dateFormat: "d/m/Y",
      locale: "pt",
      minDate: "today",
      disable: [(date) => date.getDay() === 0]
    });
  }

  function atualizarCamposTipo() {
    const tipo = tipoSelect.value;

    if (campoSomDias) campoSomDias.style.display = "none";
    if (campoEventoDia) campoEventoDia.style.display = "none";
    if (campoSpot) campoSpot.style.display = "none";

    if (campoDuracao) campoDuracao.style.display = "flex";

    if (tipo === "Som automotivo (Moto)" && campoSomDias) {
      campoSomDias.style.display = "block";
    }

    if (tipo === "Evento Local" && campoEventoDia) {
      campoEventoDia.style.display = "block";
    }

    if (tipo === "Gravação de Spot") {
      if (campoSpot) campoSpot.style.display = "block";
      if (campoDuracao) campoDuracao.style.display = "none";
    }

    if (tipo !== "Gravação de Spot") {
      const campoTextoSpot = document.getElementById("campoTextoSpot");
      const textoSpot = document.getElementById("textoSpot");
      const textoProntoSpot = document.getElementById("textoProntoSpot");

      if (campoTextoSpot) campoTextoSpot.style.display = "none";
      if (textoSpot) textoSpot.value = "";
      if (textoProntoSpot) textoProntoSpot.value = "";
    }
  }

  tipoSelect.addEventListener("change", atualizarCamposTipo);
  atualizarCamposTipo();

  // Trocar label spot
  const textoProntoSelect = document.getElementById("textoProntoSpot");
  const labelTextoSpot = document.getElementById("labelTextoSpot");
  const textoSpotInput = document.getElementById("textoSpot");

  function atualizarLabelTextoSpot() {
    const campoTextoSpot = document.getElementById("campoTextoSpot");

    if (!textoProntoSelect || !labelTextoSpot || !campoTextoSpot) return;

    if (textoProntoSelect.value === "") {
      campoTextoSpot.style.display = "none";
      if (textoSpotInput) textoSpotInput.value = "";
      return;
    }

    campoTextoSpot.style.display = "flex";

    if (textoProntoSelect.value === "Não, preciso de ajuda para criar o texto") {
      labelTextoSpot.textContent = "Qual mensagem deseja passar? *";

      if (textoSpotInput) {
        textoSpotInput.placeholder =
          "Ex: promoção, nome da loja, endereço, telefone, horário...";
        textoSpotInput.rows = 6;
      }
    } else {
      labelTextoSpot.textContent = "Texto do Spot *";

      if (textoSpotInput) {
        textoSpotInput.placeholder =
          "Digite aqui o texto que será gravado no spot...";
        textoSpotInput.rows = 3;
      }
    }
  }

  if (textoProntoSelect) {
    textoProntoSelect.addEventListener("change", atualizarLabelTextoSpot);
    atualizarLabelTextoSpot();
  }

  // Envio WhatsApp
  let isSubmitting = false;

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    if (isSubmitting) return;
    isSubmitting = true;

    const nome = document.getElementById("nome").value.trim();
    const empresa = document.getElementById("empresa").value.trim();
    const tipo = tipoSelect.value;
    const duracao = document.getElementById("duracao").value.trim();
    const mensagem = document.getElementById("mensagem").value.trim();

    const diasSom = document.getElementById("diasSom")?.value.trim();
    const diaEvento = document.getElementById("diaEvento")?.value.trim();

    const tempoSpot = document.getElementById("tempoSpot")?.value;
    const textoProntoSpot = document.getElementById("textoProntoSpot")?.value;
    const textoSpot = document.getElementById("textoSpot")?.value.trim();

    if (!nome) {
      showToast("❌ Por favor, digite seu nome", 2500);
      isSubmitting = false;
      return;
    }

    if (!tipo) {
      showToast("❌ Por favor, selecione o tipo de divulgação", 2500);
      isSubmitting = false;
      return;
    }

    if (tipo === "Som automotivo (Moto)" && !diasSom) {
      showToast("❌ Por favor, selecione os dias desejados", 2500);
      isSubmitting = false;
      return;
    }

    if (tipo === "Evento Local" && !diaEvento) {
      showToast("❌ Por favor, selecione o dia do evento", 2500);
      isSubmitting = false;
      return;
    }

    if (tipo === "Gravação de Spot" && !tempoSpot) {
      showToast("❌ Por favor, selecione o tempo do spot", 2500);
      isSubmitting = false;
      return;
    }

    if (tipo === "Gravação de Spot" && !textoProntoSpot) {
      showToast("❌ Por favor, selecione se o texto está pronto", 2500);
      isSubmitting = false;
      return;
    }

    if (tipo === "Gravação de Spot" && !textoSpot) {
      showToast("❌ Por favor, preencha o texto do spot", 2500);
      isSubmitting = false;
      return;
    }

    let texto = `Olá! Gostaria de solicitar um orçamento.%0A%0A`;
    texto += `👤 Nome: ${nome}%0A`;

    if (empresa) texto += `🏢 Empresa: ${empresa}%0A`;

    texto += `📢 Tipo de divulgação: ${tipo}%0A`;

    if (tipo === "Som automotivo (Moto)" && diasSom) {
      texto += `📅 Dias escolhidos: ${diasSom}%0A`;
    }

    if (tipo === "Evento Local" && diaEvento) {
      texto += `📅 Dia do evento: ${diaEvento}%0A`;
    }

    if (tipo === "Gravação de Spot") {
      texto += `🎙️ Tempo do Spot: ${tempoSpot}%0A`;
      texto += `📝 Texto pronto?: ${textoProntoSpot}%0A`;
      texto += `%0A📄 Texto do Spot:%0A${textoSpot}%0A`;
    }

    if (tipo !== "Gravação de Spot" && duracao) {
      texto += `⏳ Duração: ${duracao}%0A`;
    }

    if (mensagem) {
      texto += `%0A📝 Mensagem: ${mensagem}%0A`;
    }

    texto += `%0AObrigado!`;

    const numeroWhats = "5519988587512";
    const link = `https://wa.me/${numeroWhats}?text=${texto}`;

    showToast("📱 Redirecionando para o WhatsApp...", 2000);

    setTimeout(() => {
      window.open(link, "_blank");
      form.reset();
      atualizarCamposTipo();
      atualizarLabelTextoSpot();
      isSubmitting = false;
    }, 500);
  });
}

// ==================== VIDEO PLAY BUTTON ====================
function initVideo() {
  const video = document.getElementById("videoJRC");
  const playBtn = document.getElementById("playBtn");

  if (!video || !playBtn) return;

  playBtn.addEventListener("click", () => {
    video.setAttribute("controls", "controls");
    video.play();
    playBtn.style.display = "none";
  });

  video.addEventListener("pause", () => {
    playBtn.style.display = "block";
  });

  video.addEventListener("play", () => {
    playBtn.style.display = "none";
  });
}

// ==================== TEMA ESCURO / CLARO ====================
function initThemeToggle() {
  const themeToggle = document.getElementById("themeToggle");
  const themeIcon = themeToggle ? themeToggle.querySelector("i") : null;

  if (!themeToggle || !themeIcon) return;

  function getInitialTheme() {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) return savedTheme;

    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    return prefersDark ? "dark" : "light";
  }

  function setTheme(theme) {
    if (theme === "dark") {
      document.documentElement.setAttribute("data-theme", "dark");
      themeIcon.className = "fa-solid fa-sun";
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.removeAttribute("data-theme");
      themeIcon.className = "fa-solid fa-moon";
      localStorage.setItem("theme", "light");
    }
  }

  function toggleTheme() {
    const currentTheme = document.documentElement.getAttribute("data-theme");

    if (currentTheme === "dark") {
      setTheme("light");
      showToast("☀️ Tema claro ativado", 1500);
    } else {
      setTheme("dark");
      showToast("🌙 Tema escuro ativado", 1500);
    }
  }

  setTheme(getInitialTheme());
  themeToggle.addEventListener("click", toggleTheme);

  window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", (e) => {
    if (!localStorage.getItem("theme")) {
      setTheme(e.matches ? "dark" : "light");
    }
  });
}

// ==================== HEADER DINÂMICO ====================
function initHeaderScroll() {
  const header = document.querySelector(".header");
  if (!header) return;

  let lastScrollY = window.scrollY;
  let ticking = false;

  function handleHeaderScroll() {
    const currentScrollY = window.scrollY;

    if (currentScrollY > 50) header.classList.add("scrolled");
    else header.classList.remove("scrolled");

    if (currentScrollY > lastScrollY && currentScrollY > 200) {
      header.style.transform = "translateY(-100%)";
    } else {
      header.style.transform = "translateY(0)";
    }

    lastScrollY = currentScrollY;
  }

  window.addEventListener("scroll", () => {
    if (!ticking) {
      requestAnimationFrame(() => {
        handleHeaderScroll();
        ticking = false;
      });
      ticking = true;
    }
  });

  handleHeaderScroll();
}

// ==================== MENU MOBILE PREMIUM ====================
function initMenuMobile() {
  const menuBtn = document.getElementById("menuMobileBtn");
  const menuBox = document.getElementById("menuMobileBox");
  const menuOverlay = document.getElementById("menuOverlay");
  const menuClose = document.getElementById("menuClose");

  if (!menuBtn || !menuBox) return;

  function openMenu() {
    menuBox.classList.add("open");
    if (menuOverlay) menuOverlay.classList.add("active");
    document.body.style.overflow = "hidden";
    menuBtn.innerHTML = '<i class="fa-solid fa-xmark"></i>';
  }

  function closeMenu() {
    menuBox.classList.remove("open");
    if (menuOverlay) menuOverlay.classList.remove("active");
    document.body.style.overflow = "";
    menuBtn.innerHTML = '<i class="fa-solid fa-bars"></i>';
  }

  function toggleMenu() {
    if (menuBox.classList.contains("open")) closeMenu();
    else openMenu();
  }

  menuBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    toggleMenu();
  });

  if (menuClose) menuClose.addEventListener("click", closeMenu);
  if (menuOverlay) menuOverlay.addEventListener("click", closeMenu);

  const mobileLinks = menuBox.querySelectorAll("a");
  mobileLinks.forEach((link) => link.addEventListener("click", closeMenu));

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && menuBox.classList.contains("open")) {
      closeMenu();
    }
  });
}

// ==================== SMOOTH SCROLL ====================
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      const targetId = this.getAttribute("href");
      if (targetId === "#" || targetId === "") return;

      const target = document.querySelector(targetId);
      if (!target) return;

      e.preventDefault();
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  });
}

// ==================== START ====================
document.addEventListener("DOMContentLoaded", () => {
  const hora = new Date().getHours();
  const saudacao = hora < 12 ? "Bom dia!" : hora < 18 ? "Boa tarde!" : "Boa noite!";
  console.log(`${saudacao} Bem-vindo ao site da JRC Divulgação.`);

  initReveal();
  initMenuMobile();
  initMenuActiveOnScroll();
  initModalGaleria();
  initFormularioWhats();
  initVideo();
  initThemeToggle();
  initHeaderScroll();
  initSmoothScroll();
});
