/*
 * ========================================================
 * 🌙 Kaguya Moonlight CoT Styler
 * Chủ đề: Trúc Lâm Dạ Nguyệt (Đêm trăng rừng trúc)
 * Dựa trên: silver-moon.js (Minh Nguyệt Thu Thanh)
 * Chỉnh sửa: Tương thích với thẻ <thinking> của Kaguya
 * ========================================================
 */
(function () {
  const SCRIPT_ID = typeof getScriptId === "function" ? getScriptId() : "kaguya_moon_styler";
  const STYLE_ID = `reasoning-style-${SCRIPT_ID}`;
  const DEBUG = false;

  function log(...args) {
    if (DEBUG) console.log("[KaguyaMoon]", ...args);
  }

  function getTopDocument() {
    try {
      return window.top?.document || document;
    } catch {
      return document;
    }
  }

  function getST() {
    return typeof SillyTavern !== "undefined" ? SillyTavern : null;
  }

  // =====================================================================
  // CẤU HÌNH REASONING — Kaguya dùng <thinking> ... </thinking>
  // =====================================================================
  function injectConfig() {
    const context = getST()?.getContext?.();
    if (!context) return;
    const settings = context.powerUserSettings ?? (context.powerUserSettings = {});
    if (!settings.reasoning) settings.reasoning = {};
    const config = settings.reasoning;
    config.auto_parse = true;
    config.prefix = "<thinking>";
    config.suffix = "</thinking>";
  }

  // ===================== CSS (Chủ đề Trúc Lâm Dạ Nguyệt) =====================
  const REASONING_CSS = String.raw`
/* ========================================================= */
/*  Chủ đề: Trúc Lâm Dạ Nguyệt · Kaguya Hime                */
/* ========================================================= */

#chat .mes_reasoning_details[data-state="thinking"],
#chat .mes_reasoning_details[data-state="done"] {
    margin: 16px 0 !important;
    width: 100% !important;
    position: relative !important;
    isolation: isolate !important;
    /* Bầu trời đêm sâu thẳm */
    background: linear-gradient(172deg, #060610 0%, #0c0e1a 45%, #060610 100%) !important;
    border: 1px solid rgba(180, 200, 255, 0.08) !important;
    border-radius: 12px !important;
    overflow: hidden !important;
    box-shadow: 0 4px 32px rgba(0,0,0,0.55), inset 0 1px 0 rgba(180,200,255,0.04) !important;
    transition: border-color 0.7s ease, box-shadow 0.7s ease !important;
    box-sizing: border-box !important;
    padding: 0 !important;
    display: block !important;
}

#chat .mes_reasoning_details[data-state="done"] {
    border-color: rgba(180, 200, 255, 0.15) !important;
    box-shadow: 0 4px 40px rgba(180,200,255,0.08), inset 0 1px 0 rgba(180,200,255,0.08) !important;
}

/* Vùng chứa bụi trúc (đặt trong summary để luôn hiển thị) */
.kaguya-bamboo-grove {
    position: absolute;
    bottom: 0;
    right: 0;
    width: 20%;
    height: 100%;
    pointer-events: none;
    z-index: 1 !important;
    overflow: visible;
    /* Gió thổi: skewX giữ đáy cố định, chỉ ngọn nghiêng */
    animation: bamboo-sway 5s ease-in-out infinite alternate;
    transform-origin: 50% 100%; /* Tâm xoay = chính giữa đáy */
    will-change: transform;
}
/* Khi mở rộng (open) → bụi trúc chiếm 1/3 */
#chat .mes_reasoning_details[open] .kaguya-bamboo-grove {
    width: 33%;
}
.kaguya-bamboo-grove svg {
    position: absolute;
    bottom: 0;
    right: 0;
    width: 100%;
    height: 100%;
}

#chat .mes_reasoning_details:not([open]) .kaguya-bamboo-grove {
    display: none !important;
}

/* Đom đóm bay lượn (Canvas overlay) */
.kaguya-fireflies-canvas {
    position: absolute;
    top: 0;
    left: 0;
    pointer-events: none;
    z-index: 0 !important; /* Sao nằm dưới trúc (trúc z-index: 1) */
}

/* (Sao tĩnh CSS đã được xóa — Canvas xử lý cả 2 trạng thái đóng/mở) */

@keyframes bamboo-sway {
    0%   { transform: skewX(-2deg); }
    33%  { transform: skewX(1.5deg); }
    66%  { transform: skewX(-1deg); }
    100% { transform: skewX(2.5deg); }
}

/* Phần đầu */
#chat .mes_reasoning_details[data-state] .mes_reasoning_summary,
#chat .mes_reasoning_details[data-state] .mes_reasoning_header_block,
#chat .mes_reasoning_details[data-state] .mes_reasoning_header {
    margin: 0 !important;
    width: 100% !important;
    box-sizing: border-box !important;
    background: transparent !important;
    border: none !important;
    box-shadow: none !important;
    outline: none !important;
}
#chat .mes_reasoning_details[data-state] .mes_reasoning_summary {
    position: relative;
    /* KHÔNG set z-index ở đây để không tạo stacking context, cho trúc nằm dưới chữ */
    padding: 20px !important;
    min-height: 64px;
    color: rgba(180,200,230,0.65) !important;
    font-weight: 500 !important;
    cursor: pointer !important;
    list-style: none !important;
    display: flex !important;
    align-items: center !important;
    transition: background 0.3s ease !important;
    user-select: none !important;
    overflow: visible !important;
    border-radius: 12px !important;
}
#chat .mes_reasoning_details[data-state] .mes_reasoning_summary:hover {
    background: rgba(180,200,255,0.04) !important;
}
#chat .mes_reasoning_details[data-state] .mes_reasoning_summary::-webkit-details-marker {
    display: none !important;
}
#chat .mes_reasoning_details[data-state] .mes_reasoning_summary::marker {
    content: '';
    font-size: 0;
}
#chat .mes_reasoning_details[data-state] .mes_reasoning_header {
    display: flex !important;
    align-items: center !important;
    gap: 12px !important;
    width: 100% !important;
    cursor: pointer !important;
    position: relative;
    z-index: 10;
}

/* Che chắn các biểu tượng mặc định */
#chat .mes_reasoning_details[data-state] .thinking-icon,
#chat .mes_reasoning_details[data-state] .icon-svg,
#chat .mes_reasoning_details[data-state] .mes_reasoning_arrow,
#chat .mes_reasoning_details[data-state] .mes_reasoning_header_text {
    display: none !important;
    font-size: 0 !important;
    opacity: 0 !important;
}

/* Chữ tiêu đề */
#chat .mes_reasoning_details[data-state] .mes_reasoning_header_title {
    padding-left: 76px !important;
    font-family: 'Noto Serif SC', serif !important;
    font-size: 1rem !important;
    font-weight: 500 !important;
    letter-spacing: 0.02em !important;
    color: rgba(220,230,255,0.75) !important;
    transition: color 0.8s ease !important;
    flex: 1 !important;
    cursor: pointer !important;
    display: flex !important;
    align-items: center !important;
    gap: 12px !important;
    flex-wrap: wrap !important;
}

/* Tiêu đề trạng thái đang suy nghĩ */
#chat .mes_reasoning_details[data-state="thinking"] .mes_reasoning_header_title::before {
    content: '\2726 Vạn vì sao lấp lánh, tư duy đang dệt giấc mơ...';
    color: rgba(220, 230, 255, 0.80);
    text-shadow: 0 0 18px rgba(180, 200, 255, 0.30);
    animation: sm-title-pulse 3.2s ease-in-out infinite;
}
@keyframes sm-title-pulse {
    0%, 100% { opacity: 0.5; transform: scale(0.92); }
    50%      { opacity: 0.95; transform: scale(1.06); }
}

/* Tiêu đề trạng thái đã hoàn thành */
#chat .mes_reasoning_details[data-state="done"] .mes_reasoning_header_title::before {
    content: '\2726 Ngân hà soi rọi, trúc ngàn xào xạc, tư duy viên mãn';
    color: #b0c8ee;
    text-shadow: 0 0 28px rgba(160,200,255,0.40), 0 0 56px rgba(160,200,255,0.15);
}

/* Khu vực nội dung */
#chat .mes_reasoning_details[data-state] .mes_reasoning {
    position: relative;
    z-index: 5 !important;
    padding: 20px 24px 24px !important;
    margin: 0 !important;
    border: none !important;
    border-top: 1px solid rgba(180,200,255,0.08) !important;
    /* Xanh rêu chuyển lên trong suốt */
    background: linear-gradient(to top, rgba(4,6,14,0.7), transparent) !important;
    color: rgba(230,235,255,0.92) !important;
    font-size: 0.9rem !important;
    line-height: 1.85 !important;
    max-height: 340px;
    overflow-y: auto;
    font-weight: 400;
}
#chat .mes_reasoning_details[data-state] .mes_reasoning::-webkit-scrollbar { width: 4px; }
#chat .mes_reasoning_details[data-state] .mes_reasoning::-webkit-scrollbar-track { background: transparent; }
#chat .mes_reasoning_details[data-state] .mes_reasoning::-webkit-scrollbar-thumb {
    background: rgba(180,200,255,0.15);
    border-radius: 2px;
    transition: background 0.22s ease;
}
#chat .mes_reasoning_details[data-state] .mes_reasoning::-webkit-scrollbar-thumb:hover {
    background: rgba(180,200,255,0.25);
}

/* ========== Hệ thống Mặt Trăng (Trăng Trắng Bạc) ========== */
#chat .mes_reasoning_details[data-state="thinking"] .mes_reasoning_header::before,
#chat .mes_reasoning_details[data-state="done"] .mes_reasoning_header::before {
    content: '';
    position: absolute;
    left: 8px;
    top: 50%;
    width: 52px;
    height: 52px;
    border-radius: 50%;
    z-index: 12;
    flex-shrink: 0;
    transform: translateY(-50%);
}

/* Trạng thái đang suy nghĩ: Trăng khuyết Trắng Bạc (sạch, không hào quang tròn) */
#chat .mes_reasoning_details[data-state="thinking"] .mes_reasoning_header::before {
    background: transparent;
    box-shadow:
        inset 14px -5px 0px 0px rgba(255, 255, 255, 0.95),
        inset 12px -4px 5px 1px rgba(230, 240, 255, 0.6),
        inset 10px -3px 10px 2px rgba(200, 220, 255, 0.3);
    animation: sm-crescent-breathe 3.2s ease-in-out infinite;
}
@keyframes sm-crescent-breathe {
    0%, 100% { opacity: 0.7;  transform: translateY(-50%) scale(0.95);  }
    50%      { opacity: 1; transform: translateY(-50%) scale(1.08); }
}

/* Trạng thái hoàn thành: Trăng tròn Trắng Bạc rực */
#chat .mes_reasoning_details[data-state="done"] .mes_reasoning_header::before {
    background: radial-gradient(circle at 36% 34%,
        #ffffff 0%, #e8eeff 32%, #c8d8ff 65%, #a0b8e8 92%, #8aa0d0 100%);
    box-shadow:
        0 0 20px rgba(200, 220, 255, 0.50),
        0 0 44px rgba(200, 220, 255, 0.30),
        0 0 72px rgba(200, 220, 255, 0.12);
}

/* Hào quang Mặt trăng (chỉ cho trạng thái done - trăng tròn) */
#chat .mes_reasoning_details[data-state="thinking"] .mes_reasoning_header::after {
    display: none;
}
#chat .mes_reasoning_details[data-state="done"] .mes_reasoning_header::after {
    content: '';
    position: absolute;
    left: 8px;
    top: 50%;
    width: 80px;
    height: 80px;
    transform: translate(-19px, -50%);
    border-radius: 50%;
    z-index: 11;
    pointer-events: none;
    filter: blur(7px);
    background: radial-gradient(circle at 36% 34%, rgba(200,230,255,0.2) 0%, transparent 60%);
}

/* Thích ứng với thiết bị (Responsive) */
@media (max-width: 600px) {
    #chat .mes_reasoning_details[data-state] .mes_reasoning_summary {
        padding: 14px 12px !important;
        min-height: 50px;
    }
    #chat .mes_reasoning_details[data-state="thinking"] .mes_reasoning_header::before,
    #chat .mes_reasoning_details[data-state="done"] .mes_reasoning_header::before {
        width: 32px;
        height: 32px;
        left: 4px;
    }
    #chat .mes_reasoning_details[data-state="thinking"] .mes_reasoning_header::after,
    #chat .mes_reasoning_details[data-state="done"] .mes_reasoning_header::after {
        width: 60px;
        height: 60px;
        left: 4px;
        transform: translate(-14px, -50%);
    }
    #chat .mes_reasoning_details[data-state] .mes_reasoning_header_title {
        padding-left: 50px !important;
        font-size: 0.88rem !important;
    }
    #chat .mes_reasoning_details[data-state] .mes_reasoning {
        padding: 12px 16px !important;
    }
    @keyframes sm-crescent-glow {
        0%, 100% { opacity: 0.25; transform: translate(-14px, -50%) scale(0.88); }
        50%      { opacity: 0.55; transform: translate(-14px, -50%) scale(1.18); }
    }
}

/* Giảm cấp cho người dùng nhạy cảm với chuyển động */
@media (prefers-reduced-motion: reduce) {
    #chat .mes_reasoning_details[data-state] * {
        animation-duration: 0.01ms !important;
        animation-iteration-count: 1 !important;
        transition-duration: 0.01ms !important;
    }
}
`;

  // ===================== Tiêm (Inject) và Gỡ bỏ (Uninstall) =====================
  function injectStyleOnce(doc) {
    if (!doc || !doc.head) return;
    let style = doc.getElementById(STYLE_ID);
    if (!style) {
      style = doc.createElement("style");
      style.id = STYLE_ID;
      doc.head.appendChild(style);
    }
    style.textContent = REASONING_CSS;
  }

  function injectStyle() {
    const topDoc = getTopDocument();
    injectStyleOnce(topDoc);
    if (topDoc !== document) injectStyleOnce(document);
  }

  function removeStyle() {
    const topDoc = getTopDocument();
    for (const doc of [topDoc, document]) {
      const style = doc?.getElementById?.(STYLE_ID);
      if (style) style.remove();
    }
  }

  // ===================== Bụi Trúc SVG + Đom Đóm Canvas =====================
  const SVG_NS = "http://www.w3.org/2000/svg";

  /**
   * Tạo một thân trúc (culm) với đốt + ngọn cong + lá
   * @param {number} baseX - Vị trí x gốc
   * @param {number} baseY - Vị trí y gốc (đáy)  
   * @param {number} height - Chiều cao thân
   * @param {number} width - Bề ngang thân
   * @param {number} lean - Độ nghiêng (deg, dương = nghiêng phải)
   * @param {string} color - Màu thân chính
   * @param {string} nodeColor - Màu đốt trúc  
   * @param {number} age - 0=non, 1=trưởng thành, 2=già
   */
  function createCulm(svg, baseX, baseY, height, width, lean, color, nodeColor, age) {
    const g = document.createElementNS(SVG_NS, "g");
    g.setAttribute("transform", `rotate(${lean} ${baseX} ${baseY})`);

    // Thân trúc (hình thang nhẹ, trên nhỏ dưới to)
    const topW = width * 0.6;
    const body = document.createElementNS(SVG_NS, "polygon");
    body.setAttribute("points",
      `${baseX - topW/2},${baseY - height} ${baseX + topW/2},${baseY - height} ` +
      `${baseX + width/2},${baseY} ${baseX - width/2},${baseY}`);
    body.setAttribute("fill", color);
    if (age === 2) body.setAttribute("opacity", "0.7");
    g.appendChild(body);

    // Highlight sáng dọc thân (phản chiếu ánh trăng)
    const hl = document.createElementNS(SVG_NS, "rect");
    hl.setAttribute("x", baseX - topW/4);
    hl.setAttribute("y", baseY - height);
    hl.setAttribute("width", topW * 0.35);
    hl.setAttribute("height", height);
    hl.setAttribute("fill", "rgba(200,255,210,0.08)");
    hl.setAttribute("rx", "1");
    g.appendChild(hl);

    // Đốt trúc (nodes) - khoảng cách giữa các đốt ngắn dần lên ngọn
    const nodeCount = Math.floor(height / 28) + 1;
    for (let i = 1; i <= nodeCount; i++) {
      const ratio = i / (nodeCount + 1);
      const ny = baseY - height * ratio;
      const nw = width * (1 - ratio * 0.35);
      const node = document.createElementNS(SVG_NS, "ellipse");
      node.setAttribute("cx", baseX);
      node.setAttribute("cy", ny);
      node.setAttribute("rx", nw / 2 + 1);
      node.setAttribute("ry", 1.5);
      node.setAttribute("fill", nodeColor);
      g.appendChild(node);

      // Cành + lá ở một số đốt  
      if (i % 2 === 1 && i < nodeCount) {
        const side = i % 4 < 2 ? -1 : 1; // Xen kẽ trái phải
        const branchLen = 15 + Math.random() * 12;
        const branchAngle = side * (25 + Math.random() * 20);
        const bx = baseX + side * nw / 2;
        
        const branch = document.createElementNS(SVG_NS, "line");
        branch.setAttribute("x1", bx);
        branch.setAttribute("y1", ny);
        const endX = bx + Math.cos(branchAngle * Math.PI / 180) * branchLen * side;
        const endY = ny - Math.sin(branchAngle * Math.PI / 180) * branchLen * 0.5 + branchLen * 0.3;
        branch.setAttribute("x2", endX);
        branch.setAttribute("y2", endY);
        branch.setAttribute("stroke", color);
        branch.setAttribute("stroke-width", "1.2");
        branch.setAttribute("stroke-linecap", "round");
        g.appendChild(branch);

        // 2-3 lá mỏng hình mũi mác trên mỗi cành
        const leafCount = 2 + Math.floor(Math.random() * 2);
        for (let j = 0; j < leafCount; j++) {
          const t = 0.4 + j * 0.25;
          const lx = bx + (endX - bx) * t;
          const ly = ny + (endY - ny) * t;
          const leafLen = 8 + Math.random() * 6;
          const leafAng = branchAngle + (Math.random() - 0.5) * 40;
          const lEndX = lx + Math.cos(leafAng * Math.PI / 180) * leafLen * side;
          const lEndY = ly + Math.sin(leafAng * Math.PI / 180) * leafLen * 0.3 + leafLen * 0.15;
          
          const leaf = document.createElementNS(SVG_NS, "path");
          const cp1x = (lx + lEndX) / 2 + (Math.random() - 0.5) * 4;
          const cp1y = Math.min(ly, lEndY) - 3 - Math.random() * 3;
          const cp2x = (lx + lEndX) / 2 + (Math.random() - 0.5) * 4;
          const cp2y = Math.max(ly, lEndY) + 2 + Math.random() * 2;
          leaf.setAttribute("d",
            `M ${lx} ${ly} Q ${cp1x} ${cp1y} ${lEndX} ${lEndY} Q ${cp2x} ${cp2y} ${lx} ${ly}`);
          const greenVal = age === 0 ? 14 + Math.floor(Math.random() * 8) :
                           age === 1 ? 12 + Math.floor(Math.random() * 6) :
                                        10 + Math.floor(Math.random() * 5);
          leaf.setAttribute("fill", `rgb(${10 + age * 2}, ${greenVal}, ${12 + age * 3})`);
          leaf.setAttribute("opacity", (0.9 + Math.random() * 0.1).toFixed(2));
          g.appendChild(leaf);
        }
      }
    }

    // Ngọn trúc cong mềm (đầu nhọn uốn xuống do sức nặng lá)
    const tipX = baseX;
    const tipY = baseY - height;
    const tipCurve = document.createElementNS(SVG_NS, "path");
    const curveDir = lean > 0 ? 1 : -1;
    tipCurve.setAttribute("d",
      `M ${tipX} ${tipY} Q ${tipX + curveDir * 8} ${tipY - 15} ${tipX + curveDir * 18} ${tipY - 8}`);
    tipCurve.setAttribute("stroke", color);
    tipCurve.setAttribute("stroke-width", (topW * 0.4).toFixed(1));
    tipCurve.setAttribute("fill", "none");
    tipCurve.setAttribute("stroke-linecap", "round");
    g.appendChild(tipCurve);

    // Chùm lá ở ngọn
    for (let k = 0; k < 3; k++) {
      const leafTip = document.createElementNS(SVG_NS, "path");
      const ltx = tipX + curveDir * (10 + k * 5);
      const lty = tipY - 12 + k * 3;
      const ltex = ltx + curveDir * (8 + Math.random() * 6);
      const ltey = lty + 4 + Math.random() * 4;
      leafTip.setAttribute("d",
        `M ${ltx} ${lty} Q ${(ltx+ltex)/2} ${lty - 3} ${ltex} ${ltey} Q ${(ltx+ltex)/2} ${lty + 3} ${ltx} ${lty}`);
      leafTip.setAttribute("fill", age === 0 ? "#101018" : age === 1 ? "#0c0c14" : "#080810");
      leafTip.setAttribute("opacity", "0.8");
      g.appendChild(leafTip);
    }

    svg.appendChild(g);
  }

  /**
   * Tạo bụi trúc hoàn chỉnh theo cấu trúc sinh học
   */
  function createBambooGrove(container) {
    if (container.querySelector(".kaguya-bamboo-grove")) return;

    const wrapper = document.createElement("div");
    wrapper.className = "kaguya-bamboo-grove";

    const svg = document.createElementNS(SVG_NS, "svg");
    svg.setAttribute("viewBox", "0 0 120 200");
    svg.setAttribute("preserveAspectRatio", "xMidYMax meet");

    // Gốc bụi / đất
    const ground = document.createElementNS(SVG_NS, "ellipse");
    ground.setAttribute("cx", "60");
    ground.setAttribute("cy", "198");
    ground.setAttribute("rx", "45");
    ground.setAttribute("ry", "6");
    ground.setAttribute("fill", "#0a0a14");
    svg.appendChild(ground);

    // Lá rụng trên mặt đất
    for (let i = 0; i < 5; i++) {
      const dl = document.createElementNS(SVG_NS, "ellipse");
      dl.setAttribute("cx", 30 + Math.random() * 60);
      dl.setAttribute("cy", 195 + Math.random() * 5);
      dl.setAttribute("rx", 2 + Math.random() * 3);
      dl.setAttribute("ry", 0.8);
      dl.setAttribute("fill", '#0a0a14');
      dl.setAttribute("transform", `rotate(${Math.random()*360} ${dl.getAttribute("cx")} ${dl.getAttribute("cy")})`);
      svg.appendChild(dl);
    }

    // Hàm random trong khoảng
    const R = (min, max) => min + Math.random() * (max - min);

    // === TÂM BỤI LỆCH PHẢI (phá đối xứng) ===
    const cx = 68; // Tâm bụi lệch phải thay vì 60

    // === LAYER 1: Lõi (Cây già, thẳng đứng, sẫm màu) ===
    createCulm(svg, cx - 2, 197, R(148, 162), R(6, 8), R(-2, 3), "#0c0c14", "#080810", 2);
    createCulm(svg, cx + 5, 197, R(130, 145), R(5, 7), R(0, 4), "#0c0c14", "#080810", 2);

    // === LAYER 2: Vòng giữa (Trưởng thành, nghiêng 5-10°) ===
    createCulm(svg, cx - 15, 197, R(158, 175), R(7, 9), R(-9, -5), "#0e0e16", "#0a0a12", 1);
    createCulm(svg, cx - 22, 197, R(140, 155), R(6, 8), R(-6, -3), "#0e0e16", "#0a0a12", 1);
    createCulm(svg, cx + 12, 197, R(160, 178), R(8, 10), R(6, 12), "#0e0e16", "#0a0a12", 1);

    // === LAYER 3: Rìa ngoài (Non, nghiêng 15-35°, bất đối xứng) ===
    createCulm(svg, cx - 32, 197, R(85, 110), R(4, 6), R(-18, -25), "#101018", "#0c0c14", 0);
    createCulm(svg, cx - 42, 197, R(55, 75), R(3, 4.5), R(-28, -35), "#101018", "#0c0c14", 0);
    createCulm(svg, cx + 22, 197, R(75, 95), R(3.5, 5), R(20, 30), "#101018", "#0c0c14", 0);

    // Búp măng non
    const shootPositions = [cx - 48, cx - 38, cx + 28, cx + 18];
    for (const mx of shootPositions) {
      if (Math.random() > 0.3) {
        const shoot = document.createElementNS(SVG_NS, "path");
        const sh = R(8, 18);
        const shootLean = (mx < cx ? -1 : 1) * R(5, 20);
        shoot.setAttribute("d",
          `M ${mx} 197 L ${mx + shootLean * 0.15} ${197 - sh} L ${mx + R(1.5, 3)} 197 Z`);
        shoot.setAttribute("fill", "#0a0a12");
        shoot.setAttribute("opacity", R(0.7, 0.95).toFixed(2));
        svg.appendChild(shoot);
      }
    }

    // Gốc trúc chết
    if (Math.random() > 0.4) {
      const stump = document.createElementNS(SVG_NS, "rect");
      stump.setAttribute("x", cx + R(-8, 2));
      stump.setAttribute("y", 193);
      stump.setAttribute("width", R(3, 5));
      stump.setAttribute("height", R(3, 6));
      stump.setAttribute("fill", "#080810");
      stump.setAttribute("rx", "1");
      svg.appendChild(stump);
    }

    wrapper.appendChild(svg);

    // Đặt vào SUMMARY (để luôn hiển thị kể cả khi details đóng)
    const summary = container.querySelector('.mes_reasoning_summary, summary');
    if (summary) {
      summary.appendChild(wrapper);
    } else {
      container.insertBefore(wrapper, container.firstChild);
    }

    // Sync kích thước bụi trúc với container (details)
    function syncSize() {
      const detailsRect = container.getBoundingClientRect();
      const summaryRect = (summary || container).getBoundingClientRect();
      const totalH = detailsRect.height;
      const offsetBottom = totalH - summaryRect.height;
      wrapper.style.height = totalH + 'px';
      wrapper.style.bottom = -offsetBottom + 'px';
    }
    syncSize();
    container.addEventListener('toggle', () => setTimeout(syncSize, 50));
    try { new ResizeObserver(syncSize).observe(container); } catch(e) {}
  }

  /**
   * Bầu trời sao lấp lánh (Canvas 2D) — Bức tranh cố định
   * Sao KHÔNG đổi vị trí. Đóng/mở chỉ thay đổi vùng nhìn thấy.
   */
  function createFireflies(container) {
    if (container.querySelector(".kaguya-fireflies-canvas")) return;

    const canvas = document.createElement("canvas");
    canvas.className = "kaguya-fireflies-canvas";

    // Đặt vào SUMMARY (để luôn hiển thị kể cả khi details đóng)
    const summary = container.querySelector('.mes_reasoning_summary, summary');
    if (summary) {
      summary.appendChild(canvas);
    } else {
      container.insertBefore(canvas, container.firstChild);
    }

    const ctx = canvas.getContext("2d");
    const STAR_COUNT = 500;
    const SKY_HEIGHT = 700; // Chiều cao bầu trời — nhỏ hơn để sao dày đặc hơn
    const stars = [];

    for (let i = 0; i < STAR_COUNT; i++) {
      stars.push({
        x: 0, y: 0,
        r: 0.3 + Math.random() * 1.2,
        phase: Math.random() * Math.PI * 2,
        speed: 0.005 + Math.random() * 0.02,
        isCross: Math.random() > 0.95
      });
    }

    let initialized = false;

    function resize() {
      const rect = container.getBoundingClientRect();
      const w = Math.floor(rect.width);
      // Chiều cao canvas = max(container hiện tại, SKY_HEIGHT)
      // Đảm bảo sao luôn có ở mọi vùng
      const h = Math.max(Math.floor(rect.height), SKY_HEIGHT);
      if (canvas.width !== w) canvas.width = w;
      if (canvas.height !== h) canvas.height = h;
      canvas.style.width = w + 'px';
      canvas.style.height = h + 'px';
      canvas.style.left = '0px';
      canvas.style.top = '0px';
    }
    resize();
    container.addEventListener('toggle', () => setTimeout(resize, 50));
    try { new ResizeObserver(resize).observe(container); } catch(e) {}

    // Đặt sao MỘT LẦN DUY NHẤT — không bao giờ đổi vị trí
    function initStars() {
      if (initialized) return;
      const w = canvas.width;
      if (w < 10) return;
      initialized = true;
      for (const s of stars) {
        s.x = Math.random() * w;
        s.y = Math.random() * SKY_HEIGHT;
      }
    }

    let animId = null;
    let frameCount = 0;

    function animate() {
      frameCount++;
      if (frameCount % 60 === 0) resize();

      initStars();

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (const s of stars) {
        s.phase += s.speed;
        const alpha = 0.2 + 0.8 * Math.abs(Math.sin(s.phase));

        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(220, 235, 255, ${alpha})`;
        ctx.fill();

        // Tia sáng chữ thập cho sao sáng
        if (s.isCross) {
          ctx.fillStyle = `rgba(220, 240, 255, ${alpha * 0.4})`;
          ctx.fillRect(s.x - s.r * 4, s.y - 0.3, s.r * 8, 0.6);
          ctx.fillRect(s.x - 0.3, s.y - s.r * 4, 0.6, s.r * 8);
        }
      }

      animId = requestAnimationFrame(animate);
    }
    animate();

    // Dọn dẹp khi element bị remove
    const obs = new MutationObserver(() => {
      if (!container.isConnected || !canvas.isConnected) {
        cancelAnimationFrame(animId);
        obs.disconnect();
      }
    });
    obs.observe(container.parentNode || document.body, { childList: true, subtree: true });
  }

  /**
   * Quan sát DOM để inject bụi trúc + đom đóm vào mỗi hộp thinking mới
   * TỐI ƯU: Chỉ tin nhắn cuối cùng mới có trúc + đom đóm hoạt động
   */
  function observeReasoningBoxes(doc) {
    const chatEl = doc.getElementById("chat");
    if (!chatEl) return;

    // Track tất cả active boxes để cleanup
    const activeBoxes = new Set();

    function deactivateBox(box) {
      // Xóa trúc
      const grove = box.querySelector('.kaguya-bamboo-grove');
      if (grove) grove.remove();
      // Xóa canvas đom đóm (animation tự dừng nhờ MutationObserver cleanup)
      const canvas = box.querySelector('.kaguya-fireflies-canvas');
      if (canvas) canvas.remove();
      // Cũng check trong summary
      const summary = box.querySelector('.mes_reasoning_summary, summary');
      if (summary) {
        summary.querySelectorAll('.kaguya-bamboo-grove, .kaguya-fireflies-canvas').forEach(el => el.remove());
      }
      box.removeAttribute('data-kaguya-active');
      activeBoxes.delete(box);
    }

    function activateBox(box) {
      if (box.hasAttribute('data-kaguya-active')) return;
      box.setAttribute('data-kaguya-active', '1');
      activeBoxes.add(box);
      createBambooGrove(box);
      createFireflies(box);

      // Pause/Resume khi toggle open/close
      setupTogglePause(box);
    }

    function setupTogglePause(box) {
      if (box._kaguyaToggleSet) return;
      box._kaguyaToggleSet = true;

      function handleToggle() {
        const isOpen = box.hasAttribute('open');
        const summary = box.querySelector('.mes_reasoning_summary, summary');
        const target = summary || box;
        const grove = target.querySelector('.kaguya-bamboo-grove');
        const canvas = target.querySelector('.kaguya-fireflies-canvas');

        if (!isOpen) {
          // Thu nhỏ → dừng animation trúc (canvas sao VẪN hiển thị + lấp lánh)
          if (grove) grove.style.animationPlayState = 'paused';
        } else {
          // Mở rộng → resume
          if (grove) grove.style.animationPlayState = 'running';
          if (canvas) canvas.style.display = '';
        }
      }

      box.addEventListener('toggle', handleToggle);
      // Set trạng thái ban đầu
      handleToggle();
    }

    function refreshActiveBox() {
      // Tìm tất cả reasoning boxes
      const allBoxes = Array.from(
        chatEl.querySelectorAll('.mes_reasoning_details[data-state]')
      );
      if (allBoxes.length === 0) return;

      // Box cuối cùng = tin nhắn mới nhất
      const lastBox = allBoxes[allBoxes.length - 1];

      // Deactivate tất cả box CŨ (không phải box cuối)
      for (const box of activeBoxes) {
        if (box !== lastBox) {
          deactivateBox(box);
        }
      }

      // Activate box cuối nếu chưa active
      activateBox(lastBox);
    }

    // Xử lý lần đầu
    refreshActiveBox();

    // Quan sát box mới xuất hiện
    const mo = new MutationObserver((mutations) => {
      let needRefresh = false;
      for (const m of mutations) {
        for (const node of m.addedNodes) {
          if (node.nodeType !== 1) continue;
          if (node.matches?.('.mes_reasoning_details[data-state]')) needRefresh = true;
          if (node.querySelector?.('.mes_reasoning_details[data-state]')) needRefresh = true;
        }
        if (m.type === 'attributes' && m.attributeName === 'data-state') {
          needRefresh = true;
        }
      }
      if (needRefresh) refreshActiveBox();
    });
    mo.observe(chatEl, { childList: true, subtree: true, attributes: true, attributeFilter: ['data-state'] });
  }

  function init() {
    injectConfig();
    injectStyle();
    const topDoc = getTopDocument();
    observeReasoningBoxes(topDoc);
    if (topDoc !== document) observeReasoningBoxes(document);
    window.addEventListener("pagehide", removeStyle);
    log("KaguyaMoon styler initialized with Bamboo Forest Theme.");
  }

  // Khởi động
  $(() => {
    errorCatched(init)();
  });
})();
