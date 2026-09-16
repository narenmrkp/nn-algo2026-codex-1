# SignalDesk

A lightweight, browser-based trading scan and order-ticket interface designed around a Shoonya account workflow.

## Run locally

```bash
python3 -m http.server 4173
```

Open [http://localhost:4173](http://localhost:4173).

## Included workflow

- Browse live-style NSE market indicators and ranked scanner results.
- Adjust the stock universe, timeframe, signal, and trend conditions, then rerun the scan.
- Filter scan results, export the visible results as a CSV, and open a buy/sell order ticket from any symbol.
- Connect a Shoonya account through the connection modal and track submitted orders in the navigation.

## Production integration note

This is a front-end prototype using illustrative market data. Do **not** call broker APIs with API keys from browser JavaScript. Put Shoonya authentication, session-token management, live quotes, scans, risk checks, and order placement behind an authenticated server-side API; make the UI call that API instead.
