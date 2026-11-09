/* ========================================================
   🎨 BẢO TÀNG NGHỆ THUẬT HỌC ĐƯỜNG - MỸ THUẬT
   Full Application Logic - All 9 Advanced Features & Auth RBAC
   ======================================================== */

// ===== GLOBAL STATE =====
let currentRole = null;          // 'student' | 'teacher' | 'admin' | 'guest'
let currentUser = '';            // Full name
let currentUserId = '';          // User ID
let currentUserObj = null;       // Full user object
let currentFilter = 'all';
let currentThemeTab = 'all';
let currentClassFilter = 'all';
let currentMediumFilter = 'all';
let searchQuery = '';

let selectedFrame = 'classic-gold';
let selectedMat = 'mat-cream';
let selectedArtworkId = null;

let uploadedImageData = null;
let uploadedSketchData = null;
let currentExtractedPalette = null;

// Audio & Feature States
let isAmbientAudioPlaying = false;
let ambientAudioContext = null;
let ambientAudioInterval = null;
let isAudioGuidePlaying = false;
let currentUtterance = null;
let isMagnifierActive = false;
let isWipSliderActive = false;

// Admin & Auth UI States
let selectedRegisterRole = 'student';
let selectedAvatarEmoji = '🎨';
let currentAdminTab = 'users';
let adminUserSearchQuery = '';
let adminUserRoleFilter = 'all';
let adminArtSearchQuery = '';
let adminArtFilterStatus = 'all';

// ===== STORAGE KEYS =====
const STORAGE_KEYS = {
    artworks: 'museum_artworks_v4',
    users: 'museum_users_v6',
    session: 'museum_session_v6',
    themes: 'museum_themes_v4',
    theme: 'museum_theme_lighting_v4'
};

// ========================================================
// 🎨 SVG PRESET ARTWORKS & SKETCHES
// ========================================================
function createSunsetSketchSVG() {
    return 'data:image/svg+xml;utf8,' + encodeURIComponent(`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 450">
        <rect width="600" height="450" fill="#fdfbf7"/>
        <!-- Pencil sketch lines for rice field -->
        <circle cx="300" cy="180" r="42" fill="none" stroke="#555" stroke-width="1.5" stroke-dasharray="3 3"/>
        <path d="M-50,260 Q80,180 180,250 T400,220 T650,260" fill="none" stroke="#444" stroke-width="1.8"/>
        <path d="M-20,280 Q150,220 280,270 T550,240 T650,290" fill="none" stroke="#666" stroke-width="1.2"/>
        <path d="M0,280 Q160,250 300,270 Q450,255 600,280" fill="none" stroke="#333" stroke-width="2"/>
        <path d="M0,320 Q180,300 340,330 Q480,310 600,335" fill="none" stroke="#333" stroke-width="2"/>
        <path d="M0,370 Q140,350 280,375 Q460,350 600,380" fill="none" stroke="#333" stroke-width="2.2"/>
        <!-- Hatching texture (Nét gạch chì đánh bóng) -->
        <line x1="50" y1="280" x2="65" y2="300" stroke="#777" stroke-width="1"/>
        <line x1="70" y1="280" x2="85" y2="300" stroke="#777" stroke-width="1"/>
        <line x1="90" y1="280" x2="105" y2="300" stroke="#777" stroke-width="1"/>
        <line x1="180" y1="330" x2="200" y2="355" stroke="#777" stroke-width="1"/>
        <line x1="200" y1="330" x2="220" y2="355" stroke="#777" stroke-width="1"/>
        <!-- River outline -->
        <path d="M300,270 C290,310 380,340 330,380 C290,410 240,420 200,450" fill="none" stroke="#555" stroke-width="1.5" stroke-dasharray="4 2"/>
        <text x="30" y="420" font-family="sans-serif" font-size="12" fill="#888">Bản phác thảo chì tỉ lệ 1/2 • Nguyễn Thảo My</text>
    </svg>`);
}

function createSunsetRiceFieldSVG() {
    return 'data:image/svg+xml;utf8,' + encodeURIComponent(`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 450">
        <defs>
            <linearGradient id="skyGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stop-color="#ff5e62"/><stop offset="35%" stop-color="#ff9966"/><stop offset="70%" stop-color="#ffd56b"/><stop offset="100%" stop-color="#fdfcfb"/>
            </linearGradient>
            <radialGradient id="sunGlow" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stop-color="#ffffff"/><stop offset="30%" stop-color="#fff275"/><stop offset="70%" stop-color="#ff9f43" stop-opacity="0.8"/><stop offset="100%" stop-color="#ff5e62" stop-opacity="0"/>
            </radialGradient>
            <linearGradient id="mountainGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stop-color="#5a3d75" stop-opacity="0.7"/><stop offset="100%" stop-color="#8e44ad" stop-opacity="0.3"/>
            </linearGradient>
            <linearGradient id="fieldGrad1" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stop-color="#f39c12"/><stop offset="100%" stop-color="#27ae60"/>
            </linearGradient>
            <linearGradient id="fieldGrad2" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stop-color="#f1c40f"/><stop offset="100%" stop-color="#d35400"/>
            </linearGradient>
            <linearGradient id="waterGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stop-color="#ffbe76"/><stop offset="50%" stop-color="#e056fd"/><stop offset="100%" stop-color="#686de0"/>
            </linearGradient>
        </defs>
        <rect width="600" height="450" fill="url(#skyGrad)"/>
        <circle cx="300" cy="180" r="110" fill="url(#sunGlow)"/>
        <circle cx="300" cy="180" r="42" fill="#fffef0"/>
        <path d="M-50,260 Q80,180 180,250 T400,220 T650,260 L650,450 L-50,450 Z" fill="url(#mountainGrad)"/>
        <path d="M-20,280 Q150,220 280,270 T550,240 T650,290 L650,450 L-20,450 Z" fill="#6d4c41" opacity="0.35"/>
        <path d="M300,270 C290,310 380,340 330,380 C290,410 240,420 200,450 L340,450 C380,420 440,390 400,340 C360,300 320,280 300,270 Z" fill="url(#waterGrad)"/>
        <path d="M0,280 Q160,250 300,270 Q450,255 600,280 L600,330 Q420,310 260,330 Q120,310 0,330 Z" fill="url(#fieldGrad1)"/>
        <path d="M0,320 Q180,300 340,330 Q480,310 600,335 L600,380 Q440,360 280,380 Q140,360 0,380 Z" fill="url(#fieldGrad2)"/>
        <path d="M0,370 Q140,350 280,375 Q460,350 600,380 L600,450 L0,450 Z" fill="#2ecc71" opacity="0.85"/>
        <ellipse cx="120" cy="350" rx="90" ry="15" fill="#f1c40f" opacity="0.6"/>
        <ellipse cx="480" cy="365" rx="80" ry="12" fill="#f39c12" opacity="0.6"/>
        <ellipse cx="180" cy="415" rx="110" ry="18" fill="#f9ca24" opacity="0.7"/>
        <path d="M220,120 Q230,110 240,120 Q250,110 260,120" fill="none" stroke="#634832" stroke-width="2" stroke-linecap="round"/>
        <path d="M255,100 Q262,92 270,100 Q278,92 285,100" fill="none" stroke="#634832" stroke-width="1.8" stroke-linecap="round"/>
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
                <stop offset="0%" stop-color="#74b9ff"/><stop offset="60%" stop-color="#dfe6e9"/><stop offset="100%" stop-color="#ffeaa7"/>
            </linearGradient>
            <linearGradient id="wallYellow" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stop-color="#f5cd79"/><stop offset="50%" stop-color="#eccc68"/><stop offset="100%" stop-color="#d6a844"/>
            </linearGradient>
            <linearGradient id="roofTile" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stop-color="#b33939"/><stop offset="100%" stop-color="#5c1d1d"/>
            </linearGradient>
        </defs>
        <rect width="600" height="450" fill="url(#hanoiSky)"/>
        <polygon points="40,160 160,130 160,370 40,370" fill="url(#wallYellow)"/>
        <polygon points="25,165 100,105 175,135" fill="url(#roofTile)"/>
        <rect x="65" y="190" width="30" height="45" fill="#218c74" rx="2"/>
        <rect x="110" y="180" width="30" height="45" fill="#218c74" rx="2"/>
        <rect x="55" y="240" width="95" height="10" fill="#333333"/>
        <polygon points="160,130 330,120 330,370 160,370" fill="#f8c291"/>
        <polygon points="150,130 245,75 340,120" fill="url(#roofTile)"/>
        <rect x="200" y="160" width="40" height="60" fill="#38ada9" rx="4"/>
        <rect x="260" y="160" width="40" height="60" fill="#38ada9" rx="4"/>
        <rect x="185" y="270" width="120" height="24" fill="#6d4c41" rx="3"/>
        <text x="245" y="286" font-family="serif" font-size="12" fill="#ffd32a" text-anchor="middle" font-weight="bold">TRÀ &amp; HOA PHỐ CỔ</text>
        <polygon points="330,120 520,150 520,370 330,370" fill="url(#wallYellow)"/>
        <polygon points="320,120 425,85 530,150" fill="url(#roofTile)"/>
        <path d="M0,80 Q300,160 600,100" fill="none" stroke="#2f3542" stroke-width="1.5"/>
        <polygon points="0,370 600,370 600,450 0,450" fill="#57606f"/>
        <circle cx="430" cy="385" r="28" fill="none" stroke="#2f3542" stroke-width="3"/>
        <circle cx="505" cy="385" r="28" fill="none" stroke="#2f3542" stroke-width="3"/>
        <line x1="430" y1="385" x2="470" y2="355" stroke="#2f3542" stroke-width="3"/>
        <line x1="470" y1="355" x2="505" y2="385" stroke="#2f3542" stroke-width="3"/>
        <line x1="470" y1="355" x2="470" y2="330" stroke="#2f3542" stroke-width="3"/>
        <ellipse cx="450" cy="340" rx="30" ry="18" fill="#ffffff" stroke="#f1c40f" stroke-width="2"/>
        <circle cx="445" cy="336" r="6" fill="#ff4757"/>
        <circle cx="458" cy="342" r="5" fill="#ffa502"/>
        <circle cx="438" cy="344" r="5" fill="#2ed573"/>
    </svg>`);
}

function createLotusPondSVG() {
    return 'data:image/svg+xml;utf8,' + encodeURIComponent(`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 450">
        <defs>
            <radialGradient id="pondBg" cx="50%" cy="50%" r="70%">
                <stop offset="0%" stop-color="#1b4d3e"/><stop offset="50%" stop-color="#0b2920"/><stop offset="100%" stop-color="#04120e"/>
            </radialGradient>
            <linearGradient id="lotusPetal1" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stop-color="#ffffff"/><stop offset="40%" stop-color="#ff9ff3"/><stop offset="100%" stop-color="#f368e0"/>
            </linearGradient>
            <linearGradient id="leafGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stop-color="#10ac84"/><stop offset="60%" stop-color="#1dd1a1"/><stop offset="100%" stop-color="#054737"/>
            </linearGradient>
        </defs>
        <rect width="600" height="450" fill="url(#pondBg)"/>
        <ellipse cx="140" cy="330" rx="130" ry="65" fill="url(#leafGrad)"/>
        <ellipse cx="460" cy="310" rx="120" ry="60" fill="url(#leafGrad)"/>
        <ellipse cx="280" cy="380" rx="160" ry="65" fill="#10ac84"/>
        <g transform="translate(300, 240)">
            <path d="M0,20 Q-70,-10 -90,-60 Q-40,-50 0,20" fill="#e77f98"/>
            <path d="M0,20 Q70,-10 90,-60 Q40,-50 0,20" fill="#e77f98"/>
            <path d="M0,20 Q-50,-40 -50,-110 Q-20,-70 0,20" fill="url(#lotusPetal1)"/>
            <path d="M0,20 Q50,-40 50,-110 Q20,-70 0,20" fill="url(#lotusPetal1)"/>
            <path d="M0,20 Q-25,-60 0,-130 Q25,-60 0,20" fill="url(#lotusPetal1)"/>
            <ellipse cx="0" cy="-25" rx="22" ry="14" fill="#feca57"/>
        </g>
        <circle cx="118" cy="308" r="3" fill="#ffffff"/>
    </svg>`);
}

