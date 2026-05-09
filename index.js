const express = require('express');
const https = require('https');
const app = express();

app.use((req, res) => {
  res.header('Access-Control-Allow-Origin', '*');
  const options = {
    hostname: 'api.brawlstars.com',
    path: '/v1' + req.url,
    headers: { Authorization: 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiIsImtpZCI6IjI4YTMxOGY3LTAwMDAtYTFlYi03ZmExLTJjNzQzM2M2Y2NhNSJ9.eyJpc3MiOiJzdXBlcmNlbGwiLCJhdWQiOiJzdXBlcmNlbGw6Z2FtZWFwaSIsImp0aSI6IjhlMDRjNzBjLTdhMjAtNGU1NC1hMjQ5LTcxNWEyZmE0ZGU4ZiIsImlhdCI6MTc3ODMzMDk5MSwic3ViIjoiZGV2ZWxvcGVyLzExY2QzMDA4LWViZTgtNmExZC0xNTljLTBlYTU1Njg3MjVjNyIsInNjb3BlcyI6WyJicmF3bHN0YXJzIl0sImxpbWl0cyI6W3sidGllciI6ImRldmVsb3Blci9zaWx2ZXIiLCJ0eXBlIjoidGhyb3R0bGluZyJ9LHsiY2lkcnMiOlsiODYuMjExLjE4OC4xMTQiXSwidHlwZSI6ImNsaWVudCJ9XX0.XtCHgQLjtw0MSxjOwEj0kPW-YIeycvKFN_oz2tGWBzeViOw-GG67TSNmGk5vTjGbAlqMYTJ1rTkmi7KDHp_U4A' }
  };
  https.get(options, r => {
    let data = '';
    r.on('data', chunk => data += chunk);
    r.on('end', () => {
      try { res.json(JSON.parse(data)); }
      catch(e) { res.status(500).json({ error: 'Parse error' }); }
    });
  }).on('error', () => res.status(500).json({ error: 'Request failed' }));
});

app.listen(process.env.PORT || 3000);
