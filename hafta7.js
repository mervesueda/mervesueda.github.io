// ============================================================
// hafta7.js — Bootstrap + JavaScript Laboratuvar Uygulaması
// Etkileşim 1: Tema değiştirme
// Etkileşim 2: Form verilerinden başvuru özeti oluşturma
// ============================================================

// ---- 1) TEMA DEĞİŞTİRME ----
const temaButonu = document.getElementById('tema-butonu');
let koyuTema = false;

temaButonu.addEventListener('click', function () {
    koyuTema = !koyuTema;
    document.body.classList.toggle('koyu-tema', koyuTema);

    if (koyuTema) {
        temaButonu.textContent = '☀️ Açık Temaya Geç';
        temaButonu.classList.remove('btn-outline-dark');
        temaButonu.classList.add('btn-outline-light');
    } else {
        temaButonu.textContent = '🌙 Koyu Temaya Geç';
        temaButonu.classList.remove('btn-outline-light');
        temaButonu.classList.add('btn-outline-dark');
    }
});


// ---- 2) BAŞVURU FORMU — ÖZET OLUŞTURMA ----
const basvuruFormu = document.getElementById('basvuru-formu');
const sonucAlani = document.getElementById('sonuc-alani');
const uyariAlani = document.getElementById('uyari-alani');
const formTemizleBtn = document.getElementById('form-temizle');

basvuruFormu.addEventListener('submit', function (event) {
    event.preventDefault(); // Sayfa yenilenmesini engelle

    // Değerleri al
    const adSoyad     = document.getElementById('f-adsoyad').value.trim();
    const eposta      = document.getElementById('f-eposta').value.trim();
    const bolum       = document.getElementById('f-bolum').value.trim();
    const sinif       = document.getElementById('f-sinif').value;
    const oturum      = document.getElementById('f-oturum').value;
    const katilimTuru = document.getElementById('f-katilim').value;
    const mesaj       = document.getElementById('f-mesaj').value.trim();
    const onay        = document.getElementById('f-onay').checked;

    // Zorunlu alan kontrolü
    if (!adSoyad || !eposta || !bolum || !sinif || !oturum || !katilimTuru) {
        uyariAlani.style.display = 'block';
        sonucAlani.innerHTML = `
            <div class="text-muted" style="font-size:0.88rem;">
                Henüz başvuru özeti oluşturulmadı. Formu doldurduktan sonra sonuç burada görünecek.
            </div>
        `;
        sonucAlani.classList.remove('sonuc-var');
        return;
    }

    if (!onay) {
        uyariAlani.style.display = 'block';
        uyariAlani.textContent = '⚠️ Devam etmek için bilgilerinizin kullanılmasını kabul etmelisiniz.';
        return;
    }

    // Tüm alanlar dolu → uyarıyı gizle, özeti göster
    uyariAlani.style.display = 'none';

    const oturumAdlari = {
        'bootstrap': 'Bootstrap + JS Projesi',
        'html-css': 'HTML + CSS Temelleri',
        'javascript': 'JavaScript Uygulamaları',
        'github': 'GitHub Pages Yayını'
    };

    const katilimAdlari = {
        'yuzyuze': 'Yüz yüze',
        'online': 'Online (canlı)',
        'kayit': 'Kayıttan izleme'
    };

    const sinifAdlari = {
        '1': '1. Sınıf', '2': '2. Sınıf', '3': '3. Sınıf', '4': '4. Sınıf'
    };

    const tarih = new Date().toLocaleDateString('tr-TR', {
        day: '2-digit', month: 'long', year: 'numeric'
    });

    sonucAlani.classList.add('sonuc-var');
    sonucAlani.innerHTML = `
        <div style="margin-bottom: 12px;">
            <strong style="font-size:1rem;">✅ Başvuru Özeti Oluşturuldu</strong>
            <span style="font-size:0.78rem; color:#15803d; margin-left:10px;">${tarih}</span>
        </div>
        <div class="ozet-kart">
            <div class="ozet-satir">
                <span class="key">Ad Soyad</span>
                <span class="val">${adSoyad}</span>
            </div>
            <div class="ozet-satir">
                <span class="key">E-posta</span>
                <span class="val">${eposta}</span>
            </div>
            <div class="ozet-satir">
                <span class="key">Bölüm / Sınıf</span>
                <span class="val">${bolum} — ${sinifAdlari[sinif] || sinif}</span>
            </div>
            <div class="ozet-satir">
                <span class="key">Katılmak İstediği Oturum</span>
                <span class="val">${oturumAdlari[oturum] || oturum}</span>
            </div>
            <div class="ozet-satir">
                <span class="key">Katılım Türü</span>
                <span class="val">${katilimAdlari[katilimTuru] || katilimTuru}</span>
            </div>
            ${mesaj ? `
            <div class="ozet-satir">
                <span class="key">Kısa Mesaj</span>
                <span class="val" style="max-width:55%; text-align:right;">${mesaj}</span>
            </div>` : ''}
        </div>
    `;

    // Sonuç alanına yumuşak scroll
    sonucAlani.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
});


// ---- 3) FORMU TEMİZLE ----
formTemizleBtn.addEventListener('click', function () {
    basvuruFormu.reset();
    uyariAlani.style.display = 'none';
    sonucAlani.classList.remove('sonuc-var');
    sonucAlani.innerHTML = `
        <div class="text-muted" style="font-size:0.88rem;">
            Henüz başvuru özeti oluşturulmadı. Formu doldurduktan sonra sonuç burada görünecek.
        </div>
    `;
});
