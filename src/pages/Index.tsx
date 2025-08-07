import { useState } from "react";
import { Navigation } from "@/components/Navigation";
import { ProductCatalog } from "@/components/ProductCatalog";
import { SupplierRegistration } from "@/components/SupplierRegistration";
import { OrderManagement } from "@/components/OrderManagement";
import { CustomerManagement } from "@/components/CustomerManagement";

const Index = () => {
  const [activeSection, setActiveSection] = useState("catalog");

  const renderSection = () => {
    switch (activeSection) {
      case "catalog":
        return <ProductCatalog />;
      case "suppliers":
        return <SupplierRegistration />;
      case "orders":
        return <OrderManagement />;
      case "customers":
        return <CustomerManagement />;
      default:
        return <ProductCatalog />;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation activeSection={activeSection} onSectionChange={setActiveSection} />
      <main className="pt-4">
        {renderSection()}
      </main>
    </div>
  );
};

export default Index;
