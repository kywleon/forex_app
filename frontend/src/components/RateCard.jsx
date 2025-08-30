export default function RateCard({ code, rate }) {
  return (
    <div className="col-12 col-sm-6 col-md-4 col-lg-3 my-5">
      <div className="card">
        <div className="card-header text-center p-4">
          <h5 className="card-title mb-0">{code}</h5>
        </div>
        <div className="card-body text-center p-5">
          <p className="fs-4 fw-bold mb-0">{rate}</p>
        </div>
      </div>
    </div>
  );
}