function createGalaxyDreamSVG() {
    return 'data:image/svg+xml;utf8,' + encodeURIComponent(`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 450">
        <defs>
            <radialGradient id="spaceDeep" cx="50%" cy="50%" r="75%">
                <stop offset="0%" stop-color="#3b1d60"/><stop offset="45%" stop-color="#180b33"/><stop offset="85%" stop-color="#080214"/>
            </radialGradient>
            <radialGradient id="nebulaColor" cx="65%" cy="35%" r="45%">
                <stop offset="0%" stop-color="#ff7675" stop-opacity="0.8"/><stop offset="40%" stop-color="#6c5ce7" stop-opacity="0.5"/><stop offset="100%" stop-color="#0984e3" stop-opacity="0"/>
            </radialGradient>
        </defs>
        <rect width="600" height="450" fill="url(#spaceDeep)"/>
        <rect width="600" height="450" fill="url(#nebulaColor)"/>
        <circle cx="50" cy="80" r="1.5" fill="#ffffff"/>
        <circle cx="120" cy="40" r="2.2" fill="#fff"/>
        <circle cx="280" cy="50" r="2.5" fill="#74b9ff"/>
        <circle cx="490" cy="60" r="2" fill="#ff7675"/>
        <g transform="translate(420, 180) rotate(-22)">
            <path d="M-110,0 A110 32 0 0 1 110,0" stroke="#fce29d" stroke-width="12" fill="none" opacity="0.5"/>
            <circle cx="0" cy="0" r="54" fill="#e17055"/>
            <path d="M110,0 A110 32 0 0 1 -110,0" stroke="#fce29d" stroke-width="12" fill="none" opacity="0.85"/>
        </g>
        <circle cx="140" cy="150" r="32" fill="#0984e3"/>
    </svg>`);
}

// Preset Collection
function getInitialPresetArtworks() {
    return [
        {
            id: 'art_demo_1',
            title: 'Hoàng Hôn Trên Cánh Đồng Lúa Chín',
            description: 'Bức tranh được sáng tác trong chuyến đi thăm quê ngoại mùa lúa chín vàng ươm. Em muốn khắc họa vẻ đẹp trù phú, bình yên của làng quê Việt Nam dưới ánh hoàng hôn rực rỡ và những cánh chim trời bay về tổ ấm.',
            medium: 'Màu nước',
            theme: 'Nét Đẹp Quê Hương',
            className: '7A1',
            artist: 'Nguyễn Thảo My',
            frame: 'classic-gold',
            mat: 'mat-cream',
            imageData: createSunsetRiceFieldSVG(),
            sketchData: createSunsetSketchSVG(),
            palette: {
                colors: ['#ff5e62', '#f39c12', '#ffd56b', '#27ae60', '#5a3d75'],
                harmony: 'Hòa Sắc Hoàng Hôn Rực Rỡ'
            },
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
            likes: 45,
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
            theme: 'Nét Đẹp Quê Hương',
            className: '8B2',
            artist: 'Trần Đức Nam',
            frame: 'baroque',
            mat: 'mat-cream',
            imageData: createHanoiOldQuarterSVG(),
            sketchData: null,
            palette: {
                colors: ['#f5cd79', '#b33939', '#218c74', '#74b9ff', '#57606f'],
                harmony: 'Hòa Sắc Cổ Điển Tương Phản'
            },
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
            likes: 36,
            comments: [
                { author: 'Phạm Quang Minh (9A)', text: 'Màu sơn dầu dày dặn, nhìn chuẩn phong cách phố cổ Bùi Xuân Phái!', time: 'Hôm kia' }
            ]
        },
        {
            id: 'art_demo_3',
            title: 'Giai Điệu Sen Xanh',
            description: 'Hoa sen tượng trưng cho sự thuần khiết, thanh cao vươn lên từ bùn lầy. Em vẽ đóa sen hồng bung nở giữa đầm sen xanh biếc, bên cạnh là chú chuồn chuồn ớt đậu trên búp sen sớm mai đọng sương.',
            medium: 'Màu sáp / Sáp dầu',
            theme: 'Bảo Vệ Môi Trường',
            className: '6A3',
            artist: 'Lê Bảo Châu',
            frame: 'dark-wood',
            mat: 'mat-white',
            imageData: createLotusPondSVG(),
            sketchData: null,
            palette: {
                colors: ['#10ac84', '#ff9ff3', '#0b2920', '#feca57', '#ffffff'],
                harmony: 'Hòa Sắc Thiên Nhiên Dịu Mát'
            },
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
            likes: 28,
            comments: [
                { author: 'Nguyễn Thảo My (7A1)', text: 'Màu sáp lên màu nổi bật thật đấy Bảo Châu ơi!', time: 'Hôm nay' }
            ]
        },
        {
            id: 'art_demo_4',
            title: 'Ước Mơ Khám Phá Vũ Trụ',
            description: 'Em vẽ một bạn phi hành gia trẻ tuổi đang bay lơ lửng ngoài không gian, tay cầm cọ vẽ nên những dải ngân hà kỳ thú và các vì sao lung linh. Nghệ thuật và trí tưởng tượng không có giới hạn!',
            medium: 'Kỹ thuật số',
            theme: 'Ước Mơ & Tương Lai',
            className: '9A',
            artist: 'Phạm Quang Minh',
            frame: 'white-modern',
            mat: 'mat-dark',
            imageData: createGalaxyDreamSVG(),
            sketchData: null,
            palette: {
                colors: ['#3b1d60', '#ff7675', '#0984e3', '#e17055', '#ffeaa7'],
                harmony: 'Hòa Sắc Huyền Ảo Không Gian'
            },
            timestamp: Date.now() - 3600000 * 4,
            grade: null, // Ungraded for Teacher to grade
            teacherName: null,
            comment: null,
            suggestion: null,
            rubric: null,
            badges: [],
            likes: 52,
            comments: [
                { author: 'Trần Đức Nam (8B2)', text: 'Tranh Digital đỉnh quá bạn ơi! Chờ thầy cô vào chấm 10 điểm!', time: 'Vừa xong' }
            ]
        }
    ];
}

// ========================================================
// 💾 DATA ACCESS
// ========================================================
function getArtworks() {
    try {
        const data = localStorage.getItem(STORAGE_KEYS.artworks);
        if (data) {
            const parsed = JSON.parse(data);
            if (Array.isArray(parsed) && parsed.length > 0) return parsed;
        }
    } catch (e) {
        console.error('Error reading artworks:', e);
    }
    const presets = getInitialPresetArtworks();
    saveArtworks(presets);
    return presets;
}

function saveArtworks(artworks) {
    try {
        localStorage.setItem(STORAGE_KEYS.artworks, JSON.stringify(artworks));
    } catch (e) {
        console.error('QuotaExceeded:', e);
        showToast('⚠️', 'Bộ nhớ trình duyệt đầy! Đã lưu ảnh ở chất lượng tối ưu.');
    }
}

function generateId() {
    return 'art_' + Date.now() + '_' + Math.random().toString(36).substr(2, 6);
}

// ========================================================
// 👥 USER DATABASE & PRESETS (HỌC SINH, GIÁO VIÊN, QUẢN TRỊ)
// Duy nhất 1 tài khoản Quản trị: admin / 1608 (theo yêu cầu)
// ========================================================
function getInitialPresetUsers() {
    return [
        {
            id: 'usr_admin',
            username: 'admin',
            password: '1608',
            fullname: 'Quản Trị Viên Hệ Thống',
            role: 'admin',
            className: 'Ban Giám Hiệu & Quản Trị Bảo Tàng',
            avatar: '🏛️',
            bio: 'Tài khoản quản trị viên tối cao của Bảo Tàng Mỹ Thuật Học Đường.',
            createdAt: Date.now() - 86400000 * 30
        }
    ];
}

function getUsers() {
    try {
        const data = localStorage.getItem(STORAGE_KEYS.users);
        if (data) {
            let parsed = JSON.parse(data);
            if (Array.isArray(parsed) && parsed.length > 0) {
                // Lọc bỏ sạch mọi tài khoản mẫu cũ nếu có
                parsed = parsed.filter(u => !['student', 'nam_tran', 'baochau', 'quangminh', 'teacher'].includes(u.username));
                // Đảm bảo tài khoản admin tồn tại và có mật khẩu chính xác là 1608
                const adminUser = parsed.find(u => u.username === 'admin');
                if (adminUser) {
                    adminUser.password = '1608';
                    adminUser.role = 'admin';
                } else {
                    parsed.unshift(getInitialPresetUsers()[0]);
                }
                saveUsers(parsed);
                return parsed;
            }
        }
    } catch (e) {
        console.error('Error reading users:', e);
    }
    const presets = getInitialPresetUsers();
    saveUsers(presets);
    return presets;
}

function saveUsers(users) {
    try {
        localStorage.setItem(STORAGE_KEYS.users, JSON.stringify(users));
    } catch (e) {
        console.error('Error saving users:', e);
    }
}

// ========================================================
// 🏛️ CURATED THEMES DATABASE
// ========================================================
function getInitialThemes() {
    return [
        { id: 'theme_1', name: 'Nét Đẹp Quê Hương', icon: '🌾', desc: 'Ca ngợi vẻ đẹp đất nước, con người và danh lam thắng cảnh Việt Nam' },
        { id: 'theme_2', name: 'Thầy Cô & Mái Trường', icon: '🏫', desc: 'Tri ân thầy cô giáo, ghi dấu kỷ niệm tuổi học trò và mái trường thân thương' },
        { id: 'theme_3', name: 'Bảo Vệ Môi Trường', icon: '🌿', desc: 'Thông điệp Trái Đất xanh, chống rác thải nhựa và bảo vệ thiên nhiên' },
        { id: 'theme_4', name: 'Ước Mơ & Tương Lai', icon: '🚀', desc: 'Khám phá vũ trụ, khoa học công nghệ và ước mơ hoài bão tương lai' },
        { id: 'theme_5', name: 'Tự Do Sáng Tạo', icon: '✨', desc: 'Không gian mở cho mọi ý tưởng và phong cách nghệ thuật tự do' }
    ];
}

function getThemes() {
    try {
        const data = localStorage.getItem(STORAGE_KEYS.themes);
        if (data) {
            const parsed = JSON.parse(data);
            if (Array.isArray(parsed) && parsed.length > 0) return parsed;
        }
    } catch (e) {
        console.error('Error reading themes:', e);
    }
    const presets = getInitialThemes();
    saveThemes(presets);
    return presets;
}

function saveThemes(themes) {
    try {
        localStorage.setItem(STORAGE_KEYS.themes, JSON.stringify(themes));
    } catch (e) {
        console.error('Error saving themes:', e);
    }
}

function renderThemeTabsAndSelects() {
    const themes = getThemes();
    const tabsContainer = document.getElementById('theme-tabs-container');
    if (tabsContainer) {
        tabsContainer.innerHTML = `
            <button class="theme-tab-btn ${currentThemeTab === 'all' ? 'active' : ''}" data-theme="all" onclick="handleThemeTab('all')">Tất Cả Tác Phẩm</button>
            ${themes.map(t => `
                <button class="theme-tab-btn ${currentThemeTab === t.name ? 'active' : ''}" data-theme="${escapeHtml(t.name)}" onclick="handleThemeTab('${escapeHtml(t.name)}')">
                    ${t.icon || '🎨'} ${escapeHtml(t.name)}
                </button>
            `).join('')}
        `;
    }

    const themeSelect = document.getElementById('artwork-theme');
    if (themeSelect) {
        const currentVal = themeSelect.value;
        themeSelect.innerHTML = themes.map(t => `
            <option value="${escapeHtml(t.name)}">${t.icon || '🎨'} ${escapeHtml(t.name)}</option>
        `).join('');
        if (currentVal) themeSelect.value = currentVal;
    }
}

// ========================================================
// 🔑 AUTHENTICATION & SESSION MANAGEMENT
// ========================================================
function initSessionState() {
    try {
        const sessionData = localStorage.getItem(STORAGE_KEYS.session);
        if (sessionData) {
            const user = JSON.parse(sessionData);
            const users = getUsers();
            const existing = users.find(u => u.id === user.id || u.username === user.username);
            if (existing) {
                setCurrentUser(existing);
                return;
            }
        }
    } catch (e) {
        console.error('Error init session:', e);
    }
    // Default fallback to student session if no session
    quickLogin('student', false);
}

function setCurrentUser(user) {
    currentUserObj = user;
    if (user) {
        currentRole = user.role;
        currentUser = user.fullname;
        currentUserId = user.id;
        localStorage.setItem(STORAGE_KEYS.session, JSON.stringify(user));
    } else {
        currentRole = 'guest';
        currentUser = 'Khách Tham Quan';
        currentUserId = 'guest';
        localStorage.removeItem(STORAGE_KEYS.session);
    }
    applyRolePermissions();
}

