import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, ShoppingCart, Star, Filter, Package } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  supplier: string;
  rating: number;
  inStock: boolean;
  minOrder: number;
}

export const ProductCatalog = () => {
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [cart, setCart] = useState<{[key: string]: number}>({});

  // Mock product data
  const products: Product[] = [
    {
      id: "1",
      name: "Industrial Steel Pipes",
      description: "High-quality stainless steel pipes for industrial applications",
      price: 120.00,
      image: "/placeholder.svg",
      category: "Industrial",
      supplier: "SteelCorp Industries",
      rating: 4.8,
      inStock: true,
      minOrder: 50
    },
    {
      id: "2",
      name: "Organic Cotton Fabric",
      description: "Premium organic cotton fabric for textile manufacturing",
      price: 15.50,
      image: "/placeholder.svg",
      category: "Textiles",
      supplier: "GreenFiber Co.",
      rating: 4.6,
      inStock: true,
      minOrder: 100
    },
    {
      id: "3",
      name: "Electronic Components Kit",
      description: "Comprehensive kit with various electronic components",
      price: 85.00,
      image: "/placeholder.svg",
      category: "Electronics",
      supplier: "TechSupply Ltd",
      rating: 4.9,
      inStock: false,
      minOrder: 10
    },
    {
      id: "4",
      name: "Pharmaceutical Grade Bottles",
      description: "Sterile glass bottles for pharmaceutical use",
      price: 2.50,
      image: "/placeholder.svg",
      category: "Medical",
      supplier: "MedPack Solutions",
      rating: 4.7,
      inStock: true,
      minOrder: 500
    },
  ];

  const categories = ["all", "Industrial", "Textiles", "Electronics", "Medical"];

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         product.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === "all" || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const addToCart = (productId: string, minOrder: number) => {
    setCart(prev => ({
      ...prev,
      [productId]: (prev[productId] || 0) + minOrder
    }));
    
    toast({
      title: "Added to Cart",
      description: `${minOrder} units added to your cart`,
    });
  };

  return (
    <div className="max-w-7xl mx-auto p-6 animate-fade-in">
      <div className="mb-8">
        <div className="flex items-center space-x-3 mb-4">
          <Package className="h-8 w-8 text-primary" />
          <h2 className="text-3xl font-bold text-foreground">Product Catalog</h2>
        </div>
        <p className="text-muted-foreground">Browse and order from our comprehensive product catalog</p>
      </div>

      {/* Search and Filter Bar */}
      <Card className="mb-8 shadow-soft">
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            
            <div className="flex gap-4">
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger className="w-48">
                  <Filter className="h-4 w-4 mr-2" />
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map(category => (
                    <SelectItem key={category} value={category}>
                      {category === "all" ? "All Categories" : category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              
              {Object.keys(cart).length > 0 && (
                <Button variant="outline" className="flex items-center space-x-2">
                  <ShoppingCart className="h-4 w-4" />
                  <span>Cart ({Object.values(cart).reduce((a, b) => a + b, 0)})</span>
                </Button>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Products Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProducts.map((product) => (
          <Card key={product.id} className="shadow-medium hover:shadow-strong transition-all duration-300 animate-slide-up">
            <CardHeader className="pb-4">
              <div className="aspect-video bg-muted rounded-lg mb-4 flex items-center justify-center">
                <Package className="h-12 w-12 text-muted-foreground" />
              </div>
              
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <CardTitle className="text-lg line-clamp-2">{product.name}</CardTitle>
                  <CardDescription className="mt-2 line-clamp-2">
                    {product.description}
                  </CardDescription>
                </div>
                
                <Badge variant={product.inStock ? "default" : "secondary"} className="ml-2">
                  {product.inStock ? "In Stock" : "Out of Stock"}
                </Badge>
              </div>
            </CardHeader>
            
            <CardContent className="pt-0">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="text-2xl font-bold text-primary">
                    ${product.price.toFixed(2)}
                  </div>
                  <div className="flex items-center space-x-1">
                    <Star className="h-4 w-4 fill-warning text-warning" />
                    <span className="text-sm text-muted-foreground">{product.rating}</span>
                  </div>
                </div>
                
                <div className="text-sm text-muted-foreground space-y-1">
                  <div>Supplier: {product.supplier}</div>
                  <div>Min Order: {product.minOrder} units</div>
                  <div>Category: {product.category}</div>
                </div>
                
                <Button 
                  className="w-full"
                  disabled={!product.inStock}
                  onClick={() => addToCart(product.id, product.minOrder)}
                >
                  <ShoppingCart className="h-4 w-4 mr-2" />
                  {product.inStock ? "Add to Cart" : "Out of Stock"}
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredProducts.length === 0 && (
        <Card className="text-center py-12">
          <CardContent>
            <Package className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">No products found</h3>
            <p className="text-muted-foreground">Try adjusting your search criteria</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};