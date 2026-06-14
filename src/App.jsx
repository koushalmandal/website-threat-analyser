import { useState } from "react";
import { Pie } from "react-chartjs-2";

import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

function App() {
  const [url, setUrl] = useState("");
  const [result, setResult] = useState(null);
  const [history, setHistory] = useState([]);

const analyzeUrl = () => {
  if (!url.trim()) {
    alert("Please enter a URL");
    return;
  }

  let risk = 10;
  const indicators = [];

  // HTTPS Check
  if (!url.startsWith("https://")) {
    risk += 25;
    indicators.push("Website is not using HTTPS");
  }

  // Suspicious Keywords
  const suspiciousWords = [
    "login",
    "verify",
    "free",
    "gift",
    "bonus",
    "bank",
    "secure",
    "win",
    "reward",
    "update",
    "account",
  ];

  suspiciousWords.forEach((word) => {
    if (url.toLowerCase().includes(word)) {
      risk += 10;
      indicators.push(`Suspicious keyword detected: ${word}`);
    }
  });

  // Long URL Detection
  if (url.length > 40) {
    risk += 15;
    indicators.push("Unusually long URL detected");
  }

  // IP Address Detection
  const ipPattern =
    /(\d{1,3}\.){3}\d{1,3}/;

  if (ipPattern.test(url)) {
    risk += 25;
    indicators.push("IP Address used instead of domain name");
  }

  // Multiple Hyphens
  const hyphenCount =
    (url.match(/-/g) || []).length;

  if (hyphenCount >= 3) {
    risk += 15;
    indicators.push("Multiple hyphens detected");
  }

  // Too Many Numbers
  const numberCount =
    (url.match(/\d/g) || []).length;

  if (numberCount >= 5) {
    risk += 10;
    indicators.push("Large number of digits detected");
  }

  if (risk > 100) risk = 100;

  let status = "Safe";

  if (risk >= 70) {
    status = "High Risk";
  } else if (risk >= 40) {
    status = "Medium Risk";
  }

  let recommendation = "";

  if (status === "High Risk") {
    recommendation =
      "This URL contains multiple phishing indicators and should be avoided.";
  } else if (status === "Medium Risk") {
    recommendation =
      "This URL shows suspicious characteristics. Proceed with caution.";
  } else {
    recommendation =
      "No major threats detected. Website appears relatively safe.";
  }

  const scanResult = {
  website: url,
  risk,
  status,
  indicators,
  threatCount: indicators.length,
  recommendation,
  timestamp: new Date().toLocaleString(),
};

  setResult(scanResult);
  setHistory([scanResult, ...history]);
  setUrl("");
};
  const totalScans = history.length;

  const highRisk = history.filter(
    (item) => item.status === "High Risk"
  ).length;

  const mediumRisk = history.filter(
    (item) => item.status === "Medium Risk"
  ).length;

  const safeSites = history.filter(
    (item) => item.status === "Safe"
  ).length;

 const pieData = {
  labels: ["Safe", "Medium Risk", "High Risk"],
  datasets: [
    {
      data: [safeSites, mediumRisk, highRisk],
      backgroundColor: [
        "#28a745", // Green
        "#ffc107", // Yellow
        "#dc3545", // Red
      ],
      borderWidth: 1,
    },
  ],
};

  return (
    <div className="container-fluid">
      <div className="row">

        {/* Sidebar */}
        <div
          className="col-md-2 text-white p-4"
          style={{
            backgroundColor: "#1f2937",
            minHeight: "100vh",
          }}
        >
          <h3>Threat Analyzer</h3>
          <hr />

          <p>📊 Dashboard</p>
          <p>🔍 Check URL</p>
          <p>📜 History</p>
          <p>📈 Analytics</p>
          <p>📄 Reports</p>
          <p>⚙ Settings</p>
        </div>

        {/* Main */}
        <div className="col-md-10 p-4">

          <h1 className="mb-4">
            AI-Based Website Threat Analyzer
          </h1>

          {/* URL Input */}
          <div className="card p-3 mb-4">
            <h4>Analyze Website</h4>

            <div className="input-group mt-3">
              <input
                type="text"
                className="form-control"
                placeholder="Enter Website URL"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
              />

              <button
                className="btn btn-success"
                onClick={analyzeUrl}
              >
                Analyze URL
              </button>
            </div>
          </div>

          {/* Dashboard Cards */}
          <div className="row mb-4">

            <div className="col-md-3">
        <div className="card text-center p-3 bg-primary text-white">
                <h5>Total Scans</h5>
                <h2>{totalScans}</h2>
              </div>
            </div>

            <div className="col-md-3">
          <div className="card text-center p-3 bg-success text-white">
                <h5>Safe Sites</h5>
                <h2>{safeSites}</h2>
              </div>
            </div>

            <div className="col-md-3">
             <div className="card text-center p-3 bg-warning text-white">
                <h5>Medium Risk</h5>
                <h2>{mediumRisk}</h2>
              </div>
            </div>

            <div className="col-md-3">
             <div className="card text-center p-3 bg-danger text-white">
                <h5>High Risk</h5>
                <h2>{highRisk}</h2>
              </div>
            </div>

          </div>

          {/* Result */}
          {result && (
            <div className="row mb-4">

              <div className="col-md-6">
                <div className="card p-3">
                  <h4>Risk Analysis</h4>

                  <p>
                    <strong>Website:</strong>{" "}
                    {result.website}
                  </p>

                <div className="mb-3">
  <h5>Security Score</h5>
  <p>
  <strong>Threat Indicators Found:</strong>{" "}
  {result.threatCount}
</p>

  <div className="display-5 fw-bold">
    {100 - result.risk}/100
  </div>

  <span
    className={`badge ${
      result.status === "Safe"
        ? "bg-success"
        : result.status === "Medium Risk"
        ? "bg-warning text-dark"
        : "bg-danger"
    }`}
  >
    {result.status}
  </span>
</div>

                  <p>
                    <strong>Status:</strong>{" "}
                    {result.status}
                  </p>

                  <div className="progress">
                    <div
  className={`progress-bar ${
    result.risk >= 70
      ? "bg-danger"
      : result.risk >= 40
      ? "bg-warning"
      : "bg-success"
  }`}
  style={{
    width: `${result.risk}%`,
  }}
>
                      {result.risk}%
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-md-6">
                <div className="card p-3">
                  <h4>Threat Indicators</h4>

                  {result.indicators.length > 0 ? (
                    <ul>
                      {result.indicators.map(
                        (item, index) => (
                          <li key={index}>
                            {item}
                          </li>
                        )
                      )}
                    </ul>
                  ) : (
                    <p>No threats detected.</p>
                  )}
                </div>
              </div>

            </div>
          )}

          {/* Analytics */}
                    {/* Analytics */}
          <div className="row mb-4">
          <div className="col-md-6">
              <div className="card p-3">
              <h4>Threat Distribution</h4>
                <Pie data={pieData} />
              </div>
            </div>

            <div className="col-md-6">
              {result && (
                <>
                  <div className="card p-3 mb-3">
                    <h4>AI Recommendation</h4>

                    <div className="alert alert-info">
                      {result.recommendation}
                    </div>
                  </div>

                  <div className="card p-3">
                    <h4>Analysis Summary</h4>

                    <p>
                      <strong>Total URLs Scanned:</strong>{" "}
                      {totalScans}
                    </p>

                    <p>
                      <strong>Safe Websites:</strong>{" "}
                      {safeSites}
                    </p>

                    <p>
                      <strong>Medium Risk Websites:</strong>{" "}
                      {mediumRisk}
                    </p>

                    <p>
                      <strong>High Risk Websites:</strong>{" "}
                      {highRisk}
                    </p>
                  </div>
                </>
              )}
          </div>
          </div>
<input
  type="text"
  className="form-control mb-3"
  placeholder="Search scanned URLs"
/>
          {/* History */}
          <div className="card p-3 mt-4">
            <h4>Recent URL Analysis</h4>
<table className="table table-striped">
  <thead>
    <tr>
      <th>Website</th>
      <th>Risk Score</th>
      <th>Status</th>
      <th>Date & Time</th>
    </tr>
  </thead>

  <tbody>
    {history.map((item, index) => (
      <tr key={index}>
        <td>{item.website}</td>
        <td>{item.risk}/100</td>
        <td>
          <span
            className={`badge ${
              item.status === "Safe"
                ? "bg-success"
                : item.status === "Medium Risk"
                ? "bg-warning text-dark"
                : "bg-danger"
            }`}
          >
            {item.status}
          </span>
        </td>
        <td>{item.timestamp}</td>
      </tr>
    ))}
  </tbody>
</table>
          </div>

        </div>
      </div>
    </div>
  );
}

export default App;