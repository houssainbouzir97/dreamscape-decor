import { useState } from "react";
import { Minus, Plus, Trash2, ArrowLeft, Loader2 } from "lucide-react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useCart } from "@/hooks/useCart";
import { productImageMap } from "@/lib/productImages";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import useSEO from "@/hooks/useSEO";

const tunisianCities = [
  "Tunis", "Ariana", "Ben Arous", "Manouba", "Nabeul", "Zaghouan", "Bizerte",
  "Béja", "Jendouba", "Le Kef", "Siliana", "Sousse", "Monastir", "Mahdia",
  "Sfax", "Kairouan", "Kasserine", "Sidi Bouzid", "Gabès", "Médenine",
  "Tataouine", "Gafsa", "Tozeur", "Kébili",
];

const generateOrderNumber = () => {
  const timestamp = Date.now().toString().slice(-6);
  const random = Math.floor(Math.random() * 100).toString().padStart(2, "0");
  return `DD-${timestamp}-${random}`;
};

const Checkout = () => {
  const { items, updateQuantity, removeItem, total, clearCart } = useCart();
  const { toast } = useToast();
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [orderNumber, setOrderNumber] = useState("");
  const [orderSummary, setOrderSummary] = useState<typeof items>([]);
  const [orderTotal, setOrderTotal] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [form, setForm] = useState({ name: "", phone: "", address: "", city: "Tunis" });

  useSEO({
    title: "Votre Commande – Dreamscape Decor",
    description: "Finalisez votre commande de décoration murale. Paiement à la livraison, livraison partout en Tunisie.",
  });

  const deliveryFee = 8;
  const grandTotal = total + deliveryFee;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!form.name.trim() || !form.phone.trim() || !form.address.trim()) {
      toast({ title: "Erreur", description: "Veuillez remplir tous les champs obligatoires.", variant: "destructive" });
      return;
    }

    setIsSubmitting(true);

    try {
      const newOrderNumber = generateOrderNumber();

      const payload = {
        name: form.name.trim(),
        phone: form.phone.trim(),
        address: form.address.trim(),
        city: form.city,
        orderNumber: newOrderNumber,
        items: items.map((item) => ({
          productId: item.productId,
          name: item.name,
          size: item.size,
          price: item.price,
          quantity: item.quantity,
          deliveryFee,
          total: item.price * item.quantity + deliveryFee,
        })),
      };

      const { data, error } = await supabase.functions.invoke("submit-order", {
        body: payload,
      });

      if (error) throw error;
      if (data?.error) throw new Error(data.error);

      setOrderNumber(newOrderNumber);
      setOrderSummary([...items]);
      setOrderTotal(grandTotal);
      setOrderPlaced(true);
      clearCart();
      setForm({ name: "", phone: "", address: "", city: "Tunis" });
    } catch (err: any) {
      console.error("Order submission error:", err);
      toast({
        title: "Erreur",
        description: err.message || "Une erreur est survenue. Veuillez réessayer.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (orderPlaced) {
    return (
      <>
        <Header />
        <main className="py-24 container">
          <div className="max-w-lg mx-auto">

            {/* Success header */}
            <div className="text-center mb-10">
              <div className="w-16 h-16 rounded-full bg-secondary flex items-center justify-center mx-auto mb-6">
                <svg className="w-7 h-7 text-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                </svg>
              </div>
              <h1 className="font-heading text-2xl font-normal text-foreground mb-2">Commande Confirmée</h1>
              <p className="text-sm text-muted-foreground">Nous vous contacterons rapidement pour confirmer la livraison.</p>
            </div>

            {/* Order number */}
            <div className="bg-secondary/60 rounded-sm p-5 mb-6 text-center">
              <p className="text-[10px] font-medium uppercase tracking-[0.2em] text-muted-foreground mb-1">Numéro de commande</p>
              <p className="font-heading text-xl text-foreground tracking-wider">{orderNumber}</p>
            </div>

            {/* Order summary */}
            <div className="border border-border rounded-sm overflow-hidden mb-6">
              <div className="px-5 py-4 border-b border-border">
                <p className="text-xs font-medium uppercase tracking-wider text-foreground">Récapitulatif</p>
              </div>
              {orderSummary.map((item) => (
                <div key={`${item.productId}-${item.size}`} className="flex items-center justify-between px-5 py-4 border-b border-border last:border-0">
                  <div>
                    <p className="text-sm text-foreground">{item.name}</p>
                    <p className="text-[10px] text-muted-foreground uppercase tracking-wider mt-0.5">{item.size} × {item.quantity}</p>
                  </div>
                  <p className="text-sm font-medium text-foreground">{item.price * item.quantity} TND</p>
                </div>
              ))}
              <div className="px-5 py-4 bg-secondary/40 space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Livraison</span>
                  <span className="text-foreground">8 TND</span>
                </div>
                <div className="flex justify-between text-sm font-medium">
                  <span className="text-foreground">Total</span>
                  <span className="text-foreground">{orderTotal} TND</span>
                </div>
              </div>
            </div>

            {/* Delivery info */}
            <div className="bg-secondary/40 rounded-sm p-5 mb-10 text-center">
              <p className="text-xs text-muted-foreground leading-relaxed">
                💵 Paiement à la livraison · 🚚 Livraison sous 3-5 jours ouvrables
              </p>
            </div>

            <div className="text-center">
              <Link to="/" className="inline-flex px-10 py-3.5 bg-accent text-accent-foreground font-medium text-xs uppercase tracking-[0.15em]">
                Retour à l'accueil
              </Link>
            </div>

          </div>
        </main>
        <Footer />
      </>
    );
  }

  if (items.length === 0) {
    return (
      <>
        <Header />
        <main className="py-24 container text-center">
          <h1 className="font-heading text-2xl font-normal text-foreground mb-4">Votre panier est vide</h1>
          <Link to="/produits" className="text-sm text-muted-foreground underline">Découvrir nos produits</Link>
        </main>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Header />
      <main className="py-10 md:py-20">
        <div className="container">
          <Link to="/produits" className="inline-flex items-center gap-2 text-xs text-muted-foreground hover:text-foreground mb-8 transition-colors uppercase tracking-wider">
            <ArrowLeft className="w-3.5 h-3.5" strokeWidth={1.5} /> Continuer vos achats
          </Link>

          <h1 className="font-heading text-2xl md:text-3xl font-normal text-foreground mb-10">Votre Commande</h1>

          <div className="grid grid-cols-1 lg:grid-cols-5 gap-10">
            {/* Cart Items */}
            <div className="lg:col-span-3 space-y-4">
              <h2 className="text-xs font-medium text-foreground uppercase tracking-wider mb-4">Votre Panier</h2>
              {items.map((item) => (
                <div key={`${item.productId}-${item.size}`} className="flex gap-4 p-4 border border-border">
                  <img src={productImageMap[item.image] || ''} alt={item.name} className="w-20 h-20 object-cover bg-secondary" />
                  <div className="flex-1 min-w-0">
                    <h3 className="font-heading text-sm font-normal text-foreground truncate">{item.name}</h3>
                    <p className="text-[10px] text-muted-foreground uppercase tracking-wider">{item.size}</p>
                    <p className="text-sm font-medium text-foreground mt-1">{item.price} TND</p>
                    <div className="flex items-center gap-2 mt-2">
                      <button onClick={() => updateQuantity(item.productId, item.size, item.quantity - 1)} className="w-7 h-7 flex items-center justify-center border border-border">
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="text-xs font-medium w-6 text-center">{item.quantity}</span>
                      <button onClick={() => updateQuantity(item.productId, item.size, item.quantity + 1)} className="w-7 h-7 flex items-center justify-center border border-border">
                        <Plus className="w-3 h-3" />
                      </button>
                      <button onClick={() => removeItem(item.productId, item.size)} className="ml-auto text-muted-foreground hover:text-foreground">
                        <Trash2 className="w-3.5 h-3.5" strokeWidth={1.5} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Checkout Form */}
            <div className="lg:col-span-2">
              <div className="border border-border p-6 sticky top-24">
                <h2 className="text-xs font-medium text-foreground uppercase tracking-wider mb-6">Informations de Livraison</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="text-xs font-medium text-foreground block mb-1.5">Nom complet *</label>
                    <input
                      required
                      maxLength={100}
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      disabled={isSubmitting}
                      className="w-full px-3 py-2.5 border border-input bg-background text-foreground text-sm focus:outline-none focus:ring-1 focus:ring-ring disabled:opacity-50"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-medium text-foreground block mb-1.5">Téléphone *</label>
                    <input
                      required
                      type="tel"
                      maxLength={20}
                      value={form.phone}
                      onChange={(e) => setForm({ ...form, phone: e.target.value })}
                      placeholder="+216"
                      disabled={isSubmitting}
                      className="w-full px-3 py-2.5 border border-input bg-background text-foreground text-sm focus:outline-none focus:ring-1 focus:ring-ring disabled:opacity-50"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-medium text-foreground block mb-1.5">Adresse *</label>
                    <input
                      required
                      maxLength={200}
                      value={form.address}
                      onChange={(e) => setForm({ ...form, address: e.target.value })}
                      disabled={isSubmitting}
                      className="w-full px-3 py-2.5 border border-input bg-background text-foreground text-sm focus:outline-none focus:ring-1 focus:ring-ring disabled:opacity-50"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-medium text-foreground block mb-1.5">Ville *</label>
                    <select
                      value={form.city}
                      onChange={(e) => setForm({ ...form, city: e.target.value })}
                      disabled={isSubmitting}
                      className="w-full px-3 py-2.5 border border-input bg-background text-foreground text-sm focus:outline-none focus:ring-1 focus:ring-ring disabled:opacity-50"
                    >
                      {tunisianCities.map(c => <option key={c} value={c}>{c}</option>)}
                    </select>
                  </div>

                  <div className="border-t border-border pt-5 mt-5 space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Sous-total</span>
                      <span className="text-foreground">{total} TND</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Livraison</span>
                      <span className="text-foreground">{deliveryFee} TND</span>
                    </div>
                    <div className="flex justify-between text-base font-medium pt-3 border-t border-border">
                      <span className="text-foreground">Total</span>
                      <span className="text-foreground">{grandTotal} TND</span>
                    </div>
                  </div>

                  <div className="bg-secondary p-4">
                    <p className="text-xs font-medium text-foreground">💵 Paiement à la livraison (COD)</p>
                    <p className="text-[10px] text-muted-foreground mt-0.5">Payez en espèces à la réception</p>
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-3.5 bg-accent text-accent-foreground font-medium text-xs uppercase tracking-[0.15em] hover:bg-charcoal-light transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        Envoi en cours...
                      </>
                    ) : (
                      "Confirmer la Commande"
                    )}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default Checkout;
