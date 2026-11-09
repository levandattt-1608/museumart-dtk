/* ========================================================
   🎨 BẢO TÀNG NGHỆ THUẬT HỌC ĐƯỜNG - MỸ THUẬT
   Full Application Logic & Interactive Museum Experience
   ======================================================== */

// ===== STATE =====
let currentRole = null;       // 'student' | 'teacher'
let currentUser = '';
let currentFilter = 'all';
let currentClassFilter = 'all';
let currentMediumFilter = 'all';
let searchQuery = '';
let selectedFrame = 'classic-gold';
let selectedMat = 'mat-cream';
let selectedArtworkId = null;
let uploadedImageData = null;
let isAudioPlaying = false;
let audioContext = null;
let audioInterval = null;

// ===== STORAGE KEYS =====
const STORAGE_KEYS = {
    artworks: 'museum_artworks_v2',
    role: 'museum_role_v2',
    userPrefix: 'museum_user_'
};

// ========================================================
// 🎨 BEAUTIFUL BUILT-IN DEMO MASTERPIECES (SVG ARTWORKS)
// ========================================================
function createSunsetRiceFieldSVG() {
    return 'data:image/svg+xml;utf8,' + encodeURIComponent(`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 450">
        <defs>
            <linearGradient id="skyGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stop-color="#ff5e62"/>
                <stop offset="35%" stop-color="#ff9966"/>
                <stop offset="70%" stop-color="#ffd56b"/>
                <stop offset="100%" stop-color="#fdfcfb"/>
            </linearGradient>
            <radialGradient id="sunGlow" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stop-color="#ffffff"/>
                <stop offset="30%" stop-color="#fff275"/>
                <stop offset="70%" stop-color="#ff9f43" stop-opacity="0.8"/>
                <stop offset="100%" stop-color="#ff5e62" stop-opacity="0"/>
            </radialGradient>
            <linearGradient id="mountainGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stop-color="#5a3d75" stop-opacity="0.7"/>
                <stop offset="100%" stop-color="#8e44ad" stop-opacity="0.3"/>
            </linearGradient>
            <linearGradient id="fieldGrad1" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stop-color="#f39c12"/>
                <stop offset="100%" stop-color="#27ae60"/>
            </linearGradient>
            <linearGradient id="fieldGrad2" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stop-color="#f1c40f"/>
                <stop offset="100%" stop-color="#d35400"/>
            </linearGradient>
            <linearGradient id="waterGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stop-color="#ffbe76"/>
                <stop offset="50%" stop-color="#e056fd"/>
                <stop offset="100%" stop-color="#686de0"/>
            </linearGradient>
        </defs>
        <!-- Sky -->
        <rect width="600" height="450" fill="url(#skyGrad)"/>
        <!-- Sun -->
        <circle cx="300" cy="180" r="110" fill="url(#sunGlow)"/>
        <circle cx="300" cy="180" r="42" fill="#fffef0"/>
        <!-- Distant Mountains -->
        <path d="M-50,260 Q80,180 180,250 T400,220 T650,260 L650,450 L-50,450 Z" fill="url(#mountainGrad)"/>
        <path d="M-20,280 Q150,220 280,270 T550,240 T650,290 L650,450 L-20,450 Z" fill="#6d4c41" opacity="0.35"/>
        <!-- River flowing through fields -->
        <path d="M300,270 C290,310 380,340 330,380 C290,410 240,420 200,450 L340,450 C380,420 440,390 400,340 C360,300 320,280 300,270 Z" fill="url(#waterGrad)"/>
        <!-- Rice Terraces Layer 1 -->
        <path d="M0,280 Q160,250 300,270 Q450,255 600,280 L600,330 Q420,310 260,330 Q120,310 0,330 Z" fill="url(#fieldGrad1)"/>
        <!-- Rice Terraces Layer 2 -->
        <path d="M0,320 Q180,300 340,330 Q480,310 600,335 L600,380 Q440,360 280,380 Q140,360 0,380 Z" fill="url(#fieldGrad2)"/>
        <!-- Rice Terraces Layer 3 (Foreground) -->
        <path d="M0,370 Q140,350 280,375 Q460,350 600,380 L600,450 L0,450 Z" fill="#2ecc71" opacity="0.85"/>
        <!-- Golden Rice highlights -->
        <ellipse cx="120" cy="350" rx="90" ry="15" fill="#f1c40f" opacity="0.6"/>
        <ellipse cx="480" cy="365" rx="80" ry="12" fill="#f39c12" opacity="0.6"/>
        <ellipse cx="180" cy="415" rx="110" ry="18" fill="#f9ca24" opacity="0.7"/>
        <!-- Birds flying in the sky -->
        <path d="M220,120 Q230,110 240,120 Q250,110 260,120" fill="none" stroke="#634832" stroke-width="2" stroke-linecap="round"/>
        <path d="M255,100 Q262,92 270,100 Q278,92 285,100" fill="none" stroke="#634832" stroke-width="1.8" stroke-linecap="round"/>
        <path d="M190,135 Q197,128 205,135 Q212,128 220,135" fill="none" stroke="#634832" stroke-width="1.5" stroke-linecap="round"/>
        <!-- Stilt house silhouetted -->
        <polygon points="490,290 515,275 540,290" fill="#3e2723"/>
        <rect x="495" y="290" width="40" height="20" fill="#4e342e"/>
        <line x1="500" y1="310" x2="500" y2="325" stroke="#3e2723" stroke-width="2"/>
        <line x1="530" y1="310" x2="530" y2="325" stroke="#3e2723" stroke-width="2"/>
    </svg>`);
}

function createHanoiOldQuarterSVG() {
    return 'data:image/svg+xml;utf8,' + encodeURIComponent(`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 450">
        <defs>
            <linearGradient id="hanoiSky" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stop-color="#74b9ff"/>
                <stop offset="60%" stop-color="#dfe6e9"/>
                <stop offset="100%" stop-color="#ffeaa7"/>
            </linearGradient>
            <linearGradient id="wallYellow" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stop-color="#f5cd79"/>
                <stop offset="50%" stop-color="#eccc68"/>
                <stop offset="100%" stop-color="#d6a844"/>
            </linearGradient>
            <linearGradient id="roofTile" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stop-color="#b33939"/>
                <stop offset="100%" stop-color="#5c1d1d"/>
            </linearGradient>
        </defs>
        <!-- Background Sky -->
        <rect width="600" height="450" fill="url(#hanoiSky)"/>
        <!-- French Colonial Houses in Hanoi -->
        <!-- House 1 (Left) -->
        <polygon points="40,160 160,130 160,370 40,370" fill="url(#wallYellow)"/>
        <polygon points="25,165 100,105 175,135" fill="url(#roofTile)"/>
        <!-- Green Shutters & Balcony -->
        <rect x="65" y="190" width="30" height="45" fill="#218c74" rx="2"/>
        <rect x="110" y="180" width="30" height="45" fill="#218c74" rx="2"/>
        <rect x="55" y="240" width="95" height="10" fill="#333333"/>
        <line x1="60" y1="240" x2="60" y2="225" stroke="#333" stroke-width="2"/>
        <line x1="80" y1="240" x2="80" y2="225" stroke="#333" stroke-width="2"/>
        <line x1="100" y1="240" x2="100" y2="225" stroke="#333" stroke-width="2"/>
        <line x1="120" y1="240" x2="120" y2="225" stroke="#333" stroke-width="2"/>
        <line x1="140" y1="240" x2="140" y2="225" stroke="#333" stroke-width="2"/>
        <!-- House 2 (Center) -->
        <polygon points="160,130 330,120 330,370 160,370" fill="#f8c291"/>
        <polygon points="150,130 245,75 340,120" fill="url(#roofTile)"/>
        <rect x="200" y="160" width="40" height="60" fill="#38ada9" rx="4"/>
        <rect x="260" y="160" width="40" height="60" fill="#38ada9" rx="4"/>
        <!-- Wooden sign -->
        <rect x="185" y="270" width="120" height="24" fill="#6d4c41" rx="3"/>
        <text x="245" y="286" font-family="serif" font-size="12" fill="#ffd32a" text-anchor="middle" font-weight="bold">TRÀ &amp; HOA PHỐ CỔ</text>
        <!-- House 3 (Right) -->
        <polygon points="330,120 520,150 520,370 330,370" fill="url(#wallYellow)"/>
        <polygon points="320,120 425,85 530,150" fill="url(#roofTile)"/>
        <!-- Electric Wires (Classic Hanoi hallmark) -->
        <path d="M0,80 Q300,160 600,100" fill="none" stroke="#2f3542" stroke-width="1.5"/>
        <path d="M0,95 Q280,180 600,115" fill="none" stroke="#2f3542" stroke-width="1.2"/>
        <path d="M0,115 Q320,200 600,135" fill="none" stroke="#2f3542" stroke-width="1.5"/>
        <!-- Street / Pavement -->
        <polygon points="0,370 600,370 600,450 0,450" fill="#57606f"/>
        <!-- Street vendor with bicycle & flowers -->
        <circle cx="430" cy="385" r="28" fill="none" stroke="#2f3542" stroke-width="3"/>
        <circle cx="505" cy="385" r="28" fill="none" stroke="#2f3542" stroke-width="3"/>
        <line x1="430" y1="385" x2="470" y2="355" stroke="#2f3542" stroke-width="3"/>
        <line x1="470" y1="355" x2="505" y2="385" stroke="#2f3542" stroke-width="3"/>
        <line x1="470" y1="355" x2="470" y2="330" stroke="#2f3542" stroke-width="3"/>
        <!-- Flower baskets on bicycle (Hoa Sưa & Cúc họa mi) -->
        <ellipse cx="450" cy="340" rx="30" ry="18" fill="#ffffff" stroke="#f1c40f" stroke-width="2"/>
        <circle cx="445" cy="336" r="6" fill="#ff4757"/>
        <circle cx="458" cy="342" r="5" fill="#ffa502"/>
        <circle cx="438" cy="344" r="5" fill="#2ed573"/>
        <circle cx="462" cy="334" r="6" fill="#1e90ff"/>
        <!-- Cyclo silhouette in distance -->
        <polygon points="80,380 120,380 135,400 70,400" fill="#2f3542" opacity="0.6"/>
    </svg>`);
}

