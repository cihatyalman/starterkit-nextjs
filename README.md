# StarterKit (Next.js)

Projelerinizde kullanabileceğiniz başlangıç kiti. [ Son güncelleme tarihi: 01.03.2026 ]

Proje export mod(SSG) olarak tasarlanmıştır. Bu sayede bütün proje türlerinde kolaylıkla kullanılabilir. Ek olarak server mod(SSR) için bazı özelliklerin alternatifleri eklenmiştir.

Siteyi görüntülemek için [bu bağlantıyı](https://cihatyalman.github.io/starterkit-nextjs) kullanabilirsiniz.

#

<br />

## Kullanılan kütüphaneler:

### UI kütüphanesi

- npx shadcn@latest init
- npx shadcn@latest add button

Bir çok hazır bileşen sunarak geliştirme ortamını kolaylaştırır.

Projede kullanılan bileşenler: button checkbox dialog input input-otp label radio-group field sheet slider textarea select calendar popover command accordion carousel resizable table dropdown-menu

### Tavsiye edilen kütüphaneler

- npm i zod : Model şemaları ve veri yönetimi<br />
- npm i zustand : State yönetimi<br />
- npm add react-hot-toast : Toast bildirimleri<br />
- npm i next-themes : Tema<br />
- npm i react-icons : Icon kütüphanesi<br />

### Büyük veri kütüphaneleri

- npm i @tanstack/react-query @tanstack/react-query-devtools : Veri yönetimi<br />
- npm i @tanstack/react-table : Tablo yönetimi<br />

### Diğer kütüphaneler

- npm i @reduxjs/toolkit react-redux : State yönetimi<br />
- npm i date-fns : Tarih işlemleri<br />
- npm i @react-input/mask : Metin kalıpları oluşturur<br />
- npm i react-hook-form @hookform/resolvers : form kütüphanesi<br />
- npm i recharts : Grafik işlemleri<br />
- npm i html-react-parser : HTML parse<br />
- npm i lottie-react : Lottie animasyonları<br />
- npm i motion : framer-motion animasyonları<br />
- npm i react-easy-crop : Resim kırpma<br />
- npm i @dnd-kit/core @dnd-kit/sortable @dnd-kit/modifiers : Sıralı liste<br />
- npm i idb : indexedDB kütüphanesi<br />

### Server özel kütüphaneler

- npm i next-intl : Çoklu dil desteği<br />

#

<br /><br />

# Mimari

- #### [app](https://github.com/cihatyalman/starterkit-nextjs/tree/master/web-static/src/app): routing, layout, metadata gibi yapılar burada bulunur.
- #### [screens](https://github.com/cihatyalman/starterkit-nextjs/tree/master/web-static/src/screens): Sayfa tasarımları ve sayfa içi özel bileşenler burada bulunur. Buradaki sayfalar 'app' içinden import edilir.
- #### [features](https://github.com/cihatyalman/starterkit-nextjs/tree/master/web-static/src/features): Özellikler ve özellik dosyaları burada bulunur. Buradaki dosyalar 'screens' içinden import edilir.
- #### [shared](https://github.com/cihatyalman/starterkit-nextjs/tree/master/web-static/src/shared): Proje genelinde ortak kullanılan dosyalar burada bulunur.
- #### [components](https://github.com/cihatyalman/starterkit-nextjs/tree/master/web-static/src/components): Projeden bağımsız, her projede kullanılabilen bileşenler burada bulunur.
- #### [infrastructure](https://github.com/cihatyalman/starterkit-nextjs/tree/master/web-static/src/infrastructure): Projeden bağımsız, her projede kullanılabilen araçlar/sistemler burada bulunur.
- #### [utils](https://github.com/cihatyalman/starterkit-nextjs/tree/master/web-static/src/utils): Projeye özel yardımcı araçlar burada bulunur.
- #### [lib](https://github.com/cihatyalman/starterkit-nextjs/tree/master/web-static/src/lib): Kütüphane ayarları burada bulunur.
- #### [assets](https://github.com/cihatyalman/starterkit-nextjs/tree/master/web-static/src/assets): Public olmayan statik dosyalar burada bulunur.
- #### [styles](https://github.com/cihatyalman/starterkit-nextjs/tree/master/web-static/src/styles): css dosyaları burada bulunur.
- #### [types](https://github.com/cihatyalman/starterkit-nextjs/tree/master/web-static/src/types): Proje genelinde kullanılan global type'lar burada bulunur.

#
