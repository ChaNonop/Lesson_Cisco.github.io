// Interactive JavaScript Visualizations for Cisco Switch and Network Course

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
        <div class="grid grid-cols-1 md:grid-cols-12 gap-6 p-4 bg-slate-900/40 rounded-xl border border-slate-700/50">
            <!-- Layers stack -->
            <div class="md:col-span-5 flex flex-col gap-2">
                <h4 class="text-sm font-bold text-slate-400 uppercase tracking-wider mb-2">คลิกเพื่อสำรวจแต่ละเลเยอร์:</h4>
                <div id="osi-stack" class="flex flex-col gap-1.5"></div>
                <button id="btn-encap" class="mt-4 px-4 py-2 bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white rounded-lg text-sm font-medium transition-all shadow-md">
                    จำลองแอนิเมชันส่งข้อมูล (Encapsulation)
                </button>
            </div>
            
            <!-- Layer details panel -->
            <div class="md:col-span-7 flex flex-col justify-between bg-slate-950/80 p-5 rounded-lg border border-slate-800/80 min-h-[340px]">
                <div id="osi-details">
                    <div class="text-center py-12 text-slate-400">
                        <svg class="mx-auto h-12 w-12 text-slate-500 mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122"/>
                        </svg>
                        คลิกเลือกเลเยอร์ทางด้านซ้าย หรือกดปุ่มจำลองการส่งข้อมูล เพื่อดูรายละเอียดการทำงาน
                    </div>
                </div>
                
                <!-- Status monitor -->
                <div id="osi-status" class="mt-4 p-3 bg-slate-900 border border-slate-800 rounded-lg text-xs font-mono text-emerald-400 hidden">
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
        btn.className = "w-full text-left p-3 rounded-lg border border-slate-700/30 bg-slate-800/50 hover:bg-slate-800 text-slate-200 transition-all flex items-center justify-between";
        btn.innerHTML = `
            <div class="flex items-center gap-3">
                <span class="w-6 h-6 rounded-full bg-indigo-900/60 text-indigo-300 flex items-center justify-center font-mono text-xs border border-indigo-700/50">${layer.num}</span>
                <div>
                    <div class="font-bold text-sm text-slate-100">${layer.name}</div>
                    <div class="text-xs text-slate-400">${layer.nameTh}</div>
                </div>
            </div>
            <span class="text-xs font-mono px-2 py-0.5 rounded bg-emerald-950 text-emerald-400 border border-emerald-800/50">${layer.pdu}</span>
        `;
        btn.onclick = () => selectLayer(layer);
        stackContainer.appendChild(btn);
    });

    function selectLayer(layer, isAnimating = false) {
        // Highlight active button
        layers.forEach(l => {
            const b = document.getElementById(`layer-btn-${l.num}`);
            if (l.num === layer.num) {
                b.classList.remove("bg-slate-800/50", "border-slate-700/30");
                b.classList.add("bg-violet-900/30", "border-violet-500/50", "ring-1", "ring-violet-500/30");
            } else {
                b.classList.remove("bg-violet-900/30", "border-violet-500/50", "ring-1", "ring-violet-500/30");
                b.classList.add("bg-slate-800/50", "border-slate-700/30");
            }
        });

        // Show details
        detailsContainer.innerHTML = `
            <div class="space-y-4">
                <div class="flex items-center justify-between">
                    <span class="text-xs font-bold uppercase tracking-wider text-violet-400">Layer ${layer.num}</span>
                    <span class="text-xs font-mono px-2.5 py-1 rounded bg-emerald-950/60 text-emerald-300 border border-emerald-800/80">PDU: ${layer.pdu}</span>
                </div>
                <h3 class="text-2xl font-bold text-slate-100 mt-1">${layer.name}</h3>
                <p class="text-sm text-slate-400 italic">${layer.nameTh}</p>
                <div class="h-[1px] bg-slate-800 my-2"></div>
                <div>
                    <h5 class="text-xs font-bold text-indigo-400 uppercase mb-1">หน้าที่การทำงาน:</h5>
                    <p class="text-sm text-slate-200">${layer.func}</p>
                </div>
                <div>
                    <h5 class="text-xs font-bold text-indigo-400 uppercase mb-1">โปรโตคอล / อุปกรณ์ที่เกี่ยวข้อง:</h5>
                    <p class="text-sm text-slate-200 font-mono bg-slate-900 px-3 py-1.5 rounded border border-slate-800">${layer.protocols}</p>
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
        <div class="p-4 bg-slate-900/40 rounded-xl border border-slate-700/50 flex flex-col gap-6">
            <!-- Node visual area -->
            <div class="relative bg-slate-950 border border-slate-800 rounded-lg p-8 min-h-[180px] flex items-center justify-between overflow-hidden">
                <!-- Client -->
                <div class="flex flex-col items-center z-10">
                    <div class="w-14 h-14 bg-indigo-900/80 rounded-xl border-2 border-indigo-500 flex items-center justify-center text-white text-xl font-bold shadow-lg shadow-indigo-500/20">
                        💻
                    </div>
                    <span class="text-sm font-bold text-slate-200 mt-2">Client</span>
                    <span id="client-state" class="text-xs font-mono px-2 py-0.5 rounded bg-slate-800 text-slate-400 mt-1 border border-slate-700">CLOSED</span>
                </div>

                <!-- Simulation Line -->
                <div class="absolute left-[80px] right-[80px] h-[3px] bg-slate-800 top-[60px] z-0">
                    <!-- Animated Packet -->
                    <div id="handshake-packet" class="absolute w-6 h-6 bg-amber-500 rounded-full border border-white flex items-center justify-center text-[10px] text-white font-bold opacity-0 transition-all duration-1000 shadow-md shadow-amber-500/50">
                        ✉️
                    </div>
                </div>

                <!-- Server -->
                <div class="flex flex-col items-center z-10">
                    <div class="w-14 h-14 bg-violet-900/80 rounded-xl border-2 border-violet-500 flex items-center justify-center text-white text-xl font-bold shadow-lg shadow-violet-500/20">
                        🖥️
                    </div>
                    <span class="text-sm font-bold text-slate-200 mt-2">Server (Port 80)</span>
                    <span id="server-state" class="text-xs font-mono px-2 py-0.5 rounded bg-slate-800 text-slate-400 mt-1 border border-slate-700">LISTEN</span>
                </div>
            </div>

            <!-- Controller -->
            <div class="flex flex-wrap gap-3 justify-center">
                <button id="btn-handshake" class="px-4 py-2 bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white rounded-lg text-sm font-medium transition-all shadow-md">
                    เริ่มการเชื่อมต่อ (Start Handshake)
                </button>
                <button id="btn-reset-handshake" class="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg text-sm font-medium transition-all border border-slate-700">
                    รีเซ็ต (Reset)
                </button>
            </div>

            <!-- Console logs -->
            <div class="bg-slate-950 p-4 rounded-lg border border-slate-800 text-xs font-mono text-slate-300 min-h-[120px] flex flex-col gap-1.5" id="handshake-logs">
                <div class="text-slate-500">&gt; พร้อมจำลองการทำงาน. กด "เริ่มการเชื่อมต่อ" เพื่อดูขั้นตอน</div>
            </div>
        </div>
    `;

    const clientState = document.getElementById("client-state");
    const serverState = document.getElementById("server-state");
    const packet = document.getElementById("handshake-packet");
    const btnHandshake = document.getElementById("btn-handshake");
    const btnReset = document.getElementById("btn-reset-handshake");
    const logs = document.getElementById("handshake-logs");

    function addLog(text, colorClass = "text-slate-300") {
        const div = document.createElement("div");
        div.className = colorClass;
        div.innerText = `> ${text}`;
        logs.appendChild(div);
        logs.scrollTop = logs.scrollHeight;
    }

    function resetVisualizer() {
        clientState.innerText = "CLOSED";
        clientState.className = "text-xs font-mono px-2 py-0.5 rounded bg-slate-800 text-slate-400 mt-1 border border-slate-700";
        
        serverState.innerText = "LISTEN";
        serverState.className = "text-xs font-mono px-2 py-0.5 rounded bg-slate-800 text-slate-400 mt-1 border border-slate-700";
        
        packet.style.opacity = "0";
        packet.style.left = "0%";
        logs.innerHTML = '<div class="text-slate-500">&gt; รีเซ็ตระบบการจำลองแล้ว. พร้อมเริ่มใหม่</div>';
        btnHandshake.disabled = false;
    }

    btnReset.onclick = resetVisualizer;

    btnHandshake.onclick = async () => {
        btnHandshake.disabled = true;
        logs.innerHTML = '';
        
        addLog("เริ่มขั้นตอน TCP 3-Way Handshake...", "text-indigo-400 font-bold");
        await new Promise(r => setTimeout(r, 1000));

        // 1. SYN: Client -> Server
        addLog("ขั้นตอนที่ 1: Client ส่งแพ็กเก็ต SYN (Synchronize) ไปหา Server", "text-slate-300");
        addLog("ตั้งค่า Seq = 100 (สุ่มตัวเลขเริ่มต้น), Control Flags = [SYN]", "text-slate-400");
        
        // Client transitions to SYN_SENT
        clientState.innerText = "SYN_SENT";
        clientState.className = "text-xs font-mono px-2 py-0.5 rounded bg-amber-950 text-amber-300 mt-1 border border-amber-800";
        
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
        serverState.className = "text-xs font-mono px-2 py-0.5 rounded bg-amber-950 text-amber-300 mt-1 border border-amber-800";
        addLog("Server ได้รับสัญญาณ SYN ตรวจสอบคีย์และเตรียมหน่วยความจำรองรับ", "text-slate-300");
        await new Promise(r => setTimeout(r, 1000));

        // 2. SYN-ACK: Server -> Client
        addLog("ขั้นตอนที่ 2: Server ตอบกลับด้วยแพ็กเก็ต SYN-ACK (Synchronize-Acknowledge)", "text-slate-300");
        addLog("ตั้งค่า Seq = 500 (สุ่มฝั่งเซิร์ฟเวอร์), Ack = 101 (ค่า Seq เดิม + 1), Control Flags = [SYN, ACK]", "text-slate-400");
        
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
        clientState.className = "text-xs font-mono px-2 py-0.5 rounded bg-emerald-950 text-emerald-300 mt-1 border border-emerald-800";
        addLog("Client ได้รับคำตอบรับ ปรับสถานะเป็นเชื่อมต่อสำเร็จ (ESTABLISHED)", "text-emerald-400 font-bold");
        await new Promise(r => setTimeout(r, 1000));

        // 3. ACK: Client -> Server
        addLog("ขั้นตอนที่ 3: Client ส่งคำยืนยันสุดท้าย ACK (Acknowledge) กลับไปหา Server", "text-slate-300");
        addLog("ตั้งค่า Seq = 101, Ack = 501 (ค่า Seq ของ Server + 1), Control Flags = [ACK]", "text-slate-400");
        
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
        serverState.className = "text-xs font-mono px-2 py-0.5 rounded bg-emerald-950 text-emerald-300 mt-1 border border-emerald-800";
        addLog("Server ได้รับคำยืนยัน ปรับสถานะเป็นเชื่อมต่อสำเร็จ (ESTABLISHED)", "text-emerald-400 font-bold");
        await new Promise(r => setTimeout(r, 1000));

        addLog("🎉 สำเร็จ! สถาปนาช่องทางการเชื่อมต่อ TCP สำเร็จ สามารถเริ่มรับส่งเว็บข้อมูล (HTTP/HTTPS) ได้ทันที", "text-emerald-400 font-bold");
    };
}

