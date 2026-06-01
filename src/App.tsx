/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { TOURIST_ZONES, JOURNEY_ROUTES, HISTORICAL_ANECDOTES } from "./data";
import { TouristZone, JourneyRoute } from "./types";
import MapComponent from "./components/MapComponent";
import CulturalShowcase, { KarakalpakOrnamentPattern } from "./components/CulturalShowcase";
import TouristZoneCards from "./components/TouristZoneCards";
import {
  Compass,
  Map,
  BookOpen,
  Calendar,
  Sparkles,
  Award,
  Flame,
  Globe,
  Route,
  User,
  Heart,
  Mail,
  Send,
  Lock,
  ArrowUpRight,
  Anchor,
  HelpCircle,
  Phone
} from "lucide-react";

// Use direct runtime asset path to avoid static TypeScript compile module resolution issues
const yurtBg = "/src/assets/images/karakalpak_yurt_desert_1780342015803.png";

export default function App() {
  const [selectedZone, setSelectedZone] = useState<TouristZone | null>(TOURIST_ZONES[0]);
  const [selectedRoute, setSelectedRoute] = useState<JourneyRoute | null>(null);

  // Form states for expedition booking simulation
  const [bookingName, setBookingName] = useState("");
  const [bookingEmail, setBookingEmail] = useState("");
  const [bookingRouteId, setBookingRouteId] = useState(JOURNEY_ROUTES[0].id);
  const [bookingDate, setBookingDate] = useState("");
  const [showBookingResult, setShowBookingResult] = useState(false);

  // Handle route selection from advisor or list
  const handleSelectRoute = (route: JourneyRoute | null) => {
    setSelectedRoute(route);
    if (route) {
      // Set the active zone to the first point of the route
      const firstZone = TOURIST_ZONES.find((z) => z.id === route.routePoints[0]);
      if (firstZone) {
        setSelectedZone(firstZone);
      }
    }
  };

  const handleRouteRecommend = (routeId: string) => {
    const route = JOURNEY_ROUTES.find((r) => r.id === routeId) || null;
    handleSelectRoute(route);
  };

  const handleSubmitBooking = (e: React.FormEvent) => {
    e.preventDefault();
    if (!bookingName || !bookingEmail || !bookingDate) return;
    setShowBookingResult(true);
  };

  return (
    <div className="min-h-screen bg-[#FAF7F2] text-[#2D2926] flex flex-col font-sans select-none relative selection:bg-royal-red selection:text-white">
      
      {/* 1. HERO BANNER AREA WITH BG IMAGE & TEXT OVERLAY */}
      <header className="relative min-h-[92vh] flex flex-col justify-between overflow-hidden border-b border-sand-border">
        
        {/* Absolute Background image of Karakalpak Yurt with modern overlay gradient */}
        <div className="absolute inset-0 z-0">
          <img
            src={yurtBg}
            alt="Каракалпакские юрты под звездным небом Кызылкума"
            className="w-full h-full object-cover opacity-75 scale-100 transition-all duration-[10s] hover:scale-105"
            referrerPolicy="no-referrer"
          />
          {/* Symmetrical vignettes and sand-gold bottom gradients to seamless merge */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_30%,#FAF7F2_90%)]"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-[#FAF7F2] via-[#FAF7F2]/60 to-[#FAF7F2]/30"></div>
          <div className="absolute inset-0 bg-gradient-to-b from-white/30 via-transparent to-transparent"></div>
        </div>

        {/* Global Navigation Bar under canvas */}
        <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 flex items-center justify-between">
          
          {/* Logo element with National seal look */}
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 md:h-11 md:w-11 rounded-full border border-royal-red/30 bg-white/90 flex items-center justify-center text-royal-red shadow-sm select-none shrink-0">
              {/* Core yurt/felt geometric shape */}
              <svg viewBox="0 0 24 24" className="h-5 w-5 fill-none stroke-current" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="m12 3-10 9h3v8a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-8h3L12 3z" />
                <path d="M12 21V12" />
                <path d="M9 12h6" />
              </svg>
            </div>
            <div>
              <div className="font-serif font-bold text-royal-red tracking-wider text-xs md:text-sm uppercase">Қарақалпақстан</div>
              <div className="font-mono text-[9px] md:text-[10px] text-sand-gold font-bold tracking-widest uppercase">TOURISM ARCHIVE</div>
            </div>
          </div>

          {/* Nav links */}
          <nav className="hidden md:flex items-center gap-6 text-xs font-mono font-bold tracking-wide text-natural-charcoal/90">
            <a href="#interactive-map-section" className="hover:text-royal-red transition-colors">Интерактивная карта</a>
            <a href="#cultural-heritage-section" className="hover:text-royal-red transition-colors">Энциклопедия</a>
            <a href="#tourist-destinations-section" className="hover:text-royal-red transition-colors">Достопримечательности</a>
            <a href="#historical-cabinet" className="hover:text-royal-red transition-colors">Кабинет историка</a>
            <a href="#expedition-booking" className="hover:text-royal-red transition-colors">Запись в поход</a>
          </nav>

          {/* Language indicator */}
          <div className="flex items-center gap-1.5 px-3 py-1.5 bg-white border border-sand-border rounded-full text-[10px] font-mono tracking-wider text-natural-charcoal">
            <Globe className="h-3 w-3 text-royal-red" />
            <span className="font-bold text-royal-red">RU</span>
            <span className="text-sand-border">|</span>
            <span className="opacity-40">UZB</span>
          </div>
        </div>

        {/* Hero Central message */}
        <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 flex flex-col justify-center items-start text-left flex-grow">
          
          {/* Academic callout badge */}
          <div className="flex items-center gap-2 px-3 py-1 bg-royal-red/10 border border-royal-red/20 text-royal-red rounded-full font-mono text-[10px] uppercase font-bold tracking-widest mb-6 shadow-sm">
            <Sparkles className="h-3 w-3 text-royal-red animate-pulse" />
            <span>Кафедра археологии и этнографии КГУ</span>
          </div>

          <h1 className="font-serif font-bold text-4xl sm:text-5xl lg:text-7xl text-[#2D2926] tracking-tight leading-none max-w-4xl mb-6">
            ТУРИСТИЧЕСКИЕ <br/>
            <span className="text-royal-red italic font-normal">ЗОНЫ</span> КАРАКАЛПАКСТАНА
          </h1>

          <p className="font-sans text-[#2D2926]/90 text-sm sm:text-base md:text-lg leading-relaxed max-w-2xl mb-8">
            Откройте таинственные «глиняные замки» Кушанской империи в пустыне Кызылкум, священные башни молчания на берегах седой Амударьи и молчаливые скелеты советских кораблей на дне исчезнувшего Аральского моря под руководством профессора истории Каракалпакского университета.
          </p>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 w-full sm:w-auto">
            <a
              href="#interactive-map-section"
              className="px-6 py-3 bg-royal-red text-white font-sans font-bold text-sm rounded-2xl shadow-md text-center hover:bg-royal-red-dark hover:scale-[1.01] transition-all cursor-pointer flex items-center justify-center gap-2"
            >
              <Map className="h-4 w-4" />
              <span>Открыть интерактивную карту</span>
            </a>
            <a
              href="#cultural-heritage-section"
              className="px-6 py-3 bg-white border border-sand-border text-royal-red font-sans font-bold text-sm rounded-2xl text-center hover:bg-neutral-50 transition-all cursor-pointer flex items-center justify-center gap-2 shadow-sm"
            >
              <BookOpen className="h-4 w-4 text-royal-red" />
              <span>Изучить традиции</span>
            </a>
          </div>
        </div>

        {/* Hero Academic metrics bar */}
        <div className="relative z-10 w-full bg-white border-t border-sand-border py-4">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-3 gap-6 text-center md:text-left">
              <div className="border-r border-sand-border last:border-0 pr-2">
                <div className="font-mono text-xl sm:text-2xl font-bold text-royal-red">7</div>
                <div className="text-[10px] md:text-xs text-natural-charcoal/80 font-sans leading-tight">Верифицированных научных локаций</div>
              </div>
              <div className="border-r border-sand-border last:border-0 pr-2">
                <div className="font-mono text-xl sm:text-2xl font-bold text-royal-red">3</div>
                <div className="text-[10px] md:text-xs text-natural-charcoal/80 font-sans leading-tight">Экспедиционных этно-маршрута</div>
              </div>
              <div>
                <div className="font-mono text-xl sm:text-2xl font-bold text-royal-red">2400+</div>
                <div className="text-[10px] md:text-xs text-natural-charcoal/80 font-sans leading-tight">Лет непрерывной живой истории</div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Ornament separator */}
      <div className="bg-[#FAF7F2] py-3 relative overflow-hidden">
        <KarakalpakOrnamentPattern color="#8E2424" height={20} />
      </div>

      {/* MAIN CONTAINER */}
      <main className="flex-grow w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        
        {/* CARAVAN THEME ROUTE SELECTOR PANEL */}
        <section className="my-8">
          <div className="flex items-center gap-2.5 mb-2">
            <Route className="h-5 w-5 text-royal-red" />
            <h2 className="font-serif font-bold text-[#2D2926] text-lg sm:text-xl uppercase tracking-wider">Экспедиции Караванов пустыни</h2>
          </div>
          <p className="text-natural-charcoal/80 font-sans text-xs sm:text-sm leading-relaxed max-w-3xl mb-6">
            Посовещавшись на кафедре, мы подготовили три уникальные экспедиции по каракалпакской степной земле. Нажмите на любой маршрут ниже, чтобы активировать его на спутниковой интерактивной навигации и увидеть путеводитель под ним:
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {JOURNEY_ROUTES.map((route) => {
              const isSelected = selectedRoute?.id === route.id;
              return (
                <button
                  key={route.id}
                  onClick={() => handleSelectRoute(isSelected ? null : route)}
                  className={`relative p-5 rounded-3xl border text-left cursor-pointer transition-all duration-300 flex flex-col justify-between min-h-[200px] group ${
                    isSelected
                      ? "bg-[#FDF9F3] border-royal-red shadow-sm ring-1 ring-royal-red/20"
                      : "bg-white border-sand-border hover:bg-[#FAF7F2] hover:border-sand-light"
                  }`}
                >
                  <div>
                    {/* Top flag indicating difficulty */}
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-[9px] font-mono uppercase bg-white px-2 py-0.5 rounded border border-sand-border text-natural-charcoal/80">
                        ⏳ {route.duration.split(" ")[0]} {route.duration.split(" ")[1]}
                      </span>
                      <span
                        className="text-[9px] font-mono uppercase px-2 py-0.5 rounded font-bold"
                        style={{
                          backgroundColor: `${route.color}15`,
                          color: route.id === "aral-shipwreck" ? "#8E2424" : route.color,
                        }}
                      >
                        {route.difficulty}
                      </span>
                    </div>

                    <h3 className="font-sans font-bold text-sm sm:text-base text-royal-red leading-tight mb-2 group-hover:text-royal-red-dark transition-colors">
                      {route.title}
                    </h3>

                    <p className="text-natural-charcoal/80 font-sans text-xs leading-normal line-clamp-3">
                      {route.description}
                    </p>
                  </div>

                  <div className="flex items-center gap-1.5 text-[10px] sm:text-xs font-mono font-bold uppercase tracking-wider text-royal-red mt-2 select-none">
                    <span>{isSelected ? "Маршрут активен" : "Показать путь"}</span>
                    <ArrowUpRight className="h-3.5 w-3.5" />
                  </div>
                </button>
              );
            })}
          </div>
        </section>

        {/* 2. INTERACTIVE MAP SECTION WITH LIGHTWEIGHT LEAFLET API */}
        <section className="my-12">
          <div className="flex items-center justify-between gap-4 mb-4">
            <div>
              <span className="text-[10px] text-royal-red font-mono tracking-wider uppercase font-bold">Кабинет картографии</span>
              <h2 className="font-serif font-bold text-2xl sm:text-3xl text-[#2D2926] uppercase mt-0.5">Интерактивная карта путей</h2>
            </div>
            {selectedRoute && (
              <span className="px-3 py-1 bg-royal-red/10 text-royal-red border border-royal-red/20 text-xs font-mono rounded-full flex items-center gap-1.5 font-bold">
                <Compass className="h-3.5 w-3.5 animate-spin-slow text-royal-red" />
                <span>Отображается: {selectedRoute.title.split(" ")[0]}...</span>
              </span>
            )}
          </div>

          <MapComponent
            zones={TOURIST_ZONES}
            selectedZone={selectedZone}
            onSelectZone={setSelectedZone}
            selectedRoute={selectedRoute}
            onSelectRoute={handleSelectRoute}
          />
        </section>

        {/* Ornament divider */}
        <div className="my-8 relative overflow-hidden">
          <KarakalpakOrnamentPattern color="#8E2424" height={16} />
        </div>

        {/* 3. CULTURAL ENCYCLOPEDIA */}
        <section className="my-12">
          <div className="text-center max-w-xl mx-auto mb-6">
            <span className="text-[10px] text-royal-red font-mono uppercase tracking-widest font-bold">Наследие предков</span>
            <h2 className="font-serif font-bold text-2xl sm:text-3xl text-[#2D2926] uppercase mt-1">Культура и кочевой быт</h2>
          </div>
          <CulturalShowcase onRouteRecommend={handleRouteRecommend} />
        </section>

        {/* 4. DESTINATION LISTINGS */}
        <section className="my-12">
          <TouristZoneCards
            zones={TOURIST_ZONES}
            activeZone={selectedZone}
            onSelectZone={setSelectedZone}
          />
        </section>

        {/* Ornament divider */}
        <div className="my-8 relative overflow-hidden">
          <KarakalpakOrnamentPattern color="#8E2424" height={16} />
        </div>

        {/* 5. HISTORIAN'S CORNER - LECTURES BY LECTURER & BOOKINGS */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 my-12" id="historical-cabinet">
          
          {/* Historical Lectures section */}
          <div className="bg-white border border-sand-border rounded-3xl p-6 shadow-sm relative overflow-hidden flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Award className="h-5 w-5 text-royal-red" />
                <h3 className="font-sans font-bold text-royal-red text-lg uppercase tracking-wide">
                  Лекции у костра: Уголок Профессора
                </h3>
              </div>
              
              <p className="text-natural-charcoal/90 font-sans text-xs md:text-sm leading-relaxed mb-6">
                История Каракалпакстана окутана сотнями научных споров и очаровательных караванских легенд. Специально для наших любознательных туристов я опубликовал три редкие архивные заметки:
              </p>

              <div className="flex flex-col gap-5">
                {HISTORICAL_ANECDOTES.map((anecdote, i) => (
                  <div key={i} className="bg-[#FAF7F2] p-4 rounded-2.5xl border border-sand-border">
                    <div className="flex justify-between items-start gap-2 mb-1.5">
                      <h4 className="font-sans font-bold text-royal-red text-sm">{anecdote.title}</h4>
                      <span className="text-[10px] text-sand-gold font-mono shrink-0 font-bold">{anecdote.era}</span>
                    </div>
                    <p className="text-[#2D2926]/90 font-sans text-xs leading-relaxed">{anecdote.content}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-sand-border text-center">
              <span className="text-xs font-serif italic text-sand-gold">
                Кафедра Археологии КГУ им. Бердаха. Архивные работы 1982-2026.
              </span>
            </div>
          </div>

          {/* SIMULATED CARAVAN EXPEDITION REGISTRATION */}
          <div className="bg-white border border-sand-border rounded-3xl p-6 shadow-sm relative overflow-hidden flex flex-col justify-between" id="expedition-booking">
            <div className="absolute top-0 right-0 w-32 h-32 bg-royal-red/5 rounded-full blur-3xl pointer-events-none"></div>
            
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Flame className="h-5 w-5 text-royal-red" />
                <h3 className="font-sans font-bold text-royal-red text-lg uppercase tracking-wide">
                  Заявка в Караван Экспедиций
                </h3>
              </div>

              <p className="text-natural-charcoal/90 font-sans text-xs md:text-sm leading-relaxed mb-4">
                Планируете настоящую этнографическую поездку к древним крепостям Хорезма или берегам пересыхающего Арала? Оставьте свои координаты, и историческая комиссия составит вам персональный паспорт путешественника.
              </p>

              {/* Direct Booking Contact Details */}
              <div className="bg-[#FAF7F2] p-4 rounded-2xl border border-sand-border mb-6 flex flex-col gap-2.5 shadow-sm">
                <div className="text-[10px] font-mono tracking-wider text-sand-gold uppercase font-bold">Контакты для бронирования:</div>
                <div className="flex flex-col sm:flex-row gap-2.5 sm:gap-6 text-xs font-semibold text-royal-red">
                  <a href="https://t.me/zxcvxll" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 hover:underline decoration-royal-red">
                    <Send className="h-4 w-4 stroke-current" />
                    <span>Telegram: @zxcvxll</span>
                  </a>
                  <a href="tel:+998912650395" className="flex items-center gap-1.5 hover:underline decoration-royal-red">
                    <Phone className="h-4 w-4 stroke-current" />
                    <span>Телефон: +998 (91) 265-03-95</span>
                  </a>
                </div>
              </div>

              {/* Booking state switch */}
              {!showBookingResult ? (
                <form onSubmit={handleSubmitBooking} className="flex flex-col gap-4 font-sans text-xs md:text-sm">
                  
                  {/* Name field */}
                  <div className="grid grid-cols-1 gap-1.5">
                    <label className="text-natural-charcoal font-mono text-[10px] uppercase font-bold tracking-wider flex items-center gap-1">
                      <User className="h-3 w-3 text-royal-red" />
                      <span>Ваше Имя и Фамилия:</span>
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Например: Болатбек Сейткулов"
                      value={bookingName}
                      onChange={(e) => setBookingName(e.target.value)}
                      className="w-full bg-[#FAF7F2] border border-sand-border rounded-xl px-4 py-3 text-[#2D2926] placeholder-[#2D2926]/30 focus:outline-none focus:border-royal-red transition-colors"
                    />
                  </div>

                  {/* Email field */}
                  <div className="grid grid-cols-1 gap-1.5">
                    <label className="text-natural-charcoal font-mono text-[10px] uppercase font-bold tracking-wider flex items-center gap-1">
                      <Mail className="h-3 w-3 text-royal-red" />
                      <span>Электронная почта:</span>
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="Например: traveller@example.com"
                      value={bookingEmail}
                      onChange={(e) => setBookingEmail(e.target.value)}
                      className="w-full bg-[#FAF7F2] border border-sand-border rounded-xl px-4 py-3 text-[#2D2926] placeholder-[#2D2926]/30 focus:outline-none focus:border-royal-red transition-colors"
                    />
                  </div>

                  {/* Route select dropdown field */}
                  <div className="grid grid-cols-1 gap-1.5">
                    <label className="text-natural-charcoal font-mono text-[10px] uppercase font-bold tracking-wider flex items-center gap-1">
                      <Route className="h-3 w-3 text-royal-red" />
                      <span>Выбрать научный маршрут:</span>
                    </label>
                    <select
                      value={bookingRouteId}
                      onChange={(e) => setBookingRouteId(e.target.value)}
                      className="w-full bg-[#FAF7F2] border border-sand-border rounded-xl px-4 py-3 text-[#2D2926] focus:outline-none focus:border-royal-red transition-colors cursor-pointer"
                    >
                      {JOURNEY_ROUTES.map((route) => (
                        <option key={route.id} value={route.id}>
                          {route.title} ({route.duration.split(" ")[0]} {route.duration.split(" ")[1]})
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Travel date field */}
                  <div className="grid grid-cols-1 gap-1.5">
                    <label className="text-natural-charcoal font-mono text-[10px] uppercase font-bold tracking-wider flex items-center gap-1">
                      <Calendar className="h-3 w-3 text-royal-red" />
                      <span>Ориентировочная дата старта:</span>
                    </label>
                    <input
                      type="date"
                      required
                      value={bookingDate}
                      onChange={(e) => setBookingDate(e.target.value)}
                      className="w-full bg-[#FAF7F2] border border-sand-border rounded-xl px-4 py-3 text-[#2D2926] focus:outline-none focus:border-royal-red transition-colors cursor-pointer"
                    />
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    className="w-full py-3 bg-royal-red text-white font-bold rounded-xl hover:bg-royal-red-dark transition-colors duration-150 cursor-pointer flex items-center justify-center gap-2 mt-2 shadow-sm"
                  >
                    <Send className="h-4 w-4" />
                    <span>Сформировать экспедиционный паспорт</span>
                  </button>
                </form>
              ) : (
                /* Generated traveler itinerary result */
                <div className="bg-[#FAF7F2] p-5 rounded-2.5xl border border-royal-red/30 flex flex-col justify-between min-h-[340px] animate-fade-in relative shadow-sm">
                  
                  {/* Decorative stamp shadow */}
                  <div className="absolute top-4 right-4 text-center border-2 border-royal-red/20 text-royal-red/20 rounded-full h-24 w-24 flex items-center justify-center font-serif text-[10px] uppercase font-bold rotate-[22deg] pointer-events-none">
                    <span>КГУ АРХЕОЛОГ</span>
                  </div>

                  <div>
                    <div className="text-royal-red font-mono text-[10px] uppercase font-bold tracking-widest mb-4 flex items-center gap-1">
                      <Award className="h-4 w-4 shrink-0" />
                      <span>Паспорт экспедиции сформирован успешно!</span>
                    </div>

                    <div className="space-y-3 font-sans text-xs text-natural-charcoal">
                      <div>
                        <span className="text-sand-gold font-mono block text-[10px] uppercase font-bold">Руководитель экспедиции:</span>
                        <strong className="text-royal-red font-bold">{bookingName}</strong>
                      </div>
                      <div>
                        <span className="text-sand-gold font-mono block text-[10px] uppercase font-bold">Связь и верификация:</span>
                        <span className="text-[#2D2926] font-medium">{bookingEmail}</span>
                      </div>
                      <div>
                        <span className="text-sand-gold font-mono block text-[10px] uppercase font-bold">Направление каравана:</span>
                        <strong className="text-royal-red font-bold">
                          {JOURNEY_ROUTES.find((r) => r.id === bookingRouteId)?.title}
                        </strong>
                      </div>
                      <div>
                        <span className="text-sand-gold font-mono block text-[10px] uppercase font-bold">Выезд назначен на:</span>
                        <strong className="text-[#2D2926]">{new Date(bookingDate).toLocaleDateString("ru-RU", { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</strong>
                      </div>
                    </div>

                    <div className="bg-white border border-sand-border p-3 rounded-xl mt-4">
                      <p className="text-[11px] text-[#2D2926]/90 font-sans italic leading-normal">
                        «Уважаемый коллега {bookingName}, подробный путеводитель, практические GPS-координаты для проводников и телефоны юртовых лагерей отправлены вам на почту. Не забудьте взять с собой компас и солнцезащитные головные уборы. Счастливого пути в тайны Приаралья!»
                      </p>
                    </div>
                  </div>

                  <button
                    onClick={() => {
                      setShowBookingResult(false);
                      setBookingName("");
                      setBookingEmail("");
                      setBookingDate("");
                    }}
                    className="w-full mt-4 py-2 bg-white text-royal-red border border-sand-border rounded-xl hover:bg-[#FAF7F2] transition-colors font-mono text-xs cursor-pointer font-bold shadow-sm"
                  >
                    Вернуться назад
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>

      {/* FOOTER */}
      <footer className="bg-[#FAF7F2] border-t border-sand-border text-natural-charcoal/80 font-sans py-12 relative overflow-hidden">
        
        {/* Background Yurt ornament shadow on extreme bottom */}
        <div className="absolute bottom-[-50px] left-[-50px] w-48 h-48 opacity-[0.03] text-royal-red pointer-events-none">
          <svg viewBox="0 0 100 100" fill="currentColor">
            <circle cx="50" cy="50" r="40" stroke="currentColor" strokeWidth="2" fill="none" />
            <path d="M 10 50 L 90 50 M 50 10 L 50 90" stroke="currentColor" strokeWidth="1.5" />
          </svg>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Top ornamental line */}
          <div className="mb-8">
            <KarakalpakOrnamentPattern color="#8E2424" height={16} />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8 text-xs sm:text-sm">
            
            {/* Title / Info Column */}
            <div>
              <div className="flex items-center gap-2 mb-3">
                <div className="h-8 w-8 rounded-full border border-royal-red/30 bg-white flex items-center justify-center text-royal-red shadow-sm shrink-0">
                  <Compass className="h-4 w-4" />
                </div>
                <span className="font-serif font-bold text-royal-red tracking-widest text-xs uppercase">Қарақалпақстан Туризм</span>
              </div>
              <p className="text-natural-charcoal/85 leading-relaxed">
                Интерактивный академический портал, призванный познакомить мир с неповторимой историей, древней археологией и культурой Республики Каракалпакстан. Популяризация культурного достояния Приаралья.
              </p>
            </div>

            {/* Links Column */}
            <div>
              <h4 className="font-sans font-bold text-royal-red uppercase text-xs tracking-wider mb-3">Кабинеты кафедры</h4>
              <ul className="space-y-2 text-natural-charcoal/90 font-medium">
                <li><a href="#interactive-map-section" className="hover:text-royal-red transition-colors">Интерактивный Навигатор</a></li>
                <li><a href="#cultural-heritage-section" className="hover:text-royal-red transition-colors">Этнография и Символы</a></li>
                <li><a href="#tourist-destinations-section" className="hover:text-royal-red transition-colors">Список Памятников</a></li>
                <li><a href="#historical-cabinet" className="hover:text-royal-red transition-colors">Исторический Архив</a></li>
              </ul>
            </div>

            {/* Direct Booking Contacts Column */}
            <div>
              <h4 className="font-sans font-bold text-royal-red uppercase text-xs tracking-wider mb-3">Бронирование Экспедиций</h4>
              <ul className="space-y-2.5 text-natural-charcoal/90 font-semibold">
                <li>
                  <a href="https://t.me/zxcvxll" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 hover:text-royal-red transition-colors">
                    <Send className="h-4 w-4 text-royal-red shrink-0" />
                    <span>Telegram: @zxcvxll</span>
                  </a>
                </li>
                <li>
                  <a href="tel:+998912650395" className="flex items-center gap-1.5 hover:text-royal-red transition-colors">
                    <Phone className="h-4 w-4 text-royal-red shrink-0" />
                    <span>Телефон: +998 (91) 265-03-95</span>
                  </a>
                </li>
              </ul>
            </div>

            {/* Academic Column */}
            <div>
              <h4 className="font-sans font-bold text-royal-red uppercase text-xs tracking-wider mb-3">Научная поддержка</h4>
              <p className="text-natural-charcoal/80 leading-relaxed mb-1.5">
                Каракалпакский Государственный Университет им. Бердаха
              </p>
              <p className="text-natural-charcoal/70">
                г. Нукус, ул. академика Ч. Абдирова, 1<br/>
                info@karsu.uz
              </p>
            </div>
          </div>

          {/* Symmetrical footer copyright bar below ornament */}
          <div className="pt-6 border-t border-sand-border flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] font-mono text-natural-charcoal/70">
            <p className="text-center sm:text-left">
              &copy; {new Date().getFullYear()} Karakalpakstan Tourism Archive. Все права защищены археологическим научным сообществом.
            </p>
            <div className="flex gap-4">
              <span className="flex items-center gap-1">
                <Lock className="h-3.5 w-3.5" />
                <span>SSL Шифрование</span>
              </span>
              <span className="flex items-center gap-1">
                <Heart className="h-3.5 w-3.5 text-royal-red fill-royal-red" />
                <span>Создано с вечным уважением</span>
              </span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
