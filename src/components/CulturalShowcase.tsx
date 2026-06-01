/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { HeritageArtifact } from "../types";
import { HERITAGE_ARTIFACTS, HISTORICAL_ANECDOTES } from "../data";
import { BookOpen, HelpCircle, ArrowRight, Award, Flame, Quote, Sparkles } from "lucide-react";

// Karakalpak traditional geometric SVG ornament pattern
export function KarakalpakOrnamentPattern({ color = "currentColor", height = 24 }: { color?: string; height?: number }) {
  return (
    <svg
      width="100%"
      height={height}
      viewBox="0 0 100 8"
      preserveAspectRatio="none"
      className="opacity-70 select-none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <pattern id="karakalpak-geometric" width="10" height="8" patternUnits="userSpaceOnUse">
          {/* S-curves and horns resembling traditional "Muxiz" or "Biyeshi" patterns */}
          <path
            d="M 0 4 L 2 2 L 4 4 L 2 6 Z M 5 1 L 7 3 L 9 1 L 7 -1 Z M 5 7 L 7 9 L 9 7 L 7 5 Z"
            fill="none"
            stroke={color}
            strokeWidth="0.5"
          />
          <path
            d="M 0 4 L 10 4 M 5 0 L 5 8"
            stroke={color}
            strokeWidth="0.4"
            strokeDasharray="1,1"
          />
          {/* Traditional hook ornament */}
          <path
            d="M 2 4 Q 5 1 5 4 T 8 4"
            fill="none"
            stroke={color}
            strokeWidth="0.6"
            strokeLinecap="round"
          />
        </pattern>
      </defs>
      <rect width="100" height="8" fill="url(#karakalpak-geometric)" />
    </svg>
  );
}

interface CulturalShowcaseProps {
  onRouteRecommend: (routeId: string) => void;
}

