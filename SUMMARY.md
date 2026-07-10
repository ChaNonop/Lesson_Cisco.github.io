# สรุปผลงานและเนื้อหาหลักสูตรการตั้งค่า Cisco (Cisco Switch Summary)

เอกสารนี้สรุปข้อมูลบทเรียนที่ได้รับการพัฒนาในระบบเรียนรู้ (Cisco Learn Portal) รวมถึงตารางคำสั่งที่สำคัญและขั้นตอนการกู้คืนรหัสผ่านสำหรับอ้างอิงอย่างรวดเร็ว

---

## 📂 1. โครงสร้างไฟล์ในระบบเรียนรู้ (Workspace Files)

- **[index.html](file:///D:/My_Doc_lesson/บทเรียน%20Cisco/index.html)**: หน้าหลักระบบ Doc Portal ม่วง-น้ำเงิน (รองรับ Dark Mode & Responsive)
- **`assets/`**:
  - `lessons.js` - ข้อมูลเนื้อหาและชุดคำถามควิซ (บทเรียนที่ 1 - 6 สมบูรณ์แล้ว)
  - `visualizer.js` - แอนิเมชันจำลองระบบเครือข่าย และ Cisco IOS CLI Simulator
  - `app.js` - ระบบ SPA และการสลับหน้าเพจ
  - `quiz.css` - สไตล์การแต่งส่วนแบบทดสอบ
- **[reference/cisco-switch-quick-reference.html](file:///D:/My_Doc_lesson/บทเรียน%20Cisco/reference/cisco-switch-quick-reference.html)**: ชีทสรุปฉบับพิมพ์เป็นกระดาษหรือ PDF
- **[MISSION.md](file:///D:/My_Doc_lesson/บทเรียน%20Cisco/MISSION.md)**, **[RESOURCES.md](file:///D:/My_Doc_lesson/บทเรียน%20Cisco/RESOURCES.md)**, **[NOTES.md](file:///D:/My_Doc_lesson/บทเรียน%20Cisco/NOTES.md)**: แฟ้มงานวางแผนหลักสูตรและประวัติการเรียน

---

## 📚 2. สรุปเนื้อหาบทเรียนที่พร้อมใช้งาน (Lessons 1 - 6)

### บทเรียนที่ 1: สถาปัตยกรรมแบบ Layer และ OSI Model L1-L2
- **ทฤษฎี:** แบบจำลอง OSI 7 เลเยอร์ และระดับชั้นกายภาพ (Physical - bits) ร่วมกับเชื่อมโยงฮาร์ดแวร์ (Data Link - frames)
- **การทำงานของสวิตช์:** สวิตช์ทำงานใน L2 เรียนรู้และสร้าง MAC Address Table เพื่อสลับพอร์ตรับส่ง และทำ Flooding เมื่อยังไม่ทราบพอร์ตปลายทาง

### บทเรียนที่ 2: เจาะลึก L3 & L4 - IP Routing และ TCP vs UDP
- **ทฤษฎี L3:** หน้าที่การหาเส้นทาง (Routing) ข้ามเครือข่ายของ Router โดยใช้ IP Address
- **ทฤษฎี L4:** บริหารพอร์ตและ End-to-End Delivery
  - **TCP:** Connection-oriented (ต้องทำ 3-Way Handshake: SYN -> SYN-ACK -> ACK), ส่งข้อมูลเชื่อถือได้สูง
  - **UDP:** Connectionless, เน้นความเร็วสูง, ข้อมูลอาจตกหล่นหรือสลับตำแหน่งได้ (เช่น DNS, Streaming)

### บทเรียนที่ 3: ระดับชั้นบนของ OSI L5-L7 และโปรโตคอลสำคัญ
- **ทฤษฎี L5-L7:** การคุมเซสชัน (L5), การแปลงและเข้ารหัสฟอร์แมตข้อมูล (L6), การทำงานของซอฟต์แวร์ประยุกต์ผู้ใช้ (L7)
- **โปรโตคอลเด่น:** DNS (แปลงชื่อเว็บเป็น IP), DHCP (แจกจ่าย IP แอดเดรสในเครื่องลูกข่ายอัตโนมัติ), HTTP/HTTPS (แสดงผลหน้าเว็บ)

### บทเรียนที่ 4: การเดินทางและการแปลงร่างของข้อมูล (Encapsulation Process)
- **Encapsulation (ฝั่งส่ง):** ห่อหุ้มข้อมูลลงมาทีละเลเยอร์: Data ➡️ Segment (ใส่ TCP/UDP) ➡️ Packet (ใส่ IP) ➡️ Frame (ใส่ MAC + FCS) ➡️ Bits (สัญญาณไฟ/แสง)
- **Decapsulation (ฝั่งรับ):** แกะหัวส่วนควบคุมออกย้อนจากล่างขึ้นบนจนส่งข้อมูลเปล่าถึงแอปพลิเคชันปลายทาง

### บทเรียนที่ 5: ก้าวแรกสู่ Cisco IOS CLI และการใช้โหมดต่าง ๆ
- **วิธีเชื่อมต่อ:** ใช้สาย Console Cable ต่อจาก PC เข้าช่อง Console ปลายสายตั้งค่า PuTTY ความเร็ว 9600 baud
- **โหมด CLI:** 
  1. `Switch>` (User EXEC) - ตรวจสอบเน็ตเวิร์กพื้นฐาน
  2. `Switch#` (Privileged EXEC) - แอดมินตรวจสอบระบบอย่างละเอียด
  3. `Switch(config)#` (Global Config) - ปรับแต่งระบบและทางผ่านไปเปิดโหมดย่อย
  4. `Switch(config-if)#` และ `Switch(config-line)#` - โหมดย่อยสำหรับพอร์ตแลนและสายล็อกอิน

### บทเรียนที่ 6: การตั้งค่าพารามิเตอร์พื้นฐานและความปลอดภัยสวิตช์
- **RAM vs NVRAM:** 
  - **Running Config** (RAM): ค่ารันปัจจุบัน ดับเครื่องแล้วหาย
  - **Startup Config** (NVRAM): ค่ายืนยันที่จะรันทุกครั้งหลังบูต (คำสั่งเซฟ: `copy running-config startup-config` หรือ `write memory`)
- **การตั้งค่าพื้นฐาน:**
  - ตั้งชื่อเครื่อง: `hostname [ชื่อ]`
  - ตั้งรหัสผ่านแอดมิน: `enable secret [รหัสผ่าน]`
  - เข้ารหัสความลับในเครื่อง: `service password-encryption`
  - ป้ายต้อนรับแจ้งกฎหมาย: `banner motd #[ข้อความ]#`

---

## 🛠️ 3. สรุปคำสั่งพื้นฐานยอดนิยม (Cisco CLI Cheat Sheet)

| คำสั่ง | โหมดที่ใช้ | คำอธิบายการทำงาน |
| :--- | :---: | :--- |
| `enable` | `Switch>` | สลับเข้าสู่โหมดสิทธิ์แอดมิน |
| `configure terminal` | `Switch#` | สลับเข้าสู่โหมดแก้ไขตั้งค่าหลัก |
| `hostname [ชื่อ]` | `Switch(config)#` | กำหนดชื่อสวิตช์ |
| `enable secret [รหัสผ่าน]` | `Switch(config)#` | ตั้งรหัสผ่านเข้าโหมดสิทธิ์แอดมินแบบเข้ารหัสลับแน่นหนา |
| `service password-encryption` | `Switch(config)#` | เข้ารหัสผ่านที่เป็น plaintext ทั้งระบบ |
| `banner motd #[ข้อความ]#` | `Switch(config)#` | ตั้งข้อความเตือนภัย MOTD ก่อนล็อกอิน |
| `write memory` (หรือ `wr`) | `Switch#` | บันทึกการตั้งค่าลง NVRAM (เซฟข้อมูล) |
| `copy running-config startup-config` | `Switch#` | บันทึกการตั้งค่าลง NVRAM (มาตรฐานหลัก) |
| `show running-config` | `Switch#` | แสดงค่าคอนฟิกูเรชันที่รันอยู่ใน RAM |
| `show ip interface brief` | `Switch#` | แสดงตารางข้อมูล IP และสถานะเปิด/ปิดของพอร์ตทั้งหมด |
| `exit` | ทุกโหมด | ย้อนกลับโหมดก่อนหน้า 1 ขั้น |
| `end` (หรือ Ctrl+Z) | โหมดแก้ไขย่อย | ดีดตัวเองกลับสู่โหมด Privileged EXEC (`#`) ทันที |

---

## 🔐 4. สรุปขั้นตอนการกู้คืนรหัสผ่าน (Password Recovery Standard)

### สำหรับรุ่นเดิม (Catalyst 2960 / 3560 / 3750)
1. ดึงสายไฟออกเพื่อปิดเครื่อง
2. **กดปุ่ม Mode ค้างไว้** บนตัวสวิตช์แล้วเสียบสายไฟกลับ
3. ปล่อยปุ่ม Mode เมื่อไฟ System LED สีเขียวค้าง (จะเข้าสู่หน้าจอ `switch:`)
4. พิมพ์ `flash_init` เพื่อเริ่มต้นใช้งานแฟลชไดรฟ์สวิตช์
5. พิมพ์คำสั่งเปลี่ยนชื่อไฟล์คอนฟิกเดิมเพื่อหลบการโหลดตอนเปิดเครื่อง:
   `rename flash:config.text flash:config.text.old`
6. บูตระบบด้วยคำสั่ง `boot`
7. บูตเสร็จพิมพ์คำสั่ง `enable` เพื่อข้ามการขอรหัสผ่าน
8. เปลี่ยนชื่อไฟล์กลับเป็นชื่อเดิม:
   `rename flash:config.text.old flash:config.text`
9. โหลดไฟล์เดิมเข้ามาเพื่อความปลอดภัยของข้อมูลเก่า:
   `copy flash:config.text system:running-config`
10. เข้าไปแก้ไขรหัสผ่านใหม่:
    `configure terminal` ➡️ `enable secret [รหัสผ่านใหม่]` ➡️ `exit`
11. บันทึกข้อมูลและใช้งานตามปกติ: `copy running-config startup-config`

### สำหรับรุ่นใหม่ (Catalyst 9000 / IOS-XE)
1. เชื่อมต่อสายคอนโซล แล้วปิด-เปิดสวิตช์ใหม่
2. กดปุ่ม **Ctrl+C** (หรือปุ่ม Mode ค้าง) บนคีย์บอร์ดซ้ำ ๆ ระหว่างบูต เพื่อเข้าสู่โหมด ROMMON (`switch:`)
3. สั่งระบบให้ ignore ข้ามคอนฟิกเดิม:
   `SWITCH_IGNORE_STARTUP_CFG=1`
4. พิมพ์คำสั่ง `boot`
5. เมื่อระบบบูตเสร็จสิ้นพิมพ์ `enable`
6. กู้คืนค่าคอนฟิกเก่ากลับมา:
   `copy startup-config running-config`
7. เข้าไปเปลี่ยนรหัสผ่านแอดมินใหม่:
   `configure terminal` ➡️ `username admin privilege 15 secret [รหัสผ่านใหม่]`
8. **(สำคัญมาก)** ปิดคำสั่งให้ข้ามคอนฟิกเพื่อให้รอบหน้าบูตปกติดังเดิม:
   `no system ignore startupconfig switch all`
9. ออกและบันทึกข้อมูล:
   `exit` ➡️ `copy running-config startup-config`
