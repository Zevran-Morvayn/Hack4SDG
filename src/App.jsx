
import { useState } from "react";
import {
  MapContainer,
  TileLayer,
  Circle,
  CircleMarker,
  Popup,
  LayersControl,
} from "react-leaflet";
import { motion, AnimatePresence } from "motion/react";
import {
  Map as MapIcon,
  ShoppingBag,
  LogOut,
  ShieldCheck,
  UserRound,
  SlidersHorizontal,
  Droplets,
  Trees,
  Building2,
  Landmark,
  School,
  Bus,
  HeartPulse,
  Waves,
  ThermometerSun,
  Wind,
  AlertTriangle,
  MessageCircle,
  X,
  Send,
  Leaf,
  ArrowRight,
  CheckCircle2,
  Navigation,
  Activity,
  Info,
  Menu,
} from "lucide-react";
import "leaflet/dist/leaflet.css";
import "./App.css";

const CENTER = [13.0827, 80.2707];

const landPlots = [
  {
    id: "BN-101",
    name: "Greenfield Agricultural Plot",
    type: "Agricultural",
    soil: "Alluvial",
    water: 18,
    price: 1800000,
    area: "2,400 sq ft",
    position: [13.091, 80.252],
    restricted: false,
  },
  {
    id: "BN-102",
    name: "Metro Commercial Site",
    type: "Commercial",
    soil: "Clay",
    water: 11,
    price: 5200000,
    area: "1,800 sq ft",
    position: [13.067, 80.281],
    restricted: false,
  },
  {
    id: "BN-103",
    name: "Industrial Estate Parcel",
    type: "Industrial",
    soil: "Black cotton",
    water: 8,
    price: 7600000,
    area: "5,000 sq ft",
    position: [13.105, 80.294],
    restricted: false,
  },
  {
    id: "BN-104",
    name: "Government Buffer Zone",
    type: "Government",
    soil: "Sandy",
    water: 14,
    price: 2600000,
    area: "3,100 sq ft",
    position: [13.055, 80.248],
    restricted: true,
  },
  {
    id: "BN-105",
    name: "Lakeview Residential Plot",
    type: "Residential",
    soil: "Alluvial",
    water: 21,
    price: 3400000,
    area: "2,000 sq ft",
    position: [13.078, 80.305],
    restricted: false,
  },
  {
    id: "BN-106",
    name: "Peri-urban Farm Land",
    type: "Agricultural",
    soil: "Red soil",
    water: 7,
    price: 1250000,
    area: "4,500 sq ft",
    position: [13.119, 80.263],
    restricted: false,
  },
];

const amenities = [
  {
    name: "Central Bus Stop",
    kind: "Transit",
    position: [13.087, 80.268],
  },
  {
    name: "Community School",
    kind: "School",
    position: [13.074, 80.276],
  },
  {
    name: "People's Park",
    kind: "Park",
    position: [13.094, 80.284],
  },
  {
    name: "City Health Centre",
    kind: "Hospital",
    position: [13.064, 80.265],
  },
  {
    name: "Metro Station",
    kind: "Transit",
    position: [13.068, 80.289],
  },
  {
    name: "Greenway Park",
    kind: "Park",
    position: [13.105, 80.258],
  },
  {
    name: "Primary School",
    kind: "School",
    position: [13.101, 80.277],
  },
];

const riskZones = [
  {
    name: "Flood exposure",
    level: "High",
    color: "#ef4444",
    position: [13.071, 80.282],
    radius: 1050,
    detail:
      "Low-lying drainage screening zone. Verify official flood maps and site elevation.",
  },
  {
    name: "Heat stress",
    level: "Moderate",
    color: "#f59e0b",
    position: [13.094, 80.262],
    radius: 1250,
    detail:
      "Dense built-up area. Tree cover and cool-roof measures may reduce exposure.",
  },
  {
    name: "Drought / water stress",
    level: "High",
    color: "#8b5cf6",
    position: [13.111, 80.292],
    radius: 950,
    detail:
      "Seasonal water stress screening zone. Check local groundwater and rainfall records.",
  },
  {
    name: "Coastal / storm exposure",
    level: "Moderate",
    color: "#0ea5e9",
    position: [13.057, 80.303],
    radius: 1000,
    detail:
      "Storm and coastal influence screening zone. Not an official hazard boundary.",
  },
];

const landColors = {
  Commercial: "#f59e0b",
  Agricultural: "#22c55e",
  Government: "#8b5cf6",
  Industrial: "#64748b",
  Residential: "#06b6d4",
};

function money(value) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(value);
}

