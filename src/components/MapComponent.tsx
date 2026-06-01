/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useEffect, useRef, useState } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { TouristZone, JourneyRoute } from "../types";
import { TOURIST_ZONES } from "../data";
import { Compass, Sparkles, Navigation, MapPin, Eye, Route } from "lucide-react";

interface MapComponentProps {
  zones: TouristZone[];
  selectedZone: TouristZone | null;
  onSelectZone: (zone: TouristZone) => void;
  selectedRoute: JourneyRoute | null;
  onSelectRoute: (route: JourneyRoute | null) => void;
}

export default function MapComponent({
  zones,
  selectedZone,
  onSelectZone,
  selectedRoute,
  onSelectRoute,
}: MapComponentProps) {
  const mapContainerRef = useRef<HTMLDivElement | null>(null);
  const mapRef = useRef<L.Map | null>(null);
  const markersRef = useRef<{ [key: string]: L.Marker }>({});
  const polylineRef = useRef<L.Polyline | null>(null);
  const [userLocation, setUserLocation] = useState<[number, number] | null>(null);
  const [routingInstructions, setRoutingInstructions] = useState<string[]>([]);
  const [totalDistance, setTotalDistance] = useState<number>(0);

  // Initialize Map
  useEffect(() => {
    if (!mapContainerRef.current) return;

    // Centered around Karakalpakstan (Nukus / Chilpyk region config)
    const map = L.map(mapContainerRef.current, {
      center: [42.6, 59.6],
      zoom: 7,
      zoomControl: true,
      minZoom: 5,
      maxZoom: 14,
    });

    // Elegant and premium CartoDB Dark Matter tiles or OpenStreetMap Hot tiles
    L.tileLayer("https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png", {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
      subdomains: "abcd",
      maxZoom: 20,
    }).addTo(map);

    mapRef.current = map;

    return () => {
      map.remove();
      mapRef.current = null;
    };
  }, []);

  // Set user current location if allowed
  const handleLocateUser = () => {
    if ("geolocation" in navigator && mapRef.current) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const latLng: [number, number] = [position.coords.latitude, position.coords.longitude];
          setUserLocation(latLng);
          if (mapRef.current) {
            mapRef.current.flyTo(latLng, 9, { animate: true, duration: 1.5 });
            
            // Add a temporary blue marker
            const userIcon = L.divIcon({
              html: `
                <div class="relative flex items-center justify-center">
                  <span class="animate-ping absolute inline-flex h-4 w-4 rounded-full bg-blue-500 opacity-75"></span>
                  <div class="relative flex h-6 w-6 items-center justify-center rounded-full bg-blue-600 text-white shadow-lg border border-white">
                    <div class="h-2 w-2 rounded-full bg-white"></div>
                  </div>
                </div>
              `,
              className: "user-loc-pin",
              iconSize: [24, 24],
              iconAnchor: [12, 12],
            });
            L.marker(latLng, { icon: userIcon })
              .addTo(mapRef.current)
              .bindPopup("<div class='font-sans font-semibold text-gray-900'>Вы находитесь здесь</div>")
              .openPopup();
          }
        },
        (error) => {
          console.warn("Geolocation access denied:", error);
        }
      );
    }
  };

  // Add Markers for Tourist Zones
  useEffect(() => {
    const map = mapRef.current;
    if (!map) return;

    // Clear existing markers
    Object.values(markersRef.current).forEach((marker: any) => marker.remove());
    markersRef.current = {};

    zones.forEach((zone) => {
      const isSelected = selectedZone?.id === zone.id;
      const color =
        zone.category === "culture"
          ? "#D97706" // amber600
          : zone.category === "history"
          ? "#DC2626" // red600
          : zone.category === "nature"
          ? "#059669" // emerald600
          : "#4F46E5"; // indigo600

      const customPin = L.divIcon({
        html: `
          <div class="relative flex items-center justify-center transition-transform duration-300 ${
            isSelected ? "scale-125" : "hover:scale-115"
          }">
            <!-- Wave effect -->
            <span class="absolute inline-flex h-10 w-10 rounded-full opacity-20" style="background-color: ${color}"></span>
            ${
              isSelected
                ? `<span class="animate-ping absolute inline-flex h-8 w-8 rounded-full opacity-40 bg-white"></span>`
                : ""
            }
            <!-- Pin Body -->
            <div class="relative flex h-10 w-10 items-center justify-center rounded-full text-white shadow-xl border-2 border-white transition-all bg-stone-900" style="border-color: ${color}">
              <div class="flex h-8 w-8 items-center justify-center rounded-full" style="background-color: ${color}">
                <svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path stroke-linecap="round" stroke-linejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
            </div>
            <!-- Tooltip text when hovered or selected -->
            <div class="${
              isSelected ? "block" : "hidden"
            } absolute -top-8 bg-stone-900 text-amber-100 text-[10px] font-sans px-2 py-0.5 rounded shadow border border-amber-500/30 whitespace-nowrap z-50">
              ${zone.name.split(" ")[0]}...
            </div>
          </div>
        `,
        className: "custom-leaflet-pin",
        iconSize: [44, 44],
        iconAnchor: [22, 40],
        popupAnchor: [0, -38],
      });

      const marker = L.marker(zone.coordinates, { icon: customPin }).addTo(map);

      // Professor thematic popup inside Leaflet
      const popupContent = `
        <div class="p-2 font-sans max-w-[240px]">
          <h4 class="font-bold text-gray-900 text-sm mb-1">${zone.name}</h4>
          <p class="text-xs text-gray-600 line-clamp-2 m-0 mb-2">${zone.shortDescription}</p>
          <div class="flex justify-between items-center text-[10px] text-gray-500 pt-1 border-t border-gray-100">
            <span>🚗 ${zone.distanceFromNukus} км от Нукуса</span>
            <span class="font-semibold text-amber-700">${zone.bestSeason.split(",")[0]}</span>
          </div>
        </div>
      `;

      marker.bindPopup(popupContent);

      marker.on("click", () => {
        onSelectZone(zone);
        onSelectRoute(null); // Deselect route when focusing single point
      });

      markersRef.current[zone.id] = marker;
    });
  }, [zones, selectedZone]);

  // Center Map on Selected Single Zone
  useEffect(() => {
    const map = mapRef.current;
    if (!map || !selectedZone) return;

    map.flyTo(selectedZone.coordinates, 10, {
      animate: true,
      duration: 1.5,
    });

    // Open popup with timeout for smooth transition
    setTimeout(() => {
      const marker = markersRef.current[selectedZone.id];
      if (marker) {
        marker.openPopup();
      }
    }, 1000);
  }, [selectedZone]);

  // Handle Route drawing and interactive directions calculation
  useEffect(() => {
    const map = mapRef.current;
    if (!map) return;

    if (polylineRef.current) {
      polylineRef.current.remove();
      polylineRef.current = null;
    }

    if (!selectedRoute) {
      setRoutingInstructions([]);
      setTotalDistance(0);
      return;
    }

    // Capture the coordinates of the route zones in order
    const routePointsData = selectedRoute.routePoints
      .map((id) => TOURIST_ZONES.find((z) => z.id === id))
      .filter((z): z is TouristZone => !!z);

    if (routePointsData.length === 0) return;

    const coordsArray = routePointsData.map((z) => z.coordinates);
    const color = selectedRoute.color;

    // Draw route line
    const polyline = L.polyline(coordsArray, {
      color: color,
      weight: 5,
      opacity: 0.85,
      dashArray: "10, 10",
      lineCap: "round",
      lineJoin: "round",
    }).addTo(map);

    polylineRef.current = polyline;

    // Zoom map to fit the route bounds
    try {
      map.fitBounds(polyline.getBounds(), {
        padding: [50, 50],
        maxZoom: 10,
        animate: true,
        duration: 1.5,
      });
    } catch (e) {
      // In case bounds are single point or tiny
      map.flyTo(coordsArray[0], 9);
    }

    // Build History Professor historical narrative route description
    const instructions: string[] = [];
    let distanceSum = 0;

    instructions.push(`🚩 Начало маршрута в г. Нукус (Музей И.В. Савицкого). Подготавливаем снаряжение, провизию и питьевую воду.`);

    // Loop points to write beautiful routing stories step by step!
    for (let i = 1; i < routePointsData.length; i++) {
      const from = routePointsData[i - 1];
      const to = routePointsData[i];
      const stepDist = Math.max(15, Math.abs(to.distanceFromNukus - from.distanceFromNukus));
      distanceSum += stepDist;

      if (to.id === "mizdakhkan") {
        instructions.push(
          `🛣️ Движемся на запад от Нукуса (~${stepDist} км) через реку Амударья в священный Ходжейли. Сворачиваем к погребальному холму Миздахкан и крепости Гяур-Кала. Обратите внимание на тысячелетние мавзолеи.`
        );
      } else if (to.id === "chilpyk-dahma") {
        instructions.push(
          `🛣️ Направляемся по главной трассе на юг вдоль русла реки Амударья (~${stepDist} км). На горизонте покажется конический силуэт холма Чилпык. Подъем пешком на зороастрийскую Дахму.`
        );
      } else if (to.id === "muynak-cemetery") {
        instructions.push(
          `🛣️ Долгий марш-бросок на север (~200 км) через выжженную равнину. Достигаем Кунграда и уходим по трассе на бывший полуостров Муйнак. Нас встречает Кладбище кораблей на дне Аралкума.`
        );
      } else if (to.id === "ayaz-kala") {
        instructions.push(
          `🛣️ Уходим к востоку в самое сердце пустыни Кызылкум (~${stepDist} км) мимо Турткуля и Беруни. Конечная точка — тройная сырцовая крепость Аяз-Кала и прилегающий лагерь юрт.`
        );
      } else if (to.id === "toprak-kala") {
        instructions.push(
          `🛣️ Преодолеваем песчаные барханы на северо-восток (~${stepDist} км). Исследуем многоэтажный дворец хорезмшахов Топрак-Кала.`
        );
      } else if (to.id === "sudochye-lake") {
        instructions.push(
          `🛣️ Экспедиционный съезд с асфальта в сторону Устюрта (~${stepDist} км). Движемся по каменистой грунтовке к болотистым лазурным берегам озера Судочье и рыбацкому призраку Урга.`
        );
      } else {
        instructions.push(
          `🛣️ Переезд из ${from.name} в ${to.name} (~${stepDist} км) через бескрайние просторы древней Кемпир-кала.`
        );
      }
    }

    instructions.push(`🏆 Конечная точка достигнута — ${routePointsData[routePointsData.length - 1].name}. Профессор рекомендует разбить лагерь и заварить крепкий чай из пустынных трав.`);

    setRoutingInstructions(instructions);
    setTotalDistance(distanceSum);
  }, [selectedRoute]);

  return (
    <div className="flex flex-col lg:flex-row gap-6 bg-white border border-sand-border rounded-3xl p-4 lg:p-6 shadow-md relative overflow-hidden" id="interactive-map-section">
      
      {/* Decorative Traditional Border Ornament overlay inside container */}
      <div className="absolute top-0 left-0 w-full h-1 bg-[linear-gradient(90deg,transparent_0%,#8E2424_50%,transparent_100%)] opacity-30"></div>
      
      {/* Left / Top Side: Map */}
      <div className="w-full lg:flex-1 h-[380px] lg:h-[500px] rounded-2.5xl overflow-hidden shadow-inner border border-sand-border relative z-10">
        
        {/* Map Container */}
        <div ref={mapContainerRef} className="w-full h-full absolute inset-0 bg-[#FAF7F2]" />
        
        {/* Quick action badges on map */}
        <div className="absolute top-3 right-3 flex flex-col gap-2 z-[1000]">
          <button
            onClick={handleLocateUser}
            className="flex items-center gap-1.5 px-3 py-2 bg-white/95 text-royal-red font-sans font-semibold text-xs rounded-xl shadow-md border border-sand-border backdrop-blur-md hover:bg-[#FAF7F2] transition-all cursor-pointer"
            title="Определить мое местоположение"
          >
            <Compass className="h-3.5 w-3.5 animate-spin-slow text-royal-red" />
            <span>Где я?</span>
          </button>

          {selectedRoute && (
            <button
              onClick={() => onSelectRoute(null)}
              className="flex items-center gap-1.5 px-3 py-2 bg-royal-red text-white font-sans font-semibold text-xs rounded-xl shadow-md border border-royal-red hover:bg-royal-red-dark transition-all cursor-pointer"
            >
              <span>Сбросить путь</span>
            </button>
          )}
        </div>

        {/* Categories explanation legend */}
        <div className="absolute bottom-3 left-3 bg-white/95 text-natural-charcoal font-sans text-[10px] md:text-xs rounded-xl p-2.5 shadow-md border border-sand-border backdrop-blur-md z-[1000] flex flex-wrap gap-2.5 font-medium">
          <div className="flex items-center gap-1">
            <span className="w-2.5 h-2.5 rounded-full bg-red-600"></span>
            <span>История</span>
          </div>
          <div className="flex items-center gap-1">
            <span className="w-2.5 h-2.5 rounded-full bg-sand-gold"></span>
            <span>Культура</span>
          </div>
          <div className="flex items-center gap-1">
            <span className="w-2.5 h-2.5 rounded-full bg-[#059669]"></span>
            <span>Природа</span>
          </div>
          <div className="flex items-center gap-1">
            <span className="w-2.5 h-2.5 rounded-full bg-indigo-600"></span>
            <span>Мемориал</span>
          </div>
        </div>
      </div>

      {/* Right / Bottom Side: Navigation & Interactive routing sheet */}
      <div className="w-full lg:w-96 flex flex-col gap-4 relative z-10">
        
        {/* Header styling */}
        <div className="bg-[#FAF7F2] p-4 rounded-2xl border border-sand-border">
          <div className="flex items-center gap-2 mb-1.5">
            <Compass className="h-5 w-5 text-royal-red" />
            <h3 className="font-sans font-bold text-royal-red text-base">Интерактивный навигатор</h3>
          </div>
          <p className="text-natural-charcoal/80 font-sans text-xs leading-relaxed">
            Выберите готовый профессорский маршрут на панели ниже или нажмите на любую точку на карте, чтобы изучить подробные сведения.
          </p>
        </div>

        {/* Selected element detailed view */}
        {!selectedRoute ? (
          /* General and single spot selection */
          <div className="flex-1 flex flex-col gap-3">
            <div className="text-royal-red/90 font-mono text-[10px] tracking-wider uppercase font-bold">
              Текущая точка фокусировки:
            </div>
            
            {selectedZone ? (
              <div className="bg-[#FAF7F2] p-4 rounded-2.5xl border border-sand-border flex-1 flex flex-col justify-between shadow-sm">
                <div>
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <span className="px-2 py-0.5 bg-royal-red/10 rounded text-royal-red font-mono text-[10px] uppercase font-bold tracking-wider">
                      {selectedZone.category === "culture" ? "культура" : selectedZone.category === "history" ? "история" : selectedZone.category === "nature" ? "природа" : "монумент"}
                    </span>
                    <span className="text-[11px] text-natural-charcoal/70 font-mono">
                      {selectedZone.distanceFromNukus} км от Нукуса
                    </span>
                  </div>
                  <h4 className="font-sans font-bold text-royal-red text-base mb-1.5 leading-snug">
                    {selectedZone.name}
                  </h4>
                  <p className="text-natural-charcoal/90 font-sans text-xs leading-relaxed line-clamp-4 mb-3">
                    {selectedZone.shortDescription}
                  </p>
                  <div className="bg-white p-2.5 rounded-xl border border-sand-border mb-2">
                    <div className="text-[10px] text-sand-gold font-mono flex items-center gap-1.5 uppercase font-bold mb-1">
                      <Sparkles className="h-3 w-3 text-royal-red" />
                      <span>Историк-Профессор говорит:</span>
                    </div>
                    <p className="text-natural-charcoal font-sans italic text-[11px] leading-normal line-clamp-3">
                      «{selectedZone.historyProfessorTip}»
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => {
                    const scrollElement = document.getElementById(`zone-info-card-${selectedZone.id}`);
                    if (scrollElement) {
                      scrollElement.scrollIntoView({ behavior: "smooth", block: "center" });
                    }
                  }}
                  className="w-full flex items-center justify-center gap-1.5 px-4 py-2 bg-royal-red text-white font-sans font-semibold text-xs rounded-xl hover:bg-royal-red-dark transition-colors cursor-pointer mt-2 shadow-sm"
                >
                  <Eye className="h-4 w-4" />
                  <span>Читать лекцию полностью</span>
                </button>
              </div>
            ) : (
              <div className="bg-[#FAF7F2]/40 border border-dashed border-sand-border rounded-2.5xl p-6 flex flex-col items-center justify-center text-center flex-1 min-h-[160px]">
                <MapPin className="h-8 w-8 text-sand-light mb-2 animate-bounce" />
                <p className="text-[#2D2926]/70 font-sans text-xs leading-relaxed max-w-[200px]">
                  Карта готова. Нажмите на маркер, чтобы увидеть детали поездки.
                </p>
              </div>
            )}
          </div>
        ) : (
          /* Active Route interactive routing walkthrough */
          <div className="bg-[#FAF7F2] p-4 rounded-2.5xl border border-sand-border flex flex-col justify-between max-h-[320px] lg:max-h-[380px] overflow-hidden shadow-sm">
            <div className="flex flex-col h-full">
              {/* Route header */}
              <div className="flex items-center justify-between mb-2 pb-2 border-b border-sand-border">
                <div>
                  <div className="text-[9px] font-mono tracking-wider text-sand-gold uppercase font-bold">Активный маршрут</div>
                  <h4 className="font-sans font-bold text-royal-red text-sm leading-tight line-clamp-1">{selectedRoute.title}</h4>
                </div>
                <div className="bg-royal-red/10 text-royal-red text-[10px] font-mono px-2 py-0.5 rounded-full font-bold">
                  {selectedRoute.difficulty}
                </div>
              </div>

              {/* Distances and duration */}
              <div className="flex gap-4 mb-2.5 text-[11px] font-mono text-natural-charcoal bg-white p-2 rounded-lg border border-sand-border">
                <div className="flex items-center gap-1">
                  <Route className="h-3.5 w-3.5 text-royal-red" />
                  <span>Путь: <strong className="text-royal-red">{totalDistance} км</strong></span>
                </div>
                <div className="flex items-center gap-1">
                  <Navigation className="h-3.5 w-3.5 text-royal-red" />
                  <span>Время: <strong className="text-royal-red">{selectedRoute.duration}</strong></span>
                </div>
              </div>

              {/* Scrollable instructions list */}
              <div className="flex-1 overflow-y-auto pr-1 flex flex-col gap-2.5 scrollbar-thin">
                {routingInstructions.map((instruction, idx) => (
                  <div key={idx} className="flex gap-2 text-xs font-sans leading-relaxed">
                    <span className="text-royal-red font-mono font-bold select-none">{idx + 1}.</span>
                    <p className="text-natural-charcoal/90">{instruction}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
