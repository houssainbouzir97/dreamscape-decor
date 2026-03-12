import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";

interface Order {
  id: string;
  created_at: string;
  name: string;
  phone: string;
  address: string;
  city: string | null;
  product_code: string | null;
  product_name: string | null;
  size: string | null;
  price: string | null;
  quantity: number | null;
  delivery_fee: number | null;
  total: number | null;
  notes: string | null;
  source: string | null;
}

const AdminOrders = () => {
  const [password, setPassword] = useState("");
  const [authenticated, setAuthenticated] = useState(false);
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const saved = sessionStorage.getItem("admin_auth");
    if (saved) {
      setAuthenticated(true);
      fetchOrders(saved);
    }
  }, []);

  const fetchOrders = async (pwd: string) => {
    setLoading(true);
    setError("");
    try {
      const { data, error: fnError } = await supabase.functions.invoke("admin-orders", {
        headers: { Authorization: `Bearer ${pwd}` },
      });

      if (fnError) throw fnError;
      if (data?.error) throw new Error(data.error);

      setOrders(data || []);
    } catch (err: any) {
      setError(err.message || "Erreur de chargement");
      if (err.message?.includes("Non autorisé") || err.message?.includes("401")) {
        sessionStorage.removeItem("admin_auth");
        setAuthenticated(false);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!password.trim()) return;
    sessionStorage.setItem("admin_auth", password);
    setAuthenticated(true);
    fetchOrders(password);
  };

  const exportCSV = () => {
    const headers = ["Date", "Nom", "Téléphone", "Ville", "Adresse", "Produit", "Taille", "Qté", "Prix", "Livraison", "Total", "Notes"];
    const rows = orders.map((o) => [
      new Date(o.created_at).toLocaleDateString("fr-TN"),
      o.name,
      o.phone,
      o.city || "",
      o.address,
      o.product_name || "",
      o.size || "",
      o.quantity || "",
      o.price || "",
      o.delivery_fee || "",
      o.total || "",
      o.notes || "",
    ]);

    const csv = [headers, ...rows].map((r) => r.map((c) => `"${String(c).replace(/"/g, '""')}"`).join(",")).join("\n");
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `commandes-${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  if (!authenticated) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <form onSubmit={handleLogin} className="w-full max-w-xs space-y-4 p-8 border border-border">
          <h1 className="font-heading text-lg text-foreground text-center">Admin</h1>
          <input
            type="password"
            placeholder="Mot de passe"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-3 py-2.5 border border-input bg-background text-foreground text-sm focus:outline-none focus:ring-1 focus:ring-ring"
          />
          <button
            type="submit"
            className="w-full py-2.5 bg-accent text-accent-foreground text-xs uppercase tracking-[0.15em] font-medium"
          >
            Accéder
          </button>
          {error && <p className="text-xs text-destructive text-center">{error}</p>}
        </form>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <h1 className="font-heading text-xl text-foreground">Commandes ({orders.length})</h1>
          <div className="flex gap-3">
            <button onClick={exportCSV} className="px-4 py-2 bg-accent text-accent-foreground text-xs uppercase tracking-wider font-medium">
              Exporter CSV
            </button>
            <button
              onClick={() => fetchOrders(sessionStorage.getItem("admin_auth") || "")}
              className="px-4 py-2 border border-border text-foreground text-xs uppercase tracking-wider"
            >
              Rafraîchir
            </button>
          </div>
        </div>

        {loading && <p className="text-sm text-muted-foreground">Chargement...</p>}
        {error && <p className="text-sm text-destructive">{error}</p>}

        <div className="overflow-x-auto">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="border-b border-border text-left">
                <th className="py-3 px-2 font-medium text-muted-foreground text-xs uppercase">Date</th>
                <th className="py-3 px-2 font-medium text-muted-foreground text-xs uppercase">Nom</th>
                <th className="py-3 px-2 font-medium text-muted-foreground text-xs uppercase">Tél</th>
                <th className="py-3 px-2 font-medium text-muted-foreground text-xs uppercase">Ville</th>
                <th className="py-3 px-2 font-medium text-muted-foreground text-xs uppercase">Produit</th>
                <th className="py-3 px-2 font-medium text-muted-foreground text-xs uppercase">Taille</th>
                <th className="py-3 px-2 font-medium text-muted-foreground text-xs uppercase">Qté</th>
                <th className="py-3 px-2 font-medium text-muted-foreground text-xs uppercase">Prix</th>
                <th className="py-3 px-2 font-medium text-muted-foreground text-xs uppercase">Total</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((o) => (
                <tr key={o.id} className="border-b border-border/50">
                  <td className="py-2.5 px-2 text-muted-foreground">{new Date(o.created_at).toLocaleDateString("fr-TN")}</td>
                  <td className="py-2.5 px-2 text-foreground font-medium">{o.name}</td>
                  <td className="py-2.5 px-2">{o.phone}</td>
                  <td className="py-2.5 px-2">{o.city || "—"}</td>
                  <td className="py-2.5 px-2">{o.product_name || "—"}</td>
                  <td className="py-2.5 px-2">{o.size || "—"}</td>
                  <td className="py-2.5 px-2">{o.quantity || "—"}</td>
                  <td className="py-2.5 px-2">{o.price ? `${o.price} TND` : "—"}</td>
                  <td className="py-2.5 px-2 font-medium">{o.total ? `${o.total} TND` : "—"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminOrders;
