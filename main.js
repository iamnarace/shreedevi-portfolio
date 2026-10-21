/**
 * SHREEDEVI GYAWALI — PORTFOLIO & BANKING ADVISORY
 * Interactive JavaScript Engine
 */

document.addEventListener('DOMContentLoaded', () => {

  // 1. Mobile Menu Drawer Navigation
  const mobileToggle = document.getElementById('mobileToggle');
  const drawerClose = document.getElementById('drawerClose');
  const mobileDrawer = document.getElementById('mobileDrawer');

  function openDrawer() {
    if (!mobileDrawer) return;
    mobileDrawer.classList.add('open');
    mobileDrawer.setAttribute('aria-hidden', 'false');
    if (mobileToggle) mobileToggle.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden';
  }

  function closeDrawer() {
    if (!mobileDrawer) return;
    mobileDrawer.classList.remove('open');
    mobileDrawer.setAttribute('aria-hidden', 'true');
    if (mobileToggle) mobileToggle.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  }

  if (mobileToggle) {
    mobileToggle.addEventListener('click', openDrawer);
  }

  if (drawerClose) {
    drawerClose.addEventListener('click', closeDrawer);
  }

  if (mobileDrawer) {
    mobileDrawer.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', closeDrawer);
    });
  }

  // 2. Dynamic Year
  const yearEl = document.getElementById('currentYear');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }

  // 3. Quick Email Copy with Toast Notification
  const copyBtn = document.getElementById('quickCopyEmail');
  const toast = document.getElementById('toastNotification');
  const toastMsg = document.getElementById('toastMessage');

  function showToast(message) {
    if (!toast || !toastMsg) return;
    toastMsg.textContent = message;
    toast.classList.add('show');
    setTimeout(() => {
      toast.classList.remove('show');
    }, 3200);
  }

  if (copyBtn) {
    copyBtn.addEventListener('click', () => {
      const email = copyBtn.getAttribute('data-email') || 'gyawali8864@gmail.com';
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(email).then(() => {
          showToast(`Copied ${email} to clipboard!`);
        }).catch(() => {
          showToast(`Contact: ${email}`);
        });
      } else {
        showToast(`Contact: ${email}`);
      }
    });
  }

  // 4. Standalone KRW ⇄ NPR Calculator
  const calcAmountInput = document.getElementById('calcAmount');
  const displayRecipient = document.getElementById('displayRecipientAmount');
  const displayRate = document.getElementById('displayRate');
  const displayFee = document.getElementById('displayFee');
  const displaySpeed = document.getElementById('displaySpeed');
  const displayCurrencyLabel = document.getElementById('displayCurrencyLabel');
  const presetBtns = document.querySelectorAll('.preset-btn');
  const channelRadios = document.querySelectorAll('input[name="remitMethod"]');
  const channelCards = document.querySelectorAll('.channel-radio-card');
  const tabKRWtoNPR = document.getElementById('tabKRWtoNPR');
  const tabNPRtoKRW = document.getElementById('tabNPRtoKRW');
  const calcFieldLabel = document.querySelector('.calc-field-label');
  const calcSymbol = document.querySelector('.calc-currency-symbol');
  const calcTag = document.querySelector('.calc-currency-tag');

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
      presetBtns.forEach(b => b.classList.remove('active'));
      updateCalculator();
    });
  }

  presetBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      presetBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const amt = btn.getAttribute('data-amount');
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
      const parent = e.target.closest('.channel-radio-card');
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
      if (calcTag) calcTag.textContent = 'KRW';
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
      if (calcTag) calcTag.textContent = 'NPR';
      if (calcAmountInput) calcAmountInput.value = '100000';

      updateCalculator();
    });
  }

  // 5. Booking Topic Selection & Cross-linking
  const topicCards = document.querySelectorAll('.topic-radio-card');
  const serviceActionLinks = document.querySelectorAll('[data-topic]');

  topicCards.forEach(card => {
    card.addEventListener('click', () => {
      topicCards.forEach(c => c.classList.remove('selected'));
      card.classList.add('selected');
      const radio = card.querySelector('input[type="radio"]');
      if (radio) radio.checked = true;
    });
  });

  serviceActionLinks.forEach(link => {
    link.addEventListener('click', () => {
      const targetTopic = link.getAttribute('data-topic');
      if (!targetTopic) return;

      topicCards.forEach(card => {
        const radio = card.querySelector('input[type="radio"]');
        if (radio && radio.value === targetTopic) {
          topicCards.forEach(c => c.classList.remove('selected'));
          card.classList.add('selected');
          radio.checked = true;
        }
      });
    });
  });

  // 6. Consultation Booking Form Handling (Mailto Concierge)
  const form = document.getElementById('consultationForm');
  const successBox = document.getElementById('bookingSuccessMessage');
  const successSummary = document.getElementById('successSummaryText');
  const directMailLink = document.getElementById('directMailLink');
  const resetBtn = document.getElementById('resetBookingBtn');

  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();

      const selectedService = form.querySelector('input[name="selectedService"]:checked')?.value || 'General Banking Advisory';
      const meetingChannel = document.getElementById('meetingFormat')?.value || 'Google Meet / Zoom';
      const preferredDate = document.getElementById('preferredDate')?.value || 'Flexible';
      const name = document.getElementById('clientName')?.value || 'Client';
      const email = document.getElementById('clientEmail')?.value || '';
      const phone = document.getElementById('clientPhone')?.value || 'Not provided';
      const language = document.getElementById('clientLang')?.value || 'English';
      const notes = document.getElementById('clientNotes')?.value || 'No additional notes provided.';

      const subject = encodeURIComponent(`Consultation Request: ${selectedService} – ${name}`);
      const body = encodeURIComponent(
        `Dear Shreedevi Gyawali,\n\n` +
        `I would like to schedule a consultation regarding ${selectedService}.\n\n` +
        `=== Consultation Details ===\n` +
        `• Full Name: ${name}\n` +
        `• Email Address: ${email}\n` +
        `• Phone / KakaoTalk: ${phone}\n` +
        `• Preferred Channel: ${meetingChannel}\n` +
        `• Preferred Date: ${preferredDate}\n` +
        `• Preferred Language: ${language}\n\n` +
        `=== Inquiry Notes ===\n` +
        `${notes}\n\n` +
        `Best regards,\n${name}`
      );

      const mailtoUrl = `mailto:gyawali8864@gmail.com?subject=${subject}&body=${body}`;

      if (successSummary) {
        successSummary.textContent = `Thank you, ${name}! Your consultation inquiry for "${selectedService}" via ${meetingChannel} has been drafted. Please confirm and send the email to complete your booking.`;
      }
      if (directMailLink) {
        directMailLink.href = mailtoUrl;
      }

      form.style.display = 'none';
      if (successBox) {
        successBox.style.display = 'block';
        successBox.scrollIntoView({ behavior: 'smooth' });
      }

      // Automatically trigger email client
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

  // 7. Initialize Calculator
  updateCalculator();

});
