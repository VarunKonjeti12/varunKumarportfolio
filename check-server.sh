#!/bin/bash
echo "Checking if portfolio server is running..."
if lsof -ti:3000 > /dev/null 2>&1; then
    echo "✅ Server is running!"
    echo "🌐 Open your browser and visit: http://localhost:3000"
    echo ""
    echo "If you see a compilation message, wait a bit more for it to finish."
else
    echo "⏳ Server is still starting up..."
    echo "Run: npm run dev (or npx next dev) to start the server"
fi