function MapBase({ children, zoom = 13 }) {
  return (
    <MapContainer
      center={CENTER}
      zoom={zoom}
      scrollWheelZoom
      className="leaflet-map"
    >
      <LayersControl position="topright">
        <LayersControl.BaseLayer checked name="Street map">
          <TileLayer
            attribution="&copy; OpenStreetMap contributors"
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
        </LayersControl.BaseLayer>

        <LayersControl.BaseLayer name="Humanitarian">
          <TileLayer
            attribution="&copy; OpenStreetMap contributors, HOT"
            url="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"
          />
        </LayersControl.BaseLayer>
      </LayersControl>

      {children}
    </MapContainer>
  );
}

function Login({ onLogin }) {
  const [role, setRole] = useState("Public");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  function submit(event) {
    event.preventDefault();

    if (!email.trim() || !password.trim()) {
      setError("Enter an email and password to continue.");
      return;
    }

    onLogin(role, email);
  }

  return (
    <main className="login-page">
      <motion.section
        className="login-art"
        initial={{ opacity: 0, x: -25 }}
        animate={{ opacity: 1, x: 0 }}
      >
        <div className="brand-mark">
          <Leaf size={22} /> BhuMiNet
        </div>

        <span className="eyebrow light">
          LAND INTELLIGENCE • BETTER DECISIONS
        </span>

        <h1>
          Make every parcel
          <br />
          <em>count.</em>
        </h1>

        <p>
          Explore land, understand environmental conditions, and make
          informed decisions with a connected geospatial workspace.
        </p>

        <div className="login-art-stats">
          <div>
            <strong>GIS</strong>
            <span>Map-led insights</span>
          </div>
          <div>
            <strong>360°</strong>
            <span>Land context</span>
          </div>
          <div>
            <strong>2 km</strong>
            <span>Amenities view</span>
          </div>
        </div>

        <div className="login-orbit orbit-one" />
        <div className="login-orbit orbit-two" />
      </motion.section>

      <motion.section
        className="login-card"
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.12 }}
      >
        <div className="login-icon">
          <ShieldCheck size={24} />
        </div>

        <h2>Welcome back</h2>
        <p className="muted">Sign in to your BhuMiNet workspace</p>

        <div className="role-toggle">
          <button
            className={role === "Public" ? "selected" : ""}
            onClick={() => setRole("Public")}
            type="button"
          >
            <UserRound size={17} /> Public user
          </button>

          <button
            className={role === "Policymaker" ? "selected" : ""}
            onClick={() => setRole("Policymaker")}
            type="button"
          >
            <Landmark size={17} /> Policymaker
          </button>
        </div>

        <form onSubmit={submit}>
          <label>
            Email address
            <input
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder="you@example.com"
            />
          </label>

          <label>
            Password
            <input
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              placeholder="Enter your password"
            />
          </label>

          {error && <p className="form-error">{error}</p>}

          <button className="primary-btn full" type="submit">
            Sign in as {role} <ArrowRight size={17} />
          </button>
        </form>

        <p className="login-note">
          <Info size={14} />
          Demo sign-in only. Connect an authentication service before
          production use.
        </p>
      </motion.section>
    </main>
  );
}

