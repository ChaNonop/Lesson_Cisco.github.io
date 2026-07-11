// data for Cisco Switch and Networking Lessons
const lessonsData = {
  "lesson-1": {
    title: "บทเรียนที่ 1: สถาปัตยกรรมแบบ Layer และ OSI Model L1-L2",
    subtitle: "ทำความเข้าใจโมเดลมาตรฐาน OSI และระดับชั้นกายภาพ (Physical) กับระดับชั้นเชื่อมต่อข้อมูล (Data Link)",
    subtopics: [
      { id: "sec-1-1", title: "1.1 สถาปัตยกรรมแบบ Layer" },
      { id: "sec-1-2", title: "1.2 Physical Layer (L1)" },
      { id: "sec-1-3", title: "1.3 Data Link Layer (L2)" },
      { id: "sec-1-4", title: "1.4 การทำงานของ Switch" }
    ],
    content: `
      <div class="space-y-6">
        <section id="sec-1-1">
          <h3 class="text-xl font-bold text-violet-600 dark:text-violet-400 mb-2">ทำไมระบบเครือข่ายต้องแบ่งการทำงานเป็นชั้น (Layered Architecture)?</h3>
          <p class="text-slate-800 dark:text-slate-300">
            ลองจินตนาการถึงการส่งพัสดุข้ามประเทศ หากไม่มีการแบ่งแผนกหน้าที่ (คนแพ็คของ, คนกรอกเอกสารศุลกากร, คนขับรถขนส่ง, นักบิน) การทำงานจะสับสนมาก ในระบบเครือข่ายคอมพิวเตอร์ก็เช่นกัน 
            องค์กรมาตรฐานสากล (ISO) จึงพัฒนาโมเดล <strong>OSI (Open Systems Interconnection) Model</strong> ขึ้นมาเป็นกรอบแนวคิดแบบ 7 ระดับชั้น (Layers) เพื่อให้:
          </p>
          <ul class="list-disc list-inside text-slate-800 dark:text-slate-300 ml-4 mt-2 space-y-1">
            <li><strong>ง่ายต่อการพัฒนา:</strong> ผู้ผลิตฮาร์ดแวร์พัฒนาสายเคเบิล (Layer 1) โดยไม่ต้องพะวงว่าเว็บบราวเซอร์ (Layer 7) ทำงานอย่างไร</li>
            <li><strong>ง่ายต่อการระบุปัญหา:</strong> สามารถตรวจสอบได้เป็นขั้นตอน เช่น "สายขาดหรือเปล่า (Layer 1)?" หรือ "เลข IP ชนกันไหม (Layer 3)?"</li>
          </ul>
        </section>

        <section id="sec-1-2" class="border-t border-slate-200 dark:border-slate-700/50 pt-4">
          <h3 class="text-xl font-bold text-violet-600 dark:text-violet-400 mb-2">ระดับชั้นที่ 1: Physical Layer (เลเยอร์กายภาพ)</h3>
          <p class="text-slate-800 dark:text-slate-300">
            ทำหน้าที่จัดการกับการส่งข้อมูลดิบในรูปของ <strong>สัญญาณไฟฟ้า แสง หรือคลื่นวิทยุ</strong> ผ่านสื่อกลางทางกายภาพ (Transmission Medium)
          </p>
          <div class="grid grid-cols-1 md:grid-cols-3 gap-4 my-4">
            <div class="bg-slate-100 dark:bg-slate-900/60 p-4 rounded-lg border border-slate-200 dark:border-slate-700/50">
              <h4 class="font-bold text-indigo-700 dark:text-indigo-400 mb-1">หน่วยข้อมูล (PDU)</h4>
              <p class="text-2xl font-mono text-emerald-600 dark:text-emerald-400">Bits (บิต 0 และ 1)</p>
            </div>
            <div class="bg-slate-100 dark:bg-slate-900/60 p-4 rounded-lg border border-slate-200 dark:border-slate-700/50">
              <h4 class="font-bold text-indigo-700 dark:text-indigo-400 mb-1">อุปกรณ์ที่เกี่ยวข้อง</h4>
              <p class="text-slate-800 dark:text-slate-300">สาย UTP (สายแลน), สาย Fiber Optic, Hub, Repeater, คลื่น Wi-Fi</p>
            </div>
            <div class="bg-slate-100 dark:bg-slate-900/60 p-4 rounded-lg border border-slate-200 dark:border-slate-700/50">
              <h4 class="font-bold text-indigo-700 dark:text-indigo-400 mb-1">หน้าที่หลัก</h4>
              <p class="text-slate-800 dark:text-slate-300">กำหนดระดับแรงดันไฟฟ้า, ชนิดของหัวเชื่อมต่อ (เช่น RJ-45), และความเร็วในการรับส่ง (Bit Rate)</p>
            </div>
          </div>
        </section>

        <section id="sec-1-3" class="border-t border-slate-200 dark:border-slate-700/50 pt-4">
          <h3 class="text-xl font-bold text-violet-600 dark:text-violet-400 mb-2">ระดับชั้นที่ 2: Data Link Layer (เลเยอร์เชื่อมต่อข้อมูล)</h3>
          <p class="text-slate-800 dark:text-slate-300">
            ทำหน้าที่ห่อหุ้มบิตข้อมูลจาก Layer 1 ให้เป็นกลุ่มก้อนเพื่อส่งต่อไปยังอุปกรณ์ถัดไปที่อยู่ในเครือข่ายเดียวกัน (Local Network) และรับผิดชอบเรื่อง <strong>การระบุที่อยู่ทางกายภาพ (Physical Address)</strong>
          </p>
          <div class="grid grid-cols-1 md:grid-cols-3 gap-4 my-4">
            <div class="bg-slate-100 dark:bg-slate-900/60 p-4 rounded-lg border border-slate-200 dark:border-slate-700/50">
              <h4 class="font-bold text-indigo-700 dark:text-indigo-400 mb-1">หน่วยข้อมูล (PDU)</h4>
              <p class="text-2xl font-mono text-emerald-600 dark:text-emerald-400">Frame (เฟรม)</p>
            </div>
            <div class="bg-slate-100 dark:bg-slate-900/60 p-4 rounded-lg border border-slate-200 dark:border-slate-700/50">
              <h4 class="font-bold text-indigo-700 dark:text-indigo-400 mb-1">อุปกรณ์ที่เกี่ยวข้อง</h4>
              <p class="text-slate-800 dark:text-slate-300">Network Switch, การ์ดแลน (NIC), Bridge</p>
            </div>
            <div class="bg-slate-100 dark:bg-slate-900/60 p-4 rounded-lg border border-slate-200 dark:border-slate-700/50">
              <h4 class="font-bold text-indigo-700 dark:text-indigo-400 mb-1">หน้าที่หลัก</h4>
              <p class="text-slate-800 dark:text-slate-300">การกำหนดที่อยู่ MAC Address, การควบคุมความคับคั่ง (Flow Control), และการตรวจสอบข้อผิดพลาด (Error Detection) ด้วยค่า CRC</p>
            </div>
          </div>
        </section>

        <section id="sec-1-4" class="border-t border-slate-200 dark:border-slate-700/50 pt-4">
          <h3 class="text-xl font-bold text-violet-600 dark:text-violet-400 mb-2">ตัวอย่างการทำงานจริง: การทำงานของ Switch ใน Layer 2</h3>
          <div class="bg-slate-100 dark:bg-slate-900/40 p-4 rounded-lg border border-slate-200 dark:border-slate-800">
            <p class="text-slate-800 dark:text-slate-300">
              เมื่อคุณเชื่อมต่อคอมพิวเตอร์เข้ากับ <strong>Cisco Switch</strong> อุปกรณ์ Switch จะทำหน้าที่บันทึก <strong>MAC Address</strong> ของคอมพิวเตอร์แต่ละเครื่องลงในตารางที่เรียกว่า <strong>MAC Address Table (หรือ CAM Table)</strong>
            </p>
            <p class="text-slate-800 dark:text-slate-300 mt-2">
              หาก Switch รู้ว่า MAC Address ของเป้าหมายอยู่ที่พอร์ตใด มันจะส่งข้อมูลตรงไปที่พอร์ตนั้นโดยเฉพาะ (Unicast) แต่หากยังไม่รู้ มันจะส่งกระจายไปยังทุกพอร์ต ยกเว้นพอร์ตที่ส่งมา (เรียกว่ากระบวนการ <strong>Flooding</strong>)
            </p>
          </div>
        </section>
      </div>
    `,
    quiz: [
      {
        question: "อุปกรณ์เครือข่ายประเภท Switch จัดอยู่ในเลเยอร์ใดของแบบจำลอง OSI Model?",
        options: [
          "Layer 1: Physical Layer",
          "Layer 2: Data Link Layer",
          "Layer 3: Network Layer ",
          "Layer 4: Transport Layer"
        ],
        answer: 1,
        explanation: "Switch ทำงาน in Layer 2 (Data Link Layer) เนื่องจากใช้ MAC Address ในการส่งต่อข้อมูล (Frame)"
      },
      {
        question: "หน่วยข้อมูล (PDU) ที่อยู่ในเลเยอร์ที่ 1 (Physical) เรียกว่าอะไร?",
        options: [
          "Bits   ",
          "Frame  ",
          "Packet ",
          "Segment"
        ],
        answer: 0,
        explanation: "เลเยอร์ 1 (Physical) ทำหน้าที่ส่งสัญญาณข้อมูลแบบดิบ หน่วยข้อมูลจึงเป็นบิต (Bits)"
      },
      {
        question: "กระบวนการที่สวิตช์ส่งเฟรมออกไปทุกพอร์ตเมื่อไม่พบ MAC Address เป้าหมายในตาราง เรียกว่าอะไร?",
        options: [
          "Flooding",
          "Routing ",
          "Blocking",
          "Trunking"
        ],
        answer: 0,
        explanation: "เมื่อสวิตช์ไม่ทราบพอร์ตของปลายทาง จะทำการคัดลอกเฟรมส่งออกไปทุกช่องทาง เรียกว่า Flooding"
      }
    ],
    references: [
      { title: "Cisco Networking Academy: Introduction to Networks (OSI Model)", url: "https://www.netacad.com/", source: "Official Cisco Academy" },
      { title: "IEEE 802.3 Ethernet Working Group Standards", url: "https://standards.ieee.org/standard/802_3-2022.html", source: "IEEE Standards" }
    ],
    visualizationId: "osi-explorer"
  },
  "lesson-2": {
    title: "บทเรียนที่ 2: เจาะลึก L3 & L4 - IP Routing และ TCP vs UDP",
    subtitle: "ทำความเข้าใจกับเลเยอร์ระบบเครือข่าย (Network) และระดับชั้นการขนส่ง (Transport)",
    subtopics: [
      { id: "sec-2-1", title: "2.1 Network Layer (L3)" },
      { id: "sec-2-2", title: "2.2 Transport Layer (L4)" },
      { id: "sec-2-3", title: "2.3 TCP 3-Way Handshake" }
    ],
    content: `
      <div class="space-y-6">
        <section id="sec-2-1">
          <h3 class="text-xl font-bold text-violet-600 dark:text-violet-400 mb-2">ระดับชั้นที่ 3: Network Layer (เลเยอร์เครือข่าย)</h3>
          <p class="text-slate-800 dark:text-slate-300">
            เลเยอร์นี้ทำหน้าที่ <strong>นำทางและค้นหาเส้นทางที่ดีที่สุด (Routing)</strong> เพื่อส่งข้อมูลข้ามเครือข่ายต่างถิ่น (WAN/Internet) โดยไม่จำกัดแค่เครือข่ายท้องถิ่นเหมือน Layer 2
          </p>
          <div class="grid grid-cols-1 md:grid-cols-3 gap-4 my-4">
            <div class="bg-slate-100 dark:bg-slate-900/60 p-4 rounded-lg border border-slate-200 dark:border-slate-700/50">
              <h4 class="font-bold text-indigo-700 dark:text-indigo-400 mb-1">หน่วยข้อมูล (PDU)</h4>
              <p class="text-2xl font-mono text-emerald-600 dark:text-emerald-400">Packet (แพ็กเก็ต)</p>
            </div>
            <div class="bg-slate-100 dark:bg-slate-900/60 p-4 rounded-lg border border-slate-200 dark:border-slate-700/50">
              <h4 class="font-bold text-indigo-700 dark:text-indigo-400 mb-1">อุปกรณ์ที่เกี่ยวข้อง</h4>
              <p class="text-slate-800 dark:text-slate-300">Router, Layer 3 Switch</p>
            </div>
            <div class="bg-slate-100 dark:bg-slate-900/60 p-4 rounded-lg border border-slate-200 dark:border-slate-700/50">
              <h4 class="font-bold text-indigo-700 dark:text-indigo-400 mb-1">หน้าที่หลัก</h4>
              <p class="text-slate-800 dark:text-slate-300">การกำหนดที่อยู่เชิงตรรกะ (IP Address) และเลือกเส้นทางที่ดีที่สุดไปยังปลายทาง (Routing)</p>
            </div>
          </div>
          <p class="text-slate-800 dark:text-slate-300 mt-2">
            <strong>ความแตกต่างระหว่างที่อยู่:</strong> MAC Address (L2) เปรียบเหมือน 'เลขบัตรประชาชน' ที่ติดตัวมาแต่เกิด เปลี่ยนแปลงไม่ได้ ส่วน IP Address (L3) เปรียบเหมือน 'ที่อยู่ปัจจุบัน' ซึ่งเปลี่ยนตามสถานที่ที่คุณไปอยู่จริง
          </p>
        </section>

        <section id="sec-2-2" class="border-t border-slate-200 dark:border-slate-700/50 pt-4">
          <h3 class="text-xl font-bold text-violet-600 dark:text-violet-400 mb-2">ระดับชั้นที่ 4: Transport Layer (เลเยอร์ขนส่ง)</h3>
          <p class="text-slate-800 dark:text-slate-300">
            รับผิดชอบการ <strong>ลำเลียงข้อมูลต้นทางถึงปลายทางอย่างถูกต้อง (End-to-End Delivery)</strong> ควบคุมการส่ง การรับ และจัดการพอร์ตบริการต่าง ๆ (เช่น พอร์ต 80 สำหรับ HTTP, 443 สำหรับ HTTPS) เพื่อแยกแยะว่าข้อมูลนี้เป็นของแอปพลิเคชันใด
          </p>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4 my-4">
            <div class="bg-slate-100 dark:bg-slate-900/60 p-4 rounded-lg border border-slate-200 dark:border-slate-700/50">
              <h4 class="font-bold text-emerald-700 dark:text-emerald-400 mb-1">TCP (Transmission Control Protocol)</h4>
              <ul class="list-disc list-inside text-slate-800 dark:text-slate-300 space-y-1 mt-2">
                <li><strong>เน้นความน่าเชื่อถือสูง:</strong> มีการยืนยันการรับส่ง (Acknowledgment)</li>
                <li><strong>ต้องสร้างการเชื่อมต่อก่อนส่ง:</strong> (3-Way Handshake)</li>
                <li>ช้ากว่าเพราะมีกลไกตรวจสอบและเรียงลำดับใหม่</li>
                <li>ใช้งานใน: เว็บเบราว์เซอร์ (HTTP/HTTPS), อีเมล, โอนไฟล์ (FTP)</li>
              </ul>
            </div>
            <div class="bg-slate-100 dark:bg-slate-900/60 p-4 rounded-lg border border-slate-200 dark:border-slate-700/50">
              <h4 class="font-bold text-amber-700 dark:text-amber-400 mb-1">UDP (User Datagram Protocol)</h4>
              <ul class="list-disc list-inside text-slate-800 dark:text-slate-300 space-y-1 mt-2">
                <li><strong>เน้นความเร็วสูงสุด:</strong> ไม่มีกลไกยืนยันการรับข้อมูลกลับมา (ไม่รับประกันความครบถ้วนของข้อมูล)</li>
                <li><strong>ไม่ต้องสร้างการเชื่อมต่อก่อน:</strong> (Connectionless)</li>
                <li>ข้อมูลอาจสูญหายหรือสลับลำดับกันได้</li>
                <li>ใช้งานใน: ไลฟ์สตรีมมิ่ง, เกมออนไลน์, ระบบโทรศัพท์ VoIP, DNS</li>
              </ul>
            </div>
          </div>
        </section>

        <section id="sec-2-3" class="border-t border-slate-200 dark:border-slate-700/50 pt-4">
          <h3 class="text-xl font-bold text-violet-600 dark:text-violet-400 mb-2">การเริ่มเชื่อมต่อด้วย TCP 3-Way Handshake</h3>
          <p class="text-slate-800 dark:text-slate-300">
            ก่อนที่จะเริ่มส่งข้อมูลผ่านโปรโตคอล TCP ตัวส่งและตัวรับต้องทำข้อตกลงกัน 3 ขั้นตอนดังนี้ เพื่อเตรียมพร้อมพื้นที่บัฟเฟอร์ในแรมและการนับลำดับหมายเลขข้อมูล (Sequence Number):
          </p>
          <ol class="list-decimal list-inside text-slate-800 dark:text-slate-300 mt-2 space-y-1 ml-4">
            <li><strong>SYN:</strong> ผู้ส่งส่งสัญญาณขอเชื่อมต่อพร้อมส่งค่าสุ่มลำดับเริ่มต้น (ISN)</li>
            <li><strong>SYN-ACK:</strong> ผู้รับยอมรับการเชื่อมต่อ ส่งค่ายืนยัน และสุ่มลำดับฝั่งตัวเองกลับมา</li>
            <li><strong>ACK:</strong> ผู้ส่งส่งคำยืนยันรับทราบกลับไป เป็นอันเสร็จสิ้นการเชื่อมต่อ (Established)</li>
          </ol>
        </section>
      </div>
    `,
    quiz: [
      {
        question: "อุปกรณ์ Router ทำหน้าที่หลักอยู่ในเลเยอร์ใดของแบบจำลอง OSI Model?",
        options: [
          "Layer 1: Physical Layer",
          "Layer 2: Data Link Layer",
          "Layer 3: Network Layer ",
          "Layer 4: Transport Layer"
        ],
        answer: 2,
        explanation: "Router จัดการกับการหาเส้นทางข้ามเน็ตเวิร์กและการจัดการ IP Address ซึ่งอยู่ใน Layer 3 (Network Layer)"
      },
      {
        question: "โปรโตคอลในเลเยอร์ Transport ชนิดใดที่เน้นความเร็วสูงสุด โดยไม่มีการยืนยันการรับข้อมูลกลับมา?",
        options: [
          "TCP (Transmission Control Protocol)",
          "UDP (User Datagram Protocol)       ",
          "IP (Internet Protocol)              ",
          "ARP (Address Resolution Protocol)  "
        ],
        answer: 1,
        explanation: "UDP เป็นโปรโตคอลแบบ Connectionless เน้นความเร็วในการส่ง ไม่มีการตรวจสอบสถานะรับข้อมูลกลับ"
      },
      {
        question: "ขั้นตอนแรกสุดในกระบวนการเชื่อมต่อแบบ TCP 3-Way Handshake คือข้อความประเภทใด?",
        options: [
          "SYN",
          "ACK",
          "FIN",
          "RST"
        ],
        answer: 0,
        explanation: "กระบวนการ Handshake เริ่มต้นโดยฝั่งไคลเอนต์ส่งแพ็กเก็ตที่มีแฟล็ก SYN (Synchronize) ไปก่อน"
      }
    ],
    references: [
      { title: "RFC 793 - Transmission Control Protocol (TCP) Specification", url: "https://datatracker.ietf.org/doc/html/rfc793", source: "IETF Standards" },
      { title: "RFC 791 - Internet Protocol (IP) Specification", url: "https://datatracker.ietf.org/doc/html/rfc791", source: "IETF Standards" }
    ],
    visualizationId: "tcp-handshake"
  },
  "lesson-3": {
    title: "บทเรียนที่ 3: ระดับชั้นบนของ OSI L5-L7 และโปรโตคอลสำคัญ",
    subtitle: "เรียนรู้เรื่อง Session, Presentation, Application Layer และโปรโตคอลสำคัญในชีวิตประจำวัน",
    subtopics: [
      { id: "sec-3-1", title: "3.1 กลุ่มเลเยอร์ระดับบน" },
      { id: "sec-3-2", title: "3.2 Session Layer (L5)" },
      { id: "sec-3-3", title: "3.3 Presentation Layer (L6)" },
      { id: "sec-3-4", title: "3.4 Application Layer (L7)" }
    ],
    content: `
      <div class="space-y-6">
        <section id="sec-3-1">
          <h3 class="text-xl font-bold text-violet-600 dark:text-violet-400 mb-2">บทนำสู่กลุ่มเลเยอร์ระดับบน (Upper Layers)</h3>
          <p class="text-slate-800 dark:text-slate-300">
            ขณะที่เลเยอร์ระดับล่าง (L1-L4) มุ่งเน้นการขนส่งข้อมูลดิบข้ามเครือข่ายอย่างน่าเชื่อถือ เลเยอร์ระดับบน 3 ชั้นสุดท้าย <strong>(L5-L7)</strong> จะมุ่งเน้นการทำงานร่วมกับ <strong>แอปพลิเคชันและการแสดงผลของผู้ใช้ปลายทาง</strong> โดยตรง
          </p>
        </section>

        <section id="sec-3-2" class="border-t border-slate-200 dark:border-slate-700/50 pt-4">
          <h3 class="text-xl font-bold text-violet-600 dark:text-violet-400 mb-2">ระดับชั้นที่ 5: Session Layer (เลเยอร์เซสชัน)</h3>
          <p class="text-slate-800 dark:text-slate-300">
            ทำหน้าที่ <strong>เปิดการเชื่อมต่อ ควบคุม และปิดเซสชัน (Dialogue Control)</strong> ระหว่างแอปพลิเคชันของคอมพิวเตอร์ต้นทางและปลายทาง เปรียบเสมือนโอเปอเรเตอร์โทรศัพท์ที่ช่วยต่อสาย คอยดูแลให้สายไม่หลุด และวางสายเมื่อคุยเสร็จ
          </p>
          <ul class="list-disc list-inside text-slate-800 dark:text-slate-300 ml-4 mt-2 space-y-1">
            <li><strong>การควบคุมทิศทาง:</strong> กำหนดการส่งข้อมูลเป็นแบบทิศทางเดียว (Simplex), สลับกันส่ง (Half-Duplex) หรือส่งพร้อมกัน (Full-Duplex)</li>
            <li><strong>ตัวอย่างโปรโตคอล:</strong> NetBIOS, RPC (Remote Procedure Call), SQL</li>
          </ul>
        </section>

        <section id="sec-3-3" class="border-t border-slate-200 dark:border-slate-700/50 pt-4">
          <h3 class="text-xl font-bold text-violet-600 dark:text-violet-400 mb-2">ระดับชั้นที่ 6: Presentation Layer (เลเยอร์นำเสนอข้อมูล)</h3>
          <p class="text-slate-800 dark:text-slate-300">
            ทำหน้าที่เป็น <strong>"ล่ามแปลภาษา"</strong> แปลงรูปแบบข้อมูล (Syntax) ให้ระบบรับส่งที่มีสถาปัตยกรรมต่างกันเข้าใจตรงกัน และดูแลความปลอดภัยของข้อมูล
          </p>
          <div class="grid grid-cols-1 md:grid-cols-3 gap-4 my-4">
            <div class="bg-slate-100 dark:bg-slate-900/60 p-4 rounded-lg border border-slate-200 dark:border-slate-700/50">
              <h4 class="font-bold text-indigo-700 dark:text-indigo-400 mb-1">การเข้ารหัสลับ (Encryption)</h4>
              <p class="text-sm text-slate-800 dark:text-slate-300">เปลี่ยนข้อมูลให้อยู่ในรูปที่อ่านไม่ออกเพื่อความปลอดภัย (เช่น SSL/TLS สำหรับ HTTPS)</p>
            </div>
            <div class="bg-slate-100 dark:bg-slate-900/60 p-4 rounded-lg border border-slate-200 dark:border-slate-700/50">
              <h4 class="font-bold text-indigo-700 dark:text-indigo-400 mb-1">การบีบอัดข้อมูล (Compression)</h4>
              <p class="text-sm text-slate-800 dark:text-slate-300">ลดขนาดข้อมูลเพื่อช่วยให้ประหยัดแบนด์วิธในการรับส่งผ่านระบบเครือข่าย</p>
            </div>
            <div class="bg-slate-100 dark:bg-slate-900/60 p-4 rounded-lg border border-slate-200 dark:border-slate-700/50">
              <h4 class="font-bold text-indigo-700 dark:text-indigo-400 mb-1">การแปลงฟอร์แมต</h4>
              <p class="text-sm text-slate-800 dark:text-slate-300">จัดรูปแบบไฟล์ชนิดต่าง ๆ เช่น แปลงรูปภาพเป็น JPEG/PNG หรือแปลงตัวหนังสือเป็น ASCII/UTF-8</p>
            </div>
          </div>
        </section>

        <section id="sec-3-4" class="border-t border-slate-200 dark:border-slate-700/50 pt-4">
          <h3 class="text-xl font-bold text-violet-600 dark:text-violet-400 mb-2">ระดับชั้นที่ 7: Application Layer (เลเยอร์แอปพลิเคชัน)</h3>
          <p class="text-slate-800 dark:text-slate-300">
            เลเยอร์บนสุดที่เป็นส่วนเชื่อมต่อระหว่าง <strong>ซอฟต์แวร์แอปพลิเคชันของผู้ใช้</strong> กับระบบเครือข่าย โดยระบุคู่ค้า ตรวจสอบทรัพยากรที่พร้อมใช้งาน และประสานการสื่อสาร
          </p>
          <p class="text-slate-800 dark:text-slate-300 mt-2"><strong>โปรโตคอลสำคัญในชีวิตประจำวันที่คุณต้องรู้:</strong></p>
          <div class="space-y-3 mt-3">
            <div class="flex items-start gap-3 bg-slate-100 dark:bg-slate-900/40 p-3 rounded-lg border border-slate-200 dark:border-slate-800">
              <span class="px-2 py-0.5 rounded bg-violet-200 dark:bg-violet-950 text-violet-750 dark:text-violet-400 font-mono text-xs border border-violet-300 dark:border-violet-850 font-bold">HTTP / HTTPS</span>
              <p class="text-xs text-slate-800 dark:text-slate-300">โปรโตคอลสำหรับเรียกดูหน้าเว็บ (HTTPS จะมีเข้ารหัสลับข้อมูลใน L6 ผ่าน SSL/TLS)</p>
            </div>
            <div class="flex items-start gap-3 bg-slate-100 dark:bg-slate-900/40 p-3 rounded-lg border border-slate-200 dark:border-slate-800">
              <span class="px-2 py-0.5 rounded bg-violet-200 dark:bg-violet-950 text-violet-750 dark:text-violet-400 font-mono text-xs border border-violet-300 dark:border-violet-850 font-bold">DNS (Domain Name System)</span>
              <p class="text-xs text-slate-800 dark:text-slate-300">สมุดโทรศัพท์อินเทอร์เน็ต ทำหน้าที่แปลงชื่อเว็บ (เช่น google.com) เป็น IP Address ของเซิร์ฟเวอร์</p>
            </div>
            <div class="flex items-start gap-3 bg-slate-100 dark:bg-slate-900/40 p-3 rounded-lg border border-slate-200 dark:border-slate-800">
              <span class="px-2 py-0.5 rounded bg-violet-200 dark:bg-violet-950 text-violet-750 dark:text-violet-400 font-mono text-xs border border-violet-300 dark:border-violet-850 font-bold">DHCP (Dynamic Host Configuration Protocol)</span>
              <p class="text-xs text-slate-800 dark:text-slate-300">ระบบแจกจ่ายหมายเลข IP และข้อมูลเน็ตเวิร์กพื้นฐานให้เครื่องลูกข่ายโดยอัตโนมัติเมื่อเข้ามาเชื่อมต่อ</p>
            </div>
          </div>
        </section>
      </div>
    `,
    quiz: [
      {
        question: "DNS (Domain Name System) ทำหน้าที่สำคัญอย่างไรในระดับชั้น Application Layer?",
        options: [
          "แปลงชื่อโดเมนเป็นหมายเลขไอพี",
          "เข้ารหัสข้อมูลความปลอดภัยเว็บ",
          "ค้นหาเส้นทางที่ดีที่สุดในระบบ",
          "กําหนดที่อยู่ทางกายภาพอุปกรณ์"
        ],
        answer: 0,
        explanation: "DNS ทำหน้าที่เสมือนสมุดโทรศัพท์ ช่วยแปลชื่อเว็บที่คนจำง่าย (Domain Name) ให้กลายเป็นหมายเลข IP ที่เครื่องคอมพิวเตอร์เข้าใจ"
      },
      {
        question: "เลเยอร์ใดในโมเดล OSI มีบทบาทในการเข้ารหัสลับข้อมูล (Encryption) และบีบอัดข้อมูล (Compression)?",
        options: [
          "Application Layer ",
          "Presentation Layer",
          "Session Layer     ",
          "Transport Layer    "
        ],
        answer: 1,
        explanation: "Presentation Layer (L6) รับผิดชอบเรื่องการแปลงรูปแบบไวยากรณ์ข้อมูล การบีบอัด และการเข้ารหัส/ถอดรหัสลับข้อมูล"
      },
      {
        question: "โปรโตคอล DHCP ทำหน้าที่หลักในข้อใดในสถาปัตยกรรมเครือข่าย?",
        options: [
          "แจกจ่ายไอพีแอดเดรสอัตโนมัติ",
          "เข้ารหัสข้อมูลการสื่อสารเว็บ",
          "ตรวจสอบความถูกต้องไฟล์ข้อมูล",
          "เชื่อมต่อเซสชันจากต้นทางพอร์ต"
        ],
        answer: 0,
        explanation: "DHCP ช่วยให้เครื่องคอมพิวเตอร์ที่เชื่อมต่อเครือข่ายได้รับ IP Address, Subnet Mask และ Gateway อัตโนมัติโดยไม่ต้องตั้งค่าเอง"
      }
    ],
    references: [
      { title: "RFC 9110 - HTTP Semantics", url: "https://datatracker.ietf.org/doc/html/rfc9110", source: "IETF Standards" },
      { title: "RFC 2131 - Dynamic Host Configuration Protocol (DHCP)", url: "https://datatracker.ietf.org/doc/html/rfc2131", source: "IETF Standards" },
      { title: "RFC 1035 - Domain Names - Implementation and Specification", url: "https://datatracker.ietf.org/doc/html/rfc1035", source: "IETF Standards" }
    ],
    visualizationId: null
  },
  "lesson-4": {
    title: "บทเรียนที่ 4: การเดินทางและการแปลงร่างของข้อมูล (Encapsulation Process)",
    subtitle: "เจาะลึกกลไกการไหลของข้อมูลลงระดับล่าง (Encapsulation) และขึ้นระดับบน (Decapsulation)",
    subtopics: [
      { id: "sec-4-1", title: "4.1 ขั้นตอนส่ง (Encapsulation)" },
      { id: "sec-4-2", title: "4.2 ขั้นตอนรับ (Decapsulation)" }
    ],
    content: `
      <div class="space-y-6">
        <section id="sec-4-1">
          <h3 class="text-xl font-bold text-violet-600 dark:text-violet-400 mb-2">การแปลงร่างของข้อมูลในการรับส่งคืออะไร?</h3>
          <p class="text-slate-800 dark:text-slate-300">
            ในการส่งข้อมูลผ่านเครือข่าย ข้อมูลที่ผู้ใช้สร้างขึ้นไม่สามารถถูกโยนออกไปดื้อ ๆ ได้ มันจะต้องผ่านกระบวนการห่อซองจดหมายซ้อนกันในแต่ละเลเยอร์ เรียกว่า <strong>Encapsulation (การห่อหุ้มข้อมูล)</strong> ในฝั่งผู้ส่ง และกระบวนการแกะออกฝั่งผู้รับ เรียกว่า <strong>Decapsulation (การถอดซองข้อมูล)</strong>
          </p>
          <p class="text-slate-800 dark:text-slate-300 mt-2">ข้อมูลจะเดินทางลงมาทีละเลเยอร์ โดยแต่ละเลเยอร์จะเติมข้อมูลควบคุมของตัวเองลงในส่วนหัว (Header):</p>
          <div class="space-y-3 mt-3">
            <div class="flex items-start gap-3 bg-slate-100 dark:bg-slate-900/50 p-3 rounded-lg border border-slate-200 dark:border-slate-800">
              <span class="px-2 py-0.5 rounded bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-400 font-mono text-xs border border-emerald-300 dark:border-emerald-900 font-bold">L7-L5 (Data)</span>
              <p class="text-xs text-slate-800 dark:text-slate-300">ผู้ใช้ส่งข้อมูล เช่น "สวัสดี" (จัดในรูป Data)</p>
            </div>
            <div class="flex items-start gap-3 bg-slate-100 dark:bg-slate-900/50 p-3 rounded-lg border border-slate-200 dark:border-slate-800">
              <span class="px-2 py-0.5 rounded bg-indigo-100 dark:bg-indigo-950 text-indigo-800 dark:text-indigo-400 font-mono text-xs border border-indigo-300 dark:border-indigo-900 font-bold">L4 (Segment/Datagram)</span>
              <p class="text-xs text-slate-800 dark:text-slate-300">เติม <strong>TCP/UDP Header</strong> (ใส่พอร์ตต้นทาง/ปลายทาง) ได้หน่วยข้อมูลเรียกว่า <strong>Segment (สำหรับ TCP) หรือ Datagram (สำหรับ UDP)</strong></p>
            </div>
            <div class="flex items-start gap-3 bg-slate-100 dark:bg-slate-900/50 p-3 rounded-lg border border-slate-200 dark:border-slate-800">
              <span class="px-2 py-0.5 rounded bg-violet-100 dark:bg-violet-950 text-violet-800 dark:text-violet-400 font-mono text-xs border border-violet-300 dark:border-violet-900 font-bold">L3 (Packet)</span>
              <p class="text-xs text-slate-800 dark:text-slate-300">เติม <strong>IP Header</strong> (ใส่ IP ต้นทาง/ปลายทาง) ได้หน่วยข้อมูลเรียกว่า <strong>Packet</strong></p>
            </div>
            <div class="flex items-start gap-3 bg-slate-100 dark:bg-slate-900/50 p-3 rounded-lg border border-slate-200 dark:border-slate-800">
              <span class="px-2 py-0.5 rounded bg-purple-100 dark:bg-purple-950 text-purple-850 dark:text-purple-400 font-mono text-xs border border-purple-300 dark:border-purple-900 font-bold">L2 (Frame)</span>
              <p class="text-xs text-slate-800 dark:text-slate-300">เติม <strong>MAC Header</strong> (MAC ต้นทาง/ปลายทาง) และห้อยท้ายด้วย FCS (Trailer ตรวจหา Error) ได้หน่วยข้อมูลเรียกว่า <strong>Frame</strong></p>
            </div>
            <div class="flex items-start gap-3 bg-slate-100 dark:bg-slate-900/50 p-3 rounded-lg border border-slate-200 dark:border-slate-800">
              <span class="px-2 py-0.5 rounded bg-pink-100 dark:bg-pink-950 text-pink-800 dark:text-pink-400 font-mono text-xs border border-pink-300 dark:border-pink-900 font-bold">L1 (Bits)</span>
              <p class="text-xs text-slate-800 dark:text-slate-300">แปลงข้อมูลเฟรมเป็นระดับแรงดันไฟฟ้าหรือคลื่นแสง ส่งสัญญาณออกไปในรูป <strong>Bits (0 และ 1)</strong></p>
            </div>
          </div>
        </section>

        <section id="sec-4-2" class="border-t border-slate-200 dark:border-slate-700/50 pt-4">
          <h3 class="text-xl font-bold text-violet-600 dark:text-violet-400 mb-2">ขั้นตอนการรับ: Decapsulation (จาก L1 ขึ้นสู่ L7)</h3>
          <p class="text-slate-800 dark:text-slate-300">
            เมื่อข้อมูลเดินทางไปถึงผู้รับ อุปกรณ์ปลายทางจะทำกระบวนการตรงกันข้าม โดยจะ <strong>"แกะหัวข้อมูล (Header) ออกทีละเลเยอร์"</strong> จาก L1 ขึ้นไป L7:
          </p>
          <p class="text-slate-800 dark:text-slate-300 mt-2 bg-slate-100 dark:bg-slate-900/40 p-4 border border-slate-200 dark:border-slate-800 rounded-lg">
            การ์ดแลนรับสัญญาณ Bits (L1) -> ตรวจความถูกต้องพิกัด MAC Address และแกะ MAC Header ออก (L2) -> ตรวจสอบพิกัด IP และแกะ IP Header ออก (L3) -> ตรวจสอบ Port และแกะ TCP/UDP Header ออก (L4) -> ส่งข้อมูล Data ที่สมบูรณ์แบบให้แอปพลิเคชันใช้งาน (L7)
          </p>
        </section>
      </div>
    `,
    quiz: [
      {
        question: "ในกระบวนการห่อหุ้มข้อมูล (Encapsulation) เมื่อข้อมูลส่งลงมาถึงระดับชั้น Network Layer จะถูกแปลงสถานะเป็นหน่วยข้อมูลใด?",
        options: [
          "Segment",
          "Packet ",
          "Frame  ",
          "Bits   "
        ],
        answer: 1,
        explanation: "หน่วยข้อมูลที่ผ่านการทำงานและใส่ IP Header ในระดับ Network Layer (L3) เรียกว่า Packet"
      },
      {
        question: "ในขั้นตอนการรับข้อมูล (Decapsulation) ระดับชั้นใดจะทำหน้าที่แกะข้อมูลส่วนหัวที่ระบุหมายเลขพอร์ต (Port Numbers)?",
        options: [
          "Transport Layer",
          "Network Layer  ",
          "Data Link Layer",
          "Physical Layer "
        ],
        answer: 0,
        explanation: "พอร์ตควบคุมการส่ง (Port Numbers) ทำงานและถูกจัดเก็บในส่วนหัวระดับ L4: Transport Layer"
      },
      {
        question: "ข้อมูลส่วนตัวอย่างตัวตรวจสอบความถูกต้องของข้อมูล (Frame Check Sequence - FCS) จะถูกเพิ่มเข้ามาที่ส่วนท้ายในระดับเลเยอร์ใด?",
        options: [
          "Transport Layer",
          "Network Layer  ",
          "Data Link Layer",
          "Physical Layer "
        ],
        answer: 2,
        explanation: "ตัวตรวจสอบความถูกต้อง (FCS หรือ CRC) จะถูกใส่ไว้ท้ายเฟรมที่เลเยอร์ 2: Data Link Layer เพื่อเช็กสัญญาณกวนทางกายภาพ"
      }
    ],
    references: [
      { title: "Cisco Systems: Data Encapsulation & Decapsulation Process Guide", url: "https://www.ciscopress.com/articles/article.asp?p=3211186", source: "Cisco Press Official Document" }
    ],
    visualizationId: "encap-decap-sim"
  },
  "lesson-5": {
    title: "บทเรียนที่ 5: ก้าวแรกสู่ Cisco IOS CLI และการใช้โหมดต่าง ๆ",
    subtitle: "เรียนรู้การเชื่อมต่อสาย Console และทำความเข้าใจสิทธิ์ระดับต่าง ๆ บนอุปกรณ์ผ่าน CLI",
    subtopics: [
      { id: "sec-5-1", title: "5.1 การเข้าถึงสวิตช์ (Console)" },
      { id: "sec-5-2", title: "5.2 โหมดต่าง ๆ ของ Cisco IOS" },
      { id: "sec-5-3", title: "5.3 คีย์ลัดช่วยป้อนคำสั่ง" }
    ],
    content: `
      <div class="space-y-6">
        <section id="sec-5-1">
          <h3 class="text-xl font-bold text-violet-600 dark:text-violet-400 mb-2">การเข้าถึงสวิตช์ Cisco (How to Connect)</h3>
          <p class="text-slate-800 dark:text-slate-300">
            เมื่อคุณแกะกล่องสวิตช์ Cisco ใหม่เอี่ยม ตัวเครื่องจะไม่มีหน้าจอและปุ่มกดใด ๆ คุณต้องเชื่อมต่อจากเครื่องคอมพิวเตอร์ผ่านพอร์ต <strong>Console Port</strong> (พอร์ต RJ-45 สีฟ้า หรือ USB-Mini ในรุ่นใหม่) โดยใช้สาย <strong>Console Cable</strong>
          </p>
          <p class="text-slate-800 dark:text-slate-300 mt-2 bg-slate-100 dark:bg-slate-900/40 p-3 rounded-lg border border-slate-200 dark:border-slate-800">
            หลังจากนั้นเปิดโปรแกรมจำลองหน้าจอ Terminal (เช่น PuTTY, SecureCRT) ตั้งค่าความเร็วการเชื่อมต่อเป็น <strong>9600 Baud, 8 Data Bits, No Parity, 1 Stop Bit</strong> เพื่อเริ่มป้อนคำสั่งผ่าน CLI
          </p>
        </section>

        <section id="sec-5-2" class="border-t border-slate-200 dark:border-slate-700/50 pt-4">
          <h3 class="text-xl font-bold text-violet-600 dark:text-violet-400 mb-2">โหมดการทำงานของ Cisco IOS CLI</h3>
          <p class="text-slate-800 dark:text-slate-300">เพื่อความปลอดภัย Cisco ได้แบ่งระดับสิทธิ์ของผู้ใช้งานออกเป็นโหมดหลัก ๆ ดังนี้:</p>
          
          <div class="space-y-4 mt-3">
            <div class="bg-slate-100 dark:bg-slate-900/50 p-4 rounded-lg border border-slate-200 dark:border-slate-800">
              <h4 class="font-bold text-indigo-700 dark:text-indigo-400 mb-1">1. User EXEC Mode (โหมดผู้ใช้ทั่วไป)</h4>
              <p class="text-xs text-slate-500 font-mono mb-2">สัญลักษณ์หน้าจอ: Switch></p>
              <p class="text-xs text-slate-800 dark:text-slate-300">ทำได้เฉพาะการตรวจสอบขั้นพื้นฐานทั่วไป เช่น การเช็กสถานะพอร์ตเบื้องต้น หรือการ Ping เพื่อเช็กเน็ตเวิร์ก ไม่สามารถปรับแต่งแก้ไขค่าใด ๆ ได้</p>
              <p class="text-xs text-indigo-700 dark:text-indigo-400 mt-1"><strong>คำสั่งสำหรับสลับไปยังโหมดถัดไป:</strong> <code>enable</code></p>
            </div>

            <div class="bg-slate-100 dark:bg-slate-900/50 p-4 rounded-lg border border-slate-200 dark:border-slate-800">
              <h4 class="font-bold text-indigo-700 dark:text-indigo-400 mb-1">2. Privileged EXEC Mode (โหมดผู้ใช้งานระดับสูง)</h4>
              <p class="text-xs text-slate-500 font-mono mb-2">สัญลักษณ์หน้าจอ: Switch#</p>
              <p class="text-xs text-slate-800 dark:text-slate-300">เป็นระดับผู้ควบคุมระบบ (Admin) สามารถรันคำสั่งตรวจสอบสถานะของสวิตช์อย่างละเอียด (เช่น <code>show running-config</code>) ลบระบบ และบันทึกค่าได้</p>
              <p class="text-xs text-indigo-700 dark:text-indigo-400 mt-1"><strong>คำสั่งสำหรับสลับไปยังโหมดตั้งค่าหลัก:</strong> <code>configure terminal</code></p>
            </div>

            <div class="bg-slate-100 dark:bg-slate-900/50 p-4 rounded-lg border border-slate-200 dark:border-slate-800">
              <h4 class="font-bold text-indigo-700 dark:text-indigo-400 mb-1">3. Global Configuration Mode (โหมดตั้งค่าหลัก)</h4>
              <p class="text-xs text-slate-500 font-mono mb-2">สัญลักษณ์หน้าจอ: Switch(config)#</p>
              <p class="text-xs text-slate-800 dark:text-slate-300">ใช้สำหรับปรับแต่งการทำงานหลัก ๆ ของระบบ เช่น ตั้งชื่อเครื่อง ตั้งรหัสผ่านหลัก และใช้เป็นทางผ่านไปเปิดโหมดกำหนดค่าย่อยต่าง ๆ</p>
              <p class="text-xs text-indigo-700 dark:text-indigo-400 mt-1"><strong>คำสั่งย่อยยอดนิยม:</strong> <code>interface [ชื่อพอร์ต]</code> (ไปตั้งพอร์ต), <code>line vty 0 15</code> (ไปตั้ง SSH)</p>
            </div>
          </div>
        </section>

        <section id="sec-5-3" class="border-t border-slate-200 dark:border-slate-700/50 pt-4">
          <h3 class="text-xl font-bold text-violet-600 dark:text-violet-400 mb-2">คีย์ลัดช่วยชีวิตในการป้อนคำสั่ง</h3>
          <p class="text-slate-800 dark:text-slate-300">ระบบ Cisco CLI มีกลไกการป้อนข้อมูลอัจฉริยะที่ช่วยคุณทำงานได้เร็วขึ้น:</p>
          <ul class="list-disc list-inside text-slate-800 dark:text-slate-300 ml-4 mt-2 space-y-1">
            <li><strong>พิมพ์เครื่องหมายคำถาม (?) :</strong> แสดงลิสต์คำสั่งทั้งหมดที่สามารถพิมพ์ได้ ณ ตำแหน่งปัจจุบัน หรือแสดงทางเลือกของพารามิเตอร์ถัดไป</li>
            <li><strong>กดปุ่ม Tab :</strong> เติมคำสั่งให้เต็มโดยอัตโนมัติหากป้อนคำศัพท์ขึ้นต้นไว้ไม่ซ้ำกับคำอื่น (เช่น พิมพ์ <code>conf</code> แล้วกด Tab จะเติมเป็น <code>configure</code>)</li>
            <li><strong>กดปุ่มย้อนกลับ (exit / end) :</strong> พิมพ์ <code>exit</code> เพื่อย้อนกลับทีละโหมด หรือพิมพ์ <code>end</code> (หรือกด Ctrl+Z) เพื่อดีดตัวเองกลับมาที่ <code>Switch#</code> ทันที</li>
          </ul>
        </section>
      </div>
    `,
    quiz: [
      {
        question: "หากคุณอยู่ในหน้าจอ 'Switch(config)#' แล้วพิมพ์คำสั่ง 'exit' จะสลับโหมดไปยังพรอมต์ใด?",
        options: [
          "Switch>   ",
          "Switch#   ",
          "Switch:   ",
          "Switch-if#"
        ],
        answer: 1,
        explanation: "คำสั่ง exit จะย้อนกลับหนึ่งระดับชั้น จากโหมด Global Config (Switch(config)#) จะย้อนกลับมาสู่ Privileged EXEC Mode (Switch#)"
      },
      {
        question: "สัญลักษณ์พรอมต์ใดที่บ่งบอกว่าคุณกำลังทำหน้าที่อยู่ในโหมดควบคุมตรวจสอบระดับสูง (Privileged EXEC Mode)?",
        options: [
          "Switch>        ",
          "Switch#        ",
          "Switch(config)#",
          "Switch(line)#  "
        ],
        answer: 1,
        explanation: "สัญลักษณ์เครื่องหมายสี่เหลี่ยม (#) แสดงว่ากำลังทำงานใน Privileged EXEC Mode ซึ่งสามารถตรวจสอบดูข้อมูลระบบได้ทั้งหมด"
      },
      {
        question: "คีย์ลัด/แป้นพิมพ์ใดใน Cisco IOS ที่ใช้เพื่อเติมคำสั่งยาว ๆ ให้เต็มโดยอัตโนมัติเมื่อพิมพ์อักษรขึ้นต้น?",
        options: [
          "Tab Key  ",
          "Enter Key",
          "Spacebar ",
          "Ctrl+C   "
        ],
        answer: 0,
        explanation: "ปุ่ม Tab ใช้สำหรับเติมเต็มคำสั่งที่พิมพ์ขึ้นต้นไว้โดยอัตโนมัติ (Auto-Complete)"
      }
    ],
    references: [
      { title: "Cisco IOS Command Reference Guide - CLI Basics", url: "https://www.cisco.com/c/en/us/support/ios-nx-os-software/ios-15-2m-t/products-command-reference-list.html", source: "Cisco IOS Documentation" }
    ],
    visualizationId: "cli-terminal"
  },
  "lesson-6": {
    title: "บทเรียนที่ 6: การตั้งค่าพารามิเตอร์พื้นฐานและความปลอดภัยสวิตช์",
    subtitle: "เจาะลึกการกำหนด Hostname, เข้ารหัสผ่าน และเก็บรักษาสถานะไฟล์คอนฟิก",
    subtopics: [
      { id: "sec-6-1", title: "6.1 การจัดการ RAM vs NVRAM" },
      { id: "sec-6-2", title: "6.2 คำสั่งตั้งค่าพื้นฐาน" }
    ],
    content: `
      <div class="space-y-6">
        <section id="sec-6-1">
          <h3 class="text-xl font-bold text-violet-600 dark:text-violet-400 mb-2">โครงสร้างการเก็บข้อมูลการตั้งค่า (RAM vs NVRAM)</h3>
          <p class="text-slate-800 dark:text-slate-300">
            ในการตั้งค่าอุปกรณ์ Cisco จะแบ่งพื้นที่เก็บค่าการตั้งค่าหลักออกเป็น 2 ส่วนสำคัญคือ:
          </p>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4 my-4">
            <div class="bg-slate-100 dark:bg-slate-900/60 p-4 rounded-lg border border-slate-200 dark:border-slate-700/50">
              <h4 class="font-bold text-amber-700 dark:text-amber-400 mb-1">Running Config (ทำงานอยู่)</h4>
              <p class="text-xs text-slate-800 dark:text-slate-300 mt-1">เก็บอยู่ในหน่วยความจำชั่วคราว (RAM) ทุกคำสั่งที่พิมพ์จะเกิดผลทันทีที่ป้อน แต่ถ้าปิดเครื่องหรือสวิตช์ไฟดับ ข้อมูลนี้จะหายไปทั้งหมด</p>
            </div>
            <div class="bg-slate-100 dark:bg-slate-900/60 p-4 rounded-lg border border-slate-200 dark:border-slate-700/50">
              <h4 class="font-bold text-emerald-700 dark:text-emerald-400 mb-1">Startup Config (เปิดเครื่องใหม่)</h4>
              <p class="text-xs text-slate-800 dark:text-slate-300 mt-1">เก็บอยู่ในหน่วยความจำถาวร (NVRAM) เป็นชุดคำสั่งที่สวิตช์จะนำขึ้นมาทำตามทุกครั้งเมื่อเปิดเครื่องขึ้นมาใหม่ หากไม่ทำการเซฟ ค่าที่แก้ไขบน RAM จะไม่บันทึกลงตัวนี้</p>
            </div>
          </div>
          <p class="text-slate-800 dark:text-slate-300 mt-2 font-semibold text-sm">
            💡 คำสั่งบันทึกการทำงาน: <code>copy running-config startup-config</code> หรือย่อว่า <code>write memory</code>
          </p>
        </section>

        <section id="sec-6-2" class="border-t border-slate-200 dark:border-slate-700/50 pt-4">
          <h3 class="text-xl font-bold text-violet-600 dark:text-violet-400 mb-2">คำสั่งตั้งค่าพื้นฐานที่จำเป็นบนสวิตช์</h3>
          <p class="text-slate-800 dark:text-slate-300">เมื่อติดตั้งสวิตช์ใหม่ ควรตั้งค่าพารามิเตอร์เบื้องต้นเหล่านี้เป็นลำดับแรก:</p>
          
          <div class="space-y-4 mt-3">
            <div>
              <h5 class="text-xs font-bold text-indigo-700 dark:text-indigo-400 uppercase mb-1">1. ตั้งชื่อเครื่อง (Hostname) เพื่อการแยกแยะ:</h5>
              <pre><code>Switch(config)# hostname SW-Dept-01</code></pre>
            </div>

            <div>
              <h5 class="text-xs font-bold text-indigo-700 dark:text-indigo-400 uppercase mb-1">2. ตั้งรหัสผ่านสิทธิ์ผู้ดูแลระบบแบบปลอดภัยสูง (Enable Secret):</h5>
              <pre><code>SW-Dept-01(config)# enable secret P@ssw0rd999</code></pre>
              <p class="text-xs text-slate-500 mt-1"><em>หลีกเลี่ยงการใช้ <code>enable password</code> เพราะข้อมูลจะเก็บเป็นตัวหนังสือธรรมดา (Plain Text) ซึ่งไม่ปลอดภัย</em></p>
            </div>

            <div>
              <h5 class="text-xs font-bold text-indigo-700 dark:text-indigo-400 uppercase mb-1">3. เข้ารหัสลับรหัสผ่านอื่น ๆ ทั้งระบบ:</h5>
              <pre><code>SW-Dept-01(config)# service password-encryption</code></pre>
              <p class="text-xs text-slate-500 mt-1">คำสั่งนี้ช่วยป้องกันไม่ให้บุคคลที่เข้ามาดูหน้าจอ <code>show run</code> แอบมองเห็นรหัสผ่านทั่วไป เช่น รหัสผ่าน Console หรือรหัสผ่าน Telnet</p>
            </div>

            <div>
              <h5 class="text-xs font-bold text-indigo-700 dark:text-indigo-400 uppercase mb-1">4. ตั้งค่าแบนเนอร์แสดงคำเตือน (Banner MOTD):</h5>
              <pre><code>SW-Dept-01(config)# banner motd # Unauthorized access is strictly prohibited #</code></pre>
              <p class="text-xs text-slate-500 mt-1">แบนเนอร์จะแสดงข้อความแจ้งเตือนทางกฎหมายทุกครั้งที่มีผู้พยายามล็อกอินเข้ามาสู่อุปกรณ์</p>
            </div>
          </div>
        </section>
      </div>
    `,
    quiz: [
      {
        question: "หากต้องการสั่งบันทึกการตั้งค่าปัจจุบันที่ป้อนเสร็จแล้วลงสู่หน่วยความจำถาวร ต้องใช้คำสั่งใด?",
        options: [
          "copy running-config startup-config",
          "copy startup-config running-config",
          "write running-config startup-config",
          "save running-config startup-config"
        ],
        answer: 0,
        explanation: "คำสั่ง copy running-config startup-config ใช้สำหรับบันทึกการตั้งค่าใน RAM ไปยัง NVRAM (เขียนทับด้วยการคัดลอกทับ)"
      },
      {
        question: "ข้อดีของการเลือกใช้คำสั่ง 'enable secret' เมื่อเทียบกับ 'enable password' คืออะไร?",
        options: [
          "เข้ารหัสผ่านอย่างแน่นหนาโดยอัตโนมัติ",
          "ไม่ต้องใช้รหัสผ่านตอนเชื่อมต่อสาย   ",
          "สามารถระบุพาสเวิร์ดที่มีคำว่าลับได้ ",
          "ใช้งานความเร็วเน็ตเวิร์กที่สูงขึ้นได้ "
        ],
        answer: 0,
        explanation: "enable secret จะทำการเข้ารหัสลับรหัสผ่านแบบ MD5 hash (type 5) หรือแบบ one-way hash function ที่ถอดคืนไม่ได้ทันทีเพื่อความปลอดภัย ในขณะที่ enable password จะบันทึกเป็น plaintext"
      },
      {
        question: "ข้อใดคือเป้าหมายหลักของการกำหนดค่าคำสั่ง 'service password-encryption'?",
        options: [
          "เข้ารหัสข้อมูลแพ็กเก็ตที่ส่งผ่านสายแลน",
          "เข้ารหัสรหัสผ่านธรรมดาให้ดูไม่ออกในไฟล์รัน",
          "บังคับให้ตั้งรหัสผ่านที่มีความซับซ้อนขึ้น",
          "จำกัดสิทธิ์ผู้ใช้ไม่ให้กู้คืนรหัสผ่านได้"
        ],
        answer: 1,
        explanation: "service password-encryption ใช้สำหรับป้องกันการมองเห็นรหัสผ่านแบบ Plain Text ในเวลาตรวจสอบการรันค่าตั้งค่า (show run)"
      }
    ],
    references: [
      { title: "Cisco Guide to Hardening Cisco IOS Devices (Security Best Practices)", url: "https://www.cisco.com/c/en/us/support/docs/ip/access-lists/13608-21.html", source: "Cisco Security Guide" }
    ],
    visualizationId: "cli-terminal"
  },
  "lesson-7": {
    title: "บทเรียนที่ 7: การตั้งค่า IP Management และความปลอดภัยระยะไกล SSH",
    subtitle: "เปิดพอร์ตเสมือนเพื่อให้ผู้ดูแลระบบล็อกอินเข้ามาแก้ไขสวิตช์จากระยะไกลแทนการเดินไปเสียบสายคอนโซล",
    subtopics: [
      { id: "sec-7-1", title: "7.1 SVI & Management IP" },
      { id: "sec-7-2", title: "7.2 Default Gateway บน Switch" },
      { id: "sec-7-3", title: "7.3 ช่องโหว่ของโปรโตคอล Telnet" },
      { id: "sec-7-4", title: "7.4 ขั้นตอนติดตั้ง SSH v2" }
    ],
    content: `
      <div class="space-y-6">
        <section id="sec-7-1">
          <h3 class="text-xl font-bold text-violet-600 dark:text-violet-400 mb-2">7.1 Switched Virtual Interface (SVI) & Management IP</h3>
          <p class="text-slate-800 dark:text-slate-300">
            ตามปกติสวิตช์ Layer 2 จะทำงานกับ MAC Address และไม่มี IP Address บนพอร์ตแลนทางกายภาพ (Physical Ports) แต่เพื่อการเข้าไปแก้ไขหรือตรวจสอบระยะไกล (Remote Management) เราต้องสร้างพอร์ตเสมือนขึ้นมาบนอินเตอร์เฟส VLAN ที่เรียกว่า <strong>SVI (Switched Virtual Interface)</strong>
          </p>
          <p class="text-slate-800 dark:text-slate-300 mt-2">
            ค่าเริ่มต้นของสวิตช์ Cisco ทุกตัวจะมี <strong>Interface VLAN 1</strong> มารอรับการกำหนด IP Address เพื่อทำหน้าที่เป็น **Management IP**
          </p>
          <pre><code>Switch# configure terminal
Switch(config)# interface vlan 1
Switch(config-if)# ip address 192.168.1.10 255.255.255.0
Switch(config-if)# no shutdown
Switch(config-if)# exit</code></pre>
          <p class="text-xs text-slate-500 mt-1"><em>*อย่าลืมพิมพ์คำสั่ง <code>no shutdown</code> เพื่อเปิดใช้งานพอร์ตเสมือน Vlan1 เสมอ</em></p>
        </section>

        <section id="sec-7-2" class="border-t border-slate-200 dark:border-slate-700/50 pt-4">
          <h3 class="text-xl font-bold text-violet-600 dark:text-violet-400 mb-2">7.2 Default Gateway สำหรับ Switch</h3>
          <p class="text-slate-800 dark:text-slate-300">
            หากคุณเชื่อมโยงเครื่อง PC และสวิตช์อยู่ในวงเน็ตเวิร์กย่อยเดียวกัน (Same Subnet) คุณสามารถล็อกอินเข้า IP Management ได้โดยตรง แต่ถ้าผู้ดูแลระบบต้องการล็อกอินจากสาขาอื่นหรืออินเทอร์เน็ต (Different Subnet) สวิตช์จะต้องมี <strong>IP Default Gateway</strong> เพื่อใช้ส่งสัญญาณตอบกลับข้ามวงเน็ตเวิร์กออกไปยัง Router
          </p>
          <pre><code>Switch(config)# ip default-gateway 192.168.1.254</code></pre>
        </section>

        <section id="sec-7-3" class="border-t border-slate-200 dark:border-slate-700/50 pt-4">
          <h3 class="text-xl font-bold text-violet-600 dark:text-violet-400 mb-2">7.3 ทำไมไม่ควรใช้โปรโตคอล Telnet ในระบบเครือข่าย</h3>
          <p class="text-slate-800 dark:text-slate-300">
            ในยุคก่อน ผู้ดูแลระบบมักนิยมพิมพ์คำสั่งผ่านสาย <strong>Telnet (พอร์ต 23)</strong> เพื่อเชื่อมต่อเข้าควบคุมสวิตช์ แต่ในปัจจุบันโปรโตคอลนี้เป็นอันตรายอย่างยิ่ง เนื่องจากส่งผ่านข้อมูลรวมถึงรหัสผ่านแอดมินในรูปแบบ <strong>ตัวอักษรธรรมดาที่ไม่มีการเข้ารหัสลับ (Cleartext / Plain Text)</strong>
          </p>
          <p class="text-slate-800 dark:text-slate-300 mt-2 bg-rose-50 dark:bg-rose-950/20 text-rose-700 dark:text-rose-400 p-3 rounded-lg border border-rose-200 dark:border-rose-900/50 text-xs">
            ⚠️ ผู้บุกรุกที่สามารถดักจับแพ็กเก็ต (Packet Sniffing) ในสาย LAN ด้วยโปรแกรมจำพวก Wireshark จะสามารถแกะรอยเห็นรหัสผ่านแอดมินของคุณได้อย่างชัดเจน 100% จึงต้องเปลี่ยนมาใช้ <strong>SSH (Secure Shell) พอร์ต 22</strong> ซึ่งเข้ารหัสลับข้อมูลทุกแพ็กเก็ต
          </p>
        </section>

        <section id="sec-7-4" class="border-t border-slate-200 dark:border-slate-700/50 pt-4">
          <h3 class="text-xl font-bold text-violet-600 dark:text-violet-400 mb-2">7.4 ขั้นตอนการติดตั้ง SSH v2 บน Cisco Switch</h3>
          <p class="text-slate-800 dark:text-slate-300">
            สวิตช์จำเป็นต้องมีชื่อโดเมนและคีย์ความปลอดภัยในการสร้างกระบวนการเข้ารหัสลับ มีขั้นตอนมาตรฐานดังนี้:
          </p>
          <ol class="list-decimal list-inside text-slate-800 dark:text-slate-300 mt-2 space-y-4 ml-2">
            <li>
              <strong>ตั้งค่า Domain Name และสร้าง User สิทธิ์สูงสุด:</strong>
              <pre><code>Switch(config)# ip domain-name corporate.com
Switch(config)# username admin privilege 15 secret SuperSecretPass</code></pre>
            </li>
            <li>
              <strong>สร้างกุญแจเข้ารหัสลับ (RSA Keys):</strong>
              <pre><code>Switch(config)# crypto key generate rsa</code></pre>
              <p class="text-xs text-slate-500 mt-1"><em>*ระบบจะถามหาขนาดคีย์ความปลอดภัย แนะนำให้ระบุค่าตั้งแต่ <strong>2048</strong> ขึ้นไป (หรือ <strong>4096</strong> บน IOS รุ่นใหม่เพื่อความปลอดภัยระดับสูงสุด) เพื่อรองรับ SSH v2</em></p>
            </li>
            <li>
              <strong>เลือกใช้โปรโตคอล SSH v2 และจำกัดช่องทางล็อกอิน:</strong>
              <pre><code>Switch(config)# ip ssh version 2
Switch(config)# line vty 0 15
Switch(config-line)# transport input ssh
Switch(config-line)# login local
Switch(config-line)# exit</code></pre>
              <p class="text-xs text-slate-500 mt-1"><em>*คำสั่ง <code>transport input ssh</code> จะทำการปิดสัญญาณ Telnet ทันที และ <code>login local</code> จะบอกให้สวิตช์ใช้ฐานข้อมูลบัญชีผู้ใช้ในระบบตรวจความปลอดภัย</em></p>
            </li>
          </ol>
        </section>
      </div>
    `,
    quiz: [
      {
        question: "เหตุใดผู้พัฒนาจึงไม่แนะนำให้เลือกเปิดใช้โปรโตคอล Telnet ในอุปกรณ์ Cisco Switch ของระบบใช้งานจริง?",
        options: [
          "ใช้งานผ่านเว็บหน้าจอ GUI ไม่ได้",
          "ส่งข้อมูลรหัสผ่านเป็นตัวอักษรดิบไม่เข้ารหัสลับ",
          "รองรับความเร็วพอร์ตได้แค่ 10 Mbps เท่านั้น ",
          "บล็อกไม่ให้ผู้ใช้สลับโหมด CLI ได้          "
        ],
        answer: 1,
        explanation: "Telnet ทำการรับส่งแพ็กเก็ตข้อมูลและรหัสผ่านทั้งหมดเป็น Plaintext ทำให้ง่ายต่อการดักดมข้อมูลขโมยรหัสผ่าน"
      },
      {
        question: "คำสั่งใดใช้สำหรับสร้างคีย์คู่รหัสเพื่อเปิดทำงานให้กับ SSH บนระบบ Cisco IOS?",
        options: [
          "ssh key generate rsa      ",
          "crypto key generate rsa   ",
          "security key create ssh   ",
          "enable secret key generate"
        ],
        answer: 1,
        explanation: "ใช้คำสั่ง crypto key generate rsa ในโหมด Global Configuration เพื่อสร้างกุญแจสำหรับใช้เปิดฟังก์ชัน SSH"
      },
      {
        question: "คำสั่งใดมีหน้าที่กำหนดค่า default gateway ให้กับ L2 Switch สำหรับรับส่งข้อมูลข้ามวงเน็ตเวิร์ก?",
        options: [
          "ip route 0.0.0.0 0.0.0.0  ",
          "ip default-gateway [IP]   ",
          "gateway address [IP]      ",
          "interface gateway [IP]    "
        ],
        answer: 1,
        explanation: "ใน L2 Switch ใช้คำสั่ง ip default-gateway เพื่อระบุชี้เป้าหมาย IP Router ตัวถัดไปที่จะส่งแพ็กเก็ตออกไปข้างนอก"
      }
    ],
    references: [
      { title: "Securing Shell (SSH) Configuration Guide - Cisco Systems", url: "https://www.cisco.com/c/en/us/support/docs/security-vpn/secure-shell-ssh/4145-ssh.html", source: "Cisco Technical Support" },
      { title: "RFC 4253 - Secure Shell (SSH) Transport Layer Protocol", url: "https://datatracker.ietf.org/doc/html/rfc4253", source: "IETF Standards" }
    ],
    visualizationId: "cli-terminal"
  },
  "lesson-8": {
    title: "บทเรียนที่ 8: การจัดการเครือข่ายด้วย VLAN และการเชื่อมต่อ Trunk",
    subtitle: "แบ่งสวิตช์ตัวเดียวให้เหมือนมีหลายเครือข่าย และส่งข้อมูลข้ามพอร์ตลิงก์แลนด้วยสายเส้นเดียว",
    subtopics: [
      { id: "sec-8-1", title: "8.1 VLAN คืออะไร?" },
      { id: "sec-8-2", title: "8.2 Access Port vs Trunk Port" },
      { id: "sec-8-3", title: "8.3 มาตรฐาน IEEE 802.1Q" },
      { id: "sec-8-4", title: "8.4 คอนฟิก VLAN & Trunk" }
    ],
    content: `
      <div class="space-y-6">
        <section id="sec-8-1">
          <h3 class="text-xl font-bold text-violet-600 dark:text-violet-400 mb-2">8.1 Virtual Local Area Network (VLAN) คืออะไร?</h3>
          <p class="text-slate-800 dark:text-slate-300">
            ตามปกติ พอร์ตทั้งหมดของสวิตช์จะอยู่ในวงแลนใหญ่เดียวกันเรียกว่า **Broadcast Domain** เดียวกัน หากมีใครส่งแพ็กเก็ตประเภทกระจายเสียง (เช่น ARP) ข้อมูลจะพุ่งกระจายไปชนคอมพิวเตอร์ทุกเครื่อง ซึ่งเป็นการสิ้นเปลืองทรัพยากรระบบและไม่ปลอดภัย
          </p>
          <p class="text-slate-800 dark:text-slate-300 mt-2">
            <strong>VLAN (Virtual LAN)</strong> คือการแบ่งย่อยสวิตช์ทางกายภาพ 1 ตัว ให้กลายเป็นสวิตช์เสมือนหลายตัวแยกออกจากกันอย่างสิ้นเชิงทางโลจิก เครื่องที่อยู่คนละ VLAN จะคุยกันไม่ได้โดยตรง (ต้องคุยผ่าน Router เท่านั้น) แม้จะต่อสายอยู่บนสวิตช์ตัวเดียวกันก็ตาม
          </p>
          <div class="bg-slate-100 dark:bg-slate-900/40 p-4 rounded-lg border border-slate-200 dark:border-slate-800">
            <span class="font-bold text-indigo-700 dark:text-indigo-400 text-sm">💡 เลขประจำตัว VLAN ID:</span>
            <p class="text-xs text-slate-800 dark:text-slate-300 mt-1">
              - ช่วงปกติ (Normal-range) คือ <strong>1 ถึง 1005</strong> โดย **VLAN 1** เป็นค่าเริ่มต้น (Default VLAN) ของทุกพอร์ต และช่วงขยาย (Extended-range) คือ <strong>1006 ถึง 4094</strong> เพื่อรองรับเครือข่ายขนาดใหญ่
            </p>
          </div>
        </section>

        <section id="sec-8-2" class="border-t border-slate-200 dark:border-slate-700/50 pt-4">
          <h3 class="text-xl font-bold text-violet-600 dark:text-violet-400 mb-2">8.2 Access Port vs Trunk Port</h3>
          <p class="text-slate-800 dark:text-slate-300">เมื่อใช้งาน VLAN พอร์ตแลนทางกายภาพบนสวิตช์จะถูกแบ่งออกเป็น 2 บทบาทหลักตามรูปแบบอุปกรณ์ปลายทาง:</p>
          
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mt-3">
            <div class="bg-slate-100 dark:bg-slate-900/50 p-4 rounded-lg border border-slate-200 dark:border-slate-800">
              <h4 class="font-bold text-indigo-700 dark:text-indigo-400 text-sm">Access Port (พอร์ตปลายทาง)</h4>
              <p class="text-xs text-slate-800 dark:text-slate-300 mt-2">
                ใช้เชื่อมต่อกับอุปกรณ์เครื่องลูกข่าย เช่น PC, IP Phone, Printer โดยพอร์ตนี้จะสามารถ **สังกัดอยู่ได้เพียง VLAN เดียว** เท่านั้น ข้อมูลที่วิ่งเข้าออกจะถูกถอดแท็กเป็นเฟรมแลนธรรมดา
              </p>
            </div>
            <div class="bg-slate-100 dark:bg-slate-900/50 p-4 rounded-lg border border-slate-200 dark:border-slate-800">
              <h4 class="font-bold text-indigo-700 dark:text-indigo-400 text-sm">Trunk Port (พอร์ตเชื่อมโยงสาย)</h4>
              <p class="text-xs text-slate-800 dark:text-slate-300 mt-2">
                ใช้เชื่อมต่อระหว่าง **Switch-to-Switch** หรือ **Switch-to-Router** เพื่อลำเลียงสายสัญญาณข้อมูลของ **หลาย VLAN** ผ่านพอร์ตเชื่อมต่อเพียงช่องทางเดียว โดยมีการติดตราระบุหมายเลขต้นทาง
              </p>
            </div>
          </div>
        </section>

        <section id="sec-8-3" class="border-t border-slate-200 dark:border-slate-700/50 pt-4">
          <h3 class="text-xl font-bold text-violet-600 dark:text-violet-400 mb-2">8.3 มาตรฐาน IEEE 802.1Q (VLAN Tagging)</h3>
          <p class="text-slate-800 dark:text-slate-300">
            เพื่อให้สวิตช์ฝั่งรับรู้ว่าเฟรมที่ส่งมาข้ามสาย Trunk นี้เป็นของแผนกใด มาตรฐาน <strong>IEEE 802.1Q</strong> จึงกำหนดให้ใส่ตราระบุหมายเลข VLAN ID ขนาด 4 ไบต์ เพิ่มเข้าไปที่เฟรมข้อมูล (โดยภายในมีฟิลด์ VLAN ID ขนาด 12 บิต เพื่อระบุเลข VLAN ได้สูงสุด 4094 ค่า) เรียกว่า **VLAN Tag** 
          </p>
          <p class="text-slate-800 dark:text-slate-300 mt-2 text-xs">
            เมื่อเฟรมวิ่งออกจากพอร์ต Access ปลายทาง สวิตช์จะทำการลบ Tag นี้ออกโดยอัตโนมัติ เพื่อไม่ให้เครื่องคอมพิวเตอร์ปลายทางเกิดความสับสนเนื่องจากคอมพิวเตอร์ทั่วไปไม่รู้จักระบบ Tagging
          </p>
        </section>

        <section id="sec-8-4" class="border-t border-slate-200 dark:border-slate-700/50 pt-4">
          <h3 class="text-xl font-bold text-violet-600 dark:text-violet-400 mb-2">8.4 การตั้งค่า VLAN และ Trunk บน Cisco Switch</h3>
          <div class="space-y-4">
            <div>
              <h5 class="text-xs font-bold text-indigo-700 dark:text-indigo-400 uppercase">1. สร้างฐานข้อมูล VLAN และระบุชื่อแผนก:</h5>
              <pre><code>Switch(config)# vlan 10
Switch(config-vlan)# name Accounting
Switch(config-vlan)# exit</code></pre>
            </div>

            <div>
              <h5 class="text-xs font-bold text-indigo-700 dark:text-indigo-400 uppercase">2. ตั้งค่าพอร์ต FastEthernet 0/5 ให้เป็น Access สังกัด VLAN 10:</h5>
              <pre><code>Switch(config)# interface fastethernet 0/5
Switch(config-if)# switchport mode access
Switch(config-if)# switchport access vlan 10
Switch(config-if)# exit</code></pre>
            </div>

            <div>
              <h5 class="text-xs font-bold text-indigo-700 dark:text-indigo-400 uppercase">3. ตั้งค่าพอร์ต GigabitEthernet 1/0/1 ให้เป็น Trunk รับส่งเฉพาะ VLAN 10 และ 20:</h5>
              <pre><code>Switch(config)# interface gigabitethernet 1/0/1
Switch(config-if)# switchport mode trunk
Switch(config-if)# switchport trunk allowed vlan 10,20
Switch(config-if)# exit</code></pre>
            </div>

            <div>
              <h5 class="text-xs font-bold text-indigo-700 dark:text-indigo-400 uppercase">4. ตรวจสอบสถานะการเชื่อมโยง:</h5>
              <pre><code>Switch# show vlan brief            (แสดงตารางจัดสิทธิ์ VLAN)
Switch# show interfaces trunk      (แสดงพอร์ต Trunk ที่เปิดใช้งาน)</code></pre>
            </div>
          </div>
        </section>
      </div>
    `,
    quiz: [
      {
        question: "พอร์ตแลนทางกายภาพที่เปิดรับส่งสัญญาณผ่านหลาย VLAN พร้อมกันเพื่อต่อเชื่อมสวิตช์สองตัวเข้าหากันเรียกว่าอะไร?",
        options: [
          "Access Port",
          "Trunk Port ",
          "Console Port",
          "SVI Port"
        ],
        answer: 1,
        explanation: "Trunk Port ทำหน้าที่ส่งผ่านทราฟฟิกข้อมูลของหลาย VLAN ในท่อเชื่อมต่อหลักสายสัญญาณเส้นเดียว"
      },
      {
        question: "โปรโตคอลมาตรฐานสากลหลักชนิดใดทำหน้าที่ฝังรหัส Tagging บ่งชี้หมายเลข VLAN ID ลงบนเฟรมข้อมูลในระบบสาย Trunk?",
        options: [
          "IEEE 802.3  ",
          "IEEE 802.11 ",
          "IEEE 802.1Q ",
          "IEEE 802.1X "
        ],
        answer: 2,
        explanation: "มาตรฐาน IEEE 802.1Q เป็นโปรโตคอลห่อหุ้ม Tagging ที่ใช้ในการส่งสัญญาณ VLAN ข้ามระหว่างอุปกรณ์เครือข่ายสากล"
      },
      {
        question: "สวิตช์ Cisco รุ่นใหม่แกะกล่อง มีหมายเลข VLAN ตัวใดเป็นตัวหลัก (Default VLAN) ที่ครอบคลุมพอร์ตแลนทางกายภาพทั้งหมดตั้งแต่ต้น?",
        options: [
          "VLAN 1  ",
          "VLAN 10 ",
          "VLAN 100",
          "VLAN 999"
        ],
        answer: 0,
        explanation: "ค่าเริ่มต้นจากโรงงานสำหรับสวิตช์ Cisco พอร์ตอินเตอร์เฟสทั้งหมดจะสังกัดอยู่ภายใน VLAN 1"
      }
    ],
    references: [
      { title: "VLAN and Trunking Configuration Guide - Cisco Systems", url: "https://www.cisco.com/c/en/us/support/docs/lan-switching/vlan/10023-3.html", source: "Cisco Configuration Reference" }
    ],
    visualizationId: "cli-terminal"
  },
  "lesson-9": {
    title: "บทเรียนที่ 9: วิธีการกู้คืนรหัสผ่านและการล้างเครื่องเป็นค่าเริ่มต้นจากโรงงาน (Password Recovery & Factory Reset)",
    subtitle: "กู้คืนสิทธิ์ผู้ดูแลระบบเมื่อลืมรหัสลับ และการล้างพอร์ต/VLAN เพื่อเริ่มคอนฟิกใหม่ตามมาตรฐาน Cisco",
    subtopics: [
      { id: "sec-9-1", title: "9.1 แนวคิดพื้นฐานในการเลี่ยงคอนฟิก (Bypass Startup Config)" },
      { id: "sec-9-2", title: "9.2 กู้รหัสสวิตช์รุ่นเดิม (Catalyst 2960/3560)" },
      { id: "sec-9-3", title: "9.3 กู้รหัสสวิตช์รุ่นใหม่ (Catalyst 9000/IOS-XE)" },
      { id: "sec-9-4", title: "9.4 การรีเซ็ตค่าจากโรงงาน (Factory Reset & Delete vlan.dat)" }
    ],
    content: `
      <div class="space-y-6">
        <section id="sec-9-1">
          <h3 class="text-xl font-bold text-violet-600 dark:text-violet-400 mb-2">9.1 แนวคิดพื้นฐานในการเลี่ยงคอนฟิก (Bypass Startup Config)</h3>
          <p class="text-slate-800 dark:text-slate-300">
            ในการกู้คืนรหัสผ่านของอุปกรณ์ Cisco (เช่น Switch หรือ Router) แนวคิดหลักที่ใช้เหมือนกันทุกรุ่นคือ **"การข้ามขั้นตอนการอ่านไฟล์ค่าคอนฟิกเดิม (Startup Configuration) ขณะเปิดเครื่อง"** เพื่อให้อุปกรณ์เปิดขึ้นมาในสภาพค่าว่างเหมือนแกะกล่องใหม่ ทำให้เราสามารถเข้าสู่โหมด Privileged EXEC ได้โดยไม่ต้องกรอกรหัสผ่านใดๆ จากนั้นจึงดึงไฟล์คอนฟิกเดิมกลับมารัน แก้ไขรหัสผ่านใหม่ แล้วจัดเก็บบันทึกทับค่าเดิม
          </p>
          <div class="bg-amber-50 dark:bg-amber-950/20 p-4 rounded-lg border border-amber-200 dark:border-amber-900/50 mt-3 text-sm">
            <span class="font-bold text-amber-700 dark:text-amber-400 flex items-center gap-1">⚠️ ข้อจำกัดด้านความปลอดภัย:</span>
            <p class="text-xs text-slate-700 dark:text-slate-300 mt-1">
              ผู้ที่จะทำการกู้รหัสผ่านได้จำเป็นต้องต่อสายตรงผ่านพอร์ต <strong>Console Cable</strong> และเข้าถึงทางกายภาพของอุปกรณ์ (Physical Access) เท่านั้น ไม่สามารถดำเนินการผ่านระบบรีโมต SSH หรือ Telnet ได้ เพื่อป้องกันไม่ให้ผู้บุกรุกทางไซเบอร์เข้ามายึดระบบ
            </p>
          </div>
        </section>

        <section id="sec-9-2" class="border-t border-slate-200 dark:border-slate-700 pt-4">
          <h3 class="text-xl font-bold text-violet-600 dark:text-violet-400 mb-2">9.2 กู้รหัสสวิตช์รุ่นเดิม (เช่น Catalyst 2960, 3560)</h3>
          <p class="text-slate-800 dark:text-slate-300">สวิตช์ตระกูล Legacy ของ Cisco จะจัดเก็บรหัสผ่านไว้ในไฟล์ <code>flash:config.text</code> มีขั้นตอนการกู้คืนโดยใช้การควบคุมสวิตช์ผ่านบูตโหลดเดอร์ดังนี้:</p>
          <ol class="list-decimal list-inside space-y-2 text-sm text-slate-750 dark:text-slate-300 mt-3">
            <li>ถอดสายไฟสวิตช์ออกเพื่อปิดเครื่อง</li>
            <li><strong>กดปุ่ม Mode ค้างไว้</strong> บนแผงหน้าเครื่องสวิตช์ จากนั้นเสียบสายไฟกลับเข้าไปเพื่อเปิดเครื่อง</li>
            <li>กดปุ่ม Mode ค้างต่อไปจนกระทั่งไฟ LED ของระบบ (System LED) เปลี่ยนเป็นสีเขียวค้าง แล้วจึงปล่อยปุ่ม Mode คุณจะเห็นหน้าจอพร้อมต์บูตโหลดเดอร์:
              <pre class="mt-1 bg-black text-slate-200 p-3 rounded font-mono text-xs"><code>switch:</code></pre>
            </li>
            <li>สั่งรันระบบเริ่มต้นไฟล์แฟลช:
              <pre class="mt-1 bg-black text-slate-200 p-3 rounded font-mono text-xs"><code>switch: flash_init</code></pre>
            </li>
            <li>สั่งเปลี่ยนชื่อไฟล์คอนฟิกเดิมเพื่อซ่อนไม่ให้สวิตช์ดึงไปทำงานตอนบูต:
              <pre class="mt-1 bg-black text-slate-200 p-3 rounded font-mono text-xs"><code>switch: rename flash:config.text flash:config.text.old</code></pre>
            </li>
            <li>สั่งบูตอุปกรณ์หลักเพื่อเข้าระบบ:
              <pre class="mt-1 bg-black text-slate-200 p-3 rounded font-mono text-xs"><code>switch: boot</code></pre>
            </li>
            <li>เมื่อบูตเสร็จ ระบบจะถามเข้าสู่โหมดตั้งค่าแบบอัตโนมัติ ให้ตอบ <code>no</code></li>
            <li>เข้าโหมดผู้ใช้ระดับสูง (จะไม่มีการถามรหัสผ่านเนื่องจากไม่มีค่าคอนฟิกโหลดเข้ามาทำงาน):
              <pre class="mt-1 bg-black text-slate-200 p-3 rounded font-mono text-xs"><code>Switch> enable
Switch#</code></pre>
            </li>
            <li>เปลี่ยนชื่อไฟล์คอนฟิกเดิมกลับมาเป็นชื่อเดิม:
              <pre class="mt-1 bg-black text-slate-200 p-3 rounded font-mono text-xs"><code>Switch# rename flash:config.text.old flash:config.text</code></pre>
            </li>
            <li>ดึงค่าคอนฟิกเดิมกลับเข้ามาในหน่วยความจำชั่วคราว:
              <pre class="mt-1 bg-black text-slate-200 p-3 rounded font-mono text-xs"><code>Switch# copy flash:config.text system:running-config</code></pre>
              <em class="text-xs text-rose-600 dark:text-rose-450 block mt-1">(หมายเหตุ: ระวังอย่าใช้ copy running startup ในจุดนี้เพราะจะทำค่าว่างทับคอนฟิกเก่า)</em>
            </li>
            <li>เข้าสู่การแก้ไขเพื่อกำหนดรหัสลับตัวใหม่:
              <pre class="mt-1 bg-black text-slate-200 p-3 rounded font-mono text-xs"><code>Switch# configure terminal
Switch(config)# enable secret [รหัสใหม่ของคุณ]
Switch(config)# exit</code></pre>
            </li>
            <li>บันทึกและเสร็จสิ้นขั้นตอน:
              <pre class="mt-1 bg-black text-slate-200 p-3 rounded font-mono text-xs"><code>Switch# copy running-config startup-config</code></pre>
            </li>
          </ol>
        </section>

        <section id="sec-9-3" class="border-t border-slate-200 dark:border-slate-700 pt-4">
          <h3 class="text-xl font-bold text-violet-600 dark:text-violet-400 mb-2">9.3 กู้รหัสสวิตช์รุ่นใหม่ (เช่น Catalyst 9000 Series บนระบบปฏิบัติการ IOS-XE)</h3>
          <p class="text-slate-800 dark:text-slate-300">สวิตช์ Cisco รุ่นใหม่จะบูตผ่านระบบปฏิบัติการ IOS-XE และใช้โหมด ROMMON ในการกู้คืน:</p>
          <ol class="list-decimal list-inside space-y-2 text-sm text-slate-750 dark:text-slate-300 mt-3">
            <li>เชื่อมต่อสาย Console ปิดเครื่องและเปิดเครื่องใหม่</li>
            <li>กดปุ่ม <kbd class="px-1 py-0.5 bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded text-xs">Ctrl+C</kbd> (หรือปุ่ม Break) บนคีย์บอร์ดซ้ำๆ ระหว่างการเปิดเครื่อง (สำหรับสวิตช์บางรุ่น เช่น Catalyst 9300 อาจต้องใช้วิธีกดปุ่ม Mode ค้างไว้ตอนบูตแทน) เพื่อเข้าสู่พรอมต์ ROMMON:
              <pre class="mt-1 bg-black text-slate-200 p-3 rounded font-mono text-xs"><code>switch:</code></pre>
            </li>
            <li>ตั้งค่าให้ระบบข้ามไฟล์ Startup Configuration:
              <pre class="mt-1 bg-black text-slate-200 p-3 rounded font-mono text-xs"><code>switch: SWITCH_IGNORE_STARTUP_CFG=1</code></pre>
            </li>
            <li>ป้อนคำสั่งบูตเพื่อเข้าระบบปฏิบัติการหลัก:
              <pre class="mt-1 bg-black text-slate-200 p-3 rounded font-mono text-xs"><code>switch: boot</code></pre>
            </li>
            <li>พิมพ์ <code>no</code> เมื่อสวิตช์ถามเรื่องการตั้งค่าแบบอัตโนมัติ และเข้าสู่สิทธิ์ผู้ดูแลระบบ:
              <pre class="mt-1 bg-black text-slate-200 p-3 rounded font-mono text-xs"><code>Switch> enable</code></pre>
            </li>
            <li>ดึงค่าคอนฟิกเก่าขึ้นมาแก้ไข:
              <pre class="mt-1 bg-black text-slate-200 p-3 rounded font-mono text-xs"><code>Switch# copy startup-config running-config</code></pre>
            </li>
            <li>เข้าโหมดคอนฟิกและตั้งรหัสผ่านใหม่ให้กับผู้ดูแลระบบ:
              <pre class="mt-1 bg-black text-slate-200 p-3 rounded font-mono text-xs"><code>Switch# configure terminal
Switch(config)# username admin privilege 15 secret [รหัสผ่านใหม่]</code></pre>
            </li>
            <li><strong>(ขั้นตอนสำคัญที่สุด)</strong> ยกเลิกคำสั่งข้าม Startup Config เพื่อรอบหน้าให้เครื่องบูตปกติ:
              <pre class="mt-1 bg-black text-slate-200 p-3 rounded font-mono text-xs"><code>Switch(config)# no system ignore startupconfig switch all</code></pre>
            </li>
            <li>บันทึกคอนฟิกกลับคืน NVRAM:
              <pre class="mt-1 bg-black text-slate-200 p-3 rounded font-mono text-xs"><code>Switch(config)# exit
Switch# copy running-config startup-config</code></pre>
            </li>
          </ol>
        </section>

        <section id="sec-9-4" class="border-t border-slate-200 dark:border-slate-700 pt-4">
          <h3 class="text-xl font-bold text-violet-600 dark:text-violet-400 mb-2">9.4 การรีเซ็ตค่าจากโรงงาน (Factory Reset & Delete vlan.dat)</h3>
          <p class="text-slate-800 dark:text-slate-300">
            ในการล้างเครื่องสวิตช์ Cisco ให้กลับสู่ค่าว่างจากโรงงาน การสั่งลบไฟล์ด้วยคำสั่ง <code>write erase</code> อย่างเดียวนั้น **ไม่เพียงพอ** เนื่องจากตารางข้อมูล VLAN ของสวิตช์จะถูกเก็บแยกไว้ในไฟล์แฟลชชื่อ <code>vlan.dat</code> ต่างหาก
          </p>
          <div class="mt-3">
            <h4 class="font-bold text-sm text-indigo-700 dark:text-indigo-400 mb-2">ขั้นตอนการทำ Factory Reset ที่ถูกต้องสมบูรณ์:</h4>
            <pre class="bg-black text-slate-200 p-4 rounded-lg text-xs font-mono"><code>Switch# write erase                  (ลบไฟล์คอนฟิกูเรชันใน NVRAM ทั้งหมด)
Erasing the nvram filesystem will remove all configuration files! Continue? [confirm]  <--- กด Enter
[OK]

Switch# delete flash:vlan.dat         (ลบไฟล์เก็บรายชื่อ VLAN ทั้งหมด)
Delete filename [vlan.dat]?          <--- กด Enter
Delete flash:vlan.dat? [confirm]     <--- กด Enter

Switch# reload                        (สั่งรีสตาร์ตระบบเพื่อเปิดเครื่องใหม่)
System configuration has been modified. Save? [yes/no]: no  <--- (สำคัญ!) พิมพ์ no ห้ามพิมพ์ yes เด็ดขาด
Proceed with reload? [confirm]       <--- กด Enter</code></pre>
          </div>
        </section>
      </div>
    `,
    quiz: [
      {
        question: "สำหรับการกู้คืนรหัสผ่านสวิตช์ตระกูล Catalyst 9000 (ระบบปฏิบัติการ IOS-XE) ข้อใดคือตัวแปรสภาพแวดล้อมที่ต้องป้อนในโหมด ROMMON?",
        options: [
          "SWITCH_IGNORE_STARTUP_CFG=1",
          "SWITCH_BYPASS_STARTUP_CFG=1",
          "SYSTEM_BYPASS_CONFIG_FILE=1",
          "SWITCH_DISABLE_STARTUP_CFG=1"
        ],
        answer: 0,
        explanation: "ตัวแปรที่ระบุตามสถาปัตยกรรมของ IOS-XE บน Catalyst 9000 คือ SWITCH_IGNORE_STARTUP_CFG=1"
      },
      {
        question: "เหตุใดเมื่อต้องการทำ Factory Reset บนสวิตช์ Cisco การสั่งคำสั่ง write erase อย่างเดียวยังคงมีข้อมูล VLAN ค้างอยู่?",
        options: [
          "เพราะรายชื่อ VLAN ถูกจัดเก็บแยกไว้ในไฟล์ vlan.dat ใน Flash Memory",
          "เพราะข้อมูล VLAN ถูกบันทึกไว้ใน ROM ของสวิตช์แบบถาวร",
          "เพราะต้องใช้คำสั่ง erase startup-config เท่านั้น",
          "เพราะข้อมูล VLAN ถูกแจกแจงมาจากโปรโตคอล VTP เสมอ"
        ],
        answer: 0,
        explanation: "ข้อมูลตารางจัดสรร VLAN จะไม่ถูกบันทึกใน NVRAM แต่บันทึกอยู่ในหน่วยความจำ flash:vlan.dat ทำให้จำเป็นต้องแยกพิมพ์ลบเป็นพิเศษ"
      },
      {
        question: "ในสวิตช์รุ่นเดิม เช่น Catalyst 2960 หลังจากบูตเครื่องโดยข้าม config แล้วทำเสร็จ ให้ copy flash:config.text running-config และตั้ง Enable Secret ใหม่ หากไม่เปลี่ยนชื่อ config.text.old กลับคืน อะไรจะเกิดขึ้น?",
        options: [
          "สวิตช์จะไม่มีการเปลี่ยนแปลงใดเกิดขึ้นเพราะ config.text เก่ายังเป็นชื่อเดิม",
          "สวิตช์จะไม่สามารถเปิดใช้งานพอร์ตแลนทางกายภาพได้",
          "การบูตเครื่องครั้งถัดไปจะไม่พบค่าคอนฟิกใดๆ และขึ้นโหมดเริ่มต้นใหม่เสมอ",
          "ไฟล์ vlan.dat จะถูกทำลายโดยอัตโนมัติ"
        ],
        answer: 2,
        explanation: "หากไม่ทำการเปลี่ยนชื่อไฟล์จาก config.text.old กลับเป็น config.text ในขั้นตอนที่ 9 เมื่อสวิตช์เริ่มระบบใหม่ในอนาคต ระบบจะไม่พบไฟล์ชื่อ config.text และจะมองไม่เห็นคอนฟิกดั้งเดิม ทำให้ต้องเริ่มต้นตั้งค่าใหม่ทั้งหมด"
      }
    ],
    references: [
      { title: "Password Recovery Procedure for Catalyst 9000 Series Switches", url: "https://www.cisco.com/c/en/us/support/docs/switches/catalyst-9000-series-switches/213795-password-recovery-procedure-for-catalys.html", source: "Cisco Systems Support" },
      { title: "Password Recovery Procedure for Legacy Catalyst Switches (2960/3560)", url: "https://www.cisco.com/c/en/us/support/docs/switches/catalyst-2960-series-switches/12040-password-recovery-c2960.html", source: "Cisco Systems Support" }
    ],
    visualizationId: null
  }
};
