// Interactive JavaScript Visualizations for Cisco Switch and Network Course

if (!window.cliEventBroker) {
    window.cliEventBroker = {
        listeners: [],
        subscribe(callback) {
            this.listeners.push(callback);
            return () => {
                this.listeners = this.listeners.filter(l => l !== callback);
            };
        },
        publish(state) {
            this.listeners.forEach(callback => {
                try {
                    callback(state);
                } catch (e) {
                    console.error("Error in state change callback:", e);
                }
            });
        }
    };
}

// Initialize OSI Explorer
function initOSIVisualizer(containerId) {
    const container = document.getElementById(containerId);
    if (!container) return;

    // Define layers data
    const layers = [
        { num: 7, name: "Application Layer", nameTh: "ระดับชั้นแอปพลิเคชัน", pdu: "Data (ข้อมูล)", func: "เป็นส่วนติดต่อกับผู้ใช้และโปรแกรมประยุกต์ต่าง ๆ เช่น เว็บบราวเซอร์ อีเมล", protocols: "HTTP, HTTPS, DNS, DHCP, FTP" },
        { num: 6, name: "Presentation Layer", nameTh: "ระดับชั้นนำเสนอข้อมูล", pdu: "Data (ข้อมูล)", func: "จัดการการเข้ารหัสลับ (Encryption) บีบอัดข้อมูล (Compression) และแปลงรูปแบบข้อมูลให้สองฝั่งเข้าใจตรงกัน", protocols: "SSL/TLS, JPEG, ASCII, GIF" },
        { num: 5, name: "Session Layer", nameTh: "ระดับชั้นควบคุมเซสชัน", pdu: "Data (ข้อมูล)", func: "สร้าง ควบคุม และยกเลิกการเชื่อมต่อในการสนทนาระหว่างเครื่องคอมพิวเตอร์สองฝั่ง", protocols: "NetBIOS, PPTP, RPC, SQL" },
        { num: 4, name: "Transport Layer", nameTh: "ระดับชั้นขนส่งข้อมูล", pdu: "Segment (เซกเมนต์)", func: "ควบคุมความน่าเชื่อถือของการรับส่งข้อมูลแบบ End-to-End จัดเรียงลำดับการส่ง และแบ่งพอร์ตบริการ", protocols: "TCP, UDP" },
        { num: 3, name: "Network Layer", nameTh: "ระดับชั้นเครือข่าย", pdu: "Packet (แพ็กเก็ต)", func: "ระบุที่อยู่เชิงตรรกะ (IP Address) และตัดสินใจหาเส้นทางส่งข้อมูลข้ามเน็ตเวิร์กที่เหมาะสมที่สุด (Routing)", protocols: "IPv4, IPv6, ICMP, IPsec" },
        { num: 2, name: "Data Link Layer", nameTh: "ระดับชั้นเชื่อมต่อข้อมูล", pdu: "Frame (เฟรม)", func: "ห่อหุ้มข้อมูลเป็นเฟรม ควบคุมการเข้าถึงสื่อกลางทางกายภาพ ตรวจหาข้อผิดพลาดทางฮาร์ดแวร์ และใช้ MAC Address", protocols: "Ethernet (802.3), Wi-Fi (802.11), ARP" },
        { num: 1, name: "Physical Layer", nameTh: "ระดับชั้นกายภาพ", pdu: "Bits (บิต 0/1)", func: "ส่งผ่านสัญญาณดิบในรูปไฟฟ้า แสง หรือคลื่นความถี่ ผ่านสายแลน เส้นใยแก้วนำแสง หรือสื่อกลางไร้สาย", protocols: "Cables (Cat6/Fiber), RJ-45 Connector, Hubs" }
    ];

    // Build UI layout
    container.innerHTML = `
        <div class="grid grid-cols-1 md:grid-cols-12 gap-6 p-4 bg-slate-100 dark:bg-slate-900/40 rounded-xl border border-slate-200 dark:border-slate-700/50">
            <!-- Layers stack -->
            <div class="md:col-span-5 flex flex-col gap-2">
                <h4 class="text-sm font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2">คลิกเพื่อสำรวจแต่ละเลเยอร์:</h4>
                <div id="osi-stack" class="flex flex-col gap-1.5"></div>
                <button id="btn-encap" class="mt-4 px-4 py-2 bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white rounded-lg text-sm font-medium transition-all shadow-md">
                    จำลองแอนิเมชันส่งข้อมูล (Encapsulation)
                </button>
            </div>
            
            <!-- Layer details panel -->
            <div class="md:col-span-7 flex flex-col justify-between bg-white dark:bg-slate-950/80 p-5 rounded-lg border border-slate-200 dark:border-slate-800/80 min-h-[340px]">
                <div id="osi-details">
                    <div class="text-center py-12 text-slate-500 dark:text-slate-400">
                        <svg class="mx-auto h-12 w-12 text-slate-400 dark:text-slate-500 mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122"/>
                        </svg>
                        คลิกเลือกเลเยอร์ทางด้านซ้าย หรือกดปุ่มจำลองการส่งข้อมูล เพื่อดูรายละเอียดการทำงาน
                    </div>
                </div>
                
                <!-- Status monitor -->
                <div id="osi-status" class="mt-4 p-3 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg text-xs font-mono text-emerald-600 dark:text-emerald-400 hidden">
                    Status: Ready
                </div>
            </div>
        </div>
    `;

    const stackContainer = document.getElementById("osi-stack");
    const detailsContainer = document.getElementById("osi-details");
    const statusBox = document.getElementById("osi-status");
    const btnEncap = document.getElementById("btn-encap");

    // Render layers list
    layers.forEach(layer => {
        const btn = document.createElement("button");
        btn.id = `layer-btn-${layer.num}`;
        btn.className = "w-full text-left p-3 rounded-lg border border-slate-200 dark:border-slate-700/30 bg-white dark:bg-slate-800/50 hover:bg-slate-55 dark:hover:bg-slate-800 text-slate-800 dark:text-slate-200 transition-all flex items-center justify-between";
        btn.innerHTML = `
            <div class="flex items-center gap-3">
                <span class="w-6 h-6 rounded-full bg-indigo-50 dark:bg-indigo-900/60 text-indigo-600 dark:text-indigo-300 flex items-center justify-center font-mono text-xs border border-indigo-200 dark:border-indigo-700/50">${layer.num}</span>
                <div>
                    <div class="font-bold text-sm text-slate-800 dark:text-slate-100">${layer.name}</div>
                    <div class="text-xs text-slate-500 dark:text-slate-400">${layer.nameTh}</div>
                </div>
            </div>
            <span class="text-xs font-mono px-2 py-0.5 rounded bg-emerald-50 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800/50">${layer.pdu}</span>
        `;
        btn.onclick = () => selectLayer(layer);
        stackContainer.appendChild(btn);
    });

    function selectLayer(layer, isAnimating = false) {
        // Highlight active button
        layers.forEach(l => {
            const b = document.getElementById(`layer-btn-${l.num}`);
            if (l.num === layer.num) {
                b.className = "w-full text-left p-3 rounded-lg border border-violet-400 dark:border-violet-500/50 bg-violet-55 dark:bg-violet-900/30 text-violet-900 dark:text-violet-200 transition-all flex items-center justify-between ring-1 ring-violet-400/30 dark:ring-violet-500/30";
            } else {
                b.className = "w-full text-left p-3 rounded-lg border border-slate-200 dark:border-slate-700/30 bg-white dark:bg-slate-800/50 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-800 dark:text-slate-200 transition-all flex items-center justify-between";
            }
        });

        // Show details
        detailsContainer.innerHTML = `
            <div class="space-y-4">
                <div class="flex items-center justify-between">
                    <span class="text-xs font-bold uppercase tracking-wider text-violet-600 dark:text-violet-400">Layer ${layer.num}</span>
                    <span class="text-xs font-mono px-2.5 py-1 rounded bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border border-emerald-250 dark:border-emerald-800/80">PDU: ${layer.pdu}</span>
                </div>
                <h3 class="text-2xl font-bold text-slate-800 dark:text-slate-100 mt-1">${layer.name}</h3>
                <p class="text-sm text-slate-500 dark:text-slate-400 italic">${layer.nameTh}</p>
                <div class="h-[1px] bg-slate-200 dark:bg-slate-800 my-2"></div>
                <div>
                    <h5 class="text-xs font-bold text-indigo-600 dark:text-indigo-400 uppercase mb-1">หน้าที่การทำงาน:</h5>
                    <p class="text-sm text-slate-700 dark:text-slate-250">${layer.func}</p>
                </div>
                <div>
                    <h5 class="text-xs font-bold text-indigo-600 dark:text-indigo-400 uppercase mb-1">โปรโตคอล / อุปกรณ์ที่เกี่ยวข้อง:</h5>
                    <p class="text-sm text-slate-700 dark:text-slate-250 font-mono bg-slate-50 dark:bg-slate-900 px-3 py-1.5 rounded border border-slate-200 dark:border-slate-800">${layer.protocols}</p>
                </div>
            </div>
        `;

        if (!isAnimating) {
            statusBox.classList.add("hidden");
        }
    }

    // Encapsulation Simulation Animation
    btnEncap.onclick = async () => {
        btnEncap.disabled = true;
        statusBox.classList.remove("hidden");
        
        let message = "DATA (ข้อความของคุณ)";
        
        for (let i = 0; i < layers.length; i++) {
            const currentLayer = layers[i];
            selectLayer(currentLayer, true);
            
            // Build visual representation of encapsulation
            if (currentLayer.num === 7) {
                message = `[Data: Hello World]`;
                statusBox.innerHTML = `[L7] สร้างข้อมูลดิบ: ${message}`;
            } else if (currentLayer.num === 6) {
                message = `[SSL Encrypted: ${message}]`;
                statusBox.innerHTML = `[L6] แปลงรูปแบบข้อมูล & เข้ารหัส: ${message}`;
            } else if (currentLayer.num === 5) {
                message = `[Session Session_ID: 9812 | ${message}]`;
                statusBox.innerHTML = `[L5] สร้างเซสชันเชื่อมต่อการส่ง: ${message}`;
            } else if (currentLayer.num === 4) {
                message = `[TCP Header (SrcPort: 52932, DstPort: 443) | ${message}]`;
                statusBox.innerHTML = `[L4] ห่อหุ้มเป็น Segment (ใส่ TCP Header): ${message}`;
            } else if (currentLayer.num === 3) {
                message = `[IP Header (SrcIP: 192.168.1.15, DstIP: 8.8.8.8) | ${message}]`;
                statusBox.innerHTML = `[L3] ห่อหุ้มเป็น Packet (ใส่ IP Header): ${message}`;
            } else if (currentLayer.num === 2) {
                message = `[Ethernet Frame Header (SrcMAC: AA-11..., DstMAC: BB-22...) | ${message} | Trailer (FCS)]`;
                statusBox.innerHTML = `[L2] ห่อหุ้มเป็น Frame (ใส่ MAC Address และ FCS ท้ายเฟรม): ${message}`;
            } else if (currentLayer.num === 1) {
                message = `01001000 01100101 01101100 01101100 01101111 ...`;
                statusBox.innerHTML = `[L1] แปลงข้อมูลเฟรมเป็นสัญญาณไฟฟ้า (Bits) ส่งออกผ่านสายแลน: ${message}`;
            }

            // Wait 2 seconds per layer
            await new Promise(resolve => setTimeout(resolve, 2000));
        }

        statusBox.innerHTML = `🌟 การส่งข้อมูล (Encapsulation) เสร็จสมบูรณ์! ข้อมูลถูกส่งผ่านเครือข่ายในรูปสัญญาณ Bits`;
        btnEncap.disabled = false;
    };
}