function GISPage() {
  const [landUse, setLandUse] = useState("All");
  const [soil, setSoil] = useState("All");
  const [water, setWater] = useState("All");
  const [showRestricted, setShowRestricted] = useState(true);
  const [selected, setSelected] = useState(null);

  const filtered = landPlots.filter(
    (plot) =>
      (landUse === "All" || plot.type === landUse) &&
      (soil === "All" || plot.soil === soil) &&
      (water === "All" ||
        (water === "High"
          ? plot.water >= 16
          : water === "Medium"
            ? plot.water >= 10 && plot.water < 16
            : plot.water < 10)) &&
      (showRestricted || !plot.restricted)
  );

  return (
    <div className="page-grid">
      <aside className="filter-panel">
        <div className="panel-heading">
          <SlidersHorizontal size={18} />
          <div>
            <h3>Map filters</h3>
            <p>Refine the land layers</p>
          </div>
        </div>

        <label>
          Land-use pattern
          <select
            value={landUse}
            onChange={(event) => setLandUse(event.target.value)}
          >
            {[
              "All",
              "Commercial",
              "Agricultural",
              "Government",
              "Industrial",
              "Residential",
            ].map((item) => (
              <option key={item}>{item}</option>
            ))}
          </select>
        </label>

        <label>
          Soil type
          <select
            value={soil}
            onChange={(event) => setSoil(event.target.value)}
          >
            {[
              "All",
              "Alluvial",
              "Clay",
              "Black cotton",
              "Sandy",
              "Red soil",
            ].map((item) => (
              <option key={item}>{item}</option>
            ))}
          </select>
        </label>

        <label>
          Groundwater level
          <select
            value={water}
            onChange={(event) => setWater(event.target.value)}
          >
            <option>All</option>
            <option>High</option>
            <option>Medium</option>
            <option>Low</option>
          </select>
        </label>

        <div className="filter-check">
          <span>
            <ShieldCheck size={16} /> Restricted areas
          </span>
          <input
            type="checkbox"
            checked={showRestricted}
            onChange={(event) => setShowRestricted(event.target.checked)}
          />
        </div>

        <div className="legend">
          <h4>Land-use legend</h4>

          {Object.entries(landColors).map(([name, color]) => (
            <div key={name}>
              <i style={{ background: color }} />
              {name}
            </div>
          ))}

          <div>
            <i className="legend-restricted" />
            Restricted / verify
          </div>
        </div>

        <button
          className="text-btn"
          onClick={() => {
            setLandUse("All");
            setSoil("All");
            setWater("All");
            setShowRestricted(true);
          }}
        >
          Reset filters
        </button>
      </aside>

      <section className="map-workspace">
        <div className="map-titlebar">
          <div>
            <span className="eyebrow">SPATIAL EXPLORER</span>
            <h2>Land intelligence map</h2>
            <p>Sample parcels around Chennai • choose a marker for details</p>
          </div>

          <span className="count-pill">
            {filtered.length} parcels shown
          </span>
        </div>

        <div className="map-frame">
          <MapBase>
            {filtered.map((plot) => (
              <CircleMarker
                key={plot.id}
                center={plot.position}
                radius={selected?.id === plot.id ? 11 : 8}
                pathOptions={{
                  color: plot.restricted
                    ? "#dc2626"
                    : landColors[plot.type],
                  fillColor: plot.restricted
                    ? "#dc2626"
                    : landColors[plot.type],
                  fillOpacity: 0.85,
                  weight: selected?.id === plot.id ? 4 : 2,
                }}
                eventHandlers={{
                  click: () => setSelected(plot),
                }}
              >
                <Popup>
                  <strong>{plot.name}</strong>
                  <br />
                  {plot.type} · {plot.soil}
                  <br />
                  Groundwater index: {plot.water}/25
                  <br />
                  {plot.restricted
                    ? "Restricted — verify official status"
                    : "Status: available in demo dataset"}
                </Popup>
              </CircleMarker>
            ))}
          </MapBase>
        </div>

        <div className="map-footnote">
          <Info size={15} />
          Soil, groundwater, land-use and restriction values are illustrative,
          not official cadastral or survey records.
        </div>

        {selected && (
          <div className="selected-detail">
            <button
              className="close-small"
              onClick={() => setSelected(null)}
            >
              <X size={15} />
            </button>

            <strong>{selected.name}</strong>
            <span>
              {selected.id} · {selected.area}
            </span>

            <div className="detail-chips">
              <b>{selected.type}</b>
              <b>{selected.soil} soil</b>
              <b>Water index {selected.water}/25</b>
            </div>
          </div>
        )}
      </section>
    </div>
  );
}

