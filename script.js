document.addEventListener('DOMContentLoaded', function() {
    // Carousel functionality
    const carousel = document.querySelector('.carousel');
    const carouselItems = document.querySelectorAll('.carousel-item');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    
    let currentIndex = 0;
    let itemWidth = carouselItems[0].offsetWidth + 20; // Width + gap
    let visibleItems = Math.floor(carousel.offsetWidth / itemWidth);
    let maxIndex = carouselItems.length - visibleItems;
    
    // Update carousel position
    function updateCarousel() {
        carousel.style.transform = `translateX(-${currentIndex * itemWidth}px)`;
    }
    
    // Next button click
    nextBtn.addEventListener('click', function() {
        if (currentIndex < maxIndex) {
            currentIndex++;
            updateCarousel();
        } else {
            // Elastic effect when reaching the end
            carousel.style.transform = `translateX(-${currentIndex * itemWidth + 30}px)`;
            setTimeout(() => {
                carousel.style.transform = `translateX(-${currentIndex * itemWidth}px)`;
            }, 300);
        }
        createClickEffect(this);
    });
    
    // Previous button click
    prevBtn.addEventListener('click', function() {
        if (currentIndex > 0) {
            currentIndex--;
            updateCarousel();
        } else {
            // Elastic effect when reaching the start
            carousel.style.transform = `translateX(30px)`;
            setTimeout(() => {
                carousel.style.transform = `translateX(0px)`;
            }, 300);
        }
        createClickEffect(this);
    });
    
    // Click effect for all interactive elements
    function createClickEffect(element) {
        const effect = document.createElement('div');
        effect.classList.add('click-effect');
        
        const rect = element.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        
        effect.style.width = effect.style.height = `${size}px`;
        effect.style.left = `${rect.width / 2}px`;
        effect.style.top = `${rect.height / 2}px`;
        
        element.appendChild(effect);
        
        setTimeout(() => {
            effect.remove();
        }, 600);
    }
    
    // Add click effect to all interactive elements
    const interactiveElements = document.querySelectorAll('.card, .control-item, .arrow-up');
    interactiveElements.forEach(element => {
        element.addEventListener('click', function() {
            createClickEffect(this);
        });
    });
    
    // Resize handling
    window.addEventListener('resize', function() {
        // Recalculate dimensions
        itemWidth = carouselItems[0].offsetWidth + 20;
        visibleItems = Math.floor(carousel.offsetWidth / itemWidth);
        maxIndex = carouselItems.length - visibleItems;
        
        // Adjust current index if needed
        if (currentIndex > maxIndex) {
            currentIndex = maxIndex > 0 ? maxIndex : 0;
        }
        
        updateCarousel();
    });
    
    // Arrow up functionality
    const arrowUp = document.querySelector('.arrow-up');
    arrowUp.addEventListener('click', function() {
        window.scrollTo({ top: 0, behavior: 'smooth' });
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
    
    // Mesaj gösterme fonksiyonu
    function showMessage(message) {
        // Eğer zaten bir mesaj gösteriliyorsa, onu kaldır
        const existingMessage = document.querySelector('.message-popup');
        if (existingMessage) {
            existingMessage.remove();
        }
        
        // Yeni mesaj oluştur
        const messageElement = document.createElement('div');
        messageElement.classList.add('message-popup');
        messageElement.textContent = message;
        
        // Kapatma butonu ekle
        const closeButton = document.createElement('span');
        closeButton.classList.add('close-message');
        closeButton.innerHTML = '&times;';
        closeButton.addEventListener('click', function() {
            messageElement.remove();
        });
        
        messageElement.appendChild(closeButton);
        document.body.appendChild(messageElement);
        
        // 3 saniye sonra otomatik kapat
        setTimeout(() => {
            if (document.body.contains(messageElement)) {
                messageElement.remove();
            }
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
        let categoryTitle = '';
        let categoryMessage = '';
        
        switch(category) {
            case 'haber-bulteni':
                // Haber Bülteni - Google Drive dosyasına yönlendirme
                window.open('https://drive.google.com/file/d/1tm65kEzEObA_msKV9kCzuJZV7Rwm9hga/view?usp=drive_link', '_blank');
                return; // Mesaj gösterme, sadece yönlendir
            case 'yeni-profiller':
                // Yeni Profiller - Google Sheets'e yönlendirme
                window.open('https://docs.google.com/spreadsheets/d/1RD4vkyNM9pCzxvARe6qnlZZENnWHNOTj/edit?gid=1171347689#gid=1171347689', '_blank');
                return; // Mesaj gösterme, sadece yönlendir
            case 'yedek-kaliplar':
                // Yedek Kalıplar - Google Sheets'e yönlendirme
                window.open('https://docs.google.com/spreadsheets/d/1RD4vkyNM9pCzxvARe6qnlZZENnWHNOTj/edit?gid=2092001752#gid=2092001752', '_blank');
                return; // Mesaj gösterme, sadece yönlendir
            case 'hurda-kaliplar':
                // Hurda Kalıplar - Google Sheets'e yönlendirme
                window.open('https://docs.google.com/spreadsheets/d/1RD4vkyNM9pCzxvARe6qnlZZENnWHNOTj/edit?gid=1476963935#gid=1476963935', '_blank');
                return; // Mesaj gösterme, sadece yönlendir
            case 'kalip-harcamalari':
                // Kalıp Harcamaları - Google Drive dosyasına yönlendirme
                window.open('https://drive.google.com/file/d/1VzaM3gKgGwATZ7J5JPu3ZIhBS4hqMeNv/view?usp=drive_link', '_blank');
                return; // Mesaj gösterme, sadece yönlendir
            case 'boru-profilleri':
                // Boru Profilleri - Google Drive dosyasına yönlendirme
                window.open('https://drive.google.com/file/d/14qe-UVoxEhX8MRi46Z7IRlGXnsaoz1Sz/view?usp=drive_link', '_blank');
                return; // Mesaj gösterme, sadece yönlendir
            case 'kare-profilleri':
                // Kare Profilleri - Google Drive dosyasına yönlendirme
                window.open('https://drive.google.com/file/d/1cQbuPqRgbdKQquUWT_xd43r7h9QMyMFq/view?usp=drive_link', '_blank');
                return; // Mesaj gösterme, sadece yönlendir
            case 'kosebent-profilleri':
                // Köşebent Profilleri - Google Drive dosyasına yönlendirme
                window.open('https://drive.google.com/file/d/10MKk4dfusl2QzwzoZJhbc0Td8K2jCuD0/view?usp=drive_link', '_blank');
                return; // Mesaj gösterme, sadece yönlendir
            case 'kutu-profilleri':
                // Kutu Profilleri - Google Drive dosyasına yönlendirme
                window.open('https://drive.google.com/file/d/1mV2nMtdJQVCAdxBc3hOluDO-_VNcMpvw/view?usp=drive_link', '_blank');
                return; // Mesaj gösterme, sadece yönlendir
            case 'lama-profilleri':
                // Lama Profilleri - Google Drive dosyasına yönlendirme
                window.open('https://drive.google.com/file/d/1u_Z0asmVnMRXYjawcgfAs1u4h7cukzDJ/view?usp=drive_link', '_blank');
                return; // Mesaj gösterme, sadece yönlendir
            case 't-profilleri':
                // T Profilleri - Google Drive dosyasına yönlendirme
                window.open('https://drive.google.com/file/d/158SZjN5jWmPe4s3Fl59qZAuUe2BwoCce/view?usp=drive_link', '_blank');
                return; // Mesaj gösterme, sadece yönlendir
            case 'u-profilleri':
                // U Profilleri - Google Drive dosyasına yönlendirme
                window.open('https://drive.google.com/file/d/1N3tFgxmDZ5IS54FiBgQV4EZgdUmv0LiI/view?usp=drive_link', '_blank');
                return; // Mesaj gösterme, sadece yönlendir
            default:
                categoryTitle = 'BİLGİ';
                categoryMessage = 'Bu kategori için henüz içerik eklenmemiştir.';
                break;
        }
    }
    
    // Detaylı mesaj gösterme fonksiyonu
    function showDetailedMessage(title, message) {
        // Eğer zaten bir mesaj gösteriliyorsa, onu kaldır
        const existingMessage = document.querySelector('.detailed-popup');
        if (existingMessage) {
            existingMessage.remove();
        }
        
        // Yeni detaylı mesaj oluştur
        const messageElement = document.createElement('div');
        messageElement.classList.add('detailed-popup');
        
        const titleElement = document.createElement('h3');
        titleElement.textContent = title;
        
        const contentElement = document.createElement('p');
        contentElement.textContent = message;
        
        // Kapatma butonu ekle
        const closeButton = document.createElement('span');
        closeButton.classList.add('close-message');
        closeButton.innerHTML = '&times;';
        closeButton.addEventListener('click', function() {
            messageElement.remove();
        });
        
        messageElement.appendChild(closeButton);
        messageElement.appendChild(titleElement);
        messageElement.appendChild(contentElement);
        document.body.appendChild(messageElement);
    }
    
    // Enhanced Mobile touch support for carousel
    let touchStartX = 0;
    let touchEndX = 0;
    let isSwiping = false;
    
    carousel.addEventListener('touchstart', function(e) {
        touchStartX = e.changedTouches[0].screenX;
        isSwiping = true;
    }, { passive: true });
    
    carousel.addEventListener('touchmove', function(e) {
        if (!isSwiping) return;
        
        const currentX = e.changedTouches[0].screenX;
        const diff = currentX - touchStartX;
        
        // Prevent default only when swiping horizontally
        if (Math.abs(diff) > 10) {
            e.preventDefault();
        }
    }, { passive: false });
    
    carousel.addEventListener('touchend', function(e) {
        if (!isSwiping) return;
        
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
        isSwiping = false;
    }, { passive: true });
    
    function handleSwipe() {
        const swipeThreshold = 50;
        if (touchEndX < touchStartX - swipeThreshold) {
            // Swipe left - go to next
            if (currentIndex < maxIndex) {
                currentIndex++;
                updateCarousel();
            }
        } else if (touchEndX > touchStartX + swipeThreshold) {
            // Swipe right - go to previous
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
            // Recalculate dimensions
            itemWidth = carouselItems[0].offsetWidth + 20;
            visibleItems = Math.floor(carousel.offsetWidth / itemWidth);
            maxIndex = carouselItems.length - visibleItems;
            
            // Adjust current index if needed
            if (currentIndex > maxIndex) {
                currentIndex = maxIndex > 0 ? maxIndex : 0;
            }
            
            updateCarousel();
        }, 200);
    });
    
    // Initial carousel setup
    updateCarousel();
    
    // BBH Hesaplama Formu
    function showBBHCalculator() {
        // Eğer zaten bir hesaplama formu gösteriliyorsa, onu kaldır
        const existingCalculator = document.querySelector('.bbh-calculator');
        if (existingCalculator) {
            existingCalculator.remove();
            return;
        }
        
        // Yeni hesaplama formu oluştur
        const calculatorElement = document.createElement('div');
        calculatorElement.classList.add('bbh-calculator');
        
        // Form başlığı
        const titleElement = document.createElement('h3');
        titleElement.textContent = 'BBH Hesaplama';
        calculatorElement.appendChild(titleElement);
        
        // Form içeriği
        const formContent = document.createElement('div');
        formContent.classList.add('calculator-content');
        
        // Parametreler ve giriş alanları
        const parameters = [
            { id: 'pres', label: 'PRES', value: '5', type: 'select', options: ['5', '7', '9'] },
            { id: 'sorti', label: 'SORTİ', value: '1', type: 'number' },
            { id: 'gramaj', label: 'GRAMAJ', value: '1', type: 'number' },
            { id: 'siparisBoy', label: 'SİPARİŞ BOYU (m)', value: '6', type: 'number' },
            { id: 'boyAdet', label: 'BOY ADETİ', value: '1', type: 'number' },
            { id: 'fire', label: 'FİRE (m)', value: '2.5', type: 'number' },
            { id: 'araIs', label: 'ARA İŞ (mm)', value: '30', type: 'number' }
        ];
        
        // Parametreleri forma ekle
        parameters.forEach(param => {
            const paramRow = document.createElement('div');
            paramRow.classList.add('param-row');
            
            const paramLabel = document.createElement('label');
            paramLabel.textContent = param.label;
            paramLabel.setAttribute('for', param.id);
            
            let paramInput;
            
            if (param.type === 'select') {
                paramInput = document.createElement('select');
                paramInput.id = param.id;
                param.options.forEach(option => {
                    const optionElement = document.createElement('option');
                    optionElement.value = option;
                    optionElement.textContent = option;
                    paramInput.appendChild(optionElement);
                });
            } else {
                paramInput = document.createElement('input');
                paramInput.type = param.type;
                paramInput.id = param.id;
                paramInput.value = param.value;
                paramInput.step = '0.1'; // Ondalık sayılar için izin ver
            }
            
            // Giriş değeri değiştiğinde hesaplamayı yeniden yap
            paramInput.addEventListener('change', calculateBBH);
            paramInput.addEventListener('input', calculateBBH);
            
            paramRow.appendChild(paramLabel);
            paramRow.appendChild(paramInput);
            formContent.appendChild(paramRow);
        });
        
        // Sonuç alanı
        const resultRow = document.createElement('div');
        resultRow.classList.add('result-row');
        
        const resultLabel = document.createElement('label');
        resultLabel.textContent = 'SONUÇ:';
        
        const resultValue = document.createElement('div');
        resultValue.id = 'bbh-result';
        resultValue.classList.add('result-value');
        resultValue.textContent = '0 mm';
        
        resultRow.appendChild(resultLabel);
        resultRow.appendChild(resultValue);
        formContent.appendChild(resultRow);
        
        // Durum mesajı alanı
        const statusRow = document.createElement('div');
        statusRow.classList.add('status-row');
        
        const statusMessage = document.createElement('div');
        statusMessage.id = 'status-message';
        statusMessage.classList.add('status-message');
        
        statusRow.appendChild(statusMessage);
        formContent.appendChild(statusRow);
        
        // Hesapla butonu
        const calculateButton = document.createElement('button');
        calculateButton.textContent = 'HESAPLA';
        calculateButton.classList.add('calculate-button');
        calculateButton.addEventListener('click', calculateBBH);
        formContent.appendChild(calculateButton);
        
        // Kapatma butonu
        const closeButton = document.createElement('span');
        closeButton.classList.add('close-calculator');
        closeButton.innerHTML = '&times;';
        closeButton.addEventListener('click', function() {
            calculatorElement.remove();
        });
        
        calculatorElement.appendChild(closeButton);
        calculatorElement.appendChild(formContent);
        document.body.appendChild(calculatorElement);
        
        // İlk hesaplamayı yap
        calculateBBH();
    }
    
    // BBH Hesaplama fonksiyonu
    function calculateBBH() {
        // Parametreleri al
        const pres = parseFloat(document.getElementById('pres').value);
        const sorti = parseFloat(document.getElementById('sorti').value);
        const gramaj = parseFloat(document.getElementById('gramaj').value);
        const siparisBoy = parseFloat(document.getElementById('siparisBoy').value);
        const boyAdet = parseFloat(document.getElementById('boyAdet').value);
        const fire = parseFloat(document.getElementById('fire').value);
        const araIs = parseFloat(document.getElementById('araIs').value);
        
        // Hesaplama
        // (((SİPARİŞ BOYU)X(BOY ADETİ)+FİRE)XSORTİXGRAMAJ))/((PRESX25.4)/2) KARESİ X2.71XPİ)/1000000 + ARA İŞ
        const pi = Math.PI;
        const presCarpan = (pres * 25.4) / 2;
        const toplamBoy = (siparisBoy * boyAdet) + fire;
        const hesaplama = ((toplamBoy * sorti * gramaj) / (Math.pow(presCarpan, 2) * 2.71 * pi)) * 1000000;
        const sonuc = hesaplama + araIs;
        
        // Sonuç gösterimi
        const resultElement = document.getElementById('bbh-result');
        resultElement.textContent = sonuc.toFixed(2) + ' mm';
        
        // Durum kontrolleri
        const statusElement = document.getElementById('status-message');
        
        // Konveyör boyu kontrolü
        if (toplamBoy > 47) {
            statusElement.textContent = 'KONVEYÖR BOYU AŞILDI ÜRETİM SAĞLANAMAZ!';
            statusElement.className = 'status-message error';
            return;
        }
        
        // Pres değerine göre biyet boyu kontrolü
        let biyetBoyu;
        switch(pres) {
            case 5:
                biyetBoyu = 670;
                break;
            case 7:
                biyetBoyu = 1000;
                break;
            case 9:
                biyetBoyu = 1295;
                break;
            default:
                biyetBoyu = 670; // Varsayılan olarak 5 için
        }
        
        if (sonuc > biyetBoyu) {
            statusElement.textContent = 'BİYET BOYU AŞILDI İSTENİLEN METREDE ÜRETİLEMEZ';
            statusElement.className = 'status-message error';
        } else {
            statusElement.textContent = 'İSTENİLEN METREDE ÜRETİLEBİLİR';
            statusElement.className = 'status-message success';
        }
    }
});