export default function CulturalShowcase({ onRouteRecommend }: CulturalShowcaseProps) {
  const [activeArtifact, setActiveArtifact] = useState<HeritageArtifact>(HERITAGE_ARTIFACTS[0]);
  const [selectedInterest, setSelectedInterest] = useState<string | null>(null);
  const [advisorRecommendation, setAdvisorRecommendation] = useState<{
    text: string;
    routeId: string;
    routeName: string;
  } | null>(null);

  // Simple interactive recommendation engine suited for a history professor
  const handleInterestSelect = (interest: string) => {
    setSelectedInterest(interest);
    if (interest === "ancient-history") {
      setAdvisorRecommendation({
        text: "«Как историк, рекомендую вам прикоснуться к корням зороастризма. Розовые стены Башни Молчания Чилпык и священные камни древней Миздахканы хранят ключи к духу Хорезмского царства.»",
        routeId: "holy-heritage",
        routeName: "Наследие Древних Цивилизаций",
      });
    } else if (interest === "adventure-camping") {
      setAdvisorRecommendation({
        text: "«Ваша душа жаждет кочевой свободы? Оборонительные бастионы Аяз-Кала и ночь в традиционной войлочной юрте под Млечным Путем разожгут в вас пламя странствий суровых кушанских воителей.»",
        routeId: "khorezm-fortresses",
        routeName: "Легендарные Оборонные Форты",
      });
    } else if (interest === "wild-nature") {
      setAdvisorRecommendation({
        text: "«Трагическое усыхание Арала — шрам на теле планеты. Отправьтесь в экспедицию на забытые берега таинственного озера Судочье, где гнездятся дикие розовые фламинго среди покинутых жилищ рыбаков Урги.»",
        routeId: "aral-catastrophe",
        routeName: "Эхо Усохшего Моря и Глубины Устюрта",
      });
    }
  };

  return (
    <div className="grid grid-cols-1 xl:grid-cols-3 gap-8 items-start my-12" id="cultural-heritage-section">
      
      {/* 1. Cultural Artifacts Showcase: Left Panel */}
      <div className="xl:col-span-2 bg-white border border-sand-border rounded-3xl p-6 shadow-md relative overflow-hidden flex flex-col justify-between min-h-[500px]">
        {/* Background Yurt pattern inside card */}
        <div className="absolute -bottom-24 -right-16 w-80 h-80 opacity-[0.03] select-none pointer-events-none">
          <svg viewBox="0 0 100 100" fill="currentColor" className="text-royal-red w-full h-full">
            <ellipse cx="50" cy="50" rx="40" ry="25" stroke="currentColor" strokeWidth="2" fill="none" />
            <path d="M 50 25 L 50 75 M 10 50 L 90 50" stroke="currentColor" strokeWidth="1.5" />
            <path d="M 22 35 L 78 65 M 22 65 L 78 35" stroke="currentColor" strokeWidth="1" />
          </svg>
        </div>

        <div>
          <div className="flex items-center gap-2 mb-4">
            <BookOpen className="h-5 w-5 text-royal-red" />
            <h3 className="font-sans font-bold text-royal-red text-lg uppercase tracking-wide">
              Энциклопедия Каракалпакского наследия
            </h3>
          </div>

          {/* Symmetrical ornament separator line */}
          <div className="mb-6">
            <KarakalpakOrnamentPattern color="#8E2424" height={16} />
          </div>

          <p className="text-natural-charcoal/90 font-sans text-sm leading-relaxed mb-6">
            Каракалпаки — древний полукочевой тюркский этнос Нижней Амударьи. Само название переводится как «Черные клобуки» (кара - черный, калпак - шапка). Наша культура соткана из ветров Устюрта, суровости Кызылкума и живой лазури былого Арала. Изучите три важнейших символа нашей идентичности:
          </p>

          {/* Artifact selector Tabs */}
          <div className="grid grid-cols-3 gap-3 mb-6">
            {HERITAGE_ARTIFACTS.map((artifact) => {
              const isActive = activeArtifact.id === artifact.id;
              return (
                <button
                  key={artifact.id}
                  onClick={() => setActiveArtifact(artifact)}
                  className={`py-2.5 px-3 rounded-2xl font-sans font-medium text-xs md:text-sm border transition-all cursor-pointer text-center ${
                    isActive
                      ? "bg-royal-red text-white border-royal-red font-semibold shadow-sm"
                      : "bg-[#FAF7F2] text-natural-charcoal/70 border-sand-border hover:text-royal-red hover:bg-[#FDF9F3]"
                  }`}
                >
                  {artifact.name.split(" — ")[0]}
                </button>
              );
            })}
          </div>

          {/* Selected Artifact view */}
          <div className="bg-[#FAF7F2] p-5 rounded-2.5xl border border-sand-border">
            <div className="flex items-center justify-between mb-2">
              <h4 className="font-sans font-bold text-royal-red text-base md:text-lg">
                {activeArtifact.name}
              </h4>
              <span className="text-[10px] md:text-xs text-sand-gold font-mono tracking-wider uppercase bg-[#FDF9F3] border border-sand-border px-2 py-0.5 rounded">
                {activeArtifact.originEra}
              </span>
            </div>
            <p className="text-natural-charcoal/80 font-sans text-xs md:text-sm leading-relaxed">
              {activeArtifact.description}
            </p>
          </div>
        </div>

        {/* Dynamic Professor Quote at bottom */}
        <div className="mt-6 pt-4 border-t border-sand-border flex gap-3 items-start bg-[#FAF7F2] p-4 rounded-2xl border border-sand-border">
          <Quote className="h-5 w-5 text-royal-red shrink-0 mt-1" />
          <p className="text-[#2D2926] font-sans italic text-xs leading-normal">
            «Каракалпакское убранство — это зашифрованный язык. Каждая красная нить в настенном узоре оберегает уют, а каждая синяя олицетворяет благодать текущей чистой воды — матери-реки Аму.» <span className="font-semibold block mt-1 not-italic font-mono text-[10px] text-sand-gold">— Доктор исторических наук, проф. Салихов</span>
          </p>
        </div>
      </div>

      {/* 2. Interactive Historical Advisor Quiz: Right Panel */}
      <div className="bg-white border border-sand-border rounded-3xl p-6 shadow-md relative overflow-hidden flex flex-col justify-between min-h-[500px]">
        
        <div>
          <div className="flex items-center gap-2 mb-4">
            <HelpCircle className="h-5 w-5 text-royal-red" />
            <h3 className="font-sans font-bold text-royal-red text-lg uppercase tracking-wide">
              Советник Профессора
            </h3>
          </div>

          {/* Symmetrical ornament separator line */}
          <div className="mb-6">
            <KarakalpakOrnamentPattern color="#8E2424" height={16} />
          </div>

          <p className="text-natural-charcoal/90 font-sans text-xs md:text-sm leading-relaxed mb-6">
            Как исследователь каракалпакской земли с сорокалетним стажем, я помогу вам составить идеальную экспедицию. Ответьте — <strong>что влечет вас больше всего в бескрайней степи?</strong>
          </p>

          {/* Interactive options */}
          <div className="flex flex-col gap-3">
            <button
              onClick={() => handleInterestSelect("ancient-history")}
              className={`w-full text-left p-3.5 rounded-2xl font-sans text-xs md:text-sm border transition-all cursor-pointer flex items-center justify-between ${
                selectedInterest === "ancient-history"
                  ? "bg-royal-red/10 text-royal-red border-royal-red/40 shadow-sm font-semibold"
                  : "bg-[#FAF7F2] text-natural-charcoal/80 border-sand-border hover:bg-white"
              }`}
            >
              <div className="flex items-center gap-2.5">
                <Flame className="h-4 w-4 text-royal-red shrink-0" />
                <div>
                  <div className="font-semibold">Святыни и осколки империй</div>
                  <div className="text-[10px] text-[#2D2926]/60">Зороастр, храмы, тайны тысячелетий</div>
                </div>
              </div>
              <ArrowRight className="h-3.5 w-3.5" />
            </button>

            <button
              onClick={() => handleInterestSelect("adventure-camping")}
              className={`w-full text-left p-3.5 rounded-2xl font-sans text-xs md:text-sm border transition-all cursor-pointer flex items-center justify-between ${
                selectedInterest === "adventure-camping"
                  ? "bg-sand-gold/10 text-sand-gold border-sand-gold/40 shadow-sm font-semibold"
                  : "bg-[#FAF7F2] text-natural-charcoal/80 border-sand-border hover:bg-white"
              }`}
            >
              <div className="flex items-center gap-2.5">
                <Award className="h-4 w-4 text-sand-gold shrink-0" />
                <div>
                  <div className="font-semibold">Дух кочевья и экстрим</div>
                  <div className="text-[10px] text-[#2D2926]/60">Ночлег в юрте, пустыня, поход на крепости</div>
                </div>
              </div>
              <ArrowRight className="h-3.5 w-3.5" />
            </button>

            <button
              onClick={() => handleInterestSelect("wild-nature")}
              className={`w-full text-left p-3.5 rounded-2xl font-sans text-xs md:text-sm border transition-all cursor-pointer flex items-center justify-between ${
                selectedInterest === "wild-nature"
                  ? "bg-emerald-600/10 text-emerald-800 border-emerald-600/40 shadow-sm font-semibold"
                  : "bg-[#FAF7F2] text-natural-charcoal/80 border-sand-border hover:bg-white"
              }`}
            >
              <div className="flex items-center gap-2.5">
                <Sparkles className="h-4 w-4 text-emerald-600 shrink-0" />
                <div>
                  <div className="font-semibold">Безмолвие дикой природы</div>
                  <div className="text-[10px] text-[#2D2926]/60">Исчезнувшее море, розовые фламинго, уединение</div>
                </div>
              </div>
              <ArrowRight className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>

        {/* Dynamic Advisor output section */}
        {advisorRecommendation ? (
          <div className="mt-6 bg-[#FAF7F2] p-4 rounded-2.5xl border border-sand-border flex flex-col justify-between min-h-[180px]">
            <div>
              <div className="text-[10px] text-sand-gold font-mono tracking-wider uppercase mb-1">
                Голос исследователя:
              </div>
              <p className="text-[#2D2926] leading-relaxed font-sans text-xs italic line-clamp-4">
                {advisorRecommendation.text}
              </p>
            </div>
            
            <button
              onClick={() => {
                onRouteRecommend(advisorRecommendation.routeId);
                const mapSec = document.getElementById("interactive-map-section");
                if (mapSec) {
                  mapSec.scrollIntoView({ behavior: "smooth" });
                }
              }}
              className="w-full py-2 bg-royal-red text-white font-sans font-bold text-xs rounded-xl hover:bg-royal-red-dark transition-all flex items-center justify-center gap-1 cursor-pointer mt-2 shadow-sm"
            >
              <span>Построить путь: {advisorRecommendation.routeName.split(" ")[0]}...</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </button>
          </div>
        ) : (
          <div className="mt-6 bg-[#FAF7F2]/40 border border-dashed border-sand-border rounded-2.5xl p-4 flex items-center justify-center text-center min-h-[180px]">
            <p className="text-natural-charcoal/60 font-sans text-xs max-w-[180px]">
              Выберите тип приключения выше, чтобы получить научную рекомендацию профессора.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