function BuyLandPage() {
  const [range, setRange] = useState([1000000, 8000000]);
  const [amenityFilter, setAmenityFilter] = useState("All");
  const [selected, setSelected] = useState(landPlots[0]);

  const available = landPlots.filter(
    (plot) =>
      !plot.restricted &&
      plot.price >= range[0] &&
      plot.price <= range[1]
  );

  const nearby = amenities.filter(
    (item) => amenityFilter === "All" || item.kind === amenityFilter
  );

  return (
    <div className="buy-layout">
      <aside className="filter-panel buy-filters">
        <div className="panel-heading">
          <ShoppingBag size={19} />
          <div>
            <h3>Find your land</h3>
            <p>Filter demo listings</p>
          </div>
        </div>

        <label>
          Minimum price <strong>{money(range[0])}</strong>
          <input
            type="range"
            min="500000"
            max="8000000"
            step="100000"
            value={range[0]}
            onChange={(event) =>
              setRange([
                Math.min(Number(event.target.value), range[1]),
                range[1],
              ])
            }
          />
        </label>

        <label>
          Maximum price <strong>{money(range[1])}</strong>
          <input
            type="range"
            min="500000"
            max="8000000"
            step="100000"
            value={range[1]}
            onChange={(event) =>
              setRange([
                range[0],
                Math.max(Number(event.target.value), range[0]),
              ])
            }
          />
        </label>

        <label>
          Nearby amenities
          <select
            value={amenityFilter}
            onChange={(event) => setAmenityFilter(event.target.value)}
          >
            {["All", "Transit", "School", "Park", "Hospital"].map((item) => (
              <option key={item}>{item}</option>
            ))}
          </select>
        </label>

        <div className="nearby-note">
          <Navigation size={16} />
          <span>
            <b>2 km radius</b>
            <br />
            Nearby points are sample locations; radius is illustrative.
          </span>
        </div>

        <div className="legend">
          <h4>Map legend</h4>
          <div><i style={{ background: "#0d9488" }} />Available land</div>
          <div><i style={{ background: "#2563eb" }} />Transit</div>
          <div><i style={{ background: "#f59e0b" }} />Schools & parks</div>
          <div><i style={{ background: "#ef4444" }} />Healthcare</div>
        </div>
      </aside>

      <section className="map-workspace">
        <div className="map-titlebar">
          <div>
            <span className="eyebrow">PROPERTY DISCOVERY</span>
            <h2>Buy land with confidence</h2>
            <p>Explore listed plots and nearby essentials</p>
          </div>

          <span className="count-pill">
            {available.length} available
          </span>
        </div>

        <div className="map-frame buy-map">
          <MapBase>
            {available.map((plot) => (
              <CircleMarker
                key={plot.id}
                center={plot.position}
                radius={selected?.id === plot.id ? 11 : 8}
                pathOptions={{
                  color: "#0d9488",
                  fillColor: "#14b8a6",
                  fillOpacity: 0.9,
                  weight: 3,
                }}
                eventHandlers={{
                  click: () => setSelected(plot),
                }}
              >
                <Popup>
                  <strong>{plot.name}</strong>
                  <br />
                  {money(plot.price)} · {plot.area}
                  <br />
                  {plot.soil} soil
                </Popup>
              </CircleMarker>
            ))}

            {nearby.map((item) => (
              <CircleMarker
                key={item.name}
                center={item.position}
                radius={6}
                pathOptions={{
                  color:
                    item.kind === "Hospital"
                      ? "#ef4444"
                      : item.kind === "Transit"
                        ? "#2563eb"
                        : "#f59e0b",
                  fillColor:
                    item.kind === "Hospital"
                      ? "#ef4444"
                      : item.kind === "Transit"
                        ? "#2563eb"
                        : "#f59e0b",
                  fillOpacity: 1,
                  weight: 2,
                }}
              >
                <Popup>
                  <strong>{item.name}</strong>
                  <br />
                  {item.kind} · sample amenity
                </Popup>
              </CircleMarker>
            ))}

            {selected && (
              <Circle
                center={selected.position}
                radius={2000}
                pathOptions={{
                  color: "#0d9488",
                  fillColor: "#14b8a6",
                  fillOpacity: 0.06,
                  dashArray: "7 6",
                }}
              />
            )}
          </MapBase>
        </div>

        <div className="map-footnote">
          <Info size={15} />
          Prices, availability and amenity locations are demonstration data.
          Confirm ownership, title, zoning and site conditions independently.
        </div>

        <div className="listing-section">
          <div className="listing-heading">
            <h3>Matching properties</h3>
            <span>{available.length} results</span>
          </div>

          {available.length ? (
            <div className="listing-grid">
              {available.map((plot) => (
                <button
                  className={`listing-card ${
                    selected?.id === plot.id ? "active" : ""
                  }`}
                  key={plot.id}
                  onClick={() => setSelected(plot)}
                >
                  <div className="listing-card-top">
                    <span className="available-dot">● Available</span>
                    <span>{plot.id}</span>
                  </div>

                  <h4>{plot.name}</h4>
                  <strong className="listing-price">
                    {money(plot.price)}
                  </strong>
                  <p>{plot.area} · {plot.type}</p>

                  <div className="listing-bottom">
                    <span>
                      <Droplets size={14} />
                      {plot.water}/25 water index
                    </span>
                    <span>
                      View on map <ArrowRight size={14} />
                    </span>
                  </div>
                </button>
              ))}
            </div>
          ) : (
            <div className="empty-state">
              No demo plots match that price range. Try widening the range.
            </div>
          )}
        </div>
      </section>
    </div>
  );
}

