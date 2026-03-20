import Header from "@/components/Header";
import Footer from "@/components/Footer";
import useSEO from "@/hooks/useSEO";

const ReturnPolicy = () => {
  useSEO({
    title: "Politique de Retour | Dreamscape Decor Tunisie",
    description: "Retours acceptés sous 7 jours. Satisfaction garantie sur toute la Tunisie. Achetez en toute confiance.",
    canonical: "/politique-retour",
  });

  return (
    <>
      <Header />
      <main className="py-20 md:py-32">
        <div className="container max-w-2xl">
          <div className="text-center mb-14">
            <p className="text-[11px] font-medium uppercase tracking-[0.3em] text-muted-foreground mb-4">Confiance</p>
            <h1 className="font-heading text-3xl md:text-4xl font-normal text-foreground mb-4">
              Politique de Retour
            </h1>
            <div className="w-16 h-0.5 bg-gold mx-auto" />
          </div>

          <div className="prose prose-sm max-w-none space-y-8 text-muted-foreground leading-[1.8]">
            <section>
              <h2 className="font-heading text-lg font-normal text-foreground mb-3">Délai de retour</h2>
              <p>Vous disposez de <strong className="text-foreground">7 jours</strong> après réception de votre commande pour nous contacter et initier un retour, si vous n'êtes pas satisfait de votre achat.</p>
            </section>

            <section>
              <h2 className="font-heading text-lg font-normal text-foreground mb-3">Conditions de retour</h2>
              <p>Le produit doit être retourné dans son état d'origine, non installé, et dans son emballage d'origine. Les produits endommagés après installation ne peuvent pas être retournés.</p>
            </section>

            <section>
              <h2 className="font-heading text-lg font-normal text-foreground mb-3">Comment initier un retour</h2>
              <p>Contactez-nous sur WhatsApp ou par email avec votre numéro de commande et la raison du retour. Nous vous guiderons dans les étapes suivantes.</p>
            </section>

            <section>
              <h2 className="font-heading text-lg font-normal text-foreground mb-3">Remboursement</h2>
              <p>Une fois le produit retourné et inspecté, le remboursement est effectué sous 3 à 5 jours ouvrables via le même mode de paiement utilisé lors de la commande.</p>
            </section>

            <section>
              <h2 className="font-heading text-lg font-normal text-foreground mb-3">Questions</h2>
              <p>Pour toute question concernant notre politique de retour, contactez-nous directement sur WhatsApp. Nous sommes disponibles 7j/7 pour vous aider.</p>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default ReturnPolicy;
