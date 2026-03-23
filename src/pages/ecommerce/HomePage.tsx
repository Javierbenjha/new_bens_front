import { useState } from "react";
import { ShoppingCart, Search, Heart, Star, Zap, Shield, Truck, RefreshCw, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import modelGalata from "../../assets/images/clothes/model_galata.png";
import frontGalaBeige from "../../assets/images/gala/front_gala_beige.png";
import galaAzul from "../../assets/images/gala/gala_azul.png";
import galaBlanco from "../../assets/images/gala/gala_blanco.png";
import promoBanner from "../../assets/images/banners/banner.png";

// ────────────────────────────────────────────────────────────
// DATA
// ────────────────────────────────────────────────────────────

const categories = [
  { id: 1, name: "Electrónica", emoji: "💻", count: 248, color: "from-violet-500 to-purple-600" },
  { id: 2, name: "Ropa & Moda", emoji: "👔", count: 512, color: "from-rose-400 to-pink-600" },
  { id: 3, name: "Hogar & Deco", emoji: "🏠", count: 183, color: "from-amber-400 to-orange-500" },
  { id: 4, name: "Deportes", emoji: "⚽", count: 320, color: "from-emerald-400 to-teal-600" },
  { id: 5, name: "Belleza", emoji: "💄", count: 97, color: "from-fuchsia-400 to-pink-500" },
  { id: 6, name: "Libros", emoji: "📚", count: 405, color: "from-sky-400 to-blue-600" },
];

const featuredProducts = [
  {
    id: 1,
    name: "Auriculares Pro X1",
    price: 249.99,
    originalPrice: 319.99,
    rating: 4.8,
    reviews: 1243,
    badge: "Más vendido",
    badgeColor: "bg-amber-400 text-amber-900",
    category: "Electrónica",
    emoji: "🎧",
    gradient: "from-violet-100 to-purple-50", 
  },
  {
    id: 2,
    name: "Sneakers Urban Air",
    price: 89.99,
    originalPrice: 129.99,
    rating: 4.6,
    reviews: 876,
    badge: "Nuevo",
    badgeColor: "bg-emerald-400 text-emerald-900",
    category: "Ropa & Moda",
    emoji: "👟",
    gradient: "from-rose-100 to-pink-50",
  },
  {
    id: 3,
    name: "Cámara Instant Mini",
    price: 74.99,
    originalPrice: null,
    rating: 4.9,
    reviews: 542,
    badge: "Top rated",
    badgeColor: "bg-sky-400 text-sky-900",
    category: "Electrónica",
    emoji: "📷",
    gradient: "from-sky-100 to-blue-50",
  },
  {
    id: 4,
    name: "Mochila Explorer",
    price: 59.99,
    originalPrice: 79.99,
    rating: 4.7,
    reviews: 319,
    badge: "-25%",
    badgeColor: "bg-rose-400 text-rose-900",
    category: "Deportes",
    emoji: "🎒",
    gradient: "from-amber-100 to-orange-50",
  },
];

const perks = [
  { icon: Truck, title: "Envío gratis", desc: "En pedidos +S/150", color: "text-emerald-500" },
  { icon: Shield, title: "Compra segura", desc: "Pagos 100% protegidos", color: "text-sky-500" },
  { icon: RefreshCw, title: "30 días de cambios", desc: "Sin preguntas", color: "text-violet-500" },
  { icon: Zap, title: "Soporte 24/7", desc: "Siempre disponibles", color: "text-amber-500" },
];

// ────────────────────────────────────────────────────────────
// SUB COMPONENTS
// ────────────────────────────────────────────────────────────

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((s) => (
        <Star
          key={s}
          size={12}
          className={s <= Math.round(rating) ? "fill-amber-400 text-amber-400" : "text-gray-200 fill-gray-200"}
        />
      ))}
    </div>
  );
}

