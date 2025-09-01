import RateCard from "./RateCard";

export default function RatesGrid({ rates, message }) {
  if (rates.length === 0) {
    return (
      <div className="col-12 text-center">
        <p className="text-muted">{ message }</p>
      </div>
    );
  }

  return rates.map((rate) => (
    <RateCard key={rate.code} code={rate.code} rate={rate.rate} />
  ));
}
