import ServiceCard from "@/components/ServiceCard";

export default function Services({ services }) {
  return (
    <section id="services" className="space-y-4">
      <h2 className="text-2xl font-semibold">Our Services</h2>
      <div className="grid gap-6 md:grid-cols-3">
        {services.map((service) => (
          <ServiceCard key={service._id} service={service} />
        ))}
      </div>
    </section>
  );
}