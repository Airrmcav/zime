"use client";

import React, { useState } from "react";
import {
  Lightbulb,
  Construction,
  Briefcase,
  Sun,
  ChevronDown,
  LucideIcon,
} from "lucide-react";

type ColorKey = "blue" | "slate" | "emerald" | "amber";

interface Section {
  title: string;
  icon: LucideIcon;
  color: ColorKey;
  items: string[];
}

interface ColorClasses {
  bg: string;
  border: string;
  icon: string;
  hover: string;
  text: string;
}

const Accordeon: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleAccordion = (index: number): void => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const sections: Section[] = [
    {
      title: "Luminarias",
      icon: Lightbulb,
      color: "blue",
      items: [
        "Luminaria Vial Modelo LP1-100W, de 15,000 lúmenes con fotocelda marca ECOENERGY",
        "Luminaria Vial de 100W tensión de operación 120-277V, 120LM",
        "Luminaria Vial de 100W tensión de operación 120-277V, 120LM, luz blanca",
        "Luminaria LED de 100 Watts protocolo IP66 o superior",
        "Luminaria para vialidad de 100 Watts con fotocelda",
        "Luminario para alumbrado público de 100 Watts",
        "Lámpara modelo SAE GL-50 tipo LED para alumbrado público",
        "Lámpara modelo SAE SE 47L tipo LED para alumbrado público",
        "Luminario LED potencia 30 a 35 Watts",
        "Luminario marca Philips uso intemperie modelo Road Focus",
        "Lámpara de techo de sobreponer fabricado en aluminio con LED",
        "Luminario arbotante para exterior fabricado en aluminio",
        "Luminario arbotante para interior de sobreponer fabricado en aluminio LED",
      ],
    },
    {
      title: "Brazos y Estructuras",
      icon: Construction,
      color: "slate",
      items: [
        'Brazo galvanizado de 1.20 mts Ced.30 de 1 1/2"',
        "Brazo metálico para poste de concreto, galvanizado por inmersión",
        "Brazo de acero galvanizado en caliente",
        "Brazo o ménsula en tubo metálico",
        "Brazo de lámpara galvanizado",
        "Suministro e instalación de poste recto circular de 7 metros",
        "Suministro y colocación de poste metálico cónico de 9 mts",
        "Suministro y colocación de poste metálico cónico de 12 mts",
        "Poste de sección circular tipo cónico para alumbrado público",
        "Poste galvanizado cónico circular de 9m de altura",
      ],
    },
    {
      title: "Proyectos",
      icon: Briefcase,
      color: "emerald",
      items: [
        "Pavimentación y alumbrado público",
        "Equipamiento de alumbrado público con lámparas LED",
        "Equipamiento de electrificación, colocación de luminarias de alumbrado público",
        "Suministro y colocación reflector LED de 400 Watts luz fría 6500K, IP66, marca CONCEPT",
        "Suministro y colocación reflector LED 600W alta potencia 100-227V",
        "Tipo LED de alta tecnología para alumbrado público de vialidades",
        "Luminario tipo LED alta tecnología para alumbrado público de vialidades",
        "Suministro y colocación lámpara vialidad LED 94W",
        "Instalación de luminarias",
        "Proyecto sustentable con beneficio social",
      ],
    },
    {
      title: "Energía Solar",
      icon: Sun,
      color: "amber",
      items: [
        "Suministro e instalación de luminaria LED solar autónoma All In One",
        "Suministro y colocación luminaria solar All In One",
        "Construcción de electrificación no convencional",
        "Construcción de electrificación no convencional a base de paneles solares",
        "Equipamiento de electrificación no convencional, colocación de luminarias solares",
        "Suministro y colocación de 168 paneles solares de 550 Watts",
        "Luminaria de exterior de sobreponer para paneles solares",
      ],
    },
  ];

  const getColorClasses = (color: ColorKey, isOpen: boolean): ColorClasses => {
    const colors: Record<ColorKey, ColorClasses> = {
      blue: {
        bg: isOpen ? "bg-blue-50" : "bg-white",
        border: "border-blue-200",
        icon: "text-blue-600",
        hover: "hover:bg-blue-50",
        text: "text-blue-900",
      },
      slate: {
        bg: isOpen ? "bg-slate-50" : "bg-white",
        border: "border-slate-200",
        icon: "text-slate-600",
        hover: "hover:bg-slate-50",
        text: "text-slate-900",
      },
      emerald: {
        bg: isOpen ? "bg-emerald-50" : "bg-white",
        border: "border-emerald-200",
        icon: "text-emerald-600",
        hover: "hover:bg-emerald-50",
        text: "text-emerald-900",
      },
      amber: {
        bg: isOpen ? "bg-amber-50" : "bg-white",
        border: "border-amber-200",
        icon: "text-amber-600",
        hover: "hover:bg-amber-50",
        text: "text-amber-900",
      },
    };

    return colors[color];
  };

  return (
    <div className="py-6">
      <div className="max-w-7xl mx-auto px-4">
        {/* HEADERS */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-2">
          {sections.map((section, index) => {
            const isOpen = openIndex === index;
            const colors = getColorClasses(section.color, isOpen);
            const Icon = section.icon;

            return (
              <button
                key={section.title}
                onClick={() => toggleAccordion(index)}
                className={`border-2 ${colors.border} rounded-lg p-5 cursor-pointer flex items-center justify-between ${colors.bg} ${colors.hover} transition`}
              >
                <div className="flex items-center gap-3">
                  <Icon className={`w-6 h-6 ${colors.icon}`} />
                  <span className={`font-semibold ${colors.text}`}>
                    {section.title}
                  </span>
                </div>
                <ChevronDown
                  className={`w-5 h-5 ${colors.icon} transition-transform ${
                    isOpen ? "rotate-180" : ""
                  }`}
                />
              </button>
            );
          })}
        </div>

        {/* CONTENT */}
        {openIndex !== null && (
          <div className="border-2 rounded-lg bg-white shadow-sm p-5">
            <ul className="space-y-3">
              {sections[openIndex].items.map((item, i) => (
                <li
                  key={i}
                  className="flex gap-3 text-gray-700 leading-relaxed"
                >
                  <span className="text-blue-600 mt-1">•</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default Accordeon;
