function App() {
  return (
    <div className="container-fluid">
      <div className="row">

        {/* Sidebar */}
        <div className="col-2 bg-dark text-white vh-100 p-3">
          <h4>Threat Analyzer</h4>
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

          <h2>Website Threat Analyzer</h2>

          {/* URL Input Section */}
          <div className="card p-3 mb-4 mt-4">
            <h4>Analyze Website</h4>

            <div className="row mt-3">
              <div className="col-md-9">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter Website URL"
                />
              </div>

              <div className="col-md-3">
                <button className="btn btn-success w-100">
                  Analyze URL
                </button>
              </div>
            </div>
          </div>
          <div className="row">

            <div className="col-md-3 mb-3">
              <div className="card">
                <div className="card-body">
                  <h5>URLs Analyzed</h5>
                  <h3>3256</h3>
                </div>
              </div>
            </div>

            <div className="col-md-3 mb-3">
              <div className="card">
                <div className="card-body">
                  <h5>High Risk Websites</h5>
                  <h3>678</h3>
                </div>
              </div>
            </div>

            <div className="col-md-3 mb-3">
              <div className="card">
                <div className="card-body">
                  <h5>Blocked Websites</h5>
                  <h3>487</h3>
                </div>
              </div>
            </div>

            <div className="col-md-3 mb-3">
              <div className="card">
                <div className="card-body">
                  <h5>Average Risk Score</h5>
                  <h3>43/100</h3>
                </div>
              </div>
            </div>

          </div>

          {/* Risk Analysis & Threat Indicators */}
          <div className="row mt-4">

            <div className="col-md-6">
              <div className="card p-3">
                <h4>Risk Analysis</h4>

                <p><strong>Website:</strong> example.com</p>
                <p><strong>Risk Score:</strong> 78/100</p>
                <p><strong>Status:</strong> High Risk</p>
              </div>
            </div>

            <div className="col-md-6">
              <div className="card p-3">
                <h4>Threat Indicators</h4>

                <ul>
                  <li>Missing HTTPS</li>
                  <li>Suspicious Keyword Found</li>
                  <li>Unknown Domain Reputation</li>
                  <li>Recently Registered Domain</li>
                </ul>
              </div>
            </div>

          </div>

          {/* Recent Website Analysis */}
          <div className="card p-3 mt-4">
            <h4>HELLO koushal</h4>

            <table className="table mt-3">
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
                  <td>5</td>
                  <td>Safe</td>
                </tr>

                <tr>
                  <td>free-gift.xyz</td>
                  <td>85</td>
                  <td>High Risk</td>
                </tr>

                <tr>
                  <td>secure-login.net</td>
                  <td>72</td>
                  <td>Medium Risk</td>
                </tr>
              </tbody>
            </table>
          </div>

            <div className="card p-3 mt-4 mb-4">
            <h4>AI Recommendation</h4>

            <p>
              Avoid entering personal information on websites
              with high risk scores. Verify domain reputation
              and SSL security before proceeding.
            </p>
          </div>

        </div>

      </div>
    </div>
  );
}
export default App;