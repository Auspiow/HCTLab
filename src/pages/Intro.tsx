import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import Matter from "matter-js";

export default function Intro({ Finish }: { Finish: () => void }) {
  const fullText = "Human-Computer Interaction Color";
  const textRef = useRef<HTMLHeadingElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const [displayText, setDisplayText] = useState<string[]>([]);
  const charRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const chars =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+-=[]{}<>?";
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    let iteration = 0;
    const total = fullText.length;
    const revealSpeed = 25;

    // 柔和渐变背景
    gsap.to(bgRef.current, {
      backgroundPosition: "100% 0%",
      duration: 8, // 稍微加快
      ease: "power2.inOut",
      repeat: -1,
      yoyo: true,
    });

    setDisplayText(Array.from({ length: total }, () => ""));

    // 打字 + 随机扰动
    const interval = window.setInterval(() => {
      setDisplayText((prev) => {
        const output = [...prev];
        for (let i = 0; i < total; i++) {
          if (i < Math.floor(iteration)) {
            if (output[i] !== fullText[i]) {
              output[i] = fullText[i];
              const el = charRefs.current[i];
              if (el) {
                gsap.fromTo(
                  el,
                  { scale: 1.1 },
                  { scale: 1, duration: 0.2, ease: "power2.out" }
                );
              }
            }
          } else if (fullText[i] === " ") {
            output[i] = " ";
          } else {
            output[i] = chars[Math.floor(Math.random() * chars.length)];
          }
        }
        return output;
      });

      iteration += 0.8; // ⏩ 每次迭代更多
      if (iteration > total + 1) {
        clearInterval(interval);
        setTimeout(showHCIC, 200); // 🕒 几乎无等待
      }
    }, revealSpeed);

    // HCIC 聚合动画
    const showHCIC = () => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      // 🎯 精确提取四个字母 H、C、I、C（第一个H、第一个C、第一个I、第二个C）
      const hcicIndices: number[] = [];
      for (let i = 0; i < fullText.length; i++) {
        const ch = fullText[i];
        if (ch === "H" || ch === "I") hcicIndices.push(i);
      }

      // 找到两个 C
      const cIndices = [...fullText]
        .map((ch, i) => (ch === "C" ? i : -1))
        .filter((i) => i !== -1);
      hcicIndices.splice(1, 0, cIndices[0]); // 在 H 后插第一个 C
      hcicIndices.push(cIndices[1]); // 最后一个 C

      // 提取元素
      const hcicEls = hcicIndices.map((i) => charRefs.current[i]).filter(Boolean);
      const others = charRefs.current.filter(
        (el, i) => el && !hcicIndices.includes(i)
      );

      // 🕳️ 淡出其他字母
      tl.to(others, { opacity: 0, duration: 0.6, stagger: 0.01 });

      // 移除之前 transform 影响，避免测量偏移
      hcicEls.forEach((el) => {
        el!.style.transform = "none";
      });

      // 📏 居中计算
      const centerX = window.innerWidth / 2;
      const centerY = window.innerHeight / 2;

      const rects = hcicEls.map((el) => el!.getBoundingClientRect());
      const spacing = 80; // 字母间距
      const totalWidth =
        rects.reduce((sum, r) => sum + r.width, 0) + spacing * (hcicEls.length - 1);
      let startX = centerX - totalWidth / 2;

      // 🎬 移动四个字母到屏幕中央
      hcicEls.forEach((el, i) => {
        const rect = rects[i];
        const targetX = startX + rect.width / 2;
        const dx = targetX - (rect.left + rect.width / 2);
        const dy = centerY - (rect.top + rect.height / 2);
        startX += rect.width + spacing;

        tl.to(
          el,
          {
            x: dx,
            y: dy,
            scale: 1.5,
            duration: 0.8,
          },
          "<"
        );
      });

      // 🎨 调整字体颜色 & 呼吸动画
      tl.call(() => {
        hcicEls.forEach((el) => ((el as HTMLElement).style.color = "#111"));
        gsap.to(hcicEls, {
          y: "+=10",
          duration: 0.8,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
        });
      });

      // 🎇 掉球效果
      tl.to({}, { duration: 0.5 }).call(() => dropBalls(hcicEls as HTMLElement[]));
    };


    // 掉球逻辑（快节奏）
    const dropBalls = (hcicEls: HTMLElement[]) => {
      const canvas = canvasRef.current!;
      const ctx = canvas.getContext("2d")!;
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;

      const { Engine, World, Bodies, Runner, Composite } = Matter;
      const engine = Engine.create();
      const world = engine.world;
      engine.gravity.y = 2.0; // ⚡ 增大重力加速度

      const colors = ["#ff0000", "#ffd600", "#00aaff", "#22c55e", "#FF8000", "#800080"];

      // HCIC 下方区域计算
      const hcicRects = hcicEls.map((el) => el.getBoundingClientRect());
      const hcicLeft = Math.min(...hcicRects.map((r) => r.left));
      const hcicRight = Math.max(...hcicRects.map((r) => r.right));

      hcicEls.forEach((el) => {
        const rect = el.getBoundingClientRect();
        const segments = Math.max(3, Math.floor(rect.width / 10));
        const segWidth = rect.width / segments;
        const yPos = rect.y + rect.height * 0.6;
        for (let s = 0; s < segments; s++) {
          const segX = rect.x + segWidth * s + segWidth / 2;
          const body = Bodies.rectangle(segX, yPos, segWidth * 0.9, 6, {
            isStatic: true,
            friction: 0.6,
          });
          World.add(world, body);
        }
      });

      const runner = Runner.create();
      Runner.run(runner, engine);

      const spawnX = () => hcicLeft + Math.random() * (hcicRight - hcicLeft);

      const spawnInterval = setInterval(() => {
        const radius = 5 + Math.random() * 5;
        const ball = Bodies.circle(spawnX(), -30, radius, {
          restitution: 0.3,
          friction: 0.4,
        });
        (ball as any).color = colors[Math.floor(Math.random() * colors.length)];
        World.add(world, ball);
      }, 20);

      type RenderBody = Matter.Body & { color?: string };

      const renderLoop = () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        const bodies = Composite.allBodies(world);
        for (const body of bodies) {
          const b = body as RenderBody;
          if (b.circleRadius) {
            ctx.fillStyle = b.color || "#000";
            ctx.beginPath();
            ctx.arc(b.position.x, b.position.y, b.circleRadius, 0, Math.PI * 2);
            ctx.fill();
          }
        }
        requestAnimationFrame(renderLoop);
      };
      renderLoop();

      setTimeout(() => {
        clearInterval(spawnInterval);
        setTimeout(() => {
          gsap.to(canvas, { opacity: 0, duration: 1, onComplete: Finish });
        }, 1000);
      }, 3000);
    };

    return () => clearInterval(interval);
  }, [Finish]);

  return (
    <div
      ref={bgRef}
      className="fixed inset-0 flex flex-col items-center justify-center text-center font-bold overflow-hidden"
      style={{
        padding: "0 7vw",
        background: `linear-gradient(to top right,#f9fafb 0%,#e5e7eb 40%,#d1d5db 100%)`,
        backgroundSize: "200% 200%",
      }}
    >
      <h1
        ref={textRef}
        className="font-extrabold select-none text-gray-900"
        style={{
          fontFamily: "'Poppins', 'Fira Code', monospace",
          fontSize: "clamp(40px, 10vw, 120px)",
          letterSpacing: "0.04em",
        }}
      >
        {displayText.map((ch, i) => (
          <span
            key={i}
            ref={(el) => void (charRefs.current[i] = el)}
            style={{
              display: "inline-block",
              width: "1ch",
              textAlign: "center",
              transformOrigin: "center",
              willChange: "transform",
            }}
          >
            {ch}
          </span>
        ))}
      </h1>

      <canvas
        ref={canvasRef}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          pointerEvents: "none",
          zIndex: 10,
        }}
      />
    </div>
  );
}
