document.addEventListener("DOMContentLoaded", () => {

  // ==================== SAUDAÇÃO ====================
  const hora = new Date().getHours();
  let saudacao = "";

  if (hora < 12) saudacao = "Bom dia!";
  else if (hora < 18) saudacao = "Boa tarde!";
  else saudacao = "Boa noite!";

  console.log(`${saudacao} Bem-vindo ao site da JRC Divulgação.`);

  // ==================== REVEAL ANIMATION ====================
  const reveals = document.querySelectorAll(".reveal");

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

  // ==================== MENU MOBILE ====================
  const menuBtn = document.getElementById("menuMobileBtn");
  const menuBox = document.getElementById("menuMobileBox");

  function toggleMenu(show) {
    menuBox.style.display = show ? "flex" : "none";
  }

  menuBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    toggleMenu(menuBox.style.display !== "flex");
  });

  // Fechar menu ao clicar fora
  document.addEventListener("click", (e) => {
    if (menuBox.style.display === "flex" &&
      !menuBox.contains(e.target) &&
      !menuBtn.contains(e.target)) {
      toggleMenu(false);
    }
  });

  // Fechar menu ao clicar em um link
  const linksMobile = menuBox.querySelectorAll("a");
  linksMobile.forEach((link) => {
    link.addEventListener("click", () => {
      toggleMenu(false);
    });
  });

  // ==================== MENU ATIVO POR SCROLL ====================
  const sections = document.querySelectorAll("section");
  const navLinks = document.querySelectorAll(".menu a");

  window.addEventListener("scroll", () => {
    let current = "";
    const scrollPosition = window.scrollY + 150;

    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.clientHeight;
      if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
        current = section.getAttribute("id");
      }
    });

    navLinks.forEach(link => {
      link.classList.remove("active");
      const href = link.getAttribute("href").substring(1);
      if (href === current) {
        link.classList.add("active");
      }
    });
  });

  // ==================== MODAL GALERIA (ZOOM) ====================
  const fotos = document.querySelectorAll(".foto img");
  const modal = document.getElementById("modalGaleria");
  const modalImg = document.getElementById("modalImg");
  const modalClose = document.getElementById("modalClose");

  fotos.forEach((foto) => {
    foto.addEventListener("click", () => {
      modal.style.display = "flex";
      modalImg.src = foto.src;
      modalImg.alt = foto.alt;
      document.body.style.overflow = "hidden";
    });
  });

  function closeModal() {
    modal.style.display = "none";
    document.body.style.overflow = "";
  }

  modalClose.addEventListener("click", closeModal);

  modal.addEventListener("click", (e) => {
    if (e.target === modal) {
      closeModal();
    }
  });

  // Fechar modal com ESC
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && modal.style.display === "flex") {
      closeModal();
    }
  });

  // ==================== TOAST NOTIFICATION ====================
  function showToast(message, duration = 3000) {
    const toastContainer = document.getElementById("toastContainer");
    const toast = document.createElement("div");
    toast.className = "toast";
    toast.textContent = message;
    toastContainer.appendChild(toast);

    setTimeout(() => {
      toast.remove();
    }, duration);
  }

  // ==================== CAMPOS DINÂMICOS + CALENDÁRIO ====================
  const tipoSelect = document.getElementById("tipo");

  const campoSomDias = document.getElementById("campoSomDias");
  const campoEventoDia = document.getElementById("campoEventoDia");
  const campoSpot = document.getElementById("campoSpot");
  const campoDuracao = document.getElementById("campoDuracao");

  const diasSomInput = document.getElementById("diasSom");
  const diaEventoInput = document.getElementById("diaEvento");

  // Calendário Som Automotivo (multi datas)
  if (diasSomInput) {
    flatpickr(diasSomInput, {
      mode: "multiple",
      dateFormat: "d/m/Y",
      locale: "pt",
      minDate: "today",
      disable: [
        function(date) {
          return date.getDay() === 0; // bloqueia domingo
        }
      ]
    });
  }

  // Calendário Evento Local (uma data)
  if (diaEventoInput) {
    flatpickr(diaEventoInput, {
      mode: "single",
      dateFormat: "d/m/Y",
      locale: "pt",
      minDate: "today",
      disable: [
        function(date) {
          return date.getDay() === 0; // bloqueia domingo
        }
      ]
    });
  }

  function atualizarCamposTipo() {
    const tipo = tipoSelect.value;

    if (campoSomDias) campoSomDias.style.display = "none";
    if (campoEventoDia) campoEventoDia.style.display = "none";
    if (campoSpot) campoSpot.style.display = "none";

    // duração aparece por padrão
    if (campoDuracao) campoDuracao.style.display = "flex";

    if (tipo === "Som automotivo (Moto)") {
      if (campoSomDias) campoSomDias.style.display = "block";
    }

    if (tipo === "Evento Local") {
      if (campoEventoDia) campoEventoDia.style.display = "block";
    }

    if (tipo === "Gravação de Spot") {
      if (campoSpot) campoSpot.style.display = "block";

      // esconder duração no spot
      if (campoDuracao) campoDuracao.style.display = "none";
    }

    // se sair do spot, limpar campos do spot
    if (tipo !== "Gravação de Spot") {
      const campoTextoSpot = document.getElementById("campoTextoSpot");
      const textoSpot = document.getElementById("textoSpot");
      const textoProntoSpot = document.getElementById("textoProntoSpot");

      if (campoTextoSpot) campoTextoSpot.style.display = "none";
      if (textoSpot) textoSpot.value = "";
      if (textoProntoSpot) textoProntoSpot.value = "";
    }
  }

  if (tipoSelect) {
    tipoSelect.addEventListener("change", atualizarCamposTipo);
    atualizarCamposTipo();
  }

  // ==================== TROCAR LABEL DO TEXTO DO SPOT ====================
  const textoProntoSelect = document.getElementById("textoProntoSpot");
  const labelTextoSpot = document.getElementById("labelTextoSpot");
  const textoSpotInput = document.getElementById("textoSpot");

  function atualizarLabelTextoSpot() {
    const campoTextoSpot = document.getElementById("campoTextoSpot");

    if (!textoProntoSelect || !labelTextoSpot || !campoTextoSpot) return;

    // Se ainda não escolheu nada, não mostra o campo
    if (textoProntoSelect.value === "") {
      campoTextoSpot.style.display = "none";
      if (textoSpotInput) textoSpotInput.value = "";
      return;
    }

    // Mostrar campo depois da escolha
    campoTextoSpot.style.display = "flex";

    // Se NÃO tem texto pronto
    if (textoProntoSelect.value === "Não, preciso de ajuda para criar o texto") {
      labelTextoSpot.textContent = "Qual mensagem deseja passar? *";

      if (textoSpotInput) {
        textoSpotInput.placeholder = "Ex: promoção, nome da loja, endereço, telefone, horário...";
        textoSpotInput.rows = 6;
      }

    } else {
      // Se SIM tem texto pronto
      labelTextoSpot.textContent = "Texto do Spot *";

      if (textoSpotInput) {
        textoSpotInput.placeholder = "Digite aqui o texto que será gravado no spot...";
        textoSpotInput.rows = 3;
      }
    }
  }

  if (textoProntoSelect) {
    textoProntoSelect.addEventListener("change", atualizarLabelTextoSpot);
    atualizarLabelTextoSpot();
  }

  // ==================== FORMULÁRIO ENVIAR PARA WHATSAPP ====================
  const form = document.getElementById("formOrcamento");
  let isSubmitting = false;

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    if (isSubmitting) return;
    isSubmitting = true;

    const nome = document.getElementById("nome").value.trim();
    const empresa = document.getElementById("empresa").value.trim();
    const tipo = document.getElementById("tipo").value;
    const duracao = document.getElementById("duracao").value.trim();
    const mensagem = document.getElementById("mensagem").value.trim();

    const diasSom = document.getElementById("diasSom")?.value.trim();
    const diaEvento = document.getElementById("diaEvento")?.value.trim();

    const tempoSpot = document.getElementById("tempoSpot")?.value;
    const textoProntoSpot = document.getElementById("textoProntoSpot")?.value;
    const textoSpot = document.getElementById("textoSpot")?.value.trim();

    // Validação
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

    // Mensagem WhatsApp
    let texto = `Olá! Gostaria de solicitar um orçamento.%0A%0A`;
    texto += `👤 Nome: ${nome}%0A`;

    if (empresa !== "") {
      texto += `🏢 Empresa: ${empresa}%0A`;
    }

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

    // duração só se não for spot
    if (tipo !== "Gravação de Spot" && duracao !== "") {
      texto += `⏳ Duração: ${duracao}%0A`;
    }

    if (mensagem !== "") {
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

  // ==================== SMOOTH SCROLL PARA LINKS INTERNOS ====================
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (targetId === "#" || targetId === "") return;

      const target = document.querySelector(targetId);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });

});

const video = document.getElementById("videoJRC");
const playBtn = document.getElementById("playBtn");

if (video && playBtn) {
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