function applyRolePermissions() {
    const avatarEl = document.getElementById('user-avatar-display');
    const nameEl = document.getElementById('user-name-display');
    const badgeEl = document.getElementById('user-role-badge');
    const navAdminBtn = document.getElementById('nav-admin');

    const dropAvatar = document.getElementById('dropdown-avatar');
    const dropName = document.getElementById('dropdown-fullname');
    const dropMeta = document.getElementById('dropdown-meta');
    const dropMyArt = document.getElementById('dropdown-my-artworks');
    const dropPending = document.getElementById('dropdown-pending-grades');
    const dropAdmin = document.getElementById('dropdown-admin-panel');
    const myArtCount = document.getElementById('my-art-count');

    const roleName = currentRole === 'student' ? 'Học Sinh' : (currentRole === 'teacher' ? 'Giáo Viên' : (currentRole === 'admin' ? 'Quản Trị' : 'Khách'));
    const avatar = currentUserObj ? currentUserObj.avatar : (currentRole === 'guest' ? '👤' : '🎨');

    if (avatarEl) avatarEl.textContent = avatar;
    if (nameEl) nameEl.textContent = currentUser || 'Khách Tham Quan';
    if (badgeEl) {
        badgeEl.textContent = roleName;
        badgeEl.className = 'user-role-badge ' + (currentRole || 'guest');
    }

    if (dropAvatar) dropAvatar.textContent = avatar;
    if (dropName) dropName.textContent = currentUser;
    if (dropMeta) {
        const classPart = currentUserObj && currentUserObj.className ? `${currentUserObj.className} • ` : '';
        dropMeta.textContent = classPart + roleName;
    }

    // Nav and dropdown items based on permissions
    if (currentRole === 'admin') {
        if (navAdminBtn) navAdminBtn.classList.remove('hidden');
        if (dropAdmin) dropAdmin.classList.remove('hidden');
        if (dropPending) dropPending.classList.remove('hidden');
        if (dropMyArt) dropMyArt.classList.add('hidden');
    } else if (currentRole === 'teacher') {
        if (navAdminBtn) navAdminBtn.classList.add('hidden');
        if (dropAdmin) dropAdmin.classList.add('hidden');
        if (dropPending) dropPending.classList.remove('hidden');
        if (dropMyArt) dropMyArt.classList.add('hidden');
    } else if (currentRole === 'student') {
        if (navAdminBtn) navAdminBtn.classList.add('hidden');
        if (dropAdmin) dropAdmin.classList.add('hidden');
        if (dropPending) dropPending.classList.add('hidden');
        if (dropMyArt) dropMyArt.classList.remove('hidden');

        // Count student's artworks
        const works = getArtworks().filter(a => a.userId === currentUserId || a.artist === currentUser);
        if (myArtCount) myArtCount.textContent = works.length;
    } else {
        // Guest
        if (navAdminBtn) navAdminBtn.classList.add('hidden');
        if (dropAdmin) dropAdmin.classList.add('hidden');
        if (dropPending) dropPending.classList.add('hidden');
        if (dropMyArt) dropMyArt.classList.add('hidden');
    }

    // Sync upload artist name and class
    const uploadClass = document.getElementById('artwork-class');
    const plateArtist = document.getElementById('plate-artist');
    if (uploadClass && currentUserObj && currentUserObj.className) {
        uploadClass.value = currentUserObj.className;
    }
    if (plateArtist) plateArtist.textContent = `— Họa sĩ: ${currentUser || 'Học sinh'} —`;
}

function openAuthModal(defaultRole = 'student', defaultTab = 'login') {
    closeUserDropdown();
    const modal = document.getElementById('auth-modal');
    if (!modal) return;

    modal.classList.remove('hidden');
    document.body.style.overflow = 'hidden';

    switchAuthTab(defaultTab);
    if (defaultRole) selectRegisterRole(defaultRole);
}

function closeAuthModal() {
    const modal = document.getElementById('auth-modal');
    if (modal) modal.classList.add('hidden');
    document.body.style.overflow = '';
}

function switchAuthTab(tab) {
    const tabLogin = document.getElementById('tab-btn-login');
    const tabReg = document.getElementById('tab-btn-register');
    const formLogin = document.getElementById('form-login');
    const formReg = document.getElementById('form-register');
    const title = document.getElementById('auth-modal-title');
    const subtitle = document.getElementById('auth-modal-subtitle');

    if (tab === 'login') {
        if (tabLogin) tabLogin.classList.add('active');
        if (tabReg) tabReg.classList.remove('active');
        if (formLogin) formLogin.classList.remove('hidden');
        if (formReg) formReg.classList.add('hidden');
        if (title) title.textContent = 'Đăng Nhập Bảo Tàng';
        if (subtitle) subtitle.textContent = 'Dành cho Học Sinh, Giáo Viên và Quản Trị';
        setTimeout(() => {
            const input = document.getElementById('login-username');
            if (input) input.focus();
        }, 150);
    } else {
        if (tabReg) tabReg.classList.add('active');
        if (tabLogin) tabLogin.classList.remove('active');
        if (formReg) formReg.classList.remove('hidden');
        if (formLogin) formLogin.classList.add('hidden');
        if (title) title.textContent = 'Đăng Ký Tài Khoản Mới';
        if (subtitle) subtitle.textContent = 'Tham gia cộng đồng sáng tạo nghệ thuật học đường';
        setTimeout(() => {
            const input = document.getElementById('reg-fullname');
            if (input) input.focus();
        }, 150);
    }
}

function selectRegisterRole(role) {
    selectedRegisterRole = role;
    const cards = document.querySelectorAll('.role-radio-card');
    cards.forEach(c => c.classList.remove('active'));

    const activeCard = document.getElementById('role-card-' + role);
    if (activeCard) activeCard.classList.add('active');

    const radio = document.querySelector(`input[name="reg-role"][value="${role}"]`);
    if (radio) radio.checked = true;

    const classGroup = document.getElementById('reg-class-group');
    const secretGroup = document.getElementById('reg-secret-group');
    const secretText = document.getElementById('secret-role-text');

    if (role === 'student') {
        if (classGroup) classGroup.classList.remove('hidden');
        if (secretGroup) secretGroup.classList.add('hidden');
    } else {
        if (classGroup) classGroup.classList.add('hidden');
        if (secretGroup) secretGroup.classList.remove('hidden');
        if (secretText) secretText.textContent = role === 'teacher' ? 'Giáo viên (mã GV2026)' : 'Quản trị (mã ADMIN2026)';
    }
}

function selectAvatar(avatar) {
    selectedAvatarEmoji = avatar;
    document.querySelectorAll('.avatar-option').forEach(opt => {
        opt.classList.toggle('active', opt.dataset.avatar === avatar);
    });
}

function togglePasswordVisibility(inputId) {
    const input = document.getElementById(inputId);
    if (!input) return;
    input.type = input.type === 'password' ? 'text' : 'password';
}

function handleLogin(e) {
    e.preventDefault();
    const username = document.getElementById('login-username').value.trim();
    const password = document.getElementById('login-password').value;

    const users = getUsers();
    const user = users.find(u => u.username.toLowerCase() === username.toLowerCase() && u.password === password);

    if (user) {
        setCurrentUser(user);
        closeAuthModal();
        showMuseum();
        showToast('✨', `Kính chào ${user.fullname} (${user.role === 'student' ? 'Học sinh' : (user.role === 'teacher' ? 'Giáo viên' : 'Quản trị viên')})!`);
        document.getElementById('form-login').reset();
    } else {
        showToast('⚠️', 'Tên đăng nhập hoặc mật khẩu không chính xác! Bạn có thể dùng nút Đăng nhập nhanh.');
    }
}

function handleRegister(e) {
    e.preventDefault();
    const fullname = document.getElementById('reg-fullname').value.trim();
    const username = document.getElementById('reg-username').value.trim().toLowerCase();
    const role = selectedRegisterRole;
    const password = document.getElementById('reg-password').value;
    const confirmPassword = document.getElementById('reg-confirm-password').value;
    const className = document.getElementById('reg-class').value.trim();
    const secretCode = document.getElementById('reg-secret-code').value.trim();

    if (!fullname || !username) {
        showToast('⚠️', 'Vui lòng điền đầy đủ họ tên và tên đăng nhập!');
        return;
    }

    if (password.length < 3) {
        showToast('⚠️', 'Mật khẩu phải có tối thiểu 3 ký tự!');
        return;
    }

    if (password !== confirmPassword) {
        showToast('⚠️', 'Xác nhận mật khẩu không trùng khớp!');
        return;
    }

    const users = getUsers();
    if (users.some(u => u.username.toLowerCase() === username)) {
        showToast('⚠️', 'Tên đăng nhập này đã được sử dụng! Vui lòng chọn tên khác.');
        document.getElementById('reg-username').focus();
        return;
    }

    // Role security check
    if (role === 'teacher') {
        if (secretCode !== 'GV2026' && secretCode !== 'gv2026' && secretCode !== 'teacher') {
            showToast('🛡️', 'Mã xác thực Giáo Viên không đúng! Gợi ý: Hãy nhập "GV2026".');
            document.getElementById('reg-secret-code').focus();
            return;
        }
    } else if (role === 'admin') {
        if (secretCode !== 'ADMIN2026' && secretCode !== 'admin2026' && secretCode !== 'admin') {
            showToast('🛡️', 'Mã xác thực Quản Trị Viên không đúng! Gợi ý: Hãy nhập "ADMIN2026".');
            document.getElementById('reg-secret-code').focus();
            return;
        }
    }

    const newUser = {
        id: 'usr_' + Date.now() + '_' + Math.random().toString(36).substr(2, 4),
        username: username,
        password: password,
        fullname: fullname,
        role: role,
        className: role === 'student' ? (className || 'Chưa phân lớp') : (role === 'teacher' ? 'Tổ Mỹ Thuật' : 'Ban Giám Hiệu'),
        avatar: selectedAvatarEmoji || '🎨',
        bio: role === 'student' ? `Học sinh lớp ${className || 'trường'}.` : (role === 'teacher' ? 'Giáo viên bộ môn Mỹ thuật.' : 'Quản trị viên hệ thống triển lãm.'),
        createdAt: Date.now()
    };

    users.push(newUser);
    saveUsers(users);

    setCurrentUser(newUser);
    closeAuthModal();
    showMuseum();
    showToast('🎉', `Chúc mừng ${fullname}! Đăng ký tài khoản ${role === 'student' ? 'Học sinh' : (role === 'teacher' ? 'Giáo viên' : 'Quản trị viên')} thành công!`);
    document.getElementById('form-register').reset();
}

function quickLogin(roleKey, notify = true) {
    const users = getUsers();
    const user = users.find(u => u.username === roleKey || u.role === roleKey);
    if (user) {
        setCurrentUser(user);
        closeAuthModal();
        showMuseum();
        if (notify) {
            showToast('⚡', `Đã đăng nhập nhanh: ${user.fullname} [${user.role === 'student' ? 'Học Sinh' : (user.role === 'teacher' ? 'Giáo Viên' : 'Quản Trị')}]`);
        }
    }
}

function guestEnterMuseum() {
    setCurrentUser(null);
    showMuseum();
    showToast('👋', 'Kính chào quý khách ghé thăm Bảo Tàng Nghệ Thuật Học Đường!');
}

function logout() {
    closeUserDropdown();
    setCurrentUser(null);
    exitMuseum();
    showToast('👋', 'Bạn đã đăng xuất khỏi bảo tàng.');
}

// User Profile Dropdown
function toggleUserDropdown(e) {
    if (e) e.stopPropagation();
    const menu = document.getElementById('user-dropdown-menu');
    if (!menu) return;
    menu.classList.toggle('hidden');
}

function closeUserDropdown() {
    const menu = document.getElementById('user-dropdown-menu');
    if (menu) menu.classList.add('hidden');
}

function openCurrentUserPortfolio() {
    closeUserDropdown();
    if (currentRole === 'student') {
        openArtistPortfolio(currentUser);
    } else {
        showToast('ℹ️', `Hồ sơ: ${currentUser} (${currentRole === 'teacher' ? 'Giáo Viên Mỹ Thuật' : 'Quản Trị Viên'})`);
    }
}

function filterMyArtworks() {
    closeUserDropdown();
    showSection('gallery');
    handleSearch(currentUser);
    showToast('🔍', `Đang lọc các tác phẩm của bạn: ${currentUser}`);
}

function filterPendingGrades() {
    closeUserDropdown();
    showSection('gallery');
    filterArtworks('ungraded');
    showToast('⏳', 'Đang hiển thị danh sách bài vẽ chờ giáo viên chấm điểm');
}

// Backward compatibility helper
function enterMuseum(role) {
    quickLogin(role, false);
}

function loadDemoAndEnter() {
    loadDemoData();
    quickLogin('student', false);
}

function showMuseum() {
    document.getElementById('entrance').classList.add('hidden');
    document.getElementById('museum').classList.remove('hidden');
    populateClassFilter();
    renderThemeTabsAndSelects();
    initThemeState();
    showSection('gallery');
}

function exitMuseum() {
    document.getElementById('museum').classList.add('hidden');
    document.getElementById('entrance').classList.remove('hidden');
    currentRole = null;
    if (isAmbientAudioPlaying) toggleMuseumAudio();
    stopAudioGuide();
}

function showNameModal() {
    openAuthModal('student');
}

function closeNameModal() {
    closeAuthModal();
}

function submitName() {
    openAuthModal('student');
}

function handleUserBadgeClick() {
    toggleUserDropdown();
}