// Initialize TCP Handshake Simulation
function initTCPVisualizer(containerId) {
    const container = document.getElementById(containerId);
    if (!container) return;

    // Render UI Layout
    container.innerHTML = `
        <div class="p-4 bg-slate-100 dark:bg-slate-900/40 rounded-xl border border-slate-200 dark:border-slate-700/50 flex flex-col gap-6">
            <!-- Node visual area -->
            <div class="relative bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-lg p-8 min-h-[180px] flex items-center justify-between overflow-hidden">
                <!-- Client -->
                <div class="flex flex-col items-center z-10">
                    <div class="w-14 h-14 bg-indigo-50 dark:bg-indigo-900/80 rounded-xl border-2 border-indigo-500 flex items-center justify-center text-slate-800 dark:text-white text-xl font-bold shadow-lg shadow-indigo-500/20">
                        💻
                    </div>
                    <span class="text-sm font-bold text-slate-800 dark:text-slate-200 mt-2">Client</span>
                    <span id="client-state" class="text-xs font-mono px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 mt-1 border border-slate-200 dark:border-slate-700">CLOSED</span>
                </div>

                <!-- Simulation Line -->
                <div class="absolute left-[80px] right-[80px] h-[3px] bg-slate-200 dark:bg-slate-850 top-[60px] z-0">
                    <!-- Animated Packet -->
                    <div id="handshake-packet" class="absolute w-6 h-6 bg-amber-500 rounded-full border border-white flex items-center justify-center text-[10px] text-white font-bold opacity-0 transition-all duration-1000 shadow-md shadow-amber-500/50">
                        ✉️
                    </div>
                </div>

                <!-- Server -->
                <div class="flex flex-col items-center z-10">
                    <div class="w-14 h-14 bg-violet-50 dark:bg-violet-900/80 rounded-xl border-2 border-violet-500 flex items-center justify-center text-slate-800 dark:text-white text-xl font-bold shadow-lg shadow-violet-500/20">
                        🖥️
                    </div>
                    <span class="text-sm font-bold text-slate-800 dark:text-slate-200 mt-2">Server (Port 80)</span>
                    <span id="server-state" class="text-xs font-mono px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 mt-1 border border-slate-200 dark:border-slate-700">LISTEN</span>
                </div>
            </div>

            <!-- Controller -->
            <div class="flex flex-wrap gap-3 justify-center">
                <button id="btn-handshake" class="px-4 py-2 bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white rounded-lg text-sm font-medium transition-all shadow-md">
                    เริ่มการเชื่อมต่อ (Start Handshake)
                </button>
                <button id="btn-reset-handshake" class="px-4 py-2 bg-slate-200 hover:bg-slate-300 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 rounded-lg text-sm font-medium transition-all border border-slate-300 dark:border-slate-700">
                    รีเซ็ต (Reset)
                </button>
            </div>

            <!-- Console logs -->
            <div class="bg-slate-50 dark:bg-slate-950 p-4 rounded-lg border border-slate-200 dark:border-slate-800 text-xs font-mono text-slate-700 dark:text-slate-300 min-h-[120px] flex flex-col gap-1.5" id="handshake-logs">
                <div class="text-slate-400 dark:text-slate-500">&gt; พร้อมจำลองการทำงาน. กด "เริ่มการเชื่อมต่อ" เพื่อดูขั้นตอน</div>
            </div>
        </div>
    `;

    const clientState = document.getElementById("client-state");
    const serverState = document.getElementById("server-state");
    const packet = document.getElementById("handshake-packet");
    const btnHandshake = document.getElementById("btn-handshake");
    const btnReset = document.getElementById("btn-reset-handshake");
    const logs = document.getElementById("handshake-logs");

    function addLog(text, colorClass = "text-slate-700 dark:text-slate-300") {
        const div = document.createElement("div");
        div.className = colorClass;
        div.innerText = `> ${text}`;
        logs.appendChild(div);
        logs.scrollTop = logs.scrollHeight;
    }

    function resetVisualizer() {
        clientState.innerText = "CLOSED";
        clientState.className = "text-xs font-mono px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 mt-1 border border-slate-200 dark:border-slate-700";
        
        serverState.innerText = "LISTEN";
        serverState.className = "text-xs font-mono px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 mt-1 border border-slate-200 dark:border-slate-700";
        
        packet.style.opacity = "0";
        packet.style.left = "0%";
        logs.innerHTML = '<div class="text-slate-400 dark:text-slate-500">&gt; รีเซ็ตระบบการจำลองแล้ว. พร้อมเริ่มใหม่</div>';
        btnHandshake.disabled = false;
    }

    btnReset.onclick = resetVisualizer;

    btnHandshake.onclick = async () => {
        btnHandshake.disabled = true;
        logs.innerHTML = '';
        
        addLog("เริ่มขั้นตอน TCP 3-Way Handshake...", "text-indigo-600 dark:text-indigo-400 font-bold");
        await new Promise(r => setTimeout(r, 1000));

        // 1. SYN: Client -> Server
        addLog("ขั้นตอนที่ 1: Client ส่งแพ็กเก็ต SYN (Synchronize) ไปหา Server", "text-slate-700 dark:text-slate-300");
        addLog("ตั้งค่า Seq = 100 (สุ่มตัวเลขเริ่มต้น), Control Flags = [SYN]", "text-slate-500 dark:text-slate-400");
        
        // Client transitions to SYN_SENT
        clientState.innerText = "SYN_SENT";
        clientState.className = "text-xs font-mono px-2 py-0.5 rounded bg-amber-50 dark:bg-amber-950 text-amber-700 dark:text-amber-300 mt-1 border border-amber-200 dark:border-amber-800";
        
        // Animate packet Client to Server
        packet.style.opacity = "1";
        packet.style.left = "0%";
        packet.style.backgroundColor = "#e63946"; // red for syn
        packet.innerText = "SYN";
        await new Promise(r => setTimeout(r, 100)); // micro delay
        packet.style.left = "calc(100% - 24px)";
        
        // Wait for packet to arrive
        await new Promise(r => setTimeout(r, 1200));
        packet.style.opacity = "0";
        
        // Server transitions to SYN_RCVD
        serverState.innerText = "SYN_RCVD";
        serverState.className = "text-xs font-mono px-2 py-0.5 rounded bg-amber-50 dark:bg-amber-950 text-amber-700 dark:text-amber-300 mt-1 border border-amber-200 dark:border-amber-800";
        addLog("Server ได้รับสัญญาณ SYN ตรวจสอบคีย์และเตรียมหน่วยความจำรองรับ", "text-slate-700 dark:text-slate-300");
        await new Promise(r => setTimeout(r, 1000));

        // 2. SYN-ACK: Server -> Client
        addLog("ขั้นตอนที่ 2: Server ตอบกลับด้วยแพ็กเก็ต SYN-ACK (Synchronize-Acknowledge)", "text-slate-700 dark:text-slate-300");
        addLog("ตั้งค่า Seq = 500 (สุ่มฝั่งเซิร์ฟเวอร์), Ack = 101 (ค่า Seq เดิม + 1), Control Flags = [SYN, ACK]", "text-slate-500 dark:text-slate-400");
        
        // Animate packet Server to Client
        packet.style.opacity = "1";
        packet.style.left = "calc(100% - 24px)";
        packet.style.backgroundColor = "#0d6efd"; // blue for syn-ack
        packet.innerText = "S-A";
        await new Promise(r => setTimeout(r, 100));
        packet.style.left = "0%";
        
        // Wait for packet to arrive
        await new Promise(r => setTimeout(r, 1200));
        packet.style.opacity = "0";
        
        // Client transitions to ESTABLISHED
        clientState.innerText = "ESTABLISHED";
        clientState.className = "text-xs font-mono px-2 py-0.5 rounded bg-emerald-50 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 mt-1 border border-emerald-200 dark:border-emerald-800";
        addLog("Client ได้รับคำตอบรับ ปรับสถานะเป็นเชื่อมต่อสำเร็จ (ESTABLISHED)", "text-emerald-600 dark:text-emerald-400 font-bold");
        await new Promise(r => setTimeout(r, 1000));

        // 3. ACK: Client -> Server
        addLog("ขั้นตอนที่ 3: Client ส่งคำยืนยันสุดท้าย ACK (Acknowledge) กลับไปหา Server", "text-slate-700 dark:text-slate-300");
        addLog("ตั้งค่า Seq = 101, Ack = 501 (ค่า Seq ของ Server + 1), Control Flags = [ACK]", "text-slate-500 dark:text-slate-400");
        
        // Animate packet Client to Server
        packet.style.opacity = "1";
        packet.style.left = "0%";
        packet.style.backgroundColor = "#198754"; // green for ack
        packet.innerText = "ACK";
        await new Promise(r => setTimeout(r, 100));
        packet.style.left = "calc(100% - 24px)";
        
        // Wait for packet to arrive
        await new Promise(r => setTimeout(r, 1200));
        packet.style.opacity = "0";
        
        // Server transitions to ESTABLISHED
        serverState.innerText = "ESTABLISHED";
        serverState.className = "text-xs font-mono px-2 py-0.5 rounded bg-emerald-50 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 mt-1 border border-emerald-200 dark:border-emerald-800";
        addLog("Server ได้รับคำยืนยัน ปรับสถานะเป็นเชื่อมต่อสำเร็จ (ESTABLISHED)", "text-emerald-600 dark:text-emerald-400 font-bold");
        await new Promise(r => setTimeout(r, 1000));

        addLog("🎉 สำเร็จ! สถาปนาช่องทางการเชื่อมต่อ TCP สำเร็จ สามารถเริ่มรับส่งเว็บข้อมูล (HTTP/HTTPS) ได้ทันที", "text-emerald-600 dark:text-emerald-400 font-bold");
    };
}

