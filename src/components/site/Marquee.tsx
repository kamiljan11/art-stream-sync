import logoMas from "@/assets/site/logo-mas.png";
import logo1 from "@/assets/site/logo-1.png";
import logo2 from "@/assets/site/logo-2.png";
import logo4 from "@/assets/site/logo-4.png";

const logos = [logo4, logoMas, logo2, logo1];

export function PartnersMarquee() {
  return (
    <div className="py-12 border-y border-border bg-card/40">
      <p className="text-center text-sm uppercase tracking-[0.3em] text-muted-foreground mb-8">
        A Few of Our Trusted Partners
      </p>
      <div className="overflow-hidden">
        <div className="flex gap-16 animate-marquee w-max">
          {[...logos, ...logos, ...logos].map((src, i) => (
            <img
              key={i}
              src={src}
              alt=""
              className="h-14 w-auto object-contain opacity-70 hover:opacity-100 transition"
            />
          ))}
        </div>
      </div>
    </div>
  );
}