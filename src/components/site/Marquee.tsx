import logoMas from "@/assets/site/logo-mas.png";
import logo1 from "@/assets/site/logo-1.png";
import logo2 from "@/assets/site/logo-2.png";
import logo4 from "@/assets/site/logo-4.png";

const logos = [logo4, logoMas, logo2, logo1];

export function PartnersMarquee() {
  return (
    <section className="bg-background text-center py-[60px] md:py-[60px] md:px-5">
      <p className="mb-10 opacity-50 text-xs tracking-[3px] uppercase font-bold">
        A Few of Our Trusted Partners
      </p>

      {/* Desktop: static centered row */}
      <div className="hidden md:flex max-w-[1000px] mx-auto justify-center items-center flex-wrap gap-[60px]">
        {logos.map((src, i) => (
          <img
            key={i}
            src={src}
            alt=""
            className="h-20 w-auto max-w-[200px] object-contain grayscale opacity-40 hover:grayscale-0 hover:opacity-100 hover:-translate-y-[5px] transition-all duration-300 cursor-pointer"
          />
        ))}
      </div>

      {/* Mobile: scrolling marquee with edge gradient masks */}
      <div className="md:hidden relative overflow-hidden">
        <div
          className="pointer-events-none absolute inset-y-0 left-0 w-[50px] z-10"
          style={{ background: "linear-gradient(to right, hsl(var(--background)), transparent)" }}
        />
        <div
          className="pointer-events-none absolute inset-y-0 right-0 w-[50px] z-10"
          style={{ background: "linear-gradient(to left, hsl(var(--background)), transparent)" }}
        />
        <div className="flex flex-nowrap items-center gap-10 w-max animate-marquee pr-10">
          {[...logos, ...logos].map((src, i) => (
            <img
              key={i}
              src={src}
              alt=""
              className="h-[60px] w-auto object-contain grayscale opacity-60"
            />
          ))}
        </div>
      </div>
    </section>
  );
}