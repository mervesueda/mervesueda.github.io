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
                document.body.classList.remove("koyu-tema");
                temaButonu.textContent = "🌙 Koyu Temaya Geç";
            } else {
                document.body.setAttribute("data-bs-theme", "dark");
                document.body.classList.add("koyu-tema");
                temaButonu.textContent = "☀️ Açık Temaya Geç";
            }
        });
    }

    // ---- FORM GÖNDERME (ÖZETLEME) ----
    if (form) {
        form.addEventListener("submit", function (e) {
            e.preventDefault();

            // HTML ID'leri ile birebir eşleşme
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

            // Başarılı durum
            uyariAlani.classList.add("d-none");
            sonucAlani.classList.remove("d-none");
            sonucAlani.className = "alert alert-success ozet-kart"; // CSS'indeki ozet-kart sınıfını kullanır

            const suAn = new Date().toLocaleDateString('tr-TR');

            sonucAlani.innerHTML = `
                <div class="d-flex justify-content-between mb-2">
                    <h5 class="fw-bold">✅ Başvuru Özeti</h5>
                    <small>${suAn}</small>
                </div>
                <div class="ozet-satir"><span class="etiket">Ad Soyad:</span> <span class="deger">${ad}</span></div>
                <div class="ozet-satir"><span class="etiket">E-posta:</span> <span class="deger">${mail}</span></div>
                <div class="ozet-satir"><span class="etiket">Bölüm/Sınıf:</span> <span class="deger">${bolum} / ${sinif}</span></div>
                <div class="ozet-satir"><span class="etiket">Oturum:</span> <span class="deger">${oturum || '-'}</span></div>
                <div class="ozet-satir"><span class="etiket">Katılım:</span> <span class="deger">${katilim || '-'}</span></div>
                ${mesaj ? `<div class="mt-2 small border-top pt-2"><strong>Mesaj:</strong> ${mesaj}</div>` : ''}
            `;
            
            sonucAlani.scrollIntoView({ behavior: 'smooth' });
        });
    }

    // ---- TEMİZLEME ----
    if (formTemizle) {
        formTemizle.addEventListener("click", () => {
            form.reset();
            uyariAlani.classList.add("d-none");
            sonucAlani.className = "alert alert-info";
            sonucAlani.innerHTML = "Henüz başvuru özeti oluşturulmadı.";
        });
    }
});
