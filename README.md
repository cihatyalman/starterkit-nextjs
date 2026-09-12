# **StarterKit Next.js**

Next.js projeleri için hızlı başlangıç sağlayan, düzenli yapı ve yeniden kullanılabilir bileşenler içeren bir başlangıç kiti.

🚀 [Canlı Demoyu Görüntüle](https://starterkit-cy.vercel.app)

#

### Kullanılan kütüphaneler:

**UI kütüphanesi**
<br> - npx shadcn@latest init
<br> - npx shadcn@latest add button

Bir çok hazır bileşen sunarak geliştirme ortamını kolaylaştırır.

Projede kullanılan bileşenler: button checkbox dialog input input-otp label radio-group field sheet slider textarea select calendar popover command accordion carousel resizable table dropdown-menu

**Tavsiye edilen kütüphaneler**
<br> - npm i zod : Model şemaları ve veri yönetimi
<br> - npm i zustand : State yönetimi
<br> - npm add react-hot-toast : Toast bildirimleri
<br> - npm i next-themes : Tema
<br> - npm i react-icons : Icon kütüphanesi

**Büyük veri kütüphaneleri**
<br> - npm i @tanstack/react-query @tanstack/react-query-devtools : Veri yönetimi
<br> - npm i @tanstack/react-table : Tablo yönetimi

**Diğer kütüphaneler**
<br>- npm i @reduxjs/toolkit react-redux : State yönetimi
<br>- npm i date-fns : Tarih işlemleri
<br>- npm i @react-input/mask : Metin kalıpları oluşturur
<br>- npm i react-hook-form @hookform/resolvers : form kütüphanesi
<br>- npm i recharts : Grafik işlemleri
<br>- npm i html-react-parser : HTML parse
<br>- npm i lottie-react : Lottie animasyonları
<br>- npm i motion : framer-motion animasyonları
<br>- npm i react-easy-crop : Resim kırpma
<br>- npm i @dnd-kit/core @dnd-kit/sortable @dnd-kit/modifiers : Sıralı liste
<br>- npm i idb : indexedDB kütüphanesi
<br >- npm i next-intl : Çoklu dil desteği

<br>

# Mimari

Proje, kodun okunabilirliğini ve tekrar kullanılabilirliğini artırmak adına belirli sorumluluk alanlarına bölünmüştür:

- [app](web/src/app): Routing, layout ve metadata gibi Next.js’e özgü temel uygulama yapıları bu dizinde yer alır. Uygulamanın giriş noktasıdır ve sayfa akışını yönetir.

- [features](web/src/features): Uygulamadaki işlevsel özellikler (business logic) ve bu özelliklere ait dosyalar burada yer alır.

- [components](web/src/components): Projenin genel UI bileşenlerini içerir.
  - [custom](web/src/components/custom): Projeden bağımsız, farklı projelerde de kullanılabilecek genel UI bileşenleri içerir. Tamamen yeniden kullanılabilir ve izole tasarlanmıştır.

  - [common](web/src/components/common): Feature özelinde olmayan ama projeye özel olan UI bileşenlerini içerir.

- [lib](web/src/lib): Harici kütüphanelerin konfigürasyonları ve entegrasyon ayarları burada tutulur.

- [assets](web/src/assets): Public olmayan statik dosyalar (örneğin import edilen görseller, json dosyaları vb.) bu klasörde yer alır.

- [shared](web/src/shared): Proje genelinde ortak kullanılan modüller, yardımcı fonksiyonlar ve yeniden kullanılabilir yapılar burada bulunur.
  - [utils](web/src/shared/utils): Projeye özel yardımcı fonksiyonlar ve araçlar bu dizinde bulunur. Genellikle küçük, saf ve tekrar kullanılabilir yardımcılar içerir.

  - [styles](web/src/shared/styles): Global veya modüler CSS/SCSS dosyaları bu dizinde bulunur.

  - [types](web/src/shared/types): Proje genelinde kullanılan global TypeScript tip tanımlamaları burada yer alır.

  - [models](web/src/shared/models): Feature özelinde olmayan modeller burada yer alır. (Örn: BaseModel, ResponseModel vb.)

- [core](web/src/core): Projenin temel altyapısını oluşturan, kullanıma hazır modüler araçlar ve sistemler burada yer alır. (Örn: API yapılandırması vb.)

#
