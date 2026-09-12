import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Rocket, Leaf, GraduationCap, Coins, Sparkles,
  Trophy, Award, Medal, Users, Briefcase, FileBadge, Code2, Network,
  MapPin, Mail, Phone, Instagram, Linkedin, Calendar, Clock, ArrowRight,
  Menu, X, Github, Twitter, Wheat, Building2, Laptop, Gift,
  Shield, Star, Zap, CheckCircle2, TrendingUp, Cpu, Wifi, Activity,
} from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export const Route = createFileRoute("/")({
  component: InoVateXLanding,
});

const TARGET_DATE = new Date("2026-10-09T09:00:00+05:30").getTime();

function useCountdown() {
  const [t, setT] = useState({ d: 0, h: 0, m: 0, s: 0 });
  useEffect(() => {
    const tick = () => {
      const diff = Math.max(0, TARGET_DATE - Date.now());
      setT({
        d: Math.floor(diff / 86400000),
        h: Math.floor((diff / 3600000) % 24),
        m: Math.floor((diff / 60000) % 60),
        s: Math.floor((diff / 1000) % 60),
      });
    };
    tick();
    const i = setInterval(tick, 1000);
    return () => clearInterval(i);
  }, []);
  return t;
}

// ─── MONEY RAIN (prizes section) ──────────────────────────────────────────────
function MoneyRain() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d")!;
    let raf = 0;
    const resize = () => { canvas.width = canvas.offsetWidth; canvas.height = canvas.offsetHeight; };
    resize();
    type Coin = { x:number; y:number; size:number; speed:number; opacity:number; char:string; rot:number; rotSpeed:number };
    const symbols = ["₹","₹","₹","✦","★","◆","◉"];
    const coins: Coin[] = Array.from({ length: 55 }, () => ({
      x: Math.random() * (canvas.width || 800),
      y: Math.random() * (canvas.height || 400) - (canvas.height || 400),
      size: 10 + Math.random() * 22,
      speed: 0.4 + Math.random() * 1.2,
      opacity: 0.2 + Math.random() * 0.5,
      char: symbols[Math.floor(Math.random() * symbols.length)],
      rot: Math.random() * Math.PI * 2,
      rotSpeed: (Math.random() - 0.5) * 0.06,
    }));
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      coins.forEach(c => {
        ctx.save();
        ctx.translate(c.x, c.y);
        ctx.rotate(c.rot);
        ctx.globalAlpha = c.opacity;
        ctx.fillStyle = c.char === "₹" ? `rgba(245,166,35,${c.opacity})` : `rgba(255,210,60,${c.opacity * 0.7})`;
        ctx.font = `bold ${c.size}px monospace`;
        ctx.textAlign = "center";
        ctx.fillText(c.char, 0, 0);
        if (c.char !== "₹") {
          ctx.strokeStyle = `rgba(245,166,35,${c.opacity * 0.4})`;
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.arc(0, 0, c.size * 0.55, 0, Math.PI * 2);
          ctx.stroke();
        }
        ctx.restore();
        c.y += c.speed;
        c.rot += c.rotSpeed;
        if (c.y > (canvas.height || 400) + 20) {
          c.y = -20;
          c.x = Math.random() * (canvas.width || 800);
          c.opacity = 0.2 + Math.random() * 0.5;
        }
      });
      raf = requestAnimationFrame(draw);
    };
    draw();
    return () => cancelAnimationFrame(raf);
  }, []);
  return <canvas ref={canvasRef} style={{ position:"absolute", inset:0, width:"100%", height:"100%", pointerEvents:"none", zIndex:0 }} />;
}

// ─── MOBILE HERO CANVAS — floating code particles ──────────────────────────────
function MobileHeroCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d")!;
    let raf = 0, frame = 0;
    const resize = () => { canvas.width = canvas.offsetWidth || window.innerWidth; canvas.height = canvas.offsetHeight || window.innerHeight; };
    resize();
    window.addEventListener("resize", resize);

    const SYMBOLS = ["</>","{}","//","=>","git","npm","AI","&&","||","01","10","fn","🔥","⚡","💡","🚀","∑","π","∞"];
    const COLORS = ["#38BDF8","#60a5fa","#a78bfa","#fbbf24","#34d399","#fb7185"];
    const N = 28;
    type Particle = { x:number; y:number; vx:number; vy:number; alpha:number; size:number; symbol:string; color:string; spin:number; spinV:number; };
    const particles: Particle[] = Array.from({length:N}, () => ({
      x: Math.random(), y: Math.random(),
      vx: (Math.random()-0.5)*0.0004, vy: -(0.0002 + Math.random()*0.0004),
      alpha: 0.15 + Math.random()*0.45,
      size: 9 + Math.random()*10,
      symbol: SYMBOLS[Math.floor(Math.random()*SYMBOLS.length)],
      color: COLORS[Math.floor(Math.random()*COLORS.length)],
      spin: Math.random()*Math.PI*2, spinV: (Math.random()-0.5)*0.012,
    }));

    // Floating orb trails
    type Orb = { x:number; y:number; r:number; color:string; phase:number; speed:number; };
    const orbs: Orb[] = COLORS.slice(0,4).map((c, i) => ({
      x: 0.15 + (i%2)*0.7, y: 0.4 + (i<2 ? 0 : 0.3),
      r: 0.12 + Math.random()*0.08, color: c,
      phase: i * Math.PI/2, speed: 0.008 + Math.random()*0.006,
    }));

    const draw = () => {
      frame++;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const W = canvas.width, H = canvas.height;

      // Soft orb blobs
      orbs.forEach(o => {
        const ox = (o.x + Math.sin(frame*o.speed + o.phase)*0.12) * W;
        const oy = (o.y + Math.cos(frame*o.speed*0.7 + o.phase)*0.1) * H;
        const r = o.r * Math.min(W, H);
        const g = ctx.createRadialGradient(ox, oy, 0, ox, oy, r);
        g.addColorStop(0, o.color+"22"); g.addColorStop(1, "transparent");
        ctx.fillStyle = g;
        ctx.beginPath(); ctx.arc(ox, oy, r, 0, Math.PI*2); ctx.fill();
      });

      // Floating code symbols
      particles.forEach(p => {
        p.x += p.vx; p.y += p.vy; p.spin += p.spinV;
        if (p.y < -0.05) { p.y = 1.05; p.x = Math.random(); }
        if (p.x < -0.05) p.x = 1.05;
        if (p.x > 1.05) p.x = -0.05;
        const px = p.x * W, py = p.y * H;
        const pulse = 0.6 + Math.sin(frame*0.04 + p.x*8)*0.4;
        ctx.save();
        ctx.translate(px, py);
        ctx.rotate(p.spin);
        ctx.globalAlpha = p.alpha * pulse;
        ctx.font = `${p.size}px monospace`;
        ctx.textAlign = "center"; ctx.textBaseline = "middle";
        // Glow
        ctx.shadowBlur = 8; ctx.shadowColor = p.color;
        ctx.fillStyle = p.color;
        ctx.fillText(p.symbol, 0, 0);
        ctx.shadowBlur = 0;
        ctx.restore();
        ctx.globalAlpha = 1;
      });

      // Connecting lines between nearby particles
      for (let i=0;i<N;i++) {
        for (let j=i+1;j<N;j++) {
          const dx=(particles[i].x-particles[j].x)*W, dy=(particles[i].y-particles[j].y)*H;
          const d=Math.sqrt(dx*dx+dy*dy);
          if (d < 90) {
            ctx.globalAlpha = (1-d/90)*0.1;
            ctx.strokeStyle = particles[i].color;
            ctx.lineWidth = 0.8;
            ctx.beginPath();
            ctx.moveTo(particles[i].x*W, particles[i].y*H);
            ctx.lineTo(particles[j].x*W, particles[j].y*H);
            ctx.stroke();
            ctx.globalAlpha = 1;
          }
        }
      }
      ctx.textAlign = "left";
      raf = requestAnimationFrame(draw);
    };
    draw();
    return () => { cancelAnimationFrame(raf); window.removeEventListener("resize", resize); };
  }, []);
  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none" style={{ opacity:0.75 }} />;
}

// ─── PEOPLE WORKING CANVAS — group dynamics ───────────────────────────────────
function PeopleWorkingCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d")!;
    let raf = 0, frame = 0;
    const resize = () => {
      canvas.width = canvas.offsetWidth || window.innerWidth;
      canvas.height = canvas.offsetHeight || window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const ACCENTS = ["#38BDF8","#60a5fa","#a78bfa","#fbbf24","#34d399"];
    const N = 5;
    type Bubble = { x:number; y:number; text:string; alpha:number; };
    const bubbles: Bubble[] = [];
    const BUBBLE_TEXTS = ["<code/>","git push","💡 idea","npm run","⚡ build","// fix","deploy ✓","PR ready","🎯 done"];

    // Per-person state
    const states = Array.from({length:N}, (_, i) => ({
      thinking: false,
      thinkTimer: Math.floor(Math.random()*300),
      thinkCycle: 250 + Math.floor(Math.random()*200),
      thinkDuration: 70 + Math.floor(Math.random()*60),
      typingSpeed: 0.06 + Math.random()*0.07,
      typingAmp: 2.5 + Math.random()*2.5,
      phase: i * 1.25,
      leanToward: -1, // index of person they lean toward (-1 = none)
    }));

    const draw = () => {
      frame++;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const W = canvas.width, H = canvas.height;
      const sc = Math.min(W/1400, 1);
      // Keep table within the visible viewport (don't go below window.innerHeight)
      const visibleH = Math.min(H, window.innerHeight);
      const tableY = visibleH * 0.82;
      const xPos = Array.from({length:N}, (_, i) => W*(0.14 + i*0.185));

      // Desk drop-shadow
      ctx.fillStyle = "rgba(10,30,80,0.18)";
      ctx.beginPath(); ctx.ellipse(W/2, tableY+16*sc, W*0.46, 14*sc, 0, 0, Math.PI*2); ctx.fill();

      // Desk surface
      const dg = ctx.createLinearGradient(0, tableY-6*sc, 0, tableY+14*sc);
      dg.addColorStop(0,"rgba(18,55,95,0.95)"); dg.addColorStop(1,"rgba(7,22,52,0.97)");
      ctx.fillStyle = dg;
      ctx.beginPath(); ctx.roundRect(30*sc, tableY-6*sc, W-60*sc, 20*sc, [12*sc,12*sc,0,0]); ctx.fill();
      ctx.strokeStyle = "rgba(56,189,248,0.5)"; ctx.lineWidth = 1.5*sc;
      ctx.beginPath(); ctx.moveTo(30*sc, tableY-6*sc); ctx.lineTo(W-30*sc, tableY-6*sc); ctx.stroke();

      // Collaboration link: dashed line between adjacent persons (cycles every 400 frames)
      const collabCycle = Math.floor(frame/400) % (N-1);
      const collabProgress = (frame%400)/400;
      if (collabProgress < 0.3) {
        const fade = Math.sin(collabProgress/0.3 * Math.PI);
        const x1 = xPos[collabCycle], x2 = xPos[collabCycle+1];
        const ly = tableY - 62*sc;
        ctx.globalAlpha = fade * 0.6;
        ctx.strokeStyle = "#38BDF8"; ctx.lineWidth = 1.5*sc; ctx.setLineDash([6*sc,4*sc]);
        ctx.beginPath(); ctx.moveTo(x1+24*sc, ly); ctx.lineTo(x2-24*sc, ly); ctx.stroke();
        // Small arrow head
        ctx.fillStyle = "#38BDF8";
        ctx.beginPath(); ctx.moveTo(x2-24*sc, ly); ctx.lineTo(x2-30*sc, ly-4*sc); ctx.lineTo(x2-30*sc, ly+4*sc); ctx.closePath(); ctx.fill();
        ctx.setLineDash([]); ctx.globalAlpha = 1;
      }

      // Laptops + screens
      xPos.forEach((x, idx) => {
        const a = ACCENTS[idx];
        // Laptop base
        ctx.fillStyle = "#172e50";
        ctx.beginPath(); ctx.roundRect(x-35*sc, tableY-11*sc, 70*sc, 8*sc, 4*sc); ctx.fill();
        // Hinge glint
        ctx.fillStyle = "rgba(56,189,248,0.2)";
        ctx.beginPath(); ctx.roundRect(x-35*sc, tableY-12*sc, 70*sc, 2*sc, 1*sc); ctx.fill();

        // Screen bezel
        const sy = tableY-56*sc;
        ctx.fillStyle = "#04091a"; ctx.strokeStyle = a; ctx.lineWidth = 2*sc;
        ctx.beginPath(); ctx.roundRect(x-31*sc, sy, 62*sc, 40*sc, 5*sc); ctx.fill(); ctx.stroke();
        // Screen content
        const glow = 0.35 + Math.sin(frame*0.045+idx*1.15)*0.18;
        ctx.globalAlpha = glow;
        ctx.fillStyle = a;
        ctx.beginPath(); ctx.roundRect(x-27*sc, sy+3*sc, 54*sc, 33*sc, 3*sc); ctx.fill();
        ctx.globalAlpha = 1;
        // Animated code lines
        const linePhase = (frame*0.06+idx*9) % 6;
        for (let l=0;l<5;l++){
          const visible = l < linePhase;
          if (!visible) continue;
          const partial = l===Math.floor(linePhase) && linePhase%1>0.3;
          const fullW = (7+(l%2?15:7)+(l*4))*sc;
          const lw = partial ? fullW*(linePhase%1) : fullW;
          ctx.globalAlpha = 0.88;
          ctx.fillStyle = l%2===0 ? "rgba(255,255,255,0.95)" : a;
          ctx.beginPath(); ctx.roundRect(x-25*sc+(l%2?4*sc:0), sy+6*sc+l*5.6*sc, lw, 2.2*sc, 1*sc); ctx.fill();
          ctx.globalAlpha = 1;
        }
        // Coffee cup with steam
        ctx.fillStyle = "#152844";
        ctx.beginPath(); ctx.roundRect(x+37*sc, tableY-15*sc, 11*sc, 12*sc, 3*sc); ctx.fill();
        ctx.fillStyle = a+"70";
        ctx.beginPath(); ctx.roundRect(x+38*sc, tableY-13*sc, 9*sc, 5*sc, 2*sc); ctx.fill();
        const stAmp = Math.sin(frame*0.05+idx)*1.5;
        ctx.strokeStyle = "rgba(170,200,255,0.18)"; ctx.lineWidth = 1.2*sc;
        ctx.beginPath(); ctx.moveTo(x+42.5*sc, tableY-15*sc);
        ctx.quadraticCurveTo(x+44*sc, tableY-20*sc+stAmp, x+43*sc, tableY-25*sc); ctx.stroke();
      });

      // Update state + draw people
      xPos.forEach((x, idx) => {
        const s = states[idx]; const a = ACCENTS[idx];
        s.thinkTimer++;
        if (!s.thinking && s.thinkTimer > s.thinkCycle) {
          if (Math.random()<0.35) { s.thinking=true; s.thinkTimer=0; }
          else s.thinkTimer = 0;
        }
        if (s.thinking && s.thinkTimer > s.thinkDuration) { s.thinking=false; s.thinkTimer=0; }

        const ty = s.thinking ? 0 : Math.sin(frame*s.typingSpeed+s.phase)*s.typingAmp;
        const bob = Math.sin(frame*0.018+s.phase)*1.8;
        const sy = tableY-56*sc;
        const hy = sy - 27*sc + bob;

        // Head
        ctx.fillStyle = a; ctx.strokeStyle = "rgba(255,255,255,0.75)"; ctx.lineWidth = 1.5*sc;
        ctx.beginPath(); ctx.arc(x, hy, 13*sc, 0, Math.PI*2); ctx.fill(); ctx.stroke();

        // Screen glow on face
        const sg = ctx.createRadialGradient(x, hy+14*sc, 0, x, hy+14*sc, 38*sc);
        sg.addColorStop(0, a+"30"); sg.addColorStop(1, "transparent");
        ctx.fillStyle = sg; ctx.beginPath(); ctx.arc(x, hy+14*sc, 38*sc, 0, Math.PI*2); ctx.fill();

        // Thought bubbles when thinking
        if (s.thinking) {
          [0,1,2].forEach(d => {
            const da = 0.5 + Math.sin(frame*0.13+d*1.1)*0.3;
            ctx.globalAlpha = da;
            ctx.fillStyle = a;
            ctx.beginPath(); ctx.arc(x+17*sc+d*9*sc, hy-18*sc-d*5*sc, (4-d*0.9)*sc, 0, Math.PI*2); ctx.fill();
            ctx.globalAlpha = 1;
          });
        }

        // Body
        ctx.strokeStyle = a; ctx.lineWidth = 6*sc; ctx.lineCap = "round";
        ctx.beginPath(); ctx.moveTo(x, hy+13*sc); ctx.lineTo(x, tableY-12*sc); ctx.stroke();

        // Arms
        ctx.lineWidth = 3.5*sc; ctx.strokeStyle = a;
        if (s.thinking) {
          // Chin-resting pose
          ctx.beginPath(); ctx.moveTo(x, hy+22*sc); ctx.lineTo(x-16*sc, hy+10*sc); ctx.stroke();
          ctx.beginPath(); ctx.moveTo(x, hy+22*sc); ctx.lineTo(x+16*sc, hy+10*sc); ctx.stroke();
        } else {
          ctx.beginPath(); ctx.moveTo(x, hy+22*sc); ctx.lineTo(x-23*sc, tableY-8*sc+ty); ctx.stroke();
          ctx.beginPath(); ctx.moveTo(x, hy+22*sc); ctx.lineTo(x+23*sc, tableY-8*sc-ty); ctx.stroke();
        }
      });

      // Idea bubbles
      if (frame%160===0 && bubbles.length<6) {
        const idx = Math.floor(Math.random()*N);
        bubbles.push({ x:xPos[idx], y:tableY-78*sc, text:BUBBLE_TEXTS[Math.floor(Math.random()*BUBBLE_TEXTS.length)], alpha:0.9 });
      }
      for (let i=bubbles.length-1;i>=0;i--) { bubbles[i].y -= 0.45*sc; bubbles[i].alpha -= 0.0038; if(bubbles[i].alpha<=0) bubbles.splice(i,1); }
      bubbles.forEach(b => {
        ctx.globalAlpha = b.alpha;
        ctx.font = `${Math.max(9,9*sc)}px monospace`;
        const tw = ctx.measureText(b.text).width + 16;
        ctx.fillStyle = "rgba(4,9,28,0.9)"; ctx.strokeStyle = "rgba(56,189,248,0.55)"; ctx.lineWidth = 1;
        ctx.beginPath(); ctx.roundRect(b.x-tw/2, b.y-10, tw, 20, 6); ctx.fill(); ctx.stroke();
        ctx.fillStyle = "#7dd3fc"; ctx.textAlign = "center";
        ctx.fillText(b.text, b.x, b.y+4);
        ctx.globalAlpha = 1;
      });
      ctx.textAlign = "left";
      raf = requestAnimationFrame(draw);
    };
    draw();
    return () => { cancelAnimationFrame(raf); window.removeEventListener("resize", resize); };
  }, []);
  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none" style={{ opacity:0.92 }} />;
}