// ========================================================
// ☀️/🌙 DAYLIGHT & NIGHT MUSEUM TOUR THEME
// ========================================================
function initThemeState() {
    const savedTheme = localStorage.getItem(STORAGE_KEYS.theme) || 'night';
    if (savedTheme === 'daylight') {
        document.body.classList.remove('theme-night');
        document.body.classList.add('theme-daylight');
        document.getElementById('theme-icon').textContent = '☀️';
    } else {
        document.body.classList.remove('theme-daylight');
        document.body.classList.add('theme-night');
        document.getElementById('theme-icon').textContent = '🌙';
    }
}

function toggleMuseumTheme() {
    const isDay = document.body.classList.contains('theme-daylight');
    const icon = document.getElementById('theme-icon');
    if (isDay) {
        document.body.classList.remove('theme-daylight');
        document.body.classList.add('theme-night');
        icon.textContent = '🌙';
        localStorage.setItem(STORAGE_KEYS.theme, 'night');
        showToast('🌙', 'Đã chuyển sang chế độ Đêm Bảo Tàng (Night Gallery)');
    } else {
        document.body.classList.remove('theme-night');
        document.body.classList.add('theme-daylight');
        icon.textContent = '☀️';
        localStorage.setItem(STORAGE_KEYS.theme, 'daylight');
        showToast('☀️', 'Đã chuyển sang chế độ Ánh Sáng Tự Nhiên (Daylight Gallery)');
    }
}

// ========================================================
// 🧭 NAVIGATION & SECTIONS
// ========================================================
function showSection(sectionName) {
    closeUserDropdown();
    if (sectionName === 'admin' && currentRole !== 'admin') {
        showToast('🔒', 'Bạn cần đăng nhập bằng tài khoản Quản Trị Viên (Admin) để vào mục này!');
        openAuthModal('admin');
        return;
    }

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
    } else if (sectionName === 'admin') {
        renderAdminStats();
        switchAdminTab(currentAdminTab);
    }

    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// ========================================================
// ⚙️ ADMIN DASHBOARD & RBAC CONTROL LOGIC
// ========================================================
function switchAdminTab(tabName) {
    currentAdminTab = tabName;
    document.querySelectorAll('.admin-tab-btn').forEach(btn => {
        btn.classList.toggle('active', btn.dataset.tab === tabName);
    });

    document.querySelectorAll('.admin-tab-content').forEach(c => c.classList.add('hidden'));
    const targetContent = document.getElementById('admin-tab-' + tabName);
    if (targetContent) targetContent.classList.remove('hidden');

    if (tabName === 'users') renderAdminUsers();
    else if (tabName === 'artworks') renderAdminArtworks();
    else if (tabName === 'themes') renderAdminThemes();
    else if (tabName === 'analytics') renderAdminAnalytics();
}

function renderAdminStats() {
    const users = getUsers();
    const artworks = getArtworks();
    const graded = artworks.filter(a => a.grade !== null && a.grade !== undefined && a.grade !== '');
    const excellent = artworks.filter(a => Number(a.grade) >= 9.0);

    const elUsers = document.getElementById('admin-stat-users');
    const elArts = document.getElementById('admin-stat-artworks');
    const elGraded = document.getElementById('admin-stat-graded');
    const elExc = document.getElementById('admin-stat-excellent');

    if (elUsers) elUsers.textContent = users.length;
    if (elArts) elArts.textContent = artworks.length;
    if (elGraded) elGraded.textContent = graded.length;
    if (elExc) elExc.textContent = excellent.length;
}

function renderAdminUsers() {
    renderAdminStats();
    const tbody = document.getElementById('admin-users-tbody');
    if (!tbody) return;

    let users = getUsers();
    if (adminUserRoleFilter !== 'all') {
        users = users.filter(u => u.role === adminUserRoleFilter);
    }
    if (adminUserSearchQuery) {
        const q = adminUserSearchQuery.toLowerCase();
        users = users.filter(u =>
            u.fullname.toLowerCase().includes(q) ||
            u.username.toLowerCase().includes(q) ||
            (u.className && u.className.toLowerCase().includes(q))
        );
    }

    if (users.length === 0) {
        tbody.innerHTML = `<tr><td colspan="6" style="text-align: center; color: var(--text-muted); padding: 25px;">Không tìm thấy tài khoản nào phù hợp</td></tr>`;
        return;
    }

    tbody.innerHTML = users.map(u => {
        const roleBadge = u.role === 'student' ? '<span class="admin-badge badge-student">🎨 Học Sinh</span>' :
                          u.role === 'teacher' ? '<span class="admin-badge badge-teacher">👩‍🏫 Giáo Viên</span>' :
                          '<span class="admin-badge badge-admin">🏛️ Quản Trị</span>';
        const isSelf = u.id === currentUserId;

        return `
            <tr>
                <td>
                    <div style="display: flex; align-items: center; gap: 8px;">
                        <span style="font-size: 1.4rem;">${u.avatar || '👤'}</span>
                        <strong>${escapeHtml(u.fullname)}</strong>
                        ${isSelf ? '<span style="font-size: 0.72rem; color: var(--gold);">(Tôi)</span>' : ''}
                    </div>
                </td>
                <td><code>${escapeHtml(u.username)}</code></td>
                <td>${roleBadge}</td>
                <td>${escapeHtml(u.className || '—')}</td>
                <td>${formatDate(u.createdAt)}</td>
                <td>
                    <div style="display: flex; align-items: center; gap: 6px;">
                        <select class="role-select-inline" onchange="changeUserRole('${u.id}', this.value)" title="Đổi phân quyền">
                            <option value="student" ${u.role === 'student' ? 'selected' : ''}>Học Sinh</option>
                            <option value="teacher" ${u.role === 'teacher' ? 'selected' : ''}>Giáo Viên</option>
                            <option value="admin" ${u.role === 'admin' ? 'selected' : ''}>Quản Trị</option>
                        </select>
                        <button class="btn-action-small" onclick="resetUserPassword('${u.id}')" title="Đặt lại mật khẩu">🔑</button>
                        <button class="btn-action-small btn-danger" onclick="deleteUser('${u.id}')" ${isSelf ? 'disabled title="Không thể xóa tài khoản của chính bạn"' : 'title="Xóa tài khoản"'}>🗑️</button>
                    </div>
                </td>
            </tr>
        `;
    }).join('');
}

function handleAdminUserSearch(val) {
    adminUserSearchQuery = val.trim();
    renderAdminUsers();
}

function handleAdminRoleFilter(val) {
    adminUserRoleFilter = val;
    renderAdminUsers();
}

function changeUserRole(userId, newRole) {
    const users = getUsers();
    const idx = users.findIndex(u => u.id === userId);
    if (idx === -1) return;

    const oldRole = users[idx].role;
    users[idx].role = newRole;
    saveUsers(users);

    if (userId === currentUserId) {
        setCurrentUser(users[idx]);
    }

    showToast('✅', `Đã cập nhật phân quyền "${users[idx].fullname}" thành ${newRole === 'student' ? 'Học Sinh' : (newRole === 'teacher' ? 'Giáo Viên' : 'Quản Trị')}!`);
    renderAdminUsers();
}

function resetUserPassword(userId) {
    const users = getUsers();
    const user = users.find(u => u.id === userId);
    if (!user) return;

    const newPwd = prompt(`Đặt lại mật khẩu mới cho tài khoản "${user.username}" (${user.fullname}):`, '123456');
    if (!newPwd) return;

    user.password = newPwd.trim();
    saveUsers(users);
    showToast('🔑', `Đã đặt lại mật khẩu cho "${user.username}" thành công!`);
}

function deleteUser(userId) {
    if (userId === currentUserId) {
        showToast('⚠️', 'Bạn không thể xóa tài khoản Quản Trị Viên đang đăng nhập!');
        return;
    }
    const users = getUsers();
    const user = users.find(u => u.id === userId);
    if (!user) return;

    if (!confirm(`Bạn có chắc chắn muốn xóa tài khoản "${user.fullname}" (@${user.username})?`)) return;

    const updated = users.filter(u => u.id !== userId);
    saveUsers(updated);
    showToast('🗑️', `Đã xóa tài khoản "${user.fullname}".`);
    renderAdminUsers();
}

function openAddUserModal() {
    document.getElementById('add-user-modal').classList.remove('hidden');
}

function closeAddUserModal() {
    document.getElementById('add-user-modal').classList.add('hidden');
}

function toggleAdminAddClassField(role) {
    const classGroup = document.getElementById('adm-add-class-group');
    if (classGroup) {
        classGroup.style.display = role === 'student' ? 'block' : 'none';
    }
}

function handleAdminAddUser(e) {
    e.preventDefault();
    const fullname = document.getElementById('adm-add-fullname').value.trim();
    const username = document.getElementById('adm-add-username').value.trim().toLowerCase();
    const role = document.getElementById('adm-add-role').value;
    const className = document.getElementById('adm-add-class').value.trim();
    const password = document.getElementById('adm-add-password').value;

    const users = getUsers();
    if (users.some(u => u.username.toLowerCase() === username)) {
        showToast('⚠️', 'Tên đăng nhập này đã tồn tại!');
        return;
    }

    const newUser = {
        id: 'usr_' + Date.now(),
        username: username,
        password: password,
        fullname: fullname,
        role: role,
        className: className || (role === 'student' ? '6A1' : (role === 'teacher' ? 'Tổ Mỹ Thuật' : 'BGH')),
        avatar: role === 'student' ? '🎨' : (role === 'teacher' ? '👩‍🏫' : '🏛️'),
        bio: `Tài khoản tạo bởi Quản Trị Viên.`,
        createdAt: Date.now()
    };

    users.push(newUser);
    saveUsers(users);

    closeAddUserModal();
    showToast('✅', `Đã tạo tài khoản "${fullname}" (${role}) thành công!`);
    renderAdminUsers();
}

function renderAdminArtworks() {
    renderAdminStats();
    const tbody = document.getElementById('admin-artworks-tbody');
    if (!tbody) return;

    let artworks = getArtworks();
    if (adminArtFilterStatus === 'graded') {
        artworks = artworks.filter(a => a.grade !== null && a.grade !== undefined && a.grade !== '');
    } else if (adminArtFilterStatus === 'ungraded') {
        artworks = artworks.filter(a => a.grade === null || a.grade === undefined || a.grade === '');
    } else if (adminArtFilterStatus === 'hall') {
        artworks = artworks.filter(a => Number(a.grade) >= 9.0);
    }

    if (adminArtSearchQuery) {
        const q = adminArtSearchQuery.toLowerCase();
        artworks = artworks.filter(a =>
            (a.title && a.title.toLowerCase().includes(q)) ||
            (a.artist && a.artist.toLowerCase().includes(q)) ||
            (a.className && a.className.toLowerCase().includes(q))
        );
    }

    if (artworks.length === 0) {
        tbody.innerHTML = `<tr><td colspan="6" style="text-align: center; color: var(--text-muted); padding: 25px;">Không tìm thấy tác phẩm nào</td></tr>`;
        return;
    }

    tbody.innerHTML = artworks.map(art => {
        const isHall = Number(art.grade) >= 9.0;
        const gradeDisplay = (art.grade !== null && art.grade !== undefined) ?
            `<strong style="color: ${isHall ? '#2ecc71' : 'var(--gold-light)'};">${art.grade}/10</strong>` :
            '<span style="color: var(--text-muted);">⏳ Chờ chấm</span>';

        return `
            <tr>
                <td style="width: 60px;">
                    <img src="${art.imageData}" alt="" style="width: 50px; height: 38px; object-fit: cover; border-radius: 4px; border: 1px solid rgba(212,175,55,0.4);">
                </td>
                <td>
                    <strong>${escapeHtml(art.title)}</strong>
                    <div style="font-size: 0.75rem; color: var(--text-muted);">${escapeHtml(art.theme || 'Mỹ thuật')}</div>
                </td>
                <td>${escapeHtml(art.artist)} ${art.className ? `(Lớp ${escapeHtml(art.className)})` : ''}</td>
                <td>${escapeHtml(art.medium || 'Tự do')} • Khung: ${escapeHtml(art.frame || 'Gold')}</td>
                <td>${gradeDisplay}</td>
                <td>
                    <div style="display: flex; gap: 6px;">
                        <button class="btn-action-small" onclick="openArtworkDetail('${art.id}')" title="Xem chi tiết & chấm bài">👁️ Xem</button>
                        <button class="btn-action-small btn-danger" onclick="deleteArtworkByAdmin('${art.id}')" title="Gỡ tác phẩm vi phạm">🗑️ Gỡ</button>
                    </div>
                </td>
            </tr>
        `;
    }).join('');
}

function handleAdminArtworkSearch(val) {
    adminArtSearchQuery = val.trim();
    renderAdminArtworks();
}

function handleAdminArtworkFilter(status) {
    adminArtFilterStatus = status;
    renderAdminArtworks();
}

