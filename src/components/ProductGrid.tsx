import { useEffect, useState } from "react";
import { get } from "../api/api"; // убедитесь, что путь к вашему api файлу правильный
import { ProductCard } from "./ProductCard";

type Product = {
  title: string;
  description: string;
  category: string;
  price: number;
  image: string;
  rating: {
    rate: number;
    count: number;
  };
};

export function ProductGrid() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true); // для отображения загрузки
  const [error, setError] = useState<string | null>(null); // для отображения ошибок

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const productsData = await get("https://fakestoreapi.com/products");
        setProducts(productsData);
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (error: any) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []); // пустой массив зависимостей, чтобы useEffect сработал только один раз при монтировании компонента

  if (loading) {
    return <div>Loading...</div>; // или любой компонент/спиннер для отображения загрузки
  }

  if (error) {
    return <div>Error: {error}</div>; // отображение ошибки, если запрос не удался
  }

  return (
    <div className="grid grid-cols-4 gap-4">
      {products.map((item: Product) => (
        <ProductCard
          key={item.title} // добавляем ключ для каждого элемента списка
          title={item.title}
          description={item.description}
          category={item.category}
          price={item.price}
          image={item.image}
          rating={item.rating}
          addToCart={() => {}} // предполагается, что у ProductCard есть пропс addToCart
        />
      ))}
    </div>
  );
}
