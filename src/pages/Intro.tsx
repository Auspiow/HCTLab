import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import Matter from "matter-js";

export default function Intro({ onFinish }: { onFinish: () => void }) {
  const fullText = "Human-Computer Interaction    Color";
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
    const revealSpeed = 50;

    // 背景柔和灰白渐变流动
    gsap.to(bgRef.current, {
      backgroundPosition: "100% 0%",
      duration: 10,
      ease: "power2.inOut",
      repeat: -1,
      yoyo: true,
    });

    setDisplayText(Array.from({ length: total }, () => ""));

    // 打字机 + 随机扰动
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
                  { scale: 1.08 },
                  { scale: 1, duration: 0.25, ease: "power2.out" }
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

      iteration += 0.4;
      if (iteration > total + 1) {
        clearInterval(interval);
        showHCIC();
      }
    }, revealSpeed);

    // HCIC 聚合动画
    const showHCIC = () => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
      const hcicIndices: number[] = [];

      for (let i = 0; i < fullText.length; i++) {
        if (["H", "C", "I"].includes(fullText[i])) hcicIndices.push(i);
      }
      const secondC = fullText.indexOf("C", fullText.indexOf("C") + 1);
      if (secondC !== -1) hcicIndices.push(secondC);

      const hcicEls = hcicIndices.map((i) => charRefs.current[i]).filter(Boolean);
      const others = charRefs.current.filter(
        (el, i) => el && !hcicIndices.includes(i)
      );

      // 1. 其他字母淡出
      tl.to(others, { opacity: 0, duration: 1.2, stagger: 0.02 });

      // 2. HCIC 居中排列
      const centerX = window.innerWidth / 2;
      const centerY = window.innerHeight / 2;
      const rects = hcicEls.map((el) => el!.getBoundingClientRect());
      const spacing = 60;
      const totalWidth =
        rects.reduce((sum, r) => sum + r.width, 0) + spacing * (hcicEls.length - 1);
      let startX = centerX - totalWidth / 2;

      hcicEls.forEach((el, i) => {
        const rect = rects[i];
        const targetX = startX + rect.width / 2;
        const dx = targetX - (rect.x + rect.width / 2);
        const dy = centerY - (rect.y + rect.height / 2);
        startX += rect.width + spacing;

        tl.to(
          el,
          {
            x: dx,
            y: dy,
            scale: 1.5,
            duration: 1,
          },
          "<"
        );
      });

      // 3. 全部设为黑色
      tl.call(() => {
        hcicEls.forEach((el) => {
          (el as HTMLElement).style.color = "#111";
        });
      });

      // 4. 呼吸感
      tl.call(() => {
        gsap.to(hcicEls, {
          y: "+=10",
          duration: 1,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
        });
      });

      // 5. 延迟并开始掉球填充，传入 hcicEls（用于生成字母“下边界”）
      tl.to({}, { duration: 2.5 }).call(() => dropBalls(hcicEls as HTMLElement[]));
    };

    // ===== dropBalls：改进版 =====
    // - 为每个字母在其下半部分创建多个小的静态矩形段（近似字母下边界/底座）
    // - 生成小球时 60% 概率在 HCIC 中心区域内产生（使中心堆积更多）
    // - 小球颜色固定（不变色）
    const dropBalls = (hcicEls: HTMLElement[]) => {
      const canvas = canvasRef.current!;
      const ctx = canvas.getContext("2d")!;
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;

      const { Engine, World, Bodies, Runner, Composite } = Matter;
      const engine = Engine.create();
      const world = engine.world;
      engine.gravity.y = 1.2;

      // 固定颜色组（纯色）
      const colors = ["#ff0000", "#ffd600", "#00aaff", "#22c55e","#FF8000"," #800080"]; // 红橙黄绿蓝紫

      // 计算 HCIC 整体中心区域（用于加权生成）
      const hcicRects = hcicEls.map((el) => el.getBoundingClientRect());
      const hcicLeft = Math.min(...hcicRects.map((r) => r.left));
      const hcicRight = Math.max(...hcicRects.map((r) => r.right));
      const centerRegion = { left: hcicLeft, right: hcicRight };

      // 为每个字母创建若干静态短矩形段，放在字母下半区域（模拟字母“接住球”的下边界）
      // 这样球会在字母内部堆叠而不是落到底部。
      hcicEls.forEach((el) => {
        const rect = el.getBoundingClientRect();

        // 我们在字母高度的下半部分生成一排小段（segment）
        const segments = Math.max(3, Math.floor(rect.width / 10)); // 分段数量
        const segWidth = rect.width / segments;
        // yPos 选择在字母下半位置，稍微向上抬一点，让球进入字母内部
        const yPos = rect.y + rect.height * 0.6;

        for (let s = 0; s < segments; s++) {
          const segX = rect.x + segWidth * s + segWidth / 2;
          const body = Bodies.rectangle(
            segX,
            yPos,
            segWidth * 0.9, // 矩形宽度稍小以留点缝隙
            6, // 矩形高度薄（作为支撑）
            { isStatic: true, friction: 0.6 }
          );
          World.add(world, body);
        }

        // 另外在字母内再放一两个稍高的短段，模拟字母里凹凸接触面（更真实堆积）
        const extraY = rect.y + rect.height * 0.4;
        const extraCount = Math.max(0, Math.floor(rect.width / 40));
        for (let e = 0; e < extraCount; e++) {
          const exX = rect.x + (rect.width / (extraCount + 1)) * (e + 1);
          const extra = Bodies.rectangle(exX, extraY, Math.min(30, rect.width * 0.2), 6, {
            isStatic: true,
            friction: 0.6,
          });
          World.add(world, extra);
        }
      });

      // 运行引擎
      const runner = Runner.create();
      Runner.run(runner, engine);

      // 更倾向在中心区域生成球（60% 概率）
      const spawnX = () => {
        if (Math.random() < 0.6) {
          // 在 HCIC 中心区域范围内
          const min = Math.max(0, centerRegion.left);
          const max = Math.min(window.innerWidth, centerRegion.right);
          return min + Math.random() * (max - min);
        } else {
          return Math.random() * window.innerWidth;
        }
      };

      // 生成小球，同时保存颜色在 body 上
      const spawnInterval = setInterval(() => {
        const radius = 5 + Math.random() * 6;
        const x = spawnX();
        const ball = Bodies.circle(x, -20, radius, {
          restitution: 0.2,
          friction: 0.4,
        });
        (ball as any).color = colors[Math.floor(Math.random() * colors.length)];
        World.add(world, ball);
      }, 40); // 频率更高，中心堆积更快

      // 手动绘制全部圆形物体
            type RenderBody = Matter.Body & { color?: string };
      
            const renderLoop = () => {
              ctx.clearRect(0, 0, canvas.width, canvas.height);
              const bodies = Composite.allBodies(world);
              for (const body of bodies) {
                const b = body as unknown as RenderBody;
                const { position, circleRadius } = b;
                if (circleRadius) {
                  ctx.fillStyle = b.color || "#000";
                  ctx.beginPath();
                  ctx.arc(position.x, position.y, circleRadius, 0, Math.PI * 2);
                  ctx.fill();
                } else {
                  // non-circular bodies ignored for canvas rendering
                }
              }
              requestAnimationFrame(renderLoop);
            };
            renderLoop();

      // 停止生成并淡出
      setTimeout(() => {
        clearInterval(spawnInterval);
        // 给一段时间让球稳定堆积
        setTimeout(() => {
          gsap.to(canvas, { opacity: 0, duration: 1.2, onComplete: Finish });
        }, 2000);
      }, 6000); // 6 秒生成期
    };

    return () => clearInterval(interval);
  }, [onFinish]);

  // 渲染
  return (
    <div
      ref={bgRef}
      className="fixed inset-0 flex flex-col items-center justify-center text-center font-bold overflow-hidden"
      style={{
        padding: "0 7vw",
        background: `
          linear-gradient(
            to top right,
            #f9fafb 0%,
            #e5e7eb 40%,
            #d1d5db 100%
          )`,
        backgroundSize: "200% 200%",
        backgroundPosition: "0% 0%",
      }}
    >
      <h1
        ref={textRef}
        className="font-extrabold select-none text-gray-900"
        style={{
          fontFamily: "'Fira Code', 'JetBrains Mono', 'Courier New', monospace",
          fontSize: "clamp(40px, 10vw, 120px)",
          letterSpacing: "0.04em",
          whiteSpace: "pre-wrap",
          position: "relative",
        }}
      >
        {displayText.map((ch, i) => (
          <span
            key={i}
            ref={(el) => (charRefs.current[i] = el)}
            style={{
              display: "inline-block",
              width: "1ch",
              textAlign: "center",
              transformOrigin: "center",
              position: "relative",
              willChange: "transform",
              backfaceVisibility: "hidden",
            }}
          >
            {ch}
          </span>
        ))}
      </h1>

      {/* 小球填充 Canvas（覆盖在文字上方） */}
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
