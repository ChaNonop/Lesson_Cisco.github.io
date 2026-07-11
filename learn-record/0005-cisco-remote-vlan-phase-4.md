# พัฒนาบทเรียนเฟสที่ 4 (Remote Management & VLANs/Trunks) และอัปเกรด CLI Simulator

ในรอบการทำงานนี้ ได้พัฒนาและเปิดบทเรียนเฟสที่ 4 (บทเรียนที่ 7 และ 8) รวมถึงการยกระดับแล็บจำลองอย่างก้าวหน้าดังนี้:

1. **บทเรียนที่ 7: IP Management และ SSH v2**
   - เนื้อหาครอบคลุม: การระบุ Management IP ผ่าน Switched Virtual Interface (SVI Vlan1), โครงสร้าง Default Gateway ของ Switch, ข้อเปรียบเทียบความเสี่ยงของโปรโตคอล Telnet และขั้นตอนการคอนฟิก SSH v2.0 อย่างถูกต้อง
   - ควิซทบทวนความรู้ประจำบทเรียน 3 ข้อ

2. **บทเรียนที่ 8: VLAN และพอร์ต Trunk**
   - เนื้อหาครอบคลุม: แนวคิดการทำ Virtual LAN เพื่อแบ่งแยกวงแลน, ความแตกต่างระหว่าง Access Port และ Trunk Port, มาตรฐานกลาง IEEE 802.1Q (Tagging) และคำสั่งคอนฟิกจับพอร์ต/ทำลิงก์ Trunk ระหว่างอุปกรณ์
   - ควิซทบทวนความรู้ประจำบทเรียน 3 ข้อ

3. **อัปเกรด Cisco IOS CLI Simulator ครั้งใหญ่**
   - เพิ่มการรองรับคำสั่งและสถานะสอดคล้องกับหัวข้อปฏิบัติการใหม่:
     - การกำหนดค่า Interface VLAN 1 (`ip address` และ `no shutdown`)
     - การตั้งค่า `ip default-gateway` และ `ip domain-name`
     - การสร้างบัญชีแอดมิน (`username ... privilege 15 secret ...`)
     - การจำลองสร้างคู่กุญแจความลับ RSA แบบโต้ตอบ (`crypto key generate rsa`) ที่ผู้ใช้งานสามารถระบุบิตของ Modulus ได้จริง
     - การเลือกเปิด SSH v2 (`ip ssh version 2`)
     - การควบคุมช่องทางเชื่อมต่อ VTY (`line vty 0 15`, `transport input ssh`, `login local`)
     - การสร้าง VLAN และการกำหนดชื่อแผนก (`vlan [ID]`, `name [ชื่อ]`)
     - การจัดโหมดพอร์ตปลายทางและสายแชร์ (`switchport mode access/trunk`, `switchport access vlan [ID]`, `switchport trunk allowed vlan [IDs]`)
     - เพิ่มหน้าตารางแสดงผลสำหรับคำสั่งตรวจสอบ ได้แก่ `show vlan brief` และ `show interfaces trunk`
     - ปรับหน้าตาราง `show ip interface brief` และ `show running-config` / `show startup-config` ให้ดึงข้อมูลมาแสดงผลตามคำสั่งที่ผู้เรียนพิมพ์ตั้งค่าไว้จริงทั้งหมด
