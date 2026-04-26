// ============================================================
// hafta7.js — Bootstrap + JavaScript Laboratuvar Uygulaması
// Etkileşim 1: Tema değiştirme (classList.toggle)
// Etkileşim 2: Form verilerinden başvuru özeti oluşturma
// ============================================================

// ----  TEMA DEĞİŞTİRME ----
const temaButonu = document.getElementById('tema-butonu');
let koyuTema = false;

temaButonu.addEventListener('click', function () {
    koyuTema = !koyuTema;
    document.body.classList.toggle('koyu-tema', koyuTema);

    if (koyuTema) {
        temaButonu.textContent = '☀️ Açık Temaya Geç';
    } else {
        temaButonu.textContent = '🌙 Koyu Temaya Geç';
    }
});


// ----  BAŞVURU FORMU ----
const basvuruFormu  = document.getElementById('basvuru-formu');
const sonucAlani    = document.getElementById('sonuc-alani');
const uyariAlani    = document.getElementById('uyari-alani');
const formTemizle   = document.getElementById('form-temizle');

basvuruFormu.addEventListener('submit', function (event) {
    event.preventDefault(); // Sayfa yenilenmesini engelle

    const adSoyad     = document.getElementById('f-adsoyad').value.trim();
    const eposta      = document.getElementById('f-eposta').value.trim();
    const bolum       = document.getElementById('f-bolum').value.trim();
    const sinif       = document.getElementById('f-sinif').value;
    const oturum      = document.getElementById('f-oturum').value;
    const katilimTuru = document.getElementById('f-katilim').value;
    const mesaj       = document.getElementById('f-mesaj').value.trim();
    const onay        = document.getElementById('f-onay').checked;

    // Eksik alan kontrolü
    if (!adSoyad || !eposta || !bolum || !sinif || !oturum || !katilimTuru || !onay) {
        uyariAlani.classList.remove('d-none');
        uyariAlani.textContent = '⚠️ Lütfen tüm zorunlu alanları doldurun ve onay kutusunu işaretleyin.';
        return;
    }

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