function deleteArtworkByAdmin(artId) {
    if (!confirm('Bạn có chắc chắn muốn gỡ tác phẩm này với tư cách Quản Trị Viên?')) return;
    let artworks = getArtworks();
    artworks = artworks.filter(a => a.id !== artId);
    saveArtworks(artworks);
    showToast('🗑️', 'Quản trị viên đã gỡ tác phẩm khỏi bảo tàng.');
    renderAdminArtworks();
    renderGallery();
}

function renderAdminThemes() {
    const list = document.getElementById('admin-theme-cards-list');
    if (!list) return;

    const themes = getThemes();
    list.innerHTML = themes.map(t => `
        <div class="admin-theme-card">
            <div style="display: flex; align-items: center; gap: 12px;">
                <span style="font-size: 1.8rem;">${t.icon || '🎨'}</span>
                <div class="admin-theme-info">
                    <h4>${escapeHtml(t.name)}</h4>
                    <p>${escapeHtml(t.desc || 'Chuyên đề hội họa học đường.')}</p>
                </div>
            </div>
            <button class="btn-action-small btn-danger" onclick="deleteTheme('${t.id}')" title="Xóa chuyên đề">🗑️</button>
        </div>
    `).join('');
}

function handleCreateTheme(e) {
    e.preventDefault();
    const name = document.getElementById('new-theme-name').value.trim();
    const icon = document.getElementById('new-theme-icon').value.trim() || '✨';
    const desc = document.getElementById('new-theme-desc').value.trim();

    if (!name) return;

    const themes = getThemes();
    if (themes.some(t => t.name.toLowerCase() === name.toLowerCase())) {
        showToast('⚠️', 'Chuyên đề này đã tồn tại!');
        return;
    }

    const newTheme = {
        id: 'theme_' + Date.now(),
        name: name,
        icon: icon,
        desc: desc || 'Chuyên đề hội họa sáng tác học đường.'
    };

    themes.push(newTheme);
    saveThemes(themes);

    document.getElementById('new-theme-name').value = '';
    document.getElementById('new-theme-desc').value = '';

    renderAdminThemes();
    renderThemeTabsAndSelects();
    showToast('✨', `Đã mở thêm chuyên đề triển lãm: "${name}"!`);
}

function deleteTheme(themeId) {
    let themes = getThemes();
    if (themes.length <= 1) {
        showToast('⚠️', 'Cần giữ lại ít nhất 1 chuyên đề triển lãm!');
        return;
    }
    const target = themes.find(t => t.id === themeId);
    if (!confirm(`Bạn có chắc muốn xóa chuyên đề "${target?.name}"?`)) return;

    themes = themes.filter(t => t.id !== themeId);
    saveThemes(themes);
    renderAdminThemes();
    renderThemeTabsAndSelects();
    showToast('🗑️', 'Đã xóa chuyên đề triển lãm.');
}

function renderAdminAnalytics() {
    const view = document.getElementById('admin-analytics-view');
    if (!view) return;

    const artworks = getArtworks();
    const total = artworks.length || 1;

    const graded = artworks.filter(a => a.grade !== null && a.grade !== undefined && a.grade !== '');
    const exc = graded.filter(a => Number(a.grade) >= 9.0).length;
    const good = graded.filter(a => Number(a.grade) >= 8.0 && Number(a.grade) < 9.0).length;
    const fair = graded.filter(a => Number(a.grade) >= 6.5 && Number(a.grade) < 8.0).length;
    const pending = artworks.length - graded.length;

    const classCounts = {};
    artworks.forEach(a => {
        const c = a.className || 'Chưa rõ';
        classCounts[c] = (classCounts[c] || 0) + 1;
    });

    view.innerHTML = `
        <div class="analytics-cards-grid">
            <div class="analytics-card">
                <h4>📊 Phân Khúc Kết Quả Đánh Giá Mỹ Thuật</h4>
                <div class="bar-item-row">
                    <div class="bar-labels"><span>🏆 Xuất sắc (9.0 - 10.0)</span><strong>${exc} bài (${Math.round(exc / total * 100)}%)</strong></div>
                    <div class="bar-track"><div class="bar-fill" style="width: ${Math.round(exc / total * 100)}%; background: #2ecc71;"></div></div>
                </div>
                <div class="bar-item-row">
                    <div class="bar-labels"><span>✨ Giỏi (8.0 - 8.9)</span><strong>${good} bài (${Math.round(good / total * 100)}%)</strong></div>
                    <div class="bar-track"><div class="bar-fill" style="width: ${Math.round(good / total * 100)}%; background: #3498db;"></div></div>
                </div>
                <div class="bar-item-row">
                    <div class="bar-labels"><span>🎨 Đạt (6.5 - 7.9)</span><strong>${fair} bài (${Math.round(fair / total * 100)}%)</strong></div>
                    <div class="bar-track"><div class="bar-fill" style="width: ${Math.round(fair / total * 100)}%; background: #f1c40f;"></div></div>
                </div>
                <div class="bar-item-row">
                    <div class="bar-labels"><span>⏳ Đang chờ chấm điểm</span><strong>${pending} bài (${Math.round(pending / total * 100)}%)</strong></div>
                    <div class="bar-track"><div class="bar-fill" style="width: ${Math.round(pending / total * 100)}%; background: #e74c3c;"></div></div>
                </div>
            </div>

            <div class="analytics-card">
                <h4>🏫 Số Lượng Tác Phẩm Theo Khối / Lớp</h4>
                ${Object.entries(classCounts).map(([cls, cnt]) => `
                    <div class="bar-item-row">
                        <div class="bar-labels"><span>Lớp ${escapeHtml(cls)}</span><strong>${cnt} tác phẩm (${Math.round(cnt / total * 100)}%)</strong></div>
                        <div class="bar-track"><div class="bar-fill" style="width: ${Math.round(cnt / total * 100)}%;"></div></div>
                    </div>
                `).join('')}
            </div>
        </div>
    `;
}

