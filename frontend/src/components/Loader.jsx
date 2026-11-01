function Loader({ message = "Loading SDREMS..." }) {
  return (
    <div className="sdrems-loader" role="status">
      <div className="sdrems-loader-spinner" />
      <p>{message}</p>
    </div>
  );
}

export default Loader;
