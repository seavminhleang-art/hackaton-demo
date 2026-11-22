"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  Activity,
  ArrowRight,
  ArrowUpRight,
  Camera,
  Clock3,
  FileText,
  Heart,
  MapPin,
  Search,
  PlusSquare,
  PhoneCall,
  Landmark,
  Bell,
  CheckCircle2,
  Map,
  Siren,
  ShieldCheck,
  Users,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { requireDemoAccount } from "@/lib/utils";

type EmergencyReport = {
  id: string;
  category: string;
  place: string;
  description: string;
  status: "Received" | "On the way" | "Resolved";
  age: string;
  recipients: string[];
  photo?: string;
};
type CityReport = {
  id: string;
  title: string;
  category: string;
  place: string;
  department: string;
  status: "Submitted" | "Assigned" | "In Progress" | "Fixed";
  votes: number;
  priority: string;
  age: string;
  photo?: string;
};

const seedEmergencies: EmergencyReport[] = [
  {
    id: "EM-2408",
    category: "Medical",
    place: "Wat Phnom, Phnom Penh",
    description: "Person feeling unwell near the east entrance. Demo report.",
    status: "On the way",
    age: "4 min ago",
    recipients: ["Hospital", "Police"],
  },
  {
    id: "EM-2407",
    category: "Fire",
    place: "Boeung Keng Kang, Phnom Penh",
    description: "Smoke reported near a market building. Demo report.",
    status: "Received",
    age: "12 min ago",
    recipients: ["Police"],
  },
  {
    id: "EM-2406",
    category: "Accident",
    place: "National Road 6, Siem Reap",
    description:
      "Minor road collision; people are clear of traffic. Demo report.",
    status: "Resolved",
    age: "Yesterday",
    recipients: ["Hospital", "Police"],
  },
];
const seedCityReports: CityReport[] = [
  {
    id: "UR-0184",
    title: "Streetlight out on corner",
    category: "Streetlight",
    place: "Street 240, Daun Penh",
    department: "Public Works",
    status: "In Progress",
    votes: 18,
    priority: "Normal",
    age: "2 hours ago",
  },
  {
    id: "UR-0183",
    title: "Overflowing public bin",
    category: "Garbage",
    place: "Russian Market, Chamkar Mon",
    department: "Waste Management",
    status: "Assigned",
    votes: 11,
    priority: "Normal",
    age: "Today",
  },
  {
    id: "UR-0182",
    title: "Pothole near school crossing",
    category: "Road",
    place: "Street 163, Toul Tom Poung",
    department: "Roads & Bridges",
    status: "Submitted",
    votes: 27,
    priority: "High",
    age: "Today",
  },
  {
    id: "UR-0181",
    title: "Blocked drain after rain",
    category: "Flooding",
    place: "Wat Bo Road, Siem Reap",
    department: "Drainage Services",
    status: "Fixed",
    votes: 9,
    priority: "Normal",
    age: "Yesterday",
  },
  {
    id: "UR-0180",
    title: "Broken bench at public park",
    category: "Public facility",
    place: "Riverside Park, Phnom Penh",
    department: "Parks & Recreation",
    status: "Submitted",
    votes: 6,
    priority: "Low",
    age: "2 days ago",
  },
];
const services = [
  {
    name: "Preah Ang Duong Hospital",
    type: "Hospital",
    place: "Street 110, Phnom Penh",
    hours: "Open 24 hours",
    phone: "+855 23 723 840",
    icon: "🏥",
  },
  {
    name: "Daun Penh Police Post",
    type: "Police",
    place: "Street 47, Phnom Penh",
    hours: "Open 24 hours",
    phone: "+855 23 722 067",
    icon: "👮",
  },
  {
    name: "Chamkar Mon Health Center",
    type: "Clinic",
    place: "Street 163, Phnom Penh",
    hours: "Mon–Sat, 7 AM–5 PM",
    phone: "+855 23 210 547",
    icon: "🩺",
  },
  {
    name: "Phnom Penh City Hall",
    type: "Government",
    place: "Monivong Boulevard, Phnom Penh",
    hours: "Mon–Fri, 8 AM–5 PM",
    phone: "+855 23 426 163",
    icon: "🏛️",
  },
  {
    name: "Siem Reap Referral Hospital",
    type: "Hospital",
    place: "National Road 6, Siem Reap",
    hours: "Open 24 hours",
    phone: "+855 63 963 111",
    icon: "🏥",
  },
  {
    name: "Siem Reap Tourist Police",
    type: "Police",
    place: "Old Market area, Siem Reap",
    hours: "Open 24 hours",
    phone: "+855 12 402 424",
    icon: "👮",
  },
];