function createLotusPondSVG() {
    return 'data:image/svg+xml;utf8,' + encodeURIComponent(`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 450">
        <defs>
            <radialGradient id="pondBg" cx="50%" cy="50%" r="70%">
                <stop offset="0%" stop-color="#1b4d3e"/>
                <stop offset="50%" stop-color="#0b2920"/>
                <stop offset="100%" stop-color="#04120e"/>
            </radialGradient>
            <linearGradient id="lotusPetal1" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stop-color="#ffffff"/>
                <stop offset="40%" stop-color="#ff9ff3"/>
                <stop offset="100%" stop-color="#f368e0"/>
            </linearGradient>
            <linearGradient id="lotusPetal2" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stop-color="#ffeaa7"/>
                <stop offset="50%" stop-color="#ff7675"/>
                <stop offset="100%" stop-color="#d63031"/>
            </linearGradient>
            <linearGradient id="leafGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stop-color="#10ac84"/>
                <stop offset="60%" stop-color="#1dd1a1"/>
                <stop offset="100%" stop-color="#054737"/>
            </linearGradient>
        </defs>
        <!-- Deep pond water -->
        <rect width="600" height="450" fill="url(#pondBg)"/>
        <!-- Water Ripples -->
        <ellipse cx="300" cy="270" rx="240" ry="60" fill="none" stroke="rgba(255,255,255,0.08)" stroke-width="2"/>
        <ellipse cx="300" cy="270" rx="180" ry="45" fill="none" stroke="rgba(255,255,255,0.12)" stroke-width="1.5"/>
        <ellipse cx="300" cy="270" rx="110" ry="28" fill="none" stroke="rgba(255,255,270,0.15)" stroke-width="1.5"/>
        <!-- Giant Lotus Leaves (Lá sen) -->
        <ellipse cx="140" cy="330" rx="130" ry="65" fill="url(#leafGrad)"/>
        <path d="M140,330 L200,280" stroke="#04382c" stroke-width="3"/>
        <ellipse cx="460" cy="310" rx="120" ry="60" fill="url(#leafGrad)"/>
        <ellipse cx="280" cy="380" rx="160" ry="65" fill="#10ac84"/>
        <ellipse cx="380" cy="190" rx="90" ry="40" fill="#0c6b53" opacity="0.8"/>
        <!-- Main Blooming Lotus Flower (Hoa sen nở rực rỡ) -->
        <g transform="translate(300, 240)">
            <!-- Outer petals -->
            <path d="M0,20 Q-70,-10 -90,-60 Q-40,-50 0,20" fill="url(#lotusPetal2)"/>
            <path d="M0,20 Q70,-10 90,-60 Q40,-50 0,20" fill="url(#lotusPetal2)"/>
            <path d="M0,20 Q-50,-40 -50,-110 Q-20,-70 0,20" fill="url(#lotusPetal1)"/>
            <path d="M0,20 Q50,-40 50,-110 Q20,-70 0,20" fill="url(#lotusPetal1)"/>
            <path d="M0,20 Q-25,-60 0,-130 Q25,-60 0,20" fill="url(#lotusPetal1)"/>
            <!-- Lotus Seed Pod Center (Gương sen vàng) -->
            <ellipse cx="0" cy="-25" rx="22" ry="14" fill="#feca57"/>
            <circle cx="-10" cy="-28" r="2.5" fill="#574b90"/>
            <circle cx="0" cy="-30" r="2.5" fill="#574b90"/>
            <circle cx="10" cy="-28" r="2.5" fill="#574b90"/>
            <circle cx="-5" cy="-22" r="2.5" fill="#574b90"/>
            <circle cx="6" cy="-22" r="2.5" fill="#574b90"/>
        </g>
        <!-- Dew Drops on leaves (Giọt sương mai lấp lánh) -->
        <ellipse cx="120" cy="310" rx="10" ry="7" fill="#ffffff" opacity="0.85"/>
        <circle cx="118" cy="308" r="3" fill="#ffffff"/>
        <ellipse cx="440" cy="300" rx="7" ry="5" fill="#ffffff" opacity="0.8"/>
        <!-- Lotus Bud (Búp sen chúm chím) -->
        <g transform="translate(480, 190)">
            <line x1="0" y1="40" x2="-20" y2="120" stroke="#10ac84" stroke-width="5"/>
            <path d="M0,40 Q-20,0 0,-40 Q20,0 0,40" fill="url(#lotusPetal1)"/>
        </g>
        <!-- Dragonfly hovering (Chuồn chuồn ớt) -->
        <g transform="translate(190, 150) rotate(-20)">
            <ellipse cx="0" cy="0" rx="18" ry="3.5" fill="#ee5253"/>
            <ellipse cx="14" cy="0" rx="4" ry="4" fill="#333333"/>
            <!-- Transparent Wings -->
            <ellipse cx="-2" cy="-14" rx="16" ry="4" fill="rgba(255,255,255,0.7)" transform="rotate(-30)"/>
            <ellipse cx="4" cy="-14" rx="14" ry="3.5" fill="rgba(255,255,255,0.6)" transform="rotate(-15)"/>
        </g>
    </svg>`);
}

