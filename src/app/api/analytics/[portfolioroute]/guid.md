

### 1. API Endpoint for Graph Data: `/api/analytics2/:portfolioRoute`

This endpoint provides daily data for the specified `portfolioRoute` (e.g., `myportfolio`), including metrics like `views`, `desktop`, and `mobile` views over the last 3 months, with optional date range query parameters.

#### Example Request:
```http
GET /api/analytics2/myportfolio?range=last90days
```

#### Response Format:
```json
{
  "route": "myportfolio",
  "range": "last90days",
  "data": [
    {
      "date": "2024-08-01",
      "views": 250,
      "desktop": 150,
      "mobile": 100,
      "activeUsers": 200
    },
    {
      "date": "2024-08-02",
      "views": 300,
      "desktop": 180,
      "mobile": 120,
      "activeUsers": 240
    },
    // additional entries for each day up to the last 90 days
  ]
}
```

#### Explanation of Response Fields:
- **date**: The specific date of the data point.
- **views**: Total views on that date.
- **desktop**: Views from desktop devices.
- **mobile**: Views from mobile devices.
- **activeUsers**: Number of daily active users.


### 2. API Endpoint for Last 30-Minute Data: `/api/analytics2/:portfolioRoute/last30Minutes`

This endpoint returns analytics for the last 30 minutes in 1-minute intervals, showing `time` and `views`.

#### Example Request:
```http
GET /api/analytics2/myportfolio/last30Minutes
```

#### Response Format:
```json
{
  "route": "myportfolio",
  "last30Minutes": [
    {
      "time": "12:30",
      "views": 45
    },
    {
      "time": "12:31",
      "views": 50
    },
    // additional entries for each of the last 30 minutes
  ]
}
```

#### Explanation of Response Fields:
- **time**: Each minute within the last 30 minutes.
- **views**: Total views in that minute.