export function HomeModule({ memberName }: { memberName: string | null }) {
  const quickActions = [
    { href: "/lost-found", icon: Search, title: "Search Lost & Found", detail: "Find lost items", tone: "blue" },
    { href: "/lost-found", icon: PlusSquare, title: "Report Lost or Found", detail: "Post an item", tone: "blue" },
    { href: "/emergency", icon: PhoneCall, title: "Emergency SOS", detail: "Get urgent help", tone: "red" },
    { href: "/city-reports", icon: Landmark, title: "Report an Issue", detail: "Report public issues", tone: "gold" },
    { href: "/community-services", icon: MapPin, title: "Nearby Services", detail: "Find services near you", tone: "pale" },
  ];
  const panels = [
    { href: "/lost-found", icon: Search, title: "Lost & Found Community", sub: "Report or find lost and found items in your community.", tone: "blue", stats: [["128", "Recent Posts"], ["42", "Matched"], ["26", "Returned"]], rows: [["🎒", "Black Backpack", "BKK1, Phnom Penh", "2 hours ago", "FOUND"], ["📱", "iPhone 13 Pro", "Russian Market", "5 hours ago", "LOST"], ["🔑", "Car Key (Toyota)", "Toul Kork", "1 day ago", "FOUND"]], rowTitle: "Recent Posts", button: "Go to Lost & Found" },
    { href: "/emergency", icon: Siren, title: "Emergency Response", sub: "Report emergencies and get help quickly.", tone: "red", stats: [["5", "Active Alerts"], ["12", "My Reports"], ["3", "In Progress"]], rows: [["⚠", "Heavy Rain & Flooding", "Several areas in Phnom Penh", "May 20, 2024 · 08:30 AM", ""], ["⚠", "Road Accident", "Preah Monivong Blvd (Near Independence)", "May 20, 2024 · 07:45 AM", ""], ["⚠", "Road Closure", "Sisowath Quay (River Festival)", "May 19, 2024 · 06:15 PM", ""]], rowTitle: "Active Public Alerts", button: "Go to Emergency" },
    { href: "/city-reports", icon: Landmark, title: "Government Reporting", sub: "Report public issues and track their status.", tone: "gold", stats: [["24", "My Reports"], ["8", "In Progress"], ["6", "Resolved"]], rows: [["💡", "Broken Street Light", "Toul Kork, Phnom Penh", "2 days ago", "IN PROGRESS"], ["🛣", "Road Damage", "Sen Sok, Phnom Penh", "3 days ago", "ASSIGNED"], ["🗑", "Garbage Collection", "Chbar Ampov, Phnom Penh", "5 days ago", "RESOLVED"]], rowTitle: "Recent Reports", button: "Go to Government Reporting" },
  ];
  return (
    <div className="module-page service-dashboard">
      <div className="service-dashboard-heading">
        <div><h1>{memberName ? `Welcome back, ${memberName.split(" ")[0]}!` : "Welcome to your community"}</h1><p>How can we help you today?</p></div>
      </div>
      <section className="quick-actions-card">
        <h2>Quick Actions</h2>
        <div className="quick-actions-grid">{quickActions.map(({ href, icon: Icon, title, detail, tone }) => <Link className={`quick-action ${tone}`} href={href} key={title}><span className="quick-action-icon"><Icon size={21} /></span><span className="quick-action-copy"><b>{title}</b><small>{detail}</small></span><ArrowRight size={15} /></Link>)}</div>
      </section>
      <section className="service-panels">{panels.map(({ href, icon: Icon, title, sub, tone, stats, rows, rowTitle, button }) => <article className={`service-panel ${tone}`} key={title}>
        <header className="service-panel-heading"><span><Icon size={20} /></span><div><h2>{title}</h2><p>{sub}</p></div><Link href={href}>View all</Link></header>
        <div className="service-panel-stats">{stats.map(([value, label]) => <div key={label}><b>{value}</b><small>{label}</small></div>)}</div>
        <h3 className="service-panel-section-label">{rowTitle}</h3>
        <div className="service-panel-rows">{rows.map(([emoji, name, place, time, status]) => <div className="service-panel-row" key={name}><span className="service-row-image">{emoji}</span><div className="service-row-copy"><b>{name}</b><small><MapPin size={10} /> {place}</small>{tone === "red" && <small>{time}</small>}</div>{tone !== "red" && <small className="service-row-time">{time}</small>}{status && <span className={`service-status ${status.toLowerCase().replaceAll(" ", "-")}`}>{status}</span>}</div>)}</div>
        <Link className="service-panel-button" href={href}>{button}<ArrowRight size={14} /></Link>
      </article>)}</section>
      <section className="dashboard-bottom-grid">
        <article className="dashboard-widget status-widget"><h2>Reports by Status (All Systems)</h2><div className="status-widget-body"><div className="status-donut"><strong>412<small>Total</small></strong></div><ul><li><i className="submitted"/>Submitted <b>116</b></li><li><i className="progress"/>In Progress <b>142</b></li><li><i className="resolved"/>Resolved <b>98</b></li><li><i className="closed"/>Closed <b>38</b></li><li><i className="rejected"/>Rejected <b>18</b></li></ul></div></article>
        <article className="dashboard-widget map-widget"><h2>Reports on Map</h2><div className="dashboard-map"><span className="map-pin p1">6</span><span className="map-pin p2">12</span><span className="map-pin p3">18</span><span className="map-pin p4">7</span><span className="map-pin p5">4</span><Link href="/city-reports">View Full Map <Map size={15}/></Link></div></article>
        <article className="dashboard-widget activity-widget"><h2>Recent Activity</h2><div className="activity-row"><span className="activity-mark red"><Siren size={15}/></span><div><b>Emergency report submitted</b><small>Road Accident at Preah Monivong Blvd</small></div><time>10 min ago</time></div><div className="activity-row"><span className="activity-mark blue"><Search size={15}/></span><div><b>New comment on your report</b><small>Broken Street Light in Toul Kork</small></div><time>25 min ago</time></div><div className="activity-row"><span className="activity-mark gold"><CheckCircle2 size={15}/></span><div><b>Your report is now IN PROGRESS</b><small>Road Damage in Sen Sok</small></div><time>1 hour ago</time></div><Link className="activity-all" href="/profile">View All Activity <ArrowRight size={14}/></Link></article>
      </section>
    </div>
  );
}