// ─── HACK JOURNEY FLOW ────────────────────────────────────────────────────────
function BlockBuilderAnimation() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d")!;
    const W = 280, H = 320;
    canvas.width = W; canvas.height = H;

    const BLOCKS = [
      { label:"Problem",  icon:"🔍", color:"#2B7EF5", shade:"#1a4fa0" },
      { label:"Ideate",   icon:"💡", color:"#F5A623", shade:"#a36b0d" },
      { label:"Design",   icon:"🎨", color:"#a78bfa", shade:"#6d4db8" },
      { label:"Code",     icon:"⚡", color:"#38BDF8", shade:"#1878a8" },
      { label:"Test",     icon:"🧪", color:"#34d399", shade:"#1a8f61" },
      { label:"Ship",     icon:"🚀", color:"#f87171", shade:"#b03030" },
    ];
    const BH = 36, BW = 200, BX = (W - BW)/2;
    const groundY = H - 32;
    const CYCLE = 420; // frames per full cycle

    let raf = 0, frame = 0;

    const ease = (t:number) => t < 0.5 ? 4*t*t*t : 1 - Math.pow(-2*t+2, 3)/2;
    const bounce = (t:number) => {
      if (t < 0.727) return 7.5625 * t * t;
      if (t < 0.909) { t -= 0.8182; return 7.5625*t*t + 0.75; }
      if (t < 0.963) { t -= 0.9375; return 7.5625*t*t + 0.9375; }
      t -= 0.984375; return 7.5625*t*t + 0.984375;
    };

    const draw = () => {
      frame++;
      ctx.clearRect(0, 0, W, H);

      const cycleF = frame % CYCLE;
      // Build phase: first 280 frames; hold phase: 280-370; then gaps fill
      const buildEnd = 280, holdEnd = 360;
      const holdingAll = cycleF >= buildEnd && cycleF < holdEnd;
      const restarting = cycleF >= holdEnd;

      // Ground platform
      const gg = ctx.createLinearGradient(0, groundY, 0, groundY+18);
      gg.addColorStop(0,"rgba(30,58,100,0.9)"); gg.addColorStop(1,"rgba(10,20,50,0.8)");
      ctx.fillStyle = gg;
      ctx.beginPath(); ctx.roundRect(BX-12, groundY, BW+24, 18, [0,0,6,6]); ctx.fill();
      ctx.strokeStyle = "rgba(56,189,248,0.4)"; ctx.lineWidth = 1.5;
      ctx.beginPath(); ctx.moveTo(BX-12, groundY); ctx.lineTo(BX+BW+12, groundY); ctx.stroke();

      // Ground label
      ctx.font = "bold 9px monospace";
      ctx.fillStyle = "rgba(56,189,248,0.6)"; ctx.textAlign = "center";
      ctx.fillText("FOUNDATION", W/2, groundY+12);

      // Cranes on sides (purely decorative)
      const craneAlpha = restarting ? 0 : Math.min(1, cycleF/30);
      ctx.globalAlpha = craneAlpha * 0.4;
      [[BX-28, groundY-20, BX-8, groundY],[BX+BW+8, groundY-20, BX+BW+28, groundY]].forEach(([x1,y1,x2,y2]) => {
        ctx.strokeStyle = "rgba(245,166,35,0.8)"; ctx.lineWidth = 2;
        ctx.beginPath(); ctx.moveTo(x1,y2); ctx.lineTo(x1,y1); ctx.lineTo(x2,y1); ctx.stroke();
        // Hanging cable
        ctx.strokeStyle = "rgba(100,150,220,0.5)"; ctx.lineWidth = 1;
        ctx.setLineDash([2,3]);
        ctx.beginPath(); ctx.moveTo(x2,y1); ctx.lineTo(x2,y2); ctx.stroke();
        ctx.setLineDash([]);
      });
      ctx.globalAlpha = 1;

      // Draw each block
      BLOCKS.forEach((b, i) => {
        const blockY = groundY - (i+1)*BH - i*4;
        // When does this block start animating in?
        const startF = i * 46;
        const dur = 50;

        let y: number, alpha: number;
        if (restarting) {
          // Fade/drop out from top
          const dropF = cycleF - holdEnd;
          const idx = BLOCKS.length - 1 - i;
          const dStart = idx * 18;
          const dProg = Math.max(0, Math.min(1, (dropF - dStart)/22));
          if (dProg < 1) { y = blockY - dProg * 120; alpha = 1 - dProg; }
          else { return; }
        } else if (cycleF < startF) {
          return; // not yet
        } else {
          const prog = Math.min(1, (cycleF - startF) / dur);
          const bv = bounce(prog);
          // Block falls from above
          y = blockY - (1-bv)*180;
          alpha = Math.min(1, prog*2);
        }

        // Shadow
        ctx.globalAlpha = alpha * 0.35;
        ctx.fillStyle = "rgba(0,0,0,0.5)";
        ctx.beginPath(); ctx.ellipse(W/2, blockY+BH+1, BW*0.45, 4, 0, 0, Math.PI*2); ctx.fill();
        ctx.globalAlpha = alpha;

        // Block body
        const bg = ctx.createLinearGradient(BX, y, BX+BW, y+BH);
        bg.addColorStop(0, b.color+"ee"); bg.addColorStop(1, b.shade+"cc");
        ctx.fillStyle = bg;
        ctx.beginPath(); ctx.roundRect(BX, y, BW, BH, 6); ctx.fill();

        // Top highlight edge
        ctx.fillStyle = "rgba(255,255,255,0.22)";
        ctx.beginPath(); ctx.roundRect(BX, y, BW, 3, [6,6,0,0]); ctx.fill();

        // Left side shade
        ctx.fillStyle = "rgba(0,0,0,0.2)";
        ctx.beginPath(); ctx.roundRect(BX, y+3, 6, BH-6, [0,0,0,0]); ctx.fill();

        // Border
        ctx.strokeStyle = b.color; ctx.lineWidth = 1.2; ctx.globalAlpha = alpha*0.7;
        ctx.beginPath(); ctx.roundRect(BX, y, BW, BH, 6); ctx.stroke();
        ctx.globalAlpha = alpha;

        // Shimmer when all placed (hold phase)
        if (holdingAll) {
          const sh = 0.5 + Math.sin(frame*0.12 + i*1.1)*0.35;
          ctx.globalAlpha = sh * 0.18;
          ctx.fillStyle = "#ffffff";
          ctx.beginPath(); ctx.roundRect(BX, y, BW, BH, 6); ctx.fill();
          ctx.globalAlpha = alpha;
        }

        // Icon + label
        ctx.font = "16px serif"; ctx.textAlign = "left";
        ctx.fillText(b.icon, BX+10, y+BH/2+6);
        ctx.font = "bold 11px sans-serif"; ctx.fillStyle = "#ffffff";
        ctx.textAlign = "center";
        ctx.fillText(b.label.toUpperCase(), W/2+8, y+BH/2+5);

        // Progress dots on right
        ctx.fillStyle = "rgba(255,255,255,0.5)";
        for(let d=0;d<3;d++) {
          const dp = holdingAll ? 0.7+Math.sin(frame*0.1+i*1.5+d)*0.3 : 0.4;
          ctx.globalAlpha = alpha * dp;
          ctx.beginPath(); ctx.arc(BX+BW-10-d*9, y+BH/2, 2.5, 0, Math.PI*2); ctx.fill();
        }
        ctx.globalAlpha = 1;
      });

      // Particles when building
      if (cycleF < buildEnd && frame%8===0) {
        const i = Math.min(BLOCKS.length-1, Math.floor(cycleF/46));
        const bY = groundY-(i+1)*BH - i*4;
        const sc = ctx.createRadialGradient(W/2, bY, 0, W/2, bY, 18);
        sc.addColorStop(0, BLOCKS[i].color+"88"); sc.addColorStop(1,"transparent");
        ctx.fillStyle = sc;
        ctx.beginPath(); ctx.arc(W/2, bY, 18, 0, Math.PI*2); ctx.fill();
      }

      ctx.textAlign = "left";
      raf = requestAnimationFrame(draw);
    };
    draw();
    return () => cancelAnimationFrame(raf);
  }, []);
  return (
    <div style={{ display:"flex", justifyContent:"center", padding:"8px 0 4px" }}>
      <canvas ref={canvasRef} style={{ width:280, height:320 }} />
    </div>
  );
}

// ─── FLOATING TAG ──────────────────────────────────────────────────────────────
function FloatingTag({ left, label, sub, delay }: { left:string; label:string; sub:string; delay:number }) {
  const tagRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    let vel=0, ang=0, target=0, raf=0;
    const onMouse = (e:MouseEvent) => {
      target = ((e.clientX - window.innerWidth/2) / window.innerWidth) * 12;
    };
    window.addEventListener("mousemove", onMouse);
    const animate = () => {
      vel += (target - ang)*0.04; vel *= 0.88; ang += vel;
      if (tagRef.current) tagRef.current.style.transform = `rotate(${ang}deg)`;
      raf = requestAnimationFrame(animate);
    };
    setTimeout(() => { raf = requestAnimationFrame(animate); }, delay);
    return () => { cancelAnimationFrame(raf); window.removeEventListener("mousemove", onMouse); };
  }, [delay]);
  return (
    <div style={{ position:"fixed", top:0, left, zIndex:45, display:"flex", flexDirection:"column", alignItems:"center", pointerEvents:"none" }}>
      {/* Bar */}
      <div style={{ width:44, height:7, background:"linear-gradient(90deg,#1a2a45,#2B7EF5,#1a2a45)", borderRadius:3, boxShadow:"0 0 10px rgba(43,126,245,0.5)" }} />
      {/* Rope */}
      <div style={{ width:2, height:72, background:"linear-gradient(to bottom,rgba(245,166,35,0.85),rgba(43,126,245,0.55))" }} />
      {/* Card */}
      <div ref={tagRef} style={{ transformOrigin:"top center", width:116, background:"linear-gradient(145deg,rgba(8,18,40,0.97),rgba(4,9,26,0.99))", border:"1px solid rgba(43,126,245,0.3)", borderRadius:12, padding:"8px 10px 10px", boxShadow:"0 24px 48px rgba(0,0,0,0.6),0 0 24px rgba(43,126,245,0.12)" }}>
        {/* Hole */}
        <div style={{ width:18, height:18, borderRadius:"50%", background:"radial-gradient(circle at 40% 35%,#0a1520,#020810)", border:"2px solid rgba(43,126,245,0.4)", margin:"-14px auto 6px", boxShadow:"0 0 6px rgba(43,126,245,0.3),inset 0 2px 4px rgba(0,0,0,0.6)" }} />
        <div style={{ fontSize:7, fontWeight:800, color:"rgba(56,189,248,0.8)", letterSpacing:"0.25em", textTransform:"uppercase", textAlign:"center" }}>SRM InoVateX</div>
        <div style={{ height:1, background:"linear-gradient(90deg,transparent,rgba(43,126,245,0.35),transparent)", margin:"5px 0" }} />
        <div style={{ fontSize:13, fontWeight:900, color:"white", textAlign:"center", lineHeight:1.2, fontFamily:"var(--font-display)" }}>{label}</div>
        <div style={{ fontSize:7, color:"rgba(245,166,35,0.85)", textTransform:"uppercase", letterSpacing:"0.18em", textAlign:"center", marginTop:4 }}>{sub}</div>
        <div style={{ height:1, background:"linear-gradient(90deg,transparent,rgba(245,166,35,0.25),transparent)", margin:"6px 0 5px" }} />
        <div style={{ fontSize:7, color:"rgba(120,150,200,0.4)", textAlign:"center", fontFamily:"monospace", letterSpacing:"0.08em" }}>#2026</div>
        {/* Mini barcode */}
        <div style={{ display:"flex", gap:1, height:10, alignItems:"flex-end", justifyContent:"center", marginTop:5 }}>
          {[5,8,4,9,6,3,8,5,7,4,8,6,3,9,5,8,4,7].map((h,i)=>(
            <div key={i} style={{ width:1.5, height:`${h*10}%`, background:"rgba(56,189,248,0.45)", borderRadius:1 }} />
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── DATA RAIN ────────────────────────────────────────────────────────────────
function DataRain() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d")!;
    let raf = 0;
    const resize = () => { canvas.width = window.innerWidth; canvas.height = window.innerHeight; };
    resize();
    window.addEventListener("resize", resize);
    const chars = "0123456789ABCDEF₹01₹10∑∞λ∇αβ24SRMINOVATEX".split("");
    const fontSize = 13;
    const cols = Math.floor(canvas.width / fontSize);
    const drops: number[] = Array(cols).fill(1);
    const draw = () => {
      ctx.fillStyle = "rgba(4,9,26,0.06)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      drops.forEach((y, i) => {
        const char = chars[Math.floor(Math.random() * chars.length)];
        const bright = Math.random() > 0.95;
        ctx.fillStyle = bright ? "rgba(56,189,248,0.9)" : `rgba(43,126,245,${0.15 + Math.random() * 0.3})`;
        ctx.font = `${fontSize}px monospace`;
        ctx.fillText(char, i * fontSize, y * fontSize);
        if (y * fontSize > canvas.height && Math.random() > 0.975) drops[i] = 0;
        drops[i]++;
      });
      raf = requestAnimationFrame(draw);
    };
    draw();
    return () => { cancelAnimationFrame(raf); window.removeEventListener("resize", resize); };
  }, []);
  return <canvas ref={canvasRef} className="fixed inset-0 pointer-events-none" style={{ zIndex: 0, opacity: 0.18 }} />;
}

