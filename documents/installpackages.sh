# İlk oluşturma için yap
# chmod +x scripts/installpackages.sh

#!/bin/bash

npm i zod # model scheme
npm i zustand # state-management (zustand)
# npm i @reduxjs/toolkit react-redux # state-management (redux)
npm add react-hot-toast # toast için kütüphane + config (https://react-hot-toast.com/)
# npm i date-fns # tarih işlemleri için
# npm i @react-input/mask # Text maskelemek için
# npm i next-intl # Çoklu dil için
npm i next-themes # Tema için
# npm i html-react-parser # HTML parse eder.(dangerouslySetInnerHTML yerine kullanilabilir)
npm i react-icons # icon kütüphanesi
# npm i @tanstack/react-query @tanstack/react-query-devtools # veri yönetimi için
# npm i @tanstack/react-table # Tablo için (CDataTable)
# npm i lottie-react # lottie animasyonlarını oynatmak için
# npm i recharts # Grafik için
# npm i react-easy-crop # Resim kırpmak için
# npm i motion # framer-motion animasyonlari için
# npm i @dnd-kit/core @dnd-kit/sortable @dnd-kit/modifiers # Sıralı liste için
# npm i idb # indexedDB kütüphanesi

# form paketleri (RHF)
# npm i react-hook-form @hookform/resolvers

# shadcn paketleri
npx shadcn@latest init # component kutuphanesi (gray)
# npx shadcn@latest add button checkbox dialog input input-otp label radio-group field sheet slider textarea select calendar popover command accordion carousel resizable table dropdown-menu


# Temel Paket Kurulumu
npm i zod
npm i zustand
npm add react-hot-toast
npm i next-themes
npm i react-icons

npx shadcn@latest init
npx shadcn@latest add button