import Header from "@/components/Header";
import Footer from "@/components/Footer";
import useSEO from "@/hooks/useSEO";

const ReturnPolicy = () => {
  useSEO({
    title: "Politique de Retour – Dreamscape Decor",
    description: "Politique de retour Dreamscape Decor. Retours acceptés sous 7 jours après réception. Contactez-nous via WhatsApp pour organiser votre retour.",
  });

  return (
    <>
      <Header />
      <main className="py-16 md:py-24">
        <div className="container max-w-2xl">
          <p className="text-[10px] font-medium uppercase tracking-[0.3em] text-muted-foreground mb-3">
            Informations légales
          </p>
          <h1 className="font-heading text-3xl md:text-4xl font-normal text-foreground mb-10">
            Politique de Retour
          </h1>

          <div className="space-y-10">

            <div className="border-l-2 border-gold pl-6">
              <h2 className="font-heading text-lg font-normal text-foreground mb-3">
                Délai de retour
              </h2>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Vous disposez de <strong className="text-foreground">7 jours</strong> après
                réception de votre commande pour nous retourner un produit.
                Le produit doit être en parfait état, non installé et dans son emballage d'origine.
              </p>
            </div>

            <div className="border-l-2 border-gold pl-6">
              <h2 className="font-heading text-lg font-normal text-foreground mb-3">
                Comment effectuer un retour
              </h2>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Contactez-nous via <strong className="text-foreground">WhatsApp au +216 55 137 598</strong> en
                indiquant votre numéro de commande et la raison du retour.
                Nous vous confirmerons la procédure sous 24h.
              </p>
            </div>

            <div className="border-l-2 border-gold pl-6">
              <h2 className="font-heading text-lg font-normal text-foreground mb-3">
                Conditions de retour
              </h2>
              <ul className="text-sm text-muted-foreground leading-relaxed space-y-2">
                <li>✓ Produit non installé et en parfait état</li>
                <li>✓ Emballage d'origine intact</li>
                <li>✓ Retour dans les 7 jours suivant la réception</li>
                <li>✗ Produits personnalisés non remboursables</li>
                <li>✗ Produits endommagés par le client non acceptés</li>
              </ul>
            </div>

            <div className="border-l-2 border-gold pl-6">
              <h2 className="font-heading text-lg font-normal text-foreground mb-3">
                Remboursement
              </h2>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Une fois le retour reçu et vérifié, le remboursement sera effectué
                dans un délai de <strong className="text-foreground">3 à 5 jours ouvrables</strong>.
                Les frais de livraison initiaux ne sont pas remboursables.
              </p>
            </div>

            <div className="border-l-2 border-gold pl-6">
              <h2 className="font-heading text-lg font-normal text-foreground mb-3">
                Produit endommagé à la livraison
              </h2>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Si votre produit arrive endommagé, contactez-nous immédiatement via WhatsApp
                avec des photos du produit et de l'emballage. Nous vous enverrons un remplacement
                sans frais supplémentaires.
              </p>
            </div>

            <div className="bg-secondary/50 p-6 rounded-sm">
              <p className="text-sm text-foreground font-medium mb-2">Une question sur votre retour ?</p>
              <p className="text-sm text-muted-foreground">
                Contactez-nous directement sur{" "}
                <a
                  href="https://wa.me/21655137598"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-foreground underline hover:text-gold transition-colors"
                >
                  WhatsApp
                </a>{" "}
                ou par email à{" "}
                <a
                  href="mailto:dreamscapedecor.art@gmail.com"
                  className="text-foreground underline hover:text-gold transition-colors"
                >
                  dreamscapedecor.art@gmail.com
                </a>
              </p>
            </div>

          </div>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default ReturnPolicy;
