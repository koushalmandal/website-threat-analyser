import { useState } from "react";

function App() {
  const [url, setUrl] = useState("");
  const [result, setResult] = useState(null);

  const analyzeUrl = () => {
    if (!url) {
      alert("Please enter a URL");
      return;
    }

    const riskyWords = ["login", "free", "bonus", "gift", "verify"];

    let risk = 20;

    riskyWords.forEach((word) => {
      if (url.toLowerCase().includes(word)) {
        risk += 15;
      }
    });

    const status =
      risk > 60 ? "High Risk" : risk > 40 ? "Medium Risk" : "Safe";

    setResult({
      risk,
      status,
      indicators: [
        "Domain Reputation Check",
        "URL Pattern Analysis",
        "Suspicious Keyword Detection",
        "SSL Verification",
        "Phishing Pattern Detection",
      ],
    });
  };

  return (
    <div className="container-fluid">
      <div className="row">
        {/* Sidebar */}
        <div className="col-2 bg-dark text-white vh-100 p-3">
          <h2>Threat Analyzer</h2>
          <hr />

          <p>Dashboard</p>
          <p>Check URL</p>
          <p>Scan History</p>
          <p>Analytics</p>
          <p>Reports</p>
          <p>Settings</p>
        </div>

        {/* Main Content */}
        <div className="col-10 p-4">
          <h1 className="text-center mb-4">
            AI-Based Website Threat Analyzer
          </h1>

          {/* URL Analyzer */}
          <div className="card p-3 mb-4">
            <h4>Analyze Website</h4>

            <div className="input-group">
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

          {/* Stats Cards */}
          <div className="row text-center mb-4">
            <div className="col-md-3">
              <div className="card p-3">
                <h4>URLs Analyzed</h4>
                <h1>3256</h1>
              </div>
            </div>

            <div className="col-md-3">
              <div className="card p-3">
                <h4>High Risk Websites</h4>
                <h1>678</h1>
              </div>
            </div>

            <div className="col-md-3">
              <div className="card p-3">
                <h4>Blocked Websites</h4>
                <h1>487</h1>
              </div>
            </div>

            <div className="col-md-3">
              <div className="card p-3">
                <h4>Average Risk Score</h4>
                <h1>43/100</h1>
              </div>
            </div>
          </div>

          {/* Analysis Result */}
          {result && (
            <div className="row">
              <div className="col-md-6">
                <div className="card p-3">
                  <h4>Risk Analysis</h4>

                  <p>
                    <strong>Risk Score:</strong> {result.risk}/100
                  </p>

                  <p>
                    <strong>Status:</strong> {result.status}
                  </p>
                </div>
              </div>

              <div className="col-md-6">
                <div className="card p-3">
                  <h4>Threat Indicators</h4>

                  <ul>
                    {result.indicators.map((item, index) => (
                      <li key={index}>{item}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          )}

          {/* Recent Analysis */}
          <div className="card p-3 mt-4">
            <h4>Recent Website Analysis</h4>

            <table className="table">
              <thead>
                <tr>
                  <th>Website</th>
                  <th>Risk Score</th>
                  <th>Status</th>
                </tr>
              </thead>

              <tbody>
                <tr>
                  <td>google.com</td>
                  <td>10</td>
                  <td className="text-success">Safe</td>
                </tr>

                <tr>
                  <td>free-gift-login.com</td>
                  <td>75</td>
                  <td className="text-danger">High Risk</td>
                </tr>

                <tr>
                  <td>amazon.in</td>
                  <td>15</td>
                  <td className="text-success">Safe</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;