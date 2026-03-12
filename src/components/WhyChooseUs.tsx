import { Shield, Feather, Paintbrush, Hammer } from "lucide-react";

const features = [
  { icon: Shield, title: "Alucobond Durable", desc: "Matériau résistant aux intempéries et aux UV, pour une durabilité exceptionnelle." },
  { icon: Feather, title: "Ultra Léger", desc: "Malgré sa robustesse, chaque pièce est étonnamment légère et facile à manipuler." },
  { icon: Hammer, title: "Installation Facile", desc: "Système de fixation inclus. Accrochez en 5 minutes, sans percer." },
  { icon: Paintbrush, title: "Designs Uniques", desc: "Créations originales inspirées de l'art moderne et de la culture tunisienne." },
];

const WhyChooseUs = () => (
  <section className="py-28 md:py-36 bg-neutral-warm">
    <div className="container">
      <div className="text-center mb-20">
        <p className="text-[11px] font-medium uppercase tracking-[0.3em] text-muted-foreground mb-4">Nos Avantages</p>
        <h2 className="font-heading text-2xl md:text-3xl lg:text-4xl font-normal text-foreground tracking-wide">Pourquoi Nous Choisir</h2>
        <div className="w-16 h-0.5 bg-gold mx-auto mt-5" />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-10">
        {features.map((f) => (
          <div key={f.title} className="text-center bg-background/50 p-8 md:p-10 rounded-sm">
            <div className="w-12 h-12 rounded-full bg-secondary/60 flex items-center justify-center mx-auto mb-6">
              <f.icon className="w-5 h-5 text-gold" strokeWidth={1.3} />
            </div>
            <h3 className="font-heading text-base md:text-lg font-normal text-foreground mb-3">{f.title}</h3>
            <p className="text-sm text-muted-foreground leading-[1.7]">{f.desc}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default WhyChooseUs;
