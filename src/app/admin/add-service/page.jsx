import AddServiceForm from "@/components/AddServiceForm";

export default function AddServicePage() {
  return (
    <div className="max-w-2xl mx-auto space-y-4">
      <h1 className="text-2xl font-bold">Add New Service</h1>
      <AddServiceForm />
    </div>
  );
}