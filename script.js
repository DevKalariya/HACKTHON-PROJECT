// Initialize Lucide Icons
        lucide.createIcons();

        // App Data States
        let currentTab = 'dashboard';

        const alertsData = [
            { id: 1, title: 'Severe Cyclone & Storm Surge Alert', severity: 'CRITICAL', region: 'Coastal Odisha & WB', time: '10 mins ago', desc: 'Wind speeds exceeding 120 km/h expected. Immediate evacuation recommended for low-lying districts.' },
            { id: 2, title: 'Flash Flood Warning - River Brahmaputra Basin', severity: 'CRITICAL', region: 'Assam (Dibrugarh, Guwahati)', time: '35 mins ago', desc: 'Water levels crossed danger mark. Move to higher grounds immediately.' },
            { id: 3, title: 'Cloudburst & Landslide Advisory', severity: 'WARNING', region: 'Uttarakhand (Chamoli, Rudraprayag)', time: '1 hr ago', desc: 'Avoid non-essential travel through mountain passes. Heavy boulders reported on NH-7.' },
            { id: 4, title: 'Heatwave Red Alert', severity: 'ADVISORY', region: 'Rajasthan & Vidarbha', time: '3 hrs ago', desc: 'Temperatures expected to peak at 46°C. Stay hydrated and avoid direct sunlight.' }
        ];

        const sheltersData = [
            { name: 'Durga Community Hall Shelter', type: 'Cyclone & Flood Shelter', distance: '1.2 km away', capacity: '450 / 600', status: 'Available', phone: '+91 94382-11220' },
            { name: 'Govt Higher Secondary Relief Camp', type: 'Multi-hazard Safe Zone', distance: '2.8 km away', capacity: '1,120 / 1,500', status: 'Available', phone: '+91 94382-33441' },
            { name: 'St. Xavier Public School Shelter', type: 'Emergency Evacuation Camp', distance: '4.1 km away', capacity: '800 / 800', status: 'Full', phone: '+91 94382-55662' },
            { name: 'District Sports Complex Triage Unit', type: 'Medical & Food Relief', distance: '5.5 km away', capacity: '2,100 / 3,000', status: 'Available', phone: '+91 94382-77883' }
        ];

        let sosDispatchedList = [
            { id: 101, type: 'Flood Trapped', name: 'Ramesh Swain', phone: '+91 98765 11223', desc: 'Trapped on 2nd floor roof, water at 5 feet.', time: '4 mins ago', status: 'NDRF Dispatched' },
            { id: 102, type: 'Medical Emergency', name: 'Sunita Devi', phone: '+91 98234 55667', desc: 'Diabetic patient run out of insulin, severe weakness.', time: '15 mins ago', status: 'Medical Team Assigned' }
        ];

        // Tab Navigation
        function switchTab(tabId) {
            currentTab = tabId;
            document.querySelectorAll('.tab-content').forEach(el => el.classList.add('hidden'));
            document.getElementById(`tab-${tabId}`).classList.remove('hidden');

            document.querySelectorAll('.nav-btn').forEach(btn => {
                if (btn.getAttribute('data-target') === tabId) {
                    btn.classList.add('bg-slate-800', 'text-white');
                } else {
                    btn.classList.remove('bg-slate-800', 'text-white');
                }
            });

            window.scrollTo({ top: 0, behavior: 'smooth' });

            // Render specific tab data if needed
            if (tabId === 'alerts') renderAlerts(alertsData);
            if (tabId === 'map') renderShelters();
            if (tabId === 'sos') renderSOSList();
        }

        function toggleMobileMenu() {
            const menu = document.getElementById('mobile-menu');
            menu.classList.toggle('hidden');
        }

        // Theme Toggle
        function toggleDarkMode() {
            const html = document.documentElement;
            html.classList.toggle('dark');
            const icon = document.getElementById('theme-icon');
            if (html.classList.contains('dark')) {
                icon.setAttribute('data-lucide', 'sun');
            } else {
                icon.setAttribute('data-lucide', 'moon');
            }
            lucide.createIcons();
        }

        // Emergency Modal
        function openEmergencyModal() {
            document.getElementById('emergency-modal').classList.remove('hidden');
        }
        function closeEmergencyModal() {
            document.getElementById('emergency-modal').classList.add('hidden');
        }

        // Render Alerts
        function renderAlerts(data) {
            const container = document.getElementById('alerts-list');
            container.innerHTML = '';
            data.forEach(alert => {
                const badgeColor = alert.severity === 'CRITICAL' ? 'bg-rose-500/20 text-rose-400 border-rose-500/30' : alert.severity === 'WARNING' ? 'bg-amber-500/20 text-amber-400 border-amber-500/30' : 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';

                container.innerHTML += `
                    <div class="glass-panel p-5 rounded-2xl border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                        <div class="space-y-1">
                            <div class="flex items-center gap-2">
                                <span class="px-2.5 py-0.5 rounded-full text-xs font-bold border ${badgeColor}">${alert.severity}</span>
                                <span class="text-xs text-slate-400">${alert.time}</span>
                            </div>
                            <h3 class="text-lg font-bold text-white">${alert.title}</h3>
                            <p class="text-slate-300 text-sm">${alert.desc}</p>
                            <span class="text-xs font-semibold text-rose-400 block">📍 Region: ${alert.region}</span>
                        </div>
                        <button onclick="alert('Early warning broadcast details sent to your registered device.');" class="bg-slate-800 hover:bg-slate-700 text-white px-4 py-2 rounded-xl text-xs font-bold border border-slate-700 whitespace-nowrap">
                            View Advisory PDF
                        </button>
                    </div>
                `;
            });
        }

        function filterAlerts() {
            const val = document.getElementById('severity-filter').value;
            if (val === 'ALL') {
                renderAlerts(alertsData);
            } else {
                renderAlerts(alertsData.filter(a => a.severity === val));
            }
        }

        // Render Shelters
        function renderShelters() {
            const container = document.getElementById('shelters-list');
            container.innerHTML = '';
            sheltersData.forEach(sh => {
                const statusBadge = sh.status === 'Available' ? 'bg-emerald-500/20 text-emerald-400' : 'bg-rose-500/20 text-rose-400';
                container.innerHTML += `
                    <div class="bg-slate-900/80 p-4 rounded-xl border border-slate-800 space-y-2">
                        <div class="flex items-center justify-between">
                            <h4 class="font-bold text-white text-sm">${sh.name}</h4>
                            <span class="text-xs px-2 py-0.5 rounded font-semibold ${statusBadge}">${sh.status}</span>
                        </div>
                        <p class="text-xs text-slate-400">${sh.type} • <strong>${sh.distance}</strong></p>
                        <div class="flex items-center justify-between text-xs pt-1">
                            <span class="text-slate-300">Capacity: ${sh.capacity}</span>
                            <a href="tel:${sh.phone}" class="text-rose-400 font-bold hover:underline">📞 Call Camp</a>
                        </div>
                    </div>
                `;
            });
        }

        function selectMapItem(title) {
            document.getElementById('map-selected-title').innerText = title;
            document.getElementById('map-selected-desc').innerText = 'Live telemetry status verified by district disaster management.';
        }

        function triggerRouteGuidance() {
            alert('Safe evacuation route calculated! Turn-by-turn navigation initiated avoiding flooded lowlands.');
        }

        // SOS Submission
        function submitSOS(e) {
            e.preventDefault();
            const type = document.getElementById('sos-type').value;
            const name = document.getElementById('sos-name').value;
            const phone = document.getElementById('sos-phone').value;
            const desc = document.getElementById('sos-desc').value;

            const newSos = {
                id: Date.now(),
                type,
                name,
                phone,
                desc,
                time: 'Just now',
                status: 'Dispatched to NDRF Team #3'
            };

            sosDispatchedList.unshift(newSos);
            renderSOSList();
            document.getElementById('sos-form').reset();
            alert('🚨 SOS Dispatched Successfully! Nearest NDRF rescue team and emergency dispatchers have been notified with your live GPS coordinates.');
        }

        function renderSOSList() {
            const container = document.getElementById('sos-live-list');
            if(!container) return;
            container.innerHTML = '';
            sosDispatchedList.forEach(item => {
                container.innerHTML += `
                    <div class="glass-panel p-4 rounded-2xl border border-rose-500/30 flex items-center justify-between gap-4">
                        <div class="space-y-1">
                            <div class="flex items-center gap-2">
                                <span class="px-2 py-0.5 rounded text-xs font-bold bg-rose-500/20 text-rose-400">${item.type}</span>
                                <span class="text-xs text-slate-400">${item.time}</span>
                            </div>
                            <h4 class="font-bold text-white text-sm">${item.name} (${item.phone})</h4>
                            <p class="text-xs text-slate-300">${item.desc}</p>
                        </div>
                        <div class="text-right">
                            <span class="text-xs font-bold text-emerald-400 block">${item.status}</span>
                            <span class="text-[10px] text-slate-400">ID: #${item.id}</span>
                        </div>
                    </div>
                `;
            });
        }

        // AI Chatbot
        async function sendAIChatMessage() {
            const input = document.getElementById('chat-input');
            const msg = input.value.trim();
            if(!msg) return;

            const chatContainer = document.getElementById('chat-messages');
            chatContainer.innerHTML += `
                <div class="flex items-start justify-end gap-3">
                    <div class="bg-rose-600 text-white p-4 rounded-2xl rounded-tr-none text-slate-100 max-w-lg leading-relaxed">
                        ${msg}
                    </div>
                    <div class="w-8 h-8 rounded-full bg-rose-500/20 text-rose-400 flex items-center justify-center font-bold shrink-0">You</div>
                </div>
            `;
            input.value = '';
            chatContainer.scrollTop = chatContainer.scrollHeight;

            // Simulate Gemini AI Response with fallback / contextual expert knowledge
            setTimeout(() => {
                let reply = "Based on standard disaster protocols (NDMA guidelines), ensure you keep your emergency grab bag ready with documents, dry rations, flashlight, and first aid. If you are in a flood-prone area, move to upper storeys immediately.";

                const lower = msg.toLowerCase();
                if (lower.includes('grab bag') || lower.includes('kit')) {
                    reply = "Essential Emergency Grab Bag checklist:\n1. Waterproof ID documents & cash\n2. 3-day supply of bottled drinking water & energy bars\n3. First aid kit & essential prescription medicines\n4. Flashlight, extra batteries & power bank\n5. Whistle and emergency contact list.";
                } else if (lower.includes('water') || lower.includes('purif')) {
                    reply = "To purify water during floods when bottled water is unavailable: Boil water vigorously for at least 3 to 5 minutes, or use chlorine tablets / chlorine bleach (8 drops per gallon) and let it stand for 30 minutes before drinking.";
                } else if (lower.includes('snake')) {
                    reply = "First Aid for Snake Bite: Keep the victim calm and still to slow venom spread. Remove rings or tight clothing near the bite. Keep the bitten area below heart level. DO NOT cut, suck, or apply tourniquets. Call 108 immediately.";
                }

                chatContainer.innerHTML += `
                    <div class="flex items-start gap-3">
                        <div class="w-8 h-8 rounded-full bg-amber-500/20 text-amber-400 flex items-center justify-center font-bold shrink-0">AI</div>
                        <div class="bg-slate-900 border border-slate-800 p-4 rounded-2xl rounded-tl-none text-slate-200 max-w-lg leading-relaxed whitespace-pre-line">
                            ${reply}
                        </div>
                    </div>
                `;
                chatContainer.scrollTop = chatContainer.scrollHeight;
            }, 800);
        }

        function clearChat() {
            document.getElementById('chat-messages').innerHTML = `
                <div class="flex items-start gap-3">
                    <div class="w-8 h-8 rounded-full bg-amber-500/20 text-amber-400 flex items-center justify-center font-bold shrink-0">AI</div>
                    <div class="bg-slate-900 border border-slate-800 p-4 rounded-2xl rounded-tl-none text-slate-200 max-w-lg leading-relaxed">
                        Chat cleared. How else can I assist you with disaster safety or readiness?
                    </div>
                </div>
            `;
        }

        // Initial render triggers
        renderAlerts(alertsData);