function createGalaxyDreamSVG() {
    return 'data:image/svg+xml;utf8,' + encodeURIComponent(`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 450">
        <defs>
            <radialGradient id="spaceDeep" cx="50%" cy="50%" r="75%">
                <stop offset="0%" stop-color="#3b1d60"/>
                <stop offset="45%" stop-color="#180b33"/>
                <stop offset="85%" stop-color="#080214"/>
            </radialGradient>
            <radialGradient id="nebulaColor" cx="65%" cy="35%" r="45%">
                <stop offset="0%" stop-color="#ff7675" stop-opacity="0.8"/>
                <stop offset="40%" stop-color="#6c5ce7" stop-opacity="0.5"/>
                <stop offset="100%" stop-color="#0984e3" stop-opacity="0"/>
            </radialGradient>
            <linearGradient id="planetSaturn" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stop-color="#ffeaa7"/>
                <stop offset="40%" stop-color="#fab1a0"/>
                <stop offset="70%" stop-color="#e17055"/>
                <stop offset="100%" stop-color="#2d3436"/>
            </linearGradient>
        </defs>
        <rect width="600" height="450" fill="url(#spaceDeep)"/>
        <!-- Nebula cloud -->
        <rect width="600" height="450" fill="url(#nebulaColor)"/>
        <!-- Stars of various sizes -->
        <circle cx="50" cy="80" r="1.5" fill="#ffffff" opacity="0.9"/>
        <circle cx="120" cy="40" r="2.2" fill="#fff" opacity="1"/>
        <circle cx="180" cy="110" r="1.2" fill="#ffeaa7" opacity="0.8"/>
        <circle cx="280" cy="50" r="2.5" fill="#74b9ff" opacity="0.9"/>
        <circle cx="340" cy="120" r="1.2" fill="#ffffff" opacity="0.7"/>
        <circle cx="490" cy="60" r="2" fill="#ff7675" opacity="0.9"/>
        <circle cx="540" cy="130" r="1" fill="#fff" opacity="0.6"/>
        <circle cx="80" cy="220" r="1.5" fill="#fff" opacity="0.8"/>
        <circle cx="210" cy="270" r="2" fill="#fdcb6e" opacity="0.9"/>
        <circle cx="510" cy="340" r="1.8" fill="#a29bfe" opacity="0.9"/>
        <!-- Glowing Saturn Planet -->
        <g transform="translate(420, 180) rotate(-22)">
            <!-- Back ring -->
            <path d="M-110,0 A110 32 0 0 1 110,0" stroke="#fce29d" stroke-width="12" fill="none" opacity="0.5"/>
            <!-- Planet Sphere -->
            <circle cx="0" cy="0" r="54" fill="url(#planetSaturn)"/>
            <!-- Front ring -->
            <path d="M110,0 A110 32 0 0 1 -110,0" stroke="#fce29d" stroke-width="12" fill="none" opacity="0.85"/>
        </g>
        <!-- Crescent Earth/Moon in distance -->
        <circle cx="140" cy="150" r="32" fill="#0984e3"/>
        <circle cx="152" cy="144" r="28" fill="#180b33"/>
        <!-- Student Astronaut Flying in Space holding a paint brush -->
        <g transform="translate(220, 260) rotate(15)">
            <!-- Space tether -->
            <path d="M-60,100 Q-10,60 0,30" fill="none" stroke="#dfe6e9" stroke-width="2.5" stroke-dasharray="4 2"/>
            <!-- Jetpack -->
            <rect x="-18" y="-15" width="36" height="40" fill="#b2bec3" rx="5"/>
            <ellipse cx="0" cy="28" rx="8" ry="12" fill="#ff7675"/>
            <ellipse cx="0" cy="28" rx="4" ry="7" fill="#ffeaa7"/>
            <!-- Spacesuit body -->
            <ellipse cx="0" cy="5" rx="20" ry="26" fill="#f5f6fa"/>
            <!-- Helmet -->
            <circle cx="0" cy="-28" r="20" fill="#f5f6fa"/>
            <!-- Gold visor reflection -->
            <ellipse cx="3" cy="-28" rx="14" ry="12" fill="#fbc531"/>
            <ellipse cx="6" cy="-31" rx="5" ry="3" fill="#ffffff" opacity="0.8"/>
            <!-- Hand holding art brush -->
            <line x1="18" y1="-5" x2="45" y2="-20" stroke="#f5f6fa" stroke-width="6" stroke-linecap="round"/>
            <line x1="45" y1="-20" x2="68" y2="-35" stroke="#e17055" stroke-width="3" stroke-linecap="round"/>
            <polygon points="68,-35 76,-40 73,-32" fill="#00cec9"/>
            <!-- Magic Paint Trail of Stars -->
            <path d="M76,-40 Q130,-70 200,-50" fill="none" stroke="#00cec9" stroke-width="3" stroke-linecap="round"/>
            <circle cx="110" cy="-56" r="3" fill="#ffeaa7"/>
            <circle cx="140" cy="-62" r="4" fill="#ff7675"/>
            <circle cx="170" cy="-58" r="3.5" fill="#fd79a8"/>
        </g>
    </svg>`);
}

