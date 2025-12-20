#  E-Commerce Web Application

Bu proje, **React + TypeScript** kullanılarak geliştirilmiş, temel e‑ticaret fonksiyonlarını içeren modern bir web uygulamasıdır. Proje; kullanıcı giriş/kayıt işlemleri, ürün listeleme, ürün detay sayfası, kategori bazlı filtreleme ve sepet yönetimi gibi özellikler sunar.

Proje geliştirilirken **modüler yapı**, **okunabilirlik**, **ölçeklenebilirlik** ve **gerçek hayat frontend mimarisi** hedeflenmiştir.

---

##  Kullanılan Teknolojiler

* **React**
* **TypeScript**
* **Redux Toolkit** (Global state yönetimi)
* **React Router DOM** (Sayfa yönlendirme)
* **Formik & Yup** (Form yönetimi ve doğrulama)
* **Material UI (MUI)** (UI bileşenleri)
* **Axios** (HTTP istekleri)
* **JSON Server** (Mock backend)
* **React Toastify** (Bildirimler)

---

##  Proje Klasör Yapısı

```bash
src
├── components      # Tekrar kullanılabilir bileşenler
├── pages           # Sayfa bazlı componentler
├── redux           # Redux store ve slicelar
├── services        # API servis katmanı
├── schemas         # Form validation şemaları (Yup)
├── types           # TypeScript type tanımları
├── config          # Router ve Axios konfigürasyonları
├── css             # Sayfa ve component stilleri
├── images          # Statik görseller
├── jsonserver      # Mock backend verileri
```

---

##  Sayfalar

* **HomePage** → Ürünlerin listelendiği ana sayfa
* **LoginPage** → Kullanıcı giriş ekranı
* **RegisterPage** → Yeni kullanıcı kayıt ekranı
* **ProductDetailPage** → Ürün detay bilgileri

---

##  State Yönetimi (Redux)

Global state yönetimi için **Redux Toolkit** kullanılmıştır.

### Kullanılan Slicelar:

* `appSlice` → Kullanıcı bilgisi, loading durumu
* `basketSlice` → Sepet işlemleri

---

##  Servis Katmanı

API istekleri **service** katmanında soyutlanmıştır.

Örnek:

* `LoginPageService`
* `RegisterPageService`
* `ProductService`
* `CategoryService`

Bu yapı sayesinde componentler API detaylarından ayrılmıştır.

---

##  Form Doğrulama

Form işlemleri **Formik**, doğrulamalar ise **Yup** kullanılarak yapılmıştır.

* Kullanıcı adı
* Şifre
* Zorunlu alan kontrolleri
---

##  Kurulum ve Çalıştırma

### 1️ Projeyi klonla

```bash
git clone https://github.com/kullanici-adi/e-commerce-react.git
```

### 2️ Bağımlılıkları yükle

```bash
npm install
```

### 3️ JSON Server'ı çalıştır

```bash
json-server --watch src/jsonserver/db.json --port 5000
```

### 4️ React uygulamasını başlat

```bash
npm run dev
```

---

##  Özellikler

* Kullanıcı giriş & kayıt sistemi
* Ürün listeleme
* Ürün detay sayfası
* Sepete ekleme / çıkarma
* Global loading spinner
* Form validation
* Bildirim sistemi

---

##  Geliştirme Notları

* Proje **component‑based** mimari ile yazılmıştır
* TypeScript ile type‑safe yapı sağlanmıştır
* Servis ve UI katmanları ayrılmıştır
* Gerçek projelerde kullanılan frontend yaklaşımları uygulanmıştır

---

##  Geliştirici

**Burak Turgut**
Bilgisayar Mühendisi
Frontend & Full‑Stack geliştirme, React, TypeScript, Redux

---

##  Lisans

Bu proje eğitim ve kişisel gelişim amaçlı geliştirilmiştir.
