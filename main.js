/**
 * NAMUNA GYAWALI (SHREEDEVI GYAWALI)
 * Interactive JavaScript Engine
 */

document.addEventListener('DOMContentLoaded', () => {

  // 1. Mobile Drawer Navigation
  const mobileToggle = document.getElementById('mobileToggle');
  const drawerClose = document.getElementById('drawerClose');
  const mobileDrawer = document.getElementById('mobileDrawer');

  function openDrawer() {
    if (!mobileDrawer) return;
    mobileDrawer.classList.add('open');
    mobileDrawer.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }

  function closeDrawer() {
    if (!mobileDrawer) return;
    mobileDrawer.classList.remove('open');
    mobileDrawer.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  if (mobileToggle) mobileToggle.addEventListener('click', openDrawer);
  if (drawerClose) drawerClose.addEventListener('click', closeDrawer);

  if (mobileDrawer) {
    mobileDrawer.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', closeDrawer);
    });
  }

  // 2. Dynamic Copyright Year
  const yearEl = document.getElementById('currentYear');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }

  // 3. Standalone KRW ⇄ NPR Currency Engine
  const calcAmountInput = document.getElementById('calcAmount');
  const displayRecipient = document.getElementById('displayRecipientAmount');
  const displayRate = document.getElementById('displayRate');
  const displayFee = document.getElementById('displayFee');
  const displaySpeed = document.getElementById('displaySpeed');
  const displayCurrencyLabel = document.getElementById('displayCurrencyLabel');
  const presetChips = document.querySelectorAll('.preset-chip');
  const channelRadios = document.querySelectorAll('input[name="remitMethod"]');
  const channelCards = document.querySelectorAll('.channel-card');
  const tabKRWtoNPR = document.getElementById('tabKRWtoNPR');
  const tabNPRtoKRW = document.getElementById('tabNPRtoKRW');
  const calcFieldLabel = document.getElementById('calcFieldLabel');
  const calcSymbol = document.getElementById('calcSymbol');
  const calcUnit = document.getElementById('calcUnit');

  // Benchmark exchange rates
  const KRW_TO_NPR_BENCHMARK = 0.10145; // 1 KRW ≈ 0.10145 NPR
  const NPR_TO_KRW_BENCHMARK = 9.857;   // 1 NPR ≈ 9.857 KRW

  let currentDirection = 'KRW_TO_NPR';
  let currentMethod = 'api';

  function updateCalculator() {
    if (!calcAmountInput || !displayRecipient) return;

    const rawVal = parseFloat(calcAmountInput.value) || 0;

    let feeText = '₩5,000 (Hana Easy-One Rate)';
    let speedText = 'Instant to ~2 Hours';
    let effectiveRate = KRW_TO_NPR_BENCHMARK;

    if (currentMethod === 'api') {
      feeText = '₩5,000 (Hana Easy-One Rate)';
      speedText = 'Instant to ~2 Hours';
      effectiveRate = KRW_TO_NPR_BENCHMARK;
    } else if (currentMethod === 'swift') {
      feeText = '₩15,000 + Correspondent Wire Fee';
      speedText = '1–2 Business Days';
      effectiveRate = KRW_TO_NPR_BENCHMARK * 0.998;
    } else if (currentMethod === 'app') {
      feeText = '₩4,000 (~$3.00)';
      speedText = 'Within 30–60 Minutes';
      effectiveRate = KRW_TO_NPR_BENCHMARK * 0.995;
    }

    if (currentDirection === 'KRW_TO_NPR') {
      const calculatedNPR = Math.round(rawVal * effectiveRate);
      displayRecipient.textContent = 'Rs. ' + calculatedNPR.toLocaleString('en-US');
      if (displayCurrencyLabel) displayCurrencyLabel.textContent = 'NPR (Nepali Rupees)';
      if (displayRate) displayRate.textContent = `1 KRW ≈ ${effectiveRate.toFixed(5)} NPR`;
    } else {
      const calculatedKRW = Math.round(rawVal * NPR_TO_KRW_BENCHMARK);
      displayRecipient.textContent = '₩ ' + calculatedKRW.toLocaleString('en-US');
      if (displayCurrencyLabel) displayCurrencyLabel.textContent = 'KRW (Korean Won)';
      if (displayRate) displayRate.textContent = `1 NPR ≈ ${NPR_TO_KRW_BENCHMARK.toFixed(3)} KRW`;
    }

    if (displayFee) displayFee.textContent = feeText;
    if (displaySpeed) displaySpeed.textContent = speedText;
  }

  if (calcAmountInput) {
    calcAmountInput.addEventListener('input', () => {
      presetChips.forEach(c => c.classList.remove('active'));
      updateCalculator();
    });
  }

  presetChips.forEach(chip => {
    chip.addEventListener('click', () => {
      presetChips.forEach(c => c.classList.remove('active'));
      chip.classList.add('active');
      const amt = chip.getAttribute('data-amount');
      if (amt && calcAmountInput) {
        calcAmountInput.value = amt;
        updateCalculator();
      }
    });
  });

  channelRadios.forEach(radio => {
    radio.addEventListener('change', (e) => {
      currentMethod = e.target.value;
      channelCards.forEach(c => c.classList.remove('selected'));
      const parent = e.target.closest('.channel-card');
      if (parent) parent.classList.add('selected');
      updateCalculator();
    });
  });

  if (tabKRWtoNPR && tabNPRtoKRW) {
    tabKRWtoNPR.addEventListener('click', () => {
      tabKRWtoNPR.classList.add('active');
      tabNPRtoKRW.classList.remove('active');
      tabKRWtoNPR.setAttribute('aria-selected', 'true');
      tabNPRtoKRW.setAttribute('aria-selected', 'false');
      currentDirection = 'KRW_TO_NPR';

      if (calcFieldLabel) calcFieldLabel.textContent = 'You Send (Korean Won - KRW)';
      if (calcSymbol) calcSymbol.textContent = '₩';
      if (calcUnit) calcUnit.textContent = 'KRW';
      if (calcAmountInput) calcAmountInput.value = '1000000';

      updateCalculator();
    });

    tabNPRtoKRW.addEventListener('click', () => {
      tabNPRtoKRW.classList.add('active');
      tabKRWtoNPR.classList.remove('active');
      tabNPRtoKRW.setAttribute('aria-selected', 'true');
      tabKRWtoNPR.setAttribute('aria-selected', 'false');
      currentDirection = 'NPR_TO_KRW';

      if (calcFieldLabel) calcFieldLabel.textContent = 'Reference Amount (Nepali Rupee - NPR)';
      if (calcSymbol) calcSymbol.textContent = 'Rs.';
      if (calcUnit) calcUnit.textContent = 'NPR';
      if (calcAmountInput) calcAmountInput.value = '100000';

      updateCalculator();
    });
  }

  // 4. Blog Category Filter Pills
  const catPills = document.querySelectorAll('.cat-pill');
  catPills.forEach(pill => {
    pill.addEventListener('click', () => {
      catPills.forEach(p => p.classList.remove('active'));
      pill.classList.add('active');
    });
  });

  // 5. Contact Form Handler (Mailto Concierge)
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const name = document.getElementById('name')?.value || 'Friend';
      const email = document.getElementById('email')?.value || '';
      const topic = document.getElementById('topic')?.value || 'General Inquiry';
      const message = document.getElementById('message')?.value || '';

      const subject = encodeURIComponent(`Message from ${name} [${topic}]`);
      const body = encodeURIComponent(
        `Hello Namuna,\n\n` +
        `I am writing to connect with you regarding: ${topic}.\n\n` +
        `• Name: ${name}\n` +
        `• Email: ${email}\n\n` +
        `--- Message ---\n` +
        `${message}\n\n` +
        `Best regards,\n${name}`
      );

      const mailtoUrl = `mailto:gyawali8864@gmail.com?subject=${subject}&body=${body}`;
      window.location.href = mailtoUrl;

      alert(`Thank you, ${name}! Your email client has been prepared with your message directed to Namuna Gyawali.`);
      contactForm.reset();
    });
  }

  // 6. Initialize Calculator
  updateCalculator();
});
