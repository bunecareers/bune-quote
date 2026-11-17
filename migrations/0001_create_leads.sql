-- Offer requests and ROI summary requests from the website forms.
CREATE TABLE leads (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
  kind TEXT NOT NULL,
  lang TEXT NOT NULL,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  company TEXT,
  payload TEXT NOT NULL
);

CREATE INDEX leads_created_at ON leads (created_at);