function ClimatePage() {
  const [activeRisk, setActiveRisk] = useState("All");

  const zones = riskZones.filter(
    (zone) => activeRisk === "All" || zone.name === activeRisk
  );

  return (
    <div className="climate-page">
      <div className="climate-header">
        <div>
          <span className="eyebrow">ENVIRONMENTAL INTELLIGENCE</span>
          <h2>Climate & environmental risk</h2>
          <p>
            Screening layers to support early planning—not a substitute for
            official hazard assessments.
          </p>
        </div>

        <div className="climate-stat">
          <Activity size={20} />
          <span>
            <b>4</b>
            <small>sample risk layers</small>
          </span>
        </div>
      </div>

      <div className="risk-summary">
        {riskZones.map((zone) => (
          <button
            key={zone.name}
            onClick={() =>
              setActiveRisk(activeRisk === zone.name ? "All" : zone.name)
            }
            className={`risk-card ${
              activeRisk === zone.name ? "risk-active" : ""
            }`}
          >
            <span
              className="risk-swatch"
              style={{ background: zone.color }}
            />
            <div>
              <small>{zone.level.toUpperCase()} EXPOSURE</small>
              <b>{zone.name}</b>
              <span>Tap to view on map</span>
            </div>
            <ArrowRight size={16} />
          </button>
        ))}
      </div>

      <div className="climate-map-layout">
        <div className="map-frame climate-map">
          <MapBase>
            {zones.map((zone) => (
              <Circle
                key={zone.name}
                center={zone.position}
                radius={zone.radius}
                pathOptions={{
                  color: zone.color,
                  fillColor: zone.color,
                  fillOpacity: 0.27,
                  weight: 2,
                }}
              >
                <Popup>
                  <strong>
                    {zone.name} — {zone.level}
                  </strong>
                  <br />
                  {zone.detail}
                </Popup>
              </Circle>
            ))}
          </MapBase>
        </div>

        <aside className="risk-details">
          <h3><Waves size={18} /> Map layers & guidance</h3>
          <p className="muted">
            Color indicates the demo screening category.
          </p>

          <div className="risk-legend">
            {riskZones.map((zone) => (
              <div key={zone.name}>
                <i style={{ background: zone.color }} />
                <span>{zone.name}</span>
                <b>{zone.level}</b>
              </div>
            ))}
          </div>

          <div className="risk-warning">
            <AlertTriangle size={18} />
            <div>
              <b>Important data note</b>
              <p>
                Colored circles are illustrative screening zones, not
                measured forecasts or official flood, drought, heat, or
                coastal hazard boundaries.
              </p>
            </div>
          </div>
        </aside>
      </div>

      <div className="climate-guidance-grid">
        {riskZones.map((zone) => (
          <article key={zone.name} className="guidance-card">
            <div
              className="guidance-icon"
              style={{
                color: zone.color,
                background: `${zone.color}18`,
              }}
            >
              {zone.name.includes("Flood") ? (
                <Waves />
              ) : zone.name.includes("Heat") ? (
                <ThermometerSun />
              ) : zone.name.includes("Drought") ? (
                <Droplets />
              ) : (
                <Wind />
              )}
            </div>

            <span className="risk-label" style={{ color: zone.color }}>
              {zone.level} screening
            </span>
            <h3>{zone.name}</h3>
            <p>{zone.detail}</p>
            <small>Recommended: verify against official local datasets.</small>
          </article>
        ))}
      </div>
    </div>
  );
}

function HomePage({ setPage, role }) {
  const features = [
    {
      name: "GIS Explorer",
      desc: "Filter land use, soil, groundwater and restricted areas.",
      icon: MapIcon,
      color: "teal",
    },
    {
      name: "Buy Land",
      desc: "Browse demo listings, adjust price and inspect nearby amenities.",
      icon: ShoppingBag,
      color: "orange",
    },
    {
      name: "Climate Risk",
      desc: "Explore color-coded environmental screening layers.",
      icon: Waves,
      color: "purple",
    },
    {
      name: "Repository",
      desc: "Review land records and reference information.",
      icon: Building2,
      color: "blue",
    },
    {
      name: "Scheme Finder",
      desc: "Explore sample public programmes and eligibility guidance.",
      icon: Landmark,
      color: "green",
    },
    {
      name: role === "Public" ? "AI Assistant" : "Policy Monitoring",
      desc: "Get guided help and review planning indicators.",
      icon: Activity,
      color: "pink",
    },
  ];

  return (
    <div className="home-page">
      <section className="hero">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <span className="eyebrow light">
            SMART LAND • SUSTAINABLE FUTURES
          </span>
          <h1>
            Land decisions,
            <br />
            <em>grounded in data.</em>
          </h1>
          <p>
            Explore land-use patterns, compare available properties, and
            understand environmental context in one connected workspace.
          </p>

          <div className="hero-actions">
            <button
              className="primary-btn"
              onClick={() => setPage("GIS Explorer")}
            >
              Explore GIS map <ArrowRight size={17} />
            </button>

            <button
              className="secondary-btn"
              onClick={() =>
                setPage(role === "Public" ? "Buy Land" : "Policy Monitoring")
              }
            >
              {role === "Public" ? "Find land" : "Policy workspace"}
            </button>
          </div>
        </motion.div>

        <motion.div
          className="hero-visual"
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.15 }}
        >
          <div className="visual-card">
            <div className="visual-card-head">
              <span><MapIcon size={17} /> LAND OVERVIEW</span>
              <span className="live-dot">DEMO</span>
            </div>

            <div className="visual-map">
              <div className="map-river" />
              <div className="plot plot-a" />
              <div className="plot plot-b" />
              <div className="plot plot-c" />
              <div className="plot plot-d" />
              <span className="map-pin pin-a" />
              <span className="map-pin pin-b" />
              <span className="map-pin pin-c" />
            </div>

            <div className="visual-stats">
              <div>
                <small>LAND LAYERS</small>
                <b>5 categories</b>
              </div>
              <div>
                <small>MAP CONTEXT</small>
                <b>Live pan & zoom</b>
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      <section className="feature-section">
        <div className="section-intro">
          <span className="eyebrow">YOUR WORKSPACE</span>
          <h2>From map to meaningful action.</h2>
          <p>Choose a tool to get started.</p>
        </div>

        <div className="feature-grid">
          {features.map((feature, index) => {
            const Icon = feature.icon;

            return (
              <motion.button
                key={feature.name}
                className="feature-card"
                onClick={() => setPage(feature.name)}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.06 }}
                whileHover={{ y: -5 }}
              >
                <span className={`feature-icon ${feature.color}`}>
                  <Icon size={22} />
                </span>
                <h3>{feature.name}</h3>
                <p>{feature.desc}</p>
                <span className="feature-link">
                  Open tool <ArrowRight size={15} />
                </span>
              </motion.button>
            );
          })}
        </div>
      </section>
    </div>
  );
}

