// ============================================================
// hafta7.js — Bootstrap + JavaScript Laboratuvar Uygulaması
// Etkileşim 1: Tema değiştirme (classList.toggle)
// Etkileşim 2: Form verilerinden başvuru özeti oluşturma
// ============================================================

// ----  TEMA DEĞİŞTİRME ----
const temaButonu = document.getElementById('temaButonu');
let koyuTema = false;

temaButonu.addEventListener("click", () => {
    const mevcutTema = document.body.getAttribute("data-bs-theme");

    if (mevcutTema === "dark") {
        document.body.setAttribute("data-bs-theme", "light");
        temaButonu.textContent = "🌙 Koyu Temaya Geç";
    } else {
        document.body.setAttribute("data-bs-theme", "dark");
        temaButonu.textContent = "☀️ Açık Temaya Geç";
    }
});

// ---- BAŞVURU FORMU  ----
const form = document.getElementById("basvuruForm");
const sonuc = document.getElementById("sonucAlani");
const uyari = document.getElementById("uyariAlani");

form.addEventListener("submit", function (e) {
    e.preventDefault();

    const ad = document.getElementById("adsoyad").value.trim();
    const mail = document.getElementById("eposta").value.trim();
    const bolum = document.getElementById("bolum").value.trim();
    const sinif = document.getElementById("sinif").value;
    const oturum = document.getElementById("oturum").value;
    const katilim = document.getElementById("katilim").value;
    const mesaj = document.getElementById("mesaj").value.trim();
    const onay = document.getElementById("onay").checked;

    if (!ad || !mail || !bolum || !sinif || !onay) {
        uyari.classList.remove("d-none");
        return;
    }

    uyari.classList.add("d-none");

    sonuc.className = "alert alert-success";

    sonuc.innerHTML = `
        <div class="card border-0 shadow-sm">
            <div class="card-body">
                <h5 class="fw-bold mb-3">✅ Başvuru Özeti</h5>

                <div class="row mb-2">
                    <div class="col-5 text-secondary">Ad Soyad</div>
                    <div class="col-7 fw-semibold">${ad}</div>
                </div>

                <div class="row mb-2">
                    <div class="col-5 text-secondary">E-posta</div>
                    <div class="col-7 fw-semibold">${mail}</div>
                </div>

                <div class="row mb-2">
                    <div class="col-5 text-secondary">Bölüm</div>
                    <div class="col-7 fw-semibold">${bolum}</div>
                </div>

                <div class="row mb-2">
                    <div class="col-5 text-secondary">Sınıf</div>
                    <div class="col-7 fw-semibold">${sinif}</div>
                </div>
            </div>
        </div>
    `;
});

    // Uyarıyı gizle
    uyariAlani.classList.add('d-none');

    const oturumAdlari = {
        'bootstrap': 'Bootstrap + JS Projesi',
        'html-css':  'HTML + CSS Temelleri',
        'javascript':'JavaScript Uygulamaları',
        'github':    'GitHub Pages Yayını'
    };
    const katilimAdlari = {
        'yuzyuze': 'Yüz yüze',
        'online':  'Online (canlı)',
        'kayit':   'Kayıttan izleme'
    };
    const sinifAdlari = { '1':'1. Sınıf', '2':'2. Sınıf', '3':'3. Sınıf', '4':'4. Sınıf' };

    const tarih = new Date().toLocaleDateString('tr-TR', { day:'2-digit', month:'long', year:'numeric' });

    // Sonuç alanını güncelle
    sonucAlani.className = 'alert alert-success fade-in';
    sonucAlani.innerHTML = `
        <div class="d-flex justify-content-between align-items-center mb-3">
            <strong>✅ Başvuru Özeti Oluşturuldu</strong>
            <small class="text-muted">${tarih}</small>
        </div>
        <div class="card border-0 bg-white shadow-sm">
            <div class="card-body p-3">
                <div class="d-flex justify-content-between py-2 border-bottom">
                    <span class="text-muted">Ad Soyad</span>
                    <strong>${adSoyad}</strong>
                </div>
                <div class="d-flex justify-content-between py-2 border-bottom">
                    <span class="text-muted">E-posta</span>
                    <strong>${eposta}</strong>
                </div>
                <div class="d-flex justify-content-between py-2 border-bottom">
                    <span class="text-muted">Bölüm / Sınıf</span>
                    <strong>${bolum} — ${sinifAdlari[sinif] || sinif}</strong>
                </div>
                <div class="d-flex justify-content-between py-2 border-bottom">
                    <span class="text-muted">Oturum</span>
                    <strong>${oturumAdlari[oturum] || oturum}</strong>
                </div>
                <div class="d-flex justify-content-between py-2 ${mesaj ? 'border-bottom' : ''}">
                    <span class="text-muted">Katılım Türü</span>
                    <strong>${katilimAdlari[katilimTuru] || katilimTuru}</strong>
                </div>
                ${mesaj ? `<div class="d-flex justify-content-between py-2">
                    <span class="text-muted">Mesaj</span>
                    <span class="text-end" style="max-width:60%;">${mesaj}</span>
                </div>` : ''}
            </div>
        </div>
    `;

    sonucAlani.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
});


// ----  FORMU TEMİZLE ----
formTemizle.addEventListener('click', function () {
    basvuruFormu.reset();
    uyariAlani.classList.add('d-none');
    sonucAlani.className = 'alert alert-info fade-in';
    sonucAlani.innerHTML = '<span class="text-muted" style="font-size:0.88rem;">Henüz başvuru özeti oluşturulmadı. Formu doldurduktan sonra sonuç burada görünecek.</span>';
});
