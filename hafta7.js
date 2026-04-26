// ----  TEMA DEĞİŞTİRME ----
const temaButonu = document.getElementById('temaButonu');

temaButonu.addEventListener("click", () => {
    const mevcutTema = document.body.getAttribute("data-bs-theme");

    if (mevcutTema === "dark") {
        document.body.setAttribute("data-bs-theme", "light");
        document.body.classList.remove("koyu-tema"); // CSS'indeki özel renkler için
        temaButonu.textContent = "🌙 Koyu Temaya Geç";
    } else {
        document.body.setAttribute("data-bs-theme", "dark");
        document.body.classList.add("koyu-tema"); // CSS'indeki özel renkler için
        temaButonu.textContent = "☀️ Açık Temaya Geç";
    }
});

// ---- BAŞVURU FORMU  ----
const form = document.getElementById("basvuruForm");
const sonucAlani = document.getElementById("sonucAlani");
const uyariAlani = document.getElementById("uyariAlani");
const formTemizle = document.getElementById("formTemizle");

if (form) {
    form.addEventListener("submit", function (e) {
        e.preventDefault();

        // Değerleri HTML ID'lerine göre alıyoruz
        const ad = document.getElementById("adsoyad").value.trim();
        const mail = document.getElementById("eposta").value.trim();
        const bolum = document.getElementById("bolum").value.trim();
        const sinif = document.getElementById("sinif").value;
        const oturum = document.getElementById("oturum").value;
        const katilim = document.getElementById("katilim").value;
        const mesaj = document.getElementById("mesaj").value.trim();
        const onay = document.getElementById("onay").checked;

        // Doğrulama
        if (!ad || !mail || !bolum || !sinif || !onay) {
            uyariAlani.classList.remove("d-none");
            sonucAlani.classList.add("d-none");
            return;
        }

        uyariAlani.classList.add("d-none");
        sonucAlani.classList.remove("d-none");

        const tarih = new Date().toLocaleDateString('tr-TR', { day:'2-digit', month:'long', year:'numeric' });

        // Sonuç alanını Bootstrap sınıflarıyla güncelle
        sonucAlani.className = 'alert alert-success shadow-sm rounded-4';
        sonucAlani.innerHTML = `
            <div class="d-flex justify-content-between align-items-center mb-3">
                <strong class="text-success">✅ Başvuru Özeti Oluşturuldu</strong>
                <small class="text-muted">${tarih}</small>
            </div>
            <div class="card border-0 bg-white text-dark shadow-sm">
                <div class="card-body p-3">
                    <div class="d-flex justify-content-between py-2 border-bottom">
                        <span class="text-muted small">Ad Soyad</span>
                        <span class="fw-bold">${ad}</span>
                    </div>
                    <div class="d-flex justify-content-between py-2 border-bottom">
                        <span class="text-muted small">E-posta</span>
                        <span class="fw-bold">${mail}</span>
                    </div>
                    <div class="d-flex justify-content-between py-2 border-bottom">
                        <span class="text-muted small">Bölüm / Sınıf</span>
                        <span class="fw-bold">${bolum} — ${sinif}</span>
                    </div>
                    <div class="d-flex justify-content-between py-2 border-bottom">
                        <span class="text-muted small">Oturum</span>
                        <span class="fw-bold">${oturum || 'Belirtilmedi'}</span>
                    </div>
                    <div class="d-flex justify-content-between py-2 ${mesaj ? 'border-bottom' : ''}">
                        <span class="text-muted small">Katılım Türü</span>
                        <span class="fw-bold">${katilim || 'Belirtilmedi'}</span>
                    </div>
                    ${mesaj ? `
                    <div class="mt-2">
                        <span class="text-muted small d-block">Mesaj:</span>
                        <p class="mb-0 small">${mesaj}</p>
                    </div>` : ''}
                </div>
            </div>
        `;

        sonucAlani.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    });
}

// ----  FORMU TEMİZLE ----
if (formTemizle) {
    formTemizle.addEventListener('click', function () {
        form.reset();
        uyariAlani.classList.add('d-none');
        sonucAlani.className = 'alert alert-info rounded-4';
        sonucAlani.innerHTML = 'Henüz başvuru özeti oluşturulmadı. Formu doldurduktan sonra sonuç burada görünecek.';
    });
}
