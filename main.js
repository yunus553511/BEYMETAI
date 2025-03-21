document.addEventListener('DOMContentLoaded', function() {
    // Carousel functionality
    const carousel = document.querySelector('.carousel');
    const carouselItems = document.querySelectorAll('.carousel-item');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    let currentIndex = 0;
    const maxIndex = carouselItems.length - 1;
    const visibleItems = window.innerWidth < 768 ? 1 : 3;
    
    // Update carousel position
    function updateCarousel() {
        carousel.style.transform = `translateX(-${currentIndex * (100 / visibleItems)}%)`;
    }
    
    // Update carousel position
    updateCarousel();
    
    // Next button click
    nextBtn.addEventListener('click', function() {
        if (currentIndex < maxIndex) {
            currentIndex++;
            updateCarousel();
        }
    });
    
    // Previous button click
    prevBtn.addEventListener('click', function() {
        if (currentIndex > 0) {
            currentIndex--;
            updateCarousel();
        }
    });
    
    // Click effect function
    function createClickEffect(element) {
        element.addEventListener('mousedown', function() {
            this.classList.add('clicked');
        });
        
        element.addEventListener('mouseup', function() {
            this.classList.remove('clicked');
        });
        
        element.addEventListener('mouseleave', function() {
            this.classList.remove('clicked');
        });
        
        // Touch support
        element.addEventListener('touchstart', function() {
            this.classList.add('clicked');
        });
        
        element.addEventListener('touchend', function() {
            this.classList.remove('clicked');
        });
        
        element.addEventListener('touchcancel', function() {
            this.classList.remove('clicked');
        });
    }
    
    // Add click effect to all interactive elements
    const interactiveElements = document.querySelectorAll('.card, .control-item, .arrow-up');
    interactiveElements.forEach(element => {
        element.addEventListener('click', function() {
            createClickEffect(this);
        });
    });
    
    // Featured card functionality
    const featuredCard = document.querySelector('.featured-card');
    const featuredContent = document.querySelector('.featured-content');
    const arrowUp = document.querySelector('.arrow-up');
    
    // Arrow up click - Toggle featured card content
    arrowUp.addEventListener('click', function() {
        featuredCard.classList.toggle('expanded');
        if (featuredCard.classList.contains('expanded')) {
            arrowUp.innerHTML = '<i class="fas fa-chevron-down"></i>';
        } else {
            arrowUp.innerHTML = '<i class="fas fa-chevron-up"></i>';
        }
    });
    
    // Bottom controls functionality
    const controlItems = document.querySelectorAll('.control-item');
    controlItems.forEach(item => {
        item.addEventListener('click', function() {
            // Specific functionality for each control item
            const controlType = this.classList[1];
            
            switch(controlType) {
                case 'bbh':
                    // BBH tuşu - Hesaplama formu göster
                    showBBHCalculator();
                    break;
                case 'retin-takip':
                    // Retin Takip sayfasına yönlendirme
                    window.open('https://yunus553511.github.io/-retin-takip/?v=' + new Date().getTime(), '_blank');
                    break;
                case 'pdf':
                    // PDF tuşu - Google Drive'a yönlendirme
                    window.open('https://drive.google.com/drive/folders/1BIX8uUkgBf3LfpiFRoW4BVohHfkvCRh4', '_blank');
                    break;
                case 'info':
                    // Bilgi tuşu - Google Sheets'e yönlendirme
                    window.open('https://docs.google.com/spreadsheets/d/1Xyi09La_lbrDqAegunirzjslBoDeVYTz/edit?gid=1838862525#gid=1838862525', '_blank');
                    break;
                default:
                    showDetailedMessage('BİLGİ', 'Bu özellik henüz aktif değildir.');
                    break;
            }
        });
    });
    
    // Message showing function
    function showMessage(message) {
        const messageElement = document.createElement('div');
        messageElement.classList.add('message');
        messageElement.textContent = message;
        document.body.appendChild(messageElement);
        
        // Show message with animation
        setTimeout(() => {
            messageElement.classList.add('show');
        }, 10);
        
        // Hide and remove message after delay
        setTimeout(() => {
            messageElement.classList.remove('show');
            setTimeout(() => {
                document.body.removeChild(messageElement);
            }, 300);
        }, 3000);
    }
    
    // Carousel kategorilerine tıklama işlevselliği ekle
    carouselItems.forEach(item => {
        item.addEventListener('click', function() {
            const category = this.getAttribute('data-category');
            showCategoryContent(category);
        });
    });
    
    // Kategori içeriğini gösterme fonksiyonu
    function showCategoryContent(category) {
        featuredCard.classList.add('expanded');
        arrowUp.innerHTML = '<i class="fas fa-chevron-down"></i>';
        
        // Kategori başlığını al
        const categoryTitle = document.querySelector(`.carousel-item[data-category="${category}"] h3`).textContent;
        
        // Kategori içeriğini göster
        let content = '';
        
        switch(category) {
            case 'haber-bulteni':
                content = `
                    <h2>${categoryTitle}</h2>
                    <p>Son haberler ve duyurular burada gösterilecek.</p>
                    <div class="category-actions">
                        <button class="action-btn">Tüm Haberleri Gör</button>
                    </div>
                `;
                break;
            case 'yeni-profiller':
                content = `
                    <h2>${categoryTitle}</h2>
                    <p>Yeni eklenen profiller burada listelenecek.</p>
                    <div class="category-actions">
                        <button class="action-btn">Profilleri İncele</button>
                    </div>
                `;
                break;
            case 'yedek-kaliplar':
                content = `
                    <h2>${categoryTitle}</h2>
                    <p>Mevcut yedek kalıplar ve durumları burada gösterilecek.</p>
                    <div class="category-actions">
                        <button class="action-btn">Kalıpları Listele</button>
                    </div>
                `;
                break;
            case 'hurda-kaliplar':
                content = `
                    <h2>${categoryTitle}</h2>
                    <p>Hurda kalıp listesi ve detayları burada gösterilecek.</p>
                    <div class="category-actions">
                        <button class="action-btn">Hurda Listesini Gör</button>
                    </div>
                `;
                break;
            default:
                content = `
                    <h2>${categoryTitle}</h2>
                    <p>Bu kategori için içerik hazırlanıyor...</p>
                    <div class="category-actions">
                        <button class="action-btn">Detayları Gör</button>
                    </div>
                `;
                break;
        }
        
        // İçeriği featured card'a ekle
        featuredContent.innerHTML = `
            <div class="animated-border"></div>
            <div class="category-content">
                ${content}
            </div>
            <div class="arrow-up">
                <i class="fas fa-chevron-down"></i>
            </div>
        `;
        
        // Arrow up click - Toggle featured card content (yeniden ekle)
        document.querySelector('.arrow-up').addEventListener('click', function() {
            featuredCard.classList.toggle('expanded');
            if (featuredCard.classList.contains('expanded')) {
                this.innerHTML = '<i class="fas fa-chevron-down"></i>';
            } else {
                this.innerHTML = '<i class="fas fa-chevron-up"></i>';
                // İçeriği sıfırla
                setTimeout(() => {
                    featuredContent.innerHTML = `
                        <div class="animated-border"></div>
                        <div class="arrow-up">
                            <i class="fas fa-chevron-up"></i>
                        </div>
                    `;
                    
                    // Arrow up click - Toggle featured card content (yeniden ekle)
                    document.querySelector('.arrow-up').addEventListener('click', function() {
                        featuredCard.classList.toggle('expanded');
                        if (featuredCard.classList.contains('expanded')) {
                            this.innerHTML = '<i class="fas fa-chevron-down"></i>';
                        } else {
                            this.innerHTML = '<i class="fas fa-chevron-up"></i>';
                        }
                    });
                }, 300);
            }
        });
    }
    
    // Detaylı mesaj gösterme fonksiyonu
    function showDetailedMessage(title, message) {
        const messageElement = document.createElement('div');
        messageElement.classList.add('detailed-message');
        
        messageElement.innerHTML = `
            <div class="detailed-message-content">
                <div class="detailed-message-header">
                    <h3>${title}</h3>
                    <button class="close-btn"><i class="fas fa-times"></i></button>
                </div>
                <div class="detailed-message-body">
                    <p>${message}</p>
                </div>
                <div class="detailed-message-footer">
                    <button class="ok-btn">Tamam</button>
                </div>
            </div>
        `;
        
        document.body.appendChild(messageElement);
        
        // Show message with animation
        setTimeout(() => {
            messageElement.classList.add('show');
        }, 10);
        
        // Close button click
        messageElement.querySelector('.close-btn').addEventListener('click', function() {
            messageElement.classList.remove('show');
            setTimeout(() => {
                document.body.removeChild(messageElement);
            }, 300);
        });
        
        // OK button click
        messageElement.querySelector('.ok-btn').addEventListener('click', function() {
            messageElement.classList.remove('show');
            setTimeout(() => {
                document.body.removeChild(messageElement);
            }, 300);
        });
    }
    
    // Enhanced Mobile touch support for carousel
    let touchStartX = 0;
    let touchEndX = 0;
    let isSwiping = false;
    
    carousel.addEventListener('touchstart', function(e) {
        touchStartX = e.changedTouches[0].screenX;
        isSwiping = true;
    });
    
    carousel.addEventListener('touchmove', function(e) {
        if (!isSwiping) return;
        touchEndX = e.changedTouches[0].screenX;
        const diffX = touchStartX - touchEndX;
        
        // Prevent default only if swiping horizontally
        if (Math.abs(diffX) > 10) {
            e.preventDefault();
        }
    }, { passive: false });
    
    carousel.addEventListener('touchend', function(e) {
        if (!isSwiping) return;
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
        isSwiping = false;
    });
    
    function handleSwipe() {
        const diffX = touchStartX - touchEndX;
        const threshold = 50; // Minimum distance to be considered a swipe
        
        if (diffX > threshold) {
            // Swipe left (next)
            if (currentIndex < maxIndex) {
                currentIndex++;
                updateCarousel();
            }
        } else if (diffX < -threshold) {
            // Swipe right (prev)
            if (currentIndex > 0) {
                currentIndex--;
                updateCarousel();
            }
        }
    }
    
    // Check orientation change for better mobile experience
    window.addEventListener('orientationchange', function() {
        // Wait for the orientation change to finish
        setTimeout(() => {
            // Update visible items based on new orientation
            visibleItems = window.innerWidth < 768 ? 1 : 3;
            // Reset position
            currentIndex = 0;
            updateCarousel();
        }, 300);
    });
    
    // BBH Hesaplama Formu
    function showBBHCalculator() {
        const calculatorElement = document.createElement('div');
        calculatorElement.classList.add('bbh-calculator');
        
        calculatorElement.innerHTML = `
            <div class="bbh-calculator-content">
                <div class="bbh-calculator-header">
                    <h3>BBH HESAPLAMA</h3>
                    <button class="close-btn"><i class="fas fa-times"></i></button>
                </div>
                <div class="bbh-calculator-body">
                    <div class="form-group">
                        <label for="bbh-type">Hesaplama Türü:</label>
                        <select id="bbh-type">
                            <option value="boru">Boru Profil</option>
                            <option value="kare">Kare Profil</option>
                            <option value="dikdortgen">Dikdörtgen Profil</option>
                        </select>
                    </div>
                    
                    <div class="form-group boru-fields">
                        <label for="boru-cap">Çap (mm):</label>
                        <input type="number" id="boru-cap" placeholder="Örn: 50">
                    </div>
                    
                    <div class="form-group boru-fields">
                        <label for="boru-et">Et Kalınlığı (mm):</label>
                        <input type="number" id="boru-et" placeholder="Örn: 2">
                    </div>
                    
                    <div class="form-group kare-fields" style="display: none;">
                        <label for="kare-kenar">Kenar (mm):</label>
                        <input type="number" id="kare-kenar" placeholder="Örn: 40">
                    </div>
                    
                    <div class="form-group kare-fields" style="display: none;">
                        <label for="kare-et">Et Kalınlığı (mm):</label>
                        <input type="number" id="kare-et" placeholder="Örn: 2">
                    </div>
                    
                    <div class="form-group dikdortgen-fields" style="display: none;">
                        <label for="dikdortgen-en">En (mm):</label>
                        <input type="number" id="dikdortgen-en" placeholder="Örn: 40">
                    </div>
                    
                    <div class="form-group dikdortgen-fields" style="display: none;">
                        <label for="dikdortgen-boy">Boy (mm):</label>
                        <input type="number" id="dikdortgen-boy" placeholder="Örn: 60">
                    </div>
                    
                    <div class="form-group dikdortgen-fields" style="display: none;">
                        <label for="dikdortgen-et">Et Kalınlığı (mm):</label>
                        <input type="number" id="dikdortgen-et" placeholder="Örn: 2">
                    </div>
                    
                    <div class="form-group">
                        <label for="bbh-uzunluk">Uzunluk (m):</label>
                        <input type="number" id="bbh-uzunluk" placeholder="Örn: 6">
                    </div>
                    
                    <div class="form-group">
                        <label for="bbh-adet">Adet:</label>
                        <input type="number" id="bbh-adet" placeholder="Örn: 1">
                    </div>
                    
                    <div class="form-group">
                        <button id="bbh-calculate" class="calculate-btn">Hesapla</button>
                    </div>
                    
                    <div id="bbh-result" class="result-area">
                        <p>Sonuç burada gösterilecek...</p>
                    </div>
                </div>
            </div>
        `;
        
        document.body.appendChild(calculatorElement);
        
        // Show calculator with animation
        setTimeout(() => {
            calculatorElement.classList.add('show');
        }, 10);
        
        // Close button click
        calculatorElement.querySelector('.close-btn').addEventListener('click', function() {
            calculatorElement.classList.remove('show');
            setTimeout(() => {
                document.body.removeChild(calculatorElement);
            }, 300);
        });
        
        // Type change event
        const bbhType = calculatorElement.querySelector('#bbh-type');
        const boruFields = calculatorElement.querySelectorAll('.boru-fields');
        const kareFields = calculatorElement.querySelectorAll('.kare-fields');
        const dikdortgenFields = calculatorElement.querySelectorAll('.dikdortgen-fields');
        
        bbhType.addEventListener('change', function() {
            const selectedType = this.value;
            
            // Hide all fields first
            boruFields.forEach(field => field.style.display = 'none');
            kareFields.forEach(field => field.style.display = 'none');
            dikdortgenFields.forEach(field => field.style.display = 'none');
            
            // Show fields based on selected type
            switch(selectedType) {
                case 'boru':
                    boruFields.forEach(field => field.style.display = 'block');
                    break;
                case 'kare':
                    kareFields.forEach(field => field.style.display = 'block');
                    break;
                case 'dikdortgen':
                    dikdortgenFields.forEach(field => field.style.display = 'block');
                    break;
            }
        });
        
        // Calculate button click
        calculatorElement.querySelector('#bbh-calculate').addEventListener('click', function() {
            calculateBBH(calculatorElement);
        });
    }
    
    // BBH Hesaplama fonksiyonu
    function calculateBBH(container) {
        const type = container.querySelector('#bbh-type').value;
        const uzunluk = parseFloat(container.querySelector('#bbh-uzunluk').value) || 0;
        const adet = parseInt(container.querySelector('#bbh-adet').value) || 0;
        const resultArea = container.querySelector('#bbh-result');
        
        let cevre = 0;
        let alan = 0;
        let hacim = 0;
        let agirlik = 0;
        
        // Çelik yoğunluğu (kg/m³)
        const yogunluk = 7850;
        
        switch(type) {
            case 'boru':
                const boruCap = parseFloat(container.querySelector('#boru-cap').value) || 0;
                const boruEt = parseFloat(container.querySelector('#boru-et').value) || 0;
                
                // Boru için hesaplamalar
                const disCap = boruCap;
                const icCap = boruCap - (2 * boruEt);
                
                cevre = Math.PI * disCap / 1000; // metre cinsinden çevre
                const disAlan = Math.PI * Math.pow(disCap/2, 2) / 1000000; // m² cinsinden dış alan
                const icAlan = Math.PI * Math.pow(icCap/2, 2) / 1000000; // m² cinsinden iç alan
                alan = disAlan - icAlan; // m² cinsinden kesit alanı
                break;
                
            case 'kare':
                const kareKenar = parseFloat(container.querySelector('#kare-kenar').value) || 0;
                const kareEt = parseFloat(container.querySelector('#kare-et').value) || 0;
                
                // Kare için hesaplamalar
                cevre = 4 * kareKenar / 1000; // metre cinsinden çevre
                const disAlanKare = Math.pow(kareKenar, 2) / 1000000; // m² cinsinden dış alan
                const icAlanKare = Math.pow(kareKenar - (2 * kareEt), 2) / 1000000; // m² cinsinden iç alan
                alan = disAlanKare - icAlanKare; // m² cinsinden kesit alanı
                break;
                
            case 'dikdortgen':
                const dikdortgenEn = parseFloat(container.querySelector('#dikdortgen-en').value) || 0;
                const dikdortgenBoy = parseFloat(container.querySelector('#dikdortgen-boy').value) || 0;
                const dikdortgenEt = parseFloat(container.querySelector('#dikdortgen-et').value) || 0;
                
                // Dikdörtgen için hesaplamalar
                cevre = 2 * (dikdortgenEn + dikdortgenBoy) / 1000; // metre cinsinden çevre
                const disAlanDikdortgen = (dikdortgenEn * dikdortgenBoy) / 1000000; // m² cinsinden dış alan
                const icAlanDikdortgen = ((dikdortgenEn - (2 * dikdortgenEt)) * (dikdortgenBoy - (2 * dikdortgenEt))) / 1000000; // m² cinsinden iç alan
                alan = disAlanDikdortgen - icAlanDikdortgen; // m² cinsinden kesit alanı
                break;
        }
        
        // Hacim ve ağırlık hesaplamaları
        hacim = alan * uzunluk; // m³ cinsinden hacim
        agirlik = hacim * yogunluk; // kg cinsinden ağırlık
        
        // Toplam ağırlık
        const toplamAgirlik = agirlik * adet;
        
        // Sonuçları göster
        resultArea.innerHTML = `
            <div class="result-item">
                <span class="result-label">Kesit Alanı:</span>
                <span class="result-value">${alan.toFixed(6)} m²</span>
            </div>
            <div class="result-item">
                <span class="result-label">Birim Ağırlık:</span>
                <span class="result-value">${agirlik.toFixed(3)} kg/adet</span>
            </div>
            <div class="result-item">
                <span class="result-label">Toplam Ağırlık:</span>
                <span class="result-value">${toplamAgirlik.toFixed(3)} kg</span>
            </div>
        `;
    }
});