function SellLandPage() {
  const [form, setForm] = useState({
    name: "",
    location: "",
    type: "Agricultural",
    area: "",
    price: "",
    contact: "",
  });
  const [saved, setSaved] = useState(false);

  function update(key, value) {
    setForm((old) => ({ ...old, [key]: value }));
    setSaved(false);
  }

  function submit(event) {
    event.preventDefault();

    const listing = {
      ...form,
      id: `DEMO-${Date.now()}`,
      createdAt: new Date().toISOString(),
    };

    const existing = JSON.parse(
      localStorage.getItem("bhuminet-land-listings") || "[]"
    );

    localStorage.setItem(
      "bhuminet-land-listings",
      JSON.stringify([listing, ...existing])
    );

    setSaved(true);
  }

  return (
    <div className="generic-page">
      <div className="generic-hero">
        <span className="eyebrow">PROPERTY MARKETPLACE</span>
        <h2>Sell available land</h2>
        <p>
          Add a demo listing with basic parcel details. It is saved only in
          this browser and is not publicly published.
        </p>
      </div>

      <form className="sell-form" onSubmit={submit}>
        <div className="sell-form-heading">
          <h3>Land listing details</h3>
          <p>Fields marked required must be completed.</p>
        </div>

        <div className="sell-fields">
          <label>
            Property / owner label *
            <input
              required
              value={form.name}
              onChange={(event) => update("name", event.target.value)}
              placeholder="e.g. Greenfield plot"
            />
          </label>

          <label>
            Location / address *
            <input
              required
              value={form.location}
              onChange={(event) => update("location", event.target.value)}
              placeholder="Area, city"
            />
          </label>

          <label>
            Land-use type
            <select
              value={form.type}
              onChange={(event) => update("type", event.target.value)}
            >
              {[
                "Agricultural",
                "Commercial",
                "Industrial",
                "Residential",
                "Government",
              ].map((item) => (
                <option key={item}>{item}</option>
              ))}
            </select>
          </label>

          <label>
            Area *
            <input
              required
              value={form.area}
              onChange={(event) => update("area", event.target.value)}
              placeholder="e.g. 2400 sq ft"
            />
          </label>

          <label>
            Expected price (₹) *
            <input
              required
              type="number"
              min="1"
              value={form.price}
              onChange={(event) => update("price", event.target.value)}
              placeholder="e.g. 1800000"
            />
          </label>

          <label>
            Contact details *
            <input
              required
              value={form.contact}
              onChange={(event) => update("contact", event.target.value)}
              placeholder="Email or phone"
            />
          </label>
        </div>

        <div className="sell-form-bottom">
          <p>
            <Info size={15} />
            Demo only. Do not enter sensitive personal information.
          </p>

          <button className="primary-btn" type="submit">
            Save demo listing <ArrowRight size={16} />
          </button>
        </div>

        {saved && (
          <p className="saved-message">
            <CheckCircle2 size={17} />
            Listing saved in this browser only.
          </p>
        )}
      </form>
    </div>
  );
}

