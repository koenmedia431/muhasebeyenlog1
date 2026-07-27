# Yenlog · Cihad Muhasebe

Çift taraflı kayıt esasına göre çalışan tek kişilik muhasebe uygulaması.
Tekdüzen Hesap Planı, yevmiye defteri, defter-i kebir, mizan, cari ekstre,
alacak yaşlandırma, KDV özeti, gelir tablosu ve bilanço.

Sunucu gerektirmez. GitHub Pages'te statik olarak çalışır, veri isteğe bağlı
olarak özel bir GitHub reposunda `defter.json` dosyasında tutulur.

---

## 1. Uygulamayı yayına alma

Bu adımlar uygulamanın açılacağı adresi oluşturur. Kod herkese açık olur;
sorun değil, içinde hiçbir veri veya anahtar yoktur.

1. GitHub'da yeni repo aç: **`yenlog-muhasebe`** — görünürlük **Public**.
2. `Add file → Upload files` ile şu dosyaları yükle:
   - `index.html`
   - `manifest.webmanifest`
   - `sw.js`
   - `icon.svg`, `icon-192.png`, `icon-512.png`, `icon-maskable.png`
3. `Commit changes` de.
4. `Settings → Pages` bölümünde **Source: Deploy from a branch**,
   **Branch: `main` / `(root)`** seç, `Save` de.
5. Bir iki dakika sonra adresin hazır olur:
   `https://KULLANICIADIN.github.io/yenlog-muhasebe/`

Bu hâliyle uygulama çalışır ve veriyi açtığın cihazın tarayıcısında saklar.
Cihazlar arası senkron için 2. bölüme geç.

---

## 2. Veriyi GitHub'da tutma (cihazlar arası senkron)

Muhasebe verisi ayrı ve **özel** bir repoda durur. Her kayıt bir commit olur,
yani geriye dönük tüm sürümler GitHub'da saklanır — kendiliğinden denetim izi.

### 2.1 Veri reposunu aç

1. Yeni repo: **`yenlog-defter`** — görünürlük **Private**. Bu önemli.
2. `Add a README file` kutusunu işaretle (repo boş kalmasın).

### 2.2 Erişim anahtarı üret

1. GitHub → sağ üst profil → `Settings`
2. En altta `Developer settings`
3. `Personal access tokens → Fine-grained tokens` → `Generate new token`
4. Şunları doldur:
   - **Token name:** `yenlog-defter`
   - **Expiration:** 1 yıl (süre dolunca yenilemen gerekir)
   - **Repository access:** `Only select repositories` → **`yenlog-defter`**
   - **Permissions → Repository permissions → Contents:** `Read and write`
     (Başka hiçbir izin verme.)
5. `Generate token` de ve çıkan `github_pat_...` değerini kopyala.
   **Bu değer bir daha gösterilmez.**

### 2.3 Uygulamaya tanıt

Uygulamayı aç → `Ayarlar & yedek` → `Depolama & senkron`

| Alan | Değer |
|---|---|
| Kayıt yöntemi | GitHub senkron |
| GitHub kullanıcı adı | GitHub kullanıcı adın |
| Özel repo adı | `yenlog-defter` |
| Dosya yolu | `defter.json` |
| Erişim anahtarı | kopyaladığın `github_pat_...` |

`Ayarları kaydet` → `Bağlantıyı sına` → `GitHub'a gönder`.

Sol alttaki durum satırı **GitHub bağlı** yazıyorsa tamamdır. Bundan sonra
her fiş kaydından ~2,5 saniye sonra otomatik gönderilir.

### 2.4 İkinci cihaz

Aynı adresi aç, `Ayarlar` → aynı bilgileri gir → **`GitHub'dan çek`**.
Bundan sonra iki cihaz da aynı defteri kullanır.

---

## 3. Telefona kurma

Adresi telefonun tarayıcısında aç:

- **iPhone (Safari):** Paylaş → `Ana Ekrana Ekle`
- **Android (Chrome):** ⋮ menü → `Uygulamayı yükle` / `Ana ekrana ekle`

Tam ekran, adres çubuğu olmadan açılır. İnternet yokken arayüz yine gelir,
kayıtların cihazda tutulur; bağlantı gelince GitHub'a gönderilir.

---

## 4. Bilinmesi gerekenler

**Anahtarı koru.** Token yalnızca senin cihazının tarayıcısında saklanır,
hiçbir sunucuya gönderilmez. Ortak kullanılan bir bilgisayarda GitHub
senkronunu açma. Anahtar başkasının eline geçerse GitHub'dan iptal et.

**Aynı anda iki cihazda çalışma.** İki cihazda birden fiş girersen ikincisi
"Uzak defter değişmiş" uyarısı alır. O cihazda önce `GitHub'dan çek` de,
sonra girişe devam et.

**Yedek.** GitHub senkronu zaten yedektir, ama ayda bir `JSON yedeği indir`
deyip dosyayı ayrı bir yere koymak iyi olur.

**Tarayıcı verisini silme.** Tarayıcı geçmişini "site verileri dahil"
temizlersen yerel kayıt ve token gider. GitHub senkronu açıksa
`GitHub'dan çek` ile geri gelirsin.

---

## 5. Dosyalar

| Dosya | İşi |
|---|---|
| `index.html` | Uygulamanın tamamı — arayüz, muhasebe motoru, raporlar |
| `manifest.webmanifest` | Telefona kurulabilmesi için uygulama künyesi |
| `sw.js` | Çevrimdışı çalışma |
| `icon*.png`, `icon.svg` | Uygulama ikonu |

Uygulamayı güncellemek için `index.html` dosyasını repoda değiştirmen yeterli.
Veri ayrı repoda olduğu için güncelleme kayıtlarını etkilemez.
