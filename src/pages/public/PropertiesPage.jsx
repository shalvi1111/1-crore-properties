import React, { useState, useMemo } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import { 
  PROPERTY_CATEGORIES, 
  CITIES, 
  BUDGET_RANGES, 
  BHK_OPTIONS 
} from '../../data/properties';
import { 
  Search, 
  RotateCcw, 
  Heart, 
  Scale, 
  MapPin, 
  SlidersHorizontal, 
  Grid, 
  List, 
  Map as MapIcon, 
  Video, 
  Eye, 
  Compass, 
  ShieldCheck, 
  CheckCircle2, 
  BadgeCheck,
  Building,
  Building2,
  Home,
  Trees,
  Sprout,
  Briefcase,
  Bed,
  Bath,
  Maximize2
} from 'lucide-react';

const PropertiesPage = () => {
  const { properties, wishlist, toggleWishlist, compareList, toggleCompare, showToast } = useApp();
  const [searchParams] = useSearchParams();

  // Search & Filters State
  const [searchTerm, setSearchTerm] = useState(searchParams.get('search') || '');
  const [selectedCity, setSelectedCity] = useState(searchParams.get('city') || 'All Cities');
  const [selectedCategory, setSelectedCategory] = useState(searchParams.get('cat') || 'all');
  const [selectedBudget, setSelectedBudget] = useState('₹1 Cr - ₹1.99 Cr');
  const [selectedBhk, setSelectedBhk] = useState('All BHK');
  const [sortBy, setSortBy] = useState('relevant');
  const [viewMode, setViewMode] = useState('grid'); // 'grid' | 'list'
  const [showMap, setShowMap] = useState(true);

  // Filtered & Sorted Properties
  const filteredProperties = useMemo(() => {
    return properties.filter(prop => {
      // Search Term
      if (searchTerm) {
        const query = searchTerm.toLowerCase();
        const matchesTitle = prop.title.toLowerCase().includes(query);
        const matchesLoc = prop.location.toLowerCase().includes(query);
        const matchesCity = prop.city.toLowerCase().includes(query);
        const matchesBuilder = prop.builder?.name.toLowerCase().includes(query);
        if (!matchesTitle && !matchesLoc && !matchesCity && !matchesBuilder) return false;
      }

      // City
      if (selectedCity !== 'All Cities' && prop.city !== selectedCity) {
        return false;
      }

      // Category
      if (selectedCategory !== 'all') {
        if (selectedCategory === 'apartments' && prop.type !== 'Apartment') return false;
        if (selectedCategory === 'villas' && prop.type !== 'Villa') return false;
        if (selectedCategory === 'independent-homes' && prop.type !== 'Independent Home') return false;
        if (selectedCategory === 'open-plots' && prop.type !== 'Open Plot') return false;
        if (selectedCategory === 'commercial' && prop.type !== 'Commercial Space') return false;
      }

      // BHK
      if (selectedBhk !== 'All BHK') {
        if (!prop.bhk?.includes(selectedBhk.replace(' BHK', ''))) return false;
      }

      return true;
    }).sort((a, b) => {
      if (sortBy === 'price-low') return a.price - b.price;
      if (sortBy === 'price-high') return b.price - a.price;
      if (sortBy === 'appreciation') return (b.appreciation || 0) - (a.appreciation || 0);
      return 0; // Default relevant
    });
  }, [properties, searchTerm, selectedCity, selectedCategory, selectedBhk, sortBy]);

  const handleReset = () => {
    setSearchTerm('');
    setSelectedCity('All Cities');
    setSelectedCategory('all');
    setSelectedBudget('₹1 Cr - ₹1.99 Cr');
    setSelectedBhk('All BHK');
    setSortBy('relevant');
    showToast("Filters reset to default view");
  };

  return (
    <div className="property-discovery-page">
      
      {/* 1. SEARCH & FILTER CARD (Screenshot 4.1) */}
      <div className="search-filter-card">
        <div className="search-input-main">
          <Search className="search-icon w-4 h-4" />
          <input 
            type="text" 
            placeholder="Search by property name, location or builder..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <select 
          className="filter-dropdown-select" 
          value={selectedCity} 
          onChange={(e) => setSelectedCity(e.target.value)}
        >
          {CITIES.map(c => <option key={c} value={c}>{c}</option>)}
        </select>

        <select 
          className="filter-dropdown-select" 
          value={selectedCategory} 
          onChange={(e) => setSelectedCategory(e.target.value)}
        >
          <option value="all">All Types</option>
          <option value="apartments">Apartments</option>
          <option value="villas">Villas</option>
          <option value="independent-homes">Independent Homes</option>
          <option value="open-plots">Open Plots</option>
          <option value="commercial">Commercial</option>
        </select>

        <select 
          className="filter-dropdown-select" 
          value={selectedBudget} 
          onChange={(e) => setSelectedBudget(e.target.value)}
        >
          {BUDGET_RANGES.map(b => <option key={b} value={b}>{b}</option>)}
        </select>

        <select 
          className="filter-dropdown-select" 
          value={selectedBhk} 
          onChange={(e) => setSelectedBhk(e.target.value)}
        >
          {BHK_OPTIONS.map(b => <option key={b} value={b}>{b}</option>)}
        </select>

        <button 
          type="button"
          onClick={() => showToast(`Search applied. Found ${filteredProperties.length} verified listings.`)}
          className="btn-gold" 
          style={{ height: '44px', padding: '0 1.5rem' }}
        >
          <Search className="w-4 h-4 mr-1" />
          <span>Search</span>
        </button>

        <button 
          type="button" 
          onClick={handleReset}
          className="btn-outline" 
          style={{ height: '44px', padding: '0 1rem' }}
        >
          <RotateCcw className="w-4 h-4 mr-1" />
          <span>Reset</span>
        </button>
      </div>

      {/* 2. CATEGORY NAVIGATION CARDS (Screenshot 4.1) */}
      <div className="category-nav-grid">
        {PROPERTY_CATEGORIES.map(cat => {
          const isActive = selectedCategory === cat.id;
          const renderCategoryIcon = () => {
            switch (cat.id) {
              case 'all': return <Home className="w-5 h-5 text-amber-600" />;
              case 'apartments': return <Building2 className="w-5 h-5 text-blue-600" />;
              case 'villas': return <Building className="w-5 h-5 text-emerald-600" />;
              case 'independent-homes': return <Home className="w-5 h-5 text-orange-600" />;
              case 'open-plots': return <Trees className="w-5 h-5 text-emerald-500" />;
              case 'farm-lands': return <Sprout className="w-5 h-5 text-green-600" />;
              case 'commercial': return <Briefcase className="w-5 h-5 text-indigo-600" />;
              default: return <Compass className="w-5 h-5 text-amber-600" />;
            }
          };

          return (
            <div 
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`category-nav-card ${isActive ? 'active' : ''}`}
            >
              <div className="category-icon-wrap">
                {renderCategoryIcon()}
              </div>
              <div>
                <div className="category-name">{cat.label}</div>
                <div className="category-count">{cat.count}</div>
              </div>
            </div>
          );
        })}
      </div>

      {/* 3. RESULTS HEADER BAR */}
      <div className="results-header-bar">
        <div>
          <h2 className="results-count-title">
            {filteredProperties.length.toLocaleString()} Properties Found
            <span>Showing properties under ₹1.99 Cr</span>
          </h2>
        </div>

        <div className="results-controls">
          <div className="flex items-center gap-2">
            <span style={{ fontSize: '0.85rem', color: '#64748B', fontWeight: 600 }}>Sort by:</span>
            <select 
              value={sortBy} 
              onChange={(e) => setSortBy(e.target.value)}
              style={{ width: '160px', height: '38px', padding: '0 0.5rem' }}
            >
              <option value="relevant">Most Relevant</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="appreciation">Highest Appreciation</option>
            </select>
          </div>

          {/* View Toggles */}
          <div className="flex items-center gap-1">
            <button 
              type="button" 
              onClick={() => setViewMode('grid')}
              className={`view-toggle-btn ${viewMode === 'grid' ? 'active' : ''}`}
              title="Grid View"
            >
              <Grid className="w-4 h-4" />
            </button>
            <button 
              type="button" 
              onClick={() => setViewMode('list')}
              className={`view-toggle-btn ${viewMode === 'list' ? 'active' : ''}`}
              title="List View"
            >
              <List className="w-4 h-4" />
            </button>
          </div>

          {/* Map View Toggle */}
          <button 
            type="button"
            onClick={() => setShowMap(!showMap)}
            className="btn-outline" 
            style={{ height: '38px', padding: '0 0.85rem', fontSize: '0.8rem', gap: '0.4rem' }}
          >
            <MapIcon className="w-4 h-4 text-amber-600" />
            <span>{showMap ? "Hide Map" : "Show Map View"}</span>
          </button>
        </div>
      </div>

      {/* 4. MAIN DISCOVERY GRID (Listings + Side Map Panel) */}
      <div className="discovery-layout-grid" style={{ gridTemplateColumns: showMap ? '1fr 380px' : '1fr' }}>
        
        {/* Left Listings Column */}
        <div className={`discovery-props-grid ${viewMode === 'list' ? 'list-view' : ''}`}>
          {filteredProperties.map(prop => {
            const isWishlisted = wishlist.includes(prop.id);
            const isCompared = compareList.includes(prop.id);

            return (
              <div key={prop.id} className="prop-listing-card">
                {/* Image Box */}
                <div className="prop-listing-img-box">
                  <img src={prop.image} alt={prop.title} />

                  {/* Badge */}
                  {prop.tag && (
                    <span className={`badge ${
                      prop.tag === 'FEATURED' ? 'badge-featured' : 
                      prop.tag === 'PREMIUM' ? 'badge-premium' : 
                      prop.tag === 'HOT DEAL' ? 'badge-hot' : 'badge-new'
                    } buyer-card-badge`}>
                      {prop.tag}
                    </span>
                  )}

                  {/* Action Icons */}
                  <div style={{ position: 'absolute', top: '1rem', right: '1rem', display: 'flex', gap: '0.4rem', zIndex: 3 }}>
                    <button 
                      type="button"
                      onClick={() => toggleWishlist(prop.id)}
                      className={`buyer-card-heart ${isWishlisted ? 'active' : ''}`}
                      title={isWishlisted ? "Remove from Wishlist" : "Add to Wishlist"}
                      style={{ position: 'static' }}
                    >
                      <Heart className="w-4 h-4" fill={isWishlisted ? '#ef4444' : 'none'} />
                    </button>

                    <button 
                      type="button"
                      onClick={() => toggleCompare(prop.id)}
                      className="buyer-card-heart"
                      title={isCompared ? "Remove from Compare" : "Add to Compare"}
                      style={{ position: 'static', color: isCompared ? '#C58A2A' : '#64748B' }}
                    >
                      <Scale className="w-4 h-4" />
                    </button>
                  </div>

                  {/* Media Tags */}
                  <div className="prop-media-tags">
                    {prop.mediaTags?.map((tag, idx) => (
                      <span key={idx} className="prop-media-pill">
                        {tag.includes('Video') ? <Video className="w-3 h-3" /> : <Eye className="w-3 h-3" />}
                        <span>{tag}</span>
                      </span>
                    ))}
                  </div>
                </div>

                {/* Body Details */}
                <div className="prop-listing-body">
                  <div className="prop-type-badge">{prop.type}</div>
                  <h3 className="prop-listing-title" title={prop.title}>
                    <Link to={`/property/${prop.id}`}>{prop.title}</Link>
                  </h3>

                  <div className="prop-listing-loc">
                    <MapPin className="w-3.5 h-3.5 text-slate-400" />
                    <span>{prop.location}</span>
                  </div>

                  <div className="prop-specs-row" style={{ display: 'flex', alignItems: 'center', gap: '1rem', color: '#64748B', fontSize: '0.8rem' }}>
                    {prop.beds > 0 && (
                      <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                        <Bed className="w-3.5 h-3.5 text-slate-400" />
                        <span><strong>{prop.beds}</strong> Beds</span>
                      </span>
                    )}
                    {prop.baths > 0 && (
                      <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                        <Bath className="w-3.5 h-3.5 text-slate-400" />
                        <span><strong>{prop.baths}</strong> Baths</span>
                      </span>
                    )}
                    <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                      <Maximize2 className="w-3.5 h-3.5 text-slate-400" />
                      <span><strong>{prop.area}</strong> sq.ft</span>
                    </span>
                  </div>

                  <div className="prop-price-row">
                    <div>
                      <div className="prop-price-val">{prop.priceStr}</div>
                      <div className="prop-price-sqft">{prop.pricePerSqFt}</div>
                    </div>

                    <Link to={`/property/${prop.id}`} className="btn-gold" style={{ padding: '0.55rem 1.15rem', fontSize: '0.85rem' }}>
                      View Details
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Right Side Panel: Interactive Map & Market Distribution */}
        {showMap && (
          <div className="discovery-side-panel">
            
            {/* Interactive Map Box */}
            <div className="interactive-map-card">
              <div className="map-view-canvas">
                <div style={{ position: 'absolute', top: '1rem', left: '1rem', background: '#fff', padding: '0.25rem 0.65rem', borderRadius: '6px', fontSize: '0.75rem', fontWeight: 800, boxShadow: '0 2px 5px rgba(0,0,0,0.1)' }}>
                  {selectedCity === 'All Cities' ? 'Bangalore / Hyderabad' : selectedCity}
                </div>

                {/* Interactive Price Markers */}
                <div 
                  className="map-price-marker" 
                  style={{ top: '25%', left: '20%' }}
                  onClick={() => showToast("Property selected: Skyline Heights ₹1.45 Cr")}
                >
                  <MapPin className="w-3 h-3 fill-current" />
                  <span>₹1.45 Cr</span>
                </div>

                <div 
                  className="map-price-marker" 
                  style={{ top: '35%', right: '25%', background: '#071A33' }}
                  onClick={() => showToast("Property selected: Commercial Office Space ₹1.95 Cr")}
                >
                  <MapPin className="w-3 h-3 fill-current" />
                  <span>₹1.95 Cr</span>
                </div>

                <div 
                  className="map-price-marker" 
                  style={{ top: '65%', left: '35%' }}
                  onClick={() => showToast("Property selected: Premium Sky Tower ₹1.55 Cr")}
                >
                  <MapPin className="w-3 h-3 fill-current" />
                  <span>₹1.55 Cr</span>
                </div>

                <div 
                  className="map-price-marker" 
                  style={{ bottom: '20%', right: '20%' }}
                  onClick={() => showToast("Property selected: Luxury Villa Greens ₹1.89 Cr")}
                >
                  <MapPin className="w-3 h-3 fill-current" />
                  <span>₹1.89 Cr</span>
                </div>
              </div>
            </div>

            {/* Current Search Summary */}
            <div style={{ background: '#fff', border: '1px solid #E2E8F0', borderRadius: '16px', padding: '1.25rem' }}>
              <div className="flex items-center justify-between" style={{ marginBottom: '0.85rem' }}>
                <h4 style={{ fontWeight: 800, fontSize: '0.9rem', color: '#0F172A' }}>Current Search</h4>
                <button type="button" onClick={handleReset} style={{ fontSize: '0.75rem', color: '#C58A2A', fontWeight: 700 }}>Edit</button>
              </div>

              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem', fontSize: '0.75rem' }}>
                <span className="badge badge-info">{selectedCity}</span>
                <span className="badge badge-info">{selectedCategory}</span>
                <span className="badge badge-info">{selectedBudget}</span>
                <span className="badge badge-info">{selectedBhk}</span>
              </div>
            </div>

            {/* Price Range Distribution */}
            <div style={{ background: '#fff', border: '1px solid #E2E8F0', borderRadius: '16px', padding: '1.25rem' }}>
              <h4 style={{ fontWeight: 800, fontSize: '0.9rem', color: '#0F172A', marginBottom: '1rem' }}>
                Price Range Distribution
              </h4>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem', fontSize: '0.78rem' }}>
                {[
                  { range: "₹1 Cr - ₹1.20 Cr", count: 862, pct: "85%" },
                  { range: "₹1.20 Cr - ₹1.40 Cr", count: 754, pct: "75%" },
                  { range: "₹1.40 Cr - ₹1.60 Cr", count: 512, pct: "50%" },
                  { range: "₹1.60 Cr - ₹1.80 Cr", count: 210, pct: "25%" },
                  { range: "₹1.80 Cr - ₹1.99 Cr", count: 120, pct: "12%" }
                ].map((item, idx) => (
                  <div key={idx} className="flex items-center justify-between gap-3">
                    <span style={{ color: '#475569', minWidth: '100px' }}>{item.range}</span>
                    <div style={{ flex: 1, height: '6px', background: '#F1F5F9', borderRadius: '4px', overflow: 'hidden' }}>
                      <div style={{ width: item.pct, height: '100%', background: '#C58A2A', borderRadius: '4px' }}></div>
                    </div>
                    <span style={{ fontWeight: 700, color: '#0F172A', minWidth: '30px', textAlign: 'right' }}>{item.count}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Popular Localities */}
            <div style={{ background: '#fff', border: '1px solid #E2E8F0', borderRadius: '16px', padding: '1.25rem' }}>
              <h4 style={{ fontWeight: 800, fontSize: '0.9rem', color: '#0F172A', marginBottom: '1rem' }}>
                Popular Localities
              </h4>

              <div className="locality-pills-wrap">
                {[
                  { name: "Whitefield", count: 286 },
                  { name: "Sarjapur Road", count: 214 },
                  { name: "Hebbal", count: 198 },
                  { name: "Indiranagar", count: 176 },
                  { name: "HSR Layout", count: 162 },
                  { name: "Electronic City", count: 156 },
                  { name: "Jubilee Hills", count: 142 },
                  { name: "Gachibowli", count: 188 }
                ].map(loc => (
                  <button 
                    key={loc.name}
                    type="button"
                    onClick={() => { setSearchTerm(loc.name); showToast(`Filtered by ${loc.name}`); }}
                    className="locality-pill"
                  >
                    <span>{loc.name}</span>
                    <span style={{ color: '#94A3B8', marginLeft: '0.25rem' }}>({loc.count})</span>
                  </button>
                ))}
              </div>
            </div>

          </div>
        )}

      </div>

      {/* 5. BOTTOM TRUST STRIP */}
      <div style={{ 
        marginTop: '3.5rem', 
        padding: '1.25rem 2rem', 
        background: '#fff', 
        border: '1px solid #E2E8F0', 
        borderRadius: '16px', 
        display: 'grid', 
        gridTemplateColumns: 'repeat(5, 1fr)', 
        gap: '1.5rem',
        boxShadow: 'var(--shadow-card)' 
      }}>
        <div className="flex items-center gap-3">
          <BadgeCheck className="w-6 h-6 text-amber-600 flex-shrink-0" />
          <div>
            <div style={{ fontWeight: 700, fontSize: '0.85rem' }}>Verified Properties</div>
            <div style={{ fontSize: '0.72rem', color: '#64748B' }}>All properties are verified</div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <ShieldCheck className="w-6 h-6 text-amber-600 flex-shrink-0" />
          <div>
            <div style={{ fontWeight: 700, fontSize: '0.85rem' }}>Best Price Guarantee</div>
            <div style={{ fontSize: '0.72rem', color: '#64748B' }}>Get the best deals</div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <Video className="w-6 h-6 text-amber-600 flex-shrink-0" />
          <div>
            <div style={{ fontWeight: 700, fontSize: '0.85rem' }}>Virtual Tours</div>
            <div style={{ fontSize: '0.72rem', color: '#64748B' }}>Walkthrough, 360° & more</div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <Compass className="w-6 h-6 text-amber-600 flex-shrink-0" />
          <div>
            <div style={{ fontWeight: 700, fontSize: '0.85rem' }}>Easy Site Visits</div>
            <div style={{ fontSize: '0.72rem', color: '#64748B' }}>Schedule at your convenience</div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <CheckCircle2 className="w-6 h-6 text-amber-600 flex-shrink-0" />
          <div>
            <div style={{ fontWeight: 700, fontSize: '0.85rem' }}>Secure Transactions</div>
            <div style={{ fontSize: '0.72rem', color: '#64748B' }}>100% safe and transparent</div>
          </div>
        </div>
      </div>

    </div>
  );
};

export default PropertiesPage;
