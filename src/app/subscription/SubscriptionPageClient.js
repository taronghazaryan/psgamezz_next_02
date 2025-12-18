"use client";

import { useEffect, useState } from "react";
import Guidance from "../components/Guidance";
import PsPlus from "../components/PsPlus";
import Hero from "../components/SubscriptionHero";
import Api from "../connectors";

export default function SubscriptionPageClient() {
  const [psPlusSubs, setPsPlusSubs] = useState([]);
  const [eaPlaySubs, setEaPlaySubs] = useState([]);
  const [consoleTypes, setConsoleTypes] = useState([]);

  useEffect(() => {
    async function fetchSubscriptions() {
      try {
        const { data } = await Api.get("/api/subscription-services/");
        const allSubs = data.results || [];

        setPsPlusSubs(allSubs.filter((sub) => sub.title === "PlayStation Plus"));
        setEaPlaySubs(allSubs.filter((sub) => sub.title === "EA Play"));
      } catch (error) {
        console.error("Ошибка запроса подписок:", error);
      }
    }

    async function fetchConsoles() {
      try {
        const { data } = await Api.get("/api/console-types/");
        setConsoleTypes(data.results || []);
      } catch (err) {
        console.error("Ошибка запроса консолей:", err);
      }
    }

    fetchSubscriptions();
    fetchConsoles();

    const hash = window.location.hash;
    if (hash) {
      const el = document.querySelector(hash);
      if (el) {
        setTimeout(() => el.scrollIntoView({ behavior: "smooth" }), 300);
      }
    }
  }, []);

  return (
    <div className="bg-[#0d0e14] min-h-screen">
      <Hero />
      <div className="overflow-hidden bg-[#0d0e14]">
        <div className="px-4 md:px-6 lg:px-8 py-12 md:py-16" id="subscriptions">
          <PsPlus subscriptions={psPlusSubs} consoleTypes={consoleTypes} />
        </div>
        <div className="px-4 md:px-6 lg:px-8 py-12 md:py-16 bg-[#0d0e14]">
          <Guidance subscriptions={eaPlaySubs} consoleTypes={consoleTypes} />
        </div>
      </div>
    </div>
  );
}
