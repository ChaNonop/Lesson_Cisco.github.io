# บันทึกการแก้ไขรอบที่ 9: ตรวจสอบความถูกต้องโค้ดและเนื้อหาตามผล Code Review

**วันที่ดำเนินการ:** 2026-07-10  
**สถานะการแก้ไข:** สำเร็จลุล่วง 100% (ผ่านการทดสอบ Visual และ Technical Verification)

---

## 📋 รายการและผลการแก้ไข

ตามผลการตรวจสอบแบบ 2 แกนในรายงาน [0009-code-review-findings.md](file:///C:/Users/My-com/.gemini/antigravity-cli/brain/f353d6da-27a9-4588-86e0-bf12efd407cd/0009-code-review-findings.md) มีการแก้ไขไฟล์ต่าง ๆ ดังนี้:

### 1. การแก้ไขใน `index.html` (Standards & UI)
- **Invalid Tailwind CSS Classes:**
  - แก้ไข `text-slate-650` เป็น `text-slate-600`
  - แก้ไข `dark:border-slate-850` เป็น `dark:border-slate-800`
  - แก้ไข `border-slate-250` เป็น `border-slate-200`
- **Accessibility (ARIA):**
  - เพิ่ม `aria-label="เปิดเมนูหลักสูตร"` ให้กับปุ่มเปิด Sidebar (`#btn-open-sidebar`)
  - เพิ่ม `aria-label="ปิดเมนูหลักสูตร"` ให้กับปุ่มปิด Sidebar (`#btn-close-sidebar`)
  - เพิ่ม `aria-label="ค้นหาบทเรียนและหัวข้อย่อย"` ให้กับช่องค้นหา (`#search-input`)
  - เพิ่ม `aria-hidden="true"` ให้กับแท็ก `<svg>` ของปุ่มเปิด/ปิด/ค้นหา เพื่อไม่ให้ Screen Reader อ่านไอคอนเปล่า ๆ

### 2. การแก้ไขใน `assets/app.js` (JavaScript Logic & Style)
- **Invalid Tailwind CSS Classes:**
  - แก้ไข `text-indigo-650` เป็น `text-indigo-600`
  - แก้ไข `dark:text-slate-450` เป็น `dark:text-slate-400`
  - แก้ไข `text-rose-650` เป็น `text-rose-600`, และ `dark:text-rose-450` เป็น `dark:text-rose-400`
  - แก้ไข `dark:hover:border-slate-750` เป็น `dark:hover:border-slate-700`
  - แก้ไข `text-emerald-650` เป็น `text-emerald-600`
- **Safety Guards & Repeated Switches Refactoring:**
  - แทนที่คำสั่ง `if-else` สำหรับเริ่มต้น visualizer ด้วย **Dispatch Map + Typeof Guard Check** เพื่อป้องกัน ReferenceError หากไฟล์ `visualizer.js` โหลดไม่สำเร็จ
- **Logic Bug (Class Toggle Mismatch):**
  - แก้ไขปุ่มเมนูสลับ Active link จากคลาสที่ไม่มีผล visual `dark:hover:bg-slate-800/40` ให้ตรงกับคลาสที่มีอยู่จริงใน HTML (`hover:bg-slate-50` และ `dark:hover:bg-slate-900/40`)

### 3. การแก้ไขใน `assets/lessons.js` (Technical Content & Text)
- **Invalid Tailwind CSS Classes ในเนื้อหา HTML:**
  - แก้ไข `dark:border-slate-850` เป็น `dark:border-slate-800` (ในตัวอย่างบทเรียนที่ 1)
  - แก้ไขสีพื้นหลังและสีตัวอักษรกล่องแสดงการเดินทางข้อมูล (L1-L7) ในบทเรียนที่ 4 ทั้งหมดจากคลาสโทนสีผิดเพี้ยน (`-250`, `-850`, `-855`) ให้กลับสู่มาตรฐาน Tailwind (`bg-emerald-100`, `bg-indigo-100`, `text-slate-800` ฯลฯ)
  - แก้ไข `dark:border-slate-750` เป็น `dark:border-slate-700` (ในหัวข้อย่อยบทที่ 9)
- **Technical Accuracy (ความถูกต้องทางวิชาการ):**
  - **VLAN Range:** เพิ่มเติมช่วงขยาย (Extended-range) คือ 1006–4094 นอกเหนือจากช่วงปกติ 1–1005 ในบทเรียนที่ 8
  - **PDU of UDP:** แก้ไข PDU ของ L4 ในรูปภาพประกอบและการอธิบายให้ระบุชัดว่าเป็น Segment (สำหรับ TCP) หรือ Datagram (สำหรับ UDP)
  - **ROMMON Entry:** เพิ่มคำอธิบายการกดปุ่ม Break หรือปุ่ม Mode บนสวิตช์บางรุ่นเพื่อความถูกต้องครอบคลุม
  - **Security Terms:** แก้ไขคำศัพท์สับสน "คลื่นแฮช" เป็น "MD5 hash (type 5) หรือแบบ one-way hash function"
- **Thai Language & Typos:**
  - แก้ไขคำผิด `"ชื่อโดเนม"` เป็น `"ชื่อโดเมน"` ในบทเรียนที่ 7
  - แก้ไขคำซ้ำ `"คอมพิวเตอร์คอมพิวเตอร์ปลายทาง"` เป็น `"คอมพิวเตอร์ปลายทาง"` ในบทเรียนที่ 8
  - แก้ไขการอธิบายความปลอดภัยของ UDP: `"ไม่สนใจการรับประกันความปลอดภัยของข้อมูล"` เป็น `"ไม่มีกลไกยืนยันการรับข้อมูลกลับมา (ไม่รับประกันความครบถ้วนของข้อมูล)"`
- **Quiz & Reference Improvements:**
  - อัปเดตคำอธิบาย Quiz บทเรียนที่ 9 ข้อที่ 3 ให้เข้าใจง่ายและสอดคล้องกับเนื้อหาปฏิบัติจริง
  - อัปเดต Reference ของบทเรียนที่ 1 จาก ARP (RFC 826) เป็น IEEE 802.3 Ethernet Standards ให้ตรงบท
  - อัปเดต RFC 2616 (HTTP/1.1) ในบทเรียนที่ 3 เป็น RFC 9110 (HTTP Semantics) ที่เป็นมาตรฐานล่าสุด
  - เปลี่ยนลิงก์ Cisco homepage ท้ายบทเรียนที่ 4 ให้ชี้เฉพาะไปที่บทความการห่อหุ้มข้อมูลจริง

---
*บันทึกความก้าวหน้าโดย Antigravity AI ครูผู้ช่วยเครือข่ายของท่าน*
