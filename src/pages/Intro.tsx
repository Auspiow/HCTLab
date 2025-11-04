// src/pages/Intro.tsx
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

export default function Intro({ onFinish }: { onFinish: () => void }) {
  const fullText = "Human-Computer Interaction Color";
  const [displayText, setDisplayText] = useState("");
  const hcicRef = useRef<HTMLHeadingElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // 阶段 1：打字动画
    let index = 0;
    const typing = setInterval(() => {
      setDisplayText(fullText.slice(0, index + 1));
      index++;
      if (index === fullText.length) {
        clearInterval(typing);
        // 阶段 2：显示 HCIC
        setTimeout(() => showHCIC(), 800);
      }
    }, 80); // 打字速度

    const showHCIC = () => {
      const tl = gsap.timeline({ defaults: { ease: "power2.out" } });
      tl.to(containerRef.current, { opacity: 0.3, duration: 0.8 })
        .to(containerRef.current, { opacity: 0, duration: 0.8 })
        .set(hcicRef.current, { display: "block", scale: 0.8, opacity: 0 })
        .to(hcicRef.current, { scale: 1, opacity: 1, duration: 1 })
        .to({}, { duration: 1.5 }) // 停留 1.5 秒
        .to(hcicRef.current, { opacity: 0, duration: 1 })
        .call(onFinish);
    };
  }, [onFinish]);

  return (
    <div className="fixed inset-0 flex flex-col items-center justify-center bg-gradient-to-tr from-blue-500 via-purple-500 to-pink-400 text-white font-bold text-center">
      {/* 打字机阶段 */}
      <h1
        ref={containerRef}
        className="text-3xl sm:text-4xl md:text-5xl tracking-wide"
        style={{ fontFamily: "monospace", whiteSpace: "pre" }}
      >
        {displayText}
      </h1>

      {/* HCIC 渐变文字 */}
      <h1
        ref={hcicRef}
        className="hidden text-7xl sm:text-8xl font-extrabold bg-gradient-to-r from-pink-400 via-yellow-400 to-blue-400 bg-clip-text text-transparent animate-gradientFlow"
        style={{
          backgroundSize: "300% 300%",
        }}
      >
        HCIC
      </h1>
    </div>
  );
}