function ProductCard({ product }: { product: (typeof featuredProducts)[0] }) {
  const [wished, setWished] = useState(false);
  const discount = product.originalPrice
    ? Math.round((1 - product.price / product.originalPrice) * 100)
    : null;

  return (
    <div className="group relative bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 hover:-translate-y-1">
      {/* Badge */}
      <span className={`absolute top-3 left-3 z-10 text-xs font-bold px-2.5 py-1 rounded-full ${product.badgeColor}`}>
        {product.badge}
      </span>

      {/* Wishlist */}
      <button
        onClick={() => setWished((w) => !w)}
        className="absolute top-3 right-3 z-10 w-8 h-8 bg-white rounded-full shadow flex items-center justify-center transition-transform hover:scale-110"
      >
        <Heart
          size={15}
          className={wished ? "fill-rose-500 text-rose-500" : "text-gray-400"}
        />
      </button>

      {/* Product visual */}
      <div className={`h-48 bg-linear-to-br ${product.gradient} flex items-center justify-center text-7xl select-none`}>
        {product.emoji}
      </div>

      {/* Info */}
      <div className="p-4 space-y-2">
        <p className="text-xs text-muted-foreground font-medium uppercase tracking-wide">{product.category}</p>
        <h3 className="font-semibold text-gray-800 group-hover:text-primary transition-colors">{product.name}</h3>

        <div className="flex items-center gap-2">
          <StarRating rating={product.rating} />
          <span className="text-xs text-muted-foreground">({product.reviews.toLocaleString()})</span>
        </div>

        <div className="flex items-center justify-between pt-1">
          <div className="flex items-baseline gap-2">
            <span className="text-lg font-bold text-gray-900">S/ {product.price}</span>
            {product.originalPrice && (
              <span className="text-sm text-muted-foreground line-through">S/ {product.originalPrice}</span>
            )}
          </div>
          {discount && (
            <span className="text-xs font-bold text-rose-500">-{discount}%</span>
          )}
        </div>

        <Button size="sm" className="w-full mt-1 gap-2">
          <ShoppingCart size={14} />
          Agregar al carrito
        </Button>
      </div>
    </div>
  );
}

// ────────────────────────────────────────────────────────────
// MAIN PAGE
// ────────────────────────────────────────────────────────────