function WhatIfPage() {
  const [green, setGreen] = useState(25);
  const [density, setDensity] = useState(55);
  const [transit, setTransit] = useState(40);

  const heat = Math.max(
    12,
    Math.round(82 - green * 0.55 + density * 0.18)
  );

  const runoff = Math.max(
    10,
    Math.round(18 + density * 0.72 - green * 0.32)
  );

  const access = Math.min(98, Math.round(25 + transit * 0.7));

  return (
    <div className="generic-page">
      <div className="generic-hero">
        <span className="eyebrow">PLANNING SCENARIO LAB</span>
        <h2>What-if simulator</h2>
        <p>
          Adjust planning assumptions and compare illustrative indicators.
          These are not calibrated forecasts.
        </p>
      </div>

      <div className="scenario-layout">
        <aside className="scenario-controls">
          <h3><SlidersHorizontal size={18} /> Scenario controls</h3>

          <label>
            Green cover <b>{green}%</b>
            <input
              type="range"
              min="0"
              max="80"
              value={green}
              onChange={(event) => setGreen(Number(event.target.value))}
            />
          </label>

          <label>
            Development intensity <b>{density}%</b>
            <input
              type="range"
              min="0"
              max="100"
              value={density}
              onChange={(event) => setDensity(Number(event.target.value))}
            />
          </label>

          <label>
            Transit investment <b>{transit}%</b>
            <input
              type="range"
              min="0"
              max="100"
              value={transit}
              onChange={(event) => setTransit(Number(event.target.value))}
            />
          </label>
        </aside>

        <section className="scenario-results">
          <h3>Predicted indicator snapshots</h3>
          <p className="muted">
            Scroll through the indicators and planning notes below.
          </p>

          <div className="scenario-metrics">
            <article>
              <span>Heat pressure index</span>
              <strong>{heat}/100</strong>
              <div className="metric-track">
                <i style={{ width: `${heat}%`, background: "#f59e0b" }} />
              </div>
              <small>Lower is better · illustrative</small>
            </article>

            <article>
              <span>Runoff pressure index</span>
              <strong>{runoff}/100</strong>
              <div className="metric-track">
                <i style={{ width: `${runoff}%`, background: "#0ea5e9" }} />
              </div>
              <small>Lower is better · illustrative</small>
            </article>

            <article>
              <span>Transit access index</span>
              <strong>{access}/100</strong>
              <div className="metric-track">
                <i style={{ width: `${access}%`, background: "#10b981" }} />
              </div>
              <small>Higher is better · illustrative</small>
            </article>
          </div>

          <div className="scenario-scroll">
            <article>
              <h4>01 · Green cover scenario</h4>
              <p>
                {green >= 45
                  ? "Higher green cover in this demo scenario is associated with a lower heat-pressure indicator."
                  : "Try increasing green cover to explore a lower illustrative heat-pressure indicator."}
                {" "}Consider tree canopy, parks, permeable surfaces and long-term maintenance.
              </p>
            </article>

            <article>
              <h4>02 · Development intensity</h4>
              <p>
                {density >= 65
                  ? "High development intensity raises the demo runoff-pressure indicator."
                  : "Moderate development intensity leaves more room for drainage and open-space planning in this simplified model."}
                {" "}Validate with drainage, soil and local planning data.
              </p>
            </article>

            <article>
              <h4>03 · Transit investment</h4>
              <p>
                {transit >= 55
                  ? "Higher transit investment improves the illustrative access score."
                  : "Increase transit investment to explore improved access in this simplified model."}
                {" "}Real outcomes depend on route coverage, service frequency and safe walking access.
              </p>
            </article>
          </div>
        </section>
      </div>
    </div>
  );
}

function GenericPage({ title, setPage }) {
  const content = {
    Repository: [
      "Land records & reference library",
      "Browse sample records, dataset notes and verification guidance.",
      [
        "Parcel index and ownership checklist",
        "Zoning and land-use reference layers",
        "Survey documents and data provenance",
      ],
    ],
    "Scheme Finder": [
      "Programmes for communities and landholders",
      "A demo guide to discovering schemes and preparing an application.",
      [
        "Agricultural support and irrigation programmes",
        "Rural infrastructure and connectivity",
        "Housing and land-development support",
      ],
    ],
    "Market Trends": [
      "Market pulse",
      "Illustrative indicators only; replace with verified market data for decisions.",
      [
        "Demand varies by location and access",
        "Compare recent registered transactions",
        "Check title, zoning and infrastructure before purchase",
      ],
    ],
    "Policy Monitoring": [
      "Policy monitoring workspace",
      "Sample indicators for reviewing land programmes and planning outcomes.",
      [
        "Land-use compliance review",
        "Infrastructure access coverage",
        "Environmental screening follow-up",
      ],
    ],
    "AI Assistant": [
      "BhuMiNet guided help",
      "Use the floating chat button in the bottom-right corner to ask about the demo workspace.",
      [
        "How to interpret GIS filters",
        "What to verify before buying land",
        "Where to find official environmental datasets",
      ],
    ],
  };

  const data = content[title] || [
    title,
    "Explore tools and information for your land-planning workflow.",
    [
      "Review related data",
      "Compare location context",
      "Verify important details with official sources",
    ],
  ];

  return (
    <div className="generic-page">
      <div className="generic-hero">
        <span className="eyebrow">BHUMINET WORKSPACE</span>
        <h2>{data[0]}</h2>
        <p>{data[1]}</p>

        <button
          className="primary-btn"
          onClick={() => setPage("Home")}
        >
          Back to dashboard <ArrowRight size={16} />
        </button>
      </div>

      <div className="generic-cards">
        {data[2].map((item, index) => (
          <article key={item}>
            <span className="generic-number">0{index + 1}</span>
            <h3>{item}</h3>
            <p>
              Use this checklist as a starting point; connect verified
              records and service integrations for production workflows.
            </p>
          </article>
        ))}
      </div>
    </div>
  );
}