// ─── CUSTOM CURSOR ─────────────────────────────────────────────────────────────
function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const dot = dotRef.current; const ring = ringRef.current;
    if (!dot || !ring) return;
    const dotX = gsap.quickTo(dot, "x", { duration: 0.1, ease: "none" });
    const dotY = gsap.quickTo(dot, "y", { duration: 0.1, ease: "none" });
    const ringX = gsap.quickTo(ring, "x", { duration: 0.4, ease: "power2.out" });
    const ringY = gsap.quickTo(ring, "y", { duration: 0.4, ease: "power2.out" });
    const move = (e: MouseEvent) => { dotX(e.clientX); dotY(e.clientY); ringX(e.clientX); ringY(e.clientY); };
    const enterMag = (e: Event) => {
      const el = e.currentTarget as HTMLElement;
      const r = el.getBoundingClientRect();
      gsap.to(ring, { width: r.width + 20, height: r.height + 20, borderRadius: 12, borderColor: "rgba(245,166,35,0.8)", duration: 0.3 });
    };
    const leaveMag = () => gsap.to(ring, { width: 36, height: 36, borderRadius: "50%", borderColor: "rgba(56,189,248,0.5)", duration: 0.3 });
    window.addEventListener("mousemove", move);
    const mags = document.querySelectorAll("[data-magnetic]");
    mags.forEach(el => { el.addEventListener("mouseenter", enterMag); el.addEventListener("mouseleave", leaveMag); });
    return () => {
      window.removeEventListener("mousemove", move);
      mags.forEach(el => { el.removeEventListener("mouseenter", enterMag); el.removeEventListener("mouseleave", leaveMag); });
    };
  }, []);
  return (
    <>
      <div ref={dotRef} style={{ position:"fixed",zIndex:9999,width:8,height:8,borderRadius:"50%",background:"rgb(56,189,248)",transform:"translate(-50%,-50%)",pointerEvents:"none",boxShadow:"0 0 10px rgba(56,189,248,0.8)" }} />
      <div ref={ringRef} style={{ position:"fixed",zIndex:9998,width:36,height:36,borderRadius:"50%",border:"1.5px solid rgba(56,189,248,0.5)",transform:"translate(-50%,-50%)",pointerEvents:"none" }} />
    </>
  );
}

// Pre-computed barcode heights (avoids SSR/client floating-point mismatch)
const BARCODE_HEIGHTS = Array.from({ length: 60 }, (_, i) =>
  Math.round(35 + Math.sin(i * 0.9) * 25 + Math.cos(i * 0.4) * 15)
);

