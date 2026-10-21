document.addEventListener('DOMContentLoaded', () => {
  // 1. Mobile Menu Toggle
  const mobileToggle = document.getElementById('mobileToggle');
  const mobileDrawer = document.getElementById('mobileDrawer');
  
  if (mobileToggle && mobileDrawer) {
    mobileToggle.addEventListener('click', () => {
      mobileDrawer.classList.toggle('open');
    });

    // Close mobile drawer when clicking a link
    mobileDrawer.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        mobileDrawer.classList.remove('open');
      });
    });
  }

  // 2. Dynamic Year
  const yearEl = document.getElementById('currentYear');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }

  // 3. Quick Email Copy to Clipboard with Toast
  const copyBtn = document.getElementById('quickCopyEmail');
  const toast = document.getElementById('toastNotification');
  const toastMsg = document.getElementById('toastMessage');

  function showToast(message) {
    if (!toast) return;
    toastMsg.textContent = message;
    toast.classList.add('show');
    setTimeout(() => {
      toast.classList.remove('show');
    }, 3000);
  }

  if (copyBtn) {
    copyBtn.addEventListener('click', () => {
      const email = copyBtn.getAttribute('data-email') || 'gyawali8864@gmail.com';
      navigator.clipboard.writeText(email).then(() => {
        showToast(`Copied ${email} to clipboard!`);
      }).catch(() => {
        showToast(`Contact: ${email}`);
      });
    });
  }

  // 4. Interactive KRW ⇄ NPR Currency Calculator
  const calcAmountInput = document.getElementById('calcAmount');
  const displayRecipient = document.getElementById('displayRecipientAmount');
  const displayRate = document.getElementById('displayRate');
  const displayFee = document.getElementById('displayFee');
  const displaySpeed = document.getElementById('displaySpeed');
  const heroQuickRate = document.getElementById('heroQuickRate');
  const presetChips = document.querySelectorAll('.preset-pill, .preset-chip');
  const channelRadios = document.querySelectorAll('input[name="remitMethod"]');
  const channelCards = document.querySelectorAll('.channel-radio-card, .channel-option');
  const tabKRWtoNPR = document.getElementById('tabKRWtoNPR');
  const tabNPRtoKRW = document.getElementById('tabNPRtoKRW');

  // Benchmark exchange rates
  // 1 KRW ≈ 0.10145 NPR; 1 NPR ≈ 9.857 KRW
  const KRW_TO_NPR_RATE = 0.10145;
  const NPR_TO_KRW_RATE = 9.857;

  let currentDirection = 'KRW_TO_NPR'; // or 'NPR_TO_KRW'
  let currentMethod = 'api'; // 'api', 'swift', 'app'

  function updateCalculator() {
    if (!calcAmountInput || !displayRecipient) return;

    const rawVal = parseFloat(calcAmountInput.value) || 0;

    let feeText = '₩5,000 (~$3.70)';
    let speedText = 'Instant to ~2 Hours';
    let effectiveRate = KRW_TO_NPR_RATE;

    if (currentMethod === 'api') {
      feeText = '₩5,000 (Hana Easy-One Rate)';
      speedText = 'Instant to ~2 Hours';
      effectiveRate = KRW_TO_NPR_RATE;
    } else if (currentMethod === 'swift') {
      feeText = '₩15,000 + Correspondent Wire Fee';
      speedText = '1–2 Business Days';
      effectiveRate = KRW_TO_NPR_RATE * 0.998;
    } else if (currentMethod === 'app') {
      feeText = '₩4,000 (~$3.00)';
      speedText = 'Within 30–60 Minutes';
      effectiveRate = KRW_TO_NPR_RATE * 0.995;
    }

    if (currentDirection === 'KRW_TO_NPR') {
      const calculatedNPR = Math.round(rawVal * effectiveRate);
      displayRecipient.textContent = 'Rs. ' + calculatedNPR.toLocaleString('en-US');
      if (displayRate) displayRate.textContent = `1 KRW = ${effectiveRate.toFixed(5)} NPR`;
      if (heroQuickRate) {
        heroQuickRate.textContent = `~ ${(effectiveRate * 1000).toFixed(2)} NPR`;
      }
    } else {
      const calculatedKRW = Math.round(rawVal * NPR_TO_KRW_RATE);
      displayRecipient.textContent = '₩ ' + calculatedKRW.toLocaleString('en-US');
      if (displayRate) displayRate.textContent = `1 NPR = ${NPR_TO_KRW_RATE.toFixed(3)} KRW`;
    }

    if (displayFee) displayFee.textContent = feeText;
    if (displaySpeed) displaySpeed.textContent = speedText;
  }

  // Handle amount input change
  if (calcAmountInput) {
    calcAmountInput.addEventListener('input', () => {
      presetChips.forEach(c => c.classList.remove('active'));
      updateCalculator();
    });
  }

  // Preset chips click
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

  // Method radios
  channelRadios.forEach(radio => {
    radio.addEventListener('change', (e) => {
      currentMethod = e.target.value;
      channelCards.forEach(card => card.classList.remove('selected'));
      const parentCard = e.target.closest('.channel-radio-card, .channel-option');
      if (parentCard) parentCard.classList.add('selected');
      updateCalculator();
    });
  });

  // Tab direction switchers
  if (tabKRWtoNPR && tabNPRtoKRW) {
    const inputLabel = document.querySelector('.calc-input-label, .input-label');
    const currSymbol = document.querySelector('.calc-curr-symbol, .currency-symbol');
    const currCode = document.querySelector('.calc-curr-code, .currency-code');
    const bigCurr = document.querySelector('.amount-currency, .big-currency');

    tabKRWtoNPR.addEventListener('click', () => {
      tabKRWtoNPR.classList.add('active');
      tabNPRtoKRW.classList.remove('active');
      currentDirection = 'KRW_TO_NPR';
      if (inputLabel) inputLabel.textContent = 'You Send (Korean Won - KRW)';
      if (currSymbol) currSymbol.textContent = '₩';
      if (currCode) currCode.textContent = 'KRW';
      if (bigCurr) bigCurr.textContent = 'NPR (Nepali Rupees)';
      calcAmountInput.value = '1000000';
      updateCalculator();
    });

    tabNPRtoKRW.addEventListener('click', () => {
      tabNPRtoKRW.classList.add('active');
      tabKRWtoNPR.classList.remove('active');
      currentDirection = 'NPR_TO_KRW';
      if (inputLabel) inputLabel.textContent = 'Reference Amount (Nepali Rupee - NPR)';
      if (currSymbol) currSymbol.textContent = 'Rs.';
      if (currCode) currCode.textContent = 'NPR';
      if (bigCurr) bigCurr.textContent = 'KRW (Korean Won)';
      calcAmountInput.value = '100000';
      updateCalculator();
    });
  }

  // 5. Booking Form Service Selectors & Pre-population
  const serviceCards = document.querySelectorAll('.topic-chip-card, .radio-card');
  const serviceBtns = document.querySelectorAll('.service-card-action, .service-btn');

  serviceCards.forEach(card => {
    card.addEventListener('click', () => {
      serviceCards.forEach(c => c.classList.remove('selected'));
      card.classList.add('selected');
      const radio = card.querySelector('input[type="radio"]');
      if (radio) radio.checked = true;
    });
  });

  serviceBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      const serviceName = btn.getAttribute('data-service') || '';
      const matchingRadio = Array.from(serviceCards).find(card => {
        const title = card.querySelector('.topic-name, .radio-title')?.textContent || '';
        return serviceName.toLowerCase().includes(title.toLowerCase()) || title.toLowerCase().includes(serviceName.toLowerCase());
      });

      if (matchingRadio) {
        serviceCards.forEach(c => c.classList.remove('selected'));
        matchingRadio.classList.add('selected');
        const radio = matchingRadio.querySelector('input[type="radio"]');
        if (radio) radio.checked = true;
      }
    });
  });

  // 6. Consultation Form Handling
  const form = document.getElementById('consultationForm');
  const successBox = document.getElementById('bookingSuccessMessage');
  const successSummary = document.getElementById('successSummaryText');
  const directMailLink = document.getElementById('directMailLink');
  const resetBtn = document.getElementById('resetBookingBtn');

  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();

      const selectedService = form.querySelector('input[name="selectedService"]:checked')?.value || 'General Banking Advisory';
      const format = document.getElementById('meetingFormat')?.value || 'Google Meet / Zoom';
      const preferredDate = document.getElementById('preferredDate')?.value || 'Earliest available';
      const name = document.getElementById('clientName')?.value || 'Client';
      const email = document.getElementById('clientEmail')?.value || '';
      const phone = document.getElementById('clientPhone')?.value || 'N/A';
      const language = document.getElementById('clientLang')?.value || 'English';
      const notes = document.getElementById('clientNotes')?.value || 'No additional notes provided.';

      const subject = encodeURIComponent(`Consultation Booking Request: ${selectedService} - ${name}`);
      const body = encodeURIComponent(
        `Dear Shreedevi Gyawali,\n\n` +
        `I would like to schedule a consultation regarding ${selectedService}.\n\n` +
        `--- Consultation Details ---\n` +
        `• Full Name: ${name}\n` +
        `• Email: ${email}\n` +
        `• Phone/Kakao: ${phone}\n` +
        `• Preferred Format: ${format}\n` +
        `• Preferred Date: ${preferredDate}\n` +
        `• Language: ${language}\n\n` +
        `--- Questions / Notes ---\n` +
        `${notes}\n\n` +
        `Best regards,\n${name}`
      );

      const mailtoUrl = `mailto:gyawali8864@gmail.com?subject=${subject}&body=${body}`;

      if (successSummary) {
        successSummary.textContent = `Thank you, ${name}! Your consultation request for "${selectedService}" (${format}) has been prepared.`;
      }
      if (directMailLink) {
        directMailLink.href = mailtoUrl;
      }

      form.style.display = 'none';
      if (successBox) {
        successBox.style.display = 'block';
        successBox.scrollIntoView({ behavior: 'smooth' });
      }

      window.location.href = mailtoUrl;
    });
  }

  if (resetBtn && form && successBox) {
    resetBtn.addEventListener('click', () => {
      form.reset();
      form.style.display = 'block';
      successBox.style.display = 'none';
      form.scrollIntoView({ behavior: 'smooth' });
    });
  }

  // 7. About Persona Tabs Switcher (Institutional vs Personal)
  const tabInstitutional = document.getElementById('tabInstitutional');
  const tabPersonal = document.getElementById('tabPersonal');
  const contentInstitutional = document.getElementById('contentInstitutional');
  const contentPersonal = document.getElementById('contentPersonal');

  if (tabInstitutional && tabPersonal && contentInstitutional && contentPersonal) {
    tabInstitutional.addEventListener('click', () => {
      tabInstitutional.classList.add('active');
      tabPersonal.classList.remove('active');
      contentInstitutional.style.display = 'block';
      contentPersonal.style.display = 'none';
    });

    tabPersonal.addEventListener('click', () => {
      tabPersonal.classList.add('active');
      tabInstitutional.classList.remove('active');
      contentPersonal.style.display = 'block';
      contentInstitutional.style.display = 'none';
    });
  }

  // Initialize Calculator on load
  updateCalculator();
});
