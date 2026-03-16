import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const body = await req.json();
    const { name, phone, address, city, items, orderNumber } = body;

    // Validate required fields
    if (!name || !phone || !address) {
      return new Response(
        JSON.stringify({ error: "Nom, téléphone et adresse sont requis." }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    if (!items || !Array.isArray(items) || items.length === 0) {
      return new Response(
        JSON.stringify({ error: "Le panier est vide." }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const supabase = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
    );

    // Insert each item as a separate order row
    const orderRows = items.map((item: any) => ({
      name: String(name).slice(0, 100),
      phone: String(phone).slice(0, 20),
      address: String(address).slice(0, 200),
      city: city ? String(city).slice(0, 50) : null,
      product_code: item.productId || null,
      product_name: item.name || null,
      size: item.size || null,
      price: item.price ? String(item.price) : null,
      quantity: item.quantity || 1,
      delivery_fee: item.deliveryFee || null,
      total: item.total || null,
      notes: orderNumber ? `Commande #${orderNumber}` : null,
      source: "website",
    }));

    const { error: dbError } = await supabase.from("orders").insert(orderRows);

    if (dbError) {
      console.error("DB insert error:", dbError);
      return new Response(
        JSON.stringify({ error: "Erreur lors de l'enregistrement." }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Send email notification via Resend
    const resendKey = Deno.env.get("RESEND_API_KEY");
    const notificationEmail = Deno.env.get("NOTIFICATION_EMAIL");

    if (resendKey && notificationEmail) {
      const itemsHtml = items
        .map(
          (item: any) =>
            `<tr><td>${item.name || ""}</td><td>${item.size || ""}</td><td>${item.quantity || 1}</td><td>${item.price || ""} TND</td></tr>`
        )
        .join("");

      const totalAmount = items.reduce(
        (sum: number, item: any) => sum + (Number(item.price) || 0) * (item.quantity || 1),
        0
      );
      const deliveryFee = items[0]?.deliveryFee || 8;

      const emailHtml = `
        <h2 style="color:#1E1E1E;">🛍️ Nouvelle commande – Dreamscape Decor</h2>

        ${orderNumber ? `<p style="background:#f5f0e8;padding:10px 16px;border-left:3px solid #C6A75E;font-size:16px;"><strong>Numéro de commande:</strong> ${orderNumber}</p>` : ""}

        <p><strong>Client:</strong> ${name}</p>
        <p><strong>Téléphone:</strong> <a href="tel:${phone}">${phone}</a></p>
        <p><strong>Adresse:</strong> ${address}</p>
        <p><strong>Ville:</strong> ${city || "Non spécifiée"}</p>
        <hr/>
        <table border="1" cellpadding="8" cellspacing="0" style="border-collapse:collapse;width:100%;">
          <thead style="background:#1E1E1E;color:#F4EFEA;">
            <tr><th>Produit</th><th>Taille</th><th>Qté</th><th>Prix</th></tr>
          </thead>
          <tbody>${itemsHtml}</tbody>
        </table>
        <br/>
        <p><strong>Sous-total:</strong> ${totalAmount} TND</p>
        <p><strong>Livraison:</strong> ${deliveryFee} TND</p>
        <p style="font-size:16px;"><strong>Total:</strong> ${totalAmount + deliveryFee} TND</p>
        <hr/>
        <p style="color:#888;font-size:12px;">Dreamscape Decor – Paiement à la livraison</p>
      `;

      try {
        await fetch("https://api.resend.com/emails", {
          method: "POST",
          headers: {
            Authorization: `Bearer ${resendKey}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            from: "Dreamscape Decor <onboarding@resend.dev>",
            to: [notificationEmail],
            subject: orderNumber
              ? `Commande ${orderNumber} – Dreamscape Decor`
              : "Nouvelle commande – Dreamscape Decor",
            html: emailHtml,
          }),
        });
      } catch (emailErr) {
        console.error("Email send error:", emailErr);
        // Don't fail the order if email fails
      }
    }

    return new Response(
      JSON.stringify({ success: true }),
      { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (err) {
    console.error("Unexpected error:", err);
    return new Response(
      JSON.stringify({ error: "Erreur inattendue." }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