// 4 Preset Masterpieces for Initial Museum Showcase
function getInitialPresetArtworks() {
    return [
        {
            id: 'art_demo_1',
            title: 'Hoàng Hôn Trên Cánh Đồng Lúa Chín',
            description: 'Bức tranh được sáng tác trong chuyến đi thăm quê ngoại mùa lúa chín vàng ươm. Em muốn khắc họa vẻ đẹp trù phú, bình yên của làng quê Việt Nam dưới ánh hoàng hôn rực rỡ và những cánh chim trời bay về tổ ấm.',
            medium: 'Màu nước',
            className: '7A1',
            artist: 'Nguyễn Thảo My',
            frame: 'classic-gold',
            mat: 'mat-cream',
            imageData: createSunsetRiceFieldSVG(),
            timestamp: Date.now() - 86400000 * 3,
            grade: 9.5,
            teacherName: 'Thầy Lê Hoàng (GV Mỹ Thuật)',
            comment: 'Tác phẩm xuất sắc! Kỹ thuật vẽ loang màu nước mượt mà, chuyển sắc từ cam hoàng hôn sang vàng lúa rất có chiều sâu không gian. Nét vẽ tự tin và giàu cảm xúc.',
            suggestion: 'Em có thể nghiên cứu thêm kỹ thuật cọ tỉa khô (dry-brush) ở tiền cảnh để tôn thêm độ sắc nét của từng bông lúa trĩu hạt nhé!',
            rubric: {
                comp: 'Hài hòa, chặt chẽ (Tốt)',
                color: 'Hòa sắc ấn tượng, tương phản tốt (Tốt)',
                tech: 'Làm chủ chất liệu, nét vẽ tự tin (Tốt)',
                creativity: 'Ý tưởng độc đáo, giàu cảm xúc (Tốt)'
            },
            badges: ['🌟 Sáng Tạo Vượt Bậc', '🎨 Phối Màu Xuất Sắc'],
            likes: 38,
            likedBy: [],
            comments: [
                { author: 'Trần Đức Nam (8B2)', text: 'Tranh bạn vẽ màu nước trong veo, nhìn bình yên quá!', time: 'Hôm qua' },
                { author: 'Lê Bảo Châu (6A3)', text: 'Thích nhất bầu trời hoàng hôn của bạn Thảo My!', time: 'Hôm nay' }
            ]
        },
        {
            id: 'art_demo_2',
            title: 'Phố Cổ Hà Nội Mùa Hoa Sưa',
            description: 'Lấy cảm hứng từ những mái ngói rêu phong và bức tường vàng đặc trưng của phố cổ Hà Nội. Gánh hoa sưa trắng tinh khôi của cô bán hàng rong như điểm xuyết nét dịu dàng, hoài niệm của mùa xuân thủ đô.',
            medium: 'Sơn dầu',
            className: '8B2',
            artist: 'Trần Đức Nam',
            frame: 'baroque',
            mat: 'mat-cream',
            imageData: createHanoiOldQuarterSVG(),
            timestamp: Date.now() - 86400000 * 2,
            grade: 9.0,
            teacherName: 'Cô Vũ Minh Hằng (GV Mỹ Thuật)',
            comment: 'Bố cục rất chững chạc, cách phối màu tường vàng tương phản ăn ý với mái ngói đỏ sẫm. Chi tiết gánh hoa trên xe đạp tạo điểm nhấn thị giác duyên dáng.',
            suggestion: 'Nên chú ý sắc độ bóng đổ dưới chân các ngôi nhà xuống mặt đường để tăng độ vững chãi cho khối kiến trúc.',
            rubric: {
                comp: 'Hài hòa, chặt chẽ (Tốt)',
                color: 'Hòa sắc ấn tượng, tương phản tốt (Tốt)',
                tech: 'Làm chủ chất liệu, nét vẽ tự tin (Tốt)',
                creativity: 'Góc nhìn mới mẻ (Khá)'
            },
            badges: ['✍️ Đường Nét Tinh Tế', '🎨 Phối Màu Xuất Sắc'],
            likes: 29,
            likedBy: [],
            comments: [
                { author: 'Phạm Quang Minh (9A)', text: 'Màu sơn dầu dày dặn, nhìn chuẩn phong cách phố cổ Bùi Xuân Phái!', time: 'Hôm kia' }
            ]
        },
        {
            id: 'art_demo_3',
            title: 'Giai Điệu Sen Xanh',
            description: 'Hoa sen tượng trưng cho sự thuần khiết, thanh cao vươn lên từ bùn lầy. Em vẽ đóa sen hồng bung nở giữa đầm sen xanh biếc, bên cạnh là chú chuồn chuồn ớt đậu trên búp sen sớm mai đọng sương.',
            medium: 'Màu sáp / Sáp dầu',
            className: '6A3',
            artist: 'Lê Bảo Châu',
            frame: 'dark-wood',
            mat: 'mat-white',
            imageData: createLotusPondSVG(),
            timestamp: Date.now() - 86400000 * 1,
            grade: 8.5,
            teacherName: 'Thầy Lê Hoàng (GV Mỹ Thuật)',
            comment: 'Nét sáp dầu đậm đà, mộc mạc và tràn đầy năng lượng tươi trẻ. Cách thể hiện giọt sương trên lá sen rất khéo léo.',
            suggestion: 'Em thử dùng ngón tay hoặc khăn giấy miết nhẹ các mảng màu sáp để tạo độ chuyển mịn màng hơn ở phần cánh hoa sen nhé.',
            rubric: {
                comp: 'Khá cân đối (Khá)',
                color: 'Màu tươi sáng, ăn ý (Khá)',
                tech: 'Kỹ thuật khá mượt mà (Khá)',
                creativity: 'Ý tưởng độc đáo, giàu cảm xúc (Tốt)'
            },
            badges: ['💡 Ý Tưởng Truyền Cảm Hứng'],
            likes: 24,
            likedBy: [],
            comments: [
                { author: 'Nguyễn Thảo My (7A1)', text: 'Màu sáp lên màu nổi bật thật đấy Bảo Châu ơi!', time: 'Hôm nay' }
            ]
        },
        {
            id: 'art_demo_4',
            title: 'Ước Mơ Khám Phá Vũ Trụ',
            description: 'Em vẽ một bạn phi hành gia trẻ tuổi đang bay lơ lửng ngoài không gian, tay cầm cọ vẽ nên những dải ngân hà kỳ thú và các vì sao lung linh. Thông điệp: Nghệ thuật và trí tưởng tượng không có giới hạn!',
            medium: 'Kỹ thuật số',
            className: '9A',
            artist: 'Phạm Quang Minh',
            frame: 'white-modern',
            mat: 'mat-dark',
            imageData: createGalaxyDreamSVG(),
            timestamp: Date.now() - 3600000 * 5,
            grade: null, // Ungraded for Teacher to test grading!
            teacherName: null,
            comment: null,
            suggestion: null,
            rubric: null,
            badges: [],
            likes: 42,
            likedBy: [],
            comments: [
                { author: 'Trần Đức Nam (8B2)', text: 'Tranh Digital đỉnh quá bạn ơi! Chờ thầy cô vào chấm 10 điểm!', time: 'Vừa xong' }
            ]
        }
    ];
}

// ========================================================
// 💾 DATA ACCESS & INITIALIZATION
// ========================================================
function getArtworks() {
    try {
        const data = localStorage.getItem(STORAGE_KEYS.artworks);
        if (data) {
            const parsed = JSON.parse(data);
            if (Array.isArray(parsed) && parsed.length > 0) return parsed;
        }
    } catch (e) {
        console.error('Error reading localStorage:', e);
    }
    // Return presets if empty
    const presets = getInitialPresetArtworks();
    saveArtworks(presets);
    return presets;
}

function saveArtworks(artworks) {
    try {
        localStorage.setItem(STORAGE_KEYS.artworks, JSON.stringify(artworks));
    } catch (e) {
        console.error('QuotaExceeded error when saving artworks:', e);
        showToast('⚠️', 'Bộ nhớ trình duyệt đầy! Đã lưu ảnh ở chất lượng tối ưu.');
    }
}

function generateId() {
    return 'art_' + Date.now() + '_' + Math.random().toString(36).substr(2, 6);
}

// ========================================================
// 🚪 ENTRANCE & USER IDENTITY
// ========================================================
function enterMuseum(role) {
    currentRole = role;
    localStorage.setItem(STORAGE_KEYS.role, role);
    
    // Setup UI badge
    const badge = document.getElementById('user-role-badge');
    badge.textContent = role === 'student' ? 'Học Sinh' : 'Giáo Viên';
    badge.className = 'user-role-badge ' + role;
    
    // Check saved name for role
    const savedName = localStorage.getItem(STORAGE_KEYS.userPrefix + role);
    if (savedName) {
        currentUser = savedName;
        document.getElementById('user-name-display').textContent = savedName;
        showMuseum();
    } else {
        // Set default name if not present
        currentUser = role === 'teacher' ? 'Thầy/Cô Mỹ Thuật' : 'Học Sinh Sáng Tác';
        document.getElementById('user-name-display').textContent = currentUser;
        showMuseum();
        showNameModal();
    }
}

function loadDemoAndEnter() {
    loadDemoData();
    enterMuseum('student');
}

function showMuseum() {
    document.getElementById('entrance').classList.add('hidden');
    document.getElementById('museum').classList.remove('hidden');
    populateClassFilter();
    showSection('gallery');
}

function exitMuseum() {
    document.getElementById('museum').classList.add('hidden');
    document.getElementById('entrance').classList.remove('hidden');
    currentRole = null;
    if (isAudioPlaying) toggleMuseumAudio();
}

function showNameModal() {
    const input = document.getElementById('user-name-input');
    input.value = currentUser || '';
    document.getElementById('name-modal').classList.remove('hidden');
    setTimeout(() => input.focus(), 250);
}

function closeNameModal() {
    if (currentUser) {
        document.getElementById('name-modal').classList.add('hidden');
    }
}

function submitName() {
    const input = document.getElementById('user-name-input');
    const val = input.value.trim();
    if (!val) {
        input.style.borderColor = '#e74c3c';
        input.placeholder = 'Vui lòng nhập họ và tên của bạn!';
        return;
    }
    currentUser = val;
    localStorage.setItem(STORAGE_KEYS.userPrefix + currentRole, currentUser);
    document.getElementById('user-name-display').textContent = currentUser;
    document.getElementById('name-modal').classList.add('hidden');
    showToast('✨', `Kính chào ${currentUser} đến với Bảo Tàng Mỹ Thuật!`);
    
    // Update live nameplate if student
    if (document.getElementById('plate-artist')) {
        document.getElementById('plate-artist').textContent = '— Họa sĩ: ' + currentUser + ' —';
    }
}

// ========================================================
// 🧭 NAVIGATION & SECTIONS
// ========================================================
function showSection(sectionName) {
    document.querySelectorAll('.section').forEach(s => s.classList.add('hidden'));
    
    const target = document.getElementById('section-' + sectionName);
    if (target) target.classList.remove('hidden');
    
    document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.toggle('active', link.dataset.section === sectionName);
    });

    if (sectionName === 'gallery') {
        populateClassFilter();
        renderGallery();
        updateMuseumStats();
    } else if (sectionName === 'hall-of-fame') {
        renderHallOfFame();
    }

    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// ========================================================