export function HomePage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [currentHeroImage, setCurrentHeroImage] = useState(modelGalata);
  const thumbnails = [frontGalaBeige, galaAzul, galaBlanco];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <nav className="absolute top-0 left-0 right-0 z-10 flex items-center justify-between px-8 py-6 md:px-12">
        <div className="font-display text-2xl font-bold tracking-tight text-foreground">
        </div>
        <div className="hidden md:flex items-center gap-8 font-body text-xs tracking-[0.2em] uppercase text-muted-foreground">
          <a href="#" className="hover:text-foreground transition-colors">Colecciones</a>
          <a href="#" className="hover:text-foreground transition-colors">Tienda</a>
          <a href="#" className="hover:text-foreground transition-colors">Nosotros</a>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex max-w-7xl mx-auto">
        {/* Left Content */}
        <div className="flex flex-col justify-center px-6 md:px-12 lg:px-16 pt-20 pb-16 w-full lg:w-[45%] z-10">
          <p className="font-body text-xs tracking-[0.25em] uppercase text-muted-foreground mb-3">
            Purpose Collection
          </p>
          <h1 className="font-display text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-black leading-[0.85] text-foreground mb-8">
            PURPOSE<br />EDITION
          </h1>
          <p className="font-body text-sm leading-relaxed text-muted-foreground max-w-sm mb-10">
            Presentamos nuestra nueva colección, una línea inspirada en la fe, el propósito y la identidad. Diseñada para quienes buscan expresar lo que llevan dentro, más allá de etiquetas.
            Hecha para todos, con un mensaje que trasciende.
          </p>

          {/* Mobile Hero Image - Only visible on small screens */}
          <div className="lg:hidden w-full flex justify-center mt-6 mb-8 px-4">
            <img
              src={currentHeroImage}
              alt="Modelo mobile"
              className="max-h-[50vh] w-auto object-contain object-center animate-fade-in-up"
            />
          </div>

          {/* Thumbnail Models Gallery Title */}
          <div className="mt-8 lg:mt-16">
            <p className="font-body text-[10px] tracking-[0.2em] uppercase text-muted-foreground mb-4 opacity-70">
              Galería
            </p>
            <div className="flex items-end gap-3">
              {thumbnails.map((src, i) => (
              <div 
                key={i} 
                onClick={() => setCurrentHeroImage(src)}
                className={`w-28 md:w-36 transition-all duration-300 cursor-pointer border-b-2 ${currentHeroImage === src ? "border-foreground opacity-100 scale-105" : "border-transparent opacity-60 hover:opacity-100"}`}
              >
                <img
                  src={src}
                  alt={`Vista ${i + 1}`}
                  loading="lazy"
                  width={512}
                  height={700}
                  className="w-full h-auto object-contain"
                />
              </div>
            ))}
          </div>
        </div>
      </div>

        {/* Right Hero Image */}
        <div className="hidden lg:flex items-center justify-center w-1/2 pr-0 pb-0">
          <img
            src={currentHeroImage}
            alt="Modelo con hoodie PURPOSE EDITION"
            width={800}
            height={1200}
            className="w-auto h-[85vh] object-contain object-center animate-fade-in-up"
          />
        </div>
      </section>

      {/* ── PERKS BAR ── */}
      <section className="bg-white border-b border-gray-100">
        <div className="max-w-6xl mx-auto px-6 py-5 grid grid-cols-2 md:grid-cols-4 gap-4">
          {perks.map((p) => (
            <div key={p.title} className="flex items-center gap-3">
              <div className={`w-10 h-10 rounded-xl bg-gray-50 flex items-center justify-center shrink-0`}>
                <p.icon size={20} className={p.color} />
              </div>
              <div>
                <p className="text-sm font-semibold text-gray-800">{p.title}</p>
                <p className="text-xs text-gray-500">{p.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── CATEGORIES ── */}
      <section className="max-w-6xl mx-auto px-6 py-14">
        <div className="flex items-end justify-between mb-8">
          <div>
            <p className="text-xs font-bold text-primary uppercase tracking-widest mb-1">Explorar</p>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900">Categorías populares</h2>
          </div>
          <button className="flex items-center gap-1 text-sm text-primary font-semibold hover:underline">
            Ver todas <ChevronRight size={16} />
          </button>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {categories.map((cat) => (
            <button
              key={cat.id}
              className="group relative overflow-hidden rounded-2xl aspect-square flex flex-col items-center justify-center gap-2 shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1 cursor-pointer"
            >
              <div className={`absolute inset-0 bg-linear-to-br ${cat.color} opacity-90 group-hover:opacity-100 transition-opacity`} />
              <span className="relative text-4xl">{cat.emoji}</span>
              <span className="relative text-white font-semibold text-sm text-center leading-tight px-2">{cat.name}</span>
              <span className="relative text-white/75 text-xs">{cat.count} productos</span>
            </button>
          ))}
        </div>
      </section>

      {/* ── BANNER ── */}
      <section className="max-w-6xl mx-auto px-6 mb-14">
        <div className="relative overflow-hidden rounded-3xl shadow-xl group cursor-pointer">
          <img 
            src={promoBanner} 
            alt="Oferta Especial Purpose Collection" 
            className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-black/5 group-hover:bg-transparent transition-colors duration-300" />
        </div>
      </section>

      {/* ── FEATURED PRODUCTS ── */}
      <section className="max-w-6xl mx-auto px-6 pb-14">
        <div className="flex items-end justify-between mb-8">
          <div>
            <p className="text-xs font-bold text-primary uppercase tracking-widest mb-1">Selección</p>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900">Productos destacados</h2>
          </div>
          <button className="flex items-center gap-1 text-sm text-primary font-semibold hover:underline">
            Ver todos <ChevronRight size={16} />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* ── NEWSLETTER ── */}
      <section className="bg-[oklch(29.438%_0.15045_273.936)] text-white">
        <div className="max-w-2xl mx-auto px-6 py-16 text-center space-y-6">
          <span className="text-4xl">📬</span>
          <h2 className="text-2xl md:text-3xl font-bold">¿No quieres perderte nada?</h2>
          <p className="text-white/70">
            Suscríbete y recibe las mejores ofertas, novedades y descuentos exclusivos directamente en tu correo.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <input
              type="email"
              placeholder="tu@email.com"
              className="flex-1 px-4 py-3 rounded-xl text-gray-800 bg-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-amber-300 text-sm"
            />
            <Button className="bg-amber-400 hover:bg-amber-300 text-amber-900 font-bold px-6 shrink-0">
              Suscribirme
            </Button>
          </div>
          <p className="text-xs text-white/40">Sin spam. Puedes darte de baja cuando quieras.</p>
        </div>
      </section>

    </div>
  );
}
