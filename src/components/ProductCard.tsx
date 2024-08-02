type PtoductCardProps = {
  title: string;
  description: string;
  category: string;
  price: number;
  image: string;
  rating: {
    rate: number;
    count: number;
  };
  addToCart: () => void;
};

export function ProductCard({
  title,
  description,
  category,
  price,
  image,
  rating,
  addToCart,
}: PtoductCardProps) {
  return (
    <div className="min-h-48">
      <img src={image} alt={title} className="w-[200px]" />
      <h3 className="text-xl">{title}</h3>
      <p>{description}</p>
      <p>{category}</p>
      <p>${price}</p>
      <p>{rating.rate}</p>
      <p>{rating.count}</p>
      <button onClick={addToCart}>Add to Cart</button>
    </div>
  );
}
