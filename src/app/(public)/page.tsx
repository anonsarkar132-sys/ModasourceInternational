import HeroBanner from "@/components/home/HeroBanner";

export default function HomePage() {
  return (
    <div className="w-full">
      <HeroBanner />
      
      {/* Ekhane pore amra Featured Products ebong Services section add korbo */}
      <section className="py-24 bg-white text-center">
        <div className="max-w-3xl mx-auto px-4">
          <h2 className="text-3xl font-serif mb-4 text-neutral-800">Welcome to Moda Source</h2>
          <p className="text-neutral-500">
            More sections (Featured Products, Services overview) will be added here soon!
          </p>
        </div>
      </section>
    </div>
  );
}