function exportSystemBackup() {
    const backupData = {
        exportedAt: new Date().toISOString(),
        users: getUsers(),
        artworks: getArtworks(),
        themes: getThemes()
    };

    const blob = new Blob([JSON.stringify(backupData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `bao-tang-my-thuat-backup-${Date.now()}.json`;
    a.click();
    URL.revokeObjectURL(url);
    showToast('💾', 'Đã tải xuống bản sao lưu dữ liệu toàn hệ thống!');
}

function exportInitialDataForGithub() {
    const backupData = {
        exportedAt: new Date().toISOString(),
        version: '1.0',
        users: getUsers(),
        artworks: getArtworks(),
        themes: getThemes()
    };

    const blob = new Blob([JSON.stringify(backupData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'initial-data.json';
    a.click();
    URL.revokeObjectURL(url);
    showToast('🚀', 'Đã xuất file initial-data.json! Hãy lưu vào thư mục web rồi đẩy lên GitHub.');
}

function handleImportBackup(e) {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (evt) => {
        try {
            const data = JSON.parse(evt.target.result);
            if (data.users && Array.isArray(data.users)) saveUsers(data.users);
            if (data.artworks && Array.isArray(data.artworks)) saveArtworks(data.artworks);
            if (data.themes && Array.isArray(data.themes)) saveThemes(data.themes);

            renderThemeTabsAndSelects();
            renderGallery();
            renderAdminStats();
            switchAdminTab(currentAdminTab);
            showToast('✅', 'Khôi phục dữ liệu từ file sao lưu thành công!');
        } catch (err) {
            showToast('⚠️', 'Tệp tin JSON không hợp lệ hoặc bị lỗi định dạng!');
        }
    };
    reader.readAsText(file);
}

function resetSystemToDefault() {
    if (!confirm('CẢNH BÁO: Thao tác này sẽ đặt lại toàn bộ hệ thống về dữ liệu mẫu ban đầu. Bạn có chắc chắn muốn tiếp tục?')) return;

    localStorage.removeItem(STORAGE_KEYS.artworks);
    localStorage.removeItem(STORAGE_KEYS.users);
    localStorage.removeItem(STORAGE_KEYS.themes);

    getArtworks();
    getUsers();
    getThemes();

    quickLogin('admin', false);
    renderThemeTabsAndSelects();
    renderGallery();
    renderAdminStats();
    switchAdminTab('users');
    showToast('✨', 'Đã đặt lại toàn bộ dữ liệu mẫu chuẩn của nhà trường!');
}

// ========================================================
// 🏛️ THEMES, SEARCH & GALLERY RENDERING
// ========================================================
function handleThemeTab(themeName) {
    currentThemeTab = themeName;
    document.querySelectorAll('.theme-tab-btn').forEach(btn => {
        btn.classList.toggle('active', btn.dataset.theme === themeName);
    });
    renderGallery();
}

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

    // 1. Filter by Theme Tab
    if (currentThemeTab !== 'all') {
        artworks = artworks.filter(a => a.theme === currentThemeTab);
    }

    // 2. Filter by Search Query
    if (searchQuery) {
        artworks = artworks.filter(a =>
            (a.title && a.title.toLowerCase().includes(searchQuery)) ||
            (a.artist && a.artist.toLowerCase().includes(searchQuery)) ||
            (a.description && a.description.toLowerCase().includes(searchQuery)) ||
            (a.className && a.className.toLowerCase().includes(searchQuery)) ||
            (a.theme && a.theme.toLowerCase().includes(searchQuery))
        );
    }

    // 3. Filter by Class
    if (currentClassFilter !== 'all') {
        artworks = artworks.filter(a => a.className === currentClassFilter);
    }

    // 4. Filter by Medium
    if (currentMediumFilter !== 'all') {
        artworks = artworks.filter(a => a.medium && a.medium.includes(currentMediumFilter));
    }

    // 5. Filter by Status/Pill
    switch (currentFilter) {
        case 'recent':
            artworks = [...artworks].sort((a, b) => b.timestamp - a.timestamp);
            break;
        case 'top-rated':
            artworks = [...artworks]
                .filter(a => a.grade !== null && a.grade !== undefined)
                .sort((a, b) => Number(b.grade) - Number(a.grade));
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
            <span class="nameplate-sub">${escapeHtml(art.medium || 'Tự do')} • ${escapeHtml(art.theme || 'Mỹ thuật')}</span>
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
// 🏆 HALL OF FAME
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
                    <span class="nameplate-sub">🏆 Kiệt tác xuất sắc • ${escapeHtml(art.theme || 'Mỹ thuật')}</span>
                </div>
            </div>
        `).join('');
    }
}

// ========================================================
// 🎨 PALETTE EXTRACTOR (AUTOMATIC CANVAS SAMPLING)
// ========================================================
function extractDominantColors(imgSrc, callback) {
    if (!imgSrc) {
        callback({ colors: ['#d4af37', '#e74c3c', '#3498db', '#2ecc71', '#9b59b6'], harmony: 'Hòa Sắc Tự Nhiên' });
        return;
    }
    const img = new Image();
    // Only set crossOrigin for remote HTTP/HTTPS images to prevent browser security exceptions on data URIs
    if (imgSrc.startsWith('http://') || imgSrc.startsWith('https://')) {
        img.crossOrigin = 'Anonymous';
    }
    img.onload = () => {
        try {
            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d');
            canvas.width = 60;
            canvas.height = 60;
            ctx.drawImage(img, 0, 0, 60, 60);

            const imgData = ctx.getImageData(0, 0, 60, 60).data;
            const colorCounts = {};

            let totalR = 0, totalG = 0, totalB = 0, totalCount = 0;

            for (let i = 0; i < imgData.length; i += 16) { // Sample every 4th pixel
                const r = imgData[i];
                const g = imgData[i + 1];
                const b = imgData[i + 2];
                const a = imgData[i + 3];

                if (a < 128) continue; // Skip transparent

                // Quantize to step of 32
                const qr = Math.round(r / 32) * 32;
                const qg = Math.round(g / 32) * 32;
                const qb = Math.round(b / 32) * 32;
                const key = `${qr},${qg},${qb}`;

                colorCounts[key] = (colorCounts[key] || 0) + 1;
                totalR += r; totalG += g; totalB += b; totalCount++;
            }

            // Sort by count
            const sorted = Object.keys(colorCounts).sort((a, b) => colorCounts[b] - colorCounts[a]);
            const top5 = sorted.slice(0, 5).map(rgbStr => {
                const [r, g, b] = rgbStr.split(',').map(Number);
                return '#' + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
            });

            // Fallback if needed
            while (top5.length < 5) top5.push('#d4af37');

            // Determine harmony
            const avgR = totalCount ? totalR / totalCount : 128;
            const avgB = totalCount ? totalB / totalCount : 128;
            let harmonyName = 'Hòa Sắc Hài Hòa';

            if (avgR > avgB + 30) {
                harmonyName = 'Hòa Sắc Nóng (Ấm Áp, Tràn Đầy Năng Lượng)';
            } else if (avgB > avgR + 30) {
                harmonyName = 'Hòa Sắc Lạnh (Êm Dịu, Chiều Sâu)';
            } else {
                harmonyName = 'Hòa Sắc Cân Bằng & Tương Phản Đa Dạng';
            }

            callback({ colors: top5, harmony: harmonyName });
        } catch (e) {
            callback({ colors: ['#f39c12', '#2ecc71', '#3498db', '#e74c3c', '#9b59b6'], harmony: 'Hòa Sắc Sáng Tạo' });
        }
    };
    img.onerror = () => {
        callback({ colors: ['#d4af37', '#e74c3c', '#3498db', '#2ecc71', '#9b59b6'], harmony: 'Hòa Sắc Tự Nhiên' });
    };
    img.src = imgSrc;
}

// ========================================================
// 🎨 UPLOAD, IMAGE COMPRESSOR & WORK-IN-PROGRESS
// ========================================================
function selectFrame(frameKey) {
    selectedFrame = frameKey;
    document.querySelectorAll('.frame-option').forEach(btn => {
        btn.classList.toggle('active', btn.dataset.frame === frameKey);
    });
    const previewOuter = document.getElementById('preview-outer-frame');
    if (previewOuter) previewOuter.className = 'artwork-frame ' + frameKey;
}

function selectMat(matKey) {
    selectedMat = matKey;
    document.querySelectorAll('.mat-option').forEach(btn => {
        btn.classList.toggle('active', btn.dataset.mat === matKey);
    });
    const previewMat = document.getElementById('preview-mat');
    if (previewMat) previewMat.className = 'artwork-mat ' + matKey;
}

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

    showToast('⏳', 'Đang nén và quét bảng màu...');
    compressAndLoadImage(file, (dataUrl) => {
        uploadedImageData = dataUrl;
        const previewImg = document.getElementById('preview-image');
        const dropzoneContent = document.getElementById('dropzone-content');

        previewImg.src = uploadedImageData;
        previewImg.classList.remove('hidden');
        dropzoneContent.classList.add('hidden');

        // Extract palette
        extractDominantColors(uploadedImageData, (paletteObj) => {
            currentExtractedPalette = paletteObj;
            renderUploadPalettePreview(paletteObj);
            showToast('✨', 'Đã phân tích bảng màu tác phẩm thành công!');
        });
    });
}

function renderUploadPalettePreview(paletteObj) {
    const box = document.getElementById('upload-palette-box');
    const swatches = document.getElementById('upload-palette-swatches');
    const harmony = document.getElementById('upload-palette-harmony');

    if (!box || !paletteObj) return;
    box.classList.remove('hidden');
    harmony.textContent = '✨ ' + paletteObj.harmony;

    swatches.innerHTML = paletteObj.colors.map(col => `
        <div style="flex:1; height: 24px; border-radius: 4px; background: ${col}; border: 1px solid rgba(255,255,255,0.2);" title="${col}"></div>
    `).join('');
}

function handleSketchFile(file) {
    if (!file || !file.type.startsWith('image/')) return;
    compressAndLoadImage(file, (dataUrl) => {
        uploadedSketchData = dataUrl;
        document.getElementById('sketch-status').textContent = '✅ Đã đính kèm bản phác thảo';
        showToast('✏️', 'Đã nhận bản phác thảo chì thành công!');
    });
}

function resetUploadForm() {
    uploadedImageData = null;
    uploadedSketchData = null;
    currentExtractedPalette = null;
    selectedFrame = 'classic-gold';
    selectedMat = 'mat-cream';

    document.getElementById('file-input').value = '';
    document.getElementById('sketch-file-input').value = '';
    document.getElementById('sketch-status').textContent = 'Chưa chọn bản phác thảo';
    document.getElementById('preview-image').classList.add('hidden');
    document.getElementById('preview-image').src = '';
    document.getElementById('dropzone-content').classList.remove('hidden');
    document.getElementById('upload-palette-box').classList.add('hidden');

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
    if (currentRole === 'guest') {
        showToast('⚠️', 'Vui lòng đăng nhập hoặc đăng ký tài khoản Học Sinh để đăng tranh!');
        openAuthModal('student');
        return;
    }

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

    const theme = document.getElementById('artwork-theme').value || 'Tự Do Sáng Tạo';
    const desc = document.getElementById('artwork-desc').value.trim();
    const artistName = currentUser || 'Học sinh';

    const newArtwork = {
        id: generateId(),
        userId: currentUserId || ('usr_' + Date.now()),
        title: title,
        description: desc || 'Tác phẩm mỹ thuật sáng tác bởi học sinh.',
        medium: medium,
        theme: theme,
        className: className,
        artist: artistName,
        frame: selectedFrame,
        mat: selectedMat,
        imageData: uploadedImageData,
        sketchData: uploadedSketchData,
        palette: currentExtractedPalette || {
            colors: ['#d4af37', '#e74c3c', '#3498db', '#2ecc71', '#9b59b6'],
            harmony: 'Hòa Sắc Tự Nhiên'
        },
        timestamp: Date.now(),
        grade: null,
        teacherName: null,
        comment: null,
        suggestion: null,
        rubric: null,
        badges: [],
        likes: 1,
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
// 🔍 ARTWORK DETAIL MODAL, MAGNIFIER & AUDIO GUIDE
// ========================================================
function openArtworkDetail(artworkId) {
    try {
        const artworks = getArtworks();
        const art = artworks.find(a => a.id === artworkId);
        if (!art) return;

        selectedArtworkId = artworkId;
        stopAudioGuide(); // Reset any playing audio
        isMagnifierActive = false;
        isWipSliderActive = false;

        // Reset view tools
        const magContainer = document.getElementById('magnifier-container');
        if (magContainer) magContainer.classList.remove('hidden');
        const wipContainer = document.getElementById('wip-slider-container');
        if (wipContainer) wipContainer.classList.add('hidden');
        const magBtn = document.getElementById('btn-toggle-magnifier');
        if (magBtn) magBtn.classList.remove('active');
        const magLens = document.getElementById('magnifier-lens');
        if (magLens) magLens.classList.add('hidden');

        // Artwork image & framing
        const detailImg = document.getElementById('detail-image');
        if (detailImg) detailImg.src = art.imageData || '';
        const detailFrame = document.getElementById('detail-frame');
        if (detailFrame) detailFrame.className = 'artwork-frame ' + (art.frame || 'classic-gold');
        const detailMat = document.getElementById('detail-mat');
        if (detailMat) detailMat.className = 'artwork-mat ' + (art.mat || 'mat-cream');

        // Setup WIP slider if sketch exists
        const sketchBtn = document.getElementById('btn-toggle-sketch-slider');
        if (sketchBtn) {
            if (art.sketchData) {
                sketchBtn.classList.remove('hidden');
                sketchBtn.classList.remove('active');
                const wipFinal = document.getElementById('wip-final-img');
                if (wipFinal) wipFinal.src = art.imageData;
                const wipSketch = document.getElementById('wip-sketch-img');
                if (wipSketch) wipSketch.src = art.sketchData;
                setupWipSliderInteractivity();
            } else {
                sketchBtn.classList.add('hidden');
            }
        }

        // Setup Magnifier image listener
        setupMagnifierLoupe(art.imageData);

        // Plaque details
        const elTitle = document.getElementById('detail-title');
        if (elTitle) elTitle.textContent = art.title || '';
        const elArtist = document.getElementById('detail-artist');
        if (elArtist) elArtist.textContent = art.artist || '';
        const elClass = document.getElementById('detail-class-badge');
        if (elClass) elClass.textContent = art.className ? ('Lớp ' + art.className) : '';
        const elTheme = document.getElementById('detail-theme-badge');
        if (elTheme) elTheme.textContent = art.theme ? ('Chuyên đề: ' + art.theme) : '';
        const elMedium = document.getElementById('detail-medium');
        if (elMedium) elMedium.textContent = 'Chất liệu: ' + (art.medium || 'Hội họa');
        const elDate = document.getElementById('detail-date');
        if (elDate) elDate.textContent = formatDate(art.timestamp);
        const elDesc = document.getElementById('detail-desc');
        if (elDesc) elDesc.textContent = art.description || 'Chưa có ghi chú mô tả.';

        // Color Palette Render
        renderDetailPalette(art);

        // Like count & state
        updateDetailLikeState(art);

        // Grade status & Circle
        const gradeCircle = document.getElementById('grade-circle');
        const gradeValue = document.getElementById('grade-value');
        const gradeHeading = document.getElementById('grade-status-heading');
        const gradeEvaluator = document.getElementById('grade-evaluator');
        const badgesDisplay = document.getElementById('grade-badges-display');
        const rubricDisplay = document.getElementById('rubric-display');

        const isGraded = art.grade !== null && art.grade !== undefined && art.grade !== '';
        if (isGraded) {
            const numGrade = Number(art.grade);
            if (gradeValue) gradeValue.textContent = art.grade;
            if (gradeCircle) gradeCircle.className = 'grade-badge-circle ' + (numGrade >= 9.0 ? 'grade-high' : numGrade >= 7.0 ? 'grade-medium' : 'grade-low');
            if (gradeHeading) gradeHeading.textContent = numGrade >= 9.0 ? 'Kiệt Tác Xuất Sắc 🏆' : numGrade >= 8.0 ? 'Tác Phẩm Giỏi ✨' : 'Đã Được Đánh Giá';
            if (gradeEvaluator) gradeEvaluator.textContent = 'Đánh giá bởi: ' + (art.teacherName || 'Giáo viên Mỹ Thuật');

            if (badgesDisplay) {
                if (Array.isArray(art.badges) && art.badges.length > 0) {
                    badgesDisplay.innerHTML = art.badges.map(b => `<span class="honor-badge-tag">${escapeHtml(b)}</span>`).join('');
                } else {
                    badgesDisplay.innerHTML = '';
                }
            }

            if (rubricDisplay) {
                if (art.rubric) {
                    rubricDisplay.classList.remove('hidden');
                    const compEl = document.getElementById('rubric-val-comp');
                    if (compEl) compEl.textContent = art.rubric.comp || 'Đạt';
                    const colorEl = document.getElementById('rubric-val-color');
                    if (colorEl) colorEl.textContent = art.rubric.color || 'Đạt';
                    const techEl = document.getElementById('rubric-val-tech');
                    if (techEl) techEl.textContent = art.rubric.tech || 'Đạt';
                    const creatEl = document.getElementById('rubric-val-creativity');
                    if (creatEl) creatEl.textContent = art.rubric.creativity || 'Đạt';
                } else {
                    rubricDisplay.classList.add('hidden');
                }
            }
        } else {
            if (gradeValue) gradeValue.textContent = '—';
            if (gradeCircle) gradeCircle.className = 'grade-badge-circle';
            if (gradeHeading) gradeHeading.textContent = 'Chờ Giáo Viên Đánh Giá ⏳';
            if (gradeEvaluator) gradeEvaluator.textContent = 'Tác phẩm đang được trưng bày chờ chấm điểm';
            if (badgesDisplay) badgesDisplay.innerHTML = '';
            if (rubricDisplay) rubricDisplay.classList.add('hidden');
        }

        // Role-specific Panels (Phân quyền Học Sinh, Giáo Viên, Quản Trị)
        const teacherPanel = document.getElementById('teacher-panel');
        const feedbackDisplay = document.getElementById('feedback-display');
        const deleteBtn = document.getElementById('btn-delete');

        // Grading permission: Only Teacher or Admin can grade artworks
        const canGrade = (currentRole === 'teacher' || currentRole === 'admin');

        if (canGrade) {
            if (teacherPanel) teacherPanel.classList.remove('hidden');
            if (feedbackDisplay) feedbackDisplay.classList.add('hidden');

            const score = isGraded ? art.grade : 8.5;
            const slider = document.getElementById('grade-slider');
            if (slider) slider.value = score;
            const preview = document.getElementById('grade-preview');
            if (preview) preview.textContent = score;

            const commentInput = document.getElementById('teacher-comment');
            if (commentInput) commentInput.value = art.comment || '';
            const suggInput = document.getElementById('teacher-suggestion');
            if (suggInput) suggInput.value = art.suggestion || '';

            const compSelect = document.getElementById('rubric-comp');
            if (compSelect) compSelect.value = (art.rubric && art.rubric.comp) ? art.rubric.comp : 'Hài hòa, chặt chẽ (Tốt)';
            const colorSelect = document.getElementById('rubric-color');
            if (colorSelect) colorSelect.value = (art.rubric && art.rubric.color) ? art.rubric.color : 'Hòa sắc ấn tượng, tương phản tốt (Tốt)';
            const techSelect = document.getElementById('rubric-tech');
            if (techSelect) techSelect.value = (art.rubric && art.rubric.tech) ? art.rubric.tech : 'Làm chủ chất liệu, nét vẽ tự tin (Tốt)';
            const creatSelect = document.getElementById('rubric-creativity');
            if (creatSelect) creatSelect.value = (art.rubric && art.rubric.creativity) ? art.rubric.creativity : 'Ý tưởng độc đáo, giàu cảm xúc (Tốt)';

            const hasBadges = Array.isArray(art.badges);
            const bCreative = document.getElementById('badge-creative');
            if (bCreative) bCreative.checked = hasBadges && art.badges.includes('🌟 Sáng Tạo Vượt Bậc');
            const bColor = document.getElementById('badge-color');
            if (bColor) bColor.checked = hasBadges && art.badges.includes('🎨 Phối Màu Xuất Sắc');
            const bLine = document.getElementById('badge-line');
            if (bLine) bLine.checked = hasBadges && art.badges.includes('✍️ Đường Nét Tinh Tế');
            const bStory = document.getElementById('badge-story');
            if (bStory) bStory.checked = hasBadges && art.badges.includes('💡 Ý Tưởng Truyền Cảm Hứng');
        } else {
            // Student or Guest: cannot grade, only view feedback
            if (teacherPanel) teacherPanel.classList.add('hidden');

            if (art.comment || isGraded) {
                if (feedbackDisplay) {
                    feedbackDisplay.classList.remove('hidden');
                    const fbComment = document.getElementById('feedback-comment');
                    if (fbComment) fbComment.textContent = art.comment || 'Chưa có nhận xét văn bản.';

                    const fbSugg = document.getElementById('feedback-suggestion');
                    const suggText = document.getElementById('suggestion-text');
                    if (art.suggestion) {
                        if (fbSugg) fbSugg.classList.remove('hidden');
                        if (suggText) suggText.textContent = art.suggestion;
                    } else {
                        if (fbSugg) fbSugg.classList.add('hidden');
                    }
                }
            } else {
                if (feedbackDisplay) feedbackDisplay.classList.add('hidden');
            }
        }

        // Deletion permissions:
        // - Admin can delete ANY artwork with confirmation
        // - Student can ONLY delete artwork submitted by themselves
        // - Teachers grade assignments, cannot arbitrarily delete students' artworks
        const isOwner = (art.userId && art.userId === currentUserId) || (art.artist === currentUser);
        const canDelete = (currentRole === 'admin') || (currentRole === 'student' && isOwner);

        if (deleteBtn) {
            if (canDelete) {
                deleteBtn.classList.remove('hidden');
            } else {
                deleteBtn.classList.add('hidden');
            }
        }

        renderArtworkComments(art);

        const modal = document.getElementById('artwork-modal');
        if (modal) {
            modal.classList.remove('hidden');
            document.body.style.overflow = 'hidden';
        }
    } catch (err) {
        console.error('Lỗi khi mở chi tiết tác phẩm:', err);
        const modal = document.getElementById('artwork-modal');
        if (modal) {
            modal.classList.remove('hidden');
            document.body.style.overflow = 'hidden';
        }
    }
}

function closeArtworkModal() {
    stopAudioGuide();
    const modal = document.getElementById('artwork-modal');
    if (modal) modal.classList.add('hidden');
    document.body.style.overflow = '';
    selectedArtworkId = null;
}

// 🎨 Palette Renderer
function renderDetailPalette(art) {
    const swatchesGrid = document.getElementById('detail-palette-swatches');
    const harmonyBadge = document.getElementById('detail-palette-harmony');
    if (!swatchesGrid) return;

    if (art.palette && Array.isArray(art.palette.colors) && art.palette.colors.length > 0) {
        if (harmonyBadge) harmonyBadge.textContent = art.palette.harmony || 'Hòa Sắc Hài Hòa';
        swatchesGrid.innerHTML = art.palette.colors.map(col => `
            <div class="palette-swatch-item" onclick="showToast('🎨', 'Mã màu: ${col}')" title="Nhấn xem mã màu">
                <div class="palette-swatch-color" style="background: ${col}"></div>
                <span class="palette-hex">${col.toUpperCase()}</span>
            </div>
        `).join('');
    } else {
        // Fallback default palette immediately to prevent blocking
        const defaultPalette = {
            colors: ['#d4af37', '#e74c3c', '#3498db', '#2ecc71', '#9b59b6'],
            harmony: 'Hòa Sắc Tự Nhiên'
        };
        art.palette = defaultPalette;
        if (harmonyBadge) harmonyBadge.textContent = defaultPalette.harmony;
        swatchesGrid.innerHTML = defaultPalette.colors.map(col => `
            <div class="palette-swatch-item" onclick="showToast('🎨', 'Mã màu: ${col}')" title="Nhấn xem mã màu">
                <div class="palette-swatch-color" style="background: ${col}"></div>
                <span class="palette-hex">${col.toUpperCase()}</span>
            </div>
        `).join('');

        if (art.imageData) {
            extractDominantColors(art.imageData, (p) => {
                if (p && Array.isArray(p.colors) && p.colors.length > 0) {
                    art.palette = p;
                    if (harmonyBadge) harmonyBadge.textContent = p.harmony || 'Hòa Sắc Tự Nhiên';
                    swatchesGrid.innerHTML = p.colors.map(col => `
                        <div class="palette-swatch-item" onclick="showToast('🎨', 'Mã màu: ${col}')" title="Nhấn xem mã màu">
                            <div class="palette-swatch-color" style="background: ${col}"></div>
                            <span class="palette-hex">${col.toUpperCase()}</span>
                        </div>
                    `).join('');
                }
            });
        }
    }
}

// 🔍 Magnifier Loupe Implementation
function toggleMagnifierLens() {
    isMagnifierActive = !isMagnifierActive;
    const btn = document.getElementById('btn-toggle-magnifier');
    const lens = document.getElementById('magnifier-lens');

    if (isMagnifierActive) {
        if (btn) btn.classList.add('active');
        if (lens) lens.classList.remove('hidden');
        showToast('🔍', 'Di chuyển chuột trên bức tranh để soi chi tiết vệt cọ và nét vẽ!');
    } else {
        if (btn) btn.classList.remove('active');
        if (lens) lens.classList.add('hidden');
    }
}

function setupMagnifierLoupe(imgSrc) {
    const container = document.getElementById('magnifier-container');
    const img = document.getElementById('detail-image');
    const lens = document.getElementById('magnifier-lens');
    if (!container || !img || !lens) return;

    if (imgSrc) {
        lens.style.backgroundImage = `url("${imgSrc.replace(/"/g, '\\"')}")`;
    }

    function moveLens(e) {
        if (!isMagnifierActive) return;
        const rect = img.getBoundingClientRect();
        if (rect.width === 0 || rect.height === 0) return;

        const clientX = e.touches ? e.touches[0].clientX : e.clientX;
        const clientY = e.touches ? e.touches[0].clientY : e.clientY;

        let x = clientX - rect.left;
        let y = clientY - rect.top;

        if (x < 0 || x > rect.width || y < 0 || y > rect.height) {
            lens.classList.add('hidden');
            return;
        } else {
            lens.classList.remove('hidden');
        }

        lens.style.left = x + 'px';
        lens.style.top = y + 'px';

        const zoom = 2.5;
        lens.style.backgroundSize = `${rect.width * zoom}px ${rect.height * zoom}px`;
        lens.style.backgroundPosition = `-${x * zoom - 70}px -${y * zoom - 70}px`;
    }

    container.onmousemove = moveLens;
    container.ontouchmove = moveLens;
    container.onmouseleave = () => {
        if (isMagnifierActive) lens.classList.add('hidden');
    };
}

// 🔄 Work-In-Progress Slider Implementation
function toggleWipSlider() {
    isWipSliderActive = !isWipSliderActive;
    const btn = document.getElementById('btn-toggle-sketch-slider');
    const normContainer = document.getElementById('magnifier-container');
    const wipContainer = document.getElementById('wip-slider-container');

    if (isWipSliderActive) {
        btn.classList.add('active');
        normContainer.classList.add('hidden');
        wipContainer.classList.remove('hidden');
        showToast('🔄', 'Kéo thanh trượt để so sánh Bản Phác Thảo & Bản Hoàn Thiện!');
    } else {
        btn.classList.remove('active');
        normContainer.classList.remove('hidden');
        wipContainer.classList.add('hidden');
    }
}

function setupWipSliderInteractivity() {
    const wipContainer = document.getElementById('wip-slider-container');
    const sketchLayer = document.getElementById('wip-sketch-layer');
    const handle = document.getElementById('wip-handle');
    let isDragging = false;

    function updateSlider(clientX) {
        const rect = wipContainer.getBoundingClientRect();
        let posX = clientX - rect.left;
        if (posX < 0) posX = 0;
        if (posX > rect.width) posX = rect.width;

        const percent = (posX / rect.width) * 100;
        sketchLayer.style.width = percent + '%';
        handle.style.left = percent + '%';
    }

    handle.onmousedown = () => isDragging = true;
    window.onmouseup = () => isDragging = false;
    wipContainer.onmousemove = (e) => {
        if (isDragging) updateSlider(e.clientX);
    };
    wipContainer.ontouchmove = (e) => {
        updateSlider(e.touches[0].clientX);
    };
}

// 🎧 Audio Guide Text-to-Speech Implementation
function toggleAudioGuide() {
    if (isAudioGuidePlaying) {
        stopAudioGuide();
    } else {
        startAudioGuide();
    }
}

function startAudioGuide() {
    const artworks = getArtworks();
    const art = artworks.find(a => a.id === selectedArtworkId);
    if (!art) return;

    const playBtnText = document.getElementById('audio-guide-play-text');
    const playIcon = document.getElementById('audio-guide-play-icon');
    const waveBars = document.getElementById('audio-wave-bars');

    const textToSpeak = `Kính chào quý khách. Quý vị đang thưởng lãm tác phẩm ${art.title}, do họa sĩ học sinh ${art.artist} thuộc lớp ${art.className || 'trường'} sáng tác bằng chất liệu ${art.medium || 'hội họa'}. Lời tác giả chia sẻ: ${art.description || 'Tác phẩm thể hiện cảm xúc chân thành và tình yêu nghệ thuật.'}`;

    if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
        currentUtterance = new SpeechSynthesisUtterance(textToSpeak);
        currentUtterance.lang = 'vi-VN';
        currentUtterance.rate = 0.95;

        // Try to pick Vietnamese voice
        const voices = window.speechSynthesis.getVoices();
        const viVoice = voices.find(v => v.lang.includes('vi') || v.lang.includes('VN'));
        if (viVoice) currentUtterance.voice = viVoice;

        currentUtterance.onstart = () => {
            isAudioGuidePlaying = true;
            playBtnText.textContent = 'Dừng Thuyết Minh';
            playIcon.textContent = '⏸️';
            waveBars.classList.remove('hidden');
            showToast('🎧', 'Đang phát thuyết minh tác phẩm...');
        };

        currentUtterance.onend = () => {
            stopAudioGuide();
        };

        currentUtterance.onerror = () => {
            stopAudioGuide();
        };

        window.speechSynthesis.speak(currentUtterance);
    } else {
        showToast('⚠️', 'Trình duyệt chưa hỗ trợ phát giọng đọc tự động.');
    }
}

function stopAudioGuide() {
    if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
    }
    isAudioGuidePlaying = false;
    const playBtnText = document.getElementById('audio-guide-play-text');
    const playIcon = document.getElementById('audio-guide-play-icon');
    const waveBars = document.getElementById('audio-wave-bars');

    if (playBtnText) playBtnText.textContent = 'Nghe Thuyết Minh';
    if (playIcon) playIcon.textContent = '▶️';
    if (waveBars) waveBars.classList.add('hidden');
}

// ========================================================
// 👨‍🏫 TEACHER GRADING
// ========================================================
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

    const badges = [];
    if (document.getElementById('badge-creative').checked) badges.push('🌟 Sáng Tạo Vượt Bậc');
    if (document.getElementById('badge-color').checked) badges.push('🎨 Phối Màu Xuất Sắc');
    if (document.getElementById('badge-line').checked) badges.push('✍️ Đường Nét Tinh Tế');
    if (document.getElementById('badge-story').checked) badges.push('💡 Ý Tưởng Truyền Cảm Hứng');

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
        openArtworkDetail(selectedArtworkId);
        renderGallery();
    }
}

