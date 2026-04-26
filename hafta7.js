// ---- TEMA DEĞİŞTİRME ----
const temaButonu = document.getElementById('temaButonu');

temaButonu.addEventListener("click", () => {
    // Bootstrap 5.3+ için döküman düzeyinde tema kontrolü
    const mevcutTema = document.body.getAttribute("data-bs-theme");

    if (mevcutTema === "dark") {
        document.body.setAttribute("data-bs-theme", "light");
        document.body.classList.remove("koyu-tema"); // CSS'teki özel sınıflar için
        temaButonu.textContent = "🌙 Koyu Temaya Geç";
    } else {
        document.body.setAttribute("data-bs-theme", "dark");
        document.body.classList.add("koyu-tema"); // CSS'teki özel sınıflar için
        temaButonu.textContent = "☀️ Açık Temaya Geç";
    }
});

// ---- BAŞVURU FORMU ----
const form = document.getElementById("basvuruForm");
const sonucAlani = document.getElementById("sonucAlani");
const uyariAlani = document.getElementById("uyariAlani");
const formTemizle = document.getElementById("formTemizle");

form.addEventListener("submit", function (e) {
    e.preventDefault();

    // Form değerlerini alma
    const ad = document.getElementById("adsoyad").value.trim();
    const mail = document.getElementById("eposta").value.trim();
    const bolum = document.getElementById("bolum").value.trim();
    const sinif = document.getElementById("sinif").value;
    const oturum = document.getElementById("oturum").value;
    const katilim = document.getElementById("katilim").value;
    const mesaj = document.getElementById("mesaj").value.trim();
    const onay = document.getElementById("onay").checked;

    // Doğrulama: Zorunlu alanlar ve onay kutusu
    if (!ad || !mail || !bolum || !sinif || !onay) {
        uyariAlani.classList.remove("d-none");
        sonucAlani.classList.add("d-none"); // Hata varken eski özeti gizle
        return;
    }

    // Başarılı durumda uyarıyı gizle ve sonucu göster
    uyariAlani.classList.add("d-none");
    sonucAlani.classList.remove("d-none");
    sonucAlani.className = "alert alert-success ozet-kart fade-in";

    const tarih = new Date().toLocaleDateString('tr-TR', { day:'2-digit', month:'long', year:'numeric' });

    // Özet içeriğini oluşturma
    sonucAlani.innerHTML = `
        <div class="d-flex justify-content-between align-items-center mb-3">
            <h5 class="fw-bold mb-0">✅ Başvuru Özeti Oluşturuldu</h5>
            <small class="text-muted">${tarih}</small>
        </div>
        <div class="card border-0 bg-white text-dark shadow-sm">
            <div class="card-body p-3">
                <div class="ozet-satir">
                    <span class="etiket">Ad Soyad:</span>
                    <span class="deger">${ad}</span>
                </div>
                <div class="ozet-satir">
                    <span class="etiket">E-posta:</span>
                    <span class="deger">${mail}</span>
                </div>
                <div class="ozet-satir">
                    <span class="etiket">Bölüm / Sınıf:</span>
                    <span class="deger">${bolum} — ${sinif}</span>
                </div>
                <div class="ozet-satir">
                    <span class="etiket">Oturum:</span>
                    <span class="deger">${oturum || 'Belirtilmedi'}</span>
                </div>
                <div class="ozet-satir">
                    <span class="etiket">Katılım Türü:</span>
                    <span class="deger">${katilim || 'Belirtilmedi'}</span>
                </div>
                ${mesaj ? `
                <div class="mt-2 pt-2 border-top">
                    <span class="etiket d-block mb-1">Mesaj:</span>
                    <p class="small mb-0 text-dark">${mesaj}</p>
                </div>` : ''}
            </div>
        </div>
    `;

    sonucAlani.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
});

// ---- FORMU TEMİZLE ----
formTemizle.addEventListener('click', function () {
    form.reset();
    uyariAlani.classList.add('d-none');
    sonucAlani.classList.remove("d-none");
    sonucAlani.className = 'alert alert-info rounded-4';
    sonucAlani.innerHTML = 'Henüz başvuru özeti oluşturulmadı. Formu doldurduktan sonra sonuç burada görünecek.';
});