// 🖼️ GALLERY RENDERING & FILTERS
// ========================================================
function populateClassFilter() {
    const classSelect = document.getElementById('filter-class');
    if (!classSelect) return;
    const currentVal = classSelect.value;
    const artworks = getArtworks();
    const classes = Array.from(new Set(artworks.map(a => a.className).filter(Boolean))).sort();

    classSelect.innerHTML = '<option value="all">🏫 Tất cả khối/lớp</option>';
    classes.forEach(c => {
        const opt = document.createElement('option');
        opt.value = c;
        opt.textContent = 'Lớp ' + c;
        classSelect.appendChild(opt);
    });
    classSelect.value = currentVal || 'all';
}

function handleSearch(val) {
    searchQuery = val.trim().toLowerCase();
    renderGallery();
}

function handleClassFilter(val) {
    currentClassFilter = val;
    renderGallery();
}

function handleMediumFilter(val) {
    currentMediumFilter = val;
    renderGallery();
}

function filterArtworks(filterType) {
    currentFilter = filterType;
    document.querySelectorAll('.filter-pills .filter-btn').forEach(btn => {
        btn.classList.toggle('active', btn.dataset.filter === filterType);
    });
    renderGallery();
}

function renderGallery() {
    const wall = document.getElementById('gallery-wall');
    const emptyState = document.getElementById('empty-gallery');
    let artworks = getArtworks();

    // 1. Filter by Search Query
    if (searchQuery) {
        artworks = artworks.filter(a => 
            (a.title && a.title.toLowerCase().includes(searchQuery)) ||
            (a.artist && a.artist.toLowerCase().includes(searchQuery)) ||
            (a.description && a.description.toLowerCase().includes(searchQuery)) ||
            (a.className && a.className.toLowerCase().includes(searchQuery))
        );
    }

    // 2. Filter by Class
    if (currentClassFilter !== 'all') {
        artworks = artworks.filter(a => a.className === currentClassFilter);
    }

    // 3. Filter by Medium
    if (currentMediumFilter !== 'all') {
        artworks = artworks.filter(a => a.medium && a.medium.includes(currentMediumFilter));
    }

    // 4. Filter by Status/Pill
    switch (currentFilter) {
        case 'recent':
            artworks = [...artworks].sort((a, b) => b.timestamp - a.timestamp);
            break;
        case 'top-rated':
            artworks = [...artworks]
                .filter(a => a.grade !== null && a.grade !== undefined)
                .sort((a, b) => b.grade - a.grade);
            break;
        case 'ungraded':
            artworks = [...artworks].filter(a => a.grade === null || a.grade === undefined);
            break;
        case 'commented':
            artworks = [...artworks].filter(a => a.comment || (a.comments && a.comments.length > 0));
            break;
        default:
            artworks = [...artworks].sort((a, b) => b.timestamp - a.timestamp);
            break;
    }

    if (artworks.length === 0) {
        wall.classList.add('hidden');
        emptyState.classList.remove('hidden');
    } else {
        wall.classList.remove('hidden');
        emptyState.classList.add('hidden');
        wall.innerHTML = artworks.map((art, index) => createArtworkCardHTML(art, index)).join('');
    }

    updateMuseumStats();
}

function createArtworkCardHTML(art, index) {
    let gradeBadgeHTML = '';
    if (art.grade !== null && art.grade !== undefined) {
        const badgeClass = art.grade >= 9.0 ? 'grade-high' : art.grade >= 7.0 ? 'grade-medium' : 'grade-low';
        gradeBadgeHTML = `<div class="card-grade-badge ${badgeClass}" title="Điểm giáo viên chấm">${art.grade}</div>`;
    } else {
        gradeBadgeHTML = `<div class="card-ungraded-badge">⏳ Chờ chấm</div>`;
    }

    const likeCount = art.likes || 0;
    const likePill = `<div class="card-like-pill">❤️ ${likeCount}</div>`;
    const frameClass = art.frame || 'classic-gold';
    const matClass = art.mat || 'mat-cream';

    return `
    <div class="artwork-card" onclick="openArtworkDetail('${art.id}')" style="animation-delay: ${index * 0.08}s">
        ${gradeBadgeHTML}
        ${likePill}
        <div class="artwork-frame ${frameClass}">
            <div class="artwork-mat ${matClass}">
                <img class="artwork-image" src="${art.imageData}" alt="${escapeHtml(art.title)}" loading="lazy">
            </div>
        </div>
        <div class="artwork-nameplate">
            <span class="nameplate-title">${escapeHtml(art.title)}</span>
            <span class="nameplate-artist">— Họa sĩ: ${escapeHtml(art.artist)} ${art.className ? `(Lớp ${escapeHtml(art.className)})` : ''} —</span>
            <span class="nameplate-sub">${escapeHtml(art.medium || 'Tự do')} • ${formatDate(art.timestamp)}</span>
        </div>
    </div>`;
}

function updateMuseumStats() {
    const artworks = getArtworks();
    const total = artworks.length;
    const graded = artworks.filter(a => a.grade !== null && a.grade !== undefined);
    const avg = graded.length > 0 ? (graded.reduce((acc, a) => acc + Number(a.grade), 0) / graded.length).toFixed(1) : '0.0';
    const totalLikes = artworks.reduce((acc, a) => acc + (a.likes || 0), 0);

    const elTotal = document.getElementById('stat-total');
    const elGraded = document.getElementById('stat-graded');
    const elAvg = document.getElementById('stat-avg');
    const elLikes = document.getElementById('stat-likes');

    if (elTotal) elTotal.textContent = total;
    if (elGraded) elGraded.textContent = graded.length;
    if (elAvg) elAvg.textContent = avg;
    if (elLikes) elLikes.textContent = totalLikes;
}

// ========================================================
// 🏆 HALL OF FAME (ĐIỆN VINH DANH >= 9.0)
// ========================================================
function renderHallOfFame() {
    const wall = document.getElementById('hall-wall');
    const emptyState = document.getElementById('empty-hall');
    
    const topArtworks = getArtworks()
        .filter(a => a.grade && Number(a.grade) >= 9.0)
        .sort((a, b) => Number(b.grade) - Number(a.grade));

    if (topArtworks.length === 0) {
        wall.classList.add('hidden');
        emptyState.classList.remove('hidden');
    } else {
        wall.classList.remove('hidden');
        emptyState.classList.add('hidden');
        
        wall.innerHTML = topArtworks.map((art, idx) => `
            <div class="hall-card artwork-card" onclick="openArtworkDetail('${art.id}')" style="animation-delay: ${idx * 0.1}s">
                <div class="hall-star">${idx === 0 ? '👑' : idx === 1 ? '⭐' : '✨'}</div>
                <div class="card-grade-badge grade-high">${art.grade}</div>
                <div class="artwork-frame baroque">
                    <div class="artwork-mat ${art.mat || 'mat-cream'}">
                        <img class="artwork-image" src="${art.imageData}" alt="${escapeHtml(art.title)}" loading="lazy">
                    </div>
                </div>
                <div class="artwork-nameplate">
                    <span class="nameplate-title">${escapeHtml(art.title)}</span>
                    <span class="nameplate-artist">— Họa sĩ: ${escapeHtml(art.artist)} ${art.className ? `(Lớp ${escapeHtml(art.className)})` : ''} —</span>
                    <span class="nameplate-sub">🏆 Kiệt tác xuất sắc • ${escapeHtml(art.medium || 'Hội họa')}</span>
                </div>
            </div>
        `).join('');
    }
}

// ========================================================
// 🎨 UPLOAD, IMAGE COMPRESSOR & LIVE FRAMING
// ========================================================
function selectFrame(frameKey) {
    selectedFrame = frameKey;
    document.querySelectorAll('.frame-option').forEach(btn => {
        btn.classList.toggle('active', btn.dataset.frame === frameKey);
    });
    const previewOuter = document.getElementById('preview-outer-frame');
    if (previewOuter) {
        previewOuter.className = 'artwork-frame ' + frameKey;
    }
}

function selectMat(matKey) {
    selectedMat = matKey;
    document.querySelectorAll('.mat-option').forEach(btn => {
        btn.classList.toggle('active', btn.dataset.mat === matKey);
    });
    const previewMat = document.getElementById('preview-mat');
    if (previewMat) {
        previewMat.className = 'artwork-mat ' + matKey;
    }
}

