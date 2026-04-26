document.addEventListener('DOMContentLoaded', () => {
    // ---- ELEMENTLERİ SEÇ ----
    const temaButonu = document.getElementById('temaButonu');
    const form = document.getElementById("basvuruForm");
    const sonucAlani = document.getElementById("sonucAlani");
    const uyariAlani = document.getElementById("uyariAlani");
    const formTemizle = document.getElementById("formTemizle");

    // ---- TEMA DEĞİŞTİRME ----
    if (temaButonu) {
        temaButonu.addEventListener("click", () => {
            const isDark = document.body.getAttribute("data-bs-theme") === "dark";
            if (isDark) {
                document.body.setAttribute("data-bs-theme", "light");
                document.body.classList.remove("koyu-tema"); // CSS'indeki koyu-tema sınıfını kaldırır
                temaButonu.textContent = "🌙 Koyu Temaya Geç";
                temaButonu.className = "btn btn-outline-secondary btn-lg px-4";
            } else {
                document.body.setAttribute("data-bs-theme", "dark");
                document.body.classList.add("koyu-tema"); // CSS'indeki koyu-tema sınıfını ekler
                temaButonu.textContent = "☀️ Açık Temaya Geç";
                temaButonu.className = "btn btn-outline-light btn-lg px-4";
            }
        });
    }

    // ---- FORM GÖNDERME (ÖZETLEME) ----
    if (form) {
        form.addEventListener("submit", function (e) {
            e.preventDefault(); // Sayfa yenilenmesini engeller

            // Değerleri alıyoruz
            const ad = document.getElementById("adsoyad").value.trim();
            const mail = document.getElementById("eposta").value.trim();
            const bolum = document.getElementById("bolum").value.trim();
            const sinif = document.getElementById("sinif").value;
            const oturum = document.getElementById("oturum").value;
            const katilim = document.getElementById("katilim").value;
            const mesaj = document.getElementById("mesaj").value.trim();
            const onay = document.getElementById("onay").checked;

            // Doğrulama: Ad, Mail, Bölüm, Sınıf ve Onay zorunlu
            if (!ad || !mail || !bolum || !sinif || !onay) {
                uyariAlani.classList.remove("d-none");
                sonucAlani.classList.add("d-none");
                return;
            }

            // Başarılı durumda işlemleri yap
            uyariAlani.classList.add("d-none");
            sonucAlani.classList.remove("d-none");
            sonucAlani.className = "alert alert-success ozet-kart p-4 shadow-sm"; 

            const suAn = new Date().toLocaleDateString('tr-TR');

            sonucAlani.innerHTML = `
                <div class="d-flex justify-content-between align-items-center mb-3 border-bottom pb-2">
                    <h5 class="fw-bold mb-0 text-success">✅ Başvuru Özeti</h5>
                    <small class="text-muted">${suAn}</small>
                </div>
                <div class="ozet-satir d-flex justify-content-between mb-2"><strong>Ad Soyad:</strong> <span>${ad}</span></div>
                <div class="ozet-satir d-flex justify-content-between mb-2"><strong>E-posta:</strong> <span>${mail}</span></div>
                <div class="ozet-satir d-flex justify-content-between mb-2"><strong>Bölüm / Sınıf:</strong> <span>${bolum} / ${sinif}</span></div>
                <div class="ozet-satir d-flex justify-content-between mb-2"><strong>Oturum:</strong> <span>${oturum || '-'}</span></div>
                <div class="ozet-satir d-flex justify-content-between mb-2"><strong>Katılım:</strong> <span>${katilim || '-'}</span></div>
                ${mesaj ? `<div class="mt-3 p-2 bg-light rounded small text-dark"><strong>Mesaj:</strong> ${mesaj}</div>` : ''}
            `;
            
            sonucAlani.scrollIntoView({ behavior: 'smooth' });
        });
    }

    // ---- TEMİZLEME ----
    if (formTemizle) {
        formTemizle.addEventListener("click", () => {
            form.reset();
            uyariAlani.classList.add("d-none");
            sonucAlani.className = "alert alert-info rounded-4";
            sonucAlani.innerHTML = "Henüz başvuru özeti oluşturulmadı. Formu doldurduktan sonra sonuç burada görünecek.";
        });
    }
});