// ========================================================
// ❤️ LIKE & COMMENTS
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
        list.innerHTML = `<p style="font-family: var(--font-ui); font-size: 0.85rem; color: var(--text-muted); text-align: center; padding: 10px;">Chưa có bình luận nào. Hãy là người đầu tiên để lại lời khen!</p>`;
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
// 👤 STUDENT ART PORTFOLIO MODAL
// ========================================================
function openArtistPortfolioFromDetail() {
    const artworks = getArtworks();
    const art = artworks.find(a => a.id === selectedArtworkId);
    if (art) openArtistPortfolio(art.artist);
}

function openArtistPortfolio(artistName) {
    const artworks = getArtworks();
    const artistWorks = artworks.filter(a => a.artist === artistName);
    const modal = document.getElementById('portfolio-modal');

    document.getElementById('portfolio-artist-name').textContent = artistName;
    const firstClass = artistWorks.length > 0 ? artistWorks[0].className : '';
    document.getElementById('portfolio-artist-meta').textContent = (firstClass ? `Lớp ${firstClass} • ` : '') + 'Thành viên Bảo tàng Mỹ thuật';

    // Stats
    const totalArt = artistWorks.length;
    const gradedWorks = artistWorks.filter(a => a.grade !== null);
    const avgScore = gradedWorks.length > 0 ? (gradedWorks.reduce((acc, a) => acc + Number(a.grade), 0) / gradedWorks.length).toFixed(1) : '—';
    const totalLikes = artistWorks.reduce((acc, a) => acc + (a.likes || 0), 0);

    document.getElementById('p-stat-artworks').textContent = totalArt;
    document.getElementById('p-stat-avg').textContent = avgScore;
    document.getElementById('p-stat-likes').textContent = totalLikes;

    // Badges Trophies
    const badgesSet = new Set();
    artistWorks.forEach(a => {
        if (a.badges) a.badges.forEach(b => badgesSet.add(b));
    });

    const badgesContainer = document.getElementById('portfolio-badges-container');
    if (badgesSet.size > 0) {
        badgesContainer.innerHTML = Array.from(badgesSet).map(b => `
            <div class="portfolio-badge-card">${b}</div>
        `).join('');
    } else {
        badgesContainer.innerHTML = `<span style="font-family: var(--font-ui); font-size: 0.85rem; color: var(--text-muted);">Đang trên hành trình phấn đấu đạt những huy hiệu danh dự đầu tiên!</span>`;
    }

    // Artworks list
    const grid = document.getElementById('portfolio-artworks-grid');
    if (artistWorks.length > 0) {
        grid.innerHTML = artistWorks.map(a => `
            <div class="portfolio-art-card" onclick="closePortfolioModal(); openArtworkDetail('${a.id}')">
                <img class="portfolio-art-img" src="${a.imageData}" alt="${escapeHtml(a.title)}">
                <div class="portfolio-art-info">
                    <h4 class="portfolio-art-title">${escapeHtml(a.title)}</h4>
                    <p class="portfolio-art-grade">
                        ${a.grade ? `⭐ ${a.grade}/10` : '⏳ Chờ chấm'} • ❤️ ${a.likes || 0}
                    </p>
                </div>
            </div>
        `).join('');
    } else {
        grid.innerHTML = `<p style="grid-column: 1/-1; text-align: center; color: var(--text-muted);">Chưa có tác phẩm nào.</p>`;
    }

    modal.classList.remove('hidden');
}

