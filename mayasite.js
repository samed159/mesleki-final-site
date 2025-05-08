
       
        document.addEventListener('DOMContentLoaded', function() {
            
            setupActionButtons();
            setupNavigation();
            setupFilters();
            setupLiveUpdates();
            setupNotifications();
        });
        
      
        function setupActionButtons() {
          
            const actionButtons = document.querySelectorAll('.action-button');
            
           
            actionButtons.forEach(button => {
                button.addEventListener('click', function() {
                    const buttonText = this.textContent.trim();
                    
                    if (buttonText.includes('İstatistikler') || buttonText.includes('Detaylı İstatistikler')) {
                        showStatistics(this);
                    } else if (buttonText.includes('İzle') || buttonText.includes('Canlı İzle')) {
                        openLiveStream(this);
                    } else if (buttonText.includes('Maç Özeti')) {
                        showMatchHighlights(this);
                    } else if (buttonText.includes('Hatırlatıcı Kur')) {
                        setReminder(this);
                    } else if (buttonText.includes('Tahmin Yap')) {
                        openPredictionModal(this);
                    }
                });
            });
        }
        
        
        function setupNavigation() {
            const navLinks = document.querySelectorAll('nav ul li a');
            
            navLinks.forEach(link => {
                link.addEventListener('click', function(e) {
                    e.preventDefault();
                  
                  
                    navLinks.forEach(l => l.classList.remove('active'));
                    
                   
                    this.classList.add('active');
                    
                  
                    const page = this.textContent.trim();
                    loadPageContent(page);
                });
            });
        }
        
        
        function setupFilters() {
            const filterButton = document.getElementById('apply-filters');
            
            filterButton.addEventListener('click', function() {
                const leagueFilter = document.getElementById('league-filter').value;
                const statusFilter = document.getElementById('status-filter').value;
                const dateFilter = document.getElementById('date-filter').value;
                
              
                filterMatches(leagueFilter, statusFilter, dateFilter);
            });
        }
        
       
        function setupLiveUpdates() {
            
            
        
        
            setInterval(updateLiveMatches, 30000);
        }
        
     
        function setupNotifications() {
            
            if (Notification.permission !== 'granted' && Notification.permission !== 'denied') {
                document.querySelector('.banner').insertAdjacentHTML('beforeend', 
                    '<button id="enable-notifications" style="margin-top: 15px; padding: 8px 15px; background-color: var(--accent-color); color: white; border: none; border-radius: 4px; cursor: pointer;">Bildirimleri Etkinleştir</button>'
                );
                
                document.getElementById('enable-notifications').addEventListener('click', function() {
                    requestNotificationPermission();
                });
            }
        }
        
       
        function showStatistics(button) {
           
            const matchCard = button.closest('.match-card') || button.closest('.featured-match');
            const teams = matchCard.querySelectorAll('.team-name');
            const homeTeam = teams[0].textContent;
            const awayTeam = teams[1].textContent;
            
            
        
          
            alert(`${homeTeam} vs ${awayTeam} maçının detaylı istatistikleri gösteriliyor...`);
            
           
            window.location.href = `#statistics?match=${homeTeam}-${awayTeam}`;
        }
       
       
        function openLiveStream(button) {
           
            const matchCard = button.closest('.match-card') || button.closest('.featured-match');
            const teams = matchCard.querySelectorAll('.team-name');
            const homeTeam = teams[0].textContent;
            const awayTeam = teams[1].textContent;
            
            
            
            
            alert(`${homeTeam} vs ${awayTeam} maçının canlı yayını açılıyor...`);
            
          
            window.location.href = `#live-stream?match=${homeTeam}-${awayTeam}`;
        }
        
        
        function showMatchHighlights(button) {
           
            const matchCard = button.closest('.match-card') || button.closest('.featured-match');
            const teams = matchCard.querySelectorAll('.team-name');
            const homeTeam = teams[0].textContent;
            const awayTeam = teams[1].textContent;
            
            
        
          
            alert(`${homeTeam} vs ${awayTeam} maçının özeti gösteriliyor...`);
            
           
            window.location.href = `#highlights?match=${homeTeam}-${awayTeam}`;
        }
        
       
        function setReminder(button) {
           
            const matchCard = button.closest('.match-card');
            const teams = matchCard.querySelectorAll('.team-name');
            const homeTeam = teams[0].textContent;
            const awayTeam = teams[1].textContent;
            const matchTime = matchCard.querySelector('.match-time span').textContent;
            
           
            const reminderTime = prompt(`${homeTeam} vs ${awayTeam} maçı için hatırlatıcı kurmak istediğiniz zamanı seçin:\n1) Maçtan 1 saat önce\n2) Maçtan 30 dakika önce\n3) Maç başladığında`, "2");
            
            if (reminderTime) {
                
                alert(`Hatırlatıcı kuruldu! ${homeTeam} vs ${awayTeam} maçı için bildirim alacaksınız.`);
                
               
                button.innerHTML = '<span>✓</span> Hatırlatıcı Kuruldu';
                button.style.color = '#4CAF50';
            }
        }
        
       
        function openPredictionModal(button) {
          
            const matchCard = button.closest('.match-card');
            const teams = matchCard.querySelectorAll('.team-name');
            const homeTeam = teams[0].textContent;
            const awayTeam = teams[1].textContent;
            
           
            const prediction = prompt(`${homeTeam} vs ${awayTeam} maçı için tahmininizi girin (örn. 2-1):`, "");
            
            if (prediction) {
                
                alert(`Tahmininiz kaydedildi: ${homeTeam} ${prediction} ${awayTeam}`);
                
               
                button.innerHTML = `<span>✓</span> Tahmin: ${prediction}`;
                button.style.color = '#4CAF50';
            }
        }
        
      
        function loadPageContent(page) {
           
            console.log(`${page} sayfası yükleniyor...`);
            
            
            window.location.hash = page.toLowerCase().replace(' ', '-');
            
            
            document.title = `FutbolCanlı - ${page}`;
        }
        
        
        function filterMatches(league, status, date) {
            console.log(`Filtreler uygulanıyor: Lig=${league}, Durum=${status}, Tarih=${date}`);
            
           
           
           
            alert(`Filtreler uygulandı: ${league !== 'all' ? league : 'Tüm Ligler'}, ${status !== 'all' ? status : 'Tüm Maçlar'}, ${date}`);
            
            
            window.location.hash = `matches?league=${league}&status=${status}&date=${date}`;
        }
        
        
        function updateLiveMatches() {
            console.log('Canlı maçlar güncelleniyor...');
            
            
        
            
            const liveMatches = document.querySelectorAll('.match-card:has(.live-indicator)');
            
            if (liveMatches.length > 0) {
                const randomMatch = liveMatches[Math.floor(Math.random() * liveMatches.length)];
                const scoreElement = randomMatch.querySelector('.score');
                const currentScore = scoreElement.textContent.split(' - ');
                
               
                const randomTeam = Math.floor(Math.random() * 2);
                currentScore[randomTeam] = parseInt(currentScore[randomTeam]) + 1;
                
                
                scoreElement.textContent = `${currentScore[0]} - ${currentScore[1]}`;
                
              
                const minuteElement = randomMatch.querySelector('.match-minute');
                const currentMinute = parseInt(minuteElement.textContent);
                minuteElement.textContent = `${Math.min(currentMinute + 5, 90)}'`;
            
                
                const teams = randomMatch.querySelectorAll('.team-name');
                const scoringTeam = teams[randomTeam].textContent;
                
                showGoalNotification(scoringTeam);
            }
        }
    
        
        function showGoalNotification(team) {
            if (Notification.permission === 'granted') {
                const notification = new Notification('GOL!', {
                    body: `${team} gol attı!`,
                    icon: '/favicon.ico'
                });
                
                
                setTimeout(() => {
                    notification.close();
                }, 5000);
            }
        }
        
        
        function requestNotificationPermission() {
            Notification.requestPermission().then(function(permission) {
                if (permission === 'granted') {
                    alert('Bildirimler etkinleştirildi! Artık gol ve önemli maç olayları hakkında bildirim alacaksınız.');
                    document.getElementById('enable-notifications').remove();
                }
            });
        }
        
        
        function showAuthModal(type) {
            const modalHTML = `
            <div id="auth-modal" style="position: fixed; top: 0; left: 0; right: 0; bottom: 0; background-color: rgba(0,0,0,0.5); display: flex; align-items: center; justify-content: center; z-index: 1000;">
                <div style="background-color: white; border-radius: 8px; padding: 20px; width: 90%; max-width: 400px;">
                    <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px;">
                        <h3 style="margin: 0; color: var(--primary-color);">${type === 'login' ? 'Giriş Yap' : 'Kayıt Ol'}</h3>
                        <button id="close-modal" style="background: none; border: none; font-size: 1.5rem; cursor: pointer;">×</button>
                    </div>
                    <form id="auth-form">
                        ${type === 'register' ? '<div style="margin-bottom: 15px;"><label for="name" style="display: block; margin-bottom: 5px;">Ad Soyad</label><input type="text" id="name" style="width: 100%; padding: 8px; border: 1px solid var(--border-color); border-radius: 4px;" required></div>' : ''}
                        <div style="margin-bottom: 15px;">
                            <label for="email" style="display: block; margin-bottom: 5px;">E-posta</label>
                            <input type="email" id="email" style="width: 100%; padding: 8px; border: 1px solid var(--border-color); border-radius: 4px;" required>
                        </div>
                        <div style="margin-bottom: 20px;">
                            <label for="password" style="display: block; margin-bottom: 5px;">Şifre</label>
                            <input type="password" id="password" style="width: 100%; padding: 8px; border: 1px solid var(--border-color); border-radius: 4px;" required>
                        </div>
                        <button type="submit" style="width: 100%; padding: 10px; background-color: var(--primary-color); color: white; border: none; border-radius: 4px; cursor: pointer;">${type === 'login' ? 'Giriş Yap' : 'Kayıt Ol'}</button>
                    </form>
                    <div style="margin-top: 15px; text-align: center;">
                        ${type === 'login' ? 'Hesabınız yok mu? <a href="#" id="switch-to-register" style="color: var(--primary-color);">Kayıt Ol</a>' : 'Zaten hesabınız var mı? <a href="#" id="switch-to-login" style="color: var(--primary-color);">Giriş Yap</a>'}
                    </div>
                </div>
            </div>
            `;
            
            document.body.insertAdjacentHTML('beforeend', modalHTML);
            
            document.getElementById('close-modal').addEventListener('click', function() {
                document.getElementById('auth-modal').remove();
            });
            
            document.getElementById('auth-form').addEventListener('submit', function(e) {
                e.preventDefault();
                
                
                alert(`${type === 'login' ? 'Giriş' : 'Kayıt'} başarılı!`);
                document.getElementById('auth-modal').remove();
                
                
                updateHeaderForLoggedInUser();
            });
            
            if (type === 'login') {
                document.getElementById('switch-to-register').addEventListener('click', function(e) {
                    e.preventDefault();
                    document.getElementById('auth-modal').remove();
                    showAuthModal('register');
                });
            } else {
                document.getElementById('switch-to-login').addEventListener('click', function(e) {
                    e.preventDefault();
                    document.getElementById('auth-modal').remove();
                    showAuthModal('login');
                });
            }
        }
        
        
        function updateHeaderForLoggedInUser() {
            const headerContainer = document.querySelector('.header-container');
            
            
            if (!document.getElementById('user-menu')) {
                headerContainer.insertAdjacentHTML('beforeend', `
                    <div id="user-menu" style="position: relative;">
                        <button id="user-menu-button" style="background: none; border: none; color: white; display: flex; align-items: center; gap: 5px; cursor: pointer;">
                            <span style="width: 32px; height: 32px; background-color: var(--accent-color); border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: bold;">K</span>
                            <span>Kullanıcı</span>
                            <span>▼</span>
                        </button>
                        <div id="user-dropdown" style="position: absolute; top: 100%; right: 0; background-color: white; border-radius: 4px; box-shadow: 0 2px 10px rgba(0,0,0,0.1); min-width: 200px; display: none; z-index: 100;">
                            <a href="#profile" style="display: block; padding: 10px 15px; color: var(--text-dark); text-decoration: none; border-bottom: 1px solid var(--border-color);">Profilim</a>
                            <a href="#favorites" style="display: block; padding: 10px 15px; color: var(--text-dark); text-decoration: none; border-bottom: 1px solid var(--border-color);">Favorilerim</a>
                            <a href="#predictions" style="display: block; padding: 10px 15px; color: var(--text-dark); text-decoration: none; border-bottom: 1px solid var(--border-color);">Tahminlerim</a>
                            <a href="#settings" style="display: block; padding: 10px 15px; color: var(--text-dark); text-decoration: none; border-bottom: 1px solid var(--border-color);">Ayarlar</a>
                            <a href="#logout" id="logout-button" style="display: block; padding: 10px 15px; color: #e53935; text-decoration: none;">Çıkış Yap</a>
                        </div>
                    </div>
                `);
                
                document.getElementById('user-menu-button').addEventListener('click', function() {
                    const dropdown = document.getElementById('user-dropdown');
                    dropdown.style.display = dropdown.style.display === 'block' ? 'none' : 'block';
                });
                
                document.addEventListener('click', function(e) {
                    if (!e.target.closest('#user-menu')) {
                        document.getElementById('user-dropdown').style.display = 'none';
                    }
                });
                
                document.getElementById('logout-button').addEventListener('click', function(e) {
                    e.preventDefault();
                    
                    
                    alert('Çıkış yapıldı!');
                    
                    
                    document.getElementById('user-menu').remove();
                });
            }
        }
        
       
        function openTeamPage(teamName) {
            
            window.location.href = `#team?name=${encodeURIComponent(teamName)}`;
        }
        
        
        function openPlayerPage(playerName) {
            
            window.location.href = `#player?name=${encodeURIComponent(playerName)}`;
        }
        
        
        function openLeaguePage(leagueName) {
           
            window.location.href = `#league?name=${encodeURIComponent(leagueName)}`;
        }
        
        
        function addTeamToFavorites(teamName) {
            
            alert(`${teamName} favorilerinize eklendi!`);
        }
      

    
        document.addEventListener('DOMContentLoaded', function() {
           
            const teamLogos = document.querySelectorAll('.team img');
            teamLogos.forEach(logo => {
                logo.addEventListener('click', function() {
                    const teamName = this.closest('.team').querySelector('.team-name').textContent;
                    openTeamPage(teamName);
                });
                
               
                logo.style.cursor = 'pointer';
            });
            
            
            const teamNames = document.querySelectorAll('.team-name');
            teamNames.forEach(name => {
                name.addEventListener('click', function() {
                    const teamName = this.textContent;
                    openTeamPage(teamName);
                });
                
               r
                name.style.cursor = 'pointer';
            });
            
            
            const leagueLogos = document.querySelectorAll('.match-league img');
            leagueLogos.forEach(logo => {
                logo.addEventListener('click', function() {
                    const leagueName = this.closest('.match-league').querySelector('span').textContent;
                    openLeaguePage(leagueName);
                });
                
                
                logo.style.cursor = 'pointer';
            });
            
            
            const tableTeams = document.querySelectorAll('.team-cell');
            tableTeams.forEach(team => {
                team.addEventListener('click', function() {
                    const teamName = this.querySelector('span').textContent;
                    openTeamPage(teamName);
                });
                
                
                team.style.cursor = 'pointer';
            });
            
            
            const topScorers = document.querySelectorAll('.league-table tbody tr td:nth-child(2)');
            topScorers.forEach(player => {
                player.addEventListener('click', function() {
                    const playerName = this.textContent;
                    openPlayerPage(playerName);
                });
                
               
                player.style.cursor = 'pointer';
            });
        
            
            const headerContainer = document.querySelector('.header-container');
            headerContainer.insertAdjacentHTML('beforeend', `
                <div style="display: flex; gap: 10px;">
                    <button id="login-button" style="background-color: transparent; border: 1px solid white; color: white; padding: 5px 10px; border-radius: 4px; cursor: pointer;">Giriş Yap</button>
                    <button id="register-button" style="background-color: var(--accent-color); border: none; color: white; padding: 5px 10px; border-radius: 4px; cursor: pointer;">Kayıt Ol</button>
                </div>
            `);
            
            document.getElementById('login-button').addEventListener('click', function() {
                showAuthModal('login');
            });
            
            document.getElementById('register-button').addEventListener('click', function() {
                showAuthModal('register');
            });
        });
      


        function setupActionButtons() {
            
            const actionButtons = document.querySelectorAll('.action-button');
            
            
            actionButtons.forEach(button => {
                button.addEventListener('click', function() {
                    const buttonText = this.textContent.trim();
                    
                    if (buttonText.includes('İstatistikler') || buttonText.includes('Detaylı İstatistikler')) {
                        showStatistics(this);
                    } else if (buttonText.includes('İzle') || buttonText.includes('Canlı İzle')) {
                        openLiveStream(this);
                    } else if (buttonText.includes('Maç Özeti')) {
                        showMatchHighlights(this);
                    } else if (buttonText.includes('Hatırlatıcı Kur')) {
                        setReminder(this);
                    } else if (buttonText.includes('Tahmin Yap')) {
                        openPredictionModal(this);
                    } else if (buttonText === 'Tüm Bahisler') {
                        openAllBets();
                    } else if (buttonText === 'Bahis Yap') {
                        placeBet();
                    } else if (buttonText === 'Gönder') {
                        sendChatMessage();
                    }
                });
            });
        }
        
        
        function setupNavigation() {
            const navLinks = document.querySelectorAll('nav ul li a');
            
            navLinks.forEach(link => {
                link.addEventListener('click', function(e) {
                    e.preventDefault();
                    
                   
                    navLinks.forEach(l => l.classList.remove('active'));
                    
                    
                    this.classList.add('active');
                    
                   
                    const page = this.textContent.trim();
                    loadPageContent(page);
                });
            });
        }
        
        
        function setupFilters() {
            const filterButton = document.getElementById('apply-filters');
            
            if (filterButton) {
                filterButton.addEventListener('click', function() {
                    const leagueFilter = document.getElementById('league-filter').value;
                    const statusFilter = document.getElementById('status-filter').value;
                    const dateFilter = document.getElementById('date-filter').value;
                   
                   
                    filterMatches(leagueFilter, statusFilter, dateFilter);
                });
            }
        
            
            const calendarLeagueFilter = document.getElementById('calendar-league');
            if (calendarLeagueFilter) {
                calendarLeagueFilter.addEventListener('change', function() {
                    filterCalendar(this.value);
                });
            }
        }
        
        function setupLiveUpdates() {
            
            
        
            
            setInterval(updateLiveMatches, 30000);
        }
        
        
        function setupNotifications() {
            
            if (Notification.permission !== 'granted' && Notification.permission !== 'denied') {
                const banner = document.querySelector('.banner');
                if (banner) {
                    banner.insertAdjacentHTML('beforeend', 
                        '<button id="enable-notifications" style="margin-top: 15px; padding: 8px 15px; background-color: var(--accent-color); color: white; border: none; border-radius: 4px; cursor: pointer;">Bildirimleri Etkinleştir</button>');
                    
                    document.getElementById('enable-notifications').addEventListener('click', function() {
                        requestNotificationPermission();
                    });
                }
            }
        }
        
        
        function setupChatFeature() {
            const sendButton = document.getElementById('send-message');
            const chatInput = document.getElementById('chat-input');
            
            if (sendButton && chatInput) {
               
                chatInput.addEventListener('keypress', function(e) {
                    if (e.key === 'Enter') {
                        sendChatMessage();
                    }
                });
                
               
                sendButton.addEventListener('click', sendChatMessage);
            }
        }
        
        
        function setupBettingFeature() {
            const betOptions = document.querySelectorAll('.bet-option');
            const betSlip = document.getElementById('bet-slip');
            const betSelections = document.getElementById('bet-selections');
            const totalOddElement = document.getElementById('total-odd');
            const potentialWinElement = document.getElementById('potential-win');
            const betAmountInput = document.getElementById('bet-amount');
            const placeBetButton = document.getElementById('place-bet');
            
            if (betOptions.length > 0) {
               
                betOptions.forEach(option => {
                    option.addEventListener('click', function() {
                      
                        this.style.backgroundColor = 'var(--secondary-color)';
                        this.style.color = 'white';
                        
                     
                        if (betSlip) {
                            betSlip.style.display = 'block';
                            
                          
                            const odd = this.getAttribute('data-odd');
                            const betType = this.querySelector('div:first-child').textContent;
                            const matchElement = this.closest('div[style*="background-color"]').querySelector('span[style*="font-weight: 600"]');
                            const match = matchElement ? matchElement.textContent : 'Bilinmeyen Maç';
                            
                          
                            if (betSelections) {
                                const selectionId = `selection-${Date.now()}`;
                                betSelections.innerHTML += `
                                    <div id="${selectionId}" style="margin-bottom: 10px; padding-bottom: 10px; border-bottom: 1px solid var(--border-color);">
                                        <div style="display: flex; justify-content: space-between; margin-bottom: 5px;">
                                            <span>${match}</span>
                                            <button class="remove-selection" data-id="${selectionId}" style="background: none; border: none; color: #e53935; cursor: pointer; font-size: 1rem;">×</button>
                                        </div>
                                        <div style="display: flex; justify-content: space-between;">
                                            <span>${betType}</span>
                                            <span style="font-weight: 600;">${odd}</span>
                                        </div>
                                    </div>
                                `;
                            
                                
                                document.querySelectorAll('.remove-selection').forEach(button => {
                                    button.addEventListener('click', function() {
                                        const selectionId = this.getAttribute('data-id');
                                        document.getElementById(selectionId).remove();
                                        updateBetSlip();
                                    });
                                });
                                
                               
                                updateBetSlip();
                            }
                        }
                    });
                });
                
               
                if (betAmountInput) {
                    betAmountInput.addEventListener('input', updateBetSlip);
                }
                
               
                if (placeBetButton) {
                    placeBetButton.addEventListener('click', placeBet);
                }
            }
        }
        
        
        function setupVideoPlayers() {
            const videoThumbnails = document.querySelectorAll('div[style*="position: relative"] div[style*="cursor: pointer"]');
            
            videoThumbnails.forEach(thumbnail => {
                thumbnail.addEventListener('click', function() {
                    const videoContainer = this.closest('div[style*="position: relative"]');
                    const videoTitle = videoContainer.nextElementSibling.querySelector('h3').textContent;
                    
                   
                    showVideoModal(videoTitle);
                });
            });
        }
        
        
        function setupCalendar() {
            const prevWeekButton = document.getElementById('prev-week');
            const nextWeekButton = document.getElementById('next-week');
            const calendarDays = document.querySelectorAll('.calendar-day');
            
            if (prevWeekButton) {
                prevWeekButton.addEventListener('click', function() {
                    navigateCalendar('prev');
                });
            }
            
            if (nextWeekButton) {
                nextWeekButton.addEventListener('click', function() {
                    navigateCalendar('next');
                });
            }
            
            if (calendarDays.length > 0) {
                calendarDays.forEach(day => {
                    day.addEventListener('click', function() {
                       
                        calendarDays.forEach(d => d.classList.remove('active'));
                        this.classList.add('active');
                        
                        
                        const date = this.querySelector('div:first-child').textContent;
                        filterCalendarByDate(date);
                    });
                });
            }
        }
        
        
        function setupNewsLinks() {
            const newsLinks = document.querySelectorAll('a[href^="#news/"]');
            
            newsLinks.forEach(link => {
                link.addEventListener('click', function(e) {
                    e.preventDefault();
                    const newsId = this.getAttribute('href').split('/')[1];
                    openNewsDetail(newsId);
                });
            });
        }
        
        
        function setupTeamAndPlayerLinks() {
            
            const teamLogos = document.querySelectorAll('.team img');
            teamLogos.forEach(logo => {
                logo.addEventListener('click', function() {
                    const teamName = this.closest('.team').querySelector('.team-name').textContent;
                    openTeamPage(teamName);
                });
            
                
                logo.style.cursor = 'pointer';
            });
            
            
            const teamNames = document.querySelectorAll('.team-name');
            teamNames.forEach(name => {
                name.addEventListener('click', function() {
                    const teamName = this.textContent;
                    openTeamPage(teamName);
                });
                
               
                name.style.cursor = 'pointer';
            });
            
           
            const leagueLogos = document.querySelectorAll('.match-league img');
            leagueLogos.forEach(logo => {
                logo.addEventListener('click', function() {
                    const leagueName = this.closest('.match-league').querySelector('span').textContent;
                    openLeaguePage(leagueName);
                });
                
               
                logo.style.cursor = 'pointer';
            });
            
            
            const tableTeams = document.querySelectorAll('.team-cell');
            tableTeams.forEach(team => {
                team.addEventListener('click', function() {
                    const teamName = this.querySelector('span').textContent;
                    openTeamPage(teamName);
                });
                
                
                team.style.cursor = 'pointer';
            });
            
           
            const topScorers = document.querySelectorAll('.league-table tbody tr td:nth-child(2)');
            topScorers.forEach(player => {
                player.addEventListener('click', function() {
                    const playerName = this.textContent;
                    openPlayerPage(playerName);
                });
                
                
                player.style.cursor = 'pointer';
            });
        }
        
        
        function setupUserAuthentication() {
           
            const headerContainer = document.querySelector('.header-container');
            if (headerContainer && !document.getElementById('login-button')) {
                headerContainer.insertAdjacentHTML('beforeend', `
                    <div style="display: flex; gap: 10px;">
                        <button id="login-button" style="background-color: transparent; border: 1px solid white; color: white; padding: 5px 10px; border-radius: 4px; cursor: pointer;">Giriş Yap</button>
                        <button id="register-button" style="background-color: var(--accent-color); border: none; color: white; padding: 5px 10px; border-radius: 4px; cursor: pointer;">Kayıt Ol</button>
                    </div>
                `);
                
                document.getElementById('login-button').addEventListener('click', function() {
                    showAuthModal('login');
                });
                
                document.getElementById('register-button').addEventListener('click', function() {
                    showAuthModal('register');
                });
            }
        }
        
        
        function showStatistics(button) {
            
            const matchCard = button.closest('.match-card') || button.closest('.featured-match');
            const teams = matchCard.querySelectorAll('.team-name');
            const homeTeam = teams[0].textContent;
            const awayTeam = teams[1].textContent;
            
           
        
            
            window.location.href = `#statistics?match=${encodeURIComponent(homeTeam)}-${encodeURIComponent(awayTeam)}`;
        
            
            document.title = `${homeTeam} vs ${awayTeam} - İstatistikler | FutbolCanlı`;
        
            
            alert(`${homeTeam} vs ${awayTeam} maçının detaylı istatistikleri gösteriliyor...`);
        }
        
        
        function openLiveStream(button) {
           
            const matchCard = button.closest('.match-card') || button.closest('.featured-match');
            const teams = matchCard.querySelectorAll('.team-name');
            const homeTeam = teams[0].textContent;
            const awayTeam = teams[1].textContent;
            
            
            window.location.href = `#live-stream?match=${encodeURIComponent(homeTeam)}-${encodeURIComponent(awayTeam)}`;
            
            
            document.title = `${homeTeam} vs ${awayTeam} - Canlı Yayın | FutbolCanlı`;
            
           
            alert(`${homeTeam} vs ${awayTeam} maçının canlı yayını açılıyor...`);
        }
        
        
        function showMatchHighlights(button) {
           
            const matchCard = button.closest('.match-card') || button.closest('.featured-match');
            const teams = matchCard.querySelectorAll('.team-name');
            const homeTeam = teams[0].textContent;
            const awayTeam = teams[1].textContent;
            
          
            window.location.href = `#highlights?match=${encodeURIComponent(homeTeam)}-${encodeURIComponent(awayTeam)}`;
            
           
            document.title = `${homeTeam} vs ${awayTeam} - Maç Özeti | FutbolCanlı`;
            
           
            alert(`${homeTeam} vs ${awayTeam} maçının özeti gösteriliyor...`);
        }
        
        
        function setReminder(button) {
          
            const matchCard = button.closest('.match-card');
            const teams = matchCard.querySelectorAll('.team-name');
            const homeTeam = teams[0].textContent;
            const awayTeam = teams[1].textContent;
            const matchTime = matchCard.querySelector('.match-time span').textContent;
           
           
            const reminderTime = prompt(`${homeTeam} vs ${awayTeam} maçı için hatırlatıcı kurmak istediğiniz zamanı seçin:\n1) Maçtan 1 saat önce\n2) Maçtan 30 dakika önce\n3) Maç başladığında`, "2");
            
            if (reminderTime) {
               
                
               
                button.innerHTML = '<span>✓</span> Hatırlatıcı Kuruldu';
                button.style.color = '#4CAF50';
                
                
                alert(`Hatırlatıcı kuruldu! ${homeTeam} vs ${awayTeam} maçı için bildirim alacaksınız.`);
            }
        }
        
        
        function openPredictionModal(button) {
           
            const matchCard = button.closest('.match-card');
            const teams = matchCard.querySelectorAll('.team-name');
            const homeTeam = teams[0].textContent;
            const awayTeam = teams[1].textContent;
            
            
            const prediction = prompt(`${homeTeam} vs ${awayTeam} maçı için tahmininizi girin (örn. 2-1):`, "");
            
            if (prediction) {
               
               
               
                button.innerHTML = `<span>✓</span> Tahmin: ${prediction}`;
                button.style.color = '#4CAF50';
                
               
                alert(`Tahmininiz kaydedildi: ${homeTeam} ${prediction} ${awayTeam}`);
            }
        }
        
        
        function loadPageContent(page) {
            
            console.log(`${page} sayfası yükleniyor...`);
            
            
            window.location.hash = page.toLowerCase().replace(' ', '-');
            
           
            document.title = `FutbolCanlı - ${page}`;
            
            
            alert(`${page} sayfası yükleniyor...`);
        }
        
        
        function filterMatches(league, status, date) {
            console.log(`Filtreler uygulanıyor: Lig=${league}, Durum=${status}, Tarih=${date}`);
            
           
        
            
            window.location.hash = `matches?league=${league}&status=${status}&date=${date}`;
            
            
            alert(`Filtreler uygulandı: ${league !== 'all' ? league : 'Tüm Ligler'}, ${status !== 'all' ? status : 'Tüm Maçlar'}, ${date}`);
        }
        
        function updateLiveMatches() {
            console.log('Canlı maçlar güncelleniyor...');
           
           
           
           
            const liveMatches = document.querySelectorAll('.match-card .live-indicator, .featured-match .live-indicator');
            
            if (liveMatches.length > 0) {
                const randomIndex = Math.floor(Math.random() * liveMatches.length);
                const liveIndicator = liveMatches[randomIndex];
                const matchCard = liveIndicator.closest('.match-card') || liveIndicator.closest('.featured-match');
                
                if (matchCard) {
                    const scoreElement = matchCard.querySelector('.score');
                    if (scoreElement) {
                        const currentScore = scoreElement.textContent.split(' - ');
                        
                       
                        const randomTeam = Math.floor(Math.random() * 2);
                        currentScore[randomTeam] = parseInt(currentScore[randomTeam]) + 1;
                        
                        
                        scoreElement.textContent = `${currentScore[0]} - ${currentScore[1]}`;
                        
                        
                        const minuteElement = matchCard.querySelector('.match-minute');
                        if (minuteElement) {
                            const currentMinute = parseInt(minuteElement.textContent);
                            minuteElement.textContent = `${Math.min(currentMinute + 5, 90)}'`;
                        }
                        
                        
                        const teams = matchCard.querySelectorAll('.team-name');
                        if (teams.length > randomTeam) {
                            const scoringTeam = teams[randomTeam].textContent;
                            showGoalNotification(scoringTeam);
                            
                            
                            const chatMessages = document.getElementById('chat-messages');
                            if (chatMessages) {
                                const now = new Date();
                                const timeString = `${now.getHours()}:${now.getMinutes().toString().padStart(2, '0')}`;
                                
                                chatMessages.innerHTML += `
                                    <div style="margin-bottom: 15px;">
                                        <div style="display: flex; align-items: flex-start; gap: 10px;">
                                            <div style="width: 36px; height: 36px; background-color: #4CAF50; border-radius: 50%; display: flex; align-items: center; justify-content: center; color: white; font-weight: bold;">S</div>
                                            <div>
                                                <div style="display: flex; align-items: center; gap: 5px;">
                                                    <span style="font-weight: 600; color: var(--primary-color);">Sistem</span>
                                                    <span style="font-size: 0.8rem; color: #757575;">${timeString}</span>
                                                </div>
                                                <div style="background-color: white; padding: 8px 12px; border-radius: 0 8px 8px 8px; box-shadow: 0 1px 2px rgba(0,0,0,0.1);">
                                                    <strong>GOL!</strong> ${scoringTeam} gol attı! Yeni skor: ${currentScore[0]}-${currentScore[1]}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                `;
                                
                                
                                chatMessages.scrollTop = chatMessages.scrollHeight;
                            }
                        }
                    }
                }
            }
        }
        
        
        function showGoalNotification(team) {
            if (Notification.permission === 'granted') {
                const notification = new Notification('GOL!', {
                    body: `${team} gol attı!`,
                    icon: '/favicon.ico'
                });
                
                
                setTimeout(() => {
                    notification.close();
                }, 5000);
            }
        }
        
        
        function requestNotificationPermission() {
            Notification.requestPermission().then(function(permission) {
                if (permission === 'granted') {
                    alert('Bildirimler etkinleştirildi! Artık gol ve önemli maç olayları hakkında bildirim alacaksınız.');
                    
                    const notificationButton = document.getElementById('enable-notifications');
                    if (notificationButton) {
                        notificationButton.remove();
                    }
                }
            });
        }
        
        
        function showAuthModal(type) {
          
            const existingModal = document.getElementById('auth-modal');
            if (existingModal) {
                existingModal.remove();
            }
            
            const modalHTML = `
            <div id="auth-modal" style="position: fixed; top: 0; left: 0; right: 0; bottom: 0; background-color: rgba(0,0,0,0.5); display: flex; align-items: center; justify-content: center; z-index: 1000;">
                <div style="background-color: white; border-radius: 8px; padding: 20px; width: 90%; max-width: 400px;">
                    <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px;">
                        <h3 style="margin: 0; color: var(--primary-color);">${type === 'login' ? 'Giriş Yap' : 'Kayıt Ol'}</h3>
                        <button id="close-modal" style="background: none; border: none; font-size: 1.5rem; cursor: pointer;">×</button>
                    </div>
                    <form id="auth-form">
                        ${type === 'register' ? '<div style="margin-bottom: 15px;"><label for="name" style="display: block; margin-bottom: 5px;">Ad Soyad</label><input type="text" id="name" style="width: 100%; padding: 8px; border: 1px solid var(--border-color); border-radius: 4px;" required></div>' : ''}
                        <div style="margin-bottom: 15px;">
                            <label for="email" style="display: block; margin-bottom: 5px;">E-posta</label>
                            <input type="email" id="email" style="width: 100%; padding: 8px; border: 1px solid var(--border-color); border-radius: 4px;" required>
                        </div>
                        <div style="margin-bottom: 20px;">
                            <label for="password" style="display: block; margin-bottom: 5px;">Şifre</label>
                            <input type="password" id="password" style="width: 100%; padding: 8px; border: 1px solid var(--border-color); border-radius: 4px;" required>
                        </div>
                        <button type="submit" style="width: 100%; padding: 10px; background-color: var(--primary-color); color: white; border: none; border-radius: 4px; cursor: pointer;">${type === 'login' ? 'Giriş Yap' : 'Kayıt Ol'}</button>
                    </form>
                    <div style="margin-top: 15px; text-align: center;">
                        ${type === 'login' ? 'Hesabınız yok mu? <a href="#" id="switch-to-register" style="color: var(--primary-color);">Kayıt Ol</a>' : 'Zaten hesabınız var mı? <a href="#" id="switch-to-login" style="color: var(--primary-color);">Giriş Yap</a>'}
                    </div>
                </div>
            </div>
            `;
            
            document.body.insertAdjacentHTML('beforeend', modalHTML);
            
            document.getElementById('close-modal').addEventListener('click', function() {
                document.getElementById('auth-modal').remove();
            });
            
            document.getElementById('auth-form').addEventListener('submit', function(e) {
                e.preventDefault();
            
              
            
                
                document.getElementById('auth-modal').remove();
                
               
                updateHeaderForLoggedInUser();
                
                
                alert(`${type === 'login' ? 'Giriş' : 'Kayıt'} başarılı!`);
            });
            
            if (type === 'login') {
                document.getElementById('switch-to-register').addEventListener('click', function(e) {
                    e.preventDefault();
                    document.getElementById('auth-modal').remove();
                    showAuthModal('register');
                });
            } else {
                        document.getElementById('switch-to-login').addEventListener('click', function(e) {
                            e.preventDefault();
                            document.getElementById('auth-modal').remove();
                            showAuthModal('login');
                        });
                    }
                }
        