// Initialize Encapsulation / Decapsulation Simulation
function initEncapDecapVisualizer(containerId) {
    const container = document.getElementById(containerId);
    if (!container) return;

    container.innerHTML = `
        <div class="p-4 bg-slate-100 dark:bg-slate-900/40 rounded-xl border border-slate-200 dark:border-slate-700/50 flex flex-col gap-5">
            <div class="flex flex-col sm:flex-row gap-3 items-center">
                <input type="text" id="encap-msg-input" value="Hello Cisco" placeholder="พิมพ์ข้อความของคุณ..." class="w-full sm:w-64 px-3 py-2 text-sm bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-lg text-slate-900 dark:text-slate-100 focus:outline-none focus:border-violet-500">
                <div class="flex gap-2 w-full sm:w-auto">
                    <button id="btn-encap-sim" class="flex-1 sm:flex-none px-4 py-2 bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white rounded-lg text-sm font-medium transition-all shadow-md">ห่อหุ้ม (Encapsulate)</button>
                    <button id="btn-decap-sim" class="flex-1 sm:flex-none px-4 py-2 bg-slate-200 hover:bg-slate-300 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 rounded-lg text-sm font-medium transition-all border border-slate-300 dark:border-slate-700" disabled>แกะห่อ (Decapsulate)</button>
                </div>
            </div>

            <!-- Visualization Pane -->
            <div class="bg-white dark:bg-slate-950 rounded-lg p-5 border border-slate-200 dark:border-slate-800 min-h-[160px] flex flex-col items-center justify-center gap-4">
                <div id="encap-visual-box" class="flex flex-wrap items-center justify-center gap-1 text-xs font-mono font-bold select-none transition-all duration-300">
                    <span id="encap-data-block" class="px-3 py-2 rounded bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800">DATA: Hello Cisco</span>
                </div>
                <div id="encap-pdu-label" class="text-sm font-bold text-slate-500 dark:text-slate-400">PDU: Data (Application Layer)</div>
            </div>

            <!-- Log Pane -->
            <div id="encap-logs" class="bg-slate-50 dark:bg-slate-950 p-4 rounded-lg border border-slate-200 dark:border-slate-800 text-xs font-mono text-slate-700 dark:text-slate-300 min-h-[100px] flex flex-col gap-1.5">
                <div class="text-slate-400 dark:text-slate-500">&gt; ป้อนข้อความด้านบน แล้วกดปุ่ม "ห่อหุ้ม (Encapsulate)" เพื่อเริ่มต้น</div>
            </div>
        </div>
    `;

    const input = document.getElementById("encap-msg-input");
    const btnEncap = document.getElementById("btn-encap-sim");
    const btnDecap = document.getElementById("btn-decap-sim");
    const visualBox = document.getElementById("encap-visual-box");
    const pduLabel = document.getElementById("encap-pdu-label");
    const logs = document.getElementById("encap-logs");

    let currentEncapsulatedMessage = "";
    let dataValue = "Hello Cisco";

    function addLog(text, colorClass = "text-slate-700 dark:text-slate-300") {
        const div = document.createElement("div");
        div.className = colorClass;
        div.innerText = `> ${text}`;
        logs.appendChild(div);
        logs.scrollTop = logs.scrollHeight;
    }

    btnEncap.onclick = async () => {
        dataValue = input.value.trim() || "Hello Cisco";
        btnEncap.disabled = true;
        btnDecap.disabled = true;
        logs.innerHTML = "";
        
        addLog("เริ่มต้นขั้นตอนการ Encapsulation ข้อมูลฝั่งผู้ส่ง...", "text-indigo-650 dark:text-indigo-400 font-bold");
        
        // 1. Data (L7-L5)
        pduLabel.innerText = "PDU: Data (Application / Presentation / Session)";
        visualBox.innerHTML = `<span id="encap-data" class="px-3 py-2 rounded bg-emerald-50 dark:bg-emerald-900/60 text-emerald-700 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-700 transition-all duration-300">DATA: ${dataValue}</span>`;
        addLog(`[L7-L5] สร้างข้อมูลแอปพลิเคชัน: "${dataValue}"`);
        await new Promise(r => setTimeout(r, 1800));

        // 2. Segment (L4)
        pduLabel.innerText = "PDU: Segment (Transport Layer)";
        visualBox.innerHTML = `
            <span class="px-3 py-2 rounded bg-indigo-50 dark:bg-indigo-900/65 text-indigo-700 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-700 transition-all duration-300 animate-pulse">TCP Header</span>
            <span class="px-3 py-2 rounded bg-emerald-50 dark:bg-emerald-900/60 text-emerald-700 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-700">DATA: ${dataValue}</span>
        `;
        addLog("[L4] เติม TCP Header (ระบุ Port) -> ได้หน่วยข้อมูล Segment");
        await new Promise(r => setTimeout(r, 1800));

        // 3. Packet (L3)
        pduLabel.innerText = "PDU: Packet (Network Layer)";
        visualBox.innerHTML = `
            <span class="px-3 py-2 rounded bg-violet-50 dark:bg-violet-900/65 text-violet-750 dark:text-violet-300 border border-violet-200 dark:border-violet-700 transition-all duration-300 animate-pulse">IP Header</span>
            <span class="px-3 py-2 rounded bg-indigo-50 dark:bg-indigo-900/40 text-indigo-700 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800">TCP Header</span>
            <span class="px-3 py-2 rounded bg-emerald-50 dark:bg-emerald-900/40 text-emerald-700 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800">DATA: ${dataValue}</span>
        `;
        addLog("[L3] เติม IP Header (ระบุ IP ปลายทาง) -> ได้หน่วยข้อมูล Packet");
        await new Promise(r => setTimeout(r, 1800));

        // 4. Frame (L2)
        pduLabel.innerText = "PDU: Frame (Data Link Layer)";
        visualBox.innerHTML = `
            <span class="px-3 py-2 rounded bg-purple-50 dark:bg-purple-900/65 text-purple-700 dark:text-purple-300 border border-purple-200 dark:border-purple-700 transition-all duration-300 animate-pulse">MAC Header</span>
            <span class="px-3 py-2 rounded bg-violet-50 dark:bg-violet-900/40 text-violet-750 dark:text-violet-300 border border-violet-200 dark:border-violet-800">IP Header</span>
            <span class="px-3 py-2 rounded bg-indigo-50 dark:bg-indigo-900/30 text-indigo-755 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-850">TCP Header</span>
            <span class="px-3 py-2 rounded bg-emerald-50 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-850">DATA: ${dataValue}</span>
        `;
        addLog("[L2] เติม MAC Header (ระบุ MAC Address) และ FCS ท้ายเฟรม -> ได้หน่วยข้อมูล Frame");
        await new Promise(r => setTimeout(r, 1800));

        // 5. Bits (L1)
        pduLabel.innerText = "PDU: Bits (Physical Layer)";
        let bits = "";
        for(let i=0; i<dataValue.length && i<4; i++) {
            bits += dataValue.charCodeAt(i).toString(2).padStart(8, '0') + " ";
        }
        bits += "...";
        visualBox.innerHTML = `
            <span class="px-4 py-2.5 rounded bg-pink-50 dark:bg-pink-900/60 text-pink-700 dark:text-pink-300 border border-pink-200 dark:border-pink-700 font-mono text-sm animate-pulse">
                ⚡ BITS: ${bits}
            </span>
        `;
        addLog("[L1] แปลงข้อมูล Frame ทั้งหมดเป็นกระแสไฟฟ้า/แสง (Bits) ส่งไปตามสายแลน");
        await new Promise(r => setTimeout(r, 1500));

        addLog("🌟 กระบวนการ Encapsulation เสร็จสิ้น! ข้อมูลพร้อมให้ฝั่งรับถอดรหัสแล้ว", "text-emerald-600 dark:text-emerald-400 font-bold");
        btnEncap.disabled = false;
        btnDecap.disabled = false;
    };

    btnDecap.onclick = async () => {
        btnEncap.disabled = true;
        btnDecap.disabled = true;
        logs.innerHTML = "";
        
        addLog("เริ่มต้นขั้นตอนการ Decapsulation ข้อมูลฝั่งผู้รับ...", "text-indigo-650 dark:text-indigo-400 font-bold");
        await new Promise(r => setTimeout(r, 1000));

        // 1. Receive Bits (L1)
        pduLabel.innerText = "PDU: Bits (Physical Layer)";
        addLog("[L1] ได้รับสัญญาณ Bits เข้ามาทางการ์ดแลน");
        await new Promise(r => setTimeout(r, 1500));

        // 2. Read Frame (L2)
        pduLabel.innerText = "PDU: Frame (Data Link Layer)";
        visualBox.innerHTML = `
            <span class="px-3 py-2 rounded bg-purple-50 dark:bg-purple-900/65 text-purple-700 dark:text-purple-300 border border-purple-200 dark:border-purple-700">MAC Header</span>
            <span class="px-3 py-2 rounded bg-violet-50 dark:bg-violet-900/40 text-violet-750 dark:text-violet-300 border border-violet-200 dark:border-violet-800">IP Header</span>
            <span class="px-3 py-2 rounded bg-indigo-50 dark:bg-indigo-900/30 text-indigo-755 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-850">TCP Header</span>
            <span class="px-3 py-2 rounded bg-emerald-50 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-850">DATA: ${dataValue}</span>
            <span class="px-3 py-2 rounded bg-rose-50 dark:bg-rose-900/65 text-rose-700 dark:text-rose-300 border border-rose-200 dark:border-rose-700">FCS Trailer</span>
        `;
        addLog("[L2] ตรวจสอบความถูกต้องผ่าน FCS และแกะ MAC Header / FCS ออกเพื่อส่งต่อ");
        await new Promise(r => setTimeout(r, 1800));

        // 3. Read Packet (L3)
        pduLabel.innerText = "PDU: Packet (Network Layer)";
        visualBox.innerHTML = `
            <span class="px-3 py-2 rounded bg-violet-50 dark:bg-violet-900/65 text-violet-755 dark:text-violet-300 border border-violet-200 dark:border-violet-700">IP Header</span>
            <span class="px-3 py-2 rounded bg-indigo-50 dark:bg-indigo-900/40 text-indigo-700 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800">TCP Header</span>
            <span class="px-3 py-2 rounded bg-emerald-50 dark:bg-emerald-900/40 text-emerald-700 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800">DATA: ${dataValue}</span>
        `;
        addLog("[L3] ตรวจสอบ Destination IP ตรงกับเครื่องตัวเอง แกะ IP Header ออกเพื่อส่งต่อ");
        await new Promise(r => setTimeout(r, 1800));

        // 4. Read Segment (L4)
        pduLabel.innerText = "PDU: Segment (Transport Layer)";
        visualBox.innerHTML = `
            <span class="px-3 py-2 rounded bg-indigo-50 dark:bg-indigo-900/65 text-indigo-700 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-700">TCP Header</span>
            <span class="px-3 py-2 rounded bg-emerald-50 dark:bg-emerald-900/60 text-emerald-700 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800">DATA: ${dataValue}</span>
        `;
        addLog("[L4] ตรวจสอบหมายเลข Port ส่งต่อให้โปรแกรมที่รับผิดชอบ แกะ TCP Header ออก");
        await new Promise(r => setTimeout(r, 1800));

        // 5. Data (L7)
        pduLabel.innerText = "PDU: Data (Application Layer)";
        visualBox.innerHTML = `<span class="px-3 py-2 rounded bg-emerald-50 dark:bg-emerald-900/60 text-emerald-700 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-700">DATA: ${dataValue}</span>`;
        addLog(`[L7] แอปพลิเคชันได้รับข้อความที่สมบูรณ์แบบ: "${dataValue}"`, "text-emerald-600 dark:text-emerald-400 font-bold");
        
        await new Promise(r => setTimeout(r, 1000));
        addLog("🎉 สำเร็จ! การแกะห่อหุ้มข้อมูล (Decapsulation) เรียบร้อยแล้ว", "text-emerald-600 dark:text-emerald-400 font-bold");
        
        btnEncap.disabled = false;
        btnDecap.disabled = true;
    };
}