// Intelligent Client-Side Canvas Image Compression
function compressAndLoadImage(file, callback) {
    const reader = new FileReader();
    reader.onload = (e) => {
        const img = new Image();
        img.onload = () => {
            const canvas = document.createElement('canvas');
            const MAX_DIM = 1200;
            let width = img.width;
            let height = img.height;

            if (width > height) {
                if (width > MAX_DIM) {
                    height = Math.round((height * MAX_DIM) / width);
                    width = MAX_DIM;
                }
            } else {
                if (height > MAX_DIM) {
                    width = Math.round((width * MAX_DIM) / height);
                    height = MAX_DIM;
                }
            }

            canvas.width = width;
            canvas.height = height;
            const ctx = canvas.getContext('2d');
            ctx.drawImage(img, 0, 0, width, height);
            
            // Compress to JPEG 0.82
            const compressedDataUrl = canvas.toDataURL('image/jpeg', 0.82);
            callback(compressedDataUrl);
        };
        img.src = e.target.result;
    };
    reader.readAsDataURL(file);
}

function handleArtworkFile(file) {
    if (!file || !file.type.startsWith('image/')) {
        showToast('⚠️', 'Vui lòng chọn tệp hình ảnh (PNG, JPG, WEBP)!');
        return;
    }

    showToast('⏳', 'Đang lồng tranh vào khung bảo tàng...');
    compressAndLoadImage(file, (dataUrl) => {
        uploadedImageData = dataUrl;
        const previewImg = document.getElementById('preview-image');
        const dropzoneContent = document.getElementById('dropzone-content');
        
        previewImg.src = uploadedImageData;
        previewImg.classList.remove('hidden');
        dropzoneContent.classList.add('hidden');
        showToast('✨', 'Đã tải ảnh lên khung thành công!');
    });
}

function resetUploadForm() {
    uploadedImageData = null;
    selectedFrame = 'classic-gold';
    selectedMat = 'mat-cream';

    document.getElementById('file-input').value = '';
    document.getElementById('preview-image').classList.add('hidden');
    document.getElementById('preview-image').src = '';
    document.getElementById('dropzone-content').classList.remove('hidden');

    document.getElementById('artwork-title').value = '';
    document.getElementById('artwork-desc').value = '';
    document.getElementById('artwork-medium').value = '';
    document.getElementById('artwork-class').value = '';
    document.getElementById('desc-count').textContent = '0';

    selectFrame('classic-gold');
    selectMat('mat-cream');

    document.getElementById('plate-title').textContent = 'Tên Tác Phẩm Nghệ Thuật';
    document.getElementById('plate-artist').textContent = '— Họa sĩ học sinh —';
    document.getElementById('plate-sub').textContent = 'Chất liệu • Năm 2026';
}

function submitArtwork() {
    if (!uploadedImageData) {
        showToast('⚠️', 'Vui lòng tải lên ảnh bức tranh của bạn trước!');
        return;
    }

    const title = document.getElementById('artwork-title').value.trim();
    if (!title) {
        showToast('⚠️', 'Vui lòng đặt tên cho tác phẩm nghệ thuật!');
        document.getElementById('artwork-title').focus();
        return;
    }

    const medium = document.getElementById('artwork-medium').value;
    if (!medium) {
        showToast('⚠️', 'Vui lòng chọn chất liệu / kỹ thuật vẽ!');
        document.getElementById('artwork-medium').focus();
        return;
    }

    const className = document.getElementById('artwork-class').value.trim();
    if (!className) {
        showToast('⚠️', 'Vui lòng nhập tên lớp học của bạn!');
        document.getElementById('artwork-class').focus();
        return;
    }

    const desc = document.getElementById('artwork-desc').value.trim();
    const artistName = currentUser || 'Học sinh';

    const newArtwork = {
        id: generateId(),
        title: title,
        description: desc || 'Tác phẩm mỹ thuật sáng tác bởi học sinh.',
        medium: medium,
        className: className,
        artist: artistName,
        frame: selectedFrame,
        mat: selectedMat,
        imageData: uploadedImageData,
        timestamp: Date.now(),
        grade: null,
        teacherName: null,
        comment: null,
        suggestion: null,
        rubric: null,
        badges: [],
        likes: 1,
        likedBy: [],
        comments: []
    };

    const artworks = getArtworks();
    artworks.unshift(newArtwork);
    saveArtworks(artworks);

    showToast('🎉', `Chúc mừng! Tác phẩm "${title}" đã được treo lên tường Bảo Tàng!`);
    resetUploadForm();

    setTimeout(() => {
        showSection('gallery');
    }, 600);
}

// ========================================================
// 🔍 ARTWORK DETAIL MODAL, GRADING & INTERACTION
// ========================================================
function openArtworkDetail(artworkId) {
    const artworks = getArtworks();
    const art = artworks.find(a => a.id === artworkId);
    if (!art) return;

    selectedArtworkId = artworkId;

    // Artwork image & framing
    document.getElementById('detail-image').src = art.imageData;
    document.getElementById('detail-frame').className = 'artwork-frame ' + (art.frame || 'classic-gold');
    document.getElementById('detail-mat').className = 'artwork-mat ' + (art.mat || 'mat-cream');

    // Plaque details
    document.getElementById('detail-title').textContent = art.title;
    document.getElementById('detail-artist').textContent = art.artist;
    document.getElementById('detail-class-badge').textContent = art.className ? ('Lớp ' + art.className) : '';
    document.getElementById('detail-medium').textContent = 'Chất liệu: ' + (art.medium || 'Hội họa');
    document.getElementById('detail-date').textContent = formatDate(art.timestamp);
    document.getElementById('detail-desc').textContent = art.description || 'Chưa có ghi chú mô tả.';

    // Like count & state
    updateDetailLikeState(art);

    // Grade status & Circle
    const gradeCircle = document.getElementById('grade-circle');
    const gradeValue = document.getElementById('grade-value');
    const gradeHeading = document.getElementById('grade-status-heading');
    const gradeEvaluator = document.getElementById('grade-evaluator');
    const badgesDisplay = document.getElementById('grade-badges-display');
    const rubricDisplay = document.getElementById('rubric-display');

    if (art.grade !== null && art.grade !== undefined) {
        gradeValue.textContent = art.grade;
        gradeCircle.className = 'grade-badge-circle ' + (art.grade >= 9.0 ? 'grade-high' : art.grade >= 7.0 ? 'grade-medium' : 'grade-low');
        gradeHeading.textContent = art.grade >= 9.0 ? 'Kiệt Tác Xuất Sắc 🏆' : art.grade >= 8.0 ? 'Tác Phẩm Giỏi ✨' : 'Đã Được Đánh Giá';
        gradeEvaluator.textContent = 'Đánh giá bởi: ' + (art.teacherName || 'Giáo viên Mỹ Thuật');

        // Badges
        if (art.badges && art.badges.length > 0) {
            badgesDisplay.innerHTML = art.badges.map(b => `<span class="honor-badge-tag">${b}</span>`).join('');
        } else {
            badgesDisplay.innerHTML = '';
        }

        // Rubrics
        if (art.rubric) {
            rubricDisplay.classList.remove('hidden');
            document.getElementById('rubric-val-comp').textContent = art.rubric.comp || 'Đạt';
            document.getElementById('rubric-val-color').textContent = art.rubric.color || 'Đạt';
            document.getElementById('rubric-val-tech').textContent = art.rubric.tech || 'Đạt';
            document.getElementById('rubric-val-creativity').textContent = art.rubric.creativity || 'Đạt';
        } else {
            rubricDisplay.classList.add('hidden');
        }
    } else {
        gradeValue.textContent = '—';
        gradeCircle.className = 'grade-badge-circle';
        gradeHeading.textContent = 'Chờ Giáo Viên Đánh Giá ⏳';
        gradeEvaluator.textContent = 'Tác phẩm đang được trưng bày chờ chấm điểm';
        badgesDisplay.innerHTML = '';
        rubricDisplay.classList.add('hidden');
    }

    // Role-specific Panels (Teacher grading panel vs Feedback view)
    const teacherPanel = document.getElementById('teacher-panel');
    const feedbackDisplay = document.getElementById('feedback-display');
    const deleteBtn = document.getElementById('btn-delete');

    if (currentRole === 'teacher') {
        teacherPanel.classList.remove('hidden');
        feedbackDisplay.classList.add('hidden');
        deleteBtn.classList.remove('hidden'); // Teacher has curator deletion rights

        // Populate slider & inputs with existing or default
        const score = art.grade !== null ? art.grade : 8.5;
        document.getElementById('grade-slider').value = score;
        document.getElementById('grade-preview').textContent = score;

        document.getElementById('teacher-comment').value = art.comment || '';
        document.getElementById('teacher-suggestion').value = art.suggestion || '';

        // Rubric selects
        if (art.rubric) {
            document.getElementById('rubric-comp').value = art.rubric.comp || 'Hài hòa, chặt chẽ (Tốt)';
            document.getElementById('rubric-color').value = art.rubric.color || 'Hòa sắc ấn tượng, tương phản tốt (Tốt)';
            document.getElementById('rubric-tech').value = art.rubric.tech || 'Làm chủ chất liệu, nét vẽ tự tin (Tốt)';
            document.getElementById('rubric-creativity').value = art.rubric.creativity || 'Ý tưởng độc đáo, giàu cảm xúc (Tốt)';
        }

        // Badges
        document.getElementById('badge-creative').checked = art.badges && art.badges.includes('🌟 Sáng Tạo Vượt Bậc');
        document.getElementById('badge-color').checked = art.badges && art.badges.includes('🎨 Phối Màu Xuất Sắc');
        document.getElementById('badge-line').checked = art.badges && art.badges.includes('✍️ Đường Nét Tinh Tế');
        document.getElementById('badge-story').checked = art.badges && art.badges.includes('💡 Ý Tưởng Truyền Cảm Hứng');

    } else {
        teacherPanel.classList.add('hidden');

        // Show feedback if graded
        if (art.comment || art.grade !== null) {
            feedbackDisplay.classList.remove('hidden');
            document.getElementById('feedback-comment').textContent = art.comment || 'Chưa có nhận xét văn bản.';
            
            if (art.suggestion) {
                document.getElementById('feedback-suggestion').classList.remove('hidden');
                document.getElementById('suggestion-text').textContent = art.suggestion;
            } else {
                document.getElementById('feedback-suggestion').classList.add('hidden');
            }
        } else {
            feedbackDisplay.classList.add('hidden');
        }

        // Allow student to delete only their own artwork
        if (art.artist === currentUser) {
            deleteBtn.classList.remove('hidden');
        } else {
            deleteBtn.classList.add('hidden');
        }
    }

    // Render Student Comments List
    renderArtworkComments(art);

    // Show modal & freeze background scroll
    document.getElementById('artwork-modal').classList.remove('hidden');
    document.body.style.overflow = 'hidden';
}