function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("");
  const [messages, setMessages] = useState([
    {
      from: "bot",
      text: "Hi! I’m the BhuMiNet demo assistant. Ask me about GIS filters, buying land, or climate layers.",
    },
  ]);

  function send(event) {
    event.preventDefault();

    if (!value.trim()) return;

    const question = value.trim();

    setMessages((old) => [
      ...old,
      { from: "user", text: question },
      {
        from: "bot",
        text: "I can guide you through the prototype. Please verify property, soil, groundwater and hazard information with official sources before making a decision.",
      },
    ]);

    setValue("");
  }

  return (
    <div className="chat-widget">
      {open && (
        <motion.div
          className="chat-window"
          initial={{ opacity: 0, y: 15, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
        >
          <div className="chat-head">
            <span className="chat-avatar">
              <MessageCircle size={17} />
            </span>

            <div>
              <b>BhuMiNet assistant</b>
              <small>Demo guidance · not live AI</small>
            </div>

            <button onClick={() => setOpen(false)} aria-label="Close chat">
              <X size={18} />
            </button>
          </div>

          <div className="chat-messages">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`chat-bubble ${message.from}`}
              >
                {message.text}
              </div>
            ))}
          </div>

          <form className="chat-input" onSubmit={send}>
            <input
              value={value}
              onChange={(event) => setValue(event.target.value)}
              placeholder="Ask about land or maps…"
            />
            <button type="submit" aria-label="Send message">
              <Send size={17} />
            </button>
          </form>
        </motion.div>
      )}

      <button
        className="chat-launcher"
        onClick={() => setOpen(!open)}
        aria-label={open ? "Close assistant" : "Open assistant"}
      >
        {open ? <X size={23} /> : <MessageCircle size={23} />}
        <span>{open ? "Close" : "Ask BhuMiNet"}</span>
      </button>
    </div>
  );
}

export default function App() {
  const [user, setUser] = useState(null);
  const [page, setPage] = useState("Home");
  const [mobileMenu, setMobileMenu] = useState(false);

  const nav =
    user?.role === "Policymaker"
      ? [
          "Home",
          "Repository",
          "What-If Simulator",
          "GIS Explorer",
          "Policy Monitoring",
          "AI Assistant",
        ]
      : [
          "Home",
          "Repository",
          "GIS Explorer",
          "Sell Available Land",
          "Buy Land",
          "Climate Risk",
          "Scheme Finder",
          "Market Trends",
          "AI Assistant",
        ];

  const pageTitle =
    page === "Climate & Environmental Risk" ? "Climate Risk" : page;

  function renderPage() {
    if (pageTitle === "Home") {
      return <HomePage setPage={setPage} role={user.role} />;
    }

    if (pageTitle === "GIS Explorer") return <GISPage />;
    if (pageTitle === "Buy Land") return <BuyLandPage />;
    if (pageTitle === "Sell Available Land") return <SellLandPage />;
    if (pageTitle === "What-If Simulator") return <WhatIfPage />;
    if (pageTitle === "Climate Risk") return <ClimatePage />;

    return <GenericPage title={pageTitle} setPage={setPage} />;
  }

  if (!user) {
    return (
      <Login
        onLogin={(role, email) => {
          setUser({ role, email });
          setPage("Home");
        }}
      />
    );
  }

  return (
    <div className="app-shell">
      <header className="topbar">
        <button className="brand" onClick={() => setPage("Home")}>
          <span className="brand-symbol">
            <Leaf size={20} />
          </span>
          <span>
            BhuMiNet
            <small>LAND INTELLIGENCE</small>
          </span>
        </button>

        <button
          className="mobile-menu-btn"
          onClick={() => setMobileMenu(!mobileMenu)}
        >
          <Menu size={20} />
        </button>

        <nav className={mobileMenu ? "nav-links nav-open" : "nav-links"}>
          {nav.map((item) => (
            <button
              key={item}
              className={pageTitle === item ? "nav-active" : ""}
              onClick={() => {
                setPage(item);
                setMobileMenu(false);
              }}
            >
              {item}
            </button>
          ))}
        </nav>

        <div className="account-area">
          <span className="role-chip">
            {user.role === "Public" ? (
              <UserRound size={14} />
            ) : (
              <Landmark size={14} />
            )}
            {user.role}
          </span>

          <button
            className="logout-btn"
            title="Sign out"
            onClick={() => setUser(null)}
          >
            <LogOut size={17} />
          </button>
        </div>
      </header>

      <main className="main-content">
        <AnimatePresence mode="wait">
          <motion.div
            key={pageTitle}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -7 }}
            transition={{ duration: 0.2 }}
          >
            {renderPage()}
          </motion.div>
        </AnimatePresence>
      </main>

      <footer className="site-footer">
        <span>© 2026 BhuMiNet · Land intelligence for better decisions</span>
        <span>Prototype data · Verify official records</span>
      </footer>

      <ChatWidget />
    </div>
  );
}
