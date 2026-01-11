# 🎬 Kampüs Film Kulübü - React Projesi

Bu proje, React kullanılarak geliştirilen, TVMaze API tabanlı dizi arama ve gösterim listesi oluşturma uygulamasıdır. Modern bir web uygulaması geliştirmek için gereken temel kavramları içermektedir.

**Vercel Demo:** <a href="https://movie-club-orcin.vercel.app/" target="_blank">Buradan tıklayarak canlı demoya ulaşabilirsiniz.</a> 🚀

## 🚀 Proje Özellikleri ve Kullanılan Teknolojiler

Bu proje, aşağıdaki teknolojiler ve özellikler kullanılarak geliştirilmiştir:

* **React:** Kullanıcı arayüzü için temel kütüphane.
* **React Hooks:**
    * `useReducer`: Global state yönetimi için (dizi listesi, filtreler, izleme listesi, sayfalama).
    * `useEffect`: Asenkron API isteklerini (veri çekme) ve `localStorage` senkronizasyonunu yönetmek için.
    * `useState`: `ShowDetail` gibi bileşen-içi (local) state yönetimi için.
    * `useCallback`: API istek fonksiyonunu optimize etmek için.
* **Axios:** TVMaze API'sine HTTP istekleri göndermek için kullanıldı.
* **TVMaze API:** Dizi arama, detay ve bölüm bilgilerini çekmek için kullanılan public REST API.
* **Bileşen Mimarisi (Composition):** Proje, yeniden kullanılabilir ve yönetilebilir olması için birçok bileşene ayrılmıştır.
* **CSS:** `App.css` içinde detaylı ve responsive (duyarlı) stil kodları bulunmaktadır.

## 🌟 Temel Fonksiyonellik

* **Dizi Arama:** Kullanıcıların TVMaze API'sinde dizi aramasına olanak tanır.
* **Filtreleme:** Arama sonuçlarını Türe, Dile ve Minimum IMDb Puanına göre filtreler.
* **Detay Sayfası:** Her dizi için ayrı bir detay sayfası, dizi bilgilerini ve bölüm listesini gösterir. Bölüm listesi, ayrı bir API çağrısıyla çekilir.
* **İzleme Listesi (Watchlist):**
    * Kullanıcıların "Gösterime Girecekler" listesine dizi eklemesine ve çıkarmasına olanak tanır.
    * Liste `useReducer` ile yönetilir ve tarayıcının `localStorage`'ında saklanır (sayfa yenilendiğinde kaybolmaz).
* **Sayfalama (Pagination):**
    * Uzun sonuç listelerini sayfalara böler. Varsayılan sayfa boyutu 6'dır.
    * Kullanıcıya "İlk", "Son", "İleri", "Geri" navigasyon kontrolleri sunar.
* **Koşullu Görüntüleme (Conditional Rendering):**
    * Veri yüklenirken **Spinner** .
    * API hatası durumunda **Hata Mesajı** ve "Tekrar Dene" butonu.
    * Arama sonucu boşsa **Boş Durum** bileşeni gösterilir.
---

## 📬 İletişim
- 📧 E-posta: unalsener0488@gmail.com  
- 💻 [GitHub](https://github.com/unalsener-dev)  
- 🔗 [LinkedIn](https://www.linkedin.com/in/%C3%BCnal-%C5%9Fener-7b12712ab/)