export function EmergencyModule({
  notify,
}: {
  notify: (message: string) => void;
}) {
  const [reports, setReports] = useState(seedEmergencies);
  const [category, setCategory] = useState("Medical");
  const [place, setPlace] = useState("");
  const [description, setDescription] = useState("");
  const [photo, setPhoto] = useState("");
  const [consent, setConsent] = useState(false);
  const [media, setMedia] = useState(false);
  const [gps, setGps] = useState("Location not attached");
  const [view, setView] = useState("Reporter view");
  const [org, setOrg] = useState("All organizations");
  const [accepted, setAccepted] = useState(false);
  const [showEmergencyForm, setShowEmergencyForm] = useState(false);
  const [coordinates, setCoordinates] = useState<{ lat: number; lng: number } | null>(null);
  const route =
    category === "Medical"
      ? ["Hospital"]
      : category === "Accident"
        ? ["Hospital", "Police"]
        : ["Police"];
  const recipients = media ? [...route, "Media"] : route;
  const useLocation = () => {
    if (!navigator.geolocation) {
      setGps("GPS unavailable — enter a place below");
      return;
    }
    setGps("Finding your location…");
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setGps(
          `Location captured once · ${position.coords.latitude.toFixed(3)}, ${position.coords.longitude.toFixed(3)}`,
        );
        setCoordinates({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
        setPlace("Current location (GPS)");
      },
      () => setGps("Couldn’t get GPS — enter a nearby place below"),
      { enableHighAccuracy: true, timeout: 8000, maximumAge: 0 },
    );
  };
  const send = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!requireDemoAccount()) return;
    if (!consent) {
      notify("Please consent to share this location once before sending.");
      return;
    }
    if (!place.trim()) {
      notify("Add a location or use GPS to continue.");
      return;
    }
    const next: EmergencyReport = {
      id: `EM-${Math.floor(2500 + Math.random() * 400)}`,
      category,
      place: coordinates
        ? `Current location (GPS): ${coordinates.lat.toFixed(5)}, ${coordinates.lng.toFixed(5)}`
        : place,
      description:
        description || `${category} situation reported. Demo report.`,
      status: "Received",
      age: "Just now",
      recipients,
      photo: photo || undefined,
    };
    setReports((current) => [next, ...current]);
    setAccepted(true);
    notify(`Demo report received by ${recipients.join(" and ")}.`);
  };
  const updateStatus = (id: string, status: EmergencyReport["status"]) => {
    setReports((current) =>
      current.map((report) =>
        report.id === id ? { ...report, status } : report,
      ),
    );
    notify(`Reporter notification sent: ${status}. (Demo)`);
  };
  const openEmergencyForm = () => {
    setShowEmergencyForm(true);
    window.setTimeout(() => document.getElementById("emergency-report-tools")?.scrollIntoView({ behavior: "smooth" }), 80);
  };
  const mapLocation = coordinates
    ? `${coordinates.lat},${coordinates.lng}`
    : place && place !== "Current location (GPS)"
      ? place
      : "Phnom Penh, Cambodia";
  const googleMapEmbed = `https://maps.google.com/maps?q=${encodeURIComponent(mapLocation)}&z=15&output=embed`;
  const googleMapLink = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(mapLocation)}`;
  return (
    <div className={`module-page ${showEmergencyForm ? "show-emergency-form" : ""}`}>
      <section className="emergency-overview">
        {showEmergencyForm && <button className="emergency-return-dashboard" onClick={() => { setShowEmergencyForm(false); setView("Reporter view"); }}>← Back to Emergency Overview</button>}
        <div className="emergency-overview-top">
          <article className="emergency-sos-card">
            <div className="emergency-sos-copy">
              <h1>Emergency?<br/><span>We’re here to help.</span></h1>
              <p>This platform is an additional channel for reporting incidents<br className="desktop-break"/> and requesting assistance.</p>
              <b className="emergency-direct-warning">⚠ For immediate danger, call emergency services directly.</b>
              <div className="emergency-hotline-buttons"><a href="tel:119"><span>☎</span><b>119<small>Ambulance</small></b></a><a href="tel:117"><span>☎</span><b>117<small>Police</small></b></a></div>
              <small>Demo interface only; it does not dispatch responders. Verify hotline availability locally.</small>
            </div>
            <button className="sos-action" onClick={openEmergencyForm} aria-label="Open emergency report form"><span>☎</span><b>SOS</b><strong>Press to report</strong><small>Share your location and<br/> get help immediately</small></button>
          </article>
          <article className="location-panel">
            <div className="location-instructions"><h2><MapPin size={15}/> Share your location for faster help</h2><p>Allow location access to detect your position, or select a location on the map.</p><button onClick={useLocation}><MapPin size={14}/>{gps === "Location not attached" ? "Use My Current Location" : gps}</button><span className="or-divider">or</span><button className="map-select-button" onClick={() => { setPlace("Phnom Penh, Cambodia"); setGps("Location selected on the demo map"); }}>Select on Map</button></div>
            <div className="location-map-column"><div className="emergency-mini-map"><iframe title="Google Map showing the selected emergency location" src={googleMapEmbed} loading="lazy" referrerPolicy="no-referrer-when-downgrade"/><a className="open-google-map" href={googleMapLink} target="_blank" rel="noreferrer">Open Google Maps ↗</a></div><div className="current-location-card"><b><MapPin size={14}/> Selected Location <small>{coordinates ? "GPS" : "Map"}</small></b><p>{coordinates ? `${coordinates.lat.toFixed(5)}, ${coordinates.lng.toFixed(5)}` : place || "Phnom Penh, Cambodia"}</p><button onClick={() => { setPlace(""); setCoordinates(null); setGps("Location not attached"); }}>Change Location</button></div></div>
          </article>
        </div>
        <div className="emergency-shortcuts">
          <button onClick={openEmergencyForm}><span className="red">▤</span><b>Report an Incident<small>Submit an incident with details,<br/> photos and location.</small></b><ArrowRight size={17}/></button>
          <button onClick={() => { setView("Organization dashboards"); openEmergencyForm(); }}><span>✚</span><b>My Reports<small>Track the status of your<br/> submitted reports.</small></b><ArrowRight size={17}/></button>
          <a href="#emergency-hotlines"><span>☎</span><b>Emergency Contacts<small>Manage contacts who can be<br/> notified in emergencies.</small></b><ArrowRight size={17}/></a>
          <a href="#emergency-safety"><span>⬟</span><b>Safety Tips<small>Learn how to stay safe and<br/> be prepared.</small></b><ArrowRight size={17}/></a>
        </div>
        <div className="emergency-overview-panels">
          <article className="emergency-overview-panel nearby-services" id="emergency-hotlines"><header><h2>Emergency Services</h2><a href="https://www.trc.gov.kh/en/resources/emergency-numbers/" target="_blank" rel="noreferrer">Official numbers</a></header>{[{icon:"♙",name:"Police emergency hotline",distance:"Cambodia-wide hotline",phone:"117"},{icon:"♜",name:"Fire emergency hotline",distance:"Cambodia-wide hotline",phone:"118"},{icon:"🚑",name:"Ambulance emergency hotline",distance:"Cambodia-wide hotline",phone:"119"},{icon:"✚",name:"Find a nearby hospital",distance:"Use your current location",phone:"Directory"},{icon:"◉",name:"Local rescue services",distance:"Check local availability",phone:"Directory"}].map((service)=><div className="nearby-service-row" key={service.name}><span>{service.icon}</span><div><b>{service.name}</b><small>{service.distance}</small></div>{service.phone === "Directory" ? <a href="/community-services">Directory ↗</a> : <a href={`tel:${service.phone}`}>☎ &nbsp;{service.phone}</a>}</div>)}</article>
          <article className="emergency-overview-panel public-alerts"><header><h2>Active Public Alerts <small>DEMO EXAMPLES</small></h2><button onClick={() => { setView("Organization dashboards"); openEmergencyForm(); }}>View all alerts</button></header>{[{icon:"⚠",name:"Heavy Rain & Flooding",place:"Phnom Penh",time:"Sample alert · 08:30 AM",detail:"Heavy rain may cause flooding in low-lying areas."},{icon:"⚠",name:"Road Closure",place:"Preah Norodom Blvd",time:"Sample alert · 07:45 AM",detail:"Road closed due to construction. Expect delays."},{icon:"⚠",name:"Fire Incident",place:"Russian Market Area",time:"Sample alert · 11:10 AM",detail:"Follow instructions from local authorities."}].map((alert)=><div className="public-alert-row" key={alert.name}><span>{alert.icon}</span><div><b>{alert.name} <small>{alert.name === "Fire Incident" ? "Critical" : "Warning"}</small></b><label>{alert.place}</label><time>{alert.time}</time><p>{alert.detail}</p></div></div>)}</article>
          <article className="emergency-overview-panel my-emergency-reports"><header><h2>My Reports</h2><button onClick={() => { setView("Organization dashboards"); openEmergencyForm(); }}>View all</button></header>{reports.slice(0,4).map((report,index)=><div className="my-report-row" key={report.id}><span className={`report-category-mark mark-${index%4}`}>{["🚑","≈","♨","⚠"][index%4]}</span><div><b>{report.category}</b><small>#{report.id}</small></div><div className="report-place-time"><b>{report.place}</b><small>{report.age}</small></div><span className={`report-state state-${report.status.toLowerCase().replaceAll(" ","-")}`}>{report.status}</span><ArrowRight size={14}/></div>)}</article>
        </div>
        <article className="emergency-status-timeline"><h2>Report Status Timeline <small>(What each status means)</small></h2><div className="status-timeline-steps">{[["▤","Submitted","You have successfully submitted the report."],["♧","Received","The system or organization has received the report."],["⌕","Under Review","The report is being checked and verified."],["☑","Acknowledged","The organization has reviewed and accepted it."],["🚑","Responding","The organization is taking action."],["✓","Resolved","The incident response is completed."]].map(([icon,title,detail],index)=><div className="status-timeline-step" key={title}><span className={index===5?"complete":""}>{icon}</span><b>{index+1}. {title}</b><p>{detail}</p></div>)}</div></article>
        <section className="emergency-safety-tips" id="emergency-safety"><b>Stay safe while getting help</b><span>Call the official hotline directly for immediate danger.</span><span>Share your location only when you’re comfortable and safe.</span><span>Follow directions from local emergency responders.</span></section>
        <footer className="emergency-page-footer"><b><span>♛</span> National Community Services Platform</b><span>Working together for a safer Cambodia.</span><a href="https://www.trc.gov.kh/en/resources/emergency-numbers/" target="_blank" rel="noreferrer">Official emergency numbers ↗</a><small>Emergency dashboard demo · No reports are dispatched</small></footer>
      </section>
      <div className="module-heading" id="emergency-report-tools">
        <div>
          <div className="eyebrow muted">URGENT · DEMO ROUTING ONLY</div>
          <h1>
            Emergency <em>contact &amp; report</em>
          </h1>
          <p>
            Share a one-time location with the right organization. This demo
            does not dispatch responders.
          </p>
        </div>
        <div className="demo-chip">
          <span /> DEMO MODE
        </div>
      </div>
      <div className="emergency-warning">
        <b>Need help right now?</b>
        <span>
          Call the official hotline directly. This student demo does not contact
          emergency services.
        </span>
        <a
          href="https://www.trc.gov.kh/en/resources/emergency-numbers/"
          target="_blank"
          rel="noreferrer"
        >
          Source: TRC ↗
        </a>
      </div>
      <div className="hotline-row">
        <a href="tel:117">
          <span>👮</span>
          <div>
            <small>POLICE</small>
            <b>117</b>
          </div>
          <i>Call ↗</i>
        </a>
        <a href="tel:118">
          <span>🚒</span>
          <div>
            <small>FIRE</small>
            <b>118</b>
          </div>
          <i>Call ↗</i>
        </a>
        <a href="tel:119">
          <span>🚑</span>
          <div>
            <small>AMBULANCE</small>
            <b>119</b>
          </div>
          <i>Call ↗</i>
        </a>
      </div>
      <div className="module-tabs">
        <button
          className={view === "Reporter view" ? "active" : ""}
          onClick={() => {
            if (requireDemoAccount()) setView("Reporter view");
          }}
        >
          Report an emergency
        </button>
        <button
          className={view !== "Reporter view" ? "active" : ""}
          onClick={() => setView("Organization dashboards")}
        >
          Organization dashboards{" "}
          <span className="count-pill">{reports.length}</span>
        </button>
      </div>
      {view === "Reporter view" ? (
        <div className="emergency-layout">
          <form className="module-panel emergency-form" onSubmit={send}>
            <div className="panel-heading">
              <div>
                <h2>What’s happening?</h2>
                <p>Choose a category and provide the nearest location.</p>
              </div>
              <Badge variant="destructive">URGENT</Badge>
            </div>
            <label className="field-label">EMERGENCY TYPE</label>
            <div className="emergency-categories">
              {[
                ["Accident", "🚗"],
                ["Fire", "🔥"],
                ["Medical", "🩺"],
                ["Crime", "🛡️"],
                ["Missing person", "🧍"],
              ].map(([name, icon]) => (
                <button
                  type="button"
                  key={name}
                  className={category === name ? "chosen" : ""}
                  onClick={() => {
                    setCategory(name);
                    setAccepted(false);
                  }}
                >
                  <span>{icon}</span>
                  {name}
                </button>
              ))}
            </div>
            <label className="field-label">
              LOCATION <small>SHARED ONCE</small>
            </label>
            <button type="button" className="gps-button" onClick={useLocation}>
              <MapPin size={15} /> Use my current location{" "}
              <ArrowRight size={14} />
            </button>
            <div className="gps-hint">{gps}</div>
            <input
              className="module-input"
              value={place}
              onChange={(e) => setPlace(e.target.value)}
              placeholder="Or enter a place, street, or landmark"
            />
            <label className="field-label description-label">
              SHORT DESCRIPTION <small>OPTIONAL</small>
            </label>
            <textarea
              className="module-textarea"
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="What should responders know? Avoid sharing names or private details."
            />
            <label className="upload-box">
              <Camera size={15} /> Add a photo{" "}
              <small>Optional · avoid identifiable victim photos</small>
              <input
                type="file"
                accept="image/*"
                onChange={(event) => {
                  const file = event.target.files?.[0];
                  setPhoto(file ? URL.createObjectURL(file) : "");
                }}
              />
            </label>
            {photo && (
              <img
                className="upload-preview"
                src={photo}
                alt="Selected report photo preview"
              />
            )}
            <label className="check-line">
              <input
                type="checkbox"
                checked={consent}
                onChange={(e) => setConsent(e.target.checked)}
              />
              <span>
                I consent to share this location <b>once</b> with the selected
                organizations.
              </span>
            </label>
            <label className="check-line media-check">
              <input
                type="checkbox"
                checked={media}
                onChange={(e) => setMedia(e.target.checked)}
              />
              <span>
                Share a general description and location with media{" "}
                <small>
                  Reporter will never receive my name, phone, or identity.
                </small>
              </span>
            </label>
            <div className="route-preview">
              <span>ROUTED TO</span>
              {recipients.map((name) => (
                <b key={name}>
                  {name === "Media" ? "📰" : name === "Police" ? "👮" : "🏥"}{" "}
                  {name}
                </b>
              ))}
            </div>
            <div className="consequence-note">
              <ShieldCheck size={14} /> False reports can delay help and may
              have consequences. All demo submissions are logged.
            </div>
            <Button
              className="button primary full-button emergency-submit"
              type="submit"
              onClick={(event) => {
                if (!requireDemoAccount()) event.preventDefault();
              }}
            >
              {accepted ? "Send another demo report" : "Send emergency report"}{" "}
              <ArrowRight size={15} />
            </Button>
            {accepted && (
              <div className="received-banner">
                ✓ Report received by the demo dashboard. We’d notify you when
                status changes.
              </div>
            )}
          </form>
          <div className="module-panel organization-panel">
            <div className="panel-heading">
              <div>
                <h2>Organization inbox</h2>
                <p>Sample incoming reports for the demo.</p>
              </div>
              <span className="live-count">● LIVE DEMO</span>
            </div>
            <div className="org-filter">
              <select value={org} onChange={(e) => setOrg(e.target.value)}>
                <option>All organizations</option>
                <option>Hospital</option>
                <option>Police</option>
                <option>Media</option>
              </select>
            </div>
            <div className="report-stack">
              {reports
                .filter(
                  (r) =>
                    org === "All organizations" || r.recipients.includes(org),
                )
                .map((report) => (
                  <article className="emergency-report" key={report.id}>
                    <div className="report-top">
                      <b>{report.category}</b>
                      <span
                        className={`em-status ${report.status.toLowerCase().replaceAll(" ", "-")}`}
                      >
                        {report.status}
                      </span>
                    </div>
                    <div className="report-location">⌖ {report.place}</div>
                    <p>
                      {org === "Media"
                        ? `${report.category} incident reported near ${report.place}.`
                        : report.description}
                    </p>
                    {report.photo && (
                      <img
                        className="report-photo"
                        src={report.photo}
                        alt="Attached emergency report"
                      />
                    )}
                    <div className="recipient-list">
                      To:{" "}
                      {report.recipients.map((r) => (
                        <span key={r}>{r}</span>
                      ))}
                    </div>
                    <div className="report-bottom">
                      <small>
                        {report.id} · {report.age}
                      </small>
                      {report.status !== "Resolved" && (
                        <select
                          aria-label={`Update ${report.id} status`}
                          value={report.status}
                          onChange={(e) =>
                            updateStatus(
                              report.id,
                              e.target.value as EmergencyReport["status"],
                            )
                          }
                        >
                          <option>Received</option>
                          <option>On the way</option>
                          <option>Resolved</option>
                        </select>
                      )}
                    </div>
                  </article>
                ))}
            </div>
          </div>
        </div>
      ) : (
        <div className="module-panel dashboard-preview">
          <div className="panel-heading">
            <div>
              <h2>Receiving organization dashboards</h2>
              <p>
                Simulated inboxes by organization type. No reports leave this
                demo.
              </p>
            </div>
          </div>
          <div className="org-dashboard-grid">
            {["Hospital", "Police", "Media"].map((name) => (
              <button
                key={name}
                className={org === name ? "selected" : ""}
                onClick={() =>
                  setOrg(org === name ? "All organizations" : name)
                }
              >
                <span>
                  {name === "Hospital" ? "🏥" : name === "Police" ? "👮" : "📰"}
                </span>
                <b>{name}</b>
                <small>
                  {reports.filter((r) => r.recipients.includes(name)).length}{" "}
                  sample reports
                </small>
              </button>
            ))}
          </div>
          <div className="report-stack dashboard-list">
            {reports
              .filter(
                (r) =>
                  org === "All organizations" || r.recipients.includes(org),
              )
              .map((r) => (
                <div className="dashboard-report" key={r.id}>
                  <b>
                    {r.id} · {r.category}
                  </b>
                  <span>{r.place}</span>
                  <em
                    className={`em-status ${r.status.toLowerCase().replaceAll(" ", "-")}`}
                  >
                    {r.status}
                  </em>
                  <select
                    value={r.status}
                    onChange={(e) =>
                      updateStatus(
                        r.id,
                        e.target.value as EmergencyReport["status"],
                      )
                    }
                  >
                    <option>Received</option>
                    <option>On the way</option>
                    <option>Resolved</option>
                  </select>
                </div>
              ))}
          </div>
        </div>
      )}
    </div>
  );
}

export function CityModule({ notify }: { notify: (message: string) => void }) {
  const [reports, setReports] = useState(seedCityReports);
  const [tab, setTab] = useState("All reports");
  const [category, setCategory] = useState("All categories");
  const [showForm, setShowForm] = useState(false);
  const [title, setTitle] = useState("");
  const [place, setPlace] = useState("");
  const [kind, setKind] = useState("Road");
  const [photo, setPhoto] = useState("");
  const [upvoted, setUpvoted] = useState<string[]>([]);
  const filtered = reports.filter(
    (r) =>
      (tab === "All reports" || r.status === tab) &&
      (category === "All categories" || r.category === category),
  );
  const addReport = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!requireDemoAccount()) return;
    setReports((current) => [
      {
        id: `UR-${190 + current.length}`,
        title,
        category: kind,
        place,
        department:
          kind === "Garbage"
            ? "Waste Management"
            : kind === "Streetlight"
              ? "Public Works"
              : "Roads & Bridges",
        status: "Submitted",
        votes: 1,
        priority: "Normal",
        age: "Just now",
        photo: photo || undefined,
      },
      ...current,
    ]);
    setShowForm(false);
    setTitle("");
    setPlace("");
    setPhoto("");
    notify("City report submitted with your photo attached (demo).");
  };
  const statusUpdate = (id: string, status: CityReport["status"]) => {
    setReports((current) =>
      current.map((r) => (r.id === id ? { ...r, status } : r)),
    );
    notify(`Report ${id} updated to ${status}. Citizen notified (demo).`);
  };
  return (
    <div className="module-page">
      <div className="module-heading">
        <div>
          <div className="eyebrow muted">SMART CITY · NON-URGENT</div>
          <h1>
            City issues, <em>moving forward.</em>
          </h1>
          <p>
            Report a local problem, follow the department response, and help
            neighbors flag duplicates.
          </p>
        </div>
        <button
          className="button primary"
          onClick={() => {
            if (!requireDemoAccount()) return;
            setShowForm(!showForm);
          }}
        >
          ＋ Report an issue
        </button>
      </div>
      <div className="city-stats">
        <div>
          <b>{reports.length}</b>
          <small>Sample reports</small>
        </div>
        <div>
          <b>{reports.filter((r) => r.status === "In Progress").length}</b>
          <small>Being worked on</small>
        </div>
        <div>
          <b>{reports.filter((r) => r.status === "Fixed").length}</b>
          <small>Marked fixed</small>
        </div>
        <div>
          <b>4</b>
          <small>Departments</small>
        </div>
      </div>
      {showForm && (
        <form className="module-panel city-form" onSubmit={addReport}>
          <div className="panel-heading">
            <div>
              <h2>Report a city issue</h2>
              <p>
                For problems that can be fixed over days. For danger now, use
                the Emergency module.
              </p>
            </div>
            <button
              type="button"
              className="text-button"
              onClick={() => setShowForm(false)}
            >
              Close ×
            </button>
          </div>
          <div className="city-form-grid">
            <label>
              Problem category
              <select value={kind} onChange={(e) => setKind(e.target.value)}>
                {[
                  "Road",
                  "Streetlight",
                  "Garbage",
                  "Flooding",
                  "Public facility",
                ].map((x) => (
                  <option key={x}>{x}</option>
                ))}
              </select>
            </label>
            <label>
              Location
              <input
                value={place}
                onChange={(e) => setPlace(e.target.value)}
                required
                placeholder="Street, landmark, city"
              />
            </label>
            <label className="span-two">
              Short description
              <input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
                placeholder="What needs attention?"
              />
            </label>
            <label className="upload-box city-upload">
              ▧ &nbsp; Add photo <small>Required for the demo submission</small>
              <input
                type="file"
                accept="image/*"
                onChange={(event) => {
                  const file = event.target.files?.[0];
                  setPhoto(file ? URL.createObjectURL(file) : "");
                }}
              />
            </label>
          </div>
          {photo && (
            <img
              className="upload-preview"
              src={photo}
              alt="Selected city report photo preview"
            />
          )}
          <Button
            className="button primary"
            type="submit"
            onClick={(event) => {
              if (!requireDemoAccount()) event.preventDefault();
            }}
          >
            Submit city report <ArrowRight size={14} />
          </Button>
        </form>
      )}
      <div className="city-layout">
        <section className="module-panel report-list-panel">
          <div className="panel-heading">
            <div>
              <h2>Neighborhood reports</h2>
              <p>Vote for existing issues to help departments prioritize.</p>
            </div>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <option>All categories</option>
              {[
                "Road",
                "Streetlight",
                "Garbage",
                "Flooding",
                "Public facility",
              ].map((x) => (
                <option key={x}>{x}</option>
              ))}
            </select>
          </div>
          <div className="module-tabs city-tabs">
            {[
              "All reports",
              "Submitted",
              "Assigned",
              "In Progress",
              "Fixed",
            ].map((x) => (
              <button
                key={x}
                className={tab === x ? "active" : ""}
                onClick={() => setTab(x)}
              >
                {x}
              </button>
            ))}
          </div>
          <div className="city-report-list">
            {filtered.map((report) => (
              <article className="city-report" key={report.id}>
                <div className="pin-icon">
                  {report.category === "Road"
                    ? "⌁"
                    : report.category === "Garbage"
                      ? "♲"
                      : report.category === "Streetlight"
                        ? "☼"
                        : report.category === "Flooding"
                          ? "≈"
                          : "⌂"}
                </div>
                <div className="city-report-info">
                  <div className="city-report-title">
                    <b>{report.title}</b>
                    <span
                      className={`city-status ${report.status.toLowerCase().replaceAll(" ", "-")}`}
                    >
                      {report.status}
                    </span>
                  </div>
                  <p>⌖ {report.place}</p>
                  <div className="city-meta">
                    {report.category} · {report.department} · {report.age}
                  </div>
                  {report.photo && (
                    <img
                      className="report-photo city-report-photo"
                      src={report.photo}
                      alt="Attached city report"
                    />
                  )}
                  <div className="city-progress">
                    <span className={report.status === "Fixed" ? "done" : ""} />
                    <span
                      className={
                        report.status === "Assigned" ||
                        report.status === "In Progress" ||
                        report.status === "Fixed"
                          ? "done"
                          : ""
                      }
                    />
                    <span
                      className={
                        report.status === "In Progress" ||
                        report.status === "Fixed"
                          ? "done"
                          : ""
                      }
                    />
                    <span className={report.status === "Fixed" ? "done" : ""} />
                  </div>
                </div>
                <div className="vote-admin">
                  <button
                    className={upvoted.includes(report.id) ? "voted" : ""}
                    onClick={() => {
                      if (!upvoted.includes(report.id)) {
                        setUpvoted([...upvoted, report.id]);
                        setReports((current) =>
                          current.map((r) =>
                            r.id === report.id
                              ? { ...r, votes: r.votes + 1 }
                              : r,
                          ),
                        );
                        notify("Added your ‘I have this problem too’ vote.");
                      }
                    }}
                  >
                    ↑ {report.votes}
                    <small>I have this too</small>
                  </button>
                  <label>
                    DEMO OFFICER
                    <select
                      value={report.status}
                      onChange={(e) =>
                        statusUpdate(
                          report.id,
                          e.target.value as CityReport["status"],
                        )
                      }
                    >
                      <option>Submitted</option>
                      <option>Assigned</option>
                      <option>In Progress</option>
                      <option>Fixed</option>
                    </select>
                  </label>
                  {report.status === "Fixed" && (
                    <button
                      className="proof-link"
                      onClick={() =>
                        notify(
                          "After photo: drainage cleared at Wat Bo Road. Sample proof image.",
                        )
                      }
                    >
                      View after photo ↗
                    </button>
                  )}
                </div>
              </article>
            ))}
          </div>
          {filtered.length === 0 && (
            <div className="empty-state">No reports in this filter yet.</div>
          )}
        </section>
        <aside className="city-side">
          <div className="module-panel map-panel">
            <div className="panel-heading">
              <div>
                <h2>Issue map</h2>
                <p>Sample pins by status · Phnom Penh</p>
              </div>
              <button
                className="text-button"
                onClick={() =>
                  notify("Map shows five sample reports in the demo.")
                }
              >
                ↗
              </button>
            </div>
            <div className="mock-map">
              <div className="map-river" />
              <i className="road road-a" />
              <i className="road road-b" />
              <i className="road road-c" />
              {reports.slice(0, 7).map((r, i) => (
                <button
                  key={r.id}
                  className={`map-pin pin-${i} ${r.status.toLowerCase().replaceAll(" ", "-")}`}
                  title={`${r.title} · ${r.status}`}
                  onClick={() =>
                    notify(`${r.title} — ${r.status} (${r.place})`)
                  }
                >
                  ●
                </button>
              ))}
              <span className="map-label label-a">DAUN PENH</span>
              <span className="map-label label-b">BOEUNG KENG KANG</span>
              <span className="map-label label-c">TONLÉ SAP</span>
            </div>
            <div className="map-legend">
              <span>
                <i className="submitted" /> Submitted
              </span>
              <span>
                <i className="assigned" /> Assigned
              </span>
              <span>
                <i className="fixed" /> Fixed
              </span>
            </div>
          </div>
          <div className="module-panel department-panel">
            <div className="panel-heading">
              <div>
                <h2>Departments</h2>
                <p>Sample assignment list</p>
              </div>
            </div>
            {[
              ["Roads & Bridges", "12 reports", "🚧"],
              ["Public Works", "8 reports", "💡"],
              ["Waste Management", "6 reports", "♻️"],
              ["Drainage Services", "4 reports", "💧"],
            ].map((d) => (
              <div className="department-row" key={d[0]}>
                <span>{d[2]}</span>
                <b>{d[0]}</b>
                <small>{d[1]}</small>
              </div>
            ))}
          </div>
        </aside>
      </div>
    </div>
  );
}

export function CommunityModule({
  notify,
}: {
  notify: (message: string) => void;
}) {
  const [tab, setTab] = useState("Services directory");
  const [type, setType] = useState("All services");
  const [query, setQuery] = useState("");
  const [joined, setJoined] = useState(false);
  const [showAuth, setShowAuth] = useState(false);
  const [authMode, setAuthMode] = useState<"login" | "register">("login");
  const [communityPosts, setCommunityPosts] = useState<
    { title: string; place: string; description: string; photo?: string }[]
  >([]);
  const [postPhoto, setPostPhoto] = useState("");
  const shareUpdate = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!window.localStorage.getItem("found-cambodia-demo-user")) {
      setShowAuth(true);
      return;
    }
    const data = new FormData(event.currentTarget);
    setCommunityPosts((current) => [
      {
        title: String(data.get("title")),
        place: String(data.get("place")),
        description: String(data.get("description")),
        photo: postPhoto || undefined,
      },
      ...current,
    ]);
    setPostPhoto("");
    event.currentTarget.reset();
    notify("Your community update was shared in this demo.");
  };
  const list = services.filter(
    (s) =>
      (type === "All services" || s.type === type) &&
      `${s.name} ${s.type} ${s.place}`
        .toLowerCase()
        .includes(query.toLowerCase()),
  );
  return (
    <div className="module-page">
      <div className="module-heading">
        <div>
          <div className="eyebrow muted">LOCAL INFORMATION · COMMUNITY</div>
          <h1>
            Help lives <em>here.</em>
          </h1>
          <p>
            Find useful services, local notices, and small ways to lend a hand.
          </p>
        </div>
        <div className="demo-chip">
          <span /> COMMUNITY DEMO
        </div>
      </div>
      <div className="community-hero">
        <div>
          <small>NEIGHBORS HELPING NEIGHBORS</small>
          <h2>
            Good things grow
            <br />
            <em>when we show up.</em>
          </h2>
          <p>
            Share a useful sighting, offer volunteer help, or find a nearby
            service.
          </p>
          <button
            className="button primary"
            onClick={() => {
              setTab("Volunteer board");
              notify("Volunteer opportunities are shown below.");
            }}
          >
            Find ways to help <span>→</span>
          </button>
        </div>
        <div className="community-hero-art">
          🤝<span>✳</span>
          <i>♡</i>
        </div>
      </div>
      <div className="community-metrics">
        <div>
          <span>✳</span>
          <b>24</b>
          <small>neighbors helping</small>
        </div>
        <div>
          <span>⌂</span>
          <b>6</b>
          <small>sample services</small>
        </div>
        <div>
          <span>◉</span>
          <b>3</b>
          <small>active local notices</small>
        </div>
      </div>
      <Tabs
        value={tab}
        onValueChange={(value) => setTab(String(value))}
        className="community-tabs-root"
      >
        <TabsList variant="line" className="module-tabs community-tabs">
          {[
            "Services directory",
            "Public notices",
            "Volunteer board",
            "Community stories",
          ].map((x) => (
            <TabsTrigger
              key={x}
              value={x}
              className={tab === x ? "active" : ""}
            >
              {x}
            </TabsTrigger>
          ))}
        </TabsList>
      </Tabs>
      <form
        className="module-panel community-share"
        onSubmit={shareUpdate}
      >
        <div>
          <div className="eyebrow muted">COMMUNITY CONTRIBUTION</div>
          <h2>Share a local update</h2>
          <p>
            Post a helpful sighting or community update. Please leave out
            private information.
          </p>
        </div>
        <div className="community-share-fields">
          <input name="title" required placeholder="Update title" />
          <input name="place" required placeholder="Neighborhood or city" />
          <Textarea
            name="description"
            required
            rows={2}
            placeholder="What should neighbors know?"
          />
          <label className="upload-box">
            <Camera size={15} /> Add a photo{" "}
            <small>Optional · previewed in this demo</small>
            <input
              type="file"
              accept="image/*"
              onChange={(event) => {
                const file = event.target.files?.[0];
                setPostPhoto(file ? URL.createObjectURL(file) : "");
              }}
            />
          </label>
        </div>
        {postPhoto && (
          <img
            className="upload-preview"
            src={postPhoto}
            alt="Selected community update photo preview"
          />
        )}
        <Button
          className="button primary"
          type="submit"
          onClick={(event) => {
            if (!window.localStorage.getItem("found-cambodia-demo-user")) {
              event.preventDefault();
              setShowAuth(true);
            }
          }}
        >
          Share update <ArrowRight size={14} />
        </Button>
      </form>
      {showAuth && (
        <div
          className="modal-backdrop community-auth-backdrop"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) setShowAuth(false);
          }}
        >
          <section
            className="dialog community-auth-dialog"
            role="dialog"
            aria-modal="true"
            aria-labelledby="community-auth-title"
          >
            <button
              className="dialog-close"
              type="button"
              aria-label="Close sign in"
              onClick={() => setShowAuth(false)}
            >
              ×
            </button>
            <div className="dialog-icon">✦</div>
            <div className="eyebrow muted">JOIN YOUR COMMUNITY</div>
            <h2 id="community-auth-title">
              {authMode === "login" ? "Sign in to share" : "Create your account"}
            </h2>
            <p className="dialog-intro">
              Sign in first, then review and share your update with neighbors.
            </p>
            <form
              onSubmit={(event) => {
                event.preventDefault();
                const data = new FormData(event.currentTarget);
                const name = String(
                  data.get("name") || data.get("email") || "Community member",
                );
                window.localStorage.setItem("found-cambodia-demo-user", name);
                setShowAuth(false);
                notify(
                  "You’re signed in. Review your update and click Share update when it’s ready.",
                );
                window.setTimeout(() => {
                  document
                    .querySelector<HTMLButtonElement>(
                      ".community-share button[type=submit]",
                    )
                    ?.focus();
                }, 0);
              }}
            >
              {authMode === "register" && (
                <label>
                  Your name
                  <input name="name" autoComplete="name" required />
                </label>
              )}
              <label>
                Email address
                <input
                  name="email"
                  type="email"
                  autoComplete="email"
                  placeholder="you@example.com"
                  required
                />
              </label>
              <label>
                Password
                <input
                  name="password"
                  type="password"
                  autoComplete={authMode === "login" ? "current-password" : "new-password"}
                  minLength={6}
                  placeholder="At least 6 characters"
                  required
                />
              </label>
              <Button className="button primary full-button" type="submit">
                {authMode === "login" ? "Sign in and share" : "Create account and share"}
                <ArrowRight size={14} />
              </Button>
            </form>
            <button
              className="community-auth-switch"
              type="button"
              onClick={() =>
                setAuthMode((mode) => (mode === "login" ? "register" : "login"))
              }
            >
              {authMode === "login"
                ? "New here? Create an account"
                : "Already a member? Sign in"}
            </button>
            <p className="community-auth-demo">
              Demo mode: any valid email and password works. No data is sent to a server.
            </p>
          </section>
        </div>
      )}
      {communityPosts.length > 0 && (
        <div className="community-post-list">
          {communityPosts.map((post, i) => (
            <article
              className="module-panel notice-card"
              key={`${post.title}-${i}`}
            >
              <small>COMMUNITY UPDATE · JUST NOW</small>
              <h3>{post.title}</h3>
              <b>{post.place}</b>
              <p>{post.description}</p>
              {post.photo && (
                <img
                  className="report-photo"
                  src={post.photo}
                  alt={`Photo for ${post.title}`}
                />
              )}
            </article>
          ))}
        </div>
      )}
      {tab === "Services directory" && (
        <>
          <div className="service-controls">
            <label className="service-search">
              ⌕{" "}
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search services or locations"
              />
            </label>
            <select value={type} onChange={(e) => setType(e.target.value)}>
              {[
                "All services",
                "Hospital",
                "Clinic",
                "Police",
                "Government",
              ].map((x) => (
                <option key={x}>{x}</option>
              ))}
            </select>
          </div>
          <div className="service-grid">
            {list.map((s) => (
              <article className="module-panel service-card" key={s.name}>
                <div className="service-icon">{s.icon}</div>
                <div className="verified-badge">✓ VERIFIED DEMO</div>
                <h3>{s.name}</h3>
                <span className="service-type">{s.type}</span>
                <p>⌖ {s.place}</p>
                <p>◷ {s.hours}</p>
                <div className="service-actions">
                  <a href={`tel:${s.phone.replaceAll(" ", "")}`}>
                    ☎ &nbsp;{s.phone}
                  </a>
                  <button
                    onClick={() =>
                      notify(`Directions preview for ${s.name} (${s.place}).`)
                    }
                  >
                    Directions ↗
                  </button>
                </div>
                <small className="sample-disclaimer">
                  Sample directory entry · confirm details before visiting
                </small>
              </article>
            ))}
          </div>
        </>
      )}
      {tab === "Public notices" && (
        <div className="notice-grid">
          {[
            [
              "🌧️",
              "Heavy rain watch",
              "Phnom Penh · Chamkar Mon",
              "Water levels may rise near low-lying roads this evening. Avoid flooded underpasses.",
              "Today · 2:30 PM",
              "Safety",
            ],
            [
              "🚧",
              "Road works on Street 271",
              "Phnom Penh · Mean Chey",
              "One lane closed near the market through Friday. Follow the posted diversion.",
              "Today · 10:00 AM",
              "Roads",
            ],
            [
              "💧",
              "Water service maintenance",
              "Siem Reap · Svay Dangkum",
              "Some blocks may have lower water pressure until 4 PM during maintenance.",
              "Yesterday · 5:20 PM",
              "Utilities",
            ],
          ].map((n) => (
            <article className="module-panel notice-card" key={n[1]}>
              <div>
                <span>{n[0]}</span>
                <small>{n[5]} · OFFICIAL DEMO</small>
              </div>
              <h3>{n[1]}</h3>
              <b>{n[2]}</b>
              <p>{n[3]}</p>
              <time>{n[4]}</time>
            </article>
          ))}
        </div>
      )}
      {tab === "Volunteer board" && (
        <div className="volunteer-grid">
          {[
            [
              "Flood cleanup volunteers",
              "Phnom Penh · Tonlé Sap riverside",
              "Help distribute supplies and clear a community center after heavy rain.",
              "Saturday · 8:00 AM",
              "12 helpers needed",
              "🌱",
            ],
            [
              "Community meal delivery",
              "Battambang · Sangke district",
              "Deliver prepared meals to older neighbors who are unable to travel.",
              "Sunday · 10:00 AM",
              "5 helpers needed",
              "🥣",
            ],
            [
              "Neighborhood first aid session",
              "Siem Reap · Wat Bo",
              "A local clinic is hosting a free basic first-aid awareness session.",
              "Nov 29 · 3:00 PM",
              "Open to all",
              "🩹",
            ],
          ].map((v) => (
            <article className="module-panel volunteer-card" key={v[0]}>
              <span>{v[5]}</span>
              <small>COMMUNITY REQUEST · DEMO</small>
              <h3>{v[0]}</h3>
              <b>⌖ {v[1]}</b>
              <p>{v[2]}</p>
              <div>
                <span>◷ {v[3]}</span>
                <strong>{v[4]}</strong>
              </div>
              <button
                className="button primary"
                onClick={() => {
                  setJoined(!joined);
                  notify(
                    joined
                      ? "You left this volunteer list."
                      : "You’re on the volunteer interest list (demo). The organizer would contact you.",
                  );
                }}
              >
                {joined ? "Interested ✓" : "I can help"}
              </button>
            </article>
          ))}
        </div>
      )}
      {tab === "Community stories" && (
        <div className="story-grid">
          {[
            [
              "The wallet that made it home",
              "A neighbor found a wallet near Independence Monument. The owner proved it with a private detail, and they met at a busy café to return it.",
              "Malis · Phnom Penh",
              "👛",
            ],
            [
              "A street that shines again",
              "After neighbors added their votes to a broken streetlight report, the city crew replaced it the next afternoon.",
              "Dara · Siem Reap",
              "💡",
            ],
            [
              "A small act after the rain",
              "Local volunteers brought dry food and water to families while the riverside path was closed.",
              "Sophea · Kampot",
              "🌧️",
            ],
          ].map((s) => (
            <article className="module-panel story-card" key={s[0]}>
              <span>{s[3]}</span>
              <div>
                <small>COMMUNITY WIN · DEMO</small>
                <h3>{s[0]}</h3>
                <p>{s[1]}</p>
                <b>
                  {s[2]} <i>✓ helpful neighbor</i>
                </b>
              </div>
              <button
                aria-label="Report story"
                onClick={() =>
                  notify("Thanks. A moderator would review this demo story.")
                }
              >
                •••
              </button>
            </article>
          ))}
        </div>
      )}
      <div className="module-panel moderation-note">
        <span>🛡️</span>
        <div>
          <b>Keep this space helpful.</b>
          <p>
            Report suspicious posts or comments. Verified organization badges
            are shown on sample directory entries.
          </p>
        </div>
        <button
          onClick={() =>
            notify("Report received by the demo moderation queue.")
          }
        >
          Report content
        </button>
      </div>
    </div>
  );
}