// Initialize Cisco IOS CLI Terminal Simulator
function initCLISimulator(containerId) {
    const container = document.getElementById(containerId);
    if (!container) return;

    container.innerHTML = `
        <div class="grid grid-cols-1 lg:grid-cols-12 gap-6 p-4 bg-slate-100 dark:bg-slate-900/40 rounded-xl border border-slate-200 dark:border-slate-700/50">
            <!-- Left: Network Diagram (SVG) -->
            <div class="lg:col-span-5 flex flex-col items-center justify-between bg-white dark:bg-slate-950 p-4 rounded-xl border border-slate-200 dark:border-slate-800 shadow-inner min-h-[300px]">
                <div class="w-full text-center">
                    <h4 id="diagram-switch-name" class="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Switch Topology</h4>
                </div>
                
                <!-- SVG Diagram representing switch, links, LED, and hosts -->
                <svg id="network-topology-svg" viewBox="0 0 280 200" class="w-full max-h-[220px]">
                    <!-- Switch chassis -->
                    <rect x="70" y="80" width="140" height="36" rx="4" fill="#1e293b" stroke="#334155" stroke-width="2" />
                    <!-- Switch decorative ports (RJ45 representation) -->
                    <!-- Port 1 (Fa0/1) -->
                    <rect x="90" y="88" width="12" height="10" rx="1" fill="#0f172a" />
                    <circle id="topo-led-fa01" cx="96" cy="103" r="2.5" fill="#f43f5e" class="transition-all duration-300" />
                    
                    <!-- Port 5 (Fa0/5) -->
                    <rect x="134" y="88" width="12" height="10" rx="1" fill="#0f172a" />
                    <circle id="topo-led-fa05" cx="140" cy="103" r="2.5" fill="#f43f5e" class="transition-all duration-300" />
                    
                    <!-- Port Gi1/0/1 (Gi1/0/1) -->
                    <rect x="178" y="88" width="12" height="10" rx="1" fill="#0f172a" />
                    <circle id="topo-led-gi101" cx="184" cy="103" r="2.5" fill="#f43f5e" class="transition-all duration-300" />

                    <!-- Hosts -->
                    <!-- PC 1 (Fa0/1) -->
                    <g transform="translate(15, 20)">
                        <rect x="0" y="0" width="30" height="20" rx="2" fill="#64748b" />
                        <rect x="4" y="20" width="22" height="2" fill="#475569" />
                        <path d="M11 22 L5 28 L25 28 L19 22 Z" fill="#334155" />
                        <text x="15" y="13" font-family="monospace" font-size="8" fill="#fff" text-anchor="middle" font-weight="bold">PC1</text>
                        <text x="15" y="38" font-family="sans-serif" font-size="8" fill="#64748b" text-anchor="middle" class="dark:fill-slate-400 font-bold">Fa0/1</text>
                    </g>
                    
                    <!-- PC 2 (Fa0/5) -->
                    <g transform="translate(125, 20)">
                        <rect x="0" y="0" width="30" height="20" rx="2" fill="#64748b" />
                        <rect x="4" y="20" width="22" height="2" fill="#475569" />
                        <path d="M11 22 L5 28 L25 28 L19 22 Z" fill="#334155" />
                        <text x="15" y="13" font-family="monospace" font-size="8" fill="#fff" text-anchor="middle" font-weight="bold">PC2</text>
                        <text x="15" y="38" font-family="sans-serif" font-size="8" fill="#64748b" text-anchor="middle" class="dark:fill-slate-400 font-bold">Fa0/5</text>
                    </g>
                    
                    <!-- Router/Server (Gi1/0/1) -->
                    <g transform="translate(230, 20)">
                        <!-- Router icon (Circle with cross arrows) -->
                        <circle cx="15" cy="12" r="12" fill="#0284c7" stroke="#0369a1" stroke-width="1.5" />
                        <line x1="6" y1="12" x2="24" y2="12" stroke="#fff" stroke-width="1.5" />
                        <line x1="15" y1="3" x2="15" y2="21" stroke="#fff" stroke-width="1.5" />
                        <text x="15" y="38" font-family="sans-serif" font-size="8" fill="#64748b" text-anchor="middle" class="dark:fill-slate-400 font-bold">Gi1/0/1</text>
                        <text x="15" y="-5" font-family="sans-serif" font-size="7" fill="#0284c7" text-anchor="middle" font-weight="bold">Router</text>
                    </g>

                    <!-- Cables (Links) -->
                    <!-- PC1 Link -->
                    <path id="topo-link-fa01" d="M30 48 L96 88" stroke="#f43f5e" stroke-width="2.5" stroke-linecap="round" class="transition-all duration-300" />
                    <!-- PC2 Link -->
                    <path id="topo-link-fa05" d="M140 48 L140 88" stroke="#f43f5e" stroke-width="2.5" stroke-linecap="round" class="transition-all duration-300" />
                    <!-- Router Link -->
                    <path id="topo-link-gi101" d="M245 48 L184 88" stroke="#f43f5e" stroke-width="2.5" stroke-linecap="round" class="transition-all duration-300" />
                    
                    <!-- VLAN Badges -->
                    <!-- PC1 VLAN Badge -->
                    <g id="topo-badge-fa01" transform="translate(38, 56)" class="transition-all duration-300 opacity-0">
                        <rect x="0" y="0" width="22" height="10" rx="2" fill="#e2e8f0" stroke="#cbd5e1" stroke-width="0.5" />
                        <text x="11" y="8" font-family="monospace" font-size="6" fill="#475569" font-weight="bold" text-anchor="middle" id="topo-badge-text-fa01">V1</text>
                    </g>
                    <!-- PC2 VLAN Badge -->
                    <g id="topo-badge-fa05" transform="translate(145, 56)" class="transition-all duration-300 opacity-0">
                        <rect x="0" y="0" width="22" height="10" rx="2" fill="#e2e8f0" stroke="#cbd5e1" stroke-width="0.5" />
                        <text x="11" y="8" font-family="monospace" font-size="6" fill="#475569" font-weight="bold" text-anchor="middle" id="topo-badge-text-fa05">V1</text>
                    </g>
                    <!-- Router VLAN Badge -->
                    <g id="topo-badge-gi101" transform="translate(200, 56)" class="transition-all duration-300 opacity-0">
                        <rect x="0" y="0" width="22" height="10" rx="2" fill="#e2e8f0" stroke="#cbd5e1" stroke-width="0.5" />
                        <text x="11" y="8" font-family="monospace" font-size="6" fill="#475569" font-weight="bold" text-anchor="middle" id="topo-badge-text-gi101">V1</text>
                    </g>
                </svg>

                <!-- Status indicator cards -->
                <div class="w-full grid grid-cols-3 gap-2 mt-2 pt-2 border-t border-slate-100 dark:border-slate-900">
                    <div class="text-[9px] flex flex-col items-center p-1 bg-slate-55 dark:bg-slate-900 rounded">
                        <span class="text-slate-400 uppercase font-semibold">PC1 IP</span>
                        <span class="font-mono font-bold text-slate-700 dark:text-slate-300">192.168.1.10</span>
                    </div>
                    <div class="text-[9px] flex flex-col items-center p-1 bg-slate-55 dark:bg-slate-900 rounded">
                        <span class="text-slate-400 uppercase font-semibold">PC2 IP</span>
                        <span class="font-mono font-bold text-slate-700 dark:text-slate-300">192.168.1.20</span>
                    </div>
                    <div class="text-[9px] flex flex-col items-center p-1 bg-slate-55 dark:bg-slate-900 rounded">
                        <span class="text-slate-400 uppercase font-semibold">ROUTER IP</span>
                        <span class="font-mono font-bold text-slate-700 dark:text-slate-300">192.168.1.254</span>
                    </div>
                </div>
            </div>

            <!-- Right: CLI Terminal -->
            <div class="lg:col-span-7 flex flex-col h-[380px] bg-black text-slate-100 rounded-xl border border-slate-800 shadow-2xl font-mono overflow-hidden select-none">
                <!-- Terminal header -->
                <div class="flex items-center justify-between px-4 py-2.5 bg-slate-900 border-b border-slate-850 shrink-0">
                    <div class="flex items-center gap-1.5">
                        <span class="w-3 h-3 rounded-full bg-rose-500"></span>
                        <span class="w-3 h-3 rounded-full bg-amber-500"></span>
                        <span class="w-3 h-3 rounded-full bg-emerald-500"></span>
                        <span class="text-xs text-slate-400 font-bold ml-2">Cisco Catalyst Switch - IOS Simulator</span>
                    </div>
                    <div class="text-[10px] text-indigo-400 px-2 py-0.5 rounded bg-indigo-950/50 border border-indigo-900/50 font-bold">
                        Terminal
                    </div>
                </div>

                <!-- Terminal Output Pane -->
                <div id="cli-screen" class="flex-1 p-4 overflow-y-auto text-sm space-y-1.5 leading-relaxed selection:bg-indigo-500/30">
                    <div class="text-slate-500">--- Cisco IOS Software, Catalyst L2 Switch, Version 15.2 ---</div>
                    <div class="text-slate-500">Copyright (c) 1986-2026 by Cisco Systems, Inc.</div>
                    <div class="text-slate-400 text-xs">Press ENTER or type "?" to see available commands.</div>
                </div>

                <!-- Terminal Input Prompt -->
                <div class="flex items-center gap-1 px-4 py-2.5 bg-slate-950 border-t border-slate-900 shrink-0 text-sm">
                    <span id="cli-prompt" class="font-bold text-emerald-400">Switch></span>
                    <input type="text" id="cli-input" class="flex-1 bg-transparent border-none outline-none text-slate-100 font-mono text-sm caret-indigo-500" autofocus autocomplete="off" spellcheck="false">
                </div>
            </div>
        </div>
    `;

    const screen = document.getElementById("cli-screen");
    const prompt = document.getElementById("cli-prompt");
    const input = document.getElementById("cli-input");

    // Click terminal to focus input
    container.querySelector(".bg-black").addEventListener("click", () => {
        input.focus();
    });

    // CLI State
    let state = {
        hostname: "Switch",
        mode: "user", // user, privileged, config, interface, line, vlan
        enableSecret: "",
        serviceEncryption: false,
        bannerMotd: "",
        interfaceName: "",
        lineName: "",
        vlanNameActive: 1,
        ipDomainName: "",
        rsaKeysGenerated: false,
        sshVersion: 0,
        awaitingRsaBits: false,
        ipDefaultGateway: "",
        vtyConfig: {
            transport: "",
            login: ""
        },
        users: {},
        interfaces: {
            "Vlan1": { ipAddress: "", subnetMask: "", status: "down", mode: "access", accessVlan: 1 },
            "FastEthernet0/1": { ipAddress: "", subnetMask: "", status: "up", mode: "access", accessVlan: 1 },
            "FastEthernet0/5": { ipAddress: "", subnetMask: "", status: "up", mode: "access", accessVlan: 1 },
            "GigabitEthernet1/0/1": { ipAddress: "", subnetMask: "", status: "up", mode: "access", accessVlan: 1, allowedVlans: [1] }
        },
        vlanList: [
            { id: 1, name: "default" }
        ],
        saved: null
    };

    // Initialize default saved state
    state.saved = JSON.parse(JSON.stringify(state));

    function notifyStateChanged() {
        if (window.cliEventBroker) {
            window.cliEventBroker.publish(state);
        }
    }

    let history = [];
    let historyIdx = -1;

    function getPromptSymbol() {
        const host = state.hostname;
        switch(state.mode) {
            case "user": return `${host}>`;
            case "privileged": return `${host}#`;
            case "config": return `${host}(config)#`;
            case "interface": return `${host}(config-if)#`;
            case "line": return `${host}(config-line)#`;
            case "vlan": return `${host}(config-vlan)#`;
            default: return `${host}>`;
        }
    }

    function updatePrompt() {
        if (state.awaitingRsaBits) {
            prompt.innerText = "";
        } else {
            prompt.innerText = getPromptSymbol();
        }
    }

    function writeOutput(text, type = "normal") {
        const div = document.createElement("div");
        if (type === "error") {
            div.className = "text-rose-400 font-semibold";
        } else if (type === "success") {
            div.className = "text-emerald-400";
        } else if (type === "command") {
            div.className = "text-slate-400 font-semibold mt-2";
        } else if (type === "header") {
            div.className = "text-indigo-400 font-bold";
        } else {
            div.className = "text-slate-200";
        }
        div.innerHTML = text;
        screen.appendChild(div);
        screen.scrollTop = screen.scrollHeight;
    }

    function hashPassword(pass) {
        if (!pass) return "";
        let hash = 0;
        for (let i = 0; i < pass.length; i++) {
            hash = (hash << 5) - hash + pass.charCodeAt(i);
            hash |= 0;
        }
        return "5 " + Math.abs(hash).toString(16).substring(0, 8) + "abcde";
    }

    function parseTokens(str) {
        return str.trim().split(/\s+/).filter(t => t !== "");
    }

    function matchTokens(inputTokens, patternArray) {
        if (inputTokens.length > patternArray.length) return false;
        for (let i = 0; i < inputTokens.length; i++) {
            if (!patternArray[i].toLowerCase().startsWith(inputTokens[i].toLowerCase())) {
                return false;
            }
        }
        return true;
    }

    function resolveInterfaceName(tokens) {
        if (tokens.length < 2) return null;
        const lower = tokens.slice(1).join("").toLowerCase();
        if (lower.startsWith("vlan1") || lower === "vlan1") return "Vlan1";
        if (lower.startsWith("vlan")) return "Vlan" + lower.substring(4);
        if (lower.startsWith("fa") || lower.startsWith("fast")) return "FastEthernet0/5";
        if (lower.startsWith("gi") || lower.startsWith("giga")) return "GigabitEthernet1/0/1";
        return null;
    }

    // CLI Interpreter
    function executeCommand(line) {
        const trimmed = line.trim();

        // Handle Awaiting Modulus bits input for RSA Key Gen
        if (state.awaitingRsaBits) {
            writeOutput(`How many bits in the modulus [512]: <strong>${trimmed}</strong>`, "command");
            const bits = trimmed === "" ? 512 : parseInt(trimmed);
            if (isNaN(bits) || bits < 360 || bits > 4096) {
                writeOutput("% Modulus size must be between 360 and 4096. Try again or run 'crypto key generate rsa' again.", "error");
            } else {
                writeOutput("Generating RSA keys...");
                state.rsaKeysGenerated = true;
                writeOutput(`% RSA key pair generated with size ${bits} bits.`, "success");
            }
            state.awaitingRsaBits = false;
            updatePrompt();
            return;
        }

        writeOutput(`${getPromptSymbol()} ${trimmed}`, "command");

        if (trimmed === "") return;

        const tokens = parseTokens(trimmed);
        const cmd = tokens[0].toLowerCase();

        // 1. Contextual Help "?"
        if (trimmed === "?") {
            showHelp();
            return;
        }

        // --- USER EXEC MODE COMMANDS ---
        if (state.mode === "user") {
            if (matchTokens(tokens, ["enable"])) {
                state.mode = "privileged";
                updatePrompt();
                return;
            }
            if (matchTokens(tokens, ["exit"])) {
                writeOutput("Disconnecting console. Press Enter to reconnect.");
                return;
            }
            writeOutput(`% Unrecognized command. Type "?" for help.`, "error");
            return;
        }

        // --- PRIVILEGED EXEC MODE COMMANDS ---
        if (state.mode === "privileged") {
            if (matchTokens(tokens, ["disable"])) {
                state.mode = "user";
                updatePrompt();
                return;
            }
            if (matchTokens(tokens, ["configure", "terminal"])) {
                state.mode = "config";
                updatePrompt();
                writeOutput("Enter configuration commands, one per line. End with CNTL/Z.");
                return;
            }
            if (matchTokens(tokens, ["show", "running-config"])) {
                showRunningConfig();
                return;
            }
            if (matchTokens(tokens, ["show", "startup-config"])) {
                showStartupConfig();
                return;
            }
            if (matchTokens(tokens, ["show", "ip", "interface", "brief"])) {
                showIpInterfaceBrief();
                return;
            }
            if (matchTokens(tokens, ["show", "vlan", "brief"]) || matchTokens(tokens, ["show", "vlan"])) {
                showVlanBrief();
                return;
            }
            if (matchTokens(tokens, ["show", "interfaces", "trunk"])) {
                showInterfacesTrunk();
                return;
            }
            if (matchTokens(tokens, ["write", "memory"]) || matchTokens(tokens, ["write"]) || (tokens.length === 3 && matchTokens(tokens, ["copy", "running-config", "startup-config"]))) {
                state.saved = JSON.parse(JSON.stringify(state));
                writeOutput("Building configuration...");
                setTimeout(() => {
                    writeOutput("[OK]", "success");
                }, 500);
                return;
            }
            if (matchTokens(tokens, ["exit"])) {
                state.mode = "user";
                updatePrompt();
                return;
            }
            writeOutput(`% Unrecognized command. Type "?" for help.`, "error");
            return;
        }

        // --- GLOBAL CONFIGURATION MODE COMMANDS ---
        if (state.mode === "config") {
            if (matchTokens(tokens, ["exit"])) {
                state.mode = "privileged";
                updatePrompt();
                return;
            }
            if (matchTokens(tokens, ["end"]) || line.charCodeAt(0) === 26) { // End or Ctrl+Z
                state.mode = "privileged";
                updatePrompt();
                return;
            }
            if (tokens[0] === "hostname" && tokens.length === 2) {
                state.hostname = tokens[1];
                updatePrompt();
                notifyStateChanged();
                return;
            }
            if (tokens.length >= 3 && tokens[0] === "enable" && tokens[1] === "secret") {
                state.enableSecret = tokens.slice(2).join(" ");
                writeOutput("Enable secret updated.", "success");
                return;
            }
            if (matchTokens(tokens, ["service", "password-encryption"])) {
                state.serviceEncryption = true;
                writeOutput("Password encryption service is now enabled.", "success");
                return;
            }
            if (tokens[0] === "no" && matchTokens(tokens.slice(1), ["service", "password-encryption"])) {
                state.serviceEncryption = false;
                writeOutput("Password encryption service is now disabled.");
                return;
            }
            if (tokens[0] === "banner" && tokens[1] === "motd" && tokens.length >= 3) {
                const bannerText = tokens.slice(2).join(" ");
                const delim = bannerText[0];
                if (bannerText.endsWith(delim) && bannerText.length > 1) {
                    state.bannerMotd = bannerText.substring(1, bannerText.length - 1);
                } else {
                    state.bannerMotd = bannerText;
                }
                writeOutput("Banner MOTD updated.", "success");
                return;
            }
            // Interface Navigation
            if ((tokens[0] === "interface" || tokens[0] === "int") && tokens.length >= 2) {
                const iface = resolveInterfaceName(tokens);
                if (iface) {
                    state.interfaceName = iface;
                    if (!state.interfaces[iface]) {
                        state.interfaces[iface] = { ipAddress: "", subnetMask: "", status: "down", mode: "access", accessVlan: 1 };
                    }
                    state.mode = "interface";
                    updatePrompt();
                    return;
                } else {
                    writeOutput("% Invalid interface name.", "error");
                    return;
                }
            }
            // Line Config
            if (tokens[0] === "line" && tokens.length >= 3) {
                state.lineName = tokens.slice(1).join(" ");
                state.mode = "line";
                updatePrompt();
                return;
            }
            // IP Default-Gateway
            if (tokens[0] === "ip" && tokens[1] === "default-gateway" && tokens.length === 3) {
                state.ipDefaultGateway = tokens[2];
                writeOutput("IP Default Gateway set to " + tokens[2], "success");
                return;
            }
            // IP Domain-Name
            if (tokens[0] === "ip" && tokens[1] === "domain-name" && tokens.length === 3) {
                state.ipDomainName = tokens[2];
                writeOutput("Domain Name set to " + tokens[2], "success");
                return;
            }
            // Username Configuration
            if (tokens[0] === "username" && tokens.includes("secret")) {
                const uIdx = tokens.indexOf("username");
                const user = tokens[uIdx + 1];
                const sIdx = tokens.indexOf("secret");
                const secret = tokens.slice(sIdx + 1).join(" ");
                let privilege = 1;
                if (tokens.includes("privilege")) {
                    const pIdx = tokens.indexOf("privilege");
                    privilege = parseInt(tokens[pIdx + 1]) || 1;
                }
                state.users[user] = { privilege, secret };
                writeOutput(`User ${user} configured successfully.`, "success");
                return;
            }
            // Crypto Key Gen RSA
            if (tokens[0] === "crypto" && tokens[1] === "key" && tokens[2] === "generate" && tokens[3] === "rsa") {
                if (!state.ipDomainName) {
                    writeOutput("% Please define a domain name first using 'ip domain-name'.", "error");
                    return;
                }
                writeOutput(`The name for the keys will be: ${state.hostname}.${state.ipDomainName}`);
                writeOutput("Choose the size of the key modulus in the range of 360 to 4096 for your");
                writeOutput("  General Purpose Keys. Choosing a key modulus greater than 512 may take");
                writeOutput("  a few minutes.");
                writeOutput("How many bits in the modulus [512]: ");
                state.awaitingRsaBits = true;
                updatePrompt();
                return;
            }
            // IP SSH version 2
            if (tokens[0] === "ip" && tokens[1] === "ssh" && tokens[2] === "version" && tokens[3] === "2") {
                if (!state.rsaKeysGenerated) {
                    writeOutput("% Please create RSA keys first by running 'crypto key generate rsa'.", "error");
                    return;
                }
                state.sshVersion = 2;
                writeOutput("SSH v2.0 enabled.", "success");
                return;
            }
            // VLAN Creation
            if (tokens[0] === "vlan" && tokens.length === 2) {
                const vlanId = parseInt(tokens[1]);
                if (isNaN(vlanId) || vlanId < 1 || vlanId > 4094) {
                    writeOutput("% VLAN ID must be between 1 and 4094.", "error");
                    return;
                }
                state.vlanNameActive = vlanId;
                if (!state.vlanList.some(v => v.id === vlanId)) {
                    state.vlanList.push({ id: vlanId, name: `VLAN${vlanId}` });
                }
                state.mode = "vlan";
                updatePrompt();
                return;
            }
            writeOutput(`% Invalid input detected. Type "?" for help.`, "error");
            return;
        }

        // --- SUB-CONFIGURATION MODES ---
        if (state.mode === "interface") {
            if (matchTokens(tokens, ["exit"])) {
                state.mode = "config";
                updatePrompt();
                return;
            }
            if (matchTokens(tokens, ["end"])) {
                state.mode = "privileged";
                updatePrompt();
                return;
            }
            if (tokens[0] === "description" && tokens.length >= 2) {
                writeOutput(`Interface description set: "${tokens.slice(1).join(" ")}"`, "success");
                return;
            }
            // IP Address configuration
            if (tokens[0] === "ip" && tokens[1] === "address" && tokens.length === 4) {
                state.interfaces[state.interfaceName].ipAddress = tokens[2];
                state.interfaces[state.interfaceName].subnetMask = tokens[3];
                writeOutput(`IP address ${tokens[2]} configured on ${state.interfaceName}.`, "success");
                notifyStateChanged();
                return;
            }
            // Shutdown / No Shutdown configuration
            if (tokens[0] === "shutdown" || tokens[0] === "shut") {
                state.interfaces[state.interfaceName].status = "down";
                writeOutput(`%LINK-5-CHANGED: Interface ${state.interfaceName}, changed state to administratively down`, "success");
                writeOutput(`%LINEPROTO-5-UPDOWN: Line protocol on Interface ${state.interfaceName}, changed state to down`, "success");
                notifyStateChanged();
                return;
            }
            if ((tokens[0] === "no" && tokens[1] === "shutdown") || (tokens[0] === "no" && tokens[1] === "shut")) {
                state.interfaces[state.interfaceName].status = "up";
                writeOutput(`%LINK-5-CHANGED: Interface ${state.interfaceName}, changed state to up`, "success");
                writeOutput(`%LINEPROTO-5-UPDOWN: Line protocol on Interface ${state.interfaceName}, changed state to up`, "success");
                notifyStateChanged();
                return;
            }
            // Switchport Mode Access
            if (tokens[0] === "switchport" && tokens[1] === "mode" && tokens[2] === "access") {
                state.interfaces[state.interfaceName].mode = "access";
                writeOutput(`Port mode set to Access.`, "success");
                notifyStateChanged();
                return;
            }
            // Switchport Access VLAN
            if (tokens[0] === "switchport" && tokens[1] === "access" && tokens[2] === "vlan" && tokens.length === 4) {
                const vlanId = parseInt(tokens[3]);
                if (isNaN(vlanId)) {
                    writeOutput("% Invalid VLAN ID.", "error");
                    return;
                }
                state.interfaces[state.interfaceName].accessVlan = vlanId;
                if (!state.vlanList.some(v => v.id === vlanId)) {
                    writeOutput(`% Access VLAN does not exist. Creating VLAN ${vlanId}...`);
                    state.vlanList.push({ id: vlanId, name: `VLAN${vlanId}` });
                }
                writeOutput(`Port ${state.interfaceName} assigned to VLAN ${vlanId}.`, "success");
                notifyStateChanged();
                return;
            }
            // Switchport Mode Trunk
            if (tokens[0] === "switchport" && tokens[1] === "mode" && tokens[2] === "trunk") {
                state.interfaces[state.interfaceName].mode = "trunk";
                writeOutput(`Port mode set to Trunk.`, "success");
                notifyStateChanged();
                return;
            }
            // Switchport Trunk Allowed VLAN
            if (tokens[0] === "switchport" && tokens[1] === "trunk" && tokens[2] === "allowed" && tokens[3] === "vlan" && tokens.length === 5) {
                const vlanTokens = tokens[4].split(",").map(v => parseInt(v)).filter(v => !isNaN(v));
                state.interfaces[state.interfaceName].allowedVlans = vlanTokens;
                writeOutput(`Allowed VLANs on Trunk: ${vlanTokens.join(",")}`, "success");
                notifyStateChanged();
                return;
            }
            writeOutput(`% Invalid command in Interface mode. Type "exit" to go back.`, "error");
            return;
        }

        if (state.mode === "line") {
            if (matchTokens(tokens, ["exit"])) {
                state.mode = "config";
                updatePrompt();
                return;
            }
            if (matchTokens(tokens, ["end"])) {
                state.mode = "privileged";
                updatePrompt();
                return;
            }
            // Transport Input SSH
            if (tokens[0] === "transport" && tokens[1] === "input" && tokens[2] === "ssh") {
                state.vtyConfig.transport = "ssh";
                writeOutput("VTY line transport restricted to SSH only.", "success");
                return;
            }
            // Login Local
            if (tokens[0] === "login" && tokens[1] === "local") {
                state.vtyConfig.login = "local";
                writeOutput("Line access restricted to local database credentials.", "success");
                return;
            }
            writeOutput(`% Invalid command in Line mode. Type "exit" to go back.`, "error");
            return;
        }

        if (state.mode === "vlan") {
            if (matchTokens(tokens, ["exit"])) {
                state.mode = "config";
                updatePrompt();
                return;
            }
            if (matchTokens(tokens, ["end"])) {
                state.mode = "privileged";
                updatePrompt();
                return;
            }
            // Name VLAN
            if (tokens[0] === "name" && tokens.length === 2) {
                const vlan = state.vlanList.find(v => v.id === state.vlanNameActive);
                if (vlan) {
                    vlan.name = tokens[1];
                    writeOutput(`VLAN ${state.vlanNameActive} name set to: <strong>${tokens[1]}</strong>`, "success");
                }
                return;
            }
            writeOutput(`% Invalid command in VLAN mode. Type "exit" to go back.`, "error");
            return;
        }
    }

    // Show Help "?"
    function showHelp() {
        if (state.mode === "user") {
            writeOutput("<strong>คำสั่งในโหมด User EXEC:</strong>");
            writeOutput("  enable           - สลับไปโหมดผู้ดูแลระบบ (Privileged EXEC)");
            writeOutput("  exit             - ล็อกเอาต์ออกจากคอนโซล");
        } else if (state.mode === "privileged") {
            writeOutput("<strong>คำสั่งในโหมด Privileged EXEC:</strong>");
            writeOutput("  configure terminal  - เข้าสู่โหมดปรับแต่งตั้งค่าหลัก (Global Config)");
            writeOutput("  disable             - สลับกลับไปโหมดผู้ใช้ทั่วไป (User EXEC)");
            writeOutput("  show running-config - แสดงค่าตั้งค่าที่ทำงานอยู่ใน RAM");
            writeOutput("  show startup-config - แสดงค่าตั้งค่าที่บันทึกถาวรใน NVRAM");
            writeOutput("  show ip interface brief - แสดงตารางสถานะพอร์ตและ IP");
            writeOutput("  show vlan brief     - แสดงตารางสรุปการตั้งค่า VLAN");
            writeOutput("  show interfaces trunk - แสดงพอร์ตที่เป็นสาย Trunk");
            writeOutput("  write memory        - บันทึกการตั้งค่าลง NVRAM (เซฟข้อมูล)");
            writeOutput("  exit                - สลับกลับไปโหมด User EXEC");
        } else if (state.mode === "config") {
            writeOutput("<strong>คำสั่งในโหมด Global Config:</strong>");
            writeOutput("  hostname [ชื่อ]      - เปลี่ยนชื่อตัวเครื่องสวิตช์");
            writeOutput("  enable secret [รหัส] - ตั้งรหัสผ่านสิทธิ์แอดมินแบบเข้ารหัสลับ");
            writeOutput("  service password-encryption - สั่งเข้ารหัสลับรหัสผ่านอื่น ๆ ทั้งระบบ");
            writeOutput("  banner motd #[ข้อความ]# - ตั้งแบนเนอร์แสดงข้อความต้อนรับ");
            writeOutput("  interface [ชื่อพอร์ต] - เข้าไปตั้งค่าพอร์ตนั้น ๆ (เช่น interface vlan 1 หรือ interface fastethernet 0/5)");
            writeOutput("  line [con/vty] [เลข] - เข้าตั้งค่าช่องเชื่อมต่อ (เช่น line vty 0 15)");
            writeOutput("  username [ชื่อ] privilege 15 secret [รหัส] - ตั้งผู้ใช้ล็อกอิน");
            writeOutput("  ip domain-name [โดเมน] - ตั้งชื่อโดเมนเครื่อง");
            writeOutput("  crypto key generate rsa - สร้างคีย์เข้ารหัสลับ RSA");
            writeOutput("  ip default-gateway [IP] - ตั้งเกตเวย์หลัก");
            writeOutput("  vlan [ID]           - สร้างหรือแก้ไข VLAN");
            writeOutput("  exit                - ย้อนกลับไปโหมดก่อนหน้า");
            writeOutput("  end                 - กลับสู่โหมดตั้งค่าหลัก (Privileged EXEC)");
        } else if (state.mode === "interface") {
            writeOutput("<strong>คำสั่งในโหมด Interface Config:</strong>");
            writeOutput("  ip address [IP] [MASK] - กำหนด IP แอดเดรส");
            writeOutput("  no shutdown         - เปิดการทำงานอินเตอร์เฟส");
            writeOutput("  switchport mode [access/trunk] - กำหนดโหมดพอร์ตแลน");
            writeOutput("  switchport access vlan [ID] - จัดพอร์ต Access เข้า VLAN");
            writeOutput("  switchport trunk allowed vlan [VLANs] - ระบุ VLAN ที่ผ่านสาย Trunk");
            writeOutput("  exit                - ย้อนกลับไปโหมด Global Config");
        } else if (state.mode === "vlan") {
            writeOutput("<strong>คำสั่งในโหมด VLAN Config:</strong>");
            writeOutput("  name [ชื่อแผนก]       - ตั้งชื่อให้ VLAN นี้");
            writeOutput("  exit                - ย้อนกลับไปโหมด Global Config");
        } else {
            writeOutput("  exit                - ย้อนกลับสู่โหมดก่อนหน้า");
        }
    }

    function printConfig(cfg) {
        writeOutput("Current configuration : 1380 bytes");
        writeOutput("!");
        writeOutput("version 15.2");
        writeOutput("!");
        writeOutput(`hostname <strong>${cfg.hostname}</strong>`);
        writeOutput("!");
        if (cfg.enableSecret) {
            const secretVal = cfg.serviceEncryption ? hashPassword(cfg.enableSecret) : cfg.enableSecret;
            writeOutput(`enable secret <strong>${secretVal}</strong>`);
        }
        writeOutput("!");
        if (cfg.ipDomainName) {
            writeOutput(`ip domain-name <strong>${cfg.ipDomainName}</strong>`);
        }
        writeOutput("!");
        writeOutput(`service password-encryption: <strong>${cfg.serviceEncryption ? "enabled" : "disabled"}</strong>`);
        writeOutput("!");
        Object.keys(cfg.users).forEach(u => {
            const secretVal = cfg.serviceEncryption ? hashPassword(cfg.users[u].secret) : cfg.users[u].secret;
            writeOutput(`username <strong>${u} privilege ${cfg.users[u].privilege} secret ${secretVal}</strong>`);
        });
        writeOutput("!");
        cfg.vlanList.forEach(v => {
            if (v.id !== 1) {
                writeOutput(`vlan <strong>${v.id}</strong>`);
                writeOutput(` name <strong>${v.name}</strong>`);
            }
        });
        writeOutput("!");
        Object.keys(cfg.interfaces).forEach(ifName => {
            const iface = cfg.interfaces[ifName];
            writeOutput(`interface <strong>${ifName}</strong>`);
            if (iface.ipAddress) {
                writeOutput(` ip address <strong>${iface.ipAddress} ${iface.subnetMask}</strong>`);
            }
            if (iface.mode === "access") {
                writeOutput(` switchport mode access`);
                if (iface.accessVlan !== 1) {
                    writeOutput(` switchport access vlan <strong>${iface.accessVlan}</strong>`);
                }
            } else if (iface.mode === "trunk") {
                writeOutput(` switchport mode trunk`);
                if (iface.allowedVlans) {
                    writeOutput(` switchport trunk allowed vlan <strong>${iface.allowedVlans.join(",")}</strong>`);
                }
            }
            if (iface.status === "down" && ifName.startsWith("Vlan")) {
                writeOutput(" shutdown");
            } else if (iface.status === "up") {
                writeOutput(" no shutdown");
            }
            writeOutput("!");
        });
        if (cfg.ipDefaultGateway) {
            writeOutput(`ip default-gateway <strong>${cfg.ipDefaultGateway}</strong>`);
        }
        writeOutput("!");
        if (cfg.sshVersion) {
            writeOutput(`ip ssh version <strong>${cfg.sshVersion}</strong>`);
        }
        writeOutput("!");
        if (cfg.bannerMotd) {
            writeOutput(`banner motd #<strong>${cfg.bannerMotd}</strong>#`);
        }
        writeOutput("!");
        writeOutput("line console 0");
        writeOutput(" login");
        writeOutput("!");
        writeOutput("line vty 0 15");
        if (cfg.vtyConfig.login) {
            writeOutput(` login <strong>${cfg.vtyConfig.login}</strong>`);
        }
        if (cfg.vtyConfig.transport) {
            writeOutput(` transport input <strong>${cfg.vtyConfig.transport}</strong>`);
        }
        writeOutput("!");
        writeOutput("end");
    }

    // Show mock running-config
    function showRunningConfig() {
        writeOutput("Building configuration...");
        printConfig(state);
    }

    // Show mock startup-config
    function showStartupConfig() {
        if (!state.saved || (!state.saved.enableSecret && state.saved.hostname === "Switch" && Object.keys(state.saved.users).length === 0)) {
            writeOutput("%% Startup-config is not present", "error");
            return;
        }
        writeOutput("Using 1380 bytes");
        printConfig(state.saved);
    }

    // Show mock IP interface brief
    function showIpInterfaceBrief() {
        writeOutput("Interface              IP-Address      OK? Method Status                Protocol");
        Object.keys(state.interfaces).forEach(ifName => {
            const iface = state.interfaces[ifName];
            const ip = iface.ipAddress ? iface.ipAddress.padEnd(15) : "unassigned".padEnd(15);
            const status = iface.status === "up" ? "up".padEnd(21) : "down".padEnd(21);
            const protocol = iface.status === "up" ? "up" : "down";
            writeOutput(`${ifName.padEnd(22)} ${ip} YES manual ${status} ${protocol}`);
        });
    }

    // Show mock VLAN brief
    function showVlanBrief() {
        writeOutput("VLAN Name                             Status    Ports");
        writeOutput("---- -------------------------------- --------- -------------------------------");
        state.vlanList.forEach(v => {
            const ports = [];
            Object.keys(state.interfaces).forEach(ifName => {
                const iface = state.interfaces[ifName];
                if (iface.mode === "access" && iface.accessVlan === v.id) {
                    let shortName = ifName;
                    if (ifName.startsWith("FastEthernet")) shortName = "Fa" + ifName.substring(12);
                    if (ifName.startsWith("GigabitEthernet")) shortName = "Gi" + ifName.substring(15);
                    ports.push(shortName);
                }
            });
            const namePadding = v.name.padEnd(32);
            const statusPadding = "active".padEnd(10);
            writeOutput(`${v.id.toString().padEnd(4)} ${namePadding} ${statusPadding} ${ports.join(", ")}`);
        });
    }

    // Show mock interfaces trunk
    function showInterfacesTrunk() {
        writeOutput("Port        Mode             Encapsulation  Status        Native vlan");
        Object.keys(state.interfaces).forEach(ifName => {
            const iface = state.interfaces[ifName];
            if (iface.mode === "trunk") {
                let shortName = ifName.padEnd(11);
                let mode = "on".padEnd(16);
                let encap = "802.1q".padEnd(14);
                let status = "trunking".padEnd(13);
                let native = "1";
                writeOutput(`${shortName} ${mode} ${encap} ${status} ${native}`);
            }
        });
        writeOutput("");
        writeOutput("Port        Vlans allowed on trunk");
        Object.keys(state.interfaces).forEach(ifName => {
            const iface = state.interfaces[ifName];
            if (iface.mode === "trunk") {
                let shortName = ifName.padEnd(11);
                let allowed = iface.allowedVlans ? iface.allowedVlans.join(",") : "1-4094";
                writeOutput(`${shortName} ${allowed}`);
            }
        });
    }

    // Input handlers
    input.addEventListener("keydown", (e) => {
        if (e.key === "Enter") {
            const val = input.value;
            executeCommand(val);
            if (val.trim() !== "" && !state.awaitingRsaBits) {
                history.push(val);
                historyIdx = history.length;
            }
            input.value = "";
        } else if (e.key === "ArrowUp") {
            e.preventDefault();
            if (historyIdx > 0) {
                historyIdx--;
                input.value = history[historyIdx];
            }
        } else if (e.key === "ArrowDown") {
            e.preventDefault();
            if (historyIdx < history.length - 1) {
                historyIdx++;
                input.value = history[historyIdx];
            } else {
                historyIdx = history.length;
                input.value = "";
            }
        }
    });

    updatePrompt();

    // Task 4: Setup State Binder to dynamically update Network Topology SVG
    if (window.cliEventBroker) {
        window.cliEventBroker.listeners = []; // Reset previous simulation subscribers
        window.cliEventBroker.subscribe((currentState) => {
            // 1. Update Hostname Title in Diagram
            const hostNameEl = document.getElementById("diagram-switch-name");
            if (hostNameEl) {
                hostNameEl.innerText = `${currentState.hostname} Topology`;
            }

            // 2. Map switch interfaces to SVG elements
            const interfaceMappings = [
                { key: "FastEthernet0/1", linkId: "topo-link-fa01", ledId: "topo-led-fa01", badgeId: "topo-badge-fa01", textId: "topo-badge-text-fa01" },
                { key: "FastEthernet0/5", linkId: "topo-link-fa05", ledId: "topo-led-fa05", badgeId: "topo-badge-fa05", textId: "topo-badge-text-fa05" },
                { key: "GigabitEthernet1/0/1", linkId: "topo-link-gi101", ledId: "topo-led-gi101", badgeId: "topo-badge-gi101", textId: "topo-badge-text-gi101" }
            ];

            const vlanColors = {
                1: "#10b981",    // emerald-500 for Default VLAN 1
                10: "#6366f1",   // indigo-500 for VLAN 10 (Accounting)
                20: "#f59e0b"    // amber-500 for VLAN 20 (Marketing)
            };

            interfaceMappings.forEach(mapping => {
                const iface = currentState.interfaces[mapping.key];
                if (!iface) return;

                const linkEl = document.getElementById(mapping.linkId);
                const ledEl = document.getElementById(mapping.ledId);
                const badgeEl = document.getElementById(mapping.badgeId);
                const badgeTextEl = document.getElementById(mapping.textId);

                if (iface.status === "down") {
                    // Port administratively down: Red Link, Red LED, Hide VLAN Badge
                    if (linkEl) linkEl.setAttribute("stroke", "#f43f5e");
                    if (ledEl) ledEl.setAttribute("fill", "#f43f5e");
                    if (badgeEl) badgeEl.classList.add("opacity-0");
                } else {
                    // Port up: LED Green
                    if (ledEl) ledEl.setAttribute("fill", "#10b981");

                    // Link cable color based on VLAN membership
                    const vlanId = iface.accessVlan || 1;
                    const strokeColor = vlanColors[vlanId] || "#a855f7"; // purple fallback
                    if (linkEl) linkEl.setAttribute("stroke", strokeColor);

                    // Show/hide VLAN ID badge (visible only for non-default VLANs > 1)
                    if (vlanId > 1) {
                        if (badgeTextEl) badgeTextEl.textContent = `V${vlanId}`;
                        if (badgeEl) badgeEl.classList.remove("opacity-0");
                    } else {
                        if (badgeEl) badgeEl.classList.add("opacity-0");
                    }
                }
            });
        });
    }

    // Trigger initial SVG render update on startup
    notifyStateChanged();
}

