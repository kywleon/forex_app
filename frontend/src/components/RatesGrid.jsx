import RateCard from "./RateCard";

export default function RatesGrid({ rates }) {
  if (rates.length === 0) {
    return (
      <div className="col-12 text-center">
        <p className="text-muted">No data available</p>
      </div>
    );
  }

  return rates.map((rate) => (
    <RateCard key={rate.code} code={rate.code} rate={rate.rate} />
  ));
}