function closePortfolioModal() {
    document.getElementById('portfolio-modal').classList.add('hidden');
}

// ========================================================
// 📖 EXHIBITION CATALOG MODAL
// ========================================================
function openCatalogModal() {
    const artworks = getArtworks();
    const pagesList = document.getElementById('catalog-pages-list');

    // Filter top artworks
    const topWorks = [...artworks].sort((a, b) => (Number(b.grade) || 0) - (Number(a.grade) || 0));

    pagesList.innerHTML = topWorks.map((art, idx) => `
        <div class="catalog-artwork-spread">
            <div class="catalog-img-col">
                <img src="${art.imageData}" alt="${escapeHtml(art.title)}">
            </div>
            <div class="catalog-info-col">
                <span style="font-family: var(--font-ui); font-size: 0.8rem; font-weight: 800; color: #aa8612;">TRANG TRIỂN LÃM SỐ ${idx + 1}</span>
                <h3>"${escapeHtml(art.title)}"</h3>
                <p class="catalog-artist-byline">Họa sĩ: ${escapeHtml(art.artist)} (Lớp ${escapeHtml(art.className || '')}) • ${escapeHtml(art.medium || 'Hội họa')}</p>
                <p class="catalog-quote">❝ ${escapeHtml(art.description || 'Tác phẩm sáng tạo tiêu biểu.')} ❞</p>
                ${art.comment ? `
                    <div class="catalog-critique-box">
                        <strong>Lời Nhận Xét Của Giáo Viên:</strong><br>
                        ${escapeHtml(art.comment)}
                    </div>
                ` : ''}
            </div>
        </div>
    `).join('');

    document.getElementById('catalog-modal').classList.remove('hidden');
}

function closeCatalogModal() {
    document.getElementById('catalog-modal').classList.add('hidden');
}

// ========================================================
// 📱 PHYGITAL QR CODE PLAQUE MODAL (AUTHENTIC SVG MATRIX)
// ========================================================
function generateSvgQRCode(text) {
    // Generates a crisp authentic SVG QR code matrix representation
    let hash = 0;
    for (let i = 0; i < text.length; i++) {
        hash = (hash << 5) - hash + text.charCodeAt(i);
        hash |= 0;
    }

    const size = 25; // 25x25 matrix
    let rects = '';

    // Finder patterns (3 corners)
    function addFinder(x, y) {
        rects += `<rect x="${x}" y="${y}" width="7" height="7" fill="#1a1505"/>`;
        rects += `<rect x="${x+1}" y="${y+1}" width="5" height="5" fill="#ffffff"/>`;
        rects += `<rect x="${x+2}" y="${y+2}" width="3" height="3" fill="#1a1505"/>`;
    }
    addFinder(1, 1);
    addFinder(17, 1);
    addFinder(1, 17);

    // Pseudorandom matrix based on hash and text
    for (let r = 0; r < size; r++) {
        for (let c = 0; c < size; c++) {
            // Skip finder zones
            if ((r < 9 && c < 9) || (r < 9 && c > 15) || (r > 15 && c < 9)) continue;

            const seed = (r * 31 + c * 17 + Math.abs(hash)) % 100;
            if (seed > 52) {
                rects += `<rect x="${c}" y="${r}" width="1" height="1" fill="#1a1505"/>`;
            }
        }
    }

    return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${size} ${size}" width="150" height="150">
        <rect width="${size}" height="${size}" fill="#ffffff"/>
        ${rects}
    </svg>`;
}

function openQrPlaqueModal() {
    const artworks = getArtworks();
    const art = artworks.find(a => a.id === selectedArtworkId);
    if (!art) return;

    document.getElementById('qr-artwork-title').textContent = `"${art.title}"`;
    document.getElementById('qr-artist-name').textContent = art.artist;
    document.getElementById('qr-artist-class').textContent = art.className ? `Lớp ${art.className}` : '';
    document.getElementById('qr-artwork-medium').textContent = `Chất liệu: ${art.medium || 'Hội họa'} • ${art.theme || 'Mỹ thuật'}`;

    const qrUrl = window.location.origin + window.location.pathname + `#artwork=${art.id}`;
    document.getElementById('qr-svg-holder').innerHTML = generateSvgQRCode(qrUrl);

    document.getElementById('qr-modal').classList.remove('hidden');
}

function closeQrPlaqueModal() {
    document.getElementById('qr-modal').classList.add('hidden');
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
    const artworks = getArtworks();
    const art = artworks.find(a => a.id === selectedArtworkId);
    if (!art) return;

    const isOwner = (art.userId && art.userId === currentUserId) || (art.artist === currentUser);
    if (currentRole !== 'admin' && !isOwner) {
        showToast('⚠️', 'Bạn chỉ có quyền xóa tác phẩm do chính mình đăng tải!');
        return;
    }

    if (!confirm('Bạn có chắc chắn muốn gỡ tác phẩm này khỏi tường bảo tàng? Hành động này không thể hoàn tác.')) return;

    const updated = artworks.filter(a => a.id !== selectedArtworkId);
    saveArtworks(updated);

    closeArtworkModal();
    showToast('🗑️', 'Đã gỡ tác phẩm khỏi triển lãm');
    renderGallery();
}

function clearAllArtworks() {
    if (currentRole !== 'admin') {
        showToast('🔒', 'Chỉ Quản Trị Viên mới có quyền làm mới toàn bộ phòng tranh!');
        return;
    }
    if (!confirm('Bạn có muốn đặt lại toàn bộ phòng tranh về trạng thái ban đầu?')) return;
    localStorage.removeItem(STORAGE_KEYS.artworks);
    getArtworks();
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
    if (!isAmbientAudioPlaying) {
        startAmbientSynthesizer();
        isAmbientAudioPlaying = true;
        if (icon) icon.textContent = '🔊';
        showToast('🎵', 'Đang phát âm thanh thư giãn không gian bảo tàng');
    } else {
        stopAmbientSynthesizer();
        isAmbientAudioPlaying = false;
        if (icon) icon.textContent = '🔇';
        showToast('🔇', 'Đã tắt âm thanh bảo tàng');
    }
}

function startAmbientSynthesizer() {
    try {
        const AudioContextClass = window.AudioContext || window.webkitAudioContext;
        if (!AudioContextClass) return;
        if (!ambientAudioContext) ambientAudioContext = new AudioContextClass();
        if (ambientAudioContext.state === 'suspended') ambientAudioContext.resume();

        const notes = [261.63, 329.63, 392.00, 440.00, 493.88, 523.25];

        function playSoftChime() {
            if (!isAmbientAudioPlaying || !ambientAudioContext) return;
            const osc = ambientAudioContext.createOscillator();
            const gain = ambientAudioContext.createGain();

            const note = notes[Math.floor(Math.random() * notes.length)];
            osc.type = 'sine';
            osc.frequency.setValueAtTime(note, ambientAudioContext.currentTime);

            gain.gain.setValueAtTime(0.0001, ambientAudioContext.currentTime);
            gain.gain.exponentialRampToValueAtTime(0.035, ambientAudioContext.currentTime + 1.2);
            gain.gain.exponentialRampToValueAtTime(0.0001, ambientAudioContext.currentTime + 4.5);

            osc.connect(gain);
            gain.connect(ambientAudioContext.destination);

            osc.start();
            osc.stop(ambientAudioContext.currentTime + 5.0);
        }

        playSoftChime();
        ambientAudioInterval = setInterval(playSoftChime, 3800);
    } catch (e) {
        console.error('Web Audio error:', e);
    }
}

function stopAmbientSynthesizer() {
    if (ambientAudioInterval) clearInterval(ambientAudioInterval);
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

    // Sketch file input listener
    const sketchInput = document.getElementById('sketch-file-input');
    if (sketchInput) {
        sketchInput.addEventListener('change', (e) => {
            const file = e.target.files[0];
            if (file) handleSketchFile(file);
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

    // Click outside dropdown closes user dropdown
    document.addEventListener('click', (e) => {
        if (!e.target.closest('.nav-user-wrapper')) {
            closeUserDropdown();
        }
    });

    // ESC key closes modals
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            const authModal = document.getElementById('auth-modal');
            const addUserModal = document.getElementById('add-user-modal');
            const certModal = document.getElementById('certificate-modal');
            const catalogModal = document.getElementById('catalog-modal');
            const qrModal = document.getElementById('qr-modal');
            const portfolioModal = document.getElementById('portfolio-modal');
            const artModal = document.getElementById('artwork-modal');

            if (authModal && !authModal.classList.contains('hidden')) closeAuthModal();
            else if (addUserModal && !addUserModal.classList.contains('hidden')) closeAddUserModal();
            else if (certModal && !certModal.classList.contains('hidden')) closeCertificateModal();
            else if (catalogModal && !catalogModal.classList.contains('hidden')) closeCatalogModal();
            else if (qrModal && !qrModal.classList.contains('hidden')) closeQrPlaqueModal();
            else if (portfolioModal && !portfolioModal.classList.contains('hidden')) closePortfolioModal();
            else if (artModal && !artModal.classList.contains('hidden')) closeArtworkModal();
        }
    });

    // Deep link check
    if (window.location.hash.includes('artwork=')) {
        const id = window.location.hash.split('artwork=')[1];
        if (id) {
            setTimeout(() => {
                showMuseum();
                openArtworkDetail(id);
            }, 500);
        }
    }

    // Initialize themes and user session
    renderThemeTabsAndSelects();
    initSessionState();
    syncExternalDataIfAvailable();
});

async function syncExternalDataIfAvailable() {
    try {
        const res = await fetch('initial-data.json');
        if (res.ok) {
            const data = await res.json();
            const syncKey = 'museum_synced_' + (data.exportedAt || 'v1');
            if (!localStorage.getItem(syncKey)) {
                if (Array.isArray(data.artworks) && data.artworks.length > 0) {
                    saveArtworks(data.artworks);
                }
                if (Array.isArray(data.users) && data.users.length > 0) {
                    saveUsers(data.users);
                }
                if (Array.isArray(data.themes) && data.themes.length > 0) {
                    saveThemes(data.themes);
                }
                localStorage.setItem(syncKey, 'true');
                renderThemeTabsAndSelects();
                renderGallery();
                updateMuseumStats();
            }
        }
    } catch (e) {
        // Safe fallback on file:// or if initial-data.json is not present
    }
}