// ─── NAV TAG (top-left of page) ───────────────────────────────────────────────
function NavTag() {
  const tagRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    let vel=0, ang=-3, target=-3, raf=0;
    const onMouse = (e:MouseEvent) => { target = -3 + (e.clientX / window.innerWidth) * 6; };
    window.addEventListener("mousemove", onMouse);
    const loop = () => {
      vel += (target-ang)*0.04; vel *= 0.9; ang += vel;
      if (tagRef.current) tagRef.current.style.transform = `rotate(${ang}deg)`;
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => { cancelAnimationFrame(raf); window.removeEventListener("mousemove", onMouse); };
  }, []);
  return (
    <div style={{ position:"fixed", top:0, left:24, zIndex:60, display:"flex", flexDirection:"column", alignItems:"center", pointerEvents:"none" }}>
      <div style={{ width:34, height:6, background:"linear-gradient(90deg,#0a1a38,#2B7EF5,#0a1a38)", borderRadius:3, boxShadow:"0 0 8px rgba(43,126,245,0.7)" }} />
      <div style={{ width:1.5, height:44, background:"linear-gradient(to bottom,rgba(245,166,35,0.9),rgba(43,126,245,0.5))" }} />
      <div ref={tagRef} style={{ transformOrigin:"top center", width:78, background:"linear-gradient(145deg,rgba(8,18,40,0.97),rgba(4,9,26,0.99))", border:"1px solid rgba(43,126,245,0.35)", borderRadius:8, padding:"6px 8px 8px", boxShadow:"0 16px 32px rgba(0,0,0,0.6),0 0 16px rgba(43,126,245,0.15)" }}>
        <div style={{ width:12, height:12, borderRadius:"50%", background:"rgba(4,9,26,0.9)", border:"2px solid rgba(43,126,245,0.45)", margin:"-9px auto 5px", boxShadow:"inset 0 1px 3px rgba(0,0,0,0.5)" }} />
        <div style={{ fontSize:6, fontWeight:800, color:"rgba(56,189,248,0.7)", letterSpacing:"0.2em", textTransform:"uppercase", textAlign:"center" }}>InoVateX</div>
        <div style={{ height:1, background:"linear-gradient(90deg,transparent,rgba(43,126,245,0.3),transparent)", margin:"4px 0" }} />
        <div style={{ fontSize:11, fontWeight:900, color:"white", textAlign:"center", lineHeight:1.2 }}>HACK</div>
        <div style={{ fontSize:6, color:"rgba(245,166,35,0.85)", textTransform:"uppercase", letterSpacing:"0.15em", textAlign:"center", marginTop:2 }}>2026</div>
        <div style={{ display:"flex", gap:0.5, height:8, alignItems:"flex-end", justifyContent:"center", marginTop:5 }}>
          {[4,7,3,8,5,6,4,7,5,8,3,6].map((h,i)=>(
            <div key={i} style={{ width:1, height:`${h*10}%`, background:"rgba(56,189,248,0.4)", borderRadius:0.5 }} />
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── REALISTIC ID CARD ────────────────────────────────────────────────────────
function IDCard() {
  const cardRef = useRef<HTMLDivElement>(null);
  const ropeRef = useRef<SVGPathElement>(null);
  const ropeRRef = useRef<SVGPathElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let angle = 0, velocity = 0, targetAngle = 0, raf = 0;
    const onMouse = (e: MouseEvent) => {
      const cx = window.innerWidth / 2;
      targetAngle = ((e.clientX - cx) / cx) * 15;
    };
    window.addEventListener("mousemove", onMouse);
    const animate = () => {
      velocity += (targetAngle - angle) * 0.07;
      velocity *= 0.85;
      angle += velocity;
      if (cardRef.current) cardRef.current.style.transform = `rotate(${angle}deg)`;
      // Both ropes track the card's hole positions as it rotates
      // Pivot in SVG coords: x=180, y=146 (card top-center, SVG starts at y=9 in container so 155-9=146)
      // Left hole offset from pivot at rest: (-127, 5); Right: (+127, 5)
      const aRad = angle * Math.PI / 180;
      const lhx = 180 + (-127 * Math.cos(aRad) - 5 * Math.sin(aRad));
      const lhy = 146 + (-127 * Math.sin(aRad) + 5 * Math.cos(aRad));
      const rhx = 180 + (127 * Math.cos(aRad) - 5 * Math.sin(aRad));
      const rhy = 146 + (127 * Math.sin(aRad) + 5 * Math.cos(aRad));
      const lcpx = (79 + lhx) / 2 + angle * 0.6;
      const lcpy = (7 + lhy) / 2 + 10;
      const rcpx = (281 + rhx) / 2 + angle * 0.6;
      const rcpy = (7 + rhy) / 2 + 10;
      if (ropeRef.current) ropeRef.current.setAttribute("d", `M 79 7 Q ${lcpx} ${lcpy} ${lhx} ${lhy}`);
      if (ropeRRef.current) ropeRRef.current.setAttribute("d", `M 281 7 Q ${rcpx} ${rcpy} ${rhx} ${rhy}`);
      raf = requestAnimationFrame(animate);
    };
    raf = requestAnimationFrame(animate);
    if (cardRef.current) {
      gsap.fromTo(cardRef.current, { y: -160, opacity: 0 }, { y: 0, opacity: 1, duration: 1.4, ease: "elastic.out(1,0.4)", delay: 0.6 });
    }
    return () => { window.removeEventListener("mousemove", onMouse); cancelAnimationFrame(raf); };
  }, []);

  const skills = ["React", "Node.js", "ML/AI", "IoT", "FinTech", "Design"];

  return (
    <div ref={containerRef} className="relative flex flex-col items-center select-none" style={{ height: 680, width: 360 }}>
      {/* Two lanyard bars at top */}
      <div style={{ position:"absolute", top:0, left:"22%", transform:"translateX(-50%)", width:56, height:9, background:"linear-gradient(90deg,#1a2a45,#2B7EF5,#1a2a45)", borderRadius:4, boxShadow:"0 0 12px rgba(43,126,245,0.6)" }} />
      <div style={{ position:"absolute", top:0, left:"78%", transform:"translateX(-50%)", width:56, height:9, background:"linear-gradient(90deg,#1a2a45,#F5A623,#1a2a45)", borderRadius:4, boxShadow:"0 0 12px rgba(245,166,35,0.6)" }} />

      {/* Two SVG ropes */}
      <div style={{ position:"absolute", top:9, left:0, right:0, height:155, pointerEvents:"none", zIndex:1 }}>
        <svg viewBox="0 0 360 155" style={{ width:"100%", height:"100%", overflow:"visible" }}>
          <defs>
            <linearGradient id="lanyardGradL" x1="0" y1="0" x2="0.3" y2="1">
              <stop offset="0%" stopColor="rgba(245,166,35,0.95)" />
              <stop offset="40%" stopColor="rgba(43,126,245,0.85)" />
              <stop offset="100%" stopColor="rgba(43,126,245,0.4)" />
            </linearGradient>
            <linearGradient id="lanyardGradR" x1="0" y1="0" x2="-0.3" y2="1">
              <stop offset="0%" stopColor="rgba(43,126,245,0.95)" />
              <stop offset="40%" stopColor="rgba(245,166,35,0.85)" />
              <stop offset="100%" stopColor="rgba(245,166,35,0.4)" />
            </linearGradient>
          </defs>
          {/* Left clip */}
          <rect x="70" y="0" width="18" height="7" rx="2" fill="rgba(200,210,230,0.85)" />
          <rect x="74" y="1" width="10" height="5" rx="1" fill="rgba(150,170,210,0.6)" />
          {/* Right clip */}
          <rect x="272" y="0" width="18" height="7" rx="2" fill="rgba(200,210,230,0.85)" />
          <rect x="276" y="1" width="10" height="5" rx="1" fill="rgba(150,170,210,0.6)" />
          {/* Left rope — tracks left hole as card rotates */}
          <path ref={ropeRef} d="M 79 7 Q 90 80 53 151" fill="none" stroke="url(#lanyardGradL)" strokeWidth="3.5" strokeLinecap="round" />
          {/* Right rope — tracks right hole as card rotates */}
          <path ref={ropeRRef} d="M 281 7 Q 270 80 307 151" fill="none" stroke="url(#lanyardGradR)" strokeWidth="3.5" strokeLinecap="round" />
        </svg>
      </div>

      {/* CARD */}
      <div ref={cardRef} style={{ position:"absolute", top:155, transformOrigin:"top center", width:310, zIndex:2 }}>
        {/* Two lanyard holes — left and right */}
        <div style={{ display:"flex", justifyContent:"space-between", paddingLeft:28, paddingRight:28, marginBottom:-10, position:"relative", zIndex:3 }}>
          {[0,1].map(i => (
            <div key={i} style={{
              width:24, height:24, borderRadius:"50%",
              background:"radial-gradient(circle at 40% 35%, #2a3a55, #0a1520)",
              border:`3px solid rgba(${i===0?"43,126,245":"245,166,35"},0.6)`,
              boxShadow:`0 0 0 2px rgba(${i===0?"43,126,245":"245,166,35"},0.25), 0 4px 10px rgba(0,0,0,0.5), inset 0 2px 4px rgba(0,0,0,0.8)`,
            }} />
          ))}
        </div>

        {/* Card body */}
        <div style={{
          borderRadius:20,
          overflow:"hidden",
          boxShadow:"0 40px 80px -20px rgba(0,0,0,0.8), 0 0 0 1px rgba(43,126,245,0.2), 0 0 60px -20px rgba(43,126,245,0.3)",
          position:"relative",
        }}>
          {/* Holographic shimmer layer */}
          <div style={{
            position:"absolute", inset:0, zIndex:10, pointerEvents:"none",
            background:"linear-gradient(135deg,transparent 0%,rgba(56,189,248,0.06) 20%,transparent 40%,rgba(245,166,35,0.05) 60%,transparent 80%,rgba(129,140,248,0.05) 100%)",
            backgroundSize:"200% 200%",
            animation:"holoShimmer 5s linear infinite",
          }} />
          {/* Metallic edge highlight */}
          <div style={{ position:"absolute", inset:0, zIndex:9, pointerEvents:"none", borderRadius:20, border:"1px solid rgba(255,255,255,0.08)", background:"linear-gradient(145deg,rgba(255,255,255,0.04) 0%,transparent 50%,rgba(0,0,0,0.1) 100%)" }} />

          {/* Top color bar — SRM branding strip */}
          <div style={{ height:8, background:"linear-gradient(90deg,#0a3a8c,#2B7EF5,#38BDF8,#2B7EF5,#0a3a8c)" }} />

          {/* Organization header */}
          <div style={{ background:"linear-gradient(135deg,#081228,#0d1e3a)", padding:"14px 20px", display:"flex", alignItems:"center", justifyContent:"space-between", borderBottom:"1px solid rgba(43,126,245,0.15)" }}>
            <div>
              <div style={{ fontSize:11, fontWeight:800, color:"rgba(56,189,248,0.9)", letterSpacing:"0.25em", textTransform:"uppercase" }}>SRM University</div>
              <div style={{ fontSize:8, color:"rgba(180,200,240,0.5)", letterSpacing:"0.15em", marginTop:2 }}>Ramapuram · Chennai</div>
            </div>
            <div style={{ textAlign:"right" }}>
              <div style={{ fontSize:16, fontWeight:900, background:"linear-gradient(135deg,#2B7EF5,#F5A623)", WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent", letterSpacing:"0.05em" }}>InoVateX</div>
              <div style={{ fontSize:7, color:"rgba(245,166,35,0.7)", letterSpacing:"0.2em", textTransform:"uppercase" }}>2026</div>
            </div>
          </div>

          {/* Main body */}
          <div style={{ background:"linear-gradient(160deg,rgba(8,18,40,0.98),rgba(4,9,26,0.99))", padding:"20px 20px 16px" }}>
            {/* Badge type */}
            <div style={{ textAlign:"center", marginBottom:16 }}>
              <div style={{
                display:"inline-block", fontSize:9, fontWeight:800, letterSpacing:"0.3em", textTransform:"uppercase",
                background:"linear-gradient(90deg,rgba(43,126,245,0.15),rgba(43,126,245,0.3),rgba(43,126,245,0.15))",
                border:"1px solid rgba(43,126,245,0.4)", color:"rgba(56,189,248,0.9)",
                borderRadius:4, padding:"4px 16px",
              }}>PARTICIPANT BADGE</div>
            </div>

            {/* Photo + info row */}
            <div style={{ display:"flex", gap:16, marginBottom:16 }}>
              {/* Photo area */}
              <div style={{
                width:90, height:110, borderRadius:12, flexShrink:0, overflow:"hidden",
                border:"2px solid rgba(43,126,245,0.3)",
                background:"linear-gradient(145deg,rgba(43,126,245,0.15),rgba(8,18,40,0.8))",
                display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center",
                position:"relative",
                boxShadow:"inset 0 2px 8px rgba(0,0,0,0.4)",
              }}>
                <svg viewBox="0 0 60 80" style={{ width:50, height:65 }}>
                  <circle cx="30" cy="22" r="14" fill="rgba(43,126,245,0.3)" />
                  <path d="M5 75 Q5 50 30 48 Q55 50 55 75" fill="rgba(43,126,245,0.2)" />
                  <circle cx="30" cy="22" r="11" fill="rgba(56,189,248,0.15)" />
                </svg>
                <div style={{ position:"absolute", bottom:0, left:0, right:0, height:28, background:"linear-gradient(to top,rgba(43,126,245,0.25),transparent)", display:"flex", alignItems:"flex-end", justifyContent:"center", paddingBottom:4 }}>
                  <span style={{ fontSize:7, color:"rgba(56,189,248,0.6)", letterSpacing:"0.1em" }}>PHOTO</span>
                </div>
              </div>

              {/* Info */}
              <div style={{ flex:1 }}>
                <div style={{ fontSize:18, fontWeight:900, color:"white", lineHeight:1.1, marginBottom:4, fontFamily:"var(--font-display)" }}>Your Team</div>
                <div style={{ fontSize:10, color:"rgba(56,189,248,0.8)", fontWeight:600, letterSpacing:"0.1em", marginBottom:8, textTransform:"uppercase" }}>Team Name Here</div>

                <div style={{ display:"flex", flexDirection:"column", gap:4 }}>
                  {[
                    { l:"Event", v:"InoVateX 2026" },
                    { l:"Date", v:"Oct 9–10" },
                    { l:"Venue", v:"SRM Ramapuram" },
                  ].map(({ l, v }) => (
                    <div key={l} style={{ display:"flex", gap:6, alignItems:"center" }}>
                      <span style={{ fontSize:8, color:"rgba(120,150,200,0.6)", letterSpacing:"0.1em", width:36, textTransform:"uppercase" }}>{l}</span>
                      <span style={{ fontSize:9, color:"rgba(200,220,255,0.85)", fontWeight:600 }}>{v}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Divider with dots */}
            <div style={{ display:"flex", alignItems:"center", gap:6, marginBottom:12 }}>
              <div style={{ flex:1, height:1, background:"linear-gradient(90deg,transparent,rgba(43,126,245,0.3))" }} />
              <div style={{ display:"flex", gap:3 }}>
                {[0,1,2].map(i => <div key={i} style={{ width:4, height:4, borderRadius:"50%", background:`rgba(43,126,245,${0.3+i*0.2})` }} />)}
              </div>
              <div style={{ flex:1, height:1, background:"linear-gradient(90deg,rgba(43,126,245,0.3),transparent)" }} />
            </div>

            {/* Skill tags */}
            <div style={{ display:"flex", flexWrap:"wrap", gap:5, marginBottom:14 }}>
              {skills.map((s, i) => (
                <span key={s} style={{
                  fontSize:8, fontWeight:700, textTransform:"uppercase", letterSpacing:"0.08em",
                  background:i % 3 === 0 ? "rgba(43,126,245,0.15)" : i % 3 === 1 ? "rgba(245,166,35,0.1)" : "rgba(56,189,248,0.1)",
                  border:`1px solid ${i % 3 === 0 ? "rgba(43,126,245,0.35)" : i % 3 === 1 ? "rgba(245,166,35,0.25)" : "rgba(56,189,248,0.25)"}`,
                  borderRadius:4, padding:"3px 8px",
                  color: i % 3 === 0 ? "rgba(56,189,248,0.9)" : i % 3 === 1 ? "rgba(245,166,35,0.9)" : "rgba(129,140,248,0.9)",
                }}>{s}</span>
              ))}
            </div>

            {/* Prize pool accent */}
            <div style={{
              background:"linear-gradient(90deg,rgba(245,166,35,0.08),rgba(245,166,35,0.04),transparent)",
              border:"1px solid rgba(245,166,35,0.2)", borderRadius:8,
              padding:"8px 12px", display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:14,
            }}>
              <div>
                <div style={{ fontSize:7, color:"rgba(245,166,35,0.6)", letterSpacing:"0.2em", textTransform:"uppercase" }}>Total Prize Pool</div>
                <div style={{ fontSize:18, fontWeight:900, color:"#F5A623", fontFamily:"var(--font-display)", lineHeight:1 }}>₹1,00,000+</div>
              </div>
              <div style={{ textAlign:"right" }}>
                <div style={{ fontSize:7, color:"rgba(120,150,200,0.5)", letterSpacing:"0.1em" }}>TRACKS</div>
                <div style={{ fontSize:22, fontWeight:900, color:"rgba(56,189,248,0.8)", fontFamily:"var(--font-display)", lineHeight:1 }}>07</div>
              </div>
            </div>

            {/* Barcode */}
            <div style={{ display:"flex", flexDirection:"column", alignItems:"center" }}>
              <div style={{ display:"flex", gap:0.5, height:32, alignItems:"flex-end", marginBottom:4 }}>
                {BARCODE_HEIGHTS.map((h, i) => (
                  <div key={i} style={{
                    width: [0,3,7,15,22,29,38,45,52,57].includes(i) ? "2px" : "1px",
                    height:`${h}%`,
                    background:"rgba(56,189,248,0.55)",
                  }} />
                ))}
              </div>
              <div style={{ fontSize:7, color:"rgba(120,150,200,0.45)", letterSpacing:"0.25em", textTransform:"uppercase" }}>#INOVATEX-2026-HACK</div>
            </div>
          </div>

          {/* Footer strip */}
          <div style={{ background:"linear-gradient(90deg,#0a1a38,#081228)", padding:"8px 20px", display:"flex", alignItems:"center", justifyContent:"space-between", borderTop:"1px solid rgba(43,126,245,0.1)" }}>
            <div style={{ fontSize:7, color:"rgba(120,150,200,0.4)", letterSpacing:"0.1em" }}>24-HOUR HACKATHON</div>
            <div style={{ display:"flex", gap:4 }}>
              {["F","T","AI","IoT","Med"].map(t => (
                <div key={t} style={{ fontSize:6, color:"rgba(56,189,248,0.5)", background:"rgba(43,126,245,0.1)", borderRadius:3, padding:"1px 4px", letterSpacing:"0.05em" }}>{t}</div>
              ))}
            </div>
            <div style={{ fontSize:7, color:"rgba(120,150,200,0.4)", letterSpacing:"0.1em" }}>SRM · 2026</div>
          </div>

          {/* Bottom color bar */}
          <div style={{ height:5, background:"linear-gradient(90deg,#F5A623,#2B7EF5,#38BDF8,#2B7EF5,#F5A623)" }} />
        </div>
      </div>
    </div>
  );
}

// ─── NAV ──────────────────────────────────────────────────────────────────────
function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const ids = ["home","about","tracks","prizes","timeline","venue","faq","sponsors","team","contact"];
    const observers = ids.map(id => {
      const el = document.getElementById(id);
      if (!el) return null;
      const obs = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActiveSection(id); },
        { threshold: 0.25, rootMargin: "-80px 0px -50% 0px" }
      );
      obs.observe(el);
      return obs;
    });
    return () => observers.forEach(o => o?.disconnect());
  }, []);

  const links: [string, string, string][] = [
    ["Home","#home","home"],
    ["About","#about","about"],
    ["Tracks","#tracks","tracks"],
    ["Prizes","#prizes","prizes"],
    ["Timeline","#timeline","timeline"],
    ["Venue","#venue","venue"],
    ["Team","#team","team"],
    ["FAQ","#faq","faq"],
    ["Contact","#contact","contact"],
  ];

  return (
    <header className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${scrolled ? "py-3" : "py-5"}`}>
      <div className="mx-auto max-w-7xl px-6">
        <nav className={`flex items-center justify-between rounded-2xl px-5 py-2.5 transition-all ${scrolled ? "glass-strong" : "glass"}`}>
          {/* Logo */}
          <a href="#home" className="flex items-center gap-2 shrink-0">
            <img src={`${import.meta.env.BASE_URL}favicon.png`} alt="SRM InoVateX logo" className="h-9 w-9 rounded-xl object-contain bg-white/90 p-0.5" />
            <div className="flex flex-col leading-tight">
              <span className="font-display text-sm font-bold tracking-tight">SRM InoVateX</span>
              <span className="text-[10px] text-muted-foreground -mt-0.5">SRM · 2026</span>
            </div>
          </a>

          {/* Desktop links */}
          <div className="hidden lg:flex items-center gap-0.5">
            {links.map(([label, href, id]) => (
              <a key={href} href={href}
                className={`relative rounded-full px-3.5 py-1.5 text-sm transition-all duration-200 ${activeSection === id ? "text-foreground" : "text-muted-foreground hover:text-foreground hover:bg-white/5"}`}>
                {label}
                {activeSection === id && (
                  <span className="absolute bottom-0.5 left-1/2 -translate-x-1/2 h-0.5 w-4 rounded-full bg-primary" />
                )}
              </a>
            ))}
          </div>

          {/* Right side */}
          <div className="flex items-center gap-2">
            {/* Date badge */}
            <div className="hidden md:flex items-center gap-1.5 rounded-full px-3 py-1 text-[10px] font-semibold"
              style={{ background:"rgba(43,126,245,0.1)", border:"1px solid rgba(43,126,245,0.2)", color:"#60a5fa" }}>
              <span className="relative flex h-1.5 w-1.5">
                <span className="absolute inline-flex h-full w-full rounded-full animate-ping opacity-75" style={{ background:"#60a5fa" }} />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full" style={{ background:"#60a5fa" }} />
              </span>
              Oct 9–10, 2026
            </div>
            <a href="#register" data-magnetic className="hidden sm:inline-flex items-center gap-1.5 rounded-full btn-glow btn-glow-hover px-5 py-2 text-sm font-medium text-white">
              Register <ArrowRight className="h-3.5 w-3.5" />
            </a>
            <button onClick={() => setOpen(!open)} aria-label="Menu" className="lg:hidden grid h-9 w-9 place-items-center rounded-full glass">
              {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
            </button>
          </div>
        </nav>

        {/* Mobile drawer */}
        {open && (
          <div className="lg:hidden mt-2 glass-strong rounded-2xl p-3 animate-fade-up">
            {links.map(([label, href, id]) => (
              <a key={href} href={href} onClick={() => setOpen(false)}
                className={`flex items-center gap-2.5 rounded-xl px-4 py-2.5 text-sm transition ${activeSection === id ? "text-foreground bg-white/8" : "text-muted-foreground hover:text-foreground hover:bg-white/5"}`}>
                {activeSection === id && <span className="h-1.5 w-1.5 rounded-full bg-primary shrink-0" />}
                {label}
              </a>
            ))}
            <div className="mt-2 pt-2" style={{ borderTop:"1px solid rgba(255,255,255,0.06)" }}>
              <a href="#register" onClick={() => setOpen(false)}
                className="flex items-center justify-center gap-2 w-full rounded-xl btn-glow px-4 py-2.5 text-sm font-semibold text-white">
                Register Now <ArrowRight className="h-3.5 w-3.5" />
              </a>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}

// ─── HERO ─────────────────────────────────────────────────────────────────────
function Hero() {
  const t = useCountdown();

  const stats = [
    { v:"₹1L+", l:"Prize Pool" },
    { v:"7", l:"Tracks" },
    { v:"24", l:"Hours" },
    { v:"350+", l:"Teams" },
  ];

  return (
    <section id="home" className="relative min-h-screen flex items-center pt-28 pb-16 overflow-hidden">
      {/* ── Animated Background ── */}
      <div className="absolute inset-0 z-0">
        {/* Canvas people-working animation — hidden on mobile, shown on md+ */}
        <div className="hidden md:block absolute inset-0"><PeopleWorkingCanvas /></div>
        {/* Mobile-only particle canvas */}
        <div className="md:hidden absolute inset-0"><MobileHeroCanvas /></div>
        {/* Aurora orbs */}
        <div className="absolute inset-0 grid-bg opacity-50" />
        <div className="absolute -top-40 -left-40 h-[700px] w-[700px] rounded-full bg-primary/20 blur-[160px] animate-glow-pulse" />
        <div className="absolute -top-20 right-0 h-[400px] w-[400px] rounded-full bg-accent/12 blur-[120px] animate-glow-pulse" style={{ animationDelay:"2s" }} />
        <div className="absolute top-1/3 -right-40 h-[600px] w-[600px] rounded-full bg-purple/18 blur-[150px] animate-glow-pulse" style={{ animationDelay:"1.5s" }} />
        <div className="absolute bottom-0 left-1/3 h-[480px] w-[480px] rounded-full bg-cyan/12 blur-[140px] animate-glow-pulse" style={{ animationDelay:"3s" }} />
        {/* Gradient overlays — right half mostly transparent so canvas shows */}
        <div className="absolute inset-0 bg-gradient-to-r from-background/95 via-background/30 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-background/60 via-transparent to-transparent" />
      </div>

      {/* ── Content ── */}
      <div className="relative w-full px-6 lg:px-12 xl:px-20" style={{ zIndex:1 }}>
        <div className="grid lg:grid-cols-[1fr_1.1fr] gap-16 items-center max-w-screen-2xl mx-auto">
          {/* LEFT: ID Card */}
          <div className="hidden lg:flex justify-center items-start pt-8">
            <IDCard />
          </div>

          {/* RIGHT: Text content */}
          <div className="animate-fade-up">
            <div className="inline-flex items-center gap-2 rounded-full glass px-3.5 py-1.5 text-xs text-muted-foreground mb-6">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full rounded-full bg-cyan opacity-75 animate-ping" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-cyan" />
              </span>
              National Hackathon · October 9-10, 2026
            </div>
            <h1 className="font-display text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-bold leading-[1.02]">
              <span className="text-gradient">SRM</span>{" "}
              <span className="text-gradient-brand">InoVateX</span>
              <br />
              <span className="text-foreground">2026</span>
            </h1>
            <p className="mt-5 text-lg sm:text-xl text-muted-foreground max-w-xl">
              24-Hour National Hackathon.{" "}
              <span className="text-foreground font-medium">Innovate. Build. Transform.</span>
            </p>
            <p className="mt-3 text-sm text-muted-foreground max-w-xl">
              Build tomorrow in 24 hours — join India's most ambitious student builders at SRM Ramapuram.
            </p>
            <div className="mt-8 flex flex-wrap gap-3" style={{ animationDelay:"0.15s" }}>
              <a href="#register" data-magnetic className="inline-flex items-center gap-2 rounded-full btn-glow btn-glow-hover px-7 py-3.5 text-sm font-semibold text-white">
                Register Now <ArrowRight className="h-4 w-4" />
              </a>
              <a href="#tracks" className="inline-flex items-center gap-2 rounded-full glass-strong px-7 py-3.5 text-sm font-semibold hover:bg-white/10 transition">
                Explore Tracks
              </a>
            </div>
            <div className="mt-10 grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-lg">
              {stats.map((s) => (
                <div key={s.l} className="glass rounded-xl p-3 text-center">
                  <div className="font-display text-xl font-bold text-gradient-brand">{s.v}</div>
                  <div className="text-[10px] uppercase tracking-wider text-muted-foreground mt-0.5">{s.l}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Countdown timer — full width */}
        <div className="mt-14 max-w-screen-2xl mx-auto">
          <div className="glass-strong rounded-2xl p-5 flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="grid h-11 w-11 place-items-center rounded-xl bg-gradient-to-br from-primary to-purple">
                <Calendar className="h-5 w-5 text-white" />
              </div>
              <div>
                <div className="text-xs text-muted-foreground uppercase tracking-wider">Hackathon Begins</div>
                <div className="font-display font-semibold">9 October 2026 · 09:00 AM IST</div>
              </div>
            </div>
            <div className="flex gap-2 sm:gap-3">
              {[["Days",t.d],["Hours",t.h],["Mins",t.m],["Secs",t.s]].map(([l,v]) => (
                <div key={l as string} className="glass rounded-xl px-3 sm:px-4 py-2 min-w-[60px] text-center">
                  <div className="font-display text-xl sm:text-2xl font-bold text-gradient-brand tabular-nums">{String(v).padStart(2,"0")}</div>
                  <div className="text-[9px] uppercase tracking-wider text-muted-foreground">{l as string}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── SECTION WRAPPER ─────────────────────────────────────────────────────────
function Section({ id, eyebrow, title, children, subtitle }: { id?:string; eyebrow?:string; title:string; subtitle?:string; children:React.ReactNode }) {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!headerRef.current) return;
    gsap.fromTo(Array.from(headerRef.current.children),
      { y:40, opacity:0 },
      { y:0, opacity:1, duration:0.7, stagger:0.12, ease:"power3.out",
        scrollTrigger: { trigger: sectionRef.current, start:"top 80%" } }
    );
  }, []);
  return (
    <section ref={sectionRef} id={id} className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-screen-xl px-6 lg:px-12">
        <div ref={headerRef} className="max-w-2xl mb-14">
          {eyebrow && <div className="inline-flex items-center gap-2 rounded-full glass px-3 py-1 text-xs text-cyan mb-4">{eyebrow}</div>}
          <h2 className="font-display text-4xl sm:text-5xl font-bold leading-[1.05]">{title}</h2>
          {subtitle && <p className="mt-4 text-muted-foreground text-lg">{subtitle}</p>}
        </div>
        {children}
      </div>
    </section>
  );
}

// ─── ABOUT ───────────────────────────────────────────────────────────────────
function About() {
  const gridRef = useRef<HTMLDivElement>(null);
  const leftRef = useRef<HTMLDivElement>(null);
  const rightRef = useRef<HTMLDivElement>(null);

  const keyFacts = [
    { icon: Calendar, label:"Event Date", value:"9–10 Oct 2026", accent:"#2B7EF5" },
    { icon: Clock, label:"Duration", value:"24 Hours", accent:"#38BDF8" },
    { icon: Users, label:"Teams", value:"350+ Expected", accent:"#818CF8" },
    { icon: Code2, label:"Team Size", value:"3–5 Members", accent:"#2B7EF5" },
    { icon: MapPin, label:"Venue", value:"SRM Ramapuram", accent:"#F5A623" },
    { icon: Trophy, label:"Prize Pool", value:"₹1,00,000+", accent:"#F5A623" },
  ];

  const pillars = [
    { icon:Sparkles, label:"Innovation", desc:"Identify problems, ideate solutions, and build working prototypes." },
    { icon:Network, label:"Collaboration", desc:"Team up with the brightest builders across India." },
    { icon:GraduationCap, label:"Mentorship", desc:"Interact with industry professionals and startup founders." },
    { icon:Briefcase, label:"Opportunities", desc:"Discover internship and career pathways with partners." },
  ];

  useEffect(() => {
    if (gridRef.current) {
      gsap.fromTo(Array.from(gridRef.current.children),
        { y:50, opacity:0, scale:0.88 },
        { y:0, opacity:1, scale:1, duration:0.6, stagger:0.08, ease:"back.out(1.5)",
          scrollTrigger: { trigger: gridRef.current, start:"top 80%" } }
      );
    }
    if (leftRef.current) {
      gsap.fromTo(leftRef.current, { x:-60, opacity:0 }, { x:0, opacity:1, duration:0.8, ease:"power3.out",
        scrollTrigger: { trigger: leftRef.current, start:"top 80%" } });
    }
    if (rightRef.current) {
      gsap.fromTo(Array.from(rightRef.current.querySelectorAll(".pillar-card")),
        { x:60, opacity:0 },
        { x:0, opacity:1, duration:0.6, stagger:0.1, ease:"power3.out",
          scrollTrigger: { trigger: rightRef.current, start:"top 80%" } }
      );
    }
  }, []);

  return (
    <Section id="about" eyebrow="About the event" title="A 24-hour arena for the next generation of builders.">
      {/* Key facts — glowing stat tiles */}
      <div ref={gridRef} className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 mb-12">
        {keyFacts.map(({ icon:Icon, label, value, accent }) => (
          <div key={label} className="relative group rounded-2xl p-[1px] overflow-hidden transition-all duration-300 hover:-translate-y-1"
            style={{ background:`linear-gradient(135deg,${accent}30,${accent}10,transparent)` }}>
            <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition"
              style={{ background:`radial-gradient(circle at 50% 0%,${accent}25,transparent 70%)` }} />
            <div className="relative bg-surface/90 backdrop-blur-xl rounded-[calc(1rem-1px)] p-4 text-center h-full">
              <div className="mx-auto grid h-10 w-10 place-items-center rounded-xl mb-2"
                style={{ background:`${accent}18`, border:`1px solid ${accent}30` }}>
                <Icon className="h-5 w-5" style={{ color: accent }} />
              </div>
              <div className="font-display text-sm font-bold leading-tight" style={{ color: accent }}>{value}</div>
              <div className="text-[10px] uppercase tracking-wider text-muted-foreground mt-0.5">{label}</div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-2 gap-10 items-start">
        <div ref={leftRef} className="space-y-5">
          <div className="glass-strong rounded-3xl p-8 relative overflow-hidden">
            <div className="absolute inset-0 grid-bg opacity-20" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-48 w-48 rounded-full bg-gradient-to-br from-primary to-purple blur-3xl opacity-40" />
            <div className="relative flex items-center gap-6">
              <div className="shrink-0 text-center">
                <div className="font-display text-6xl sm:text-7xl font-bold text-gradient-brand leading-none">24h</div>
                <div className="text-xs text-muted-foreground mt-1 uppercase tracking-wider">of pure building</div>
              </div>
              <div className="h-16 w-px bg-gradient-to-b from-transparent via-primary/30 to-transparent" />
              <div className="space-y-2">
                {["Identify the problem","Ideate a solution","Build a prototype","Present to judges"].map((step,i) => (
                  <div key={step} className="flex items-center gap-2 text-sm">
                    <span className="grid h-5 w-5 place-items-center rounded-full bg-gradient-to-br from-primary to-accent text-[9px] font-bold text-white shrink-0">{i+1}</span>
                    <span className="text-foreground/80">{step}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative mt-6 flex flex-wrap gap-2">
              {["FinTech","AgriTech","EduTech","Sustainability","Open Innovation","IoT & Hardware","MedTech"].map((t) => (
                <span key={t} className="glass rounded-full px-3 py-1 text-xs font-medium">{t}</span>
              ))}
            </div>
          </div>
          <p className="text-base text-muted-foreground leading-relaxed">
            SRM InoVateX 2026 is a student-driven 24-hour hackathon designed to bring together developers, designers, innovators and aspiring entrepreneurs to build practical technology solutions for real-world challenges.
          </p>
          <div className="grid sm:grid-cols-2 gap-3">
            <div className="glass rounded-2xl p-5 border-l-2 border-primary">
              <div className="text-xs uppercase tracking-wider text-cyan mb-1.5 font-semibold">Mission</div>
              <div className="text-sm">Empower students to solve real-world problems through code and creativity.</div>
            </div>
            <div className="glass rounded-2xl p-5 border-l-2 border-accent">
              <div className="text-xs uppercase tracking-wider text-primary mb-1.5 font-semibold">Vision</div>
              <div className="text-sm">Build India's most vibrant student innovation ecosystem.</div>
            </div>
          </div>
          {/* Multi-Stage Evaluation — left column on desktop */}
          <div className="mt-5 glass-strong rounded-2xl p-5">
            <div className="flex items-center gap-2 mb-4">
              <div className="grid h-7 w-7 place-items-center rounded-lg bg-accent/15"><Zap className="h-4 w-4 text-accent" /></div>
              <div className="text-sm font-bold">Multi-Stage Evaluation</div>
            </div>
            <div className="relative pl-3">
              <div className="absolute left-0 top-2 bottom-2 w-px bg-gradient-to-b from-primary/60 via-accent/40 to-transparent rounded-full" />
              {[
                { time:"First 20 min", title:"Problem Pitch", desc:"Define your problem and present your approach.", color:"#2B7EF5" },
                { time:"After 7 hours", title:"Progress Check", desc:"Technical review of implementation and innovation.", color:"#F5A623" },
                { time:"After 15 hours", title:"Prototype Review", desc:"Working demo, UX and real-world impact assessed.", color:"#38BDF8" },
                { time:"Final Round", title:"Industry Judging", desc:"Shortlisted teams pitch to founders and experts.", color:"#34d399" },
              ].map(({ time, title, desc, color }, i) => (
                <div key={title} className={`relative flex items-start gap-3 ${i < 3 ? "mb-4" : ""}`}>
                  <div className="absolute -left-[13px] top-1 h-3 w-3 rounded-full border-2 border-background"
                    style={{ background:color, boxShadow:`0 0 6px ${color}80` }} />
                  <div className="pl-3">
                    <div className="flex flex-wrap items-center gap-2 mb-0.5">
                      <div className="text-xs font-semibold">{title}</div>
                      <div className="rounded-full px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider whitespace-nowrap"
                        style={{ background:`${color}15`, color, border:`1px solid ${color}30` }}>{time}</div>
                    </div>
                    <div className="text-[11px] text-muted-foreground">{desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div ref={rightRef}>
          {/* Block builder animation */}
          <div className="glass-strong rounded-3xl overflow-hidden mb-6" style={{ background:"rgba(4,9,26,0.7)" }}>
            <div className="px-6 pt-5 pb-1">
              <div className="text-xs text-muted-foreground uppercase tracking-wider font-medium mb-1">The journey of every great hack</div>
              <div className="font-display font-semibold text-sm">From problem to impact</div>
            </div>
            <BlockBuilderAnimation />
          </div>
          <div className="text-sm text-muted-foreground mb-5 uppercase tracking-wider font-medium">What you'll experience</div>
          <div className="grid sm:grid-cols-2 gap-3">
            {pillars.map(({ icon:Icon, label, desc }) => (
              <div key={label} className="pillar-card group glass rounded-2xl p-5 hover:bg-white/[0.08] transition-all duration-300 hover:-translate-y-1">
                <div className="flex items-center gap-3 mb-3">
                  <div className="grid h-9 w-9 place-items-center rounded-xl bg-gradient-to-br from-primary/20 to-accent/20 group-hover:from-primary/30 group-hover:to-accent/30 transition">
                    <Icon className="h-4 w-4 text-primary group-hover:text-cyan transition" />
                  </div>
                  <div className="font-display font-semibold">{label}</div>
                </div>
                <div className="text-sm text-muted-foreground leading-relaxed">{desc}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Section>
  );
}

// ─── WHY PARTICIPATE — numbered feature cards ─────────────────────────────────
function WhyParticipate() {
  const gridRef = useRef<HTMLDivElement>(null);
  const items = [
    { icon:Trophy, title:"Win Cash Prizes", desc:"Compete for ₹1,00,000+ in prizes — ₹60K cash + ₹40K worth of brand credits.", color:"from-yellow-500/20 to-orange-500/10", accent:"#F5A623", num:"01" },
    { icon:Code2, title:"Build Real Projects", desc:"Ship functional products in 24 hours, not just decks.", color:"from-primary/20 to-cyan/10", accent:"#38BDF8", num:"02" },
    { icon:Network, title:"Network", desc:"Connect with peers, mentors, and industry leaders.", color:"from-purple/20 to-primary/10", accent:"#818CF8", num:"03" },
    { icon:FileBadge, title:"Certificates", desc:"Every participant receives a verified certificate.", color:"from-cyan/20 to-primary/10", accent:"#38BDF8", num:"04" },
    { icon:Briefcase, title:"Internship Opportunities", desc:"Get noticed by our partner startups and companies.", color:"from-emerald-500/20 to-primary/10", accent:"#34d399", num:"05" },
    { icon:Rocket, title:"Showcase Skills", desc:"Demo your work in front of a live audience of judges.", color:"from-primary/20 to-purple/10", accent:"#2B7EF5", num:"06" },
  ];
  useEffect(() => {
    if (!gridRef.current) return;
    gsap.fromTo(Array.from(gridRef.current.children),
      { y:60, opacity:0 },
      { y:0, opacity:1, duration:0.7, stagger:0.1, ease:"power3.out",
        scrollTrigger: { trigger: gridRef.current, start:"top 80%" } }
    );
  }, []);
  return (
    <Section id="why" eyebrow="Why participate" title="Six reasons you'll want to be here.">
      <div ref={gridRef} className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {items.map(({ icon:Icon, title, desc, color, accent, num }) => (
          <div key={title} className={`group relative rounded-2xl overflow-hidden transition-all duration-500 hover:-translate-y-2`}>
            {/* Gradient background fill */}
            <div className={`absolute inset-0 bg-gradient-to-br ${color} opacity-60 group-hover:opacity-100 transition-opacity duration-500`} />
            {/* Border */}
            <div className="absolute inset-0 rounded-2xl" style={{ border:`1px solid ${accent}20` }} />
            {/* Content */}
            <div className="relative p-6">
              {/* Large number watermark */}
              <div className="absolute top-3 right-4 font-display text-6xl font-black opacity-[0.06] leading-none" style={{ color: accent }}>{num}</div>
              {/* Icon */}
              <div className="grid h-12 w-12 place-items-center rounded-xl mb-5 transition-all duration-300 group-hover:scale-110"
                style={{ background:`${accent}18`, border:`1px solid ${accent}30` }}>
                <Icon className="h-5 w-5" style={{ color: accent }} />
              </div>
              {/* Number badge */}
              <div className="inline-block text-[9px] font-bold px-2 py-0.5 rounded-full mb-3 uppercase tracking-wider"
                style={{ background:`${accent}15`, color: accent, border:`1px solid ${accent}25` }}>{num}</div>
              <h3 className="font-display text-lg font-semibold mb-2">{title}</h3>
              <p className="text-sm text-muted-foreground">{desc}</p>
            </div>
          </div>
        ))}
      </div>
    </Section>
  );
}

// ─── PRIZES ──────────────────────────────────────────────────────────────────
function Prizes() {
  const podiumRef = useRef<HTMLDivElement>(null);
  const amountRef = useRef<HTMLDivElement>(null);
  const prizes = [
    { icon:Trophy, place:"1st Prize", amount:"₹35,000", color:"from-yellow-400 to-orange-500", ringColor:"ring-yellow-400/30", desc:"Winner of the hackathon", tilt:"-2deg" },
    { icon:Award, place:"2nd Prize", amount:"₹15,000", color:"from-slate-300 to-slate-500", ringColor:"ring-slate-300/30", desc:"Runner-up team", tilt:"1.5deg" },
    { icon:Medal, place:"3rd Prize", amount:"₹10,000", color:"from-orange-400 to-amber-700", ringColor:"ring-orange-400/30", desc:"Second runner-up", tilt:"-1deg" },
  ];
  const extraPerks = [
    { icon:Shield, label:"Trophies & Shields" },{ icon:FileBadge, label:"Certificates" },
    { icon:Star, label:"Medals" },{ icon:Briefcase, label:"Internship Offers" },
    { icon:TrendingUp, label:"Industry Exposure" },{ icon:Laptop, label:"Project Showcasing" },
  ];
  useEffect(() => {
    if (amountRef.current) {
      gsap.fromTo(amountRef.current, { scale:0.5, opacity:0 }, { scale:1, opacity:1, duration:1.2, ease:"elastic.out(1,0.4)",
        scrollTrigger: { trigger: amountRef.current, start:"top 80%" } });
    }
    if (podiumRef.current) {
      gsap.fromTo(Array.from(podiumRef.current.children),
        { y:100, opacity:0 },
        { y:0, opacity:1, duration:0.7, stagger:0.15, ease:"power3.out",
          scrollTrigger: { trigger: podiumRef.current, start:"top 75%" } }
      );
    }
  }, []);
  return (
    <section id="prizes" className="relative py-24 sm:py-32 overflow-hidden">
      {/* Money rain canvas */}
      <MoneyRain />
      <div className="absolute inset-0 pointer-events-none" style={{ zIndex:1 }}>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[500px] w-[500px] rounded-full bg-gradient-to-br from-primary/30 via-purple/30 to-cyan/30 blur-[120px] animate-glow-pulse" />
        <div className="absolute inset-0 bg-gradient-to-t from-background/70 via-transparent to-background/70" />
      </div>
      <div className="relative mx-auto max-w-screen-xl px-6 lg:px-12" style={{ zIndex:2 }}>
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 rounded-full glass px-3 py-1 text-xs text-cyan mb-4">Prize Pool</div>
          <h2 className="font-display text-4xl sm:text-5xl font-bold">Take home your share of</h2>
          <div ref={amountRef} className="mt-6 font-display text-7xl sm:text-9xl font-bold text-gradient-brand leading-none">₹1,00,000+</div>
          {/* Breakdown */}
          <div className="mt-6 flex flex-wrap items-center justify-center gap-4">
            <div className="glass rounded-2xl px-5 py-3 text-center">
              <div className="font-display text-2xl font-bold" style={{ color:"#F5A623" }}>₹60,000</div>
              <div className="text-xs text-muted-foreground mt-0.5 uppercase tracking-wider">Cash Prizes</div>
            </div>
            <div className="text-2xl text-muted-foreground font-light">+</div>
            <div className="glass rounded-2xl px-5 py-3 text-center" style={{ borderColor:"rgba(56,189,248,0.3)" }}>
              <div className="font-display text-2xl font-bold text-cyan">₹40,000+</div>
              <div className="text-xs text-muted-foreground mt-0.5 uppercase tracking-wider">In Extras & Awards</div>
            </div>
          </div>
          {/* ₹40K extras — compact floating chips */}
          <div className="mt-5 flex flex-wrap justify-center gap-2 max-w-xl mx-auto">
            {[
              { icon:"🏆", label:"Performance Prizes", color:"#F5A623" },
              { icon:"🎨", label:"Best UI/UX", color:"#818CF8" },
              { icon:"💡", label:"Best Idea Award", color:"#38BDF8" },
              { icon:"🧢", label:"Goodies & Merch", color:"#34d399" },
              { icon:"📦", label:"Brand Credits", color:"#2B7EF5" },
              { icon:"🎁", label:"Special Offers", color:"#F5A623" },
            ].map(({ icon, label, color }) => (
              <div key={label} style={{
                display:"inline-flex", alignItems:"center", gap:6,
                background:`${color}12`, border:`1px solid ${color}35`,
                borderRadius:99, padding:"5px 12px",
                backdropFilter:"blur(8px)",
              }}>
                <span style={{ fontSize:13 }}>{icon}</span>
                <span style={{ fontSize:11, fontWeight:600, color, whiteSpace:"nowrap" }}>{label}</span>
              </div>
            ))}
          </div>
        </div>
        {/* Podium prize cards — 2nd | 1st | 3rd arrangement */}
        <div ref={podiumRef} className="max-w-3xl mx-auto">
          <div className="flex items-end justify-center gap-3">
            {/* 2nd place */}
            {(() => {
              const p = prizes[1];
              return (
                <div key={p.place} className="flex-1 max-w-[220px]">
                  <div className="relative rounded-2xl overflow-hidden transition-all duration-500 hover:-translate-y-2"
                    style={{ background:"linear-gradient(160deg,rgba(148,163,184,0.12),rgba(71,85,105,0.08))", border:"1.5px solid rgba(148,163,184,0.25)", boxShadow:"0 0 30px rgba(148,163,184,0.08)" }}>
                    <div style={{ height:3, background:"linear-gradient(90deg,transparent,rgba(148,163,184,0.6),transparent)" }} />
                    <div className="p-5 text-center">
                      <div className="mx-auto grid h-14 w-14 place-items-center rounded-xl bg-gradient-to-br from-slate-300 to-slate-500 shadow-lg mb-3">
                        <p.icon className="h-7 w-7 text-white" />
                      </div>
                      <div className="text-[10px] text-slate-400 uppercase tracking-widest font-bold mb-1">2nd Place</div>
                      <div className="font-display text-2xl font-bold" style={{ color:"#94a3b8" }}>₹15,000</div>
                      <div className="text-[9px] text-muted-foreground mt-0.5">cash + credits</div>
                      <div className="mt-3 pt-3 border-t border-white/5 text-[10px] text-muted-foreground">{p.desc}</div>
                    </div>
                    {/* Podium step */}
                    <div style={{ height:28, background:"linear-gradient(to bottom,rgba(148,163,184,0.15),rgba(148,163,184,0.05))", borderTop:"1px solid rgba(148,163,184,0.15)", display:"flex", alignItems:"center", justifyContent:"center" }}>
                      <span style={{ fontSize:9, color:"rgba(148,163,184,0.5)", letterSpacing:"0.15em", textTransform:"uppercase", fontWeight:700 }}>Runner-up</span>
                    </div>
                  </div>
                </div>
              );
            })()}
            {/* 1st place — tallest */}
            {(() => {
              const p = prizes[0];
              return (
                <div key={p.place} className="flex-1 max-w-[240px] relative">
                  {/* Crown */}
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 text-2xl" style={{ filter:"drop-shadow(0 0 8px rgba(245,166,35,0.6))" }}>👑</div>
                  <div className="relative rounded-2xl overflow-hidden transition-all duration-500 hover:-translate-y-2"
                    style={{ background:"linear-gradient(160deg,rgba(245,166,35,0.15),rgba(234,88,12,0.08))", border:"1.5px solid rgba(245,166,35,0.4)", boxShadow:"0 0 40px rgba(245,166,35,0.15), 0 0 80px rgba(245,166,35,0.05)" }}>
                    <div style={{ height:3, background:"linear-gradient(90deg,transparent,#F5A623,transparent)" }} />
                    <div className="p-6 text-center">
                      <div className="mx-auto grid h-16 w-16 place-items-center rounded-xl bg-gradient-to-br from-yellow-400 to-orange-500 shadow-lg mb-3" style={{ boxShadow:"0 8px 32px rgba(245,166,35,0.35)" }}>
                        <p.icon className="h-8 w-8 text-white" />
                      </div>
                      <div className="text-[10px] uppercase tracking-widest font-bold mb-1" style={{ color:"#F5A623" }}>1st Place</div>
                      <div className="font-display text-3xl font-bold" style={{ color:"#F5A623" }}>₹35,000</div>
                      <div className="text-[9px] text-muted-foreground mt-0.5">cash + credits</div>
                      <div className="mt-3 pt-3 border-t border-white/5 text-[10px] text-muted-foreground">Winner of the hackathon</div>
                      <div className="mt-3 flex items-center justify-center gap-1.5 text-[9px]" style={{ color:"rgba(245,166,35,0.6)" }}>
                        <CheckCircle2 className="h-3 w-3" /> Trophy + Certificate included
                      </div>
                    </div>
                    {/* Podium step */}
                    <div style={{ height:36, background:"linear-gradient(to bottom,rgba(245,166,35,0.2),rgba(245,166,35,0.05))", borderTop:"1px solid rgba(245,166,35,0.2)", display:"flex", alignItems:"center", justifyContent:"center" }}>
                      <span style={{ fontSize:9, color:"rgba(245,166,35,0.7)", letterSpacing:"0.15em", textTransform:"uppercase", fontWeight:700 }}>Champion</span>
                    </div>
                  </div>
                </div>
              );
            })()}
            {/* 3rd place */}
            {(() => {
              const p = prizes[2];
              return (
                <div key={p.place} className="flex-1 max-w-[220px]">
                  <div className="relative rounded-2xl overflow-hidden transition-all duration-500 hover:-translate-y-2"
                    style={{ background:"linear-gradient(160deg,rgba(234,88,12,0.12),rgba(180,83,9,0.08))", border:"1.5px solid rgba(234,88,12,0.25)", boxShadow:"0 0 30px rgba(234,88,12,0.08)" }}>
                    <div style={{ height:3, background:"linear-gradient(90deg,transparent,rgba(234,88,12,0.6),transparent)" }} />
                    <div className="p-5 text-center">
                      <div className="mx-auto grid h-14 w-14 place-items-center rounded-xl bg-gradient-to-br from-orange-400 to-amber-700 shadow-lg mb-3">
                        <p.icon className="h-7 w-7 text-white" />
                      </div>
                      <div className="text-[10px] uppercase tracking-widest font-bold mb-1" style={{ color:"#ea580c" }}>3rd Place</div>
                      <div className="font-display text-2xl font-bold" style={{ color:"#ea580c" }}>₹10,000</div>
                      <div className="text-[9px] text-muted-foreground mt-0.5">cash + credits</div>
                      <div className="mt-3 pt-3 border-t border-white/5 text-[10px] text-muted-foreground">{p.desc}</div>
                    </div>
                    {/* Podium step */}
                    <div style={{ height:20, background:"linear-gradient(to bottom,rgba(234,88,12,0.15),rgba(234,88,12,0.05))", borderTop:"1px solid rgba(234,88,12,0.15)", display:"flex", alignItems:"center", justifyContent:"center" }}>
                      <span style={{ fontSize:9, color:"rgba(234,88,12,0.5)", letterSpacing:"0.15em", textTransform:"uppercase", fontWeight:700 }}>2nd Runner-up</span>
                    </div>
                  </div>
                </div>
              );
            })()}
          </div>
        </div>
        <div className="mt-16 max-w-4xl mx-auto">
          <div className="text-center mb-6">
            <div className="text-sm font-semibold text-foreground">Winners also receive</div>
            <div className="text-xs text-muted-foreground mt-1">Beyond the cash — recognition that lasts</div>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
            {extraPerks.map(({ icon:Icon, label }) => (
              <div key={label} className="glass rounded-xl p-3 text-center group hover:bg-white/[0.08] transition">
                <div className="mx-auto grid h-9 w-9 place-items-center rounded-lg bg-gradient-to-br from-primary/20 to-accent/20 group-hover:from-primary/30 group-hover:to-accent/30 transition mb-2">
                  <Icon className="h-4 w-4 text-primary" />
                </div>
                <div className="text-[11px] font-medium leading-tight">{label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── TRACKS — 3D flip reveal cards ───────────────────────────────────────────
function Tracks() {
  const gridRef = useRef<HTMLDivElement>(null);
  const tracks = [
    { icon:Rocket, name:"Open Innovation", desc:"Build innovative tech solutions for meaningful real-world problems across any domain.", tag:"01", color:"from-violet-500/20 to-purple/20", accent:"#a78bfa" },
    { icon:Coins, name:"FinTech", desc:"Digital payments, banking, financial inclusion, and financial security.", tag:"02", color:"from-emerald-500/20 to-primary/20", accent:"#34d399" },
    { icon:Wheat, name:"AgriTech", desc:"Smart farming, farmer-focused solutions, food systems and rural innovation.", tag:"03", color:"from-lime-500/20 to-accent/20", accent:"#84cc16" },
    { icon:GraduationCap, name:"EduTech", desc:"Personalized learning, accessibility, skill development and innovative learning solutions.", tag:"04", color:"from-cyan/20 to-primary/20", accent:"#38BDF8" },
    { icon:Leaf, name:"Sustainability", desc:"Climate tech, waste management, renewable energy and sustainable solutions.", tag:"05", color:"from-green-500/20 to-primary/20", accent:"#4ade80" },
    { icon:Wifi, name:"IoT & Hardware", desc:"Embedded systems, smart devices, robotics, sensors, and real-world hardware prototypes.", tag:"06", color:"from-orange-500/20 to-accent/20", accent:"#fb923c", badge:"Hardware" },
    { icon:Activity, name:"MedTech", desc:"Health monitoring, diagnostics, patient care, medical devices, and digital health innovations.", tag:"07", color:"from-rose-500/20 to-primary/20", accent:"#fb7185", badge:"New" },
  ];
  useEffect(() => {
    if (!gridRef.current) return;
    gsap.fromTo(Array.from(gridRef.current.children),
      { rotateY:90, opacity:0, transformOrigin:"left center" },
      { rotateY:0, opacity:1, duration:0.7, stagger:0.12, ease:"power3.out",
        scrollTrigger: { trigger: gridRef.current, start:"top 75%" } }
    );
  }, []);
  return (
    <Section id="tracks" eyebrow="Innovation tracks" title="Pick a lane. Ship something incredible." subtitle="Seven focused tracks — each with dedicated mentors and industry problem statements.">
      <div className="mb-8 glass-strong rounded-2xl p-4 sm:p-5 flex flex-col sm:flex-row items-start sm:items-center gap-4 border-l-2 border-primary">
        <div className="flex items-center gap-3 shrink-0">
          <div className="grid h-10 w-10 place-items-center rounded-xl bg-gradient-to-br from-primary/20 to-accent/20"><Cpu className="h-5 w-5 text-primary" /></div>
          <div className="font-display font-semibold text-sm">Hardware Prototypes Welcome</div>
        </div>
        <div className="hidden sm:block h-8 w-px bg-primary/15" />
        <p className="text-sm text-muted-foreground leading-relaxed">
          Teams may build <span className="text-foreground font-medium">hardware prototypes</span> across any track — IoT devices, embedded systems, sensors, robotics, and more. All components must be <span className="text-foreground font-medium">brought by the team</span>.
        </p>
      </div>
      <div ref={gridRef} className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
        {tracks.map(({ icon:Icon, name, desc, tag, color, accent, badge }) => (
          <div key={name}
            className="group relative rounded-3xl p-[1px] overflow-hidden transition-all duration-500 hover:-translate-y-2"
            style={{ background:`linear-gradient(140deg, ${accent}30, ${accent}10, transparent)` }}>
            <div className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700"
              style={{ background:`conic-gradient(from 0deg,transparent,${accent}50,transparent 40%)` }} />
            <div className="relative h-full rounded-[calc(1.5rem-1px)] bg-[color-mix(in_oklab,var(--surface)_92%,transparent)] backdrop-blur-xl p-6 overflow-hidden">
              <div className="pointer-events-none absolute -top-20 -right-20 h-48 w-48 rounded-full blur-3xl opacity-30 group-hover:opacity-70 transition-opacity duration-700"
                style={{ background:`radial-gradient(circle, ${accent}80, transparent 70%)` }} />
              <div className="relative flex items-start justify-between mb-5">
                <div className={`relative grid h-12 w-12 place-items-center rounded-xl border bg-gradient-to-br ${color} group-hover:scale-110 transition-all duration-500 group-hover:rotate-[-6deg]`}
                  style={{ borderColor:`${accent}25` }}>
                  <Icon className="h-6 w-6" style={{ color:accent }} strokeWidth={1.6} />
                </div>
                <div className="flex flex-col items-end gap-1">
                  <span className="font-display text-3xl font-bold" style={{ color:`${accent}18` }}>{tag}</span>
                  {badge && <span className="text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full" style={{ background:`${accent}20`, color:accent, border:`1px solid ${accent}30` }}>{badge}</span>}
                </div>
              </div>
              <h3 className="font-display text-lg font-semibold leading-tight mb-2">{name}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{desc}</p>
              <div className="mt-4 flex items-center justify-between pt-4 border-t" style={{ borderColor:`${accent}15` }}>
                <span className="text-[10px] uppercase tracking-widest text-muted-foreground font-medium">Explore track</span>
                <span className="grid h-6 w-6 place-items-center rounded-full transition-all duration-300 group-hover:rotate-[-45deg]"
                  style={{ background:accent, color:"#fff" }}>
                  <ArrowRight className="h-3 w-3" />
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </Section>
  );
}

// ─── TIMELINE ────────────────────────────────────────────────────────────────
function useReveal<T extends HTMLElement = HTMLDivElement>() {
  const [ref, setRef] = useState<T | null>(null);
  useEffect(() => {
    if (!ref) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) { ref.classList.add("in-view"); return; }
    const io = new IntersectionObserver(
      (entries) => { entries.forEach((e) => { if (e.isIntersecting) { ref.classList.add("in-view"); io.unobserve(ref); } }); },
      { threshold:0.15, rootMargin:"0px 0px -10% 0px" }
    );
    io.observe(ref);
    return () => io.disconnect();
  }, [ref]);
  return setRef;
}

function TimelineRow({ s, i, right }: { s:{ date:string; time:string; title:string; desc:string; icon:any }; i:number; right:boolean }) {
  const setRef = useReveal<HTMLDivElement>();
  const cardRef = useRef<HTMLDivElement>(null);
  const Icon = s.icon;
  useEffect(() => {
    if (!cardRef.current) return;
    gsap.fromTo(cardRef.current,
      { x:right ? 80 : -80, opacity:0 },
      { x:0, opacity:1, duration:0.8, ease:"power3.out",
        scrollTrigger: { trigger: cardRef.current, start:"top 85%" }, delay:i*0.1 }
    );
  }, [right, i]);
  return (
    <div ref={setRef} className="reveal relative pl-16 sm:pl-20 md:pl-0 md:grid md:grid-cols-2 md:gap-16 items-center" style={{ transitionDelay:`${Math.min(i,3)*90}ms` }}>
      <div className={`${right ? "md:col-start-2" : "md:col-start-1 md:text-right"}`}>
        <div ref={cardRef} className={`group relative inline-block max-w-md text-left transition-all duration-500 md:hover:-translate-y-1 ${right ? "" : "md:ml-auto"}`}>
          <div className="absolute -inset-1 rounded-3xl bg-gradient-to-br from-primary/30 via-accent/30 to-primary/30 opacity-0 md:group-hover:opacity-100 blur-xl transition duration-500" />
          <div className="relative rounded-2xl p-5 sm:p-6 bg-[color-mix(in_oklab,var(--surface)_92%,transparent)] backdrop-blur-xl border border-primary/15 shadow-[0_20px_50px_-25px_rgba(43,126,245,0.40)]">
            <div className="flex items-center gap-3 mb-3">
              <span className="grid h-9 w-9 place-items-center rounded-xl bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors duration-500">
                <Icon className="h-4 w-4" strokeWidth={1.8} />
              </span>
              <div>
                <div className="text-[10px] uppercase tracking-[0.2em] text-primary font-bold">{s.date}</div>
                <div className="text-[10px] uppercase tracking-widest text-muted-foreground">{s.time}</div>
              </div>
            </div>
            <div className="font-display text-lg md:text-xl font-semibold leading-tight">{s.title}</div>
            <div className="mt-2 text-sm text-muted-foreground leading-relaxed">{s.desc}</div>
          </div>
        </div>
      </div>
      <div className="absolute left-6 sm:left-8 md:left-1/2 top-6 md:top-8 -translate-x-1/2 z-10">
        <div className="relative">
          <div className="absolute inset-0 rounded-full bg-accent/40 blur-md animate-[glow-pulse_4s_ease-in-out_infinite]" />
          <div className="relative grid h-5 w-5 md:h-6 md:w-6 place-items-center rounded-full bg-background border-2 border-accent shadow-[0_0_0_4px_color-mix(in_oklab,var(--primary)_10%,transparent)]">
            <div className="h-1.5 w-1.5 md:h-2 md:w-2 rounded-full bg-gradient-to-br from-primary to-accent" />
          </div>
        </div>
      </div>
      <div className={right ? "md:col-start-1 md:row-start-1" : "md:col-start-2 md:row-start-1"} />
    </div>
  );
}

function Timeline() {
  const lineRef = useRef<HTMLDivElement>(null);
  const steps = [
    { date:"Aug 01", time:"00:00 IST", title:"Registration Opens", desc:"Applications go live to teams across India.", icon:Sparkles },
    { date:"Sep 25", time:"23:59 IST", title:"Registration Closes", desc:"Final teams confirmed and shortlisted.", icon:FileBadge },
    { date:"Oct 09", time:"09:00 IST", title:"Hackathon Starts", desc:"The 24-hour clock officially begins.", icon:Rocket },
    { date:"Oct 10", time:"09:00 IST", title:"Project Evaluation", desc:"Live demos to a panel of industry judges.", icon:Code2 },
    { date:"Oct 10", time:"18:00 IST", title:"Prize Distribution", desc:"Winners announced. Champions crowned.", icon:Trophy },
  ];
  useEffect(() => {
    if (!lineRef.current) return;
    gsap.fromTo(lineRef.current, { scaleY:0, transformOrigin:"top center" },
      { scaleY:1, duration:1.5, ease:"power2.inOut",
        scrollTrigger: { trigger:lineRef.current, start:"top 80%", end:"bottom 20%", scrub:true } }
    );
  }, []);
  return (
    <Section id="timeline" eyebrow="Timeline" title="Mark your calendar.">
      <div className="relative">
        <div ref={lineRef} className="absolute left-6 sm:left-8 md:left-1/2 top-0 bottom-0 w-[2px] md:-translate-x-1/2 overflow-hidden rounded-full">
          <div className="absolute inset-0 bg-gradient-to-b from-primary/10 via-accent/40 to-primary/10" />
          <div className="absolute inset-x-0 h-1/3 bg-gradient-to-b from-transparent via-accent to-transparent animate-[shimmer_3s_linear_infinite]" style={{ backgroundSize:"100% 300%" }} />
        </div>
        <div className="space-y-10 sm:space-y-12 md:space-y-16">
          {steps.map((s,i) => <TimelineRow key={i} s={s} i={i} right={i%2===1} />)}
        </div>
      </div>
    </Section>
  );
}

// ─── VENUE ───────────────────────────────────────────────────────────────────
function Venue() {
  return (
    <Section id="venue" eyebrow="Venue" title="Where it all goes down.">
      <div className="grid lg:grid-cols-2 gap-6">
        <div className="glass-strong rounded-3xl p-8">
          <div className="flex items-center gap-2 text-cyan text-sm"><MapPin className="h-4 w-4" /> On-campus · Offline event</div>
          <h3 className="mt-4 font-display text-3xl font-bold">SRM University</h3>
          <p className="mt-1 text-muted-foreground">Ramapuram Campus, Chennai — Tamil Nadu, India</p>
          <div className="mt-6 space-y-3 text-sm">
            <div className="flex items-start gap-3"><MapPin className="h-4 w-4 text-primary mt-0.5" /> Bharathi Salai, Ramapuram, Chennai — 600089</div>
            <div className="flex items-start gap-3"><Clock className="h-4 w-4 text-primary mt-0.5" /> 9 Oct 09:00 AM → 10 Oct 09:00 AM IST</div>
            <div className="flex items-start gap-3"><Users className="h-4 w-4 text-primary mt-0.5" /> Open to students across India</div>
          </div>
          <a href="https://maps.google.com/?q=SRM+University+Ramapuram" target="_blank" rel="noreferrer" className="mt-6 inline-flex items-center gap-2 rounded-full glass px-4 py-2 text-sm hover:bg-white/10 transition">
            Open in Maps <ArrowRight className="h-3.5 w-3.5" />
          </a>
        </div>
        <div className="glass rounded-3xl overflow-hidden min-h-[380px] relative">
          <iframe title="SRM University Ramapuram"
            src="https://www.google.com/maps?q=SRM+University+Ramapuram+Chennai&output=embed"
            className="absolute inset-0 h-full w-full grayscale contrast-125" loading="lazy" />
        </div>
      </div>
    </Section>
  );
}

// ─── INDUSTRY PARTNERS — tap to reveal ───────────────────────────────────────
function InternshipOpportunities() {
  const INSTAGRAM_URL = "https://instagram.com/srm.innovatex";
  const cardsRef = useRef<HTMLDivElement>(null);
  const opportunities = [
    { icon:Briefcase, label:"Software Internships" },{ icon:Laptop, label:"IoT Programs" },
    { icon:TrendingUp, label:"Industry Exposure" },{ icon:Gift, label:"Vouchers & Goodies" },
    { icon:Network, label:"Career Networking" },{ icon:Star, label:"Project Showcasing" },
  ];
  useEffect(() => {
    if (!cardsRef.current) return;
    gsap.fromTo(Array.from(cardsRef.current.children),
      { y:50, opacity:0 },
      { y:0, opacity:1, duration:0.7, stagger:0.15, ease:"power3.out",
        scrollTrigger: { trigger: cardsRef.current, start:"top 80%" } }
    );
  }, []);
  const mysteryCards = [
    { type:"Financial Sponsor", hint:"Fintech company", accent:"#2B7EF5" },
    { type:"Product Partner", hint:"Tech & IoT company", accent:"#38BDF8" },
  ];
  return (
    <section id="industry" className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-screen-xl px-6 lg:px-12">
        <div className="max-w-2xl mb-14">
          <div className="inline-flex items-center gap-2 rounded-full glass px-3 py-1 text-xs text-cyan mb-4">Industry support</div>
          <h2 className="font-display text-4xl sm:text-5xl font-bold leading-[1.05]">Beyond the hackathon — real opportunities.</h2>
          <p className="mt-4 text-muted-foreground text-lg">Our industry partners provide internships, mentorship, and career pathways. Partner reveal coming soon.</p>
        </div>
        {/* Mystery partner cards — tap to reveal on Instagram */}
        <div ref={cardsRef} className="grid lg:grid-cols-2 gap-6 mb-12">
          {mysteryCards.map(({ type, hint, accent }, idx) => (
            <a key={idx} href={INSTAGRAM_URL} target="_blank" rel="noreferrer"
              className="group relative rounded-3xl overflow-hidden transition-all duration-300 hover:-translate-y-1 cursor-pointer block">
              <div style={{ height:4, background:`linear-gradient(90deg,${accent}60,${accent},${accent}60)` }} />
              <div className="glass-strong p-8 relative">
                <div className="absolute top-4 right-4 text-[9px] font-bold uppercase tracking-wider px-2 py-1 rounded"
                  style={{ background:`${accent}15`, border:`1px solid ${accent}30`, color: accent }}>TAP TO REVEAL</div>
                <div className="flex items-start gap-4 mb-5">
                  <div className="grid h-14 w-14 place-items-center rounded-2xl shrink-0 relative overflow-hidden"
                    style={{ background:`${accent}15`, border:`1px solid ${accent}25` }}>
                    <Building2 className="h-7 w-7 opacity-20" style={{ color: accent }} />
                    <div className="absolute inset-0 flex items-center justify-center text-2xl">?</div>
                  </div>
                  <div>
                    <div className="font-display text-lg font-bold leading-tight" style={{ color:`${accent}80`, filter:"blur(5px)", userSelect:"none" }}>████████ ██████████</div>
                    <div className="text-xs text-muted-foreground mt-1 uppercase tracking-wider">{type}</div>
                    <div className="text-[10px] text-muted-foreground mt-1 italic">{hint}</div>
                  </div>
                </div>
                <div className="flex items-center gap-2 text-sm" style={{ color: accent }}>
                  <Instagram className="h-4 w-4" />
                  <span className="text-xs font-medium">Follow @srm.innovatex for the official reveal</span>
                </div>
                <div className="mt-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-xs text-muted-foreground flex items-center gap-1">
                  <ArrowRight className="h-3 w-3" /> Opens Instagram
                </div>
              </div>
            </a>
          ))}
        </div>
        <div className="glass rounded-3xl p-8">
          <div className="text-center mb-6">
            <div className="font-display text-xl font-semibold">Opportunities for all participants</div>
            <div className="text-sm text-muted-foreground mt-1">Connect your project experience with real-world career pathways</div>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {opportunities.map(({ icon:Icon, label }) => (
              <div key={label} className="text-center group">
                <div className="mx-auto grid h-12 w-12 place-items-center rounded-2xl bg-gradient-to-br from-primary/15 to-accent/15 group-hover:from-primary/25 group-hover:to-accent/25 transition mb-2">
                  <Icon className="h-5 w-5 text-primary" />
                </div>
                <div className="text-xs font-medium leading-tight">{label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── FAQ VISUAL — live Q&A chat widget ────────────────────────────────────────
function FAQVisual() {
  const [visibleCount, setVisibleCount] = useState(1);
  const chat = [
    { who:"q", text:"Who can participate?", delay:0 },
    { who:"a", text:"Any student in India with a valid college ID. Undergrad or postgrad.", delay:800 },
    { who:"q", text:"Can we build hardware?", delay:1800 },
    { who:"a", text:"Yes! IoT, embedded systems, robotics — bring your components.", delay:2600 },
    { who:"q", text:"AI tools allowed?", delay:3600 },
    { who:"a", text:"Absolutely. Copilot, Cursor, and others are welcome.", delay:4400 },
  ];
  useEffect(() => {
    const timers: ReturnType<typeof setTimeout>[] = [];
    chat.forEach((_, idx) => {
      const t = setTimeout(() => setVisibleCount(idx + 1), chat[idx].delay + 600);
      timers.push(t);
    });
    return () => timers.forEach(clearTimeout);
  }, []);
  return (
    <div className="hidden lg:flex flex-col gap-5 sticky top-32">
      {/* Chat-style Q&A */}
      <div className="glass-strong rounded-3xl overflow-hidden" style={{ background:"rgba(4,9,26,0.8)" }}>
        {/* Header bar */}
        <div className="px-5 py-3 flex items-center gap-2 border-b border-white/5">
          <div className="h-2.5 w-2.5 rounded-full bg-green-400 animate-pulse" />
          <span className="text-xs font-mono text-muted-foreground">ask-innovatex</span>
          <span className="ml-auto text-[10px] text-cyan/60 font-medium uppercase tracking-wider">Live</span>
        </div>
        <div className="p-4 space-y-3" style={{ minHeight:280 }}>
          {chat.slice(0, visibleCount).map((msg, i) => (
            <div key={i} style={{
              display:"flex", justifyContent: msg.who==="q" ? "flex-start" : "flex-end",
              animation:"faqMsgIn 0.3s ease-out both",
            }}>
              <div style={{
                maxWidth:"80%",
                background: msg.who==="q"
                  ? "rgba(43,126,245,0.12)" : "rgba(56,189,248,0.12)",
                border: msg.who==="q"
                  ? "1px solid rgba(43,126,245,0.25)" : "1px solid rgba(56,189,248,0.25)",
                borderRadius: msg.who==="q" ? "4px 12px 12px 12px" : "12px 4px 12px 12px",
                padding:"8px 12px",
                fontSize:11, lineHeight:1.5,
                color: msg.who==="q" ? "rgba(148,163,184,0.9)" : "rgba(56,189,248,0.9)",
              }}>
                {msg.who==="q" && <span style={{ fontSize:9, opacity:0.5, display:"block", marginBottom:2, letterSpacing:"0.05em" }}>PARTICIPANT</span>}
                {msg.who==="a" && <span style={{ fontSize:9, opacity:0.5, display:"block", marginBottom:2, letterSpacing:"0.05em" }}>ORGANIZER</span>}
                {msg.text}
              </div>
            </div>
          ))}
          {visibleCount < chat.length && (
            <div style={{ display:"flex", gap:4, paddingLeft:4 }}>
              {[0,1,2].map(d => (
                <div key={d} style={{ width:5, height:5, borderRadius:"50%", background:"rgba(43,126,245,0.5)", animation:`typingDot 1.2s ease-in-out ${d*0.2}s infinite` }} />
              ))}
            </div>
          )}
        </div>
      </div>
      {/* Contact card */}
      <div className="text-center glass rounded-2xl p-5">
        <div className="font-display text-base font-bold mb-1">Still have questions?</div>
        <div className="text-xs text-muted-foreground mb-3">DM us on Instagram — we reply fast.</div>
        <a href="https://instagram.com/srm.innovatex" target="_blank" rel="noreferrer"
          className="inline-flex items-center gap-2 rounded-full glass px-4 py-2 text-sm hover:bg-white/10 transition" style={{ border:"1px solid rgba(236,72,153,0.3)" }}>
          <Instagram className="h-4 w-4" style={{ color:"#ec4899" }} />
          <span>@srm.innovatex</span>
        </a>
      </div>
      <style>{`
        @keyframes faqMsgIn {
          from { opacity:0; transform: translateY(8px) scale(0.97); }
          to   { opacity:1; transform: translateY(0) scale(1); }
        }
        @keyframes typingDot {
          0%,80%,100% { transform: scale(0.8); opacity:0.4; }
          40% { transform: scale(1.2); opacity:1; }
        }
      `}</style>
    </div>
  );
}

// ─── FAQ — terminal-style ────────────────────────────────────────────────────
function FAQ() {
  const listRef = useRef<HTMLDivElement>(null);
  const faqs = [
    { q:"Who can participate?", a:"Any undergraduate or postgraduate student in India with a valid college ID card." },
    { q:"What is the team size?", a:"Teams of 3 to 5 members. Fees vary by team size: ₹1,399 for 3 members, ₹1,799 for 4, ₹2,099 for 5." },
    { q:"Can beginners participate?", a:"Absolutely. We have mentors on-ground and beginner-friendly problem statements across all tracks." },
    { q:"Can we use AI tools?", a:"Yes, AI tools like GitHub Copilot and Cursor are welcome — build with the modern stack." },
    { q:"Can we build hardware prototypes?", a:"Yes! Teams can build hardware prototypes across any track — IoT devices, embedded systems, sensors, robotics, and similar. Power outlets and workspace will be provided. All hardware components must be brought by the team." },
    { q:"What should we bring?", a:"Laptop & charger, extension board, power bank, ID card, and personal essentials. Refreshments and one dinner are provided for all participants." },
    { q:"Is accommodation provided?", a:"Accommodation arrangements will be communicated to registered teams. Please reach out to the organizers for details." },
  ];
  useEffect(() => {
    if (!listRef.current) return;
    gsap.fromTo(Array.from(listRef.current.children),
      { x:-40, opacity:0 },
      { x:0, opacity:1, duration:0.5, stagger:0.08, ease:"power3.out",
        scrollTrigger: { trigger: listRef.current, start:"top 80%" } }
    );
  }, []);
  return (
    <Section id="faq" eyebrow="Frequently asked" title="Everything you wanted to ask.">
      <div className="grid lg:grid-cols-[1fr_380px] gap-10 items-start">
        {/* Left: terminal accordion */}
        <div>
          <div className="mb-4 glass-strong rounded-t-2xl px-5 py-3 flex items-center gap-2 border-b border-primary/10">
            <div className="h-3 w-3 rounded-full bg-red-400/80" />
            <div className="h-3 w-3 rounded-full bg-yellow-400/80" />
            <div className="h-3 w-3 rounded-full bg-green-400/80" />
            <span className="ml-3 text-xs text-muted-foreground font-mono">faq --interactive</span>
          </div>
          <div ref={listRef}>
            <Accordion type="single" collapsible className="space-y-2">
              {faqs.map((f,i) => (
                <AccordionItem key={i} value={`item-${i}`} className="border-0 rounded-xl overflow-hidden"
                  style={{ background:"rgba(8,18,40,0.7)", border:"1px solid rgba(43,126,245,0.15)", backdropFilter:"blur(16px)" }}>
                  <AccordionTrigger className="text-left font-mono text-sm hover:no-underline px-5 py-4 group">
                    <span className="text-primary/60 mr-2 font-bold">{`>`}</span>
                    <span className="text-foreground/90">{f.q}</span>
                  </AccordionTrigger>
                  <AccordionContent className="px-5 pb-4 font-mono text-xs text-cyan/80 leading-relaxed border-t border-primary/10">
                    <span className="text-primary/40 mr-2">&gt;&gt;</span>{f.a}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
        {/* Right: neural network visual */}
        <FAQVisual />
      </div>
    </Section>
  );
}

// ─── SPONSORS ────────────────────────────────────────────────────────────────
function Sponsors() {
  const INSTAGRAM_URL = "https://instagram.com/srm.innovatex";
  const cards = [1,2,3,4,5,6];
  return (
    <Section id="sponsors" eyebrow="Sponsors & partners" title="Our sponsors are coming.">
      <p className="text-muted-foreground mb-10 -mt-6">We're finalizing our sponsor lineup. Tap to get a sneak peek — the full reveal drops on our Instagram.</p>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 mb-10">
        {cards.map((_, i) => (
          <a key={i} href={INSTAGRAM_URL} target="_blank" rel="noreferrer"
            className="group relative rounded-2xl overflow-hidden cursor-pointer transition-all duration-300 hover:-translate-y-1"
            style={{ minHeight:110, background:"rgba(8,18,40,0.8)", border:"1px solid rgba(43,126,245,0.15)" }}>
            {/* Top accent stripe */}
            <div style={{ height:3, background:`linear-gradient(90deg,rgba(43,126,245,0.6),rgba(245,166,35,0.6),rgba(43,126,245,0.6))` }} />
            <div className="flex flex-col items-center justify-center h-full py-5 gap-2">
              {/* Blur/mystery layer */}
              <div className="relative">
                <div style={{ width:44, height:44, borderRadius:10, background:"linear-gradient(135deg,rgba(43,126,245,0.2),rgba(129,140,248,0.2))", filter:"blur(2px)", display:"flex", alignItems:"center", justifyContent:"center" }}>
                  <Building2 className="h-5 w-5 text-primary/40" />
                </div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span style={{ fontSize:20 }}>?</span>
                </div>
              </div>
              <div style={{ fontSize:9, color:"rgba(120,150,200,0.5)", letterSpacing:"0.15em", textTransform:"uppercase", textAlign:"center" }}>Coming Soon</div>
              <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center gap-1"
                style={{ fontSize:9, color:"rgba(56,189,248,0.8)" }}>
                <Instagram className="h-3 w-3" /> Reveal
              </div>
            </div>
          </a>
        ))}
      </div>
      {/* Big reveal CTA */}
      <div className="glass-strong rounded-3xl p-8 flex flex-col sm:flex-row items-center gap-6 justify-between">
        <div>
          <div className="font-display text-xl font-bold mb-1">Sponsor announcements dropping soon</div>
          <div className="text-sm text-muted-foreground">Follow us on Instagram for the official sponsor reveal and event updates.</div>
        </div>
        <div className="flex flex-wrap gap-3 shrink-0">
          <a href={INSTAGRAM_URL} target="_blank" rel="noreferrer" data-magnetic
            className="inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-semibold text-white transition"
            style={{ background:"linear-gradient(135deg,#833ab4,#fd1d1d,#fcb045)" }}>
            <Instagram className="h-4 w-4" /> Follow for Reveal
          </a>
          <a href="#contact" className="inline-flex items-center gap-2 rounded-full glass px-6 py-3 text-sm font-semibold hover:bg-white/10 transition">
            Become a Sponsor <ArrowRight className="h-4 w-4" />
          </a>
        </div>
      </div>
    </Section>
  );
}

// ─── TEAM — polaroid cards ────────────────────────────────────────────────────
function Team() {
  const gridRef = useRef<HTMLDivElement>(null);
  const team = [
    { name:"K. Harshith", role:"Main Organizer", initials:"KH", featured:true,
      gradient:"from-blue-600/40 via-indigo-500/30 to-cyan-400/20", accent:"#38BDF8",
      skills:["Strategy","Ops","Design"], dept:"Management" },
    { name:"P. Pranush", role:"Tech Lead", initials:"PP", featured:false,
      gradient:"from-violet-600/40 via-purple-500/30 to-fuchsia-400/20", accent:"#a78bfa",
      skills:["React","Node","DevOps"], dept:"Engineering" },
    { name:"U. Veerendra", role:"Finance Lead", initials:"UV", featured:false,
      gradient:"from-emerald-600/40 via-teal-500/30 to-cyan-400/20", accent:"#34d399",
      skills:["Budgeting","Sponsorship"], dept:"Finance" },
  ];
  useEffect(() => {
    if (!gridRef.current) return;
    gsap.fromTo(Array.from(gridRef.current.children),
      { scale:0.85, opacity:0, y:40 },
      { scale:1, opacity:1, y:0, duration:0.7, stagger:0.15, ease:"back.out(1.7)",
        scrollTrigger: { trigger: gridRef.current, start:"top 80%" } }
    );
  }, []);
  return (
    <Section id="team" eyebrow="Organizing team" title="Meet the crew behind InoVateX.">
      <div ref={gridRef} className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {team.map((m) => (
          <div key={m.name} className="group relative">
            {/* Glow border */}
            <div className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-sm"
              style={{ background:`linear-gradient(135deg,${m.accent}40,transparent,${m.accent}20)` }} />
            <div className="relative rounded-3xl overflow-hidden transition-all duration-500 group-hover:-translate-y-2"
              style={{ background:"linear-gradient(145deg,rgba(8,18,42,0.97),rgba(4,9,26,0.99))", border:`1px solid ${m.accent}25` }}>
              {/* Top gradient band */}
              <div className={`relative h-40 bg-gradient-to-br ${m.gradient} flex items-end justify-between p-5 overflow-hidden`}>
                <div className="absolute inset-0 grid-bg opacity-10" />
                {/* Abstract circle accent */}
                <div className="absolute -top-8 -right-8 h-36 w-36 rounded-full opacity-20"
                  style={{ background:`radial-gradient(circle,${m.accent},transparent 70%)` }} />
                <div className="absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-[rgba(8,18,42,0.97)] to-transparent" />
                {/* Initials avatar */}
                <div className="relative z-10 h-16 w-16 rounded-2xl flex items-center justify-center shadow-xl"
                  style={{ background:`linear-gradient(135deg,${m.accent}30,${m.accent}10)`, border:`1.5px solid ${m.accent}50`, backdropFilter:"blur(12px)" }}>
                  <span className="font-display text-2xl font-black" style={{ color:m.accent }}>{m.initials}</span>
                </div>
                {/* Dept badge top-right */}
                <div className="relative z-10 rounded-full px-3 py-1 text-[9px] font-bold uppercase tracking-wider"
                  style={{ background:`${m.accent}15`, border:`1px solid ${m.accent}35`, color:m.accent, backdropFilter:"blur(8px)" }}>
                  {m.dept}
                </div>
                {m.featured && (
                  <div className="absolute top-3 left-3 z-10 rounded-full bg-accent/25 border border-accent/40 px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider text-accent">
                    Lead
                  </div>
                )}
              </div>
              {/* Info area */}
              <div className="p-5">
                <div className="font-display text-lg font-bold leading-tight">{m.name}</div>
                <div className="text-sm mt-0.5 mb-4" style={{ color:m.accent }}>{m.role}</div>
                {/* Skill chips */}
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {m.skills.map(s => (
                    <span key={s} className="text-[10px] rounded-full px-2.5 py-0.5 font-medium"
                      style={{ background:`${m.accent}12`, border:`1px solid ${m.accent}25`, color:"rgba(200,220,255,0.7)" }}>
                      {s}
                    </span>
                  ))}
                </div>
                {/* Divider + social */}
                <div className="pt-3 flex items-center justify-between" style={{ borderTop:`1px solid ${m.accent}18` }}>
                  <div className="text-[10px] text-muted-foreground uppercase tracking-wider font-medium">SRM InoVateX 2026</div>
                  <div className="flex items-center gap-2">
                    <a href="#" aria-label={`${m.name} LinkedIn`}
                      className="grid h-7 w-7 place-items-center rounded-full transition-colors duration-200"
                      style={{ background:`${m.accent}12`, border:`1px solid ${m.accent}25` }}>
                      <Linkedin className="h-3 w-3" style={{ color:m.accent }} />
                    </a>
                    <a href="#" aria-label={`${m.name} GitHub`}
                      className="grid h-7 w-7 place-items-center rounded-full transition-colors duration-200"
                      style={{ background:`${m.accent}12`, border:`1px solid ${m.accent}25` }}>
                      <Github className="h-3 w-3" style={{ color:m.accent }} />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </Section>
  );
}

// ─── CTA ─────────────────────────────────────────────────────────────────────
function ContactCTA() {
  const headingRef = useRef<HTMLHeadingElement>(null);
  useEffect(() => {
    if (!headingRef.current) return;
    gsap.fromTo(headingRef.current, { opacity:0, y:30 }, { opacity:1, y:0, duration:0.8, ease:"power3.out",
      scrollTrigger: { trigger: headingRef.current, start:"top 85%" } });
    headingRef.current.addEventListener("mouseenter", () => {
      gsap.to(headingRef.current, { x:3, duration:0.05, yoyo:true, repeat:5, ease:"none" });
    });
  }, []);
  return (
    <section id="register" className="relative py-24">
      <div className="mx-auto max-w-screen-xl px-6 lg:px-12">
        <div id="contact" className="relative glass-strong rounded-3xl p-10 sm:p-14 overflow-hidden">
          <div className="absolute -top-40 -right-40 h-96 w-96 rounded-full bg-primary/30 blur-[120px]" />
          <div className="absolute -bottom-40 -left-40 h-96 w-96 rounded-full bg-purple/30 blur-[120px]" />
          <div className="relative grid lg:grid-cols-2 gap-10 items-center">
            <div>
              <h2 ref={headingRef} className="font-display text-4xl sm:text-5xl font-bold leading-tight">
                Ready to <span className="text-gradient-brand">build tomorrow</span>?
              </h2>
              <p className="mt-4 text-muted-foreground text-lg">Grab your spot before registrations close on September 25th.</p>
              <div className="mt-8 flex flex-wrap gap-3">
                <a href="#" data-magnetic className="inline-flex items-center gap-2 rounded-full btn-glow btn-glow-hover px-7 py-3.5 text-sm font-semibold text-white">
                  Register Your Team <ArrowRight className="h-4 w-4" />
                </a>
                <a href="#tracks" className="inline-flex items-center gap-2 rounded-full glass px-7 py-3.5 text-sm font-semibold hover:bg-white/10">View Tracks</a>
              </div>
            </div>
            <div className="space-y-3">
              {[
                { icon:Mail, label:"innovatex@srmist.edu.in" },
                { icon:Phone, label:"+91 98765 43210" },
                { icon:MapPin, label:"SRM Ramapuram, Chennai" },
                { icon:Instagram, label:"@srm.innovatex" },
                { icon:Linkedin, label:"SRM InnovateX" },
              ].map(({ icon:Icon, label }) => (
                <div key={label} className="flex items-center gap-3 glass rounded-xl px-4 py-3">
                  <div className="grid h-9 w-9 place-items-center rounded-lg bg-gradient-to-br from-primary/30 to-purple/30">
                    <Icon className="h-4 w-4 text-cyan" />
                  </div>
                  <span className="text-sm">{label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── FOOTER ──────────────────────────────────────────────────────────────────
function Footer() {
  const scrollTop = () => window.scrollTo({ top: 0, behavior: "smooth" });
  const socials = [
    { Icon: Instagram, label: "Instagram", href: "https://instagram.com/srm.innovatex", hoverBg: "#E1306C" },
    { Icon: Linkedin,  label: "LinkedIn",  href: "#", hoverBg: "#0A66C2" },
    { Icon: Twitter,   label: "Twitter",   href: "#", hoverBg: "#1DA1F2" },
    { Icon: Github,    label: "GitHub",    href: "#", hoverBg: "#f0f6fc" },
  ];
  return (
    <footer className="relative">
      {/* Gradient divider */}
      <div style={{ height:1, background:"linear-gradient(90deg,transparent,rgba(43,126,245,0.5),rgba(167,139,250,0.35),transparent)" }} />

      {/* Pre-footer CTA strip */}
      <div style={{ background:"linear-gradient(135deg,rgba(43,126,245,0.07),rgba(167,139,250,0.05))", borderBottom:"1px solid rgba(255,255,255,0.04)" }}>
        <div className="mx-auto max-w-screen-xl px-6 lg:px-12 py-5 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="grid h-10 w-10 place-items-center rounded-full shrink-0" style={{ background:"rgba(43,126,245,0.15)" }}>
              <Calendar className="h-5 w-5 text-primary" />
            </div>
            <div>
              <div className="text-sm font-semibold">Registrations close September 25th</div>
              <div className="text-xs text-muted-foreground">Limited team slots — secure your spot early</div>
            </div>
          </div>
          <a href="#register" className="shrink-0 inline-flex items-center gap-2 rounded-full btn-glow btn-glow-hover px-6 py-2.5 text-sm font-semibold text-white">
            Register Now <ArrowRight className="h-4 w-4" />
          </a>
        </div>
      </div>

      {/* Main footer body */}
      <div className="pt-14 pb-8" style={{ background:"rgba(5,11,26,0.98)" }}>
        <div className="mx-auto max-w-screen-xl px-6 lg:px-12 grid md:grid-cols-[2fr_1.1fr_1.5fr_1.4fr] gap-10">

          {/* Brand */}
          <div>
            <div className="flex items-center gap-2.5 mb-4">
              <img src={`${import.meta.env.BASE_URL}favicon.png`} alt="SRM InoVateX logo" className="h-10 w-10 rounded-xl object-contain bg-white/90 p-0.5" />
              <div>
                <div className="font-display font-bold text-base">SRM InoVateX 2026</div>
                <div className="text-xs text-muted-foreground tracking-wide">Ideate · Innovate · Impact</div>
              </div>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed mb-5">
              India's most ambitious student hackathon — 24 hours of relentless building, ideating, and disrupting at SRM University, Ramapuram.
            </p>
            <div className="flex gap-2">
              {socials.map(({ Icon, label, href, hoverBg }) => (
                <a key={label} href={href} target={href.startsWith("http") ? "_blank" : undefined} rel="noreferrer" aria-label={label}
                  className="group grid h-9 w-9 place-items-center rounded-full transition-all duration-200"
                  style={{ background:"rgba(255,255,255,0.05)", border:"1px solid rgba(255,255,255,0.08)" }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor=`${hoverBg}55`; e.currentTarget.style.background=`${hoverBg}18`; }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor="rgba(255,255,255,0.08)"; e.currentTarget.style.background="rgba(255,255,255,0.05)"; }}>
                  <Icon className="h-4 w-4 text-muted-foreground group-hover:text-white transition-colors" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick links */}
          <div>
            <div className="text-[10px] uppercase tracking-widest text-muted-foreground mb-4 font-medium">Navigate</div>
            <ul className="space-y-2.5 text-sm">
              {[["About","#about"],["Tracks","#tracks"],["Prizes","#prizes"],["Timeline","#timeline"],["Team","#team"],["Sponsors","#sponsors"],["FAQ","#faq"]].map(([l,h]) => (
                <li key={l}>
                  <a href={h} className="text-muted-foreground hover:text-foreground transition flex items-center gap-1.5 group">
                    <span className="h-px w-2.5 bg-primary/40 group-hover:w-4 transition-all duration-200 rounded-full" />
                    {l}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Event info */}
          <div>
            <div className="text-[10px] uppercase tracking-widest text-muted-foreground mb-4 font-medium">Event Info</div>
            <ul className="space-y-3.5 text-sm">
              <li className="flex items-start gap-2.5">
                <Calendar className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                <div>
                  <div className="font-medium">October 9–10, 2026</div>
                  <div className="text-xs text-muted-foreground">24-hour hackathon</div>
                </div>
              </li>
              <li className="flex items-start gap-2.5">
                <Clock className="h-4 w-4 text-accent shrink-0 mt-0.5" />
                <div>
                  <div className="font-medium">Starts 9:00 AM IST</div>
                  <div className="text-xs text-muted-foreground">Check-in from 8:00 AM</div>
                </div>
              </li>
              <li className="flex items-start gap-2.5">
                <MapPin className="h-4 w-4 shrink-0 mt-0.5" style={{ color:"#38BDF8" }} />
                <div>
                  <div className="font-medium">SRM University</div>
                  <div className="text-xs text-muted-foreground">Ramapuram, Chennai</div>
                </div>
              </li>
              <li className="flex items-start gap-2.5">
                <Mail className="h-4 w-4 shrink-0 mt-0.5" style={{ color:"#a78bfa" }} />
                <div>
                  <div className="font-medium">innovatex@srm.edu.in</div>
                  <div className="text-xs text-muted-foreground">Queries &amp; sponsorships</div>
                </div>
              </li>
            </ul>
          </div>

          {/* Sponsor CTA */}
          <div>
            <div className="text-[10px] uppercase tracking-widest text-muted-foreground mb-4 font-medium">Partner With Us</div>
            <div className="rounded-2xl p-5" style={{ background:"rgba(43,126,245,0.06)", border:"1px solid rgba(43,126,245,0.15)" }}>
              <Briefcase className="h-7 w-7 text-primary mb-3" />
              <div className="text-sm font-semibold mb-1">Become a Sponsor</div>
              <div className="text-xs text-muted-foreground mb-4 leading-relaxed">Reach 350+ top engineering students. Limited sponsor slots available.</div>
              <a href="#contact" className="flex items-center justify-center gap-1.5 w-full rounded-full py-2 text-xs font-semibold text-white transition"
                style={{ background:"linear-gradient(135deg,rgba(43,126,245,0.6),rgba(167,139,250,0.5))", border:"1px solid rgba(43,126,245,0.3)" }}>
                Get Sponsorship Kit <ArrowRight className="h-3 w-3" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mx-auto max-w-screen-xl px-6 lg:px-12 mt-12 pt-5 flex flex-wrap items-center justify-between gap-3"
          style={{ borderTop:"1px solid rgba(255,255,255,0.05)" }}>
          <div className="text-xs text-muted-foreground">© 2026 SRM InoVateX. All rights reserved.</div>
          <div className="flex items-center gap-4 text-xs text-muted-foreground">
            <span>Crafted with ❤️ by the InoVateX team</span>
            <button onClick={scrollTop} aria-label="Back to top"
              className="grid h-8 w-8 place-items-center rounded-full transition-all"
              style={{ background:"rgba(43,126,245,0.12)", border:"1px solid rgba(43,126,245,0.2)" }}
              onMouseEnter={e => { e.currentTarget.style.background="rgba(43,126,245,0.25)"; }}
              onMouseLeave={e => { e.currentTarget.style.background="rgba(43,126,245,0.12)"; }}>
              <ArrowRight className="h-3.5 w-3.5 text-primary -rotate-90" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}

// ─── ROOT ────────────────────────────────────────────────────────────────────
function InoVateXLanding() {
  return (
    <div className="relative min-h-screen bg-background text-foreground" style={{ cursor:"none" }}>
      <DataRain />
      <CustomCursor />
      <style>{`
        @keyframes holoShimmer {
          0%   { background-position: 0% 0%; }
          50%  { background-position: 100% 100%; }
          100% { background-position: 0% 0%; }
        }
        @keyframes hackStepIn {
          from { opacity:0; transform: translateX(-16px); }
          to   { opacity:1; transform: translateX(0); }
        }
      `}</style>
      <Nav />
      <main style={{ position:"relative", zIndex:1 }}>
        <Hero />
        <About />
        <WhyParticipate />
        <Prizes />
        <Tracks />
        <InternshipOpportunities />
        <Timeline />
        <Venue />
        <FAQ />
        <Sponsors />
        <Team />
        <ContactCTA />
      </main>
      <Footer />
    </div>
  );
}