function closeArtworkModal() {
    document.getElementById('artwork-modal').classList.add('hidden');
    document.body.style.overflow = '';
    selectedArtworkId = null;
}

function updateGradePreview(val) {
    document.getElementById('grade-preview').textContent = val;
}

function submitGrade() {
    if (!selectedArtworkId) return;

    const grade = parseFloat(document.getElementById('grade-slider').value);
    const comment = document.getElementById('teacher-comment').value.trim();
    const suggestion = document.getElementById('teacher-suggestion').value.trim();

    if (!comment) {
        showToast('⚠️', 'Vui lòng viết lời nhận xét chuyên môn để động viên học sinh!');
        document.getElementById('teacher-comment').focus();
        return;
    }

    // Collect badges
    const badges = [];
    if (document.getElementById('badge-creative').checked) badges.push('🌟 Sáng Tạo Vượt Bậc');
    if (document.getElementById('badge-color').checked) badges.push('🎨 Phối Màu Xuất Sắc');
    if (document.getElementById('badge-line').checked) badges.push('✍️ Đường Nét Tinh Tế');
    if (document.getElementById('badge-story').checked) badges.push('💡 Ý Tưởng Truyền Cảm Hứng');

    // Collect rubrics
    const rubric = {
        comp: document.getElementById('rubric-comp').value,
        color: document.getElementById('rubric-color').value,
        tech: document.getElementById('rubric-tech').value,
        creativity: document.getElementById('rubric-creativity').value
    };

    const teacherName = currentUser && currentUser.includes('Giáo') ? currentUser : (currentUser + ' (GV Mỹ Thuật)');

    const artworks = getArtworks();
    const idx = artworks.findIndex(a => a.id === selectedArtworkId);
    if (idx !== -1) {
        artworks[idx].grade = grade;
        artworks[idx].teacherName = teacherName;
        artworks[idx].comment = comment;
        artworks[idx].suggestion = suggestion;
        artworks[idx].badges = badges;
        artworks[idx].rubric = rubric;
        saveArtworks(artworks);

        showToast('✅', `Đã lưu đánh giá: ${grade} điểm và lời nhận xét chuyên môn!`);
        openArtworkDetail(selectedArtworkId); // Refresh modal view
        renderGallery();
    }
}

// ========================================================
// ❤️ LIKE / APPRECIATION & DISCUSSION
// ========================================================
function handleLikeArtwork() {
    if (!selectedArtworkId) return;
    const artworks = getArtworks();
    const idx = artworks.findIndex(a => a.id === selectedArtworkId);
    if (idx === -1) return;

    const art = artworks[idx];
    art.likes = (art.likes || 0) + 1;
    saveArtworks(artworks);

    updateDetailLikeState(art);
    showToast('❤️', 'Cảm ơn bạn đã yêu thích và cổ vũ tác phẩm!');
    renderGallery();
}

function updateDetailLikeState(art) {
    const countEl = document.getElementById('like-count-display');
    const iconEl = document.getElementById('like-icon');
    if (countEl) countEl.textContent = art.likes || 0;
    if (iconEl) iconEl.textContent = '❤️';
}

function submitStudentComment() {
    if (!selectedArtworkId) return;
    const input = document.getElementById('student-comment-input');
    const text = input.value.trim();
    if (!text) return;

    const artworks = getArtworks();
    const idx = artworks.findIndex(a => a.id === selectedArtworkId);
    if (idx === -1) return;

    if (!artworks[idx].comments) artworks[idx].comments = [];
    artworks[idx].comments.push({
        author: currentUser || 'Khách tham quan',
        text: text,
        time: 'Vừa xong'
    });

    saveArtworks(artworks);
    input.value = '';
    renderArtworkComments(artworks[idx]);
    showToast('💬', 'Đã gửi lời bình luận đến tác giả!');
}

function renderArtworkComments(art) {
    const list = document.getElementById('comments-list');
    const count = document.getElementById('comments-count');
    const comments = art.comments || [];

    if (count) count.textContent = comments.length;

    if (comments.length === 0) {
        list.innerHTML = `<p style="font-family: var(--font-ui); font-size: 0.85rem; color: rgba(250,244,230,0.4); text-align: center; padding: 10px;">Chưa có bình luận nào. Hãy là người đầu tiên để lại lời khen!</p>`;
    } else {
        list.innerHTML = comments.map(c => `
            <div class="comment-item">
                <div class="comment-header-row">
                    <span class="comment-author">${escapeHtml(c.author)}</span>
                    <span class="comment-time">${escapeHtml(c.time || '')}</span>
                </div>
                <p class="comment-text">${escapeHtml(c.text)}</p>
            </div>
        `).join('');
        list.scrollTop = list.scrollHeight;
    }
}