// Initialize Encapsulation / Decapsulation Simulation
function initEncapDecapVisualizer(containerId) {
    const container = document.getElementById(containerId);
    if (!container) return;

    container.innerHTML = `
        <div class="p-4 bg-slate-900/40 rounded-xl border border-slate-700/50 flex flex-col gap-5">
            <div class="flex flex-col sm:flex-row gap-3 items-center">
                <input type="text" id="encap-msg-input" value="Hello Cisco" placeholder="พิมพ์ข้อความของคุณ..." class="w-full sm:w-64 px-3 py-2 text-sm bg-slate-950 border border-slate-800 rounded-lg text-slate-100 focus:outline-none focus:border-violet-500">
                <div class="flex gap-2 w-full sm:w-auto">
                    <button id="btn-encap-sim" class="flex-1 sm:flex-none px-4 py-2 bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white rounded-lg text-sm font-medium transition-all shadow-md">ห่อหุ้ม (Encapsulate)</button>
                    <button id="btn-decap-sim" class="flex-1 sm:flex-none px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg text-sm font-medium transition-all border border-slate-700" disabled>แกะห่อ (Decapsulate)</button>
                </div>
            </div>

            <!-- Visualization Pane -->
            <div class="bg-slate-950 rounded-lg p-5 border border-slate-800 min-h-[160px] flex flex-col items-center justify-center gap-4">
                <div id="encap-visual-box" class="flex flex-wrap items-center justify-center gap-1 text-xs font-mono font-bold select-none transition-all duration-300">
                    <span id="encap-data-block" class="px-3 py-2 rounded bg-emerald-950/60 text-emerald-400 border border-emerald-800">DATA: Hello Cisco</span>
                </div>
                <div id="encap-pdu-label" class="text-sm font-bold text-slate-400">PDU: Data (Application Layer)</div>
            </div>

            <!-- Log Pane -->
            <div id="encap-logs" class="bg-slate-950 p-4 rounded-lg border border-slate-800 text-xs font-mono text-slate-300 min-h-[100px] flex flex-col gap-1.5">
                <div class="text-slate-500">&gt; ป้อนข้อความด้านบน แล้วกดปุ่ม "ห่อหุ้ม (Encapsulate)" เพื่อเริ่มต้น</div>
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

    function addLog(text, colorClass = "text-slate-300") {
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
        
        addLog("เริ่มต้นขั้นตอนการ Encapsulation ข้อมูลฝั่งผู้ส่ง...", "text-indigo-400 font-bold");
        
        // 1. Data (L7-L5)
        pduLabel.innerText = "PDU: Data (Application / Presentation / Session)";
        visualBox.innerHTML = `<span id="encap-data" class="px-3 py-2 rounded bg-emerald-900/60 text-emerald-400 border border-emerald-700 transition-all duration-300">DATA: ${dataValue}</span>`;
        addLog(`[L7-L5] สร้างข้อมูลแอปพลิเคชัน: "${dataValue}"`);
        await new Promise(r => setTimeout(r, 1800));

        // 2. Segment (L4)
        pduLabel.innerText = "PDU: Segment (Transport Layer)";
        visualBox.innerHTML = `
            <span class="px-3 py-2 rounded bg-indigo-900/65 text-indigo-300 border border-indigo-700 transition-all duration-300 animate-pulse">TCP Header</span>
            <span class="px-3 py-2 rounded bg-emerald-900/60 text-emerald-400 border border-emerald-700">DATA: ${dataValue}</span>
        `;
        addLog("[L4] เติม TCP Header (ระบุ Port) -> ได้หน่วยข้อมูล Segment");
        await new Promise(r => setTimeout(r, 1800));

        // 3. Packet (L3)
        pduLabel.innerText = "PDU: Packet (Network Layer)";
        visualBox.innerHTML = `
            <span class="px-3 py-2 rounded bg-violet-900/65 text-violet-300 border border-violet-700 transition-all duration-300 animate-pulse">IP Header</span>
            <span class="px-3 py-2 rounded bg-indigo-900/40 text-indigo-300 border border-indigo-800">TCP Header</span>
            <span class="px-3 py-2 rounded bg-emerald-900/40 text-emerald-400 border border-emerald-800">DATA: ${dataValue}</span>
        `;
        addLog("[L3] เติม IP Header (ระบุ IP ปลายทาง) -> ได้หน่วยข้อมูล Packet");
        await new Promise(r => setTimeout(r, 1800));

        // 4. Frame (L2)
        pduLabel.innerText = "PDU: Frame (Data Link Layer)";
        visualBox.innerHTML = `
            <span class="px-3 py-2 rounded bg-purple-900/65 text-purple-300 border border-purple-700 transition-all duration-300 animate-pulse">MAC Header</span>
            <span class="px-3 py-2 rounded bg-violet-900/40 text-violet-300 border border-violet-800">IP Header</span>
            <span class="px-3 py-2 rounded bg-indigo-900/30 text-indigo-300 border border-indigo-850">TCP Header</span>
            <span class="px-3 py-2 rounded bg-emerald-900/30 text-emerald-400 border border-emerald-850">DATA: ${dataValue}</span>
            <span class="px-3 py-2 rounded bg-rose-900/65 text-rose-300 border border-rose-700 transition-all duration-300 animate-pulse">FCS Trailer</span>
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
            <span class="px-4 py-2.5 rounded bg-pink-900/60 text-pink-300 border border-pink-700 font-mono text-sm animate-pulse">
                ⚡ BITS: ${bits}
            </span>
        `;
        addLog("[L1] แปลงข้อมูล Frame ทั้งหมดเป็นกระแสไฟฟ้า/แสง (Bits) ส่งไปตามสายแลน");
        await new Promise(r => setTimeout(r, 1500));

        addLog("🌟 กระบวนการ Encapsulation เสร็จสิ้น! ข้อมูลพร้อมให้ฝั่งรับถอดรหัสแล้ว", "text-emerald-400 font-bold");
        btnEncap.disabled = false;
        btnDecap.disabled = false;
    };

    btnDecap.onclick = async () => {
        btnEncap.disabled = true;
        btnDecap.disabled = true;
        logs.innerHTML = "";
        
        addLog("เริ่มต้นขั้นตอนการ Decapsulation ข้อมูลฝั่งผู้รับ...", "text-indigo-400 font-bold");
        await new Promise(r => setTimeout(r, 1000));

        // 1. Receive Bits (L1)
        pduLabel.innerText = "PDU: Bits (Physical Layer)";
        addLog("[L1] ได้รับสัญญาณ Bits เข้ามาทางการ์ดแลน");
        await new Promise(r => setTimeout(r, 1500));

        // 2. Read Frame (L2)
        pduLabel.innerText = "PDU: Frame (Data Link Layer)";
        visualBox.innerHTML = `
            <span class="px-3 py-2 rounded bg-purple-900/65 text-purple-300 border border-purple-700">MAC Header</span>
            <span class="px-3 py-2 rounded bg-violet-900/40 text-violet-300 border border-violet-800">IP Header</span>
            <span class="px-3 py-2 rounded bg-indigo-900/30 text-indigo-300 border border-indigo-850">TCP Header</span>
            <span class="px-3 py-2 rounded bg-emerald-900/30 text-emerald-400 border border-emerald-850">DATA: ${dataValue}</span>
            <span class="px-3 py-2 rounded bg-rose-900/65 text-rose-300 border border-rose-700">FCS Trailer</span>
        `;
        addLog("[L2] ตรวจสอบความถูกต้องผ่าน FCS และแกะ MAC Header / FCS ออกเพื่อส่งต่อ");
        await new Promise(r => setTimeout(r, 1800));

        // 3. Read Packet (L3)
        pduLabel.innerText = "PDU: Packet (Network Layer)";
        visualBox.innerHTML = `
            <span class="px-3 py-2 rounded bg-violet-900/65 text-violet-300 border border-violet-700">IP Header</span>
            <span class="px-3 py-2 rounded bg-indigo-900/40 text-indigo-300 border border-indigo-800">TCP Header</span>
            <span class="px-3 py-2 rounded bg-emerald-900/40 text-emerald-400 border border-emerald-800">DATA: ${dataValue}</span>
        `;
        addLog("[L3] ตรวจสอบ Destination IP ตรงกับเครื่องตัวเอง แกะ IP Header ออกเพื่อส่งต่อ");
        await new Promise(r => setTimeout(r, 1800));

        // 4. Read Segment (L4)
        pduLabel.innerText = "PDU: Segment (Transport Layer)";
        visualBox.innerHTML = `
            <span class="px-3 py-2 rounded bg-indigo-900/65 text-indigo-300 border border-indigo-700">TCP Header</span>
            <span class="px-3 py-2 rounded bg-emerald-900/60 text-emerald-400 border border-emerald-800">DATA: ${dataValue}</span>
        `;
        addLog("[L4] ตรวจสอบหมายเลข Port ส่งต่อให้โปรแกรมที่รับผิดชอบ แกะ TCP Header ออก");
        await new Promise(r => setTimeout(r, 1800));

        // 5. Data (L7)
        pduLabel.innerText = "PDU: Data (Application Layer)";
        visualBox.innerHTML = `<span class="px-3 py-2 rounded bg-emerald-900/60 text-emerald-400 border border-emerald-700">DATA: ${dataValue}</span>`;
        addLog(`[L7] แอปพลิเคชันได้รับข้อความที่สมบูรณ์แบบ: "${dataValue}"`, "text-emerald-400 font-bold");
        
        await new Promise(r => setTimeout(r, 1000));
        addLog("🎉 สำเร็จ! การแกะห่อหุ้มข้อมูล (Decapsulation) เรียบร้อยแล้ว", "text-emerald-400 font-bold");
        
        btnEncap.disabled = false;
        btnDecap.disabled = true;
    };
}

// Initialize Cisco IOS CLI Terminal Simulator
function initCLISimulator(containerId) {
    const container = document.getElementById(containerId);
    if (!container) return;

    container.innerHTML = `
        <div class="flex flex-col h-[380px] bg-black text-slate-100 rounded-xl border border-slate-800 shadow-2xl font-mono overflow-hidden select-none">
            <!-- Terminal Title Bar -->
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
                <div class="text-slate-400">Press ENTER to get started.</div>
            </div>

            <!-- Terminal Input Prompt -->
            <div class="flex items-center gap-1 px-4 py-2.5 bg-slate-950 border-t border-slate-900 shrink-0 text-sm">
                <span id="cli-prompt" class="font-bold text-emerald-400">Switch></span>
                <input type="text" id="cli-input" class="flex-1 bg-transparent border-none outline-none text-slate-100 font-mono text-sm caret-indigo-500" autofocus autocomplete="off" spellcheck="false">
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
        mode: "user", // user, privileged, config, interface, line
        enableSecret: "",
        serviceEncryption: false,
        bannerMotd: "",
        interfaceName: "",
        lineName: "",
        saved: {
            hostname: "Switch",
            enableSecret: "",
            serviceEncryption: false,
            bannerMotd: ""
        }
    };

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
            default: return `${host}>`;
        }
    }

    function updatePrompt() {
        prompt.innerText = getPromptSymbol();
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
        // Simple hash simulation
        let hash = 0;
        for (let i = 0; i < pass.length; i++) {
            hash = (hash << 5) - hash + pass.charCodeAt(i);
            hash |= 0;
        }
        return "5 " + Math.abs(hash).toString(16).substring(0, 8) + "abcde";
    }

    // Helper functions for matching
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

    // CLI Interpreter
    function executeCommand(line) {
        const trimmed = line.trim();
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
            if (matchTokens(tokens, ["write", "memory"]) || matchTokens(tokens, ["write"]) || (tokens.length === 3 && matchTokens(tokens, ["copy", "running-config", "startup-config"]))) {
                state.saved = { ...state };
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
                // Strip delimiting characters (e.g. # or $)
                const delim = bannerText[0];
                if (bannerText.endsWith(delim) && bannerText.length > 1) {
                    state.bannerMotd = bannerText.substring(1, bannerText.length - 1);
                } else {
                    state.bannerMotd = bannerText;
                }
                writeOutput("Banner MOTD updated.", "success");
                return;
            }
            if (tokens[0] === "interface" && tokens.length === 2) {
                state.interfaceName = tokens[1];
                state.mode = "interface";
                updatePrompt();
                return;
            }
            if (tokens[0] === "line" && tokens.length >= 3) {
                state.lineName = tokens.slice(1).join(" ");
                state.mode = "line";
                updatePrompt();
                return;
            }
            writeOutput(`% Invalid input detected. Type "?" for help.`, "error");
            return;
        }

        // --- SUB-CONFIGURATION MODES ---
        if (state.mode === "interface" || state.mode === "line") {
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
            if (state.mode === "interface" && tokens[0] === "description" && tokens.length >= 2) {
                writeOutput(`Interface description set: "${tokens.slice(1).join(" ")}"`, "success");
                return;
            }
            writeOutput(`% Invalid command in this sub-mode. Type "exit" to go back.`, "error");
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
            writeOutput("  write memory        - บันทึกการตั้งค่าลง NVRAM (เซฟข้อมูล)");
            writeOutput("  exit                - สลับกลับไปโหมด User EXEC");
        } else if (state.mode === "config") {
            writeOutput("<strong>คำสั่งในโหมด Global Config:</strong>");
            writeOutput("  hostname [ชื่อ]      - เปลี่ยนชื่อตัวเครื่องสวิตช์");
            writeOutput("  enable secret [รหัส] - ตั้งรหัสผ่านสิทธิ์แอดมินแบบเข้ารหัสลับ");
            writeOutput("  service password-encryption - สั่งเข้ารหัสลับรหัสผ่านอื่น ๆ ทั้งระบบ");
            writeOutput("  banner motd #[ข้อความ]# - ตั้งแบนเนอร์แสดงข้อความต้อนรับ");
            writeOutput("  interface [ชื่อพอร์ต] - เข้าไปตั้งค่าพอร์ตนั้น ๆ (เช่น interface vlan 1)");
            writeOutput("  line [con/vty] [เลข] - เข้าตั้งค่าช่องเชื่อมต่อ (เช่น line console 0)");
            writeOutput("  exit                - ย้อนกลับไปโหมดก่อนหน้า");
            writeOutput("  end                 - กลับสู่โหมดตั้งค่าหลัก (Privileged EXEC)");
        } else {
            writeOutput("  exit                - ย้อนกลับสู่โหมด Global Config");
            writeOutput("  end                 - กลับสู่โหมด Privileged EXEC");
        }
    }

    // Show mock running-config
    function showRunningConfig() {
        writeOutput("Building configuration...");
        writeOutput("Current configuration : 1082 bytes");
        writeOutput("!");
        writeOutput(`hostname <strong>${state.hostname}</strong>`);
        writeOutput("!");
        if (state.enableSecret) {
            const secretVal = state.serviceEncryption ? hashPassword(state.enableSecret) : state.enableSecret;
            writeOutput(`enable secret <strong>${secretVal}</strong>`);
        }
        writeOutput("!");
        writeOutput(`service password-encryption: <strong>${state.serviceEncryption ? "enabled" : "disabled"}</strong>`);
        writeOutput("!");
        writeOutput("interface FastEthernet0/1");
        writeOutput(" switchport mode access");
        writeOutput("!");
        writeOutput("interface GigabitEthernet1/0/1");
        writeOutput(" switchport mode trunk");
        writeOutput("!");
        if (state.bannerMotd) {
            writeOutput(`banner motd #<strong>${state.bannerMotd}</strong>#`);
        }
        writeOutput("!");
        writeOutput("end");
    }

    // Show mock startup-config
    function showStartupConfig() {
        if (!state.saved.enableSecret && state.saved.hostname === "Switch") {
            writeOutput("%% Startup-config is not present", "error");
            return;
        }
        writeOutput("Using 987 bytes");
        writeOutput("!");
        writeOutput(`hostname <strong>${state.saved.hostname}</strong>`);
        writeOutput("!");
        if (state.saved.enableSecret) {
            const secretVal = state.saved.serviceEncryption ? hashPassword(state.saved.enableSecret) : state.saved.enableSecret;
            writeOutput(`enable secret <strong>${secretVal}</strong>`);
        }
        writeOutput("!");
        writeOutput(`service password-encryption: <strong>${state.saved.serviceEncryption ? "enabled" : "disabled"}</strong>`);
        writeOutput("!");
        if (state.saved.bannerMotd) {
            writeOutput(`banner motd #<strong>${state.saved.bannerMotd}</strong>#`);
        }
        writeOutput("!");
        writeOutput("end");
    }

    // Show mock IP interface brief
    function showIpInterfaceBrief() {
        writeOutput("Interface              IP-Address      OK? Method Status                Protocol");
        writeOutput("Vlan1                  192.168.1.10    YES manual up                    up");
        writeOutput("FastEthernet0/1        unassigned      YES unset  up                    up");
        writeOutput("FastEthernet0/2        unassigned      YES unset  down                  down");
        writeOutput("GigabitEthernet1/0/1   unassigned      YES unset  up                    up");
    }

    // Input handlers
    input.addEventListener("keydown", (e) => {
        if (e.key === "Enter") {
            const val = input.value;
            executeCommand(val);
            if (val.trim() !== "") {
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
}

