import { Separator } from "./ui/separator";

export function BrandNarrative() {
  return (
    <section className="py-20 md:py-32">
        <Separator className="mb-12" />
        <div className="text-center max-w-3xl mx-auto">
            <h2 className="font-headline text-4xl md:text-5xl text-primary mb-6">The Soul of Clay</h2>
            <p className="text-lg text-foreground/80 leading-relaxed">
            At Tohfa, we believe that beauty lies in imperfection. Each piece of pottery—be it a plate, a cup, or a decorative bowl—is handcrafted with passion and patience. We are a small atelier dedicated to reviving the ancient art of pottery, transforming humble clay into timeless treasures. Our creations are more than just objects; they are stories molded by hand, waiting to become a part of your home.
            </p>
        </div>
    </section>
  );
}
