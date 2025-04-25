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
                case 'retin-yardim':
                    // Retin Takip sayfasına yönlendirme
                    window.open('https://yunus553511.github.io/-retin-takip/?nocache=' + Math.random(), '_blank');
                    break;
                case 'pdf':
                    // PDF tuşu - Google Drive'a yönlendirme
                    window.open('https://drive.google.com/drive/u/2/folders/1oq56oGkpRUYvNBOSHMAVINr-zouw00zM', '_blank');
                    break;
                case 'info':
                    // Bilgi tuşu - Google Sheets'e yönlendirme
                    window.open('https://yunus553511.github.io/kal-p-rapor/');
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
        
        featuredContent.innerHTML = `
            <div class="animated-border"></div>
            <div class="category-content">${content}</div>
            <div class="arrow-up">
                <i class="fas fa-chevron-down"></i>
            </div>
        `;
        
        // Arrow up functionality for the new content
        document.querySelector('.arrow-up').addEventListener('click', function() {
            featuredCard.classList.toggle('expanded');
            if (featuredCard.classList.contains('expanded')) {
                this.innerHTML = '<i class="fas fa-chevron-down"></i>';
            } else {
                this.innerHTML = '<i class="fas fa-chevron-up"></i>';
            }
        });
    }
    
    // Detaylı mesaj gösterme fonksiyonu
    function showDetailedMessage(title, message) {
        const messageContainer = document.createElement('div');
        messageContainer.classList.add('detailed-message');
        
        messageContainer.innerHTML = `
            <div class="message-content">
                <div class="message-header">
                    <h3>${title}</h3>
                    <button class="close-btn"><i class="fas fa-times"></i></button>
                </div>
                <div class="message-body">
                    <p>${message}</p>
                </div>
            </div>
        `;
        
        document.body.appendChild(messageContainer);
        
        // Show message with animation
        setTimeout(() => {
            messageContainer.classList.add('show');
        }, 10);
        
        // Close button functionality
        messageContainer.querySelector('.close-btn').addEventListener('click', function() {
            messageContainer.classList.remove('show');
            setTimeout(() => {
                document.body.removeChild(messageContainer);
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
    
    carousel.addEventListener('touchend', function() {
        if (!isSwiping) return;
        handleSwipe();
        isSwiping = false;
    });
    
    function handleSwipe() {
        const diffX = touchStartX - touchEndX;
        const threshold = 50; // minimum distance to be considered as swipe
        
        if (diffX > threshold) {
            // Swipe left - go to next slide
            if (currentIndex < maxIndex) {
                currentIndex++;
                updateCarousel();
            }
        } else if (diffX < -threshold) {
            // Swipe right - go to previous slide
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
            // Recalculate visible items
            const newVisibleItems = window.innerWidth < 768 ? 1 : 3;
            if (newVisibleItems !== visibleItems) {
                visibleItems = newVisibleItems;
                updateCarousel();
            }
        }, 300);
    });
    
    // BBH Hesaplama Formu
    function showBBHCalculator() {
        const calculatorContainer = document.createElement('div');
        calculatorContainer.classList.add('bbh-calculator');
        
        calculatorContainer.innerHTML = `
            <div class="calculator-content">
                <div class="calculator-header">
                    <h3>BBH HESAPLAMA</h3>
                    <button class="close-btn"><i class="fas fa-times"></i></button>
                </div>
                <div class="calculator-body">
                    <div class="input-group">
                        <label for="bbh-type">Hesaplama Türü:</label>
                        <select id="bbh-type">
                            <option value="boru">Boru Profil</option>
                            <option value="kare">Kare Profil</option>
                            <option value="kosebent">Köşebent</option>
                            <option value="kutu">Kutu Profil</option>
                            <option value="lama">Lama</option>
                            <option value="t">T Profil</option>
                            <option value="u">U Profil</option>
                        </select>
                    </div>
                    
                    <div class="input-group" id="boru-inputs">
                        <label for="boru-cap">Çap (mm):</label>
                        <input type="number" id="boru-cap" placeholder="Örn: 50">
                        
                        <label for="boru-et">Et Kalınlığı (mm):</label>
                        <input type="number" id="boru-et" placeholder="Örn: 2">
                        
                        <label for="boru-boy">Boy (m):</label>
                        <input type="number" id="boru-boy" placeholder="Örn: 6">
                    </div>
                    
                    <div class="input-group" id="kare-inputs" style="display: none;">
                        <label for="kare-kenar">Kenar (mm):</label>
                        <input type="number" id="kare-kenar" placeholder="Örn: 40">
                        
                        <label for="kare-et">Et Kalınlığı (mm):</label>
                        <input type="number" id="kare-et" placeholder="Örn: 2">
                        
                        <label for="kare-boy">Boy (m):</label>
                        <input type="number" id="kare-boy" placeholder="Örn: 6">
                    </div>
                    
                    <div class="input-group" id="kosebent-inputs" style="display: none;">
                        <label for="kosebent-kenar1">Kenar 1 (mm):</label>
                        <input type="number" id="kosebent-kenar1" placeholder="Örn: 40">
                        
                        <label for="kosebent-kenar2">Kenar 2 (mm):</label>
                        <input type="number" id="kosebent-kenar2" placeholder="Örn: 40">
                        
                        <label for="kosebent-et">Et Kalınlığı (mm):</label>
                        <input type="number" id="kosebent-et" placeholder="Örn: 4">
                        
                        <label for="kosebent-boy">Boy (m):</label>
                        <input type="number" id="kosebent-boy" placeholder="Örn: 6">
                    </div>
                    
                    <div class="input-group" id="kutu-inputs" style="display: none;">
                        <label for="kutu-en">En (mm):</label>
                        <input type="number" id="kutu-en" placeholder="Örn: 40">
                        
                        <label for="kutu-boy">Boy (mm):</label>
                        <input type="number" id="kutu-boy" placeholder="Örn: 60">
                        
                        <label for="kutu-et">Et Kalınlığı (mm):</label>
                        <input type="number" id="kutu-et" placeholder="Örn: 2">
                        
                        <label for="kutu-uzunluk">Uzunluk (m):</label>
                        <input type="number" id="kutu-uzunluk" placeholder="Örn: 6">
                    </div>
                    
                    <button class="calculate-btn">HESAPLA</button>
                    
                    <div class="result-container">
                        <div class="result-item">
                            <span class="result-label">Birim Ağırlık:</span>
                            <span class="result-value" id="birim-agirlik">-</span>
                            <span class="result-unit">kg/m</span>
                        </div>
                        <div class="result-item">
                            <span class="result-label">Toplam Ağırlık:</span>
                            <span class="result-value" id="toplam-agirlik">-</span>
                            <span class="result-unit">kg</span>
                        </div>
                    </div>
                </div>
            </div>
        `;
        
        document.body.appendChild(calculatorContainer);
        
        // Show calculator with animation
        setTimeout(() => {
            calculatorContainer.classList.add('show');
        }, 10);
        
        // Close button functionality
        calculatorContainer.querySelector('.close-btn').addEventListener('click', function() {
            calculatorContainer.classList.remove('show');
            setTimeout(() => {
                document.body.removeChild(calculatorContainer);
            }, 300);
        });
        
        // Change input fields based on profile type
        const bbhType = calculatorContainer.querySelector('#bbh-type');
        bbhType.addEventListener('change', function() {
            const profileType = this.value;
            
            // Hide all input groups
            const inputGroups = calculatorContainer.querySelectorAll('.input-group[id$="-inputs"]');
            inputGroups.forEach(group => {
                group.style.display = 'none';
            });
            
            // Show selected input group
            calculatorContainer.querySelector(`#${profileType}-inputs`).style.display = 'block';
        });
        
        // Calculate button functionality
        calculatorContainer.querySelector('.calculate-btn').addEventListener('click', function() {
            calculateBBH(calculatorContainer);
        });
    }
    
    // BBH Hesaplama fonksiyonu
    function calculateBBH(container) {
        const profileType = container.querySelector('#bbh-type').value;
        let birimAgirlik = 0;
        let toplamAgirlik = 0;
        
        // Çelik yoğunluğu (kg/m³)
        const celikYogunluk = 7850;
        
        switch(profileType) {
            case 'boru':
                const boruCap = parseFloat(container.querySelector('#boru-cap').value);
                const boruEt = parseFloat(container.querySelector('#boru-et').value);
                const boruBoy = parseFloat(container.querySelector('#boru-boy').value);
                
                if (isNaN(boruCap) || isNaN(boruEt) || isNaN(boruBoy)) {
                    showMessage('Lütfen tüm değerleri doğru formatta giriniz.');
                    return;
                }
                
                // Boru profil hesaplama formülü
                const disCap = boruCap / 1000; // m cinsinden
                const icCap = (boruCap - 2 * boruEt) / 1000; // m cinsinden
                
                birimAgirlik = celikYogunluk * Math.PI * (Math.pow(disCap, 2) - Math.pow(icCap, 2)) / 4;
                toplamAgirlik = birimAgirlik * boruBoy;
                break;
                
            case 'kare':
                const kareKenar = parseFloat(container.querySelector('#kare-kenar').value);
                const kareEt = parseFloat(container.querySelector('#kare-et').value);
                const kareBoy = parseFloat(container.querySelector('#kare-boy').value);
                
                if (isNaN(kareKenar) || isNaN(kareEt) || isNaN(kareBoy)) {
                    showMessage('Lütfen tüm değerleri doğru formatta giriniz.');
                    return;
                }
                
                // Kare profil hesaplama formülü
                const disKenar = kareKenar / 1000; // m cinsinden
                const icKenar = (kareKenar - 2 * kareEt) / 1000; // m cinsinden
                
                birimAgirlik = celikYogunluk * (Math.pow(disKenar, 2) - Math.pow(icKenar, 2));
                toplamAgirlik = birimAgirlik * kareBoy;
                break;
                
            // Diğer profil tipleri için hesaplama formülleri eklenecek
            
            default:
                showMessage('Bu profil tipi için hesaplama henüz eklenmedi.');
                return;
        }
        
        // Sonuçları göster
        container.querySelector('#birim-agirlik').textContent = birimAgirlik.toFixed(2);
        container.querySelector('#toplam-agirlik').textContent = toplamAgirlik.toFixed(2);
    }
});
