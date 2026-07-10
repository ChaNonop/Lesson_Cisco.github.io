// data for Cisco Switch and Networking Lessons
const lessonsData = {
  "lesson-1": {
    title: "บทเรียนที่ 1: สถาปัตยกรรมแบบ Layer และ OSI Model L1-L2",
    subtitle: "ทำความเข้าใจโมเดลมาตรฐาน OSI และระดับชั้นกายภาพ (Physical) กับระดับชั้นเชื่อมต่อข้อมูล (Data Link)",
    content: `
      <div class="space-y-6">
        <section>
          <h3 class="text-xl font-bold text-violet-400 mb-2">ทำไมระบบเครือข่ายต้องแบ่งการทำงานเป็นชั้น (Layered Architecture)?</h3>
          <p class="text-slate-300">
            ลองจินตนาการถึงการส่งพัสดุข้ามประเทศ หากไม่มีการแบ่งแผนกหน้าที่ (คนแพ็คของ, คนกรอกเอกสารศุลกากร, คนขับรถขนส่ง, นักบิน) การทำงานจะสับสนมาก ในระบบเครือข่ายคอมพิวเตอร์ก็เช่นกัน 
            องค์กรมาตรฐานสากล (ISO) จึงพัฒนาโมเดล <strong>OSI (Open Systems Interconnection) Model</strong> ขึ้นมาเป็นกรอบแนวคิดแบบ 7 ระดับชั้น (Layers) เพื่อให้:
          </p>
          <ul class="list-disc list-inside text-slate-300 ml-4 mt-2 space-y-1">
            <li><strong>ง่ายต่อการพัฒนา:</strong> ผู้ผลิตฮาร์ดแวร์พัฒนาสายเคเบิล (Layer 1) โดยไม่ต้องพะวงว่าเว็บบราวเซอร์ (Layer 7) ทำงานอย่างไร</li>
            <li><strong>ง่ายต่อการระบุปัญหา:</strong> สามารถตรวจสอบได้เป็นขั้นตอน เช่น "สายขาดหรือเปล่า (Layer 1)?" หรือ "เลข IP ชนกันไหม (Layer 3)?"</li>
          </ul>
        </section>

        <section class="border-t border-slate-700/50 pt-4">
          <h3 class="text-xl font-bold text-violet-400 mb-2">ระดับชั้นที่ 1: Physical Layer (เลเยอร์กายภาพ)</h3>
          <p class="text-slate-300">
            ทำหน้าที่จัดการกับการส่งข้อมูลดิบในรูปของ <strong>สัญญาณไฟฟ้า แสง หรือคลื่นวิทยุ</strong> ผ่านสื่อกลางทางกายภาพ (Transmission Medium)
          </p>
          <div class="grid grid-cols-1 md:grid-cols-3 gap-4 my-4">
            <div class="bg-deepnavy-light/50 p-4 rounded-lg border border-slate-700/50">
              <h4 class="font-bold text-indigo-400 mb-1">หน่วยข้อมูล (PDU)</h4>
              <p class="text-2xl font-mono text-emerald-400">Bits (บิต 0 และ 1)</p>
            </div>
            <div class="bg-deepnavy-light/50 p-4 rounded-lg border border-slate-700/50">
              <h4 class="font-bold text-indigo-400 mb-1">อุปกรณ์ที่เกี่ยวข้อง</h4>
              <p class="text-slate-300">สาย UTP (สายแลน), สาย Fiber Optic, Hub, Repeater, คลื่น Wi-Fi</p>
            </div>
            <div class="bg-deepnavy-light/50 p-4 rounded-lg border border-slate-700/50">
              <h4 class="font-bold text-indigo-400 mb-1">หน้าที่หลัก</h4>
              <p class="text-slate-300">กำหนดระดับแรงดันไฟฟ้า, ชนิดของหัวเชื่อมต่อ (เช่น RJ-45), และความเร็วในการรับส่ง (Bit Rate)</p>
            </div>
          </div>
        </section>

        <section class="border-t border-slate-700/50 pt-4">
          <h3 class="text-xl font-bold text-violet-400 mb-2">ระดับชั้นที่ 2: Data Link Layer (เลเยอร์เชื่อมต่อข้อมูล)</h3>
          <p class="text-slate-300">
            ทำหน้าที่ห่อหุ้มบิตข้อมูลจาก Layer 1 ให้เป็นกลุ่มก้อนเพื่อส่งต่อไปยังอุปกรณ์ถัดไปที่อยู่ในเครือข่ายเดียวกัน (Local Network) และรับผิดชอบเรื่อง <strong>การระบุที่อยู่ทางกายภาพ (Physical Address)</strong>
          </p>
          <div class="grid grid-cols-1 md:grid-cols-3 gap-4 my-4">
            <div class="bg-deepnavy-light/50 p-4 rounded-lg border border-slate-700/50">
              <h4 class="font-bold text-indigo-400 mb-1">หน่วยข้อมูล (PDU)</h4>
              <p class="text-2xl font-mono text-emerald-400">Frame (เฟรม)</p>
            </div>
            <div class="bg-deepnavy-light/50 p-4 rounded-lg border border-slate-700/50">
              <h4 class="font-bold text-indigo-400 mb-1">อุปกรณ์ที่เกี่ยวข้อง</h4>
              <p class="text-slate-300">Network Switch, การ์ดแลน (NIC), Bridge</p>
            </div>
            <div class="bg-deepnavy-light/50 p-4 rounded-lg border border-slate-700/50">
              <h4 class="font-bold text-indigo-400 mb-1">หน้าที่หลัก</h4>
              <p class="text-slate-300">การกำหนดที่อยู่ MAC Address, การควบคุมความคับคั่ง (Flow Control), และการตรวจสอบข้อผิดพลาด (Error Detection) ด้วยค่า CRC</p>
            </div>
          </div>
        </section>

        <section class="border-t border-slate-700/50 pt-4">
          <h3 class="text-xl font-bold text-violet-400 mb-2">ตัวอย่างการทำงานจริง: การทำงานของ Switch ใน Layer 2</h3>
          <div class="bg-deepnavy-light/30 p-4 rounded-lg border border-slate-700/50">
            <p class="text-slate-300">
              เมื่อคุณเชื่อมต่อคอมพิวเตอร์เข้ากับ <strong>Cisco Switch</strong> อุปกรณ์ Switch จะทำหน้าที่บันทึก <strong>MAC Address</strong> ของคอมพิวเตอร์แต่ละเครื่องลงในตารางที่เรียกว่า <strong>MAC Address Table (หรือ CAM Table)</strong>
            </p>
            <p class="text-slate-300 mt-2">
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
        explanation: "Switch ทำงานใน Layer 2 (Data Link Layer) เนื่องจากใช้ MAC Address ในการส่งต่อข้อมูล (Frame)"
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
    visualizationId: "osi-explorer"
  },
  "lesson-2": {
    title: "บทเรียนที่ 2: เจาะลึก L3 & L4 - IP Routing และ TCP vs UDP",
    subtitle: "ทำความเข้าใจกับเลเยอร์ระบบเครือข่าย (Network) และระดับชั้นการขนส่ง (Transport)",
    content: `
      <div class="space-y-6">
        <section>
          <h3 class="text-xl font-bold text-violet-400 mb-2">ระดับชั้นที่ 3: Network Layer (เลเยอร์เครือข่าย)</h3>
          <p class="text-slate-300">
            เลเยอร์นี้ทำหน้าที่ <strong>นำทางและค้นหาเส้นทางที่ดีที่สุด (Routing)</strong> เพื่อส่งข้อมูลข้ามเครือข่ายต่างถิ่น (WAN/Internet) โดยไม่จำกัดแค่เครือข่ายท้องถิ่นเหมือน Layer 2
          </p>
          <div class="grid grid-cols-1 md:grid-cols-3 gap-4 my-4">
            <div class="bg-deepnavy-light/50 p-4 rounded-lg border border-slate-700/50">
              <h4 class="font-bold text-indigo-400 mb-1">หน่วยข้อมูล (PDU)</h4>
              <p class="text-2xl font-mono text-emerald-400">Packet (แพ็กเก็ต)</p>
            </div>
            <div class="bg-deepnavy-light/50 p-4 rounded-lg border border-slate-700/50">
              <h4 class="font-bold text-indigo-400 mb-1">อุปกรณ์ที่เกี่ยวข้อง</h4>
              <p class="text-slate-300">Router, Layer 3 Switch</p>
            </div>
            <div class="bg-deepnavy-light/50 p-4 rounded-lg border border-slate-700/50">
              <h4 class="font-bold text-indigo-400 mb-1">หน้าที่หลัก</h4>
              <p class="text-slate-300">การกำหนดที่อยู่เชิงตรรกะ (IP Address) และเลือกเส้นทางที่ดีที่สุดไปยังปลายทาง (Routing)</p>
            </div>
          </div>
          <p class="text-slate-300 mt-2">
            <strong>ความแตกต่างระหว่างที่อยู่:</strong> MAC Address (L2) เปรียบเหมือน 'เลขบัตรประชาชน' ที่ติดตัวมาแต่เกิด เปลี่ยนแปลงไม่ได้ ส่วน IP Address (L3) เปรียบเหมือน 'ที่อยู่ปัจจุบัน' ซึ่งเปลี่ยนตามสถานที่ที่คุณไปอยู่จริง
          </p>
        </section>

        <section class="border-t border-slate-700/50 pt-4">
          <h3 class="text-xl font-bold text-violet-400 mb-2">ระดับชั้นที่ 4: Transport Layer (เลเยอร์ขนส่ง)</h3>
          <p class="text-slate-300">
            รับผิดชอบการ <strong>ลำเลียงข้อมูลต้นทางถึงปลายทางอย่างถูกต้อง (End-to-End Delivery)</strong> ควบคุมการส่ง การรับ และจัดการพอร์ตบริการต่าง ๆ (เช่น พอร์ต 80 สำหรับ HTTP, 443 สำหรับ HTTPS) เพื่อแยกแยะว่าข้อมูลนี้เป็นของแอปพลิเคชันใด
          </p>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4 my-4">
            <div class="bg-deepnavy-light/50 p-4 rounded-lg border border-slate-700/50">
              <h4 class="font-bold text-emerald-400 mb-1">TCP (Transmission Control Protocol)</h4>
              <ul class="list-disc list-inside text-slate-300 space-y-1 mt-2">
                <li><strong>เน้นความน่าเชื่อถือสูง:</strong> มีการยืนยันการรับส่ง (Acknowledgment)</li>
                <li><strong>ต้องสร้างการเชื่อมต่อก่อนส่ง:</strong> (3-Way Handshake)</li>
                <li>ช้ากว่าเพราะมีกลไกตรวจสอบและเรียงลำดับใหม่</li>
                <li>ใช้งานใน: เว็บเบราว์เซอร์ (HTTP/HTTPS), อีเมล, โอนไฟล์ (FTP)</li>
              </ul>
            </div>
            <div class="bg-deepnavy-light/50 p-4 rounded-lg border border-slate-700/50">
              <h4 class="font-bold text-amber-400 mb-1">UDP (User Datagram Protocol)</h4>
              <ul class="list-disc list-inside text-slate-300 space-y-1 mt-2">
                <li><strong>เน้นความเร็วสูงสุด:</strong> ไม่สนใจการรับประกันความปลอดภัยของข้อมูล</li>
                <li><strong>ไม่ต้องสร้างการเชื่อมต่อก่อน:</strong> (Connectionless)</li>
                <li>ข้อมูลอาจสูญหายหรือสลับลำดับกันได้</li>
                <li>ใช้งานใน: ไลฟ์สตรีมมิ่ง, เกมออนไลน์, ระบบโทรศัพท์ VoIP, DNS</li>
              </ul>
            </div>
          </div>
        </section>

        <section class="border-t border-slate-700/50 pt-4">
          <h3 class="text-xl font-bold text-violet-400 mb-2">การเริ่มเชื่อมต่อด้วย TCP 3-Way Handshake</h3>
          <p class="text-slate-300">
            ก่อนที่จะเริ่มส่งข้อมูลผ่านโปรโตคอล TCP ตัวส่งและตัวรับต้องทำข้อตกลงกัน 3 ขั้นตอนดังนี้ เพื่อเตรียมพร้อมพื้นที่บัฟเฟอร์ในแรมและการนับลำดับหมายเลขข้อมูล (Sequence Number):
          </p>
          <ol class="list-decimal list-inside text-slate-300 mt-2 space-y-1 ml-4">
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
    visualizationId: "tcp-handshake"
  },
  "lesson-3": {
    title: "บทเรียนที่ 3: ระดับชั้นบนของ OSI L5-L7 และโปรโตคอลสำคัญ",
    subtitle: "เรียนรู้เรื่อง Session, Presentation, Application Layer และโปรโตคอลสำคัญในชีวิตประจำวัน",
    content: `
      <div class="space-y-6">
        <section>
          <h3 class="text-xl font-bold text-violet-400 mb-2">บทนำสู่กลุ่มเลเยอร์ระดับบน (Upper Layers)</h3>
          <p class="text-slate-300">
            ขณะที่เลเยอร์ระดับล่าง (L1-L4) มุ่งเน้นการขนส่งข้อมูลดิบข้ามเครือข่ายอย่างน่าเชื่อถือ เลเยอร์ระดับบน 3 ชั้นสุดท้าย <strong>(L5-L7)</strong> จะมุ่งเน้นการทำงานร่วมกับ <strong>แอปพลิเคชันและการแสดงผลของผู้ใช้ปลายทาง</strong> โดยตรง
          </p>
        </section>

        <section class="border-t border-slate-700/50 pt-4">
          <h3 class="text-xl font-bold text-violet-400 mb-2">ระดับชั้นที่ 5: Session Layer (เลเยอร์เซสชัน)</h3>
          <p class="text-slate-300">
            ทำหน้าที่ <strong>เปิดการเชื่อมต่อ ควบคุม และปิดเซสชัน (Dialogue Control)</strong> ระหว่างแอปพลิเคชันของคอมพิวเตอร์ต้นทางและปลายทาง เปรียบเสมือนโอเปอเรเตอร์โทรศัพท์ที่ช่วยต่อสาย คอยดูแลให้สายไม่หลุด และวางสายเมื่อคุยเสร็จ
          </p>
          <ul class="list-disc list-inside text-slate-300 ml-4 mt-2 space-y-1">
            <li><strong>การควบคุมทิศทาง:</strong> กำหนดการส่งข้อมูลเป็นแบบทิศทางเดียว (Simplex), สลับกันส่ง (Half-Duplex) หรือส่งพร้อมกัน (Full-Duplex)</li>
            <li><strong>ตัวอย่างโปรโตคอล:</strong> NetBIOS, RPC (Remote Procedure Call), SQL</li>
          </ul>
        </section>

        <section class="border-t border-slate-700/50 pt-4">
          <h3 class="text-xl font-bold text-violet-400 mb-2">ระดับชั้นที่ 6: Presentation Layer (เลเยอร์นำเสนอข้อมูล)</h3>
          <p class="text-slate-300">
            ทำหน้าที่เป็น <strong>"ล่ามแปลภาษา"</strong> แปลงรูปแบบข้อมูล (Syntax) ให้ระบบรับส่งที่มีสถาปัตยกรรมต่างกันเข้าใจตรงกัน และดูแลความปลอดภัยของข้อมูล
          </p>
          <div class="grid grid-cols-1 md:grid-cols-3 gap-4 my-4">
            <div class="bg-deepnavy-light/50 p-4 rounded-lg border border-slate-700/50">
              <h4 class="font-bold text-indigo-400 mb-1">การเข้ารหัสลับ (Encryption)</h4>
              <p class="text-sm text-slate-300">เปลี่ยนข้อมูลให้อยู่ในรูปที่อ่านไม่ออกเพื่อความปลอดภัย (เช่น SSL/TLS สำหรับ HTTPS)</p>
            </div>
            <div class="bg-deepnavy-light/50 p-4 rounded-lg border border-slate-700/50">
              <h4 class="font-bold text-indigo-400 mb-1">การบีบอัดข้อมูล (Compression)</h4>
              <p class="text-sm text-slate-300">ลดขนาดข้อมูลเพื่อช่วยให้ประหยัดแบนด์วิธในการรับส่งผ่านระบบเครือข่าย</p>
            </div>
            <div class="bg-deepnavy-light/50 p-4 rounded-lg border border-slate-700/50">
              <h4 class="font-bold text-indigo-400 mb-1">การแปลงฟอร์แมต</h4>
              <p class="text-sm text-slate-300">จัดรูปแบบไฟล์ชนิดต่าง ๆ เช่น แปลงรูปภาพเป็น JPEG/PNG หรือแปลงตัวหนังสือเป็น ASCII/UTF-8</p>
            </div>
          </div>
        </section>

        <section class="border-t border-slate-700/50 pt-4">
          <h3 class="text-xl font-bold text-violet-400 mb-2">ระดับชั้นที่ 7: Application Layer (เลเยอร์แอปพลิเคชัน)</h3>
          <p class="text-slate-300">
            เลเยอร์บนสุดที่เป็นส่วนเชื่อมต่อระหว่าง <strong>ซอฟต์แวร์แอปพลิเคชันของผู้ใช้</strong> กับระบบเครือข่าย โดยระบุคู่ค้า ตรวจสอบทรัพยากรที่พร้อมใช้งาน และประสานการสื่อสาร
          </p>
          <p class="text-slate-300 mt-2"><strong>โปรโตคอลสำคัญในชีวิตประจำวันที่คุณต้องรู้:</strong></p>
          <div class="space-y-3 mt-3">
            <div class="flex items-start gap-3 bg-deepnavy-light/30 p-3 rounded-lg border border-slate-800">
              <span class="px-2 py-0.5 rounded bg-violet-950 text-violet-400 font-mono text-xs border border-violet-850">HTTP / HTTPS</span>
              <p class="text-xs text-slate-300">โปรโตคอลสำหรับเรียกดูหน้าเว็บ (HTTPS จะมีเข้ารหัสลับข้อมูลใน L6 ผ่าน SSL/TLS)</p>
            </div>
            <div class="flex items-start gap-3 bg-deepnavy-light/30 p-3 rounded-lg border border-slate-800">
              <span class="px-2 py-0.5 rounded bg-violet-950 text-violet-400 font-mono text-xs border border-violet-850">DNS (Domain Name System)</span>
              <p class="text-xs text-slate-300">สมุดโทรศัพท์อินเทอร์เน็ต ทำหน้าที่แปลงชื่อเว็บ (เช่น google.com) เป็น IP Address ของเซิร์ฟเวอร์</p>
            </div>
            <div class="flex items-start gap-3 bg-deepnavy-light/30 p-3 rounded-lg border border-slate-800">
              <span class="px-2 py-0.5 rounded bg-violet-950 text-violet-400 font-mono text-xs border border-violet-850">DHCP (Dynamic Host Configuration Protocol)</span>
              <p class="text-xs text-slate-300">ระบบแจกจ่ายหมายเลข IP และข้อมูลเน็ตเวิร์กพื้นฐานให้เครื่องลูกข่ายโดยอัตโนมัติเมื่อเข้ามาเชื่อมต่อ</p>
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
          "กำหนดที่อยู่ทางกายภาพอุปกรณ์"
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
    visualizationId: null
  },
  "lesson-4": {
    title: "บทเรียนที่ 4: การเดินทางและการแปลงร่างของข้อมูล (Encapsulation Process)",
    subtitle: "เจาะลึกกลไกการไหลของข้อมูลลงระดับล่าง (Encapsulation) และขึ้นระดับบน (Decapsulation)",
    content: `
      <div class="space-y-6">
        <section>
          <h3 class="text-xl font-bold text-violet-400 mb-2">การแปลงร่างของข้อมูลในการรับส่งคืออะไร?</h3>
          <p class="text-slate-300">
            ในการส่งข้อมูลผ่านเครือข่าย ข้อมูลที่ผู้ใช้สร้างขึ้นไม่สามารถถูกโยนออกไปดื้อ ๆ ได้ มันจะต้องผ่านกระบวนการห่อซองจดหมายซ้อนกันในแต่ละเลเยอร์ เรียกว่า <strong>Encapsulation (การห่อหุ้มข้อมูล)</strong> ในฝั่งผู้ส่ง และกระบวนการแกะออกฝั่งผู้รับ เรียกว่า <strong>Decapsulation (การถอดซองข้อมูล)</strong>
          </p>
        </section>

        <section class="border-t border-slate-700/50 pt-4">
          <h3 class="text-xl font-bold text-violet-400 mb-2">ขั้นตอนการส่ง: Encapsulation (จาก L7 ลงสู่ L1)</h3>
          <p class="text-slate-300">ข้อมูลจะเดินทางลงมาทีละเลเยอร์ โดยแต่ละเลเยอร์จะเติมข้อมูลควบคุมของตัวเองลงในส่วนหัว (Header):</p>
          <div class="space-y-3 mt-3">
            <div class="flex items-start gap-3 bg-deepnavy-light/40 p-3 rounded-lg border border-slate-800">
              <span class="px-2 py-0.5 rounded bg-emerald-950 text-emerald-400 font-mono text-xs border border-emerald-900">L7-L5 (Data)</span>
              <p class="text-xs text-slate-300">ผู้ใช้ส่งข้อมูล เช่น "สวัสดี" (จัดในรูป Data)</p>
            </div>
            <div class="flex items-start gap-3 bg-deepnavy-light/40 p-3 rounded-lg border border-slate-800">
              <span class="px-2 py-0.5 rounded bg-indigo-950 text-indigo-400 font-mono text-xs border border-indigo-900">L4 (Segment)</span>
              <p class="text-xs text-slate-300">เติม <strong>TCP/UDP Header</strong> (ใส่พอร์ตต้นทาง/ปลายทาง) ได้หน่วยข้อมูลเรียกว่า <strong>Segment</strong></p>
            </div>
            <div class="flex items-start gap-3 bg-deepnavy-light/40 p-3 rounded-lg border border-slate-800">
              <span class="px-2 py-0.5 rounded bg-violet-950 text-violet-400 font-mono text-xs border border-violet-900">L3 (Packet)</span>
              <p class="text-xs text-slate-300">เติม <strong>IP Header</strong> (ใส่ IP ต้นทาง/ปลายทาง) ได้หน่วยข้อมูลเรียกว่า <strong>Packet</strong></p>
            </div>
            <div class="flex items-start gap-3 bg-deepnavy-light/40 p-3 rounded-lg border border-slate-800">
              <span class="px-2 py-0.5 rounded bg-purple-950 text-purple-400 font-mono text-xs border border-purple-900">L2 (Frame)</span>
              <p class="text-xs text-slate-300">เติม <strong>MAC Header</strong> (MAC ต้นทาง/ปลายทาง) และห้อยท้ายด้วย FCS (Trailer ตรวจหา Error) ได้หน่วยข้อมูลเรียกว่า <strong>Frame</strong></p>
            </div>
            <div class="flex items-start gap-3 bg-deepnavy-light/40 p-3 rounded-lg border border-slate-800">
              <span class="px-2 py-0.5 rounded bg-pink-950 text-pink-400 font-mono text-xs border border-pink-900">L1 (Bits)</span>
              <p class="text-xs text-slate-300">แปลงข้อมูลเฟรมเป็นระดับแรงดันไฟฟ้าหรือคลื่นแสง ส่งสัญญาณออกไปในรูป <strong>Bits (0 และ 1)</strong></p>
            </div>
          </div>
        </section>

        <section class="border-t border-slate-700/50 pt-4">
          <h3 class="text-xl font-bold text-violet-400 mb-2">ขั้นตอนการรับ: Decapsulation (จาก L1 ขึ้นสู่ L7)</h3>
          <p class="text-slate-300">
            เมื่อข้อมูลเดินทางไปถึงผู้รับ อุปกรณ์ปลายทางจะทำกระบวนการตรงกันข้าม โดยจะ <strong>"แกะหัวข้อมูล (Header) ออกทีละเลเยอร์"</strong> จาก L1 ขึ้นไป L7:
          </p>
          <p class="text-slate-300 mt-2">
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
    visualizationId: "encap-decap-sim"
  },
  "lesson-5": {
    title: "บทเรียนที่ 5: ก้าวแรกสู่ Cisco IOS CLI และการใช้โหมดต่าง ๆ",
    subtitle: "เรียนรู้การเชื่อมต่อสาย Console และทำความเข้าใจสิทธิ์ระดับต่าง ๆ บนอุปกรณ์ผ่าน CLI",
    content: `
      <div class="space-y-6">
        <section>
          <h3 class="text-xl font-bold text-violet-400 mb-2">การเข้าถึงสวิตช์ Cisco (How to Connect)</h3>
          <p class="text-slate-300">
            เมื่อคุณแกะกล่องสวิตช์ Cisco ใหม่เอี่ยม ตัวเครื่องจะไม่มีหน้าจอและปุ่มกดใด ๆ คุณต้องเชื่อมต่อจากเครื่องคอมพิวเตอร์ผ่านพอร์ต <strong>Console Port</strong> (พอร์ต RJ-45 สีฟ้า หรือ USB-Mini ในรุ่นใหม่) โดยใช้สาย <strong>Console Cable</strong>
          </p>
          <p class="text-slate-300 mt-2">
            หลังจากนั้นเปิดโปรแกรมจำลองหน้าจอ Terminal (เช่น PuTTY, SecureCRT) ตั้งค่าความเร็วการเชื่อมต่อเป็น <strong>9600 Baud, 8 Data Bits, No Parity, 1 Stop Bit</strong> เพื่อเริ่มป้อนคำสั่งผ่าน CLI
          </p>
        </section>

        <section class="border-t border-slate-700/50 pt-4">
          <h3 class="text-xl font-bold text-violet-400 mb-2">โหมดการทำงานของ Cisco IOS CLI</h3>
          <p class="text-slate-300">เพื่อความปลอดภัย Cisco ได้แบ่งระดับสิทธิ์ของผู้ใช้งานออกเป็นโหมดหลัก ๆ ดังนี้:</p>
          
          <div class="space-y-4 mt-3">
            <div class="bg-deepnavy-light/40 p-4 rounded-lg border border-slate-800">
              <h4 class="font-bold text-indigo-400 mb-1">1. User EXEC Mode (โหมดผู้ใช้ทั่วไป)</h4>
              <p class="text-xs text-slate-400 font-mono mb-2">สัญลักษณ์หน้าจอ: Switch></p>
              <p class="text-xs text-slate-300">ทำได้เฉพาะการตรวจสอบขั้นพื้นฐานทั่วไป เช่น การเช็กสถานะพอร์ตเบื้องต้น หรือการ Ping เพื่อเช็กเน็ตเวิร์ก ไม่สามารถปรับแต่งแก้ไขค่าใด ๆ ได้</p>
              <p class="text-xs text-slate-300 mt-1"><strong>คำสั่งสำหรับสลับไปยังโหมดถัดไป:</strong> <code>enable</code></p>
            </div>

            <div class="bg-deepnavy-light/40 p-4 rounded-lg border border-slate-800">
              <h4 class="font-bold text-indigo-400 mb-1">2. Privileged EXEC Mode (โหมดผู้ใช้งานระดับสูง)</h4>
              <p class="text-xs text-slate-400 font-mono mb-2">สัญลักษณ์หน้าจอ: Switch#</p>
              <p class="text-xs text-slate-300">เป็นระดับผู้ควบคุมระบบ (Admin) สามารถรันคำสั่งตรวจสอบสถานะของสวิตช์อย่างละเอียด (เช่น <code>show running-config</code>) ลบระบบ และบันทึกค่าได้</p>
              <p class="text-xs text-slate-300 mt-1"><strong>คำสั่งสำหรับสลับไปยังโหมดตั้งค่าหลัก:</strong> <code>configure terminal</code></p>
            </div>

            <div class="bg-deepnavy-light/40 p-4 rounded-lg border border-slate-800">
              <h4 class="font-bold text-indigo-400 mb-1">3. Global Configuration Mode (โหมดตั้งค่าหลัก)</h4>
              <p class="text-xs text-slate-400 font-mono mb-2">สัญลักษณ์หน้าจอ: Switch(config)#</p>
              <p class="text-xs text-slate-300">ใช้สำหรับปรับแต่งการทำงานหลัก ๆ ของระบบ เช่น ตั้งชื่อเครื่อง ตั้งรหัสผ่านหลัก และใช้เป็นทางผ่านไปเปิดโหมดกำหนดค่าย่อยต่าง ๆ</p>
              <p class="text-xs text-slate-300 mt-1"><strong>คำสั่งย่อยยอดนิยม:</strong> <code>interface [ชื่อพอร์ต]</code> (ไปตั้งพอร์ต), <code>line vty 0 15</code> (ไปตั้ง SSH)</p>
            </div>
          </div>
        </section>

        <section class="border-t border-slate-700/50 pt-4">
          <h3 class="text-xl font-bold text-violet-400 mb-2">คีย์ลัดช่วยชีวิตในการป้อนคำสั่ง</h3>
          <p class="text-slate-300">ระบบ Cisco CLI มีกลไกการป้อนข้อมูลอัจฉริยะที่ช่วยคุณทำงานได้เร็วขึ้น:</p>
          <ul class="list-disc list-inside text-slate-300 ml-4 mt-2 space-y-1">
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
    visualizationId: "cli-terminal"
  },
  "lesson-6": {
    title: "บทเรียนที่ 6: การตั้งค่าพารามิเตอร์พื้นฐานและความปลอดภัยสวิตช์",
    subtitle: "เจาะลึกการกำหนด Hostname, เข้ารหัสผ่าน และเก็บรักษาสถานะไฟล์คอนฟิก",
    content: `
      <div class="space-y-6">
        <section>
          <h3 class="text-xl font-bold text-violet-400 mb-2">โครงสร้างการเก็บข้อมูลการตั้งค่า (RAM vs NVRAM)</h3>
          <p class="text-slate-300">
            ในการตั้งค่าอุปกรณ์ Cisco จะแบ่งพื้นที่เก็บค่าการตั้งค่าหลักออกเป็น 2 ส่วนสำคัญคือ:
          </p>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4 my-4">
            <div class="bg-deepnavy-light/50 p-4 rounded-lg border border-slate-700/50">
              <h4 class="font-bold text-amber-400 mb-1">Running Config (ทำงานอยู่)</h4>
              <p class="text-xs text-slate-300 mt-1">เก็บอยู่ในหน่วยความจำชั่วคราว (RAM) ทุกคำสั่งที่พิมพ์จะเกิดผลทันทีที่ป้อน แต่ถ้าปิดเครื่องหรือสวิตช์ไฟดับ ข้อมูลนี้จะหายไปทั้งหมด</p>
            </div>
            <div class="bg-deepnavy-light/50 p-4 rounded-lg border border-slate-700/50">
              <h4 class="font-bold text-emerald-400 mb-1">Startup Config (เปิดเครื่องใหม่)</h4>
              <p class="text-xs text-slate-300 mt-1">เก็บอยู่ในหน่วยความจำถาวร (NVRAM) เป็นชุดคำสั่งที่สวิตช์จะนำขึ้นมาทำตามทุกครั้งเมื่อเปิดเครื่องขึ้นมาใหม่ หากไม่ทำการเซฟ ค่าที่แก้ไขบน RAM จะไม่บันทึกลงตัวนี้</p>
            </div>
          </div>
          <p class="text-slate-300 mt-2 font-semibold text-sm">
            💡 คำสั่งบันทึกการทำงาน: <code>copy running-config startup-config</code> หรือย่อว่า <code>write memory</code>
          </p>
        </section>

        <section class="border-t border-slate-700/50 pt-4">
          <h3 class="text-xl font-bold text-violet-400 mb-2">คำสั่งตั้งค่าพื้นฐานที่จำเป็นบนสวิตช์</h3>
          <p class="text-slate-300">เมื่อติดตั้งสวิตช์ใหม่ ควรตั้งค่าพารามิเตอร์เบื้องต้นเหล่านี้เป็นลำดับแรก:</p>
          
          <div class="space-y-4 mt-3">
            <div>
              <h5 class="text-xs font-bold text-indigo-400 uppercase mb-1">1. ตั้งชื่อเครื่อง (Hostname) เพื่อการแยกแยะ:</h5>
              <pre><code>Switch(config)# hostname SW-Dept-01</code></pre>
            </div>

            <div>
              <h5 class="text-xs font-bold text-indigo-400 uppercase mb-1">2. ตั้งรหัสผ่านสิทธิ์ผู้ดูแลระบบแบบปลอดภัยสูง (Enable Secret):</h5>
              <pre><code>SW-Dept-01(config)# enable secret P@ssw0rd999</code></pre>
              <p class="text-xs text-slate-400 mt-1"><em>หลีกเลี่ยงการใช้ <code>enable password</code> เพราะข้อมูลจะเก็บเป็นตัวหนังสือธรรมดา (Plain Text) ซึ่งไม่ปลอดภัย</em></p>
            </div>

            <div>
              <h5 class="text-xs font-bold text-indigo-400 uppercase mb-1">3. เข้ารหัสลับรหัสผ่านอื่น ๆ ทั้งระบบ:</h5>
              <pre><code>SW-Dept-01(config)# service password-encryption</code></pre>
              <p class="text-xs text-slate-400 mt-1">คำสั่งนี้ช่วยป้องกันไม่ให้บุคคลที่เข้ามาดูหน้าจอ <code>show run</code> แอบมองเห็นรหัสผ่านทั่วไป เช่น รหัสผ่าน Console หรือรหัสผ่าน Telnet</p>
            </div>

            <div>
              <h5 class="text-xs font-bold text-indigo-400 uppercase mb-1">4. ตั้งค่าแบนเนอร์แสดงคำเตือน (Banner MOTD):</h5>
              <pre><code>SW-Dept-01(config)# banner motd # Unauthorized access is strictly prohibited #</code></pre>
              <p class="text-xs text-slate-400 mt-1">แบนเนอร์จะแสดงข้อความแจ้งเตือนทางกฎหมายทุกครั้งที่มีผู้พยายามล็อกอินเข้ามาสู่อุปกรณ์</p>
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
        explanation: "enable secret จะทำการเข้ารหัสลับรหัสผ่านแบบคลื่นแฮชที่ถอดคืนไม่ได้ทันทีเพื่อความปลอดภัย ในขณะที่ enable password จะบันทึกเป็น plaintext"
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
    visualizationId: "cli-terminal"
  },
  "lesson-7": {
    title: "บทเรียนที่ 7: การตั้งค่า IP Management และความปลอดภัยระยะไกล SSH",
    subtitle: "เปิดพอร์ตเสมือนเพื่อให้ผู้ดูแลระบบล็อกอินเข้ามาแก้ไขสวิตช์จากระยะไกลแทนการเดินไปเสียบสายคอนโซล",
    content: `
      <div class="text-center py-12">
        <svg class="mx-auto h-16 w-16 text-indigo-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 11-6 0 3 3 0 016 0z"/>
        </svg>
        <h3 class="mt-4 text-lg font-semibold text-slate-200">บทเรียนรอคิวเปิดตัว (Phase 4)</h3>
        <p class="mt-2 text-slate-400 text-sm max-w-md mx-auto">
          คำสั่งเกี่ยวกับ SVI Interface VLAN 1, default-gateway, domain-name และ crypto key generate
        </p>
      </div>
    `,
    quiz: [],
    visualizationId: null
  },
  "lesson-8": {
    title: "บทเรียนที่ 8: การจัดการเครือข่ายด้วย VLAN และการเชื่อมต่อ Trunk",
    subtitle: "แบ่งสวิตช์ตัวเดียวให้เหมือนมีหลายเครือข่าย และส่งข้อมูลข้ามพอร์ตลิงก์แลนด้วยสายเส้นเดียว",
    content: `
      <div class="text-center py-12">
        <svg class="mx-auto h-16 w-16 text-indigo-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"/>
        </svg>
        <h3 class="mt-4 text-lg font-semibold text-slate-200">บทเรียนรอคิวเปิดตัว (Phase 4)</h3>
        <p class="mt-2 text-slate-400 text-sm max-w-md mx-auto">
          เรียนรู้โหมด Access, โหมด Trunk, การกำหนด VLAN ID และการรันพอร์ต 802.1Q Encapsulation
        </p>
      </div>
    `,
    quiz: [],
    visualizationId: null
  },
  "lesson-9": {
    title: "บทเรียนที่ 9: วิธีการกู้คืนรหัสผ่านสวิตช์และการล้างเครื่องค่าโรงงาน",
    subtitle: "กู้ชีวิตสวิตช์เมื่อไม่มีใครจำรหัสผ่านผู้ดูแลระบบได้ตามมาตรฐาน Cisco",
    content: `
      <div class="text-center py-12">
        <svg class="mx-auto h-16 w-16 text-indigo-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 1121.21 6H16"/>
        </svg>
        <h3 class="mt-4 text-lg font-semibold text-slate-200">บทเรียนรอคิวเปิดตัว (Phase 5)</h3>
        <p class="mt-2 text-slate-400 text-sm max-w-md mx-auto">
          คำสั่งบูตผ่าน ROMMON, การตั้งข้ามไฟล์คอนฟิก, การเซฟข้อมูล และกระบวนการล้างเครื่องล้าง vlan.dat
        </p>
      </div>
    `,
    quiz: [],
    visualizationId: null
  }
};