// ========================================================
// 📜 PRINTABLE EXHIBITION CERTIFICATE
// ========================================================
function printExhibitionCertificate() {
    if (!selectedArtworkId) return;
    const artworks = getArtworks();
    const art = artworks.find(a => a.id === selectedArtworkId);
    if (!art) return;

    document.getElementById('cert-artist-name').textContent = art.artist.toUpperCase();
    document.getElementById('cert-class-name').textContent = art.className || 'Trường THCS-THPT';
    document.getElementById('cert-artwork-title').textContent = `"${art.title}"`;
    document.getElementById('cert-artwork-medium').textContent = art.medium || 'Hội họa tự do';
    document.getElementById('cert-artwork-grade').textContent = art.grade ? `${art.grade}/10` : 'Đã Trưng Bày';
    document.getElementById('cert-teacher-name').textContent = art.teacherName || 'Hội Đồng Mỹ Thuật Học Đường';
    
    const today = new Date();
    document.getElementById('cert-date').textContent = `Ngày ${today.getDate()} tháng ${today.getMonth() + 1} năm ${today.getFullYear()}`;

    document.getElementById('certificate-modal').classList.remove('hidden');
}

function closeCertificateModal() {
    document.getElementById('certificate-modal').classList.add('hidden');
}

// ========================================================
// 🗑️ DELETION & RESET MANAGEMENT
// ========================================================
function deleteArtwork() {
    if (!selectedArtworkId) return;
    if (!confirm('Bạn có chắc chắn muốn gỡ tác phẩm này khỏi tường bảo tàng? Hành động này không thể hoàn tác.')) return;

    let artworks = getArtworks();
    artworks = artworks.filter(a => a.id !== selectedArtworkId);
    saveArtworks(artworks);

    closeArtworkModal();
    showToast('🗑️', 'Đã gỡ tác phẩm khỏi triển lãm');
    renderGallery();
}

function clearAllArtworks() {
    if (!confirm('Bạn có muốn đặt lại toàn bộ phòng tranh về trạng thái ban đầu?')) return;
    localStorage.removeItem(STORAGE_KEYS.artworks);
    getArtworks(); // Will reload 4 fresh demo masterpieces
    populateClassFilter();
    renderGallery();
    showToast('✨', 'Đã làm mới không gian bảo tàng!');
}

function loadDemoData() {
    const presets = getInitialPresetArtworks();
    saveArtworks(presets);
    populateClassFilter();
    renderGallery();
    showToast('🎨', 'Đã nạp 4 kiệt tác mẫu học đường vào phòng tranh!');
}

// ========================================================
// 🎵 AMBIENT MUSEUM MUSIC (WEB AUDIO SYNTHESIZER)
// ========================================================
function toggleMuseumAudio() {
    const icon = document.getElementById('audio-icon');
    if (!isAudioPlaying) {
        startAmbientSynthesizer();
        isAudioPlaying = true;
        if (icon) icon.textContent = '🔊';
        showToast('🎵', 'Đang phát âm thanh thư giãn không gian bảo tàng');
    } else {
        stopAmbientSynthesizer();
        isAudioPlaying = false;
        if (icon) icon.textContent = '🔇';
        showToast('🔇', 'Đã tắt âm thanh bảo tàng');
    }
}

function startAmbientSynthesizer() {
    try {
        const AudioContextClass = window.AudioContext || window.webkitAudioContext;
        if (!AudioContextClass) return;
        if (!audioContext) audioContext = new AudioContextClass();
        if (audioContext.state === 'suspended') audioContext.resume();

        // Pentatonic peaceful chords (C, E, G, A, B)
        const notes = [261.63, 329.63, 392.00, 440.00, 493.88, 523.25];

        function playSoftChime() {
            if (!isAudioPlaying || !audioContext) return;
            const osc = audioContext.createOscillator();
            const gain = audioContext.createGain();

            const note = notes[Math.floor(Math.random() * notes.length)];
            osc.type = 'sine';
            osc.frequency.setValueAtTime(note, audioContext.currentTime);

            gain.gain.setValueAtTime(0.0001, audioContext.currentTime);
            gain.gain.exponentialRampToValueAtTime(0.04, audioContext.currentTime + 1.2);
            gain.gain.exponentialRampToValueAtTime(0.0001, audioContext.currentTime + 4.5);

            osc.connect(gain);
            gain.connect(audioContext.destination);

            osc.start();
            osc.stop(audioContext.currentTime + 5.0);
        }

        playSoftChime();
        audioInterval = setInterval(playSoftChime, 3800);
    } catch (e) {
        console.error('Web Audio error:', e);
    }
}

function stopAmbientSynthesizer() {
    if (audioInterval) clearInterval(audioInterval);
}

// ========================================================
// 🔔 TOAST NOTIFICATIONS & UTILITIES
// ========================================================
function showToast(icon, message) {
    const toast = document.getElementById('toast');
    if (!toast) return;
    document.getElementById('toast-icon').textContent = icon;
    document.getElementById('toast-message').textContent = message;

    toast.classList.remove('hidden');
    requestAnimationFrame(() => toast.classList.add('show'));

    setTimeout(() => {
        toast.classList.remove('show');
        setTimeout(() => toast.classList.add('hidden'), 400);
    }, 3200);
}

function escapeHtml(str) {
    if (!str) return '';
    const div = document.createElement('div');
    div.textContent = str;
    return div.innerHTML;
}

function formatDate(timestamp) {
    if (!timestamp) return 'Hôm nay';
    const d = new Date(timestamp);
    const day = d.getDate().toString().padStart(2, '0');
    const month = (d.getMonth() + 1).toString().padStart(2, '0');
    const year = d.getFullYear();
    return `${day}/${month}/${year}`;
}

// ========================================================
// ⚡ EVENT LISTENERS & LIFECYCLE
// ========================================================
document.addEventListener('DOMContentLoaded', () => {
    // Dropzone setup
    const dropzone = document.getElementById('upload-dropzone');
    const fileInput = document.getElementById('file-input');

    if (dropzone && fileInput) {
        dropzone.addEventListener('click', () => fileInput.click());

        dropzone.addEventListener('dragover', (e) => {
            e.preventDefault();
            dropzone.classList.add('dragover');
        });

        dropzone.addEventListener('dragleave', () => {
            dropzone.classList.remove('dragover');
        });

        dropzone.addEventListener('drop', (e) => {
            e.preventDefault();
            dropzone.classList.remove('dragover');
            const file = e.dataTransfer.files[0];
            if (file) handleArtworkFile(file);
        });

        fileInput.addEventListener('change', (e) => {
            const file = e.target.files[0];
            if (file) handleArtworkFile(file);
        });
    }

    // Live Title sync to frame plaque
    const titleInput = document.getElementById('artwork-title');
    if (titleInput) {
        titleInput.addEventListener('input', (e) => {
            const val = e.target.value.trim();
            document.getElementById('plate-title').textContent = val || 'Tên Tác Phẩm Nghệ Thuật';
        });
    }

    // Live Medium sync to plaque
    const mediumSelect = document.getElementById('artwork-medium');
    if (mediumSelect) {
        mediumSelect.addEventListener('change', (e) => {
            const val = e.target.value;
            document.getElementById('plate-sub').textContent = (val || 'Chất liệu') + ' • Năm 2026';
        });
    }

    // Live Desc length counter
    const descInput = document.getElementById('artwork-desc');
    if (descInput) {
        descInput.addEventListener('input', (e) => {
            document.getElementById('desc-count').textContent = e.target.value.length;
        });
    }

    // Enter key in name modal
    const nameInput = document.getElementById('user-name-input');
    if (nameInput) {
        nameInput.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') submitName();
        });
    }

    // ESC key closes modals
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            const certModal = document.getElementById('certificate-modal');
            const artModal = document.getElementById('artwork-modal');
            const nameModal = document.getElementById('name-modal');

            if (certModal && !certModal.classList.contains('hidden')) {
                closeCertificateModal();
            } else if (artModal && !artModal.classList.contains('hidden')) {
                closeArtworkModal();
            } else if (nameModal && !nameModal.classList.contains('hidden') && currentUser) {
                closeNameModal();
            }
        }
    });

    // Check previously stored role
    const savedRole = localStorage.getItem(STORAGE_KEYS.role);
    if (savedRole) {
        // Ready to restore or let user pick from entrance
    }
});
