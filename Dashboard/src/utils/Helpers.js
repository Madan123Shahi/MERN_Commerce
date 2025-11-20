export const formatCurrency = (v) => {
  if (v == null) return "—";
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
  }).format(v);
};
